"use client";

import React from "react";
import { useAssessment } from "@/contexts/AssessmentContext";
import { capabilities } from "@/data/capabilities";
import { CapabilityLevel, SelectedDescriptor } from "@/types";
import Link from "next/link";

const LEVEL_ORDER: CapabilityLevel[] = ["FOUNDATION", "INTERMEDIATE", "ADVANCED", "EXEMPLAR"];

type ReportMode = "all" | "focus-only";

export default function SummaryPage() {
  const { assessmentState, getResponse, clearAssessment } = useAssessment();
  const [showNameModal, setShowNameModal] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [tempName, setTempName] = React.useState("");
  const [reportMode, setReportMode] = React.useState<ReportMode>("all");
  const [tempReportMode, setTempReportMode] = React.useState<ReportMode>("all");

  const completedCapabilities = capabilities.filter((cap) => {
    const response = getResponse(cap.id);
    return (
      response &&
      (response.currentLevel !== null ||
        response.isIncluded === true ||
        (response.developmentFocus && response.developmentFocus.length > 0) ||
        (response.demonstratedDescriptors && response.demonstratedDescriptors.length > 0))
    );
  });

  const handlePrint = () => {
    setTempReportMode(reportMode);
    setTempName(userName || "");
    setShowNameModal(true);
  };

  const handleConfirmName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setReportMode(tempReportMode);
      setShowNameModal(false);
      setTimeout(() => window.print(), 150);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all your assessment data? This cannot be undone.")) {
      clearAssessment();
    }
  };

  const getDemonstrated = (capabilityId: string): SelectedDescriptor[] => {
    const response = getResponse(capabilityId);
    return response?.demonstratedDescriptors || response?.focusAreas || [];
  };

  const getDevelopmentFocus = (capabilityId: string): SelectedDescriptor[] => {
    const response = getResponse(capabilityId);
    return response?.developmentFocus || [];
  };

  const groupByLevel = (descriptors: SelectedDescriptor[]): Record<CapabilityLevel, SelectedDescriptor[]> => {
    const byLevel: Record<CapabilityLevel, SelectedDescriptor[]> = {
      FOUNDATION: [],
      INTERMEDIATE: [],
      ADVANCED: [],
      EXEMPLAR: [],
    };
    descriptors.forEach((d) => {
      if (byLevel[d.level]) byLevel[d.level].push(d);
    });
    return byLevel;
  };

  const printCapabilities =
    reportMode === "focus-only"
      ? completedCapabilities.filter((cap) => getDevelopmentFocus(cap.id).length > 0)
      : completedCapabilities;

  const totalDemonstrated = completedCapabilities.reduce((sum, c) => sum + getDemonstrated(c.id).length, 0);
  const totalFocus = printCapabilities.reduce((sum, c) => sum + getDevelopmentFocus(c.id).length, 0);

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      {/* ══════════════════════════════════════════
          SECTION A — HERO
          ══════════════════════════════════════════ */}
      <div style={{ backgroundColor: "#F3F3F6", minHeight: "274px" }}>
        <div
          className="resp-container"
          style={{
            maxWidth: "1440px",
            width: "100%",
            margin: "0 auto",
            padding: "50px 100px 40px",
            position: "relative",
          }}
        >
          {/* Top-right action buttons */}
          <div
            className="no-print resp-download-btn"
            style={{
              position: "absolute",
              top: "50px",
              right: "100px",
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              onClick={handlePrint}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                height: "43px",
                padding: "8px 16px 8px 24px",
                backgroundColor: "#FFFFFF",
                border: "2px solid #1F2BD4",
                borderRadius: "30px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#1F2BD4",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Print / Save PDF
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.5 4.5L12 9L6.5 13.5" stroke="#1F2BD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={handleClear}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                height: "43px",
                padding: "8px 16px 8px 24px",
                backgroundColor: "#FFFFFF",
                border: "2px solid #1F2BD4",
                borderRadius: "30px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#1F2BD4",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Clear
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.5 4.5L12 9L6.5 13.5" stroke="#1F2BD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <h1
            className="resp-heading-xl"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "50px",
              lineHeight: "60px",
              color: "#0C0C48",
              margin: 0,
              marginBottom: "12px",
            }}
          >
            Development Summary
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "27px",
              color: "#0C0C48",
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Focus on 1–3 capabilities per year for targeted professional development
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "27px",
              color: "#4A4A4C",
              margin: 0,
            }}
          >
            Last updated on{" "}
            {new Date(assessmentState.lastUpdated).toLocaleDateString("en-NZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════ */}
      <div className="resp-container" style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", padding: "40px 100px 0" }}>
        {completedCapabilities.length === 0 ? (
          /* ─── EMPTY STATE ─── */
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "#F3F3F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6d6e71" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "26px", color: "#0C0C48", margin: "0 0 8px" }}>
              No Assessments Yet
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#4A4A4C", margin: "0 0 24px" }}>
              You haven&apos;t completed any capability assessments.
            </p>
            <Link
              href="/assess"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "15.5px 40px",
                backgroundColor: "#0C0C48",
                border: "2px solid #0C0C48",
                borderRadius: "29px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
            >
              Start Assessment
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1L7 7L1 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            {/* ── SECTION B — 3 METRIC CARDS ── */}
            <div className="summary-metrics-row flex-wrap" style={{ display: "flex", justifyContent: "center", gap: "29px", marginBottom: "24px" }}>
              <div
                className="summary-metric-card"
                style={{
                  width: "100%",
                  maxWidth: "295px",
                  height: "76px",
                  padding: "8px 24px",
                  backgroundColor: "#F3F3F6",
                  border: "1px solid #8F9092",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#4A4A4C" }}>
                  Capabilities Assessed
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "28px", lineHeight: "36px", color: "#0C0C48" }}>
                  {completedCapabilities.length}
                </span>
              </div>
              <div
                className="summary-metric-card"
                style={{
                  width: "100%",
                  maxWidth: "295px",
                  height: "76px",
                  padding: "8px 24px",
                  backgroundColor: "#F3F3F6",
                  border: "1px solid #8F9092",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#4A4A4C" }}>
                  Descriptors Demonstrated
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "28px", lineHeight: "36px", color: "#0C0C48" }}>
                  {totalDemonstrated}
                </span>
              </div>
              <div
                className="summary-metric-card"
                style={{
                  width: "100%",
                  maxWidth: "295px",
                  height: "76px",
                  padding: "8px 24px",
                  backgroundColor: "#F3F3F6",
                  border: "1px solid #8F9092",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#4A4A4C" }}>
                  Development Focus Areas
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "28px", lineHeight: "36px", color: "#0C0C48" }}>
                  {totalFocus}
                </span>
              </div>
            </div>

            {/* ── SECTION C — TWO ACTION BUTTONS ── */}
            <div className="no-print" style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "48px" }}>
              <Link
                href="/assess"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  height: "55px",
                  padding: "15.5px 40px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #0C0C48",
                  borderRadius: "29px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#0C0C48",
                  textDecoration: "none",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0C0C48" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Continue Assessment
              </Link>
              <Link
                href="/plan"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  height: "55px",
                  padding: "15.5px 40px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #0C0C48",
                  borderRadius: "29px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#0C0C48",
                  textDecoration: "none",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0C0C48" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Add Development Notes
              </Link>
            </div>

            {/* ── SECTION D — ASSESSMENT OVERVIEW TABLE ── */}
            <div style={{ marginBottom: "56px" }}>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "26px",
                  lineHeight: "34px",
                  color: "#0C0C48",
                  margin: "0 0 24px",
                }}
              >
                Assessment Overview
              </h2>
              <div className="overflow-x-auto assessment-overview-table" style={{ borderRadius: "15px", border: "1px solid #E2E3E4", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        height: "63px",
                        backgroundColor: "#0C0C48",
                      }}
                    >
                      <th
                        style={{
                          textAlign: "left",
                          padding: "0 32px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        Capability
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "0 32px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        Demonstrated
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "0 32px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "16px",
                          color: "#FFFFFF",
                        }}
                      >
                        To develop
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedCapabilities.map((cap, rowIdx) => (
                      <tr
                        key={cap.id}
                        style={{
                          height: "69px",
                          backgroundColor: rowIdx % 2 === 0 ? "#FFFFFF" : "#F3F3F6",
                          borderBottom: "1px solid #E2E3E4",
                        }}
                      >
                        <td style={{ padding: "0 32px" }}>
                          <Link
                            href={`/assess?capability=${cap.id}`}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 400,
                              fontSize: "16px",
                              color: "#1F2BD4",
                              textDecoration: "none",
                            }}
                          >
                            {cap.name}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="no-print">
                              <path d="M5 1L11 7L5 13" stroke="#1F2BD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </td>
                        <td style={{ padding: "0 32px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#4A4A4C" }}>
                          {getDemonstrated(cap.id).length}
                        </td>
                        <td style={{ padding: "0 32px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#4A4A4C" }}>
                          {getDevelopmentFocus(cap.id).length || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── SECTION E — CAPABILITY DETAILS CARDS ── */}
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "26px",
                  lineHeight: "34px",
                  color: "#0C0C48",
                  margin: "0 0 8px",
                }}
              >
                Capability Details
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#4A4A4C",
                  margin: "0 0 32px",
                }}
              >
                Your demonstrated competencies, development focus areas, and personal notes for each capability
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {completedCapabilities.map((cap) => {
                  const demonstrated = getDemonstrated(cap.id);
                  const focus = getDevelopmentFocus(cap.id);
                  const response = getResponse(cap.id);
                  const demonstratedByLevel = groupByLevel(demonstrated);
                  const focusByLevel = groupByLevel(focus);

                  return (
                    <div
                      key={cap.id}
                      style={{
                        border: "2px solid rgba(31, 43, 212, 0.4)",
                        borderRadius: "15px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Card header */}
                      <div
                        className="resp-card"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "32px",
                          backgroundColor: "#F4F4FD",
                          borderBottom: "1px solid rgba(31, 43, 212, 0.2)",
                          minHeight: "100px",
                        }}
                      >
                        <h3
                          className="resp-heading-lg"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: "32px",
                            lineHeight: "42px",
                            color: "#0C0C48",
                            margin: 0,
                          }}
                        >
                          {cap.name}
                        </h3>
                        <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              height: "39px",
                              padding: "6px 18px",
                              backgroundColor: "#FFF7D7",
                              borderRadius: "20px",
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 600,
                              fontSize: "18px",
                              color: "#0C0C48",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {focus.length} to develop
                          </span>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              height: "39px",
                              padding: "6px 18px",
                              backgroundColor: "rgba(25, 205, 128, 0.2)",
                              borderRadius: "20px",
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 600,
                              fontSize: "18px",
                              color: "#0C0C48",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {demonstrated.length} demonstrated
                          </span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="resp-card" style={{ padding: "32px" }}>
                        {/* Development Focus Areas */}
                        {focus.length > 0 && (
                          <div style={{ marginBottom: "32px" }}>
                            <h4
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                                fontSize: "26px",
                                lineHeight: "34px",
                                color: "#0C0C48",
                                margin: "0 0 20px",
                              }}
                            >
                              Development Focus Areas
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                              {LEVEL_ORDER.map((level) => {
                                const items = focusByLevel[level];
                                if (items.length === 0) return null;
                                const levelData = cap.levels.find((l) => l.level === level);
                                if (!levelData) return null;
                                return (
                                  <div
                                    key={level}
                                    className="resp-card"
                                    style={{
                                      backgroundColor: "rgba(255, 247, 215, 0.5)",
                                      borderRadius: "15px",
                                      padding: "32px",
                                    }}
                                  >
                                    <h5
                                      style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#0C0C48",
                                        margin: "0 0 16px",
                                      }}
                                    >
                                      {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                    </h5>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                                      {items.sort((a, b) => a.descriptorIndex - b.descriptorIndex).map((f) => {
                                        const text = levelData.bulletPoints[f.descriptorIndex];
                                        if (!text) return null;
                                        return (
                                          <li
                                            key={`${f.level}-${f.descriptorIndex}`}
                                            style={{
                                              display: "flex",
                                              alignItems: "flex-start",
                                              gap: "12px",
                                              fontFamily: "Inter, sans-serif",
                                              fontWeight: 400,
                                              fontSize: "16px",
                                              lineHeight: "27px",
                                              color: "#4A4A4C",
                                            }}
                                          >
                                            <span style={{ color: "#FBDF65", fontSize: "18px", flexShrink: 0, marginTop: "4px" }}>→</span>
                                            {text}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Already Demonstrated */}
                        {demonstrated.length > 0 && (
                          <div style={{ marginBottom: "32px" }}>
                            <h4
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                                fontSize: "26px",
                                lineHeight: "34px",
                                color: "#0C0C48",
                                margin: "0 0 20px",
                              }}
                            >
                              Already Demonstrated ({demonstrated.length} descriptor{demonstrated.length !== 1 ? "s" : ""})
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                              {LEVEL_ORDER.map((level) => {
                                const items = demonstratedByLevel[level];
                                if (items.length === 0) return null;
                                const levelData = cap.levels.find((l) => l.level === level);
                                if (!levelData) return null;
                                return (
                                  <div
                                    key={level}
                                    className="resp-card"
                                    style={{
                                      backgroundColor: "rgba(25, 205, 128, 0.08)",
                                      borderRadius: "15px",
                                      padding: "32px",
                                    }}
                                  >
                                    <h5
                                      style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: "#19CD80",
                                        margin: "0 0 16px",
                                      }}
                                    >
                                      {level.charAt(0) + level.slice(1).toLowerCase()} Level
                                    </h5>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                                      {items.sort((a, b) => a.descriptorIndex - b.descriptorIndex).map((d) => {
                                        const text = levelData.bulletPoints[d.descriptorIndex];
                                        if (!text) return null;
                                        return (
                                          <li
                                            key={`${d.level}-${d.descriptorIndex}`}
                                            style={{
                                              display: "flex",
                                              alignItems: "flex-start",
                                              gap: "12px",
                                              fontFamily: "Inter, sans-serif",
                                              fontWeight: 400,
                                              fontSize: "16px",
                                              lineHeight: "27px",
                                              color: "#4A4A4C",
                                            }}
                                          >
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "5px" }}>
                                              <path d="M4 9L7.5 12.5L14 5.5" stroke="#19CD80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {text}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Personal Reflection Notes */}
                        {response?.notes && response.notes.trim().length > 0 && (
                          <div style={{ marginBottom: "16px" }}>
                            <h4
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                                fontSize: "26px",
                                lineHeight: "34px",
                                color: "#0C0C48",
                                margin: "0 0 20px",
                              }}
                            >
                              Personal Reflection Notes
                            </h4>
                            <div
                              className="resp-card"
                              style={{
                                backgroundColor: "#F2F2F2",
                                borderRadius: "15px",
                                padding: "32px",
                              }}
                            >
                              <p
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontWeight: 400,
                                  fontSize: "16px",
                                  lineHeight: "27px",
                                  color: "#4A4A4C",
                                  margin: 0,
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {response.notes}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Empty state within card */}
                        {demonstrated.length === 0 && focus.length === 0 && (!response?.notes || response.notes.trim().length === 0) && (
                          <div>
                            <p
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 400,
                                fontSize: "20px",
                                lineHeight: "30px",
                                color: "#4A4A4C",
                                margin: "0 0 20px",
                              }}
                            >
                              No descriptors assessed or development focus set for this capability yet.
                            </p>
                            <Link
                              href={`/assess?capability=${cap.id}`}
                              className="no-print"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                height: "55px",
                                padding: "15.5px 40px",
                                backgroundColor: "#FFFFFF",
                                border: "2px solid #0C0C48",
                                borderRadius: "29px",
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                                fontSize: "16px",
                                color: "#0C0C48",
                                textDecoration: "none",
                              }}
                            >
                              Go to Assessment
                              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                                <path d="M1 1L7 7L1 13" stroke="#0C0C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ══════════════════════════════════════════
          SECTION F — BOTTOM CTA BAND
          ══════════════════════════════════════════ */}
      <div className="w-full no-print" style={{ backgroundColor: "#0C0C48", padding: "36px 0" }}>
        <div
          className="resp-container"
          style={{
            maxWidth: "1440px",
            width: "100%",
            margin: "0 auto",
            padding: "0 100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "30px",
                color: "#FFFFFF",
                margin: "0 0 4px",
              }}
            >
              Select your development focus
            </h3>
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
              Return to the self-assessment page and tick &ldquo;Want to develop&rdquo; for the descriptors you&apos;d like to focus on. Then add development notes on the Plan page.
            </p>
          </div>
          <Link
            href="/assess"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              height: "55px",
              padding: "15.5px 40px",
              backgroundColor: "#FFFFFF",
              border: "2px solid #FFFFFF",
              borderRadius: "29px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#0C0C48",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Go to Assessment
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M1 1L7 7L1 13" stroke="#0C0C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          NAME & REPORT OPTIONS MODAL
          ══════════════════════════════════════════ */}
      {showNameModal && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
              padding: "48px",
              maxWidth: "540px",
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "26px", color: "#0C0C48", margin: "0 0 16px" }}>
              Print / Save Report
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#4A4A4C", margin: "0 0 32px", lineHeight: "24px" }}>
              Enter your name and choose what to include in the report.
            </p>

            <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: "#4A4A4C", marginBottom: "8px" }}>
              Your Name
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleConfirmName(); }}
              placeholder="Enter your full name"
              autoFocus
              style={{
                width: "100%",
                padding: "14px 18px",
                border: "2px solid #8F9092",
                borderRadius: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                color: "#4A4A4C",
                outline: "none",
                marginBottom: "28px",
                boxSizing: "border-box",
              }}
            />

            <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: "#4A4A4C", marginBottom: "12px" }}>
              Report Content
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "16px 20px",
                  borderRadius: "10px",
                  border: `2px solid ${tempReportMode === "all" ? "#1F2BD4" : "#8F9092"}`,
                  backgroundColor: tempReportMode === "all" ? "rgba(31,43,212,0.05)" : "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                <input type="radio" name="reportMode" value="all" checked={tempReportMode === "all"} onChange={() => setTempReportMode("all")} style={{ marginTop: "2px", accentColor: "#1F2BD4" }} />
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px", color: "#0C0C48" }}>All Descriptors</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#4A4A4C", marginTop: "4px" }}>
                    Include demonstrated competencies, development focus areas, and notes for every assessed capability.
                  </div>
                </div>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "16px 20px",
                  borderRadius: "10px",
                  border: `2px solid ${tempReportMode === "focus-only" ? "#19CD80" : "#8F9092"}`,
                  backgroundColor: tempReportMode === "focus-only" ? "rgba(25,205,128,0.05)" : "#FFFFFF",
                  cursor: "pointer",
                }}
              >
                <input type="radio" name="reportMode" value="focus-only" checked={tempReportMode === "focus-only"} onChange={() => setTempReportMode("focus-only")} style={{ marginTop: "2px", accentColor: "#19CD80" }} />
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px", color: "#0C0C48" }}>Development Focus Areas Only</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#4A4A4C", marginTop: "4px" }}>
                    Only include capabilities with development focus items — ideal for a concise development conversation.
                  </div>
                </div>
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                onClick={() => { setShowNameModal(false); setTempName(""); }}
                style={{
                  padding: "12px 28px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #8F9092",
                  borderRadius: "29px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#4A4A4C",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmName}
                disabled={!tempName.trim()}
                style={{
                  padding: "12px 28px",
                  backgroundColor: tempName.trim() ? "#0C0C48" : "#8F9092",
                  border: `2px solid ${tempName.trim() ? "#0C0C48" : "#8F9092"}`,
                  borderRadius: "29px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#FFFFFF",
                  cursor: tempName.trim() ? "pointer" : "not-allowed",
                  opacity: tempName.trim() ? 1 : 0.6,
                }}
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
