import React, { useState } from 'react';
import type { ForecastHorizon, PredictionPayload } from '../../types';
import { 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  Gauge, 
  Sparkles 
} from 'lucide-react';

interface AIPredictiveChartWrapperProps {
  initialSymbol?: string;
  onClose?: () => void;
}

const PREDICTION_DATA: Record<string, Record<ForecastHorizon, PredictionPayload>> = {
  NVDA: {
    '1Y': {
      symbol: 'NVDA',
      assetName: 'NVIDIA Corporation',
      assetClass: 'Stocks',
      currentPrice: 130.40,
      horizon: '1Y',
      modelConfidenceScore: 89.2,
      bands: { optimistic: 182.50, expected: 156.20, conservative: 118.90 },
      projectedPoints: [
        { date: 'Current', historicalClose: 130.40, expected: 130.40, optimistic: 130.40, conservative: 130.40 },
        { date: 'Q1', expected: 138.00, optimistic: 145.00, conservative: 125.00 },
        { date: 'Q2', expected: 144.50, optimistic: 158.00, conservative: 121.00 },
        { date: 'Q3', expected: 151.00, optimistic: 170.00, conservative: 119.50 },
        { date: '1Y Target', expected: 156.20, optimistic: 182.50, conservative: 118.90 },
      ],
      sentiment: {
        compositeScore: 78,
        label: 'Bullish',
        newsScore: 82,
        socialVolumeScore: 74,
        insiderActivityScore: 70,
        headlineSummary: 'High AI data-center capex reaffirmed by hyperscale cloud operators.',
      },
      disclaimerText: 'Monte Carlo geometric simulation with drift (μ=18.4%) and annual volatility (σ=42.1%).',
    },
    '3Y': {
      symbol: 'NVDA',
      assetName: 'NVIDIA Corporation',
      assetClass: 'Stocks',
      currentPrice: 130.40,
      horizon: '3Y',
      modelConfidenceScore: 78.4,
      bands: { optimistic: 245.00, expected: 198.50, conservative: 104.20 },
      projectedPoints: [
        { date: 'Current', historicalClose: 130.40, expected: 130.40, optimistic: 130.40, conservative: 130.40 },
        { date: 'Year 1', expected: 156.20, optimistic: 182.50, conservative: 118.90 },
        { date: 'Year 2', expected: 176.00, optimistic: 212.00, conservative: 110.00 },
        { date: 'Year 3', expected: 198.50, optimistic: 245.00, conservative: 104.20 },
      ],
      sentiment: {
        compositeScore: 72,
        label: 'Bullish',
        newsScore: 75,
        socialVolumeScore: 70,
        insiderActivityScore: 68,
        headlineSummary: 'Sustained enterprise software agent deployments expanding semiconductor TAM.',
      },
      disclaimerText: 'Multi-year autoregressive projection with expanding variance bands (3-Year forecast envelope).',
    },
    '5Y': {
      symbol: 'NVDA',
      assetName: 'NVIDIA Corporation',
      assetClass: 'Stocks',
      currentPrice: 130.40,
      horizon: '5Y',
      modelConfidenceScore: 64.8,
      bands: { optimistic: 330.00, expected: 240.00, conservative: 88.00 },
      projectedPoints: [
        { date: 'Current', historicalClose: 130.40, expected: 130.40, optimistic: 130.40, conservative: 130.40 },
        { date: 'Year 1', expected: 156.20, optimistic: 182.50, conservative: 118.90 },
        { date: 'Year 3', expected: 198.50, optimistic: 245.00, conservative: 104.20 },
        { date: 'Year 5', expected: 240.00, optimistic: 330.00, conservative: 88.00 },
      ],
      sentiment: {
        compositeScore: 65,
        label: 'Bullish',
        newsScore: 68,
        socialVolumeScore: 64,
        insiderActivityScore: 60,
        headlineSummary: 'Autonomous mobility and humanoid robotics extending structural compute demand.',
      },
      disclaimerText: 'Macroeconomic secular compounding simulation with wider long-horizon intervals.',
    },
  },
  BTC: {
    '1Y': {
      symbol: 'BTC',
      assetName: 'Bitcoin (USD)',
      assetClass: 'Crypto',
      currentPrice: 64200.00,
      horizon: '1Y',
      modelConfidenceScore: 81.5,
      bands: { optimistic: 98000.00, expected: 82500.00, conservative: 48000.00 },
      projectedPoints: [
        { date: 'Current', expected: 64200, optimistic: 64200, conservative: 64200 },
        { date: 'Q1', expected: 69000, optimistic: 74000, conservative: 58000 },
        { date: 'Q2', expected: 73500, optimistic: 81000, conservative: 54000 },
        { date: 'Q3', expected: 78000, optimistic: 89000, conservative: 51000 },
        { date: '1Y Target', expected: 82500, optimistic: 98000, conservative: 48000 },
      ],
      sentiment: {
        compositeScore: 74,
        label: 'Bullish',
        newsScore: 78,
        socialVolumeScore: 82,
        insiderActivityScore: 62,
        headlineSummary: 'Institutional spot ETF net inflows accelerating alongside global liquidity expansion.',
      },
      disclaimerText: 'High-volatility crypto asset simulation utilizing log-normal distribution with 65% annualized σ.',
    },
    '3Y': {
      symbol: 'BTC',
      assetName: 'Bitcoin (USD)',
      assetClass: 'Crypto',
      currentPrice: 64200.00,
      horizon: '3Y',
      modelConfidenceScore: 71.0,
      bands: { optimistic: 165000.00, expected: 125000.00, conservative: 42000.00 },
      projectedPoints: [
        { date: 'Current', expected: 64200, optimistic: 64200, conservative: 64200 },
        { date: 'Year 1', expected: 82500, optimistic: 98000, conservative: 48000 },
        { date: 'Year 2', expected: 102000, optimistic: 130000, conservative: 45000 },
        { date: 'Year 3', expected: 125000, optimistic: 165000, conservative: 42000 },
      ],
      sentiment: {
        compositeScore: 70,
        label: 'Bullish',
        newsScore: 72,
        socialVolumeScore: 76,
        insiderActivityScore: 60,
        headlineSummary: 'Post-halving stock-to-flow tightening dynamics supporting long-term valuation floors.',
      },
      disclaimerText: 'Multi-year power law regression combined with rolling 4-year halving cycle drift.',
    },
    '5Y': {
      symbol: 'BTC',
      assetName: 'Bitcoin (USD)',
      assetClass: 'Crypto',
      currentPrice: 64200.00,
      horizon: '5Y',
      modelConfidenceScore: 58.4,
      bands: { optimistic: 250000.00, expected: 175000.00, conservative: 35000.00 },
      projectedPoints: [
        { date: 'Current', expected: 64200, optimistic: 64200, conservative: 64200 },
        { date: 'Year 1', expected: 82500, optimistic: 98000, conservative: 48000 },
        { date: 'Year 3', expected: 125000, optimistic: 165000, conservative: 42000 },
        { date: 'Year 5', expected: 175000, optimistic: 250000, conservative: 35000 },
      ],
      sentiment: {
        compositeScore: 66,
        label: 'Bullish',
        newsScore: 67,
        socialVolumeScore: 70,
        insiderActivityScore: 58,
        headlineSummary: 'Sovereign wealth funds and corporate treasury reserve diversification thesis.',
      },
      disclaimerText: 'Secular store-of-value adoption modeling with wide confidence boundaries.',
    },
  },
};

