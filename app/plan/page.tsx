"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { capabilities } from "@/data/capabilities";
import { useAssessment } from "@/contexts/AssessmentContext";
import { CapabilityLevel, SelectedDescriptor } from "@/types";

export default function PlanPage() {
  const { assessmentState, getResponse, updateResponse, removeCapability } = useAssessment();
  
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

  // Get capabilities NOT yet assessed (user hasn't ticked any descriptors)
  // A capability is unassessed if:
  // - Not explicitly included in the plan
  // - No demonstrated descriptors ticked
  // - No development focus descriptors ticked
  const unassessedCapabilities = capabilities.filter((cap) => {
    const response = assessmentState.responses[cap.id];
    // If explicitly included, it's already in the plan
    if (response?.isIncluded === true) return false;
    // If user has ticked any "I can do this" descriptors, it's assessed
    if (response?.demonstratedDescriptors && response.demonstratedDescriptors.length > 0) return false;
    // If user has ticked any "Want to develop" descriptors, it's assessed
    if (response?.developmentFocus && response.developmentFocus.length > 0) return false;
    // Otherwise, it's unassessed
    return true;
  });

  // Development notes per capability
  const [developmentNotes, setDevelopmentNotes] = useState<Record<string, string>>({});
  
  // Active capability tab
  const [activeCapabilityTab, setActiveCapabilityTab] = useState<string | null>(null);
  
  // Save status
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  // Confirmation dialog for removing capability
  const [capabilityToRemove, setCapabilityToRemove] = useState<{ id: string; name: string } | null>(null);

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
    
    // Set first included capability as active (prioritise those with focus)
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

  const handleRemoveCapability = (capabilityId: string) => {
    // Remove from context (clears all data: descriptors, notes, etc.)
    removeCapability(capabilityId);
    
    // Clear local notes state
    setDevelopmentNotes(prev => {
      const updated = { ...prev };
      delete updated[capabilityId];
      return updated;
    });
    
    // Close confirmation dialog
    setCapabilityToRemove(null);
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
    <div className="w-full min-h-screen bg-[#f3f3f6] flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-[#d9d9d9] flex justify-center">
        <div className="w-full max-w-[1140px] px-8 lg:px-12 py-8">
          <div className="bg-[#00877C]/10 border border-[#00877C]/20 text-[#4a4a4c] rounded-lg p-4 mb-6 no-print">
            <div className="font-semibold flex items-center gap-2 text-[#00877C]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Add Reflection & Action Notes
            </div>
            <p className="text-sm text-[#4a4a4c] mt-1">
              Write development notes for your included capabilities. Add specific actions, resources, or support needed for your development conversation.
            </p>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#4a4a4c] mb-2">Development Plan</h1>
            <p className="text-[#6d6e71]">
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
        <div className="w-full max-w-[1140px] px-8 lg:px-12 py-12 md:py-16">
        
        {allIncludedCapabilities.length === 0 ? (
          <div className="space-y-12">
            <div className="bg-white rounded-lg border border-[#d9d9d9] p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#00877C]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#00877C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#4a4a4c] mb-2">No Capabilities Included Yet</h2>
              <p className="text-[#6d6e71] mb-6 max-w-md mx-auto">
                Go to the self-assessment page to assess capabilities or include them in your development plan.
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
            
            {/* Quick add capabilities section */}
            {unassessedCapabilities.length > 0 && (
              <div className="bg-[#f3f3f6] rounded-lg border border-[#e2e3e4] p-6">
                <h3 className="text-lg font-semibold text-[#4a4a4c] mb-3">Or Add Capabilities Directly</h3>
                <p className="text-sm text-[#6d6e71] mb-4">Include capabilities to write development notes for:</p>
                <div className="flex flex-wrap gap-3">
                  {unassessedCapabilities.map(cap => (
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
                      className="inline-flex items-center gap-2 bg-white border border-[#d9d9d9] text-[#4a4a4c] rounded-lg font-semibold hover:bg-[#f3f3f6] hover:border-[#1f2bd4] transition-colors"
                      style={{
                        padding: '12px 24px',
                        fontSize: '15px'
                      }}
                    >
                      <svg className="w-4 h-4 text-[#6d6e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      {cap.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Capability Tabs */}
            {allIncludedCapabilities.length > 1 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {allIncludedCapabilities.map(cap => {
                  const response = getResponse(cap.id);
                  const focusCount = response?.developmentFocus?.length || 0;
                  const isActive = activeCapabilityTab === cap.id;
                  const hasFocus = focusCount > 0;
                  
                  return (
                    <button
                      key={cap.id}
                      onClick={() => setActiveCapabilityTab(cap.id)}
                      style={{
                        padding: '14px 28px'
                      }}
                      className={`
                        rounded-lg text-base font-semibold transition-all
                        ${isActive 
                          ? 'bg-[#00877C] text-white' 
                          : 'bg-white border border-[#d9d9d9] text-[#4a4a4c] hover:border-[#1f2bd4] hover:text-[#1f2bd4]'}
                      `}
                    >
                      {cap.name}
                      {hasFocus ? (
                        <span 
                          className={`ml-3 rounded-full text-xs font-bold ${isActive ? 'bg-white text-[#00877C]' : 'bg-[#00877C] text-white'}`}
                          style={{ 
                            padding: '6px 14px',
                            minWidth: '28px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {focusCount}
                        </span>
                      ) : (
                        <span 
                          className={`ml-3 rounded-full text-xs font-semibold uppercase tracking-wide ${isActive ? 'bg-white/30 text-white' : 'bg-[#1f2bd4]/10 text-[#1f2bd4] border border-[#1f2bd4]/30'}`}
                          style={{ 
                            padding: '6px 14px'
                          }}
                        >
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

              // Group demonstrated descriptors by level
              const demonstratedByLevel: Record<CapabilityLevel, SelectedDescriptor[]> = {
                FOUNDATION: [],
                INTERMEDIATE: [],
                ADVANCED: [],
                EXEMPLAR: []
              };
              demonstratedDescriptors.forEach(d => {
                demonstratedByLevel[d.level].push(d);
              });

              return (
                <div key={cap.id} className="bg-white rounded-lg border border-[#d9d9d9] overflow-hidden" style={{ marginBottom: '48px' }}>
                  {/* Capability Header */}
                  <div className={`p-6 border-b border-[#e2e3e4] ${hasFocus ? 'bg-[#f3f3f6]' : 'bg-[#1f2bd4]/10'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold text-[#4a4a4c]">{cap.name}</h2>
                          {!hasFocus && (
                            <span className="text-xs bg-[#1f2bd4]/20 text-[#1f2bd4] px-2 py-0.5 rounded-full font-medium">
                              No focus selected
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#6d6e71]">
                          {demonstratedDescriptors.length > 0 && <>{demonstratedDescriptors.length} demonstrated</>}
                          {demonstratedDescriptors.length > 0 && developmentFocus.length > 0 && <> • </>}
                          {developmentFocus.length > 0 && <>{developmentFocus.length} to develop</>}
                          {demonstratedDescriptors.length === 0 && developmentFocus.length === 0 && <>No descriptors selected</>}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/assess?capability=${cap.id}`}
                          className="text-sm text-[#1f2bd4] hover:text-[#0c0c48] font-medium flex items-center gap-1"
                        >
                          {hasFocus ? 'Edit' : 'Add focus items'}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => setCapabilityToRemove({ id: cap.id, name: cap.name })}
                          className="text-sm text-[#d32f2f] hover:text-[#b71c1c] font-medium flex items-center gap-1 transition-colors"
                          title="Remove this capability"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Development Focus Items - only show if there are focus items */}
                    {hasFocus && (
                      <>
                        <h3 className="text-sm font-semibold text-[#4a4a4c] flex items-center gap-2" style={{ marginBottom: '20px' }}>
                          <span className="w-3 h-3 rounded bg-[#00877C]"></span>
                          Development Focus Areas
                        </h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                          {(["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"] as CapabilityLevel[]).map(level => {
                            const levelFocus = focusByLevel[level];
                            if (levelFocus.length === 0) return null;

                            return (
                              <div key={level} className="bg-[#00877C]/10 rounded-lg border border-[#00877C]/20" style={{ padding: '20px' }}>
                                <h4 className="text-sm font-semibold text-[#00877C]" style={{ marginBottom: '16px' }}>
                                  {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                </h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                  {levelFocus.map((f, idx) => (
                                    <li key={idx} className="flex gap-2 text-sm text-[#4a4a4c]">
                                      <span className="text-[#00877C] mt-1 flex-shrink-0">→</span>
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
                      <div className="bg-[#1f2bd4]/10 rounded-lg p-4 border border-[#1f2bd4]/20" style={{ marginBottom: '32px' }}>
                        <p className="text-sm text-[#4a4a4c]">
                          <strong>No specific development focus selected yet.</strong> You can still write reflection notes below. 
                          To select specific descriptors to develop, click "Add focus items" above.
                        </p>
                      </div>
                    )}

                    {/* Already Demonstrated - Collapsible, default collapsed to keep focus on development */}
                    {demonstratedDescriptors.length > 0 && (
                      <details style={{ marginBottom: '32px' }}>
                        <summary className="text-sm font-semibold text-[#4a4a4c] flex items-center gap-2 cursor-pointer select-none list-none" style={{ marginBottom: '20px' }}>
                          <svg className="w-4 h-4 text-[#6d6e71] transition-transform details-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="w-3 h-3 rounded bg-[#EAAB00]"></span>
                          Already Demonstrated ({demonstratedDescriptors.length} descriptor{demonstratedDescriptors.length !== 1 ? 's' : ''})
                          <span className="text-xs font-normal text-[#6d6e71] ml-1">— click to expand</span>
                        </summary>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          {(["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"] as CapabilityLevel[]).map(level => {
                            const levelDemonstrated = demonstratedDescriptors.filter(d => d.level === level);
                            if (levelDemonstrated.length === 0) return null;

                            return (
                              <div key={level} className="bg-[#EAAB00]/10 rounded-lg border border-[#EAAB00]/30" style={{ padding: '20px' }}>
                                <h4 className="text-sm font-semibold text-[#9a7100]" style={{ marginBottom: '16px' }}>
                                  {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                </h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                  {levelDemonstrated.map((d, idx) => (
                                    <li key={idx} className="flex gap-2 text-sm text-[#4a4a4c]">
                                      <span className="text-[#9a7100] mt-1 flex-shrink-0">✓</span>
                                      <span>{getDescriptorText(cap.id, d.level, d.descriptorIndex)}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </details>
                    )}

                    {/* Development Notes - ALWAYS shown for all included capabilities */}
                    <div style={{ marginTop: '32px' }}>
                      <label className="block text-base font-semibold text-[#4a4a4c]" style={{ marginBottom: '12px' }}>
                        Development Actions & Reflection Notes
                      </label>
                      <p className="text-sm text-[#6d6e71]" style={{ marginBottom: '16px' }}>
                        {hasFocus 
                          ? 'Add specific actions, training, shadowing opportunities, or topics for your development conversation'
                          : 'Write your thoughts on this capability - goals, aspirations, or areas you want to explore'}
                      </p>
                      <textarea
                        value={note}
                        onChange={(e) => handleNoteChange(cap.id, e.target.value)}
                        placeholder={hasFocus 
                          ? "e.g., Shadow colleague on grant applications\nAttend funder roadshow in Q2\nDiscuss leading next team meeting in development conversation\nComplete online training module on..."
                          : "e.g., I'd like to develop this capability because...\nMy goals for this area are...\nI plan to explore opportunities in..."}
                        className="w-full border-2 border-[#d9d9d9] rounded-lg focus:ring-2 focus:ring-[#1f2bd4] focus:border-[#1f2bd4] resize-y text-[#4a4a4c] placeholder:text-[#afafc3]"
                        style={{
                          padding: '24px 28px',
                          minHeight: '200px',
                          fontSize: '16px',
                          lineHeight: '1.7',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Summary & Actions */}
            <div className="bg-white rounded-lg border border-[#d9d9d9] p-6" style={{ marginTop: '48px' }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[#4a4a4c] mb-1">
                    {allIncludedCapabilities.length} capabilit{allIncludedCapabilities.length !== 1 ? 'ies' : 'y'} included
                    {totalFocusItems > 0 && <> • {totalFocusItems} development focus item{totalFocusItems !== 1 ? 's' : ''}</>}
                  </p>
                  <p className="text-xs text-[#6d6e71]">
                    View the Summary page to print or save your full assessment and development plan.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSave}
                    className="bg-[#00877C] text-white rounded-lg font-semibold hover:bg-[#006b62] transition-colors flex items-center gap-2"
                    style={{
                        padding: '14px 28px',
                      fontSize: '15px'
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Notes'}
                  </button>
                  <Link
                    href="/summary"
                    className="bg-[#1f2bd4] rounded-lg font-semibold hover:bg-[#1929a8] transition-colors inline-flex items-center gap-2"
                    style={{ 
                      color: 'white',
                        padding: '14px 28px',
                      fontSize: '15px'
                    }}
                  >
                    View Summary
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Add More Capabilities */}
            {unassessedCapabilities.length > 0 && (
              <div className="bg-[#f3f3f6] rounded-lg border border-[#e2e3e4] p-6" style={{ marginTop: '48px' }}>
                <h3 className="text-sm font-semibold text-[#4a4a4c] mb-3">Add More Capabilities</h3>
                <p className="text-xs text-[#6d6e71] mb-4">
                  Capabilities you haven't assessed yet. Click to add them to your development plan.
                </p>
                <div className="flex flex-wrap gap-3">
                  {unassessedCapabilities.map(cap => (
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
                      className="inline-flex items-center gap-2 bg-white border border-[#d9d9d9] text-[#4a4a4c] rounded-lg font-semibold hover:bg-[#f3f3f6] hover:border-[#1f2bd4] transition-colors"
                      style={{
                        padding: '12px 24px',
                        fontSize: '15px'
                      }}
                    >
                      <svg className="w-4 h-4 text-[#6d6e71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      {cap.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Training Resources */}
            <div className="bg-[#f3f3f6] rounded-lg p-6 md:p-7 border border-[#e2e3e4]" style={{ marginTop: '64px', marginBottom: '48px' }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-[#4a4a4c] mb-2">Training & Development Resources</h4>
                  <p className="text-[#6d6e71] text-sm mb-3">
                    Access training materials, courses, and development resources for RMA staff.
                  </p>
                  <a
                    href="https://research-hub.auckland.ac.nz/induction-skills-and-development/research-management-and-administration-rma-staff-development"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#1f2bd4] hover:text-[#0c0c48] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Visit Research Hub – RMA Staff Development
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Back to Assessment Link */}
            <div className="text-center no-print" style={{ marginTop: '48px' }}>
              <Link
                href="/assess"
                className="inline-flex items-center gap-2 text-[#6d6e71] hover:text-[#0c0c48] transition-colors font-medium"
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
      <footer className="w-full border-t border-[#d9d9d9] bg-white mt-20 flex justify-center">
        <div className="w-full max-w-[1140px] px-8 lg:px-12 py-8">
          <p className="text-sm text-[#6d6e71] text-center">
            RMA Capability Framework • Development Plan
          </p>
        </div>
      </footer>

      {/* Confirmation Modal for Removing Capability */}
      {capabilityToRemove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setCapabilityToRemove(null)}>
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '32px' }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#d32f2f]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#d32f2f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[#4a4a4c] mb-2">
                  Remove Capability?
                </h3>
                <p className="text-sm text-[#6d6e71] mb-1">
                  Are you sure you want to remove <strong>{capabilityToRemove.name}</strong> from your development plan?
                </p>
                <p className="text-sm text-[#6d6e71]">
                  This will delete all associated data including selected descriptors and reflection notes. This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setCapabilityToRemove(null)}
                className="bg-white text-[#4a4a4c] border-2 border-[#d9d9d9] rounded-lg hover:bg-[#f3f3f6] transition-colors font-medium"
                style={{ padding: '10px 20px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveCapability(capabilityToRemove.id)}
                className="bg-[#d32f2f] text-white rounded-lg hover:bg-[#b71c1c] transition-colors font-medium"
                style={{ padding: '10px 20px' }}
              >
                Remove Capability
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
