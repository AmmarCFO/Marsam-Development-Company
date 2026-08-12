import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronRight, ChevronLeft, Play, Pause, Sparkles, Building2, MapPin } from 'lucide-react';
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
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Touch Swipe State for Mobile Fluidity
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const selectedBranch = branches.find(b => b.id === selectedBranchId) || branches[0];
  const photos = selectedBranch.photos || [];

  // Preload all branch photos into browser cache for instant switching
  useEffect(() => {
    preloadImages(photos);
  }, [photos]);

  // Automatic 3.5-second slideshow timer
  useEffect(() => {
    if (!isPlaying || isHovered || photos.length === 0) return;

    const interval = setInterval(() => {
      setActivePhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, photos.length]);

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
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
    const minSwipeDistance = 35; // minimum 35px swipe

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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-[#EDE5DC] bg-[#1d1d1f] mb-8 group"
    >
      {/* Background Animated Subtle Glow Aura */}
      <motion.div
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -inset-2 bg-gradient-to-r from-[#B8865F]/30 via-[#C89565]/20 to-[#E0C9B1]/30 rounded-3xl blur-xl pointer-events-none"
      />

      {/* Main Cover Slideshow Container */}
      <div 
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[300px] sm:min-h-[420px] max-h-[520px] overflow-hidden select-none touch-pan-y"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Animated 3.5s Progress Bar */}
        {isPlaying && !isHovered && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30 overflow-hidden">
            <motion.div
              key={activePhotoIndex}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.5, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-[#C89565] to-[#E0C9B1]"
            />
          </div>
        )}

        {/* Slideshow Image with Motion Transition & Ken Burns effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhotoIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={photos[activePhotoIndex]}
              alt={`${selectedBranch.name[isAr ? 'ar' : 'en']} - ${activePhotoIndex + 1}`}
              className="w-full h-full object-cover object-center cursor-pointer"
              referrerPolicy="no-referrer"
              onError={handleImageError}
              onClick={() => setLightboxOpen(true)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Gradient Overlays for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40 pointer-events-none" />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-md text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isAr ? 'معرض الصور' : 'Gallery'}</span>
          </span>

          {/* Quick Action Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/20 transition min-h-[36px]"
              title={isPlaying ? (isAr ? 'إيقاف' : 'Pause') : (isAr ? 'تشغيل' : 'Play')}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#C89565]" />
                  <span className="hidden sm:inline">{isAr ? 'إيقاف' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#C89565]" />
                  <span className="hidden sm:inline">{isAr ? 'تشغيل' : 'Play'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/20 transition min-h-[36px]"
              title={isAr ? 'توسيع الشاشة' : 'Fullscreen'}
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#C89565]" />
              <span className="hidden sm:inline">{isAr ? 'توسيع' : 'Fullscreen'}</span>
            </button>
          </div>
        </div>

        {/* Left & Right Sleek Navigation Arrows */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevPhoto}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-lg transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleNextPhoto}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-lg transition"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Bottom Floating Thumbnail Strip Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-end">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            {photos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 transition-all ${
                  idx === activePhotoIndex
                    ? 'border-[#C89565] scale-105 shadow-md ring-2 ring-[#C89565]/50'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={photo}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 text-white hover:text-[#C89565] w-11 h-11 rounded-full bg-white/10 flex items-center justify-center transition z-50 border border-white/20"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-w-6xl w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={photos[activePhotoIndex]}
                alt={`Full preview ${activePhotoIndex + 1}`}
                className="w-full h-full object-contain bg-black select-none"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />

              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-12 h-12 rounded-full backdrop-blur-md transition flex items-center justify-center border border-white/20 z-10"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white w-12 h-12 rounded-full backdrop-blur-md transition flex items-center justify-center border border-white/20 z-10"
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl text-white flex items-center justify-between text-xs sm:text-sm border border-white/10">
                <div>
                  <p className="font-extrabold text-[#E0C9B1]">{selectedBranch.name[isAr ? 'ar' : 'en']}</p>
                  <p className="text-xs text-stone-300">{selectedBranch.location[isAr ? 'ar' : 'en']}</p>
                </div>
                <span className="font-mono text-xs bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                  {activePhotoIndex + 1} / {photos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
