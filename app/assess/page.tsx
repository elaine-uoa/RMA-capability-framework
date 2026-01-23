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

// Map capabilities to their key area colors (from homepage)
const CAPABILITY_COLORS: Record<string, string> = {
  "research-engagement": "#00457D",        // Research Engagement and Impact (Navy)
  "maximising-impact": "#00457D",          // Research Engagement and Impact (Navy)
  "researcher-development": "#00877C",     // Researcher Development and Culture (Teal)
  "environment-culture": "#00877C",        // Researcher Development and Culture (Teal)
  "funding-opportunities": "#0098C3",      // Research Proposal Development (Blue)
  "proposal-support": "#0098C3",           // Research Proposal Development (Blue)
  "initiation": "#D97706",                 // Research Project and Risk Management (Orange)
  "projects-initiatives": "#D97706",       // Research Project and Risk Management (Orange)
  "monitoring-reporting": "#4F2D7F",       // Research Policy and Strategy (Purple)
  "policy-strategy": "#4F2D7F",            // Research Policy and Strategy (Purple)
};

// Component for individual descriptor with DUAL checkboxes: "I can do" + "Want to develop"
function DescriptorItem({
  point,
  index,
  isDemonstrated,
  isWantToDevelop,
  onToggleDemonstrated,
  onToggleWantToDevelop,
  alignment,
  levelColor
}: {
  point: string;
  index: number;
  isDemonstrated: boolean;
  isWantToDevelop: boolean;
  onToggleDemonstrated: () => void;
  onToggleWantToDevelop: () => void;
  alignment?: DescriptorAlignment;
  levelColor: string;
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

  // Determine background color based on status - UoA colors
  const getBgClass = () => {
    if (isDemonstrated && isWantToDevelop) {
      return 'bg-gradient-to-r from-[#EAAB00]/10 to-[#00877C]/10 border-2 border-[#EAAB00]/30';
    }
    if (isDemonstrated) {
      return 'bg-[#EAAB00]/10 border-2 border-[#EAAB00]/30';
    }
    if (isWantToDevelop) {
      return 'bg-[#00877C]/10 border-2 border-[#00877C]/30';
    }
    return 'hover:bg-[#F1F1F1] border-2 border-transparent';
  };

  return (
    <div className="relative">
      <div className={`p-7 md:p-8 rounded-xl transition-all shadow-sm hover:shadow-md ${getBgClass()}`}>
        <div className="flex items-start gap-6">
          <span 
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: levelColor }}
          >
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[#333333] leading-relaxed mb-6">{point}</p>
            
            {/* Dual checkbox row - simple layout without outer containers */}
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDemonstrated}
                  onChange={onToggleDemonstrated}
                  className="w-5 h-5 rounded border-[#CCCCCC] text-[#EAAB00] focus:ring-[#EAAB00] focus:ring-2 cursor-pointer accent-[#EAAB00]"
                />
                <span className={`text-sm font-medium ${isDemonstrated ? 'text-[#9a7100]' : 'text-[#666666]'}`}>
                  I can do this
                </span>
              </label>
              
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isWantToDevelop}
                  onChange={onToggleWantToDevelop}
                  className="w-5 h-5 rounded border-[#CCCCCC] text-[#00877C] focus:ring-[#00877C] focus:ring-2 cursor-pointer accent-[#00877C]"
                />
                <span className={`text-sm font-medium ${isWantToDevelop ? 'text-[#00877C]' : 'text-[#666666]'}`}>
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
              className="flex-shrink-0 ml-2 p-1.5 rounded-full hover:bg-[#00877C]/10 transition-colors group"
              title="View Māori alignment & framework references"
              aria-label="View alignment information"
            >
              <svg 
                className={`w-4 h-4 ${showAlignment ? 'text-[#00877C]' : 'text-[#00877C]/70'} group-hover:text-[#00877C]`} 
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
          className="absolute z-50 mt-2 left-0 right-0 bg-white border-2 border-[#00877C]/30 rounded-lg shadow-lg p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-2">
            <h5 className="font-semibold text-[#00877C] text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Māori Alignment & Framework References
            </h5>
            <button
              onClick={() => setShowAlignment(false)}
              className="text-[#666666] hover:text-[#333333] transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-[#333333] text-sm leading-relaxed mb-3 italic">
            {alignment.alignmentText}
          </p>
          {alignment.frameworks && alignment.frameworks.length > 0 && (
            <div className="pt-3 border-t border-[#00877C]/20">
              <p className="text-xs font-medium text-[#00877C] mb-1.5">Aligned to:</p>
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
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#00877C]/10 text-[#00877C] text-xs font-medium border border-[#00877C]/20 hover:bg-[#00877C]/20 transition-colors"
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
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#00877C]/10 text-[#00877C] text-xs font-medium border border-[#00877C]/20"
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

  // Progressive color scheme: lightest (Foundation) to darkest (Exemplar)
  // Using green progression for clear visual distinction
  const levelColors: Record<CapabilityLevel, { bg: string; border: string; text: string; light: string }> = {
    FOUNDATION: { bg: '#81C784', border: '#81C784', text: 'white', light: '#81C784' },    // Light green - Foundation level
    INTERMEDIATE: { bg: '#66BB6A', border: '#66BB6A', text: 'white', light: '#66BB6A' },  // Medium-light green
    ADVANCED: { bg: '#4CAF50', border: '#4CAF50', text: 'white', light: '#4CAF50' },      // Medium-dark green
    EXEMPLAR: { bg: '#388E3C', border: '#388E3C', text: 'white', light: '#388E3C' },      // Dark green - Exemplar level
  };

  const getLevelBgColor = (level: CapabilityLevel, isActive: boolean) => {
    const colors = levelColors[level];
    if (isActive) {
      return `bg-[${colors.bg}] text-white border-[${colors.border}]`;
    }
    return `bg-white text-[#333333] border-[#CCCCCC] hover:border-[${colors.border}] hover:text-[${colors.border}]`;
  };

  return (
    <div className="mt-6">
      {/* Level Tabs - Color coded with proper contrast */}
      <div className="flex flex-wrap gap-3 mb-8">
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
                paddingLeft: '36px',
                paddingRight: '36px',
                paddingTop: '18px',
                paddingBottom: '18px'
              }}
              className={`
                relative rounded-xl font-semibold text-base border-2 shadow-sm
                transition-all duration-200 hover:shadow-md
                ${isActive 
                  ? 'text-white' 
                  : 'bg-white text-[#333333] border-[#E5E5E5]'}
              `}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = colors.border;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#E5E5E5';
                }
              }}
            >
              <span className="flex items-center gap-3">
                {/* Number badge with proper contrast - white text on colored bg when active */}
                <span 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isActive ? 'bg-white text-[#333333]' : 'text-white'
                  }`} 
                  style={!isActive ? { backgroundColor: colors.bg } : undefined}
                >
                  {idx + 1}
                </span>
                {level.charAt(0) + level.slice(1).toLowerCase()}
                {isCurrent && (
                  <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-[#00877C]'}`} />
                )}
              </span>
              {(counts.demonstrated > 0 || counts.wantToDevelop > 0) && (
                <span className="absolute -top-2 -right-2 flex items-center gap-0.5 text-xs">
                  {counts.demonstrated > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#EAAB00] text-white flex items-center justify-center font-bold shadow-sm">
                      {counts.demonstrated}
                    </span>
                  )}
                  {counts.wantToDevelop > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#00877C] text-white flex items-center justify-center font-bold shadow-sm">
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
      <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
        {/* Header with level color accent */}
        <div 
          className="px-6 md:px-8 py-5 border-b-4"
          style={{ borderColor: levelColors[selectedTab].bg }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                  style={{ backgroundColor: levelColors[selectedTab].bg }}
                >
                  {levelOrder.indexOf(selectedTab) + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#333333]">
                    {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()} Level
                  </h3>
                  <p className="text-sm text-[#666666]">
                    {activeLevelData?.bulletPoints.length || 0} descriptors at this level
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onSelectLevel(selectedTab)}
              className={`
                flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm 
                transition-all duration-200 shadow-sm
                ${currentLevel === selectedTab 
                  ? "bg-[#00877C]/10 text-[#00877C] border-2 border-[#00877C]/30" 
                  : "bg-[#0098C3] hover:bg-[#007A9C]"}
              `}
              style={currentLevel !== selectedTab ? { color: 'white' } : undefined}
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
        </div>

        {/* Descriptors Section */}
        <div className="p-8 md:p-12">
          {/* Mini Legend */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-[#E5E5E5]">
            <span className="text-xs font-medium text-[#666666] uppercase tracking-wide">Select status:</span>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#EAAB00]/30 border-2 border-[#EAAB00]/50"></span>
              <span className="text-sm text-[#666666]">I can do this</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#00877C]/30 border-2 border-[#00877C]/50"></span>
              <span className="text-sm text-[#666666]">Want to develop</span>
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
                  levelColor={levelColors[selectedTab].bg}
                />
              );
            })}
          </div>
        </div>

        {/* Training Resources */}
        <div className="bg-[#F1F1F1] rounded-lg p-5 border border-[#E5E5E5]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-[#333333] mb-2">Training & Development Resources</h4>
              <p className="text-[#666666] text-sm mb-3">
                Access training materials, courses, and development resources for RMA staff.
              </p>
              <a
                href={RESEARCH_HUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0098C3] hover:text-[#00457D] transition-colors"
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
              <span className="text-xs text-[#666666] bg-white px-2 py-1 rounded border border-[#CCCCCC] flex-shrink-0">
                {activeLevelData.descriptorAlignments.length} with alignment info
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
  
  // Get the key area color for this capability
  const capabilityColor = CAPABILITY_COLORS[capabilityId] || "#00457D";
  
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

  // State for collapsible guidance
  const [showGuidance, setShowGuidance] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA]">
      {/* Header with key area color background */}
      <header 
        className="w-full"
        style={{ backgroundColor: capabilityColor }}
      >
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-10 md:py-14">
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
                    <span className="w-4 h-4 rounded bg-[#EAAB00] border border-white/60 shadow-sm"></span>
                    <span className="text-sm font-medium text-white">"I can do this"</span>
                    <span className="text-xs text-white/95">— behaviours you can demonstrate</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/40">
                    <span className="w-4 h-4 rounded bg-[#00877C] border border-white/60 shadow-sm"></span>
                    <span className="text-sm font-medium text-white">"Want to develop"</span>
                    <span className="text-xs text-white/95">— areas for your development plan</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#FFFFFF' }}>
                  <strong style={{ color: '#FFFFFF' }}>This is a holistic assessment:</strong> If you have genuinely demonstrated a behaviour before and could still do it (even if not currently in your role), you can tick "I can do this". Previous roles and experiences count. This tool is for development conversations, not performance reviews.
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex justify-center">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-12 md:py-16">
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
        />

        {/* Assessment Summary & Next Steps */}
        <div className="mt-8 bg-white rounded-lg border border-[#CCCCCC] p-6 md:p-8">
          <h3 className="text-xl font-bold text-[#333333] mb-4 text-center">Assessment Summary</h3>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#F1F1F1] rounded-lg p-4 border border-[#E5E5E5] text-center">
              <div className="text-sm text-[#666666] mb-1">Current Level</div>
              <div className="text-lg font-semibold text-[#333333]">
                {currentLevel ? currentLevel.charAt(0) + currentLevel.slice(1).toLowerCase() : "Not selected"}
              </div>
            </div>
            <div className="bg-[#EAAB00]/10 rounded-lg p-4 border border-[#EAAB00]/30 text-center">
              <div className="text-sm text-[#9a7100] mb-1">I Can Do</div>
              <div className="text-lg font-semibold text-[#9a7100]">
                {demonstratedDescriptors.length} descriptor{demonstratedDescriptors.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="bg-[#00877C]/10 rounded-lg p-4 border border-[#00877C]/30 text-center">
              <div className="text-sm text-[#00877C] mb-1">Want to Develop</div>
              <div className="text-lg font-semibold text-[#00877C]">
                {developmentFocus.length} descriptor{developmentFocus.length !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="bg-[#F1F1F1] rounded-lg p-4 border border-[#E5E5E5] text-center">
              <div className="text-sm text-[#666666] mb-1">Status</div>
              <div className="text-lg font-semibold text-[#333333]">
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Auto-saved'}
              </div>
            </div>
          </div>
          
          <div 
            className="border-t border-[#E5E5E5]"
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-white border border-[#CCCCCC] text-[#333333] rounded-lg font-medium hover:bg-[#F1F1F1] hover:border-[#0098C3] transition-colors text-sm"
              >
                Save Now
              </button>
              <p className="text-xs text-[#666666]">
                Your assessment is saved automatically.
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                href="/summary"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0098C3] rounded-lg font-semibold hover:bg-[#007A9C] transition-colors"
                style={{ color: 'white' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Summary
              </Link>
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0098C3] rounded-lg font-semibold hover:bg-[#007A9C] transition-colors"
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
        <div className="mt-10">
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
      <div className="min-h-screen flex items-center justify-center bg-[#F1F1F1]">
        <div className="text-[#666666]">Loading...</div>
      </div>
    }>
      <AssessPageContent />
    </Suspense>
  );
}
