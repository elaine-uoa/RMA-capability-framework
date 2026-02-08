import Link from "next/link";

export default function HowToUsePage() {
  return (
    <div className="w-full min-h-screen bg-[#f3f3f6] flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b-2 border-[#d9d9d9] flex justify-center shadow-sm">
        <div className="w-full max-w-[1140px] px-8 lg:px-12 py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4a4a4c] mb-4">How to Use This Tool</h1>
          <p className="text-lg md:text-xl text-[#6d6e71] leading-relaxed max-w-[800px] mx-auto">
            A comprehensive guide to help you navigate the RMA Capability Framework self-assessment tool.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-[1140px] px-8 lg:px-12 py-16 md:py-24">
        {/* Overview */}
        <div className="bg-white rounded-lg border-2 border-[#d9d9d9] p-8 md:p-10 shadow-sm text-center" style={{ marginBottom: '56px' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#4a4a4c] mb-6">Overview</h2>
          <p className="text-[#6d6e71] text-lg leading-relaxed mb-6 max-w-[800px] mx-auto">
            This tool helps Research Management & Administration (RMA) staff assess their current capabilities, 
            identify development opportunities, and create focused development plans. The process follows three main steps:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-5 py-3 bg-[#1f2bd4]/10 text-[#1f2bd4] rounded-lg font-semibold text-base">
              <span className="font-bold text-lg">1.</span> Explore
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-[#EAAB00]/10 text-[#9a7100] rounded-lg font-semibold text-base">
              <span className="font-bold text-lg">2.</span> Self-Assess
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-[#00877C]/10 text-[#00877C] rounded-lg font-semibold text-base">
              <span className="font-bold text-lg">3.</span> Build Plan
            </div>
          </div>
        </div>
        
        {/* Getting Started Section */}
        <div className="bg-gradient-to-br from-[#0c0c48]/5 to-[#1f2bd4]/5 rounded-lg border-2 border-[#0c0c48]/20 p-8 md:p-10 shadow-sm" style={{ marginBottom: '56px' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0c0c48] mb-6">Getting Started</h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1f2bd4] flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#4a4a4c] mb-2">Data Storage</h3>
                <p className="text-[#6d6e71] leading-relaxed">
                  All your assessment data is stored locally in your browser. No information is sent to a server. 
                  You can work at your own pace and your progress is automatically saved as you go.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#0c0c48] flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#4a4a4c] mb-2">Focus on 1–2 Capabilities</h3>
                <p className="text-[#6d6e71] leading-relaxed">
                  We recommend focusing on <strong>1–2 capabilities per year</strong> for your development plan. You should self-assess the capabilities mapped to your current role (or a role you'd like to move into), and you can revisit the self-assessment later in the year or at least annually.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        <div className="bg-white rounded-lg border-2 border-[#d9d9d9] p-8 md:p-10 shadow-sm" style={{ marginBottom: '56px' }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#1f2bd4]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#1f2bd4] font-bold text-xl">1</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#4a4a4c] mb-3">Explore the Framework</h2>
              <p className="text-[#6d6e71] text-lg leading-relaxed">
                Start by identifying the capabilities relevant to your current role (or a role you'd like to move into), and browse them to understand what skills and behaviours are expected at each level.
              </p>
            </div>
          </div>
          
          <div className="bg-[#f3f3f6] rounded-lg p-6 md:p-7 space-y-4">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#1f2bd4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">On the homepage, you can <strong>filter by role or function</strong> to see which capabilities are mapped to your area. <em>(Note: Full role mapping is not live yet — this feature is being expanded and more roles and functions will be added over time.)</em> When you select a filter, capabilities not mapped to that role/function will appear in light grey so you can still see them but know they're not prioritised for your role.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#1f2bd4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Click on any capability card from the homepage to view its details.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#1f2bd4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Use the level tabs (Foundation, Intermediate, Advanced, Exemplar) to see descriptors at each proficiency level. <strong>You only need to assess up to the level mapped for your role</strong>, but you can choose to self-assess or develop at a higher level.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#1f2bd4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Look for the teal info icons next to some descriptors – these show Māori alignment statements.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#1f2bd4] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">This mode is read-only – no data is saved. Take your time to understand the framework.</p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-lg border-2 border-[#d9d9d9] p-8 md:p-10 shadow-sm" style={{ marginBottom: '56px' }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#EAAB00]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#9a7100] font-bold text-xl">2</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#4a4a4c] mb-3">Self-Assessment & Development Focus</h2>
              <p className="text-[#6d6e71] text-lg leading-relaxed">
                Once you have read through the capabilities and proficiency levels, select those statements that you feel confident to demonstrate already (&ldquo;I can do this&rdquo;), and select those that you wish to develop (&ldquo;Want to develop&rdquo;). <strong>Focus on 1–2 capabilities per year</strong> to avoid becoming overwhelmed.
              </p>
            </div>
          </div>
          
          <div className="bg-[#f3f3f6] rounded-lg p-6 md:p-7 space-y-4">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#9a7100] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Click "Start Self-Assessment" from the Explore page, or go directly from the homepage.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#9a7100] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">For each descriptor, use the <strong>two checkboxes</strong>:</p>
            </div>
            <div className="ml-10 space-y-3">
              <p className="text-[#4a4a4c] text-base leading-relaxed flex items-center gap-3">
                <span className="w-4 h-4 rounded bg-[#EAAB00]/30 border-2 border-[#EAAB00]/50 flex-shrink-0"></span>
                <span><strong>"I can do this"</strong> – behaviours you can competently demonstrate (include previous roles and experiences)</span>
              </p>
              <p className="text-[#4a4a4c] text-base leading-relaxed flex items-center gap-3">
                <span className="w-4 h-4 rounded bg-[#00877C]/30 border-2 border-[#00877C]/50 flex-shrink-0"></span>
                <span><strong>"Want to develop"</strong> – areas you want to focus on for your development plan</span>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#9a7100] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed"><strong>You can tick both</strong> for the same descriptor — if you can already do something but want to develop it further, tick both &ldquo;I can do this&rdquo; and &ldquo;Want to develop&rdquo;.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#9a7100] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed"><strong>Not all descriptors need to be ticked.</strong> Some may not be relevant to your role or your development goals — it's perfectly fine to leave them unticked.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#9a7100] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Your progress is <strong>saved automatically</strong> to your browser. You can leave and come back anytime.</p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-lg border-2 border-[#d9d9d9] p-8 md:p-10 shadow-sm" style={{ marginBottom: '56px' }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#00877C]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#00877C] font-bold text-xl">3</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#4a4a4c] mb-3">Add Development Notes</h2>
              <p className="text-[#6d6e71] text-lg leading-relaxed">
                Add reflection and action notes for the development focus items you selected during self-assessment.
              </p>
            </div>
          </div>
          
          <div className="bg-[#f3f3f6] rounded-lg p-6 md:p-7 space-y-4">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#00877C] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Go to "Development Plan" – it will show the descriptors you marked as "Want to develop".</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#00877C] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed"><strong>Add development notes</strong> with specific actions, e.g., "Shadow colleague on grant applications" or "Attend funder roadshow".</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#00877C] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">You can also <strong>add personal reflection notes</strong> in the text area provided for each capability to capture your thoughts.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#00877C] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Focus on <strong>1–2 specific development actions</strong> per capability. These notes will form the basis of your development conversation.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#00877C] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">If you have multiple capabilities with development focus, use the <strong>tabs</strong> to switch between them.</p>
            </div>
          </div>
        </div>

        {/* Summary & Export */}
        <div className="bg-white rounded-lg border-2 border-[#d9d9d9] p-8 md:p-10 shadow-sm" style={{ marginBottom: '56px' }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#f3f3f6] border-2 border-[#d9d9d9] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#4a4a4c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#4a4a4c] mb-3">View Summary & Print</h2>
              <p className="text-[#6d6e71] text-lg leading-relaxed">
                Review your complete assessment and development plan, then print or save as PDF for development conversations.
              </p>
            </div>
          </div>
          
          <div className="bg-[#f3f3f6] rounded-lg p-6 md:p-7 space-y-4">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#6d6e71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Go to "My Summary" to see all your assessed capabilities, demonstrated descriptors, development focus areas, and personal reflection notes.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#6d6e71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">When you click <strong>"Print / Save PDF"</strong>, you'll be prompted to <strong>enter your name</strong>. This will appear on the printed report to identify your document.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#6d6e71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Your name will be saved for future printing sessions. You can edit it anytime by clicking the "Edit Name" link next to your name on the summary page.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#6d6e71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Use your browser's print dialog to save as PDF or print a physical copy for your records or development conversations.</p>
            </div>
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[#6d6e71] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <p className="text-[#4a4a4c] text-base leading-relaxed">Use <strong>"Clear Assessment"</strong> to reset all data if you want to start fresh (this cannot be undone).</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-[#0c0c48]/5 to-[#1f2bd4]/5 rounded-lg border-2 border-[#0c0c48]/20 p-8 md:p-10 shadow-sm" style={{ marginBottom: '56px' }}>
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-8 h-8 text-[#0c0c48]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0c0c48]">Tips for Effective Use</h2>
          </div>
          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <span className="text-[#0c0c48] font-bold text-2xl leading-none mt-1">•</span>
              <p className="text-[#4a4a4c] text-base leading-relaxed"><strong>Be honest</strong> in your self-assessment. This tool is for your own development, not performance evaluation.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#0c0c48] font-bold text-2xl leading-none mt-1">•</span>
              <p className="text-[#4a4a4c] text-base leading-relaxed"><strong>Focus on 1–2 capabilities per year</strong> for your development plan. Trying to develop everything at once is less effective.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#0c0c48] font-bold text-2xl leading-none mt-1">•</span>
              <p className="text-[#4a4a4c] text-base leading-relaxed"><strong>Add specific actions</strong> in your development notes – general goals are harder to achieve than concrete steps.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#0c0c48] font-bold text-2xl leading-none mt-1">•</span>
              <p className="text-[#4a4a4c] text-base leading-relaxed"><strong>Review periodically</strong> – come back every few months to update your assessment as you develop new skills.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#0c0c48] font-bold text-2xl leading-none mt-1">•</span>
              <p className="text-[#4a4a4c] text-base leading-relaxed"><strong>Share if you choose</strong> – this assessment is for your own development. You can choose to share your printed summary with your manager to support development conversations and get additional support.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-[#0c0c48] font-bold text-2xl leading-none mt-1">•</span>
              <p className="text-[#4a4a4c] text-base leading-relaxed"><strong>Download the framework document</strong> from the homepage for detailed reference material you can review offline.</p>
            </li>
          </ul>
        </div>

        {/* Get Started CTA */}
        <div className="bg-white rounded-lg border-2 border-[#d9d9d9] p-8 md:p-12 text-center shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-[#4a4a4c] mb-5">Ready to Get Started?</h2>
          <p className="text-[#6d6e71] text-lg leading-relaxed mb-8 max-w-[600px] mx-auto">
            Begin by exploring the framework, then move on to your self-assessment when you're ready.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/explore"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white border-2 border-[#d9d9d9] text-[#4a4a4c] rounded-xl font-semibold text-lg hover:bg-[#f3f3f6] hover:border-[#1f2bd4] transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore Framework
            </Link>
            <Link
              href="/assess"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#1f2bd4] rounded-xl font-semibold text-lg hover:bg-[#1929a8] transition-all shadow-md hover:shadow-lg"
              style={{ color: 'white' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Assessment
            </Link>
          </div>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-2 border-[#d9d9d9] bg-white mt-16 flex justify-center">
        <div className="w-full max-w-[1140px] px-8 lg:px-12 py-10">
          <p className="text-base text-[#6d6e71] text-center">
            RMA Capability Framework • Waipapa Taumata Rau, University of Auckland
          </p>
        </div>
      </footer>
    </div>
  );
}
