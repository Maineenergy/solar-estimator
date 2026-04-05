import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BRAND } from '@/lib/calculator-config';
import { CalculatorProvider } from '@/context/CalculatorContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Solar Estimator: System Size & Prices of Solar Pros Near You | ${BRAND.name}`,
  description: `Get a free solar estimate in under 60 seconds. ${BRAND.estimateCount} online estimates since ${BRAND.estimateSince}!`,
  keywords: 'solar estimate, solar calculator, solar panels cost, solar savings, solar installers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body className={inter.className}><CalculatorProvider><Header /><main>{children}</main><Footer /></CalculatorProvider></body></html>);
}
