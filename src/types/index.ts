export type AppMode = 'simple' | 'pro';

export type AssetClass = 'Stocks' | 'Mutual Funds' | 'ETFs' | 'Gold' | 'Crypto';

export interface AllocationSlice {
  id: string;
  name: AssetClass;
  value: number;
  percentage: number;
  color: string;
  pnl24h: number;
}

export interface PortfolioMetrics {
  netWorth: number;
  totalInvested: number;
  todayPnL: number;
  todayPnLPct: number;
  absoluteReturns: number;
  absoluteReturnsPct: number;
  xirrPct: number;
  cashBalance: number;
  availableMargin: number;
  currency: string;
}

export type ForecastHorizon = '1Y' | '3Y' | '5Y';

export interface ConfidenceBands {
  optimistic: number;    // +2 sigma (+95.4%)
  expected: number;      // Drift median (μ)
  conservative: number;  // -2 sigma (-95.4%)
}

export interface ForecastPoint {
  date: string;
  historicalClose?: number;
  expected: number;
  optimistic: number;
  conservative: number;
}

export interface SentimentAnalysis {
  compositeScore: number; // 0 (Extreme Fear) to 100 (Extreme Greed)
  label: 'Very Bearish' | 'Bearish' | 'Neutral' | 'Bullish' | 'Very Bullish';
  newsScore: number;
  socialVolumeScore: number;
  insiderActivityScore: number;
  headlineSummary: string;
}

export interface PredictionPayload {
  symbol: string;
  assetName: string;
  assetClass: AssetClass;
  currentPrice: number;
  horizon: ForecastHorizon;
  modelConfidenceScore: number;
  bands: ConfidenceBands;
  projectedPoints: ForecastPoint[];
  sentiment: SentimentAnalysis;
  disclaimerText: string;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
}

export interface OrderBookState {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  spreadBps: number;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface SmartBasket {
  id: string;
  name: string;
  category: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  minInvestment: number;
  cagr3Y: number;
  description: string;
  holdings: { name: string; allocationPct: number }[];
  tags: string[];
}

export interface WatchlistTicker {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change24hPct: number;
  volume: string;
  high24h: number;
  low24h: number;
  assetClass: AssetClass;
}

export interface AssetDetail {
  symbol: string;
  name: string;
  type: AssetClass;
  currentPrice: number;
  change24h: number;
  change24hPct: number;
  expenseRatio?: number;
  fundManager?: {
    name: string;
    experienceYears: number;
    aumBillions: number;
  };
  returns: {
    m1: number;
    m6: number;
    y1: number;
    y3: number;
    y5: number;
  };
  ratios: {
    pe?: number;
    forwardPe?: number;
    dividendYield?: number;
    roe?: number;
    debtToEquity?: number;
    cashPerShare?: number;
    nav?: number;
  };
  topHoldings: { symbol: string; name: string; weight: number }[];
  holdingsOverlap?: { fundName: string; overlapPercentage: number }[];
}

export type OrderType = 'MARKET' | 'LIMIT' | 'STOP_LOSS' | 'COVER' | 'BRACKET';
export type OrderSide = 'BUY' | 'SELL';
