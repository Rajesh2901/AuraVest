import { create } from 'zustand';
import type { AppMode, RightPanelContext } from '../types';

interface AppState {
  // Mode
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
  
  // Theme
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Right Panel
  rightPanelOpen: boolean;
  rightPanelContext: RightPanelContext;
  toggleRightPanel: () => void;
  setRightPanelContext: (ctx: RightPanelContext) => void;
  
  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Mode - defaults to 'simple' (displayed as "Wealth Mode")
  mode: 'simple',
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'simple' ? 'pro' : 'simple' })),
  
  // Theme
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  // Sidebar - starts expanded on desktop
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  
  // Right Panel
  rightPanelOpen: false,
  rightPanelContext: 'insights',
  toggleRightPanel: () => set((state) => ({ rightPanelOpen: !state.rightPanelOpen })),
  setRightPanelContext: (ctx) => set({ rightPanelContext: ctx, rightPanelOpen: true }),
  
  // Navigation
  activeSection: 'dashboard',
  setActiveSection: (section) => set({ activeSection: section }),
}));
