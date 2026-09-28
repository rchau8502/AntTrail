# AntTrail 🐜

> **Privacy-First Academic Planner & Eligibility Engine for UC Irvine Anteaters**

AntTrail provides deterministic, transparent academic planning for UCI students. Instead of guessing or relying on probabilistic AI models for official graduation rules, AntTrail evaluates complete Boolean prerequisite logic, grade thresholds, and California Community College transfer articulations directly in code.

---

## 🏛 Architecture

AntTrail is built with a framework-independent academic engine separated cleanly from the presentation layer:

```
AntTrail/
├── src/
│   ├── academic-engine/          # Pure TypeScript deterministic logic (100% testable)
│   │   ├── types.ts              # Normalized data models (Course, PrereqNode, StudentProfile, etc.)
│   │   ├── prerequisites.ts      # Boolean AST evaluation (AND, OR, units, standing, grades)
│   │   └── eligibility.ts        # Course & catalog eligibility evaluators with transfer mapping
│   ├── data/
│   │   ├── uci/
│   │   │   ├── courses.ts        # Official UCI Computer Science & Mathematics catalog
│   │   │   └── equivalencies.ts  # Official California Community College articulation agreements (ASSIST.org)
│   │   └── mock/
│   │       └── mockStudentData.ts # Realistic student personas (Freshman, CS Soph, Transfer, Math Jr)
│   ├── components/               # High-usability UI inspired by AntAlmanac & ZotCourse
│   │   ├── Navbar.tsx            # Header with privacy guarantees & navigation
│   │   ├── StudentTranscriptManager.tsx # Interactive course toggling & transfer articulation manager
│   │   ├── FilterBar.tsx         # Search, department tabs, and eligibility filter pills
│   │   ├── CourseCard.tsx        # Individual course card with real offerings and AST tree drawer
│   │   └── PrerequisiteTreeVisualizer.tsx # AST node renderer showing satisfied vs missing conditions
│   ├── App.tsx                   # Main SPA container
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Tailwind CSS styling with UCI Anteater color palette
├── tests/
│   └── academic-engine.test.ts   # Vitest unit test suite covering Boolean combinations & edge cases
└── dist/                         # Production static bundle
```

---

## 🔒 Privacy Model: Zero Server Retention

AntTrail is designed with a strict client-side privacy architecture:
- **No Student Data on Servers**: Student transcripts, course histories, grades, and degree plans are never persisted to a remote application database.
- **Client-Side SPA**: The evaluation engine runs 100% in the user's browser runtime.
- **Google Drive `appDataFolder` Model (Phase 5)**: In subsequent phases, persistent storage uses the user's private Google Drive application folder via minimal OAuth scopes, ensuring students retain total sovereignty over their educational records.
- **Export & Delete Anytime**: Full support for exporting profile JSON and resetting records locally.

---

## 📐 Rule Assumptions & Academic Logic

1. **Deterministic Execution (No AI in Academic Rules)**:
   - LLMs are never used to determine prerequisite satisfaction, transfer equivalency, degree audit progress, or GPA calculations.
   - All evaluations follow deterministic Boolean AST expressions and structured datasets.
2. **Grade Thresholds**:
   - UCI letter grades: $A+ = A = 4.0$, $A- = 3.7$, $B+ = 3.3$, $B = 3.0$, $B- = 2.7$, $C+ = 2.3$, $C = 2.0$, $C- = 1.7$, $D+ = 1.3$, $D = 1.0$, $D- = 0.7$, $F = 0.0$.
   - Major prerequisites at UCI (especially in ICS and Mathematics) strictly require a minimum grade of **C or better** (a grade of $C-$ does not satisfy prerequisites unless explicitly configured).
   - A Pass (`P`) grade per UC policy is defined as work of grade $C$ or better and satisfies prerequisites requiring $C$ or below.
3. **Class Standing Calculations**:
   - Freshman: 0 – 44.9 units
   - Sophomore: 45.0 – 89.9 units
   - Junior: 90.0 – 134.9 units
   - Senior: 135.0+ units
4. **Transfer Articulation**:
   - Supported with verified agreements from ASSIST.org (e.g. Mt. San Antonio College, Irvine Valley College, Orange Coast College).
   - Equivalent courses satisfy prerequisite nodes with full provenance (`Satisfied by Mt. SAC MATH 260 → UCI MATH 3A`).

---

## 📊 Data Sources

- **UCI General Catalogue**: Official course descriptions, unit counts, and prerequisite specifications for Information & Computer Sciences and Mathematics.
- **UCI Schedule of Classes (WebSOC)**: Course offerings tagged by confidence (`CONFIRMED`, `EXPECTED`, `LIKELY`, `UNKNOWN`).
- **ASSIST.org**: Public California statewide articulation database for community college course equivalencies.

---

## 🚀 Implementation Status

| Milestone | Status | Description |
| :--- | :---: | :--- |
| **Phase 1: Project Foundation & Technical Architecture** | ✅ Completed | Vite + React + TypeScript + Tailwind CSS project initialized with zero server footprint. |
| **Phase 1: UCI Course Data Schemas** | ✅ Completed | Normalized types for `Course`, `PrerequisiteNode`, `StudentProfile`, `CourseEquivalency`. |
| **Phase 1: Prerequisite Boolean Expression Engine** | ✅ Completed | Recursive AST evaluator for `AND`, `OR`, `course`, `units`, `class_standing`, and `major` nodes. |
| **Phase 1: Mocked UCI Dataset** | ✅ Completed | Real ICS (31, 32, 33, 45C, 46, CS 161) & MATH (2A, 2B, 2D, 3A, 13, 105A, 140A, STATS 67) datasets with transfer mappings. |
| **Phase 1: Interactive Eligibility Prototype** | ✅ Completed | Interactive student transcript manager with persona presets and real-time eligibility feedback. |
| **Phase 1: Automated Unit Tests** | ✅ Completed | 10 Vitest tests validating Boolean trees, grade thresholds, and transfer credit mapping. |
| **Phase 2: Degree Requirement Engine & Manual Planner UI** | ⏳ Upcoming | Tracking major requirements (CS B.S., Math B.S.) and dragging courses into quarters. |
| **Phase 3: Auto Plan Constraint Solver** | ⏳ Upcoming | Deterministic multi-quarter constraint solver generating realistic course paths. |
| **Phase 4: Transcript & DegreeWorks Parser** | ⏳ Upcoming | Deterministic local text/regex parsing of UCI unofficial transcripts and DegreeWorks PDFs. |
| **Phase 5: Google Drive AppData Storage** | ⏳ Upcoming | Zero-retention cloud sync using student's personal Google Drive `appDataFolder`. |
| **Phase 6: GPA Projections & Polish** | ⏳ Upcoming | What-if grade calculator adhering to official UCI grading guidelines. |

---

## 🛠 Next Development Milestone (Phase 2)

1. **UCI Degree Program Requirements**:
   - Model the Computer Science B.S. and Mathematics B.S. degree structures (Lower Division, Upper Division Core, Major Electives, Senior Design).
2. **Quarter Planner UI**:
   - Multi-quarter canvas (Fall, Winter, Spring) allowing students to schedule eligible courses.
   - Enforce realistic offerings: prevent scheduling courses in quarters where they are not offered (e.g., MATH 105A offered only in Fall/Winter).
3. **Course Prerequisite Scheduling Validation**:
   - Prevent ordering violations (e.g., scheduling ICS 46 before ICS 45C).
