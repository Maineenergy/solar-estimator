'use client';

import { useEffect, useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';

const LOADING_ITEMS = ['Local climate data','Local utilities & electric rates','Current local prices'];

export default function LoadingScreen() {
  const { setStep } = useCalculator();
  const [activeItem, setActiveItem] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActiveItem(prev => Math.min(prev+1,LOADING_ITEMS.length-1)), 800);
    const timer = setTimeout(() => setStep('utility'),3000);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [setStep]);
  return (
    <div className="min-h-screen bg-[#EEF1F6] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Loading the Solar Estimator</h2>
        <div className="space-y-3 text-left">
          {LOADING_ITEMS.map((item,i) => (
            <div key={item} className="flex items-center gap-3">
              <div className={i <= activeItem ? 'w-5 h-5 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin' : 'w-5 h-5 border-2 border-gray-300 rounded-full'} />
              <span className={`text-sm ${i <= activeItem ? 'text-gray-700 font-medium' : 'text-gray-400"}`}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
