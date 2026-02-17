import Link from "next/link";

export default function HowToUsePage() {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      {/* ── HERO ── */}
      <div style={{ backgroundColor: "#F3F3F6" }}>
        <div
          style={{
            width: "1440px",
            margin: "0 auto",
            padding: "72px 100px",
          }}
        >
          <h1
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
            How to use this tool
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "27px",
              color: "#0C0C48",
              margin: 0,
            }}
          >
            A comprehensive guide to help you navigate the RMA Capability Framework self-assessment tool.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ width: "1440px", margin: "0 auto", padding: "0 100px" }}>
        {/* ── OVERVIEW ── */}
        <div style={{ padding: "50px 0 0" }}>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "52px",
              color: "#0C0C48",
              margin: "0 0 16px",
            }}
          >
            Overview
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "30px",
              color: "#0C0C48",
              margin: "0 0 24px",
            }}
          >
            This tool helps Research Management &amp; Administration (RMA) staff assess their current capabilities, identify development opportunities, and create focused development plans. The process follows three main steps:
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                height: "50px",
                padding: "10px 25px",
                backgroundColor: "#E9EAFB",
                borderRadius: "100px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#0C0C48",
              }}
            >
              <span>1.</span> Explore
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                height: "50px",
                padding: "10px 25px",
                backgroundColor: "#FFF7D7",
                borderRadius: "100px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#0C0C48",
              }}
            >
              <span>2.</span> Self-assess
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                height: "50px",
                padding: "10px 25px",
                backgroundColor: "#D5F4DE",
                borderRadius: "100px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                color: "#0C0C48",
              }}
            >
              <span>3.</span> Build plan
            </div>
          </div>
        </div>

        {/* ── FRAMEWORK PROGRESSION LOGIC ── */}
        <div style={{ padding: "50px 0 0" }}>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "52px",
              color: "#0C0C48",
              margin: "0 0 16px",
            }}
          >
            Framework Progression Logic
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "27px", color: "#4A4A4C", margin: "0 0 12px" }}>
            The framework uses a cumulative progression model across four professional levels: Foundation, Intermediate, Advanced, and Exemplar.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "27px", color: "#4A4A4C", margin: "0 0 12px" }}>
            Demonstrating capability at a higher level implies competence in all preceding levels within the same capability. For example, competence at Intermediate level assumes the Foundation-level expectations are already met.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "27px", color: "#4A4A4C", margin: 0 }}>
            In the same way, competence at Exemplar level implies capability across Advanced, Intermediate, and Foundation levels. This progression model supports consistent interpretation of capability development and reinforces that higher-level performance builds on lower-level foundations.
          </p>
        </div>
      </div>

      {/* ── GETTING STARTED (grey banded) ── */}
      <div style={{ backgroundColor: "#F3F3F6", marginTop: "50px" }}>
        <div style={{ width: "1440px", margin: "0 auto", padding: "50px 100px" }}>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "52px",
              color: "#0C0C48",
              margin: "0 0 24px",
            }}
          >
            Getting Started
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Data Storage */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(31,43,212,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "4px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F2BD4" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "30px", color: "#0C0C48", margin: "0 0 4px" }}>
                  Data Storage
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "27px", color: "#4A4A4C", margin: 0 }}>
                  All your assessment data is stored locally in your browser. No information is sent to a server. You can work at your own pace and your progress is automatically saved as you go. Your selected role/function filter is also remembered while you move between Homepage, Explore, and Self-Assessment.
                </p>
              </div>
            </div>
            {/* Focus on 1-2 Capabilities */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(31,43,212,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "4px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F2BD4" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "30px", color: "#0C0C48", margin: "0 0 4px" }}>
                  Focus on 1–2 Capabilities
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "27px", color: "#4A4A4C", margin: 0 }}>
                  We recommend focusing on <strong>1–2 capabilities per year</strong> for your development plan. You should self-assess the capabilities mapped to your current role (or a role you&apos;d like to move into), and you can revisit the self-assessment later in the year or at least annually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── NUMBERED SECTIONS ── */}
      <div style={{ width: "1440px", margin: "0 auto", padding: "0 100px" }}>
        {/* ── SECTION 1: Explore the Framework ── */}
        <div style={{ padding: "60px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#E9EAFB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "20px", color: "#0C0C48" }}>1</span>
            </div>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "52px", color: "#0C0C48", margin: 0 }}>
              Explore the Framework
            </h2>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "30px", color: "#0C0C48", margin: "0 0 24px", paddingLeft: "70px" }}>
            Start by identifying the capabilities relevant to your current role (or a role you&apos;d like to move into), and browse them to understand what skills and behaviours are expected at each level.
          </p>
          <div style={{ backgroundColor: "#F4F4FD", borderRadius: "15px", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <BulletRow color="#0C0C48">On the homepage, you can <strong>filter by role or function</strong> to activate guided mode. Mapped capabilities remain emphasised, non-mapped capabilities are visually de-emphasised, and role-relevant levels are surfaced to help you focus on what is most relevant.</BulletRow>
            <BulletRow color="#0C0C48">Click on any capability card from the homepage to view its details.</BulletRow>
            <BulletRow color="#0C0C48">Use the level tabs (Foundation, Intermediate, Advanced, Exemplar) to see descriptors at each proficiency level. In guided mode, the role-relevant tab is marked with a <strong>star indicator</strong> for your selected role or function.</BulletRow>
            <BulletRow color="#0C0C48">Within the role-relevant level, look for <strong>role-relevant descriptor indicators</strong> to quickly identify behaviours most relevant to your selected role/function.</BulletRow>
            <BulletRow color="#0C0C48">Use <strong>Jump to Capability</strong> in Explore and Self-Assessment to move directly between capabilities; mapped capabilities are marked to help guided navigation.</BulletRow>
          </div>
        </div>

        {/* ── SECTION 2: Self-assessment & development focus ── */}
        <div style={{ padding: "60px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#FFF7D7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "20px", color: "#0C0C48" }}>2</span>
            </div>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "52px", color: "#0C0C48", margin: 0 }}>
              Self-assessment &amp; development focus
            </h2>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "30px", color: "#0C0C48", margin: "0 0 24px", paddingLeft: "70px" }}>
            Once you have read through the capabilities and proficiency levels, select those statements that you feel confident to demonstrate already (&ldquo;I can do this&rdquo;), and select those that you wish to develop (&ldquo;Want to develop&rdquo;). <strong>Focus on 1–2 capabilities per year</strong> to avoid becoming overwhelmed.
          </p>
          <div style={{ backgroundColor: "rgba(255,247,215,0.5)", borderRadius: "15px", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <BulletRow color="#0C0C48">Click &ldquo;Start Self-Assessment&rdquo; from the Explore page, or go directly from the homepage.</BulletRow>
            <BulletRow color="#0C0C48">For each descriptor, use the <strong>two checkboxes</strong> (guided mode markers from Explore also appear in Self-Assessment):</BulletRow>
            <div style={{ paddingLeft: "40px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "27px", color: "#4A4A4C", margin: 0, display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "16px", height: "16px", borderRadius: "2px", backgroundColor: "#2EC95C", border: "1px solid #0C0C48", flexShrink: 0 }} />
                <span><strong>&ldquo;I can do this&rdquo;</strong> – behaviours you can competently demonstrate (include previous roles and experiences)</span>
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "27px", color: "#4A4A4C", margin: 0, display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "16px", height: "16px", borderRadius: "2px", backgroundColor: "#FDD835", border: "1px solid #0C0C48", flexShrink: 0 }} />
                <span><strong>&ldquo;Want to develop&rdquo;</strong> – areas you want to focus on for your development plan</span>
              </p>
            </div>
            <BulletRow color="#0C0C48"><strong>You can tick both</strong> for the same descriptor — if you can already do something but want to develop it further, tick both &ldquo;I can do this&rdquo; and &ldquo;Want to develop&rdquo;.</BulletRow>
            <BulletRow color="#0C0C48"><strong>Not all descriptors need to be ticked.</strong> Some may not be relevant to your role or your development goals — it&apos;s perfectly fine to leave them unticked.</BulletRow>
            <BulletRow color="#0C0C48">Your progress is <strong>saved automatically</strong> to your browser. You can leave and come back anytime.</BulletRow>
          </div>
        </div>

        {/* ── SECTION 3: Add development notes ── */}
        <div style={{ padding: "60px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#D5F4DE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "20px", color: "#0C0C48" }}>3</span>
            </div>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "52px", color: "#0C0C48", margin: 0 }}>
              Add development notes
            </h2>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "30px", color: "#0C0C48", margin: "0 0 24px", paddingLeft: "70px" }}>
            Add reflection and action notes for the development focus items you selected during self-assessment.
          </p>
          <div style={{ backgroundColor: "rgba(25,205,128,0.08)", borderRadius: "15px", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <BulletRow color="#0C0C48">Go to &ldquo;Development Plan&rdquo; – it will show the descriptors you marked as &ldquo;Want to develop&rdquo;.</BulletRow>
            <BulletRow color="#0C0C48"><strong>Add development notes</strong> with specific actions, e.g., &ldquo;Shadow colleague on grant applications&rdquo; or &ldquo;Attend funder roadshow&rdquo;.</BulletRow>
            <BulletRow color="#0C0C48">You can also <strong>add personal reflection notes</strong> in the text area provided for each capability to capture your thoughts.</BulletRow>
            <BulletRow color="#0C0C48">Focus on <strong>1–2 specific development actions</strong> per capability. These notes will form the basis of your development conversation.</BulletRow>
            <BulletRow color="#0C0C48">If you have multiple capabilities with development focus, use the <strong>tabs</strong> to switch between them.</BulletRow>
          </div>
        </div>

        {/* ── SECTION 4: View summary & print ── */}
        <div style={{ padding: "60px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#0C0C48", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "20px", color: "#FFFFFF" }}>4</span>
            </div>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "52px", color: "#0C0C48", margin: 0 }}>
              View summary &amp; print
            </h2>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "30px", color: "#0C0C48", margin: "0 0 24px", paddingLeft: "70px" }}>
            Review your complete assessment and development plan, then print or save as PDF for development conversations.
          </p>
          <div style={{ backgroundColor: "#F3F3F6", borderRadius: "15px", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <BulletRow color="#0C0C48">Go to &ldquo;My Summary&rdquo; to see all your assessed capabilities, demonstrated descriptors, development focus areas, and personal reflection notes.</BulletRow>
            <BulletRow color="#0C0C48">When you click <strong>&ldquo;Print / Save PDF&rdquo;</strong>, you&apos;ll be prompted to <strong>enter your name</strong>. This will appear on the printed report to identify your document.</BulletRow>
            <BulletRow color="#0C0C48">Your name will be saved for future printing sessions. You can edit it anytime by clicking the &ldquo;Edit Name&rdquo; link next to your name on the summary page.</BulletRow>
            <BulletRow color="#0C0C48">Use your browser&apos;s print dialog to save as PDF or print a physical copy for your records or development conversations.</BulletRow>
            <BulletRow color="#0C0C48">Use <strong>&ldquo;Clear Assessment&rdquo;</strong> to reset all data if you want to start fresh (this cannot be undone).</BulletRow>
          </div>
        </div>

        {/* ── SECTION 5: Tips for effective use ── */}
        <div style={{ padding: "60px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#0C0C48", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "20px", color: "#FFFFFF" }}>5</span>
            </div>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "52px", color: "#0C0C48", margin: 0 }}>
              Tips for effective use
            </h2>
          </div>
          <div style={{ backgroundColor: "#F3F3F6", borderRadius: "15px", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <BulletRow color="#0C0C48"><strong>Be honest</strong> in your self-assessment. This tool is for your own development, not performance evaluation.</BulletRow>
            <BulletRow color="#0C0C48"><strong>Focus on 1–2 capabilities per year</strong> for your development plan. Trying to develop everything at once is less effective.</BulletRow>
            <BulletRow color="#0C0C48"><strong>Add specific actions</strong> in your development notes – general goals are harder to achieve than concrete steps.</BulletRow>
            <BulletRow color="#0C0C48"><strong>Review periodically</strong> – come back every few months to update your assessment as you develop new skills.</BulletRow>
            <BulletRow color="#0C0C48"><strong>Share if you choose</strong> – this assessment is for your own development. You can choose to share your printed summary with your manager to support development conversations and get additional support.</BulletRow>
            <BulletRow color="#0C0C48"><strong>Download the framework document</strong> from the homepage for detailed reference material you can review offline.</BulletRow>
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div
          style={{
            backgroundColor: "#0C0C48",
            borderRadius: "15px",
            padding: "50px",
            marginTop: "72px",
            marginBottom: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "32px", lineHeight: "42px", color: "#FFFFFF", margin: "0 0 12px" }}>
              Ready to get started?
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: "27px", color: "rgba(255,255,255,0.85)", margin: 0 }}>
              Begin by exploring the framework, then move on to your self-assessment when you&apos;re ready.
            </p>
          </div>
          <div style={{ display: "flex", gap: "20px", flexShrink: 0 }}>
            <Link
              href="/explore"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                height: "55px",
                padding: "15.5px 40px",
                backgroundColor: "transparent",
                border: "2px solid #FFFFFF",
                borderRadius: "29px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#FFFFFF",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Explore Framework
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1L7 7L1 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/assess"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
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
                whiteSpace: "nowrap",
              }}
            >
              Start Assessment
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1L7 7L1 13" stroke="#0C0C48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable bullet row component ── */
function BulletRow({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        style={{ flexShrink: 0, marginTop: "5px" }}
      >
        <path d="M6.5 3.5L13 9L6.5 14.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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
        {children}
      </p>
    </div>
  );
}
