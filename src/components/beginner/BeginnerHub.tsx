import React, { useState } from 'react';
import { usePortfolioStore } from '../../stores/usePortfolioStore';
import type { SmartBasket } from '../../types';
import { 
  BookOpen, 
  Target, 
  Layers, 
  Sparkles, 
  Shield, 
  Zap, 
  Calculator 
} from 'lucide-react';

const SMART_BASKETS: SmartBasket[] = [
  {
    id: 'b1',
    name: 'Tech & AI Pioneers',
    category: 'High Growth Equities',
    riskLevel: 'High',
    minInvestment: 500,
    cagr3Y: 34.2,
    description: 'Curated leaders at the forefront of semiconductor compute, hyperscale cloud, and generative AI infrastructure.',
    holdings: [
      { name: 'NVIDIA (NVDA)', allocationPct: 35 },
      { name: 'Microsoft (MSFT)', allocationPct: 30 },
      { name: 'Alphabet (GOOGL)', allocationPct: 20 },
      { name: 'Broadcom (AVGO)', allocationPct: 15 },
    ],
    tags: ['Artificial Intelligence', 'Megacap', 'Semiconductors'],
  },
  {
    id: 'b2',
    name: 'Bluechip Dividend Aristocrats',
    category: 'Defensive Income',
    riskLevel: 'Low',
    minInvestment: 250,
    cagr3Y: 14.8,
    description: 'Companies that have consistently increased dividends for 25+ consecutive years, offering strong downside defense.',
    holdings: [
      { name: 'Johnson & Johnson (JNJ)', allocationPct: 30 },
      { name: 'Procter & Gamble (PG)', allocationPct: 25 },
      { name: 'Coca-Cola (KO)', allocationPct: 25 },
      { name: 'Chevron (CVX)', allocationPct: 20 },
    ],
    tags: ['Cash Flow', 'Low Volatility', 'Passive Dividends'],
  },
  {
    id: 'b3',
    name: 'Global Clean Energy Transition',
    category: 'Thematic ESG',
    riskLevel: 'Moderate',
    minInvestment: 300,
    cagr3Y: 21.5,
    description: 'Direct exposure to solar, modern power grids, and next-generation storage infrastructure worldwide.',
    holdings: [
      { name: 'NextEra Energy (NEE)', allocationPct: 35 },
      { name: 'Enphase Energy (ENPH)', allocationPct: 25 },
      { name: 'iShares Clean Energy (ICLN)', allocationPct: 25 },
      { name: 'First Solar (FSLR)', allocationPct: 15 },
    ],
    tags: ['Renewables', 'Green Energy', 'Grid Modernization'],
  },
];

