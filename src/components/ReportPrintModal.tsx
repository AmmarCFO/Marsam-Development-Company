import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer } from 'lucide-react';
import { OperatingReport } from '../types';
import { logoUrl } from '../data';
import { handleImageError } from '../constants/images';

interface ReportPrintModalProps {
  isAr: boolean;
  report: OperatingReport | null;
  onClose: () => void;
}

export const ReportPrintModal: React.FC<ReportPrintModalProps> = ({
  isAr,
  report,
  onClose
}) => {
  if (!report) return null;

  const clientName = report.clientName ? report.clientName[isAr ? 'ar' : 'en'] : (isAr ? 'عبدالرحمن بن عبدالعزيز التركي' : 'Abdulrahman bin Abdulaziz Al-Turki');
  const branchNumber = report.branchNumber || '56';
  const branchLocation = isAr ? 'المدينة المنورة - بني حارثة' : 'Madinah - Bani Harithah';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-8 border border-[#EDE5DC] shadow-2xl space-y-6 my-auto print:shadow-none print:border-none print:m-0 print:p-0 max-h-[92vh] overflow-y-auto [-webkit-overflow-scrolling:touch]"
        >
          {/* Action Bar (Hidden on print) */}
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DC] print:hidden gap-2">
            <span className="text-xs font-bold text-[#8B6F47] uppercase tracking-wider bg-[#B8865F]/15 px-3 py-1 rounded-full truncate">
              {isAr ? 'معاينة التقرير الرسمي المباشر' : 'Official Report Statement'}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#1d1d1f] hover:bg-[#2d2d2f] active:bg-[#3d3d3f] px-3.5 py-2.5 rounded-xl transition shadow-xs min-h-[40px]"
              >
                <Printer className="w-4 h-4 text-[#C89565]" />
                <span className="hidden sm:inline">{isAr ? 'طباعة التقرير / PDF' : 'Print Statement'}</span>
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#FAF7F2] hover:bg-[#F0E8DD] text-stone-600 transition flex items-center justify-center flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PRINTABLE DOCUMENT BODY */}
          <div className="space-y-6 text-[#1d1d1f]">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-[#1d1d1f] pb-4 sm:pb-5 gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FAF7F2] p-1 border border-[#EDE5DC] flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <img 
                    src={logoUrl} 
                    alt="Brand Logo" 
                    className="w-[170%] h-[170%] max-w-none object-cover object-top -translate-y-[12%]" 
                    referrerPolicy="no-referrer" 
                    loading="lazy"
                    onError={handleImageError}
                  />
                </div>
                <div>
                  <h1 className="text-sm sm:text-lg font-black text-[#1d1d1f]">
                    {isAr ? 'تقرير الأداء التشغيلي (١)' : 'Operational Performance Report (1)'}
                  </h1>
                  <p className="text-[11px] sm:text-xs text-[#8B6F47] font-bold">
                    {isAr ? `الفرع: مثوى ${branchNumber} • المدينة المنورة - بني حارثة` : `Branch: Mathwaa ${branchNumber} • Madinah - Bani Harithah`}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-stone-600 font-semibold mt-0.5">
                    {isAr 
                      ? `عدد الوحدات: ${report.totalUnits || report.unitReports?.length || 2} (استوديو • شقة ثلاث غرف نوم)` 
                      : `Number of Units: ${report.totalUnits || report.unitReports?.length || 2} units (Studio • 3 bedroom apartment)`}
                  </p>
                </div>
              </div>
              <div className="text-right text-xs flex-shrink-0">
                <span className="bg-emerald-100 text-emerald-900 font-extrabold px-2.5 py-1 rounded-full border border-emerald-300 text-[10px] sm:text-xs">
                  {isAr ? 'تم تحويل الصافي' : 'Transferred'}
                </span>
                <p className="text-[9px] sm:text-[10px] text-stone-400 font-mono mt-1 hidden sm:block">
                  Ref: {report.payoutRef || 'TXN-20260731-MTH56'}
                </p>
              </div>
            </div>

            {/* Statement Table containing EXACTLY the 9 requested items */}
            <div>
              <h2 className="text-xs font-extrabold text-[#8B6F47] uppercase tracking-wider mb-2.5">
                {isAr ? 'ملخص التقرير التشغيلي والمالي' : 'Operating & Financial Report Summary'}
              </h2>

              <div className="overflow-x-auto border border-[#EDE5DC] rounded-xl touch-pan-x [-webkit-overflow-scrolling:touch]">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#1d1d1f] text-white text-right">
                      <th className="p-2.5 sm:p-3 font-bold border border-stone-800">{isAr ? 'البند' : 'Item'}</th>
                      <th className="p-2.5 sm:p-3 font-bold border border-stone-800 text-left">{isAr ? 'القيمة / القراءة' : 'Value'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#EDE5DC]">
                      <td className="p-2.5 sm:p-3 font-bold">• {isAr ? 'اسم العميل' : 'Client Name'}</td>
                      <td className="p-2.5 sm:p-3 font-bold text-left">{clientName}</td>
                    </tr>
                    <tr className="border-b border-[#EDE5DC] bg-[#FAF7F2]">
                      <td className="p-2.5 sm:p-3 font-bold">• {isAr ? 'رقم الفرع' : 'Branch Number'}</td>
                      <td className="p-2.5 sm:p-3 font-black text-left">#{branchNumber}</td>
                    </tr>
                    <tr className="border-b border-[#EDE5DC]">
                      <td className="p-2.5 sm:p-3 font-bold">• {isAr ? 'موقع الفرع' : 'Branch Location'}</td>
                      <td className="p-2.5 sm:p-3 font-bold text-left">{branchLocation}</td>
                    </tr>
                    <tr className="border-b border-[#EDE5DC] bg-[#FAF7F2]">
                      <td className="p-2.5 sm:p-3 font-bold">• {isAr ? 'نسبة الإشغال الكلية' : 'Overall Occupancy Rate'}</td>
                      <td className="p-2.5 sm:p-3 font-black text-emerald-700 text-left">{report.occupancyRate}%</td>
                    </tr>
                    <tr className="border-b border-[#EDE5DC]">
                      <td className="p-2.5 sm:p-3 font-bold">• {isAr ? 'الإيراد' : 'Revenue'}</td>
                      <td className="p-2.5 sm:p-3 font-black text-emerald-800 text-left">{report.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                    </tr>
                    <tr className="border-b border-[#EDE5DC] bg-[#FAF7F2]">
                      <td className="p-2.5 sm:p-3 font-bold">• {isAr ? 'متوسط العائد الشهري' : 'Average Monthly Return'}</td>
                      <td className="p-2.5 sm:p-3 font-extrabold text-[#8B6F47] text-left">{(report.avgMonthlyReturn || 7306.04).toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                    </tr>
                    <tr className="border-b border-[#EDE5DC]">
                      <td className="p-2.5 sm:p-3 font-bold">• {isAr ? 'المصاريف المباشرة' : 'Direct Expenses'}</td>
                      <td className="p-2.5 sm:p-3 font-extrabold text-rose-700 text-left">{(report.directExpenses || 1292.92).toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                    </tr>
                    <tr className="border-b border-[#EDE5DC] bg-[#FAF7F2]">
                      <td className="p-2.5 sm:p-3 font-bold">• {isAr ? `حصة المشغل (${report.operatorSharePercentage}%)` : `Operator's Share (${report.operatorSharePercentage}%)`}</td>
                      <td className="p-2.5 sm:p-3 font-black text-amber-900 text-left">{report.operatorShareAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                    </tr>
                    <tr className="border-b border-[#EDE5DC]">
                      <td className="p-2.5 sm:p-3 font-bold">• {isAr ? 'المصاريف الرأسمالية' : 'Capital Expenditures'}</td>
                      <td className="p-2.5 sm:p-3 font-extrabold text-stone-600 text-left">{(report.capitalExpenses || 0).toFixed(2)} SAR</td>
                    </tr>
                    <tr className="bg-[#FAF7F2] font-black text-xs sm:text-sm border-t-2 border-[#1d1d1f]">
                      <td className="p-3 sm:p-4 text-[#8B6F47]">• {isAr ? 'الصافي للمالك' : 'Net Amount for the Owner'}</td>
                      <td className="p-3 sm:p-4 text-[#B8865F] text-left text-sm sm:text-base">{report.netToOwner.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Segregated 3 Units Table */}
            {report.unitReports && (
              <div>
                <h2 className="text-xs font-extrabold text-[#8B6F47] uppercase tracking-wider mb-2">
                  {isAr 
                    ? `تفاصيل أداء الوحدات السكنية (${report.totalUnits || report.unitReports?.length || 2})` 
                    : `${report.totalUnits || report.unitReports?.length || 2} Units Segregated Performance`}
                </h2>
                <div className="overflow-x-auto border border-[#EDE5DC] rounded-xl touch-pan-x [-webkit-overflow-scrolling:touch]">
                  <table className="w-full text-xs border-collapse border border-[#EDE5DC] text-center min-w-[450px]">
                    <thead>
                      <tr className="bg-[#FAF7F2] font-bold text-[#8B6F47]">
                        <th className="p-2 border border-[#EDE5DC]">{isAr ? 'الوحدة' : 'Unit'}</th>
                        <th className="p-2 border border-[#EDE5DC]">{isAr ? 'النوع' : 'Type'}</th>
                        <th className="p-2 border border-[#EDE5DC]">{isAr ? 'الإشغال' : 'Occupancy'}</th>
                        <th className="p-2 border border-[#EDE5DC]">{isAr ? 'الإيراد' : 'Revenue'}</th>
                        <th className="p-2 border border-[#EDE5DC]">{isAr ? 'حصة المشغل' : 'Operator Share'}</th>
                        <th className="p-2 border border-[#EDE5DC]">{isAr ? 'الصافي للمالك' : 'Net Owner'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.unitReports.map((u) => (
                        <tr key={u.id} className="border-b border-[#EDE5DC]">
                          <td className="p-2 font-bold">#{u.unitNumber}</td>
                          <td className="p-2">{u.unitName[isAr ? 'ar' : 'en']}</td>
                          <td className="p-2 font-bold text-emerald-700">{u.occupancyRate}%</td>
                          <td className="p-2 font-bold">{u.collectedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                          <td className="p-2 text-amber-900 font-medium">{u.operatorShare.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                          <td className="p-2 font-black text-[#B8865F]">{u.netToOwner.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Official Signatures */}
            <div className="pt-4 sm:pt-6 border-t border-[#EDE5DC] grid grid-cols-2 gap-4 sm:gap-8 text-xs">
              <div>
                <p className="font-bold text-[#8B6F47]">{isAr ? 'إدارة التشغيل:' : 'Operations Management:'}</p>
                <div className="mt-4 border-b border-[#EDE5DC] pb-1 font-mono text-[11px] text-stone-500">
                  {isAr ? 'إدارة التشغيل والحلول' : 'Operations Management Co.'}
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-[#8B6F47]">{isAr ? 'المعتمد (المالك):' : 'Approved (Owner):'}</p>
                <div className="mt-4 border-b border-[#EDE5DC] pb-1 font-bold text-stone-700">
                  {clientName}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
