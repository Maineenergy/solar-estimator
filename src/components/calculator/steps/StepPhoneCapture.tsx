'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import { TCPA_TEXT, BRAND } from '@/lib/calculator-config';

export default function StepPhoneCapture() {
  const { data, setStep, updateData } = useCalculator();
  const [phone, setPhone] = useState(data.phone);
  const [agreedTcpa, setAgreedTcpa] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleContinue = () => {
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    if (!agreedTcpa) {
      alert('Please agree to the terms to continue');
      return;
    }

    updateData({ phone });
    setStep('phone_otp');
  };

  return (
    <StepCard
      showProgressBar={false}
      showBackButton={false}
      showNextButton={true}
      nextButtonLabel="Continue →"
      onNext={handleContinue}
    >
      <h2 className="step-title">What is your phone number?</h2>

      <div className="mb-6">
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          maxLength={14}
          className="input-field"
        />
      </div>

      {/* TCPA Consent Block */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 max-h-48 overflow-y-auto">
        <p className="text-xs text-gray-700 leading-relaxed">
          By clicking the "Continue" button you agree to our Terms and Privacy Policy and authorize{' '}
          <strong>{BRAND.name}</strong> or our chosen solar installers to use the phone number/s
          entered. Some installers may use auto-dialers, send automated text messages, AI generative
          voice, or AI generative SMS/MMS. If they cannot contact you these may result in charges to
          you. You consent to receiving these communications even if the phone number entered above
          is on the "Do Not Call" register. All information is collected and used in accordance with
          our Privacy Policy and our Terms and Conditions. In addition, by clicking "Continue" you
          also consent to phone calls from the above-mentioned Solar Installers being recorded by{' '}
          <strong>{BRAND.name}</strong> for training and quality assurance purposes. You may opt out
          of future contact at any time and your consent is not a requirement for any purchase.
        </p>
      </div>

      {/* TCPA Checkbox */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedTcpa}
            onChange={(e) => setAgreedTcpa(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-gray-900">
            I agree to the TCPA terms and authorize contact from solar installers
          </span>
        </label>
      </div>

      <p className="text-center text-xs text-gray-500">
        Your phone will be verified with an SMS code
      </p>
    </StepCard>
  );
}
