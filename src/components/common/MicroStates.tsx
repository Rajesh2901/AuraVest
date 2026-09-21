import type { FC } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const EmptyPortfolio: FC<{onStartSIP: () => void; onImport: () => void}> = ({ onStartSIP, onImport }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#12161D] rounded-2xl border border-[#28313D]">
      <svg className="w-32 h-32 mb-6" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 160L80 110L120 130L160 60" stroke="#103B46" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 160L80 110L120 130L160 60" stroke="#19C3E6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" strokeDashoffset="0" className="animate-[dash_2s_ease-in-out_infinite]"/>
        <circle cx="160" cy="60" r="12" fill="#19C3E6" />
        <circle cx="160" cy="60" r="24" fill="#19C3E6" fillOpacity="0.2" className="animate-pulse" />
      </svg>
      <h3 className="text-xl font-bold text-[#F4F7FA] mb-2">Your wealth journey starts here</h3>
      <p className="text-[#9AA6B2] max-w-md mb-8">Build your portfolio by starting a systematic investment plan or importing your existing assets.</p>
      <div className="flex gap-4">
        <button 
          onClick={onStartSIP}
          className="bg-[#19C3E6] text-[#0B0D12] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#19C3E6]/90 transition-colors cursor-pointer"
        >
          Start First SIP
        </button>
        <button 
          onClick={onImport}
          className="bg-transparent border border-[#28313D] text-[#F4F7FA] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#171C24] transition-colors cursor-pointer"
        >
          Import Portfolio
        </button>
      </div>
    </div>
  );
};

export const OrderProcessing: FC<{symbol: string; side: string; quantity: string}> = ({ symbol, side, quantity }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Loader2 size={48} className="text-[#19C3E6] animate-spin mb-4" />
      <h3 className="text-lg font-medium text-[#F4F7FA] mb-2">Placing order...</h3>
      <p className="text-[#9AA6B2] text-sm">
        {side.toUpperCase()} {quantity} {symbol}
      </p>
    </div>
  );
};

export const OrderSuccess: FC<{message: string; onDismiss: () => void}> = ({ message, onDismiss }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-[#42D392]/10 rounded-full flex items-center justify-center mb-4">
        <CheckCircle2 size={32} className="text-[#42D392]" />
      </div>
      <h3 className="text-lg font-bold text-[#F4F7FA] mb-2">Success</h3>
      <p className="text-[#9AA6B2] text-sm mb-6">{message}</p>
      <button 
        onClick={onDismiss}
        className="bg-[#171C24] border border-[#28313D] text-[#F4F7FA] font-medium px-6 py-2 rounded-lg hover:bg-[#28313D] transition-colors cursor-pointer"
      >
        Done
      </button>
    </div>
  );
};

export const OrderError: FC<{message: string; onRetry: () => void}> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-[#FF5C5C]/10 rounded-full flex items-center justify-center mb-4">
        <AlertCircle size={32} className="text-[#FF5C5C]" />
      </div>
      <h3 className="text-lg font-bold text-[#F4F7FA] mb-2">Order Failed</h3>
      <p className="text-[#9AA6B2] text-sm mb-6">{message}</p>
      <button 
        onClick={onRetry}
        className="bg-[#171C24] border border-[#28313D] text-[#F4F7FA] font-medium px-6 py-2 rounded-lg hover:bg-[#28313D] transition-colors cursor-pointer"
      >
        Retry
      </button>
    </div>
  );
};

export const SkeletonCard: FC<{lines?: number}> = ({ lines = 3 }) => {
  return (
    <div className="p-4 bg-[#12161D] rounded-xl border border-[#28313D] animate-pulse w-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#171C24]"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#171C24] rounded w-1/3"></div>
          <div className="h-3 bg-[#171C24] rounded w-1/4"></div>
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-3 bg-[#171C24] rounded w-full"></div>
        ))}
      </div>
    </div>
  );
};
