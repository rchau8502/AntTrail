# AntTrail Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality, privacy-first UCI course eligibility engine and interactive prototype web app for AntTrail.

**Architecture:** Client-side SPA with a framework-independent TypeScript AST rules engine, zero server persistence, mocked official UCI catalog and transfer articulation, and an AntAlmanac-inspired reactive UI.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Vite, Vitest.

---

## Proposed Changes & File Structure

```
/Volumes/Crucial X9/AI/AntTrail
├── src/
│   ├── components/
│   │   ├── PersonaSelector.tsx       # Pre-configured student persona selector with fast presets
│   │   ├── StudentCourseDrawer.tsx   # Course history inspector, manual course entry & grade editor
│   │   └── CourseFilters.tsx         # Search, department chips, and eligibility status filters
│   ├── App.tsx                       # Main dashboard coordinating engine, state, filters & drawer
│   └── main.tsx                      # StrictMode React DOM bootstrap
├── tests/
│   └── academic-engine.test.ts       # Vitest comprehensive unit test suite
├── README.md                         # Comprehensive architecture, privacy model, & phase roadmap
└── docs/superpowers/plans/           # This plan
```

---

## Tasks

- [ ] **Task 1: Build PersonaSelector Component**
  - Create `src/components/PersonaSelector.tsx` allowing instant switching between Freshman, CS Sophomore, Mt. SAC Transfer, and Math Junior personas.
  - Display persona bio, units completed, and class standing badge.
  - Test persona switching in isolation.

- [ ] **Task 2: Build StudentCourseDrawer Component**
  - Create `src/components/StudentCourseDrawer.tsx` to view, edit, add, or remove completed and in-progress courses.
  - Support manual course entry with course code, institution (UCI vs Transfer), grade letter, and status.
  - Include an interactive transfer credit list showing source course, institution, and articulated UCI equivalent.

- [ ] **Task 3: Build CourseFilters Component**
  - Create `src/components/CourseFilters.tsx` supporting text search (by code, title, instructor), department pills (`All`, `ICS`, `MATH`), and eligibility status filters (`All`, `Eligible Only`, `Missing Prerequisites`).
  - Provide result count summaries.

- [ ] **Task 4: Build Main App.tsx & Bootstrap main.tsx**
  - Create `src/App.tsx` wiring `evaluateAllCourses` with reactive student profile state.
  - Implement direct course completion toggles on `CourseCard` to immediately recalculate downstream prerequisites.
  - Implement JSON profile export and local storage persistence.
  - Create `src/main.tsx` mounting `App` into the DOM.

- [ ] **Task 5: Execute Test Suite & Verify 100% Academic Engine Accuracy**
  - Run `npm test` via Vitest.
  - Ensure all 10 engine unit tests pass cleanly without regressions.

- [ ] **Task 6: Build Verification & Bundle Preflight**
  - Run `npm run build` (`tsc && vite build`).
  - Verify that TypeScript compilation produces 0 errors and outputs optimized static distribution in `dist/`.

- [ ] **Task 7: Write Detailed README.md**
  - Document the architecture, privacy model (zero server retention), mathematical rule assumptions (UCI Pass policy, grade threshold, standing hierarchy), catalog dataset, and roadmap to Phase 2 (degree requirement solver).

- [ ] **Task 8: Commit All Changes to Git**
  - Commit all files with clean commit messages adhering to conventional commits (`feat: complete AntTrail Phase 1 prerequisite engine and prototype`).
