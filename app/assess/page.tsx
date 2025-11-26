"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { capabilities } from "@/data/capabilities";
import { CapabilityNavigation } from "@/components/CapabilityNavigation";
import { CapabilitySelector } from "@/components/CapabilitySelector";
import { useAssessment } from "@/contexts/AssessmentContext";
import { CapabilityLevel } from "@/types";
import Link from "next/link";

function LevelTabs({ 
  levels, 
  currentLevel, 
  onSelectLevel,
  selectedTab,
  setSelectedTab 
}: { 
  levels: any[], 
  currentLevel: CapabilityLevel | null, 
  onSelectLevel: (l: CapabilityLevel) => void,
  selectedTab: CapabilityLevel,
  setSelectedTab: (l: CapabilityLevel) => void
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

        <div className="space-y-3 mb-8">
          {activeLevelData?.bulletPoints.map((point: string, idx: number) => (
            <div key={idx} className="flex gap-3 text-slate-700 leading-relaxed">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5">
                {idx + 1}
              </span>
              <span>{point}</span>
            </div>
          ))}
        </div>

        {activeLevelData?.alignmentStatement && (
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3">Māori Alignment & Te Tiriti o Waitangi</h4>
            <p className="text-slate-600 leading-relaxed italic text-sm">
              {activeLevelData.alignmentStatement}
            </p>
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

  // Use ref to track if this is the first render
  const isFirstRender = useRef(true);

  // CRITICAL FIX: Only save changes after user interaction, not on mount
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Debounce the save to avoid too many updates
    const timeoutId = setTimeout(() => {
      updateResponse(capabilityId, { currentLevel, desiredLevel, notes });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentLevel, desiredLevel, notes]); // Remove capabilityId and updateResponse from deps

  // Update local state when capability changes
  useEffect(() => {
    const newResponse = getResponse(capabilityId);
    setCurrentLevel(newResponse?.currentLevel || null);
    setDesiredLevel(newResponse?.desiredLevel || null);
    setNotes(newResponse?.notes || "");
    setSelectedTab(newResponse?.currentLevel || "FOUNDATION");
    isFirstRender.current = true; // Reset first render flag
  }, [capabilityId, getResponse]);

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
            
            <CapabilitySelector currentCapabilityId={capabilityId} />
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
          onSelectLevel={(level) => {
            setCurrentLevel(level);
            setSelectedTab(level);
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
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Development Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Capture your thoughts, evidence, or development goals..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-y min-h-[120px] transition-all"
              />
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Changes saved automatically</span>
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
