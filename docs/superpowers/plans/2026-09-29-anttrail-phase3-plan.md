# AntTrail Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement actual UCI quarterly course offerings with confidence levels, a deterministic Auto Plan constraint solver producing multiple valid graduation plans, and the interactive Auto Plan UI for AntTrail.

**Architecture:** Extend the framework-independent academic engine with an Auto Plan constraint solver (`autoplan.ts`) that topologically sorts required degree courses, respects prerequisite chains and quarterly term offerings, enforces unit ceilings, and generates three valid roadmaps (Balanced, Accelerated, Light), verified via `validatePlannedSchedule`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Vite, Vitest.

---

## File Changes & Responsibilities

```
/Volumes/Crucial X9/AI/AntTrail
├── src/
│   ├── academic-engine/
│   │   ├── types.ts                  # Extended with AutoPlanPreferences, GeneratedPlan, AutoPlanResult
│   │   └── autoplan.ts               # Deterministic constraint solver & multi-plan generator
│   ├── data/
│   │   └── uci/
│   │       └── offerings.ts          # UCI course quarterly offering schedules & helper utilities
│   ├── components/
│   │   └── planner/
│   │       ├── AutoPlanModal.tsx     # Preference configuration & multi-plan comparison modal
│   │       └── QuarterPlannerView.tsx # Wired Auto Plan trigger button & plan replacement
│   └── App.tsx                       # Handler to apply auto-generated plan into active quarter board
├── tests/
│   └── autoplan-engine.test.ts       # Vitest tests verifying deterministic auto-planning
└── README.md                         # Updated implementation progress
```

---

## Tasks

- [x] **Task 1: Extend Types & Define UCI Offerings Helper**
  - Add `AutoPlanPreferences`, `GeneratedPlan`, and `AutoPlanResult` to `src/academic-engine/types.ts`.
  - Create `src/data/uci/offerings.ts` with term lookup helpers (`isCourseOfferedInTerm`, `getOfferingConfidenceBadge`, `getAvailableTermsForCourse`).

- [x] **Task 2: Implement Auto Plan Constraint Engine (`src/academic-engine/autoplan.ts`)**
  - Calculate bottleneck prerequisite depths via recursive AST inspection.
  - Formulate quarter-by-quarter candidate slots matching prerequisite satisfaction and term availability.
  - Generate 3 distinct strategies:
    - **Balanced Pace**: 14–16 units/term, strictly Fall/Winter/Spring.
    - **Accelerated**: 16–18 units/term, optional summer sessions.
    - **Light Workload**: 12–14 units/term, extended terms.
  - Automatically validate each plan with `validatePlannedSchedule()`.

- [x] **Task 3: Build Unit Tests for Auto Plan Engine (`tests/autoplan-engine.test.ts`)**
  - Test Auto Plan on Freshman CS persona: generates valid prerequisite progression from ICS 31 to CS 161.
  - Test Auto Plan on Mt. SAC Transfer persona: builds schedule utilizing transfer credits without repeating completed courses.
  - Verify that no course is placed in an off-quarter (e.g. spring for fall-only courses).
  - Verify that all generated plans pass `validatePlannedSchedule` with 0 sequencing errors.

- [x] **Task 4: Build Auto Plan UI Component (`AutoPlanModal.tsx`)**
  - Create `src/components/planner/AutoPlanModal.tsx` with:
    - Preference controls: Max units per term slider, summer session toggle, desired courses input.
    - Side-by-side plan comparison cards: Plan A (Balanced), Plan B (Accelerated), Plan C (Light).
    - Details preview per quarter with course count and unit totals.
    - "Apply This Plan" button.

- [x] **Task 5: Wire Auto Plan Modal into QuarterPlannerView & App**
  - Add prominent **"⚡ Auto Plan"** button to `QuarterPlannerView.tsx`.
  - Connect "Apply This Plan" callback to replace `plannedQuarters` in `App.tsx` with state persistence.

- [x] **Task 6: Run Comprehensive Test Suite & Preflight Build**
  - Run all Vitest suites (`npm test`).
  - Run production build (`tsc && vite build`).
  - Verify 0 TypeScript errors and optimized build.

- [x] **Task 7: Update Documentation & Commit to Git**
  - Update `README.md` marking Phase 3 complete.
  - Commit all changes with clean conventional commit message.
