"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { capabilities } from "@/data/capabilities";
import { CapabilityLevel, CapabilityLevelDescriptor } from "@/types";
import { CapabilitySelector } from "@/components/CapabilitySelector";
import { roles, functions } from "@/data/roleFilters";
import { useGuidedFilter } from "@/hooks/useGuidedFilter";

// Map capabilities to their key area colours (matching homepage palette)
const CAPABILITY_COLORS: Record<string, { main: string; hover: string }> = {
  "research-engagement": { main: "#BCC0F3", hover: "#AAB0E8" },
  "maximising-impact": { main: "#BCC0F3", hover: "#AAB0E8" },
  "researcher-development": { main: "#99EAF9", hover: "#87DBF0" },
  "environment-culture": { main: "#99EAF9", hover: "#87DBF0" },
  "funding-opportunities": { main: "#A3EBCC", hover: "#91DFC0" },
  "proposal-support": { main: "#A3EBCC", hover: "#91DFC0" },
  "initiation": { main: "#FFBFB7", hover: "#F0ADA5" },
  "projects-initiatives": { main: "#FFBFB7", hover: "#F0ADA5" },
  "monitoring-reporting": { main: "#ECBEFA", hover: "#DCAEE8" },
  "policy-strategy": { main: "#ECBEFA", hover: "#DCAEE8" },
};

/* ── Info-circle icon (31 × 31, grey fill) ── */
function InfoCircleIcon() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="14" fill="#4A4A4C" />
      <path d="M16 14.5V22" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="10.5" r="1.6" fill="#FFFFFF" />
    </svg>
  );
}

/* ── Single descriptor row ── */
function DescriptorReadOnly({
  point,
  index,
  totalCount,
  hasAlignmentIcon,
  isRoleRelevant = false,
}: {
  point: string;
  index: number;
  totalCount: number;
  hasAlignmentIcon: boolean;
  isRoleRelevant?: boolean;
}) {
  const isFirst = index === 0;
  const isLast = index === totalCount - 1;
  const bgColor = index % 2 === 0 ? "#F3F3F6" : "#FFFFFF";
  const borderRadius = isFirst
    ? "10px 10px 0 0"
    : isLast
    ? "0 0 10px 10px"
    : "0";

  return (
    <div
      className="flex items-center gap-5"
      style={{
        padding: "25px 20px",
        backgroundColor: bgColor,
        borderLeft: "0.68px solid #AFAFC3",
        borderRight: "0.68px solid #AFAFC3",
        borderBottom: "0.68px solid #AFAFC3",
        borderTop: isFirst ? "0.68px solid #AFAFC3" : "none",
        borderRadius,
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        {isRoleRelevant && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              width: "fit-content",
              padding: "4px 10px",
              backgroundColor: "rgba(31,43,212,0.1)",
              border: "1px solid rgba(31,43,212,0.3)",
              borderRadius: "999px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              color: "#1F2BD4",
            }}
          >
            <span style={{ fontSize: "10px" }}>●</span>
            Role-relevant descriptor
          </span>
        )}
        <p
          className="font-normal"
          style={{ fontSize: "16px", lineHeight: "24px", color: "#0C0C48", margin: 0 }}
        >
          {point}
        </p>
      </div>
      {hasAlignmentIcon && (
        <div className="flex-shrink-0">
          <InfoCircleIcon />
        </div>
      )}
    </div>
  );
}

