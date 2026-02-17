"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { capabilities } from "@/data/capabilities";
import { CapabilitySelector } from "@/components/CapabilitySelector";
import { useAssessment } from "@/contexts/AssessmentContext";
import { CapabilityLevel, SelectedDescriptor } from "@/types";
import { useGuidedFilter } from "@/hooks/useGuidedFilter";
import { roles, functions } from "@/data/roleFilters";
import Link from "next/link";

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

/* ── Info-circle icon (31 × 31, blue fill matching CSS spec) ── */
function InfoCircleIcon() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="14" fill="#1F2BD4" />
      <path d="M16 14.5V22" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="10.5" r="1.6" fill="#FFFFFF" />
    </svg>
  );
}

/* ── Checkmark SVG for custom checkboxes ── */
function CheckmarkSvg() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <path d="M1 5L4.5 8.5L11 1.5" stroke="#0C0C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Descriptor card with dual checkboxes and selection-state backgrounds ── */
function DescriptorCard({
  point,
  index,
  isDemonstrated,
  isWantToDevelop,
  onToggleDemonstrated,
  onToggleWantToDevelop,
  showAlignmentIcon = false,
  isRoleRelevant = false,
}: {
  point: string;
  index: number;
  isDemonstrated: boolean;
  isWantToDevelop: boolean;
  onToggleDemonstrated: () => void;
  onToggleWantToDevelop: () => void;
  showAlignmentIcon?: boolean;
  isRoleRelevant?: boolean;
}) {
  const getCardStyle = (): { bg: string; border: string } => {
    if (isDemonstrated && isWantToDevelop) {
      return { bg: "#D5DFF4", border: "#8F9092" };
    }
    if (isDemonstrated) {
      return { bg: "#D5F4DE", border: "#2EC95C" };
    }
    if (isWantToDevelop) {
      return { bg: "#FFF7D7", border: "#FDD835" };
    }
    return { bg: "#FFFFFF", border: "#8F9092" };
  };

  const { bg, border } = getCardStyle();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "10px",
        backgroundColor: bg,
        border: `0.68px solid ${border}`,
        borderRadius: "10px",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
          {/* Descriptor text with optional role-relevant tag */}
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
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#0C0C48",
                margin: 0,
              }}
            >
              {point}
            </p>
          </div>
          {/* Alignment icon on first descriptor only */}
          {showAlignmentIcon && (
            <div style={{ flexShrink: 0 }}>
              <InfoCircleIcon />
            </div>
          )}
        </div>

        {/* Checkbox row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 55px",
            gap: "20px",
          }}
        >
          {/* "I can do this" checkbox */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <div
              onClick={onToggleDemonstrated}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "2px",
                border: `1px solid ${isDemonstrated ? "#0C0C48" : "#0C0C48"}`,
                backgroundColor: isDemonstrated ? "#2EC95C" : "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
              }}
            >
              {isDemonstrated && <CheckmarkSvg />}
            </div>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#0C0C48",
              }}
            >
              I can do this
            </span>
          </label>

          {/* "I want to develop" checkbox */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <div
              onClick={onToggleWantToDevelop}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "2px",
                border: `1px solid ${isWantToDevelop ? "#FDD835" : "#0C0C48"}`,
                backgroundColor: isWantToDevelop ? "#FDD835" : "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
              }}
            >
              {isWantToDevelop && <CheckmarkSvg />}
            </div>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#0C0C48",
              }}
            >
              I want to develop
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

