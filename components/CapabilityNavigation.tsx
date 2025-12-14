"use client";

import Link from "next/link";
import { capabilities } from "@/data/capabilities";

interface CapabilityNavigationProps {
  currentCapabilityId: string;
}

export function CapabilityNavigation({ currentCapabilityId }: CapabilityNavigationProps) {
  const currentIndex = capabilities.findIndex((c) => c.id === currentCapabilityId);
  const prevCapability = currentIndex > 0 ? capabilities[currentIndex - 1] : null;
  const nextCapability = currentIndex < capabilities.length - 1 ? capabilities[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Previous Button */}
      {prevCapability ? (
        <Link
          href={`/assess?capability=${prevCapability.id}`}
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
              <div className="text-sm font-semibold text-slate-900 truncate">
                {prevCapability.name}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="hidden md:block" />
      )}

      {/* Next Button or Finish */}
      {nextCapability ? (
        <Link
          href={`/assess?capability=${nextCapability.id}`}
          className="group bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm transition-all duration-200 md:col-start-2"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0 text-right">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Next</div>
              <div className="text-sm font-semibold text-slate-900 truncate">
                {nextCapability.name}
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href="/plan"
          className="bg-slate-900 text-white rounded-lg p-6 hover:bg-slate-800 transition-all duration-200 md:col-start-2"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0 text-right">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Next Step</div>
              <div className="text-sm font-semibold">
                Build Development Plan
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded bg-white/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
