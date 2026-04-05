'use client';

import React from 'react';

interface StepCardProps {
  children: React.ReactNode;
  showProgressBar?: boolean;
  progressBar?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  showNextButton?: boolean;
  nextButtonLabel?: string;
  onNext?: () => void;
  isLoading?: boolean;
  backgroundImage?: string;
}

export default function StepCard({
  children,
  showProgressBar = false,
  progressBar,
  showBackButton = false,
  onBack,
  showNextButton = false,
  nextButtonLabel = 'Next →',
  onNext,
  isLoading = false,
  backgroundImage,
}: StepCardProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6"
      style={
        backgroundImage
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : { backgroundColor: '#EEF1F7' }
      }
    >
      {showProgressBar && progressBar && (
        <div className="w-full max-w-2xl mb-8">
          {progressBar}
        </div>
      )}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        <div className="step-enter">
          {children}
        </div>
      </div>
      <div className="w-full max-w-2xl mt-6 flex justify-between items-center">
        {showBackButton && (
          <button onClick={onBack} className="btn-back" disabled={isLoading}>
            ← Back
          </button>
        )}
        {!showBackButton && <div />}
        {showNextButton && (
          <button onClick={onNext} className="btn-primary" disabled={isLoading}>
            {isLoading ? '...' : nextButtonLabel}
          </button>
        )}
      </div>
    </div>
  );
}