/* ── Level tabs + header + descriptors + alignment section ── */
function LevelTabsReadOnly({
  capabilityLevels,
  capabilityColor,
  requiredLevel,
  requiredDescriptorIndexes,
}: {
  capabilityLevels: CapabilityLevelDescriptor[];
  capabilityColor: string;
  requiredLevel: CapabilityLevel | null;
  requiredDescriptorIndexes: number[];
}) {
  const levelOrder: CapabilityLevel[] = [
    "FOUNDATION",
    "INTERMEDIATE",
    "ADVANCED",
    "EXEMPLAR",
  ];
  const [selectedTab, setSelectedTab] = useState<CapabilityLevel>("FOUNDATION");
  const activeLevelData = capabilityLevels.find((l) => l.level === selectedTab);

  return (
    <div>
      {/* Level Tabs – NO numeric badges */}
      <div className="flex flex-wrap gap-5" style={{ marginBottom: "30px" }}>
        {levelOrder.map((level) => {
          const isActive = selectedTab === level;
          return (
            <button
              key={level}
              onClick={() => setSelectedTab(level)}
              className="flex items-center justify-center gap-3 font-bold transition-all duration-200"
              style={{
                width: "234px",
                height: "79px",
                padding: "10px",
                borderRadius: "10px",
                fontSize: "18px",
                lineHeight: "27px",
                backgroundColor: isActive ? "#0C0C48" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#000000",
                border: isActive ? "none" : "1px solid #8F9092",
              }}
            >
              {level.charAt(0) + level.slice(1).toLowerCase()}
              {requiredLevel === level && (
                <span className="ml-1" title="Role-relevant level">★</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Level header bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "20px 0",
          borderBottom: "0.68px solid #8F9092",
          marginBottom: "30px",
        }}
      >
        <div className="flex flex-col">
          <h3
            className="font-bold"
            style={{ fontSize: "20px", lineHeight: "30px", color: "#0C0C48" }}
          >
            {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()} Level
          </h3>
          <p
            className="font-normal"
            style={{ fontSize: "16px", lineHeight: "24px", color: "#4A4A4C" }}
          >
            {activeLevelData?.bulletPoints.length || 0} descriptors
          </p>
        </div>

        <div
          className="inline-flex items-center gap-2"
          style={{ fontSize: "16px", fontWeight: 500, color: "#4A4A4C" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A4A4C" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Explore mode</span>
        </div>
      </div>

      {/* Descriptor rows - info icon ONLY on first descriptor */}
      <div>
        {activeLevelData?.bulletPoints.map((point: string, idx: number) => (
          <DescriptorReadOnly
            key={idx}
            point={point}
            index={idx}
            totalCount={activeLevelData.bulletPoints.length}
            hasAlignmentIcon={idx === 0}
            isRoleRelevant={selectedTab === requiredLevel && requiredDescriptorIndexes.includes(idx)}
          />
        ))}
      </div>

      {/* ── Māori Alignment Section ── */}
      {activeLevelData?.alignmentStatement && (
        <div
          style={{
            marginTop: "40px",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 135, 124, 0.05)",
              border: "2px solid rgba(0, 135, 124, 0.2)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 135, 124, 0.2)",
              }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "rgba(0, 135, 124, 0.2)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="#00877C">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h4
                className="font-semibold"
                style={{ fontSize: "16px", lineHeight: "24px", color: "#00877C" }}
              >
                Alignment to Whāia Te Hihiri
              </h4>
            </div>

            {/* Body */}
            <div style={{ padding: "24px" }}>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0, 135, 124, 0.2)",
                  borderRadius: "8px",
                  padding: "24px",
                }}
              >
                <p
                  className="font-semibold uppercase"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                    color: "#00877C",
                    marginBottom: "8px",
                  }}
                >
                  {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()}
                </p>
                <p
                  className="font-normal"
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.75",
                    color: "#4A4A4C",
                  }}
                >
                  {activeLevelData.alignmentStatement}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page content ── */
function ExploreContent() {
  const searchParams = useSearchParams();
  const capabilityId =
    searchParams?.get("capability") || capabilities[0].id;
  const capability =
    capabilities.find((c) => c.id === capabilityId) || capabilities[0];
  const currentIndex = capabilities.findIndex((c) => c.id === capability.id);
  const prevCapability =
    currentIndex > 0 ? capabilities[currentIndex - 1] : null;
  const nextCapability =
    currentIndex < capabilities.length - 1
      ? capabilities[currentIndex + 1]
      : null;

  const capabilityColors =
    CAPABILITY_COLORS[capability.id] || { main: "#BCC0F3", hover: "#AAB0E8" };
  const capabilityColor = capabilityColors.main;

  const {
    selection,
    isGuidedFilterActive,
    getRequiredLevel,
    getRelevantDescriptorIndexesForLevel,
    isMappedCapability,
  } = useGuidedFilter();

  const requiredLevel = getRequiredLevel(capability.id);
  const requiredLevelDescriptorCount =
    capability.levels.find((l) => l.level === requiredLevel)?.bulletPoints
      .length || 0;
  const requiredDescriptorIndexes = requiredLevel
    ? getRelevantDescriptorIndexesForLevel(
        capability.id,
        requiredLevel,
        requiredLevelDescriptorCount
      )
    : [];

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#f2f2f2" }}>
      {/* ── Breadcrumb bar ── */}
      <div className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
        <div
          style={{
            width: "1440px",
            margin: "0 auto",
            padding: "36px 100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="flex items-center gap-3" style={{ fontSize: "16px", lineHeight: "24px" }}>
            <a href="/" className="hover:underline" style={{ color: "#1F2BD4", fontWeight: 400 }}>
              Home
            </a>
            <span style={{ color: "#0C0C48", fontWeight: 300, fontSize: "19.9px" }}>/</span>
            <span style={{ color: "#0C0C48", fontWeight: 400 }}>Explore</span>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: "16px", lineHeight: "24px", color: "#4A4A4C" }}>
              Jump to capability:
            </span>
            <CapabilitySelector currentCapabilityId={capability.id} mode="explore" />
          </div>
        </div>
      </div>

      {/* ── Central content column (1240 px content, centered within 1440 px) ── */}
      <div style={{ width: "1440px", margin: "0 auto", padding: "30px 100px 0" }}>
        {/* Capability header card */}
        <div
          className="flex items-start"
          style={{
            backgroundColor: capabilityColor,
            borderRadius: "15px",
            padding: "40px",
            gap: "27px",
            marginBottom: "30px",
          }}
        >
          <div className="flex-shrink-0 flex items-center justify-center" style={{ width: "45px", height: "45px" }}>
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" stroke="#0C0C48" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M33 38h9v-4a5.5 5.5 0 00-9.8-3.4M33 38H12m21 0v-4c0-1.2-.2-2.3-.7-3.4M12 38H3v-4a5.5 5.5 0 019.8-3.4M12 38v-4c0-1.2.2-2.3.7-3.4m0 0a9.2 9.2 0 0117 0M28 13a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zm11 5.5a3.7 3.7 0 11-7.3 0 3.7 3.7 0 017.3 0zM13.3 18.5a3.7 3.7 0 11-7.3 0 3.7 3.7 0 017.3 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="font-bold" style={{ fontSize: "32px", lineHeight: "42px", color: "#0C0C48" }}>
              {capability.name}
            </h1>
            <p className="font-normal" style={{ fontSize: "18px", lineHeight: "27px", color: "#0C0C48" }}>
              {capability.description}
            </p>
          </div>
        </div>

        {/* Level tabs + descriptors + Māori alignment */}
        <LevelTabsReadOnly
          capabilityLevels={capability.levels}
          capabilityColor={capabilityColor}
          requiredLevel={requiredLevel}
          requiredDescriptorIndexes={requiredDescriptorIndexes}
        />

        {/* ── Previous / Next navigation ── */}
        <div className="flex items-center justify-between" style={{ gap: "20px" }}>
          {prevCapability ? (
            <a href={`/explore?capability=${prevCapability.id}`} className="flex items-center gap-5 group">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full transition-colors group-hover:bg-[#E7E7ED]"
                style={{ width: "40px", height: "40px", backgroundColor: "#F3F3F6" }}
              >
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none">
                  <path d="M8 1L1 7.5L8 14" stroke="#0C0C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold" style={{ fontSize: "16px", lineHeight: "24px", color: "#4A4A4C" }}>PREVIOUS</span>
                <span className="font-normal" style={{ fontSize: "16px", lineHeight: "24px", color: "#4A4A4C" }}>{prevCapability.name}</span>
              </div>
            </a>
          ) : (
            <div />
          )}
          {nextCapability ? (
            <a href={`/explore?capability=${nextCapability.id}`} className="flex items-center gap-5 group">
              <div className="flex flex-col gap-1 text-right">
                <span className="font-bold" style={{ fontSize: "16px", lineHeight: "24px", color: "#4A4A4C" }}>NEXT</span>
                <span className="font-normal" style={{ fontSize: "16px", lineHeight: "24px", color: "#4A4A4C" }}>{nextCapability.name}</span>
              </div>
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full transition-colors group-hover:bg-[#E7E7ED]"
                style={{ width: "40px", height: "40px", backgroundColor: "#F3F3F6" }}
              >
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none">
                  <path d="M9 1L16 7.5L9 14" stroke="#0C0C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* ── Training & Development Resources (full-width grey bg) ── */}
      <div className="w-full" style={{ backgroundColor: "#F3F3F6", padding: "50px 0", marginTop: "50px" }}>
        <div style={{ width: "1440px", margin: "0 auto", padding: "0 100px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <h4 className="font-bold" style={{ fontSize: "20px", lineHeight: "30px", color: "#0C0C48" }}>
            Training &amp; Development Resources
          </h4>
          <p className="font-normal" style={{ fontSize: "16px", lineHeight: "24px", color: "#0C0C48" }}>
            Access training materials, courses, and development resources for RMA staff.
          </p>
          <a
            href="https://research-hub.auckland.ac.nz/induction-skills-and-development/research-management-and-administration-rma-staff-development"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400, color: "#1F2BD4", textDecoration: "underline", width: "fit-content" }}
          >
            Visit Research Hub - RMA Staff Development
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="#1F2BD4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── "Ready to assess yourself?" CTA ── */}
      <div style={{ width: "1440px", margin: "0 auto", padding: "20px 100px 60px" }}>
        <div
          className="flex items-center justify-between"
          style={{ backgroundColor: "#0C0C48", borderRadius: "15px", padding: "50px", gap: "50px" }}
        >
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="font-bold" style={{ fontSize: "32px", lineHeight: "42px", color: "#FFFFFF" }}>
              Ready to assess yourself?
            </h3>
            <p className="font-normal" style={{ fontSize: "18px", lineHeight: "27px", color: "#FFFFFF" }}>
              Start the self-assessment for this capability. Mark behaviours you can competently
              demonstrate (including from previous roles/experiences) and identify your proficiency level.
            </p>
          </div>
          <a
            href={`/assess?capability=${capability.id}`}
            className="flex-shrink-0 inline-flex items-center gap-6 bg-white rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap font-bold"
            style={{ padding: "15.5px 40px", fontSize: "16px", lineHeight: "24px", color: "#0C0C48", border: "2px solid #0C0C48" }}
          >
            Start Self Assessment
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 1L12 7L5 13" stroke="#0C0C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
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
