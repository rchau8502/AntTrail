# AntTrail — Privacy-First UCI Academic Planner

> **"Make UCI course planning simple without making academic rules approximate."**  
> The system does the complicated mathematical reasoning in the background while giving UC Irvine students a straightforward answer:  
> **What can I take, when can I take it, and what realistic paths can get me to graduation?**

---

## 🧭 Project Overview

**AntTrail** is a modern, student-centric academic planner for undergraduate students at the **University of California, Irvine (UCI)**.

Instead of navigating bloated, archaic administrative portals (DegreeWorks, StudentAccess, WebSOC), AntTrail delivers a visual, reactive experience inspired by community tools like **AntAlmanac** and **ZotCourse**, powered by a strictly deterministic, mathematical prerequisite rules engine.

---

## 🏛️ Technical Architecture

AntTrail is built with a clean separation of concerns:

```
/Volumes/Crucial X9/AI/AntTrail
├── src/
│   ├── academic-engine/            # Pure TypeScript deterministic rules engine (zero UI dependencies)
│   │   ├── types.ts                # Strict AST schemas (Course, PrereqNode, StudentProfile, AutoPlan, etc.)
│   │   ├── prerequisites.ts        # Recursive AST evaluator, grade comparator, human formatter
│   │   ├── eligibility.ts          # Batch course eligibility evaluator & explanation builder
│   │   ├── degree.ts               # Degree audit engine (CS B.S., Math B.S. core/electives/unit quotas)
│   │   ├── planner.ts              # Multi-quarter prerequisite sequence validator & schedule evaluator
│   │   ├── autoplan.ts             # Deterministic topological bottleneck scheduler & multi-plan generator
│   │   └── parser/                 # Client-side deterministic academic record parsers
│   │       ├── types.ts            # ParsedCourseCandidate, ParseResult, ParserFormat
│   │       ├── transcriptParser.ts # Deterministic UCI StudentAccess text state machine
│   │       ├── degreeWorksParser.ts # Deterministic DegreeWorks audit line parser
│   │       ├── genericListParser.ts # Casual shorthand course list parser
│   │       └── parser.ts           # Unified auto-detect dispatcher, PII sanitizer & catalog matcher
│   ├── data/
│   │   ├── uci/
│   │   │   ├── courses.ts          # Mocked official UCI catalog with quarterly offering schedules
│   │   │   ├── equivalencies.ts    # Official California Community College articulation rules (ASSIST.org)
│   │   │   ├── programs.ts         # Official UCI Degree Programs (Computer Science B.S., Mathematics B.S.)
│   │   │   └── offerings.ts        # UCI quarterly offering schedule lookup and confidence badge helpers
│   │   └── mock/
│   │       ├── mockStudentData.ts  # Pre-configured student personas (Freshman, Transfer, etc.)
│   │       └── sampleTranscripts.ts # Realistic sample transcripts and DegreeWorks audit texts
│   ├── components/                 # Reactive, accessible React UI
│   │   ├── Navbar.tsx              # Top bar, stats counter, tab navigation, transcript importer trigger
│   │   ├── PersonaSelector.tsx     # Student persona presets with instant switching
│   │   ├── CourseFilters.tsx       # Search by text, department chips, and eligibility status
│   │   ├── CourseCard.tsx          # Card displaying live eligibility status, badges, offerings
│   │   ├── PrerequisiteTreeVisualizer.tsx # Visual AST prerequisite drill-down tree
│   │   ├── StudentCourseDrawer.tsx # Course record manager, manual entry, & transfer credit viewer
│   │   ├── parser/                 # Transcript & audit import UI
│   │   │   └── ImportTranscriptModal.tsx # Interactive paste, preview, row-edit, and import modal
│   │   ├── planner/                # Multi-quarter interactive planning board
│   │   │   ├── QuarterPlannerView.tsx # Main planner view with live sequencing validation
│   │   │   ├── QuarterColumn.tsx   # Per-quarter draggable card list and unit meter
│   │   │   ├── AddCourseModal.tsx  # Searchable eligible course picker & custom course input
│   │   │   └── AutoPlanModal.tsx   # Automated degree plan generator with 3 distinct strategies
│   │   └── degree/                 # Degree progress & audit view
│   │       └── DegreeAuditView.tsx # Degree requirement breakdown, progress bars, section drill-down
│   ├── App.tsx                     # Main dashboard coordinating engine, state, filters & drawer
│   ├── main.tsx                    # React DOM entrypoint
│   └── index.css                   # Tailwind CSS styling and theme tokens
├── tests/
│   ├── academic-engine.test.ts     # Vitest prerequisite AST and eligibility test suite
│   ├── degree-engine.test.ts       # Vitest degree requirement evaluation suite
│   ├── planner-engine.test.ts      # Vitest multi-quarter sequence validation suite
│   ├── autoplan-engine.test.ts     # Vitest deterministic auto-plan constraint solver suite
│   └── parser-engine.test.ts       # Vitest deterministic transcript and DegreeWorks parser suite
├── docs/superpowers/
│   ├── specs/                      # Architecture and technical design specifications
│   └── plans/                      # Detailed implementation plans
└── README.md
```

