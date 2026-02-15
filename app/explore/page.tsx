"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { capabilities } from "@/data/capabilities";
import { CapabilityLevel } from "@/types";
import { CapabilitySelector } from "@/components/CapabilitySelector";
import { roles, functions } from "@/data/roleFilters";
import { useGuidedFilter } from "@/hooks/useGuidedFilter";

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

function DescriptorReadOnly({
  point,
  levelColor,
  isRelevant = false,
  showAlignmentIndicator = false,
}: {
  point: string;
  levelColor: string;
  isRelevant?: boolean;
  showAlignmentIndicator?: boolean;
}) {

  return (
    <div
      className={`descriptor-card-padding relative bg-[#F8F9FA] border rounded-2xl hover:border-[#1f2bd4] hover:shadow-md transition-all ${
        isRelevant ? "border-[#1f2bd4]/50 bg-[#1f2bd4]/5" : "border-[#e2e3e4]"
      }`}
      style={{ padding: '40px 48px' }}
    >
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
      {isRelevant && (
        <div className="inline-flex items-center gap-1 rounded-full border border-[#1f2bd4]/30 bg-[#1f2bd4]/10 text-[#1f2bd4] text-xs font-semibold"
          style={{ marginBottom: "14px", padding: "4px 8px" }}
        >
          <span>●</span>
          Role-relevant descriptor
        </div>
      )}
      <p className="text-[#4a4a4c] leading-relaxed text-base">{point}</p>
    </div>
  );
}

