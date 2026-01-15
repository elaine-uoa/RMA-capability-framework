"use client";

import { useState } from "react";
import { capabilities } from "@/data/capabilities";
import Link from "next/link";

export function CapabilitySelector({ currentCapabilityId }: { currentCapabilityId?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white/20 border border-white/30 rounded-lg text-sm font-medium text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
        style={{ color: '#FFFFFF' }}
      >
        <span>Jump to Capability</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
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
          <div className="absolute right-0 mt-2 w-80 bg-white border border-[#CCCCCC] rounded-lg shadow-xl overflow-hidden z-20">
            <div className="max-h-[400px] overflow-y-auto p-2">
              {capabilities.map((cap, index) => {
                const isCurrent = cap.id === currentCapabilityId;
                
                return (
                  <Link
                    key={cap.id}
                    href={`/assess?capability=${cap.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg transition-all duration-200 
                      flex items-center gap-3 group
                      ${isCurrent 
                        ? 'bg-[#00457D]/10 text-[#00457D]' 
                        : 'hover:bg-[#F1F1F1] text-[#333333]'}
                    `}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-semibold ${
                      isCurrent ? 'bg-[#00457D] text-white' : 'bg-[#F1F1F1] text-[#666666]'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {cap.name}
                      </div>
                    </div>
                    {isCurrent && (
                      <div className="w-2 h-2 rounded-full bg-[#00457D]" />
                    )}
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
