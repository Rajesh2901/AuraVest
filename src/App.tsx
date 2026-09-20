import React, { useState } from 'react';
import { Navbar, type NavTab } from './components/navigation/Navbar';
import { DualModeDashboard } from './components/dashboard/DualModeDashboard';
import { BeginnerHub } from './components/beginner/BeginnerHub';
import { AssetExplorer } from './components/explorer/AssetExplorer';
import { TradingTerminal } from './components/trading/TradingTerminal';
import { AIPredictiveChartWrapper } from './components/ai-engine/AIPredictiveChartWrapper';
import { X } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiModalSymbol, setAiModalSymbol] = useState<string>('NVDA');

  const handleOpenAIWithSymbol = (symbol: string) => {
    setAiModalSymbol(symbol);
    setAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar with Mode Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAI={() => setAiModalOpen(true)}
      />

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <DualModeDashboard onOpenAIModal={() => setAiModalOpen(true)} />
        )}

        {activeTab === 'beginner' && (
          <BeginnerHub onInvestBasket={(_name, _amt) => setActiveTab('dashboard')} />
        )}

        {activeTab === 'explorer' && (
          <AssetExplorer onSelectAssetForAI={handleOpenAIWithSymbol} />
        )}

        {activeTab === 'trading' && (
          <TradingTerminal />
        )}
      </main>

      {/* MODAL: AI PREDICTION ENGINE & VARIANCE ENVELOPE */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl my-8">
            <button
              onClick={() => setAiModalOpen(false)}
              className="absolute -top-3 -right-3 z-20 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full border border-slate-700 shadow-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
            <AIPredictiveChartWrapper 
              initialSymbol={aiModalSymbol} 
              onClose={() => setAiModalOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-6 text-center text-xs text-slate-500">
        <p>AuraVest Autonomous Quant & Wealth Architecture © 2026. SEC / SEBI Compliant Probabilistic Simulation Engine.</p>
      </footer>
    </div>
  );
};

export default App;
