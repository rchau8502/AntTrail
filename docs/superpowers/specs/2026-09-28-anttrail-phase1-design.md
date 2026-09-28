# AntTrail Phase 1 Design Specification: Prerequisite Engine & Eligibility Prototype

**Date:** 2026-09-28  
**Project:** AntTrail (`/Volumes/Crucial X9/AI/AntTrail`)  
**Scope:** Phase 1 (Foundation, Schemas, AST Boolean Engine, Transfer Equivalencies, Eligibility Prototype)  
**Status:** Approved for Implementation Planning  

---

## 1. Executive Summary & Product Goal

AntTrail is a privacy-first, high-performance academic planner engineered specifically for UC Irvine (UCI) undergraduate students. Rather than replicating complex administrative university portals (DegreeWorks, SAP, StudentAccess), AntTrail focuses on answering three fundamental student questions with absolute mathematical determinism:

1. **What can I take right now based on what I have taken?**
2. **When can I take it based on actual UCI quarter offerings?**
3. **What realistic quarter-by-quarter pathways will get me to graduation?**

Phase 1 establishes the mathematical and architectural core of the entire platform:
- A framework-independent, deterministic **prerequisite Boolean-expression engine** in pure TypeScript with 100% unit-test coverage.
- Full support for nested `AND`/`OR` conditions, minimum letter grades (with UCI `P`/Pass handling), class standing, and official transfer course articulation (e.g. Mt. SAC, IVC, OCC).
- A zero-latency, reactive client-side eligibility prototype where students can toggle completed coursework or test transfer personas to instantly see what unlocks, what is locked, and why.

---

## 2. Privacy & Architectural Invariants

1. **Zero Server-Side Student Record Persistence:**  
   Student records (courses taken, grades, transfer credit, custom plans) reside solely in the student's browser memory / `localStorage` (and in Phase 5, in their private Google Drive `appDataFolder`). Student records are NEVER transmitted to or logged on any external backend server.
2. **Deterministic Rules Engine (No AI / Non-Determinism):**  
   Prerequisite evaluations, grade checks, standing qualifications, and transfer articulation must be 100% deterministic code. No LLMs or heuristics are used in calculating academic eligibility.
3. **Faithful Academic Policy Representation:**  
   - Course codes are normalized (`MATH  2a` → `MATH 2A`).
   - Grade comparisons adhere strictly to UCI Academic Senate regulations (UCI `P` grade corresponds to `C` (2.0) or higher; `C-` does not satisfy a `C` prerequisite requirement).
   - Transfer courses are verified through formal articulation records (`CourseEquivalency`) mapped to target UCI course IDs.

---

## 3. System Architecture & Module Boundaries

```
/Volumes/Crucial X9/AI/AntTrail
├── src/
│   ├── academic-engine/            # Framework-independent pure TS rules engine
│   │   ├── types.ts                # Normalized schemas (Course, PrereqNode, StudentProfile, etc.)
│   │   ├── prerequisites.ts        # AST traversal, grade checking, human formatting
│   │   └── eligibility.ts          # Batch course eligibility evaluator & explanation builder
│   ├── data/
│   │   ├── uci/
│   │   │   ├── courses.ts          # Mocked official UCI catalog (ICS & MATH series)
│   │   │   └── equivalencies.ts    # Official California Community College articulation rules
│   │   └── mock/
│   │       └── mockStudentData.ts  # Pre-configured student personas (Freshman, Transfer, etc.)
│   ├── components/                 # AntAlmanac / ZotCourse inspired UI
│   │   ├── Navbar.tsx              # Top bar, stats counter, privacy indicator
│   │   ├── CourseCard.tsx          # Card displaying eligibility status, badges, warnings
│   │   ├── PrerequisiteTreeVisualizer.tsx # Interactive visual AST tree inspector
│   │   ├── PersonaSelector.tsx     # Quick switcher between student personas
│   │   └── StudentCourseDrawer.tsx # Course history manager & manual entry modal
│   ├── App.tsx                     # Main interactive dashboard
│   ├── main.tsx                    # React DOM entrypoint
│   └── index.css                   # Tailwind CSS styles & tokens
├── tests/
│   └── academic-engine.test.ts     # Vitest unit test suite
├── docs/superpowers/specs/         # Design specifications & audit logs
└── README.md                       # Comprehensive documentation
```

### Module Responsibilities:
- **`academic-engine/`**: Pure functions with zero DOM or framework dependencies. Can be imported in CLI scripts, Node.js workers, or browser SPAs alike.
- **`data/`**: Static, immutable catalog data versioned by catalog year (`2026-27`).
- **`components/`**: Modular presentation components styled with Tailwind CSS, utilizing Lucide React icons for clear visual cues.

---

## 4. Formal Data Schemas

### 4.1. Prerequisite Abstract Syntax Tree (AST)
```typescript
export type PrerequisiteNode =
  | {
      type: 'course'
      courseId: string         // e.g. "ICS 33", "MATH 2B"
      minGrade?: GradeLetter   // defaults to 'C'
      allowConcurrent?: boolean
    }
  | {
      type: 'and'
      children: PrerequisiteNode[]
    }
  | {
      type: 'or'
      children: PrerequisiteNode[]
    }
  | {
      type: 'units'
      minUnits: number
      department?: string
    }
  | {
      type: 'class_standing'
      minStanding: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior'
    }
  | {
      type: 'major'
      allowedMajors?: string[]
      excludedMajors?: string[]
    }
  | {
      type: 'custom'
      description: string
      satisfiedByDefault?: boolean
    }
```

