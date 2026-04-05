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
  description: `Get a free solar estimate in under 60 seconds. See how much solar could save you on your electric bill. ${BRAND.estimateCount} online estimates since ${BRAND.estimateSince}!`,
  keywords: 'solar estimate, solar calculator, solar panels cost, solar savings, solar installers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: BRAND.name,
              telephone: BRAND.phone,
              email: BRAND.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: '1341 Long Plains Rd',
                addressLocality: 'Buxton',
                addressRegion: 'ME',
                postalCode: '04093',
                addressCountry: 'US',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <CalculatorProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CalculatorProvider>
      </body>
    </html>
  );
}
