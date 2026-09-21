import React, { useState, useEffect } from 'react';
import { useMarketStore } from '../../stores/useMarketStore';
import { usePortfolioStore } from '../../stores/usePortfolioStore';
import { 
  Activity, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  CheckCircle2
} from 'lucide-react';

export const TradingTerminal: React.FC = () => {
  const { 
    activeSymbol, 
    activeTimeframe, 
    currentPrice, 
    change24hPct, 
    candles, 
    orderBook, 
    setActiveSymbol, 
    setActiveTimeframe, 
    streamNextTick 
  } = useMarketStore();

  const { executeTrade, metrics } = usePortfolioStore();

  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP_LOSS' | 'BRACKET'>('MARKET');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [shares, setShares] = useState('10');
  const [limitPrice, setLimitPrice] = useState(currentPrice.toString());
  const [stopLoss, setStopLoss] = useState((currentPrice * 0.95).toFixed(2));
  const [takeProfit, setTakeProfit] = useState((currentPrice * 1.10).toFixed(2));
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stream live candle ticks every 1.8 seconds for hyper-responsive trading feel
  useEffect(() => {
    const timer = setInterval(() => {
      streamNextTick();
    }, 1800);
    return () => clearInterval(timer);
  }, [streamNextTick]);

  // Keep limit price synced when switching symbols
  useEffect(() => {
    setLimitPrice(currentPrice.toFixed(2));
    setStopLoss((currentPrice * 0.95).toFixed(2));
    setTakeProfit((currentPrice * 1.10).toFixed(2));
  }, [currentPrice]);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(shares) || 1;
    const price = orderType === 'MARKET' ? currentPrice : parseFloat(limitPrice) || currentPrice;
    const total = qty * price;

    executeTrade(activeSymbol, side, total, price);
    setToastMessage(`Filled ${orderType} ${side}: ${qty} ${activeSymbol} @ $${price.toFixed(2)} ($${total.toFixed(2)})`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Canvas / SVG Candlestick Math
  const chartWidth = 720;
  const chartHeight = 320;
  const prices = candles.flatMap(c => [c.low, c.high]);
  const minP = Math.min(...prices) * 0.998;
  const maxP = Math.max(...prices) * 1.002;
  const priceRange = maxP - minP || 1;

  const getY = (val: number) => chartHeight - 25 - ((val - minP) / priceRange) * (chartHeight - 50);
  const candleSpacing = (chartWidth - 60) / candles.length;

  return (
    <div className="space-y-4 pb-20 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#19C3E6] text-slate-950 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP TICKER & INSTRUMENT BAR */}
      <div className="bg-[#12161D] backdrop-blur-xl border border-[#28313D] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {['NVDA', 'BTC', 'SPY', 'AAPL'].map((sym) => (
              <button
                key={sym}
                onClick={() => setActiveSymbol(sym)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                  activeSymbol === sym
                    ? 'bg-[#19C3E6] text-slate-950 shadow-md shadow-[#19C3E6]/20'
                    : 'bg-[#171C24] text-[#9AA6B2] hover:text-[#F4F7FA]'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-[#171C24] hidden sm:block" />

          <div className="flex items-baseline gap-2">
            <span className="text-xl font-mono font-bold text-[#F4F7FA] tracking-tight">
              ${currentPrice.toFixed(2)}
            </span>
            <span className={`text-xs font-mono font-bold flex items-center ${change24hPct >= 0 ? 'text-[#42D392]' : 'text-[#FF5C5C]'}`}>
              {change24hPct >= 0 ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {change24hPct >= 0 ? `+${change24hPct}%` : `${change24hPct}%`}
            </span>
          </div>
        </div>

        {/* Timeframe Selectors */}
        <div className="flex items-center gap-1 bg-[#0B0D12] p-1 rounded-xl border border-[#28313D]">
          {(['1m', '5m', '15m', '1h', '1D', '1W'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg transition ${
                activeTimeframe === tf
                  ? 'bg-[#171C24] text-[#42D392] shadow-sm'
                  : 'text-[#5A6572] hover:text-[#9AA6B2]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* 3-COLUMN WORKSPACE: CANDLESTICK CANVAS, L2 ORDER BOOK, AND ADVANCED ORDER TICKET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Candlestick Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-[#12161D] backdrop-blur-xl border border-[#28313D] rounded-xl p-5 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-semibold text-[#9AA6B2] uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#42D392]" />
                Multi-Timeframe Candlestick Engine
              </span>
              <div className="flex items-center gap-3 font-mono text-[#9AA6B2] text-[11px]">
                <span>EMA 20: <strong className="text-[#3B82F6]">${(currentPrice * 0.992).toFixed(2)}</strong></span>
                <span>RSI (14): <strong className="text-[#A855F7]">58.4</strong></span>
                <span>VWAP: <strong className="text-[#F4B860]">${(currentPrice * 0.998).toFixed(2)}</strong></span>
              </div>
            </div>

            {/* SVG Candlestick Canvas */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                {/* Horizontal grid lines */}
                {[0.2, 0.4, 0.6, 0.8].map((pct, idx) => {
                  const y = chartHeight * pct;
                  const priceLabel = (maxP - (pct * priceRange)).toFixed(1);
                  return (
                    <g key={idx}>
                      <line x1="20" y1={y} x2={chartWidth - 20} y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                      <text x={chartWidth - 15} y={y + 3} fill="#64748B" fontSize="9" fontFamily="monospace" textAnchor="end">
                        ${priceLabel}
                      </text>
                    </g>
                  );
                })}

                {/* Candlesticks */}
                {candles.map((candle, idx) => {
                  const x = 35 + idx * candleSpacing;
                  const isBull = candle.close >= candle.open;
                  const color = isBull ? '#10B981' : '#F43F5E';
                  const bodyTop = getY(Math.max(candle.open, candle.close));
                  const bodyBottom = getY(Math.min(candle.open, candle.close));
                  const bodyHeight = Math.max(2, bodyBottom - bodyTop);

                  return (
                    <g key={idx} className="cursor-crosshair">
                      {/* High-Low Wick */}
                      <line
                        x1={x}
                        y1={getY(candle.high)}
                        x2={x}
                        y2={getY(candle.low)}
                        stroke={color}
                        strokeWidth="1.2"
                      />
                      {/* Open-Close Candle Body */}
                      <rect
                        x={x - 4}
                        y={bodyTop}
                        width="8"
                        height={bodyHeight}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })}

                {/* Live Current Price Horizontal Guide */}
                <line
                  x1="20"
                  y1={getY(currentPrice)}
                  x2={chartWidth - 20}
                  y2={getY(currentPrice)}
                  stroke="#10B981"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#5A6572] pt-3 border-t border-[#28313D]">
            <span>Aggregated Feed: Zero-Latency Real-Time Tick Stream</span>
            <span>Spread: <strong>{orderBook.spreadBps} bps</strong></span>
          </div>
        </div>

        {/* L2 Order Book Depth Ladder (2.5 Cols) */}
        <div className="lg:col-span-2 bg-[#12161D] backdrop-blur-xl border border-[#28313D] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#9AA6B2] uppercase tracking-wider">L2 Depth</span>
              <span className="text-[10px] font-mono text-[#9AA6B2]">Spread: ${orderBook.spread}</span>
            </div>

            {/* Asks (Red) */}
            <div className="space-y-1 text-[11px] font-mono mb-2">
              {orderBook.asks.slice(0, 5).reverse().map((ask, i) => (
                <div key={i} className="flex justify-between items-center relative py-0.5">
                  <div 
                    className="absolute right-0 top-0 bottom-0 bg-[#FF5C5C]/10 rounded-sm"
                    style={{ width: `${Math.min(100, (ask.total / 1500) * 100)}%` }}
                  />
                  <span className="text-[#FF5C5C] font-semibold z-10">${ask.price.toFixed(2)}</span>
                  <span className="text-[#9AA6B2] z-10">{ask.size}</span>
                </div>
              ))}
            </div>

            {/* Mid Market Price Banner */}
            <div className="py-2 px-3 bg-[#0B0D12] border-y border-[#28313D] my-2 flex justify-between items-center font-mono">
              <span className="text-xs font-bold text-[#F4F7FA]">${currentPrice.toFixed(2)}</span>
              <span className="text-[10px] text-[#42D392]">Live Mid</span>
            </div>

            {/* Bids (Green) */}
            <div className="space-y-1 text-[11px] font-mono">
              {orderBook.bids.slice(0, 5).map((bid, i) => (
                <div key={i} className="flex justify-between items-center relative py-0.5">
                  <div 
                    className="absolute right-0 top-0 bottom-0 bg-[#103B46] rounded-sm"
                    style={{ width: `${Math.min(100, (bid.total / 1500) * 100)}%` }}
                  />
                  <span className="text-[#42D392] font-semibold z-10">${bid.price.toFixed(2)}</span>
                  <span className="text-[#9AA6B2] z-10">{bid.size}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-[#28313D] text-[10px] text-[#5A6572] font-mono text-center">
            Cumulative Depth Buffer
          </div>
        </div>

        {/* Advanced Order Ticket (2.5 Cols) */}
        <div className="lg:col-span-3 bg-[#12161D] backdrop-blur-xl border border-[#28313D] rounded-xl p-4 flex flex-col justify-between">
          <form onSubmit={handleOrderSubmit} className="space-y-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#9AA6B2] uppercase tracking-wider">Order Ticket</span>
              <span className="text-[10px] font-mono text-[#42D392] font-semibold">Ready</span>
            </div>

            {/* Buy / Sell Tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSide('BUY')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                  side === 'BUY'
                    ? 'bg-[#19C3E6] text-slate-950 shadow-md shadow-[#19C3E6]/20'
                    : 'bg-[#171C24] text-[#9AA6B2]'
                }`}
              >
                BUY / LONG
              </button>
              <button
                type="button"
                onClick={() => setSide('SELL')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition ${
                  side === 'SELL'
                    ? 'bg-[#FF5C5C] text-[#F4F7FA] shadow-md shadow-[#FF5C5C]/20'
                    : 'bg-[#171C24] text-[#9AA6B2]'
                }`}
              >
                SELL / SHORT
              </button>
            </div>

            {/* Order Type Selector */}
            <div className="grid grid-cols-4 gap-1 bg-[#0B0D12] p-1 rounded-xl border border-[#28313D] text-[10px] font-semibold">
              {(['MARKET', 'LIMIT', 'STOP_LOSS', 'BRACKET'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`py-1 rounded-lg transition ${
                    orderType === type ? 'bg-[#171C24] text-[#F4F7FA]' : 'text-[#5A6572] hover:text-[#9AA6B2]'
                  }`}
                >
                  {type === 'STOP_LOSS' ? 'STOP' : type === 'BRACKET' ? 'OCO' : type}
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div>
              <label className="text-[11px] font-semibold text-[#9AA6B2] block mb-1">Quantity (Units)</label>
              <input
                type="number"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                className="w-full bg-[#171C24] border border-[#28313D] rounded-xl px-3 py-1.5 text-xs text-[#F4F7FA] font-mono focus:outline-none focus:border-[#42D392]"
              />
            </div>

            {/* Limit Price Input if needed */}
            {orderType !== 'MARKET' && (
              <div>
                <label className="text-[11px] font-semibold text-[#9AA6B2] block mb-1">Limit Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="w-full bg-[#171C24] border border-[#28313D] rounded-xl px-3 py-1.5 text-xs text-[#F4F7FA] font-mono focus:outline-none focus:border-[#42D392]"
                />
              </div>
            )}

            {/* Bracket Fields */}
            {orderType === 'BRACKET' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-[#FF5C5C] block mb-1">Stop Loss ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full bg-[#171C24] border border-[#28313D] rounded-xl px-2 py-1 text-xs text-[#F4F7FA] font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-[#42D392] block mb-1">Take Profit ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    className="w-full bg-[#171C24] border border-[#28313D] rounded-xl px-2 py-1 text-xs text-[#F4F7FA] font-mono focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Estimated Value & Cash balance check */}
            <div className="p-3 bg-[#0B0D12]/80 rounded-xl border border-[#28313D] text-[11px] space-y-1">
              <div className="flex justify-between text-[#9AA6B2]">
                <span>Estimated Value:</span>
                <span className="font-mono font-bold text-[#F4F7FA]">
                  ${((parseFloat(shares) || 0) * (orderType === 'MARKET' ? currentPrice : parseFloat(limitPrice) || currentPrice)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#9AA6B2]">
                <span>Available Margin:</span>
                <span className="font-mono text-[#42D392]">${metrics.cashBalance.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition shadow-lg active:scale-95 flex items-center justify-center gap-1.5 ${
                side === 'BUY'
                  ? 'bg-[#19C3E6] hover:bg-[#14A8C7] text-slate-950 shadow-[#19C3E6]/20'
                  : 'bg-[#FF5C5C] hover:bg-[#FF5C5C] text-[#F4F7FA] shadow-[#FF5C5C]/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5" /> Place {side} {orderType} Order
            </button>
          </form>

          <div className="text-[10px] text-[#5A6572] text-center font-mono mt-2">
            Margin Multiplier: 4x Intra-Day Enabled
          </div>
        </div>
      </div>
    </div>
  );
};
