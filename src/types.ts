export type Language = 'ar' | 'en';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface OwnerProfile {
  name: LocalizedString;
  salutation: LocalizedString;
  ownerCode: string;
  email: string;
  phone: string;
  contractDate: string;
  totalBranches: number;
  totalUnits: number;
  cumulativeEarnings: number;
}

export interface UnitMixItem {
  type: LocalizedString;
  count: number;
  avgMonthlyRate: string;
}

export interface BranchDetails {
  id: string;
  branchNumber: string;
  name: LocalizedString;
  fullCode: string;
  location: LocalizedString;
  district: LocalizedString;
  city: LocalizedString;
  address: LocalizedString;
  photos: string[];
  totalUnits: number;
  unitBreakdown: UnitMixItem[];
  contactPhone: string;
  mapEmbedUrl?: string;
}

export interface ReportNote {
  id: string;
  author: string;
  role: 'operator' | 'owner';
  date: string;
  content: string;
}

export interface RevenueCategory {
  category: LocalizedString;
  amount: number;
  percentage: number;
}

export interface OperatingReport {
  id: string;
  reportNumber: string; // e.g. "REP-01" or "1"
  periodKey: string;    // e.g. "2026-Q2-Q3"
  periodName: LocalizedString; // e.g. "25 Apr 2026 to 31 Jul 2026"
  periodDates?: LocalizedString;
  quarter: string;      // "Q2-Q3 2026"
  year: number;         // 2026
  branchId: string;     // e.g. "sahman-57"
  branchName: LocalizedString; // e.g. "Mathwaa 57: Al-Sahman District"
  tagline?: LocalizedString;
  clientName?: LocalizedString;
  
  // Core Required Metrics
  occupancyRate: number; // 38%
  totalContracts?: number; // 20225.91
  totalRevenue: number; // 22484.09
  avgMonthlyReturn?: number; // 7026.27
  directExpenses?: number; // 727.76
  capitalExpenses?: number; // 0.00
  operatorSharePercentage: number; // 25%
  operatorShareAmount: number; // 5056.47
  netToOwner: number; // 14441.67

  // Rich Breakdown
  totalUnits: number; // 3
  occupiedUnits: number;
  adr: number;
  revPar: number;
  revenueBreakdown: RevenueCategory[];
  maintenanceCostsCovered: number;
  utilitiesCostCovered: number;
  
  // Payout Details
  payoutStatus: 'transferred' | 'pending' | 'processing';
  payoutRef: string;
  payoutDate: string;
  bankAccount: string;

  // Notes Field
  notes: LocalizedString;
  additionalRemarks?: ReportNote[];
}

export type ViewTab = 'board' | 'branches' | 'analytics';
