"use client";

import { useState } from "react";
import { capabilities } from "@/data/capabilities";
import Link from "next/link";
import { useGuidedFilter } from "@/hooks/useGuidedFilter";

export function CapabilitySelector({
  currentCapabilityId,
  mode = "assess",
}: {
  currentCapabilityId?: string;
  mode?: "assess" | "explore";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isGuidedFilterActive, isMappedCapability } = useGuidedFilter();

  return (
    <div className="relative z-50 capability-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="capability-selector-button flex items-center gap-3 px-6 py-3.5 bg-white/20 border-2 border-white/30 rounded-lg text-lg font-semibold text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
        style={{ color: '#FFFFFF' }}
      >
        <span>Jump to Capability</span>
        <svg 
          className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="capability-selector-menu absolute right-0 mt-2 w-80 bg-white border border-[#d9d9d9] rounded-lg shadow-xl overflow-hidden z-20">
            <div className="max-h-[400px] overflow-y-auto p-2">
              {capabilities.map((cap, index) => {
                const isCurrent = cap.id === currentCapabilityId;
                const isMapped = isGuidedFilterActive && isMappedCapability(cap.id);
                
                return (
                  <Link
                    key={cap.id}
                    href={`/${mode}?capability=${cap.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg transition-all duration-200 
                      flex items-center gap-3 group
                      ${isCurrent 
                        ? 'bg-[#0c0c48]/10 text-[#0c0c48]' 
                        : 'hover:bg-[#f3f3f6] text-[#4a4a4c]'}
                    `}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-semibold ${
                      isCurrent ? 'bg-[#0c0c48] text-white' : 'bg-[#f3f3f6] text-[#6d6e71]'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate flex items-center gap-1.5">
                        {isMapped && <span className="text-[#1f2bd4]">★</span>}
                        {cap.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isMapped && (
                        <div
                          className="text-[10px] font-semibold uppercase tracking-wide rounded-full"
                          style={{
                            padding: "2px 6px",
                            color: "#1f2bd4",
                            backgroundColor: "#1f2bd415",
                            border: "1px solid #1f2bd433",
                          }}
                        >
                          mapped
                        </div>
                      )}
                      {isCurrent && (
                        <div className="w-2 h-2 rounded-full bg-[#0c0c48]" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
