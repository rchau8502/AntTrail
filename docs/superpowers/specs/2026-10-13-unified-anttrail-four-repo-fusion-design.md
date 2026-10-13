# AntTrail Quad-Core Platform Fusion Design Specification

**Date:** 2026-10-13  
**Status:** Approved  
**Scope:** Complete fusion of **AntTrail**, **EveryUCI**, **ScholarStack**, and **ZotCanvas** into a unified, high-performance monorepo and Next.js web application at `/Volumes/Crucial X9/AI/AntTrail` with GitHub remote `rchau8502/AntTrail`.

---

## 1. Executive Summary

AntTrail is the master academic, campus, and workflow operating system for UC Irvine and California transfer students.

By synthesizing four specialized platforms:
1. **AntTrail** — Deterministic academic degree planning, prerequisite DAG validation, major audits (CS, DS, SWE, CPE, Math), topological AutoPlan scheduler, and repeat-policy GPA simulator.
2. **ZotCanvas** (`/Users/richc/ZotCanvas`) — Privacy-first Canvas LMS command center, client-side personal access token integration, stateless CORS proxy, Eisenhower priority workload matrix, burnout fatigue prevention, Pomodoro timer, and What-If grade projection.
3. **EveryUCI** (`/Volumes/Crucial X9/AI/EveryUCI`) — Campus knowledge base, 42+ curated survival guides, interactive campus deadlines with 1-click Google Calendar & `.ics` export, easy courses (水课) with RateMyProfessors / Zotistics evaluations, and 8-language i18n localization.
4. **ScholarStack** (`/Volumes/Crucial X9/AI/ScholarStack`) — CCC-to-UC transfer articulation, UC TAG / CSU ADT requirement verification, admissions pathway chancing, National College Directory, native Swift 6 / SwiftUI iOS application, and institutional data harvesting pipeline.

Students access all features under one cohesive interface, backed by 100% preserved git commit history across all four foundational projects.

---

## 2. Git History Merging & Remote Strategy

To maintain complete historical fidelity, developer provenance, and commit graphs:

### 2.1 Git Remote Ingestion
In `/Volumes/Crucial X9/AI/AntTrail`:
```bash
git remote add remote-everyuci "/Volumes/Crucial X9/AI/EveryUCI"
git remote add remote-scholarstack "/Volumes/Crucial X9/AI/ScholarStack"
git remote add remote-zotcanvas "/Users/richc/ZotCanvas"
git fetch --all
```

### 2.2 Unrelated Histories Fusion
All four mainlines are merged sequentially into `main`:
1. **EveryUCI History**:
   ```bash
   git merge remote-everyuci/master --allow-unrelated-histories -m "chore(merge): fuse EveryUCI repository history into AntTrail"
   ```
2. **ScholarStack History**:
   ```bash
   git merge remote-scholarstack/main --allow-unrelated-histories -m "chore(merge): fuse ScholarStack repository history into AntTrail"
   ```
3. **ZotCanvas History**:
   ```bash
   git merge remote-zotcanvas/master --allow-unrelated-histories -m "chore(merge): fuse ZotCanvas repository history into AntTrail"
   ```

### 2.3 Remote Setup & GitHub Publication
- Create the public repository on GitHub:
  ```bash
  gh repo create AntTrail --public --source=. --remote=origin
  ```
- Push all branches, commit graphs, and tags:
  ```bash
  git push -u origin main --tags
  ```
- Clean up temporary local remotes.
- Keep source directories (`/Volumes/Crucial X9/AI/EveryUCI`, `/Volumes/Crucial X9/AI/ScholarStack`, `/Users/richc/ZotCanvas`) untouched on disk as original local backups.

---

## 3. Unified Monorepo Architecture & Directory Layout

The consolidated repository at `/Volumes/Crucial X9/AI/AntTrail` is structured as a unified Next.js 16 application with dedicated sub-packages for mobile and background data harvesting:

```text
/Volumes/Crucial X9/AI/AntTrail/
├── app/                                    # Next.js 16 App Router (Unified Web Application)
│   ├── (home)/page.tsx                     # Anteater Master Hub (Search, Today's Canvas tasks, Deadlines, Planner entry)
│   │
│   │   # --- AntTrail Academic Planning Subsystem ---
│   ├── planner/page.tsx                    # Multi-Quarter Interactive Degree Planner & AutoPlan
│   ├── degree-audit/page.tsx               # Major Degree Audit (CS, DS, SWE, CPE, Math)
│   ├── eligibility/page.tsx                # Prerequisite Tree Visualizer & Catalog Checker
│   ├── gpa/page.tsx                        # UCI GPA Calculator & Repeat Policy Simulator
│   │
│   │   # --- ZotCanvas LMS Subsystem ---
│   ├── canvas/                             # Canvas LMS Command Center
│   │   ├── page.tsx                        # Bento Dashboard & Eisenhower Priority Urgency Matrix
│   │   ├── assignments/page.tsx            # Assignment Milestones, Rubric Viewer & Pomodoro Timer
│   │   └── what-if/page.tsx                # What-If Grade Simulator
│   ├── api/canvas/[...path]/route.ts       # Stateless Next.js API CORS proxy for UCI Canvas LMS
│   │
│   │   # --- EveryUCI Campus Knowledge Subsystem ---
│   ├── guides/                             # 42+ Campus Guides & Article Reader
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── categories/                         # Guide Categories (Academics, Financial, Housing, etc.)
│   ├── deadlines/page.tsx                  # Campus Deadlines Hub with 1-click Google Cal / .ics sync
│   ├── courses/page.tsx                    # Easy Courses (水课) / GPA Boosters with RMP & Zotistics
│   ├── tools/page.tsx                      # UCI Official Portals (WebReg, DegreeWorks, Canvas, etc.)
│   ├── i-need-to/page.tsx                  # Student Action Task Checklists
│   ├── saved/page.tsx                      # Bookmarked Guides, Plans, and Roadmaps
│   ├── search/page.tsx                     # Universal Instant Search
│   │
│   │   # --- ScholarStack Transfer Subsystem ---
│   ├── transfer/page.tsx                   # CCC-to-UC Articulation & Pathway Chancing Engine
│   ├── colleges/page.tsx                   # National College Directory & Scorecard Search
│   │
│   ├── layout.tsx                          # Root Layout with Unified Anteater Header & Footer
│   └── globals.css                         # Unified Tailwind CSS styling
│
├── components/                             # Consolidated UI Components
│   ├── common/                             # Unified Navbar, Footer, Global Search Modal, Persona Selector
│   ├── planner/                            # Quarter columns, Course cards, AutoPlan modal, Export modal
│   ├── degree/                             # Degree audit view, Progress rings, Requirement cards
│   ├── gpa/                                # GPA calculator view, Grade entry tables, Target solver
│   ├── canvas/                             # Bento dashboard, Eisenhower matrix, Milestone checklists, Focus timer
│   ├── guides/                             # Guide markdown renderer, Category badges, Checklist widgets
│   ├── deadlines/                          # Deadline calendar cards, Filter chips, Export buttons
│   ├── courses/                            # Course review cards, Grade distribution charts
│   └── transfer/                           # Articulation auditor, Transfer chancing graphs
│
├── src/academic-engine/                    # Pure TypeScript Deterministic Prerequisite & Rules Engine
│   ├── types.ts                            # Strict AST schemas & domain types
│   ├── prerequisites.ts                    # Recursive prerequisite AST evaluator & grade comparator
│   ├── eligibility.ts                      # Course catalog eligibility & prerequisite tree builder
│   ├── degree.ts                           # Degree audit engine (CS, DS, SWE, CPE, Math)
│   ├── planner.ts                          # Multi-quarter prerequisite sequence validator
│   ├── autoplan.ts                         # Topological bottleneck scheduler
│   ├── gpa.ts                              # Deterministic UCI GPA engine & repeat policy
│   └── parser/                             # Transcript & DegreeWorks text parsers
│
├── lib/                                    # Shared Utilities & Business Logic
│   ├── canvas/                             # Canvas API client, workload calculator, milestone generators
│   ├── i18n/                               # 8-language localization context & dictionaries
│   ├── search.ts                           # Client-side tokenizer & alias indexer
│   ├── articulation.ts                     # CCC articulation models & Assist rules
│   └── server/                             # Storage helpers & plan encoders
│
├── data/                                   # Domain Data Collections
│   ├── uci/                                # Course catalog, offerings, programs, equivalencies
│   ├── guides.ts                           # 42+ Campus Guides
│   ├── deadlines.ts                        # Campus deadlines & academic calendar
│   ├── courses.ts                          # Easy courses & GE booster database
│   ├── categories.ts                       # Guide categories
│   ├── tools.ts                            # UCI Official portals & tools directory
│   ├── tasks.ts                            # Action checklists
│   └── canvas-sample.ts                    # Demo mode course & assignment sample datasets
│
├── apps/                                   # Standalone Applications
│   ├── ios/                                # Native Swift 6 / SwiftUI iOS Application
│   └── harvester/                          # Python 3.13 Institutional Data Harvester
│
├── supabase/                               # Database migrations, schema, and RLS policies
├── tests/                                  # Unified Vitest Test Suite (all subsystems)
├── package.json                            # Unified dependencies (Next.js 16, React 19, Tailwind, Lucide, Vitest)
├── tsconfig.json                           # Strict TypeScript configuration with alias paths
├── tailwind.config.ts                      # Unified styling system
└── vercel.json                             # Production deployment configuration for AntTrail
```

