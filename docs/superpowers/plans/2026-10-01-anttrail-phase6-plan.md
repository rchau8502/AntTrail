# GPA Projection Engine & What-If Simulator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement deterministic UC Irvine GPA calculation, 16-unit repeat grade replacement rule, target GPA projection solver, what-if quarterly simulator, and accessible responsive UI.

**Architecture:** Pure algorithmic calculation engine in `src/academic-engine/gpa.ts` with comprehensive Vitest tests, paired with an interactive React view in `src/components/gpa/GpaCalculatorView.tsx` wired into `Navbar.tsx` and `App.tsx`.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide icons, Vitest.

---

### Task 1: Deterministic UCI GPA Engine & Types

**Files:**
- Create: `src/academic-engine/gpa.ts`
- Test: `tests/gpa-engine.test.ts`

- [ ] **Step 1: Define GPA types and calculateCumulativeGpa**
  - Implement letter grade points mapping.
  - Implement transfer coursework exclusion (UCI policy).
  - Implement P/NP exclusion.
  - Implement UCI 16-unit repeat replacement logic.
  - Return `UciGpaReport` with `cumulativeGpa`, `gradedUnits`, `totalGradePoints`, `repeatUnitsUsed`, `termBreakdowns`.
- [ ] **Step 2: Implement Target GPA Solver**
  - Implement `calculateTargetGpaRequirement(currentGpaReport, plannedGradedUnits, targetGpa)`.
  - Classify status: `ACHIEVABLE`, `IMPOSSIBLE`, `ALREADY_EXCEEDED`.
- [ ] **Step 3: Implement What-If Cumulative Trajectory Projector**
  - Implement `projectWhatIfTrajectory(profile, plannedQuarters, hypotheticalGrades)`.

---

### Task 2: Unit Test Suite for GPA Engine

**Files:**
- Create: `tests/gpa-engine.test.ts`

- [ ] **Step 1: Write tests for letter grade points and basic GPA**
- [ ] **Step 2: Write tests for transfer credit exclusion rule**
- [ ] **Step 3: Write tests for P/NP exclusion rule**
- [ ] **Step 4: Write tests for UCI 16-unit repeat grade replacement policy**
- [ ] **Step 5: Write tests for Target GPA required grade solver**
- [ ] **Step 6: Write tests for What-If scenario trajectory calculation**
- [ ] **Step 7: Run vitest and verify all pass**

---

### Task 3: Interactive GPA UI Component

**Files:**
- Create: `src/components/gpa/GpaCalculatorView.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Build `GpaCalculatorView.tsx`**
  - Hero KPI metrics (Cumulative GPA, Graded Units, Standing, Dean's List).
  - Target GPA Planner with slider, presets, and required grade badge.
  - Repeat Course 16-unit policy progress bar.
  - What-If course grade selector & trajectory graph.
  - Historical quarterly transcript table.
- [ ] **Step 2: Enable GPA tab in `Navbar.tsx`**
- [ ] **Step 3: Wire GPA view into `App.tsx` tab router**

---

### Task 4: Verification & Polish

**Files:**
- Modify: `README.md`
- Test: Full build and test suite

- [ ] **Step 1: Run `npm test` and verify all tests pass**
- [ ] **Step 2: Run `npm run build` to verify clean bundle**
- [ ] **Step 3: Update `README.md` and commit**
