import { OwnerProfile, BranchDetails, OperatingReport } from './types';
import { IMAGES } from './constants/images';

export const logoUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69732f9a6a14d6634b2cbd49/e37995eab_mathwa_logo-removebg-preview.png";

export const ownerProfile: OwnerProfile = {
  salutation: {
    ar: "شركة",
    en: "M/s"
  },
  name: {
    ar: "مرسم للتطوير العقاري",
    en: "Marsam Real Estate Development Company"
  },
  ownerCode: "OWNER-MARSAM-2026-055",
  email: "info@marsamdev.com",
  phone: "+966 50 123 4567",
  contractDate: "2026-04-25",
  totalBranches: 1,
  totalUnits: 3,
  cumulativeEarnings: 17734.27
};

export const branchesList: BranchDetails[] = [
  {
    id: "sahman-55",
    branchNumber: "55",
    fullCode: "MTH-MED-55",
    name: {
      ar: "فرع رقم ٥٥: بني حارثة",
      en: "Branch No. 55 — Bani Harithah"
    },
    location: {
      ar: "المدينة المنورة - بني حارثة",
      en: "Madinah - Bani Harithah"
    },
    district: {
      ar: "بني حارثة، المدينة المنورة",
      en: "Bani Harithah, Madinah"
    },
    city: {
      ar: "المدينة المنورة",
      en: "Madinah"
    },
    address: {
      ar: "بني حارثة، المدينة المنورة، المملكة العربية السعودية",
      en: "Bani Harithah District, Madinah, Kingdom of Saudi Arabia"
    },
    photos: IMAGES.all,
    totalUnits: 3,
    unitBreakdown: [
      { type: { ar: "استوديو", en: "Studio" }, count: 1, avgMonthlyRate: "3,800 SAR" },
      { type: { ar: "شقة غرفتين نوم", en: "2 bedroom apartment" }, count: 1, avgMonthlyRate: "4,500 SAR" },
      { type: { ar: "شقة ثلاث غرف نوم", en: "3 bedroom apartment" }, count: 1, avgMonthlyRate: "4,865.86 SAR" }
    ],
    contactPhone: "+966 56 208 9171"
  }
];

