'use client';

import { PROGRESS_STAGES, STEP_TO_STAGE } from '@/lib/calculator-config';
import { CalculatorStep } from '@/types/calculator';
// Simple class name joiner — avoids the clsx dependency
const cx = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

interface Props {
  currentStep: CalculatorStep;
  allComplete?: boolean;
}

export default function ProgressBar({ currentStep, allComplete = false }: Props) {
  const activeStageIndex = STEP_TO_STAGE[currentStep] ?? -1;
  return (
    <div className="flex items-start justify-between w-full mb-6 px-1">
      {PROGRESS_STAGES.map((stage, i) => {
        const isDone = allComplete || i < activeStageIndex;
        const isActive = !allComplete && i === activeStageIndex;
        const color = allComplete ? 'bg-green-500' : (isDone || isActive) ? 'bg-[#F97316]' : 'bg-gray-300';
        return (<div key={stage.id} className="flex flex-col items-center flex-1 relative"><div className={cx('relative z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',color)}><svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12" /></svg></div><span className={cx('mt-1.5 text-center leading-tight hidden sm:block',(allComplete || isDone || isActive) ? 'text-[10px] font-semibold text-[#F97316]' : 'text-[10px] text-gray-400')} style={{fontSize:'9px',maxWidth:56}}>{stage.label}</span></div>);
      })}
    </div>
  );
}
