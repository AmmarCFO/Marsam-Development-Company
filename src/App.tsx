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
    <div className="min-h-screen bg-[#FAF7F2] text-[#1d1d1f] font-['Cairo',sans-serif] selection:bg-[#B8865F]/20 selection:text-[#8B6F47]">
      {/* Header */}
      <Header
        isAr={isAr}
        setIsAr={setIsAr}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
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
