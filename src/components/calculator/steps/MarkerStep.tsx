'use client';

import { useEffect, useRef, useState } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import { GOOGLE_MAPS_CONFIG } from '@/lib/calculator-config';
import ProgressBar from '../ProgressBar';
import StepNav from '../StepNav';

declare global {
  interface Window {
    google: typeof google;
    initMarkerMap: () => void;
  }
}

export default function MarkerStep() {
  const { data, updateData, setStep, goBack } = useCalculator();

  const lat = data.lat || 43.646;
  const lng = data.lng || -70.3498;
  const apiKey = GOOGLE_MAPS_CONFIG.apiKey;

  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [markerLat, setMarkerLat] = useState(lat);
  const [markerLng, setMarkerLng] = useState(lng);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!apiKey || !mapRef.current) return;

    // If Google Maps is already loaded, init immediately
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    // Load the Google Maps JS API script if not yet loaded
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      // Script already loading — wait for it
      window.initMarkerMap = initMap;
      return;
    }

    window.initMarkerMap = initMap;

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMarkerMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      window.initMarkerMap = () => {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  function initMap() {
    if (!mapRef.current) return;

    const center = { lat, lng };

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 19,
      mapTypeId: 'satellite',
      tilt: 0,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: 'greedy',
    });

    const marker = new window.google.maps.Marker({
      position: center,
      map,
      draggable: true,
      title: 'Drag to your roof',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#EF4444',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
    });

    marker.addListener('dragend', () => {
      const pos = marker.getPosition();
      if (pos) {
        setMarkerLat(pos.lat());
        setMarkerLng(pos.lng());
      }
    });

    markerRef.current = marker;
    setMapLoaded(true);
  }

  const handleNext = () => {
    updateData({ lat: markerLat, lng: markerLng });
    setStep('building-type');
  };

  return (
    <div className="step-enter">
      <h2 className="step-title">Move the marker to the center of your roof</h2>

      <ProgressBar currentStep="marker" />

      {/* Map container */}
      <div
        className="relative rounded-xl overflow-hidden bg-gray-700 mt-2"
        style={{ height: 280 }}
      >
        <div ref={mapRef} className="w-full h-full" />

        {/* Loading overlay while map initializes */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 gap-2">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading map…</p>
          </div>
        )}

        {/* Instruction banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1.5 px-2 pointer-events-none">
          Drag the marker to the center of your roof, then click Next
        </div>
      </div>

      {/* Address confirmation */}
      <p className="text-center text-sm font-semibold text-gray-700 mt-3 truncate px-2">
        📍 {data.address}
      </p>

      <StepNav onBack={goBack} onNext={handleNext} />
    </div>
  );
}
