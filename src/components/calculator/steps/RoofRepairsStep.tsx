'use client';

import { useCalculator } from '@/context/CalculatorContext';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

const OPTIONS = [
  {
    id: 'Roof is fine',
    label: 'Roof is fine',
    icon: (
      <svg viewBox="0 0 60 55" fill="none" className="w-14 h-12">
        <path d="M30 5 L55 28 L50 28 L50 50 L10 50 L10 28 L5 28 Z" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="22" y="36" width="16" height="14" rx="2" fill="#F97316" />
        {/* Sun */}
        <circle cx="43" cy="15" r="6" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
        <line x1="43" y1="7" x2="43" y2="5" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="49" y1="9" x2="51" y2="7" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="51" y1="15" x2="53" y2="15" stroke="#F59E0B" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'Minor repairs',
    label: 'Minor repairs',
    icon: (
      <svg viewBox="0 0 60 55" fill="none" className="w-14 h-12">
        <path d="M30 5 L55 28 L50 28 L50 50 L10 50 L10 28 L5 28 Z" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="22" y="36" width="16" height="14" rx="2" fill="#F97316" />
        {/* Ladder */}
        <line x1="44" y1="15" x2="44" y2="45" stroke="#6B7280" strokeWidth="2" />
        <line x1="50" y1="15" x2="50" y2="45" stroke="#6B7280" strokeWidth="2" />
        <line x1="44" y1="22" x2="50" y2="22" stroke="#6B7280" strokeWidth="1.5" />
        <line x1="44" y1="29" x2="50" y2="29" stroke="#6B7280" strokeWidth="1.5" />
        <line x1="44" y1="36" x2="50" y2="36" stroke="#6B7280" strokeWidth="1.5" />
        {/* Worker */}
        <circle cx="47" cy="12" r="4" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'Need to re-roof',
    label: 'Need to re-roof',
    icon: (
      <svg viewBox="0 0 60 55" fill="none" className="w-14 h-12">
        <path d="M30 8 L52 28 L48 28 L48 50 L12 50 L12 28 L8 28 Z" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="22" y="36" width="16" height="14" rx="2" fill="#F97316" />
        {/* Crane arm */}
        <line x1="50" y1="50" x2="50" y2="10" stroke="#6B7280" strokeWidth="2" />
        <line x1="50" y1="10" x2="30" y2="10" stroke="#6B7280" strokeWidth="2" />
        <line x1="30" y1="10" x2="30" y2="25" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    id: 'Unsure',
    label: 'Unsure',
    icon: (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-5xl font-black text-blue-500">?</span>
      </div>
    ),
  },
];

export default function RoofRepairsStep() {
  const { data, updateData, setStep, goBack } = useCalculator();

  const handleSelect = (val: string) => {
    updateData({ roofRepairs: val as any });
    setTimeout(() => setStep('name'), 150);
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Are roof repairs needed before solar?</h2>
      <ProgressBar currentStep="roof-repairs" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            className={`icon-card ${data.roofRepairs === opt.id ? 'selected' : ''}`}
          >
            <div className="h-14 flex items-center justify-center">
              {opt.icon}
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      <StepNav onBack={goBack} onNext={() => setStep('name')} nextDisabled={!data.roofRepairs} />
    </div>
  );
}
