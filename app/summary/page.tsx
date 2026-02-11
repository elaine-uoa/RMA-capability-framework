"use client";

import React from "react";
import { useAssessment } from "@/contexts/AssessmentContext";
import { capabilities } from "@/data/capabilities";
import { CapabilityLevel, SelectedDescriptor } from "@/types";
import Link from "next/link";

// Level order for comparison
const LEVEL_ORDER: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];

// Report content mode
type ReportMode = "all" | "focus-only";

// Colour mapping for capabilities based on key areas
const getCapabilityColor = (capabilityId: string): { solid: string; light: string } => {
  const colorMap: Record<string, { solid: string; light: string }> = {
    "research-engagement": { solid: "#0c0c48", light: "#e7e7ed" },
    "maximising-impact": { solid: "#0c0c48", light: "#e7e7ed" },
    "researcher-development": { solid: "#00877C", light: "#E6F7F5" },
    "environment-culture": { solid: "#00877C", light: "#E6F7F5" },
    "funding-opportunities": { solid: "#1f2bd4", light: "#e7e7ed" },
    "proposal-support": { solid: "#1f2bd4", light: "#e7e7ed" },
    "initiation": { solid: "#D97706", light: "#FEF6E7" },
    "projects-initiatives": { solid: "#D97706", light: "#FEF6E7" },
    "monitoring-reporting": { solid: "#4F2D7F", light: "#F3EEF8" },
    "policy-strategy": { solid: "#4F2D7F", light: "#F3EEF8" }
  };
  return colorMap[capabilityId] || { solid: "#4a4a4c", light: "#f3f3f6" };
};