export const initialOperatingReports: OperatingReport[] = [
  {
    id: "REP-55-01",
    reportNumber: "55",
    periodKey: "2026-Q2-Q3",
    periodName: {
      ar: "٢٥ أبريل ٢٠٢٦ - ٣١ يوليو ٢٠٢٦",
      en: "25 Apr 2026 to 31 Jul 2026"
    },
    periodDates: {
      ar: "من ٢٥ أبريل ٢٠٢٦ إلى ٣١ يوليو ٢٠٢٦",
      en: "25 Apr 2026 to 31 Jul 2026"
    },
    quarter: "25 Apr 2026 - 31 Jul 2026",
    year: 2026,
    branchId: "sahman-55",
    branchName: {
      ar: "فرع ٥٥: المدينة المنورة - بني حارثة",
      en: "Branch 55: Madinah - Bani Harithah"
    },
    tagline: {
      ar: "تقرير أداء التشغيل المعتمد",
      en: "Certified Operating Performance Report"
    },
    clientName: {
      ar: "المالك: شركة مرسم للتطوير العقاري",
      en: "Owner: Marsam Real Estate Development Company"
    },
    
    // Core Required Metrics (Updated as requested by User)
    occupancyRate: 38,
    totalContracts: 14043.60, // Period Revenue
    totalRevenue: 23783.99,   // Collected Revenue
    operatorSharePercentage: 20,
    operatorShareAmount: 2808.72,
    capitalExpenses: 0.00,
    netToOwner: 11234.88,

    // Segregated reporting for the 3 units
    unitReports: [
      {
        id: "U1-STUDIO",
        unitNumber: "1",
        unitName: { ar: "استوديو (Studio)", en: "Studio" },
        occupancyRate: 32,
        periodRevenue: 3500.00,
        collectedRevenue: 5850.00,
        operatorShare: 700.00,
        netToOwner: 2800.00
      },
      {
        id: "U2-2BR",
        unitNumber: "2",
        unitName: { ar: "غرفتان نوم (2BR)", en: "2 Bedrooms (2BR)" },
        occupancyRate: 39,
        periodRevenue: 4843.60,
        collectedRevenue: 8250.00,
        operatorShare: 968.72,
        netToOwner: 3874.88
      },
      {
        id: "U3-3BR",
        unitNumber: "3",
        unitName: { ar: "ثلاث غرف نوم (3BR)", en: "3 Bedrooms (3BR)" },
        occupancyRate: 42,
        periodRevenue: 5700.00,
        collectedRevenue: 9683.99,
        operatorShare: 1140.00,
        netToOwner: 4560.00
      }
    ],

    // Monthly Occupancy Trend (April 2026 to July 2026)
    monthlyOccupancyTrend: [
      {
        monthKey: "2026-04",
        monthName: { ar: "أبريل ٢٠٢٦", en: "April 2026" },
        occupancyRate: 13,
        studioRate: 0,
        twoBedRate: 0,
        threeBedRate: 39
      },
      {
        monthKey: "2026-05",
        monthName: { ar: "مايو ٢٠٢٦", en: "May 2026" },
        occupancyRate: 35.7,
        studioRate: 32,
        twoBedRate: 35,
        threeBedRate: 40
      },
      {
        monthKey: "2026-06",
        monthName: { ar: "يونيو ٢٠٢٦", en: "June 2026" },
        occupancyRate: 13.3,
        studioRate: 34,
        twoBedRate: 0,
        threeBedRate: 6
      },
      {
        monthKey: "2026-07",
        monthName: { ar: "يوليو ٢٠٢٦", en: "July 2026" },
        occupancyRate: 67.3,
        studioRate: 35,
        twoBedRate: 87,
        threeBedRate: 80
      }
    ],

    avgMonthlyReturn: 4388.62,
    directExpenses: 1292.92,
    totalUnits: 3,
    occupiedUnits: 1,
    adr: 242,
    revPar: 90,
    revenueBreakdown: [
      { category: { ar: "إيراد العقود المبرمة للوحدات", en: "Unit Rental Contracts Revenue" }, amount: 23783.99, percentage: 100 }
    ],
    maintenanceCostsCovered: 1292.92,
    utilitiesCostCovered: 0,
    payoutStatus: "transferred",
    payoutRef: "TXN-20260731-MTH55",
    payoutDate: "2026-07-31",
    bankAccount: "",
    notes: {
      ar: "تقرير أداء التشغيل لشركة مرسم للتطوير العقاري - فرع 55 (المدينة المنورة - بني حارثة). سجلت الوحدات نسبة إشغال 38%، بإيراد فترة 23,783.99 ريال، وإيراد محصل 14,043.60 ريال، وحصة مشغل 4,756.79 ريال، ومصاريف رأسمالية 0.00 ريال، وصافي عائد للمالك 17,734.27 ريال.",
      en: "Certified operating performance report for Marsam Real Estate Development Company - Branch 55 (Madinah - Bani Harithah). Units achieved 38% occupancy rate, with SAR 23,783.99 period revenue, SAR 14,043.60 collected revenue, SAR 4,756.79 operator's share, SAR 0.00 capital expenditures, and SAR 17,734.27 net amount for the owner."
    },
    additionalRemarks: []
  }
];

export const mathwaaBrandInfo = {
  hqAddress: {
    ar: "الصحافة، الرياض، المملكة العربية السعودية",
    en: "Al Sahafah District, Riyadh, Kingdom of Saudi Arabia"
  },
  phoneDirect: "+966 56 208 9171",
  phoneTollFree: "+966 9200 15627",
  email: "owners@mathwaa.com",
  website: "www.mathwaa.com"
};
