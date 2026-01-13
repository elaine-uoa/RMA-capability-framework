import Link from "next/link";
import { capabilities } from "@/data/capabilities";

// Capability metadata with icons and tags
const capabilityMetadata: Record<string, { tag: string; icon: React.ReactNode }> = {
  "research-engagement": {
    tag: "ENGAGEMENT",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  "maximising-impact": {
    tag: "IMPACT",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  "researcher-development": {
    tag: "DEVELOPMENT",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  "environment-culture": {
    tag: "CULTURE",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  "funding-opportunities": {
    tag: "FUNDING",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  "proposal-support": {
    tag: "PROPOSALS",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  "initiation": {
    tag: "INITIATION",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  "projects-initiatives": {
    tag: "PROJECTS",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  "monitoring-reporting": {
    tag: "REPORTING",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  "policy-strategy": {
    tag: "STRATEGY",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  },
};

// Category colors - distinct and vibrant
const categoryColors: Record<string, { bg: string; text: string }> = {
  "ENGAGEMENT": { bg: "#E8F4FD", text: "#0077B6" },
  "IMPACT": { bg: "#FEF3E2", text: "#E85D04" },
  "DEVELOPMENT": { bg: "#E7F5E8", text: "#2D6A4F" },
  "CULTURE": { bg: "#FCE7F3", text: "#BE185D" },
  "FUNDING": { bg: "#FFF4E6", text: "#D97706" },
  "PROPOSALS": { bg: "#EDE9FE", text: "#7C3AED" },
  "INITIATION": { bg: "#E0F2FE", text: "#0369A1" },
  "PROJECTS": { bg: "#F0FDF4", text: "#16A34A" },
  "REPORTING": { bg: "#FEF2F2", text: "#DC2626" },
  "STRATEGY": { bg: "#F5F3FF", text: "#6D28D9" },
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

      {/* Capabilities Grid - Fully centered heading */}
      <section className="w-full">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-12 py-12">
          {/* Section heading - fully centered */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2">10 Core Capabilities</h2>
            <p className="text-[#666]">Select a capability to explore its descriptors and proficiency levels</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, index) => {
              const metadata = capabilityMetadata[cap.id] || { tag: "CORE", icon: null };
              const colors = categoryColors[metadata.tag] || { bg: "#F5F5F5", text: "#666" };
              const isLast = index === capabilities.length - 1;
              // Center the last card if it's alone in the last row (10 cards = 3+3+3+1)
              const shouldCenter = isLast && capabilities.length % 3 === 1;
              
              return (
                <Link
                  key={cap.id}
                  href={`/explore?capability=${cap.id}`}
                  className={`group block bg-white rounded-xl border border-[#eaeaea] p-6 hover:shadow-lg hover:border-[#ccc] hover:-translate-y-1 transition-all duration-300 ${
                    shouldCenter ? 'lg:col-start-2' : ''
                  }`}
                >
                  {/* Icon and Category tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {metadata.icon}
                    </div>
                    <div 
                      className="inline-flex px-3 py-1 rounded-md text-xs font-bold tracking-wide"
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {metadata.tag}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#00457D] transition-colors leading-snug">
                    {cap.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-[#666] leading-relaxed line-clamp-3">
                    {cap.description}
                  </p>
                </Link>
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
