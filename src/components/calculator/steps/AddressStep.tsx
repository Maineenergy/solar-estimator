'use client';

import { useState, useRef, useEffect } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import { GOOGLE_MAPS_CONFIG } from '@/lib/calculator-config';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

declare global {
  interface Window {
    google: any;
    initAddressMap?: () => void;
  }
}

export default function AddressStep() {
  const { data, updateData, setStep, setMapCenter, goBack } = useCalculator();
  const [inputValue, setInputValue] = useState(data.address || '');
  const [error, setError] = useState('');
  const [placeSelected, setPlaceSelected] = useState(!!data.address);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.google?.maps) {
      initAll();
      return;
    }
    // Reuse an existing script tag if already loading
    const existing = document.querySelector('script[data-google-maps]');
    if (existing) {
      window.initAddressMap = initAll;
      return;
    }
    window.initAddressMap = initAll;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places&callback=initAddressMap`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'true';
    document.head.appendChild(script);
    return () => { window.initAddressMap = () => {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initAll() {
    initMap();
    initAutocomplete();
  }

  function initMap() {
    if (!mapRef.current || !window.google?.maps) return;
    // If address already selected, zoom in; otherwise show neighbourhood view
    const center = data.lat && data.lng
      ? { lat: data.lat, lng: data.lng }
      : { lat: 43.646, lng: -70.3498 };
    const zoom = data.lat && data.lng ? 17 : 11;
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeId: 'hybrid',
      tilt: 0,
      disableDefaultUI: true,
      gestureHandling: 'none',
    });
  }

  function initAutocomplete() {
    if (!inputRef.current || !window.google?.maps) return;
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address || inputRef.current!.value;
        updateData({ address, lat, lng });
        setMapCenter({ lat, lng });
        setInputValue(address);
        setPlaceSelected(true);
        setError('');
        // Fly the map to the selected address
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo({ lat, lng });
          mapInstanceRef.current.setZoom(17);
        }
      }
    });
  }

  return (
    <div className="step-enter">
      <h2 className="step-title">Find your roof</h2>
      <ProgressBar currentStep="address" />

      {/* Map + input wrapper — outer div is relative but NOT overflow-hidden so dropdown stays visible */}
      <div className="relative mb-6" style={{ height: 280 }}>
        {/* Satellite map fills the rounded box */}
        <div className="absolute inset-0 rounded-xl overflow-hidden bg-gray-800">
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Address input floats over the map */}
        <div className="absolute bottom-4 left-4 right-4" style={{ zIndex: 9999 }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
              setPlaceSelected(false);
              setError('');
            }}
            placeholder="Enter address"
            className="w-full bg-white rounded-lg px-4 py-3 text-gray-900 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] border-0"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 mb-2">
          {error}
        </div>
      )}

      <StepNav
        onBack={goBack}
        onNext={() => {
          if (!placeSelected || !data.address) {
            setError('Please select an address from the dropdown.');
            return;
          }
          setStep('marker');
        }}
      />
    </div>
  );
}
