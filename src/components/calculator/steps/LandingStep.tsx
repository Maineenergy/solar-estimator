'use client';

import { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import { BRAND } from '@/lib/calculator-config';

export default function LandingStep() {
  const { updateData, setStep } = useCalculator();
  const [zip, setZip] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = zip.trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setError('Please enter a valid 5-digit zip code.');
      return;
    }
    setError('');
    updateData({ zip: trimmed });
    setStep('loading');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-solar.jpg')`,
          filter: 'brightness(0.55)',
        }}
      />
      {/* Fallback gradient if no image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2744] via-[#1A3A5C] to-[#0D1F33] opacity-80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-20 pb-10 text-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2 drop-shadow-lg">
          {BRAND.tagline}
        </h1>
        <p className="text-white/80 text-base sm:text-lg mt-3 mb-8">
          {BRAND.subTagline}
        </p>

        {/* Zip input + CTA */}
        <div className="flex flex-col sm:flex-row items-stretch gap-0 w-full max-w-md shadow-2xl">
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ''));
              setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter your zip code"
            className="flex-1 px-5 py-4 text-base text-gray-900 rounded-l-xl sm:rounded-r-none rounded-r-xl sm:rounded-bl-xl
                       focus:outline-none focus:ring-2 focus:ring-[#F97316] border-0"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#F97316] hover:bg-[#EA6C0A] text-white font-bold px-7 py-4 text-base
                       rounded-r-xl sm:rounded-l-none rounded-l-xl sm:rounded-tr-xl transition-colors
                       whitespace-nowrap shadow-md"
          >
            {BRAND.ctaLabel}
          </button>
        </div>

        {error && (
          <p className="text-red-300 text-sm mt-2">{error}</p>
        )}

        {/* Trust elements */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-md mt-10 gap-4">
          {/* Google Reviews */}
          <div className="flex flex-col items-start text-left">
            <p className="text-white font-semibold text-sm">Our Google Reviews</p>
            <div className="flex items-center gap-1 mt-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} viewBox="0 0 24 24" fill="#FBBF24" className="w-4 h-4">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="text-white font-bold text-sm ml-1">{BRAND.googleRating}</span>
            </div>
            <p className="text-white/60 text-xs mt-0.5">from {BRAND.googleReviewCount} reviews</p>
          </div>

          {/* Verified badge */}
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3.5 h-3.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>
              Verified business on <strong>facebook</strong> &amp; <strong>Google</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
