// ─── Brand Config ──────────────────────────────────────────────────────────
// Replace these with your actual brand values during rebrand
export const BRAND = {
  name: 'Energy Experts',
  tagline: 'Electric Bill Rising? See How Much Solar Could Save You!',
  subTagline: 'Receive a custom estimate in under 60 seconds',
  phone: '(844) 442-5029',
  email: 'info@energyexperts.me',
  address: '1341 Long Plains Rd, Buxton, ME 04093',
  googleReviewCount: '408',
  googleRating: '4.8',
  estimateCount: '3,372,403',
  estimateSince: '2008',
  ctaLabel: 'Calculate Cost',
};

// ─── Google Maps ────────────────────────────────────────────────────────────
// Set your Google Maps API key in .env.local as NEXT_PUBLIC_GOOGLE_MAPS_KEY
export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
  defaultZoom: 11,
  markerZoom: 19,
};

// ─── Progress Stages ────────────────────────────────────────────────────────
export const PROGRESS_STAGES = [
  { id: 'bill', label: 'Current Bill' },
  { id: 'location', label: 'Determine Location' },
  { id: 'accuracy', label: 'Refine Accuracy' },
  { id: 'project', label: 'Project Details' },
  { id: 'home', label: 'Home Information' },
  { id: 'complete', label: 'Analysis Complete' },
];

// Maps each calculator step to which stage index it belongs (0-based)
export const STEP_TO_STAGE: Record<string, number> = {
  bill: 0,
  address: 1,
  marker: 2,
  'building-type': 3,
  ownership: 4,
  'has-solar': 4,
  'home-type': 4,
  'system-type': 4,
  'roof-type': 4,
  'roof-repairs': 4,
  name: 5,
  email: 5,
  phone: 5,
  phone_otp: 5,
};

// ─── Calculator Bill Range ───────────────────────────────────────────────────
export const BILL_CONFIG = {
  min: 50,
  max: 600,
  default: 200,
  step: 10,
  maxLabel: '$600 +',
};

// ─── Roof types with display images ─────────────────────────────────────────
export const ROOF_TYPES = [
  { id: 'Metal', label: 'Metal', emoji: '🔩', bgColor: '#FF7043' },
  { id: 'Shingles', label: 'Shingles', emoji: '🏠', bgColor: '#78909C' },
  { id: 'Concrete tiles', label: 'Concrete tiles', emoji: '⬜', bgColor: '#B0BEC5' },
  { id: 'Clay or terracotta', label: 'Clay or terracotta', emoji: '🏺', bgColor: '#FF7043' },
  { id: 'Ground mount', label: 'Ground mount', emoji: '☀️', bgColor: '#29B6F6' },
  { id: 'Other', label: 'Other', emoji: '❓', bgColor: '#FFFFFF' },
];

// ─── Home types ──────────────────────────────────────────────────────────────
export const HOME_TYPES = [
  { id: 'Freestanding', label: 'Freestanding' },
  { id: 'Condo', label: 'Condo' },
  { id: 'Mobile Home', label: 'Mobile Home' },
  { id: 'New Build', label: 'New Build' },
];

// ─── Roof repair options ─────────────────────────────────────────────────────
export const ROOF_REPAIR_OPTIONS = [
  { id: 'Roof is fine', label: 'Roof is fine', emoji: '🏠' },
  { id: 'Minor repairs', label: 'Minor repairs', emoji: '🔧' },
  { id: 'Need to re-roof', label: 'Need to re-roof', emoji: '🏗️' },
  { id: 'Unsure', label: 'Unsure', emoji: '❓' },
];

// ─── System types ────────────────────────────────────────────────────────────
export const SYSTEM_TYPES = [
  { id: 'Solar', label: 'Solar', emoji: '⚡' },
  { id: 'Solar with battery storage', label: 'Solar with battery storage', emoji: '🔋' },
];

// ─── TCPA Disclaimer ─────────────────────────────────────────────────────────
export const TCPA_TEXT = `By clicking the "Continue" button you agree to our Terms and Privacy Policy and authorize ${BRAND.name} or our chosen solar installers to use the phone number/s entered. Some installers may use auto-dialers, send automated text messages, AI generative voice, or AI generative SMS/MMS. If they cannot contact you these may result in charges to you. You consent to receiving these communications even if the phone number entered above is on the "Do Not Call" register. All information is collected and used in accordance with our Privacy Policy and our Terms and Conditions. In addition, by clicking "Continue" you also consent to phone calls from the above-mentioned Solar Installers being recorded by ${BRAND.name} for training and quality assurance purposes. You may opt out of future contact at any time and your consent is not a requirement for any purchase.`;
