'use client';

import React from 'react';

interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  currency?: boolean;
}

export default function RangeSlider({
  value,
  onChange,
  min,
  max,
  step = 10,
  label,
  showValue = true,
  currency = true,
}: RangeSliderProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-4">{label}</label>}

      {showValue && (
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-blue-600">
            {currency ? '$' : ''}
            {value.toLocaleString()}
          </p>
        </div>
      )}

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>${min}</span>
        <span>$600+</span>
      </div>
    </div>
  );
}
