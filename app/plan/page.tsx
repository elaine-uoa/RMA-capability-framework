"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { capabilities } from "@/data/capabilities";
import { useAssessment } from "@/contexts/AssessmentContext";
import { CapabilityLevel, SelectedDescriptor } from "@/types";

export default function PlanPage() {
  const { assessmentState, getResponse, updateResponse } = useAssessment();
  
  // Get ALL included capabilities (with or without development focus)
  const allIncludedCapabilities = capabilities.filter((cap) => {
    const response = assessmentState.responses[cap.id];
    return response?.isIncluded || 
           (response?.currentLevel != null) ||
           (response?.developmentFocus && response.developmentFocus.length > 0);
  });

  // Get capabilities with development focus items selected (from self-assessment)
  const capabilitiesWithFocus = capabilities.filter((cap) => {
    const response = assessmentState.responses[cap.id];
    return response?.developmentFocus && response.developmentFocus.length > 0;
  });

  // Get capabilities NOT yet in assessment set (for adding new ones)
  const unassessedCapabilities = capabilities.filter((cap) => {
    const response = assessmentState.responses[cap.id];
    return !response || (response.currentLevel === null && response.isIncluded !== true);
  });

  // Development notes per capability
  const [developmentNotes, setDevelopmentNotes] = useState<Record<string, string>>({});
  
  // Active capability tab
  const [activeCapabilityTab, setActiveCapabilityTab] = useState<string | null>(null);
  
  // Save status
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load existing notes from assessment state
  useEffect(() => {
    const loadedNotes: Record<string, string> = {};
    
    capabilities.forEach(cap => {
      const response = getResponse(cap.id);
      if (response?.notes) {
        loadedNotes[cap.id] = response.notes;
      }
    });
    
    setDevelopmentNotes(loadedNotes);
    
    // Set first included capability as active (prioritize those with focus)
    if (allIncludedCapabilities.length > 0 && !activeCapabilityTab) {
      const firstWithFocus = allIncludedCapabilities.find(cap => {
        const response = assessmentState.responses[cap.id];
        return response?.developmentFocus && response.developmentFocus.length > 0;
      });
      setActiveCapabilityTab(firstWithFocus?.id || allIncludedCapabilities[0].id);
    }
  }, [getResponse, allIncludedCapabilities.length, assessmentState.responses]);

  const handleNoteChange = (capId: string, note: string) => {
    setDevelopmentNotes(prev => ({
      ...prev,
      [capId]: note
    }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    
    // Save notes for ALL included capabilities (not just those with focus)
    allIncludedCapabilities.forEach(cap => {
      const existingResponse = getResponse(cap.id);
      updateResponse(cap.id, {
        ...existingResponse,
        notes: developmentNotes[cap.id] || '',
      });
    });
    
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 100);
  };

  const getLevelLabel = (level: CapabilityLevel | null): string => {
    if (!level) return "Not set";
    return level.charAt(0) + level.slice(1).toLowerCase();
  };

  // Get descriptor text by level and index
  const getDescriptorText = (capId: string, level: CapabilityLevel, idx: number): string => {
    const capability = capabilities.find(c => c.id === capId);
    if (!capability) return "";
    const levelData = capability.levels.find(l => l.level === level);
    return levelData?.bulletPoints[idx] || "";
  };

  // Total development focus items
  const totalFocusItems = capabilitiesWithFocus.reduce((sum, cap) => {
    const response = getResponse(cap.id);
    return sum + (response?.developmentFocus?.length || 0);
  }, 0);

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-8">
          {/* Mode indicator */}
          <div className="flex items-center justify-between mb-6 no-print">
            <div className="bg-green-50 border border-green-100 text-green-900 rounded-lg px-4 py-2">
              <span className="font-semibold text-sm">Development Plan</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 text-green-900 rounded-lg p-4 mb-6 no-print">
            <div className="font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Add Reflection & Action Notes
            </div>
            <p className="text-sm text-green-800 mt-1">
              Write development notes for your included capabilities. Add specific actions, resources, or support needed to discuss with your manager.
            </p>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Development Plan</h1>
            <p className="text-slate-600">
              {allIncludedCapabilities.length > 0 ? (
                <>{allIncludedCapabilities.length} capabilit{allIncludedCapabilities.length !== 1 ? 'ies' : 'y'} included
                {totalFocusItems > 0 && <> • {totalFocusItems} development focus item{totalFocusItems !== 1 ? 's' : ''}</>}
                </>
              ) : (
                <>No capabilities included yet</>
              )}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-12">
        
        {allIncludedCapabilities.length === 0 ? (
          <div className="space-y-8">
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">No Capabilities Included Yet</h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Go to the self-assessment page to assess capabilities or include them in your development plan.
              </p>
              <Link
                href="/assess"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Go to Self-Assessment
              </Link>
            </div>
            
            {/* Quick add capabilities section */}
            {unassessedCapabilities.length > 0 && (
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Or Add Capabilities Directly</h3>
                <p className="text-sm text-slate-600 mb-4">Include capabilities to write development notes for:</p>
                <div className="flex flex-wrap gap-2">
                  {unassessedCapabilities.slice(0, 8).map(cap => (
                    <button
                      key={cap.id}
                      onClick={() => {
                        updateResponse(cap.id, {
                          capabilityId: cap.id,
                          isIncluded: true,
                          currentLevel: null,
                          demonstratedDescriptors: [],
                          developmentFocus: [],
                        });
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 hover:border-slate-400 transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      {cap.name}
                    </button>
                  ))}
                </div>
                {unassessedCapabilities.length > 8 && (
                  <p className="text-xs text-slate-500 mt-3 italic">
                    + {unassessedCapabilities.length - 8} more capabilities available. Use the "Manage All Capabilities" section on the Self-Assessment page to see all.
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Capability Tabs */}
            {allIncludedCapabilities.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {allIncludedCapabilities.map(cap => {
                  const response = getResponse(cap.id);
                  const focusCount = response?.developmentFocus?.length || 0;
                  const isActive = activeCapabilityTab === cap.id;
                  const hasFocus = focusCount > 0;
                  
                  return (
                    <button
                      key={cap.id}
                      onClick={() => setActiveCapabilityTab(cap.id)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${isActive 
                          ? 'bg-green-600 text-white' 
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'}
                      `}
                    >
                      {cap.name}
                      {hasFocus ? (
                        <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${isActive ? 'bg-green-500' : 'bg-green-100 text-green-700'}`}>
                          {focusCount}
                        </span>
                      ) : (
                        <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${isActive ? 'bg-green-400/50' : 'bg-slate-100 text-slate-500'}`}>
                          notes
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Capability Cards - Now shows ALL included capabilities */}
            {allIncludedCapabilities.map(cap => {
              const response = getResponse(cap.id);
              const developmentFocus = response?.developmentFocus || [];
              const demonstratedDescriptors = response?.demonstratedDescriptors || [];
              const note = developmentNotes[cap.id] || '';
              const isActive = allIncludedCapabilities.length === 1 || activeCapabilityTab === cap.id;
              const hasFocus = developmentFocus.length > 0;

              if (!isActive) return null;

              // Group focus items by level
              const focusByLevel: Record<CapabilityLevel, SelectedDescriptor[]> = {
                FOUNDATION: [],
                INTERMEDIATE: [],
                ADVANCED: [],
                EXEMPLAR: []
              };
              developmentFocus.forEach(f => {
                focusByLevel[f.level].push(f);
              });

              return (
                <div key={cap.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-8">
                  {/* Capability Header */}
                  <div className={`p-6 border-b border-slate-200 ${hasFocus ? 'bg-slate-50' : 'bg-indigo-50'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold text-slate-900">{cap.name}</h2>
                          {!hasFocus && (
                            <span className="text-xs bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full">
                              No focus selected
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">
                          Current level: {getLevelLabel(response?.currentLevel || null)}
                          {demonstratedDescriptors.length > 0 && <> • {demonstratedDescriptors.length} demonstrated</>}
                          {developmentFocus.length > 0 && <> • {developmentFocus.length} to develop</>}
                        </p>
                      </div>
                      <Link
                        href={`/assess?capability=${cap.id}`}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                      >
                        {hasFocus ? 'Edit' : 'Add focus items'}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Development Focus Items - only show if there are focus items */}
                    {hasFocus && (
                      <>
                        <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-green-500"></span>
                          Development Focus Areas
                        </h3>
                        
                        <div className="space-y-4 mb-6">
                          {(["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"] as CapabilityLevel[]).map(level => {
                            const levelFocus = focusByLevel[level];
                            if (levelFocus.length === 0) return null;

                            return (
                              <div key={level} className="bg-green-50 rounded-lg p-4 border border-green-100">
                                <h4 className="text-sm font-semibold text-green-800 mb-3">
                                  {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                </h4>
                                <ul className="space-y-2">
                                  {levelFocus.map((f, idx) => (
                                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                                      <span className="text-green-600 mt-1 flex-shrink-0">→</span>
                                      <span>{getDescriptorText(cap.id, f.level, f.descriptorIndex)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* Message for capabilities without focus */}
                    {!hasFocus && (
                      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 mb-6">
                        <p className="text-sm text-indigo-800">
                          <strong>No specific development focus selected yet.</strong> You can still write reflection notes below. 
                          To select specific descriptors to develop, click "Add focus items" above.
                        </p>
                      </div>
                    )}

                    {/* Already Demonstrated */}
                    {demonstratedDescriptors.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
                          <span className="w-3 h-3 rounded bg-amber-400"></span>
                          Already demonstrated ({demonstratedDescriptors.length} descriptor{demonstratedDescriptors.length !== 1 ? 's' : ''})
                        </h3>
                        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                          <ul className="space-y-1">
                            {demonstratedDescriptors.map((d, idx) => (
                              <li key={idx} className="text-sm text-slate-600 flex gap-2">
                                <span className="text-amber-600">✓</span>
                                <span>{getDescriptorText(cap.id, d.level, d.descriptorIndex)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Development Notes - ALWAYS shown for all included capabilities */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Development Actions & Reflection Notes
                      </label>
                      <p className="text-xs text-slate-500 mb-3">
                        {hasFocus 
                          ? 'Add specific actions, training, shadowing opportunities, or conversations with your manager'
                          : 'Write your thoughts on this capability - goals, aspirations, or areas you want to explore'}
                      </p>
                      <textarea
                        value={note}
                        onChange={(e) => handleNoteChange(cap.id, e.target.value)}
                        placeholder={hasFocus 
                          ? "e.g., Shadow colleague on grant applications\nAttend funder roadshow in Q2\nAsk manager about leading next team meeting\nComplete online training module on..."
                          : "e.g., I'd like to develop this capability because...\nMy goals for this area are...\nI plan to explore opportunities in..."}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y min-h-[120px] text-sm"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Summary & Actions */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    {allIncludedCapabilities.length} capabilit{allIncludedCapabilities.length !== 1 ? 'ies' : 'y'} included
                    {totalFocusItems > 0 && <> • {totalFocusItems} development focus item{totalFocusItems !== 1 ? 's' : ''}</>}
                  </p>
                  <p className="text-xs text-slate-500">
                    View the Summary page to print or save your full assessment and development plan.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Notes'}
                  </button>
                  <Link
                    href="/summary"
                    className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm inline-flex items-center gap-2"
                  >
                    View Summary
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Add More Capabilities */}
            {unassessedCapabilities.length > 0 && (
              <div className="mt-8 bg-slate-50 rounded-lg border border-slate-200 p-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Add More Capabilities</h3>
                <div className="flex flex-wrap gap-2">
                  {unassessedCapabilities.slice(0, 6).map(cap => (
                    <button
                      key={cap.id}
                      onClick={() => {
                        updateResponse(cap.id, {
                          capabilityId: cap.id,
                          isIncluded: true,
                          currentLevel: null,
                          demonstratedDescriptors: [],
                          developmentFocus: [],
                        });
                        setActiveCapabilityTab(cap.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 hover:border-slate-400 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      {cap.name}
                    </button>
                  ))}
                  {unassessedCapabilities.length > 6 && (
                    <Link
                      href="/assess"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-indigo-600 text-sm font-medium hover:text-indigo-700"
                    >
                      +{unassessedCapabilities.length - 6} more
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Back to Assessment Link */}
            <div className="mt-8 text-center no-print">
              <Link
                href="/assess"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back to Self-Assessment
              </Link>
            </div>
          </>
        )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white mt-20 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-8">
          <p className="text-sm text-slate-500 text-center">
            RMA Capability Framework • Development Plan
          </p>
        </div>
      </footer>
    </div>
  );
}