/* ── Level tabs + header + descriptors + alignment section ── */
function AssessLevelTabs({
  levels,
  selectedTab,
  setSelectedTab,
  demonstratedDescriptors,
  developmentFocus,
  onToggleDemonstrated,
  onToggleWantToDevelop,
  requiredLevel,
  requiredDescriptorIndexes,
}: {
  levels: any[];
  selectedTab: CapabilityLevel;
  setSelectedTab: (l: CapabilityLevel) => void;
  demonstratedDescriptors: SelectedDescriptor[];
  developmentFocus: SelectedDescriptor[];
  onToggleDemonstrated: (level: CapabilityLevel, index: number) => void;
  onToggleWantToDevelop: (level: CapabilityLevel, index: number) => void;
  requiredLevel: CapabilityLevel | null;
  requiredDescriptorIndexes: number[];
}) {
  const levelOrder: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];
  const activeLevelData = levels.find((l: any) => l.level === selectedTab);

  const getLevelCounts = (level: CapabilityLevel) => {
    const demonstrated = demonstratedDescriptors.filter((d) => d.level === level).length;
    const wantToDevelop = developmentFocus.filter((d) => d.level === level).length;
    return { demonstrated, wantToDevelop };
  };

  return (
    <div>
      {/* Level Tabs – NO numbers */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "30px" }}>
        {levelOrder.map((level) => {
          const isActive = selectedTab === level;
          return (
            <button
              key={level}
              onClick={() => setSelectedTab(level)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "234px",
                height: "79px",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: isActive ? "#0C0C48" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#000000",
                border: isActive ? "none" : "1px solid #8F9092",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "27px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {level.charAt(0) + level.slice(1).toLowerCase()}
            </button>
          );
        })}
      </div>

      {/* Level header bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          borderBottom: "1px solid #8F9092",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "30px",
              color: "#0C0C48",
              margin: 0,
            }}
          >
            {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()} Level
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#4A4A4C",
              margin: 0,
            }}
          >
            {activeLevelData?.bulletPoints.length || 0} descriptors
          </p>
        </div>
      </div>

      {/* SELECT STATUS legend row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#4A4A4C",
          }}
        >
          SELECT STATUS:
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#2EC95C",
              border: "1px solid #0C0C48",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckmarkSvg />
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#4A4A4C",
            }}
          >
            I can do this
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#FDD835",
              border: "1px solid #0C0C48",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckmarkSvg />
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#4A4A4C",
            }}
          >
            I want to develop
          </span>
        </div>
      </div>

      {/* Descriptor cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {activeLevelData?.bulletPoints.map((point: string, idx: number) => {
          const isDemonstrated = demonstratedDescriptors.some(
            (d) => d.level === selectedTab && d.descriptorIndex === idx
          );
          const isWantToDevelop = developmentFocus.some(
            (d) => d.level === selectedTab && d.descriptorIndex === idx
          );

          return (
            <DescriptorCard
              key={idx}
              point={point}
              index={idx}
              isDemonstrated={isDemonstrated}
              isWantToDevelop={isWantToDevelop}
              onToggleDemonstrated={() => onToggleDemonstrated(selectedTab, idx)}
              onToggleWantToDevelop={() => onToggleWantToDevelop(selectedTab, idx)}
              showAlignmentIcon={idx === 0}
              isRoleRelevant={selectedTab === requiredLevel && requiredDescriptorIndexes.includes(idx)}
            />
          );
        })}
      </div>

      {/* ── Māori Alignment Section ── */}
      {activeLevelData?.alignmentStatement && (
        <div style={{ marginTop: "40px", marginBottom: "50px" }}>
          <div
            style={{
              backgroundColor: "rgba(0, 135, 124, 0.05)",
              border: "2px solid rgba(0, 135, 124, 0.2)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
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
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#00877C",
                  margin: 0,
                }}
              >
                Alignment to Whāia Te Hihiri
              </h4>
            </div>
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
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#00877C",
                    marginBottom: "8px",
                  }}
                >
                  {selectedTab.charAt(0) + selectedTab.slice(1).toLowerCase()}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "1.75",
                    color: "#4A4A4C",
                    margin: 0,
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

function AssessPageContent() {
  const searchParams = useSearchParams();
  const capabilityId = searchParams?.get("capability") || capabilities[0].id;
  const capability = capabilities.find((c) => c.id === capabilityId) || capabilities[0];

  const { getResponse, updateResponse } = useAssessment();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f2f2f2" }}>
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
  const {
    selection,
    isGuidedFilterActive,
    getRequiredLevel,
    getRelevantDescriptorIndexesForLevel,
    isMappedCapability,
  } = useGuidedFilter();

  const capabilityColors = CAPABILITY_COLORS[capabilityId] || { main: "#99EAF9", hover: "#87DBF0" };
  const capabilityColor = capabilityColors.main;

  const requiredLevel = getRequiredLevel(capabilityId);
  const requiredLevelDescriptorCount =
    capability.levels.find((l: any) => l.level === requiredLevel)?.bulletPoints.length || 0;
  const requiredDescriptorIndexes = requiredLevel
    ? getRelevantDescriptorIndexesForLevel(capabilityId, requiredLevel, requiredLevelDescriptorCount)
    : [];
  const activeFilterName = selection
    ? (selection.filterType === "role"
        ? roles.find((r: any) => r.id === selection.filterId)?.name
        : functions.find((f: any) => f.id === selection.filterId)?.name) || selection.filterId
    : null;

  const currentIndex = capabilities.findIndex((c) => c.id === capability.id);
  const prevCapability = currentIndex > 0 ? capabilities[currentIndex - 1] : null;
  const nextCapability = currentIndex < capabilities.length - 1 ? capabilities[currentIndex + 1] : null;

  const [currentLevel, setCurrentLevel] = useState<CapabilityLevel | null>(response?.currentLevel || null);
  const [selectedTab, setSelectedTab] = useState<CapabilityLevel>(response?.currentLevel || "FOUNDATION");

  const [demonstratedDescriptors, setDemonstratedDescriptors] = useState<SelectedDescriptor[]>(
    response?.demonstratedDescriptors || response?.focusAreas || []
  );

  const [developmentFocus, setDevelopmentFocus] = useState<SelectedDescriptor[]>(
    response?.developmentFocus || []
  );

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const isFirstRender = useRef(true);
  const previousCapabilityId = useRef<string>(capabilityId);

  const handleSave = () => {
    setSaveStatus("saving");
    updateResponse(capabilityId, { currentLevel, demonstratedDescriptors, developmentFocus });
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 100);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSaveStatus("saving");
    const timeoutId = setTimeout(() => {
      updateResponse(capabilityId, { currentLevel, demonstratedDescriptors, developmentFocus });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [currentLevel, demonstratedDescriptors, developmentFocus]);

  useEffect(() => {
    if (previousCapabilityId.current !== capabilityId) {
      const newResponse = getResponse(capabilityId);
      setCurrentLevel(newResponse?.currentLevel || null);
      setSelectedTab(newResponse?.currentLevel || "FOUNDATION");
      setDemonstratedDescriptors(newResponse?.demonstratedDescriptors || newResponse?.focusAreas || []);
      setDevelopmentFocus(newResponse?.developmentFocus || []);
      isFirstRender.current = true;
      previousCapabilityId.current = capabilityId;
    }
  }, [capabilityId, getResponse]);

  const handleToggleDemonstrated = (level: CapabilityLevel, index: number) => {
    setDemonstratedDescriptors((prev) => {
      const existingIndex = prev.findIndex((d) => d.level === level && d.descriptorIndex === index);
      if (existingIndex >= 0) {
        return prev.filter((_, idx) => idx !== existingIndex);
      } else {
        return [...prev, { level, descriptorIndex: index }];
      }
    });
  };

  const handleToggleWantToDevelop = (level: CapabilityLevel, index: number) => {
    setDevelopmentFocus((prev) => {
      const existingIndex = prev.findIndex((d) => d.level === level && d.descriptorIndex === index);
      if (existingIndex >= 0) {
        return prev.filter((_, idx) => idx !== existingIndex);
      } else {
        return [...prev, { level, descriptorIndex: index }];
      }
    });
  };

  const [showGuidance, setShowGuidance] = useState(false);

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
          <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
            <a
              href="/"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#1F2BD4",
                textDecoration: "none",
              }}
            >
              Home
            </a>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
                fontSize: "19.9px",
                lineHeight: "22px",
                color: "#0C0C48",
              }}
            >
              /
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#0C0C48",
              }}
            >
              Self-Assessment
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#4A4A4C",
              }}
            >
              Jump to capability:
            </span>
            <CapabilitySelector currentCapabilityId={capabilityId} mode="assess" />
          </div>
        </div>
      </div>

      {/* ── Central content column ── */}
      <div style={{ width: "1440px", margin: "0 auto", padding: "30px 100px 0" }}>
        {/* Capability hero card */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "40px",
            gap: "27px",
            backgroundColor: capabilityColor,
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <div style={{ width: "45px", height: "45px", flexShrink: 0 }}>
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" stroke="#0C0C48" strokeWidth="3">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M33 38h9v-4a5.5 5.5 0 00-9.8-3.4M33 38H12m21 0v-4c0-1.2-.2-2.3-.7-3.4M12 38H3v-4a5.5 5.5 0 019.8-3.4M12 38v-4c0-1.2.2-2.3.7-3.4m0 0a9.2 9.2 0 0117 0M28 13a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zm11 5.5a3.7 3.7 0 11-7.3 0 3.7 3.7 0 017.3 0zM13.3 18.5a3.7 3.7 0 11-7.3 0 3.7 3.7 0 017.3 0z"
              />
            </svg>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "32px",
                lineHeight: "42px",
                color: "#0C0C48",
                margin: 0,
              }}
            >
              {capability.name}
            </h1>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "27px",
                color: "#0C0C48",
                margin: 0,
              }}
            >
              {capability.description}
            </p>
          </div>
        </div>

        {/* "How to assess yourself" collapsible guidance */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 15px",
            gap: "44px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #8F9092",
            borderRadius: "15px",
            marginBottom: "30px",
            height: "73px",
            cursor: "pointer",
          }}
          onClick={() => setShowGuidance(!showGuidance)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <InfoCircleIcon />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "22px",
                color: "rgba(12, 12, 72, 0.98)",
              }}
            >
              How to assess yourself
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "32px",
              height: "32px",
              transition: "transform 0.2s ease",
              transform: showGuidance ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <svg width="17" height="9" viewBox="0 0 17 9" fill="none">
              <path d="M1 1L8.5 8L16 1" stroke="#0C0C48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {showGuidance && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #8F9092",
              borderRadius: "10px",
              padding: "24px",
              marginBottom: "30px",
              marginTop: "-20px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", backgroundColor: "#D5F4DE", borderRadius: "8px", border: "1px solid #2EC95C" }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "2px", backgroundColor: "#2EC95C" }} />
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#0C0C48" }}>&ldquo;I can do this&rdquo;</span>
                <span style={{ fontSize: "12px", color: "#4A4A4C" }}>— behaviours you can demonstrate</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", backgroundColor: "#FFF7D7", borderRadius: "8px", border: "1px solid #FDD835" }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "2px", backgroundColor: "#FDD835" }} />
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#0C0C48" }}>&ldquo;I want to develop&rdquo;</span>
                <span style={{ fontSize: "12px", color: "#4A4A4C" }}>— areas for your development plan</span>
              </div>
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.75", color: "#4A4A4C", margin: 0 }}>
              <strong style={{ color: "#0C0C48" }}>This is a holistic assessment:</strong> If you have genuinely demonstrated a behaviour before and could still do it (even if not currently in your role), you can tick &ldquo;I can do this&rdquo;. Previous roles and experiences count. You can tick both boxes for a descriptor if you can already do it but still want to develop it further. Not all descriptors need to be ticked — some may not be relevant to your role. This tool is for development conversations, not performance evaluation.
            </p>
          </div>
        )}

        {/* Level tabs + descriptors + Māori alignment */}
        <AssessLevelTabs
          levels={capability.levels}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          demonstratedDescriptors={demonstratedDescriptors}
          developmentFocus={developmentFocus}
          onToggleDemonstrated={handleToggleDemonstrated}
          onToggleWantToDevelop={handleToggleWantToDevelop}
          requiredLevel={requiredLevel}
          requiredDescriptorIndexes={requiredDescriptorIndexes}
        />
      </div>

      {/* ── Assessment Summary (grey banded section) ── */}
      <div className="w-full" style={{ backgroundColor: "#F3F3F6", padding: "20px 0 40px", marginTop: "40px" }}>
        <div style={{ width: "1440px", margin: "0 auto", padding: "50px 100px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Title */}
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "26px",
                lineHeight: "34px",
                color: "#0C0C48",
                margin: 0,
                textAlign: "center",
              }}
            >
              Assessment Summary
            </h2>

            {/* Summary cards row: I Can Do, I Want to Develop, Status */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "29px",
              }}
            >
              {/* I Can Do */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "5px 20px",
                  backgroundColor: "#D5F4DE",
                  border: "1px solid #19CD80",
                  borderRadius: "10px",
                  height: "64px",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#000000",
                  }}
                >
                  I Can Do
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "30px",
                    color: "#000000",
                  }}
                >
                  {demonstratedDescriptors.length} descriptor{demonstratedDescriptors.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* I Want to Develop */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "5px 20px",
                  backgroundColor: "#FFF7D7",
                  border: "1px solid #FDD835",
                  borderRadius: "10px",
                  height: "64px",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#000000",
                  }}
                >
                  I Want to Develop
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "30px",
                    color: "#000000",
                  }}
                >
                  {developmentFocus.length} descriptor{developmentFocus.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Status */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "5px 20px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #8F9092",
                  borderRadius: "10px",
                  height: "64px",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#000000",
                  }}
                >
                  Status
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "30px",
                    color: "#000000",
                  }}
                >
                  {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : "Auto-saved"}
                </span>
              </div>
            </div>

            {/* Actions row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "18px",
              }}
            >
              {/* Left: Save + auto-save text */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={handleSave}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15.5px 40px",
                    gap: "5px",
                    backgroundColor: "#4A4A4C",
                    border: "2px solid #4A4A4C",
                    borderRadius: "29px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  Save Now
                </button>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#000000",
                    padding: "10px 0",
                  }}
                >
                  Your assessment is saved automatically
                </span>
              </div>

              {/* Right: View Summary + Development Plan */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link
                  href="/summary"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15.5px 40px",
                    gap: "5px",
                    backgroundColor: "#0C0C48",
                    border: "2px solid #0C0C48",
                    borderRadius: "29px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#FFFFFF",
                    textDecoration: "none",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 3.75H5.25a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 17.25L7.5 14.25l2.5-3" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 6.75l2.5 3-2.5 3" />
                  </svg>
                  View summary
                </Link>
                <Link
                  href="/plan"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15.5px 40px",
                    gap: "5px",
                    backgroundColor: "#FFFFFF",
                    border: "2px solid #0C0C48",
                    borderRadius: "29px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#0C0C48",
                    textDecoration: "none",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C0C48" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Development Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Previous / Next navigation ── */}
      <div style={{ width: "1440px", margin: "0 auto", padding: "50px 100px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {prevCapability ? (
            <a
              href={`/assess?capability=${prevCapability.id}`}
              style={{ display: "flex", alignItems: "center", gap: "20px", textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#F3F3F6",
                  borderRadius: "100px",
                  transform: "rotate(180deg)",
                }}
              >
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none">
                  <path d="M9 1L16 7.5L9 14" stroke="#0C0C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#4A4A4C",
                  }}
                >
                  PREVIOUS
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#4A4A4C",
                  }}
                >
                  {prevCapability.name}
                </span>
              </div>
            </a>
          ) : (
            <div />
          )}
          {nextCapability ? (
            <a
              href={`/assess?capability=${nextCapability.id}`}
              style={{ display: "flex", alignItems: "center", gap: "20px", textDecoration: "none" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", textAlign: "right" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#4A4A4C",
                  }}
                >
                  NEXT
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#4A4A4C",
                  }}
                >
                  {nextCapability.name}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#F3F3F6",
                  borderRadius: "100px",
                }}
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

      {/* ── Training & Development Resources ── */}
      <div className="w-full" style={{ backgroundColor: "#F3F3F6", padding: "50px 0" }}>
        <div
          style={{
            width: "1440px",
            margin: "0 auto",
            padding: "0 100px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h4
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "30px",
              color: "#0C0C48",
              margin: 0,
            }}
          >
            Training &amp; Development Resources
          </h4>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#0C0C48",
              margin: 0,
            }}
          >
            Access training materials, courses, and development resources for RMA staff.
          </p>
          <a
            href="https://research-hub.auckland.ac.nz/induction-skills-and-development/research-management-and-administration-rma-staff-development"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#1F2BD4",
              textDecoration: "underline",
              width: "fit-content",
            }}
          >
            Visit Research Hub - RMA Staff Development
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="#1F2BD4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AssessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F3F3F6" }}>
          <div style={{ color: "#6d6e71" }}>Loading...</div>
        </div>
      }
    >
      <AssessPageContent />
    </Suspense>
  );
}
