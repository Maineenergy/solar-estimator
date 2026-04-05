'use client';

import React from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';
import RadioList from '@/components/ui/RadioList';

const BUILDING_OPTIONS = [
  { id: 'Residential', label: 'Residential' },
  { id: 'Commercial', label: 'Commercial' },
];

export default function StepBuildingType() {
  const { data, setStep, updateData } = useCalculator();

  const handleSelect = (value: string) => {
    updateData({ buildingType: value as 'Residential' | 'Commercial' });
    // Auto-advance to next step
    setStep('ownership');
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="building-type" />}
      showBackButton={true}
      onBack={() => setStep('marker')}
    >
      <h2 className="step-title">Is this a commercial or residential building?</h2>

      <div className="mb-8">
        <RadioList
          options={BUILDING_OPTIONS}
          value={data.buildingType}
          onChange={handleSelect}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        This helps us calculate the right system size for your property
      </p>
    </StepCard>
  );
}
