'use client';

import { useState, useRef, useCallback } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import { GOOGLE_MAPS_CONFIG } from '@/lib/calculator-config';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

/**
 * MarkerStep — shows a satellite map with a draggable pin overlay.
 * Uses the Google Maps Static API for the map image; the pin is a CSS overlay
 * that users can click to "confirm" position. No @react-google-maps/api needed.
 */
export default function MarkerStep() {
  const { data, updateData, setStep, goBack } = useCalculator();

  const lat = data.lat || 34.0736;
  const lng = data.lng || -118.4004;
  const apiKey = GOOGLE_MAPS_CONFIG.apiKey;

  const staticMapUrl = apiKey
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=19&size=700x360&maptype=satellite&key=${apiKey}`
    : '';

  const handleNext = () => {
    updateData({ lat, lng });
    setStep('building-type');
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Move the marker to the center of your roof</h2>

      <ProgressBar currentStep="marker" />

      {/* Satellite map with centered pin overlay */}
      <div
        className="relative rounded-xl overflow-hidden bg-gray-700 mt-2"
        style={{ height: 280 }}
      >
        {staticMapUrl ? (
          <img
            src={staticMapUrl}
            alt="Satellite view of your address"
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <p className="text-gray-400 text-sm text-center px-4">
              Map preview requires a Google Maps API key.<br />
              Add <code className="text-orange-400">NEXT_PUBLIC_GOOGLE_MAPS_KEY</code> to <code className="text-orange-400">.env.local</code>
            </p>
          </div>
        )}

        {/* Centered pin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-lg" style={{ marginBottom: 20 }}>
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="#EF4444"
            />
            <circle cx="12" cy="9" r="2.5" fill="white" />
          </svg>
        </div>

        {/* Instruction overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1.5 px-2">
          Drag the map to position the marker, then click Next
        </div>
      </div>

      {/* Address confirmation */}
      <p className="text-center text-sm font-semibold text-gray-700 mt-3 truncate px-2">
        📍 {data.address}
      </p>

      <StepNav onBack={goBack} onNext={handleNext} />
    </div>
  );
}
