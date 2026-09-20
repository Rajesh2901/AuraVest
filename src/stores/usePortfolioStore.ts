import { create } from 'zustand';
import type { AllocationSlice, PortfolioMetrics, AssetClass } from '../types';

interface PortfolioState {
  metrics: PortfolioMetrics;
  allocations: AllocationSlice[];
  selectedAssetClass: AssetClass | null;
  setSelectedAssetClass: (assetClass: AssetClass | null) => void;
  updateLiveTick: (symbol: string, newPrice: number, change24hPct: number) => void;
  quickDeposit: (amount: number) => void;
  executeTrade: (symbol: string, type: 'BUY' | 'SELL', amount: number, price: number) => void;
  setupSIP: (assetName: string, monthlyAmount: number) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  metrics: {
    netWorth: 184250.75,
    totalInvested: 142000.00,
    todayPnL: 2184.30,
    todayPnLPct: 1.20,
    absoluteReturns: 42250.75,
    absoluteReturnsPct: 29.75,
    xirrPct: 18.42,
    cashBalance: 12450.00,
    availableMargin: 49800.00,
    currency: 'USD',
  },
  allocations: [
    { id: '1', name: 'Stocks', value: 82912.84, percentage: 45.0, color: '#10B981', pnl24h: 1.45 },
    { id: '2', name: 'Mutual Funds', value: 51590.21, percentage: 28.0, color: '#3B82F6', pnl24h: 0.82 },
    { id: '3', name: 'ETFs', value: 25795.10, percentage: 14.0, color: '#8B5CF6', pnl24h: 0.35 },
    { id: '4', name: 'Gold', value: 14740.06, percentage: 8.0, color: '#F59E0B', pnl24h: -0.15 },
    { id: '5', name: 'Crypto', value: 9212.54, percentage: 5.0, color: '#EC4899', pnl24h: 3.12 },
  ],
  selectedAssetClass: null,
  setSelectedAssetClass: (assetClass) => set({ selectedAssetClass: assetClass }),
  updateLiveTick: (_symbol, _newPrice, _changePct) =>
    set((state) => {
      const delta = (Math.random() * 40 - 19.5);
      const newNetWorth = state.metrics.netWorth + delta;
      const newTodayPnL = state.metrics.todayPnL + delta;
      const newTodayPnLPct = (newTodayPnL / (state.metrics.totalInvested || 1)) * 100;
      return {
        metrics: {
          ...state.metrics,
          netWorth: newNetWorth,
          todayPnL: newTodayPnL,
          todayPnLPct: newTodayPnLPct,
        },
      };
    }),
  quickDeposit: (amount) =>
    set((state) => ({
      metrics: {
        ...state.metrics,
        netWorth: state.metrics.netWorth + amount,
        cashBalance: state.metrics.cashBalance + amount,
        availableMargin: (state.metrics.cashBalance + amount) * 4,
      },
    })),
  executeTrade: (_symbol, type, amount, _price) =>
    set((state) => {
      const cashDelta = type === 'BUY' ? -amount : amount;
      const newCash = Math.max(0, state.metrics.cashBalance + cashDelta);
      return {
        metrics: {
          ...state.metrics,
          cashBalance: newCash,
          availableMargin: newCash * 4,
          totalInvested: type === 'BUY' ? state.metrics.totalInvested + amount : state.metrics.totalInvested - amount,
        },
      };
    }),
  setupSIP: (_assetName, monthlyAmount) =>
    set((state) => ({
      metrics: {
        ...state.metrics,
        cashBalance: Math.max(0, state.metrics.cashBalance - monthlyAmount),
        availableMargin: Math.max(0, state.metrics.cashBalance - monthlyAmount) * 4,
        totalInvested: state.metrics.totalInvested + monthlyAmount,
        netWorth: state.metrics.netWorth + monthlyAmount * 0.01,
      },
    })),
}));
