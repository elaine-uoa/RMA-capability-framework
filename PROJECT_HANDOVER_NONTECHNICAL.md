# RMA Capability Framework Web Application
## Project Handover Document — Phase One Complete

**Prepared for:** Project Leads and Stakeholders  
**Project:** RMA Capability Framework Self-Assessment Tool  
**Phase:** Phase One complete, handover to Phase Two development team  
**Date:** February 2026

---

## Table of Contents

1. [What This Application Is and What It Does](#1-what-this-application-is-and-what-it-does)
2. [What Was Completed in Phase One](#2-what-was-completed-in-phase-one)
3. [What Remains for Phase Two](#3-what-remains-for-phase-two)
4. [How the Application Is Structured](#4-how-the-application-is-structured)
5. [Page-by-Page Guide — What Each Page Does and Where to Find It](#5-page-by-page-guide--what-each-page-does-and-where-to-find-it)
6. [Where to Change Text, Wording, and Minor Content](#6-where-to-change-text-wording-and-minor-content)
7. [The Role and Function Filtering Feature — Current Status and How to Restore It](#7-the-role-and-function-filtering-feature--current-status-and-how-to-restore-it)
8. [The How-to Guide Page — What Was Updated and How to Edit It](#8-the-how-to-guide-page--what-was-updated-and-how-to-edit-it)
9. [The Framework Content — How to Update Capabilities and Descriptors](#9-the-framework-content--how-to-update-capabilities-and-descriptors)
10. [How User Data Is Stored](#10-how-user-data-is-stored)
11. [Navigation and Branding](#11-navigation-and-branding)
12. [Downloadable Framework Document](#12-downloadable-framework-document)
13. [Summary of Key Files and Their Plain-English Purpose](#13-summary-of-key-files-and-their-plain-english-purpose)

---

## 1. What This Application Is and What It Does

The RMA Capability Framework Web Application is an interactive self-assessment tool for Research Management and Administration (RMA) staff at Waipapa Taumata Rau, the University of Auckland. It digitises the RMA Capability Framework, making it accessible and actionable in a structured, user-friendly web interface.

The application guides staff through the following process:

1. **Explore the framework.** Staff can browse all ten capabilities and read the behavioural descriptors at each of the four proficiency levels: Foundation, Intermediate, Advanced, and Exemplar.

2. **Complete a self-assessment.** For each capability, staff mark which behaviours they can already demonstrate and which behaviours they want to develop. They can also record an overall proficiency level and write reflective notes.

3. **Build a development plan.** The tool aggregates all the behaviours a staff member has flagged for development and presents them as a structured plan, with space for written notes and action steps.

4. **Generate a summary.** Staff can generate a print-ready or PDF summary of their full assessment and development plan, which they can save or share with their manager.

5. **Use role or function filtering (coming in Phase Two).** The system is fully built to allow staff to filter the framework by their specific role or function, so that the most relevant capabilities and levels are surfaced for them. This feature is complete at the technical level but is currently hidden from the homepage while the official role-mapping data is being finalised by the RMA team. Once that work is done, the feature can be made visible with a small change to one file (detailed in Section 7).

The application runs entirely in the user's browser. No data is sent to a server. All assessment information is stored locally on the user's own device.

---

## 2. What Was Completed in Phase One

The following items were fully designed, built, and delivered in Phase One:

**Core application infrastructure**
- Full website structure built using modern web technologies (Next.js, React, TypeScript, Tailwind CSS)
- University of Auckland branding applied throughout, including the Inter typeface, logo placement, and institutional colour palette
- Responsive design for desktop and tablet viewports
- Accessible navigation with keyboard and screen-reader support considered
- Mobile-friendly hamburger menu

**Framework content**
- All ten capabilities entered into the system with their names, descriptions, and all four proficiency levels
- All behavioural descriptors entered at each level for each capability
- Maori alignment statements included for each proficiency level of each capability, linked to Whaia Te Hihiri and Nga Taumata Tutuki
- Specific descriptor-level alignment notes included for selected key descriptors

**Explore page**
- Read-only capability browser with level tabs and full descriptor display
- Maori alignment section displayed per level
- Previous and Next navigation between capabilities
- "Ready to assess yourself?" call-to-action at the bottom of each capability view
- Link to the Research Hub RMA Staff Development page

**Self-Assessment page**
- Dual-checkbox interface per descriptor: one checkbox for "I can demonstrate this" and one for "I want to develop this"
- Colour-coded visual states on each descriptor card based on selections made
- Auto-save of all checkbox selections and notes to the browser
- A free-text notes area per capability for written reflections
- "Save now" button for manual confirmation

**Development Plan page**
- Automatically populated from the self-assessment
- Tabbed view per capability
- Expandable section for demonstrated behaviours
- Development focus items grouped by proficiency level within each tab
- Text note field per capability for development planning
- Ability to include additional capabilities not yet assessed
- Ability to remove capabilities from the plan

**Summary and Print page**
- Full view of all assessed capabilities
- Personalised with a user name entered before printing
- Two print modes: full summary or development-focus only
- PDF-quality print layout with UoA branding
- "Clear assessment" function to reset all data

**Role and Function Filtering system (built, not yet visible)**
- Complete filtering engine covering 16 defined roles and 16 defined functions
- Filtering logic integrated into the Explore page, Self-Assessment page, and the capability navigation components
- Mapping data included for all roles and functions, marking the expected proficiency level per capability
- Filter selection persists between page visits via the browser's local storage
- Homepage filter panel built but currently hidden (see Section 7)

**How-to Guide page**
- Five-step illustrated guide explaining how to use the tool
- Updated wording to reflect that role-based filtering is coming in Phase Two

**Download functionality**
- "Download the Framework" link on the homepage that allows users to download the framework as a Word document

---

## 3. What Remains for Phase Two

The following items were identified during Phase One and are recommended for Phase Two:

**Finalise and activate role and function mapping**
The most immediate Phase Two task is for the RMA team to confirm the official mapping between roles/functions and the capabilities and levels that apply to each. Once confirmed, those mappings should be entered into the codebase (see Section 7), and the filter panel on the homepage should be made visible. This is the highest-priority Phase Two item because the filtering feature is the key differentiator that makes the tool personalised and role-relevant.

**Evidence upload**
Allow users to attach supporting evidence to their self-assessment entries, such as documents, emails, or links. This would require a cloud storage integration and was out of scope for Phase One.

**Longitudinal tracking and history**
Enable users to save multiple assessment snapshots over time and compare their progress. Phase One supports only one active assessment per user.

**Back-end data storage and user accounts**
Phase One stores all data in the user's own browser. For institutional record-keeping, performance review integrations, or team-level insights, a back-end database and authentication system would be needed.

**Manager and administrator views**
A view for line managers or HR administrators to see aggregated or individual staff assessment summaries, if desired by the institution.

**Accessibility audit**
A formal WCAG 2.1 AA accessibility audit and remediation pass.

---

## 4. How the Application Is Structured

This section gives a simplified map of how the project files are organised. Understanding this structure will help anyone who needs to make changes find the right file quickly.

The project lives in a single folder. Inside it, the important areas are:

**The `app` folder**
This is where each page of the website lives. Each page has its own subfolder containing one file called `page.tsx`. That file contains all the content and logic for that page.

```
app/
  page.tsx              The homepage
  explore/page.tsx      The Explore page
  assess/page.tsx       The Self-Assessment page
  plan/page.tsx         The Development Plan page
  summary/page.tsx      The Summary and Print page
  how-to-use/page.tsx   The How-to Guide page
  api/download/route.ts The file that handles the "Download Framework" button
  globals.css           Global visual styles (colours, fonts, layout rules)
  layout.tsx            The wrapper that adds the Navbar and Footer to every page
```

**The `components` folder**
This contains building blocks used across multiple pages:

```
components/
  Navbar.tsx                 The top navigation bar
  Footer.tsx                 The footer at the bottom of every page
  CapabilitySelector.tsx     The "Jump to Capability" dropdown on Explore and Self-Assessment
  CapabilityNavigation.tsx   The Previous/Next navigation cards on Self-Assessment
```

**The `data` folder**
This is where all the framework content is stored as structured data:

```
data/
  capabilities.ts    All ten capabilities, their levels, descriptors, and Maori alignment text
  roleFilters.ts     All role and function definitions and their capability mappings
```

**The `contexts` and `hooks` folders**
These are technical files that manage how data flows between pages. Non-developers do not need to edit these.

```
contexts/AssessmentContext.tsx   Manages the user's assessment data across all pages
hooks/useGuidedFilter.ts         Manages the role/function filter selection across all pages
```

**The `public` folder**
Contains images, logos, and files served directly to users:

```
public/
  uoa_logo.png                         University logo
  uoa_logo_ext_reversed.png            Logo used in the Navbar (white version)
  RMAF_V1.5_for_socialisation.docx     The downloadable framework document
```

---

## 5. Page-by-Page Guide — What Each Page Does and Where to Find It

| Page name | URL path | File location |
|---|---|---|
| Homepage | `/` | `app/page.tsx` |
| Explore | `/explore` | `app/explore/page.tsx` |
| Self-Assessment | `/assess` | `app/assess/page.tsx` |
| Development Plan | `/plan` | `app/plan/page.tsx` |
| My Summary | `/summary` | `app/summary/page.tsx` |
| How-to Guide | `/how-to-use` | `app/how-to-use/page.tsx` |

Each file path above is relative to the root of the project folder. These are the files that would need to be edited for any content or functionality changes to those respective pages.

---

## 6. Where to Change Text, Wording, and Minor Content

This section maps specific areas of visible content to their exact location in the codebase.

### Homepage heading and description

**File:** `app/page.tsx`

The large hero heading at the top of the homepage ("RMA Capability Framework") and the two lines of subtitle text beneath it are defined early in the JSX within the hero section div. Search for the phrase "RMA Capability Framework" in the file to find this block quickly. The text can be edited directly.

### Homepage key area names and descriptions

**File:** `app/page.tsx`

The five coloured columns on the homepage (Research Engagement and Impact, Researcher Development and Culture, etc.) are defined in an array at the top of the file called `keyAreas`. Each entry has a `name` field and a `description` field. To rename a key area or update its description, edit the appropriate string value in this array. The array starts around line 20 of the file.

### Homepage proficiency level cards

**File:** `app/page.tsx`

The four cards at the bottom of the homepage that describe Foundation, Intermediate, Advanced, and Exemplar levels contain hardcoded text in the JSX. Search for "Foundation" within the file to locate this section. Each card's title and description text can be edited directly in place.

### Capability names and one-sentence descriptions

**File:** `data/capabilities.ts`

The `name` and `description` fields of each capability entry in this file control the text shown on capability cards on the homepage, the header of each Explore page, and the header of each Self-Assessment page.

### Capability behavioural descriptors

**File:** `data/capabilities.ts`

Each capability has four levels, and each level has a `bulletPoints` array. Each string in that array is one behavioural descriptor. To add, remove, or edit a descriptor, find the relevant capability by its `id` (e.g., `"funding-opportunities"`), then find the relevant level, and edit the `bulletPoints` array accordingly.

### Maori alignment statements

**File:** `data/capabilities.ts`

Within each proficiency level of each capability, the `alignmentStatement` field contains the general Maori alignment text shown at the bottom of each level view on the Explore page. The `descriptorAlignments` array contains more granular alignments for specific descriptors. Both can be edited in this file.

### Navigation links in the top bar

**File:** `components/Navbar.tsx`

The array called `navItems` near the top of this file controls all the links shown in the navigation bar and their display labels. To rename a navigation item, change its `label` value. To reorder items, rearrange the entries in the array.

### Footer links

**File:** `components/Footer.tsx`

The array called `footerLinks` near the top of this file lists all the links shown in the footer. To add, remove, or change a footer link or its label, edit this array.

### Explore page training resources section

**File:** `app/explore/page.tsx`

The grey section at the bottom of every Explore page that reads "Training and Development Resources" contains a heading, a sentence of description text, and a link to the Research Hub. Search for "Training" within this file to find the section. The text and URL of the link are hardcoded in this section and can be edited directly.

### Self-Assessment guidance text

**File:** `app/assess/page.tsx`

The expandable guidance panel on the Self-Assessment page (which explains how to use the two checkboxes) contains instructional text. This text is written inline in the JSX of the `AssessPage` function. Search for "guidance" or "collapsible" within this file to locate it.

### Development Plan page instructional text

**File:** `app/plan/page.tsx`

Any instructional or descriptive text on the Development Plan page is written inline in the JSX of this file.

### Summary page instructional text and print modal

**File:** `app/summary/page.tsx`

The text prompts on the Summary page, including the modal that asks for the user's name before printing, are written inline in the JSX of this file. Search for "modal" or "Print" to locate these sections.

---

## 7. The Role and Function Filtering Feature — Current Status and How to Restore It

### What the feature does

The role and function filtering feature allows a staff member to select their specific role (for example, "Grants Manager" or "Research Funding Specialist") or their functional area (for example, "Compliance and Governance" or "Research Development") from the homepage. Once a selection is made:

- The capability grid on the homepage shows which capabilities are mapped to that role or function, and the cards for non-relevant capabilities are visually dimmed
- Each mapped capability card displays the expected proficiency level for that role
- On the Explore page, the level tab that corresponds to the expected level for the role is marked with a star
- In the Self-Assessment, specific behavioural descriptors within the expected level are marked as "Role-relevant"
- The "Jump to Capability" dropdown on Explore and Self-Assessment marks mapped capabilities with a "mapped" badge
- The Previous/Next navigation cards in Self-Assessment indicate whether adjacent capabilities are mapped to the selected role

The filter selection is remembered as the user moves between pages.

### Current status

The entire filtering system — the logic, the data, and all the visual markers across every page — is fully built and functional. However, the homepage filter panel that allows users to actually make a role or function selection is currently hidden from view. This was a deliberate decision made at the end of Phase One because the official role-mapping data had not yet been fully confirmed by the RMA team.

Hiding the panel does not delete or disable anything. The filtering system remains complete in the codebase and will continue to work correctly once the panel is made visible again.

### Where the hiding is controlled

**File:** `app/page.tsx`

There are exactly two places in this file where the hiding was applied:

**Location 1 — The filter panel container div**

Find the following comment in the file (around line 390):
```
{/* Role / Function Filter — hidden until role-mapping data is finalised */}
```

The very next line will look like this:
```jsx
<div className="hidden" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
```

To restore the filter panel, change `className="hidden"` to `className="mb-12"`. That single word change is all that is needed to make the entire filter panel reappear.

**Location 2 — The "filter is active" information message**

Find the following comment in the same file (a short distance after the first change):
```
{/* Info message when filter is active — hidden along with filter panel */}
```

The line immediately following it will look like this:
```jsx
{effectiveFilterId && false && (
```

To restore the filter-active info message, remove the `&& false` portion, so that the line reads:
```jsx
{effectiveFilterId && (
```

These are the only two changes needed. Once both are made and the application is rebuilt, the full filtering feature will be restored exactly as it was designed and tested.

### Where the role and function mapping data lives

**File:** `data/roleFilters.ts`

This file contains two large arrays:

- `rolesData` — defines all 16 roles. Each role entry includes its display name, an optional description, and a list of capability-to-level mappings (e.g., "Research Engagement at Intermediate level").
- `functionsData` — defines all 16 functional areas. Same structure.

The current mapping data in this file was built as a representative demonstration to show the feature working end-to-end. It is based on the best available understanding of RMA roles at the time of Phase One. The RMA team should review and confirm these mappings before the feature is made visible to users.

### How to update the mapping data

To update which capabilities and levels are mapped to a given role, open `data/roleFilters.ts` and find the role by its `id` value or its `name` value. Each role object looks like this:

```
{
  id: "grants-manager",
  name: "Grants Manager",
  description: "Manages grant applications and reporting processes",
  capabilities: [
    { capabilityId: "funding-opportunities", level: "ADVANCED" },
    { capabilityId: "proposal-support", level: "ADVANCED" },
    { capabilityId: "monitoring-reporting", level: "ADVANCED" },
    { capabilityId: "projects-initiatives", level: "INTERMEDIATE" },
  ]
}
```

To change the expected level for a capability, edit the `level` value. The four valid values are: `"FOUNDATION"`, `"INTERMEDIATE"`, `"ADVANCED"`, and `"EXEMPLAR"` — they must be written in capital letters exactly as shown.

To add a new capability mapping to a role, add a new line to the `capabilities` array following the same format.

To remove a mapping, delete the corresponding line from the `capabilities` array.

The valid capability IDs that can be used in these mappings are:
- `"research-engagement"`
- `"maximising-impact"`
- `"researcher-development"`
- `"environment-culture"`
- `"funding-opportunities"`
- `"proposal-support"`
- `"initiation"`
- `"projects-initiatives"`
- `"monitoring-reporting"`
- `"policy-strategy"`

To add an entirely new role, add a new object to the `rolesData` array following the same structure as the existing entries. The `id` should be a lowercase, hyphenated version of the role name (e.g., `"research-communications-advisor"`). The same process applies to adding a new function to the `functionsData` array.

---

## 8. The How-to Guide Page — What Was Updated and How to Edit It

### What was changed

The "How-to Guide" page was updated at the end of Phase One to reflect the current state of the filtering feature accurately. Specifically:

- The bullet point that previously described the role-based filtering feature as an active capability was replaced with a note explaining that role-based filtering is currently being developed and will be available in a future update.
- A reference to the filter selection being remembered across pages was removed from the "Data Storage" section.
- References to guided mode markers appearing in the Self-Assessment were removed.

These changes ensure that users are not misled about functionality that is not yet accessible to them.

### Where to find the wording that needs to be updated in Phase Two

Once Phase Two completes the role-mapping work and the filter panel is restored, the wording in the guide page will need to be updated to reflect that the filtering feature is now live.

**File:** `app/how-to-use/page.tsx`

The relevant section is under the heading "1. Explore the Framework". Within the rounded light-purple card in that section, look for the final `BulletRow` component. It currently reads something like:

> Role-based filtering is coming soon. We are currently working on mapping capabilities to specific RMA roles and functions. Once this is complete, you will be able to filter the framework by your role or function...

This paragraph should be replaced with an accurate description of how the filtering feature works once it is live. The surrounding three bullet points can also be expanded at that time to include instructions on using the role/function selector on the homepage.

The section is located approximately between lines 240 and 310 of the file. Searching for "Role-based filtering" in the file will take you directly to the correct location.

---

## 9. The Framework Content — How to Update Capabilities and Descriptors

### Where all framework content lives

**File:** `data/capabilities.ts`

This single file is the complete content database for the framework. It contains all ten capabilities in sequence, and for each capability it contains:

- The capability name
- A one-sentence description
- Four proficiency levels (Foundation, Intermediate, Advanced, Exemplar)
- For each level, the full list of behavioural descriptors
- For each level, a Maori alignment statement
- For selected descriptors within certain levels, more specific Maori alignment notes

Editing any of these values in this file will immediately update the text that appears across the Explore page, the Self-Assessment page, and the Summary.

### How to update a behavioural descriptor

Find the capability by its identifier (e.g., searching for `"funding-opportunities"`) within the file, then find the relevant proficiency level, then find the `bulletPoints` array. Each item in the array is one descriptor. Edit the string text to update the wording.

### How to add a new descriptor

Within the `bulletPoints` array for the relevant level, add a new string entry. The order in which strings appear in this array is the order they will appear on screen.

### How to update Maori alignment text

Find the capability and level, then edit the `alignmentStatement` string for the general-level alignment. For descriptor-specific alignments, find the relevant entry in the `descriptorAlignments` array and edit the `alignmentText` value.

---

## 10. How User Data Is Stored

All user data is stored locally in the user's own browser, in a feature called localStorage. No data is sent to any server, and no data is visible to the University or the development team.

This means:

- If a user clears their browser history or browser data, their assessment will be lost
- If a user switches to a different browser or a different device, they will not see their previous assessment
- Two different users on the same computer using the same browser would share the same storage

These are known tradeoffs that were accepted for Phase One in order to avoid the complexity of a server-side system. If the University wishes to store data centrally in Phase Two, this would require a more significant architectural change.

The stored data covers:
- All checkbox selections across all capabilities
- All notes entered
- The user's name (entered before printing)
- The selected role or function filter (once the filter feature is made visible)

---

## 11. Navigation and Branding

### Navigation bar

**File:** `components/Navbar.tsx`

The navigation bar appears at the top of every page and contains six links: Home, Explore, Self-Assessment, Development Plan, My Summary, and How-to Guide. The bar uses the University's navy colour (`#0C0C48`) and the reversed (white) version of the UoA logo.

To rename a navigation link, edit the `label` value for the corresponding entry in the `navItems` array near the top of this file.

### Footer

**File:** `components/Footer.tsx`

The footer appears at the bottom of every page and contains links to University institutional pages. To update any link or add a new one, edit the `footerLinks` array at the top of this file. The copyright year updates automatically each year.

### Logo files

All logo image files are stored in the `public` folder:
- `uoa_logo_ext_reversed.png` — the white/reversed version used in the navigation bar
- `uoa_logo.png` — the standard version
- `uoa_footer_logo.png` — used in the footer

To replace a logo, replace the relevant file in the `public` folder with a new image file of the same name.

### Fonts

The Inter typeface (matching University branding guidelines) is used throughout the application. The font files are stored in `public/uoa_corporate_branding/Inter-Font-2025-1/` and are loaded via the global CSS file.

---

## 12. Downloadable Framework Document

The homepage contains a "Download the Framework" button that allows users to download the RMA Capability Framework as a Word document.

**File location of the document:** `public/RMAF_V1.5_for_socialisation.docx`

To update the downloadable document with a newer version of the framework, replace this file with the updated version, keeping exactly the same filename. The download button will automatically serve the new file.

If the filename of the new document is different, a small update is also needed in:

**File:** `app/api/download/route.ts`

On the line that reads:
```
const filePath = join(process.cwd(), 'public', 'RMAF_V1.5_for_socialisation.docx');
```

Replace `'RMAF_V1.5_for_socialisation.docx'` with the new filename.

---

## 13. Summary of Key Files and Their Plain-English Purpose

| File | Plain-English Purpose |
|---|---|
| `app/page.tsx` | The homepage. Edit to change the hero text, key area names, homepage layout, or to restore the filter panel. |
| `app/explore/page.tsx` | The Explore page. Edit to change the layout, training resources section, or CTA text. |
| `app/assess/page.tsx` | The Self-Assessment page. Edit to change guidance text or the assessment interface. |
| `app/plan/page.tsx` | The Development Plan page. Edit to change instructional text or plan layout. |
| `app/summary/page.tsx` | The Summary and Print page. Edit to change report layout, print modal text, or clear-data messaging. |
| `app/how-to-use/page.tsx` | The How-to Guide page. Edit to update user instructions, especially after role filtering goes live. |
| `app/layout.tsx` | The shared wrapper. Edit to change what appears on every page (the Navbar and Footer are included here). |
| `app/globals.css` | Global styles and colours. Edit with care — changes here affect every page. |
| `app/api/download/route.ts` | Controls the "Download Framework" button. Edit if the document filename changes. |
| `components/Navbar.tsx` | The navigation bar. Edit to rename or reorder navigation links. |
| `components/Footer.tsx` | The footer. Edit to change footer links. |
| `data/capabilities.ts` | All framework content — every capability, level, descriptor, and Maori alignment text. The most frequently edited data file. |
| `data/roleFilters.ts` | All role and function definitions and their capability mappings. Edit to update mappings and restore the filter feature. |
| `contexts/AssessmentContext.tsx` | Manages how assessment data is stored and shared across pages. Generally not edited for content changes. |
| `hooks/useGuidedFilter.ts` | Manages the active filter selection across pages. Generally not edited for content changes. |
| `public/RMAF_V1.5_for_socialisation.docx` | The downloadable framework document. Replace with a newer version to update the download. |
