import { create } from 'zustand';
import type { CandleData, OrderBookState, WatchlistTicker } from '../types';

interface MarketState {
  activeSymbol: string;
  activeTimeframe: '1m' | '5m' | '15m' | '1h' | '1D' | '1W';
  currentPrice: number;
  change24hPct: number;
  candles: CandleData[];
  orderBook: OrderBookState;
  watchlist: WatchlistTicker[];
  indicators: {
    rsi: boolean;
    macd: boolean;
    bollinger: boolean;
    ema20: boolean;
    vwap: boolean;
  };

  setActiveSymbol: (symbol: string) => void;
  setActiveTimeframe: (timeframe: '1m' | '5m' | '15m' | '1h' | '1D' | '1W') => void;
  toggleIndicator: (indicator: 'rsi' | 'macd' | 'bollinger' | 'ema20' | 'vwap') => void;
  streamNextTick: () => void;
}

const INITIAL_WATCHLIST: WatchlistTicker[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 130.40, change24h: 3.65, change24hPct: 2.85, volume: '48.2M', high24h: 132.80, low24h: 128.10, assetClass: 'Stocks' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 228.50, change24h: 1.80, change24hPct: 0.79, volume: '32.1M', high24h: 229.90, low24h: 226.40, assetClass: 'Stocks' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 432.10, change24h: 4.20, change24hPct: 0.98, volume: '18.4M', high24h: 435.00, low24h: 429.20, assetClass: 'Stocks' },
  { symbol: 'AMZN', name: 'Amazon.com Inc', price: 186.20, change24h: -1.10, change24hPct: -0.59, volume: '24.6M', high24h: 188.50, low24h: 185.00, assetClass: 'Stocks' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 165.80, change24h: 2.15, change24hPct: 1.31, volume: '19.8M', high24h: 166.90, low24h: 163.50, assetClass: 'Stocks' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 242.60, change24h: -5.40, change24hPct: -2.18, volume: '55.3M', high24h: 249.00, low24h: 240.20, assetClass: 'Stocks' },
  { symbol: 'META', name: 'Meta Platforms', price: 562.40, change24h: 8.90, change24hPct: 1.61, volume: '14.2M', high24h: 566.20, low24h: 554.00, assetClass: 'Stocks' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 560.20, change24h: 2.30, change24hPct: 0.41, volume: '62.8M', high24h: 561.40, low24h: 558.00, assetClass: 'ETFs' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 485.60, change24h: 3.80, change24hPct: 0.79, volume: '38.4M', high24h: 487.10, low24h: 482.50, assetClass: 'ETFs' },
  { symbol: 'VOO', name: 'Vanguard S&P 500', price: 512.60, change24h: 2.10, change24hPct: 0.41, volume: '8.4M', high24h: 514.00, low24h: 510.50, assetClass: 'ETFs' },
  { symbol: 'BTC', name: 'Bitcoin (USD)', price: 64200.00, change24h: 1450.00, change24hPct: 2.31, volume: '$28.4B', high24h: 64800.00, low24h: 62900.00, assetClass: 'Crypto' },
  { symbol: 'ETH', name: 'Ethereum (USD)', price: 2640.00, change24h: 65.00, change24hPct: 2.52, volume: '$14.1B', high24h: 2680.00, low24h: 2590.00, assetClass: 'Crypto' },
  { symbol: 'GLD', name: 'SPDR Gold Shares', price: 238.20, change24h: -0.80, change24hPct: -0.34, volume: '6.2M', high24h: 239.50, low24h: 237.60, assetClass: 'Gold' },
  { symbol: 'SLV', name: 'iShares Silver Trust', price: 28.40, change24h: 0.45, change24hPct: 1.61, volume: '18.9M', high24h: 28.75, low24h: 27.90, assetClass: 'Gold' },
  { symbol: 'MFEQX', name: 'AuraVest Alpha Mutual Fund', price: 84.50, change24h: 0.65, change24hPct: 0.78, volume: '1.2M', high24h: 84.90, low24h: 83.80, assetClass: 'Mutual Funds' },
];