export default function SummaryPage() {
  const { assessmentState, getResponse, clearAssessment } = useAssessment();
  const [showNameModal, setShowNameModal] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [tempName, setTempName] = React.useState("");
  const [reportMode, setReportMode] = React.useState<ReportMode>("all");
  const [tempReportMode, setTempReportMode] = React.useState<ReportMode>("all");
  
  // Get capabilities with assessments OR development focus
  const completedCapabilities = capabilities.filter((cap) => {
    const response = getResponse(cap.id);
    return response && (
      response.currentLevel !== null || 
      response.isIncluded === true ||
      (response.developmentFocus && response.developmentFocus.length > 0) ||
      (response.demonstratedDescriptors && response.demonstratedDescriptors.length > 0)
    );
  });

  const handlePrint = () => {
    setTempReportMode(reportMode);
    if (!userName) {
      setTempName("");
    } else {
      setTempName(userName);
    }
    setShowNameModal(true);
  };

  const handleConfirmName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setReportMode(tempReportMode);
      setShowNameModal(false);
      // Small delay to ensure state renders before print dialog
      setTimeout(() => {
        window.print();
      }, 150);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all your assessment data? This cannot be undone.")) {
      clearAssessment();
    }
  };

  // Get demonstrated descriptors (use new field or fallback to legacy)
  const getDemonstrated = (capabilityId: string): SelectedDescriptor[] => {
    const response = getResponse(capabilityId);
    return response?.demonstratedDescriptors || response?.focusAreas || [];
  };

  // Get development focus areas
  const getDevelopmentFocus = (capabilityId: string): SelectedDescriptor[] => {
    const response = getResponse(capabilityId);
    return response?.developmentFocus || [];
  };

  // Group descriptors by level for display
  const groupByLevel = (descriptors: SelectedDescriptor[]): Record<CapabilityLevel, SelectedDescriptor[]> => {
    const byLevel: Record<CapabilityLevel, SelectedDescriptor[]> = {
      FOUNDATION: [],
      INTERMEDIATE: [],
      ADVANCED: [],
      EXEMPLAR: []
    };
    descriptors.forEach(d => {
      if (byLevel[d.level]) {
        byLevel[d.level].push(d);
      }
    });
    return byLevel;
  };

  // For "focus-only" mode, filter to capabilities that have development focus items
  const printCapabilities = reportMode === 'focus-only'
    ? completedCapabilities.filter(cap => getDevelopmentFocus(cap.id).length > 0)
    : completedCapabilities;

  return (
    <div className={`w-full min-h-screen bg-[#f3f3f6] flex flex-col items-center ${reportMode === 'focus-only' ? 'print-focus-only' : 'print-all'}`}>
      {/* Header */}
      <header className="w-full bg-white border-b border-[#d9d9d9] flex justify-center">
        <div className="w-full max-w-[1140px] px-8 lg:px-12 py-8">
          {/* Action buttons */}
          <div className="flex items-center justify-center gap-4 mb-6 no-print" style={{ marginTop: '24px' }}>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white border border-[#d9d9d9] text-[#4a4a4c] rounded-lg font-semibold hover:bg-[#f3f3f6] hover:border-[#1f2bd4] transition-colors"
              style={{
                padding: '14px 28px',
                fontSize: '15px'
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Save PDF
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 bg-white border border-[#d9d9d9] text-[#A71930] rounded-lg font-semibold hover:bg-[#A71930]/5 hover:border-[#A71930] transition-colors"
              style={{
                padding: '14px 28px',
                fontSize: '15px'
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#4a4a4c] mb-2">
              {reportMode === 'focus-only' ? 'Development Focus Report' : 'Development Summary'}
            </h1>
            {userName && (
              <div className="mb-3 flex items-center justify-center gap-3">
                <p className="text-xl font-semibold text-[#0c0c48]">
                  {userName}
                </p>
                <button
                  onClick={() => {
                    setTempName(userName);
                    setShowNameModal(true);
                  }}
                  className="no-print text-sm text-[#1f2bd4] hover:text-[#0c0c48] underline"
                >
                  Edit
                </button>
              </div>
            )}
            <p className="text-[#6d6e71]">
              Last updated on {new Date(assessmentState.lastUpdated).toLocaleDateString('en-NZ', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-[#6d6e71] mt-2">
              Focus on 1–2 capabilities per year for targeted professional development
            </p>
            {/* Print-only report mode indicator */}
            {reportMode === 'focus-only' && (
              <p className="text-xs text-[#1f2bd4] mt-2 hidden print-mode-label">
                Report type: Development Focus Areas Only
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-[1140px] px-8 lg:px-12 py-12 md:py-16">
        {completedCapabilities.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#d9d9d9] p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#f3f3f6] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#6d6e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#4a4a4c] mb-2">No Assessments Yet</h2>
            <p className="text-[#6d6e71] mb-6">
              You haven't completed any capability assessments.
            </p>
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f2bd4] rounded-lg font-semibold hover:bg-[#1929a8] transition-colors"
              style={{ color: 'white' }}
            >
              Start Assessment
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className={`grid grid-cols-1 ${reportMode === 'focus-only' ? 'md:grid-cols-3' : 'md:grid-cols-4'} mb-10`} style={{ gap: '24px', paddingTop: '32px' }}>
              <div className="bg-white rounded-lg border border-[#d9d9d9] p-5 text-center">
                <div className="text-3xl font-bold text-[#0c0c48] mb-1">
                  {reportMode === 'focus-only' ? printCapabilities.length : completedCapabilities.length}
                </div>
                <div className="text-sm text-[#6d6e71]">
                  {reportMode === 'focus-only' ? 'Capabilities with Focus' : 'Capabilities Assessed'}
                </div>
              </div>
              {reportMode !== 'focus-only' && (
                <div className="bg-white rounded-lg border border-[#d9d9d9] p-5 text-center print-demonstrated-stat">
                  <div className="text-3xl font-bold text-[#9a7100] mb-1">
                    {completedCapabilities.reduce((sum, c) => sum + getDemonstrated(c.id).length, 0)}
                  </div>
                  <div className="text-sm text-[#6d6e71]">Descriptors Demonstrated</div>
                </div>
              )}
              <div className="bg-white rounded-lg border border-[#d9d9d9] p-5 text-center">
                <div className="text-3xl font-bold text-[#9a7100] mb-1">
                  {printCapabilities.reduce((sum, c) => sum + getDevelopmentFocus(c.id).length, 0)}
                </div>
                <div className="text-sm text-[#6d6e71]">Development Focus Areas</div>
              </div>
              <div className="bg-white rounded-lg border border-[#d9d9d9] p-5 text-center">
                <div className="text-3xl font-bold text-[#4a4a4c] mb-1">
                  {completedCapabilities.filter(c => getDevelopmentFocus(c.id).length > 0).length}
                </div>
                <div className="text-sm text-[#6d6e71]">With Development Focus</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 no-print justify-center" style={{ marginBottom: '48px', marginTop: '32px' }}>
              <Link
                href="/assess"
                className="inline-flex items-center gap-2 bg-[#00877C]/10 border border-[#00877C]/30 text-[#00877C] rounded-lg font-semibold hover:bg-[#00877C]/20 transition-colors"
                style={{
                  padding: '14px 28px',
                  fontSize: '15px'
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Continue Assessment
              </Link>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 bg-[#EAAB00]/10 border border-[#EAAB00]/30 text-[#9a7100] rounded-lg font-semibold hover:bg-[#EAAB00]/20 transition-colors"
                style={{
                  padding: '14px 28px',
                  fontSize: '15px'
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Add Development Notes
              </Link>
            </div>

            {/* Assessment Table */}
            <div className="bg-white rounded-lg border border-[#d9d9d9] overflow-hidden" style={{ marginBottom: '56px' }}>
              <div className="p-7 md:p-8 border-b border-[#e2e3e4]">
                <h2 className="text-xl font-bold text-[#4a4a4c] text-center">
                  {reportMode === 'focus-only' ? 'Development Focus Overview' : 'Assessment Overview'}
                </h2>
                {reportMode === 'focus-only' && (
                  <p className="text-sm text-[#6d6e71] text-center mt-2">Showing capabilities with development focus areas only</p>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f3f3f6] border-b border-[#e2e3e4]">
                      <th className="text-left py-5 px-6 lg:px-8 font-semibold text-[#4a4a4c] text-sm">Capability</th>
                      {reportMode !== 'focus-only' && (
                        <th className="text-left py-5 px-6 lg:px-8 font-semibold text-[#4a4a4c] text-sm">Demonstrated</th>
                      )}
                      <th className="text-left py-5 px-6 lg:px-8 font-semibold text-[#4a4a4c] text-sm">To Develop</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(reportMode === 'focus-only' ? printCapabilities : completedCapabilities).map((capability) => {
                      const response = getResponse(capability.id);
                      return (
                        <tr
                          key={capability.id}
                          className="border-b border-[#e2e3e4] hover:bg-[#f3f3f6] transition-colors"
                        >
                          <td className="py-5 px-6 lg:px-8">
                            <Link
                              href={`/assess?capability=${capability.id}`}
                              className="font-medium text-[#4a4a4c] hover:text-[#1f2bd4] transition-colors inline-flex items-center gap-1.5"
                            >
                              {capability.name}
                              <svg className="w-4 h-4 opacity-60 no-print" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </td>
                          {reportMode !== 'focus-only' && (
                            <td className="py-5 px-6 lg:px-8">
                              <span className="text-sm font-medium text-[#9a7100]">
                                {getDemonstrated(capability.id).length} descriptor{getDemonstrated(capability.id).length !== 1 ? 's' : ''}
                              </span>
                            </td>
                          )}
                          <td className="py-5 px-6 lg:px-8">
                            {getDevelopmentFocus(capability.id).length > 0 ? (
                              <span className="text-sm font-medium text-[#9a7100]">
                                {getDevelopmentFocus(capability.id).length} descriptor{getDevelopmentFocus(capability.id).length !== 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="text-[#afafc3] text-sm">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Capability Details - Bundled per capability */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ marginBottom: '32px' }} className="text-center">
                <h2 className="text-xl font-bold text-[#4a4a4c] mb-2">
                  {reportMode === 'focus-only' ? 'Development Focus Details' : 'Capability Details'}
                </h2>
                <p className="text-sm text-[#6d6e71]">
                  {reportMode === 'focus-only'
                    ? 'Your development focus areas and personal notes for targeted capabilities'
                    : 'Your demonstrated competencies, development focus areas, and personal notes for each capability'
                  }
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {(reportMode === 'focus-only' ? printCapabilities : completedCapabilities).map((capability) => {
                  const demonstrated = getDemonstrated(capability.id);
                  const focus = getDevelopmentFocus(capability.id);
                  const response = getResponse(capability.id);

                  const demonstratedByLevel = groupByLevel(demonstrated);
                  const focusByLevel = groupByLevel(focus);
                  const capabilityColor = getCapabilityColor(capability.id);

                  return (
                    <div
                      key={capability.id}
                      className="bg-white rounded-lg border border-[#d9d9d9] overflow-hidden capability-detail-card"
                    >
                      {/* Capability Header */}
                      <div className="border-b border-[#e2e3e4] capability-header" style={{ backgroundColor: capabilityColor.light, padding: '28px 32px' }}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div style={{ paddingLeft: '8px' }}>
                            <h3 className="font-bold text-lg" style={{ color: capabilityColor.solid }}>{capability.name}</h3>
                          </div>
                          <div className="flex items-center gap-3" style={{ paddingRight: '8px' }}>
                            {reportMode !== 'focus-only' && (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00877C]/10 text-[#00877C] border border-[#00877C]/30" style={{ padding: '10px 18px', fontSize: '14px' }}>
                                <span className="font-medium">{demonstrated.length}</span> demonstrated
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAAB00]/10 text-[#9a7100] border border-[#EAAB00]/30" style={{ padding: '10px 18px', fontSize: '14px' }}>
                              <span className="font-medium">{focus.length}</span> to develop
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '32px' }}>
                        {/* Demonstrated Competencies — hidden in focus-only mode */}
                        {reportMode !== 'focus-only' && demonstrated.length > 0 && (
                          <div className="demonstrated-section-container" style={{ marginBottom: '32px' }}>
                            <h4 className="font-semibold text-[#4a4a4c] flex items-center gap-2" style={{ marginBottom: '20px' }}>
                              <span className="w-5 h-5 rounded-full bg-[#00877C]/20 flex items-center justify-center text-[#00877C] text-xs">✓</span>
                              Demonstrated Competencies
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              {LEVEL_ORDER.map((level) => {
                                const descriptors = demonstratedByLevel[level];
                                if (descriptors.length === 0) return null;
                                
                                const levelData = capability.levels.find(l => l.level === level);
                                if (!levelData) return null;

                                return (
                                  <div key={level} className="bg-[#00877C]/10 rounded-lg border border-[#00877C]/30" style={{ padding: '20px' }}>
                                    <div className="font-semibold text-[#00877C] text-sm" style={{ marginBottom: '12px' }}>
                                      {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                    </div>
                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                      {descriptors
                                        .sort((a, b) => a.descriptorIndex - b.descriptorIndex)
                                        .map((d) => {
                                          const descriptor = levelData.bulletPoints[d.descriptorIndex];
                                          if (!descriptor) return null;
                                          
                                          return (
                                            <li key={`${d.level}-${d.descriptorIndex}`} className="flex gap-2 text-sm text-[#4a4a4c]">
                                              <span className="text-[#00877C] font-medium shrink-0">✓</span>
                                              <span>{descriptor}</span>
                                            </li>
                                          );
                                        })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Development Focus Areas */}
                        {focus.length > 0 && (
                          <div className="focus-section-container" style={{ marginBottom: '32px' }}>
                            <h4 className="font-semibold text-[#4a4a4c] flex items-center gap-2" style={{ marginBottom: '20px' }}>
                              <span className="w-5 h-5 rounded-full bg-[#EAAB00]/20 flex items-center justify-center text-[#9a7100] text-xs">→</span>
                              Development Focus Areas
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              {LEVEL_ORDER.map((level) => {
                                const descriptors = focusByLevel[level];
                                if (descriptors.length === 0) return null;
                                
                                const levelData = capability.levels.find(l => l.level === level);
                                if (!levelData) return null;

                                return (
                                  <div key={level} className="bg-[#EAAB00]/10 rounded-lg border border-[#EAAB00]/30" style={{ padding: '20px' }}>
                                    <div className="font-semibold text-[#9a7100] text-sm" style={{ marginBottom: '12px' }}>
                                      {level.charAt(0) + level.slice(1).toLowerCase()} Level Target
                                    </div>
                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                      {descriptors
                                        .sort((a, b) => a.descriptorIndex - b.descriptorIndex)
                                        .map((f) => {
                                          const descriptor = levelData.bulletPoints[f.descriptorIndex];
                                          if (!descriptor) return null;
                                          
                                          return (
                                            <li key={`${f.level}-${f.descriptorIndex}`} className="flex gap-2 text-sm text-[#4a4a4c]">
                                              <span className="text-[#9a7100] font-medium shrink-0">→</span>
                                              <span>{descriptor}</span>
                                            </li>
                                          );
                                        })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Development Notes */}
                        {response?.notes && response.notes.trim().length > 0 && (
                          <div className="notes-section-container" style={{ marginBottom: '32px' }}>
                            <h4 className="font-semibold text-[#4a4a4c] flex items-center gap-2" style={{ marginBottom: '20px' }}>
                              <span className="w-5 h-5 rounded-full bg-[#f3f3f6] flex items-center justify-center text-[#6d6e71] text-xs">📝</span>
                              Personal Reflection Notes
                            </h4>
                            <div className="bg-[#f3f3f6] rounded-lg border border-[#e2e3e4]" style={{ padding: '20px' }}>
                              <p className="text-sm text-[#4a4a4c] whitespace-pre-wrap leading-relaxed">{response.notes}</p>
                            </div>
                          </div>
                        )}

                        {/* Empty state if no details (only in 'all' mode) */}
                        {reportMode !== 'focus-only' && demonstrated.length === 0 && focus.length === 0 && (!response?.notes || response.notes.trim().length === 0) && (
                          <div className="text-center py-4 text-[#6d6e71] text-sm no-print">
                            <p>No descriptors assessed or development focus set for this capability yet.</p>
                            <Link href={`/assess?capability=${capability.id}`} className="text-[#1f2bd4] hover:text-[#0c0c48] mt-1 inline-block">
                              Go to assessment →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call to action if no development focus yet */}
            {!completedCapabilities.some(c => getDevelopmentFocus(c.id).length > 0) && (
              <div className="bg-[#EAAB00]/10 rounded-lg border border-[#EAAB00]/30 p-8 text-center mb-10">
                <h3 className="text-lg font-semibold text-[#9a7100] mb-2">Select Your Development Focus</h3>
                <p className="text-[#4a4a4c] text-sm mb-4">
                  Return to the self-assessment page and tick "Want to develop" for the descriptors you'd like to focus on. Then add development notes on the Plan page.
                </p>
                <Link
                  href="/assess"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f2bd4] rounded-lg font-semibold hover:bg-[#1929a8] transition-colors"
                  style={{ color: 'white' }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Go to Self-Assessment
                </Link>
              </div>
            )}
          </>
        )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#d9d9d9] bg-white mt-auto flex justify-center print-footer">
        <div className="w-full max-w-[1140px] px-8 lg:px-12 py-8">
          <p className="text-sm text-[#6d6e71] text-center">
            RMA Capability Framework • Development Summary
          </p>
        </div>
      </footer>

      {/* Name & Report Options Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 no-print" style={{ padding: '24px' }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full" style={{ padding: '48px' }}>
            <h2 className="text-3xl font-bold text-[#4a4a4c]" style={{ marginBottom: '16px' }}>
              Print / Save Report
            </h2>
            <p className="text-base text-[#6d6e71] leading-relaxed" style={{ marginBottom: '32px' }}>
              Enter your name and choose what to include in the report.
            </p>
            
            {/* Name input */}
            <label className="block text-sm font-semibold text-[#4a4a4c]" style={{ marginBottom: '8px' }}>
              Your Name
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleConfirmName();
                }
              }}
              placeholder="Enter your full name"
              autoFocus
              className="w-full px-5 py-4 border-2 border-[#d9d9d9] rounded-lg text-[#4a4a4c] focus:outline-none focus:border-[#1f2bd4] focus:ring-4 focus:ring-[#1f2bd4]/20 transition-all"
              style={{ fontSize: '16px', marginBottom: '28px' }}
            />

            {/* Report content selection */}
            <label className="block text-sm font-semibold text-[#4a4a4c]" style={{ marginBottom: '12px' }}>
              Report Content
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
              <label
                className={`flex items-start gap-4 rounded-lg border-2 cursor-pointer transition-all ${
                  tempReportMode === 'all'
                    ? 'border-[#1f2bd4] bg-[#1f2bd4]/5'
                    : 'border-[#d9d9d9] hover:border-[#afafc3] bg-white'
                }`}
                style={{ padding: '16px 20px' }}
              >
                <input
                  type="radio"
                  name="reportMode"
                  value="all"
                  checked={tempReportMode === 'all'}
                  onChange={() => setTempReportMode('all')}
                  className="mt-0.5 w-5 h-5 accent-[#1f2bd4] flex-shrink-0"
                />
                <div>
                  <div className="font-semibold text-[#4a4a4c]" style={{ fontSize: '15px' }}>All Descriptors</div>
                  <div className="text-sm text-[#6d6e71]" style={{ marginTop: '4px' }}>
                    Include demonstrated competencies, development focus areas, and notes for every assessed capability.
                  </div>
                </div>
              </label>
              <label
                className={`flex items-start gap-4 rounded-lg border-2 cursor-pointer transition-all ${
                  tempReportMode === 'focus-only'
                    ? 'border-[#00877C] bg-[#00877C]/5'
                    : 'border-[#d9d9d9] hover:border-[#afafc3] bg-white'
                }`}
                style={{ padding: '16px 20px' }}
              >
                <input
                  type="radio"
                  name="reportMode"
                  value="focus-only"
                  checked={tempReportMode === 'focus-only'}
                  onChange={() => setTempReportMode('focus-only')}
                  className="mt-0.5 w-5 h-5 accent-[#00877C] flex-shrink-0"
                />
                <div>
                  <div className="font-semibold text-[#4a4a4c]" style={{ fontSize: '15px' }}>Development Focus Areas Only</div>
                  <div className="text-sm text-[#6d6e71]" style={{ marginTop: '4px' }}>
                    Only include capabilities with development focus items — ideal for a concise development conversation.
                  </div>
                </div>
              </label>
            </div>
            
            <div className="flex justify-end" style={{ gap: '16px' }}>
              <button
                onClick={() => {
                  setShowNameModal(false);
                  setTempName("");
                }}
                className="px-7 py-3.5 border-2 border-[#d9d9d9] text-[#6d6e71] rounded-lg font-semibold hover:bg-[#f3f3f6] hover:border-[#afafc3] transition-all"
                style={{ fontSize: '16px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmName}
                disabled={!tempName.trim()}
                className="px-7 py-3.5 bg-[#1f2bd4] text-white rounded-lg font-semibold hover:bg-[#1929a8] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1f2bd4]"
                style={{ fontSize: '16px' }}
              >
                Confirm & Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
