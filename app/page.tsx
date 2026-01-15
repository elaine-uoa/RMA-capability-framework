"use client";

import Link from "next/link";
import { useState } from "react";
import { capabilities } from "@/data/capabilities";

// Key Areas structure mapping capabilities to their key areas
// ARMA-inspired vibrant colors while staying within UoA brand palette
interface KeyArea {
  id: string;
  name: string;
  description: string;
  color: { solid: string; hover: string; light: string };
  icon: React.ReactNode;
  capabilityIds: string[];
}

const keyAreas: KeyArea[] = [
  {
    id: "engagement-impact",
    name: "Research Engagement and Impact",
    description: "Building relationships, exchanging knowledge, and maximizing research outcomes",
    color: { solid: "#00457D", hover: "#003561", light: "#E8F4FD" },
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    capabilityIds: ["research-engagement", "maximising-impact"]
  },
  {
    id: "development-culture",
    name: "Researcher Development and Culture",
    description: "Supporting researcher capabilities and fostering a positive research environment",
    color: { solid: "#00877C", hover: "#006B63", light: "#E6F7F5" },
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    capabilityIds: ["researcher-development", "environment-culture"]
  },
  {
    id: "proposal-development",
    name: "Research Proposal Development",
    description: "Identifying funding opportunities and supporting research proposals",
    color: { solid: "#0098C3", hover: "#007A9C", light: "#E6F6FC" },
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    capabilityIds: ["funding-opportunities", "proposal-support"]
  },
  {
    id: "project-risk",
    name: "Research Project and Risk Management",
    description: "Managing research projects from initiation through to monitoring and reporting",
    color: { solid: "#D97706", hover: "#B45309", light: "#FEF6E7" },
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4" />
      </svg>
    ),
    capabilityIds: ["initiation", "projects-initiatives"]
  },
  {
    id: "policy-strategy",
    name: "Research Policy and Strategy",
    description: "Contributing to and implementing research policies and strategic frameworks",
    color: { solid: "#4F2D7F", hover: "#3D2262", light: "#F3EEF8" },
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    capabilityIds: ["monitoring-reporting", "policy-strategy"]
  }
];

// Capability metadata with icons
const capabilityMetadata: Record<string, { icon: React.ReactNode }> = {
  "research-engagement": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  "maximising-impact": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  "researcher-development": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  "environment-culture": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  "funding-opportunities": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  "proposal-support": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  "initiation": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  "projects-initiatives": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  "monitoring-reporting": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  "policy-strategy": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
};

// Component for expandable key area card (ARMA-inspired)
function KeyAreaCard({ area }: { area: KeyArea }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const areaCapabilities = capabilities.filter(cap => 
    area.capabilityIds.includes(cap.id)
  );

  return (
    <div className="overflow-hidden">
      {/* ARMA-inspired vibrant colored header card - Increased size for prominence */}
      <div 
        className="rounded-2xl transition-all duration-300 cursor-pointer"
        style={{ 
          backgroundColor: area.color.solid,
          padding: '36px',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-6">
          {/* Large icon - increased size */}
          <div className="flex-shrink-0 text-white/90" style={{ fontSize: '2.5rem' }}>
            {area.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold mb-3" style={{ color: '#FFFFFF', fontSize: '1.75rem', lineHeight: '1.3' }}>
              {area.name}
            </h3>
            <p className="leading-relaxed" style={{ color: '#FFFFFF', fontSize: '1.05rem' }}>
              {area.description}
            </p>
          </div>
          {/* Expand/collapse indicator - increased size */}
          <button 
            className="flex-shrink-0 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            style={{ width: '48px', height: '48px' }}
            aria-label={isExpanded ? "Collapse capabilities" : "Expand capabilities"}
          >
            <svg 
              className={`text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              style={{ width: '24px', height: '24px' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Expandable capabilities list */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ marginTop: isExpanded ? '24px' : '0' }}
      >
        <div 
          className="rounded-xl border-2 overflow-hidden"
          style={{ borderColor: area.color.solid }}
        >
          {areaCapabilities.map((cap, index) => {
            const metadata = capabilityMetadata[cap.id] || { icon: null };
            
            return (
              <Link
                key={cap.id}
                href={`/explore?capability=${cap.id}`}
                className="group flex items-center bg-white hover:bg-gray-50 transition-colors"
                style={{ 
                  paddingLeft: '18px',
                  paddingRight: '18px', 
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  gap: '14px',
                  borderBottom: index < areaCapabilities.length - 1 ? '2px solid #E5E5E5' : 'none'
                }}
              >
                <div 
                  className="flex-shrink-0 rounded-lg flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: area.color.light, 
                    color: area.color.solid,
                    width: '36px',
                    height: '36px',
                    fontSize: '0.95rem'
                  }}
                >
                  {metadata.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 
                    className="font-semibold text-[#333333] group-hover:text-[#00457D] transition-colors"
                    style={{ fontSize: '0.95rem', lineHeight: '1.4' }}
                  >
                    {cap.name}
                  </h4>
                  <p className="text-[#666666] line-clamp-1" style={{ fontSize: '0.85rem', marginTop: '2px' }}>
                    {cap.description}
                  </p>
                </div>
                <svg 
                  className="flex-shrink-0 text-[#CCCCCC] group-hover:text-[#00457D] transition-colors"
                  style={{ width: '18px', height: '18px' }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#F5F5F5]">
      {/* Hero Section - UoA Navy background with clean white text */}
      <section className="w-full bg-[#00457D] text-white">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: '#FFFFFF' }}>
              RMA Capability Framework
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#FFFFFF' }}>
              A professional development tool for Research Management & Administration staff at Waipapa Taumata Rau, University of Auckland. 
              Explore capabilities, assess your skills, and create personalized development plans.
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
              <Link 
                href="/assess" 
                className="inline-flex items-center justify-center gap-4 min-w-[320px] px-10 py-5 bg-white text-[#00457D] font-semibold text-base rounded-xl hover:bg-[#F5F5F5] transition-all shadow-md hover:shadow-lg"
              >
                Start Self-Assessment
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/how-to-use" 
                className="inline-flex items-center justify-center gap-4 min-w-[320px] px-10 py-5 bg-white text-[#00457D] font-semibold text-base rounded-xl hover:bg-[#F5F5F5] transition-all shadow-md hover:shadow-lg"
              >
                How to use this tool
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Overview Section */}
      <section className="w-full bg-[#F5F5F5]">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-8 py-16 md:py-20">
          {/* Section heading - Increased spacing below */}
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-4">
              Framework Overview
            </h2>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed max-w-[700px] mx-auto">
              The RMA Capability Framework comprises <strong>10 core capabilities</strong> organized across <strong>5 key functional areas</strong>. 
              Click on any area below to explore detailed descriptors at Foundation, Intermediate, Advanced, and Exemplar levels.
            </p>
          </div>
          
          {/* ARMA-inspired Key Area Cards - Vertical layout */}
          <div className="flex flex-col" style={{ gap: '48px' }}>
            {keyAreas.map((area) => (
              <KeyAreaCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      </section>

      {/* Reference Links Section */}
      <section className="w-full bg-[#F5F5F5] border-t border-[#E5E5E5]">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="text-[#666666]">Related resources:</span>
            <a 
              href="https://research-hub.auckland.ac.nz/induction-skills-and-development/research-management-and-administration-rma-staff-development"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#0098C3] hover:text-[#00457D] font-medium transition-colors"
            >
              UoA Research Hub
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