export const BeginnerHub: React.FC<{ onInvestBasket: (name: string, amount: number) => void }> = ({ onInvestBasket }) => {
  const { executeTrade } = usePortfolioStore();

  // Goal SIP Calculator State
  const [goalName, setGoalName] = useState('Dream Home');
  const [targetAmount, setTargetAmount] = useState(100000);
  const [horizonYears, setHorizonYears] = useState(7);
  const [expectedCAGR, setExpectedCAGR] = useState(12);

  // Risk Appetite Wizard State
  const [riskAnswers, setRiskAnswers] = useState<number[]>([1, 2, 2]);
  const [activeStep, setActiveStep] = useState(0);

  // Calculate Monthly SIP using future value formula: FV = P * [((1+r)^n - 1) / r] * (1+r)
  const monthlyRate = expectedCAGR / 100 / 12;
  const totalMonths = horizonYears * 12;
  const monthlySIPRequired = Math.round(
    targetAmount / (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate))
  );

  const getRiskProfile = () => {
    const sum = riskAnswers.reduce((a, b) => a + b, 0);
    if (sum <= 3) return { title: 'Conservative Capital Preserver', badge: 'Low Risk', color: 'text-emerald-400' };
    if (sum <= 6) return { title: 'Balanced Wealth Compounder', badge: 'Moderate Risk', color: 'text-blue-400' };
    return { title: 'Aggressive Growth Hunter', badge: 'High Growth', color: 'text-purple-400' };
  };

  const handleBasketInvest = (basket: SmartBasket) => {
    executeTrade(basket.name, 'BUY', basket.minInvestment, 100);
    onInvestBasket(basket.name, basket.minInvestment);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-8 border border-slate-700/80 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Beginner-First Investing Suite
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Start Simple. Grow Big. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              No Wall Street Jargon.
            </span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Whether planning for a future home, retirement, or financial independence, AuraVest automates disciplined wealth creation with smart baskets, compounding calculators, and personalized risk profiling.
          </p>
        </div>
      </div>

      {/* 2. THREE CORE COLUMNS: LEARN & INVEST, GOAL SIP PLANNER, RISK QUIZ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* A: Learn & Invest (Jargon-Free Flashcards) */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4" /> Learn & Invest: Core Fundamentals
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                <span className="font-bold text-white block mb-0.5">What is a SIP?</span>
                <span className="text-slate-400">A Systematic Investment Plan automatically invests a fixed amount monthly, smoothing market dips via Dollar-Cost Averaging.</span>
              </div>

              <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                <span className="font-bold text-white block mb-0.5">Why Expense Ratios Matter?</span>
                <span className="text-slate-400">It is the annual management fee charged by mutual funds. A lower expense ratio (e.g. &lt;0.25%) keeps more returns in your pocket.</span>
              </div>

              <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                <span className="font-bold text-white block mb-0.5">The Magic of Compounding</span>
                <span className="text-slate-400">Earning interest on your previously earned returns. Over 10+ years, compounding can exceed your initial capital by 3x to 5x.</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
            💡 Verified by AuraVest Wealth Academy Curriculum
          </div>
        </div>

        {/* B: Goal-Based SIP Planner */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Target className="w-4 h-4" /> Goal-Based SIP Planner
            </div>
            <Calculator className="w-4 h-4 text-slate-500" />
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Target Life Goal</label>
              <select
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
              >
                <option value="Dream Home">🏡 First Dream Home ($100k)</option>
                <option value="Retirement Wealth">🏖️ Financial Independence / Retirement ($500k)</option>
                <option value="Child Higher Education">🎓 Child Higher Education ($60k)</option>
                <option value="World Travel Fund">✈️ World Travel Fund ($20k)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Target Capital:</span>
                <span className="font-mono font-bold text-white">${targetAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Investment Horizon:</span>
                <span className="font-mono font-bold text-white">{horizonYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Expected Annual CAGR:</span>
                <span className="font-mono font-bold text-white">{expectedCAGR}%</span>
              </div>
              <input
                type="range"
                min="6"
                max="24"
                step="1"
                value={expectedCAGR}
                onChange={(e) => setExpectedCAGR(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Calculated SIP Result Card */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-center">
              <span className="text-[11px] text-blue-300 font-semibold block uppercase">Required Monthly Investment</span>
              <div className="text-2xl font-black text-white font-mono my-1">
                ${monthlySIPRequired.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ mo</span>
              </div>
              <span className="text-[10px] text-blue-300/80">
                To achieve ${targetAmount.toLocaleString()} in {horizonYears} years @ {expectedCAGR}% CAGR
              </span>
            </div>
          </div>
        </div>

        {/* C: Interactive Risk Appetite Wizard */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                <Shield className="w-4 h-4" /> Risk-Appetite Profiler
              </div>
              <span className="text-xs font-mono text-slate-500">Step {activeStep + 1}/3</span>
            </div>

            {activeStep === 0 && (
              <div className="space-y-3 text-xs">
                <p className="text-white font-semibold">1. If your portfolio dropped 15% in a single month during a market pullback, what would you do?</p>
                <div className="space-y-2">
                  {[
                    { text: 'Sell immediately to prevent further loss', val: 1 },
                    { text: 'Hold tight and wait for market recovery', val: 2 },
                    { text: 'Buy aggressively to average down at a discount', val: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        const next = [...riskAnswers];
                        next[0] = opt.val;
                        setRiskAnswers(next);
                        setActiveStep(1);
                      }}
                      className={`w-full p-2.5 text-left rounded-xl border transition text-xs ${
                        riskAnswers[0] === opt.val
                          ? 'bg-purple-600/30 border-purple-500 text-white'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-3 text-xs">
                <p className="text-white font-semibold">2. What is your primary investment objective?</p>
                <div className="space-y-2">
                  {[
                    { text: 'Preserve initial capital with inflation beat', val: 1 },
                    { text: 'Balanced steady growth with moderate dividends', val: 2 },
                    { text: 'Maximum long-term wealth compounding', val: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        const next = [...riskAnswers];
                        next[1] = opt.val;
                        setRiskAnswers(next);
                        setActiveStep(2);
                      }}
                      className={`w-full p-2.5 text-left rounded-xl border transition text-xs ${
                        riskAnswers[1] === opt.val
                          ? 'bg-purple-600/30 border-purple-500 text-white'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-3 text-xs">
                <p className="text-white font-semibold">3. How long do you plan to keep your capital invested?</p>
                <div className="space-y-2">
                  {[
                    { text: 'Less than 2 years (Short horizon)', val: 1 },
                    { text: '3 to 7 years (Medium horizon)', val: 2 },
                    { text: '8+ years (Long generational horizon)', val: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => {
                        const next = [...riskAnswers];
                        next[2] = opt.val;
                        setRiskAnswers(next);
                      }}
                      className={`w-full p-2.5 text-left rounded-xl border transition text-xs ${
                        riskAnswers[2] === opt.val
                          ? 'bg-purple-600/30 border-purple-500 text-white'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
              <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block">Identified Investor Profile</span>
              <span className={`text-sm font-bold ${getRiskProfile().color} block mt-0.5`}>
                {getRiskProfile().title}
              </span>
            </div>
            {activeStep > 0 && (
              <button 
                onClick={() => setActiveStep(0)} 
                className="w-full text-center text-[10px] text-slate-400 hover:text-white mt-2 underline"
              >
                Retake Questionnaire
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. ONE-CLICK SMART BASKETS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              One-Click Thematic Smart Baskets
            </h2>
            <p className="text-xs text-slate-400">
              Institutional-grade multi-stock diversification with a single tap. Instant portfolio rebalancing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SMART_BASKETS.map((basket) => (
            <div
              key={basket.id}
              className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">{basket.category}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    basket.riskLevel === 'High' 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                      : basket.riskLevel === 'Moderate'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {basket.riskLevel} Risk
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
                  {basket.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {basket.description}
                </p>

                <div className="my-4 py-3 border-y border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">3-Year Trailing CAGR</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">+{basket.cagr3Y}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Min. Starting Capital</span>
                    <span className="text-lg font-black text-white font-mono">${basket.minInvestment}</span>
                  </div>
                </div>

                {/* Holdings Weights */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Top Basket Weights</span>
                  {basket.holdings.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 truncate">{h.name}</span>
                      <span className="font-mono text-slate-400">{h.allocationPct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleBasketInvest(basket)}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Zap className="w-4 h-4" /> One-Click Invest (${basket.minInvestment})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
