import React, { useState } from 'react';
import type { AssetDetail } from '../../types';
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  User, 
  Sparkles
} from 'lucide-react';

const CATALOG: AssetDetail[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'Stocks',
    currentPrice: 130.40,
    change24h: 3.65,
    change24hPct: 2.85,
    returns: { m1: 8.4, m6: 32.1, y1: 174.5, y3: 420.2, y5: 1240.0 },
    ratios: { pe: 48.2, dividendYield: 0.08, roe: 91.5 },
    topHoldings: [],
  },
  {
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    type: 'ETFs',
    currentPrice: 512.60,
    change24h: 2.10,
    change24hPct: 0.41,
    expenseRatio: 0.03,
    fundManager: { name: 'Donald Butler', experienceYears: 24, aumBillions: 480 },
    returns: { m1: 2.1, m6: 11.4, y1: 26.2, y3: 35.8, y5: 98.4 },
    ratios: { pe: 26.4, dividendYield: 1.34 },
    topHoldings: [
      { symbol: 'MSFT', name: 'Microsoft Corp', weight: 6.8 },
      { symbol: 'AAPL', name: 'Apple Inc', weight: 6.4 },
      { symbol: 'NVDA', name: 'NVIDIA Corp', weight: 6.2 },
      { symbol: 'AMZN', name: 'Amazon.com', weight: 3.8 },
    ],
  },
  {
    symbol: 'MFEQX',
    name: 'AuraVest Bluechip Equity Alpha Fund',
    type: 'Mutual Funds',
    currentPrice: 84.50,
    change24h: 0.65,
    change24hPct: 0.78,
    expenseRatio: 0.45,
    fundManager: { name: 'Dr. Sarah Chen, CFA', experienceYears: 18, aumBillions: 12.4 },
    returns: { m1: 3.2, m6: 14.8, y1: 31.4, y3: 54.2, y5: 138.6 },
    ratios: { nav: 84.50, roe: 24.2 },
    topHoldings: [
      { symbol: 'GOOGL', name: 'Alphabet Inc', weight: 8.5 },
      { symbol: 'META', name: 'Meta Platforms', weight: 7.9 },
      { symbol: 'TSM', name: 'Taiwan Semiconductor', weight: 7.2 },
      { symbol: 'ASML', name: 'ASML Holding', weight: 6.1 },
    ],
  },
  {
    symbol: 'GLD',
    name: 'SPDR Gold Shares',
    type: 'Gold',
    currentPrice: 238.20,
    change24h: -0.80,
    change24hPct: -0.34,
    expenseRatio: 0.40,
    fundManager: { name: 'World Gold Trust Services', experienceYears: 20, aumBillions: 64 },
    returns: { m1: 1.8, m6: 18.2, y1: 34.5, y3: 42.1, y5: 68.9 },
    ratios: {},
    topHoldings: [],
  },
];

