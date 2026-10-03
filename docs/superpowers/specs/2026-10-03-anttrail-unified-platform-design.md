# AntTrail Unified Platform Design Specification

**Date:** 2026-10-03  
**Status:** Approved  
**Scope:** Consolidation of AntTrail, EveryUCI, and ScholarStack into a single unified repository and web application under the AntTrail master brand.

---

## 1. Executive Summary

AntTrail is the comprehensive academic and campus super-platform for UC Irvine and California transfer students.

By integrating **EveryUCI** (campus knowledge base, deadlines, guide directory, and water courses) and **ScholarStack** (CCC-to-UC transfer articulation, admissions pathway chancing, national college directory, mobile iOS client, and data harvester) directly into **AntTrail**, students gain an all-in-one platform covering:
1. **Academic Degree Planning & Prerequisite Engine**: Deterministic quarter scheduling, prerequisite DAG validation, major degree audits (CS, DS, SWE, CPE, Math), and GPA calculations with repeat replacement policies.
2. **Campus Knowledge & Student Guides**: 42+ verified student survival guides, interactive campus deadlines with 1-click Google Calendar/.ics exports, easy courses (水课) with RateMyProfessors and Zotistics evaluations, and official UCI portal directories.
3. **Transfer Pathways & Articulation Intelligence**: CCC-to-UC transfer course articulation, UC TAG / CSU ADT qualification verification, 25th–75th percentile GPA chancing trends, and the National College Directory.
4. **Cross-Platform Mobile App & Data Pipeline**: Native Swift 6 / SwiftUI iOS mobile client and Python data harvesting pipeline for institutional statistics.

---

## 2. Repository Architecture & Layout

All code and commit histories are consolidated into a single local repository at `/Volumes/Crucial X9/AI/AntTrail`.

```
/Volumes/Crucial X9/AI/AntTrail/
├── app/                                    # [Web App] Next.js 16 App Router (Unified AntTrail Portal)
│   ├── (home)/page.tsx                     # Unified Anteater Landing Hub (Search, Planner, Guides, Transfer)
│   ├── planner/page.tsx                    # Interactive Quarter Planner & AutoPlan Scheduler
│   ├── degree-audit/page.tsx               # Major Degree Audit (CS, DS, SWE, CPE, Math B.S.)
│   ├── eligibility/page.tsx                # Prerequisite Tree Visualizer & Course Catalog Eligibility
│   ├── gpa/page.tsx                        # UCI GPA Calculator, Repeat Policy & Target Simulator
│   ├── guides/                             # 42+ Campus Guides & Article Reader (formerly everyUCI)
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── categories/                         # Category views (Academics, Financial, Housing, etc.)
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── deadlines/page.tsx                  # Interactive Campus Deadlines Hub & Calendar Exports
│   ├── courses/page.tsx                    # Easy Courses (水课) / GPA Boosters with RMP & Zotistics
│   ├── transfer/page.tsx                   # CCC-to-UC Transfer Pathways & Chancing Engine
│   ├── colleges/page.tsx                   # National College Directory & Scorecard Search
│   ├── tools/page.tsx                      # Quick-access UCI Portals (WebReg, DegreeWorks, Canvas, etc.)
│   ├── i-need-to/page.tsx                  # Action Task Checklists
│   ├── saved/page.tsx                      # Bookmarked guides, roadmaps, and courses
│   ├── search/page.tsx                     # Global Search Modal & Full Page Search
│   ├── layout.tsx                          # Root Layout with unified Header & Footer
│   └── globals.css                         # Unified Tailwind CSS styling
├── components/                             # UI & Feature Components
│   ├── planner/                            # Quarter columns, course cards, auto-plan modal, export modal
│   ├── degree/                             # Degree audit view, progress rings, requirement cards
│   ├── gpa/                                # GPA calculator view, grade entry tables, target solver
│   ├── guides/                             # Guide view, category cards, markdown renderer, checklist widgets
│   ├── transfer/                           # Articulation auditor, portfolio chancing graphs
│   ├── auth/                               # Google Drive Cloud Sync modal & auth button
│   ├── parser/                             # Unofficial transcript & DegreeWorks audit importer
│   └── common/                             # Unified Navbar, Footer, Persona Selector, SearchModal
├── src/academic-engine/                    # Pure TypeScript Deterministic Prerequisite & Rules Engine
│   ├── types.ts                            # Strict AST schemas & domain types
│   ├── prerequisites.ts                    # Recursive prerequisite AST evaluator & grade comparator
│   ├── eligibility.ts                      # Course catalog eligibility & prerequisite tree builder
│   ├── degree.ts                           # Degree audit engine (CS, DS, SWE, CPE, Math)
│   ├── planner.ts                          # Multi-quarter prerequisite sequence validator
│   ├── autoplan.ts                         # Topological bottleneck scheduler
│   ├── gpa.ts                              # Deterministic UCI GPA engine & repeat policy
│   └── parser/                             # Transcript & DegreeWorks text parsers
├── tests/                                  # Vitest Test Suite (combined 98 tests)
│   ├── academic-engine.test.ts
│   ├── autoplan-engine.test.ts
│   ├── degree-engine.test.ts
│   ├── gpa-engine.test.ts
│   ├── parser-engine.test.ts
│   ├── planner-engine.test.ts
│   ├── drive-sync.test.ts
│   ├── drive-sync-engine.test.ts
│   └── transfer/                           # Articulation, query builder, and transcript parser tests
├── data/                                   # Domain Data
│   ├── uci/                                # Course catalog, offerings, programs, equivalencies
│   ├── guides.ts                           # 42+ Campus Guides
│   ├── deadlines.ts                        # Campus deadlines & academic calendar
│   ├── courses.ts                          # Easy courses & GE booster database
│   ├── categories.ts                       # Guide categories
│   ├── tools.ts                            # UCI Official portals & tools directory
│   └── tasks.ts                            # Action checklists
├── lib/                                    # Utilities & Shared Logic
│   ├── i18n/                               # 8-language localization context & dictionary
│   ├── search.ts                           # Client-side tokenizer & alias indexer
│   ├── articulation.ts                     # CCC articulation models & Assist rules
│   └── server/                             # Local plan storage & data helpers
├── apps/
│   ├── ios/                                # Native Swift 6 / SwiftUI iOS application
│   └── harvester/                          # Python 3.13 data harvesting pipeline
├── supabase/                               # Database migrations, schema, and RLS policies
├── package.json                            # Unified dependencies (Next.js 16, React 19, Tailwind, Vitest)
└── vercel.json                             # Production deployment configuration for AntTrail
```

