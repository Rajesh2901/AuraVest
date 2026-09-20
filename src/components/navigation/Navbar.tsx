import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { 
  Sparkles, 
  Search, 
  Bell, 
  TrendingUp, 
  Layers, 
  BookOpen, 
  Compass, 
  Activity,
  Sliders
} from 'lucide-react';

export type NavTab = 'dashboard' | 'beginner' | 'explorer' | 'trading' | 'ai';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenAI }) => {
  const mode = useAppStore((state) => state.mode);
  const toggleMode = useAppStore((state) => state.toggleMode);

  return (
    <header className="sticky top-0 z-50 bg-[#080B11]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 py-3 flex items-center justify-between">
      {/* Brand Identity */}
      <div className="flex items-center gap-8">
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
            <TrendingUp className="w-5 h-5 text-slate-950 font-black" />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Aura<span className="text-emerald-400">Vest</span>
            </div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-emerald-500/80 -mt-1 font-semibold">
              Quant & Wealth OS
            </div>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('beginner')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === 'beginner'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Beginner Hub
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === 'explorer'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            MF & Equities
          </button>

          <button
            onClick={() => setActiveTab('trading')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === 'trading'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Pro Trading
          </button>
        </nav>
      </div>

      {/* Global Search, Mode Switcher & Utilities */}
      <div className="flex items-center gap-3">
        {/* DUAL-MODE TOGGLE BUTTON */}
        <button
          onClick={toggleMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-sm ${
            mode === 'pro'
              ? 'bg-purple-600/20 border-purple-500/40 text-purple-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{mode === 'pro' ? 'Terminal: PRO' : 'Mode: SIMPLE'}</span>
        </button>

        <div className="relative hidden lg:block w-52">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets, SIPs..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* AI Projection Quick Action */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-semibold transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">AI Forecast</span>
        </button>

        {/* Notifications */}
        <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition">
          <Bell className="w-4 h-4" />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
          AV
        </div>
      </div>
    </header>
  );
};
