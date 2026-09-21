import React, { useState } from 'react';
import type { ForecastHorizon, PredictionPayload } from '../../types';
import { 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  Gauge, 
  Sparkles 
} from 'lucide-react';

const MULTI_ASSET_DATABASE: Record<string, Record<ForecastHorizon, PredictionPayload>> = {
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
        { date: 'Now', historicalClose: 130.40, expected: 130.40, optimistic: 130.40, conservative: 130.40 },
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
        headlineSummary: 'High AI data-center capex reaffirmed by cloud hyperscalers.',
      },
      disclaimerText: 'Monte Carlo geometric simulation with historical drift (μ=18.4%) and annual volatility (σ=42.1%).',
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
        { date: 'Now', historicalClose: 130.40, expected: 130.40, optimistic: 130.40, conservative: 130.40 },
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
        headlineSummary: 'Sustained sovereign AI infrastructure programs offsetting consumer refresh cycles.',
      },
      disclaimerText: 'Multi-year autoregressive projection with expanding variance bands (3-Year envelope).',
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
        { date: 'Now', historicalClose: 130.40, expected: 130.40, optimistic: 130.40, conservative: 130.40 },
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
        headlineSummary: 'Humanoid robotics and industrial digital twins expanding computing total addressable market.',
      },
      disclaimerText: 'Macroeconomic secular growth projection with wider confidence intervals due to long horizon.',
    },
  },
  SPY: {
    '1Y': {
      symbol: 'SPY',
      assetName: 'SPDR S&P 500 ETF Trust',
      assetClass: 'ETFs',
      currentPrice: 560.20,
      horizon: '1Y',
      modelConfidenceScore: 92.5,
      bands: { optimistic: 625.00, expected: 595.00, conservative: 520.00 },
      projectedPoints: [
        { date: 'Now', historicalClose: 560.20, expected: 560.20, optimistic: 560.20, conservative: 560.20 },
        { date: 'Q1', expected: 568.00, optimistic: 578.00, conservative: 545.00 },
        { date: 'Q2', expected: 576.00, optimistic: 592.00, conservative: 538.00 },
        { date: 'Q3', expected: 585.00, optimistic: 608.00, conservative: 530.00 },
        { date: '1Y Target', expected: 595.00, optimistic: 625.00, conservative: 520.00 },
      ],
      sentiment: {
        compositeScore: 68,
        label: 'Bullish',
        newsScore: 70,
        socialVolumeScore: 65,
        insiderActivityScore: 69,
        headlineSummary: 'Broad market earnings resilience supported by Federal Reserve monetary easing cycle.',
      },
      disclaimerText: 'Macroeconomic econometric regression based on historical S&P 500 earnings yield.',
    },
    '3Y': {
      symbol: 'SPY',
      assetName: 'SPDR S&P 500 ETF Trust',
      assetClass: 'ETFs',
      currentPrice: 560.20,
      horizon: '3Y',
      modelConfidenceScore: 84.1,
      bands: { optimistic: 710.00, expected: 660.00, conservative: 505.00 },
      projectedPoints: [
        { date: 'Now', historicalClose: 560.20, expected: 560.20, optimistic: 560.20, conservative: 560.20 },
        { date: 'Year 1', expected: 595.00, optimistic: 625.00, conservative: 520.00 },
        { date: 'Year 2', expected: 628.00, optimistic: 665.00, conservative: 512.00 },
        { date: 'Year 3', expected: 660.00, optimistic: 710.00, conservative: 505.00 },
      ],
      sentiment: {
        compositeScore: 66,
        label: 'Bullish',
        newsScore: 69,
        socialVolumeScore: 62,
        insiderActivityScore: 66,
        headlineSummary: 'Historical 3-year rolling average nominal equity risk premium remains favorable.',
      },
      disclaimerText: '3-Year historical mean-reversion modeling with 1.5 standard deviation bounds.',
    },
    '5Y': {
      symbol: 'SPY',
      assetName: 'SPDR S&P 500 ETF Trust',
      assetClass: 'ETFs',
      currentPrice: 560.20,
      horizon: '5Y',
      modelConfidenceScore: 76.8,
      bands: { optimistic: 820.00, expected: 740.00, conservative: 490.00 },
      projectedPoints: [
        { date: 'Now', historicalClose: 560.20, expected: 560.20, optimistic: 560.20, conservative: 560.20 },
        { date: 'Year 1', expected: 595.00, optimistic: 625.00, conservative: 520.00 },
        { date: 'Year 3', expected: 660.00, optimistic: 710.00, conservative: 505.00 },
        { date: 'Year 5', expected: 740.00, optimistic: 820.00, conservative: 490.00 },
      ],
      sentiment: {
        compositeScore: 64,
        label: 'Bullish',
        newsScore: 65,
        socialVolumeScore: 61,
        insiderActivityScore: 65,
        headlineSummary: 'Long-term corporate productivity gains compounding aggregate earnings per share.',
      },
      disclaimerText: 'Long-term secular compounding simulation based on 100-year historical S&P trends.',
    },
  },
};

