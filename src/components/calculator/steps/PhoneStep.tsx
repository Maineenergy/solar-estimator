'use client';

import { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import { BRAND, TCPA_TEXT } from '@/lib/calculator-config';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function PhoneStep() {
  const { data, updateData, setStep } = useCalculator();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const rawDigits = data.phone.replace(/\D/g, '');

  const validate = () => {
    if (!data.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (rawDigits.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep('results');
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">What is your phone number?</h2>

      <ProgressBar currentStep="phone" allComplete />

      <div className="mt-2">
        <input
          type="tel"
          placeholder="(555) 555-5555"
          value={data.phone}
          onChange={(e) => {
            updateData({ phone: formatPhone(e.target.value) });
            if (error) setError('');
          }}
          className={`input-field ${error ? 'ring-2 ring-red-400' : ''}`}
          autoFocus
          autoComplete="tel"
          inputMode="tel"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <StepNav
        showBack={false}
        onNext={handleSubmit}
        nextLabel="Continue"
        loading={loading}
      />

      {/* TCPA Disclosure */}
      <p className="text-[10px] text-gray-400 leading-relaxed mt-4">
        {TCPA_TEXT}
      </p>
    </div>
  );
}
