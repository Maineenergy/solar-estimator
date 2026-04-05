'use client';

import { useCalculator } from '@/context/CalculatorContext';
import { BRAND } from '@/lib/calculator-config';

function estimateSavings(monthlyBill: number): { annual: number; system: number; payback: number } {
  // Rough heuristic: solar can offset ~80% of bill, 25-year lifespan
  const offset = 0.8;
  const annual = Math.round(monthlyBill * 12 * offset);
  const system = Math.round(monthlyBill * 12 * offset * 7); // ~7x annual savings
  const payback = Math.round(system / annual);
  return { annual, system, payback };
}

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export default function ResultsStep() {
  const { data } = useCalculator();

  const monthly = data.monthlyBill || 200;
  const { annual, system, payback } = estimateSavings(monthly);
  const firstName = data.firstName || 'there';

  return (
    <div className="step-enter space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-3">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-green-500" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Thanks, {firstName}!
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          Your personalized solar estimate is ready.
        </p>
      </div>

      {/* Savings cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-100 bg-orange-50 p-4 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Estimated Annual Savings</p>
          <p className="text-2xl font-black text-orange-500">{formatCurrency(annual)}</p>
          <p className="text-xs text-gray-400 mt-0.5">per year</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-blue-50 p-4 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Estimated System Size</p>
          <p className="text-2xl font-black text-blue-600">
            {Math.round(monthly / 20)} kW
          </p>
          <p className="text-xs text-gray-400 mt-0.5">recommended</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-green-50 p-4 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Typical Payback Period</p>
          <p className="text-2xl font-black text-green-600">{payback} yrs</p>
          <p className="text-xs text-gray-400 mt-0.5">with incentives</p>
        </div>
      </div>

      {/* What happens next */}
      <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
        <h3 className="font-bold text-gray-800 mb-3">What happens next?</h3>
        <ol className="space-y-3">
          {[
            { n: 1, text: 'A solar advisor will reach out within 24 hours to review your estimate.' },
            { n: 2, text: 'We\'ll connect you with pre-vetted local installers who compete for your business.' },
            { n: 3, text: 'You choose the best offer — with zero pressure and no obligation.' },
          ].map(({ n, text }) => (
            <li key={n} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {n}
              </span>
              <p className="text-sm text-gray-600">{text}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href={`tel:${BRAND.phone}`}
          className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call {BRAND.phone}
        </a>
        <p className="text-xs text-gray-400 mt-2">Mon–Fri 8am–8pm EST</p>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
          </svg>
          No obligation
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Licensed &amp; vetted installers
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {BRAND.googleRating} Google Rating
        </div>
      </div>
    </div>
  );
}
