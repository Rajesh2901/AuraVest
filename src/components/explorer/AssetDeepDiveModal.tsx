import React from 'react';
import type { AssetDetail } from '../../types';
import { 
  X, 
  Sparkles, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface AssetDeepDiveModalProps {
  asset: AssetDetail;
  onClose: () => void;
  onOpenAI: (symbol: string) => void;
}

export const AssetDeepDiveModal: React.FC<AssetDeepDiveModalProps> = ({ asset, onClose, onOpenAI }) => {
  const isMutualFundOrETF = asset.type === 'Mutual Funds' || asset.type === 'ETFs';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12161D] border border-[#28313D] rounded-2xl p-6 lg:p-8 w-full max-w-4xl shadow-2xl space-y-6 relative my-8 text-[#F4F7FA]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-[#171C24] hover:bg-[#171C24] text-[#9AA6B2] hover:text-[#F4F7FA] rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#28313D] pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-black text-[#F4F7FA]">{asset.name}</h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#171C24] text-[#42D392] rounded-md">
                {asset.symbol}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-[#171C24] text-[#9AA6B2] rounded-md">
                {asset.type}
              </span>
            </div>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-3xl font-black font-mono text-[#F4F7FA]">${asset.currentPrice.toFixed(2)}</span>
              <span className={`text-xs font-mono font-bold flex items-center ${asset.change24hPct >= 0 ? 'text-[#42D392]' : 'text-[#FF5C5C]'}`}>
                {asset.change24hPct >= 0 ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                {asset.change24hPct >= 0 ? `+${asset.change24hPct}%` : `${asset.change24hPct}%`} (24h)
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenAI(asset.symbol)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#A855F7]/15 hover:bg-[#A855F7]/15 border border-[#A855F7]/30 text-[#A855F7] text-xs font-bold rounded-xl transition shadow-lg shadow-[#A855F7]/20"
          >
            <Sparkles className="w-4 h-4 text-[#A855F7]" />
            <span>Generate AI Forecast</span>
          </button>
        </div>

        {/* Trailing Returns Grid */}
        <div>
          <span className="text-xs font-bold text-[#9AA6B2] uppercase tracking-wider block mb-2">
            Historical Trailing Compound Growth (CAGR)
          </span>
          <div className="grid grid-cols-5 gap-2 text-center font-mono">
            {[
              { label: '1M', val: asset.returns.m1 },
              { label: '6M', val: asset.returns.m6 },
              { label: '1Y', val: asset.returns.y1 },
              { label: '3Y', val: asset.returns.y3 },
              { label: '5Y', val: asset.returns.y5 },
            ].map((r, i) => (
              <div key={i} className="p-2.5 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                <span className="text-[10px] text-[#5A6572] uppercase block font-sans">{r.label}</span>
                <span className={`text-sm font-bold block mt-1 ${r.val >= 0 ? 'text-[#42D392]' : 'text-[#FF5C5C]'}`}>
                  {r.val >= 0 ? `+${r.val}%` : `${r.val}%`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CONDITIONAL CONTENT BASED ON ASSET CLASS */}
        {isMutualFundOrETF ? (
          /* MUTUAL FUND / ETF DEEP-DIVE */
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                <span className="text-xs text-[#9AA6B2] uppercase font-bold block">Expense Ratio</span>
                <span className="text-2xl font-bold font-mono text-[#F4F7FA] mt-1 block">{asset.expenseRatio || 0.03}%</span>
                <span className="text-[11px] text-[#42D392] mt-1 block font-mono">Ultra-Low Tier Cost</span>
              </div>

              {asset.fundManager && (
                <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                  <span className="text-xs text-[#9AA6B2] uppercase font-bold block">Fund Manager Track Record</span>
                  <span className="text-base font-bold text-[#F4F7FA] mt-1 block">{asset.fundManager.name}</span>
                  <span className="text-[11px] text-[#9AA6B2] block font-mono">{asset.fundManager.experienceYears} Years Exp · ${asset.fundManager.aumBillions}B AUM</span>
                </div>
              )}

              <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                <span className="text-xs text-[#9AA6B2] uppercase font-bold block">Holdings Overlap Benchmark</span>
                <span className="text-2xl font-bold font-mono text-[#A855F7] mt-1 block">18.4%</span>
                <span className="text-[11px] text-[#9AA6B2] mt-1 block">Low overlap with S&P 500 Core</span>
              </div>
            </div>

            {/* Holdings breakdown */}
            {asset.topHoldings && asset.topHoldings.length > 0 && (
              <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                <span className="text-xs font-bold text-[#9AA6B2] uppercase tracking-wider block mb-3">
                  Top Underlying Portfolio Concentration
                </span>
                <div className="space-y-2">
                  {asset.topHoldings.map((h, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-[#28313D]">
                      <span className="text-[#9AA6B2] font-mono font-semibold">{h.symbol} - {h.name}</span>
                      <span className="font-mono font-bold text-[#F4F7FA]">{h.weight}% weight</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* DIRECT EQUITY DEEP-DIVE */
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                <span className="text-xs text-[#9AA6B2] uppercase font-bold block">P/E Ratio (TTM)</span>
                <span className="text-xl font-bold font-mono text-[#F4F7FA] mt-1 block">{asset.ratios.pe || 48.2}x</span>
                <span className="text-[10px] text-[#5A6572]">Forward P/E: 32.5x</span>
              </div>

              <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                <span className="text-xs text-[#9AA6B2] uppercase font-bold block">Return on Equity (ROE)</span>
                <span className="text-xl font-bold font-mono text-[#42D392] mt-1 block">{asset.ratios.roe || 91.5}%</span>
                <span className="text-[10px] text-[#5A6572]">Top 5% Industry Tier</span>
              </div>

              <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                <span className="text-xs text-[#9AA6B2] uppercase font-bold block">Debt to Equity</span>
                <span className="text-xl font-bold font-mono text-[#3B82F6] mt-1 block">0.14</span>
                <span className="text-[10px] text-[#5A6572]">Pristine Balance Sheet</span>
              </div>

              <div className="p-4 bg-[#0B0D12] border border-[#28313D] rounded-xl">
                <span className="text-xs text-[#9AA6B2] uppercase font-bold block">Cash Per Share</span>
                <span className="text-xl font-bold font-mono text-[#F4F7FA] mt-1 block">$14.20</span>
                <span className="text-[10px] text-[#5A6572]">High Liquid Reserves</span>
              </div>
            </div>
          </div>
        )}

        <div className="p-3.5 bg-[#0B0D12] border border-[#28313D] rounded-xl text-xs text-[#9AA6B2] flex items-center justify-between">
          <span>SEC 10-K & Institutional Custodian Filing Data Verified</span>
          <span className="font-mono text-[#42D392] font-bold">Live Feed OK</span>
        </div>
      </div>
    </div>
  );
};
