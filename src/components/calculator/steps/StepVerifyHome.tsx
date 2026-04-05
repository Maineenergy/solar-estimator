'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';

export default function StepVerifyHome() {
  const { data, setStep, updateData } = useCalculator();
  const [isOwner, setIsOwner] = useState(data.isOwner);

  const handleNext = () => {
    if (!data.firstName || !data.lastName) {
      alert('Please enter your name');
      return;
    }

    updateData({ isOwner });
    setStep('email');
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="name" />}
      showBackButton={true}
      onBack={() => setStep('roof-repairs')}
      showNextButton={true}
      nextButtonLabel="Next →"
      onNext={handleNext}
    >
      <h2 className="step-title">Verify this is your home</h2>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First name"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last name"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isOwner}
            onChange={(e) => setIsOwner(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-blue-900">
            I am the owner and/or have authority with respect to this property.
          </span>
        </label>
      </div>

      <p className="text-center text-sm text-gray-600">
        We protect your privacy. Your information is never shared without consent.
      </p>
    </StepCard>
  );
}
