# AntTrail Phase 1 Design Spec: Academic Rules Engine & Eligibility Prototype

**Date:** 2026-09-29  
**Status:** Approved  
**Scope:** Phase 1 (Foundation, AST Prerequisite Engine, Eligibility Engine, UCI Mock Catalog, Interactive Prototype UI)

---

## 1. Product Vision & Scope

**AntTrail** is a privacy-first, fast, student-friendly academic planner built specifically for UC Irvine (UCI) students. Unlike administrative tools (e.g. DegreeWorks), AntTrail delivers an experience closer to **AntAlmanac / ZotCourse**: visual, responsive, and intuitive.

### Guiding Principles
1. **Privacy-First (Zero Server-Side Student Records):** AntTrail persists zero student academic data on external backend servers. All student course histories, grades, and preferences reside solely in client memory / local storage, with Google Drive `appDataFolder` integration in future phases.
2. **Deterministic Academic Rules (No AI for Academic Decisions):** Prerequisite fulfillment, transfer equivalency resolution, degree progress, and GPA calculations are evaluated strictly via deterministic code and structured data models.
3. **Realistic Course Planning:** Courses are never planned blindly; prerequisites, quarter availability, and offering confidence are explicitly modeled.
4. **Academic Year Versioning:** Catalog rules and prerequisites are scoped to catalog years (e.g. `2026-27`) and never overwritten.

---

## 2. Architecture & Directory Layout

The application is structured as a client-side SPA (Vite + React + TypeScript + Tailwind CSS) with a strictly decoupled, framework-agnostic academic rules engine.

```text
AntTrail/
├── src/
│   ├── academic-engine/          # 100% pure TypeScript, zero DOM/React dependencies
│   │   ├── types.ts              # Core academic domain schemas & AST types
│   │   ├── prerequisites.ts      # AST evaluator, boolean solver, and diagnostic extractor
│   │   ├── eligibility.ts        # Full-catalog eligibility evaluator
│   │   ├── gpa.ts                # Official UCI GPA calculation engine
│   │   └── __tests__/            # Exhaustive Vitest test suite
│   │
│   ├── data/                     # Public UCI catalog & articulation data
│   │   ├── catalog-years/
│   │   │   └── 2026-27/
│   │   │       ├── courses.json
│   │   │       ├── offerings.json
│   │   │       └── transfer-articulation.json
│   │   └── loader.ts             # Catalog data loader and type validators
│   │
│   ├── storage/                  # Client-side storage abstraction
│   │   ├── types.ts              # User profile & export/import schema
│   │   ├── local-storage.ts      # Local persistence with JSON backup/restore
│   │   └── google-drive.ts       # Stub / adapter interface for future OAuth
│   │
│   └── app/                      # React UI (AntAlmanac-inspired)
│       ├── components/
│       │   ├── CourseCard.tsx
│       │   ├── PrereqBadge.tsx
│       │   ├── CourseHistoryPanel.tsx
│       │   ├── PrereqTreeInspector.tsx
│       │   └── ExportImportModal.tsx
│       ├── state/
│       │   └── useStudentStore.ts
│       ├── App.tsx
│       └── main.tsx
├── docs/
│   └── superpowers/specs/        # Design specifications
└── README.md                     # Architecture, privacy model, and usage
```

---

## 3. Data Models & Prerequisite AST

### 3.1 Grade & Course Models
```ts
export type UCIGrade =
  | 'A+' | 'A' | 'A-'
  | 'B+' | 'B' | 'B-'
  | 'C+' | 'C' | 'C-'
  | 'D+' | 'D' | 'D-'
  | 'F'  | 'P' | 'NP' | 'IP';

export interface Course {
  id: string;                      // e.g. "MATH_2D"
  code: string;                    // e.g. "MATH 2D"
  department: string;              // e.g. "MATH"
  number: string;                  // e.g. "2D"
  title: string;                   // e.g. "Multivariable Calculus I"
  units: number;                   // e.g. 4
  description: string;
  prerequisites: PrereqNode | null;
  prereqString?: string;           // Human readable e.g. "MATH 2B"
  geCategories?: string[];         // e.g. ["Va", "Vb"]
}
```