---

## 4. Subsystem Deep-Dive & Functional Specifications

### 4.1 AntTrail: Academic Degree Planning & Prerequisite Engine
- **Deterministic Rules Engine**: Zero-latency prerequisite evaluation in pure TypeScript. Evaluates `AND`/`OR` conditions, concurrent enrollments, AP exam credits, and grade minimums.
- **Topological AutoPlan**: Generates balanced 4-year and transfer 2-year schedules without violating DAG prerequisites or exceeding maximum unit caps.
- **Repeat Replacement GPA Engine**: UCI-compliant GPA simulator properly factoring in the first 16 units of repeated C-/D/F replacement.

### 4.2 ZotCanvas: Canvas LMS Academic Command Center
- **Zero-Storage Privacy Model**: Student Canvas Personal Access Tokens and optional Gemini API keys are held exclusively in browser `localStorage`.
- **Stateless CORS Relay (`/api/canvas/*`)**: Proxies calls directly to `canvas.eee.uci.edu` with incoming bearer tokens without logging, disk caching, or inspecting payloads.
- **Eisenhower Priority Urgency Scoring**:
  $$\text{Priority Score} = \left(\frac{\text{Points Weight}}{\text{Total Course Points}}\right) \times 40 + \left(\frac{1}{\max(\text{Hours Until Due}, 1)}\right) \times 60$$
  Visualizes workload into *Do Immediately*, *Schedule Ahead*, and *Quick Wins*.
- **Burnout Fatigue Guard**: Computes estimated study hours per day and warns when daily load exceeds 6 hours.
- **Pomodoro Deep-Work Timer & What-If Simulator**: Interactive timer linked to assignment checklists, plus speculative grade calculator.
- **Full Demo Mode**: Instant preview with sample UCI courses (*COMPSCI 161*, *INF 133*, *STATS 67*, *WRITING 39C*) for students exploring without an API token.

### 4.3 EveryUCI: Campus Knowledge Base & Student Survival Hub
- **42+ Curated Student Guides**: Comprehensive markdown guides covering academics, financial aid, housing, dining, student health, international student CPT/OPT, and campus life.
- **Deadlines & Calendar Sync**: Centralized UCI registrar deadlines (fee payments, add/drop dates, final exams) with 1-click Google Calendar and `.ics` download.
- **Easy Courses (水课) / GPA Boosters**: Curated course catalog integrated with RateMyProfessors ratings and Zotistics historical grade distributions.
- **8-Language i18n Localization**: Native multilingual support across English, Simplified Chinese, Traditional Chinese, Spanish, Korean, Vietnamese, Japanese, and Hindi.

### 4.4 ScholarStack: Transfer Pathways, College Directory & Native Mobile
- **CCC-to-UC Articulation**: Transfer course equivalency matching between California Community Colleges and UC Irvine.
- **TAG & ADT Chancing**: Eligibility calculation for UC Transfer Admission Guarantee and Associate Degree for Transfer.
- **National College Directory**: Searchable higher-education database with Department of Education College Scorecard metrics.
- **Native iOS Client (`apps/ios`)**: Swift 6 and SwiftUI mobile application for on-the-go plan and guide access.
- **Data Harvester (`apps/harvester`)**: Python 3.13 pipeline for ongoing institutional data and catalog extraction.

---

## 5. Technology Stack & Harmonization

| Component | Choice |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS + `@tailwindcss/typography` |
| **Icons** | Lucide React |
| **Languages** | TypeScript 5 (Strict), Swift 6 (iOS), Python 3.13 (Harvester) |
| **Testing** | Vitest (unit & integration tests across engine, canvas, and transfer logic) |
| **Hosting & CI/CD** | Vercel (Edge routing, serverless API proxies, static generation) |
| **Database** | Supabase (PostgreSQL, row-level security policies) |

---

## 6. Verification & Quality Gates

1. **Git Verification**:
   - Verify all 4 remote commit trees merged into `main` with `git log --graph --oneline`.
   - Verify GitHub repo `rchau8502/AntTrail` exists, is public, and is up-to-date with `origin/main`.
2. **Build Verification**:
   - `npm install` runs cleanly with unified dependency tree.
   - `npm run build` succeeds without type errors or routing collisions.
3. **Test Suite Verification**:
   - `npm test` runs all Vitest test suites (academic engine tests, degree audit tests, gpa tests, canvas tests, articulation tests).
4. **Subsystem Smoke Tests**:
   - Landing page loads with unified header/footer.
   - Degree Planner evaluates prerequisites and renders quarter columns.
   - Canvas LMS hub loads demo mode and connects to API route.
   - EveryUCI guides, deadlines (.ics export), and courses render with i18n switcher.
   - Transfer pathways render college directories.
