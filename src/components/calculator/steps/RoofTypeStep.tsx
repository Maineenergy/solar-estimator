'use client';

import { useCalculator } from '@/context/CalculatorContext';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

const ROOF_OPTIONS = [
  { id: 'Metal', label: 'Metal', bg: '#FF7043', pattern: 'metal' },
  { id: 'Shingles', label: 'Shingles', bg: '#78909C', pattern: 'shingles' },
  { id: 'Concrete tiles', label: 'Concrete tiles', bg: '#B0BEC5', pattern: 'concrete' },
  { id: 'Clay or terracotta', label: 'Clay or terracotta', bg: '#FF7043', pattern: 'clay' },
  { id: 'Ground mount', label: 'Ground mount', bg: '#29B6F6', pattern: 'ground' },
  { id: 'Other', label: 'Other', bg: '#FFFFFF', pattern: 'other' },
];

function RoofIcon({ pattern, bg }: { pattern: string; bg: string }) {
  if (pattern === 'other') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-4xl font-black text-blue-500">?</span>
      </div>
    );
  }
  if (pattern === 'ground') {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: '#E0F2FE' }}>
        <svg viewBox="0 0 60 50" fill="none" className="w-12 h-10">
          <rect x="5" y="20" width="50" height="20" rx="2" fill="#1a3a5c" />
          <line x1="5" y1="27" x2="55" y2="27" stroke="#2d6a9f" strokeWidth="1.5" />
          <line x1="5" y1="33" x2="55" y2="33" stroke="#2d6a9f" strokeWidth="1.5" />
          <line x1="22" y1="20" x2="22" y2="40" stroke="#2d6a9f" strokeWidth="1.5" />
          <line x1="38" y1="20" x2="38" y2="40" stroke="#2d6a9f" strokeWidth="1.5" />
          <rect x="0" y="42" width="60" height="4" rx="1" fill="#6B7280" />
        </svg>
      </div>
    );
  }

  // Generic tile patterns
  const isVertical = pattern === 'metal';
  return (
    <div className="w-full h-full" style={{ background: bg, opacity: 0.9 }}>
      <svg viewBox="0 0 60 50" className="w-full h-full opacity-40">
        {isVertical
          ? Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={i * 8} y1="0" x2={i * 8} y2="50" stroke="white" strokeWidth="1.5" />
            ))
          : Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 4 }).map((_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 16 + (row % 2 === 0 ? 0 : 8)}
                  y={row * 11}
                  width="14"
                  height="10"
                  rx="1"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              ))
            )}
      </svg>
    </div>
  );
}

export default function RoofTypeStep() {
  const { data, updateData, setStep, goBack } = useCalculator();

  const handleSelect = (val: string) => {
    updateData({ roofType: val as any });
    setTimeout(() => setStep('roof-repairs'), 150);
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Select your roof type</h2>
      <ProgressBar currentStep="roof-type" />

      <div className="grid grid-cols-3 gap-3 mt-2">
        {ROOF_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            className={`flex flex-col items-center border-2 rounded-xl overflow-hidden cursor-pointer
                        transition-all duration-150 hover:border-blue-400
                        ${data.roofType === opt.id ? 'border-blue-400' : 'border-gray-200'}`}
          >
            <div className="w-full h-20 overflow-hidden">
              <RoofIcon pattern={opt.pattern} bg={opt.bg} />
            </div>
            <span className="text-xs font-semibold text-gray-700 py-2 px-1 text-center leading-tight">
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      <StepNav onBack={goBack} onNext={() => setStep('roof-repairs')} nextDisabled={!data.roofType} />
    </div>
  );
}