### 3.2 Prerequisite AST Node
Prerequisite requirements are expressed as an Abstract Syntax Tree:
```ts
export type PrereqNode =
  | {
      type: 'course';
      courseId: string;
      minGrade?: UCIGrade;        // default: 'C' for major prereqs, 'D-' minimum pass
      corequisite?: boolean;      // allowed to take concurrently
    }
  | {
      type: 'and';
      children: PrereqNode[];
    }
  | {
      type: 'or';
      children: PrereqNode[];
    }
  | {
      type: 'standing';
      level: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';
    }
  | {
      type: 'major_restriction';
      majors: string[];
      mode: 'only' | 'exclude';
    };
```

### 3.3 Student Academic Record
```ts
export interface StudentCourse {
  id: string;                      // Unique record UUID
  courseId: string;                // e.g. "MATH_2A" or "MTSAC_MATH_260"
  term: string;                    // e.g. "Fall 2025"
  grade: UCIGrade;
  isTransfer?: boolean;
  transferInstitution?: string;   // e.g. "Mt. San Antonio College"
  transferEquivalentCourseId?: string; // e.g. "MATH_2A"
}

export interface StudentProfile {
  studentId?: string;
  catalogYear: string;             // e.g. "2026-27"
  major: string;                   // e.g. "Computer Science B.S."
  courses: StudentCourse[];
  classStanding: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';
}
```

---

## 4. Prerequisite & Eligibility Evaluation Engine

### 4.1 Evaluation Logic
The evaluation takes `(node: PrereqNode, student: StudentProfile, equivalencies: CourseEquivalency[])` and recursively resolves satisfaction:
1. **Course Node:**
   - Check if the student completed `node.courseId` with a grade $\ge$ `node.minGrade`.
   - If not directly found, check if the student has a transfer course mapped to `node.courseId` in `equivalencies`.
   - If satisfied via transfer, attach note: `Satisfied by [Transfer Course]`.
2. **AND Node:**
   - Satisfied if and only if **all** children evaluate to true.
   - If unsatisfied, aggregates missing requirements from all failing branches.
3. **OR Node:**
   - Satisfied if **at least one** child evaluates to true.
   - If unsatisfied, aggregates alternative options (e.g. `"Either MATH 3A OR MATH 6G"`).
4. **Standing & Major Nodes:**
   - Verified against `student.classStanding` and `student.major`.

### 4.2 Status Taxonomy
Each course in the catalog is evaluated into one of the following statuses:
- `ELIGIBLE`: All prerequisite branches and restrictions satisfied.
- `MISSING_PREREQUISITES`: One or more prerequisite branches unsatisfied. Contains explicit `missingReasons: string[]`.
- `TRANSFER_EQUIVALENCY_USED`: Prerequisites satisfied via approved transfer articulation mapping.
- `REQUIRES_REVIEW`: Prerequisite involves an unverified or clearance-required transfer course.
- `RESTRICTED`: Student fails major or standing constraints.
- `ALREADY_COMPLETED`: Student has already taken and passed the course.

---

## 5. UCI GPA Engine

UCI GPA is calculated strictly according to official UC Academic Senate regulations:
- Grade Points:
  - $A+ = 4.0, A = 4.0, A- = 3.7$
  - $B+ = 3.3, B = 3.0, B- = 2.7$
  - $C+ = 2.3, C = 2.0, C- = 1.7$
  - $D+ = 1.3, D = 1.0, D- = 0.7$
  - $F = 0.0$
- P / NP / IP courses do not earn grade points and are excluded from the GPA denominator.
- **Transfer Coursework:** Non-UC transfer courses are strictly **excluded** from the UCI GPA (units may transfer, but GPA does not).

---

## 6. Public UCI Mock Dataset (Phase 1)

