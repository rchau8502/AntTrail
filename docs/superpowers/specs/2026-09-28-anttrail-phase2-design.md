# AntTrail Phase 2 Design Specification: Degree Requirement Engine & Quarter Planner

**Date:** 2026-09-28  
**Project:** AntTrail (`/Volumes/Crucial X9/AI/AntTrail`)  
**Scope:** Phase 2 (UCI Degree Requirement Engine, Planned Quarters, Sequence Validator, Degree Audit UI, Multi-Quarter Planner UI)  
**Status:** Approved for Implementation  

---

## 1. Executive Summary & Goals

Phase 2 builds upon the Phase 1 prerequisite engine by introducing:
1. **A Deterministic Degree Requirement Engine:**
   - Evaluates academic programs (**Computer Science B.S.** and **Mathematics B.S.**).
   - Validates **Lower-Division Core**, **Upper-Division Core**, **Major Electives**, and **University/GE Requirements**.
   - Identifies which requirements are **Satisfied** (by completed/in-progress courses), **Planned** (by courses scheduled in upcoming quarters), and **Remaining**.
   - Answers: *"Which courses that I'm eligible for right now will satisfy remaining requirements for my major?"*
2. **A Quarter-by-Quarter Planner with Sequence Validation:**
   - Visual multi-quarter layout (Fall, Winter, Spring, Summer).
   - Real-time **Prerequisite Sequence Validation**: Flags an error if a course is placed in quarter $Q_k$ while its prerequisite is scheduled in $Q_k$ or later (unless concurrent enrollment is officially permitted).
   - Unit load monitoring (underload $<12$ units, overload $>20$ units).
3. **Integrated Navigation & Reactive State:**
   - Seamless navigation tabs in `Navbar`:
     - **Course Eligibility** (Phase 1)
     - **Quarter Planner** (Phase 2)
     - **Degree Audit** (Phase 2)
   - 100% Client-side state persisted in `localStorage` with zero server data retention.

---

## 2. Academic Data Schemas & Extensions

### 2.1. Degree Requirement & Program Schemas (`src/academic-engine/types.ts`)

```typescript
export type RequirementType =
  | 'ALL_OF'              // Must complete every course in list
  | 'CHOOSE_N_COURSES'    // Complete at least N courses from list
  | 'CHOOSE_N_UNITS'      // Complete at least N units from list
  | 'MIN_TOTAL_UNITS'     // e.g. 180 units for graduation
  | 'MIN_UPPER_DIV_UNITS' // e.g. 60 units of upper-division coursework (numbered 100-199)

export interface DegreeRequirement {
  id: string
  name: string
  description?: string
  type: RequirementType
  targetCount?: number       // e.g. 3 courses, or 12 units, or 180 total units
  courses?: string[]         // Target UCI course codes (e.g. ['ICS 31', 'ICS 32'])
  subRequirements?: DegreeRequirement[]
}

export type RequirementCategory =
  | 'LOWER_DIVISION'
  | 'UPPER_DIVISION'
  | 'MAJOR_ELECTIVES'
  | 'GENERAL_EDUCATION'
  | 'UNIVERSITY'

export interface DegreeSection {
  id: string
  category: RequirementCategory
  name: string
  requirements: DegreeRequirement[]
}

export interface DegreeProgram {
  id: string
  name: string                 // "Computer Science B.S."
  catalogYear: string          // "2026-27"
  school: string               // "Donald Bren School of Information and Computer Sciences"
  totalUnitsRequired: number   // 180
  minUpperDivisionUnits: number // 60
  sections: DegreeSection[]
}
```

### 2.2. Planned Quarter & Course Schedule Schemas

```typescript
export interface PlannedCourse {
  courseCode: string
  units: number
  customTitle?: string
}

export interface PlannedQuarter {
  id: string                   // e.g. "fall-2026"
  term: 'Fall' | 'Winter' | 'Spring' | 'Summer'
  year: number                 // 2026
  courses: PlannedCourse[]
}

export interface SequenceValidationError {
  courseCode: string
  quarterId: string
  quarterLabel: string
  missingPrerequisite: string
  prerequisiteQuarterLabel?: string
  reason: 'NOT_SCHEDULED' | 'SCHEDULED_LATER' | 'SCHEDULED_CONCURRENTLY_ILLEGAL'
}
```

### 2.3. Degree Evaluation Output

