import Link from "next/link";
import { capabilities } from "@/data/capabilities";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              RMA Capability Framework
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Self-assessment tool for Research Management & Administration staff. 
              Explore capabilities, assess your current level, and plan your professional development.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/assess"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Start Assessment
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                href="/summary"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                View Progress
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Capabilities Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">10 Capabilities</h2>
          <p className="text-lg text-slate-600">Click any capability to begin your assessment</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <Link
              key={cap.id}
              href={`/assess?capability=${cap.id}`}
              className="group block bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-700">
                {cap.name}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                {cap.description}
              </p>
              
              <div className="mt-4 flex items-center text-slate-500 text-sm group-hover:text-slate-700 transition-colors">
                <span>Explore</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-sm text-slate-500 text-center">
            Version 1.5 • University of Auckland • Developed by The Skills Group
          </p>
        </div>
      </footer>
    </div>
  );
}
