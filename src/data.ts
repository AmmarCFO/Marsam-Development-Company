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
  cumulativeEarnings: 17601.13
};

export const branchesList: BranchDetails[] = [
  {
    id: "sahman-55",
    branchNumber: "55",
    fullCode: "MTH-SHM-55",
    name: {
      ar: "مثوى ٥٥: حي السهمان",
      en: "Mathwaa 55 — Al-Sahman District"
    },
    location: {
      ar: "الرياض - حي السهمان",
      en: "Riyadh - Al-Sahman District"
    },
    district: {
      ar: "حي السهمان، الرياض",
      en: "Al-Sahman District, Riyadh"
    },
    city: {
      ar: "الرياض",
      en: "Riyadh"
    },
    address: {
      ar: "حي السهمان، الرياض، المملكة العربية السعودية",
      en: "Al-Sahman District, Riyadh, Kingdom of Saudi Arabia"
    },
    photos: IMAGES.all,
    totalUnits: 3,
    unitBreakdown: [
      { type: { ar: "شقق سكنية مفروشة فاخرة", en: "Luxury Furnished Residential Units" }, count: 3, avgMonthlyRate: "4,388.62 SAR" }
    ],
    contactPhone: "+966 56 208 9171"
  }
];

export const initialOperatingReports: OperatingReport[] = [
  {
    id: "REP-55-01",
    reportNumber: "1",
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
      ar: "مثوى ٥٥: حي السهمان",
      en: "Mathwaa 55 — Al-Sahman District"
    },
    tagline: {
      ar: "بيتك، راحتك وطمأنينتك",
      en: "Your home, comfort and peace of mind"
    },
    clientName: {
      ar: "شركة مرسم للتطوير العقاري",
      en: "Marsam Real Estate Development Company"
    },
    
    // Core Required Metrics from User Prompt
    occupancyRate: 37,
    totalContracts: 23617.57,
    totalRevenue: 14043.60,
    avgMonthlyReturn: 4388.62,
    directExpenses: 1292.92,
    capitalExpenses: 0.00,
    operatorSharePercentage: 20,
    operatorShareAmount: 4723.51,
    netToOwner: 17601.13,

    totalUnits: 3,
    occupiedUnits: 1,
    adr: 242,
    revPar: 90,
    revenueBreakdown: [
      { category: { ar: "إجمالي قيمة العقود الإيجارية المبرمة", en: "Total Rental Contracts" }, amount: 23617.57, percentage: 100 }
    ],
    maintenanceCostsCovered: 1292.92,
    utilitiesCostCovered: 0,
    payoutStatus: "transferred",
    payoutRef: "TXN-20260731-MTH55",
    payoutDate: "2026-07-31",
    bankAccount: "",
    notes: {
      ar: "تضم المنشأة 3 وحدات سكنية سجلت نسبة إشغال 37% خلال الفترة. بلغ إجمالي العقود 23,617.57 ريال، مع إجمالي إيراد للفترة قدره 14,043.60 ريال، بمتوسط عائد شهري 4,388.62 ريال. بلغت المصاريف المباشرة 1,292.92 ريال وبدون مصاريف رأسمالية. بلغت حصة المشغل (20%) مبلغ 4,723.51 ريال، ليتبقى صافي عائد للعميل قدره 17,601.13 ريال.",
      en: "The property comprises 3 units, which recorded an occupancy rate of 37% over the period. Total contracts amounted to SAR 23,617.57, with total revenue for the period of SAR 14,043.60, giving an average monthly return of SAR 4,388.62. Against this, direct expenses were SAR 1,292.92 and capital expenses were nil. The operator's share, calculated at 20%, came to SAR 4,723.51. This leaves a net return to the client of SAR 17,601.13."
    },
    additionalRemarks: [
      {
        id: "rem-55-101",
        author: "إدارة التشغيل (مثوى)",
        role: "operator",
        date: "2026-07-31",
        content: "تم اعتماد المستند المالي رقم 1 وتحويل صافي العائد النهائي 17,601.13 ريال إلى شركة مرسم للتطوير العقاري."
      }
    ]
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
