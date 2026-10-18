# Specification: Transfer Articulation & Major Preparation Workstation (`/transfer`)

**Date:** 2026-10-17  
**Author:** AntTrail Engineering  
**Status:** Approved / In Planning  
**Target Routes:** `/transfer`, `/api/articulation`  

---

## 1. Problem Statement & Motivation

AntTrail is the unified academic operating system for UC Irvine. While the Degree Planner (`/degree-planning`) provides AST prerequisite checking and quarter planning for continuing UCI students, California Community College (CCC) transfer students face severe anxiety regarding:
1. Whether their completed community college coursework articulates to lower-division major requirements at UC Irvine and peer UC campuses.
2. Missing "critical" major-prep courses required for competitive admission.
3. Reaching the minimum 60 semester / 90 quarter transferable unit threshold.
4. Bridging transfer coursework directly into AntTrail's 4-year degree planner without manually re-entering dozens of courses.

Although AntTrail includes a 1,350-line articulation engine in `lib/articulation.ts` and a serverless relay in `app/api/articulation/route.ts`, the user-facing `/transfer` route was not yet implemented (resulting in a 404 error when accessed from external documentation).

This specification establishes the full implementation of the **ScholarStack Transfer Articulation & Major Preparation Workstation** at `/transfer`.

---

## 2. Architecture & Data Flow

```
                      [ User Input in /transfer ]
         Origin CCC, Target Destination Campus, Target Major
                                  │
                                  ▼
                    [ Course Selection / Custom Entry ]
           Select from CCC Course Catalog (IVC, OCC, De Anza, etc.)
                   or enter course code + grade + term
                                  │
                                  ▼
      [ Client-side Engine / API Relay: lib/articulation.ts ]
          auditCourseArticulation({ targetCampus, targetMajor, courses })
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
[ Visual Audit Dashboard ]                     [ Degree Planner Bridge ]
- Completion % & Transfer Units Tracker       - "Bridge to AntTrail Planner"
- Satisfied vs Missing Critical Reqs          - Converts to StudentCourseRecord[]
- C-ID & Direct Articulation Table            - Writes to anttrail_active_profile_v2
- Transfer Admissions Recommendations         - Seamless transfer to /degree-planning
```

---

## 3. Data Contracts & Interfaces

### 3.1 Course Input Record
```typescript
export interface InputTransferCourse {
  id: string
  code: string         // e.g. "CS 36", "MATH 3A"
  title: string        // e.g. "C++ Programming"
  units: number        // e.g. 4
  grade: string        // "A", "B", "C", "IP"
  term?: string        // "Fall 2024", "Spring 2025"
  status: 'completed' | 'planned'
}
```

### 3.2 Articulation Output Contract (from `lib/articulation.ts`)
```typescript
export interface MajorPreparationAudit {
  targetCampus: string
  targetMajor: string
  totalRequirements: number
  satisfiedCount: number
  plannedCount: number
  missingCount: number
  completionPercentage: number
  requirements: Array<{
    requirement: TargetMajorRequirement
    status: 'satisfied' | 'planned' | 'missing'
    matchedCourse?: {
      code: string
      title: string
      grade?: string
      term?: string
    }
  }>
  articulatedCourses: CourseArticulationMatch[]
  recommendations: string[]
}
```

### 3.3 Bridge to AntTrail Planner Profile (`localStorage['anttrail_active_profile_v2']`)
Articulated courses that match target UCI courses are transformed into `StudentCourseRecord` format:
```typescript
{
  id: `transfer-${match.originCourseCode}-${Date.now()}`,
  courseCode: match.targetCourseCode, // e.g. "ICS 45C" or "MATH 2A"
  institution: originCollegeName,     // e.g. "Irvine Valley College"
  term: course.term || 'Transfer Credit',
  units: match.targetUnits || 4,
  grade: (course.grade as GradeLetter) || 'A',
  status: course.status === 'completed' ? 'COMPLETED' : 'PLANNED'
}
```

---

## 4. UI Specification (`app/transfer/page.tsx`)

