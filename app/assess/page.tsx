"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { capabilities } from "@/data/capabilities";
import { CapabilityNavigation } from "@/components/CapabilityNavigation";
import { CapabilitySelector } from "@/components/CapabilitySelector";
import { useAssessment } from "@/contexts/AssessmentContext";
import { CapabilityLevel, SelectedDescriptor } from "@/types";
import { useGuidedFilter } from "@/hooks/useGuidedFilter";
import { roles, functions } from "@/data/roleFilters";
import Link from "next/link";

// Map capabilities to their key area colours (from homepage)
const CAPABILITY_COLORS: Record<string, { main: string; hover: string }> = {
  "research-engagement": { main: "#0c0c48", hover: "#0a0a3a" },        // Navy
  "maximising-impact": { main: "#0c0c48", hover: "#0a0a3a" },          // Navy
  "researcher-development": { main: "#00877C", hover: "#006b63" },     // Teal
  "environment-culture": { main: "#00877C", hover: "#006b63" },        // Teal
  "funding-opportunities": { main: "#1f2bd4", hover: "#1929a8" },      // Blue
  "proposal-support": { main: "#1f2bd4", hover: "#1929a8" },           // Blue
  "initiation": { main: "#D97706", hover: "#b86205" },                 // Orange
  "projects-initiatives": { main: "#D97706", hover: "#b86205" },       // Orange
  "monitoring-reporting": { main: "#4F2D7F", hover: "#3e2465" },       // Purple
  "policy-strategy": { main: "#4F2D7F", hover: "#3e2465" },            // Purple
};

