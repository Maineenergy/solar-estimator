'use client';

import { useCalculator } from '@/context/CalculatorContext';

// Step components
import LandingStep from './steps/LandingStep';
import LoadingScreen from './LoadingScreen';
import UtilityStep from './steps/UtilityStep';
import BillStep from './steps/BillStep';
import AddressStep from './steps/AddressStep';
import MarkerStep from './steps/MarkerStep';
import BuildingTypeStep from './steps/BuildingTypeStep';
import OwnershipStep from './steps/OwnershipStep';
import HasSolarStep from './steps/HasSolarStep';
import HomeTypeStep from './steps/HomeTypeStep';
import SystemTypeStep from './steps/SystemTypeStep';
import RoofTypeStep from './steps/RoofTypeStep';
import RoofRepairsStep from './steps/RoofRepairsStep';
import NameStep from './steps/NameStep';
import EmailStep from './steps/EmailStep';
import PhoneStep from './steps/PhoneStep';
import ResultsStep from './steps/ResultsStep';

const FULL_SCREEN_STEPS = new Set(['landing', 'loading']);
const MAP_BG_STEPS = new Set(['address', 'marker']);

export default function CalculatorFlow() {
  const { step, mapCenter } = useCalculator();
  const isFullScreen = FULL_SCREEN_STEPS.has(step);
  const isMapBg = MAP_BG_STEPS.has(step);

  const renderStep = () => {
    switch (step) {
      case 'landing': return <LandingStep />;
      case 'loading': return <LoadingScreen />;
      case 'utility': return <UtilityStep />;
      case 'bill': return <BillStep />;
      case 'address': return <AddressStep />;
      case 'marker': return <MarkerStep />;
      case 'building-type': return <BuildingTypeStep />;
      case 'ownership': return <OwnershipStep />;
      case 'has-solar': return <HasSolarStep />;
      case 'home-type': return <HomeTypeStep />;
      case 'system-type': return <SystemTypeStep />;
      case 'roof-type': return <RoofTypeStep />;
      case 'roof-repairs': return <RoofRepairsStep />;
      case 'name': return <NameStep />;
      case 'email': return <EmailStep />;
      case 'phone': return <PhoneStep />;
      case 'results': return <ResultsStep />;
      default: return <LandingStep />;
    }
  };

  if (isFullScreen) return (<div className="min-h-screen flex flex-col">{renderStep()}</div>);
  if (isMapBg) {
    const lat = mapCenter?.lat ?? 37.7749;
    const lng = mapCenter?.lng ?? -122.4194;
    const zoom = step === 'marker' ? 19 : 13;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '';
    const mapUrl = apiKey ? `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=1200x800&maptype=satellite&key=${apiKey}` : '';
    return (<div className="relative min-h-screen flex flex-col"><div className="fixed inset-0 bg-cover bg-center bg-gray-700 z-0" style={{backgroundImage:`url("${mapUrl}")`}} aria-hidden="true"/><div className="fixed inset-0 bg-black/30 z-0" aria-hidden="true"/><div className="relative z-10 flex items-start justify-center min-h-screen pt-8 pb-16 px-4"><div className="calculator-card w-full max-w-lg">{renderStep()}</div></div></div>);
  }
  return (<div className="min-h-screen bg-gray-100 flex items-start justify-center py-8 px-4"><div className="calculator-card w-full max-w-lg">{renderStep()}</div></div>);
}
