import React from 'react';
import { motion } from 'motion/react';
import { Globe, Building2, LayoutDashboard, BarChart3, Printer } from 'lucide-react';
import { logoUrl, ownerProfile } from '../data';
import { ViewTab } from '../types';

interface HeaderProps {
  isAr: boolean;
  setIsAr: React.Dispatch<React.SetStateAction<boolean>>;
  viewTab: ViewTab;
  setViewTab: (tab: ViewTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAr,
  setIsAr,
  viewTab,
  setViewTab
}) => {
  const ownerName = ownerProfile.name[isAr ? 'ar' : 'en'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EDE5DC] transition-all print:hidden shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand & Owner Target Greeting */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          className="flex items-center gap-3 cursor-pointer group relative"
          onClick={() => setViewTab('board')}
        >
          <div className="relative">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.1, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#B8865F]/30 to-[#C89565]/30 blur-md pointer-events-none"
            />
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FAF7F2] p-1.5 flex items-center justify-center border border-[#EDE5DC] shadow-xs group-hover:border-[#C89565] transition">
              <img src={logoUrl} alt="Mathwaa Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-base sm:text-lg text-[#1d1d1f] tracking-tight">
                {isAr ? 'مثوى' : 'Mathwaa'}
              </span>
              <span className="text-[10px] sm:text-xs bg-[#B8865F]/15 border border-[#C89565]/40 text-[#8B6F47] px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
                {isAr ? 'تقرير التشغيل للمالك' : 'Owner Operating Portal'}
              </span>
            </div>
            <p className="text-[11px] text-[#8B6F47] font-semibold flex items-center gap-1.5 mt-0.5">
              <span>{isAr ? 'خاص بـ:' : 'Directed to:'}</span>
              <span className="text-[#1d1d1f] font-bold underline decoration-[#B8865F]/40 decoration-2">{ownerName}</span>
            </p>
          </div>
        </motion.div>

        {/* Desktop View Navigation Tabs */}
        <div className="hidden lg:flex items-center bg-[#FAF7F2] p-1 rounded-2xl border border-[#EDE5DC]">
          <button
            onClick={() => setViewTab('board')}
            className={`relative z-10 flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors ${
              viewTab === 'board' ? 'text-[#1d1d1f]' : 'text-[#8B6F47] hover:text-[#1d1d1f]'
            }`}
          >
            {viewTab === 'board' && (
              <motion.div
                layoutId="activeHeaderTab"
                className="absolute inset-0 bg-white rounded-xl border border-[#EDE5DC] shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <LayoutDashboard className="w-3.5 h-3.5 text-[#B8865F]" />
            <span>{isAr ? 'لوحة التقارير' : 'Reports Board'}</span>
          </button>

          <button
            onClick={() => setViewTab('branches')}
            className={`relative z-10 flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors ${
              viewTab === 'branches' ? 'text-[#1d1d1f]' : 'text-[#8B6F47] hover:text-[#1d1d1f]'
            }`}
          >
            {viewTab === 'branches' && (
              <motion.div
                layoutId="activeHeaderTab"
                className="absolute inset-0 bg-white rounded-xl border border-[#EDE5DC] shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Building2 className="w-3.5 h-3.5 text-[#B8865F]" />
            <span>{isAr ? 'الفروع والصور' : 'Branch Details'}</span>
          </button>

          <button
            onClick={() => setViewTab('analytics')}
            className={`relative z-10 flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors ${
              viewTab === 'analytics' ? 'text-[#1d1d1f]' : 'text-[#8B6F47] hover:text-[#1d1d1f]'
            }`}
          >
            {viewTab === 'analytics' && (
              <motion.div
                layoutId="activeHeaderTab"
                className="absolute inset-0 bg-white rounded-xl border border-[#EDE5DC] shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <BarChart3 className="w-3.5 h-3.5 text-[#B8865F]" />
            <span>{isAr ? 'المؤشرات والتحليلات' : 'Analytics'}</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Print PDF */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#1d1d1f] hover:bg-[#2d2d2f] px-3.5 py-2 rounded-xl transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#C89565]" />
            <span className="hidden sm:inline">{isAr ? 'طباعة / PDF' : 'Print PDF'}</span>
          </motion.button>

          {/* Language Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAr(!isAr)}
            className="flex items-center gap-1 text-xs font-bold text-[#1d1d1f] bg-white hover:bg-[#FAF7F2] border border-[#EDE5DC] px-2.5 py-2 rounded-xl shadow-xs transition"
          >
            <Globe className="w-3.5 h-3.5 text-[#B8865F]" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 bg-[#FAF7F2] border-t border-[#EDE5DC] gap-1.5 scrollbar-none justify-start sm:justify-center">
        <button
          onClick={() => setViewTab('board')}
          className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
            viewTab === 'board' ? 'bg-[#8B6F47] text-white shadow-xs' : 'text-[#8B6F47] bg-white border border-[#EDE5DC]'
          }`}
        >
          {isAr ? 'التقارير' : 'Reports'}
        </button>

        <button
          onClick={() => setViewTab('branches')}
          className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
            viewTab === 'branches' ? 'bg-[#8B6F47] text-white shadow-xs' : 'text-[#8B6F47] bg-white border border-[#EDE5DC]'
          }`}
        >
          {isAr ? 'الفروع' : 'Branches'}
        </button>

        <button
          onClick={() => setViewTab('analytics')}
          className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
            viewTab === 'analytics' ? 'bg-[#8B6F47] text-white shadow-xs' : 'text-[#8B6F47] bg-white border border-[#EDE5DC]'
          }`}
        >
          {isAr ? 'المؤشرات' : 'Analytics'}
        </button>
      </div>
    </header>
  );
};
