'use client';

import React from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';
import IconCardGrid from '@/components/ui/IconCardGrid';
import { ROOF_TYPES } from '@/lib/calculator-config';

const ROOF_OPTIONS = ROOF_TYPES.map((t) => ({
  id: t.id,
  label: t.label,
  emoji: t.emoji,
}));

export default function StepRoofType() {
  const { data, setStep, updateData } = useCalculator();

  const handleSelect = (value: string) => {
    updateData({ roofType: value as any });
    // Auto-advance to next step
    setStep('roof-repairs');
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="roof-type" />}
      showBackButton={true}
      onBack={() => setStep('system-type')}
    >
      <h2 className="step-title">Select your roof type</h2>

      <div className="mb-8">
        <IconCardGrid
          options={ROOF_OPTIONS}
          value={data.roofType}
          onChange={handleSelect}
          columns={3}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        Roof material affects installation method and cost
      </p>
    </StepCard>
  );
}
