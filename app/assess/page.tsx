"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { capabilities } from "@/data/capabilities";
import { CapabilityNavigation } from "@/components/CapabilityNavigation";
import { CapabilitySelector } from "@/components/CapabilitySelector";
import { useAssessment } from "@/contexts/AssessmentContext";
import { CapabilityLevel, SelectedDescriptor, DescriptorAlignment } from "@/types";
import Link from "next/link";

// Component for individual descriptor with alignment support
function DescriptorItem({
  point,
  index,
  isSelected,
  onToggleFocusArea,
  alignment
}: {
  point: string;
  index: number;
  isSelected: boolean;
  onToggleFocusArea: () => void;
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

  return (
    <div className="relative">
      <label
        className={`
          flex gap-3 p-3 rounded-lg cursor-pointer transition-all
          ${isSelected 
            ? 'bg-indigo-50 border-2 border-indigo-200' 
            : 'hover:bg-slate-50 border-2 border-transparent'}
        `}
      >
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleFocusArea}
            className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2 cursor-pointer"
          />
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5">
            {index + 1}
          </span>
          <span className="text-slate-700 leading-relaxed flex-1">{point}</span>
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
      </label>
      
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
                {alignment.frameworks.map((framework, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium border border-green-200"
                  >
                    {framework}
                  </span>
                ))}
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
  focusAreas,
  onToggleFocusArea
}: { 
  levels: any[], 
  currentLevel: CapabilityLevel | null, 
  onSelectLevel: (l: CapabilityLevel) => void,
  selectedTab: CapabilityLevel,
  setSelectedTab: (l: CapabilityLevel) => void,
  focusAreas: SelectedDescriptor[],
  onToggleFocusArea: (level: CapabilityLevel, index: number) => void
}) {
  const levelOrder: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];
  const activeLevelData = levels.find(l => l.level === selectedTab);

  const getLevelBgColor = (level: CapabilityLevel, isActive: boolean) => {
    if (isActive) {
      return 'bg-slate-900 text-white border-slate-900';
    }
    return 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50';
  };

  return (
    <div className="mt-8">
      {/* Tab Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        {levelOrder.map((level) => {
          const isActive = selectedTab === level;
          const isCurrent = currentLevel === level;
          
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
                Selected
              </span>
            ) : (
              "Select as Current"
            )}
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-slate-700">Key Indicators</h4>
            <span className="text-xs text-slate-500">
              Select descriptors to mark as focus areas
            </span>
          </div>
          <div className="space-y-3">
            {activeLevelData?.bulletPoints.map((point: string, idx: number) => {
              const isSelected = focusAreas.some(
                fa => fa.level === selectedTab && fa.descriptorIndex === idx
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
                  isSelected={isSelected}
                  onToggleFocusArea={() => onToggleFocusArea(selectedTab, idx)}
                  alignment={descriptorAlignment}
                />
              );
            })}
          </div>
        </div>

        {activeLevelData?.alignmentStatement && (
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-slate-900">General Māori Alignment & Te Tiriti o Waitangi</h4>
              {activeLevelData.descriptorAlignments && activeLevelData.descriptorAlignments.length > 0 && (
                <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                  {activeLevelData.descriptorAlignments.length} descriptor{activeLevelData.descriptorAlignments.length !== 1 ? 's' : ''} with specific alignments
                </span>
              )}
            </div>
            <p className="text-slate-600 leading-relaxed italic text-sm mb-2">
              {activeLevelData.alignmentStatement}
            </p>
            {activeLevelData.descriptorAlignments && activeLevelData.descriptorAlignments.length > 0 && (
              <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Some descriptors above have specific alignment statements. Click the info icon to view them.
                </span>
              </p>
            )}
          </div>
        )}
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
  const [desiredLevel, setDesiredLevel] = useState<CapabilityLevel | null>(response?.desiredLevel || null);
  const [notes, setNotes] = useState(response?.notes || "");
  const [selectedTab, setSelectedTab] = useState<CapabilityLevel>(response?.currentLevel || "FOUNDATION");
  const [focusAreas, setFocusAreas] = useState<SelectedDescriptor[]>(response?.focusAreas || []);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Use ref to track if this is the first render and previous capability
  const isFirstRender = useRef(true);
  const previousCapabilityId = useRef<string>(capabilityId);

  // Manual save function
  const handleSave = () => {
    setSaveStatus('saving');
    updateResponse(capabilityId, { currentLevel, desiredLevel, notes, focusAreas });
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
      updateResponse(capabilityId, { currentLevel, desiredLevel, notes, focusAreas });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentLevel, desiredLevel, notes, focusAreas]); // Remove capabilityId and updateResponse from deps

  // Update local state when capability changes (but preserve selectedTab if user is viewing a different tab)
  useEffect(() => {
    // Only update state if capability actually changed
    if (previousCapabilityId.current !== capabilityId) {
      const newResponse = getResponse(capabilityId);
      setCurrentLevel(newResponse?.currentLevel || null);
      setDesiredLevel(newResponse?.desiredLevel || null);
      setNotes(newResponse?.notes || "");
      // Reset selectedTab only when switching to a new capability
      setSelectedTab(newResponse?.currentLevel || "FOUNDATION");
      setFocusAreas(newResponse?.focusAreas || []);
      isFirstRender.current = true; // Reset first render flag
      previousCapabilityId.current = capabilityId;
    }
  }, [capabilityId, getResponse]); // Only run when capabilityId changes

  // Toggle focus area selection
  const handleToggleFocusArea = (level: CapabilityLevel, index: number) => {
    setFocusAreas(prev => {
      const existingIndex = prev.findIndex(
        fa => fa.level === level && fa.descriptorIndex === index
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
    <>
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <nav className="flex items-center justify-between mb-8">
            <Link 
              href="/" 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Home
            </Link>
            
            <div className="flex items-center gap-3">
              <Link
                href="/summary"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Summary
              </Link>
              <CapabilitySelector currentCapabilityId={capabilityId} />
            </div>
          </nav>

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
      <main className="max-w-5xl mx-auto px-6 py-12">
        <LevelTabs 
          levels={capability.levels}
          currentLevel={currentLevel}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          focusAreas={focusAreas}
          onToggleFocusArea={handleToggleFocusArea}
          onSelectLevel={(level) => {
            setCurrentLevel(level);
            // Don't change selectedTab - let user stay on the tab they're viewing
            // They can manually switch tabs if they want to see other levels
          }}
        />

        {/* Reflection Section */}
        <div className="mt-12 bg-white rounded-lg border border-slate-200 p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Personal Reflection</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Target / Desired Level
              </label>
              <select 
                value={desiredLevel || ""} 
                onChange={(e) => setDesiredLevel(e.target.value ? e.target.value as CapabilityLevel : null)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 bg-white transition-all"
              >
                <option value="">Select a target level (optional)</option>
                <option value="FOUNDATION">Foundation</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
                <option value="EXEMPLAR">Exemplar</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-slate-700">
                  Development Notes
                </label>
                <span className={`text-xs font-medium ${
                  notes.length > 500 ? 'text-red-600' : 
                  notes.length > 400 ? 'text-amber-600' : 
                  'text-slate-500'
                }`}>
                  {notes.length} / 500 characters
                </span>
              </div>
              <textarea
                value={notes}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setNotes(e.target.value);
                  }
                }}
                placeholder="Capture your thoughts, evidence, or development goals (max 500 characters)..."
                maxLength={500}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-y min-h-[120px] transition-all ${
                  notes.length > 500 ? 'border-red-300 bg-red-50' : 
                  notes.length > 400 ? 'border-amber-300' : 
                  'border-slate-200'
                }`}
              />
              {notes.length >= 500 && (
                <p className="text-xs text-red-600 mt-1">Character limit reached</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {saveStatus === 'saving' && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                )}
                {saveStatus === 'saved' && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Saved</span>
                  </div>
                )}
                {saveStatus === 'idle' && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Auto-saved</span>
                  </div>
                )}
                <button
                  onClick={handleSave}
                  className="ml-4 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors text-sm"
                >
                  Save Now
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <Link
                  href="/summary"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Go to Summary Report
                </Link>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-3">
              Your assessment for this capability is saved automatically. You can return to this page anytime to update your responses.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12">
          <CapabilityNavigation currentCapabilityId={capabilityId} />
        </div>
      </main>
    </>
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
