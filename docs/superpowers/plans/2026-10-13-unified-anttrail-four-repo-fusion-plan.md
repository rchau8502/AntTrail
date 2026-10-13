# AntTrail Quad-Core Platform Fusion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fuse AntTrail, EveryUCI, ScholarStack, and ZotCanvas into a single high-performance monorepo and Next.js web application at `/Volumes/Crucial X9/AI/AntTrail`, preserve 100% of all 4 git commit histories, publish to GitHub as `rchau8502/AntTrail`, and decommission `/Users/richc/ZotCanvas`.

**Architecture:** Next.js 16 (App Router) + React 19 + Tailwind CSS + Lucide Icons + Vitest, consolidating AntTrail's deterministic academic engine, ZotCanvas's LMS command center & stateless CORS relay proxy, EveryUCI's campus guides and deadlines hub with calendar sync, and ScholarStack's CCC transfer articulation, Swift 6 iOS app, and Python harvester into one master repo.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Lucide React, Vitest, Swift 6 (iOS), Python 3.13, GitHub CLI.

---

### Task 1: Git Remotes Ingestion and History Merging

**Files:**
- Directory: `/Volumes/Crucial X9/AI/AntTrail`

- [ ] **Step 1: Inspect local git status and configure remotes**
Verify clean working tree, then add the 3 external repositories as local git remotes:
```bash
cd "/Volumes/Crucial X9/AI/AntTrail"
git remote add remote-everyuci "/Volumes/Crucial X9/AI/EveryUCI"
git remote add remote-scholarstack "/Volumes/Crucial X9/AI/ScholarStack"
git remote add remote-zotcanvas "/Users/richc/ZotCanvas"
git remote -v
```

- [ ] **Step 2: Fetch all branches and commits from all remotes**
```bash
git fetch remote-everyuci
git fetch remote-scholarstack
git fetch remote-zotcanvas
```

- [ ] **Step 3: Sequentially merge git commit histories into main**
Merge all three branches with `--allow-unrelated-histories`:
```bash
git merge remote-everyuci/master --allow-unrelated-histories -m "chore(merge): fuse EveryUCI repository history into AntTrail"
git merge remote-scholarstack/main --allow-unrelated-histories -m "chore(merge): fuse ScholarStack repository history into AntTrail"
git merge remote-zotcanvas/master --allow-unrelated-histories -m "chore(merge): fuse ZotCanvas repository history into AntTrail"
```

- [ ] **Step 4: Verify complete git history preservation**
```bash
git log --graph --oneline -n 25
git rev-list --count HEAD
```
Expected: Count > 70 commits with merged graph.

---

### Task 2: Harmonize Directory Structure & Codebase Integration

**Files:**
- Modify/Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `vercel.json`
- Migrate:
  - AntTrail: `src/academic-engine/` -> `src/academic-engine/`, `data/uci/` -> `data/uci/`
  - EveryUCI: `app/guides/`, `app/deadlines/`, `app/courses/`, `app/categories/`, `app/tools/`, `app/i-need-to/`, `app/saved/`, `app/search/`, `components/guides/`, `components/deadlines/`, `components/courses/`, `data/guides.ts`, `data/deadlines.ts`, `data/courses.ts`, `lib/i18n/`, `lib/search.ts`
  - ScholarStack: `app/transfer/`, `app/colleges/`, `apps/ios/`, `apps/harvester/`, `supabase/`
  - ZotCanvas: `app/canvas/`, `app/api/canvas/[...path]/route.ts`, `components/canvas/`, `lib/canvas/`, `data/canvas-sample.ts`
  - AntTrail Web UI: `app/planner/`, `app/degree-audit/`, `app/eligibility/`, `app/gpa/`, `components/planner/`, `components/degree/`, `components/gpa/`

- [ ] **Step 1: Consolidate package.json dependencies**
Create unified `package.json` with Next.js, React 19, Tailwind CSS, Lucide React, Vitest, Canvas dependencies, and i18n support.

- [ ] **Step 2: Copy and organize all subsystem files into their target locations**
Ensure all paths align with the unified monorepo architecture:
- Academic engine in `src/academic-engine/`
- ZotCanvas LMS in `app/canvas/`, `app/api/canvas/`, `components/canvas/`, `lib/canvas/`
- EveryUCI campus content in `app/guides/`, `app/deadlines/`, `app/courses/`, `data/`
- ScholarStack in `app/transfer/`, `app/colleges/`, `apps/ios/`, `apps/harvester/`, `supabase/`
- AntTrail planning pages in `app/planner/`, `app/degree-audit/`, `app/eligibility/`, `app/gpa/`

