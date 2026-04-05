'use client';

import React, { useMemo } from 'react';
import { useCalculator } from '@/context/CalculatorContext';
import StepCard from '../StepCard';
import { calculateSolarEstimate, formatCurrency } from '@/lib/calculations';

export default function StepResults() {
  const { data } = useCalculator();

  const estimate = useMemo(
    () => calculateSolarEstimate(data.monthlyBill, data.zip, data.homeType, data.systemType),
    [data.monthlyBill, data.zip, data.homeType, data.systemType]
  );

  return (
    <StepCard showProgressBar={false} showBackButton={false}>
      <div className="text-center">
        <h2 className="step-title">Your Solar Estimate</h2>
        <p className="text-gray-600 mb-8">{data.address}</p>

        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* System size */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <p className="text-gray-600 text-sm mb-2">System Size</p>
            <p className="text-3xl font-bold text-blue-600">{estimate.systemSize} kW</p>
          </div>

          {/* Cost estimate */}
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <p className="text-gray-600 text-sm mb-2">Estimated Cost</p>
            <p className="text-3xl font-bold text-orange-600">
              {formatCurrency(estimate.estimatedCost)}
            </p>
          </div>

          {/* Federal tax credit */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <p className="text-gray-600 text-sm mb-2">Federal Tax Credit (30%)</p>
            <p className="text-3xl font-bold text-green-600">
              -{formatCurrency(estimate.federalTaxCredit)}
            </p>
          </div>

          {/* Net cost */}
          <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
            <p className="text-gray-600 text-sm mb-2">Estimated Net Cost</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(estimate.estimatedNetCost)}
            </p>
          </div>

          {/* Annual savings */}
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
            <p className="text-gray-600 text-sm mb-2">Annual Savings</p>
            <p className="text-3xl font-bold text-indigo-600">
              {formatCurrency(estimate.annualSavings)}/yr
            </p>
          </div>

          {/* Payback period */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <p className="text-gray-600 text-sm mb-2">Payback Period</p>
            <p className="text-3xl font-bold text-purple-600">{estimate.paybackPeriod} years</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-4 mb-8">
          <button className="btn-primary w-full py-4 text-lg">
            Get Free Quotes from Local Installers
          </button>
          <button className="w-full border-2 border-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition">
            Email Me My Estimate
          </button>
        </div>

        {/* Thank you message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-sm text-gray-700 mb-3">
            Your personalized solar estimate is ready. Local installers will contact you shortly
            with quotes based on your property.
          </p>
          <p className="text-xs text-gray-600">
            Check your email at {data.email} for your full report and installer information.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-6">
          This is an estimate based on typical conditions. Actual costs and savings may vary based on
          site conditions, local labor rates, and incentive availability.
        </p>
      </div>
    </StepCard>
  );
}