---

## 🔒 Privacy Model & Invariants

1. **Zero Server Retention:**  
   Student records (courses taken, grades, transfer credit, planned quarters) live entirely in local browser memory and `localStorage` (and in Phase 5, in the student's private Google Drive `appDataFolder`). No student records are ever transmitted to or stored on our servers.
2. **Deterministic Rules Engine (No AI / Non-Determinism):**  
   Prerequisites, class standing, minimum grade thresholds, and course availability are computed using pure mathematical code. We do **NOT** use Large Language Models for academic decisions.
3. **Transparent Articulation:**  
   Transfer courses are only marked equivalent when an official articulation mapping exists (e.g. ASSIST.org). If articulation is unconfirmed, AntTrail marks it as requiring administrative review rather than guessing.
4. **Client-Side PII Sanitization:**  
   Imported academic records (StudentAccess transcripts or DegreeWorks audits) are parsed exclusively in local browser memory. Sensitive identifiers such as Student ID numbers, names, and contact details are automatically redacted before records enter the state.

---

## 📐 Academic Rule Assumptions

- **Grade Hierarchy & UCI Pass Policy:**  
  Letter grades follow the UCI Academic Senate scale (`A+` through `F`). Per UCI policy, a **Pass (`P`)** grade corresponds strictly to work of **`C` (2.0) or higher**. If a course requires a minimum grade of `B`, a `P` grade does not satisfy it unless explicitly petitioned.
- **Prerequisite Boolean AST:**  
  Prerequisites are represented as an Abstract Syntax Tree (AST) supporting arbitrary combinations of `AND`, `OR`, `minGrade`, `allowConcurrent`, `class_standing`, and `units`.
- **Course Code Normalization:**  
  Whitespace and case variations (`math  2a` vs `MATH 2A`) are normalized prior to evaluation.
- **Offering Confidence:**  
  Course offerings are distinguished by confidence levels:
  - `CONFIRMED`: Published in the official Schedule of Classes (WebSOC).
  - `EXPECTED`: Appears in official departmental future teaching plans.
  - `LIKELY`: Follows historical quarterly patterns.
  - `UNKNOWN`: Insufficient data.

---

## 🎯 Implementation Status

| Milestone | Scope | Status |
| :--- | :--- | :---: |
| **Phase 1** | **Prerequisite Boolean Engine & Interactive Eligibility Prototype** | ✅ **Complete** |
| **Phase 2** | **Basic UCI Degree Requirement Engine & Manual Planner UI** | ✅ **Complete** |
| **Phase 3** | **Quarterly WebSOC Offerings & Auto Plan Constraint Solver** | ✅ **Complete** |
| **Phase 4** | **DegreeWorks & Unofficial Transcript Deterministic Parser** | ✅ **Complete** |
| **Phase 5** | **Google Authentication & Private Google Drive Storage** | ✅ **Complete** |
| **Phase 6** | **GPA Projections, What-If Simulator, Mobile Polish & Accessibility** | ✅ **Complete** |

---

## 🧪 Verification & Testing

AntTrail includes 67 unit tests across 8 suites built with **Vitest**:

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