const generateInitialCandles = (basePrice: number): CandleData[] => {
  const candles: CandleData[] = [];
  let current = basePrice;
  const now = new Date();
  
  for (let i = 45; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const change = (Math.random() - 0.48) * (basePrice * 0.015);
    const open = current;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.008);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.008);
    const volume = Math.floor(Math.random() * 8000 + 1200);

    candles.push({ time, open, high, low, close, volume });
    current = close;
  }
  return candles;
};

const generateOrderBook = (midPrice: number): OrderBookState => {
  const bids = [];
  const asks = [];
  let bidAccum = 0;
  let askAccum = 0;

  for (let i = 1; i <= 8; i++) {
    const bidPrice = Number((midPrice * (1 - (i * 0.0012))).toFixed(2));
    const bidSize = Math.floor(Math.random() * 450 + 50);
    bidAccum += bidSize;
    bids.push({ price: bidPrice, size: bidSize, total: bidAccum });

    const askPrice = Number((midPrice * (1 + (i * 0.0012))).toFixed(2));
    const askSize = Math.floor(Math.random() * 450 + 50);
    askAccum += askSize;
    asks.push({ price: askPrice, size: askSize, total: askAccum });
  }

  const spread = Number((asks[0].price - bids[0].price).toFixed(2));
  const spreadBps = Number(((spread / midPrice) * 10000).toFixed(1));

  return { bids, asks, spread, spreadBps };
};

export const useMarketStore = create<MarketState>((set, get) => ({
  activeSymbol: 'NVDA',
  activeTimeframe: '15m',
  currentPrice: 130.40,
  change24hPct: 2.85,
  candles: generateInitialCandles(130.40),
  orderBook: generateOrderBook(130.40),
  watchlist: INITIAL_WATCHLIST,
  indicators: {
    rsi: true,
    macd: true,
    bollinger: true,
    ema20: true,
    vwap: true,
  },

  setActiveSymbol: (symbol) => {
    const found = get().watchlist.find(w => w.symbol === symbol);
    const basePrice = found ? found.price : 130.40;
    const changePct = found ? found.change24hPct : 1.25;

    set({
      activeSymbol: symbol,
      currentPrice: basePrice,
      change24hPct: changePct,
      candles: generateInitialCandles(basePrice),
      orderBook: generateOrderBook(basePrice),
    });
  },

  setActiveTimeframe: (timeframe) => {
    const price = get().currentPrice;
    set({
      activeTimeframe: timeframe,
      candles: generateInitialCandles(price),
    });
  },

  toggleIndicator: (indicator) => {
    set((state) => ({
      indicators: {
        ...state.indicators,
        [indicator]: !state.indicators[indicator],
      },
    }));
  },

  streamNextTick: () => {
    const state = get();
    const lastCandle = state.candles[state.candles.length - 1];
    const tickDelta = (Math.random() - 0.49) * (state.currentPrice * 0.0035);
    const newPrice = Number((state.currentPrice + tickDelta).toFixed(2));

    const updatedCandle: CandleData = {
      ...lastCandle,
      close: newPrice,
      high: Math.max(lastCandle.high, newPrice),
      low: Math.min(lastCandle.low, newPrice),
      volume: lastCandle.volume + Math.floor(Math.random() * 50),
    };

    const newCandles = [...state.candles.slice(0, -1), updatedCandle];

    // Also simulate minor micro-ticks across watchlist
    const updatedWatchlist = state.watchlist.map((w) => {
      if (w.symbol === state.activeSymbol) {
        return {
          ...w,
          price: newPrice,
          change24hPct: Number((w.change24hPct + (tickDelta / w.price) * 100).toFixed(2)),
        };
      }
      return w;
    });

    set({
      currentPrice: newPrice,
      candles: newCandles,
      orderBook: generateOrderBook(newPrice),
      watchlist: updatedWatchlist,
    });
  },
}));
