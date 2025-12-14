"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { capabilities } from "@/data/capabilities";
import { useAssessment } from "@/contexts/AssessmentContext";
import { CapabilityLevel, SelectedDescriptor } from "@/types";

export default function PlanPage() {
  const { assessmentState, getResponse, updateResponse } = useAssessment();
  
  // Get all assessed capabilities
  const assessedCapabilities = capabilities.filter((cap) => {
    const response = getResponse(cap.id);
    return response && response.currentLevel !== null;
  });

  // Selected capabilities for development focus (max 2)
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  
  // Active capability tab in Step 2
  const [activeCapabilityTab, setActiveCapabilityTab] = useState<string | null>(null);
  
  // Development focus selections per capability
  const [developmentFocus, setDevelopmentFocus] = useState<Record<string, SelectedDescriptor[]>>({});
  
  // Development notes per capability
  const [developmentNotes, setDevelopmentNotes] = useState<Record<string, string>>({});

  // Load existing development focus from assessment state
  useEffect(() => {
    const loadedFocus: Record<string, SelectedDescriptor[]> = {};
    const loadedNotes: Record<string, string> = {};
    const loadedSelected: string[] = [];
    
    capabilities.forEach(cap => {
      const response = getResponse(cap.id);
      if (response?.developmentFocus && response.developmentFocus.length > 0) {
        loadedFocus[cap.id] = response.developmentFocus;
        loadedSelected.push(cap.id);
      }
      if (response?.notes) {
        loadedNotes[cap.id] = response.notes;
      }
      // Also check desiredLevel for backward compatibility
      if (response?.desiredLevel) {
        loadedNotes[cap.id] = response.notes || '';
      }
    });
    
    setDevelopmentFocus(loadedFocus);
    setDevelopmentNotes(loadedNotes);
    if (loadedSelected.length > 0) {
      setSelectedCapabilities(loadedSelected);
      setActiveCapabilityTab(loadedSelected[0]);
    }
  }, [getResponse]);

  // Ensure active tab is set when capabilities are selected
  useEffect(() => {
    if (selectedCapabilities.length > 0 && !activeCapabilityTab) {
      setActiveCapabilityTab(selectedCapabilities[0]);
    }
  }, [selectedCapabilities, activeCapabilityTab]);

  const handleToggleCapability = (capId: string) => {
    setSelectedCapabilities(prev => {
      if (prev.includes(capId)) {
        // Removing a capability
        const newSelected = prev.filter(id => id !== capId);
        // Update active tab if we removed the active one
        if (activeCapabilityTab === capId) {
          setActiveCapabilityTab(newSelected.length > 0 ? newSelected[0] : null);
        }
        return newSelected;
      } else {
        // Adding a capability - set it as active tab
        setActiveCapabilityTab(capId);
        return [...prev, capId];
      }
    });
  };

  const handleToggleFocus = (capId: string, level: CapabilityLevel, descriptorIndex: number) => {
    setDevelopmentFocus(prev => {
      const current = prev[capId] || [];
      const exists = current.some(d => d.level === level && d.descriptorIndex === descriptorIndex);
      
      if (exists) {
        return {
          ...prev,
          [capId]: current.filter(d => !(d.level === level && d.descriptorIndex === descriptorIndex))
        };
      } else {
        return {
          ...prev,
          [capId]: [...current, { level, descriptorIndex }]
        };
      }
    });
  };

  const handleNoteChange = (capId: string, note: string) => {
    setDevelopmentNotes(prev => ({
      ...prev,
      [capId]: note
    }));
  };

  const handleSave = () => {
    // Save development focus and notes for each selected capability
    selectedCapabilities.forEach(capId => {
      updateResponse(capId, {
        developmentFocus: developmentFocus[capId] || [],
        notes: developmentNotes[capId] || '',
        desiredLevel: getDesiredLevel(capId),
      });
    });
  };

  const getDesiredLevel = (capId: string): CapabilityLevel | null => {
    const focus = developmentFocus[capId] || [];
    if (focus.length === 0) return null;
    // Get the highest level from focus areas
    const levels: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];
    let highest = 0;
    focus.forEach(f => {
      const idx = levels.indexOf(f.level);
      if (idx > highest) highest = idx;
    });
    return levels[highest];
  };

  const getLevelLabel = (level: CapabilityLevel | null): string => {
    if (!level) return "Not set";
    return level.charAt(0) + level.slice(1).toLowerCase();
  };

  // Get gaps (descriptors not yet demonstrated) for a capability
  const getGaps = (capId: string) => {
    const response = getResponse(capId);
    const demonstrated = response?.demonstratedDescriptors || response?.focusAreas || [];
    const capability = capabilities.find(c => c.id === capId);
    if (!capability) return [];

    const gaps: { level: CapabilityLevel; descriptorIndex: number; text: string }[] = [];
    
    capability.levels.forEach(levelData => {
      levelData.bulletPoints.forEach((point, idx) => {
        const isDemonstrated = demonstrated.some(
          d => d.level === levelData.level && d.descriptorIndex === idx
        );
        if (!isDemonstrated) {
          gaps.push({
            level: levelData.level,
            descriptorIndex: idx,
            text: point
          });
        }
      });
    });

    return gaps;
  };

  const totalFocusItems = Object.values(developmentFocus).reduce(
    (sum, items) => sum + items.length, 0
  );

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-8">
          {/* Mode indicator and save button */}
          <div className="flex items-center justify-between mb-6 no-print">
            <div className="bg-green-50 border border-green-100 text-green-900 rounded-lg px-4 py-2">
              <span className="font-semibold text-sm">Development Plan Builder</span>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Save Plan
            </button>
          </div>

          <div className="bg-green-50 border border-green-100 text-green-900 rounded-lg p-4 mb-6 no-print">
            <div className="font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Development Plan Builder
            </div>
            <p className="text-sm text-green-800 mt-1">
              Select the capabilities you want to focus on. Choose specific descriptors as development targets and add notes for your manager discussions.
            </p>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Development Plan</h1>
            <p className="text-slate-600">
              Last updated: {new Date(assessmentState.lastUpdated).toLocaleDateString('en-NZ', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-12">
        {assessedCapabilities.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Complete Your Assessment First</h2>
            <p className="text-slate-600 mb-6">
              You need to complete at least one capability assessment before building a development plan.
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
            {/* Step 1: Select Capabilities */}
            <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Step 1: Select Capabilities to Develop
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Choose the capabilities you want to focus on for your development plan.
                  </p>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                  {selectedCapabilities.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assessedCapabilities.map(cap => {
                  const response = getResponse(cap.id);
                  const isSelected = selectedCapabilities.includes(cap.id);
                  const gaps = getGaps(cap.id);
                  
                  return (
                    <button
                      key={cap.id}
                      onClick={() => handleToggleCapability(cap.id)}
                      className={`
                        text-left p-4 rounded-lg border-2 transition-all
                        ${isSelected 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                      `}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">{cap.name}</h3>
                          <p className="text-sm text-slate-600">
                            Current: {getLevelLabel(response?.currentLevel || null)} • {gaps.length} development opportunities
                          </p>
                        </div>
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                          ${isSelected ? 'border-green-500 bg-green-500' : 'border-slate-300'}
                        `}>
                          {isSelected && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Development Focus */}
            {selectedCapabilities.length > 0 && (
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-8">
                <div className="p-8 pb-0">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Step 2: Choose Development Focus Areas
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Select specific descriptors you want to develop. These are descriptors you haven't demonstrated yet.
                  </p>
                </div>

                {/* Capability Tabs */}
                {selectedCapabilities.length > 1 && (
                  <div className="flex border-b border-slate-200 mt-6 px-8">
                    {selectedCapabilities.map(capId => {
                      const capability = capabilities.find(c => c.id === capId);
                      const focus = developmentFocus[capId] || [];
                      const isActive = activeCapabilityTab === capId;
                      
                      return (
                        <button
                          key={capId}
                          onClick={() => setActiveCapabilityTab(capId)}
                          className={`
                            relative px-6 py-4 text-sm font-medium transition-colors
                            ${isActive 
                              ? 'text-green-700' 
                              : 'text-slate-600 hover:text-slate-900'}
                          `}
                        >
                          <span className="flex items-center gap-2">
                            {capability?.name}
                            {focus.length > 0 && (
                              <span className={`
                                px-2 py-0.5 rounded-full text-xs font-semibold
                                ${isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}
                              `}>
                                {focus.length}
                              </span>
                            )}
                          </span>
                          {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Active Capability Content */}
                <div className="p-8">
                  {selectedCapabilities.map(capId => {
                    const capability = capabilities.find(c => c.id === capId);
                    const gaps = getGaps(capId);
                    const focus = developmentFocus[capId] || [];
                    const note = developmentNotes[capId] || '';
                    const isActive = selectedCapabilities.length === 1 || activeCapabilityTab === capId;

                    if (!capability || !isActive) return null;

                    // Group gaps by level
                    const gapsByLevel: Record<CapabilityLevel, typeof gaps> = {
                      FOUNDATION: [],
                      INTERMEDIATE: [],
                      ADVANCED: [],
                      EXEMPLAR: []
                    };
                    gaps.forEach(gap => {
                      gapsByLevel[gap.level].push(gap);
                    });

                    return (
                      <div key={capId}>
                        {selectedCapabilities.length === 1 && (
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">{capability.name}</h3>
                        )}
                        
                        {gaps.length === 0 ? (
                          <p className="text-slate-600 text-sm bg-green-50 p-4 rounded-lg">
                            You've demonstrated all descriptors for this capability. Consider selecting a different capability or setting stretch goals.
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {(["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"] as CapabilityLevel[]).map(level => {
                              const levelGaps = gapsByLevel[level];
                              if (levelGaps.length === 0) return null;

                              return (
                                <div key={level} className="bg-slate-50 rounded-lg p-4">
                                  <h4 className="text-sm font-semibold text-slate-700 mb-3">
                                    {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                  </h4>
                                  <div className="space-y-2">
                                    {levelGaps.map((gap, idx) => {
                                      const isSelected = focus.some(
                                        f => f.level === gap.level && f.descriptorIndex === gap.descriptorIndex
                                      );
                                      return (
                                        <label
                                          key={idx}
                                          className={`
                                            flex gap-3 p-3 rounded-lg cursor-pointer transition-all bg-white
                                            ${isSelected 
                                              ? 'ring-2 ring-green-500 bg-green-50' 
                                              : 'hover:bg-slate-100 border border-slate-200'}
                                          `}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleToggleFocus(capId, gap.level, gap.descriptorIndex)}
                                            className="mt-1 w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500 focus:ring-2 cursor-pointer"
                                          />
                                          <span className="text-slate-700 text-sm leading-relaxed">{gap.text}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Development Notes */}
                        <div className="mt-6">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Development Notes for {capability.name}
                          </label>
                          <textarea
                            value={note}
                            onChange={(e) => handleNoteChange(capId, e.target.value)}
                            placeholder="Add specific actions, resources, or support needed (e.g., 'Shadow colleague on complex contracts', 'Ask manager to join funder roadshows')..."
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y min-h-[100px] text-sm"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Plan Summary */}
            {selectedCapabilities.length > 0 && totalFocusItems > 0 && (
              <div className="bg-white rounded-lg border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Development Plan Summary</h2>
                  <span className="text-sm text-slate-600">
                    {totalFocusItems} focus area{totalFocusItems !== 1 ? 's' : ''} selected
                  </span>
                </div>

                <div className="space-y-6">
                  {selectedCapabilities.map(capId => {
                    const capability = capabilities.find(c => c.id === capId);
                    const focus = developmentFocus[capId] || [];
                    const note = developmentNotes[capId] || '';
                    const response = getResponse(capId);

                    if (!capability || focus.length === 0) return null;

                    // Group by level
                    const focusByLevel: Record<CapabilityLevel, typeof focus> = {
                      FOUNDATION: [],
                      INTERMEDIATE: [],
                      ADVANCED: [],
                      EXEMPLAR: []
                    };
                    focus.forEach(f => {
                      focusByLevel[f.level].push(f);
                    });

                    return (
                      <div key={capId} className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-slate-900">{capability.name}</h3>
                          <span className="text-sm text-slate-600">
                            Current: {getLevelLabel(response?.currentLevel || null)}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          {(["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"] as CapabilityLevel[]).map(level => {
                            const levelFocus = focusByLevel[level];
                            if (levelFocus.length === 0) return null;

                            const levelData = capability.levels.find(l => l.level === level);
                            if (!levelData) return null;

                            return (
                              <div key={level} className="bg-green-50 rounded-lg p-4 border border-green-100">
                                <h4 className="text-sm font-semibold text-green-800 mb-2">
                                  {level.charAt(0) + level.slice(1).toLowerCase()} Level Target
                                </h4>
                                <ul className="space-y-2">
                                  {levelFocus.map((f, idx) => (
                                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                                      <span className="text-green-600">•</span>
                                      <span>{levelData.bulletPoints[f.descriptorIndex]}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>

                        {note && (
                          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-700 mb-2">Development Actions</h4>
                            <p className="text-sm text-slate-600 whitespace-pre-wrap">{note}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      Go to the Summary page to print or save your full assessment and development plan.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors text-sm"
                      >
                        Save Plan
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
              </div>
            )}

            {/* View Full Summary Link */}
            <div className="mt-8 text-center no-print">
              <Link
                href="/summary"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Full Assessment Summary
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
