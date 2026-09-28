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
│   │   ├── types.ts                # Strict AST schemas (Course, PrereqNode, StudentProfile, etc.)
│   │   ├── prerequisites.ts        # Recursive AST evaluator, grade comparator, human formatter
│   │   └── eligibility.ts          # Batch course eligibility evaluator & explanation builder
│   ├── data/
│   │   ├── uci/
│   │   │   ├── courses.ts          # Mocked official UCI catalog (ICS & MATH series)
│   │   │   └── equivalencies.ts    # Official California Community College articulation rules (ASSIST.org)
│   │   └── mock/
│   │       └── mockStudentData.ts  # Pre-configured student personas (Freshman, Transfer, etc.)
│   ├── components/                 # Reactive, accessible React UI
│   │   ├── Navbar.tsx              # Top bar, stats counter, privacy indicator
│   │   ├── PersonaSelector.tsx     # Student persona presets with instant switching
│   │   ├── CourseFilters.tsx       # Search by text, department chips, and eligibility status
│   │   ├── CourseCard.tsx          # Card displaying live eligibility status, badges, offerings
│   │   ├── PrerequisiteTreeVisualizer.tsx # Visual AST prerequisite drill-down tree
│   │   └── StudentCourseDrawer.tsx # Course record manager, manual entry, & transfer credit viewer
│   ├── App.tsx                     # Main dashboard coordinating engine, state, filters & drawer
│   ├── main.tsx                    # React DOM entrypoint
│   └── index.css                   # Tailwind CSS styling and theme tokens
├── tests/
│   └── academic-engine.test.ts     # Vitest comprehensive unit test suite
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
| Phase 2 | Basic UCI Degree Requirement Engine & Manual Planner UI | 🔜 Next Milestone |
| Phase 3 | Quarterly WebSOC Offerings & Auto Plan Constraint Solver | 📋 Planned |
| Phase 4 | DegreeWorks & Unofficial Transcript Deterministic Parser | 📋 Planned |
| Phase 5 | Google Authentication & Private Google Drive Storage | 📋 Planned |
| Phase 6 | GPA Projections, Mobile Polish, & WCAG Accessibility | 📋 Planned |

---

## 🧪 Verification & Testing

AntTrail includes a unit test suite built with **Vitest**:

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
- ✔ Pure `AND` and `OR` boolean nodes.
- ✔ Complex nested logic: `ICS 46` requiring `ICS 45C` AND `(ICS 33 OR EECS 40)`.
- ✔ Multi-tier upper division sequences: `MATH 140A` (Real Analysis) requiring `MATH 13` AND `MATH 3A` AND `MATH 2D`.
- ✔ Community college transfer articulation: Mt. SAC `MATH 260` → `MATH 3A`, Mt. SAC `CSCI 220` → `ICS 45C`.
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
