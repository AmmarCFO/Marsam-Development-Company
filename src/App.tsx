import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { OwnerBanner } from './components/OwnerBanner';
import { OperatingReportBoard } from './components/OperatingReportBoard';
import { BranchOverview } from './components/BranchOverview';
import { PerformanceChart } from './components/PerformanceChart';
import { ReportPrintModal } from './components/ReportPrintModal';
import { ViewTab, OperatingReport } from './types';
import { branchesList, initialOperatingReports, ownerProfile } from './data';

export default function App() {
  const [isAr, setIsAr] = useState<boolean>(true);
  const [viewTab, setViewTab] = useState<ViewTab>('board');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('sahman-55');
  
  // Dynamic State for Operating Reports
  const [reports, setReports] = useState<OperatingReport[]>(initialOperatingReports);
  
  // Modal state for Print preview
  const [selectedPrintReport, setSelectedPrintReport] = useState<OperatingReport | null>(null);

  useEffect(() => {
    document.title = isAr
      ? `مثوى | تقرير أداء المالك - ${ownerProfile.name.ar}`
      : `Mathwaa | Owner Operating Report - ${ownerProfile.name.en}`;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
  }, [isAr]);

  // Handler for owner to add a custom owner note to any report
  const handleAddOwnerNote = (reportId: string, noteText: string) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const newRemark = {
            id: `rem-${Date.now()}`,
            author: ownerProfile.name[isAr ? 'ar' : 'en'],
            role: 'owner' as const,
            date: new Date().toISOString().split('T')[0],
            content: noteText
          };
          return {
            ...rep,
            additionalRemarks: [...(rep.additionalRemarks || []), newRemark]
          };
        }
        return rep;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1d1d1f] font-['Cairo',sans-serif] selection:bg-[#B8865F]/20 selection:text-[#8B6F47]">
      {/* Header */}
      <Header
        isAr={isAr}
        setIsAr={setIsAr}
        viewTab={viewTab}
        setViewTab={setViewTab}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Executive Banner Addressed to Ahmed Al Turki */}
        <OwnerBanner
          isAr={isAr}
          selectedBranchId={selectedBranchId}
          setSelectedBranchId={setSelectedBranchId}
          totalReportsCount={reports.length}
        />

        {/* Dynamic View Tab Switching */}
        <AnimatePresence mode="wait">
          {viewTab === 'board' ? (
            <motion.div
              key="board"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Financial Yield & Occupancy Analytics (Duplicated on Reports Board) */}
              <PerformanceChart isAr={isAr} reports={reports} />

              {/* Branch Quick Showcase */}
              <BranchOverview
                isAr={isAr}
                branches={branchesList}
                selectedBranchId={selectedBranchId}
                setSelectedBranchId={setSelectedBranchId}
              />

              {/* Main Consecutive Operating Reports Log */}
              <OperatingReportBoard
                isAr={isAr}
                reports={reports}
                onAddOwnerNote={handleAddOwnerNote}
                onSelectPrintReport={(rep) => setSelectedPrintReport(rep)}
              />
            </motion.div>
          ) : viewTab === 'branches' ? (
            <motion.div
              key="branches"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <BranchOverview
                isAr={isAr}
                branches={branchesList}
                selectedBranchId={selectedBranchId}
                setSelectedBranchId={setSelectedBranchId}
              />
            </motion.div>
          ) : (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PerformanceChart isAr={isAr} reports={reports} />
            </motion.div>
          )}
        </AnimatePresence>
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
