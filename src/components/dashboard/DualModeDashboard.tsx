import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { usePortfolioStore } from '../../stores/usePortfolioStore';
import { useMarketStore } from '../../stores/useMarketStore';
import { VirtualizedWatchlist } from '../common/VirtualizedWatchlist';
import type { OrderType, OrderSide } from '../../types';
import { 
  Sparkles, 
  Layers, 
  Activity, 
  TrendingUp, 
  Wallet, 
  DollarSign, 
  Zap, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Sliders, 
  PieChart as PieIcon 
} from 'lucide-react';

export const DualModeDashboard: React.FC<{ onOpenAIModal: () => void }> = ({ onOpenAIModal }) => {
  const mode = useAppStore((state) => state.mode);
  const setMode = useAppStore((state) => state.setMode);

  const metrics = usePortfolioStore((state) => state.metrics);
  const allocations = usePortfolioStore((state) => state.allocations);
  const selectedAssetClass = usePortfolioStore((state) => state.selectedAssetClass);
  const setSelectedAssetClass = usePortfolioStore((state) => state.setSelectedAssetClass);
  const quickDeposit = usePortfolioStore((state) => state.quickDeposit);
  const executeTrade = usePortfolioStore((state) => state.executeTrade);
  const setupSIP = usePortfolioStore((state) => state.setupSIP);
  const updateLiveTick = usePortfolioStore((state) => state.updateLiveTick);

  const activeSymbol = useMarketStore((state) => state.activeSymbol);
  const activeTimeframe = useMarketStore((state) => state.activeTimeframe);
  const currentPrice = useMarketStore((state) => state.currentPrice);
  const change24hPct = useMarketStore((state) => state.change24hPct);
  const candles = useMarketStore((state) => state.candles);
  const orderBook = useMarketStore((state) => state.orderBook);
  const indicators = useMarketStore((state) => state.indicators);
  const setActiveTimeframe = useMarketStore((state) => state.setActiveTimeframe);
  const toggleIndicator = useMarketStore((state) => state.toggleIndicator);
  const streamNextTick = useMarketStore((state) => state.streamNextTick);

  // Local Pro Order Ticket State
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [side, setSide] = useState<OrderSide>('BUY');
  const [quantity, setQuantity] = useState('10');
  const [limitPrice, setLimitPrice] = useState(currentPrice.toString());
  const [stopLoss, setStopLoss] = useState((currentPrice * 0.95).toFixed(2));
  const [takeProfit, setTakeProfit] = useState((currentPrice * 1.10).toFixed(2));
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Local Simple Mode SIP Planner State
  const [sipTargetAmount, setSipTargetAmount] = useState(75000);
  const [sipYears, setSipYears] = useState(5);
  const [sipCAGR, setSipCAGR] = useState(12);

  // Background ticker stream
  useEffect(() => {
    const timer = setInterval(() => {
      streamNextTick();
      updateLiveTick(activeSymbol, currentPrice, change24hPct);
    }, 2200);
    return () => clearInterval(timer);
  }, [streamNextTick, updateLiveTick, activeSymbol, currentPrice, change24hPct]);

  // Sync limit prices
  useEffect(() => {
    setLimitPrice(currentPrice.toFixed(2));
    setStopLoss((currentPrice * 0.95).toFixed(2));
    setTakeProfit((currentPrice * 1.10).toFixed(2));
  }, [currentPrice]);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleProOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantity) || 1;
    const price = orderType === 'MARKET' ? currentPrice : parseFloat(limitPrice) || currentPrice;
    const total = qty * price;
    executeTrade(activeSymbol, side, total, price);
    showNotification(`Filled ${orderType} ${side}: ${qty} ${activeSymbol} @ $${price.toFixed(2)} ($${total.toFixed(2)})`);
  };

  // Simple SIP formula calculation
  const monthlyRate = sipCAGR / 100 / 12;
  const totalMonths = sipYears * 12;
  const monthlySIPRequired = Math.round(
    sipTargetAmount / (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate))
  );

  // Donut Geometry
  const size = 240;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  // Candlestick Geometry
  const chartWidth = 660;
  const chartHeight = 280;
  const prices = candles.flatMap(c => [c.low, c.high]);
  const minP = Math.min(...prices) * 0.998;
  const maxP = Math.max(...prices) * 1.002;
  const priceRange = maxP - minP || 1;
  const getY = (val: number) => chartHeight - 25 - ((val - minP) / priceRange) * (chartHeight - 50);
  const candleSpacing = (chartWidth - 50) / candles.length;

  return (
    <div className="space-y-6 pb-24">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-slate-950 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TOP HEADER WITH DUAL-MODE SWITCHER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-white tracking-tight">
              {mode === 'simple' ? 'Investor Hub & Wealth OS' : 'Pro Trading Terminal'}
            </h1>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
              mode === 'simple' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
            }`}>
              {mode === 'simple' ? 'SIMPLE MODE' : 'PRO TERMINAL'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {mode === 'simple' 
              ? 'Intuitive, jargon-free wealth accumulation with automated SIP compounding.' 
              : 'Multi-pane execution desk with Level-2 market depth and multi-timeframe indicator overlays.'}
          </p>
        </div>

        {/* MODE TOGGLE SWITCHER */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setMode('simple')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              mode === 'simple'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Simple Mode</span>
          </button>

          <button
            onClick={() => setMode('pro')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              mode === 'pro'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Pro Terminal</span>
          </button>
        </div>
      </div>

      {/* TOP METRICS TELEMETRY BAR (COMMON ACROSS BOTH MODES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Net Worth */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Total Net Worth</span>
            <span className="p-1 bg-emerald-500/10 text-emerald-400 rounded-lg"><Wallet className="w-3.5 h-3.5" /></span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-white">
            ${metrics.netWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1 flex items-center text-[11px] text-emerald-400 font-medium">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>+14.8% all-time</span>
          </div>
        </div>

        {/* Total Invested */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Total Invested</span>
            <span className="p-1 bg-blue-500/10 text-blue-400 rounded-lg"><DollarSign className="w-3.5 h-3.5" /></span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-white">
            ${metrics.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Across 5 asset classes
          </div>
        </div>

        {/* Today's P&L */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Today's P&L</span>
            <span className="p-1 bg-emerald-500/10 text-emerald-400 rounded-lg"><TrendingUp className="w-3.5 h-3.5" /></span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-emerald-400">
            +${metrics.todayPnL.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1 flex items-center text-[11px] text-emerald-400 font-medium">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>+{metrics.todayPnLPct.toFixed(2)}% Live Ticks</span>
          </div>
        </div>

        {/* Overall Returns (Absolute & XIRR) */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Overall Returns</span>
            <span className="p-1 bg-purple-500/10 text-purple-400 rounded-lg font-mono text-[9px]">XIRR</span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-white">
            +{metrics.absoluteReturnsPct.toFixed(1)}%
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-300">
            <span>Abs: +${(metrics.absoluteReturns / 1000).toFixed(1)}k</span>
            <span className="font-semibold text-purple-400 font-mono">XIRR: {metrics.xirrPct.toFixed(1)}%</span>
          </div>
        </div>

        {/* Available Cash / Margin */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-xl hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>{mode === 'pro' ? 'Available Margin (4x)' : 'Available Cash'}</span>
            <span className="p-1 bg-amber-500/10 text-amber-400 rounded-lg"><Zap className="w-3.5 h-3.5" /></span>
          </div>
          <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-white">
            ${(metrics.cashBalance * (mode === 'pro' ? 4 : 1)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1">
            <button 
              onClick={() => {
                quickDeposit(1000);
                showNotification("Instant Deposit of $1,000 added to account!");
              }}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 transition"
            >
              + Quick $1k Deposit
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE SPECIFIC VIEWPORT: SIMPLE MODE                                      */}
      {/* ========================================================================= */}
      {mode === 'simple' && (
        <div className="space-y-6">
          {/* 1. ASSET ALLOCATION DONUT & BREAKDOWN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SVG Donut Visualizer */}
            <div className="lg:col-span-1 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center relative">
              <div className="w-full flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
                  <PieIcon className="w-4 h-4 text-emerald-400" />
                  Portfolio Asset Allocation
                </h2>
                <span className="text-[11px] font-mono text-slate-500">5 Classes</span>
              </div>

              <div className="relative flex items-center justify-center my-4">
                <svg width={size} height={size} className="transform -rotate-90">
                  {allocations.map((slice) => {
                    const strokeDasharray = `${(slice.percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                    accumulatedPercent += slice.percentage;
                    const isSelected = selectedAssetClass === slice.name;

                    return (
                      <circle
                        key={slice.id}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke={slice.color}
                        strokeWidth={isSelected ? strokeWidth + 6 : strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="cursor-pointer transition-all duration-300 hover:opacity-100 opacity-90"
                        onClick={() => setSelectedAssetClass(selectedAssetClass === slice.name ? null : slice.name)}
                      />
                    );
                  })}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-xs text-slate-400 font-semibold">
                    {selectedAssetClass || 'Total Portfolio'}
                  </span>
                  <span className="text-xl font-bold font-mono text-white">
                    ${(metrics.netWorth / 1000).toFixed(1)}k
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Diversified
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 text-center font-mono">
                Click segment to filter holdings below
              </div>
            </div>

            {/* Holdings breakdown table */}
            <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                  Asset Class Allocation Summary
                </h2>
                {selectedAssetClass && (
                  <button 
                    onClick={() => setSelectedAssetClass(null)}
                    className="text-xs text-emerald-400 underline font-mono"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-800/80">
                {allocations
                  .filter(a => !selectedAssetClass || a.name === selectedAssetClass)
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedAssetClass(selectedAssetClass === item.name ? null : item.name)}
                      className="py-3.5 px-3 flex items-center justify-between rounded-xl hover:bg-slate-800/40 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <div>
                          <span className="text-sm font-bold text-white block">{item.name}</span>
                          <span className="text-xs text-slate-400 font-mono">{item.percentage}% target weight</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold font-mono text-white block">
                          ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <span className={`text-xs font-semibold flex items-center justify-end ${item.pnl24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {item.pnl24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          <span>{item.pnl24h >= 0 ? `+${item.pnl24h}%` : `${item.pnl24h}%`} (24h)</span>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* 2. GOAL-BASED SIP PLANNER & ONE-CLICK THEMATIC BASKETS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Goal-Based SIP Planner */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <Target className="w-4 h-4" /> Goal-Based Automated SIP Planner
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Target Goal Capital:</span>
                    <strong className="text-white font-mono">${sipTargetAmount.toLocaleString()}</strong>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={sipTargetAmount}
                    onChange={(e) => setSipTargetAmount(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Target Horizon:</span>
                    <strong className="text-white font-mono">{sipYears} Years</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Expected Portfolio CAGR:</span>
                    <strong className="text-white font-mono">{sipCAGR}%</strong>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="22"
                    step="1"
                    value={sipCAGR}
                    onChange={(e) => setSipCAGR(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                {/* Calculation Output Card */}
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-center">
                  <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block">Recommended Monthly SIP</span>
                  <div className="text-3xl font-black font-mono text-white my-1">
                    ${monthlySIPRequired.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ month</span>
                  </div>
                  <button
                    onClick={() => {
                      setupSIP("Goal Wealth Fund", monthlySIPRequired);
                      showNotification(`Automated monthly SIP of $${monthlySIPRequired}/mo scheduled!`);
                    }}
                    className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/20"
                  >
                    Activate Automated SIP
                  </button>
                </div>
              </div>
            </div>

            {/* One-Click Smart Thematic Baskets */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> One-Click Thematic Smart Baskets
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { name: 'Tech & AI Megacap Leaders', desc: 'NVDA, MSFT, GOOGL, AVGO', cagr: '34.2%', min: 500, risk: 'High Growth' },
                  { name: 'Bluechip Dividend Aristocrats', desc: 'JNJ, PG, KO, CVX', cagr: '14.8%', min: 250, risk: 'Defensive Income' },
                  { name: 'Clean Energy & Infrastructure', desc: 'NEE, ENPH, ICLN, FSLR', cagr: '21.5%', min: 300, risk: 'Thematic ESG' },
                ].map((basket, i) => (
                  <div key={i} className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{basket.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded font-semibold">{basket.risk}</span>
                      </div>
                      <span className="text-slate-400 text-xs block mt-0.5">{basket.desc}</span>
                      <span className="text-emerald-400 font-mono font-bold text-xs mt-1 block">3Y CAGR: +{basket.cagr}</span>
                    </div>

                    <button
                      onClick={() => {
                        executeTrade(basket.name, 'BUY', basket.min, 100);
                        showNotification(`Invested $${basket.min} into ${basket.name}!`);
                      }}
                      className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-md shadow-emerald-500/20 active:scale-95"
                    >
                      Invest ${basket.min}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE SPECIFIC VIEWPORT: PRO TERMINAL MODE                                */}
      {/* ========================================================================= */}
      {mode === 'pro' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Pane: Virtualized Live Watchlist (3 Cols) */}
          <div className="lg:col-span-3 h-[600px]">
            <VirtualizedWatchlist />
          </div>

          {/* Center Pane: Multi-Timeframe Candlestick Chart (6 Cols) */}
          <div className="lg:col-span-6 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 flex flex-col justify-between h-[600px]">
            <div>
              {/* Instrument & Timeframe Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-lg text-white">{activeSymbol}</span>
                  <span className="text-lg font-mono font-bold text-emerald-400">${currentPrice.toFixed(2)}</span>
                  <span className={`text-xs font-mono font-bold ${change24hPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {change24hPct >= 0 ? `+${change24hPct}%` : `${change24hPct}%`}
                  </span>
                </div>

                {/* Timeframe Badges */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  {(['1m', '5m', '15m', '1h', '1D', '1W'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setActiveTimeframe(tf)}
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                        activeTimeframe === tf ? 'bg-slate-800 text-emerald-400' : 'text-slate-500 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Indicator Toggles */}
              <div className="flex items-center gap-2 mb-2 text-[10px] font-mono">
                <span className="text-slate-500 uppercase font-bold">Overlays:</span>
                {[
                  { key: 'rsi', label: 'RSI(14)' },
                  { key: 'macd', label: 'MACD' },
                  { key: 'bollinger', label: 'Bollinger' },
                  { key: 'ema20', label: 'EMA20' },
                ].map((ind) => (
                  <button
                    key={ind.key}
                    onClick={() => toggleIndicator(ind.key as any)}
                    className={`px-2 py-0.5 rounded border transition ${
                      (indicators as any)[ind.key]
                        ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>

              {/* Candlestick Canvas / SVG */}
              <div className="w-full overflow-x-auto my-2">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                  {/* Grid Lines */}
                  {[0.2, 0.4, 0.6, 0.8].map((pct, idx) => {
                    const y = chartHeight * pct;
                    const pLabel = (maxP - (pct * priceRange)).toFixed(1);
                    return (
                      <g key={idx}>
                        <line x1="20" y1={y} x2={chartWidth - 20} y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                        <text x={chartWidth - 15} y={y + 3} fill="#64748B" fontSize="9" fontFamily="monospace" textAnchor="end">
                          ${pLabel}
                        </text>
                      </g>
                    );
                  })}

                  {/* Candlesticks */}
                  {candles.map((candle, idx) => {
                    const x = 30 + idx * candleSpacing;
                    const isBull = candle.close >= candle.open;
                    const color = isBull ? '#10B981' : '#F43F5E';
                    const bodyTop = getY(Math.max(candle.open, candle.close));
                    const bodyBottom = getY(Math.min(candle.open, candle.close));
                    const bodyHeight = Math.max(2, bodyBottom - bodyTop);

                    return (
                      <g key={idx}>
                        <line x1={x} y1={getY(candle.high)} x2={x} y2={getY(candle.low)} stroke={color} strokeWidth="1.2" />
                        <rect x={x - 3.5} y={bodyTop} width="7" height={bodyHeight} fill={color} rx="1" />
                      </g>
                    );
                  })}

                  {/* Bollinger Bands Overlay Simulation if enabled */}
                  {indicators.bollinger && (
                    <path
                      d={candles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${30 + i * candleSpacing} ${getY(c.close * 1.008)}`).join(' ')}
                      fill="none"
                      stroke="#818CF8"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.6"
                    />
                  )}

                  {/* Current Live Guide */}
                  <line x1="20" y1={getY(currentPrice)} x2={chartWidth - 20} y2={getY(currentPrice)} stroke="#10B981" strokeWidth="1" strokeDasharray="4 2" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
              <span>Streaming Tick Feed: Latency &lt;14ms</span>
              <button 
                onClick={onOpenAIModal}
                className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Launch AI Horizon Simulator
              </button>
            </div>
          </div>

          {/* Right Pane: L2 Order Book & Advanced Order Ticket (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* L2 Depth */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">L2 Market Depth</span>
                <span className="text-[10px] font-mono text-slate-400">Spread: ${orderBook.spread}</span>
              </div>

              {/* Asks */}
              <div className="space-y-1 text-[11px] font-mono">
                {orderBook.asks.slice(0, 4).reverse().map((ask, i) => (
                  <div key={i} className="flex justify-between items-center relative py-0.5">
                    <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10 rounded" style={{ width: `${Math.min(100, (ask.total / 1200) * 100)}%` }} />
                    <span className="text-rose-400 font-semibold z-10">${ask.price.toFixed(2)}</span>
                    <span className="text-slate-400 z-10">{ask.size}</span>
                  </div>
                ))}
              </div>

              {/* Mid Banner */}
              <div className="py-1 px-2 bg-slate-950 border-y border-slate-800 my-1 flex justify-between items-center font-mono text-xs">
                <span className="font-bold text-white">${currentPrice.toFixed(2)}</span>
                <span className="text-[10px] text-emerald-400">Mid Tick</span>
              </div>

              {/* Bids */}
              <div className="space-y-1 text-[11px] font-mono">
                {orderBook.bids.slice(0, 4).map((bid, i) => (
                  <div key={i} className="flex justify-between items-center relative py-0.5">
                    <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 rounded" style={{ width: `${Math.min(100, (bid.total / 1200) * 100)}%` }} />
                    <span className="text-emerald-400 font-semibold z-10">${bid.price.toFixed(2)}</span>
                    <span className="text-slate-400 z-10">{bid.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Order Ticket */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4">
              <form onSubmit={handleProOrderSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSide('BUY')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                      side === 'BUY' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    BUY / LONG
                  </button>
                  <button
                    type="button"
                    onClick={() => setSide('SELL')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                      side === 'SELL' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    SELL / SHORT
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-semibold">
                  {(['MARKET', 'LIMIT', 'STOP_LOSS', 'BRACKET'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setOrderType(t)}
                      className={`py-1 rounded-lg ${orderType === t ? 'bg-slate-800 text-white' : 'text-slate-500'}`}
                    >
                      {t === 'STOP_LOSS' ? 'STOP' : t === 'BRACKET' ? 'OCO' : t}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-400 block mb-1">Shares</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-1 text-xs text-white font-mono"
                  />
                </div>

                {orderType !== 'MARKET' && (
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 block mb-1">Limit Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                )}

                {orderType === 'BRACKET' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-rose-400 font-semibold block">Stop Loss</label>
                      <input
                        type="number"
                        step="0.01"
                        value={stopLoss}
                        onChange={(e) => setStopLoss(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-emerald-400 font-semibold block">Take Profit</label>
                      <input
                        type="number"
                        step="0.01"
                        value={takeProfit}
                        onChange={(e) => setTakeProfit(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-2 rounded-xl font-bold text-xs transition shadow-md ${
                    side === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950' : 'bg-rose-500 hover:bg-rose-400 text-white'
                  }`}
                >
                  Place {side} {orderType} Order
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING ACTION TOOLBAR */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-slate-900/85 backdrop-blur-2xl border border-slate-700 py-2 px-6 rounded-full shadow-2xl flex items-center gap-4">
          <button 
            onClick={() => setMode(mode === 'simple' ? 'pro' : 'simple')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-full transition"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Switch to {mode === 'simple' ? 'Pro Terminal' : 'Simple Mode'}</span>
          </button>

          <button 
            onClick={() => {
              quickDeposit(2500);
              showNotification("Instant Deposit of $2,500 credited to Margin balance!");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full transition shadow-lg shadow-emerald-500/20"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Deposit $2.5k</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button 
            onClick={onOpenAIModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-full transition shadow-lg shadow-purple-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            <span>AI Predictive Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
};
