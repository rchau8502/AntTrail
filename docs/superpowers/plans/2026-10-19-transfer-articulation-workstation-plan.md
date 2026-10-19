# Transfer Articulation Workstation (`/transfer`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the ScholarStack Transfer Articulation & Major Preparation Workstation at `/transfer` allowing California Community College (CCC) transfer students to audit course equivalencies against UC Irvine and UC campuses, check critical prerequisites, track the 60-unit transfer threshold, and bridge coursework directly into AntTrail's Degree Planner.

**Architecture:** Pure algorithmic articulation engine in `lib/articulation.ts` and CCC catalog data in `data/cccArticulations.ts`, verified by unit tests in `tests/articulation.test.ts`, paired with an interactive Next.js workstation in `app/transfer/page.tsx`, and wired into global navigation (`Navbar.tsx`, `Footer.tsx`, and `app/page.tsx`).

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide icons, Vitest.

---

### Task 1: Engine Hardening & CCC Catalog Presets

**Files:**
- Create: `data/cccArticulations.ts`
- Modify: `lib/articulation.ts`
- Test: `tests/articulation.test.ts`

- [ ] **Step 1: Create `data/cccArticulations.ts` with CCC college metadata and course catalogs**
  - Define `CccCollege` interface and list top 8 California Community Colleges:
    - Irvine Valley College (IVC)
    - Orange Coast College (OCC)
    - De Anza College
    - Santa Monica College (SMC)
    - Mt. San Antonio College (Mt. SAC)
    - Foothill College
    - Diablo Valley College (DVC)
    - Pasadena City College (PCC)
  - Define preset course catalogs for each college with codes, titles, units, and default terms.

- [ ] **Step 2: Harden `classifyCccCourse` in `lib/articulation.ts`**
  - Ensure course title takes precedence over ambiguous code regexes (e.g. `MATH 3A` with title "Analytic Geometry and Calculus I" must classify as `calculus`, not `linear_algebra`; `CS 36` with title "C++ Programming" must classify as `programming_intro`/`programming_intermediate`, not `data_structures`).
  - Support C-ID cross references and additional UC Irvine major mappings (e.g. Software Engineering, Data Science).

- [ ] **Step 3: Implement unit tracking and Degree Planner bridge helper in `lib/articulation.ts`**
  - Add `calculateTransferableUnits(courses, collegeSystem)` returning completed semester units, planned semester units, and quarter unit conversions (1 semester unit = 1.5 quarter units).
  - Add `bridgeArticulatedToStudentProfile(audit, originCollege, currentProfile)` converting articulated courses into `StudentCourseRecord` format for `localStorage['anttrail_active_profile_v2']`.

---

### Task 2: Comprehensive Unit Tests (`tests/articulation.test.ts`)

**Files:**
- Create: `tests/articulation.test.ts`

- [ ] **Step 1: Write unit tests for `classifyCccCourse`**
  - Test IVC courses: `MATH 3A` (Calculus I), `MATH 3B` (Calculus II), `MATH 26` (Linear Algebra), `CS 36` (Programming), `CS 37` (Data Structures).
  - Test OCC courses: `MATH A180` (Calculus I), `CS A200` (Data Structures).
  - Test De Anza courses: `MATH 1A`, `CIS 22A`, `CIS 22C`.

- [ ] **Step 2: Write tests for `auditCourseArticulation`**
  - Test UC Irvine Computer Science audit with completed and planned courses.
  - Test missing critical prerequisites flagging (e.g. missing Linear Algebra and Data Structures).
  - Test audit against UC Berkeley and UCLA.
  - Test transfer unit calculation (semester to quarter unit conversion and 60-unit threshold).

- [ ] **Step 3: Write tests for Degree Planner bridge function**
  - Verify articulated courses are converted to `StudentCourseRecord` objects with correct `courseCode`, `institution`, `grade`, and `status`.
  - Verify existing student course records are not lost during merge.

- [ ] **Step 4: Run Vitest to verify all tests pass**
  - Run: `npx vitest run tests/articulation.test.ts`
  - Verify 100% pass rate.

---

### Task 3: ScholarStack Transfer Workstation UI (`app/transfer/page.tsx`)

**Files:**
- Create: `app/transfer/page.tsx`

- [ ] **Step 1: Build Header & Hero**
  - AntTrail Anteater Blue & Gold styling matching `/degree-planning` and `/canvas`.
  - Badge: `ScholarStack Articulation Workstation`.
  - Title: `California Community College Transfer & Major Prep Auditor`.
  - Subtitle: `Audit your CCC coursework against UC Irvine and UC transfer prerequisites with instant ASSIST.org course equivalencies.`

- [ ] **Step 2: Build Origin & Destination Selectors Card**
  - CCC College selector with 8 preloaded colleges.
  - Target Campus selector (defaulted to UC Irvine, options for Berkeley, UCLA, UCSD, etc.).
  - Target Major selector (dynamic based on selected campus).

- [ ] **Step 3: Build Quick-Add Catalog & Custom Course Form**
  - Quick-add chip tray displaying common transferable courses for the selected CCC.
  - Custom course modal or inline form (Code, Title, Units, Grade, Term, Status).
  - Active course roster with remove button, grade badge, units, and status.

- [ ] **Step 4: Build Visual Audit Dashboard**
  - Major prep completion percentage radial/progress bar.
  - Transferable units tracker towards 60 semester units (90 quarter units).
  - Categorized requirements checklist (Calculus, Linear Algebra, Data Structures, Discrete Math, Physics, GE) with status pills (`Satisfied`, `Planned`, `Missing Critical`).
  - C-ID cross references and articulation notes.
  - Dynamic admissions guidance alerts.

- [ ] **Step 5: Build Degree Planner Bridge Modal / Action**
  - "Bridge Articulated Courses to AntTrail Degree Planner" button.
  - Confirmation modal showing transformed UCI courses.
  - Writes to `localStorage['anttrail_active_profile_v2']` and emits update events.
  - Direct navigation button to `/degree-planning`.

---

### Task 4: Global Navigation & Discoverability

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Update `components/Navbar.tsx`**
  - Add `{ label: 'Transfer Prep', href: '/transfer', badge: 'Scholar' }` to desktop navigation links.
  - Add Transfer Prep link to mobile slide-out menu.

- [ ] **Step 2: Update `components/Footer.tsx`**
  - Add `/transfer` link under Academic Planning / quick links.

- [ ] **Step 3: Update `app/page.tsx`**
  - Add Transfer Articulation spotlight card to the Bento Grid.

---

### Task 5: End-to-End Verification & Build

**Files:**
- All touched files

- [ ] **Step 1: Run full Vitest suite**
  - Run: `npm test`
  - Verify all 14 test files pass.

- [ ] **Step 2: Run Next.js production build**
  - Run: `npm run build`
  - Verify `/transfer` route builds statically or dynamically without errors.

- [ ] **Step 3: Git commit**
  - Commit all changes with clear descriptive message.