Phase 1 includes realistic foundational course trees spanning ICS and Mathematics:

### Mathematics:
- `MATH 2A`: Single-Variable Calculus I (Prereq: None / Placement)
- `MATH 2B`: Single-Variable Calculus II (Prereq: `MATH 2A`)
- `MATH 2D`: Multivariable Calculus I (Prereq: `MATH 2B`)
- `MATH 3A`: Linear Algebra (Prereq: `MATH 2B`)
- `MATH 13`: Introduction to Abstract Mathematics (Prereq: `MATH 2B`)
- `MATH 105A`: Numerical Analysis I (Prereq: `MATH 3A` AND `MATH 2D`)
- `MATH 140A`: Elementary Analysis (Prereq: `MATH 13` AND `MATH 3A`)

### Computer Science (ICS):
- `ICS 31`: Introduction to Programming (Prereq: None)
- `ICS 32`: Programming with Software Libraries (Prereq: `ICS 31`)
- `ICS 33`: Intermediate Programming (Prereq: `ICS 32`)
- `ICS 45C`: Programming in C/C++ (Prereq: `ICS 33`)
- `ICS 46`: Data Structure Implementation and Analysis (Prereq: `ICS 45C`)
- `ICS 51`: Introductory Computer Organization (Prereq: `ICS 33`)
- `COMPSCI 161`: Design and Analysis of Algorithms (Prereq: `ICS 46` AND `MATH 2B` AND (`STATS 67` OR `I&C SCI 6D`))

### Transfer Articulation Mapping:
- `Mt. SAC MATH 260` $\rightarrow$ `MATH 2A` (`CONFIRMED`)
- `IVC CS 10` $\rightarrow$ `ICS 31` (`CONFIRMED`)

---

## 7. Interactive Prototype UI Specification

The Phase 1 prototype UI delivers immediate visual feedback:
1. **Header / Action Bar:**
   - AntTrail branding, Catalog Year selector (`2026-27`), Major indicator (`Computer Science B.S.` / `Mathematics B.S.`).
   - Quick GPA badge (`UCI GPA: 3.82`, `Units Completed: 24`).
   - `Export Data`, `Import Backup`, and `Reset Data` buttons.
2. **Left Panel — Student Record & Course History:**
   - Quick-toggle checklist for common intro courses (e.g. check `MATH 2A`, `ICS 31`).
   - Add Custom Course modal (UCI course or Transfer course with source college).
   - Grade selector dropdown ($A+, A, B, ...$).
3. **Main Content — Course Catalog & Eligibility Explorer:**
   - Live Search (by course code e.g. `MATH 140A` or title e.g. `Analysis`).
   - Filter Tabs: `All Courses`, `Eligible (Can Take)`, `Missing Prerequisites`, `Already Completed`.
   - Course Cards featuring:
     - Clear status badge (`✓ Eligible`, `✕ Missing Prerequisites`, `⚡ Transfer Equivalent`).
     - Course title, units, and catalog description.
     - Quarter availability badges (e.g. `Fall 2026: Confirmed`).
     - Expandable Diagnostic Inspector: shows the AST tree with green checkmarks for satisfied branches and red indicators for missing courses.

---

## 8. Verification & Testing Plan

1. **Academic Engine Unit Tests (Vitest):**
   - Boolean logic correctness: Simple nodes, complex `A AND (B OR C)` expressions.
   - Minimum grade enforcement: Course completed with 'D' fails prerequisite requiring 'C'.
   - Transfer course mapping: Mt. SAC MATH 260 satisfies `MATH 2A` prerequisite for `MATH 2B`.
   - GPA calculation: Verifies accurate UCI grade point averages and ensures non-UC transfer grades are excluded.
2. **UI Interactivity Verification:**
   - Toggling completed courses instantly transitions dependent courses from `MISSING_PREREQUISITES` to `ELIGIBLE`.
   - Data export produces valid JSON; data import correctly restores state; reset clears state cleanly.
