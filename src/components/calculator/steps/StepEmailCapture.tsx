'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';

export default function StepEmailCapture() {
  const { data, setStep, updateData } = useCalculator();
  const [email, setEmail] = useState(data.email);

  const handleNext = () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    updateData({ email });
    setStep('phone');
  };

  return (
    <StepCard
      showProgressBar={false}
      showBackButton={false}
      showNextButton={true}
      nextButtonLabel="Next →"
      onNext={handleNext}
    >
      <h2 className="step-title">What is your email?</h2>

      <div className="mb-6">
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        We'll send your estimate and follow-up options to this email
      </p>
    </StepCard>
  );
}
