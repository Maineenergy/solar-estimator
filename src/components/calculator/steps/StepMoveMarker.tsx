'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import ProgressBar from '../ProgressBar';

export default function StepMoveMarker() {
  const { data, setStep, updateData } = useCalculator();
  const [isDragging, setIsDragging] = useState(false);

  const handleNext = () => {
    setStep('building-type');
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <StepCard
      showProgressBar={true}
      progressBar={<ProgressBar currentStep="marker" />}
      showBackButton={true}
      onBack={() => setStep('address')}
      showNextButton={true}
      nextButtonLabel="Next →"
      onNext={handleNext}
    >
      <h2 className="step-title">Move the marker to the center of your roof</h2>

      {/* Map preview with draggable marker */}
      <div
        className="bg-gray-300 rounded-lg h-80 flex items-center justify-center mb-6 relative cursor-move"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div className="text-center">
          <p className="text-2xl mb-2">📍</p>
          <p className="text-gray-700 font-semibold">{data.address}</p>
          <p className="text-sm text-gray-600 mt-2">
            {isDragging ? 'Dragging...' : 'Drag the marker to adjust location'}
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Lat: {data.lat?.toFixed(4)}, Lng: {data.lng?.toFixed(4)}
          </p>
        </div>
      </div>

      {/* Address confirmation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900">
          <strong>Selected address:</strong> {data.address}
        </p>
      </div>

      <p className="text-center text-sm text-gray-600">
        Adjust the marker location for accurate roof analysis
      </p>
    </StepCard>
  );
}