export const AIPredictionEngine: React.FC = () => {
  const [activeAsset, setActiveAsset] = useState<string>('NVDA');
  const [selectedHorizon, setSelectedHorizon] = useState<ForecastHorizon>('1Y');

  const activeData = MULTI_ASSET_DATABASE[activeAsset][selectedHorizon];

  // SVG Projection Chart Dimensions
  const chartWidth = 620;
  const chartHeight = 230;
  const maxPrice = activeData.bands.optimistic * 1.08;
  const minPrice = activeData.bands.conservative * 0.88;

  const getX = (index: number) => 40 + (index / (activeData.projectedPoints.length - 1)) * (chartWidth - 80);
  const getY = (val: number) => chartHeight - 35 - ((val - minPrice) / (maxPrice - minPrice)) * (chartHeight - 65);

  // SVG Area path for the Confidence Interval Band
  const upperPath = activeData.projectedPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.optimistic)}`).join(' ');
  const lowerPath = [...activeData.projectedPoints].reverse().map((pt, i) => `L ${getX(activeData.projectedPoints.length - 1 - i)} ${getY(pt.conservative)}`).join(' ');
  const bandPath = `${upperPath} ${lowerPath} Z`;

  const expectedLinePath = activeData.projectedPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.expected)}`).join(' ');

  return (
    <div className="bg-[#12161D] border border-[#28313D] rounded-2xl p-6 lg:p-8 shadow-2xl backdrop-blur-2xl text-[#F4F7FA] max-w-5xl mx-auto space-y-6">
      {/* HEADER WITH ASSET PICKER & HORIZON SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#28313D] pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#A855F7]/15 border border-[#A855F7]/30 text-[#A855F7] rounded-xl">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[#F4F7FA]">{activeData.assetName}</h2>
              <span className="text-xs font-mono px-2 py-0.5 bg-[#171C24] text-[#9AA6B2] rounded-md">{activeData.symbol}</span>
              <span className="text-xs font-medium px-2 py-0.5 bg-[#A855F7]/15 text-[#A855F7] rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Forecasting
              </span>
            </div>
            <p className="text-xs text-[#9AA6B2] mt-1">
              Current Price: <span className="text-[#F4F7FA] font-mono font-bold">${activeData.currentPrice.toFixed(2)}</span> · Model Confidence: <span className="text-[#42D392] font-mono font-bold">{activeData.modelConfidenceScore}%</span>
            </p>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Asset Select */}
          <div className="flex items-center bg-[#171C24] p-1 rounded-xl border border-[#28313D]">
            {['NVDA', 'SPY'].map((sym) => (
              <button
                key={sym}
                onClick={() => setActiveAsset(sym)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeAsset === sym
                    ? 'bg-[#171C24] text-[#F4F7FA] shadow'
                    : 'text-[#9AA6B2] hover:text-[#F4F7FA]'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>

          {/* Horizon Pill Toggle */}
          <div className="flex items-center bg-[#171C24] p-1 rounded-xl border border-[#28313D]">
            {(['1Y', '3Y', '5Y'] as ForecastHorizon[]).map((hz) => (
              <button
                key={hz}
                onClick={() => setSelectedHorizon(hz)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedHorizon === hz
                    ? 'bg-[#A855F7] text-[#F4F7FA] shadow-lg shadow-[#A855F7]/20'
                    : 'text-[#9AA6B2] hover:text-[#F4F7FA]'
                }`}
              >
                {hz} Horizon
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: CONFIDENCE BAND PROJECTIONS & SENTIMENT SPEEDOMETER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Confidence Band Chart */}
        <div className="lg:col-span-2 bg-[#0B0D12] border border-[#28313D] p-5 rounded-xl relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#9AA6B2] uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#A855F7]" />
              Monte Carlo Probabilistic Trajectory
            </span>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-[#42D392]"><span className="w-2 h-2 rounded-full bg-[#42D392]" /> +2σ Optimistic</span>
              <span className="flex items-center gap-1 text-[#A855F7]"><span className="w-2 h-2 rounded-full bg-[#A855F7]" /> μ Expected</span>
              <span className="flex items-center gap-1 text-[#F4B860]"><span className="w-2 h-2 rounded-full bg-[#F4B860]" /> -2σ Conservative</span>
            </div>
          </div>

          {/* SVG Canvas Projection */}
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
              {/* Confidence interval shaded envelope */}
              <path d={bandPath} fill="rgba(168, 85, 247, 0.12)" stroke="none" />

              {/* Trajectory Guide Lines */}
              <path d={upperPath} fill="none" stroke="#42D392" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d={expectedLinePath} fill="none" stroke="#A855F7" strokeWidth="2.5" />
              <path d={activeData.projectedPoints.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.conservative)}`).join(' ')} fill="none" stroke="#F4B860" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Data points */}
              {activeData.projectedPoints.map((pt, i) => (
                <g key={i}>
                  <circle cx={getX(i)} cy={getY(pt.expected)} r={4} fill="#A855F7" stroke="#0B0D12" strokeWidth={2} />
                  <text x={getX(i)} y={chartHeight - 8} textAnchor="middle" fill="#5A6572" fontSize="10" fontFamily="monospace">
                    {pt.date}
                  </text>
                  <text x={getX(i)} y={getY(pt.expected) - 10} textAnchor="middle" fill="#F4F7FA" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    ${pt.expected.toFixed(0)}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Target Price Callout Cards */}
          <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-[#28313D]">
            <div className="p-2.5 bg-[#103B46] rounded-xl border border-[#19C3E6]/20 text-center">
              <span className="text-[10px] text-[#42D392] font-bold uppercase block">Bullish Target</span>
              <span className="text-base font-bold text-[#F4F7FA] font-mono">${activeData.bands.optimistic.toFixed(2)}</span>
              <span className="text-[10px] text-[#42D392] block font-mono">+{(((activeData.bands.optimistic - activeData.currentPrice) / activeData.currentPrice) * 100).toFixed(1)}%</span>
            </div>
            <div className="p-2.5 bg-[#A855F7]/15 rounded-xl border border-[#A855F7]/30 text-center">
              <span className="text-[10px] text-[#A855F7] font-bold uppercase block">Expected Target</span>
              <span className="text-base font-bold text-[#F4F7FA] font-mono">${activeData.bands.expected.toFixed(2)}</span>
              <span className="text-[10px] text-[#A855F7] block font-mono">+{(((activeData.bands.expected - activeData.currentPrice) / activeData.currentPrice) * 100).toFixed(1)}%</span>
            </div>
            <div className="p-2.5 bg-[#F4B860]/10 rounded-xl border border-[#F4B860]/20 text-center">
              <span className="text-[10px] text-[#F4B860] font-bold uppercase block">Base Floor</span>
              <span className="text-base font-bold text-[#F4F7FA] font-mono">${activeData.bands.conservative.toFixed(2)}</span>
              <span className="text-[10px] text-[#F4B860] block font-mono">{(((activeData.bands.conservative - activeData.currentPrice) / activeData.currentPrice) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Market Sentiment Gauge */}
        <div className="bg-[#0B0D12] border border-[#28313D] p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#9AA6B2] uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-[#42D392]" />
                Aggregated Sentiment
              </span>
              <span className="px-2 py-0.5 bg-[#103B46] text-[#42D392] font-bold text-xs rounded-full">
                {activeData.sentiment.label}
              </span>
            </div>

            {/* Gauge Dial Visualizer */}
            <div className="flex flex-col items-center justify-center my-2">
              <div className="relative w-36 h-20 flex items-end justify-center">
                {/* Semi-circle background track */}
                <div className="w-36 h-18 border-t-[14px] border-l-[14px] border-r-[14px] border-[#171C24] rounded-t-full absolute inset-0" />
                {/* Colored active arc */}
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
                  <span>Social Media Buzz Volume</span>
                  <span className="font-mono text-[#F4F7FA]">{activeData.sentiment.socialVolumeScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#171C24] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: `${activeData.sentiment.socialVolumeScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Headline Summary */}
          <div className="p-3 bg-[#12161D] border border-[#28313D] rounded-xl mt-4 text-xs text-[#9AA6B2]">
            <span className="font-semibold text-[#A855F7] block mb-1">AI Executive Take:</span>
            "{activeData.sentiment.headlineSummary}"
          </div>
        </div>
      </div>

      {/* REGULATORY RISK WARNING DISCLAIMER BANNER */}
      <div className="p-4 bg-[#F4B860]/10 border border-[#F4B860]/20 rounded-xl flex items-start gap-3 text-[#F4B860] text-xs">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 text-[#F4B860] mt-0.5" />
        <div>
          <span className="font-bold text-[#F4B860] uppercase tracking-wide mr-1">Regulatory & Compliance Notice:</span>
          AI and algorithmic projections displayed above represent probabilistic simulations based on historical drift, autoregression, and simulated market sentiment. These figures do not represent guaranteed returns or fiduciary investment advice. Capital is subject to market volatility and loss.
        </div>
      </div>
    </div>
  );
};
