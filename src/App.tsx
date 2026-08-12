import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { OperatingReportBoard } from './components/OperatingReportBoard';
import { BranchOverview } from './components/BranchOverview';
import { ReportPrintModal } from './components/ReportPrintModal';
import { OperatingReport } from './types';
import { branchesList, initialOperatingReports } from './data';

export default function App() {
  const [isAr, setIsAr] = useState<boolean>(true);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('sahman-55');
  
  // Operating Reports Data
  const [reports] = useState<OperatingReport[]>(initialOperatingReports);
  
  // Modal state for Print preview
  const [selectedPrintReport, setSelectedPrintReport] = useState<OperatingReport | null>(null);

  useEffect(() => {
    document.title = isAr
      ? `مثوى | التقرير التشغيلي - فرع ٥٥`
      : `Mathwaa | Operating Report - Branch 55`;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
  }, [isAr]);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1d1d1f] font-['Cairo',sans-serif] selection:bg-[#B8865F]/20 selection:text-[#8B6F47] overflow-x-hidden">
      {/* Dynamic Animated Glowing Orbs Background (Mobile & Desktop) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 sm:opacity-75">
        {/* Top-Right Gold Glow Orb */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.35, 0.55, 0.35]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-24 -right-24 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#C89565]/35 via-[#B8865F]/20 to-transparent blur-3xl"
        />

        {/* Center-Left Warm Amber Glow Orb */}
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 60, -40, 0],
            scale: [0.9, 1.15, 1, 0.9],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 -left-32 w-80 h-80 sm:w-[550px] sm:h-[550px] rounded-full bg-gradient-to-tr from-[#E0C9B1]/40 via-[#B8865F]/15 to-transparent blur-3xl"
        />

        {/* Bottom-Right Emerald/Gold Glow Orb */}
        <motion.div
          animate={{
            x: [0, 35, -45, 0],
            y: [0, -30, 50, 0],
            scale: [1, 0.85, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-32 -right-20 w-96 h-96 sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-bl from-[#10B981]/15 via-[#C89565]/20 to-transparent blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header
          isAr={isAr}
          setIsAr={setIsAr}
        />
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* 1. Branch Details & Photo Gallery */}
        <BranchOverview
          isAr={isAr}
          branches={branchesList}
          selectedBranchId={selectedBranchId}
          setSelectedBranchId={setSelectedBranchId}
        />

        {/* 2. Structured Operating Report containing strictly the 9 requested metrics */}
        <OperatingReportBoard
          isAr={isAr}
          reports={reports}
          onSelectPrintReport={(rep) => setSelectedPrintReport(rep)}
        />
      </main>

      {/* Printable Statement Modal */}
      <ReportPrintModal
        isAr={isAr}
        report={selectedPrintReport}
        onClose={() => setSelectedPrintReport(null)}
      />
    </div>
  );
}
