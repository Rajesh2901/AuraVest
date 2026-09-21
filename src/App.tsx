import { useState } from 'react';
import { useAppStore } from './stores/useAppStore';
import { HeaderBar } from './components/navigation/HeaderBar';
import { Sidebar } from './components/navigation/Sidebar';
import { RightPanel } from './components/panels/RightPanel';
import { DualModeDashboard } from './components/dashboard/DualModeDashboard';
import { BeginnerHub } from './components/beginner/BeginnerHub';
import { AssetExplorer } from './components/explorer/AssetExplorer';
import { TradingTerminal } from './components/trading/TradingTerminal';
import { AIPredictiveChartWrapper } from './components/ai-engine/AIPredictiveChartWrapper';
import { X } from 'lucide-react';

export function App() {
  const { activeSection } = useAppStore();
  const [aiModalAsset, setAiModalAsset] = useState<string | null>(null);

  const handleOpenAIModal = (assetSymbol?: string) => {
    setAiModalAsset(assetSymbol || 'NVDA');
  };

  const handleCloseAIModal = () => {
    setAiModalAsset(null);
  };

  const handleInvestBasket = (name: string, amount: number) => {
    console.log('Invest in basket:', name, amount);
  };

  const renderWorkspace = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DualModeDashboard onOpenAIModal={() => handleOpenAIModal()} />;
      case 'beginner':
      case 'holdings':
      case 'transactions':
      case 'sips':
      case 'planner':
        return <BeginnerHub onInvestBasket={handleInvestBasket} />;
      case 'explorer':
      case 'watchlists':
        return <AssetExplorer onSelectAssetForAI={handleOpenAIModal} />;
      case 'trading':
      case 'charts':
        return <TradingTerminal />;
      default:
        return <DualModeDashboard onOpenAIModal={() => handleOpenAIModal()} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F4F7FA] flex flex-col font-sans selection:bg-[#19C3E6]/30 selection:text-[#F4F7FA]">
      <HeaderBar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6" role="main">
          {renderWorkspace()}
        </main>
        
        <RightPanel />
      </div>
      
      <footer className="border-t border-[#28313D] py-4 text-center text-xs text-[#5A6572] bg-[#0B0D12]">
        &copy; {new Date().getFullYear()} AuraVest Core — Autonomous Quant & Wealth Architecture. SEC / SEBI Compliant Probabilistic Simulation Engine.
      </footer>

      {/* AI Modal Overlay */}
      {aiModalAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl my-8">
            <button
              onClick={handleCloseAIModal}
              className="absolute -top-3 -right-3 z-20 p-2 bg-[#171C24] hover:bg-[#28313D] text-[#9AA6B2] hover:text-[#F4F7FA] rounded-full border border-[#28313D] shadow-xl transition cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <AIPredictiveChartWrapper 
              initialSymbol={aiModalAsset}
              onClose={handleCloseAIModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
