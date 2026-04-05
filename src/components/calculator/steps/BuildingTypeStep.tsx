'use client';

import { useCalculator } from '@/context/CalculatorContext';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

const OPTIONS = ['Residential', 'Commercial'] as const;

export default function BuildingTypeStep() {
  const { data, updateData, setStep, goBack } = useCalculator();

  const handleSelect = (val: typeof OPTIONS[number]) => {
    updateData({ buildingType: val });
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Is this a commercial or residential building?</h2>
      <ProgressBar currentStep="building-type" />

      <div className="space-y-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => handleSelect(opt)}
            className={`radio-option w-full ${data.buildingType === opt ? 'selected' : ''}`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                            ${data.buildingType === opt ? 'border-blue-500' : 'border-gray-400'}`}>
              {data.buildingType === opt && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              )}
            </div>
            <span className="font-medium text-gray-800">{opt}</span>
          </button>
        ))}
      </div>

      <StepNav
        onBack={goBack}
        onNext={() => setStep('ownership')}
        nextDisabled={!data.buildingType}
      />
    </div>
  );
}
