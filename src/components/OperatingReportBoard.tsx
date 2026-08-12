import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, Printer, Home, Layers,
  BarChart3, CheckCircle2, Building2, MapPin, LayoutGrid, User
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend
} from 'recharts';
import { OperatingReport } from '../types';

interface OperatingReportBoardProps {
  isAr: boolean;
  reports: OperatingReport[];
  onSelectPrintReport: (report: OperatingReport) => void;
}

export const OperatingReportBoard: React.FC<OperatingReportBoardProps> = ({
  isAr,
  reports,
  onSelectPrintReport
}) => {
  const report = reports[0];
  if (!report) return null;

  const clientNameText = report.clientName 
    ? report.clientName[isAr ? 'ar' : 'en'] 
    : (isAr ? 'المالك: شركة مرسم للتطوير العقاري' : 'Owner: Marsam Real Estate Development Company');
  const branchNumberText = report.branchNumber || '55';
  const branchLocationText = isAr ? 'المدينة المنورة - بني حارثة' : 'Madinah - Bani Harithah';

  // Format trend chart data for recharts
  const chartData = (report.monthlyOccupancyTrend || []).map((item) => ({
    name: item.monthName[isAr ? 'ar' : 'en'],
    [isAr ? 'المتوسط العام' : 'Overall Average']: item.occupancyRate,
    [isAr ? 'استوديو (Studio)' : 'Studio']: item.studioRate || 0,
    [isAr ? 'غرفتان نوم (2BR)' : '2BR']: item.twoBedRate || 0,
    [isAr ? 'ثلاث غرف نوم (3BR)' : '3BR']: item.threeBedRate || 0,
  }));

  return (
    <div className="space-y-6 sm:space-y-8 my-4 sm:my-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#EDE5DC] shadow-xs space-y-8 sm:space-y-10"
      >
        {/* Main Document Header & Structured Showcase Cards */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#1d1d1f] via-[#2a2622] to-[#121110] text-white rounded-2xl p-5 sm:p-6 border border-[#C89565]/60 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {isAr ? 'تقرير تشغيلي معتمد' : 'Verified Operating Statement'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#F3E5D8] mt-2.5">
                {isAr ? 'تقرير الأداء التشغيلي (١)' : 'Operational Performance Report (1)'}
              </h2>
              <p className="text-xs text-stone-300 mt-1 font-medium">
                {isAr ? 'فرع مثوى ٥٥ • المدينة المنورة - حي بني حارثة' : 'Branch Mathwaa 55 • Madinah - Bani Harithah District'}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectPrintReport(report)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#C89565] hover:bg-[#b58253] active:bg-[#a37245] px-4 py-3 rounded-xl transition shadow-xs min-h-[44px]"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>{isAr ? 'طباعة التقرير / PDF' : 'Print Report / PDF'}</span>
            </motion.button>
          </div>

          {/* 5 Dedicated Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
            {/* Card 1: Client Name */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EDE5DC] shadow-2xs hover:border-[#C89565]/50 transition-colors flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#8B6F47] uppercase tracking-wider">
                  {isAr ? 'اسم العميل' : 'Client Name'}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#B8865F]/15 border border-[#C89565]/30 flex items-center justify-center text-[#8B6F47]">
                  <User className="w-4 h-4 text-[#B8865F]" />
                </div>
              </div>
              <div>
                <span className="text-sm sm:text-base font-extrabold text-[#1d1d1f] block leading-snug">
                  {clientNameText}
                </span>
                <span className="text-[11px] font-semibold text-stone-500 mt-0.5 block">
                  {isAr ? 'الجهة المالكة' : 'Property Owner'}
                </span>
              </div>
            </div>

            {/* Card 2: Branch */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EDE5DC] shadow-2xs hover:border-[#C89565]/50 transition-colors flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#8B6F47] uppercase tracking-wider">
                  {isAr ? 'الفرع' : 'Branch'}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#B8865F]/15 border border-[#C89565]/30 flex items-center justify-center text-[#8B6F47]">
                  <Building2 className="w-4 h-4 text-[#B8865F]" />
                </div>
              </div>
              <div>
                <span className="text-base sm:text-lg font-black text-[#1d1d1f] block">
                  {isAr ? 'مثوى ٥٥' : 'Mathwaa 55'}
                </span>
                <span className="text-[11px] font-semibold text-stone-500 mt-0.5 block">
                  {isAr ? 'فرع تشغيلي رئيسي' : 'Primary Operating Branch'}
                </span>
              </div>
            </div>

            {/* Card 3: Location */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EDE5DC] shadow-2xs hover:border-[#C89565]/50 transition-colors flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#8B6F47] uppercase tracking-wider">
                  {isAr ? 'الموقع' : 'Location'}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#B8865F]/15 border border-[#C89565]/30 flex items-center justify-center text-[#8B6F47]">
                  <MapPin className="w-4 h-4 text-[#B8865F]" />
                </div>
              </div>
              <div>
                <span className="text-base sm:text-lg font-black text-[#1d1d1f] block">
                  {isAr ? 'المدينة المنورة' : 'Madinah'}
                </span>
                <span className="text-xs font-bold text-[#8B6F47] mt-0.5 block">
                  {isAr ? 'حي بني حارثة' : 'Bani Harithah'}
                </span>
              </div>
            </div>

            {/* Card 4: Number of Units */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EDE5DC] shadow-2xs hover:border-[#C89565]/50 transition-colors flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#8B6F47] uppercase tracking-wider">
                  {isAr ? 'عدد الوحدات' : 'Number of Units'}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#B8865F]/15 border border-[#C89565]/30 flex items-center justify-center text-[#8B6F47]">
                  <Layers className="w-4 h-4 text-[#B8865F]" />
                </div>
              </div>
              <div>
                <span className="text-base sm:text-lg font-black text-[#1d1d1f] block">
                  {isAr ? '٣ وحدات' : '3 Units'}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 mt-0.5 block">
                  {isAr ? 'نشطة ومستغلة بالكامل' : 'Fully Active & Operational'}
                </span>
              </div>
            </div>

            {/* Card 5: Type of Units */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EDE5DC] shadow-2xs hover:border-[#C89565]/50 transition-colors flex flex-col justify-between space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#8B6F47] uppercase tracking-wider">
                  {isAr ? 'أنواع الوحدات' : 'Type of Units'}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#B8865F]/15 border border-[#C89565]/30 flex items-center justify-center text-[#8B6F47]">
                  <LayoutGrid className="w-4 h-4 text-[#B8865F]" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <span className="inline-flex items-center gap-1 bg-white text-[#1d1d1f] px-2 py-1 rounded-lg border border-[#EDE5DC] text-[11px] font-extrabold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8865F]" />
                  {isAr ? 'استوديو' : 'Studio'}
                </span>
                <span className="inline-flex items-center gap-1 bg-white text-[#1d1d1f] px-2 py-1 rounded-lg border border-[#EDE5DC] text-[11px] font-extrabold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8865F]" />
                  {isAr ? 'شقة غرفتين نوم' : '2 bedroom apartment'}
                </span>
                <span className="inline-flex items-center gap-1 bg-white text-[#1d1d1f] px-2 py-1 rounded-lg border border-[#EDE5DC] text-[11px] font-extrabold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8865F]" />
                  {isAr ? 'شقة ثلاث غرف نوم' : '3 bedroom apartment'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: FINANCIAL SUMMARY */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-[#EDE5DC] pb-3">
            <div className="w-8 h-8 rounded-xl bg-[#B8865F]/15 border border-[#C89565]/30 flex items-center justify-center text-[#8B6F47] flex-shrink-0">
              <Layers className="w-4 h-4 text-[#B8865F]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#1d1d1f]">
                {isAr ? 'الملخص المالي العام' : 'Financial Summary'}
              </h3>
              <p className="text-xs text-stone-500">
                {isAr ? 'المؤشرات المالية الرئيسية لأداء الفرع' : 'Core financial performance metrics for Branch 55'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-1">
            {/* 1. Occupancy Rate */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5DC]">
              <span className="text-xs font-bold text-stone-500 block mb-1">
                • {isAr ? 'نسبة الإشغال الكلية' : 'Overall Occupancy Rate'}
              </span>
              <p className="text-xl font-black text-emerald-600 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>{report.occupancyRate}%</span>
              </p>
            </div>

            {/* 3. Period Revenue */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5DC]">
              <span className="text-xs font-bold text-stone-500 block mb-1">
                • {isAr ? 'إيراد الفترة' : 'Period Revenue'}
              </span>
              <p className="text-lg sm:text-xl font-black text-[#1d1d1f]">
                {(report.totalContracts || 14043.60).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
              </p>
            </div>

            {/* 4. Collected Revenue */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5DC]">
              <span className="text-xs font-bold text-stone-500 block mb-1">
                • {isAr ? 'الإيراد المحصل' : 'Collected Revenue'}
              </span>
              <p className="text-lg sm:text-xl font-black text-emerald-700">
                {report.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
              </p>
            </div>

            {/* 5. Operator's Share */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5DC]">
              <span className="text-xs font-bold text-stone-500 block mb-1">
                • {isAr ? `حصة المشغل (${report.operatorSharePercentage}%)` : `Operator's Share (${report.operatorSharePercentage}%)`}
              </span>
              <p className="text-lg sm:text-xl font-black text-amber-900">
                {report.operatorShareAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
              </p>
            </div>

            {/* 6. Capital Expenditures */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5DC]">
              <span className="text-xs font-bold text-stone-500 block mb-1">
                • {isAr ? 'المصاريف الرأسمالية' : 'Capital Expenditures'}
              </span>
              <p className="text-lg sm:text-xl font-extrabold text-stone-600">
                {(report.capitalExpenses || 0).toFixed(2)} <span className="text-xs font-normal text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
              </p>
            </div>

            {/* 7. Net Amount for the Owner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1d1d1f] via-[#2a2622] to-[#121110] text-white p-4 sm:p-5 rounded-2xl border border-[#C89565]/80 shadow-md sm:col-span-2 lg:col-span-3 group">
              {/* Animated Light Ray Shimmer */}
              <motion.div
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C89565]/25 to-transparent -skew-x-12 pointer-events-none"
              />

              {/* Glowing Bottom Ambient Light */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.95, 1.1, 0.95]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C89565]/30 rounded-full blur-xl pointer-events-none"
              />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-extrabold text-[#E0C9B1] block mb-1">
                    • {isAr ? 'الصافي للمالك' : 'Net Amount for the Owner'}
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-[#F3E5D8]">
                    {report.netToOwner.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-sm font-bold text-[#C89565]">{isAr ? 'ريال' : 'SAR'}</span>
                  </p>
                </div>
                <div className="text-xs text-[#E0C9B1]/80 font-semibold bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  {isAr ? 'المبلغ المستحق للتحويل' : 'Total Net Payable'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: SEGREGATED 3 UNITS BREAKDOWN */}
        <section className="space-y-5 pt-4 border-t border-[#EDE5DC]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE5DC] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#B8865F]/15 border border-[#C89565]/30 flex items-center justify-center text-[#8B6F47] flex-shrink-0">
                <Home className="w-4 h-4 text-[#B8865F]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1d1d1f]">
                  {isAr ? 'تفاصيل الوحدات الـ ٣ (Studio, 2BR, 3BR)' : 'Segregated 3 Units Breakdown'}
                </h3>
                <p className="text-xs text-stone-500">
                  {isAr ? 'توزيع الإيراد والإشغال والعائد لكل وحدة سكنية' : 'Detailed revenue, occupancy, and net return breakdown per unit'}
                </p>
              </div>
            </div>
            <span className="self-start sm:self-auto text-[11px] font-mono font-bold text-[#8B6F47] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#EDE5DC]">
              {isAr ? 'إجمالي المحفظة: ٣ وحدات' : '3 Units Portfolio'}
            </span>
          </div>

          {/* 3 Unit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(report.unitReports || []).map((u, index) => (
              <motion.div 
                key={u.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative group bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#EDE5DC] space-y-3.5 hover:border-[#B8865F] transition-all shadow-2xs hover:shadow-lg overflow-hidden"
              >
                {/* Subtle top glowing accent border on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8865F] via-[#C89565] to-[#E0C9B1] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between border-b border-[#EDE5DC] pb-2">
                  <span className="text-xs font-extrabold text-[#8B6F47] bg-[#B8865F]/15 px-2.5 py-0.5 rounded-full border border-[#C89565]/30">
                    {isAr ? `وحدة رقم ${u.unitNumber}` : `Unit #${u.unitNumber}`}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 shadow-2xs">
                    {u.occupancyRate}% {isAr ? 'إشغال' : 'Occupancy'}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-extrabold text-[#1d1d1f]">
                  {u.unitName[isAr ? 'ar' : 'en']}
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                    <span className="text-stone-500 font-medium">• {isAr ? 'إيراد الفترة' : 'Period Revenue'}:</span>
                    <span className="font-extrabold text-[#1d1d1f]">{u.periodRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                    <span className="text-stone-500 font-medium">• {isAr ? 'الإيراد المحصل' : 'Collected Revenue'}:</span>
                    <span className="font-extrabold text-emerald-700">{u.collectedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                    <span className="text-stone-500 font-medium">• {isAr ? 'حصة المشغل (20%)' : "Operator's Share (20%)"}:</span>
                    <span className="font-extrabold text-amber-900">{u.operatorShare.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs sm:text-sm font-black text-[#1d1d1f]">
                    <span className="text-[#8B6F47]">• {isAr ? 'الصافي للمالك' : 'Net to Owner'}:</span>
                    <span className="text-[#B8865F]">{u.netToOwner.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Table Scroll Hint */}
          <div className="text-[11px] text-stone-500 flex items-center justify-between sm:hidden px-1 font-medium">
            <span>{isAr ? 'جدول المقارنة التفصيلي' : 'Detailed Comparison Table'}</span>
            <span className="bg-[#FAF7F2] text-[#8B6F47] px-2 py-0.5 rounded-md border border-[#EDE5DC] text-[10px] font-bold">
              {isAr ? 'اسحب أفقياً 👈👉' : 'Swipe horizontally 👈👉'}
            </span>
          </div>

          {/* Structured Segregated Comparison Table */}
          <div className="overflow-x-auto border border-[#EDE5DC] rounded-2xl touch-pan-x [-webkit-overflow-scrolling:touch]">
            <table className="w-full text-xs text-right border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#1d1d1f] text-white">
                  <th className="p-3 font-bold border-b border-stone-800">{isAr ? 'الوحدة' : 'Unit'}</th>
                  <th className="p-3 font-bold border-b border-stone-800">{isAr ? 'نوع الوحدة' : 'Unit Type'}</th>
                  <th className="p-3 font-bold border-b border-stone-800">{isAr ? 'نسبة الإشغال' : 'Occupancy Rate'}</th>
                  <th className="p-3 font-bold border-b border-stone-800">{isAr ? 'إيراد الفترة' : 'Period Revenue'}</th>
                  <th className="p-3 font-bold border-b border-stone-800">{isAr ? 'الإيراد المحصل' : 'Collected Revenue'}</th>
                  <th className="p-3 font-bold border-b border-stone-800">{isAr ? 'حصة المشغل (20%)' : "Operator Share (20%)"}</th>
                  <th className="p-3 font-bold border-b border-stone-800">{isAr ? 'الصافي للمالك' : 'Net to Owner'}</th>
                </tr>
              </thead>
              <tbody>
                {(report.unitReports || []).map((u, i) => (
                  <tr key={u.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAF7F2]'}>
                    <td className="p-3 font-extrabold text-[#1d1d1f]">#{u.unitNumber}</td>
                    <td className="p-3 font-bold text-[#8B6F47]">{u.unitName[isAr ? 'ar' : 'en']}</td>
                    <td className="p-3 font-extrabold text-emerald-700">{u.occupancyRate}%</td>
                    <td className="p-3 font-extrabold text-[#1d1d1f]">{u.periodRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                    <td className="p-3 font-extrabold text-emerald-800">{u.collectedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                    <td className="p-3 font-extrabold text-amber-900">{u.operatorShare.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                    <td className="p-3 font-black text-[#B8865F]">{u.netToOwner.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                  </tr>
                ))}
                <tr className="bg-[#1d1d1f] text-white font-black text-xs">
                  <td className="p-3">{isAr ? 'الإجمالي' : 'Total'}</td>
                  <td className="p-3">{isAr ? '٣ وحدات' : '3 Units'}</td>
                  <td className="p-3 text-emerald-400">{report.occupancyRate}% ({isAr ? 'المتوسط' : 'Avg'})</td>
                  <td className="p-3 text-white">{(report.totalContracts || 14043.60).toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                  <td className="p-3 text-emerald-300">{report.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                  <td className="p-3 text-amber-300">{report.operatorShareAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                  <td className="p-3 text-[#E0C9B1]">{report.netToOwner.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: OCCUPANCY TREND CHART */}
        <section className="space-y-4 pt-4 border-t border-[#EDE5DC]">
          <div className="flex items-center justify-between border-b border-[#EDE5DC] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#B8865F]/15 border border-[#C89565]/30 flex items-center justify-center text-[#8B6F47] flex-shrink-0">
                <BarChart3 className="w-4 h-4 text-[#B8865F]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1d1d1f]">
                  {isAr ? 'مؤشر الإشغال (أبريل - يوليو 2026)' : 'Occupancy Trend (Apr to Jul 2026)'}
                </h3>
                <p className="text-xs text-stone-500">
                  {isAr ? 'تطور الأداء الشهري المعتمد للوحدات الـ ٣' : 'Monthly certified occupancy performance evolution across the 4 months'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-4 sm:p-6 rounded-2xl border border-[#EDE5DC] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE5DC] pb-3">
              <div>
                <h4 className="text-sm font-extrabold text-[#1d1d1f]">
                  {isAr ? 'تطور نسبة الإشغال الشهري (أبريل ٢٠٢٦ - يوليو ٢٠٢٦)' : 'Monthly Occupancy Rate Trend (April 2026 - July 2026)'}
                </h4>
                <p className="text-xs text-stone-500">
                  {isAr ? 'مقارنة متوسط المحفظة مع أداء الوحدات الـ ٣ (Studio, 2BR, 3BR)' : 'Portfolio overall average vs Studio, 2BR & 3BR performance'}
                </p>
              </div>
              <div className="text-xs font-bold text-[#8B6F47] bg-[#B8865F]/15 px-3 py-1 rounded-full border border-[#C89565]/30 self-start sm:self-auto">
                {isAr ? 'متوسط الفترة: ٣٢.٣٪' : 'Period Average: 32.3%'}
              </div>
            </div>

            {/* Recharts Area/Line Chart optimized for Mobile Viewports */}
            <div className="h-64 sm:h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B8865F" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#B8865F" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorStudio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#555' }} interval={0} />
                  <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 10, fill: '#555' }} />
                  <Tooltip 
                    formatter={(val: any) => [`${val}%`, '']}
                    contentStyle={{ backgroundColor: '#1d1d1f', borderRadius: '12px', color: '#fff', fontSize: '12px', border: 'none', padding: '10px' }}
                    itemStyle={{ color: '#E0C9B1' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area 
                    type="monotone" 
                    dataKey={isAr ? 'المتوسط العام' : 'Overall Average'} 
                    stroke="#B8865F" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorOverall)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey={isAr ? 'استوديو (Studio)' : 'Studio'} 
                    stroke="#10B981" 
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1} 
                    fill="url(#colorStudio)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey={isAr ? 'غرفتان نوم (2BR)' : '2BR'} 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fillOpacity={0} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey={isAr ? 'ثلاث غرف نوم (3BR)' : '3BR'} 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    fillOpacity={0} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Numbers Breakdown Data Grid for reference */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {(report.monthlyOccupancyTrend || []).map((m) => (
                <div key={m.monthKey} className="bg-white p-3 rounded-xl border border-[#EDE5DC] text-center shadow-2xs">
                  <span className="text-[11px] font-bold text-stone-500 block">
                    {m.monthName[isAr ? 'ar' : 'en']}
                  </span>
                  <span className="text-base font-black text-[#B8865F] block mt-0.5">
                    {m.occupancyRate}%
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-0.5 font-mono">
                    S:{m.studioRate}% | 2BR:{m.twoBedRate}% | 3BR:{m.threeBedRate}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};
