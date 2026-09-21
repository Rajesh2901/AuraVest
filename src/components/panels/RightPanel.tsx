import type { FC } from 'react';
import { X, TrendingUp, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const RightPanel: FC = () => {
  const { rightPanelOpen, toggleRightPanel, rightPanelContext } = useAppStore();

  if (!rightPanelOpen) return null;

  return (
    <aside 
      className="w-[320px] shrink-0 bg-[#12161D] border-l border-[#28313D] flex flex-col h-full overflow-y-auto animate-in slide-in-from-right"
      aria-label="Contextual Details Panel"
    >
      <div className="flex items-center justify-between p-4 border-b border-[#28313D] sticky top-0 bg-[#12161D] z-10">
        <h2 className="text-sm font-semibold text-[#F4F7FA]">
          {rightPanelContext === 'insights' && 'AI Market Insights'}
          {rightPanelContext === 'orderbook' && 'Quick Order Book'}
          {rightPanelContext === 'comparison' && 'Asset Comparison'}
          {(!rightPanelContext || rightPanelContext === 'none') && 'Quick Actions'}
        </h2>
        <button 
          onClick={() => toggleRightPanel()}
          className="text-[#9AA6B2] hover:text-[#F4F7FA] p-1 rounded hover:bg-[#171C24] cursor-pointer"
          title="Close panel"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-4 flex-1">
        {rightPanelContext === 'insights' && (
          <div className="space-y-4">
            <div className="bg-[#171C24] border border-[#28313D] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#42D392]" />
                <h3 className="text-sm font-medium text-[#F4F7FA]">NVDA Bullish Pattern</h3>
              </div>
              <p className="text-xs text-[#9AA6B2] mb-2">Forming a bullish pennant pattern on the 4H chart with increasing volume.</p>
              <span className="text-[10px] text-[#5A6572]">10 mins ago</span>
            </div>
            
            <div className="bg-[#171C24] border border-[#28313D] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-[#F4B860]" />
                <h3 className="text-sm font-medium text-[#F4F7FA]">Fed Minutes Pivot</h3>
              </div>
              <p className="text-xs text-[#9AA6B2] mb-2">Recent minutes suggest a dovish pivot, likely to boost tech equities.</p>
              <span className="text-[10px] text-[#5A6572]">1 hour ago</span>
            </div>

            <div className="bg-[#171C24] border border-[#28313D] rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#42D392]" />
                <h3 className="text-sm font-medium text-[#F4F7FA]">BTC Breakout</h3>
              </div>
              <p className="text-xs text-[#9AA6B2] mb-2">Breaking above 200-day EMA, strong institutional buying detected.</p>
              <span className="text-[10px] text-[#5A6572]">2 hours ago</span>
            </div>
          </div>
        )}

        {rightPanelContext === 'orderbook' && (
          <div className="space-y-4">
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-[#9AA6B2] mb-2 px-2">
                <span>Price</span>
                <span>Size</span>
              </div>
              {/* Asks (Red) */}
              {[
                { p: '154.60', s: '1.2k' },
                { p: '154.55', s: '8.4k' },
                { p: '154.50', s: '2.1k' },
                { p: '154.45', s: '500' },
              ].map((ask, i) => (
                <div key={i} className="flex justify-between px-2 py-1 bg-[#FF5C5C]/5 hover:bg-[#FF5C5C]/10 cursor-pointer rounded">
                  <span className="text-[#FF5C5C] font-mono">{ask.p}</span>
                  <span className="text-[#F4F7FA] font-mono">{ask.s}</span>
                </div>
              ))}
              
              {/* Mid Market */}
              <div className="py-2 text-center my-1 border-y border-[#28313D]">
                <span className="text-lg font-bold text-[#F4F7FA] font-mono">154.42</span>
                <span className="text-xs text-[#42D392] ml-2">↑ 0.05</span>
              </div>

              {/* Bids (Green) */}
              {[
                { p: '154.40', s: '3.4k' },
                { p: '154.35', s: '1.1k' },
                { p: '154.30', s: '12.5k' },
                { p: '154.25', s: '800' },
              ].map((bid, i) => (
                <div key={i} className="flex justify-between px-2 py-1 bg-[#42D392]/5 hover:bg-[#42D392]/10 cursor-pointer rounded">
                  <span className="text-[#42D392] font-mono">{bid.p}</span>
                  <span className="text-[#F4F7FA] font-mono">{bid.s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {rightPanelContext === 'comparison' && (
          <div className="space-y-4 text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[#9AA6B2] text-xs border-b border-[#28313D]">
                  <th className="pb-2 font-normal">Metric</th>
                  <th className="pb-2 font-normal">Asset A</th>
                  <th className="pb-2 font-normal">Asset B</th>
                </tr>
              </thead>
              <tbody className="text-[#F4F7FA]">
                <tr className="border-b border-[#28313D]/50">
                  <td className="py-2 text-[#9AA6B2]">Price</td>
                  <td className="py-2 font-mono">$150.20</td>
                  <td className="py-2 font-mono">$85.40</td>
                </tr>
                <tr className="border-b border-[#28313D]/50">
                  <td className="py-2 text-[#9AA6B2]">1Y Rtn</td>
                  <td className="py-2 text-[#42D392] font-mono">+12.5%</td>
                  <td className="py-2 text-[#42D392] font-mono">+8.2%</td>
                </tr>
                <tr className="border-b border-[#28313D]/50">
                  <td className="py-2 text-[#9AA6B2]">Vol</td>
                  <td className="py-2 text-[#FF5C5C]">High</td>
                  <td className="py-2 text-[#F4B860]">Med</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {(!rightPanelContext || rightPanelContext === 'none') && (
          <div className="text-center text-[#9AA6B2] text-sm mt-10">
            Select an item from the workspace to view details here.
          </div>
        )}
      </div>
    </aside>
  );
};
