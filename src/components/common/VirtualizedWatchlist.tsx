import React, { useState, useMemo } from 'react';
import { useMarketStore } from '../../stores/useMarketStore';
import { Search, ArrowUpRight, ArrowDownRight, Flame } from 'lucide-react';

export const VirtualizedWatchlist: React.FC = () => {
  const watchlist = useMarketStore((state) => state.watchlist);
  const activeSymbol = useMarketStore((state) => state.activeSymbol);
  const setActiveSymbol = useMarketStore((state) => state.setActiveSymbol);

  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<string>('All');

  const filteredList = useMemo(() => {
    return watchlist.filter((item) => {
      const matchSearch = item.symbol.toLowerCase().includes(search.toLowerCase()) || 
                          item.name.toLowerCase().includes(search.toLowerCase());
      const matchClass = filterClass === 'All' || item.assetClass === filterClass;
      return matchSearch && matchClass;
    });
  }, [watchlist, search, filterClass]);

  return (
    <div className="flex flex-col h-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-xl">
      {/* Header & Search */}
      <div className="space-y-3 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            Live Market Watchlist
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {filteredList.length} Instruments
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by symbol, asset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Quick Category Badges */}
        <div className="flex gap-1 overflow-x-auto pb-1 text-[10px] font-semibold">
          {['All', 'Stocks', 'ETFs', 'Crypto', 'Gold'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterClass(cat)}
              className={`px-2 py-0.5 rounded-lg whitespace-nowrap transition ${
                filterClass === cat
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Virtualized/Windowed Scroll Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 pr-1 space-y-1">
        {filteredList.map((item) => {
          const isSelected = item.symbol === activeSymbol;
          const isBull = item.change24hPct >= 0;

          return (
            <div
              key={item.symbol}
              onClick={() => setActiveSymbol(item.symbol)}
              className={`p-2.5 rounded-xl cursor-pointer transition flex items-center justify-between group ${
                isSelected
                  ? 'bg-slate-800/90 border border-slate-700 shadow-md'
                  : 'hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-xs text-white group-hover:text-emerald-300 transition">
                    {item.symbol}
                  </span>
                  <span className="text-[9px] px-1 py-0.2 bg-slate-800 text-slate-400 rounded font-mono">
                    {item.assetClass}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {item.name}
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-xs text-white">
                  ${item.price >= 1000 ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) : item.price.toFixed(2)}
                </div>
                <div className={`text-[10px] font-mono font-bold flex items-center justify-end ${isBull ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isBull ? <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" /> : <ArrowDownRight className="w-2.5 h-2.5 mr-0.5" />}
                  <span>{isBull ? `+${item.change24hPct}%` : `${item.change24hPct}%`}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
