'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CalculatorData, CalculatorStep } from '@/types/calculator';

interface CalculatorContextValue {
  step: CalculatorStep;
  data: CalculatorData;
  mapCenter: { lat: number; lng: number } | null;
  setStep: (step: CalculatorStep) => void;
  updateData: (updates: Partial<CalculatorData>) => void;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  goBack: () => void;
}

const defaultData: CalculatorData = {
  zip: '',
  utility: '',
  utilityLabel: '',
  monthlyBill: 200,
  address: '',
  lat: 0,
  lng: 0,
  buildingType: '',
  ownership: '',
  hasSolar: '',
  homeType: '',
  systemType: '',
  roofType: '',
  roofRepairs: '',
  firstName: '',
  lastName: '',
  isOwner: true,
  email: '',
  phone: '',
};

// Step history for back navigation
const STEP_ORDER: CalculatorStep[] = [
  'landing',
  'loading',
  'utility',
  'bill',
  'address',
  'marker',
  'building-type',
  'ownership',
  'has-solar',
  'home-type',
  'system-type',
  'roof-type',
  'roof-repairs',
  'name',
  'email',
  'phone',
  'phone_otp',
  'results',
];

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [step, setStepState] = useState<CalculatorStep>('landing');
  const [data, setData] = useState<CalculatorData>(defaultData);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

  const setStep = useCallback((newStep: CalculatorStep) => {
    setStepState(newStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateData = useCallback((updates: Partial<CalculatorData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const goBack = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(step);
    if (currentIndex > 0) {
      const prevStep = STEP_ORDER[currentIndex - 1];
      if (prevStep === 'loading') {
        setStepState(STEP_ORDER[currentIndex - 2] || 'landing');
      } else { setStepState(prevStep); }
    }
  }, [step]);

  return (<CalculatorContext.Provider value={{ step, data, mapCenter, setStep, updateData, setMapCenter, goBack }}>{children}</CalculatorContext.Provider>);
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error('useCalculator must be used within CalculatorProvider');
  return ctx;
}
