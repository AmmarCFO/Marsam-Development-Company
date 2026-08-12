import React from 'react';
import { motion } from 'motion/react';
import { Globe, Printer, Calendar } from 'lucide-react';
import { logoUrl } from '../data';
import { handleImageError } from '../constants/images';

interface HeaderProps {
  isAr: boolean;
  setIsAr: React.Dispatch<React.SetStateAction<boolean>>;
  reportDate?: {
    ar: string;
    en: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  isAr,
  setIsAr,
  reportDate = {
    ar: "٢٥ أبريل ٢٠٢٦ - ٣١ يوليو ٢٠٢٦",
    en: "25 Apr 2026 - 31 Jul 2026"
  }
}) => {
  const dateText = isAr ? reportDate.ar : reportDate.en;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EDE5DC] transition-all print:hidden shadow-xs">
      {/* Top Fixed Bar for Date & Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#EDE5DC]/60 bg-[#FAF7F2]/80">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1d1d1f]">
          <Calendar className="w-4 h-4 text-[#B8865F] flex-shrink-0" />
          <span className="text-[#8B6F47] font-bold">{isAr ? 'تاريخ التقرير:' : 'Report Date:'}</span>
          <span className="bg-white px-2.5 py-0.5 rounded-lg border border-[#EDE5DC] shadow-2xs text-[#1d1d1f] font-black">
            {dateText}
          </span>
        </div>
        <div className="text-[11px] sm:text-xs font-bold text-[#8B6F47] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isAr ? 'التقرير التشغيلي المعتمد (فرع ٥٥)' : 'Certified Operating Report (Branch 55)'}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex-shrink-0 group">
            {/* Animated Glow Ring behind logo */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.75, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute -inset-1 bg-gradient-to-r from-[#B8865F] via-[#C89565] to-[#E0C9B1] rounded-2xl blur-xs opacity-50"
            />
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white p-1 flex items-center justify-center border border-[#EDE5DC] shadow-xs overflow-hidden">
              <img 
                src={logoUrl} 
                alt="Brand Mark" 
                className="w-[170%] h-[170%] max-w-none object-cover object-top -translate-y-[12%]" 
                referrerPolicy="no-referrer" 
                loading="lazy"
                onError={handleImageError}
              />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-sm sm:text-base text-[#1d1d1f] tracking-tight">
                {isAr ? 'تقرير الأداء التشغيلي (١)' : 'Operational Performance Report (1)'}
              </span>
              {/* Shimmer Badge */}
              <span className="relative overflow-hidden text-[10px] sm:text-xs bg-[#B8865F]/15 border border-[#C89565]/40 text-[#8B6F47] px-2.5 py-0.5 rounded-full font-bold shadow-2xs whitespace-nowrap">
                <motion.span
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
                />
                <span className="relative z-10">{isAr ? 'مثوى ٥٥' : 'Mathwaa 55'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Print PDF */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => window.print()}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#1d1d1f] hover:bg-[#2d2d2f] active:bg-[#3d3d3f] px-3 sm:px-4 py-2 rounded-xl transition shadow-xs min-h-[38px]"
          >
            <Printer className="w-4 h-4 text-[#C89565]" />
            <span className="hidden sm:inline">{isAr ? 'طباعة / PDF' : 'Print PDF'}</span>
          </motion.button>

          {/* Language Toggle */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsAr(!isAr)}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#1d1d1f] bg-white hover:bg-[#FAF7F2] active:bg-[#F5EFE6] border border-[#EDE5DC] px-3 py-2 rounded-xl shadow-xs transition min-h-[38px]"
          >
            <Globe className="w-4 h-4 text-[#B8865F]" />
            <span className="font-bold">{isAr ? 'English' : 'عربي'}</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

