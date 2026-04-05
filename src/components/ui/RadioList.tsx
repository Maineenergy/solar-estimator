'use client';

import React from 'react';

interface RadioOption {
  id: string;
  label: string;
}

interface RadioListProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  layout?: 'vertical' | 'horizontal';
}

export default function RadioList({
  options,
  value,
  onChange,
  layout = 'vertical',
}: RadioListProps) {
  return (
    <div className={layout === 'horizontal' ? 'grid grid-cols-2 gap-3 sm:gap-4' : 'space-y-3'}>
      {options.map((option) => (
        <label
          key={option.id}
          className={`radio-option cursor-pointer transition-all ${
            value === option.id ? 'selected' : ''
          }`}
          onClick={() => onChange(option.id)}
        >
          <input
            type="radio"
            name="radio-group"
            value={option.id}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-sm sm:text-base font-medium text-gray-900">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