export const AIPredictiveChartWrapper: React.FC<AIPredictiveChartWrapperProps> = ({ initialSymbol = 'NVDA' }) => {
  const [activeSymbol, setActiveSymbol] = useState<string>(initialSymbol in PREDICTION_DATA ? initialSymbol : 'NVDA');
  const [horizon, setHorizon] = useState<ForecastHorizon>('1Y');

  const activeData = PREDICTION_DATA[activeSymbol][horizon];

  // Canvas / SVG Dimensions
  const width = 640;
  const height = 240;
  const maxVal = activeData.bands.optimistic * 1.08;
  const minVal = activeData.bands.conservative * 0.90;
  const range = maxVal - minVal || 1;

  const getX = (idx: number) => 40 + (idx / (activeData.projectedPoints.length - 1)) * (width - 80);
  const getY = (val: number) => height - 35 - ((val - minVal) / range) * (height - 65);

  // SVG Area Paths
  const upperPath = activeData.projectedPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.optimistic)}`).join(' ');
  const lowerPath = [...activeData.projectedPoints].reverse().map((pt, i) => `L ${getX(activeData.projectedPoints.length - 1 - i)} ${getY(pt.conservative)}`).join(' ');
  const bandPath = `${upperPath} ${lowerPath} Z`;
  const expectedLinePath = activeData.projectedPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.expected)}`).join(' ');

  return (
    <div className="bg-[#12161D] border border-[#28313D] rounded-2xl p-6 lg:p-8 shadow-2xl backdrop-blur-2xl text-[#F4F7FA] max-w-5xl mx-auto space-y-6">
      {/* HEADER WITH SYMBOL & HORIZON TOGGLES */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#28313D] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#A855F7]/15 border border-[#A855F7]/30 text-[#A855F7] rounded-xl shadow-inner">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#F4F7FA] tracking-tight">{activeData.assetName}</h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#171C24] text-[#9AA6B2] rounded-md">
                {activeData.symbol}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-[#A855F7]/15 text-[#A855F7] rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Forecasting
              </span>
            </div>
            <p className="text-xs text-[#9AA6B2] mt-1">
              Current: <strong className="text-[#F4F7FA] font-mono">${activeData.currentPrice.toLocaleString()}</strong> · Confidence Score: <strong className="text-[#42D392] font-mono">{activeData.modelConfidenceScore}%</strong>
            </p>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-3">
          {/* Symbol Toggle */}
          <div className="flex items-center bg-[#171C24] p-1 rounded-xl border border-[#28313D]">
            {['NVDA', 'BTC'].map((sym) => (
              <button
                key={sym}
                onClick={() => setActiveSymbol(sym)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition ${
                  activeSymbol === sym ? 'bg-[#171C24] text-[#F4F7FA] shadow' : 'text-[#9AA6B2] hover:text-[#F4F7FA]'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>

          {/* Horizon Toggle */}
          <div className="flex items-center bg-[#171C24] p-1 rounded-xl border border-[#28313D]">
            {(['1Y', '3Y', '5Y'] as ForecastHorizon[]).map((hz) => (
              <button
                key={hz}
                onClick={() => setHorizon(hz)}
                className={`px-3.5 py-1 text-xs font-bold rounded-lg transition ${
                  horizon === hz ? 'bg-[#A855F7] text-[#F4F7FA] shadow-lg shadow-[#A855F7]/20' : 'text-[#9AA6B2] hover:text-[#F4F7FA]'
                }`}
              >
                {hz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2-COLUMN DISPLAY: CONFIDENCE ENVELOPE & SENTIMENT SPEEDOMETER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Canvas Chart */}
        <div className="lg:col-span-2 bg-[#0B0D12] border border-[#28313D] p-5 rounded-xl relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#9AA6B2] uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#A855F7]" />
                Monte Carlo Projected Variance Envelope
              </span>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-[#42D392]"><span className="w-2 h-2 rounded-full bg-[#42D392]" /> +2σ Bull</span>
                <span className="flex items-center gap-1 text-[#A855F7]"><span className="w-2 h-2 rounded-full bg-[#A855F7]" /> μ Expected</span>
                <span className="flex items-center gap-1 text-[#F4B860]"><span className="w-2 h-2 rounded-full bg-[#F4B860]" /> -2σ Bear</span>
              </div>
            </div>

            {/* SVG Visualizer */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                <path d={bandPath} fill="rgba(168, 85, 247, 0.12)" />
                <path d={upperPath} fill="none" stroke="#42D392" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d={expectedLinePath} fill="none" stroke="#A855F7" strokeWidth="2.5" />
                <path d={activeData.projectedPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.conservative)}`).join(' ')} fill="none" stroke="#F4B860" strokeWidth="1.5" strokeDasharray="4 4" />

                {activeData.projectedPoints.map((pt, i) => (
                  <g key={i}>
                    <circle cx={getX(i)} cy={getY(pt.expected)} r={4} fill="#A855F7" stroke="#0B0D12" strokeWidth={2} />
                    <text x={getX(i)} y={height - 10} textAnchor="middle" fill="#5A6572" fontSize="10" fontFamily="monospace">
                      {pt.date}
                    </text>
                    <text x={getX(i)} y={getY(pt.expected) - 10} textAnchor="middle" fill="#F4F7FA" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      ${pt.expected >= 1000 ? Math.round(pt.expected / 1000) + 'k' : pt.expected.toFixed(0)}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Three Target Boxes */}
          <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-[#28313D]">
            <div className="p-2.5 bg-[#103B46] rounded-xl border border-[#19C3E6]/20 text-center">
              <span className="text-[10px] text-[#42D392] font-bold uppercase block">Bullish (+2σ)</span>
              <span className="text-base font-bold text-[#F4F7FA] font-mono">${activeData.bands.optimistic.toLocaleString()}</span>
              <span className="text-[10px] text-[#42D392] block font-mono">
                +{(((activeData.bands.optimistic - activeData.currentPrice) / activeData.currentPrice) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="p-2.5 bg-[#A855F7]/15 rounded-xl border border-[#A855F7]/30 text-center">
              <span className="text-[10px] text-[#A855F7] font-bold uppercase block">Expected (μ)</span>
              <span className="text-base font-bold text-[#F4F7FA] font-mono">${activeData.bands.expected.toLocaleString()}</span>
              <span className="text-[10px] text-[#A855F7] block font-mono">
                +{(((activeData.bands.expected - activeData.currentPrice) / activeData.currentPrice) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="p-2.5 bg-[#F4B860]/10 rounded-xl border border-[#F4B860]/20 text-center">
              <span className="text-[10px] text-[#F4B860] font-bold uppercase block">Base Floor (-2σ)</span>
              <span className="text-base font-bold text-[#F4F7FA] font-mono">${activeData.bands.conservative.toLocaleString()}</span>
              <span className="text-[10px] text-[#F4B860] block font-mono">
                {(((activeData.bands.conservative - activeData.currentPrice) / activeData.currentPrice) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Sentiment Gauge */}
        <div className="bg-[#0B0D12] border border-[#28313D] p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#9AA6B2] uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-[#42D392]" />
                Aggregated Sentiment
              </span>
              <span className="px-2 py-0.5 bg-[#103B46] text-[#42D392] font-bold text-xs rounded-full">
                {activeData.sentiment.label}
              </span>
            </div>

            {/* Gauge Dial Visualizer */}
            <div className="flex flex-col items-center justify-center my-3">
              <div className="relative w-36 h-20 flex items-end justify-center">
                <div className="w-36 h-18 border-t-[14px] border-l-[14px] border-r-[14px] border-[#171C24] rounded-t-full absolute inset-0" />
                <div 
                  className="w-36 h-18 border-t-[14px] border-l-[14px] border-r-[14px] border-[#19C3E6] rounded-t-full absolute inset-0 opacity-80"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    transform: `rotate(${(activeData.sentiment.compositeScore / 100) * 180 - 180}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                />
                <span className="text-2xl font-black text-[#F4F7FA] font-mono z-10">
                  {activeData.sentiment.compositeScore}
                </span>
              </div>
              <span className="text-[11px] text-[#9AA6B2] mt-2 font-mono">0 (Fear) — 100 (Greed)</span>
            </div>

            {/* Sub-Score Bars */}
            <div className="space-y-2.5 mt-4 text-xs">
              <div>
                <div className="flex justify-between text-[#9AA6B2] mb-1">
                  <span>News NLP Sentiment</span>
                  <span className="font-mono text-[#F4F7FA]">{activeData.sentiment.newsScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#171C24] rounded-full overflow-hidden">
                  <div className="h-full bg-[#42D392] rounded-full" style={{ width: `${activeData.sentiment.newsScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#9AA6B2] mb-1">
                  <span>Social Buzz & Mentions</span>
                  <span className="font-mono text-[#F4F7FA]">{activeData.sentiment.socialVolumeScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#171C24] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: `${activeData.sentiment.socialVolumeScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#12161D] border border-[#28313D] rounded-xl mt-4 text-xs text-[#9AA6B2]">
            <span className="font-semibold text-[#A855F7] block mb-1">AI Intelligence Brief:</span>
            "{activeData.sentiment.headlineSummary}"
          </div>
        </div>
      </div>

      {/* REGULATORY COMPLIANCE WARNING */}
      <div className="p-4 bg-[#F4B860]/10 border border-[#F4B860]/20 rounded-xl flex items-start gap-3 text-[#F4B860] text-xs">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 text-[#F4B860] mt-0.5" />
        <div>
          <span className="font-bold text-[#F4B860] uppercase tracking-wide mr-1">Compliance & Risk Notice:</span>
          All algorithmic projections generated by AuraVest represent probabilistic statistical simulations based on historical log-return drift, autoregressive extrapolation, and sentiment scores. These figures do not represent guaranteed returns or fiduciary financial advice. Capital is subject to market risk.
        </div>
      </div>
    </div>
  );
};
