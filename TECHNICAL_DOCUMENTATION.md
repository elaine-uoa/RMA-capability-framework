# RMA Capability Framework Web Application
## Technical Documentation — Developer Handover

**Project:** RMA Capability Framework Self-Assessment Tool  
**Phase:** Phase One complete  
**Technology Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4  
**Deployment:** Vercel (temporary); final production hosting to be determined by University IT  
**Repository:** GitHub (private)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Overview](#2-architecture-overview)
3. [Technology Stack](#3-technology-stack)
4. [Folder and File Structure](#4-folder-and-file-structure)
5. [Data Layer](#5-data-layer)
6. [State Management](#6-state-management)
7. [Role and Function Filtering System](#7-role-and-function-filtering-system)
8. [Pages and Routing](#8-pages-and-routing)
9. [Shared Components](#9-shared-components)
10. [Styling and Branding](#10-styling-and-branding)
11. [API Routes](#11-api-routes)
12. [Data Persistence](#12-data-persistence)
13. [Key Logic Flows](#13-key-logic-flows)
14. [Known Limitations and Phase Two Considerations](#14-known-limitations-and-phase-two-considerations)
15. [Local Development Setup](#15-local-development-setup)

---

## 1. Project Overview

This application is an interactive web tool that digitises the University of Auckland's RMA (Research Management and Administration) Capability Framework. It allows RMA staff to:

- Browse the ten capabilities and their four proficiency levels (Foundation, Intermediate, Advanced, Exemplar)
- Complete a structured self-assessment by marking behavioural descriptors as demonstrated or targeted for development
- Build a personalised development plan from their assessment results
- Generate a print-ready PDF summary suitable for use in development conversations with managers
- Filter capabilities by role or function to focus on what is most relevant to their position (implemented and ready; UI currently hidden pending completion of role-mapping data)

The application runs entirely in the browser. There is no back-end server, no database, no user authentication, and no data transmitted externally. All user data is stored in the browser's `localStorage`.

---

## 2. Architecture Overview

The application follows a standard Next.js App Router architecture with a clean separation between data, logic, and presentation.

```
Browser (client only)
  └── Next.js App Router
        ├── Layout (Navbar, Footer, AssessmentProvider)
        ├── Pages (/, /explore, /assess, /plan, /summary, /how-to-use)
        ├── Shared Components (CapabilitySelector, CapabilityNavigation)
        ├── Context (AssessmentContext — global assessment state)
        ├── Hook (useGuidedFilter — role/function filter state)
        └── Data (capabilities.ts, roleFilters.ts — all framework content)
```

Key architectural decisions:

**Client-side only storage.** All assessment data is stored in `localStorage` under the key `rma-assessment-state`. The guided filter selection is stored separately under `rma-guided-filter-selection`. No server-side storage exists.

**All content in one data file.** The entire framework — all ten capabilities, forty proficiency levels, and all behavioural descriptors including Maori alignment statements — lives in `data/capabilities.ts`. This means framework content can be updated without touching any component code.

**React Context for global state.** The `AssessmentContext` wraps the entire application via the root layout and provides assessment read/write methods to all pages and components without prop drilling.

**Filter logic decoupled from UI.** The role/function filtering system is fully implemented as a hook (`useGuidedFilter`) and a data file (`data/roleFilters.ts`). The homepage filter UI has been hidden by adding Tailwind's `hidden` class to the filter panel div. Removing that class is sufficient to restore the full filtering UI.

---

## 3. Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.0.10 | Framework: App Router, SSR, routing, API routes |
| React | 19.2.0 | UI component model, hooks, context |
| TypeScript | 5.x | Static typing across all files |
| Tailwind CSS | 4.x | Utility-first styling |
| Heroicons (via @heroicons/react) | 2.2.0 | Icon set (used in some components) |

All dependencies are declared in `package.json`. Run `npm install` to restore them.

---

## 4. Folder and File Structure

```
/
├── app/                          Next.js App Router pages and API routes
│   ├── layout.tsx                Root layout: wraps all pages with Navbar, Footer, AssessmentProvider
│   ├── globals.css               Global CSS: custom properties, utility classes, print styles
│   ├── page.tsx                  Homepage (capability grid, filter panel — currently hidden)
│   ├── explore/
│   │   └── page.tsx              Framework exploration: read-only capability browser
│   ├── assess/
│   │   └── page.tsx              Self-assessment: dual-checkbox descriptors, level tabs
│   ├── plan/
│   │   └── page.tsx              Development plan: aggregated "Want to develop" items + notes
│   ├── summary/
│   │   └── page.tsx              Summary/print view: full assessment overview, PDF export
│   ├── how-to-use/
│   │   └── page.tsx              User guide page: instructions and contextual help
│   └── api/
│       └── download/
│           └── route.ts          API route: serves the framework .docx file for download
│
├── components/                   Shared UI components
│   ├── Navbar.tsx                Top navigation bar with mobile responsive menu
│   ├── Footer.tsx                Footer with institutional links
│   ├── CapabilitySelector.tsx    "Jump to Capability" dropdown used in Explore and Assess
│   └── CapabilityNavigation.tsx  Previous/Next capability navigation cards used in Assess
│
├── contexts/
│   └── AssessmentContext.tsx     React Context: global assessment state, localStorage persistence
│
├── hooks/
│   └── useGuidedFilter.ts        Custom hook: role/function filter state and derived values
│
├── data/
│   ├── capabilities.ts           ALL framework content: capabilities, levels, descriptors, alignments
│   └── roleFilters.ts            Role and function definitions, capability mappings, filter helpers
│
├── types/
│   └── index.ts                  TypeScript interfaces for all data structures
│
├── public/
│   ├── RMAF_V1.5_for_socialisation.docx   Framework document served via /api/download
│   ├── uoa_logo.png              UoA logo (standard)
│   ├── uoa_logo_ext_reversed.png UoA logo reversed (used in Navbar)
│   ├── uoa_footer_logo.png       UoA logo variant for Footer
│   └── uoa_corporate_branding/   Full corporate branding assets (fonts, templates, logos)
│
├── package.json                  Dependencies and npm scripts
├── tsconfig.json                 TypeScript configuration
├── next.config.ts                Next.js configuration (currently minimal)
├── postcss.config.mjs            PostCSS configuration for Tailwind CSS
└── eslint.config.mjs             ESLint configuration
```

---

## 5. Data Layer

### 5.1 `data/capabilities.ts`

This is the single source of truth for all framework content. It exports a `capabilities` array of type `Capability[]`.

Each `Capability` object has:
- `id`: a URL-safe slug (e.g., `"research-engagement"`, `"policy-strategy"`)
- `name`: display name
- `description`: one-sentence summary shown in cards and headers
- `levels`: array of four `CapabilityLevelDescriptor` objects

Each `CapabilityLevelDescriptor` has:
- `level`: one of `"FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "EXEMPLAR"`
- `bulletPoints`: array of strings — the individual behavioural descriptors
- `alignmentStatement`: a general Maori alignment paragraph for the level
- `descriptorAlignments`: optional array of `DescriptorAlignment` objects linking specific descriptors to specific Maori alignment texts

The ten capability IDs in order are:
```
research-engagement
maximising-impact
researcher-development
environment-culture
funding-opportunities
proposal-support
initiation
projects-initiatives
monitoring-reporting
policy-strategy
```

This order determines the sequence used by the Explore and Assess navigation (Previous/Next). The homepage groups them into five key areas, defined inline in `app/page.tsx`.

**To update framework content:** Edit the relevant `bulletPoints` array, `alignmentStatement`, or `description` field directly in `data/capabilities.ts`. No other files need to be changed for content-only updates.

### 5.2 `data/roleFilters.ts`

Contains the role and function definitions used by the filtering system. Exports:

- `roles`: `Role[]` — array of role objects, each with an `id`, `name`, optional `description`, and `capabilities` array
- `functions`: `Function[]` — same structure but for functional groupings

Each item in the `capabilities` array within a role/function maps a `capabilityId` to a `CapabilityLevel`, defining what level is expected for that role in that capability.

Also exports helper functions:
- `getCapabilityIdsForRole(roleId)` — returns capability IDs mapped to a role
- `getCapabilityIdsForFunction(functionId)` — same for functions
- `getCapabilityMappingsForSelection(filterType, filterId)` — returns the full mapping array for a given selection
- `getRequiredLevelForCapability(filterType, filterId, capabilityId)` — returns the expected level for a specific capability under a given role
- `loadGuidedFilterSelection()` / `saveGuidedFilterSelection()` / `clearGuidedFilterSelection()` — localStorage persistence for the selected filter

**Note on current data status:** The role and function mappings in `roleFilters.ts` were built as prototype/demonstration data. The RMA team is still in the process of finalising the official role-mapping datasets. Once finalised, update the `rolesData` and `functionsData` arrays in this file.

### 5.3 `types/index.ts`

Defines all TypeScript interfaces shared across the application:

- `CapabilityLevel` — union type for the four level strings
- `DescriptorAlignment` — Maori alignment data linked to a specific descriptor index
- `CapabilityLevelDescriptor` — one level's content within a capability
- `Capability` — top-level capability shape
- `SelectedDescriptor` — a user's selection, stored as `{ level, descriptorIndex }`
- `AssessmentResponse` — all stored data for a single capability per user
- `AssessmentState` — wrapper containing all responses and a `lastUpdated` timestamp
- `RoleProfile` — a placeholder interface for future role-profile extensions (not yet actively used)

---

## 6. State Management

### 6.1 `contexts/AssessmentContext.tsx`

The `AssessmentProvider` component wraps the entire app in `app/layout.tsx`. It manages the single `assessmentState` object in React state and provides these methods through context:

| Method | Purpose |
|---|---|
| `updateResponse(capabilityId, partial)` | Merge-updates a single capability's response |
| `getResponse(capabilityId)` | Returns the stored response for a capability, or null |
| `removeCapability(capabilityId)` | Removes a capability's response entirely |
| `clearAssessment()` | Resets all assessment data and clears localStorage |
| `getCompletedCount()` | Returns count of capabilities with a non-null `currentLevel` |

**localStorage key:** `rma-assessment-state`

**Hydration:** The context initialises with a default empty state, then on mount reads from localStorage and merges stored data into state. The `isHydrated` flag prevents saving back to localStorage before the initial load is complete, avoiding overwriting stored data with the empty default state.

**Legacy migration:** If an older `focusAreas` field is present in stored data (from an earlier version of the schema), it is automatically migrated to `demonstratedDescriptors` on load. This ensures backwards compatibility for any users with pre-migration data.

**Save trigger:** A separate `useEffect` watches `[assessmentState, isHydrated]` and serialises to localStorage whenever state changes after hydration.

### 6.2 `AssessmentResponse` data shape

```typescript
{
  capabilityId: string
  currentLevel: CapabilityLevel | null         // user's overall assessed level
  desiredLevel: CapabilityLevel | null          // target level (not currently surfaced in UI)
  notes: string                                  // free-text reflection notes
  demonstratedDescriptors: SelectedDescriptor[] // "I can do this" checkboxes
  developmentFocus: SelectedDescriptor[]        // "Want to develop" checkboxes
  developmentNotes: Record<string, string>       // keyed by "level-descriptorIndex"
  isIncluded: boolean                            // manually included in plan even with no selections
}
```

---

## 7. Role and Function Filtering System

### 7.1 How it works

The filtering system allows a user to select a role (e.g., "Grants Manager") or a function (e.g., "Research Operations") from the homepage. Once selected:

- On the **homepage**, capabilities mapped to the selection are shown normally; unmapped capabilities are visually dimmed with a note
- On capability cards with a mapping, a badge shows the role-relevant proficiency level
- In **Explore** and **Assess**, the `CapabilitySelector` dropdown marks mapped capabilities with a star and "mapped" badge
- In **Explore**, the level tab corresponding to the role-relevant level is marked with a star indicator
- In **Assess**, individual descriptors within the role-relevant level are marked with a "Role-relevant descriptor" badge
- In **CapabilityNavigation**, the previous/next cards indicate if adjacent capabilities are mapped

The selected filter persists in localStorage under the key `rma-guided-filter-selection` and is restored on page load.

### 7.2 `hooks/useGuidedFilter.ts`

This hook is the single point of access for all filtering logic across the application. It reads from and writes to `data/roleFilters.ts` functions. It exposes:

| Property / Method | Description |
|---|---|
| `selection` | The current `{ filterType, filterId }` or null |
| `filterType` | `"role"` or `"function"` or null |
| `selectedFilterId` | The id string of the selected role/function |
| `mappings` | Full array of `RoleCapabilityMapping` for the current selection |
| `mappedCapabilityIds` | Just the capability IDs for quick existence checks |
| `isGuidedFilterActive` | Boolean: true if any filter is set |
| `setGuidedFilter(type, id)` | Sets and persists a new filter |
| `clearGuidedFilter()` | Clears the filter from state and localStorage |
| `getRequiredLevel(capabilityId)` | Returns the expected level for a capability under the current filter |
| `getRelevantDescriptorIndexesForLevel(capabilityId, level, count)` | Returns descriptor indexes to highlight |
| `isMappedCapability(capabilityId)` | Boolean check |

### 7.3 Current visibility status

The homepage filter panel div has `className="hidden"` applied. This is the only change needed to hide the filtering UI. The underlying hook, data, and all per-page filtering logic remain intact.

**To restore the filter UI on the homepage:**

File: `app/page.tsx`

Find the comment:
```
{/* Role / Function Filter — hidden until role-mapping data is finalised */}
```

Change the `className` on the immediately following div from:
```
className="hidden"
```
to:
```
className="mb-12"
```

Also find the comment:
```
{/* Info message when filter is active — hidden along with filter panel */}
```

Change:
```jsx
{effectiveFilterId && false && (
```
to:
```jsx
{effectiveFilterId && (
```

No other changes are required. All filtering behaviour across all other pages will resume automatically.

---

## 8. Pages and Routing

### `app/page.tsx` — Homepage

Responsibilities:
- Renders the hero section with primary CTAs
- Renders the framework overview and proficiency level descriptor cards
- Renders the five-column capability grid with colour-coded key area headers
- Houses the role/function filter panel (currently hidden)
- Consumes `useGuidedFilter` to conditionally dim/highlight capability cards based on the active filter

Key state: `mounted` (to prevent hydration mismatch with localStorage-sourced filter data), `activeTab`, `searchQuery`, `isDropdownOpen`.

The `keyAreas` array defined at the top of this file controls which capabilities appear under which column and with which colour. The `capabilityMetadata` object provides the icon for each capability card. The proficiency level descriptor text shown in the four cards at the bottom of the homepage is hardcoded inline in the JSX.

### `app/explore/page.tsx` — Explore Mode

A read-only view of any capability. Accepts a `?capability=` query parameter. Falls back to the first capability if none is provided.

The page is wrapped in a `Suspense` boundary because it uses `useSearchParams()`, which requires client-side rendering.

Components rendered:
- `CapabilitySelector` (Jump to Capability dropdown)
- `LevelTabsReadOnly` (the four level tabs and descriptor list)
- Previous/Next navigation links
- Training and development resources section
- CTA card linking to the Assess page for the current capability

The `LevelTabsReadOnly` component manages its own `selectedTab` state. It passes `requiredLevel` and `requiredDescriptorIndexes` down from the filter hook to visually mark role-relevant content when a filter is active.

### `app/assess/page.tsx` — Self-Assessment

The primary assessment interface. Also accepts a `?capability=` query parameter.

Each capability view contains:
- A collapsible guidance section explaining how to use the dual checkboxes
- Four level tabs, each showing a list of `DescriptorCard` components
- A notes textarea for free-text reflection
- `CapabilitySelector` and `CapabilityNavigation` for navigation

`DescriptorCard` manages the visual state of a single descriptor (one of four backgrounds depending on neither/demonstrated/development/both checkbox states). Checkbox toggle handlers call `updateResponse` from the context.

**Auto-save:** A `useEffect` watches for changes to the current capability's `demonstratedDescriptors` and `developmentFocus` arrays and calls `updateResponse` to merge them back into context, which then triggers the context's own save `useEffect`.

**Manual save:** A "Save now" button is also provided that sets an explicit `lastSaved` timestamp displayed near the button.

### `app/plan/page.tsx` — Development Plan

Shows all capabilities the user has engaged with (has a `currentLevel`, any `developmentFocus` items, or `isIncluded === true`). Presents a tabbed interface per capability.

For each capability tab, displays:
- Development focus items (descriptors marked "Want to develop") grouped by level
- A textarea for development notes
- An expandable section showing demonstrated descriptors

Also renders a separate list of unassessed capabilities the user might want to add to their plan, with an "Include in Plan" button for each.

Notes are saved to context via a debounced save pattern tied to the blur event on the textarea.

### `app/summary/page.tsx` — Summary and Print View

Aggregates assessment data across all engaged capabilities. Shows for each:
- Assessed level
- Count of demonstrated and development-focus descriptors
- Expanded lists of both sets

Has a print/PDF export flow triggered by a "Print / Save PDF" button. This opens a modal prompting the user to enter their name, which is stored in localStorage and printed in the report header. CSS print styles (`@media print`) are defined in `globals.css` and hide the Navbar, Footer, and UI-only elements.

Supports two report modes: "All" (full assessment) and "Focus only" (only capabilities with development focus items).

### `app/how-to-use/page.tsx` — User Guide

A static content page. No state or framework data. All content is hardcoded in JSX. Contains five numbered sections and two informational sections (Getting Started, Framework Progression Logic).

**Role-filtering wording:** Section 1 ("Explore the Framework") currently contains a bullet point noting that role-based filtering is coming soon. This wording will need to be updated once Phase Two completes the filtering feature. The bullet point is near line 253 of this file.

### `app/api/download/route.ts` — Download API Route

A simple Next.js API route handler that reads `public/RMAF_V1.5_for_socialisation.docx` from disk and returns it as a file download with the appropriate Content-Type and Content-Disposition headers. Called by the "Download the Framework" link on the homepage.

---

## 9. Shared Components

### `components/Navbar.tsx`

Sticky top navigation bar. Dark navy background (`#0c0c48`). Uses `usePathname()` to determine the active link and apply underline styling. Includes a hamburger menu for mobile viewports below the `md` Tailwind breakpoint.

The `navItems` array at the top of this file controls all navigation links. To add, remove, or rename a nav item, update this array.

### `components/Footer.tsx`

Static footer. Dark background (`#050505`). The `footerLinks` array controls the links rendered. All are external links to University pages. The copyright year is computed dynamically.

### `components/CapabilitySelector.tsx`

A dropdown that lists all ten capabilities and links to the selected one. Used on both the Explore and Assess pages. Receives a `mode` prop (`"explore"` or `"assess"`) to construct the correct URL path. When a guided filter is active, mapped capabilities are marked with a star and a "mapped" badge. The currently viewed capability is highlighted with a filled indicator dot.

### `components/CapabilityNavigation.tsx`

Renders Previous and Next navigation cards on the Assess page. Each card shows the adjacent capability's name and colour. If a guided filter is active, cards for mapped capabilities show a small "mapped (level)" badge. When the user reaches the last capability, the Next card is replaced by a "Build Development Plan" link to `/plan`.

---

## 10. Styling and Branding

### Tailwind CSS

Utility classes are used throughout. Tailwind v4 is configured via `postcss.config.mjs`. There is no separate `tailwind.config.js` file; Tailwind v4 scans files automatically.

### `app/globals.css`

Contains:
- CSS custom properties for the brand colour palette
- Responsive utility classes (`.resp-container`, `.resp-heading-xl`, etc.) used across pages
- Print media query styles that hide navigation, buttons, and non-report content when printing
- Custom checkbox styles for the dual-checkbox assessment cards
- Any overrides that cannot be handled by utility classes alone

### Colour palette (key values)

| Name | Hex | Usage |
|---|---|---|
| Navy (primary) | `#0C0C48` | Headings, navbar, CTAs |
| Blue | `#1F2BD4` | Links, accents |
| Teal | `#00877C` | Maori alignment sections |
| Mid-grey | `#4A4A4C` | Body text |
| Light grey | `#F3F3F6` | Page backgrounds, bands |
| Border grey | `#E2E3E4` | Card borders |

Capability key area colours (used in cards, headers, navigation):
- Research Engagement and Impact: `#BCC0F3`
- Researcher Development and Culture: `#99EAF9`
- Research Proposal Development: `#A3EBCC`
- Research Project and Risk Management: `#FFBFB7`
- Research Policy and Strategy: `#ECBEFA`

### Fonts

Inter is the primary typeface, consistent with UoA brand guidelines. Font files are stored in `public/uoa_corporate_branding/Inter-Font-2025-1/`. The font is loaded globally via CSS in `globals.css` using `@font-face`.

### Branding assets

UoA logo files are in `public/`. The navbar uses `uoa_logo_ext_reversed.png` (reversed/white version). Standard variants are also available. Full branding assets (templates, certificate files, Teams backgrounds) are in `public/uoa_corporate_branding/` and are not directly used by the application code.

---

## 11. API Routes

Only one API route exists:

**`GET /api/download`**  
Defined in `app/api/download/route.ts`.  
Reads `public/RMAF_V1.5_for_socialisation.docx` and returns it as a file download.  
To replace the downloadable framework document, replace the file at `public/RMAF_V1.5_for_socialisation.docx` with the new version. The filename in the `Content-Disposition` header is hardcoded as `RMA_Capability_Framework_v1.5.docx` and can be updated in the route file if needed.

---

## 12. Data Persistence

Two localStorage keys are used:

| Key | Content | Managed by |
|---|---|---|
| `rma-assessment-state` | Full `AssessmentState` JSON object | `AssessmentContext.tsx` |
| `rma-guided-filter-selection` | `{ filterType, filterId }` JSON object | `roleFilters.ts` helpers |

Both keys are string-serialised JSON. There is no schema versioning beyond the legacy `focusAreas` migration in `AssessmentContext`. If the `AssessmentResponse` schema is changed significantly in Phase Two (e.g., adding new fields), consider adding a version number and migration logic at the load step.

Data is device-local. There is no cross-device synchronisation. Users who clear their browser data or switch browsers will lose their assessment.

---

## 13. Key Logic Flows

### Self-assessment data write path

1. User toggles a checkbox on the Assess page
2. `DescriptorCard` calls `onToggleDemonstrated` or `onToggleWantToDevelop`
3. The handler updates a local `selectedDescriptors` / `developmentFocus` array in `AssessPage` component state
4. A `useEffect` in `AssessPage` detects the change and calls `updateResponse(capabilityId, { demonstratedDescriptors, developmentFocus })`
5. `updateResponse` in `AssessmentContext` merges the change into `assessmentState`
6. The context's save `useEffect` detects the state change and writes the full state to localStorage

### Filter activation path

1. User selects a role or function from the homepage dropdown (once UI is restored)
2. `handleFilterSelect` calls `setGuidedFilter(type, id)` from `useGuidedFilter`
3. `setGuidedFilter` updates React state in the hook and calls `saveGuidedFilterSelection` to write to localStorage
4. The homepage re-renders; `effectiveFilterId` / `effectiveFilterType` become non-null
5. The capability grid re-renders, computing `visibleCapabilityIds` from `mappedCapabilityIds`; dimming and badge logic runs per card

### Print/PDF path

1. User clicks "Print / Save PDF" on Summary page
2. A modal prompts for the user's name; name is stored in localStorage
3. After confirmation, `window.print()` is called with a 150ms delay
4. The browser's print dialog opens; CSS `@media print` styles apply, hiding all non-report elements
5. User saves as PDF or prints

---

## 14. Known Limitations and Phase Two Considerations

**Role mapping data is placeholder.** The `rolesData` and `functionsData` arrays in `roleFilters.ts` were built with illustrative data to demonstrate the UI. The RMA team must finalise the official mapping. Once confirmed, update this file and unhide the homepage filter panel (see Section 7.3).

**No back-end or database.** This is by design for Phase One. If institutional requirements change and persistent server-side storage becomes necessary in Phase Two, the `AssessmentContext` would need to be replaced or augmented with API calls. The shape of `AssessmentState` and `AssessmentResponse` in `types/index.ts` is designed to be serialisable and would translate straightforwardly to a database schema.

**localStorage limitations.** Data is browser-local and will be lost if the user clears browser storage. Users accessing the application from different devices or browsers cannot share their assessment. This was an accepted tradeoff for Phase One.

**No evidence upload.** Identified as a Phase Two feature. Would require a cloud storage integration and file management UI.

**No longitudinal tracking.** Each user has one current assessment state. There is no history of previous assessments or ability to compare over time. The `lastUpdated` timestamp is stored but not surfaced in the UI. Phase Two may introduce snapshot-based history.

**No authentication.** The application is publicly accessible without login. This is intentional (open access for all RMA staff). If the University decides to restrict access or introduce user accounts in Phase Two, authentication would need to be added at the Next.js middleware layer.

**Print layout is browser-dependent.** The print/PDF output relies on CSS print styles and browser rendering. Different browsers may produce slightly different page breaks. Tested primarily in Chrome.

**Descriptor relevance logic is a template.** The `getRelevantDescriptorIndexes` function in `roleFilters.ts` uses a hardcoded template mapping levels to descriptor index positions. Once the RMA team provides specific descriptor-to-role mappings, this function should be replaced with data-driven logic.

---

## 15. Local Development Setup

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Steps

```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available scripts

| Script | Command | Purpose |
|---|---|---|
| Development | `npm run dev` | Starts Next.js development server with hot reload |
| Build | `npm run build` | Creates a production build |
| Start | `npm run start` | Serves the production build locally |
| Lint | `npm run lint` | Runs ESLint across the codebase |

### Deployment

The application is currently deployed to Vercel. Deployment is triggered automatically by pushes to the main branch via the Vercel GitHub integration. Environment variables are not required for current functionality. For production deployment within the University's infrastructure, the application can be built with `npm run build` and hosted as a Node.js server or as a static export depending on the University's preferred hosting approach.
