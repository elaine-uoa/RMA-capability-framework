"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { capabilities } from "@/data/capabilities";
import { roles, functions } from "@/data/roleFilters";
import { useGuidedFilter } from "@/hooks/useGuidedFilter";

// Key Areas structure mapping capabilities to their key areas
// ARMA-inspired vibrant colours while staying within UoA brand palette
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
    description: "Building relationships, exchanging knowledge, and maximising research outcomes",
    color: { solid: "#0c0c48", hover: "#0a0a3a", light: "#e7e7ed" },
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
    color: { solid: "#00877C", hover: "#006B63", light: "#e6f7f5" },
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
    color: { solid: "#1f2bd4", hover: "#1929a8", light: "#e7e7ed" },
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
    color: { solid: "#D97706", hover: "#B45309", light: "#fef6e7" },
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
    color: { solid: "#4F2D7F", hover: "#3D2262", light: "#f3eef8" },
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

export default function Home() {
  const {
    selectedFilterId,
    filterType,
    mappedCapabilityIds,
    getRequiredLevel,
    setGuidedFilter,
    clearGuidedFilter,
  } = useGuidedFilter();
  const [activeTab, setActiveTab] = useState<'role' | 'function'>('role');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine which capabilities should be visible based on the selected filter
  const visibleCapabilityIds = selectedFilterId && filterType
    ? mappedCapabilityIds
    : null; // null means show all capabilities
  const currentTab = filterType ?? activeTab;
  
  // Filter roles and functions based on search query
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredFunctions = functions.filter(func => 
    func.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleFilterSelect = (type: 'role' | 'function', id: string) => {
    setGuidedFilter(type, id);
    setIsDropdownOpen(false);
    setSearchQuery('');
    setActiveTab(type);
  };
  
  const clearFilter = () => {
    clearGuidedFilter();
    setSearchQuery('');
  };
  
  const handleTabChange = (tab: 'role' | 'function') => {
    setActiveTab(tab);
    setSearchQuery('');
  };
  
  return (
    <div className="w-full min-h-screen bg-[#f2f2f2]">
      {/* Hero Section - UoA Navy background with clean white text */}
      <section className="w-full bg-[#0c0c48] text-white">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-full mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: '#FFFFFF' }}>
              RMA Capability Framework
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#FFFFFF' }}>
              A professional development tool for Research Management &amp; Administration staff at Waipapa Taumata Rau, University of Auckland. 
              Explore capabilities, assess your skills, and create personalised development plans.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap xl:flex-nowrap mb-8">
              <Link 
                href="/how-to-use" 
                className="inline-flex items-center justify-center gap-3 min-w-[260px] px-10 py-5 bg-white text-[#0c0c48] font-semibold text-lg rounded-xl hover:bg-[#f2f2f2] transition-all shadow-lg hover:shadow-xl"
              >
                How to use this tool
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              {/* Download Framework Button - dark background with white text for clear contrast */}
              <a 
                href="/api/download" 
                download
                className="inline-flex items-center justify-center gap-3 min-w-[280px] px-12 py-5 font-semibold text-lg rounded-xl border-2 border-white/50 hover:bg-white/10 transition-all shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#0c0c48', color: '#FFFFFF' }}
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#FFFFFF' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span style={{ color: '#FFFFFF' }}>Download the Framework</span>
              </a>
              
              <Link 
                href="/assess" 
                className="inline-flex items-center justify-center gap-3 min-w-[260px] px-10 py-5 bg-white text-[#0c0c48] font-semibold text-lg rounded-xl hover:bg-[#f2f2f2] transition-all shadow-lg hover:shadow-xl"
              >
                Start Self-Assessment
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About the Framework Section */}
      <section className="w-full bg-white border-b border-[#e2e3e4]">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-8" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#4a4a4c] mb-6">
              About the Framework
            </h2>
            <p className="text-base md:text-lg text-[#6d6e71] leading-relaxed max-w-[900px] mx-auto mb-5">
              The RMA Capability Framework is a professional development tool created to encourage professional development activities for all staff across the RMA function.
            </p>
            <p className="text-base md:text-lg text-[#6d6e71] leading-relaxed max-w-[900px] mx-auto">
              It comprises <strong>10 core capabilities</strong> organised across <strong>5 key functional areas</strong> and <strong>4 proficiency levels</strong>, and supports role-focused development conversations rather than performance evaluation.
            </p>
          </div>

          {/* Key information cards */}
          <div className="grid md:grid-cols-3" style={{ gap: '32px', marginBottom: '48px' }}>
            <div className="bg-[#f2f2f2] rounded-xl border border-[#e2e3e4]" style={{ padding: '40px' }}>
              <div className="w-12 h-12 rounded-lg bg-[#0c0c48]/10 flex items-center justify-center" style={{ marginBottom: '24px' }}>
                <svg className="w-6 h-6 text-[#0c0c48]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#4a4a4c] text-lg" style={{ marginBottom: '16px' }}>Purpose</h3>
              <p className="text-base text-[#6d6e71] leading-relaxed">
                The key purpose of RMA at Waipapa Taumata Rau, University of Auckland, is to enable and support research excellence through strategic and operational leadership, with impactful outcomes for Aotearoa New Zealand and beyond while upholding Te Tiriti o Waitangi principles and researcher-centred delivery.
              </p>
            </div>
            <div className="bg-[#f2f2f2] rounded-xl border border-[#e2e3e4]" style={{ padding: '40px' }}>
              <div className="w-12 h-12 rounded-lg bg-[#00877C]/10 flex items-center justify-center" style={{ marginBottom: '24px' }}>
                <svg className="w-6 h-6 text-[#00877C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#4a4a4c] text-lg" style={{ marginBottom: '16px' }}>Creation</h3>
              <p className="text-base text-[#6d6e71] leading-relaxed">
                Feedback was gathered through extensive consultation with an external consultant and staff across the RMA community. Drawing on international frameworks, this bespoke model reflects the unique context and aspirations of Waipapa Taumata Rau.
              </p>
            </div>
            <div className="bg-[#f2f2f2] rounded-xl border border-[#e2e3e4]" style={{ padding: '40px' }}>
              <div className="w-12 h-12 rounded-lg bg-[#1f2bd4]/10 flex items-center justify-center" style={{ marginBottom: '24px' }}>
                <svg className="w-6 h-6 text-[#1f2bd4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-[#4a4a4c] text-lg" style={{ marginBottom: '16px' }}>Use</h3>
              <p className="text-base text-[#6d6e71] leading-relaxed">
                This interactive website helps you identify capabilities to develop in your current role or future aspirations. It is not for performance evaluation, and can be used to guide development discussions with your manager.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Capabilities Section */}
      <section className="w-full bg-[#f2f2f2]" style={{ marginTop: 0 }}>
        <div className="max-w-[1140px] mx-auto px-6 lg:px-8" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
          
          {/* Role / Function Filter */}
          <div className="mb-12" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
            <div className="bg-white rounded-xl border-2 border-[#e2e3e4] shadow-sm" style={{ padding: '36px 48px' }}>
              {/* Header - Centered */}
              <div className="text-center" style={{ marginBottom: '32px' }}>
                <h3 className="text-xl font-semibold text-[#4a4a4c]" style={{ marginBottom: '12px' }}>
                  Filter by Role or Function
                </h3>
                <p className="text-sm text-[#6d6e71] max-w-[600px] mx-auto">
                  Select a role or function to see relevant capabilities. Click again to show all capabilities.
                </p>
              </div>
              
              {/* Active filter display - Centered */}
              {selectedFilterId && (
                <div className="flex items-center justify-center gap-3 p-5 bg-[#E8F4FD] rounded-lg border border-[#1f2bd4] max-w-[700px] mx-auto" style={{ marginBottom: '32px' }}>
                  <svg className="w-5 h-5 text-[#1f2bd4] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <div className="flex-1 text-center">
                    <p className="text-sm font-medium text-[#0c0c48]">
                      Filtering by {filterType === 'role' ? 'Role' : 'Function'}:{' '}
                      <span className="font-bold">
                        {filterType === 'role' 
                          ? roles.find(r => r.id === selectedFilterId)?.name 
                          : functions.find(f => f.id === selectedFilterId)?.name}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={clearFilter}
                    className="bg-white text-[#0c0c48] text-sm font-semibold rounded-lg border border-[#1f2bd4] hover:bg-[#f2f2f2] transition-colors flex-shrink-0"
                    style={{ padding: '12px 24px' }}
                  >
                    Show All
                  </button>
                </div>
              )}
              
              {/* Tab Selector for Role vs Function */}
              <div className="flex justify-center" style={{ marginBottom: '24px' }}>
                <div className="inline-flex rounded-lg border-2 border-[#d9d9d9] bg-white overflow-hidden">
                  <button
                    onClick={() => handleTabChange('role')}
                    className={`flex items-center gap-2 font-medium text-sm transition-all ${
                      currentTab === 'role'
                        ? 'bg-[#0c0c48] text-white'
                        : 'bg-white text-[#4a4a4c] hover:bg-[#f3f3f6]'
                    }`}
                    style={{ padding: '12px 28px' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Roles ({roles.length})
                  </button>
                  <button
                    onClick={() => handleTabChange('function')}
                    className={`flex items-center gap-2 font-medium text-sm transition-all border-l-2 border-[#d9d9d9] ${
                      currentTab === 'function'
                        ? 'bg-[#00877C] text-white'
                        : 'bg-white text-[#4a4a4c] hover:bg-[#f3f3f6]'
                    }`}
                    style={{ padding: '12px 28px' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Functions ({functions.length})
                  </button>
                </div>
              </div>
              
              {/* Searchable Selector */}
              <div className="max-w-[600px] mx-auto" ref={dropdownRef}>
                {/* Search Input */}
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`Search ${currentTab === 'role' ? 'roles' : 'functions'}... (e.g., ${currentTab === 'role' ? 'Research, Grant, Coordinator' : 'Operations, Strategy, Development'})`}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      className="w-full border-2 border-[#d9d9d9] rounded-lg focus:border-[#1f2bd4] focus:ring-2 focus:ring-[#1f2bd4]/20 transition-all text-[#4a4a4c]"
                      style={{ 
                        padding: '16px 48px 16px 48px',
                        fontSize: '16px',
                      }}
                    />
                    <svg 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6d6e71] pointer-events-none" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setIsDropdownOpen(false);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6d6e71] hover:text-[#4a4a4c] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {/* Dropdown List */}
                  {isDropdownOpen && (currentTab === 'role' ? filteredRoles.length > 0 : filteredFunctions.length > 0) && (
                    <div className="absolute z-50 w-full mt-2 bg-white rounded-lg border-2 border-[#d9d9d9] shadow-xl max-h-[400px] overflow-y-auto">
                      {currentTab === 'role' ? (
                        filteredRoles.map((role) => (
                          <button
                            key={role.id}
                            onClick={() => handleFilterSelect('role', role.id)}
                            className={`w-full text-left transition-colors border-b border-[#e2e3e4] last:border-b-0 ${
                              selectedFilterId === role.id && filterType === 'role'
                                ? 'bg-[#0c0c48] text-white'
                                : 'hover:bg-[#f3f3f6] text-[#4a4a4c]'
                            }`}
                            style={{ padding: '16px 20px' }}
                          >
                            <div className="font-medium text-sm">{role.name}</div>
                            {role.description && (
                              <div className={`text-xs mt-1 ${
                                selectedFilterId === role.id && filterType === 'role' ? 'text-white/80' : 'text-[#6d6e71]'
                              }`}>
                                {role.description}
                              </div>
                            )}
                          </button>
                        ))
                      ) : (
                        filteredFunctions.map((func) => (
                          <button
                            key={func.id}
                            onClick={() => handleFilterSelect('function', func.id)}
                            className={`w-full text-left transition-colors border-b border-[#e2e3e4] last:border-b-0 ${
                              selectedFilterId === func.id && filterType === 'function'
                                ? 'bg-[#00877C] text-white'
                                : 'hover:bg-[#f3f3f6] text-[#4a4a4c]'
                            }`}
                            style={{ padding: '16px 20px' }}
                          >
                            <div className="font-medium text-sm">{func.name}</div>
                            {func.description && (
                              <div className={`text-xs mt-1 ${
                                selectedFilterId === func.id && filterType === 'function' ? 'text-white/80' : 'text-[#6d6e71]'
                              }`}>
                                {func.description}
                              </div>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                  
                  {/* No results message */}
                  {isDropdownOpen && searchQuery && (currentTab === 'role' ? filteredRoles.length === 0 : filteredFunctions.length === 0) && (
                    <div className="absolute z-50 w-full mt-2 bg-white rounded-lg border-2 border-[#d9d9d9] shadow-xl">
                      <div className="p-6 text-center text-[#6d6e71]">
                        <svg className="w-8 h-8 mx-auto mb-2 text-[#afafc3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">No {currentTab === 'role' ? 'roles' : 'functions'} found matching &quot;{searchQuery}&quot;</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Hint text */}
                <p className="text-xs text-[#6d6e71] text-center mt-3">
                  {currentTab === 'role' ? 'Type to search roles' : 'Type to search functions'} or browse the full list
                </p>
              </div>
            </div>
          </div>
          
          {/* 2x5 Capability Card Grid – matches framework document structure */}
          {/* Each column: Key Area header + 2 capability cards as a cohesive vertical group */}
          <div className="grid grid-cols-5 items-stretch" style={{ gap: '20px', minHeight: '620px' }}>
            {keyAreas.map(area => {
              const areaCaps = capabilities.filter(c => area.capabilityIds.includes(c.id));
              const cap1 = areaCaps[0];
              const cap2 = areaCaps[1];

              return (
                <div key={area.id} className="flex flex-col" style={{ height: '100%' }}>
                  {/* Key Area Header - rounded top, connects to cards below */}
                  <div
                    className="text-center rounded-t-xl shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: area.color.solid,
                      padding: '24px 18px',
                      minHeight: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        marginBottom: '12px',
                        transform: 'scale(0.7)',
                        transformOrigin: 'center',
                        color: '#FFFFFF',
                        WebkitTextFillColor: '#FFFFFF',
                      }}
                    >
                      <div style={{ color: '#FFFFFF', WebkitTextFillColor: '#FFFFFF' }}>{area.icon}</div>
                    </div>
                    <h3
                      className="font-bold !text-white leading-snug"
                      style={{
                        fontSize: '0.875rem',
                        color: '#FFFFFF',
                        WebkitTextFillColor: '#FFFFFF',
                        textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                      }}
                    >
                      {area.name}
                    </h3>
                  </div>

                  {/* First Capability Card - no top radius */}
                  {cap1 && (() => {
                    const metadata = capabilityMetadata[cap1.id] || { icon: null };
                    const isMapped = visibleCapabilityIds === null || visibleCapabilityIds.includes(cap1.id);
                    const isGreyedOut = !isMapped;
                    const requiredLevel = selectedFilterId ? getRequiredLevel(cap1.id) : null;

                    return (
                      <Link
                        key={cap1.id}
                        href={`/explore?capability=${cap1.id}`}
                        className={`group relative flex flex-col flex-1 border-x-2 border-t-2 transition-all ${
                          isGreyedOut
                            ? 'bg-gray-50 opacity-50 border-[#e2e3e4]'
                            : 'bg-white hover:shadow-lg border-[#e2e3e4] hover:border-opacity-60'
                        }`}
                        style={{
                          padding: '20px 18px',
                          borderLeftColor: isGreyedOut ? '#e2e3e4' : area.color.solid,
                          borderRightColor: isGreyedOut ? '#e2e3e4' : area.color.solid,
                          borderTopColor: isGreyedOut ? '#e2e3e4' : area.color.solid,
                          borderLeftWidth: '3px',
                          borderRightWidth: '3px',
                          borderTopWidth: '1px',
                        }}
                      >
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: isGreyedOut ? '#f2f2f2' : area.color.light,
                            color: isGreyedOut ? '#afafc3' : area.color.solid,
                            width: '34px',
                            height: '34px',
                            marginBottom: '10px',
                          }}
                        >
                          {metadata.icon}
                        </div>

                        {/* Capability Name */}
                        <h4
                          className={`font-bold leading-tight transition-colors ${
                            isGreyedOut
                              ? 'text-[#afafc3]'
                              : 'text-[#4a4a4c] group-hover:text-[#0c0c48]'
                          }`}
                          style={{ fontSize: '0.875rem', marginBottom: '6px' }}
                        >
                          {cap1.name}
                          {isGreyedOut && (
                            <span className="block text-xs font-normal italic text-[#afafc3] mt-1">
                              (not mapped to selected {filterType === 'role' ? 'role' : 'function'})
                            </span>
                          )}
                        </h4>
                        {requiredLevel && !isGreyedOut && (
                          <div className="inline-flex items-center rounded-full text-[11px] font-semibold border"
                            style={{
                              marginBottom: "8px",
                              padding: "4px 8px",
                              borderColor: `${area.color.solid}55`,
                              color: area.color.solid,
                              backgroundColor: `${area.color.solid}12`,
                            }}
                          >
                            Required: {requiredLevel.charAt(0) + requiredLevel.slice(1).toLowerCase()}
                          </div>
                        )}

                        {/* Description */}
                        <p
                          className={`text-xs flex-1 ${
                            isGreyedOut ? 'text-[#AAAAAA]' : 'text-[#6d6e71]'
                          }`}
                          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}
                        >
                          {cap1.description}
                        </p>

                        {/* Explore arrow */}
                        <div className="flex items-center gap-1" style={{ marginTop: '10px' }}>
                          <span
                            className={`text-xs font-semibold transition-colors ${
                              isGreyedOut ? 'text-[#d9d9d9]' : 'group-hover:text-[#0c0c48]'
                            }`}
                            style={{ color: isGreyedOut ? '#d9d9d9' : area.color.solid }}
                          >
                            Explore
                          </span>
                          <svg
                            className={`flex-shrink-0 transition-colors ${
                              isGreyedOut ? 'text-[#d9d9d9]' : 'group-hover:text-[#0c0c48]'
                            }`}
                            style={{ width: '14px', height: '14px', color: isGreyedOut ? '#d9d9d9' : area.color.solid }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    );
                  })()}

                  {/* Second Capability Card - rounded bottom, completes the vertical group */}
                  {cap2 && (() => {
                    const metadata = capabilityMetadata[cap2.id] || { icon: null };
                    const isMapped = visibleCapabilityIds === null || visibleCapabilityIds.includes(cap2.id);
                    const isGreyedOut = !isMapped;
                    const requiredLevel = selectedFilterId ? getRequiredLevel(cap2.id) : null;

                    return (
                      <Link
                        key={cap2.id}
                        href={`/explore?capability=${cap2.id}`}
                        className={`group relative flex flex-col flex-1 rounded-b-xl border-2 transition-all ${
                          isGreyedOut
                            ? 'bg-gray-50 opacity-50 border-[#e2e3e4]'
                            : 'bg-white hover:shadow-lg border-[#e2e3e4] hover:border-opacity-60'
                        }`}
                        style={{
                          padding: '20px 18px',
                          marginTop: '1px',
                          borderLeftColor: isGreyedOut ? '#e2e3e4' : area.color.solid,
                          borderRightColor: isGreyedOut ? '#e2e3e4' : area.color.solid,
                          borderBottomColor: isGreyedOut ? '#e2e3e4' : area.color.solid,
                          borderTopColor: '#e2e3e4',
                          borderLeftWidth: '3px',
                          borderRightWidth: '3px',
                          borderBottomWidth: '3px',
                          borderTopWidth: '1px',
                        }}
                      >
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: isGreyedOut ? '#f2f2f2' : area.color.light,
                            color: isGreyedOut ? '#afafc3' : area.color.solid,
                            width: '34px',
                            height: '34px',
                            marginBottom: '10px',
                          }}
                        >
                          {metadata.icon}
                        </div>

                        {/* Capability Name */}
                        <h4
                          className={`font-bold leading-tight transition-colors ${
                            isGreyedOut
                              ? 'text-[#afafc3]'
                              : 'text-[#4a4a4c] group-hover:text-[#0c0c48]'
                          }`}
                          style={{ fontSize: '0.875rem', marginBottom: '6px' }}
                        >
                          {cap2.name}
                          {isGreyedOut && (
                            <span className="block text-xs font-normal italic text-[#afafc3] mt-1">
                              (not mapped to selected {filterType === 'role' ? 'role' : 'function'})
                            </span>
                          )}
                        </h4>
                        {requiredLevel && !isGreyedOut && (
                          <div className="inline-flex items-center rounded-full text-[11px] font-semibold border"
                            style={{
                              marginBottom: "8px",
                              padding: "4px 8px",
                              borderColor: `${area.color.solid}55`,
                              color: area.color.solid,
                              backgroundColor: `${area.color.solid}12`,
                            }}
                          >
                            Required: {requiredLevel.charAt(0) + requiredLevel.slice(1).toLowerCase()}
                          </div>
                        )}

                        {/* Description */}
                        <p
                          className={`text-xs flex-1 ${
                            isGreyedOut ? 'text-[#AAAAAA]' : 'text-[#6d6e71]'
                          }`}
                          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}
                        >
                          {cap2.description}
                        </p>

                        {/* Explore arrow */}
                        <div className="flex items-center gap-1" style={{ marginTop: '10px' }}>
                          <span
                            className={`text-xs font-semibold transition-colors ${
                              isGreyedOut ? 'text-[#d9d9d9]' : 'group-hover:text-[#0c0c48]'
                            }`}
                            style={{ color: isGreyedOut ? '#d9d9d9' : area.color.solid }}
                          >
                            Explore
                          </span>
                          <svg
                            className={`flex-shrink-0 transition-colors ${
                              isGreyedOut ? 'text-[#d9d9d9]' : 'group-hover:text-[#0c0c48]'
                            }`}
                            style={{ width: '14px', height: '14px', color: isGreyedOut ? '#d9d9d9' : area.color.solid }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    );
                  })()}
                </div>
              );
            })}
          </div>
          
          {/* Info message when filter is active */}
          {selectedFilterId && (
            <div className="text-center py-8">
              <div className="inline-flex flex-col items-center gap-3 p-6 bg-[#E8F4FD] rounded-xl border-2 border-[#1f2bd4]/30">
                <svg className="w-10 h-10 text-[#1f2bd4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-base font-semibold text-[#0c0c48] mb-1">
                    Filter Active
                  </h3>
                  <p className="text-sm text-[#4a4a4c]">
                    Capabilities mapped to your selected {filterType === 'role' ? 'role' : 'function'} are shown normally. Other capabilities appear greyed out but are still accessible if needed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Proficiency Level Descriptors */}
          <div style={{ marginTop: '64px' }}>
            <div className="bg-[#f2f2f2] rounded-xl border border-[#e2e3e4]" style={{ padding: '48px' }}>
              <h3 className="font-bold text-[#4a4a4c] text-center text-xl" style={{ marginBottom: '20px' }}>Proficiency Levels</h3>
              <p className="text-base text-[#6d6e71] text-center max-w-[800px] mx-auto leading-relaxed" style={{ marginBottom: '40px' }}>
                Each capability is assessed across four proficiency levels. Not all levels need to be attained — it depends on your role and objectives.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '32px' }}>
                <div className="bg-white rounded-lg border border-[#e2e3e4]" style={{ padding: '32px' }}>
                  <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: 'rgba(0,69,125,0.4)' }}>1</span>
                    <span className="font-semibold text-[#4a4a4c] text-base">Foundation</span>
                  </div>
                  <p className="text-sm text-[#6d6e71] leading-relaxed">Core knowledge and awareness. Beginning to apply skills with guidance and support.</p>
                </div>
                <div className="bg-white rounded-lg border border-[#e2e3e4]" style={{ padding: '32px' }}>
                  <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: 'rgba(0,69,125,0.6)' }}>2</span>
                    <span className="font-semibold text-[#4a4a4c] text-base">Intermediate</span>
                  </div>
                  <p className="text-sm text-[#6d6e71] leading-relaxed">Working independently with developing expertise. Actively contributing to team outcomes.</p>
                </div>
                <div className="bg-white rounded-lg border border-[#e2e3e4]" style={{ padding: '32px' }}>
                  <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: 'rgba(0,69,125,0.8)' }}>3</span>
                    <span className="font-semibold text-[#4a4a4c] text-base">Advanced</span>
                  </div>
                  <p className="text-sm text-[#6d6e71] leading-relaxed">Leading and mentoring others. Driving strategy and influencing practice across the organisation.</p>
                </div>
                <div className="bg-white rounded-lg border border-[#e2e3e4]" style={{ padding: '32px' }}>
                  <div className="flex items-center" style={{ gap: '12px', marginBottom: '16px' }}>
                    <span className="w-8 h-8 rounded-full bg-[#0c0c48] flex items-center justify-center text-sm font-bold text-white">4</span>
                    <span className="font-semibold text-[#4a4a4c] text-base">Exemplar</span>
                  </div>
                  <p className="text-sm text-[#6d6e71] leading-relaxed">Sector-leading expertise. Shaping institutional direction and transforming practice at a systemic level.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Links Section */}
      <section className="w-full bg-[#f2f2f2] border-t border-[#e2e3e4]">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="text-[#6d6e71]">Related resources:</span>
            <a 
              href="https://research-hub.auckland.ac.nz/induction-skills-and-development/research-management-and-administration-rma-staff-development"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#1f2bd4] hover:text-[#0c0c48] font-medium transition-colors"
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