### 4.2. Student Profile & Course History
```typescript
export interface StudentCourseRecord {
  id: string
  courseCode: string       // e.g. "ICS 31", or transfer "MATH 180"
  institution: string      // "UCI" | community college name
  term: string             // "Fall 2024"
  units: number
  grade: GradeLetter       // "A", "B+", "P", etc.
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PLANNED'
}

export interface StudentProfile {
  studentId?: string
  major: string
  catalogYear: string      // "2026-27"
  classStanding: ClassStanding
  completedUnits: number
  courseHistory: StudentCourseRecord[]
}
```

### 4.3. Articulation & Eligibility Output
```typescript
export interface CourseEquivalency {
  id: string
  targetUciCourseId: string
  sourceInstitution: string
  sourceCourseCode: string
  sourceCourseTitle: string
  units: number
  minGradeRequired?: GradeLetter
  articulationType: 'OFFICIAL_ASSIST' | 'DEPARTMENT_DIRECT' | 'PETITIONED'
}

export type EligibilityStatus =
  | 'ELIGIBLE'
  | 'MISSING_PREREQUISITES'
  | 'TRANSFER_EQUIVALENCY_USED'
  | 'REQUIRES_REVIEW'
  | 'RESTRICTED'

export interface EligibilityResult {
  course: Course
  status: EligibilityStatus
  isEligible: boolean
  summary: string
  tree?: PrerequisiteEvaluationTree
  missingItems: string[]
  satisfiedItems: string[]
  transferEquivalentsUsed: Array<{
    uciCourse: string
    transferCourse: string
    institution: string
  }>
  warnings: string[]
}
```

---

## 5. Prerequisite Evaluation Algorithm

1. **Equivalency Resolution:**
   The engine builds an in-memory index mapping transfer courses taken by the student to target UCI courses (verifying that the transfer grade meets the articulation minimum, default `C`).
2. **Recursive Node Evaluation:**
   - **`course` Node:** Checks if either the exact UCI course or an approved transfer equivalent is present in the student's completed/in-progress history with `isGradeSufficient(studentGrade, minGrade)`.
   - **`and` Node:** Evaluates all child nodes. Returns satisfied if and only if **all** children are satisfied. Collects missing items from all failed branches.
   - **`or` Node:** Evaluates child nodes. Returns satisfied if **any** child is satisfied. If none are satisfied, summarizes the available alternate choices.
   - **`class_standing` Node:** Compares student standing against numerical hierarchy (`Freshman`=1 < `Sophomore`=2 < `Junior`=3 < `Senior`=4).
   - **`units` Node:** Validates total earned units (optionally filtered by department).
3. **Status Determination:**
   - If not satisfied → `MISSING_PREREQUISITES`.
   - If satisfied and any prerequisite node was satisfied via transfer articulation → `TRANSFER_EQUIVALENCY_USED`.
   - If satisfied normally → `ELIGIBLE`.
   - If standing or major restrictions block enrollment → `RESTRICTED`.

---

## 6. User Interface & Interactive Experience

- **Persona Quick Switcher:** Students or evaluators can immediately switch between 4 realistic UCI profiles:
  1. *Incoming Freshman (Peter Anteater):* 0 units, clean slate.
  2. *Continuing CS Sophomore:* Python series & Calc completed, gearing up for C++ and Data Structures.
  3. *Transfer Student (Mt. SAC):* Transferred with articulated Calc, Linear Algebra (MATH 260), and C++ programming.
  4. *Mathematics Junior:* Multi-variable, Linear Algebra, Proofs (MATH 13) completed; ready for Real Analysis (MATH 140A).
- **Search & Department Filters:** Quick filtering by department (`ICS`, `MATH`, `All`), eligibility status (`All`, `Eligible Only`, `Missing Prerequisites`), and text search (code, title, instructor).
- **Course Card & AST Visualizer:** Each course card features:
  - Clear status badge (`✓ Eligible`, `Not Eligible Yet`, `Transfer Articulated`).
  - Next confirmed/expected UCI quarterly offerings.
  - Interactive drill-down drawer showing the full visual evaluation tree with color-coded nodes (`green` for satisfied, `red` for missing).
  - Quick toggle button to mark a course completed or uncompleted with instant recalculation.

---

## 7. Verification & Testing Strategy

- **Test Suite:** Vitest unit tests in `tests/academic-engine.test.ts`.
- **Cases Tested:**
  - Letter grade point ordering and minimum `C` boundary tests.
  - Pass (`P`) handling (satisfies `C` but not `B` if specified).
  - Class standing hierarchies (`Junior` satisfies `Sophomore` requirement).
  - Pure `AND` and pure `OR` boolean combinations.
  - Complex nested logic (e.g. `ICS 46` requiring `ICS 45C` AND `(ICS 33 OR EECS 40)`).
  - High-level multi-step sequence: `MATH 140A` (Real Analysis) requiring `MATH 13` AND `MATH 3A` AND `MATH 2D`.
  - Transfer articulation checks (Mt. SAC `MATH 260` → `MATH 3A`; Mt. SAC `CSCI 220` → `ICS 45C`).
  - Human-readable expression serialization.
- **Production Build:** `npm run build` (`tsc && vite build`) generating an optimized client bundle.

---

## 8. Milestone Roadmap

- **Phase 1 (Current):** Prerequisite AST engine, mock UCI catalog, transfer equivalencies, interactive eligibility dashboard, Vitest suite, README.
- **Phase 2:** Degree requirement engine (lower division, upper division, GE categories, major electives), manual course input modal, basic quarter planner.
- **Phase 3:** Actual quarterly offerings integration, deterministic Auto Plan constraint solver.
- **Phase 4:** Deterministic DegreeWorks PDF and unofficial transcript parser.
- **Phase 5:** Google Sign-In & private Google Drive `appDataFolder` backup/sync.
- **Phase 6:** GPA projection calculator, mobile polish, WCAG accessibility compliance.
