'use client';

import React from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';
import RangeSlider from '@/components/ui/RangeSlider';
import { BILL_CONFIG, STEP_TO_STAGE } from '@/lib/calculator-config';

export default function StepMonthlyBill() {
  const { data, setStep, updateData } = useCalculator();

  const handleNext = () => {
    // Transition to next step
    setStep('address');
  };

  const handleBack = () => {
    setStep('utility');
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="bill" />}
      showBackButton={true}
      onBack={handleBack}
      showNextButton={true}
      nextButtonLabel="Next →"
      onNext={handleNext}
    >
      <h2 className="step-title">What is your most recent utility bill?</h2>

      <div className="mb-8">
        <RangeSlider
          value={data.monthlyBill}
          onChange={(value) => updateData({ monthlyBill: value })}
          min={BILL_CONFIG.min}
          max={BILL_CONFIG.max}
          step={BILL_CONFIG.step}
          showValue={true}
          currency={true}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        Move the slider to match your monthly electricity bill
      </p>
    </StepCard>
  );
}
