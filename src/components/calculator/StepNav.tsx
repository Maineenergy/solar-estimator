'use client';

interface Props {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  loading?: boolean;
}

export default function StepNav({
  onBack,
  onNext,
  nextLabel = 'Next',
  nextDisabled = false,
  showBack = true,
  loading = false,
}: Props) {
  return (
    <div className="flex items-center justify-between mt-6">
      {showBack ? (
        <button type="button" onClick={onBack} className="btn-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>
      ) : (
        <div />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || loading}
        className="btn-primary min-w-[140px]"
      >
        {loading ? (
          <span className="spinner" />
        ) : (
          <>
            {nextLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
