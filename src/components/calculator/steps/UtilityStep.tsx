'use client';

import { useCalculator } from '@/context/CalculatorContext';

interface Utility {
  id: string;
  name: string;
  abbr: string;
}

function getUtilitiesForZip(zip: string): Utility[] {
  // Maine ZIP codes start with 039-049
  if (zip.startsWith('04') || zip.startsWith('039')) {
    return [
      { id: 'Central Maine Power', name: 'Central Maine Power (CMP)', abbr: 'CMP' },
      { id: 'Versant Power', name: 'Versant Power', abbr: 'VERSANT' },
      { id: 'OTHER', name: 'Other', abbr: 'OTHER' },
    ];
  }

  // California
  if (zip.startsWith('9')) {
    return [
      { id: 'LADWP', name: 'LADWP (City of Los Angeles)', abbr: 'LA DWP' },
      { id: 'SCE', name: 'Southern California Edison Co', abbr: 'SCE' },
      { id: 'OTHER', name: 'Other', abbr: 'OTHER' },
    ];
  }

  // Texas
  if (zip.startsWith('7')) {
    return [
      { id: 'ONCOR', name: 'Oncor Electric', abbr: 'ONCOR' },
      { id: 'RELIANT', name: 'Reliant Energy', abbr: 'RELIANT' },
      { id: 'OTHER', name: 'Other', abbr: 'OTHER' },
    ];
  }

  // Default — show CMP and Versant since this is a Maine-focused service
  return [
    { id: 'Central Maine Power', name: 'Central Maine Power (CMP)', abbr: 'CMP' },
    { id: 'Versant Power', name: 'Versant Power', abbr: 'VERSANT' },
    { id: 'OTHER', name: 'Other', abbr: 'OTHER' },
  ];
}

export default function UtilityStep() {
  const { data, updateData, setStep, goBack } = useCalculator();
  const utilities = getUtilitiesForZip(data.zip || '');

  const handleSelect = (id: string, name: string) => {
    updateData({ utility: id, utilityLabel: name });
    setStep('bill');
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Select your utility provider</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
        {utilities.map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => handleSelect(u.id, u.name)}
            className={`flex flex-col items-center justify-center gap-3 border-2 rounded-xl p-5 cursor-pointer transition-all duration-150 hover:border-blue-400 hover:bg-blue-50 ${
              data.utility === u.id
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            {u.id === 'OTHER' ? (
              <div className="w-16 h-12 flex items-center justify-center">
                <span className="text-2xl font-black text-gray-700">OTHER</span>
              </div>
            ) : (
              <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <span className="text-xs font-bold text-gray-600 text-center leading-tight px-1">
                  {u.abbr}
                </span>
              </div>
            )}
            <span className="text-xs text-gray-600 text-center font-medium leading-tight">
              {u.name}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <button type="button" onClick={goBack} className="btn-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}
