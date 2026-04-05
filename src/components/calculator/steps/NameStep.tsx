'use client';

import { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

export default function NameStep() {
  const { data, updateData, setStep, goBack } = useCalculator();
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!data.firstName.trim()) errs.firstName = 'First name is required';
    if (!data.lastName.trim()) errs.lastName = 'Last name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep('email');
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Verify this is your home</h2>

      {/* Progress bar — all stages complete (green) */}
      <ProgressBar currentStep="name" allComplete />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <div>
          <input
            type="text"
            placeholder="First name"
            value={data.firstName}
            onChange={(e) => {
              updateData({ firstName: e.target.value });
              setErrors((prev) => ({ ...prev, firstName: undefined }));
            }}
            className={`input-field ${errors.firstName ? 'ring-2 ring-red-400' : ''}`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last name"
            value={data.lastName}
            onChange={(e) => {
              updateData({ lastName: e.target.value });
              setErrors((prev) => ({ ...prev, lastName: undefined }));
            }}
            className={`input-field ${errors.lastName ? 'ring-2 ring-red-400' : ''}`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Ownership checkbox */}
      <label className="flex items-start gap-3 mt-4 cursor-pointer">
        <input
          type="checkbox"
          checked={data.isOwner}
          onChange={(e) => updateData({ isOwner: e.target.checked })}
          className="mt-1 w-4 h-4 rounded accent-[#F97316] flex-shrink-0"
        />
        <span className="text-sm text-gray-600">
          I am the owner and/or have authority with respect to this property.
        </span>
      </label>

      <StepNav showBack={false} onNext={handleNext} />
    </div>
  );
}
