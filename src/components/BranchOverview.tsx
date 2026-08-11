import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Building2, Phone, Maximize2, X, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { BranchDetails } from '../types';
import { handleImageError } from '../constants/images';

interface BranchOverviewProps {
  isAr: boolean;
  branches: BranchDetails[];
  selectedBranchId: string;
  setSelectedBranchId: (id: string) => void;
}

export const BranchOverview: React.FC<BranchOverviewProps> = ({
  isAr,
  branches,
  selectedBranchId,
  setSelectedBranchId
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const selectedBranch = branches.find(b => b.id === selectedBranchId) || branches[0];

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev === 0 ? selectedBranch.photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev === selectedBranch.photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE5DC] shadow-xs mb-8"
    >
      {/* Branch Selector Tabs */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EDE5DC] flex-wrap">
        <div>
          <span className="text-xs font-bold text-[#8B6F47] uppercase tracking-wider">
            {isAr ? 'فروع المالك' : 'Owner Managed Properties'}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] mt-0.5">
            {isAr ? 'تفاصيل الفرع ومعرض الصور' : 'Branch Details & Gallery'}
          </h2>
        </div>

        {/* Branch Switcher Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {branches.map((b) => {
            const isSelected = b.id === selectedBranch.id;
            return (
              <motion.button
                key={b.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedBranchId(b.id);
                  setActivePhotoIndex(0);
                }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#1d1d1f] text-white shadow-xs border border-[#1d1d1f]'
                    : 'bg-[#FAF7F2] text-[#8B6F47] hover:bg-[#F0E8DD] border border-[#EDE5DC]'
                }`}
              >
                <Building2 className={`w-4 h-4 ${isSelected ? 'text-[#C89565]' : 'text-[#8B6F47]'}`} />
                <span>{b.name[isAr ? 'ar' : 'en']}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeBranchIndicator"
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#C89565] rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Branch Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (6 cols): Branch Information */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="bg-[#B8865F]/15 border border-[#C89565]/40 text-[#8B6F47] text-xs font-extrabold px-3.5 py-1 rounded-full">
              {isAr ? `رمز الفرع: ${selectedBranch.fullCode}` : `Branch Code: ${selectedBranch.fullCode}`}
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {isAr ? 'تشغيل حي نشط 100%' : '100% Fully Operational'}
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f]">
              {selectedBranch.name[isAr ? 'ar' : 'en']}
            </h3>
            <p className="text-sm font-bold text-[#8B6F47] flex items-center gap-1.5 mt-2">
              <MapPin className="w-4 h-4 text-[#B8865F] flex-shrink-0 animate-bounce" />
              <span>{selectedBranch.location[isAr ? 'ar' : 'en']}</span>
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {selectedBranch.address[isAr ? 'ar' : 'en']}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC] shadow-2xs"
            >
              <span className="text-[11px] font-semibold text-[#8B6F47] block">
                {isAr ? 'طاقة الوحدات' : 'Unit Capacity'}
              </span>
              <span className="text-lg font-black text-[#1d1d1f] mt-0.5 block">
                {selectedBranch.totalUnits} {isAr ? 'وحدة' : 'units'}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC] shadow-2xs"
            >
              <span className="text-[11px] font-semibold text-[#8B6F47] block">
                {isAr ? 'الجهة المشغلة' : 'Operator'}
              </span>
              <span className="text-sm font-extrabold text-[#1d1d1f] mt-0.5 block truncate">
                {isAr ? 'مؤسسة مثوى' : 'Mathwaa Co.'}
              </span>
            </motion.div>
          </div>

          {/* Unit Mix List */}
          <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EDE5DC]">
            <h4 className="text-xs font-bold text-[#8B6F47] uppercase tracking-wider mb-2.5">
              {isAr ? 'توزيع أنواع الوحدات بالفرع' : 'Branch Unit Mix Breakdown'}
            </h4>
            <div className="space-y-2">
              {selectedBranch.unitBreakdown.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: isAr ? -3 : 3 }}
                  className="flex items-center justify-between text-xs sm:text-sm bg-white p-2.5 rounded-xl border border-[#EDE5DC] transition-all"
                >
                  <span className="font-bold text-[#1d1d1f]">{item.type[isAr ? 'ar' : 'en']}</span>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#B8865F]/15 text-[#8B6F47] font-extrabold px-2.5 py-0.5 rounded-md">
                      {item.count} {isAr ? 'وحدات' : 'units'}
                    </span>
                    <span className="font-semibold text-stone-600">{item.avgMonthlyRate}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Direct Line */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center gap-3 text-xs bg-[#1d1d1f] text-white p-3.5 rounded-2xl border border-[#EDE5DC] shadow-md"
          >
            <Phone className="w-4 h-4 text-[#C89565] flex-shrink-0 animate-pulse" />
            <div>
              <p className="font-bold text-[#E0C9B1]">
                {isAr ? 'خط التواصل المباشر مع مثوى' : 'Mathwaa Direct Contact'}
              </p>
              <p className="text-stone-300 font-mono mt-0.5">
                {selectedBranch.contactPhone}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column (6 cols): Photo Gallery & Carousel */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8B6F47] flex items-center gap-1">
              {isAr ? `صور الفرع (${selectedBranch.photos.length} صور)` : `Branch Photos (${selectedBranch.photos.length} photos)`}
            </span>
            <button
              onClick={() => setLightboxOpen(true)}
              className="text-xs font-bold text-[#B8865F] hover:text-[#8B6F47] flex items-center gap-1 transition"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'توسيع الصور' : 'Fullscreen Photos'}</span>
            </button>
          </div>

          {/* Main Large Featured Photo with Motion Transition */}
          <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-[#EDE5DC] shadow-sm group bg-stone-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={activePhotoIndex}
                initial={{ opacity: 0.8, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
                src={selectedBranch.photos[activePhotoIndex]}
                alt={`${selectedBranch.name[isAr ? 'ar' : 'en']} - Photo ${activePhotoIndex + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={handleImageError}
                onClick={() => setLightboxOpen(true)}
              />
            </AnimatePresence>

            {/* Overlay Gradient & Counter */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
              <span>
                {selectedBranch.name[isAr ? 'ar' : 'en']} - {isAr ? `صورة ${activePhotoIndex + 1} من ${selectedBranch.photos.length}` : `Photo ${activePhotoIndex + 1} of ${selectedBranch.photos.length}`}
              </span>
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono border border-white/20">
                Mathwaa Standard
              </span>
            </div>

            {/* Navigation Arrows */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition shadow-md"
              title="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition shadow-md"
              title="Next Photo"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-5 gap-2">
            {selectedBranch.photos.map((photo, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActivePhotoIndex(index)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  index === activePhotoIndex
                    ? 'border-[#B8865F] scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={photo}
                  alt={`${selectedBranch.name[isAr ? 'ar' : 'en']} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={handleImageError}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-[#C89565] p-2 rounded-full bg-white/10 transition z-50"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            >
              <img
                src={selectedBranch.photos[activePhotoIndex]}
                alt={`${selectedBranch.name[isAr ? 'ar' : 'en']} enlarged view ${activePhotoIndex + 1}`}
                className="w-full h-full object-contain bg-black"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={handleImageError}
              />

              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-3 rounded-full backdrop-blur-md transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-3 rounded-full backdrop-blur-md transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-4 rounded-xl text-white flex items-center justify-between text-sm">
                <div>
                  <p className="font-extrabold text-[#E0C9B1]">{selectedBranch.name[isAr ? 'ar' : 'en']}</p>
                  <p className="text-xs text-stone-300">{selectedBranch.location[isAr ? 'ar' : 'en']}</p>
                </div>
                <span className="font-mono text-xs bg-white/10 px-3 py-1 rounded-lg">
                  {activePhotoIndex + 1} / {selectedBranch.photos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
