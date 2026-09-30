# AntTrail Phase 3 Design Specification: Actual UCI Offerings & Deterministic Auto Plan Engine

**Date:** 2026-09-29  
**Project:** AntTrail (`/Volumes/Crucial X9/AI/AntTrail`)  
**Scope:** Phase 3 (UCI Quarterly Offerings, Offering Confidence Hierarchy, Deterministic Auto Plan Constraint Engine, Multiple Valid Plans, Auto Plan UI)  
**Status:** Approved for Implementation  

---

## 1. Executive Summary & Goals

Phase 3 transforms AntTrail into an intelligent, deterministic academic scheduling advisor. Students can click **"⚡ Auto Plan"**, specify their preferences (unit load, summer session usage, pace), and immediately receive 2–3 realistic, mathematically valid quarter-by-quarter pathways to graduation.

### Key Invariants:
1. **Realistic Plans Only:**
   - A course is **never** scheduled in a quarter where it is not offered (checked against official UCI WebSOC offerings or departmental teaching plans).
   - Strict prerequisite chronological ordering is maintained (prerequisite must be completed prior to the scheduled term).
   - Bottleneck prerequisite chains (e.g. `ICS 31 → 32 → 33 → 45C → 46 → CS 161`) are scheduled on the critical path.
2. **Offering Confidence Levels:**
   - `CONFIRMED`: Published in the official Schedule of Classes (WebSOC).
   - `EXPECTED`: Listed on official departmental future teaching plans.
   - `LIKELY`: Follows historical quarterly patterns.
   - `UNKNOWN`: Insufficient data.
   - *Rule:* `EXPECTED` and `LIKELY` are never presented as `CONFIRMED`.
3. **Multiple Meaningful Alternatives:**
   - Does not dictate a single "best" plan. Generates distinct strategies:
     - **Plan A (Balanced Pace):** ~14–16 units/term, standard 3-quarter academic year (no summer).
     - **Plan B (Accelerated / Fast Track):** 16–18 units/term, optional summer sessions to graduate earlier.
     - **Plan C (Light Workload / Minimum Full-Time):** ~12–14 units/term, spreading units across more terms.
4. **Verification Preflight:**
   - Every auto-generated plan is passed through `validatePlannedSchedule()` before rendering to guarantee 0 prerequisite conflicts.

---

## 2. System Architecture & New Modules

```
/Volumes/Crucial X9/AI/AntTrail
├── src/
│   ├── academic-engine/
│   │   ├── types.ts                # AutoPlanPreferences, AutoPlanOption, OfferingConfidence types
│   │   ├── autoplan.ts             # Deterministic topological constraint solver & schedule generator
│   │   ├── planner.ts              # Prerequisite sequence validator
│   │   └── degree.ts               # Degree requirement evaluation
│   ├── data/
│   │   └── uci/
│   │       ├── courses.ts          # Course definitions with term offerings & confidence
│   │       └── offerings.ts        # Enriched quarterly offering data & helper queries
│   ├── components/
│   │   └── planner/
│   │       ├── AutoPlanModal.tsx   # Interactive preference configuration & multi-plan selector
│   │       └── QuarterPlannerView.tsx # Integrated Auto Plan trigger button & banner
│   └── App.tsx                     # Master state & applying auto-generated plans
├── tests/
│   └── autoplan-engine.test.ts     # Comprehensive Vitest tests for Auto Plan engine
└── README.md                       # Phase 3 documentation
```

---

## 3. Data Schemas & Extensions

```typescript
export interface AutoPlanPreferences {
  targetGraduationYear?: number
  maxUnitsPerQuarter: number        // e.g. 16 or 20
  minUnitsPerQuarter: number        // e.g. 12
  includeSummer: boolean            // true | false
  preferredStrategy: 'BALANCED' | 'ACCELERATED' | 'LIGHT'
  userSelectedCourseCodes?: string[] // Optional specific courses student wants prioritized
}

export interface GeneratedPlan {
  id: string
  name: string                      // "Balanced Standard Pace", "Accelerated Fast Track", "Light Workload"
  strategy: 'BALANCED' | 'ACCELERATED' | 'LIGHT'
  description: string
  quarters: PlannedQuarter[]
  totalUnits: number
  totalQuarters: number
  graduationTerm: string            // e.g. "Spring 2028"
  averageUnitsPerQuarter: number
  isValid: boolean
}

export interface AutoPlanResult {
  plans: GeneratedPlan[]
  unfulfillableCourses: Array<{
    courseCode: string
    reason: string
  }>
}
```

---

## 4. Constraint Solving Algorithm (`src/academic-engine/autoplan.ts`)

1. **Target Identification:**
   - Extract all unsatisfied degree requirement courses from active major (e.g. Computer Science B.S. or Mathematics B.S.).
   - Merge with any user-selected desired courses.
   - Filter out courses already completed in student transcript.

2. **Critical Path & Topological Depth Calculation:**
   - Compute dependency graph (DAG) for all remaining courses based on their `prerequisiteExpression`.
   - Calculate maximum prerequisite depth:
     - `ICS 31` (Depth 0) → `ICS 32` (Depth 1) → `ICS 33` (Depth 2) → `ICS 45C` (Depth 3) → `ICS 46` (Depth 4) → `CS 161` (Depth 5).
   - Higher depth / higher downstream dependent count receives scheduling priority to prevent bottleneck delays.

3. **Quarter-by-Quarter Slotting:**
   - Generate terms chronologically: $[Q_1, Q_2, \dots, Q_m]$.
   - For each quarter $Q_k$:
     - Check if $Q_k$ is a Summer term; skip if `includeSummer === false` (for Balanced & Light plans).
     - Find candidate courses whose prerequisites are **fully satisfied** by completed history plus all courses in quarters $Q_1 \dots Q_{k-1}$.
     - Filter candidates: must be officially offered in $Q_k$'s term (`CONFIRMED`, `EXPECTED`, or `LIKELY`).
     - Sort candidates by critical path weight (bottlenecks first).
     - Greedily slot candidates into $Q_k$ until reaching the target unit threshold (e.g. 16 units for Balanced, 18 units for Accelerated, 12 units for Light).
   - Repeat until all required courses are scheduled or max quarters reached.

4. **Multi-Strategy Variation:**
   - **Balanced Plan:** Target 14–16 units/term, strictly Fall/Winter/Spring.
   - **Accelerated Plan:** Target 16–18 units/term, utilizes Summer sessions (if enabled) with 8–12 units, scheduling bottlenecks as early as offered.
   - **Light Plan:** Target 12–14 units/term, strictly Fall/Winter/Spring, spreading load over additional terms.

5. **Validation Gate:**
   - Every generated plan is evaluated through `validatePlannedSchedule()`. If any sequencing or offering issue is detected, it is automatically corrected or flagged.

---

## 5. User Interface & Interaction Flow

1. Student opens **Quarter Planner** tab and clicks **"⚡ Auto Plan"**.
2. Modal displays customization controls:
   - Slider for Max Units per Quarter (12–20).
   - Toggle for "Include Summer Sessions".
   - Target Major confirmation.
3. Auto Plan solver runs instantly in-memory ($<15\text{ms}$).
4. Modal displays cards for **Plan A (Balanced)**, **Plan B (Accelerated)**, and **Plan C (Light)** side-by-side:
   - Graduation quarter badge (e.g. *Spring 2028* vs *Fall 2027*).
   - Total quarters and average units.
   - Quarter breakdown preview.
5. Clicking **"Apply Plan"** replaces the student's quarter board with the chosen roadmap, while preserving local storage and full manual editing freedom.
