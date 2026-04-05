'use client';

import { useState, useRef, useEffect } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import { GOOGLE_MAPS_CONFIG } from '@/lib/calculator-config';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

declare global { interface Window { google: any; initGoogleMaps?: () => void; } }

export default function AddressStep() {
  const { data, updateData, setStep, setMapCenter, goBack } = useCalculator();
  const [inputValue, setInputValue] = useState(data.address || '');
  const [error, setError] = useState('');
  const [placeSelected, setPlaceSelected] = useState(!!data.address);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.google?.maps) { initAutocomplete(); return; }
    const existing = document.querySelector('script[data-google-maps]');
    if (existing) { existing.addEventListener('load', initAutocomplete); return; }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places`;
    script.async = true; script.defer = true; script.dataset.googleMaps = 'true';
    script.addEventListener('load', initAutocomplete);
    document.head.appendChild(script);
    return () => script.removeEventListener('load', initAutocomplete);
  }, []);

  const initAutocomplete = () => {
    if (!inputRef.current || !window.google?.maps) return;
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, { types: ['address'], componentRestrictions: {country: 'us'} });
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current!.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        updateData({address: place.formatted_address || inputRef.current!.value, lat, lng});
        setMapCenter({lat, lng}); setInputValue(place.formatted_address || inputRef.current!.value);
        setPlaceSelected(true); setError('');
      }
    });
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Find your roof</h2>
      <ProgressBar currentStep="address" />
      <div className="relative rounded-xl overflow-hidden mb-4" style={{height:280}}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage:`url('https://maps.googleapis.com/maps/api/staticmap?center=${data.zip}&zoom=11&size=700x320&maptype=satellite&key=${GOOGLE_MAPS_CONFIG.apiKey}')`}} />
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-600 opacity-40" />
        <div className="absolute bottom-4 left-4 right-4">
          <input ref={inputRef} type="text" value={inputValue} onChange={e => { setInputValue(e.target.value); setPlaceSelected(false); setError(''); }} placeholder="Enter address" className="w-full bg-white rounded-lg px-4 py-3 text-gray-900 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] border-0" />
        </div>
      </div>
      {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 mb-2">{error}</div>}
      <StepNav onBack={goBack} onNext={() => { if (!placeSelected || !data.address) { setError('Please select an address from the dropdown.'); return; } setStep('marker'); }} />
    </div>
  );
}
