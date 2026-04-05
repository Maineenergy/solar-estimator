import { BRAND } from '@/lib/calculator-config';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
          The information on our website is general in nature and is not intended as a substitute for
          competent legal, financial or electrical engineering advice. As forecasting solar savings involves
          assumptions about future electricity prices you should be aware such estimates are inherently uncertain.
        </p>

        {/* Logo + links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F97316] to-[#FBBF24] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
              </svg>
            </div>
            <span className="font-bold text-[#1E3A5F] text-sm">{BRAND.name}</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
            <a href="/about" className="hover:text-gray-800 transition-colors">About Us</a>
            <a href="/why-us" className="hover:text-gray-800 transition-colors">Why {BRAND.name}</a>
            <a href="/accuracy" className="hover:text-gray-800 transition-colors">Calculation Accuracy</a>
            <a href="/experts" className="hover:text-gray-800 transition-colors">Our Experts</a>
            <a href="/contact" className="hover:text-gray-800 transition-colors">Contact Us</a>
            <a href={`tel:${BRAND.phone}`} className="hover:text-gray-800 transition-colors">Ph {BRAND.phone}</a>
            <a href="/faqs" className="hover:text-gray-800 transition-colors">FAQs</a>
            <a href="/careers" className="hover:text-gray-800 transition-colors">Careers</a>
            <a href="/press" className="hover:text-gray-800 transition-colors">Press</a>
          </nav>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-xs text-gray-400">
          <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
          <a href="/privacy#personal-data" className="hover:text-gray-600 transition-colors">Do not sell my details</a>
          <a href="/terms" className="hover:text-gray-600 transition-colors">Terms &amp; Conditions</a>
          <a href="/sitemap" className="hover:text-gray-600 transition-colors">Sitemap</a>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Copyright © 2012 – {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
