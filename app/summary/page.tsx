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

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-8">
          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 mb-6 no-print">
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
      <main className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-12">
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">{completedCapabilities.length}</div>
                <div className="text-sm text-slate-600">Capabilities Assessed</div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  {completedCapabilities.reduce((sum, c) => sum + getDemonstrated(c.id).length, 0)}
                </div>
                <div className="text-sm text-slate-600">Descriptors Demonstrated</div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {completedCapabilities.reduce((sum, c) => sum + getDevelopmentFocus(c.id).length, 0)}
                </div>
                <div className="text-sm text-slate-600">Development Focus Areas</div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {completedCapabilities.filter(c => getResponse(c.id)?.desiredLevel).length}
                </div>
                <div className="text-sm text-slate-600">Growth Targets Set</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mb-12 no-print">
              <Link
                href="/assess"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg font-medium hover:bg-amber-100 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Continue Assessment
              </Link>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Build Development Plan
              </Link>
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
                            <Link
                              href={`/assess?capability=${capability.id}`}
                              className="font-medium text-slate-900 hover:text-slate-700 hover:underline transition-colors inline-flex items-center gap-1.5"
                            >
                              {capability.name}
                              <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Development Notes Section */}
            {completedCapabilities.some(c => {
              const response = getResponse(c.id);
              return response?.notes && response.notes.trim().length > 0;
            }) && (
              <div className="bg-white rounded-lg border border-slate-200 mb-12">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900">Development Notes</h2>
                  <p className="text-sm text-slate-600 mt-1">Personal reflections and development goals for each capability</p>
                </div>
                <div className="divide-y divide-slate-200">
                  {completedCapabilities.map((capability) => {
                    const response = getResponse(capability.id);
                    if (!response?.notes || response.notes.trim().length === 0) return null;
                    
                    return (
                      <div key={capability.id} className="p-6">
                        <h3 className="font-semibold text-slate-900 mb-3">{capability.name}</h3>
                        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap break-words overflow-visible">
                          {response.notes}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Demonstrated Descriptors */}
            {completedCapabilities.some(c => getDemonstrated(c.id).length > 0) && (
              <div className="mb-12">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Demonstrated Competencies</h2>
                  <p className="text-sm text-slate-600">
                    Descriptors you marked as "I can currently demonstrate" during self-assessment
                  </p>
                </div>
                <div className="space-y-6">
                  {completedCapabilities.map((capability) => {
                    const demonstrated = getDemonstrated(capability.id);
                    
                    if (demonstrated.length === 0) return null;

                    // Group by level
                    const byLevel: Record<CapabilityLevel, SelectedDescriptor[]> = {
                      FOUNDATION: [],
                      INTERMEDIATE: [],
                      ADVANCED: [],
                      EXEMPLAR: []
                    };

                    demonstrated.forEach(d => {
                      if (byLevel[d.level]) {
                        byLevel[d.level].push(d);
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
                            {demonstrated.length} descriptor{demonstrated.length !== 1 ? 's' : ''} demonstrated
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          {Object.entries(byLevel).map(([level, descriptors]) => {
                            if (descriptors.length === 0) return null;
                            
                            const levelData = capability.levels.find(l => l.level === level as CapabilityLevel);
                            if (!levelData) return null;

                            return (
                              <div key={level} className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                                <div className="font-semibold text-amber-900 text-sm mb-3">
                                  {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                </div>
                                <ul className="space-y-2">
                                  {descriptors
                                    .sort((a, b) => a.descriptorIndex - b.descriptorIndex)
                                    .map((d) => {
                                      const descriptor = levelData.bulletPoints[d.descriptorIndex];
                                      if (!descriptor) return null;
                                      
                                      return (
                                        <li key={`${d.level}-${d.descriptorIndex}`} className="flex gap-2 text-sm text-slate-700">
                                          <span className="text-amber-600 font-medium">✓</span>
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

            {/* Development Focus Areas */}
            {completedCapabilities.some(c => getDevelopmentFocus(c.id).length > 0) && (
              <div className="mb-12">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Development Focus Areas</h2>
                  <p className="text-sm text-slate-600">
                    Specific descriptors you selected as development targets in your plan
                  </p>
                </div>
                <div className="space-y-6">
                  {completedCapabilities.map((capability) => {
                    const focus = getDevelopmentFocus(capability.id);
                    const response = getResponse(capability.id);
                    
                    if (focus.length === 0) return null;

                    // Group by level
                    const byLevel: Record<CapabilityLevel, SelectedDescriptor[]> = {
                      FOUNDATION: [],
                      INTERMEDIATE: [],
                      ADVANCED: [],
                      EXEMPLAR: []
                    };

                    focus.forEach(f => {
                      if (byLevel[f.level]) {
                        byLevel[f.level].push(f);
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
                            {focus.length} development target{focus.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          {Object.entries(byLevel).map(([level, descriptors]) => {
                            if (descriptors.length === 0) return null;
                            
                            const levelData = capability.levels.find(l => l.level === level as CapabilityLevel);
                            if (!levelData) return null;

                            return (
                              <div key={level} className="bg-green-50 rounded-lg p-4 border border-green-100">
                                <div className="font-semibold text-green-900 text-sm mb-3">
                                  {level.charAt(0) + level.slice(1).toLowerCase()} Level Target
                                </div>
                                <ul className="space-y-2">
                                  {descriptors
                                    .sort((a, b) => a.descriptorIndex - b.descriptorIndex)
                                    .map((f) => {
                                      const descriptor = levelData.bulletPoints[f.descriptorIndex];
                                      if (!descriptor) return null;
                                      
                                      return (
                                        <li key={`${f.level}-${f.descriptorIndex}`} className="flex gap-2 text-sm text-slate-700">
                                          <span className="text-green-600 font-medium">→</span>
                                          <span>{descriptor}</span>
                                        </li>
                                      );
                                    })}
                                </ul>
                              </div>
                            );
                          })}
                        </div>

                        {response?.notes && (
                          <div className="mt-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-700 mb-2">Development Notes</h4>
                            <p className="text-sm text-slate-600 whitespace-pre-wrap">{response.notes}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Call to action if no development focus yet */}
            {!completedCapabilities.some(c => getDevelopmentFocus(c.id).length > 0) && (
              <div className="bg-green-50 rounded-lg border border-green-200 p-8 text-center mb-12">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Ready to Build Your Development Plan?</h3>
                <p className="text-green-800 text-sm mb-4">
                  Based on your self-assessment, select 1–2 capabilities to focus on this year and add development notes.
                </p>
                <Link
                  href="/plan"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Build Development Plan
                </Link>
              </div>
            )}
          </>
        )}
        </div>
      </main>
    </div>
  );
}
