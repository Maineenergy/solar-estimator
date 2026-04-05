'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';

export default function StepFindRoof() {
  const { data, setStep, updateData } = useCalculator();
  const [address, setAddress] = useState(data.address);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // In production, would use Google Places API
  const handleAddressChange = (value: string) => {
    setAddress(value);

    // Mock suggestions
    if (value.length > 3) {
      setSuggestions([
        `${value}, Maine 04093`,
        `${value}, Maine 04092`,
        `${value}, Maine 04091`,
      ]);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setAddress(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleNext = () => {
    if (!address) {
      alert('Please enter an address');
      return;
    }

    updateData({
      address,
      lat: 43.6532, // Mock coordinates for demo
      lng: -70.4974,
    });

    setStep('marker');
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="address" />}
      showBackButton={true}
      onBack={() => setStep('bill')}
      showNextButton={true}
      nextButtonLabel="Next →"
      onNext={handleNext}
    >
      <h2 className="step-title">Find your roof</h2>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          className="input-field w-full"
        />

        {/* Address suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-10 shadow-lg">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b border-gray-200 last:border-b-0 transition"
              >
                <p className="text-sm text-gray-900">{suggestion}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map preview placeholder */}
      <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-6">
        <div className="text-center">
          <p className="text-gray-600">Satellite map would appear here</p>
          <p className="text-sm text-gray-500">Google Maps Static API integration</p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600">
        We'll use your address to show your property on the map
      </p>
    </StepCard>
  );
}
