import React from 'react';
import { motion } from 'motion/react';
import { Building2, Calendar, ShieldCheck, TrendingUp, Award } from 'lucide-react';
import { ownerProfile } from '../data';

interface OwnerBannerProps {
  isAr: boolean;
  selectedBranchId: string;
  setSelectedBranchId: (id: string) => void;
  totalReportsCount: number;
}

export const OwnerBanner: React.FC<OwnerBannerProps> = ({
  isAr
}) => {
  const salutation = ownerProfile.salutation[isAr ? 'ar' : 'en'];
  const name = ownerProfile.name[isAr ? 'ar' : 'en'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden bg-gradient-to-br from-[#1d1d1f] via-[#2a2622] to-[#1a1714] text-white rounded-3xl p-6 sm:p-8 border border-[#B8865F]/30 shadow-xl mb-8 group"
    >
      {/* Dynamic Moving Ambient Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.2, 0.45, 0.2],
          x: [-20, 30, -20],
          y: [0, -25, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-[#B8865F]/30 to-[#C89565]/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.35, 0.15],
          x: [20, -30, 20],
          y: [0, 25, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -left-16 -bottom-16 w-96 h-96 rounded-full bg-gradient-to-tr from-[#C89565]/30 to-[#B8865F]/10 blur-3xl pointer-events-none"
      />

      {/* Extreme Shimmer Light Rays moving continuously across */}
      <motion.div
        animate={{
          x: ['-100%', '250%']
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#C89565]/25 to-transparent skew-x-12 pointer-events-none"
      />

      {/* Shimmering Top Accent Border */}
      <motion.div
        animate={{
          x: ['-100%', '200%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#E0C9B1] to-transparent shadow-[0_0_12px_#C89565]"
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Owner Profile Greeting */}
        <div className="flex items-start sm:items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="w-12 h-12 rounded-2xl bg-[#B8865F]/20 border border-[#C89565]/40 flex items-center justify-center flex-shrink-0 text-[#C89565] shadow-inner relative"
          >
            <ShieldCheck className="w-6 h-6" />
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400"
            />
          </motion.div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#C89565] tracking-widest uppercase bg-[#B8865F]/20 px-3.5 py-0.5 rounded-full border border-[#B8865F]/40 shadow-xs">
                {isAr ? 'تقرير أداء المالك التشغيلي' : 'Owner Performance Portal'}
              </span>
              <span className="text-xs text-stone-300 font-mono bg-stone-800/80 px-2.5 py-0.5 rounded-md border border-stone-700">
                {ownerProfile.ownerCode}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-1 text-white tracking-tight">
              <span className="text-stone-300 font-medium text-lg sm:text-xl block sm:inline mr-2">{salutation}</span>
              <span className="text-[#E0C9B1] inline-block">
                {name}
              </span>
            </h1>

            <div className="flex items-center gap-4 text-xs text-stone-300 mt-2 flex-wrap">
              <span className="flex items-center gap-1 font-medium">
                <Building2 className="w-3.5 h-3.5 text-[#C89565]" />
                {isAr ? `المحافظ المملوكة: ${ownerProfile.totalBranches} فروع` : `Portfolio: ${ownerProfile.totalBranches} Branches`}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#C89565]" />
                {isAr ? `تاريخ التعاقد: ${ownerProfile.contractDate}` : `Partner Since: ${ownerProfile.contractDate}`}
              </span>
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                {isAr ? 'إدارة تشغيلية شاملة بواسطة مثوى' : 'Managed by Mathwaa'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Portfolio Metric Chips with Motion & Glowing Borders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-stone-700/60 hover:border-[#C89565]/50 flex flex-col justify-center transition-colors"
          >
            <p className="text-[11px] text-stone-400 font-medium">
              {isAr ? 'إجمالي الوحدات المشغلة' : 'Managed Units'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {ownerProfile.totalUnits} <span className="text-xs text-[#C89565] font-normal">{isAr ? 'وحدة' : 'units'}</span>
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-stone-700/60 hover:border-emerald-500/50 flex flex-col justify-center transition-colors"
          >
            <p className="text-[11px] text-stone-400 font-medium">
              {isAr ? 'متوسط نسبة الإشغال' : 'Avg. Occupancy'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5 flex items-center gap-1">
              37%
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="col-span-2 sm:col-span-1 bg-gradient-to-br from-[#B8865F]/20 to-[#8B6F47]/30 p-3.5 rounded-2xl border border-[#C89565]/50 flex flex-col justify-center shadow-lg relative overflow-hidden group/card"
          >
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C89565]/20 to-transparent pointer-events-none"
            />
            <p className="text-[11px] text-[#E0C9B1] font-bold relative z-10">
              {isAr ? 'إجمالي التوزيعات المحولة' : 'Cumulative Net Payouts'}
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#F3E5D8] mt-0.5 relative z-10">
              {ownerProfile.cumulativeEarnings.toLocaleString()} <span className="text-xs font-normal text-[#C89565]">{isAr ? 'ريال' : 'SAR'}</span>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
