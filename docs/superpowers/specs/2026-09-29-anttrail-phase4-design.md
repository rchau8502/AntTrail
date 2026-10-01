# AntTrail Phase 4 Design Specification: DegreeWorks & Transcript Deterministic Parser

**Date:** 2026-09-29  
**Project:** AntTrail (`/Volumes/Crucial X9/AI/AntTrail`)  
**Scope:** Phase 4 (Deterministic StudentAccess Transcript Parser, DegreeWorks Audit Parser, Client-Side Sanitizer & Importer UI)  
**Status:** Approved for Implementation Planning  

---

## 1. Executive Summary & Problem Statement

UCI students currently have to manually enter every course they have completed one by one into tools, or manually verify what transfer credits were applied.

At UC Irvine, students have access to two primary academic progress documents:
1. **UCI StudentAccess Unofficial Transcript:** Text representation of quarterly enrollment history, grades, units, and transfer coursework from California Community Colleges or AP/IB exams.
2. **UCI DegreeWorks Audit Text / Export:** Structured block breakdown of Degree Requirements, General Education, Lower-Division, Upper-Division, and Elective categories with marked statuses (`Complete`, `In-Progress`, `Still Needed`).

Phase 4 introduces a **100% client-side, deterministic parser** that accepts raw text copied from StudentAccess or DegreeWorks, extracts completed courses, grades, units, and terms, maps them to recognized UCI courses and articulation rules, and loads them into AntTrail with zero server transmission.

---

## 2. Privacy & Deterministic Invariants

1. **Client-Side Privacy Invariant:**  
   Transcript and DegreeWorks text is processed entirely in the student's browser memory. No text or extracted records are ever sent over the internet or saved to an external server.
2. **PII Sanitization Invariant:**  
   Any identifying personal information (UCI Student ID number, full student name, date of birth, home address) encountered in the raw paste buffer is automatically stripped and ignored. Only academic records (term, course code, grade, units, status) are processed.
3. **Deterministic Parser Invariant (Zero AI / LLM):**  
   The parser uses strictly deterministic state machines, regular expressions, and catalog lookup tokenizers. No probabilistic LLM calls are involved.
4. **Transparent Conflict & Anomaly Handling:**  
   If an ambiguous course code is detected (e.g. typos, non-standard departmental shorthand), the parser marks it as requiring user review in the preview screen rather than guessing.

---

## 3. UCI Document Formats & Parsing Grammar

### 3.1. Format A: UCI StudentAccess Unofficial Transcript

```text
UNIVERSITY OF CALIFORNIA, IRVINE
UNOFFICIAL ACADEMIC RECORD

FALL QUARTER 2025
COURSE      TITLE                               UNITS   GRADE   PTS
COMPSCI ICS 31  INTRO TO PROGRAMMING I          4.00    A       16.00
MATH 2A         SINGLE VARIABLE CALCULUS I      4.00    A-      14.80
WRITING 39A     ACADEMIC WRITING                4.00    P       0.00
Quarter Units: 12.00   Quarter GPA: 3.85

WINTER QUARTER 2026
COURSE      TITLE                               UNITS   GRADE   PTS
COMPSCI ICS 32  PROG W/ SOFTWARE LIBS           4.00    B+      13.20
MATH 2B         SINGLE VARIABLE CALCULUS II     4.00    B       12.00
STATS 67        STATS FOR COMPUTER SCIENCE      4.00    A       16.00
Quarter Units: 12.00   Quarter GPA: 3.42

TRANSFER CREDIT / ADVANCED PLACEMENT
MT. SAN ANTONIO COLLEGE
MATH 260        CALC & ANALYTIC GEOMETRY        5.00    TA
(Equivalent to: UCI MATH 2A)
```

**Parsing Rules for Format A:**
- **Term Detection:** Matches `(FALL|WINTER|SPRING|SUMMER)\s+(QUARTER\s+)?(\d{4})` or `(F|W|S|M)(\d{2})`.
- **Course Line Tokenizer:**
  - Department code + course number: e.g. `(COMPSCI\s+)?ICS\s+31`, `MATH\s+2A`, `STATS\s+67`.
  - Units: Decimal or integer e.g. `4.00`, `4.0`, `4`.
  - Grade: Valid letter grade (`A+`, `A`, `A-`, `B+`, `B`, `B-`, `C+`, `C`, `C-`, `D+`, `D`, `D-`, `F`, `P`, `NP`, `IP`, `TA`, `TB`, `TC`).
