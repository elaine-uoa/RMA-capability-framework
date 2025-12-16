"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { capabilities } from "@/data/capabilities";
import { CapabilityNavigation } from "@/components/CapabilityNavigation";
import { CapabilitySelector } from "@/components/CapabilitySelector";
import { useAssessment } from "@/contexts/AssessmentContext";
import { CapabilityLevel, SelectedDescriptor, DescriptorAlignment } from "@/types";
import Link from "next/link";

// Framework/treaty links
const FRAMEWORK_LINKS: Record<string, string> = {
  "Te Tiriti o Waitangi": "https://nzhistory.govt.nz/politics/treaty-of-waitangi",
  "Whāia Te Hihiri": "https://www.journal.mai.ac.nz/content/te-hihiri-process-coming-know",
  // Ngā Taumata Tutuki - link to be added when available
};

const RESEARCH_HUB_URL = "https://research-hub.auckland.ac.nz/induction-skills-and-development/research-management-and-administration-rma-staff-development";

// Component for individual descriptor with DUAL checkboxes: "I can do" + "Want to develop"
function DescriptorItem({
  point,
  index,
  isDemonstrated,
  isWantToDevelop,
  onToggleDemonstrated,
  onToggleWantToDevelop,
  alignment
}: {
  point: string;
  index: number;
  isDemonstrated: boolean;
  isWantToDevelop: boolean;
  onToggleDemonstrated: () => void;
  onToggleWantToDevelop: () => void;
  alignment?: DescriptorAlignment;
}) {
  const [showAlignment, setShowAlignment] = useState(false);
  const alignmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (alignmentRef.current && !alignmentRef.current.contains(event.target as Node)) {
        setShowAlignment(false);
      }
    }
    if (showAlignment) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAlignment]);

  // Determine background color based on status
  const getBgClass = () => {
    if (isDemonstrated && isWantToDevelop) {
      return 'bg-gradient-to-r from-amber-50 to-green-50 border-2 border-amber-200';
    }
    if (isDemonstrated) {
      return 'bg-amber-50 border-2 border-amber-200';
    }
    if (isWantToDevelop) {
      return 'bg-green-50 border-2 border-green-200';
    }
    return 'hover:bg-slate-50 border-2 border-transparent';
  };

  return (
    <div className="relative">
      <div className={`p-4 rounded-lg transition-all ${getBgClass()}`}>
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-slate-700 leading-relaxed mb-3">{point}</p>
            
            {/* Dual checkbox row */}
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isDemonstrated}
                  onChange={onToggleDemonstrated}
                  className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 focus:ring-2 cursor-pointer"
                />
                <span className={`text-sm ${isDemonstrated ? 'text-amber-700 font-medium' : 'text-slate-600 group-hover:text-slate-800'}`}>
                  I can do this
                </span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isWantToDevelop}
                  onChange={onToggleWantToDevelop}
                  className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500 focus:ring-2 cursor-pointer"
                />
                <span className={`text-sm ${isWantToDevelop ? 'text-green-700 font-medium' : 'text-slate-600 group-hover:text-slate-800'}`}>
                  Want to develop
                </span>
              </label>
            </div>
          </div>
          
          {alignment && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowAlignment(!showAlignment);
              }}
              className="flex-shrink-0 ml-2 p-1.5 rounded-full hover:bg-green-100 transition-colors group"
              title="View Māori alignment & framework references"
              aria-label="View alignment information"
            >
              <svg 
                className={`w-4 h-4 ${showAlignment ? 'text-green-700' : 'text-green-600'} group-hover:text-green-700`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {alignment && showAlignment && (
        <div
          ref={alignmentRef}
          className="absolute z-50 mt-2 left-0 right-0 bg-white border-2 border-green-200 rounded-lg shadow-lg p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-2">
            <h5 className="font-semibold text-green-900 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Māori Alignment & Framework References
            </h5>
            <button
              onClick={() => setShowAlignment(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-3 italic">
            {alignment.alignmentText}
          </p>
          {alignment.frameworks && alignment.frameworks.length > 0 && (
            <div className="pt-3 border-t border-green-100">
              <p className="text-xs font-medium text-green-800 mb-1.5">Aligned to:</p>
              <div className="flex flex-wrap gap-2">
                {alignment.frameworks.map((framework, idx) => {
                  const url = FRAMEWORK_LINKS[framework];
                  if (url) {
                    return (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium border border-green-200 hover:bg-green-100 hover:border-green-300 transition-colors"
                      >
                        {framework}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    );
                  }
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium border border-green-200"
                    >
                      {framework}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LevelTabs({ 
  levels, 
  currentLevel, 
  onSelectLevel,
  selectedTab,
  setSelectedTab,
  demonstratedDescriptors,
  developmentFocus,
  onToggleDemonstrated,
  onToggleWantToDevelop
}: { 
  levels: any[], 
  currentLevel: CapabilityLevel | null, 
  onSelectLevel: (l: CapabilityLevel) => void,
  selectedTab: CapabilityLevel,
  setSelectedTab: (l: CapabilityLevel) => void,
  demonstratedDescriptors: SelectedDescriptor[],
  developmentFocus: SelectedDescriptor[],
  onToggleDemonstrated: (level: CapabilityLevel, index: number) => void,
  onToggleWantToDevelop: (level: CapabilityLevel, index: number) => void
}) {
  const levelOrder: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];
  const activeLevelData = levels.find(l => l.level === selectedTab);

  // Count demonstrated and want-to-develop per level
  const getLevelCounts = (level: CapabilityLevel) => {
    const demonstrated = demonstratedDescriptors.filter(d => d.level === level).length;
    const wantToDevelop = developmentFocus.filter(d => d.level === level).length;
    return { demonstrated, wantToDevelop };
  };

  const getLevelBgColor = (level: CapabilityLevel, isActive: boolean) => {
    if (isActive) {
      return 'bg-slate-900 text-white border-slate-900';
    }
    return 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50';
  };

  return (
    <div className="mt-8">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-amber-200 border border-amber-300"></span>
          <span className="text-slate-600">I can do this</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-green-200 border border-green-300"></span>
          <span className="text-slate-600">Want to develop</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-gradient-to-r from-amber-200 to-green-200 border border-amber-300"></span>
          <span className="text-slate-600">Both</span>
        </div>
      </div>

      {/* Tab Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        {levelOrder.map((level) => {
          const isActive = selectedTab === level;
          const isCurrent = currentLevel === level;
          const counts = getLevelCounts(level);
          
          return (
            <button
              key={level}
              onClick={() => setSelectedTab(level)}
              className={`
                relative px-6 py-3 rounded-lg font-medium text-sm border
                transition-all duration-200
                ${getLevelBgColor(level, isActive)}
              `}
            >
              <span className="flex items-center gap-2">
                {level.charAt(0) + level.slice(1).toLowerCase()}
                {isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                )}
                {(counts.demonstrated > 0 || counts.wantToDevelop > 0) && (
                  <span className={`flex items-center gap-1 text-xs ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                    {counts.demonstrated > 0 && (
                      <span className={`px-1.5 py-0.5 rounded ${isActive ? 'bg-amber-500/30' : 'bg-amber-100'}`}>
                        {counts.demonstrated}
                      </span>
                    )}
                    {counts.wantToDevelop > 0 && (
                      <span className={`px-1.5 py-0.5 rounded ${isActive ? 'bg-green-500/30' : 'bg-green-100'}`}>
                        {counts.wantToDevelop}
                      </span>
                    )}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex justify-between items-start gap-6 mb-6">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {selectedTab} Level
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()}
            </h3>
          </div>
          
          <button
            onClick={() => onSelectLevel(selectedTab)}
            className={`
              flex-shrink-0 px-6 py-3 rounded-lg font-medium text-sm 
              transition-all duration-200
              ${currentLevel === selectedTab 
                ? "bg-green-100 text-green-800 border border-green-300" 
                : "bg-slate-900 text-white hover:bg-slate-800"}
            `}
          >
            {currentLevel === selectedTab ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Current Level
              </span>
            ) : (
              "Set as Current Level"
            )}
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-slate-700">Descriptors</h4>
            <span className="text-xs text-slate-500">
              For each descriptor, indicate your status
            </span>
          </div>
          <div className="space-y-3">
            {activeLevelData?.bulletPoints.map((point: string, idx: number) => {
              const isDemonstrated = demonstratedDescriptors.some(
                d => d.level === selectedTab && d.descriptorIndex === idx
              );
              const isWantToDevelop = developmentFocus.some(
                d => d.level === selectedTab && d.descriptorIndex === idx
              );
              
              // Check if this descriptor has an alignment
              const descriptorAlignment = activeLevelData?.descriptorAlignments?.find(
                (da: DescriptorAlignment) => da.descriptorIndex === idx
              );
              
              return (
                <DescriptorItem
                  key={idx}
                  point={point}
                  index={idx}
                  isDemonstrated={isDemonstrated}
                  isWantToDevelop={isWantToDevelop}
                  onToggleDemonstrated={() => onToggleDemonstrated(selectedTab, idx)}
                  onToggleWantToDevelop={() => onToggleWantToDevelop(selectedTab, idx)}
                  alignment={descriptorAlignment}
                />
              );
            })}
          </div>
        </div>

        {/* Training Resources */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Training & Development Resources</h4>
              <p className="text-slate-600 text-sm mb-3">
                Access training materials, courses, and development resources for RMA staff.
              </p>
              <a
                href={RESEARCH_HUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
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
            {activeLevelData?.descriptorAlignments && activeLevelData.descriptorAlignments.length > 0 && (
              <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 flex-shrink-0">
                {activeLevelData.descriptorAlignments.length} descriptor{activeLevelData.descriptorAlignments.length !== 1 ? 's' : ''} with alignment info
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AssessPageContent() {
  const searchParams = useSearchParams();
  const capabilityId = searchParams?.get("capability") || capabilities[0].id;
  const capability = capabilities.find((c) => c.id === capabilityId) || capabilities[0];
  
  const { getResponse, updateResponse } = useAssessment();
  
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <AssessmentInner 
        key={capabilityId}
        capability={capability} 
        capabilityId={capabilityId}
        getResponse={getResponse}
        updateResponse={updateResponse}
      />
    </div>
  );
}

function AssessmentInner({ capability, capabilityId, getResponse, updateResponse }: any) {
  const response = getResponse(capabilityId);
  
  const [currentLevel, setCurrentLevel] = useState<CapabilityLevel | null>(response?.currentLevel || null);
  const [selectedTab, setSelectedTab] = useState<CapabilityLevel>(response?.currentLevel || "FOUNDATION");
  
  // Use demonstratedDescriptors (new) or fallback to focusAreas (legacy)
  const [demonstratedDescriptors, setDemonstratedDescriptors] = useState<SelectedDescriptor[]>(
    response?.demonstratedDescriptors || response?.focusAreas || []
  );
  
  // Development focus - what user wants to develop (NEW: selected on same page)
  const [developmentFocus, setDevelopmentFocus] = useState<SelectedDescriptor[]>(
    response?.developmentFocus || []
  );
  
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Use ref to track if this is the first render and previous capability
  const isFirstRender = useRef(true);
  const previousCapabilityId = useRef<string>(capabilityId);

  // Manual save function
  const handleSave = () => {
    setSaveStatus('saving');
    updateResponse(capabilityId, { currentLevel, demonstratedDescriptors, developmentFocus });
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 100);
  };

  // CRITICAL FIX: Only save changes after user interaction, not on mount
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Debounce the save to avoid too many updates
    setSaveStatus('saving');
    const timeoutId = setTimeout(() => {
      updateResponse(capabilityId, { currentLevel, demonstratedDescriptors, developmentFocus });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentLevel, demonstratedDescriptors, developmentFocus]); // Remove capabilityId and updateResponse from deps

  // Update local state when capability changes (but preserve selectedTab if user is viewing a different tab)
  useEffect(() => {
    // Only update state if capability actually changed
    if (previousCapabilityId.current !== capabilityId) {
      const newResponse = getResponse(capabilityId);
      setCurrentLevel(newResponse?.currentLevel || null);
      // Reset selectedTab only when switching to a new capability
      setSelectedTab(newResponse?.currentLevel || "FOUNDATION");
      setDemonstratedDescriptors(newResponse?.demonstratedDescriptors || newResponse?.focusAreas || []);
      setDevelopmentFocus(newResponse?.developmentFocus || []);
      isFirstRender.current = true; // Reset first render flag
      previousCapabilityId.current = capabilityId;
    }
  }, [capabilityId, getResponse]); // Only run when capabilityId changes

  // Toggle demonstrated descriptor selection ("I can do this")
  const handleToggleDemonstrated = (level: CapabilityLevel, index: number) => {
    setDemonstratedDescriptors(prev => {
      const existingIndex = prev.findIndex(
        d => d.level === level && d.descriptorIndex === index
      );
      
      if (existingIndex >= 0) {
        // Remove if already selected
        return prev.filter((_, idx) => idx !== existingIndex);
      } else {
        // Add if not selected
        return [...prev, { level, descriptorIndex: index }];
      }
    });
  };

  // Toggle development focus ("Want to develop")
  const handleToggleWantToDevelop = (level: CapabilityLevel, index: number) => {
    setDevelopmentFocus(prev => {
      const existingIndex = prev.findIndex(
        d => d.level === level && d.descriptorIndex === index
      );
      
      if (existingIndex >= 0) {
        // Remove if already selected
        return prev.filter((_, idx) => idx !== existingIndex);
      } else {
        // Add if not selected
        return [...prev, { level, descriptorIndex: index }];
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-8">
          {/* Capability selector and mode indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="bg-amber-50 border border-amber-100 text-amber-900 rounded-lg px-4 py-2">
              <span className="font-semibold text-sm">Self-assessment mode</span>
            </div>
            <CapabilitySelector currentCapabilityId={capabilityId} />
          </div>

          <div className="bg-amber-50 border border-amber-100 text-amber-900 rounded-lg p-4 mb-6">
            <div className="font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Self-Assessment & Development Focus
            </div>
            <p className="text-sm text-amber-800 mt-1 mb-2">
              For each descriptor, indicate: <strong className="text-amber-900">"I can do this"</strong> for behaviours you can competently demonstrate, and/or <strong className="text-green-700">"Want to develop"</strong> for areas you want to focus on. You can select both if you have some experience but want to strengthen it further.
            </p>
            <p className="text-xs text-amber-700 mt-2 italic border-t border-amber-200 pt-2">
              <strong>Note:</strong> This is a holistic assessment. If you have genuinely demonstrated a behaviour before and could still do it (even if not currently in your role), you can reasonably tick "I can do this". Previous roles and experiences count. This tool is for development and career conversations, not performance reviews.
            </p>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              {capability.name}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {capability.description}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-12">
        <LevelTabs 
          levels={capability.levels}
          currentLevel={currentLevel}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          demonstratedDescriptors={demonstratedDescriptors}
          developmentFocus={developmentFocus}
          onToggleDemonstrated={handleToggleDemonstrated}
          onToggleWantToDevelop={handleToggleWantToDevelop}
          onSelectLevel={(level) => {
            setCurrentLevel(level);
            // Don't change selectedTab - let user stay on the tab they're viewing
            // They can manually switch tabs if they want to see other levels
          }}
        />

        {/* Assessment Summary & Next Steps */}
        <div className="mt-8 bg-white rounded-lg border border-slate-200 p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Assessment Summary</h3>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Current Level</div>
              <div className="text-lg font-semibold text-slate-900">
                {currentLevel ? currentLevel.charAt(0) + currentLevel.slice(1).toLowerCase() : "Not selected"}
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="text-sm text-amber-700 mb-1">I Can Do</div>
              <div className="text-lg font-semibold text-amber-900">
                {demonstratedDescriptors.length} descriptor{demonstratedDescriptors.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-sm text-green-700 mb-1">Want to Develop</div>
              <div className="text-lg font-semibold text-green-900">
                {developmentFocus.length} descriptor{developmentFocus.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Status</div>
              <div className="text-lg font-semibold text-slate-900">
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Auto-saved'}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors text-sm"
              >
                Save Now
              </button>
              <p className="text-xs text-slate-500">
                Your assessment is saved automatically.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href="/summary"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Summary
              </Link>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                {developmentFocus.length > 0 ? `Add Notes (${developmentFocus.length} items)` : 'Development Plan'}
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12">
          <CapabilityNavigation currentCapabilityId={capabilityId} />
        </div>
        </div>
      </main>
    </div>
  );
}

export default function AssessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-slate-600">Loading...</div>
      </div>
    }>
      <AssessPageContent />
    </Suspense>
  );
}
