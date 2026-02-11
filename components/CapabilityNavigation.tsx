"use client";

import Link from "next/link";
import { capabilities } from "@/data/capabilities";
import { useGuidedFilter } from "@/hooks/useGuidedFilter";

interface CapabilityNavigationProps {
  currentCapabilityId: string;
}

// Map capabilities to their key area colours
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

export function CapabilityNavigation({ currentCapabilityId }: CapabilityNavigationProps) {
  const { isGuidedFilterActive, isMappedCapability, getRequiredLevel } = useGuidedFilter();
  const currentIndex = capabilities.findIndex((c) => c.id === currentCapabilityId);
  const prevCapability = currentIndex > 0 ? capabilities[currentIndex - 1] : null;
  const nextCapability = currentIndex < capabilities.length - 1 ? capabilities[currentIndex + 1] : null;
  
  // Get colors for prev and next capabilities
  const prevColors = prevCapability ? CAPABILITY_COLORS[prevCapability.id] : null;
  const nextColors = nextCapability ? CAPABILITY_COLORS[nextCapability.id] : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Previous Button */}
      {prevCapability && prevColors ? (
        <Link
          href={`/assess?capability=${prevCapability.id}`}
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
              <div className="text-base font-bold text-white truncate">
                {prevCapability.name}
              </div>
              {isGuidedFilterActive && isMappedCapability(prevCapability.id) && (
                <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold rounded-full border border-white/40 bg-white/15 px-2 py-0.5 text-white">
                  ★ mapped ({(getRequiredLevel(prevCapability.id) || "FOUNDATION").toLowerCase()})
                </div>
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div className="hidden md:block" />
      )}

      {/* Next Button or Finish */}
      {nextCapability && nextColors ? (
        <Link
          href={`/assess?capability=${nextCapability.id}`}
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
              <div className="text-lg font-bold text-white truncate">
                {nextCapability.name}
              </div>
              {isGuidedFilterActive && isMappedCapability(nextCapability.id) && (
                <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold rounded-full border border-white/40 bg-white/15 px-2 py-0.5 text-white">
                  ★ mapped ({(getRequiredLevel(nextCapability.id) || "FOUNDATION").toLowerCase()})
                </div>
              )}
            </div>
            <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href="/plan"
          className="group bg-[#0c0c48] hover:bg-[#0a0a3a] rounded-lg shadow-md hover:shadow-lg transition-all duration-200 md:col-start-2"
          style={{ padding: '24px 28px' }}
        >
          <div className="flex items-center gap-5">
            <div className="flex-1 min-w-0 text-right">
              <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2">Finished Assessment</div>
              <div className="text-lg font-bold text-white">
                Build Development Plan
              </div>
            </div>
            <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
