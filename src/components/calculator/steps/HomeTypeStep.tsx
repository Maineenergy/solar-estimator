'use client';

import { useCalculator } from '@/context/CalculatorContext';
import { HOME_TYPES } from '@/lib/calculator-config';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

export default function HomeTypeStep() {
  const { data, updateData, setStep, goBack } = useCalculator();

  const handleSelect = (val: string) => {
    updateData({ homeType: val as any });
    setTimeout(() => setStep('system-type'), 150);
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Please describe this home</h2>
      <ProgressBar currentStep="home-type" />

      <div className="space-y-3">
        {HOME_TYPES.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            className={`radio-option w-full ${data.homeType === opt.id ? 'selected' : ''}`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${data.homeType === opt.id ? 'border-blue-500' : 'border-gray-400'}`}>
              {data.homeType === opt.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              )}
            </div>
            <span className="font-medium text-gray-800">{opt.label}</span>
          </button>
        ))}
      </div>

      <StepNav onBack={goBack} onNext={() => setStep('system-type')} nextDisabled={!data.homeType} />
    </div>
  );
}
