'use client';

import React, { useState, useEffect } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import { CalculatorStep } from '@/types/calculator';
import StepUtilityProvider from './steps/StepUtilityProvider';
import StepMonthlyBill from './steps/StepMonthlyBill';
import StepFindRoof from './steps/StepFindRoof';
import StepMoveMarker from './steps/StepMoveMarker';
import StepBuildingType from './steps/StepBuildingType';
import StepOwnership from './steps/StepOwnership';
import StepExistingSolar from './steps/StepExistingSolar';
import StepHomeType from './steps/StepHomeType';
import StepSystemType from './steps/StepSystemType';
import StepRoofType from './steps/StepRoofType';
import StepRoofCondition from './steps/StepRoofCondition';
import StepVerifyHome from './steps/StepVerifyHome';
import StepEmailCapture from './steps/StepEmailCapture';
import StepPhoneCapture from './steps/StepPhoneCapture';
import StepOtpVerification from './steps/StepOtpVerification';
import StepResults from './steps/StepResults';
import ProgressBar from './ProgressBar';
import LoadingScreen from './LoadingScreen';

export default function CalculatorShell({ initialZip }: { initialZip: string }) {
  const { step, data, setStep, updateData } = useCalculator();
  useEffect(() => { if (initialZip && !data.zip) updateData({ zip: initialZip }); }, [initialZip]);
  const renderStep = () => {
    switch (step) {
      case 'utility': return <StepUtilityProvider />;
      case 'bill': return <StepMonthlyBill />;
      case 'address': return <StepFindRoof />;
      case 'marker': return <StepMoveMarker />;
      case 'building-type': return <StepBuildingType />;
      case 'ownership': return <StepOwnership />;
      case 'has-solar': return <StepExistingSolar />;
      case 'home-type': return <StepHomeType />;
      case 'system-type': return <StepSystemType />;
      case 'roof-type': return <StepRoofType />;
      case 'roof-repairs': return <StepRoofCondition />;
      case 'name': return <StepVerifyHome />;
      case 'email': return <StepEmailCapture />;
      case 'phone': return <StepPhoneCapture />;
      case 'phone_otp': return <StepOtpVerification />;
      case 'results': return <StepResults />;
      default: return <div>Unknown step</div>;
    }
  };
  return (<div className="w-full">{renderStep()}</div>);
}
