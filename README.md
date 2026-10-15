# AntTrail — The Unified UCI Anteater Academic & Campus Super-Platform

> **"Everything an Anteater needs — from Day 1 to Graduation."**  
> AntTrail combines deterministic degree planning, Canvas LMS workload intelligence, STEM pattern-recognition drill drills, verified campus survival guides, and transfer articulation into a single, unified, privacy-first platform for UC Irvine students.

---

## 🧭 The Unified Quad-Core Architecture

AntTrail brings together five previously standalone systems into a coherent, blazing-fast Next.js 16 platform:

| Core Pillar | Origin | Primary Route | Purpose & Key Capabilities |
| :--- | :--- | :--- | :--- |
| **Degree & Prerequisite Engine** | *AntTrail* | [`/degree-planning`](http://localhost:3000/degree-planning) | Deterministic AST prerequisite validator, 4-year quarter plan solver, CS/DS/SWE/CPE/Math audits, UCI repeat policy GPA engine, and private Google Drive sync. |
| **Canvas LMS Command Center** | *ZotCanvas* | [`/canvas`](http://localhost:3000/canvas) | Zero-server privacy Canvas client, Eisenhower priority scoring, fatigue & burnout guard, Pomodoro timer, What-If grade projection, and milestone generator. |
| **STEM Pattern Recognition** | *Bubble* | [`/study`](http://localhost:3000/study) & [`/bubblegum`](http://localhost:3000/bubblegum) | 349 retrieval cards & drills across 12 UCI STEM courses (MATH 2E, 3A, 130A, 140A). *Attempt → Diagnose → Retry* exam-readiness training. |
| **Campus Knowledge & Deadlines** | *EveryUCI* | [`/guides`](http://localhost:3000/guides) & [`/deadlines`](http://localhost:3000/deadlines) | 42+ verified student survival guides in 8 languages, registrar deadline tracker with 1-click Google Calendar / `.ics` export, and Easy Courses / GPA booster directory. |
| **Colleges & Transfer Articulation** | *ScholarStack* | [`/colleges`](http://localhost:3000/colleges) & [`/transfer`](http://localhost:3000/transfer) | CCC-to-UC Assist equivalency browser, Department of Education college scorecard database, and shared schemas for iOS & harvester tools. |

---

## 🏛️ Directory Structure

```
/Volumes/Crucial X9/AI/AntTrail
├── app/                        # Next.js 16 App Router (278 static & dynamic routes)
│   ├── page.tsx                # Master Home with persona selector & Quad-Core Bento Grid
│   ├── canvas/                 # Canvas LMS Command Center (ZotCanvas)
│   ├── degree-planning/        # Degree & Prerequisite Planning Engine (AntTrail)
│   ├── study/                  # STEM Pattern Explorer & Memory Drill (Bubble)
│   ├── bubblegum/              # Rapid-fire STEM Drills (Bubble)
│   ├── guides/                 # Campus Survival Guides & i18n Localization (EveryUCI)
│   ├── deadlines/              # Registrar Deadlines with Calendar Export (EveryUCI)
│   ├── courses/                # Easy Courses (水课) & Grade Boosters (EveryUCI)
│   ├── colleges/               # Colleges & Transfer Articulations (ScholarStack)
│   └── api/canvas/             # Stateless CORS Proxy Relay for Canvas API
├── src/
│   ├── academic-engine/        # Pure TypeScript deterministic prerequisite & degree rules engine
│   ├── canvas/                 # Canvas LMS business logic, priority scoring & grade simulator
│   ├── components/             # React UI components & interactive planning boards
│   ├── content/                # Bubble STEM problem schemas & memory hooks
│   └── data/                   # UCI catalog, ASSIST equivalencies & mock datasets
├── data/                       # 349 Bubble STEM cards & course catalog JSON
├── apps/
│   ├── ios/                    # ScholarStack native Swift 6 / SwiftUI mobile application
│   └── harvester/              # Python data harvester pipelines
├── supabase/                   # Database migrations and relational schemas
├── tests/                      # Comprehensive Vitest test suite (13 suites, 87 unit tests)
└── vercel.json                 # Next.js framework deployment configuration
```

---

## 🔒 Privacy Model & Invariants

1. **Zero Server Retention:**  
   Student records (courses taken, grades, transfer credit, planned quarters) live entirely in local browser memory, `localStorage`, and optionally the student's private Google Drive `appDataFolder`. No student academic records are ever stored on our servers.
2. **Stateless Canvas Relay:**  
   Canvas API tokens are never saved to server disks or remote databases. API requests pass through a strictly stateless, in-memory proxy route (`/api/canvas/*`) solely to bypass browser CORS headers.
3. **Deterministic Rules Engine (No AI / Non-Determinism):**  
   Prerequisites, class standing, minimum grade thresholds, and course availability are computed using pure mathematical AST evaluation — never LLM hallucination.
4. **Transparent Articulation:**  
   Transfer courses are only marked equivalent when an official articulation mapping exists (ASSIST.org). If articulation is unconfirmed, AntTrail marks it as requiring administrative review rather than guessing.
5. **Client-Side PII Sanitization:**  
   Imported academic records (StudentAccess transcripts or DegreeWorks audits) are parsed exclusively in local browser memory. Sensitive identifiers such as Student ID numbers, names, and contact details are automatically redacted.

---

## 📐 Academic Rule Assumptions

- **Grade Hierarchy & UCI Pass Policy:**  
  Letter grades follow the UCI Academic Senate scale (`A+` through `F`). Per UCI policy, a **Pass (`P`)** grade corresponds strictly to work of **`C` (2.0) or higher**. If a course requires a minimum grade of `B`, a `P` grade does not satisfy it unless explicitly petitioned.
- **Prerequisite Boolean AST:**  
  Prerequisites are represented as an Abstract Syntax Tree (AST) supporting arbitrary combinations of `AND`, `OR`, `minGrade`, `allowConcurrent`, `class_standing`, and `units`.
- **Course Code Normalization:**  
  Whitespace and case variations (`math  2a` vs `MATH 2A`) are normalized prior to evaluation.
- **Offering Confidence:**  
  Course offerings are distinguished by confidence levels (`CONFIRMED`, `EXPECTED`, `LIKELY`, `UNKNOWN`).

---

## 🎯 Implementation Status

| System | Capabilities | Status |
| :--- | :--- | :---: |
| **Prerequisite AST & Eligibility** | Boolean AST, standing checks, recursive evaluator | ✅ **Complete** |
| **Degree Audit Engine** | CS B.S., Math B.S., Data Science, Software Eng, Comp Eng | ✅ **Complete** |
| **Quarter Plan Constraint Solver** | Topological bottleneck scheduler, 3 plan strategies | ✅ **Complete** |
| **Transcript & DegreeWorks Parser** | Deterministic UCI text state machine, PII sanitizer | ✅ **Complete** |
| **Google Drive Private Sync** | Zero-server direct REST sync to student's hidden cloud storage | ✅ **Complete** |
| **UCI Repeat Policy & GPA Engine** | Regulation A340/A345 16-unit repeat policy, Dean's List | ✅ **Complete** |
| **Canvas LMS Integration** | Priority urgency scoring, burnout guard, Pomodoro, Grade What-If | ✅ **Complete** |
| **STEM Pattern Recognition** | 349 problem cards across 12 STEM courses, drill retry loop | ✅ **Complete** |
| **Campus Life & Survival Guides** | 42+ verified guides in 8 languages, registrar deadline exports | ✅ **Complete** |
| **Colleges & Transfer Articulation** | Assist.org equivalencies, College Scorecard directory | ✅ **Complete** |

---

## 🧪 Verification & Testing

AntTrail includes **87 unit tests across 13 suites** running via **Vitest**:

```bash
# Run the complete test suite
npm test

# Run Next.js Turbopack production build (278 routes)
npm run build

# Start production server
npm run start
```

```bash
# Run unit test suite
npm test

# Run TypeScript typecheck & production build
npm run build
```

### Verified Test Cases:
- ✔ Grade and standing checks: Letter grades vs minimum thresholds (`C`, `C-`, `B`).
- ✔ UCI Pass (`P`) policy compliance.
- ✔ Class standing hierarchy (`Junior` satisfies `Sophomore` requirement).
- ✔ Pure `AND` and `OR` boolean nodes in AST.
- ✔ Complex nested logic: `ICS 46` requiring `ICS 45C` AND `(ICS 33 OR EECS 40)`.
- ✔ Multi-tier upper division sequences: `MATH 140A` (Real Analysis) requiring `MATH 13` AND `MATH 3A` AND `MATH 2D`.
- ✔ Community college transfer articulation: Mt. SAC `MATH 260` → `MATH 3A`, Mt. SAC `CSCI 220` → `ICS 45C`.
- ✔ Degree Requirement Audit: Computer Science B.S. and Mathematics B.S. core/elective/unit evaluations.
- ✔ Multi-Quarter Prerequisite Sequence Validator: detects backwards scheduling and illegal concurrent enrollments.
- ✔ Quarter Unit Load Monitoring: detects underload ($<12$ units) and overload ($>20$ units).
- ✔ Auto Plan Constraint Solver: generates 3 valid plans (Balanced, Accelerated, Light) with 0 sequencing errors.
- ✔ Prerequisite Bottleneck Ordering: topological critical path preserves chains like `ICS 31 → 32 → 33 → 45C → 46 → CS 161`.
- ✔ Transfer Articulation Deduplication: auto planner never reschedules courses already cleared via transfer.
- ✔ Summer Session Sensitivity: respects `includeSummer` toggle and schedules summer terms for fast-track plans.
- ✔ Deterministic Format Auto-Detection: distinguishes UCI StudentAccess transcripts, DegreeWorks exports, and generic lists.
- ✔ UCI StudentAccess Parsing: extracts quarterly courses, units, letter grades, and transfer credit blocks.
- ✔ DegreeWorks Audit Parsing: extracts applied courses and distinguishes from unfulfilled requirements.
- ✔ Client-Side PII Redaction: automatically strips Student ID numbers and personal names from input buffers.
- ✔ Google Drive `appDataFolder` Private Sync: zero-server retention direct REST sync into student's hidden cloud container.
- ✔ Cross-Device Conflict Detection: detects remote vs local modification timestamps and triggers side-by-side reconciliation.
- ✔ Deterministic FNV-1a Checksums: detects academic plan modifications regardless of clock skew.
- ✔ Full In-Memory Mock Provider: instant offline and demo testing without Google Cloud credentials.
- ✔ Official UCI Cumulative GPA: computes grade points exclusively from UC coursework per Academic Senate Regulation A340.
- ✔ Transfer Credit GPA Exclusion: awards degree credit while strictly omitting non-UC courses from GPA numerator and denominator.
- ✔ UCI 16-Unit Repeat Policy (Regulation A345): replaces original substandard grade (`C-` or lower) with new grade for the first 16 units.
- ✔ Dean's Honor List Qualification: detects terms meeting $\ge 3.50$ GPA in $\ge 12$ graded units with no `F`/`NP`.
- ✔ Target GPA Requirement Solver: deterministically computes exact average grade needed to reach target cumulative GPA.
- ✔ What-If Trajectory Projection: models future quarterly GPA curve based on hypothetical course grades.
- ✔ Canvas LMS Priority Scoring: Eisenhower urgency matrix, weight factoring, and fatigue guard.
- ✔ Canvas Grade Simulator: What-If final grade projection and hypothetical target solver.
- ✔ Canvas Milestone Generator: breaking complex course assignments into structured step milestones.
- ✔ Canvas CORS Proxy Relay: stateless token forwarding and error handling.
- ✔ STEM Problem Card Validation: 349 problem cards across 12 courses with verified LaTeX rendering.
- ✔ Human-readable prerequisite string formatting.

---

## 🚀 Getting Started

```bash
# Clone the repository and enter the directory
cd "/Volumes/Crucial X9/AI/AntTrail"

# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit tests
npm test

# Build for production
npm run build
```

---

## ⚖️ Official Disclaimer

*AntTrail is an independent student academic resource and is not affiliated with, sponsored by, or endorsed by the University of California, Irvine. Course offerings and prerequisite policies are sourced from public university catalogs and must be verified with official UCI academic counselors before enrollment.*
