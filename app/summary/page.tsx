"use client";

import { useAssessment } from "@/contexts/AssessmentContext";
import { capabilities } from "@/data/capabilities";
import { CapabilityLevel, SelectedDescriptor } from "@/types";
import Link from "next/link";

export default function SummaryPage() {
  const { assessmentState, getResponse, clearAssessment } = useAssessment();
  const completedCapabilities = capabilities.filter((cap) => {
    const response = getResponse(cap.id);
    return response && response.currentLevel !== null;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all your assessment data? This cannot be undone.")) {
      clearAssessment();
    }
  };

  const getLevelLabel = (level: CapabilityLevel | null): string => {
    if (!level) return "Not assessed";
    return level.charAt(0) + level.slice(1).toLowerCase();
  };

  const getGrowthSuggestions = (capabilityId: string) => {
    const response = getResponse(capabilityId);
    if (!response || !response.desiredLevel || !response.currentLevel) return null;

    const levelOrder: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];
    const currentIndex = levelOrder.indexOf(response.currentLevel);
    const desiredIndex = levelOrder.indexOf(response.desiredLevel);

    if (desiredIndex >= currentIndex) {
      const capability = capabilities.find((c) => c.id === capabilityId);
      if (!capability) return null;

      const focusAreas = response.focusAreas || [];
      
      // Get unchecked descriptors from current level (to complete current level)
      const currentLevelData = capability.levels[currentIndex];
      const currentUnchecked = currentLevelData?.bulletPoints
        .map((point, idx) => ({ point, index: idx, level: response.currentLevel! }))
        .filter((_, idx) => !focusAreas.some(
          fa => fa.level === response.currentLevel && fa.descriptorIndex === idx
        )) || [];

      // Get unchecked descriptors from target level (to reach target level)
      const targetLevelData = capability.levels[desiredIndex];
      const targetUnchecked = targetLevelData?.bulletPoints
        .map((point, idx) => ({ point, index: idx, level: response.desiredLevel! }))
        .filter((_, idx) => !focusAreas.some(
          fa => fa.level === response.desiredLevel && fa.descriptorIndex === idx
        )) || [];

      return {
        currentLevel: response.currentLevel,
        desiredLevel: response.desiredLevel,
        currentUnchecked,
        targetUnchecked
      };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <nav className="flex items-center justify-between mb-8 no-print">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Home
            </Link>
            
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print / Save PDF
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-red-600 rounded-lg font-medium hover:bg-red-50 hover:border-red-300 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </button>
            </div>
          </nav>

          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Development Summary</h1>
            <p className="text-slate-600">
              Last updated on {new Date(assessmentState.lastUpdated).toLocaleDateString('en-NZ', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Focus on 1–3 capabilities per year for targeted professional development
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {completedCapabilities.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Assessments Yet</h2>
            <p className="text-slate-600 mb-6">
              You haven't completed any capability assessments.
            </p>
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">{completedCapabilities.length}</div>
                <div className="text-sm text-slate-600">Capabilities Assessed</div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {completedCapabilities.filter(c => getResponse(c.id)?.desiredLevel).length}
                </div>
                <div className="text-sm text-slate-600">Growth Targets Set</div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {completedCapabilities.reduce((sum, c) => {
                    const response = getResponse(c.id);
                    return sum + (response?.focusAreas?.length || 0);
                  }, 0)}
                </div>
                <div className="text-sm text-slate-600">Focus Areas Selected</div>
              </div>
            </div>

            {/* Assessment Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-12">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">Assessment Overview</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Capability</th>
                      <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Current</th>
                      <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Target</th>
                      <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedCapabilities.map((capability) => {
                      const response = getResponse(capability.id);
                      return (
                        <tr
                          key={capability.id}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="font-medium text-slate-900">{capability.name}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700">
                              {getLevelLabel(response?.currentLevel || null)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            {response?.desiredLevel ? (
                              <span className="inline-flex px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700">
                                {getLevelLabel(response.desiredLevel)}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-sm">—</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-slate-600 text-sm max-w-xs truncate">
                              {response?.notes || <span className="text-slate-400">—</span>}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Development Focus Areas */}
            {completedCapabilities.some(c => {
              const response = getResponse(c.id);
              return response?.focusAreas && response.focusAreas.length > 0;
            }) && (
              <div className="mb-12">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Your Selected Focus Areas</h2>
                  <p className="text-sm text-slate-600">
                    These are the specific descriptors you selected as focus areas for your development
                  </p>
                </div>
                <div className="space-y-6">
                  {completedCapabilities.map((capability) => {
                    const response = getResponse(capability.id);
                    const focusAreas = response?.focusAreas || [];
                    
                    if (focusAreas.length === 0) return null;

                    // Group focus areas by level
                    const focusByLevel: Record<CapabilityLevel, SelectedDescriptor[]> = {
                      FOUNDATION: [],
                      INTERMEDIATE: [],
                      ADVANCED: [],
                      EXEMPLAR: []
                    };

                    focusAreas.forEach(fa => {
                      if (focusByLevel[fa.level]) {
                        focusByLevel[fa.level].push(fa);
                      }
                    });

                    return (
                      <div
                        key={capability.id}
                        className="bg-white rounded-lg border border-slate-200 p-6"
                      >
                        <div className="mb-4">
                          <h3 className="font-bold text-slate-900 text-lg mb-2">{capability.name}</h3>
                          <p className="text-sm text-slate-600">
                            {focusAreas.length} focus area{focusAreas.length !== 1 ? 's' : ''} selected
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          {Object.entries(focusByLevel).map(([level, descriptors]) => {
                            if (descriptors.length === 0) return null;
                            
                            const levelData = capability.levels.find(l => l.level === level as CapabilityLevel);
                            if (!levelData) return null;

                            return (
                              <div key={level} className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                                <div className="font-semibold text-indigo-900 text-sm mb-3">
                                  {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                </div>
                                <ul className="space-y-2">
                                  {descriptors
                                    .sort((a, b) => a.descriptorIndex - b.descriptorIndex)
                                    .map((fa) => {
                                      const descriptor = levelData.bulletPoints[fa.descriptorIndex];
                                      if (!descriptor) return null;
                                      
                                      return (
                                        <li key={`${fa.level}-${fa.descriptorIndex}`} className="flex gap-2 text-sm text-slate-700">
                                          <span className="text-indigo-600 font-medium">✓</span>
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
                    );
                  })}
                </div>
              </div>
            )}

            {/* Growth Opportunities */}
            {completedCapabilities.some(c => getGrowthSuggestions(c.id)) && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Growth Opportunities</h2>
                  <p className="text-sm text-slate-600">
                    These are the descriptors you haven't selected yet, showing what you still need to work on
                  </p>
                </div>
                <div className="space-y-6">
                  {completedCapabilities.map((capability) => {
                    const growth = getGrowthSuggestions(capability.id);
                    const response = getResponse(capability.id);
                    if (!growth) return null;

                    const hasCurrentUnchecked = growth.currentUnchecked.length > 0;
                    const hasTargetUnchecked = growth.targetUnchecked.length > 0;

                    return (
                      <div
                        key={capability.id}
                        className="bg-white rounded-lg border border-slate-200 p-6"
                      >
                        <div className="mb-4">
                          <h3 className="font-bold text-slate-900 text-lg mb-2">{capability.name}</h3>
                          <p className="text-sm text-slate-600">
                            Moving from <span className="font-medium">{getLevelLabel(response?.currentLevel || null)}</span> to{" "}
                            <span className="font-medium">{getLevelLabel(response?.desiredLevel || null)}</span>
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          {/* Current Level - Unchecked descriptors */}
                          {hasCurrentUnchecked && (
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                              <p className="font-semibold text-blue-900 text-sm mb-3">
                                To complete {getLevelLabel(growth.currentLevel)} level ({growth.currentUnchecked.length} remaining):
                              </p>
                              <ul className="space-y-2">
                                {growth.currentUnchecked.map((item) => (
                                  <li key={`current-${item.index}`} className="flex gap-2 text-sm text-slate-700">
                                    <span className="text-blue-600 font-medium">{item.index + 1}.</span>
                                    <span>{item.point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Target Level - Unchecked descriptors */}
                          {hasTargetUnchecked && (
                            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                              <p className="font-semibold text-green-900 text-sm mb-3">
                                To reach {getLevelLabel(growth.desiredLevel)} level ({growth.targetUnchecked.length} remaining):
                              </p>
                              <ul className="space-y-2">
                                {growth.targetUnchecked.map((item) => (
                                  <li key={`target-${item.index}`} className="flex gap-2 text-sm text-slate-700">
                                    <span className="text-green-600 font-medium">{item.index + 1}.</span>
                                    <span>{item.point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* If all descriptors are already selected */}
                          {!hasCurrentUnchecked && !hasTargetUnchecked && (
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-sm text-slate-600">
                                You've already selected all descriptors from both your current and target levels as focus areas.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
