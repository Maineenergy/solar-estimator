'use client';

import React from 'react';
import { BRAND } from '@/lib/calculator-config';

interface HeroSectionProps {
  onSubmit?: (zip: string) => void;
}

export default function HeroSection({ onSubmit }: HeroSectionProps) {
  const [zip, setZip] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!zip || zip.length !== 5) {
      setError('Please enter a valid 5-digit ZIP code');
      return;
    }

    if (!/^\d{5}$/.test(zip)) {
      setError('ZIP code must contain only numbers');
      return;
    }

    onSubmit?.(zip);
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23334155;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%231e293b;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%221200%22 height=%22800%22 fill=%22url(%23grad)%22/%3E%3C/svg%3E")',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          {BRAND.tagline}
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-gray-200 mb-8">
          {BRAND.subTagline}
        </p>

        {/* ZIP Entry Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <input
              type="text"
              placeholder="Enter your ZIP code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              maxLength={5}
              className="flex-1 px-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
            />
            <button
              type="submit"
              className="btn-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg whitespace-nowrap"
            >
              {BRAND.ctaLabel}
            </button>
          </div>
          {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
        </form>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md text-left">
          {/* Google Reviews - bottom left */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-white text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-300 text-lg">★★★★★</span>
            </div>
            <p className="font-semibold">{BRAND.googleRating}</p>
            <p className="text-white/80">from {BRAND.googleReviewCount} reviews</p>
          </div>

          {/* Verified badge - bottom right */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-white text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400 text-lg">✓</span>
            </div>
            <p className="font-semibold">Verified Business</p>
            <p className="text-white/80">on Google & Facebook</p>
          </div>
        </div>
      </div>
    </div>
  );
}