- **Transfer Articulation Detection:** Matches transfer institution name and maps course codes to target UCI courses via `OFFICIAL_TRANSFER_EQUIVALENCIES`.

### 3.2. Format B: DegreeWorks Text Export

```text
Degree in Bachelor of Science
Major: Computer Science B.S.
Catalog Year: 2026-2027

Lower Division Requirements
[X] Introduction to Programming
    Applied: Fall 2025  ICS 31  Intro to Programming I  4  A
[X] Programming with Software Libraries
    Applied: Winter 2026  ICS 32  Prog w/ Software Libs  4  B+
[ ] Intermediate Programming
    Still Needed: 1 Class in ICS 33 or CSE 43
[X] Single-Variable Calculus
    Applied: Fall 2025  MATH 2A  Calculus I  4  A-
```

**Parsing Rules for Format B:**
- Matches `Applied:\s*(Fall|Winter|Spring|Summer)?\s*(\d{4})?\s*([A-Z]{2,8}\s+\d+[A-Z]?)\s+([A-Za-z0-9\s/]+)\s+(\d+(?:\.\d+)?)\s+([A-F][+-]?|P|NP|IP|T[A-C])`.

---

## 4. Parser Architecture & Module Boundaries

```
src/academic-engine/parser/
├── types.ts              # ParsedCourseCandidate, ParseResult, ImportFormat
├── transcriptParser.ts   # Deterministic StudentAccess regex state machine
├── degreeWorksParser.ts  # Deterministic DegreeWorks line matcher
└── parser.ts             # Auto-detector dispatcher & deduplicator
```

### Key Data Structures

```typescript
export interface ParsedCourseCandidate {
  id: string
  rawLine: string
  courseCode: string       // e.g. "ICS 31"
  normalizedCode: string   // e.g. "ICS 31"
  title?: string           // e.g. "Intro to Programming I"
  units: number            // e.g. 4
  grade: GradeLetter       // e.g. "A"
  term: string             // e.g. "Fall 2025"
  status: 'COMPLETED' | 'IN_PROGRESS' | 'TRANSFER'
  institution?: string     // e.g. "UCI" or "Mt. San Antonio College"
  isArticulation: boolean
  matchedCatalogCourse?: Course
  confidence: 'HIGH' | 'MEDIUM' | 'LOW'
  selected: boolean        // For UI checklist selection
}

export interface ParseResult {
  detectedFormat: 'STUDENT_ACCESS' | 'DEGREE_WORKS' | 'GENERIC_LIST' | 'UNKNOWN'
  courses: ParsedCourseCandidate[]
  totalUnitsExtracted: number
  warnings: string[]
  sanitizedPiiCount: number
}
```

---

## 5. UI & Interaction Flow

1. **Trigger:** "Import Transcript" button in `Navbar.tsx` and in `StudentCourseDrawer.tsx`.
2. **Modal View (`ImportTranscriptModal.tsx`):**
   - **Input Screen:** Large textarea with paste support, `.txt` file drag-and-drop, and "Load Sample Transcript" button for immediate demonstration.
   - **Auto-Detection Badge:** Shows format detected (`UCI StudentAccess`, `DegreeWorks`, or `Course List`).
   - **Interactive Preview Table:**
     - Checkbox per row (select/deselect).
     - Editable fields for Course Code, Term, Units, and Grade.
     - Status badges (`Matched in Catalog`, `Transfer Articulated`, `Manual Review Needed`).
   - **Import Action:** "Import X Courses" replaces or merges with existing `StudentProfile.courseHistory`, recalculates units and standing, and updates all views.

---

## 6. Testing Strategy

1. **Unit Tests (`tests/parser-engine.test.ts`):**
   - Test standard StudentAccess paste with multiple quarters and grades (`A` through `F`, `P`).
   - Test StudentAccess transfer coursework with community college equivalencies.
   - Test DegreeWorks paste with `Applied` lines and `Still Needed` lines.
   - Test PII redaction (ignores student IDs like `12345678`, names, emails).
   - Test noisy inputs (extra whitespaces, header lines, GPA summary lines).
2. **Build Verification:**
   - Full Vitest suite passing.
   - TypeScript 0 errors with `noUnusedLocals`.
