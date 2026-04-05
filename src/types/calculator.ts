export type CalculatorStep =
  | 'landing'
  | 'loading'
  | 'utility'
  | 'bill'
  | 'address'
  | 'marker'
  | 'building-type'
  | 'ownership'
  | 'has-solar'
  | 'home-type'
  | 'system-type'
  | 'roof-type'
  | 'roof-repairs'
  | 'name'
  | 'email'
  | 'phone'
  | 'phone_otp'
  | 'results';

export interface CalculatorData {
  zip: string;
  utility: string;
  utilityLabel: string;
  monthlyBill: number;
  address: string;
  lat: number;
  lng: number;
  buildingType: 'Residential' | 'Commercial' | '';
  ownership: 'Yes' | 'No' | '';
  hasSolar: 'No' | 'Yes' | '';
  homeType: 'Freestanding' | 'Condo' | 'Mobile Home' | 'New Build' | '';
  systemType: 'Solar' | 'Solar with battery storage' | '';
  roofType: 'Metal' | 'Shingles' | 'Concrete tiles' | 'Clay or terracotta' | 'Ground mount' | 'Other' | '';
  roofRepairs: 'Roof is fine' | 'Minor repairs' | 'Need to re-roof' | 'Unsure' | '';
  firstName: string;
  lastName: string;
  isOwner: boolean;
  email: string;
  phone: string;
}

export interface UtilityOption {
  id: string;
  name: string;
  logo?: string;
}

export interface ProgressStage {
  id: string;
  label: string;
}
