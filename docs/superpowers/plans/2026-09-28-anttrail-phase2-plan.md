# AntTrail Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the UCI Degree Requirement Engine, multi-quarter planner with prerequisite sequence validation, and degree audit dashboard for AntTrail.

**Architecture:** Extend the framework-independent TypeScript academic engine with degree audit and quarter sequence validation algorithms, backed by official UCI degree models for Computer Science B.S. and Mathematics B.S., and wire into a responsive tabbed UI.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Vite, Vitest.

---

## File Changes & Responsibilities

```
/Volumes/Crucial X9/AI/AntTrail
├── src/
│   ├── academic-engine/
│   │   ├── types.ts                  # Extended with DegreeProgram, PlannedQuarter, SequenceError types
│   │   ├── degree.ts                 # Pure deterministic degree evaluation engine
│   │   └── planner.ts                # Multi-quarter prerequisite sequence validator
│   ├── data/
│   │   └── uci/
│   │       └── programs.ts           # UCI Computer Science B.S. and Mathematics B.S. degree definitions
│   ├── components/
│   │   ├── Navbar.tsx                # Active tab switcher (Eligibility, Planner, Degree Audit)
│   │   ├── degree/
│   │   │   └── DegreeAuditView.tsx   # Degree audit overview, category cards, & progress bars
│   │   └── planner/
│   │       ├── QuarterPlannerView.tsx # Multi-quarter board layout with sequence alerts & unit totals
│   │       ├── QuarterColumn.tsx     # Single quarter column with course cards & unit badge
│   │       └── AddCourseModal.tsx    # Modal to pick eligible/catalog courses into quarter
│   └── App.tsx                       # Master tab coordination, reactive planned quarter state
├── tests/
│   ├── degree-engine.test.ts         # Vitest tests for degree audit evaluation
│   └── planner-engine.test.ts        # Vitest tests for quarter prerequisite sequence validation
└── README.md                         # Updated implementation progress
```

---

## Tasks

- [ ] **Task 1: Extend Academic Engine Types & Define Degree Programs Data**
  - Add `DegreeProgram`, `DegreeRequirement`, `DegreeSection`, `PlannedQuarter`, `PlannedCourse`, `SequenceValidationError`, and `DegreeAuditResult` to `src/academic-engine/types.ts`.
  - Create `src/data/uci/programs.ts` defining official requirements for:
    - **Computer Science B.S.** (Lower Div Core: ICS 31-33, 45C, 46; MATH 2A, 2B, 3A, STATS 67; Upper Div Core: CS 161; Upper Div Electives; Min 180 units; Min 60 Upper Div units).
    - **Mathematics B.S.** (Lower Div Core: MATH 2A, 2B, 2D, 3A, 13; Upper Div Core: MATH 140A, 105A; Min 180 units; Min 60 Upper Div units).

- [ ] **Task 2: Build Degree Evaluation Engine & Unit Tests**
  - Create `tests/degree-engine.test.ts` testing:
    - Accurate evaluation of completed requirements for Freshman vs Sophomore vs Junior personas.
    - Identification of planned courses satisfying remaining requirements.
    - Calculation of `eligibleToSatisfy` (recommending courses the student can enroll in right now).
  - Implement `src/academic-engine/degree.ts` with pure deterministic evaluation logic.
  - Run `npm test tests/degree-engine.test.ts` until passing.

- [ ] **Task 3: Build Quarter Sequence Validator & Unit Tests**
  - Create `tests/planner-engine.test.ts` testing:
    - Valid multi-quarter sequence (e.g. Fall 2026: ICS 31 → Winter 2027: ICS 32 → Spring 2027: ICS 33).
    - Detection of backward ordering (e.g. ICS 33 planned in Fall 2026, ICS 32 planned in Winter 2027).
    - Detection of illegal concurrent enrollment (prerequisite required prior).
    - Handling of transfer courses already completed satisfying prerequisites for planned courses.
  - Implement `src/academic-engine/planner.ts`.
  - Run `npm test tests/planner-engine.test.ts` until passing.

- [ ] **Task 4: Build Degree Audit UI (`DegreeAuditView.tsx`)**
  - Create `src/components/degree/DegreeAuditView.tsx` displaying:
    - Progress cards: Overall % completed, units completed/planned/remaining, upper division units.
    - Section breakdowns (Lower Division, Upper Division, Electives).
    - Requirement cards showing status (`Complete`, `Planned`, `Remaining`), courses satisfying each, and eligible course recommendations.

- [ ] **Task 5: Build Quarter Planner UI (`QuarterPlannerView.tsx`, `QuarterColumn.tsx`, `AddCourseModal.tsx`)**
  - Create `src/components/planner/QuarterColumn.tsx` displaying scheduled courses, unit count, and delete action.
  - Create `src/components/planner/AddCourseModal.tsx` allowing fast selection of courses from catalog or currently eligible courses.
  - Create `src/components/planner/QuarterPlannerView.tsx` with:
    - Multi-quarter grid (6 quarters default: Fall 2026 through Spring 2028).
    - Warning banner for sequence conflicts and underload/overload unit warnings.
    - Quick actions: Add quarter, Clear schedule, Load recommended roadmap.

- [ ] **Task 6: Wire Multi-Tab Navigation & Reactive Planner State into App.tsx**
  - Update `src/components/Navbar.tsx` with functional navigation tabs: `Course Eligibility`, `Quarter Planner`, `Degree Audit`.
  - Update `src/App.tsx` with `activeTab` state, `plannedQuarters` state with `localStorage` persistence, and shared reactive evaluation.

- [ ] **Task 7: Comprehensive Verification & Preflight Build**
  - Run all Vitest suites (`npm test`).
  - Run `npm run build` (`tsc && vite build`).
  - Verify 0 TypeScript errors and optimized production bundle.

- [ ] **Task 8: Update Documentation & Commit to Git**
  - Update `README.md` reflecting Phase 2 completion.
  - Commit all changes with conventional commit messages.