export const AssetExplorer: React.FC<{ onSelectAssetForAI: (symbol: string) => void }> = ({ onSelectAssetForAI }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<AssetDetail>(CATALOG[0]);

  const filteredAssets = CATALOG.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.type === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* 1. FILTER & SEARCH HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#F4F7FA] tracking-tight">Mutual Funds & Stocks Explorer</h1>
          <p className="text-xs text-[#9AA6B2]">
            Compare expense ratios, management pedigree, fundamentals, and trailing returns across all asset classes.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Stocks', 'Mutual Funds', 'ETFs', 'Gold'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                activeCategory === cat
                  ? 'bg-[#19C3E6] text-[#0B0D12] shadow-md shadow-[#19C3E6]/20'
                  : 'bg-[#12161D] border border-[#28313D] text-[#9AA6B2] hover:text-[#F4F7FA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MASTER-DETAIL 2-COLUMN VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Asset List */}
        <div className="lg:col-span-1 bg-[#12161D] backdrop-blur-xl border border-[#28313D] rounded-xl p-4 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9AA6B2]" />
            <input
              type="text"
              placeholder="Search ticker, fund name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#171C24] border border-[#28313D] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#F4F7FA] placeholder-[#5A6572] focus:outline-none focus:border-[#42D392]"
            />
          </div>

          <div className="divide-y divide-[#28313D] max-h-[580px] overflow-y-auto">
            {filteredAssets.map((asset) => (
              <div
                key={asset.symbol}
                onClick={() => setSelectedAsset(asset)}
                className={`p-3.5 rounded-xl cursor-pointer transition flex items-center justify-between ${
                  selectedAsset.symbol === asset.symbol
                    ? 'bg-[#171C24] border border-[#28313D]'
                    : 'hover:bg-[#171C24]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#F4F7FA] text-sm">{asset.symbol}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#171C24] text-[#9AA6B2] rounded font-semibold">
                      {asset.type}
                    </span>
                  </div>
                  <div className="text-xs text-[#9AA6B2] truncate max-w-[160px]">{asset.name}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-[#F4F7FA]">${asset.currentPrice.toFixed(2)}</div>
                  <div className={`text-xs font-semibold flex items-center justify-end ${asset.change24hPct >= 0 ? 'text-[#42D392]' : 'text-[#FF5C5C]'}`}>
                    {asset.change24hPct >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>{asset.change24hPct >= 0 ? `+${asset.change24hPct}%` : `${asset.change24hPct}%`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Detailed Fundamentals & Performance Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#12161D] backdrop-blur-xl border border-[#28313D] rounded-xl p-6 shadow-xl space-y-6">
            {/* Header with Title & Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#28313D] pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-[#F4F7FA]">{selectedAsset.name}</h2>
                  <span className="text-xs font-mono px-2 py-0.5 bg-[#171C24] text-[#42D392] rounded-md font-bold">
                    {selectedAsset.symbol}
                  </span>
                </div>
                <p className="text-xs text-[#9AA6B2] mt-1">Asset Class: {selectedAsset.type}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectAssetForAI(selectedAsset.symbol)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#A855F7]/15 hover:bg-[#A855F7]/15 border border-[#A855F7]/30 text-[#A855F7] text-xs font-bold rounded-xl transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
                  <span>AI Projection</span>
                </button>
              </div>
            </div>

            {/* Trailing Returns Grid */}
            <div>
              <span className="text-xs font-bold text-[#9AA6B2] uppercase tracking-wider block mb-3">
                Historical Trailing Compound Returns
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: '1 Month', val: selectedAsset.returns.m1 },
                  { label: '6 Months', val: selectedAsset.returns.m6 },
                  { label: '1 Year', val: selectedAsset.returns.y1 },
                  { label: '3 Years', val: selectedAsset.returns.y3 },
                  { label: '5 Years', val: selectedAsset.returns.y5 },
                ].map((ret, i) => (
                  <div key={i} className="p-3 bg-[#0B0D12] border border-[#28313D] rounded-xl text-center">
                    <span className="text-[10px] text-[#5A6572] uppercase block font-semibold">{ret.label}</span>
                    <span className={`text-base font-black font-mono mt-1 block ${ret.val >= 0 ? 'text-[#42D392]' : 'text-[#FF5C5C]'}`}>
                      {ret.val >= 0 ? `+${ret.val}%` : `${ret.val}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fundamental Ratios & Expense Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {selectedAsset.expenseRatio !== undefined && (
                <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                  <span className="text-[10px] text-[#9AA6B2] uppercase font-bold block">Annual Expense Ratio</span>
                  <span className="text-xl font-mono font-bold text-[#F4F7FA] mt-1 block">{selectedAsset.expenseRatio}%</span>
                  <span className="text-[10px] text-[#42D392] mt-1 block font-mono">Top Quartile Low Fee</span>
                </div>
              )}

              {selectedAsset.ratios.pe !== undefined && (
                <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                  <span className="text-[10px] text-[#9AA6B2] uppercase font-bold block">P/E Ratio (TTM)</span>
                  <span className="text-xl font-mono font-bold text-[#F4F7FA] mt-1 block">{selectedAsset.ratios.pe}x</span>
                  <span className="text-[10px] text-[#9AA6B2] mt-1 block">Industry Avg: 32.5x</span>
                </div>
              )}

              {selectedAsset.ratios.roe !== undefined && (
                <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                  <span className="text-[10px] text-[#9AA6B2] uppercase font-bold block">Return on Equity (ROE)</span>
                  <span className="text-xl font-mono font-bold text-[#42D392] mt-1 block">{selectedAsset.ratios.roe}%</span>
                  <span className="text-[10px] text-[#9AA6B2] mt-1 block font-mono">High Efficiency</span>
                </div>
              )}
            </div>

            {/* Fund Manager & Top 10 Holdings if Available */}
            {selectedAsset.fundManager && (
              <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#9AA6B2] uppercase tracking-wider block font-semibold">Fund Manager</span>
                    <span className="text-sm font-bold text-[#F4F7FA]">{selectedAsset.fundManager.name}</span>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <span className="text-[#9AA6B2] block font-mono">Experience: {selectedAsset.fundManager.experienceYears} Years</span>
                  <span className="text-[#42D392] font-bold font-mono">AUM: ${selectedAsset.fundManager.aumBillions} Billion</span>
                </div>
              </div>
            )}

            {/* Holdings breakdown table */}
            {selectedAsset.topHoldings.length > 0 && (
              <div>
                <span className="text-xs font-bold text-[#9AA6B2] uppercase tracking-wider block mb-3">
                  Top Underlying Portfolio Holdings
                </span>
                <div className="space-y-2">
                  {selectedAsset.topHoldings.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-2.5 bg-[#0B0D12] rounded-xl border border-[#28313D]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#42D392]">{h.symbol}</span>
                        <span className="text-[#9AA6B2]">{h.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-[#171C24] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#19C3E6] h-full rounded-full" style={{ width: `${h.weight * 10}%` }} />
                        </div>
                        <span className="font-mono font-bold text-[#F4F7FA]">{h.weight}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
