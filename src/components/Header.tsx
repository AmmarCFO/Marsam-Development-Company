import React from 'react';
import { motion } from 'motion/react';
import { Globe, Printer } from 'lucide-react';
import { logoUrl } from '../data';
import { handleImageError } from '../constants/images';

interface HeaderProps {
  isAr: boolean;
  setIsAr: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  isAr,
  setIsAr
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EDE5DC] transition-all print:hidden shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FAF7F2] p-1.5 flex items-center justify-center border border-[#EDE5DC] shadow-xs">
              <img 
                src={logoUrl} 
                alt="Mathwaa Brand Logo" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
                loading="lazy"
                onError={handleImageError}
              />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-base sm:text-lg text-[#1d1d1f] tracking-tight">
                {isAr ? 'مثوى' : 'Mathwaa'}
              </span>
              <span className="text-[10px] sm:text-xs bg-[#B8865F]/15 border border-[#C89565]/40 text-[#8B6F47] px-2.5 py-0.5 rounded-full font-bold shadow-2xs whitespace-nowrap">
                {isAr ? 'التقرير التشغيلي الرسمي' : 'Official Operating Report'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Print PDF */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => window.print()}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#1d1d1f] hover:bg-[#2d2d2f] active:bg-[#3d3d3f] px-3 sm:px-4 py-2.5 rounded-xl transition shadow-xs min-h-[42px]"
          >
            <Printer className="w-4 h-4 text-[#C89565]" />
            <span className="hidden sm:inline">{isAr ? 'طباعة / PDF' : 'Print PDF'}</span>
          </motion.button>

          {/* Language Toggle */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsAr(!isAr)}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#1d1d1f] bg-white hover:bg-[#FAF7F2] active:bg-[#F5EFE6] border border-[#EDE5DC] px-3 py-2.5 rounded-xl shadow-xs transition min-h-[42px]"
          >
            <Globe className="w-4 h-4 text-[#B8865F]" />
            <span className="font-bold">{isAr ? 'English' : 'عربي'}</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
