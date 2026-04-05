'use client';

import { useCalculator } from '@/context/CalculatorContext';

// Hardcoded fallback utilities — real app would fetch by zip
const DEFAULT_UTILITIES = [
  { id: 'OTHER', name: 'OTHER', logo: null },
];

// Utility logos are fetched dynamically in a real app.
// This component renders logo tiles based on the zip code.
function getUtilitiesForZip(zip: string) {
  // Placeholder: show 2-3 example utilities based on region
  // Replace with real API call in production
  const ca = ['90210', '90001', '94102', '92101'];
  const tx = ['78201', '75001', '77001'];
  const ny = ['10001', '11001'];

  if (ca.includes(zip) || zip.startsWith('9')) {
    return [
      { id: 'LADWP', name: 'LADWP (City of Los Angeles)', abbr: 'LA DWP' },
      { id: 'SCE', name: 'Southern California Edison Co', abbr: 'SCE' },
      { id: 'OTHER', name: 'OTHER', abbr: 'OTHER' },
    ];
  }
  if (tx.includes(zip) || zip.startsWith('7')) {
    return [
      { id: 'ONCOR', name: 'Oncor Electric', abbr: 'ONCOR' },
      { id: 'RELIANT', name: 'Reliant Energy', abbr: 'RELIANT' },
      { id: 'OTHER', name: 'OTHER', abbr: 'OTHER' },
    ];
  }
  return [
    { id: 'LOCAL', name: 'Local Utility', abbr: 'LOCAL' },
    { id: 'OTHER', name: 'OTHER', abbr: 'OTHER' },
  ];
}

export default function UtilityStep() {
  const { data, updateData, setStep, goBack } = useCalculator();
  const utilities = getUtilitiesForZip(data.zip);

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
            className={`flex flex-col items-center justify-center gap-3 border-2 rounded-xl p-5 cursor-pointer
                        transition-all duration-150 hover:border-blue-400 hover:bg-blue-50
                        ${data.utility === u.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'}`}
          >
            {/* Logo placeholder — replace with <img> tags for actual logos */}
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