---

## 3. Navigation & User Experience

### 3.1 Global Header
- **Logo**: AntTrail with Anteater Blue (`#0064a4`) and Gold (`#ffd200`) branding.
- **Navigation Tabs**:
  - **Degree Planner** (Dropdown):
    - Quarter Planner (`/planner`)
    - Degree Audit (`/degree-audit`)
    - Prerequisite Tree & Eligibility (`/eligibility`)
    - GPA Calculator (`/gpa`)
  - **Campus Guides** (`/guides`): 42+ student survival guides.
  - **Deadlines** (`/deadlines`): Live countdowns with calendar exports.
  - **Courses** (`/courses`): Water classes (水课) with RMP & Zotistics metrics.
  - **Transfer & Colleges** (`/transfer`): Articulation verification, UC TAG, and College Directory (`/colleges`).
- **Header Actions**:
  - Global `⌘K` Search (searches courses, guides, deadlines, and tools simultaneously)
  - Student Persona Selector (Freshman, Transfer, International, Commuter, Campus Resident)
  - Language Selector (English, 中文, Español, Tiếng Việt, 한국어, etc.)
  - Google Drive Cloud Sync button
  - Saved Bookmarks counter

### 3.2 Visual Styling & Theme
- **Theme**: Clean Anteater editorial light mode by default with official UCI Navy (`#0c2340`), Blue (`#0064a4`), and Gold (`#ffd200`), offering maximum contrast and readability for long guides and degree audit tables, with dark mode support.
- **Typography**: Clean slate sans-serif with monospace accents for course codes (`ICS 33`, `MATH 2B`).

---

## 4. State Management & Privacy

1. **Local-First Storage**:
   - Zero server retention: all student grades, planned schedules, and bookmarks stay locally in the student's browser (`localStorage`).
2. **Google Drive Cloud Sync**:
   - Optional sync using Google Drive AppData restricted folder. AntTrail never accesses user Google Drive files outside the dedicated private AppData container.
3. **Multi-Format Export**:
   - Academic schedules can be exported to JSON, Markdown, or clean printable PDF format.

---

## 5. Verification & Testing Standards

- **Vitest**: Combined test suite running:
  - 70/70 AntTrail tests (academic engine, prerequisite recursion, degree requirements, autoplan scheduling, GPA repeat replacement, transcript parsing, Drive sync).
  - 28/28 Transfer intelligence tests (articulation rules, query builder, transcript OCR parser, rate limiter).
- **Next.js Production Build**:
  - Full static generation (SSG) for 42+ guides, categories, and deadlines.
  - Type-checking with TypeScript 5 (`tsc --noEmit`).

---

## 6. Migration & Cloud Consolidation Plan

1. **Local Staging**: Commit all pending unstaged work in `ScholarStack`.
2. **Git Unification**:
   - Add remotes for `EveryUCI` and `ScholarStack` in `AntTrail`.
   - Merge branches into `AntTrail` with `--allow-unrelated-histories` to preserve 100% of historical commits and git blame.
3. **GitHub Repository Setup**:
   - Create public GitHub repository `rchau8502/AntTrail`.
   - Add remote `origin` to `AntTrail` and push the master/main branch.
4. **Cloud Cleanup**:
   - Delete GitHub repo `rchau8502/everyuci`.
   - Delete GitHub repo `rchau8502/ScholarHarvester`.
   - Delete Vercel project `everyuci` (and any ScholarStack Vercel project), leaving `anttrail` as the sole Vercel project.
5. **Local Cleanup**:
   - Remove legacy local directories `/Volumes/Crucial X9/AI/EveryUCI` and `/Volumes/Crucial X9/AI/ScholarStack`, leaving `/Volumes/Crucial X9/AI/AntTrail` as the sole local project directory on the machine.
