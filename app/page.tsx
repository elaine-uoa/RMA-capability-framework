import Link from "next/link";
import { capabilities } from "@/data/capabilities";

// Key Areas structure mapping capabilities to their key areas
interface KeyArea {
  id: string;
  name: string;
  description: string;
  color: { bg: string; text: string; border: string };
  icon: React.ReactNode;
  capabilityIds: string[];
}

const keyAreas: KeyArea[] = [
  {
    id: "engagement-impact",
    name: "Research Engagement and Impact",
    description: "Building relationships, exchanging knowledge, and maximizing research outcomes",
    color: { bg: "#E8F4FD", text: "#0077B6", border: "#B3DDEF" },
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    capabilityIds: ["research-engagement", "maximising-impact"]
  },
  {
    id: "development-culture",
    name: "Researcher Development and Culture",
    description: "Supporting researcher capabilities and fostering a positive research environment",
    color: { bg: "#E7F5E8", text: "#2D6A4F", border: "#B8DCBE" },
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    capabilityIds: ["researcher-development", "environment-culture"]
  },
  {
    id: "proposal-development",
    name: "Research Proposal Development",
    description: "Identifying funding opportunities and supporting research proposals",
    color: { bg: "#FEF3E2", text: "#D97706", border: "#F5D9A8" },
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    capabilityIds: ["funding-opportunities", "proposal-support"]
  },
  {
    id: "project-risk",
    name: "Research Project and Risk Management",
    description: "Managing research projects from initiation through to monitoring and reporting",
    color: { bg: "#F0FDF4", text: "#16A34A", border: "#C1E8CC" },
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4" />
      </svg>
    ),
    capabilityIds: ["initiation", "projects-initiatives", "monitoring-reporting"]
  },
  {
    id: "policy-strategy",
    name: "Research Policy and Strategy",
    description: "Contributing to and implementing research policies and strategic frameworks",
    color: { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE" },
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    capabilityIds: ["policy-strategy"]
  }
];

// Capability metadata with icons
const capabilityMetadata: Record<string, { icon: React.ReactNode }> = {
  "research-engagement": {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
  return (
    <div className="w-full min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Aligned with card grid center column */}
      <section className="w-full bg-[#F5F5F5] border-b border-[#eaeaea]">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-20 md:py-28">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-[2.75rem] md:text-[3.5rem] font-black text-[#1a1a1a] mb-6 leading-[1.1] tracking-tight">
              RMA Capability Framework
            </h1>
            
            <p className="text-lg md:text-xl text-[#555] leading-relaxed max-w-[600px]">
              Professional development tool for Research Management & Administration staff to explore capabilities, assess skills, and build development plans.
            </p>
          </div>
        </div>
      </section>

      {/* Filter/Action Bar - Fully centered */}
      <section className="w-full bg-white border-b border-[#eaeaea]">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-[#666]">Quick actions:</span>
            <Link 
              href="/assess" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00457D] text-white text-sm font-medium rounded-lg hover:bg-[#003561] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Assessment
            </Link>
            <Link 
              href="/plan" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#00457D] text-sm font-medium rounded-lg border border-[#00457D] hover:bg-[#00457D] hover:text-white transition-colors"
            >
              View My Plan
            </Link>
            <span className="text-sm text-[#888]">{capabilities.length} capabilities</span>
          </div>
        </div>
      </section>

      {/* Capabilities Grouped by Key Areas */}
      <section className="w-full">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-12 py-12">
          {/* Section heading */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">
              10 Core Capabilities across 5 Key Areas
            </h2>
            <p className="text-[#666] max-w-[700px] mx-auto">
              The RMA Capability Framework organizes professional competencies into five key functional areas. 
              Select any capability to explore its descriptors and proficiency levels.
            </p>
          </div>
          
          {/* Key Areas with grouped capabilities */}
          <div className="space-y-8">
            {keyAreas.map((area) => {
              const areaCapabilities = capabilities.filter(cap => 
                area.capabilityIds.includes(cap.id)
              );
              
              return (
                <div key={area.id} className="bg-white rounded-xl border-2 overflow-hidden" style={{ borderColor: area.color.border }}>
                  {/* Key Area Header */}
                  <div 
                    className="px-8 py-6 flex items-start gap-4"
                    style={{ backgroundColor: area.color.bg }}
                  >
                    <div 
                      className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center bg-white/80 shadow-sm"
                      style={{ color: area.color.text }}
                    >
                      {area.icon}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-xl font-bold mb-1"
                        style={{ color: area.color.text }}
                      >
                        {area.name}
                      </h3>
                      <p className="text-sm" style={{ color: area.color.text, opacity: 0.85 }}>
                        {area.description}
                      </p>
                    </div>
                    <div 
                      className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold bg-white/80"
                      style={{ color: area.color.text }}
                    >
                      {areaCapabilities.length} {areaCapabilities.length === 1 ? 'capability' : 'capabilities'}
                    </div>
                  </div>
                  
                  {/* Capabilities within this key area */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {areaCapabilities.map((cap) => {
                      const metadata = capabilityMetadata[cap.id] || { icon: null };
                      
                      return (
                        <Link
                          key={cap.id}
                          href={`/explore?capability=${cap.id}`}
                          className="group flex items-start gap-3 p-4 rounded-lg border border-[#eaeaea] bg-[#fafafa] hover:bg-white hover:border-[#ccc] hover:shadow-md transition-all duration-200"
                        >
                          <div 
                            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: area.color.bg, color: area.color.text }}
                          >
                            {metadata.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-[#1a1a1a] mb-1 group-hover:text-[#00457D] transition-colors">
                              {cap.name}
                            </h4>
                            <p className="text-xs text-[#666] line-clamp-2 leading-relaxed">
                              {cap.description}
                            </p>
                          </div>
                          <svg 
                            className="flex-shrink-0 w-5 h-5 text-[#999] group-hover:text-[#00457D] transition-colors"
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section - Aligned with card grid center column */}
      <section className="w-full bg-white border-t border-[#eaeaea]">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Ready to assess your capabilities?</h2>
            <p className="text-[#666] mb-8 max-w-md">
              Start with a self-assessment to identify your strengths and areas for development.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link 
                href="/assess" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00457D] text-white font-semibold rounded-lg hover:bg-[#003561] transition-colors"
              >
                Start Self-Assessment
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/how-to-use" 
                className="text-sm font-medium text-[#666] hover:text-[#00457D] transition-colors"
              >
                Learn how it works →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Fully centered */}
      <footer className="w-full bg-[#FAFAFA] border-t border-[#eaeaea]">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-6">
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-[#888] text-center">
            <span>Version 1.5 · University of Auckland · Developed by The Skills Group</span>
            <div className="flex items-center gap-6">
              <Link href="/how-to-use" className="hover:text-[#00457D] transition-colors">Help</Link>
              <a 
                href="https://research-hub.auckland.ac.nz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#00457D] transition-colors"
              >
                Research Hub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
