'use client';

import React, { useEffect, useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';
import IconCardGrid from '@/components/ui/IconCardGrid';
import { getUtilityProvidersByState } from '@/lib/nrel';

// Maine utility providers
const DEFAULT_UTILITIES = [
  { id: 'Central Maine Power', label: 'Central Maine Power (CMP)', emoji: '⚡' },
  { id: 'Versant Power', label: 'Versant Power', emoji: '⚡' },
  { id: 'Other', label: 'Other', emoji: '⚙️' },
];

export default function StepUtilityProvider() {
  const { data, setStep, updateData } = useCalculator();
  const [utilities, setUtilities] = useState(DEFAULT_UTILITIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch utilities based on ZIP
    const fetchUtilities = async () => {
      if (!data.zip) return;

      setLoading(true);
      try {
        // Extract state from ZIP (simplified - in production would use proper geocoding)
        // For now, use Maine as default since audit showed "Central Maine Power"
        const stateCode = 'ME';

        const providers = getUtilityProvidersByState(stateCode);
        const utilityOptions = providers.map((p) => ({
          id: p.id,
          label: p.name,
          emoji: '⚡',
        }));

        setUtilities(utilityOptions);
      } finally {
        setLoading(false);
      }
    };

    fetchUtilities();
  }, [data.zip]);

  const handleSelectUtility = (utilityId: string) => {
    const utility = utilities.find((u) => u.id === utilityId);
    updateData({
      utility: utilityId,
      utilityLabel: utility?.label || utilityId,
    });

    // Auto-advance to next step
    setStep('bill');
  };

  return (
    <StepCard
      showProgressBar={false}
      showBackButton={true}
      onBack={() => setStep('landing')}
    >
      <h2 className="step-title">Select your utility provider</h2>

      <div className="mb-8">
        <IconCardGrid
          options={utilities}
          value={data.utility}
          onChange={handleSelectUtility}
          columns={2}
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading providers...</p>}
    </StepCard>
  );
}
