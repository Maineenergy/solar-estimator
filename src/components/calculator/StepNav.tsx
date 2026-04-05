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
      {showBack ? (<button type="button" onClick={onBack} className="btn-back">Back</button>) : (<div />)}
      <button type="button" onClick={onNext} disabled={nextDisabled || loading} className="btn-primary min-w-[140px]">
        {loading ? <span className="spinner" /> : nextLabel}
      </button>
    </div>
  );
}
