'use client';

import React from 'react';

interface IconCard {
  id: string;
  label: string;
  emoji?: string;
  bgColor?: string;
}

interface IconCardGridProps {
  options: IconCard[];
  value: string;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4 | 6;
}

export default function IconCardGrid({
  options,
  value,
  onChange,
  columns = 3,
}: IconCardGridProps) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-3 sm:gap-4`}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`icon-card text-sm sm:text-base p-4 sm:p-5 transition-all ${
            value === option.id ? 'selected border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          style={option.bgColor && value === option.id ? { borderColor: option.bgColor } : {}}
        >
          {option.emoji && <span className="text-2xl sm:text-3xl mb-2">{option.emoji}</span>}
          <span className="font-medium text-gray-900">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
