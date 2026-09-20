# AuraVest — Autonomous Wealth & Institutional Trading OS

[![Live Production Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-10B981?style=for-the-badge&logo=github)](https://rajesh2901.github.io/AuraVest/)
[![React](https://img.shields.io/badge/React-19.2-3B82F6?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge)]()

> **AuraVest** is an all-in-one, high-performance financial technology web platform engineered to bridge retail beginner wealth creation with institutional-grade day trading execution. It features a seamless **Dual-Mode UX Architecture** ("Simple Mode" vs. "Pro Terminal Mode"), sub-16ms financial canvas visualization, real-time micro-reactive state management, and an **AI-driven predictive forecasting engine** with probabilistic variance confidence bands.

🌐 **Live Application**: [https://rajesh2901.github.io/AuraVest/](https://rajesh2901.github.io/AuraVest/)  
📦 **Source Repository**: [https://github.com/Rajesh2901/AuraVest](https://github.com/Rajesh2901/AuraVest)

---

## 🏛️ Architectural Overview & System Design

```
+---------------------------------------------------------------------------------------------------+
|                                       AURAVEST CLIENT (SPA)                                       |
|  [ BRAND HEADER ]               [ NAVIGATION TABS ]            [ MODE SWITCHER: SIMPLE / PRO ]    |
+---------------------------------------------------------------------------------------------------+
                                                  |
                    +-----------------------------+-----------------------------+
                    |                                                           |
                    v                                                           v
+---------------------------------------+                   +---------------------------------------+
|              SIMPLE MODE              |                   |           PRO TERMINAL MODE           |
|  * Jargon-Free Onboarding & Metrics   |                   |  * Multi-Pane Trading Desk Layout     |
|  * Visual Asset Allocation Donut      |                   |  * Virtualized Live Watchlist (3 Cols)|
|  * Goal-Based Compounding SIP Planner |                   |  * Candlestick Canvas & Overlays (6C) |
|  * 1-Click Thematic Smart Baskets     |                   |  * Level-2 Market Depth Ladder (3C)   |
|    (Tech AI, Bluechip, Clean Energy)  |                   |  * Bracket / Stop-Loss Order Ticket   |
+---------------------------------------+                   +---------------------------------------+
                    |                                                           |
                    +-----------------------------+-----------------------------+
                                                  |
                                                  v
+---------------------------------------------------------------------------------------------------+
|                              UNIFIED ASSET DEEP-DIVE & AI ENGINE                                  |
|  * Universal Explorer: Mutual Funds (Expense Ratio, Overlap, Manager) & Equities (P/E, ROE, Cash) |
|  * AI Prediction Wrapper: 1Y / 3Y / 5Y Monte Carlo Confidence Bands (+2σ, μ, -2σ)                 |
|  * Sentiment Speedometer: News NLP & Social Volume composite (0 Fear to 100 Greed)                |
|  * Regulatory Risk Warning: SEC / SEBI compliant probabilistic simulation disclaimer              |
+---------------------------------------------------------------------------------------------------+
```

---

## ⚡ Core Feature Modules

### 1. Dual-Mode UX Architecture
* **Simple Mode**:
  * **Jargon-Free Metrics**: High-contrast, clean presentation of Total Net Worth, Invested Capital, Today's P&L, Overall Returns (Absolute & XIRR), and Available Cash.
  * **Interactive Asset Allocation Donut**: Dynamic SVG visualization across 5 asset classes (Stocks 45%, Mutual Funds 28%, ETFs 14%, Gold 8%, Crypto 5%) with segment hover isolation and click-filtering.
  * **Goal-Based Automated SIP Planner**: Compounding calculator with interactive sliders for Target Goal Capital (\$10k–\$500k), Investment Horizon (1–25 Years), and Expected CAGR (8%–22%). Automatically computes exact required monthly SIP contributions.
  * **One-Click Thematic Smart Baskets**: Curated portfolios (*Tech & AI Megacap Leaders*, *Bluechip Dividend Aristocrats*, *Clean Energy & Infrastructure*) executable with a single tap.

* **Pro Terminal Mode**:
  * **Multi-Pane Workspace Layout**: Optimized 3-pane trading layout designed for high information density and zero visual clutter.
  * **Virtualized Live Watchlist**: High-frequency streaming ticker panel rendering 15+ equities, ETFs, and crypto pairs with green/red price flash animations and instant category filters.
  * **Multi-Timeframe Candlestick Engine**: Canvas/SVG candlestick chart supporting 1m, 5m, 15m, 1h, 1D, and 1W intervals with sub-second tick interpolation.
  * **Technical Indicator Overlays**: Real-time overlays for RSI (14), MACD, EMA 20, VWAP, and Bollinger Bands.
  * **Level-2 Order Book Depth Ladder**: Live visual bid/ask ladders with proportional depth wall bars and real-time spread tracking in basis points (bps).
  * **Advanced Order Ticket**: Supports `MARKET`, `LIMIT`, `STOP_LOSS`, and `BRACKET` (OCO — One-Cancels-Other) orders with dynamic 4x intra-day margin validation.

---

### 2. AI Predictive Analytics & Variance Envelope Engine
* **Multi-Horizon Trajectory Projections**:
  * Algorithmic forecasting models generating 1-Year, 3-Year, and 5-Year price trajectories.
  * **Confidence Interval Envelopes**:
    * **Bullish Target ($+2\sigma$)**: Upper $+95.4\%$ statistical envelope.
    * **Expected Drift ($\mu$)**: Autoregressive median trajectory based on historical drift and earnings yields.
    * **Conservative Base Floor ($-2\sigma$)**: Lower $-95.4\%$ support envelope.
* **Aggregated Market Sentiment Gauge**:
  * Real-time semi-circular speedometer dial mapping composite market emotion from `0` (Extreme Fear) to `100` (Extreme Greed).
  * Weighted sub-scores for News NLP Headline Sentiment, Social Buzz Volume, and Institutional Insider Activity.
  * Contextual AI Executive Brief synthesized per asset.
* **Regulatory Compliance & Risk Disclaimers**:
  * Mandatory FINRA / SEC / SEBI compliant disclosure highlighting that all AI projections are probabilistic mathematical simulations and not fiduciary financial advice.

---

### 3. Universal Asset Deep-Dive (Mutual Funds & Equities)
* **Direct Equities**: P/E Ratio (TTM), Forward P/E, Return on Equity (ROE), Debt-to-Equity balance sheet health, and Cash per Share reserves.
* **Mutual Funds & ETFs**: Annual Expense Ratios, Fund Manager pedigree (years of experience, total AUM), Top 10 underlying portfolio holdings, and Holdings Overlap benchmarks.
* **Trailing Compound Growth**: Multi-period historical performance grid (1M, 6M, 1Y, 3Y, 5Y).

---

## 🛠️ Technology Stack & Engineering Standards

| Layer | Technology | Architectural Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** + **Vite 8** | Sub-16ms render loops, instant Hot Module Replacement (HMR), and modern standalone components. |
| **Language** | **TypeScript 6.0** | Strict mode enabled with `verbatimModuleSyntax` and type-only import enforcement. |
| **Styling System** | **Tailwind CSS v4** | Dark fintech color tokens (`#080B11`), backdrop glassmorphism (`backdrop-blur-xl`), and high-contrast typography. |
| **State Management** | **Zustand** | Micro-reactive stores with atomic selectors preventing dashboard-wide DOM reconciliation during high-frequency ticks. |
| **Financial Visualization** | **Canvas / SVG Wrappers** | Custom mathematical path generators for candlestick charting, donut rings, and confidence interval bands. |
| **Iconography** | **Lucide React** | Clean, accessible financial and interface icons. |
| **Hosting & CI/CD** | **GitHub Pages** | Automated static deployment pipeline serving the production bundle with relative asset paths. |

---

## 📂 Project Directory Structure

```
auravest/
├── public/
│   ├── favicon.svg                  # Brand favicon
│   └── icons.svg                    # SVG sprite definitions
├── src/
│   ├── types/
│   │   └── index.ts                 # Strongly-typed domain models & financial contracts
│   ├── stores/
│   │   ├── useAppStore.ts           # Global App Mode ('simple' vs. 'pro') & Theme state
│   │   ├── usePortfolioStore.ts     # Portfolio balances, Net Worth, XIRR, Margin, Allocations
│   │   ├── useMarketStore.ts        # Watchlist, streaming candles, L2 depth, indicator toggles
│   │   └── usePredictionStore.ts    # 1Y/3Y/5Y projection matrices & sentiment models
│   ├── components/
│   │   ├── common/
│   │   │   └── VirtualizedWatchlist.tsx # High-performance streaming watchlist with price flashes
│   │   ├── navigation/
│   │   │   └── Navbar.tsx           # Global header with mode switcher and search
│   │   ├── dashboard/
│   │   │   ├── DualModeDashboard.tsx # Master layout morphing between Simple and Pro
│   │   │   └── GlobalDashboard.tsx  # Unified portfolio overview
│   │   ├── ai-engine/
│   │   │   ├── AIPredictiveChartWrapper.tsx # Standalone AI variance envelope & sentiment dial
│   │   │   └── AIPredictionEngine.tsx
│   │   ├── beginner/
│   │   │   └── BeginnerHub.tsx      # Jargon-free Learn & Invest, Goal SIP Planner, Smart Baskets
│   │   ├── explorer/
│   │   │   ├── AssetExplorer.tsx    # Multi-asset filterable catalog
│   │   │   └── AssetDeepDiveModal.tsx # Universal deep-dive modal (Mutual Funds & Equities)
│   │   └── trading/
│   │       └── TradingTerminal.tsx  # Pro multi-timeframe candlestick terminal
│   ├── index.css                    # Tailwind CSS v4 directives & glassmorphism classes
│   ├── App.tsx                      # Root shell routing & modal controller
│   └── main.tsx                     # Application bootstrap
├── vite.config.ts                   # Vite configuration with React & Tailwind plugins
├── tsconfig.app.json                # Strict TypeScript configuration
└── package.json
```

---

## 🚀 Local Development Quickstart

### Prerequisites
* **Node.js**: `v20.0.0` or higher
* **npm**: `v10.0.0` or higher

### Installation & Run
```bash
# 1. Clone repository
git clone https://github.com/Rajesh2901/AuraVest.git
cd AuraVest

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will launch locally at `http://localhost:5173/`.

### Production Build & Preview
```bash
# Compile TypeScript & generate production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Security & Compliance Safeguards

1. **Client-Side Simulation Integrity**: All predictive variance envelopes and sentiment gauges explicitly state their probabilistic nature.
2. **Zero Fiduciary Advice Disclaimer**: Compliant with SEC Rule 204-3 and SEBI Investment Advisers Regulations.
3. **Secret Isolation**: Zero hardcoded API tokens; external feed adapters utilize environment variable bridges.

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Architected & Developed by [Rajesh Kannan](https://github.com/Rajesh2901)**  
*Principal UI/UX Architect & Senior Full-Stack Fintech Engineer*
