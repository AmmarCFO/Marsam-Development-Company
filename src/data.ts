import { OwnerProfile, BranchDetails, OperatingReport } from './types';
import { IMAGES } from './constants/images';

export const logoUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69732f9a6a14d6634b2cbd49/e37995eab_mathwa_logo-removebg-preview.png";

export const ownerProfile: OwnerProfile = {
  salutation: {
    ar: "الأستاذ",
    en: "Mr."
  },
  name: {
    ar: "عبدالرحمن بن عبدالعزيز التركي",
    en: "Abdulrahman bin Abdulaziz Al-Turki"
  },
  ownerCode: "OWNER-ALTURKI-2026-056",
  email: "abdulrahman.alturki@gmail.com",
  phone: "+966 50 123 4567",
  contractDate: "2026-04-25",
  totalBranches: 1,
  totalUnits: 2,
  cumulativeEarnings: 11967.76
};

export const branchesList: BranchDetails[] = [
  {
    id: "sahman-56",
    branchNumber: "56",
    fullCode: "MTH-MED-56",
    name: {
      ar: "فرع رقم ٥٦: بني حارثة",
      en: "Branch No. 56 — Bani Harithah"
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
    totalUnits: 2,
    unitBreakdown: [
      { type: { ar: "استوديو", en: "Studio" }, count: 1, avgMonthlyRate: "3,237.75 SAR" },
      { type: { ar: "شقة ثلاث غرف نوم", en: "3 bedroom apartment" }, count: 1, avgMonthlyRate: "11,721.95 SAR" }
    ],
    contactPhone: "+966 56 208 9171"
  }
];

export const initialOperatingReports: OperatingReport[] = [
  {
    id: "REP-56-01",
    reportNumber: "56",
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
    branchId: "sahman-56",
    branchName: {
      ar: "فرع ٥٦: المدينة المنورة - بني حارثة",
      en: "Branch 56: Madinah - Bani Harithah"
    },
    tagline: {
      ar: "تقرير أداء التشغيل المعتمد",
      en: "Certified Operating Performance Report"
    },
    clientName: {
      ar: "عبدالرحمن بن عبدالعزيز التركي",
      en: "Abdulrahman bin Abdulaziz Al-Turki"
    },
    
    // Core Required Metrics
    occupancyRate: 38,
    totalContracts: 14959.70, // Revenue
    totalRevenue: 14959.70,   // Revenue
    avgMonthlyReturn: 4674.91,
    directExpenses: 1292.92,
    operatorSharePercentage: 20,
    operatorShareAmount: 2991.94,
    capitalExpenses: 0.00,
    netToOwner: 11967.76,

    // Segregated reporting for the 2 units (3BR & Studio)
    unitReports: [
      {
        id: "U1-STUDIO",
        unitNumber: "1",
        unitName: { ar: "استوديو (Studio)", en: "Studio" },
        occupancyRate: 32,
        periodRevenue: 3237.75,
        collectedRevenue: 3237.75,
        operatorShare: 647.55,
        netToOwner: 2590.20
      },
      {
        id: "U2-3BR",
        unitNumber: "2",
        unitName: { ar: "ثلاث غرف نوم (3BR)", en: "3 Bedrooms (3BR)" },
        occupancyRate: 44,
        periodRevenue: 11721.95,
        collectedRevenue: 11721.95,
        operatorShare: 2344.39,
        netToOwner: 9377.56
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
        threeBedRate: 26
      },
      {
        monthKey: "2026-05",
        monthName: { ar: "مايو ٢٠٢٦", en: "May 2026" },
        occupancyRate: 36,
        studioRate: 32,
        twoBedRate: 0,
        threeBedRate: 40
      },
      {
        monthKey: "2026-06",
        monthName: { ar: "يونيو ٢٠٢٦", en: "June 2026" },
        occupancyRate: 20,
        studioRate: 34,
        twoBedRate: 0,
        threeBedRate: 6
      },
      {
        monthKey: "2026-07",
        monthName: { ar: "يوليو ٢٠٢٦", en: "July 2026" },
        occupancyRate: 68,
        studioRate: 35,
        twoBedRate: 0,
        threeBedRate: 100
      }
    ],

    totalUnits: 2,
    occupiedUnits: 1,
    adr: 242,
    revPar: 90,
    revenueBreakdown: [
      { category: { ar: "إيراد العقود المبرمة للوحدات", en: "Unit Rental Contracts Revenue" }, amount: 14959.70, percentage: 100 }
    ],
    maintenanceCostsCovered: 1292.92,
    utilitiesCostCovered: 0,
    payoutStatus: "transferred",
    payoutRef: "TXN-20260731-MTH56",
    payoutDate: "2026-07-31",
    bankAccount: "",
    notes: {
      ar: "تقرير أداء التشغيل لفرع ٥٦ (المدينة المنورة - بني حارثة) للعميل عبدالرحمن بن عبدالعزيز التركي. سجلت الوحدتان (استوديو وثلاث غرف) نسبة إشغال متوسطة ٣٨٪، بإيراد إجمالي قدره ١٤,٩٥٩٫٧٠ ريال، وحصة مشغل (٢٠٪) قدرها ٢,٩٩١٫٩٤ ريال، ومصاريف رأسمالية ٠٫٠٠ ريال، وصافي عائد للعميل ١١,٩٦٧٫٧٦ ريال.",
      en: "Certified operating performance report for Branch 56 (Madinah - Bani Harithah) for client Abdulrahman bin Abdulaziz Al-Turki. The 2 units (Studio and 3BR) achieved 38% occupancy rate, with SAR 14,959.70 revenue, SAR 2,991.94 operator's share (20%), SAR 0.00 capital expenditures, and SAR 11,967.76 net return to client."
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
