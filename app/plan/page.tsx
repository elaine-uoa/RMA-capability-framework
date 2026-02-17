"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { capabilities } from "@/data/capabilities";
import { useAssessment } from "@/contexts/AssessmentContext";
import { CapabilityLevel, SelectedDescriptor } from "@/types";

export default function PlanPage() {
  const { assessmentState, getResponse, updateResponse, removeCapability } = useAssessment();

  /* ── derived data (unchanged logic) ── */
  const allIncludedCapabilities = capabilities.filter((cap) => {
    const response = assessmentState.responses[cap.id];
    return (
      response?.isIncluded ||
      response?.currentLevel != null ||
      (response?.developmentFocus && response.developmentFocus.length > 0)
    );
  });

  const unassessedCapabilities = capabilities.filter((cap) => {
    const response = assessmentState.responses[cap.id];
    if (response?.isIncluded === true) return false;
    if (response?.demonstratedDescriptors && response.demonstratedDescriptors.length > 0) return false;
    if (response?.developmentFocus && response.developmentFocus.length > 0) return false;
    return true;
  });

  const totalFocusItems = allIncludedCapabilities.reduce((sum, cap) => {
    const response = getResponse(cap.id);
    return sum + (response?.developmentFocus?.length || 0);
  }, 0);

  /* ── local state ── */
  const [developmentNotes, setDevelopmentNotes] = useState<Record<string, string>>({});
  const [activeCapabilityTab, setActiveCapabilityTab] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [capabilityToRemove, setCapabilityToRemove] = useState<{ id: string; name: string } | null>(null);
  const [demonstratedExpanded, setDemonstratedExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadedNotes: Record<string, string> = {};
    capabilities.forEach((cap) => {
      const response = getResponse(cap.id);
      if (response?.notes) loadedNotes[cap.id] = response.notes;
    });
    setDevelopmentNotes(loadedNotes);

    if (allIncludedCapabilities.length > 0 && !activeCapabilityTab) {
      const firstWithFocus = allIncludedCapabilities.find((cap) => {
        const r = assessmentState.responses[cap.id];
        return r?.developmentFocus && r.developmentFocus.length > 0;
      });
      setActiveCapabilityTab(firstWithFocus?.id || allIncludedCapabilities[0].id);
    }
  }, [getResponse, allIncludedCapabilities.length, assessmentState.responses]);

  /* ── handlers (unchanged logic) ── */
  const handleNoteChange = (capId: string, note: string) => {
    setDevelopmentNotes((prev) => ({ ...prev, [capId]: note }));
  };

  const handleSaveNotes = (capId: string) => {
    setSaveStatus("saving");
    const existing = getResponse(capId);
    updateResponse(capId, { ...existing, notes: developmentNotes[capId] || "" });
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 100);
  };

  const handleRemoveCapability = (capabilityId: string) => {
    removeCapability(capabilityId);
    setDevelopmentNotes((prev) => {
      const updated = { ...prev };
      delete updated[capabilityId];
      return updated;
    });
    setCapabilityToRemove(null);
    if (activeCapabilityTab === capabilityId) {
      const remaining = allIncludedCapabilities.filter((c) => c.id !== capabilityId);
      setActiveCapabilityTab(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const getDescriptorText = (capId: string, level: CapabilityLevel, idx: number): string => {
    const cap = capabilities.find((c) => c.id === capId);
    return cap?.levels.find((l) => l.level === level)?.bulletPoints[idx] || "";
  };

  const toggleDemonstrated = (capId: string) => {
    setDemonstratedExpanded((prev) => ({ ...prev, [capId]: !prev[capId] }));
  };

  /* ═══════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════ */
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      {/* ── HERO ── */}
      <div style={{ backgroundColor: "#F3F3F6", paddingBottom: "40px" }}>
        <div style={{ width: "1440px", margin: "0 auto", padding: "50px 100px 0" }}>
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "52px",
              color: "#0C0C48",
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Development Plan
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#4A4A4C",
              margin: 0,
              marginBottom: "24px",
            }}
          >
            {allIncludedCapabilities.length > 0 ? (
              <>
                {allIncludedCapabilities.length} capabilit{allIncludedCapabilities.length !== 1 ? "ies" : "y"} included
                {totalFocusItems > 0 && <> &bull; {totalFocusItems} development focus item{totalFocusItems !== 1 ? "s" : ""}</>}
              </>
            ) : (
              "No capabilities included yet"
            )}
          </p>

          {/* Inline guidance line (replaces old yellow box) */}
          {allIncludedCapabilities.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0C0C48" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#0C0C48",
                  }}
                >
                  Add Reflection &amp; Action Notes
                </span>
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#4A4A4C",
                  margin: 0,
                }}
              >
                Write development notes for your included capabilities. Add specific actions, resources, or support needed to discuss with your manager.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ width: "1440px", margin: "0 auto", padding: "40px 100px 0" }}>
        {allIncludedCapabilities.length === 0 ? (
          /* ─── EMPTY STATE ─── */
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {/* Dark empty-state card */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "50px",
                backgroundColor: "#0C0C48",
                borderRadius: "15px",
                gap: "40px",
              }}
            >
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "26px",
                    lineHeight: "34px",
                    color: "#FFFFFF",
                    margin: 0,
                    marginBottom: "12px",
                  }}
                >
                  No capabilities included yet
                </h2>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                  }}
                >
                  Go to the self-assessment page to assess capabilities or include them in your development plan.
                </p>
              </div>
              <Link
                href="/assess"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "15.5px 40px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #FFFFFF",
                  borderRadius: "29px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#0C0C48",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                Start Self Assessment
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path d="M1 1L7 7L1 13" stroke="#0C0C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Or Add Capabilities Directly */}
            {unassessedCapabilities.length > 0 && (
              <div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "26px",
                    lineHeight: "34px",
                    color: "#0C0C48",
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  Or Add Capabilities Directly
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#4A4A4C",
                    margin: 0,
                    marginBottom: "20px",
                  }}
                >
                  Include capabilities to write development notes for:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {unassessedCapabilities.map((cap) => (
                    <button
                      key={cap.id}
                      onClick={() => {
                        updateResponse(cap.id, {
                          capabilityId: cap.id,
                          isIncluded: true,
                          currentLevel: null,
                          demonstratedDescriptors: [],
                          developmentFocus: [],
                        });
                        setActiveCapabilityTab(cap.id);
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 24px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #8F9092",
                        borderRadius: "10px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#4A4A4C",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ color: "#4A4A4C", fontSize: "18px" }}>+</span>
                      {cap.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ─── HAS CAPABILITIES ─── */
          <>
            {/* Capability pills row */}
            {allIncludedCapabilities.length > 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "30px" }}>
                {allIncludedCapabilities.map((cap) => {
                  const response = getResponse(cap.id);
                  const focusCount = response?.developmentFocus?.length || 0;
                  const isActive = activeCapabilityTab === cap.id;

                  return (
                    <button
                      key={cap.id}
                      onClick={() => setActiveCapabilityTab(cap.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 20px",
                        backgroundColor: isActive ? "#0C0C48" : "#FFFFFF",
                        border: isActive ? "none" : "1px solid #8F9092",
                        borderRadius: "15px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: isActive ? "#FFFFFF" : "#4A4A4C",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {cap.name}
                      {/* Count badge */}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: isActive ? "#FFFFFF" : "#0C0C48",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "12px",
                          color: isActive ? "#1F2BD4" : "#FFFFFF",
                        }}
                      >
                        {focusCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Capability detail cards */}
            {allIncludedCapabilities.map((cap) => {
              const response = getResponse(cap.id);
              const developmentFocus = response?.developmentFocus || [];
              const demonstratedDescriptors = response?.demonstratedDescriptors || [];
              const note = developmentNotes[cap.id] || "";
              const isActive = allIncludedCapabilities.length === 1 || activeCapabilityTab === cap.id;
              const hasFocus = developmentFocus.length > 0;
              const isDemonstratedOpen = demonstratedExpanded[cap.id] || false;

              if (!isActive) return null;

              const focusByLevel: Record<CapabilityLevel, SelectedDescriptor[]> = {
                FOUNDATION: [],
                INTERMEDIATE: [],
                ADVANCED: [],
                EXEMPLAR: [],
              };
              developmentFocus.forEach((f) => focusByLevel[f.level].push(f));

              const demonstratedByLevel: Record<CapabilityLevel, SelectedDescriptor[]> = {
                FOUNDATION: [],
                INTERMEDIATE: [],
                ADVANCED: [],
                EXEMPLAR: [],
              };
              demonstratedDescriptors.forEach((d) => demonstratedByLevel[d.level].push(d));

              return (
                <div
                  key={cap.id}
                  style={{
                    border: "2px solid rgba(31, 43, 212, 0.4)",
                    borderRadius: "15px",
                    overflow: "hidden",
                    marginBottom: "40px",
                  }}
                >
                  {/* Card header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "24px 32px",
                      backgroundColor: "#F4F4FD",
                      borderBottom: "1px solid rgba(31, 43, 212, 0.2)",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "22px",
                          lineHeight: "30px",
                          color: "#0C0C48",
                          margin: 0,
                        }}
                      >
                        {cap.name}
                      </h2>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "21px",
                          color: "#4A4A4C",
                          margin: 0,
                          marginTop: "4px",
                        }}
                      >
                        Current level: <strong>Not set</strong>
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Link
                        href={`/assess?capability=${cap.id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 24px",
                          backgroundColor: "#FFFFFF",
                          border: "2px solid #1F2BD4",
                          borderRadius: "30px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#1F2BD4",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {hasFocus ? "Edit" : "Add focus items"}
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                          <path d="M1 1L7 7L1 13" stroke="#1F2BD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => setCapabilityToRemove({ id: cap.id, name: cap.name })}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "10px 20px",
                          backgroundColor: "#FFFFFF",
                          border: "2px solid #d32f2f",
                          borderRadius: "30px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "14px",
                          lineHeight: "21px",
                          color: "#d32f2f",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "32px" }}>
                    {/* Development Focus Areas */}
                    {hasFocus ? (
                      <div style={{ marginBottom: "32px" }}>
                        <h3
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#0C0C48",
                            margin: 0,
                            marginBottom: "20px",
                          }}
                        >
                          Development Focus Areas
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                          {(["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"] as CapabilityLevel[]).map((level) => {
                            const items = focusByLevel[level];
                            if (items.length === 0) return null;
                            return (
                              <div
                                key={level}
                                style={{
                                  backgroundColor: "rgba(255, 247, 215, 0.5)",
                                  borderRadius: "15px",
                                  padding: "32px",
                                }}
                              >
                                <h4
                                  style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: 700,
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: "#0C0C48",
                                    margin: 0,
                                    marginBottom: "16px",
                                  }}
                                >
                                  {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                </h4>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                  {items.map((f, idx) => (
                                    <li
                                      key={idx}
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "12px",
                                        fontFamily: "Inter, sans-serif",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#4A4A4C",
                                      }}
                                    >
                                      <span style={{ color: "#FBDF65", fontSize: "18px", flexShrink: 0, marginTop: "2px" }}>→</span>
                                      {getDescriptorText(cap.id, f.level, f.descriptorIndex)}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "rgba(31, 43, 212, 0.05)",
                          border: "1px solid rgba(31, 43, 212, 0.2)",
                          borderRadius: "15px",
                          padding: "24px 32px",
                          marginBottom: "32px",
                        }}
                      >
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
                          <strong style={{ color: "#0C0C48" }}>No specific development focus selected yet.</strong> You can still write reflection notes below. To select specific descriptors to develop, click &ldquo;Add focus items&rdquo; above.
                        </p>
                      </div>
                    )}

                    {/* Already Demonstrated – expandable */}
                    {demonstratedDescriptors.length > 0 && (
                      <div style={{ marginBottom: "32px" }}>
                        <button
                          onClick={() => toggleDemonstrated(cap.id)}
                          aria-expanded={isDemonstratedOpen}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px 0",
                            marginBottom: isDemonstratedOpen ? "16px" : "0",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            style={{
                              transition: "transform 0.2s ease",
                              transform: isDemonstratedOpen ? "rotate(90deg)" : "rotate(0deg)",
                            }}
                          >
                            <path d="M6 4L10 8L6 12" stroke="#4A4A4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
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
                            Already Demonstrated ({demonstratedDescriptors.length} descriptor{demonstratedDescriptors.length !== 1 ? "s" : ""})
                          </h3>
                        </button>

                        {isDemonstratedOpen && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {(["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"] as CapabilityLevel[]).map((level) => {
                              const items = demonstratedByLevel[level];
                              if (items.length === 0) return null;
                              return (
                                <div
                                  key={level}
                                  style={{
                                    backgroundColor: "rgba(25, 205, 128, 0.08)",
                                    borderRadius: "15px",
                                    padding: "32px",
                                  }}
                                >
                                  <h4
                                    style={{
                                      fontFamily: "Inter, sans-serif",
                                      fontWeight: 700,
                                      fontSize: "16px",
                                      lineHeight: "24px",
                                      color: "#19CD80",
                                      margin: 0,
                                      marginBottom: "16px",
                                    }}
                                  >
                                    {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                  </h4>
                                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                    {items.map((d, idx) => (
                                      <li
                                        key={idx}
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start",
                                          gap: "12px",
                                          fontFamily: "Inter, sans-serif",
                                          fontWeight: 400,
                                          fontSize: "16px",
                                          lineHeight: "24px",
                                          color: "#4A4A4C",
                                        }}
                                      >
                                        <svg
                                          width="18"
                                          height="18"
                                          viewBox="0 0 18 18"
                                          fill="none"
                                          style={{ flexShrink: 0, marginTop: "3px" }}
                                        >
                                          <path d="M4 9L7.5 12.5L14 5.5" stroke="#19CD80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {getDescriptorText(cap.id, d.level, d.descriptorIndex)}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Development Actions & Reflection Notes */}
                    <div>
                      <h3
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "20px",
                          lineHeight: "30px",
                          color: "#0C0C48",
                          margin: 0,
                          marginBottom: "8px",
                        }}
                      >
                        Development Actions &amp; Reflection Notes
                      </h3>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "21px",
                          color: "#4A4A4C",
                          margin: 0,
                          marginBottom: "16px",
                        }}
                      >
                        Add specific actions, training, shadowing opportunities, or conversations with your manager
                      </p>
                      <textarea
                        value={note}
                        onChange={(e) => handleNoteChange(cap.id, e.target.value)}
                        placeholder="e.g. Shadow colleague on grant applications, attend funder roadshow in Q2, ask manager about leading next team meeting"
                        style={{
                          width: "100%",
                          minHeight: "160px",
                          padding: "14px 18px",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #8F9092",
                          borderRadius: "15px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "24px",
                          color: "#4A4A4C",
                          resize: "vertical",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                        <button
                          onClick={() => handleSaveNotes(cap.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px 28px",
                            backgroundColor: "#0C0C48",
                            border: "2px solid #0C0C48",
                            borderRadius: "29px",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#FFFFFF",
                            cursor: "pointer",
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save notes"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add More Capabilities */}
            {unassessedCapabilities.length > 0 && (
              <div style={{ marginBottom: "40px" }}>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "26px",
                    lineHeight: "34px",
                    color: "#0C0C48",
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  Add More Capabilities
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#4A4A4C",
                    margin: 0,
                    marginBottom: "20px",
                  }}
                >
                  Capabilities you haven&apos;t assessed yet. Click to add them to your development plan.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {unassessedCapabilities.map((cap) => (
                    <button
                      key={cap.id}
                      onClick={() => {
                        updateResponse(cap.id, {
                          capabilityId: cap.id,
                          isIncluded: true,
                          currentLevel: null,
                          demonstratedDescriptors: [],
                          developmentFocus: [],
                        });
                        setActiveCapabilityTab(cap.id);
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 24px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #8F9092",
                        borderRadius: "10px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#4A4A4C",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ color: "#4A4A4C", fontSize: "18px" }}>+</span>
                      {cap.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Training & Development Resources ── */}
      <div className="w-full" style={{ backgroundColor: "#F3F3F6", padding: "50px 0", marginTop: "40px" }}>
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

      {/* ── Bottom Action Bar (above global footer) ── */}
      {allIncludedCapabilities.length > 0 && (
        <div className="w-full" style={{ backgroundColor: "#0C0C48", padding: "24px 0" }}>
          <div
            style={{
              width: "1440px",
              margin: "0 auto",
              padding: "0 100px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "rgba(255,255,255,0.8)",
                margin: 0,
              }}
            >
              View the Summary page to print or save your full assessment and development plan
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link
                href="/assess"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  backgroundColor: "transparent",
                  border: "2px solid #FFFFFF",
                  borderRadius: "29px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 1L3 7L9 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Self-Assessment
              </Link>
              <Link
                href="/summary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #FFFFFF",
                  borderRadius: "29px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#0C0C48",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0C0C48" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                View summary
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirmation Modal ── */}
      {capabilityToRemove && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={() => setCapabilityToRemove(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
              padding: "32px",
              maxWidth: "480px",
              width: "100%",
              margin: "0 16px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(211,47,47,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: "27px",
                    color: "#0C0C48",
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  Remove Capability?
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: "21px", color: "#4A4A4C", margin: 0 }}>
                  Are you sure you want to remove <strong>{capabilityToRemove.name}</strong> from your development plan? This will delete all associated data including selected descriptors and reflection notes.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                onClick={() => setCapabilityToRemove(null)}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #8F9092",
                  borderRadius: "29px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#4A4A4C",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveCapability(capabilityToRemove.id)}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#d32f2f",
                  border: "2px solid #d32f2f",
                  borderRadius: "29px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                Remove Capability
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
