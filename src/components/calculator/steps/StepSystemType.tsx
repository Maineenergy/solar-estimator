'use client';

import React from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';
import IconCardGrid from '@/components/ui/IconCardGrid';
import { SYSTEM_TYPES } from '@/lib/calculator-config';

const SYSTEM_OPTIONS = SYSTEM_TYPES.map((t) => ({
  id: t.id,
  label: t.label,
  emoji: t.emoji,
}));

export default function StepSystemType() {
  const { data, setStep, updateData } = useCalculator();

  const handleSelect = (value: string) => {
    updateData({ systemType: value as 'Solar' | 'Solar with battery storage' });
    // Auto-advance to next step
    setStep('roof-type');
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="system-type" />}
      showBackButton={true}
      onBack={() => setStep('home-type')}
    >
      <h2 className="step-title">Select system type</h2>

      <div className="mb-8">
        <IconCardGrid
          options={SYSTEM_OPTIONS}
          value={data.systemType}
          onChange={handleSelect}
          columns={2}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        Solar with battery storage provides backup power during outages
      </p>
    </StepCard>
  );
}