function LevelTabsReadOnly({
  capabilityLevels,
  capabilityColor,
  requiredLevel,
  requiredDescriptorIndexes,
}: {
  capabilityLevels: {
    level: CapabilityLevel;
    bulletPoints: string[];
    alignmentStatement?: string;
  }[];
  capabilityColor: string;
  requiredLevel: CapabilityLevel | null;
  requiredDescriptorIndexes: number[];
}) {
  const levelOrder: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];
  const [selectedTab, setSelectedTab] = useState<CapabilityLevel>("FOUNDATION");
  const activeLevelData = capabilityLevels.find((l) => l.level === selectedTab);

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
  const levelColors: Record<CapabilityLevel, string> = {
    FOUNDATION: lightenColor(capabilityColor, 0.6),    // Lightest - 60% lighter
    INTERMEDIATE: lightenColor(capabilityColor, 0.4),  // Medium-light - 40% lighter
    ADVANCED: lightenColor(capabilityColor, 0.2),      // Medium-dark - 20% lighter
    EXEMPLAR: capabilityColor,                         // Darkest - full key area color
  };

  return (
    <div style={{ marginTop: '32px' }}>
      {/* Colour-coded Level Tabs with proper contrast */}
      <div className="level-tabs-wrap flex flex-wrap justify-center gap-3 mb-8">
        {levelOrder.map((level, idx) => {
          const isActive = selectedTab === level;
          const color = levelColors[level];
          return (
            <button
              key={level}
              onClick={() => setSelectedTab(level)}
              style={{
                ...(isActive ? { backgroundColor: color, borderColor: color } : {}),
                padding: '18px 36px'
              }}
              className={`
                flex-1 min-w-[180px] rounded-xl font-semibold text-base border-2 transition-all duration-200 shadow-sm hover:shadow-md
                ${isActive
                  ? "text-white"
                  : "bg-white text-[#4a4a4c] border-[#e2e3e4]"}
              `}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = color;
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
                <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold bg-white/20 rounded-full"
                  title="Role-relevant level"
                  style={{ padding: "3px 7px" }}
                >
                  ★
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
          style={{ borderColor: levelColors[selectedTab] }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:flex-1">
              <h3 className="text-xl font-bold text-[#4a4a4c]">
                {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()} Level
              </h3>
              <p className="text-sm text-[#6d6e71]">
                {activeLevelData?.bulletPoints.length || 0} descriptors
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f3f3f6] rounded-lg text-sm text-[#6d6e71]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-medium">Explore mode</span>
            </div>
          </div>
        </div>

        {/* Descriptors Section - with generous spacing for readability */}
        <div className="level-content-padding" style={{ padding: '48px 56px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {activeLevelData?.bulletPoints.map((point: string, idx: number) => (
              <DescriptorReadOnly
                key={idx}
                point={point}
                levelColor={levelColors[selectedTab]}
                isRelevant={selectedTab === requiredLevel && requiredDescriptorIndexes.includes(idx)}
                showAlignmentIndicator={idx === 0}
              />
            ))}
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

function ExploreContent() {
  const searchParams = useSearchParams();
  const capabilityId = searchParams?.get("capability") || capabilities[0].id;
  const capability = capabilities.find((c) => c.id === capabilityId) || capabilities[0];
  const currentIndex = capabilities.findIndex((c) => c.id === capability.id);
  const prevCapability = currentIndex > 0 ? capabilities[currentIndex - 1] : null;
  const nextCapability = currentIndex < capabilities.length - 1 ? capabilities[currentIndex + 1] : null;
  
  // Get the key area colour for this capability
  const capabilityColors = CAPABILITY_COLORS[capability.id] || { main: "#0c0c48", hover: "#0a0a3a" };
  const capabilityColor = capabilityColors.main;
  
  // Get colors for prev and next capabilities
  const prevColors = prevCapability ? CAPABILITY_COLORS[prevCapability.id] : null;
  const nextColors = nextCapability ? CAPABILITY_COLORS[nextCapability.id] : null;

  const {
    selection,
    isGuidedFilterActive,
    getRequiredLevel,
    getRelevantDescriptorIndexesForLevel,
    isMappedCapability,
  } = useGuidedFilter();

  const requiredLevel = getRequiredLevel(capability.id);
  const requiredLevelDescriptorCount =
    capability.levels.find((l) => l.level === requiredLevel)?.bulletPoints.length || 0;
  const requiredDescriptorIndexes = requiredLevel
    ? getRelevantDescriptorIndexesForLevel(capability.id, requiredLevel, requiredLevelDescriptorCount)
    : [];
  const activeFilterName = selection
    ? (selection.filterType === "role"
        ? roles.find((r) => r.id === selection.filterId)?.name
        : functions.find((f) => f.id === selection.filterId)?.name) || selection.filterId
    : null;

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
              <span className="text-white font-medium" style={{ color: '#FFFFFF' }}>Explore</span>
            </div>
            <CapabilitySelector currentCapabilityId={capability.id} mode="explore" />
          </div>

          {/* Centered capability title and description */}
          <div className="text-center max-w-[800px] mx-auto">
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
                ) : isMappedCapability(capability.id) ? (
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
        </div>
      </header>

      <main className="w-full">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-12 md:py-16 page-mobile-container">
          <LevelTabsReadOnly
            capabilityLevels={capability.levels}
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

          {/* Self-Assessment CTA - using capability colour */}
          <div 
            className="cta-card-padding mt-12 rounded-lg"
            style={{ backgroundColor: capabilityColor, padding: '48px' }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#FFFFFF' }}>Ready to assess yourself?</h3>
                <p className="text-base leading-relaxed" style={{ color: '#FFFFFF' }}>
                  Start the self-assessment for this capability. Mark behaviours you can competently demonstrate 
                  (including from previous roles/experiences) and identify your proficiency level.
                </p>
              </div>
              <a
                href={`/assess?capability=${capability.id}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
                style={{ color: capabilityColor }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Self-Assessment
              </a>
            </div>
          </div>

          {/* Capability Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginTop: '64px' }}>
            {prevCapability && prevColors ? (
              <a
                href={`/explore?capability=${prevCapability.id}`}
                className="group rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                style={{ 
                  padding: '20px 24px',
                  backgroundColor: prevColors.main,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = prevColors.hover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = prevColors.main}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">Previous</div>
                    <div className="text-base font-bold text-white truncate">{prevCapability.name}</div>
                  </div>
                </div>
              </a>
            ) : (
              <div className="hidden md:block" />
            )}

            {nextCapability && nextColors ? (
              <a
                href={`/explore?capability=${nextCapability.id}`}
                className="group rounded-lg shadow-md hover:shadow-lg transition-all duration-200 md:col-start-2"
                style={{ 
                  padding: '24px 28px',
                  backgroundColor: nextColors.main,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = nextColors.hover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = nextColors.main}
              >
                <div className="flex items-center gap-5">
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2">Next Capability</div>
                    <div className="text-lg font-bold text-white truncate">{nextCapability.name}</div>
                  </div>
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ) : (
              <a
                href="/"
                className="group rounded-lg shadow-md hover:shadow-lg transition-all duration-200 md:col-start-2"
                style={{ 
                  padding: '24px 28px',
                  backgroundColor: '#1f2bd4',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1929a8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2bd4'}
              >
                <div className="flex items-center gap-5">
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2">Done Exploring</div>
                    <div className="text-lg font-bold text-white">Back to All Capabilities</div>
                  </div>
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f3f3f6]">
          <div className="text-[#6d6e71]">Loading...</div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