- [ ] **Step 3: Harmonize tsconfig.json and tailwind.config.ts**
Ensure `@/*` paths resolve correctly to root and `src/`, and Tailwind scans `app/**/*.{ts,tsx}`, `components/**/*.{ts,tsx}`, `src/**/*.{ts,tsx}`.

- [ ] **Step 4: Commit unified filesystem layout**
```bash
git add -A
git commit -m "feat(monorepo): consolidate files from AntTrail, EveryUCI, ScholarStack, and ZotCanvas"
```

---

### Task 3: Unified Layout, Navigation & Landing Hub

**Files:**
- Create/Modify: `components/common/Navbar.tsx`
- Create/Modify: `components/common/Footer.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/(home)/page.tsx` or `app/page.tsx`

- [ ] **Step 1: Build the Universal Anteater Navbar**
Implement top navigation containing:
- Brand: AntTrail (Anteater logo + tagline)
- Links: Degree Planner, Canvas LMS, Campus Guides, Deadlines, Easy Courses (水课), Transfer Articulation
- Action tools: i18n Language switcher (8 languages), Quick Search (`Cmd+K`), Token Status indicator

- [ ] **Step 2: Build the Anteater Mega-Hub Landing Page**
Create unified home dashboard featuring:
- Hero search bar with instant query filtering
- Canvas LMS quick status / Today's urgent homework widget
- Quick links to Degree Planner, Prerequisite visualizer, and GPA calculator
- Upcoming Campus Deadlines with 1-click Google Cal export
- Top-rated Easy Courses (水课) and campus guides

- [ ] **Step 3: Commit navigation and landing hub**
```bash
git add app/layout.tsx app/page.tsx components/common/
git commit -m "feat(ui): implement unified Anteater navigation header, footer, and master hub"
```

---

### Task 4: Harmonize Test Suites & Verify Pass

**Files:**
- Directory: `tests/`
- Config: `vitest.config.ts`

- [ ] **Step 1: Consolidate test suites**
Include tests for:
- `tests/academic-engine.test.ts` (Prerequisites, eligibility, degree audits, AutoPlan, GPA)
- `tests/canvas-engine.test.ts` (Eisenhower urgency formula, burnout thresholds, milestone generator)
- `tests/transfer-articulation.test.ts` (CCC course equivalencies)

- [ ] **Step 2: Run npm test to verify all tests pass**
```bash
npm test -- --run
```
Expected: 100% of test suites pass cleanly.

- [ ] **Step 3: Run npm run build or typecheck**
```bash
npm run typecheck || npx tsc --noEmit
```
Expected: Zero TypeScript errors.

- [ ] **Step 4: Commit verified test suites**
```bash
git add tests/ vitest.config.ts
git commit -m "test: unify Vitest test suites across academic engine, canvas, and transfer"
```

---

### Task 5: GitHub Publication & Remote Management

**Files:**
- Local repo: `/Volumes/Crucial X9/AI/AntTrail`
- Remote: `origin` (`git@github.com:rchau8502/AntTrail.git`)

- [ ] **Step 1: Create public GitHub repo rchau8502/AntTrail**
```bash
gh repo create AntTrail --public --source=. --remote=origin --description "AntTrail: The master academic degree planner, Canvas LMS workstation, and campus operating system for UC Irvine."
```

- [ ] **Step 2: Push main branch and commit history to origin**
```bash
git push -u origin main --tags
```

- [ ] **Step 3: Verify GitHub repository status**
```bash
gh repo view rchau8502/AntTrail
```

---

### Task 6: Decommission & Cleanup of ZotCanvas

**Files:**
- Directory: `/Users/richc/ZotCanvas`

- [ ] **Step 1: Remove temporary git remotes from AntTrail**
```bash
git remote remove remote-everyuci
git remote remove remote-scholarstack
git remote remove remote-zotcanvas
```

- [ ] **Step 2: Decommission local ZotCanvas folder**
Verify all files are safely integrated into AntTrail, then remove `/Users/richc/ZotCanvas`:
```bash
rm -rf "/Users/richc/ZotCanvas"
```

- [ ] **Step 3: Final confirmation**
Verify `/Volumes/Crucial X9/AI/AntTrail` is complete, healthy, tracked on git, and builds cleanly.
