'use client';

import { useEffect, useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';

const LOADING_ITEMS = [
  'Local climate data',
  'Local utilities & electric rates',
  'Current local prices',
];

export default function LoadingScreen() {
  const { setStep } = useCalculator();
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => Math.min(prev + 1, LOADING_ITEMS.length - 1));
    }, 800);
    const timer = setTimeout(() => {
      setStep('utility');
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [setStep]);

  return (
    <div className="min-h-screen bg-[#EEF1F6] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-sm w-full">
        <div className="flex items-center justify-center gap-8 mb-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center shadow-lg animate-[pulse_2s_ease-in-out_infinite]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" className="w-11 h-11">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </div>
          <div className="w-16 h-16 bg-[#1E3A5F] rounded-xl flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-10 h-10">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Loading the Solar Estimator</h2>
        <div className="space-y-3 text-left">
          {LOADING_ITEMS.map((item, i) => (
            <div key={item} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5">
                {i <= activeItem ? (
                  <div className="w-5 h-5 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                )}
              </div>
              <span className={`text-sm ${i <= activeItem ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                {item}
              </span>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-xs mt-8">This may take a few seconds</p>
      </div>
    </div>
  );
}
