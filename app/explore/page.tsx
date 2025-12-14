"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { capabilities } from "@/data/capabilities";
import { DescriptorAlignment, CapabilityLevel } from "@/types";

// Framework/treaty links
const FRAMEWORK_LINKS: Record<string, string> = {
  "Te Tiriti o Waitangi": "https://nzhistory.govt.nz/politics/treaty-of-waitangi",
  "Whāia Te Hihiri": "https://www.journal.mai.ac.nz/content/te-hihiri-process-coming-know",
  // Ngā Taumata Tutuki - link to be added when available
};

const RESEARCH_HUB_URL = "https://research-hub.auckland.ac.nz/induction-skills-and-development/research-management-and-administration-rma-staff-development";

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
    <div className="relative bg-white border border-slate-200 rounded-lg p-3">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1 text-slate-700 leading-relaxed">{point}</div>
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
              className={`w-4 h-4 ${showAlignment ? "text-green-700" : "text-green-600"} group-hover:text-green-700`}
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
          className="absolute z-50 mt-2 left-0 right-0 bg-white border-2 border-green-200 rounded-lg shadow-lg p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-2">
            <h5 className="font-semibold text-green-900 text-sm flex items-center gap-2">
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
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-3 italic">{alignment.alignmentText}</p>
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

  const getLevelBgColor = (level: CapabilityLevel, isActive: boolean) => {
    if (isActive) {
      return "bg-slate-900 text-white border-slate-900";
    }
    return "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50";
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-3 mb-8">
        {levelOrder.map((level) => {
          const isActive = selectedTab === level;
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
              {level.charAt(0) + level.slice(1).toLowerCase()}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex justify-between items-start gap-6 mb-6">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{selectedTab} Level</div>
            <h3 className="text-2xl font-bold text-slate-900">{selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()}</h3>
            <p className="text-sm text-slate-500 mt-1">Read-only view of descriptors</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-600 text-right">
            <span className="font-medium text-slate-800">Explore only</span>
            <span>Switch tabs to view descriptors at each level.</span>
          </div>
        </div>

        <div className="space-y-3">
          {activeLevelData?.bulletPoints.map((point: string, idx: number) => {
            const descriptorAlignment = activeLevelData?.descriptorAlignments?.find(
              (da: DescriptorAlignment) => da.descriptorIndex === idx
            );
            return <DescriptorReadOnly key={idx} point={point} index={idx} alignment={descriptorAlignment} />;
          })}
        </div>

        {/* Training Resources */}
        <div className="mt-6 bg-slate-50 rounded-lg p-6 border border-slate-200">
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
                {activeLevelData.descriptorAlignments.length} descriptor{activeLevelData.descriptorAlignments.length !== 1 ? "s" : ""} with alignment info
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

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      <header className="w-full bg-white border-b border-slate-200 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-8">
          {/* Capability selector and mode indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-lg px-4 py-2">
              <span className="font-semibold text-sm">Explore mode</span>
              <span className="text-indigo-700 text-sm ml-2">Read-only view</span>
            </div>
            <select
              value={capability.id}
              onChange={(e) => {
                const targetId = e.target.value;
                window.location.href = `/explore?capability=${targetId}`;
              }}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-slate-300 transition-colors"
            >
              {capabilities.map((cap) => (
                <option key={cap.id} value={cap.id}>
                  {cap.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">{capability.name}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{capability.description}</p>
          </div>
        </div>
      </header>

      <main className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-12">
        <LevelTabsReadOnly capabilityLevels={capability.levels} />

        {/* Self-Assessment CTA */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Ready to assess yourself?</h3>
              <p className="text-amber-800 text-sm">
                Start the self-assessment for this capability. Mark descriptors you can currently demonstrate 
                and identify your proficiency level.
              </p>
            </div>
            <a
              href={`/assess?capability=${capability.id}`}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors shadow-sm"
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
              className="group bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Previous</div>
                  <div className="text-sm font-semibold text-slate-900 truncate">{prevCapability.name}</div>
                </div>
              </div>
            </a>
          ) : (
            <div className="hidden md:block" />
          )}

          {nextCapability ? (
            <a
              href={`/explore?capability=${nextCapability.id}`}
              className="group bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm transition-all duration-200 md:col-start-2"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0 text-right">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Next</div>
                  <div className="text-sm font-semibold text-slate-900 truncate">{nextCapability.name}</div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ) : (
            <a
              href="/"
              className="group bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm transition-all duration-200 md:col-start-2"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0 text-right">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Done exploring</div>
                  <div className="text-sm font-semibold text-slate-900">Back to all capabilities</div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
          <div className="text-slate-600">Loading...</div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
