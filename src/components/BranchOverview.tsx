import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Building2, Phone, Maximize2, X, ChevronRight, ChevronLeft, CheckCircle2, Play, Pause } from 'lucide-react';
import { BranchDetails } from '../types';
import { handleImageError, preloadImages } from '../constants/images';

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
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Touch Swipe State for Mobile Fluidity
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const selectedBranch = branches.find(b => b.id === selectedBranchId) || branches[0];

  // Preload all branch photos into browser cache for instant switching
  useEffect(() => {
    preloadImages(selectedBranch.photos);
  }, [selectedBranch]);

  // Automatic 3-second slideshow timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setActivePhotoIndex((prev) => (prev === selectedBranch.photos.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, selectedBranch.photos.length]);

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev === 0 ? selectedBranch.photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev === selectedBranch.photos.length - 1 ? 0 : prev + 1));
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40; // minimum 40px swipe

    if (distance > minSwipeDistance) {
      // Swiped Left
      isAr ? handlePrevPhoto() : handleNextPhoto();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right
      isAr ? handleNextPhoto() : handlePrevPhoto();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#EDE5DC] shadow-xs mb-8"
    >
      {/* Branch Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#EDE5DC]">
        <div>
          <span className="text-xs font-bold text-[#8B6F47] uppercase tracking-wider">
            {isAr ? 'فروع المالك' : 'Owner Managed Properties'}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] mt-0.5">
            {isAr ? 'تفاصيل الفرع ومعرض الصور' : 'Branch Details & Gallery'}
          </h2>
        </div>

        {/* Branch Switcher Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 touch-pan-x scrollbar-none">
          {branches.map((b) => {
            const isSelected = b.id === selectedBranch.id;
            return (
              <motion.button
                key={b.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setSelectedBranchId(b.id);
                  setActivePhotoIndex(0);
                }}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap min-h-[44px] ${
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column (6 cols): Branch Information */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="bg-[#B8865F]/15 border border-[#C89565]/40 text-[#8B6F47] text-xs font-extrabold px-3 py-1 rounded-full">
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
            <h3 className="text-xl sm:text-3xl font-extrabold text-[#1d1d1f]">
              {selectedBranch.name[isAr ? 'ar' : 'en']}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-[#8B6F47] flex items-center gap-1.5 mt-1.5">
              <MapPin className="w-4 h-4 text-[#B8865F] flex-shrink-0 animate-bounce" />
              <span>{selectedBranch.location[isAr ? 'ar' : 'en']}</span>
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {selectedBranch.address[isAr ? 'ar' : 'en']}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC] shadow-2xs"
            >
              <span className="text-[11px] font-semibold text-[#8B6F47] block">
                {isAr ? 'طاقة الوحدات' : 'Unit Capacity'}
              </span>
              <span className="text-base sm:text-lg font-black text-[#1d1d1f] mt-0.5 block">
                {selectedBranch.totalUnits} {isAr ? 'وحدة' : 'units'}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EDE5DC] shadow-2xs"
            >
              <span className="text-[11px] font-semibold text-[#8B6F47] block">
                {isAr ? 'الجهة المشغلة' : 'Operator'}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#1d1d1f] mt-0.5 block truncate">
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
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs sm:text-sm bg-white p-2.5 rounded-xl border border-[#EDE5DC] transition-all"
                >
                  <span className="font-bold text-[#1d1d1f]">{item.type[isAr ? 'ar' : 'en']}</span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="bg-[#B8865F]/15 text-[#8B6F47] font-extrabold px-2.5 py-0.5 rounded-md text-xs">
                      {item.count} {isAr ? 'وحدات' : 'units'}
                    </span>
                    <span className="font-semibold text-stone-600 text-xs sm:text-sm">{item.avgMonthlyRate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Direct Line */}
          <div className="flex items-center gap-3 text-xs bg-[#1d1d1f] text-white p-3.5 rounded-2xl border border-[#EDE5DC] shadow-md">
            <Phone className="w-4 h-4 text-[#C89565] flex-shrink-0 animate-pulse" />
            <div>
              <p className="font-bold text-[#E0C9B1]">
                {isAr ? 'خط التواصل المباشر مع مثوى' : 'Mathwaa Direct Contact'}
              </p>
              <p className="text-stone-300 font-mono mt-0.5">
                {selectedBranch.contactPhone}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Photo Gallery & Touch Carousel */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#8B6F47] flex items-center gap-1">
                {isAr ? `صور الفرع (${selectedBranch.photos.length} صور)` : `Branch Photos (${selectedBranch.photos.length} photos)`}
              </span>
              <span className="text-[10px] bg-[#B8865F]/15 text-[#8B6F47] px-2 py-0.5 rounded-full font-semibold hidden sm:inline-block">
                {isAr ? 'عرض تلقائي 3ث' : 'Auto 3s'}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-xs font-bold text-[#8B6F47] hover:text-[#B8865F] flex items-center gap-1 bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#EDE5DC] transition min-h-[36px]"
                title={isPlaying ? (isAr ? 'إيقاف التبديل التلقائي' : 'Pause Slideshow') : (isAr ? 'تشغيل التبديل التلقائي' : 'Play Slideshow')}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#B8865F]" />
                    <span>{isAr ? 'إيقاف' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#B8865F]" />
                    <span>{isAr ? 'تشغيل' : 'Play'}</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setLightboxOpen(true)}
                className="text-xs font-bold text-[#B8865F] hover:text-[#8B6F47] flex items-center gap-1.5 bg-[#B8865F]/10 px-3 py-1.5 rounded-xl transition min-h-[36px]"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'توسيع' : 'Fullscreen'}</span>
              </button>
            </div>
          </div>

          {/* Main Large Featured Photo with Touch Swipe & Motion Transition */}
          <div className="relative group">
            {/* Ambient Moving Glow Aura Behind Photo Container */}
            <motion.div
              animate={{
                scale: [0.98, 1.03, 0.98],
                opacity: [0.3, 0.65, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute -inset-1.5 bg-gradient-to-r from-[#B8865F]/40 via-[#C89565]/30 to-[#E0C9B1]/40 rounded-3xl blur-md pointer-events-none"
            />

            <div 
              className="relative aspect-16/10 rounded-2xl overflow-hidden border border-[#EDE5DC] shadow-sm bg-stone-100 touch-pan-y"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
            {/* 3-Second Animated Progress Bar */}
            {isPlaying && !isHovered && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 z-20 overflow-hidden">
                <motion.div
                  key={activePhotoIndex}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                  className="h-full bg-[#B8865F]"
                />
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.img
                key={activePhotoIndex}
                initial={{ opacity: 0.85, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.85 }}
                transition={{ duration: 0.35 }}
                src={selectedBranch.photos[activePhotoIndex]}
                alt={`${selectedBranch.name[isAr ? 'ar' : 'en']} - Photo ${activePhotoIndex + 1}`}
                className="w-full h-full object-cover cursor-pointer select-none"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={handleImageError}
                onClick={() => setLightboxOpen(true)}
              />
            </AnimatePresence>

            {/* Mobile swipe hint overlay on first touch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-0.5 rounded-full border border-white/20 pointer-events-none sm:hidden font-medium">
              {isAr ? 'أسحب لليمين واليسار للتنقل 👈👉' : 'Swipe left / right to navigate 👈👉'}
            </div>

            {/* Overlay Gradient & Counter */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
              <span className="truncate max-w-[70%]">
                {selectedBranch.name[isAr ? 'ar' : 'en']} - {isAr ? `صورة ${activePhotoIndex + 1} من ${selectedBranch.photos.length}` : `Photo ${activePhotoIndex + 1} of ${selectedBranch.photos.length}`}
              </span>
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono border border-white/20">
                Mathwaa Standard
              </span>
            </div>

            {/* Navigation Arrows with touch-friendly size */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full backdrop-blur-md transition flex items-center justify-center shadow-md active:bg-black z-10"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full backdrop-blur-md transition flex items-center justify-center shadow-md active:bg-black z-10"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-5 gap-2 touch-pan-x">
            {selectedBranch.photos.map((photo, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.92 }}
                onClick={() => setActivePhotoIndex(index)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all min-h-[44px] ${
                  index === activePhotoIndex
                    ? 'border-[#B8865F] scale-102 shadow-md ring-2 ring-[#B8865F]/30'
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

      {/* Lightbox Modal with Mobile Touch Gesture Support */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#C89565] w-11 h-11 rounded-full bg-white/15 flex items-center justify-center transition z-50"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={selectedBranch.photos[activePhotoIndex]}
                alt={`${selectedBranch.name[isAr ? 'ar' : 'en']} enlarged view ${activePhotoIndex + 1}`}
                className="w-full h-full object-contain bg-black select-none"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={handleImageError}
              />

              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-12 h-12 rounded-full backdrop-blur-md transition flex items-center justify-center z-10"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-12 h-12 rounded-full backdrop-blur-md transition flex items-center justify-center z-10"
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-3.5 rounded-xl text-white flex items-center justify-between text-xs sm:text-sm">
                <div className="truncate max-w-[70%]">
                  <p className="font-extrabold text-[#E0C9B1] truncate">{selectedBranch.name[isAr ? 'ar' : 'en']}</p>
                  <p className="text-xs text-stone-300 truncate">{selectedBranch.location[isAr ? 'ar' : 'en']}</p>
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
