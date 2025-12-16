import Link from "next/link";

export default function HowToUsePage() {
  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">How to Use This Tool</h1>
          <p className="text-lg text-slate-600">
            A simple guide to help you navigate the RMA Capability Framework self-assessment tool.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-12">
        {/* Overview */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            This tool helps Research Management & Administration (RMA) staff assess their current capabilities, 
            identify development opportunities, and create focused development plans. The process follows three main steps:
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <span className="font-bold">1.</span> Explore
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg">
              <span className="font-bold">2.</span> Self-Assess
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
              <span className="font-bold">3.</span> Build Plan
            </div>
          </div>
        </div>

        {/* Step 1 */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-700 font-bold">1</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Explore the Framework</h2>
              <p className="text-slate-600 leading-relaxed">
                Start by browsing the 10 capabilities to understand what skills and behaviours are expected at each level.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Click on any capability card from the homepage to view its details.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Use the level tabs (Foundation, Intermediate, Advanced, Exemplar) to see descriptors at each proficiency level.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Look for the green info icons next to some descriptors – these show Māori alignment statements.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">This mode is read-only – no data is saved. Take your time to understand the framework.</p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-700 font-bold">2</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Self-Assessment & Development Focus</h2>
              <p className="text-slate-600 leading-relaxed">
                Assess your current capabilities and identify what you want to develop – all in one place.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Click "Start Self-Assessment" from the Explore page, or go directly from the homepage.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">For each descriptor, use the <strong>two checkboxes</strong>:</p>
            </div>
            <div className="ml-8 space-y-2">
              <p className="text-slate-700 text-sm flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-200 border border-amber-300"></span>
                <strong>"I can do this"</strong> – behaviours you can competently demonstrate (include previous roles/experiences)
              </p>
              <p className="text-slate-700 text-sm flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-green-200 border border-green-300"></span>
                <strong>"Want to develop"</strong> – areas you want to focus on for your development plan
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm"><strong>Select your current level</strong> by clicking "Set as Current Level" on the level that best represents your overall capability.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Your progress is <strong>saved automatically</strong> to your browser. You can leave and come back anytime.</p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <span className="text-green-700 font-bold">3</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Add Development Notes</h2>
              <p className="text-slate-600 leading-relaxed">
                Add reflection and action notes for the development focus items you selected during self-assessment.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Go to "Development Plan" – it will show the descriptors you marked as "Want to develop".</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm"><strong>Add development notes</strong> with specific actions, e.g., "Shadow colleague on grant applications" or "Attend funder roadshow".</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Focus on <strong>1–2 specific development actions</strong> per capability. These notes will form the basis of your manager conversation.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">If you have multiple capabilities with development focus, use the <strong>tabs</strong> to switch between them.</p>
            </div>
          </div>
        </div>

        {/* Summary & Export */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">View Summary & Print</h2>
              <p className="text-slate-600 leading-relaxed">
                Review your complete assessment and development plan, then print or save as PDF for manager discussions.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Go to "View Summary" to see all your assessed capabilities, demonstrated descriptors, and development focus areas.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Use <strong>"Print / Save PDF"</strong> to create a document for your records or manager conversations.</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-slate-700 text-sm">Use <strong>"Clear"</strong> to reset all data if you want to start fresh (this cannot be undone).</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-indigo-50 rounded-lg border border-indigo-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">Tips for Effective Use</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">•</span>
              <p className="text-indigo-800 text-sm"><strong>Be honest</strong> in your self-assessment. This tool is for your own development, not performance evaluation.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">•</span>
              <p className="text-indigo-800 text-sm"><strong>Focus on a few capabilities</strong> at a time for your development plan. Trying to develop everything at once is less effective.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">•</span>
              <p className="text-indigo-800 text-sm"><strong>Add specific actions</strong> in your development notes – general goals are harder to achieve than concrete steps.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">•</span>
              <p className="text-indigo-800 text-sm"><strong>Review periodically</strong> – come back every few months to update your assessment as you develop new skills.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-600 font-bold">•</span>
              <p className="text-indigo-800 text-sm"><strong>Use with your manager</strong> – share your summary to facilitate development conversations and get support.</p>
            </li>
          </ul>
        </div>

        {/* Get Started CTA */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-6">
            Begin by exploring the framework, then move on to your self-assessment when you're ready.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore Framework
            </Link>
            <Link
              href="/assess"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Assessment
            </Link>
          </div>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white mt-20 flex justify-center">
        <div className="w-full max-w-4xl px-8 sm:px-12 lg:px-16 py-8">
          <p className="text-sm text-slate-500 text-center">
            RMA Capability Framework • University of Auckland
          </p>
        </div>
      </footer>
    </div>
  );
}
