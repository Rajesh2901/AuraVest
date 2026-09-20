import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../stores/usePortfolioStore';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Zap, 
  Calendar, 
  DollarSign, 
  BrainCircuit, 
  PieChart as PieIcon,
  CheckCircle2,
  X,
  History,
  ShieldCheck
} from 'lucide-react';

export const GlobalDashboard: React.FC<{ onOpenAIModal: () => void }> = ({ onOpenAIModal }) => {
  const { 
    metrics, 
    allocations, 
    selectedAssetClass, 
    setSelectedAssetClass, 
    quickDeposit,
    executeTrade,
    setupSIP,
    updateLiveTick
  } = usePortfolioStore();

  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [sipModalOpen, setSipModalOpen] = useState(false);
  const [tradeSymbol, setTradeSymbol] = useState('NVDA');
  const [tradeAmount, setTradeAmount] = useState('500');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [sipAmount, setSipAmount] = useState('250');
  const [sipGoal, setSipGoal] = useState('Retirement Wealth');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Background price ticker simulation every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateLiveTick('PORTFOLIO', 0, 0);
    }, 3500);
    return () => clearInterval(interval);
  }, [updateLiveTick]);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(tradeAmount) || 100;
    executeTrade(tradeSymbol, tradeType, amt, 130.40);
    setTradeModalOpen(false);
    showNotification(`Executed ${tradeType} order: $${amt.toFixed(2)} on ${tradeSymbol}`);
  };

  const handleSipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(sipAmount) || 100;
    setupSIP(sipGoal, amt);
    setSipModalOpen(false);
    showNotification(`Automated SIP activated: $${amt.toFixed(2)}/mo for ${sipGoal}`);
  };

  // SVG Donut calculation helpers
  const size = 260;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="space-y-6 pb-24">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500/90 text-slate-950 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* 1. TOP METRICS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Net Worth */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider uppercase">
            <span>Total Net Worth</span>
            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg"><Wallet className="w-4 h-4" /></span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              ${metrics.netWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+14.8% all-time</span>
          </div>
        </div>

        {/* Total Invested */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider uppercase">
            <span>Total Invested</span>
            <span className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg"><DollarSign className="w-4 h-4" /></span>
          </div>
          <div className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-white">
            ${metrics.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Across 5 asset classes
          </div>
        </div>

        {/* Today's P&L */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider uppercase">
            <span>Today's P&L</span>
            <span className={`p-1.5 rounded-lg ${metrics.todayPnL >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-emerald-400">
            +${metrics.todayPnL.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 flex items-center text-xs text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>+{metrics.todayPnLPct.toFixed(2)}% (Live Ticks)</span>
          </div>
        </div>

        {/* Overall Returns (Absolute & XIRR) */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider uppercase">
            <span>Overall Returns</span>
            <span className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg font-mono text-[10px]">XIRR</span>
          </div>
          <div className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-white">
            +{metrics.absoluteReturnsPct.toFixed(1)}%
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
            <span>Abs: +${(metrics.absoluteReturns / 1000).toFixed(1)}k</span>
            <span className="font-semibold text-purple-400">XIRR: {metrics.xirrPct.toFixed(1)}%</span>
          </div>
        </div>

        {/* Available Cash */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider uppercase">
            <span>Available Cash</span>
            <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg"><Zap className="w-4 h-4" /></span>
          </div>
          <div className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-white">
            ${metrics.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2">
            <button 
              onClick={() => {
                quickDeposit(1000);
                showNotification("Added instant deposit of $1,000.00 to cash balance!");
              }}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 transition"
            >
              + Quick $1k Deposit
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN DASHBOARD CONTENT: PORTFOLIO ALLOCATION DONUT & BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart Visualizer */}
        <div className="lg:col-span-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center relative">
          <div className="w-full flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold tracking-wider text-slate-300 uppercase flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              Asset Allocation
            </h2>
            <span className="text-xs font-mono text-slate-500">Real-Time Weights</span>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <svg width={size} height={size} className="transform -rotate-90">
              {allocations.map((slice) => {
                const strokeDasharray = `${(slice.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                accumulatedPercent += slice.percentage;
                const isHovered = hoveredSlice === slice.name || selectedAssetClass === slice.name;

                return (
                  <circle
                    key={slice.id}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="cursor-pointer transition-all duration-300 hover:opacity-100 opacity-90"
                    onMouseEnter={() => setHoveredSlice(slice.name)}
                    onMouseLeave={() => setHoveredSlice(null)}
                    onClick={() => setSelectedAssetClass(selectedAssetClass === slice.name ? null : slice.name)}
                  />
                );
              })}
            </svg>

            {/* Centered Donut Metric */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-xs font-medium text-slate-400">
                {hoveredSlice || selectedAssetClass || 'Total Portfolio'}
              </span>
              <span className="text-xl font-bold text-white tracking-tight">
                {hoveredSlice
                  ? `${allocations.find(a => a.name === hoveredSlice)?.percentage}%`
                  : `$${(metrics.netWorth / 1000).toFixed(1)}k`}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {hoveredSlice ? 'Focused Allocation' : '5 Asset Classes'}
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center gap-3 text-[11px] font-mono text-slate-400 mt-2">
            <span>Hover / Click ring to isolate class</span>
          </div>
        </div>

        {/* Breakdown Table & Interactive Cards */}
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
              Portfolio Holdings Breakdown
            </h2>
            <div className="text-xs text-slate-400 font-mono">
              {selectedAssetClass ? `Filtered: ${selectedAssetClass}` : 'Showing All Classes'}
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {allocations
              .filter(a => !selectedAssetClass || a.name === selectedAssetClass)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedAssetClass(selectedAssetClass === item.name ? null : item.name)}
                  className={`py-3.5 px-4 flex items-center justify-between rounded-xl cursor-pointer transition ${
                    selectedAssetClass === item.name 
                      ? 'bg-slate-800/80 border border-slate-700' 
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <div>
                      <div className="text-sm font-semibold text-white">{item.name}</div>
                      <div className="text-xs text-slate-400 font-mono">{item.percentage}% of portfolio</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold text-white font-mono">
                      ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`text-xs font-medium flex items-center justify-end ${item.pnl24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {item.pnl24h >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      <span>{item.pnl24h >= 0 ? `+${item.pnl24h}%` : `${item.pnl24h}%`} (24h)</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {selectedAssetClass && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedAssetClass(null)}
                className="text-xs text-slate-400 hover:text-white underline font-mono"
              >
                Clear filter (Show all)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. RECENT ACTIVITY & PORTFOLIO HEALTH ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            <History className="w-4 h-4 text-emerald-400" />
            Recent Wealth Transactions
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <div>
                <span className="font-semibold text-white block">Monthly SIP - Bluechip Fund</span>
                <span className="text-slate-500 text-[10px]">Yesterday · Automated</span>
              </div>
              <span className="font-mono font-bold text-slate-300">+$250.00</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <div>
                <span className="font-semibold text-white block">Buy Order - NVDA</span>
                <span className="text-slate-500 text-[10px]">3 days ago · Market Order</span>
              </div>
              <span className="font-mono font-bold text-emerald-400">+$650.00</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <div>
                <span className="font-semibold text-white block">Dividend Reinvestment - VOO</span>
                <span className="text-slate-500 text-[10px]">Sep 15 · Auto-Credit</span>
              </div>
              <span className="font-mono font-bold text-purple-400">+$42.80</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Portfolio Diversification Score
          </div>
          <div className="flex items-center gap-4 my-2">
            <div className="text-4xl font-black font-mono text-emerald-400">92<span className="text-xs text-slate-500">/100</span></div>
            <div className="text-xs text-slate-300">
              Optimal balance between high-growth equities and defensive multi-asset reserves.
            </div>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[92%]" />
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              AI Intelligence Outlook
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consensus projection indicates strong multi-asset momentum. Expected portfolio 1Y growth target is <strong className="text-emerald-400 font-mono">+16.4%</strong>.
            </p>
          </div>
          <button
            onClick={onOpenAIModal}
            className="mt-3 w-full py-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            Launch AI Projection Desk <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. QUICK-ACTION FLOATING GLASSMORPHIC TOOLBAR */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-slate-900/85 backdrop-blur-2xl border border-slate-700/80 py-2.5 px-6 rounded-full shadow-2xl flex items-center gap-4">
          <button 
            onClick={() => setTradeModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full transition shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Buy / Sell</span>
          </button>

          <button 
            onClick={() => setSipModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-full transition shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Automate SIP</span>
          </button>

          <button 
            onClick={() => {
              quickDeposit(2500);
              showNotification("Instant Deposit of $2,500.00 credited to Available Cash!");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-full transition active:scale-95"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Deposit Cash</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button 
            onClick={onOpenAIModal}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-full transition shadow-lg shadow-purple-500/20 active:scale-95"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-purple-200" />
            <span>AI Predictive Desk</span>
          </button>
        </div>
      </div>

      {/* MODAL: INSTANT BUY/SELL */}
      {tradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> Instant Trade Execution
              </h3>
              <button onClick={() => setTradeModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTradeSubmit} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTradeType('BUY')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${tradeType === 'BUY' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType('SELL')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${tradeType === 'SELL' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  SELL
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Asset Symbol</label>
                <select
                  value={tradeSymbol}
                  onChange={(e) => setTradeSymbol(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                >
                  <option value="NVDA">NVDA - NVIDIA Corp ($130.40)</option>
                  <option value="AAPL">AAPL - Apple Inc ($228.50)</option>
                  <option value="SPY">SPY - S&P 500 ETF ($560.20)</option>
                  <option value="BTC">BTC - Bitcoin ($64,200.00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Investment Amount ($)</label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none font-mono"
                  placeholder="500"
                />
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs flex justify-between">
                <span className="text-slate-400">Available Cash:</span>
                <span className="font-mono font-bold text-white">${metrics.cashBalance.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-500/20"
              >
                Confirm {tradeType} Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SIP SETUP */}
      {sipModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" /> Automated Wealth SIP Setup
              </h3>
              <button onClick={() => setSipModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSipSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Goal Plan</label>
                <select
                  value={sipGoal}
                  onChange={(e) => setSipGoal(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                >
                  <option value="Retirement Wealth">Retirement Wealth Fund (30Y Horizon)</option>
                  <option value="First Dream Home">First Dream Home (5Y Horizon)</option>
                  <option value="Child Higher Education">Child Higher Education (12Y Horizon)</option>
                  <option value="Global Tech Leaders Basket">Global Tech Leaders Basket (Ongoing)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Monthly SIP Amount ($)</label>
                <input
                  type="number"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none font-mono"
                  placeholder="250"
                />
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-200">
                ✨ Automated auto-debit on the 1st of every calendar month with 0 penalty cancellation anytime.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-500/20"
              >
                Activate Automated SIP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
