'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import OtpInput from '@/components/ui/OtpInput';

export default function StepOtpVerification() {
  const { data, setStep } = useCalculator();
  const [otp, setOtp] = useState('');

  const handleOtpComplete = (completedOtp: string) => {
    // Simulate OTP verification
    // In production, would verify against Twilio or similar
    if (completedOtp.length === 4) {
      setTimeout(() => {
        setStep('results');
      }, 500);
    }
  };

  return (
    <StepCard showProgressBar={false} showBackButton={true} onBack={() => setStep('phone')}>
      <h2 className="step-title">Verify your phone number</h2>

      <p className="text-center text-gray-600 mb-6">
        Enter the 4-digit code we sent to {data.phone}
      </p>

      <div className="mb-8">
        <OtpInput
          value={otp}
          onChange={setOtp}
          onComplete={handleOtpComplete}
          length={4}
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Did not receive a code?{' '}
          <button className="text-orange-500 hover:text-orange-600 font-semibold">
            Resend
          </button>
        </p>
      </div>

      <p className="text-center text-xs text-gray-500">
        This unlocks local installer pricing in your estimate
      </p>
    </StepCard>
  );
}