```typescript
export interface EvaluatedRequirement {
  requirement: DegreeRequirement
  isComplete: boolean
  isPlannedComplete: boolean // Complete if including planned quarters
  completedCourses: string[]
  plannedCourses: string[]
  missingCourses: string[]
  unitsCompleted: number
  unitsPlanned: number
  eligibleToSatisfy: string[] // Courses student can take now that satisfy this requirement
}

export interface DegreeAuditResult {
  program: DegreeProgram
  overallProgressPercent: number
  plannedProgressPercent: number
  totalUnitsEarned: number
  totalUnitsPlanned: number
  upperDivisionUnitsEarned: number
  upperDivisionUnitsPlanned: number
  sections: Array<{
    section: DegreeSection
    requirements: EvaluatedRequirement[]
    isComplete: boolean
    isPlannedComplete: boolean
  }>
}
```

---

## 3. Algorithms & Business Logic

### 3.1. Degree Requirement Evaluation Algorithm (`src/academic-engine/degree.ts`)
1. Compile the student's **earned course set** (completed with sufficient grade) and **planned course set**.
2. For each requirement:
   - `ALL_OF`: Checks whether all specified courses are in the course set.
   - `CHOOSE_N_COURSES`: Counts the intersection of specified courses with the course set vs `targetCount`.
   - `CHOOSE_N_UNITS`: Sums units of taken courses from the approved pool.
   - `MIN_TOTAL_UNITS`: Sums all completed units.
   - `MIN_UPPER_DIV_UNITS`: Sums units for all courses with course numbers $\ge 100$ and $< 200$.
3. Compute `eligibleToSatisfy`: cross-references currently missing requirement courses with the student's `eligibleCourses` from Phase 1.

### 3.2. Prerequisite Sequence Validator (`src/academic-engine/planner.ts`)
For a schedule of quarters $[Q_1, Q_2, \dots, Q_m]$:
- Initialize the student's cumulative completed courses $C_0$ from their historical transcript.
- For each quarter $Q_k$:
  - For each course $X \in Q_k$:
    - Check if $X$'s prerequisites are satisfied by $C_{k-1}$ (prior quarters) or, if $X$ permits concurrent enrollment, by $C_{k-1} \cup Q_k$.
    - If unsatisfied:
      - If prerequisite $Y$ is in $Q_j$ where $j > k$, report `SCHEDULED_LATER`.
      - If prerequisite $Y$ is in $Q_k$ and concurrency is not permitted, report `SCHEDULED_CONCURRENTLY_ILLEGAL`.
      - If prerequisite $Y$ is never scheduled, report `NOT_SCHEDULED`.
  - Update cumulative completed courses: $C_k = C_{k-1} \cup Q_k$.

---

## 4. User Interface & Components

1. **Top-Level Tab Navigation (`src/components/Navbar.tsx`)**:
   - `Course Eligibility` (Matrix, quick search, AST inspector).
   - `Quarter Planner` (Quarter columns, add/remove courses, unit totals, sequence warnings).
   - `Degree Audit` (Section cards, progress percentage, remaining requirement drilldown).
2. **Quarter Planner View (`src/components/planner/QuarterPlannerView.tsx`)**:
   - Grid displaying upcoming quarters (e.g. Fall 2026, Winter 2027, Spring 2027, Summer 2027, Fall 2027, Winter 2028).
   - Unit load indicator per quarter:
     - Normal: $12 - 20$ units.
     - Underload warning: $< 12$ units (below full-time threshold).
     - Overload warning: $> 20$ units (requires dean's approval at UCI).
   - Sequence error banner showing exact conflicts (e.g. *"ICS 46 is planned in Fall 2026, but prerequisite ICS 45C is planned in Winter 2027"*).
   - Modal to pick courses from eligible courses or catalog.
3. **Degree Audit View (`src/components/degree/DegreeAuditView.tsx`)**:
   - Top stats banner: Earned Units, Planned Units, Upper-Division Units, Overall Degree Completion %.
   - Sections for Lower Division, Upper Division, and Electives.
   - Requirement status pill: `Complete`, `Planned`, or `Remaining`.
   - "Courses you can take right now to satisfy this" recommendation chip list.

---

## 5. Verification Plan

1. **Unit Tests (Vitest):**
   - Degree requirement evaluation for CS B.S. and Math B.S.
   - Proper accounting of `ALL_OF`, `CHOOSE_N_COURSES`, and unit thresholds.
   - Sequence validation: catching prerequisite violations across quarters.
   - Detection of illegal concurrent enrollment vs allowed concurrent enrollment.
2. **Build & Typecheck:**
   - `npm test` passing 100%.
   - `npm run build` compiling cleanly with 0 TypeScript errors.
