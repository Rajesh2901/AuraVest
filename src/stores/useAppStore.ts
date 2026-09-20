import { create } from 'zustand';
import type { AppMode } from '../types';

interface AppState {
  mode: AppMode;
  theme: 'dark' | 'light';
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: 'simple', // Defaults to 'simple' for approachable UX, togglable to 'pro'
  theme: 'dark',

  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'simple' ? 'pro' : 'simple' })),
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
