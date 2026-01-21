"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { capabilities } from "@/data/capabilities";
import { DescriptorAlignment, CapabilityLevel } from "@/types";

// Framework/treaty links
const FRAMEWORK_LINKS: Record<string, string> = {
  "Te Tiriti o Waitangi": "https://nzhistory.govt.nz/politics/treaty-of-waitangi",
  "Whāia Te Hihiri": "https://www.journal.mai.ac.nz/content/te-hihiri-process-coming-know",
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

function DescriptorReadOnly({
  point,
  index,
  alignment,
}: {
  point: string;
  index: number;
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
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showAlignment]);

  return (
    <div className="relative bg-[#F8F9FA] border border-[#E5E5E5] rounded-xl p-7 md:p-8 hover:border-[#0098C3] hover:shadow-md transition-all">
      <div className="flex items-start gap-6">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00457D] flex items-center justify-center text-sm font-bold text-white shadow-sm">
          {index + 1}
        </span>
        <div className="flex-1 text-[#333333] leading-relaxed">{point}</div>
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
              className={`w-4 h-4 ${showAlignment ? "text-[#00877C]" : "text-[#00877C]/70"} group-hover:text-[#00877C]`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
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
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
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
          <p className="text-[#333333] text-sm leading-relaxed mb-3 italic">{alignment.alignmentText}</p>
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

function LevelTabsReadOnly({
  capabilityLevels,
}: {
  capabilityLevels: {
    level: CapabilityLevel;
    bulletPoints: string[];
    alignmentStatement?: string;
    descriptorAlignments?: DescriptorAlignment[];
  }[];
}) {
  const levelOrder: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];
  const [selectedTab, setSelectedTab] = useState<CapabilityLevel>("FOUNDATION");
  const activeLevelData = capabilityLevels.find((l) => l.level === selectedTab);

  // Color-coded levels for visual interest
  const levelColors: Record<CapabilityLevel, string> = {
    FOUNDATION: '#4F2D7F',
    INTERMEDIATE: '#0098C3',
    ADVANCED: '#00877C',
    EXEMPLAR: '#00457D',
  };

  return (
    <div className="mt-6">
      {/* Color-coded Level Tabs with proper contrast */}
      <div className="flex flex-wrap gap-3 mb-8">
        {levelOrder.map((level, idx) => {
          const isActive = selectedTab === level;
          const color = levelColors[level];
          return (
            <button
              key={level}
              onClick={() => setSelectedTab(level)}
              style={{
                ...(isActive ? { backgroundColor: color, borderColor: color } : {}),
                paddingLeft: '36px',
                paddingRight: '36px',
                paddingTop: '18px',
                paddingBottom: '18px'
              }}
              className={`
                rounded-xl font-semibold text-base border-2 transition-all duration-200 shadow-sm hover:shadow-md
                ${isActive
                  ? "text-white"
                  : "bg-white text-[#333333] border-[#E5E5E5] hover:border-[#0098C3]"}
              `}
            >
              <span className="flex items-center gap-3">
                {/* Number badge with proper contrast */}
                <span 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isActive ? 'bg-white text-[#333333]' : 'text-white'
                  }`} 
                  style={!isActive ? { backgroundColor: color } : undefined}
                >
                  {idx + 1}
                </span>
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
        {/* Header with level color accent */}
        <div 
          className="px-6 md:px-8 py-5 border-b-4"
          style={{ borderColor: levelColors[selectedTab] }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-3">
              <span 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                style={{ backgroundColor: levelColors[selectedTab] }}
              >
                {levelOrder.indexOf(selectedTab) + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#333333]">
                  {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()} Level
                </h3>
                <p className="text-sm text-[#666666]">
                  {activeLevelData?.bulletPoints.length || 0} descriptors
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F1F1F1] rounded-lg text-sm text-[#666666]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-medium">Explore mode</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {activeLevelData?.bulletPoints.map((point: string, idx: number) => {
              const descriptorAlignment = activeLevelData?.descriptorAlignments?.find(
                (da: DescriptorAlignment) => da.descriptorIndex === idx
              );
              return <DescriptorReadOnly key={idx} point={point} index={idx} alignment={descriptorAlignment} />;
            })}
          </div>
        </div>

        {/* Training Resources */}
        <div className="mt-10 bg-[#F1F1F1] rounded-lg p-6 md:p-7 border border-[#E5E5E5]">
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

function ExploreContent() {
  const searchParams = useSearchParams();
  const capabilityId = searchParams?.get("capability") || capabilities[0].id;
  const capability = capabilities.find((c) => c.id === capabilityId) || capabilities[0];
  const currentIndex = capabilities.findIndex((c) => c.id === capability.id);
  const prevCapability = currentIndex > 0 ? capabilities[currentIndex - 1] : null;
  const nextCapability = currentIndex < capabilities.length - 1 ? capabilities[currentIndex + 1] : null;
  
  // Get the key area color for this capability
  const capabilityColor = CAPABILITY_COLORS[capability.id] || "#00457D";

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
              <span className="text-white font-medium" style={{ color: '#FFFFFF' }}>Explore</span>
            </div>
            <select
              value={capability.id}
              onChange={(e) => {
                const targetId = e.target.value;
                window.location.href = `/explore?capability=${targetId}`;
              }}
              className="px-4 py-2.5 bg-white/20 border border-white/30 rounded-lg text-sm font-medium text-white hover:bg-white/30 focus:bg-white/30 focus:ring-2 focus:ring-white/50 transition-all outline-none cursor-pointer backdrop-blur-sm"
              style={{ color: '#FFFFFF' }}
            >
              {capabilities.map((cap) => (
                <option key={cap.id} value={cap.id} style={{ color: '#333333' }}>
                  {cap.name}
                </option>
              ))}
            </select>
          </div>

          {/* Centered capability title and description */}
          <div className="text-center max-w-[800px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: '#FFFFFF' }}>
              {capability.name}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#FFFFFF' }}>
              {capability.description}
            </p>
          </div>
        </div>
      </header>

      <main className="w-full">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-12 md:py-16">
          <LevelTabsReadOnly capabilityLevels={capability.levels} />

          {/* Self-Assessment CTA - using capability color */}
          <div 
            className="mt-12 rounded-lg"
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
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevCapability ? (
              <a
                href={`/explore?capability=${prevCapability.id}`}
                className="group bg-white rounded-lg border border-[#CCCCCC] p-5 hover:border-[#0098C3] hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F1F1F1] group-hover:bg-[#0098C3]/10 flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 text-[#666666] group-hover:text-[#0098C3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#666666] uppercase tracking-wider mb-1">Previous</div>
                    <div className="text-sm font-semibold text-[#333333] truncate">{prevCapability.name}</div>
                  </div>
                </div>
              </a>
            ) : (
              <div className="hidden md:block" />
            )}

            {nextCapability ? (
              <a
                href={`/explore?capability=${nextCapability.id}`}
                className="group bg-white rounded-lg border border-[#CCCCCC] p-5 hover:border-[#0098C3] hover:shadow-md transition-all duration-200 md:col-start-2"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-xs font-semibold text-[#666666] uppercase tracking-wider mb-1">Next</div>
                    <div className="text-sm font-semibold text-[#333333] truncate">{nextCapability.name}</div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F1F1F1] group-hover:bg-[#0098C3]/10 flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 text-[#666666] group-hover:text-[#0098C3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ) : (
              <a
                href="/"
                className="group bg-white rounded-lg border border-[#CCCCCC] p-5 hover:border-[#0098C3] hover:shadow-md transition-all duration-200 md:col-start-2"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0 text-right">
                    <div className="text-xs font-semibold text-[#666666] uppercase tracking-wider mb-1">Done exploring</div>
                    <div className="text-sm font-semibold text-[#333333]">Back to all capabilities</div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F1F1F1] group-hover:bg-[#0098C3]/10 flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 text-[#666666] group-hover:text-[#0098C3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        <div className="min-h-screen flex items-center justify-center bg-[#F1F1F1]">
          <div className="text-[#666666]">Loading...</div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
