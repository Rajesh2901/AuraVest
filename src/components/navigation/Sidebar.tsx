import type { FC } from 'react';
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, Briefcase, 
  ArrowLeftRight, Compass, Eye, Activity, BarChart3, 
  Calendar, Target, Settings, User, HelpCircle 
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const Sidebar: FC = () => {
  const { 
    sidebarCollapsed, toggleSidebar, activeSection, setActiveSection,
    mode, toggleMode
  } = useAppStore();

  const navGroups = [
    {
      title: 'PORTFOLIO',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'holdings', label: 'Holdings', icon: Briefcase },
        { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
      ]
    },
    {
      title: 'EXPLORE MARKETS',
      items: [
        { id: 'explorer', label: 'MF & Equities', icon: Compass },
        { id: 'watchlists', label: 'Watchlists', icon: Eye },
      ]
    },
    {
      title: 'PRO TRADING',
      items: [
        { id: 'trading', label: 'Trading Terminal', icon: Activity },
        { id: 'charts', label: 'Charts', icon: BarChart3 },
      ]
    },
    {
      title: 'SIP MANAGER',
      items: [
        { id: 'sips', label: 'Active SIPs', icon: Calendar },
        { id: 'planner', label: 'Goal Planner', icon: Target },
      ]
    }
  ];

  const accountItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <aside 
      className="flex flex-col h-full bg-[#0B0D12] border-r border-[#28313D] transition-all duration-300 ease-in-out shrink-0 overflow-y-auto overflow-x-hidden select-none"
      style={{ width: sidebarCollapsed ? '64px' : '240px' }}
      aria-label="Sidebar Navigation"
    >
      <div className="p-3 flex justify-end">
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-[#9AA6B2] hover:bg-[#171C24] hover:text-[#F4F7FA] transition-colors cursor-pointer"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {navGroups.map((group, idx) => (
          <div key={idx} className="mb-4">
            {!sidebarCollapsed && (
              <div className="px-3 mt-4 mb-1 text-[10px] uppercase tracking-widest text-[#5A6572] font-semibold">
                {group.title}
              </div>
            )}
            
            {group.items.map(item => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full h-10 px-3 flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-[#103B46] border-l-2 border-[#19C3E6] text-[#19C3E6]' 
                      : 'border-l-2 border-transparent text-[#9AA6B2] hover:bg-[#171C24] hover:text-[#F4F7FA]'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon size={18} className={isActive ? 'text-[#19C3E6]' : 'text-[#9AA6B2]'} />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Mode Toggle & Account Section */}
      <div className="mt-auto border-t border-[#28313D] pt-4 pb-2">
        <div className="px-3 mb-4">
          <button 
            onClick={toggleMode}
            className={`w-full flex items-center bg-[#171C24] rounded-full p-1 border border-[#28313D] cursor-pointer ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}
            title="Toggle Wealth / Pro Mode"
          >
            {sidebarCollapsed ? (
              <div className="w-8 h-8 rounded-full bg-[#103B46] flex items-center justify-center text-[#19C3E6] font-bold text-xs">
                {mode === 'simple' ? 'W' : 'P'}
              </div>
            ) : (
              <>
                <div className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${mode === 'simple' ? 'bg-[#103B46] text-[#19C3E6]' : 'text-[#9AA6B2]'}`}>
                  Wealth Mode
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${mode === 'pro' ? 'bg-[#103B46] text-[#19C3E6]' : 'text-[#9AA6B2]'}`}>
                  Pro Trading
                </div>
              </>
            )}
          </button>
        </div>

        {!sidebarCollapsed && (
          <div className="px-3 mt-4 mb-1 text-[10px] uppercase tracking-widest text-[#5A6572] font-semibold">
            ACCOUNT
          </div>
        )}
        
        {accountItems.map(item => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              title={sidebarCollapsed ? item.label : undefined}
              className={`w-full h-10 px-3 flex items-center gap-3 transition-colors cursor-pointer ${
                isActive 
                  ? 'bg-[#103B46] border-l-2 border-[#19C3E6] text-[#19C3E6]' 
                  : 'border-l-2 border-transparent text-[#9AA6B2] hover:bg-[#171C24] hover:text-[#F4F7FA]'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon size={18} className={isActive ? 'text-[#19C3E6]' : 'text-[#9AA6B2]'} />
              {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
