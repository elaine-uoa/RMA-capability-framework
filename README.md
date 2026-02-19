# RMA Capability Framework Self-Assessment Tool

An interactive web application for Research Management and Administration (RMA) staff at Waipapa Taumata Rau, the University of Auckland, to explore the RMA Capability Framework, complete a structured self-assessment, and build a personalised professional development plan.

**Version:** Phase One complete  
**Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4  
**Deployment:** Vercel (current); University-hosted infrastructure (planned)

---

## Purpose

This tool enables RMA staff to:

- Browse all ten capabilities and read behavioural descriptors at each of the four proficiency levels
- Complete a self-assessment by marking which behaviours they can demonstrate and which they want to develop
- Build a structured development plan from their assessment results
- Generate a print-ready or PDF summary for use in development conversations with managers
- Download the RMA Capability Framework document

All data is stored in the user's browser locally. No data is sent to a server and no login is required.

**Note:** This is a professional development tool, not a performance management system.

---

## Application Pages

| Page | URL | Purpose |
|---|---|---|
| Homepage | `/` | Capability grid overview, key area navigation, framework download |
| Explore | `/explore` | Read-only view of any capability with level tabs and Maori alignment |
| Self-Assessment | `/assess` | Dual-checkbox descriptor-level assessment with notes |
| Development Plan | `/plan` | Aggregated development focus items with per-capability notes |
| My Summary | `/summary` | Full printable overview of all assessment data |
| How-to Guide | `/how-to-use` | Step-by-step instructions for using the tool |

---

## Key Features

### Capability Exploration
- Read-only Explore page showing descriptors at each proficiency level
- Maori alignment section per level, linked to Whaia Te Hihiri and Nga Taumata Tutuki
- Previous and Next navigation between capabilities
- Jump to any capability via a dropdown selector

### Self-Assessment Interface
- Dual-checkbox design per behavioural descriptor: one for "I can demonstrate this" and one for "I want to develop this"
- Colour-coded descriptor cards that visually reflect the combination of selections made
- Free-text notes area per capability for written reflection
- Auto-save on every interaction; manual "Save now" button also available

### Development Plan
- Automatically populated from self-assessment selections
- Tabbed view per capability showing development focus items grouped by proficiency level
- Per-capability notes fields with save state
- Ability to include additional capabilities not yet formally assessed
- Ability to remove capabilities from the plan

### Summary and Print
- Full assessment overview across all engaged capabilities
- Personalised with the user's name before printing
- Two print modes: full summary or development-focus only
- PDF-quality print layout using CSS print styles

### Role and Function Filtering (built, not yet visible)
The application includes a complete role and function filtering system that allows users to select their specific role or functional area and receive a personalised, guided view of the framework. This system is fully implemented across all pages but the homepage filter panel is currently hidden while the RMA team finalises the official role-mapping data. See the section below for instructions on restoring this feature.

### How-to Guide
A five-step illustrated guide page walking users through the full tool workflow.

### Framework Download
A "Download the Framework" button on the homepage that serves the official framework as a Word document via `/api/download`.

---

## The Ten Capabilities

The ten capabilities are grouped into five key areas:

**Research Engagement and Impact**
1. Research-related Engagement
2. Maximising Impact

**Researcher Development and Culture**
3. Researcher Development
4. Environment and Culture

**Research Proposal Development**
5. Funding Opportunities
6. Proposal Support

**Research Project and Risk Management**
7. Initiation
8. Projects and Initiatives

**Research Policy and Strategy**
9. Monitoring and Reporting
10. Policy and Strategy

Each capability has four proficiency levels: Foundation, Intermediate, Advanced, and Exemplar. Each level contains behavioural descriptors and a Maori alignment statement.

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx                Root layout: Navbar, Footer, AssessmentProvider
│   ├── globals.css               Global styles, CSS custom properties, print media query
│   ├── page.tsx                  Homepage: capability grid, key areas, filter panel (hidden)
│   ├── explore/page.tsx          Explore: read-only capability browser with level tabs
│   ├── assess/page.tsx           Self-Assessment: dual-checkbox descriptor assessment
│   ├── plan/page.tsx             Development Plan: aggregated focus items and notes
│   ├── summary/page.tsx          Summary: print-ready full assessment view
│   ├── how-to-use/page.tsx       How-to Guide: step-by-step user instructions
│   └── api/download/route.ts     API route: serves the framework .docx file
│
├── components/
│   ├── Navbar.tsx                Top navigation bar with mobile responsive menu
│   ├── Footer.tsx                Footer with institutional links
│   ├── CapabilitySelector.tsx    "Jump to Capability" dropdown (Explore and Assess)
│   └── CapabilityNavigation.tsx  Previous/Next capability navigation cards (Assess)
│
├── contexts/
│   └── AssessmentContext.tsx     React Context: global assessment state, localStorage sync
│
├── hooks/
│   └── useGuidedFilter.ts        Custom hook: role/function filter state and derived values
│
├── data/
│   ├── capabilities.ts           All framework content: capabilities, levels, descriptors
│   └── roleFilters.ts            Role/function definitions and capability mappings
│
├── types/
│   └── index.ts                  TypeScript interfaces for all shared data structures
│
├── public/
│   ├── uoa_logo.png
│   ├── uoa_logo_ext_reversed.png
│   ├── uoa_footer_logo.png
│   ├── RMAF_V1.5_for_socialisation.docx
│   └── uoa_corporate_branding/   Fonts, logo variants, UoA templates
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## Data Architecture

