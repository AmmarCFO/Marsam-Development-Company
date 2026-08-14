import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, 
  Legend, CartesianGrid, Area 
} from 'recharts';
import { TrendingUp, Info } from 'lucide-react';
import { OperatingReport } from '../types';

interface PerformanceChartProps {
  isAr: boolean;
  reports: OperatingReport[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ isAr, reports }) => {
  const [chartType, setChartType] = useState<'financials' | 'occupancy'>('financials');

  // Format reports for recharts in chronological order (oldest to newest)
  const chartData = [...reports].reverse().map((rep) => ({
    name: rep.periodName[isAr ? 'ar' : 'en'],
    periodKey: rep.periodKey,
    revenue: rep.totalRevenue,
    netPayout: rep.netToOwner,
    operatorFee: rep.operatorShareAmount,
    occupancy: rep.occupancyRate,
  }));

  const totalGrossRevenue = reports.reduce((acc, curr) => acc + curr.totalRevenue, 0);
  const totalNetPayout = reports.reduce((acc, curr) => acc + curr.netToOwner, 0);
  const avgOccupancy = (
    reports.reduce((acc, curr) => acc + curr.occupancyRate, 0) / reports.length
  ).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE5DC] shadow-xs space-y-6 mb-8"
    >
      {/* Header & Metric Highlights */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#EDE5DC]">
        <div>
          <span className="text-xs font-bold text-[#8B6F47] uppercase tracking-wider bg-[#B8865F]/15 px-3 py-0.5 rounded-full border border-[#C89565]/30">
            {isAr ? 'المؤشرات والرسوم البيانية' : 'Performance Analytics'}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] mt-1">
            {isAr ? 'تحليل الأداء المالي ونسب الإشغال التراكمية' : 'Financial Yield & Occupancy Analytics'}
          </h2>
        </div>

        {/* Chart View Switcher */}
        <div className="flex items-center bg-[#FAF7F2] p-1 rounded-2xl border border-[#EDE5DC] text-xs font-bold">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType('financials')}
            className={`px-4 py-2 rounded-xl transition-all ${
              chartType === 'financials' ? 'bg-[#1d1d1f] text-white shadow-xs' : 'text-[#8B6F47] hover:text-[#1d1d1f]'
            }`}
          >
            {isAr ? 'الإيرادات وصافي الأرباح' : 'Revenue & Net Payouts'}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType('occupancy')}
            className={`px-4 py-2 rounded-xl transition-all ${
              chartType === 'occupancy' ? 'bg-[#1d1d1f] text-white shadow-xs' : 'text-[#8B6F47] hover:text-[#1d1d1f]'
            }`}
          >
            {isAr ? 'مسار نسبة الإشغال (%)' : 'Occupancy Trend (%)'}
          </motion.button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5DC] shadow-2xs transition-all"
        >
          <span className="text-xs font-semibold text-[#8B6F47] block">
            {isAr ? 'إجمالي الإيرادات في السجل' : 'Cumulative Gross Revenue'}
          </span>
          <span className="text-2xl font-black text-[#1d1d1f] mt-1 block">
            {totalGrossRevenue.toLocaleString()} <span className="text-xs font-normal text-stone-500">{isAr ? 'ريال' : 'SAR'}</span>
          </span>
        </motion.div>

        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          className="bg-gradient-to-br from-[#1d1d1f] to-[#2a2622] text-white p-4 rounded-2xl border border-[#C89565]/40 shadow-md transition-all relative overflow-hidden"
        >
          <motion.div
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C89565]/20 to-transparent pointer-events-none"
          />
          <span className="text-xs font-bold text-[#E0C9B1] block relative z-10">
            {isAr ? 'إجمالي الصافي المحول للمالك' : 'Total Net Paid to Owner'}
          </span>
          <span className="text-2xl font-black text-[#F3E5D8] mt-1 block relative z-10">
            {totalNetPayout.toLocaleString()} <span className="text-xs font-normal text-[#C89565]">{isAr ? 'ريال' : 'SAR'}</span>
          </span>
        </motion.div>

        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5DC] shadow-2xs transition-all"
        >
          <span className="text-xs font-semibold text-[#8B6F47] block">
            {isAr ? 'متوسط معدل الإشغال العام' : 'Average Portfolio Occupancy'}
          </span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block flex items-center gap-1">
            <TrendingUp className="w-5 h-5 text-emerald-600 animate-bounce" />
            {avgOccupancy}%
          </span>
        </motion.div>
      </div>

      {/* Main Visual Chart */}
      <AnimatePresence mode="wait">
        <motion.div
          key={chartType}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="h-80 w-full pt-4"
        >
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'financials' ? (
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DC" vertical={false} />
                <XAxis dataKey="name" stroke="#8B6F47" fontSize={12} tickLine={false} />
                <YAxis stroke="#8B6F47" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1d1d1f', borderRadius: '16px', color: '#fff', border: '1px solid #B8865F' }}
                  formatter={(value: any) => [`${Number(value).toLocaleString()} SAR`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="revenue" name={isAr ? 'إجمالي الإيرادات (Gross Revenue)' : 'Gross Revenue'} fill="#B8865F" radius={[8, 8, 0, 0]} />
                <Bar dataKey="netPayout" name={isAr ? 'الصافي للمالك (Net Payout)' : 'Net to Owner'} fill="#8B6F47" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="operatorFee" name={isAr ? `حصة المشغل (${reports[0]?.operatorSharePercentage || 20}%)` : `Operator Share (${reports[0]?.operatorSharePercentage || 20}%)`} stroke="#725937" strokeWidth={2.5} dot={{ r: 4 }} />
              </ComposedChart>
            ) : (
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE5DC" vertical={false} />
                <XAxis dataKey="name" stroke="#8B6F47" fontSize={12} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#8B6F47" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1d1d1f', borderRadius: '16px', color: '#fff', border: '1px solid #B8865F' }}
                  formatter={(value: any) => [`${value}%`, isAr ? 'نسبة الإشغال' : 'Occupancy Rate']}
                />
                <Area type="monotone" dataKey="occupancy" name={isAr ? 'نسبة الإشغال (%)' : 'Occupancy Rate (%)'} fill="#10b98120" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>

      {/* Clarification Note Box regarding April partial data */}
      <div className="flex items-start gap-2.5 bg-[#FFFBEB] p-3.5 sm:p-4 rounded-2xl border border-[#FCD34D]/70 text-amber-900 text-xs shadow-2xs mt-4">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold block text-amber-950 mb-0.5">
            {isAr ? 'تنويه بشأن بيانات شهر أبريل:' : 'Note Regarding April Data:'}
          </span>
          <p className="text-amber-800 leading-relaxed font-medium">
            {isAr 
              ? 'يتضمن شهر أبريل ٦ أيام تشغيلية فقط وليس الشهر كاملاً، نظراً لبدء التقرير والتشغيل الفعلي خلال شهر أبريل ٢٠٢٦.'
              : 'April includes only 6 operational days rather than the full month, as actual operations and reporting commenced mid-April 2026.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
