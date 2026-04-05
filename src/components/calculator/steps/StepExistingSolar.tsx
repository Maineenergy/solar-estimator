'use client';

import React from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';
import RadioList from '@/components/ui/RadioList';

const SOLAR_OPTIONS = [
  { id: 'No', label: 'No, no solar panels' },
  { id: 'Yes', label: 'Yes, I have solar panels' },
];

export default function StepExistingSolar() {
  const { data, setStep, updateData } = useCalculator();

  const handleSelect = (value: string) => {
    updateData({ hasSolar: value as 'Yes' | 'No' });
    // Auto-advance to next step
    setStep('home-type');
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="has-solar" />}
      showBackButton={true}
      onBack={() => setStep('ownership')}
    >
      <h2 className="step-title">Do you currently have solar panels on your home?</h2>

      <div className="mb-8">
        <RadioList
          options={SOLAR_OPTIONS}
          value={data.hasSolar}
          onChange={handleSelect}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        This helps us understand your current setup
      </p>
    </StepCard>
  );
}
