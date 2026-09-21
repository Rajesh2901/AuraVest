import type { FC } from 'react';
import { Search, Settings, Bell } from 'lucide-react';
import { usePortfolioStore } from '../../stores/usePortfolioStore';
import { useAppStore } from '../../stores/useAppStore';

export const HeaderBar: FC = () => {
  const quickDeposit = usePortfolioStore((state) => state.quickDeposit);
  const toggleRightPanel = useAppStore((state) => state.toggleRightPanel);

  const handleDeposit = () => {
    quickDeposit(1000);
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-[#28313D] bg-[#0B0D12]/95 px-4 backdrop-blur-xl">
      {/* Left zone */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#19C3E6] text-[#0B0D12] font-bold">
            AV
          </div>
          <span className="text-lg font-bold text-[#F4F7FA]">
            Aura<span className="text-[#19C3E6]">Vest</span>
          </span>
        </div>
        
        {/* Ticker tape mock */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#9AA6B2]">NIFTY 50:</span>
            <span className="font-mono text-[#F4F7FA]">24,150.30</span>
            <span className="text-[#42D392]">+0.85%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#9AA6B2]">SENSEX:</span>
            <span className="font-mono text-[#F4F7FA]">79,480.12</span>
            <span className="text-[#42D392]">+0.72%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#9AA6B2]">S&P 500:</span>
            <span className="font-mono text-[#F4F7FA]">5,842.15</span>
            <span className="text-[#42D392]">+1.12%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#9AA6B2]">BTC:</span>
            <span className="font-mono text-[#F4F7FA]">$67,240</span>
            <span className="text-[#42D392]">+2.35%</span>
          </div>
        </div>
      </div>

      {/* Center zone */}
      <div className="flex flex-1 items-center justify-center px-4 max-w-lg hidden md:flex">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA6B2]" />
          <input
            type="text"
            placeholder="Search markets, assets, or symbols..."
            className="w-full rounded-xl border border-[#28313D] bg-[#171C24] py-1.5 pl-10 pr-12 text-sm text-[#F4F7FA] placeholder-[#9AA6B2] focus:border-[#19C3E6] focus:outline-none"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-[#28313D] px-1.5 py-0.5 text-[10px] text-[#9AA6B2]">
            Ctrl+K
          </div>
        </div>
      </div>

      {/* Right zone */}
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-1.5 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#42D392] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#42D392]"></span>
          </span>
          <span className="text-[10px] text-[#9AA6B2] uppercase tracking-wider">Market Feed: Live</span>
        </div>

        <button 
          onClick={handleDeposit}
          className="rounded-lg bg-[#19C3E6] px-3 py-1.5 text-sm font-semibold text-[#0B0D12] hover:bg-[#19C3E6]/90 transition-colors cursor-pointer"
        >
          Deposit Funds
        </button>
        
        <button 
          onClick={() => toggleRightPanel()}
          className="rounded-lg border border-[#28313D] bg-[#171C24] px-3 py-1.5 text-sm font-semibold text-[#F4F7FA] hover:bg-[#28313D] transition-colors cursor-pointer"
        >
          Quick Trade
        </button>

        <div className="flex items-center gap-3 border-l border-[#28313D] pl-4">
          <button className="text-[#9AA6B2] hover:text-[#F4F7FA] cursor-pointer" title="Settings">
            <Settings className="h-5 w-5" />
          </button>
          <button className="relative text-[#9AA6B2] hover:text-[#F4F7FA] cursor-pointer" title="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#FF5C5C]"></span>
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#103B46] text-sm font-medium text-[#19C3E6]">
            AV
          </div>
        </div>
      </div>
    </header>
  );
};
