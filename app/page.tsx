import Link from "next/link";
import { capabilities } from "@/data/capabilities";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-white border-b border-slate-200 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              RMA Capability Framework
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              Professional development tool for Research Management & Administration staff. 
              Explore capabilities, assess your current level, and build your development plan.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">10 Capabilities</h2>
            <p className="text-lg text-slate-600">Click any capability to explore its descriptors and proficiency levels</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => (
              <Link
                key={cap.id}
                href={`/explore?capability=${cap.id}`}
                className="group block bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-slate-700">
                  {cap.name}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {cap.description}
                </p>
                
                <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-700 transition-colors">
                  <span>Explore</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white mt-20 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-8">
          <p className="text-sm text-slate-500 text-center">
            Version 1.5 • University of Auckland • Developed by The Skills Group
          </p>
        </div>
      </footer>
    </div>
  );
}
