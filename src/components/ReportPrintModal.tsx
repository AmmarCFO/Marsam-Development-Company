import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer } from 'lucide-react';
import { OperatingReport } from '../types';
import { ownerProfile, logoUrl } from '../data';

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

  const ownerName = ownerProfile.name[isAr ? 'ar' : 'en'];
  const salutation = ownerProfile.salutation[isAr ? 'ar' : 'en'];
  const branchTitle = report.branchName[isAr ? 'ar' : 'en'];
  const notesText = report.notes[isAr ? 'ar' : 'en'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl max-w-3xl w-full p-8 border border-[#EDE5DC] shadow-2xl space-y-6 my-8 print:shadow-none print:border-none print:m-0 print:p-0"
        >
          {/* Action Bar (Hidden on print) */}
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DC] print:hidden">
            <span className="text-xs font-bold text-[#8B6F47] uppercase tracking-wider bg-[#B8865F]/15 px-3 py-1 rounded-full">
              {isAr ? 'معاينة التقرير الرسمى' : 'Official Statement Preview'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#1d1d1f] hover:bg-[#2d2d2f] px-4 py-2 rounded-xl transition"
              >
                <Printer className="w-4 h-4 text-[#C89565]" />
                <span>{isAr ? 'طباعة المستند / PDF' : 'Print Statement'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#FAF7F2] hover:bg-[#F0E8DD] text-stone-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PRINTABLE DOCUMENT BODY */}
          <div className="space-y-6 text-[#1d1d1f]">
            {/* Document Header */}
            <div className="flex items-start justify-between border-b-2 border-[#1d1d1f] pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] p-2 border border-[#EDE5DC]">
                  <img src={logoUrl} alt="Mathwaa" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-[#1d1d1f]">
                    {isAr ? 'مؤسسة مثوى للتشغيل والحلول العقارية' : 'Mathwaa Hospitality & Real Estate Operations'}
                  </h1>
                  <p className="text-xs text-[#8B6F47] font-semibold">
                    {isAr ? 'تقرير الأداء التشغيلي المعتمد لحساب المالك' : 'Certified Owner Operating Performance Statement'}
                  </p>
                  <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                    Ref: {report.reportNumber} | Date: {report.payoutDate}
                  </p>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="bg-emerald-100 text-emerald-900 font-extrabold px-3 py-1 rounded-full border border-emerald-300">
                  {isAr ? 'حالة التوزيع: تم التحويل' : 'Payout Status: Transferred'}
                </span>
                <p className="text-[11px] text-stone-500 mt-2 font-mono">{report.payoutRef}</p>
              </div>
            </div>

            {/* Target Owner Addressed Information */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EDE5DC] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#8B6F47] uppercase block">
                  {isAr ? 'الموجه إليه التقرير (المالك):' : 'Addressed To (Property Owner):'}
                </span>
                <p className="text-base font-extrabold text-[#1d1d1f] mt-0.5">
                  {salutation} {ownerName}
                </p>
                <p className="text-xs text-stone-600 font-mono">{ownerProfile.ownerCode}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#8B6F47] uppercase block">
                  {isAr ? 'بيانات العقار والتقرير:' : 'Property & Report Details:'}
                </span>
                <p className="text-base font-extrabold text-[#1d1d1f] mt-0.5">
                  {branchTitle}
                </p>
                <p className="text-xs text-stone-600 font-semibold">{report.periodName[isAr ? 'ar' : 'en']}</p>
                <p className="text-[11px] text-[#B8865F] font-bold italic mt-0.5">
                  "{report.tagline ? report.tagline[isAr ? 'ar' : 'en'] : (isAr ? 'بيتك، راحتك وطمأنينتك' : 'Your home, comfort and peace of mind')}"
                </p>
              </div>
            </div>

            {/* Statement Line Item Breakdown Table */}
            <div>
              <h2 className="text-xs font-extrabold text-[#8B6F47] uppercase tracking-wider mb-2">
                {isAr ? 'جدول الميزانية والتوزيعات التشغيلية المفصلة' : 'Detailed Financial Statement & Operational Accounting'}
              </h2>
              <table className="w-full text-xs border-collapse border border-[#EDE5DC]">
                <thead>
                  <tr className="bg-[#1d1d1f] text-white text-right">
                    <th className="p-3 font-bold border border-stone-800">{isAr ? 'البند التشغيلي' : 'Line Item'}</th>
                    <th className="p-3 font-bold border border-stone-800">{isAr ? 'التفاصيل والوصف' : 'Details & Description'}</th>
                    <th className="p-3 font-bold border border-stone-800 text-left">{isAr ? 'المبلغ (ريال)' : 'Amount (SAR)'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#EDE5DC]">
                    <td className="p-3 font-bold">{isAr ? 'الوحدات ونسبة الإشغال' : 'Property Units & Occupancy Rate'}</td>
                    <td className="p-3">{isAr ? `تضم المنشأة 3 وحدات سكنية بنسبة إشغال ${report.occupancyRate}%` : `3 units with ${report.occupancyRate}% occupancy rate`}</td>
                    <td className="p-3 font-extrabold text-left">{report.occupancyRate}%</td>
                  </tr>
                  <tr className="border-b border-[#EDE5DC] bg-[#FAF7F2]">
                    <td className="p-3 font-bold">{isAr ? 'إجمالي قيم العقود المبرمة' : 'Total Rental Contracts'}</td>
                    <td className="p-3">{isAr ? 'مجموع العقود الموثقة خلال الفترة' : 'Sum of executed lease contracts'}</td>
                    <td className="p-3 font-extrabold text-left">{report.totalContracts?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '23,617.57'}</td>
                  </tr>
                  <tr className="border-b border-[#EDE5DC]">
                    <td className="p-3 font-bold">{isAr ? 'إجمالي إيراد الفترة الفعلي' : 'Total Revenue for Period'}</td>
                    <td className="p-3">{isAr ? 'شمل التدفقات والإيرادات الفعلية المحصلة' : 'Total realized operational revenue'}</td>
                    <td className="p-3 font-black text-[#1d1d1f] text-left">{report.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                  <tr className="border-b border-[#EDE5DC] bg-[#FAF7F2]">
                    <td className="p-3 font-bold text-stone-700">{isAr ? 'متوسط العائد الشهري' : 'Average Monthly Return'}</td>
                    <td className="p-3">{isAr ? 'معدل الدخل الشهري المتحقق للعقار' : 'Average realized monthly performance'}</td>
                    <td className="p-3 font-bold text-stone-700 text-left">{report.avgMonthlyReturn?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '4,388.62'}</td>
                  </tr>
                  <tr className="border-b border-[#EDE5DC]">
                    <td className="p-3 font-bold text-amber-900">{isAr ? 'المصاريف المباشرة' : 'Direct Expenses'}</td>
                    <td className="p-3">{isAr ? 'مصاريف التشغيل المباشرة للفترة' : 'Operational direct expenses'}</td>
                    <td className="p-3 font-bold text-amber-800 text-left">- {report.directExpenses?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '1,292.92'}</td>
                  </tr>
                  <tr className="border-b border-[#EDE5DC] bg-[#FAF7F2]">
                    <td className="p-3 font-bold text-stone-600">{isAr ? 'المصاريف الرأسمالية' : 'Capital Expenses'}</td>
                    <td className="p-3">{isAr ? 'لا يوجد مصاريف رأسمالية (Nil)' : 'Nil (No capital expenditure)'}</td>
                    <td className="p-3 font-bold text-stone-500 text-left">0.00</td>
                  </tr>
                  <tr className="border-b border-[#EDE5DC]">
                    <td className="p-3 font-bold text-[#8B6F47]">{isAr ? `حصة المشغل (${report.operatorSharePercentage}%)` : `Operator Share (${report.operatorSharePercentage}%)`}</td>
                    <td className="p-3">{isAr ? `مقابل الإدارة والتشغيل والخدمات (${report.operatorSharePercentage}%)` : `Operator management & operations fee (${report.operatorSharePercentage}%)`}</td>
                    <td className="p-3 font-bold text-stone-700 text-left">- {report.operatorShareAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                  <tr className="bg-[#FAF7F2] font-black text-sm border-t-2 border-[#1d1d1f]">
                    <td className="p-4 text-[#8B6F47]">{isAr ? 'صافي العائد المستحق النهائي للمالك' : 'Net Return to Client (Owner)'}</td>
                    <td className="p-4 text-xs font-normal text-stone-600">{isAr ? 'تم تحويل الصافي المالي بالكامل للمالك' : 'Net payout transferred in full to owner'}</td>
                    <td className="p-4 text-[#B8865F] text-left text-base">{report.netToOwner.toLocaleString(undefined, { minimumFractionDigits: 2 })} SAR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Notes Field */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EDE5DC] text-xs space-y-1">
              <span className="font-extrabold text-[#8B6F47] block">
                {isAr ? 'ملاحظات الإدارة المشغلة:' : 'Operator Notes:'}
              </span>
              <p className="text-stone-800 font-medium leading-relaxed">{notesText}</p>
            </div>

            {/* Official Signatures */}
            <div className="pt-8 border-t border-[#EDE5DC] grid grid-cols-2 gap-8 text-xs">
              <div>
                <p className="font-bold text-[#8B6F47]">{isAr ? 'إدارة العقارات والحلول السكنية (مثوى):' : 'Mathwaa Operations Management:'}</p>
                <div className="h-12 border-b border-dashed border-stone-300 mt-2 flex items-end pb-1">
                  <span className="text-[10px] text-stone-400 font-mono">Mathwaa Verified Stamp</span>
                </div>
              </div>

              <div>
                <p className="font-bold text-[#8B6F47]">{isAr ? `اعتماد المالك (${ownerName}):` : `Owner Approval (${ownerName}):`}</p>
                <div className="h-12 border-b border-dashed border-stone-300 mt-2 flex items-end pb-1">
                  <span className="text-[10px] text-stone-400 font-mono">{ownerName}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
