'use client';

import { BRAND } from '@/lib/calculator-config';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          {/* Placeholder logo — replace with <img src="/logo.svg" ... /> */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F97316] to-[#FBBF24] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </div>
          <span className="font-bold text-[#1E3A5F] text-lg tracking-tight">{BRAND.name}</span>
        </a>

        {/* Counter */}
        <div className="text-sm text-gray-600 hidden sm:block">
          <span className="font-bold text-[#F97316]">{BRAND.estimateCount}</span>
          {' '}online estimates since {BRAND.estimateSince}!
        </div>

        {/* Trust badge — placeholder for DOE/SunShot or similar */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded px-2 py-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#F97316]">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="font-medium">Verified &amp; Trusted</span>
        </div>
      </div>
    </header>
  );
}
