'use client';

import React from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';
import RadioList from '@/components/ui/RadioList';

const OWNERSHIP_OPTIONS = [
  { id: 'Yes', label: 'Yes, I own/have authority' },
  { id: 'No', label: 'No, I am renting' },
];

export default function StepOwnership() {
  const { data, setStep, updateData } = useCalculator();

  const handleSelect = (value: string) => {
    updateData({ ownership: value as 'Yes' | 'No' });

    if (value === 'No') {
      // Show rental message and return to landing
      alert('Thank you! We work with property owners. Please have your landlord contact us.');
      setStep('landing');
    } else {
      // Auto-advance to next step
      setStep('has-solar');
    }
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="ownership" />}
      showBackButton={true}
      onBack={() => setStep('building-type')}
    >
      <h2 className="step-title">Do you own or have authority with respect to this property?</h2>

      <div className="mb-8">
        <RadioList
          options={OWNERSHIP_OPTIONS}
          value={data.ownership}
          onChange={handleSelect}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        Solar installations require property owner approval
      </p>
    </StepCard>
  );
}