### Framework content

All capability content lives in `data/capabilities.ts`. This is the single file to edit for any updates to capability names, descriptions, behavioural descriptors, or Maori alignment statements. No other files need to be changed for content-only updates.

### Role and function mapping

All role and function definitions and their capability-level mappings live in `data/roleFilters.ts`. This is the file to update when the RMA team confirms the official role-mapping dataset.

### Assessment state

User assessment data is managed by `contexts/AssessmentContext.tsx` and persisted to `localStorage` under the key `rma-assessment-state`. The context is provided at the root layout level and is available to all pages without prop drilling.

### Guided filter state

The active role or function filter selection is managed by `hooks/useGuidedFilter.ts` and persisted to `localStorage` under the key `rma-guided-filter-selection`.

---

## Role and Function Filtering — Restoring the Feature

The filtering system is fully built and functional. The homepage filter panel was hidden at the end of Phase One pending confirmation of the official role-mapping data. To restore it:

**Step 1 — Restore the filter panel container**

In `app/page.tsx`, find the comment:

```
{/* Role / Function Filter — hidden until role-mapping data is finalised */}
```

On the div immediately below that comment, change:

```jsx
<div className="hidden" ...>
```

to:

```jsx
<div className="mb-12" ...>
```

**Step 2 — Restore the filter-active info message**

In the same file, find the comment:

```
{/* Info message when filter is active — hidden along with filter panel */}
```

On the line immediately below, change:

```jsx
{effectiveFilterId && false && (
```

to:

```jsx
{effectiveFilterId && (
```

No further changes are needed. All filtering behaviour across the Explore, Self-Assessment, and navigation components will resume automatically.

---

## Updating the Downloadable Framework Document

Replace the file at `public/RMAF_V1.5_for_socialisation.docx` with the new version, keeping the same filename. If the filename changes, also update the path string in `app/api/download/route.ts`.

---

## Data Storage

All user data is stored in `localStorage` on the user's own device. No data is transmitted to any external server. Users who clear their browser storage or switch devices will not see their previous assessment.

Two keys are used:

| Key | Contents |
|---|---|
| `rma-assessment-state` | Full assessment state: levels, descriptors, notes |
| `rma-guided-filter-selection` | Selected role or function filter |

---

## Troubleshooting

**Changes not saving**
- Check browser console for localStorage-related errors
- Ensure the browser has storage permissions enabled

**Styling appears broken**
- Clear the Next.js build cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**Navigation not working**
- Ensure JavaScript is enabled in the browser
- Try a hard refresh (Cmd+Shift+R on macOS, Ctrl+F5 on Windows)

---

## Phase Two Considerations

- Finalise role and function mapping data in `data/roleFilters.ts` and restore the homepage filter panel
- Update wording in `app/how-to-use/page.tsx` once the filter feature is live (the "coming soon" bullet in Section 1)
- Evidence upload feature (requires cloud storage integration)
- Longitudinal assessment history and snapshot comparison
- Back-end data storage and optional user authentication if institutional requirements change
- Formal WCAG 2.1 AA accessibility audit

---

## Cultural Considerations

All Maori terms and alignment statements are preserved exactly as written in the framework document. The application respects Te Tiriti o Waitangi principles and integrates Te Ao Maori values throughout the framework content, including alignment to Whaia Te Hihiri and Nga Taumata Tutuki at each capability level.

---

## Credits

- **Framework Development:** The Skills Group (David Penney) and University of Auckland
- **Working Group Leads:** Julia Mouatt, Victoria Louise Smith, Louise Brand
- **Working Group:** 16 members from across RMA, with particular contributions from Hine Busby, Rangimaarie Painting, and Sheye Semple

---

For support or questions, contact the University of Auckland RMA Working Group.
