'use client';

import { useCalculator } from '@/context/CalculatorContext';
import { SYSTEM_TYPES } from '@/lib/calculator-config';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

export default function SystemTypeStep() {
  const { data, updateData, setStep, goBack } = useCalculator();

  const handleSelect = (val: string) => {
    updateData({ systemType: val as any });
    setTimeout(() => setStep('roof-type'), 150);
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Select system type</h2>
      <ProgressBar currentStep="system-type" />

      <div className="grid grid-cols-2 gap-4 mt-2">
        {SYSTEM_TYPES.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            className={`icon-card ${data.systemType === opt.id ? 'selected' : ''}`}
          >
            {/* Icon illustration */}
            <div className={`w-20 h-16 rounded-xl flex items-center justify-center mb-1
                            ${data.systemType === opt.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {opt.id === 'Solar' ? (
                <svg viewBox="0 0 80 60" fill="none" className="w-16 h-12">
                  {/* Solar panel */}
                  <rect x="10" y="20" width="40" height="28" rx="2" fill="#1a3a5c" />
                  <line x1="10" y1="29" x2="50" y2="29" stroke="#2d6a9f" strokeWidth="1.5" />
                  <line x1="10" y1="38" x2="50" y2="38" stroke="#2d6a9f" strokeWidth="1.5" />
                  <line x1="24" y1="20" x2="24" y2="48" stroke="#2d6a9f" strokeWidth="1.5" />
                  <line x1="36" y1="20" x2="36" y2="48" stroke="#2d6a9f" strokeWidth="1.5" />
                  {/* Power line */}
                  <path d="M55 15 L65 10 M65 10 L75 15 M65 10 L65 50" stroke="#666" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg viewBox="0 0 80 60" fill="none" className="w-16 h-12">
                  {/* Solar panel small */}
                  <rect x="5" y="20" width="28" height="22" rx="2" fill="#1a3a5c" />
                  <line x1="5" y1="27" x2="33" y2="27" stroke="#2d6a9f" strokeWidth="1" />
                  <line x1="5" y1="34" x2="33" y2="34" stroke="#2d6a9f" strokeWidth="1" />
                  <line x1="16" y1="20" x2="16" y2="42" stroke="#2d6a9f" strokeWidth="1" />
                  <line x1="24" y1="20" x2="24" y2="42" stroke="#2d6a9f" strokeWidth="1" />
                  {/* Battery */}
                  <rect x="42" y="18" width="30" height="24" rx="3" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5" />
                  <rect x="55" y="14" width="5" height="4" rx="1" fill="#9CA3AF" />
                  {/* + - */}
                  <text x="50" y="32" fill="#22C55E" fontSize="10" fontWeight="bold">+</text>
                  <text x="63" y="32" fill="#EF4444" fontSize="10" fontWeight="bold">-</text>
                  {/* lightning bolt */}
                  <path d="M56 22 L52 30 L57 30 L53 38" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <span className="text-sm font-semibold text-gray-800 leading-tight">{opt.label}</span>
          </button>
        ))}
      </div>

      <StepNav onBack={goBack} onNext={() => setStep('roof-type')} nextDisabled={!data.systemType} />
    </div>
  );
}
