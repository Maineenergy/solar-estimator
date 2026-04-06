/**
 * NREL Utility Rates API Integration
 * Fetches utility provider information by latitude and longitude
 */

export interface UtilityProvider {
  id: string;
  name: string;
  logo?: string;
}

/**
 * Fetch utility providers for a given location using NREL API
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns Array of utility providers for the location
 */
export async function getUtilityProvidersByLocation(
  lat: number,
  lng: number
): Promise<UtilityProvider[]> {
  const apiKey = process.env.NREL_API_KEY;

  if (!apiKey) {
    console.warn('NREL_API_KEY not set, returning default utility options');
    return [{ id: 'Other', name: 'Other' }];
  }

  try {
    const url = new URL('https://developer.nrel.gov/api/utility_rates/v3.json');
    url.searchParams.append('api_key', apiKey);
    url.searchParams.append('lat', lat.toString());
    url.searchParams.append('lon', lng.toString());

    const response = await fetch(url.toString(), {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn(`NREL API returned status ${response.status}`);
      return [{ id: 'Other', name: 'Other' }];
    }

    const data = await response.json();

    // NREL API returns utility info in the response
    // Structure depends on API version - this is a typical example
    if (data.utility && data.utility.utilities && Array.isArray(data.utility.utilities)) {
      const utilities: UtilityProvider[] = data.utility.utilities.map(
        (utility: any) => ({
          id: utility.utility_name || utility.id || 'unknown',
          name: utility.utility_name || utility.name || 'Unknown Utility',
        })
      );

      // Always include "Other" as a fallback option
      utilities.push({ id: 'Other', name: 'Other' });
      return utilities;
    }

    // Fallback if response structure is unexpected
    return [{ id: 'Other', name: 'Other' }];
  } catch (error) {
    console.error('Error fetching NREL utility data:', error);
    return [{ id: 'Other', name: 'Other' }];
  }
}

/**
 * Common utility providers for fallback purposes
 * Maps state abbreviations to common utilities
 */
const UTILITY_MAP: Record<string, UtilityProvider[]> = {
  ME: [
    { id: 'Central Maine Power', name: 'Central Maine Power (CMP)' },
    { id: 'Versant Power', name: 'Versant Power' },
    { id: 'Other', name: 'Other' },
  ],
  CA: [
    { id: 'PG&E', name: 'Pacific Gas & Electric' },
    { id: 'SCE', name: 'Southern California Edison' },
    { id: 'SDG&E', name: 'San Diego Gas & Electric' },
    { id: 'Other', name: 'Other' },
  ],
  TX: [
    { id: 'TXU', name: 'TXU Energy' },
    { id: 'CenterPoint', name: 'CenterPoint Energy' },
    { id: 'ONCOR', name: 'ONCOR' },
    { id: 'Other', name: 'Other' },
  ],
  NY: [
    { id: 'ConEd', name: 'Consolidated Edison' },
    { id: 'NYSEG', name: 'New York State Electric & Gas' },
    { id: 'Other', name: 'Other' },
  ],
  FL: [
    { id: 'FPL', name: 'Florida Power & Light' },
    { id: 'Duke', name: 'Duke Energy Florida' },
    { id: 'Tampa', name: 'Tampa Electric Company' },
    { id: 'Other', name: 'Other' },
  ],
};

/**
 * Get utility providers by state code (fallback)
 * Used when NREL API is unavailable
 */
export function getUtilityProvidersByState(stateCode: string): UtilityProvider[] {
  return UTILITY_MAP[stateCode] || [{ id: 'Other', name: 'Other' }];
}
