'use client';

import { useCalculator } from '@/context/CalculatorContext';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

const OPTIONS = ['No', 'Yes'] as const;

export default function HasSolarStep() {
  const { data, updateData, setStep, goBack } = useCalculator();

  const handleSelect = (val: typeof OPTIONS[number]) => {
    updateData({ hasSolar: val });
    setTimeout(() => setStep('home-type'), 150);
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Do you currently have solar panels on your home?</h2>
      <ProgressBar currentStep="has-solar" />

      <div className="space-y-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => handleSelect(opt)}
            className={`radio-option w-full ${data.hasSolar === opt ? 'selected' : ''}`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${data.hasSolar === opt ? 'border-blue-500' : 'border-gray-400'}`}>
              {data.hasSolar === opt && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              )}
            </div>
            <span className="font-medium text-gray-800">{opt}</span>
          </button>
        ))}
      </div>

      <StepNav onBack={goBack} onNext={() => setStep('home-type')} nextDisabled={!data.hasSolar} />
    </div>
  );
}
