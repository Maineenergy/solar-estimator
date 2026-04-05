'use client';

import React from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';
import IconCardGrid from '@/components/ui/IconCardGrid';
import { ROOF_REPAIR_OPTIONS } from '@/lib/calculator-config';

const REPAIR_OPTIONS = ROOF_REPAIR_OPTIONS.map((t) => ({
  id: t.id,
  label: t.label,
  emoji: t.emoji,
}));

export default function StepRoofCondition() {
  const { data, setStep, updateData } = useCalculator();

  const handleSelect = (value: string) => {
    updateData({ roofRepairs: value as any });
    // Auto-advance to next step
    setStep('name');
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="roof-repairs" />}
      showBackButton={true}
      onBack={() => setStep('roof-type')}
    >
      <h2 className="step-title">Are roof repairs needed before solar?</h2>

      <div className="mb-8">
        <IconCardGrid
          options={REPAIR_OPTIONS}
          value={data.roofRepairs}
          onChange={handleSelect}
          columns={2}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        This affects your total installation cost
      </p>
    </StepCard>
  );
}