// Component for individual descriptor with DUAL checkboxes: "I can do" + "Want to develop"
function DescriptorItem({
  point,
  index,
  isDemonstrated,
  isWantToDevelop,
  onToggleDemonstrated,
  onToggleWantToDevelop,
  levelColor,
  isRelevant = false,
  showAlignmentIndicator = false,
}: {
  point: string;
  index: number;
  isDemonstrated: boolean;
  isWantToDevelop: boolean;
  onToggleDemonstrated: () => void;
  onToggleWantToDevelop: () => void;
  levelColor: string;
  isRelevant?: boolean;
  showAlignmentIndicator?: boolean;
}) {

  // Determine background colour based on status - UoA colours
  const getBgClass = () => {
    if (isDemonstrated && isWantToDevelop) {
      return 'bg-gradient-to-r from-[#00877C]/10 to-[#EAAB00]/10 border-2 border-[#00877C]/30';
    }
    if (isDemonstrated) {
      return 'bg-[#00877C]/10 border-2 border-[#00877C]/30';
    }
    if (isWantToDevelop) {
      return 'bg-[#EAAB00]/10 border-2 border-[#EAAB00]/30';
    }
    return 'hover:bg-[#f3f3f6] border-2 border-transparent';
  };

  return (
    <div className="relative">
      <div className={`descriptor-card-padding rounded-2xl transition-all shadow-sm hover:shadow-md ${getBgClass()}`} style={{ padding: '40px 48px' }}>
        {showAlignmentIndicator && (
          <div
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#00877C]/20 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg className="w-3.5 h-3.5 text-[#00877C]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <div className="flex-1 min-w-0">
          {isRelevant && (
            <div
              className="inline-flex items-center gap-1 rounded-full border border-[#1f2bd4]/30 bg-[#1f2bd4]/10 text-[#1f2bd4] text-xs font-semibold"
              style={{ marginBottom: "12px", padding: "4px 8px" }}
            >
              <span>●</span>
              Role-relevant descriptor
            </div>
          )}
          <div className="mb-6">
            <p className="text-[#4a4a4c] leading-relaxed text-base">{point}</p>
          </div>
          
            {/* Dual checkbox row - simple layout without outer containers */}
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDemonstrated}
                  onChange={onToggleDemonstrated}
                  className="w-5 h-5 rounded border-[#d9d9d9] text-[#00877C] focus:ring-[#00877C] focus:ring-2 cursor-pointer accent-[#00877C]"
                />
                <span className={`text-sm font-medium ${isDemonstrated ? 'text-[#00877C]' : 'text-[#6d6e71]'}`}>
                  I can do this
                </span>
              </label>
              
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isWantToDevelop}
                  onChange={onToggleWantToDevelop}
                  className="w-5 h-5 rounded border-[#d9d9d9] text-[#EAAB00] focus:ring-[#EAAB00] focus:ring-2 cursor-pointer accent-[#EAAB00]"
                />
                <span className={`text-sm font-medium ${isWantToDevelop ? 'text-[#9a7100]' : 'text-[#6d6e71]'}`}>
                  Want to develop
                </span>
              </label>
            </div>
        </div>
      </div>
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
  onToggleWantToDevelop,
  capabilityColor,
  requiredLevel,
  requiredDescriptorIndexes,
}: { 
  levels: any[], 
  currentLevel: CapabilityLevel | null, 
  onSelectLevel: (l: CapabilityLevel) => void,
  selectedTab: CapabilityLevel,
  setSelectedTab: (l: CapabilityLevel) => void,
  demonstratedDescriptors: SelectedDescriptor[],
  developmentFocus: SelectedDescriptor[],
  onToggleDemonstrated: (level: CapabilityLevel, index: number) => void,
  onToggleWantToDevelop: (level: CapabilityLevel, index: number) => void,
  capabilityColor: string,
  requiredLevel: CapabilityLevel | null,
  requiredDescriptorIndexes: number[],
}) {
  const levelOrder: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];
  const activeLevelData = levels.find(l => l.level === selectedTab);

  // Count demonstrated and want-to-develop per level
  const getLevelCounts = (level: CapabilityLevel) => {
    const demonstrated = demonstratedDescriptors.filter(d => d.level === level).length;
    const wantToDevelop = developmentFocus.filter(d => d.level === level).length;
    return { demonstrated, wantToDevelop };
  };

  // Helper function to create lighter shades of the capability colour
  const lightenColor = (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * percent));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * percent));
    const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * percent));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // Progressive colour scheme: lightest (Foundation) to darkest (Exemplar)
  // Using the capability's key area colour from homepage
  const levelColors: Record<CapabilityLevel, { bg: string; border: string; text: string; light: string }> = {
    FOUNDATION: { bg: lightenColor(capabilityColor, 0.6), border: lightenColor(capabilityColor, 0.6), text: 'white', light: lightenColor(capabilityColor, 0.6) },
    INTERMEDIATE: { bg: lightenColor(capabilityColor, 0.4), border: lightenColor(capabilityColor, 0.4), text: 'white', light: lightenColor(capabilityColor, 0.4) },
    ADVANCED: { bg: lightenColor(capabilityColor, 0.2), border: lightenColor(capabilityColor, 0.2), text: 'white', light: lightenColor(capabilityColor, 0.2) },
    EXEMPLAR: { bg: capabilityColor, border: capabilityColor, text: 'white', light: capabilityColor },
  };

  const getLevelBgColor = (level: CapabilityLevel, isActive: boolean) => {
    const colors = levelColors[level];
    if (isActive) {
      return `bg-[${colors.bg}] text-white border-[${colors.border}]`;
    }
    return `bg-white text-[#4a4a4c] border-[#d9d9d9] hover:border-[${colors.border}] hover:text-[${colors.border}]`;
  };

  return (
    <div style={{ marginTop: '32px' }}>
      {/* Level Tabs - Colour coded with proper contrast */}
      <div className="level-tabs-wrap flex flex-wrap justify-center gap-3 mb-8">
        {levelOrder.map((level, idx) => {
          const isActive = selectedTab === level;
          const isCurrent = currentLevel === level;
          const counts = getLevelCounts(level);
          const colors = levelColors[level];
          
          return (
            <button
              key={level}
              onClick={() => setSelectedTab(level)}
              style={{
                ...(isActive ? { backgroundColor: colors.bg, borderColor: colors.border } : {}),
                padding: '18px 36px'
              }}
              className={`
                flex-1 min-w-[180px] relative rounded-xl font-semibold text-base border-2 shadow-sm
                transition-all duration-200 hover:shadow-md
                ${isActive 
                  ? 'text-white' 
                  : 'bg-white text-[#4a4a4c] border-[#e2e3e4]'}
              `}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = colors.border;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#e2e3e4';
                }
              }}
            >
              {level.charAt(0) + level.slice(1).toLowerCase()}
              {requiredLevel === level && (
                <span
                  className="ml-2 inline-flex items-center gap-1 text-xs font-bold bg-white/20 rounded-full"
                  title="Role-relevant level"
                  style={{ padding: "3px 7px" }}
                >
                  ★
                </span>
              )}
              {(counts.demonstrated > 0 || counts.wantToDevelop > 0) && (
                <span className="absolute -top-2 -right-2 flex items-center gap-0.5 text-xs">
                  {counts.demonstrated > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#00877C] text-white flex items-center justify-center font-bold shadow-sm">
                      {counts.demonstrated}
                    </span>
                  )}
                  {counts.wantToDevelop > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#EAAB00] text-white flex items-center justify-center font-bold shadow-sm">
                      {counts.wantToDevelop}
                    </span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="level-content-container bg-white rounded-2xl border border-[#e2e3e4] shadow-sm overflow-hidden">
        {/* Header with level colour accent */}
        <div 
          className="px-6 md:px-8 py-5 border-b-4"
          style={{ borderColor: levelColors[selectedTab].bg }}
        >
          <div className="flex justify-center items-center">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#4a4a4c]">
                {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()} Level
              </h3>
              <p className="text-sm text-[#6d6e71]">
                {activeLevelData?.bulletPoints.length || 0} descriptors at this level
              </p>
            </div>
          </div>
        </div>

        {/* Descriptors Section - with generous spacing for readability */}
        <div className="level-content-padding" style={{ padding: '48px 56px' }}>
          {/* Mini Legend */}
          <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-[#e2e3e4]">
            <span className="text-xs font-medium text-[#6d6e71] uppercase tracking-wide">Select status:</span>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#00877C]/30 border-2 border-[#00877C]/50"></span>
              <span className="text-sm text-[#6d6e71]">I can do this</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#EAAB00]/30 border-2 border-[#EAAB00]/50"></span>
              <span className="text-sm text-[#6d6e71]">Want to develop</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {activeLevelData?.bulletPoints.map((point: string, idx: number) => {
              const isDemonstrated = demonstratedDescriptors.some(
                d => d.level === selectedTab && d.descriptorIndex === idx
              );
              const isWantToDevelop = developmentFocus.some(
                d => d.level === selectedTab && d.descriptorIndex === idx
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
                  levelColor={levelColors[selectedTab].bg}
                  isRelevant={selectedTab === requiredLevel && requiredDescriptorIndexes.includes(idx)}
                  showAlignmentIndicator={idx === 0}
                />
              );
            })}
          </div>
        </div>

        {/* Alignment to Whāia Te Hihiri - Fixed, always visible */}
        <div className="alignment-block-margin" style={{ marginLeft: '56px', marginRight: '56px', marginBottom: '48px' }}>
          <div className="bg-[#00877C]/5 rounded-lg border-2 border-[#00877C]/20 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#00877C]/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00877C]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#00877C]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-[#00877C] text-base">Alignment to Whāia Te Hihiri</h4>
              </div>
            </div>
            <div className="alignment-content-padding" style={{ padding: "32px" }}>
              <div
                className="alignment-statement-card bg-white rounded-lg border border-[#00877C]/20"
                style={{ padding: "28px" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#00877C] mb-2">
                  {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()}
                </p>
                <p className="text-sm text-[#4a4a4c] leading-relaxed" style={{ lineHeight: "1.75" }}>
                  {activeLevelData?.alignmentStatement || ""}
                </p>
              </div>
            </div>
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
  const {
    selection,
    isGuidedFilterActive,
    getRequiredLevel,
    getRelevantDescriptorIndexesForLevel,
    isMappedCapability,
  } = useGuidedFilter();
  
  // Get the key area colour for this capability
  const capabilityColors = CAPABILITY_COLORS[capabilityId] || { main: "#0c0c48", hover: "#0a0a3a" };
  const capabilityColor = capabilityColors.main;

  const requiredLevel = getRequiredLevel(capabilityId);
  const requiredLevelDescriptorCount =
    capability.levels.find((l: any) => l.level === requiredLevel)?.bulletPoints.length || 0;
  const requiredDescriptorIndexes = requiredLevel
    ? getRelevantDescriptorIndexesForLevel(capabilityId, requiredLevel, requiredLevelDescriptorCount)
    : [];
  const activeFilterName = selection
    ? (selection.filterType === "role"
        ? roles.find((r) => r.id === selection.filterId)?.name
        : functions.find((f) => f.id === selection.filterId)?.name) || selection.filterId
    : null;
  
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

  // State for collapsible guidance (expanded by default)
  const [showGuidance, setShowGuidance] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#f2f2f2]">
      {/* Header with key area colour background */}
      <header 
        className="w-full"
        style={{ backgroundColor: capabilityColor }}
      >
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-10 md:py-14 page-mobile-container">
          {/* Breadcrumb and capability selector - top row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <a href="/" className="text-white hover:text-white/80 transition-colors" style={{ color: '#FFFFFF' }}>Home</a>
              <span className="text-white" style={{ color: '#FFFFFF' }}>/</span>
              <span className="text-white font-medium" style={{ color: '#FFFFFF' }}>Self-Assessment</span>
            </div>
            <div className="relative">
              <CapabilitySelector currentCapabilityId={capabilityId} />
            </div>
          </div>

          {/* Centered capability title and description */}
          <div className="text-center max-w-[800px] mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: '#FFFFFF' }}>
              {capability.name}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#FFFFFF' }}>
              {capability.description}
            </p>
            {isGuidedFilterActive && (
              <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/15"
                style={{ marginTop: "16px", padding: "8px 12px" }}
              >
                <span className="text-sm font-semibold text-white">Guided mode:</span>
                <span className="text-sm text-white/95">
                  {selection?.filterType === "role" ? "Role" : "Function"}: {activeFilterName}
                </span>
                {requiredLevel ? (
                  <span className="text-xs font-bold rounded-full bg-white/20 text-white" style={{ padding: "3px 8px" }}>
                    ★ Role-relevant level: {requiredLevel.charAt(0) + requiredLevel.slice(1).toLowerCase()}
                  </span>
                ) : isMappedCapability(capabilityId) ? (
                  <span className="text-xs font-semibold rounded-full bg-white/20 text-white" style={{ padding: "3px 8px" }}>
                    ★ Mapped capability
                  </span>
                ) : (
                  <span className="text-xs font-semibold rounded-full bg-white/20 text-white" style={{ padding: "3px 8px" }}>
                    Not mapped for this role/function
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Collapsible Guidance - Click to expand */}
          <div 
            className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl overflow-hidden"
            style={{ marginBottom: '40px' }}
          >
            <button
              onClick={() => setShowGuidance(!showGuidance)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-white">How to assess yourself</span>
              </div>
              <svg 
                className={`w-5 h-5 text-white transition-transform duration-200 ${showGuidance ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showGuidance && (
              <div className="px-5 pb-5 pt-2 border-t border-white/30">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/40">
                    <span className="w-4 h-4 rounded bg-[#00877C] border border-white/60 shadow-sm"></span>
                    <span className="text-sm font-medium text-white">"I can do this"</span>
                    <span className="text-xs text-white/95">— behaviours you can demonstrate</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/40">
                    <span className="w-4 h-4 rounded bg-[#EAAB00] border border-white/60 shadow-sm"></span>
                    <span className="text-sm font-medium text-white">"Want to develop"</span>
                    <span className="text-xs text-white/95">— areas for your development plan</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                  <strong style={{ color: '#FFFFFF' }}>This is a holistic assessment:</strong> If you have genuinely demonstrated a behaviour before and could still do it (even if not currently in your role), you can tick &ldquo;I can do this&rdquo;. Previous roles and experiences count. You can tick both boxes for a descriptor if you can already do it but still want to develop it further. Not all descriptors need to be ticked — some may not be relevant to your role. This tool is for development conversations, not performance evaluation.
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex justify-center">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-12 md:py-16 page-mobile-container">
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
          }}
          capabilityColor={capabilityColor}
          requiredLevel={requiredLevel}
          requiredDescriptorIndexes={requiredDescriptorIndexes}
        />

        {/* Training Resources */}
        <div 
          className="resource-card-padding bg-white rounded-xl border border-[#d9d9d9] shadow-sm"
          style={{ marginTop: '64px', marginBottom: '48px', padding: '40px 48px' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-[#4a4a4c] text-lg" style={{ marginBottom: '16px' }}>
                Training &amp; Development Resources
              </h4>
              <p className="text-[#6d6e71] text-base leading-relaxed" style={{ marginBottom: '20px' }}>
                Access training materials, courses, and development resources for RMA staff.
              </p>
              <a
                href="https://research-hub.auckland.ac.nz/induction-skills-and-development/research-management-and-administration-rma-staff-development"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f2bd4] hover:text-[#0c0c48] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Visit Research Hub - RMA Staff Development
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Assessment Summary & Next Steps */}
        <div className="summary-card-mobile mt-8 bg-white rounded-lg border border-[#d9d9d9] p-6 md:p-8">
          <h3 className="text-xl font-bold text-[#4a4a4c] mb-4 text-center">Assessment Summary</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#00877C]/10 rounded-lg p-4 border border-[#00877C]/30 text-center">
              <div className="text-sm text-[#00877C] mb-1">I Can Do</div>
              <div className="text-lg font-semibold text-[#00877C]">
                {demonstratedDescriptors.length} descriptor{demonstratedDescriptors.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="bg-[#EAAB00]/10 rounded-lg p-4 border border-[#EAAB00]/30 text-center">
              <div className="text-sm text-[#9a7100] mb-1">Want to Develop</div>
              <div className="text-lg font-semibold text-[#9a7100]">
                {developmentFocus.length} descriptor{developmentFocus.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="bg-[#f3f3f6] rounded-lg p-4 border border-[#e2e3e4] text-center">
              <div className="text-sm text-[#6d6e71] mb-1">Status</div>
              <div className="text-lg font-semibold text-[#4a4a4c]">
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Auto-saved'}
              </div>
            </div>
          </div>
          
          <div
            className="summary-actions-row border-t border-[#e2e3e4]"
            style={{ 
              paddingTop: '32px', 
              marginTop: '32px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap'
            }}
          >
            <div className="summary-actions-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f2bd4] rounded-lg font-semibold hover:bg-[#1929a8] transition-colors"
                style={{ color: 'white' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Now
              </button>
              <p className="text-xs text-[#6d6e71]">
                Your assessment is saved automatically.
              </p>
            </div>
            
            <div className="summary-actions-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                href="/summary"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f2bd4] rounded-lg font-semibold hover:bg-[#1929a8] transition-colors"
                style={{ color: 'white' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Summary
              </Link>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f2bd4] rounded-lg font-semibold hover:bg-[#1929a8] transition-colors"
                style={{ color: 'white' }}
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
        <div style={{ marginTop: '64px' }}>
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
      <div className="min-h-screen flex items-center justify-center bg-[#f3f3f6]">
        <div className="text-[#6d6e71]">Loading...</div>
      </div>
    }>
      <AssessPageContent />
    </Suspense>
  );
}
