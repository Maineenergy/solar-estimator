/**
 * Solar estimation calculation engine
 * Provides core solar system sizing, cost, and savings calculations
 */

export interface SolarEstimate {
  systemSize: number; // in kW
  estimatedCost: number; // total system cost before incentives
  federalTaxCredit: number; // 30% of cost
  estimatedNetCost: number; // cost after tax credit
  annualSavings: number; // annual savings in dollars
  paybackPeriod: number; // years to break even
}

/**
 * Average residential electricity rates by state (cents per kWh)
 * Used to estimate annual consumption from monthly bill
 */
const AVERAGE_RATES: Record<string, number> = {
  AK: 21.0,
  AL: 12.5,
  AR: 12.0,
  AZ: 13.5,
  CA: 18.0,
  CO: 13.0,
  CT: 16.5,
  DE: 13.5,
  FL: 12.0,
  GA: 12.0,
  HI: 24.0,
  IA: 12.5,
  ID: 11.0,
  IL: 14.0,
  IN: 12.5,
  KS: 12.0,
  KY: 11.0,
  LA: 11.0,
  MA: 15.5,
  MD: 14.5,
  ME: 14.5,
  MI: 15.0,
  MN: 12.5,
  MO: 12.0,
  MS: 11.0,
  MT: 11.5,
  NC: 12.0,
  ND: 11.0,
  NE: 12.0,
  NH: 15.0,
  NJ: 15.5,
  NM: 12.0,
  NV: 12.0,
  NY: 16.0,
  OH: 13.5,
  OK: 11.5,
  OR: 12.0,
  PA: 14.0,
  RI: 16.0,
  SC: 12.0,
  SD: 12.0,
  TN: 11.0,
  TX: 11.5,
  UT: 12.5,
  VA: 12.5,
  VT: 14.5,
  WA: 11.5,
  WI: 13.5,
  WV: 12.0,
  WY: 11.5,
};

/**
 * Average peak sun hours per day by state
 * Used to size the solar array
 */
const PEAK_SUN_HOURS: Record<string, number> = {
  AK: 3.5,
  AL: 4.8,
  AR: 4.8,
  AZ: 6.0,
  CA: 5.5,
  CO: 5.2,
  CT: 4.2,
  DE: 4.5,
  FL: 5.0,
  GA: 4.8,
  HI: 5.5,
  IA: 4.5,
  ID: 4.8,
  IL: 4.5,
  IN: 4.5,
  KS: 5.0,
  KY: 4.5,
  LA: 4.8,
  MA: 4.2,
  MD: 4.5,
  ME: 4.0,
  MI: 4.2,
  MN: 4.5,
  MO: 4.8,
  MS: 4.8,
  MT: 4.8,
  NC: 4.5,
  ND: 4.2,
  NE: 4.8,
  NH: 4.0,
  NJ: 4.5,
  NM: 5.8,
  NV: 5.8,
  NY: 4.2,
  OH: 4.2,
  OK: 5.0,
  OR: 4.2,
  PA: 4.2,
  RI: 4.2,
  SC: 4.5,
  SD: 4.8,
  TN: 4.5,
  TX: 5.0,
  UT: 5.2,
  VA: 4.5,
  VT: 4.0,
  WA: 4.2,
  WI: 4.2,
  WV: 4.2,
  WY: 5.0,
};

/**
 * Extract state code from ZIP code
 * Using approximate ZIP ranges for states
 */
