import { create } from 'zustand';
import type { ForecastHorizon, PredictionPayload } from '../types';

interface PredictionState {
  activeHorizon: ForecastHorizon;
  activeAssetSymbol: string;
  predictions: Record<ForecastHorizon, PredictionPayload>;
  setActiveHorizon: (horizon: ForecastHorizon) => void;
  setActiveAssetSymbol: (symbol: string) => void;
}

const PREDICTIONS_DATABASE: Record<ForecastHorizon, PredictionPayload> = {
  '1Y': {
    symbol: 'NVDA',
    assetName: 'NVIDIA Corporation',
    assetClass: 'Stocks',
    currentPrice: 130.40,
    horizon: '1Y',
    modelConfidenceScore: 89.2,
    bands: {
      optimistic: 182.50,
      expected: 156.20,
      conservative: 118.90,
    },
    projectedPoints: [
      { date: 'Now', historicalClose: 130.40, expected: 130.40, optimistic: 130.40, conservative: 130.40 },
      { date: 'Q1', expected: 138.00, optimistic: 145.00, conservative: 125.00 },
      { date: 'Q2', expected: 144.50, optimistic: 158.00, conservative: 121.00 },
      { date: 'Q3', expected: 151.00, optimistic: 170.00, conservative: 119.50 },
      { date: '1Y Target', expected: 156.20, optimistic: 182.50, conservative: 118.90 },
    ],
    sentiment: {
      compositeScore: 78,
      label: 'Bullish',
      newsScore: 82,
      socialVolumeScore: 74,
      insiderActivityScore: 70,
      headlineSummary: 'High AI data-center chip capex reaffirmed by cloud hyperscalers.',
    },
    disclaimerText: 'Monte Carlo geometric simulation with historical drift (μ=18.4%) and annual volatility (σ=42.1%).',
  },
  '3Y': {
    symbol: 'NVDA',
    assetName: 'NVIDIA Corporation',
    assetClass: 'Stocks',
    currentPrice: 130.40,
    horizon: '3Y',
    modelConfidenceScore: 78.4,
    bands: {
      optimistic: 245.00,
      expected: 198.50,
      conservative: 104.20,
    },
    projectedPoints: [
      { date: 'Now', historicalClose: 130.40, expected: 130.40, optimistic: 130.40, conservative: 130.40 },
      { date: 'Year 1', expected: 156.20, optimistic: 182.50, conservative: 118.90 },
      { date: 'Year 2', expected: 176.00, optimistic: 212.00, conservative: 110.00 },
      { date: 'Year 3', expected: 198.50, optimistic: 245.00, conservative: 104.20 },
    ],
    sentiment: {
      compositeScore: 72,
      label: 'Bullish',
      newsScore: 75,
      socialVolumeScore: 70,
      insiderActivityScore: 68,
      headlineSummary: 'Sustained sovereign AI infrastructure programs offsetting GPU consumer refresh cycles.',
    },
    disclaimerText: 'Multi-year autoregressive projection with expanding variance bands (3-Year forecast envelope).',
  },
  '5Y': {
    symbol: 'NVDA',
    assetName: 'NVIDIA Corporation',
    assetClass: 'Stocks',
    currentPrice: 130.40,
    horizon: '5Y',
    modelConfidenceScore: 64.8,
    bands: {
      optimistic: 330.00,
      expected: 240.00,
      conservative: 88.00,
    },
    projectedPoints: [
      { date: 'Now', historicalClose: 130.40, expected: 130.40, optimistic: 130.40, conservative: 130.40 },
      { date: 'Year 1', expected: 156.20, optimistic: 182.50, conservative: 118.90 },
      { date: 'Year 3', expected: 198.50, optimistic: 245.00, conservative: 104.20 },
      { date: 'Year 5', expected: 240.00, optimistic: 330.00, conservative: 88.00 },
    ],
    sentiment: {
      compositeScore: 65,
      label: 'Bullish',
      newsScore: 68,
      socialVolumeScore: 64,
      insiderActivityScore: 60,
      headlineSummary: 'Long-term foundational models and humanoid robotics expanding computing TAM.',
    },
    disclaimerText: 'Macroeconomic secular growth projection with wider confidence intervals due to long horizon.',
  },
};

export const usePredictionStore = create<PredictionState>((set) => ({
  activeHorizon: '1Y',
  activeAssetSymbol: 'NVDA',
  predictions: PREDICTIONS_DATABASE,
  setActiveHorizon: (horizon) => set({ activeHorizon: horizon }),
  setActiveAssetSymbol: (symbol) => set({ activeAssetSymbol: symbol }),
}));
