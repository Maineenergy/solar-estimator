'use client';

import { useCalculator } from '@/context/CalculatorContext';
import { BILL_CONFIG } from '@/lib/calculator-config';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

export default function BillStep() {
  const { data, updateData, setStep, goBack } = useCalculator();
  const bill = data.monthlyBill;

  // Compute slider fill percentage
  const pct = ((bill - BILL_CONFIG.min) / (BILL_CONFIG.max - BILL_CONFIG.min)) * 100;

  const handleNext = () => setStep('address');

  return (
    <div className="step-enter">
      <h2 className="step-title">What is your most recent utility bill?</h2>

      <ProgressBar currentStep="bill" />

      {/* Bill amount display */}
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-blue-600">
          ${bill >= BILL_CONFIG.max ? `${BILL_CONFIG.max}+` : bill}
        </span>
      </div>

      {/* Slider */}
      <div className="px-2">
        <div className="relative">
          <input
            type="range"
            min={BILL_CONFIG.min}
            max={BILL_CONFIG.max}
            step={BILL_CONFIG.step}
            value={bill}
            onChange={(e) => updateData({ monthlyBill: parseInt(e.target.value) })}
            className="w-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1D4ED8 ${pct}%, #E5E7EB ${pct}%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-sm font-semibold text-gray-600 mt-2">
          <span>${BILL_CONFIG.min}</span>
          <span>{BILL_CONFIG.maxLabel}</span>
        </div>
      </div>

      <StepNav onBack={goBack} onNext={handleNext} />
    </div>
  );
}