function getStateFromZip(zip: string): string {
  const zipNum = parseInt(zip.substring(0, 3), 10);

  // Approximate state ranges based on ZIP prefixes
  if (zipNum >= 0 && zipNum <= 9) return 'MA'; // 00900-09999
  if (zipNum >= 10 && zipNum <= 14) return 'NY'; // 10000-14999
  if (zipNum >= 15 && zipNum <= 19) return 'PA'; // 15000-19999
  if (zipNum >= 20 && zipNum <= 24) return 'MD'; // 20000-24999
  if (zipNum >= 25 && zipNum <= 28) return 'VA'; // 25000-28999
  if (zipNum >= 29 && zipNum <= 29) return 'SC'; // 29000-29999
  if (zipNum >= 30 && zipNum <= 31) return 'GA'; // 30000-31999
  if (zipNum >= 32 && zipNum <= 34) return 'FL'; // 32000-34999
  if (zipNum >= 35 && zipNum <= 36) return 'AL'; // 35000-36999
  if (zipNum >= 37 && zipNum <= 38) return 'TN'; // 37000-38999
  if (zipNum >= 39 && zipNum <= 45) return 'OH'; // 39000-45999
  if (zipNum >= 46 && zipNum <= 47) return 'IN'; // 46000-47999
  if (zipNum >= 48 && zipNum <= 49) return 'MI'; // 48000-49999
  if (zipNum >= 50 && zipNum <= 52) return 'IA'; // 50000-52999
  if (zipNum >= 53 && zipNum <= 54) return 'WI'; // 53000-54999
  if (zipNum >= 55 && zipNum <= 56) return 'MN'; // 55000-56999
  if (zipNum >= 57 && zipNum <= 57) return 'SD'; // 57000-57999
  if (zipNum >= 58 && zipNum <= 58) return 'ND'; // 58000-58999
  if (zipNum >= 59 && zipNum <= 59) return 'MT'; // 59000-59999
  if (zipNum >= 60 && zipNum <= 62) return 'IL'; // 60000-62999
  if (zipNum >= 63 && zipNum <= 65) return 'MO'; // 63000-65999
  if (zipNum >= 66 && zipNum <= 67) return 'KS'; // 66000-67999
  if (zipNum >= 68 && zipNum <= 69) return 'NE'; // 68000-69999
  if (zipNum >= 70 && zipNum <= 71) return 'LA'; // 70000-71999
  if (zipNum >= 72 && zipNum <= 72) return 'AR'; // 72000-72999
  if (zipNum >= 73 && zipNum <= 74) return 'OK'; // 73000-74999
  if (zipNum >= 75 && zipNum <= 79) return 'TX'; // 75000-79999
  if (zipNum >= 80 && zipNum <= 81) return 'CO'; // 80000-81999
  if (zipNum >= 82 && zipNum <= 83) return 'WY'; // 82000-83999
  if (zipNum >= 84 && zipNum <= 84) return 'UT'; // 84000-84999
  if (zipNum >= 85 && zipNum <= 86) return 'AZ'; // 85000-86999
  if (zipNum >= 87 && zipNum <= 88) return 'NM'; // 87000-88999
  if (zipNum >= 89 && zipNum <= 89) return 'NV'; // 89000-89999
  if (zipNum >= 90 && zipNum <= 96) return 'CA'; // 90000-96999
  if (zipNum >= 97 && zipNum <= 97) return 'OR'; // 97000-97999
  if (zipNum >= 98 && zipNum <= 99) return 'WA'; // 98000-99999

  return 'CA'; // Default fallback
}

/**
 * Calculate solar estimate based on user inputs
 */
export function calculateSolarEstimate(
  monthlyBill: number,
  zip: string,
  homeType: string = 'Freestanding',
  systemType: string = 'Solar'
): SolarEstimate {
  // Get state from ZIP
  const state = getStateFromZip(zip);

  // Get average electricity rate (cents per kWh)
  const avgRate = AVERAGE_RATES[state] || 13;

  // Get peak sun hours per day
  const sunHours = PEAK_SUN_HOURS[state] || 4.5;

  // Calculate annual kWh consumption
  // monthlyBill ($/month) / (avgRate cents/kWh * 0.01) / 12 months = annual kWh
  const monthlyKwh = (monthlyBill / (avgRate * 0.01)) || 800; // Safe fallback
  const annualKwh = monthlyKwh * 12;

  // Calculate system size (kW)
  // annualKwh / sunHours / 365 days
  let systemSize = annualKwh / sunHours / 365;

  // Round to nearest 0.5 kW
  systemSize = Math.round(systemSize * 2) / 2;

  // Minimum system size
  if (systemSize < 3) systemSize = 3;

  // Apply system type multiplier
  // Solar with battery storage typically adds 20-30% to cost for the battery component
  let costMultiplier = 1.0;
  if (systemType === 'Solar with battery storage') {
    costMultiplier = 1.25;
  }

  // Calculate estimated cost
  // National average: ~$2,800 per kW installed
  const costPerKw = 2800;
  const estimatedCost = systemSize * costPerKw * costMultiplier;

  // Federal tax credit (30% of cost)
  const federalTaxCredit = estimatedCost * 0.3;

  // Net cost after tax credit
  const estimatedNetCost = estimatedCost - federalTaxCredit;

  // Annual savings
  // Assuming 85% offset of electricity usage (conservative)
  const annualSavings = (monthlyBill * 12) * 0.85;

  // Payback period in years
  const paybackPeriod = estimatedNetCost > 0 ? estimatedNetCost / annualSavings : 0;

  return {
    systemSize: Math.round(systemSize * 10) / 10, // Round to 1 decimal
    estimatedCost: Math.round(estimatedCost),
    federalTaxCredit: Math.round(federalTaxCredit),
    estimatedNetCost: Math.round(estimatedNetCost),
    annualSavings: Math.round(annualSavings),
    paybackPeriod: Math.round(paybackPeriod * 10) / 10, // Round to 1 decimal
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