### 4.1 Header & Hero
- AntTrail Anteater Blue & Gold styling matching `/degree-planning` and `/canvas`.
- Badge: `ScholarStack Articulation Workstation`.
- Title: `California Community College Transfer & Major Prep Auditor`.
- Subtitle: `Audit your CCC coursework against UC Irvine and UC transfer prerequisites with instant ASSIST.org course equivalencies.`

### 4.2 Selectors Card
- **Origin Community College:** Dropdown with supported California Community Colleges:
  - Irvine Valley College (IVC)
  - Orange Coast College (OCC)
  - De Anza College
  - Santa Monica College (SMC)
  - Mt. San Antonio College (Mt. SAC)
  - Foothill College
  - Diablo Valley College (DVC)
  - Pasadena City College (PCC)
- **Target Destination Campus:** Defaulted to **UC Irvine**; selectable: *UC Berkeley, UCLA, UC San Diego, UC Davis, UC Santa Barbara*.
- **Target Major:** Dynamic dropdown based on selected campus (e.g. for UC Irvine: *Computer Science, Data Science, Software Engineering, Mathematics, Business Administration, Mechanical Engineering*).

### 4.3 Course Selection & Tray
- **Quick-Add Catalog:** Displays common articulation courses for the selected college (from `CCC_COURSE_EQUIVALENCIES`) with one-click "Add" chips.
- **Custom Course Form:** Manual entry for unlisted courses (Course Code, Title, Units, Grade, Term, Status).
- **Active Course List:** Display of added courses with grade badge, units, status chip, and delete button.

### 4.4 Audit Dashboard
- **Progress Gauge:** Completion percentage of lower-division major requirements.
- **Transferable Units Tracker:** Visual progress bar toward 60 semester / 90 quarter units required for junior standing transfer.
- **Requirement Cards:**
  - Categorized (Calculus, Linear Algebra, Data Structures, Discrete Math, Physics, etc.).
  - Status Pills: `Satisfied` (emerald), `Planned` (sky), `Missing Critical` (rose), `Missing Elective` (amber).
  - Matched course details with C-ID cross-reference.
- **Admissions Guidance:** List of dynamic recommendations (e.g., critical prerequisite alerts, timing tips before spring review).

### 4.5 Degree Planner Bridge Modal / Action
- Sticky or prominent call-to-action: **"Bridge Articulated Courses to AntTrail Degree Planner"**.
- Displays summary of courses to be imported into UCI transcript format.
- Merges with existing `anttrail_active_profile_v2` in `localStorage` without overwriting unrelated student data.
- Confirms with a success toast/banner and links directly to `/degree-planning`.

---

## 5. Global Navigation & Discoverability

1. **`components/Navbar.tsx`**: Add `{ label: 'Transfer Prep', href: '/transfer', badge: 'Scholar' }` to the primary navigation links.
2. **`components/Footer.tsx`**: Add `/transfer` under Academic Planning links.
3. **`app/page.tsx`**: Add a dedicated Transfer Articulation spotlight card in the Bento Grid linking to `/transfer`.

---

## 6. Testing & Quality Assurance (`tests/articulation.test.ts`)

1. **Unit Tests for `lib/articulation.ts`**:
   - UCI Computer Science major audit with IVC courses (`CS 36`, `CS 37`, `CS 41`, `MATH 3A`, `MATH 3B`).
   - Detection of `missing` critical requirements when prerequisites are incomplete.
   - Handling of `planned` status vs `completed` status with letter grades (`A` through `C` vs `D`/`F`).
   - Transfer unit tally calculation (semester to quarter unit conversion awareness).
   - Articulation against multiple UC campuses (UC Irvine, UC Berkeley, UCLA).
2. **API Endpoint Test**:
   - Validate `POST /api/articulation` with valid payload returns 200 and audit response.
   - Validate error handling on invalid campus, major, or malformed course list.
3. **Build & Typecheck**:
   - `npm test` runs with 100% passing tests.
   - `npm run build` succeeds without Turbopack or TypeScript compilation errors.
