import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, ChevronUp, TrendingUp, Building2, 
  FileText, CheckCircle2, Printer, 
  Send, Filter, CreditCard
} from 'lucide-react';
import { OperatingReport } from '../types';

interface OperatingReportBoardProps {
  isAr: boolean;
  reports: OperatingReport[];
  onAddOwnerNote: (reportId: string, noteText: string) => void;
  onSelectPrintReport: (report: OperatingReport) => void;
}

export const OperatingReportBoard: React.FC<OperatingReportBoardProps> = ({
  isAr,
  reports,
  onAddOwnerNote,
  onSelectPrintReport
}) => {
  // Store expanded report IDs (open by default)
  const [expandedReportIds, setExpandedReportIds] = useState<string[]>(
    reports.map((r) => r.id)
  );
  
  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<'all' | '2026' | '2025'>('all');
  
  // Owner note state per report
  const [ownerNoteInputs, setOwnerNoteInputs] = useState<{ [key: string]: string }>({});

  const toggleExpandReport = (id: string) => {
    setExpandedReportIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const filteredReports = reports.filter((rep) => {
    if (selectedFilter === '2026') return rep.year === 2026;
    if (selectedFilter === '2025') return rep.year === 2025;
    return true;
  });

  const handleNoteSubmit = (reportId: string) => {
    const text = ownerNoteInputs[reportId];
    if (text && text.trim().length > 0) {
      onAddOwnerNote(reportId, text.trim());
      setOwnerNoteInputs((prev) => ({ ...prev, [reportId]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Board Header & Filter Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl p-6 border border-[#EDE5DC] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden group"
      >
        {/* Continuous Light Sweep Animation across Header */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#C89565]/15 to-transparent skew-x-12 pointer-events-none"
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8B6F47] uppercase tracking-wider bg-[#B8865F]/15 px-3 py-0.5 rounded-full border border-[#C89565]/30 flex items-center gap-1.5 shadow-xs">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#B8865F]"
              />
              {isAr ? 'سجل التقارير التشغيلية المعتمدة' : 'Audited Reports Board'}
            </span>
            <span className="text-xs font-mono font-bold text-stone-500">
              ({filteredReports.length} {isAr ? 'تقارير' : 'reports'})
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] mt-1">
            {isAr ? 'لوحة تقارير أداء العقار التشغيلية' : 'Property Operating Performance Board'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isAr
              ? 'مرجع دائم لمراجعة أداء العقار والتوزيعات المالية للمالك.'
              : 'Permanent operational reference for property performance and payouts.'}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-end relative z-10">
          <div className="flex items-center bg-[#FAF7F2] p-1 rounded-2xl border border-[#EDE5DC] text-xs font-bold text-[#8B6F47]">
            <span className="px-2.5 flex items-center gap-1 text-stone-400">
              <Filter className="w-3.5 h-3.5" />
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                selectedFilter === 'all' ? 'bg-[#1d1d1f] text-white shadow-xs' : 'hover:text-[#1d1d1f]'
              }`}
            >
              {isAr ? 'الكل' : 'All'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter('2026')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                selectedFilter === '2026' ? 'bg-[#1d1d1f] text-white shadow-xs' : 'hover:text-[#1d1d1f]'
              }`}
            >
              2026
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter('2025')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                selectedFilter === '2025' ? 'bg-[#1d1d1f] text-white shadow-xs' : 'hover:text-[#1d1d1f]'
              }`}
            >
              2025
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Reports Board Stack */}
      <div className="space-y-4">
        {filteredReports.map((report, index) => {
          const isExpanded = expandedReportIds.includes(report.id);
          const periodTitle = report.periodName[isAr ? 'ar' : 'en'];
          const branchTitle = report.branchName[isAr ? 'ar' : 'en'];
          const notesText = report.notes[isAr ? 'ar' : 'en'];

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className={`bg-white rounded-3xl border transition-all duration-300 shadow-xs overflow-hidden relative ${
                isExpanded
                  ? 'border-[#B8865F] ring-1 ring-[#B8865F]/40 shadow-md'
                  : 'border-[#EDE5DC] hover:border-[#C89565]/80 hover:shadow-md'
              }`}
            >
              {/* Card Header Bar */}
              <div
                onClick={() => toggleExpandReport(report.id)}
                className="p-5 sm:p-6 bg-[#FAF7F2]/80 hover:bg-[#FAF7F2] cursor-pointer transition flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EDE5DC]"
              >
                {/* Left: Report Number & Period Title */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1d1d1f] text-[#E0C9B1] font-black text-xs sm:text-sm flex flex-col items-center justify-center shadow-xs flex-shrink-0 border border-[#B8865F]/30"
                  >
                    <span className="text-[10px] text-stone-400 font-mono">#</span>
                    <span>{report.reportNumber.replace('REP-', '')}</span>
                  </motion.div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold bg-[#B8865F]/20 text-[#8B6F47] px-2.5 py-0.5 rounded-full border border-[#C89565]/30">
                        {report.reportNumber}
                      </span>
                      <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#B8865F]" />
                        {branchTitle}
                      </span>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {isAr ? 'تم تحويل الأرباح' : 'Payout Transferred'}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#1d1d1f] mt-0.5">
                      {periodTitle} <span className="text-stone-400 font-normal text-sm">({report.quarter})</span>
                    </h3>
                  </div>
                </div>

                {/* Center / Right: Mandatory KPI Chips */}
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap lg:flex-nowrap">
                  {/* Occupancy Rate */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="bg-white px-3.5 py-2 rounded-2xl border border-[#EDE5DC] text-center min-w-[90px] shadow-2xs"
                  >
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">
                      {isAr ? 'نسبة الإشغال' : 'Occupancy'}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-600 flex items-center justify-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {report.occupancyRate}%
                    </span>
                  </motion.div>

                  {/* Revenue */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="bg-white px-3.5 py-2 rounded-2xl border border-[#EDE5DC] text-center min-w-[100px] shadow-2xs"
                  >
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">
                      {isAr ? 'إجمالي الإيرادات' : 'Revenue'}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[#1d1d1f]">
                      {report.totalRevenue.toLocaleString()} <span className="text-[10px] text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
                    </span>
                  </motion.div>

                  {/* Operator's Share */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className="bg-white px-3.5 py-2 rounded-2xl border border-[#EDE5DC] text-center min-w-[100px] shadow-2xs"
                  >
                    <span className="text-[10px] font-bold text-stone-500 uppercase block">
                      {isAr ? `حصة المشغل (${report.operatorSharePercentage}%)` : `Operator (${report.operatorSharePercentage}%)`}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-stone-600">
                      {report.operatorShareAmount.toLocaleString()} <span className="text-[10px] text-stone-400">{isAr ? 'ريال' : 'SAR'}</span>
                    </span>
                  </motion.div>

                  {/* Net to Owner - Extreme Glowing Accent Badge */}
                  <motion.div
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className="bg-gradient-to-br from-[#1d1d1f] via-[#2a2622] to-[#121110] text-white px-4 py-2 rounded-2xl border border-[#C89565]/80 text-center min-w-[130px] shadow-lg relative overflow-hidden group/net"
                  >
                    {/* Continuous Moving Shimmer Ray */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#C89565]/40 to-transparent skew-x-12 pointer-events-none"
                    />
                    <motion.div
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-[#C89565]/10 blur-md pointer-events-none"
                    />
                    <span className="text-[10px] font-extrabold text-[#E0C9B1] uppercase block relative z-10 tracking-wide">
                      {isAr ? 'الصافي للمالك' : 'Net to Owner'}
                    </span>
                    <span className="text-sm sm:text-base font-black text-[#F3E5D8] relative z-10 drop-shadow-xs">
                      {report.netToOwner.toLocaleString()} <span className="text-[10px] text-[#C89565] font-bold">{isAr ? 'ريال' : 'SAR'}</span>
                    </span>
                  </motion.div>

                  {/* Dropdown Toggle Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpandReport(report.id);
                    }}
                    className="p-2 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#EDE5DC] text-[#8B6F47] transition ml-2 shadow-2xs"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#B8865F]" /> : <ChevronDown className="w-5 h-5 text-[#8B6F47]" />}
                  </motion.button>
                </div>
              </div>

              {/* Dropdown Expanded Report View */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="p-6 sm:p-8 space-y-6 bg-white"
                  >
                    {/* Tagline & Owner Metadata Header */}
                    <div className="bg-gradient-to-r from-[#1d1d1f] via-[#2a2622] to-[#121110] text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#C89565]/40 shadow-xs relative overflow-hidden">
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#C89565]/20 to-transparent skew-x-12 pointer-events-none"
                      />
                      <div>
                        <span className="text-[10px] font-extrabold text-[#C89565] uppercase tracking-widest block">
                          {isAr ? 'بيانات التقرير والعقار' : 'Property & Report Overview'}
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-[#F3E5D8]">
                          {report.branchName[isAr ? 'ar' : 'en']}
                        </h4>
                        <p className="text-xs text-[#E0C9B1] italic font-medium mt-0.5">
                          "{report.tagline ? report.tagline[isAr ? 'ar' : 'en'] : (isAr ? 'بيتك، راحتك وطمأنينتك' : 'Your home, comfort and peace of mind')}"
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-stone-300 block font-semibold">
                          {isAr ? 'المالك / العميل:' : 'Owner / Client:'} <span className="text-[#E0C9B1] font-bold">{report.clientName ? report.clientName[isAr ? 'ar' : 'en'] : (isAr ? 'شركة مرسم للتطوير العقاري' : 'Marsam Real Estate Development Company')}</span>
                        </span>
                        <span className="text-[11px] text-stone-400 block font-mono mt-0.5">
                          {isAr ? 'فترة التقرير:' : 'Period:'} {report.periodName[isAr ? 'ar' : 'en']}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Operating Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC]">
                        <span className="text-[10px] font-bold text-stone-500 uppercase block">
                          {isAr ? 'عدد الوحدات / الإشغال' : 'Units / Occupancy'}
                        </span>
                        <p className="text-sm sm:text-base font-extrabold text-[#1d1d1f] mt-1">
                          {report.totalUnits} {isAr ? 'وحدات' : 'Units'} <span className="text-xs font-bold text-emerald-600">({report.occupancyRate}%)</span>
                        </p>
                      </div>

                      <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC]">
                        <span className="text-[10px] font-bold text-stone-500 uppercase block">
                          {isAr ? 'إجمالي العقود المبرمة' : 'Total Contracts'}
                        </span>
                        <p className="text-sm sm:text-base font-extrabold text-[#1d1d1f] mt-1">
                          {(report.totalContracts || 23617.57).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-[10px] text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
                        </p>
                      </div>

                      <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC]">
                        <span className="text-[10px] font-bold text-stone-500 uppercase block">
                          {isAr ? 'إجمالي الإيرادات' : 'Total Revenue'}
                        </span>
                        <p className="text-sm sm:text-base font-black text-[#1d1d1f] mt-1">
                          {report.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-[10px] text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
                        </p>
                      </div>

                      <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC]">
                        <span className="text-[10px] font-bold text-stone-500 uppercase block">
                          {isAr ? 'متوسط العائد الشهري' : 'Avg. Monthly Return'}
                        </span>
                        <p className="text-sm sm:text-base font-extrabold text-stone-700 mt-1">
                          {(report.avgMonthlyReturn || 4388.62).toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-[10px] text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
                        </p>
                      </div>

                      <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC]">
                        <span className="text-[10px] font-bold text-stone-500 uppercase block">
                          {isAr ? 'المصاريف المباشرة / الرأسمالية' : 'Direct / Capital Exp.'}
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-stone-700 mt-1">
                          <span className="text-amber-800">{(report.directExpenses || 1292.92).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> / <span className="text-stone-400">{isAr ? '0.00 (لا يوجد)' : 'Nil'}</span>
                        </p>
                      </div>

                      <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC]">
                        <span className="text-[10px] font-bold text-stone-500 uppercase block">
                          {isAr ? `حصة المشغل (${report.operatorSharePercentage}%)` : `Operator Share (${report.operatorSharePercentage}%)`}
                        </span>
                        <p className="text-sm sm:text-base font-extrabold text-stone-700 mt-1">
                          {report.operatorShareAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-[10px] text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Financial Summary Highlight Banner */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF7F2] p-5 rounded-2xl border border-[#EDE5DC]">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-stone-500 block">
                          {isAr ? 'إجمالي دخل العقار للفترة' : 'Gross Property Revenue'}
                        </span>
                        <p className="text-xl font-black text-[#1d1d1f]">
                          {report.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
                        </p>
                        <span className="text-[11px] text-stone-500 block">
                          {isAr ? `تضمن 3 وحدات بـ حي السهمان بنسبة إشغال ${report.occupancyRate}%` : `3 Units in Al-Sahman District at ${report.occupancyRate}% Occupancy`}
                        </span>
                      </div>

                      <div className="space-y-1 border-t md:border-t-0 md:border-r md:border-l border-[#EDE5DC] pt-3 md:pt-0 md:px-4">
                        <span className="text-xs font-semibold text-stone-500 block">
                          {isAr ? `استقطاع حصة المشغل (${report.operatorSharePercentage}%)` : `Less Operator Share (${report.operatorSharePercentage}%)`}
                        </span>
                        <p className="text-xl font-bold text-stone-700">
                          - {report.operatorShareAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
                        </p>
                        <span className="text-[11px] text-emerald-700 font-medium block">
                          {isAr ? 'شامل الإدارة والتشغيل والحلول العقارية' : 'Includes management, operations & hospitality'}
                        </span>
                      </div>

                      <div className="space-y-1 bg-white p-3.5 rounded-xl border border-[#C89565]/60 shadow-xs relative overflow-hidden">
                        <span className="text-xs font-extrabold text-[#8B6F47] block">
                          {isAr ? 'صافي العائد المستحق النهائي للمالك' : 'Net Return to Client'}
                        </span>
                        <p className="text-2xl font-black text-[#B8865F]">
                          {report.netToOwner.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-stone-600">{isAr ? 'ريال' : 'SAR'}</span>
                        </p>
                        <span className="text-[11px] text-[#8B6F47] block font-semibold">
                          {isAr ? 'حالة الحوالة: تم تحويل الصافي المالي بالكامل' : 'Payout Status: Net return transferred in full'}
                        </span>
                      </div>
                    </div>

                    {/* Revenue Category Breakdown */}
                    {report.revenueBreakdown && report.revenueBreakdown.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-[#8B6F47] uppercase tracking-wider mb-3">
                          {isAr ? 'تفاصيل مصادر الإيرادات' : 'Revenue Sources'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {report.revenueBreakdown.map((rev, rIdx) => (
                            <motion.div
                              key={rIdx}
                              whileHover={{ y: -2 }}
                              className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC] hover:border-[#C89565]/40 flex items-center justify-between transition-all"
                            >
                              <div>
                                <span className="text-xs font-bold text-[#1d1d1f] block">
                                  {rev.category[isAr ? 'ar' : 'en']}
                                </span>
                                <span className="text-[11px] text-stone-500">
                                  {rev.percentage}% {isAr ? 'من الإجمالي' : 'of gross'}
                                </span>
                              </div>
                              <span className="text-sm font-black text-[#8B6F47]">
                                {rev.amount.toLocaleString()} {isAr ? 'ريال' : 'SAR'}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* NOTES FIELD Section */}
                    <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#EDE5DC] space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#1d1d1f] font-extrabold text-sm">
                          <FileText className="w-4 h-4 text-[#B8865F]" />
                          <span>{isAr ? 'ملاحظات التقرير التشغيلي' : 'Operating Report Notes'}</span>
                        </div>
                      </div>

                      <p className="text-sm text-stone-800 leading-relaxed font-medium bg-white p-4 rounded-xl border border-[#EDE5DC] shadow-2xs">
                        {notesText}
                      </p>

                      {/* Existing Remarks */}
                      {report.additionalRemarks && report.additionalRemarks.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <span className="text-xs font-bold text-[#8B6F47] block">
                            {isAr ? 'ملاحظات سابقة:' : 'Previous Remarks:'}
                          </span>
                          {report.additionalRemarks.map((rem) => (
                            <div key={rem.id} className="bg-white p-3 rounded-xl border border-[#EDE5DC] text-xs">
                              <div className="flex items-center justify-between text-stone-500 font-semibold mb-1">
                                <span className="text-[#1d1d1f] font-bold">{rem.author}</span>
                                <span className="font-mono text-[10px]">{rem.date}</span>
                              </div>
                              <p className="text-stone-700">{rem.content}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Interactive Add Note Field */}
                      <div className="pt-2">
                        <label className="text-xs font-bold text-[#8B6F47] block mb-1.5">
                          {isAr ? 'إضافة ملاحظة أو استفسار من المالك:' : 'Add Owner Note:'}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={ownerNoteInputs[report.id] || ''}
                            onChange={(e) =>
                              setOwnerNoteInputs((prev) => ({ ...prev, [report.id]: e.target.value }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleNoteSubmit(report.id);
                            }}
                            placeholder={
                              isAr
                                ? 'أدخل ملاحظتك هنا...'
                                : 'Type your note or inquiry...'
                            }
                            className="flex-1 text-xs bg-white border border-[#EDE5DC] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#B8865F] text-[#1d1d1f] transition-colors"
                          />
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleNoteSubmit(report.id)}
                            className="bg-[#1d1d1f] hover:bg-[#2d2d2f] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5 text-[#C89565]" />
                            <span>{isAr ? 'حفظ' : 'Save'}</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Report Page Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#EDE5DC] flex-wrap gap-3">
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                        <span>{isAr ? 'كود التقرير:' : 'Audit Code:'}</span>
                        <span className="font-bold text-[#1d1d1f] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#EDE5DC]">
                          {report.id}-{report.periodKey}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => onSelectPrintReport(report)}
                          className="flex items-center gap-1.5 text-xs font-bold text-[#1d1d1f] bg-[#FAF7F2] hover:bg-[#F0E8DD] border border-[#EDE5DC] px-4 py-2 rounded-xl transition shadow-2xs"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#B8865F]" />
                          <span>{isAr ? 'معاينة وطباعة التقرير' : 'View Printable Statement'}</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
