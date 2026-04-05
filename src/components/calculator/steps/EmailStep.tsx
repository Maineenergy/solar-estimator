'use client';

import { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

export default function EmailStep() {
  const { data, updateData, setStep } = useCalculator();
  const [error, setError] = useState<string>('');

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      setError('Email address is required');
      return false;
    }
    if (!emailRegex.test(data.email.trim())) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validate()) setStep('phone');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">What is your email address?</h2>

      <ProgressBar currentStep="email" allComplete />

      <div className="mt-2">
        <input
          type="email"
          placeholder="Email address"
          value={data.email}
          onChange={(e) => {
            updateData({ email: e.target.value });
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          className={`input-field ${error ? 'ring-2 ring-red-400' : ''}`}
          autoFocus
          autoComplete="email"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <StepNav showBack={false} onNext={handleNext} />
    </div>
  );
}
