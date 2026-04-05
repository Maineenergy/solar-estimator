'use client';

import React from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';
import RadioList from '@/components/ui/RadioList';
import { HOME_TYPES } from '@/lib/calculator-config';

const HOME_OPTIONS = HOME_TYPES.map((t) => ({
  id: t.id,
  label: t.label,
}));

export default function StepHomeType() {
  const { data, setStep, updateData } = useCalculator();

  const handleSelect = (value: string) => {
    updateData({ homeType: value as any });
    // Auto-advance to next step
    setStep('system-type');
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="home-type" />}
      showBackButton={true}
      onBack={() => setStep('has-solar')}
    >
      <h2 className="step-title">Please describe this home</h2>

      <div className="mb-8">
        <RadioList
          options={HOME_OPTIONS}
          value={data.homeType}
          onChange={handleSelect}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        This impacts installation complexity and cost
      </p>
    </StepCard>
  );
}
