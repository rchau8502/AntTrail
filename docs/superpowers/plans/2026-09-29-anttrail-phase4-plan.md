# AntTrail Phase 4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a 100% client-side, deterministic parser for UCI StudentAccess unofficial transcripts and DegreeWorks audit exports, complete with PII sanitization and an interactive preview/confirmation UI.

**Architecture:** Extend `academic-engine/parser/` with deterministic regular expression state machines (`transcriptParser.ts`, `degreeWorksParser.ts`, and unified dispatcher `parser.ts`). Build `ImportTranscriptModal.tsx` for copy-paste/file-upload with row editing, verification against catalog & articulation tables, and seamless merging into the active student profile.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Vite, Vitest.

---

## File Changes & Responsibilities

```
/Volumes/Crucial X9/AI/AntTrail
├── src/
│   ├── academic-engine/
│   │   ├── parser/
│   │   │   ├── types.ts              # ParsedCourseCandidate, ParseResult, ImportFormat
│   │   │   ├── transcriptParser.ts   # Deterministic UCI StudentAccess text state machine
│   │   │   ├── degreeWorksParser.ts  # Deterministic DegreeWorks audit line parser
│   │   │   ├── genericListParser.ts  # Fallback shorthand list parser (e.g. "ICS 31 A 4, MATH 2A A- 4")
│   │   │   └── parser.ts             # Auto-detector dispatcher, PII sanitizer & catalog matcher
│   ├── data/
│   │   └── mock/
│   │       └── sampleTranscripts.ts  # Realistic sample StudentAccess and DegreeWorks text snippets
│   ├── components/
│   │   ├── Navbar.tsx                # Added "Import Transcript" button with modal trigger
│   │   ├── StudentCourseDrawer.tsx   # Added "Import from Transcript" action
│   │   └── parser/
│   │       └── ImportTranscriptModal.tsx # Interactive paste, preview, row-edit, and import modal
│   └── App.tsx                       # State handler for bulk course import & profile re-evaluation
├── tests/
│   └── parser-engine.test.ts         # Comprehensive Vitest tests for deterministic parsers
└── README.md                         # Updated with Phase 4 completion
```

---

## Tasks

- [x] **Task 1: Define Parser Types & Mock Sample Transcripts**
  - Add `ParsedCourseCandidate`, `ParseResult`, `ParserFormat` to `src/academic-engine/parser/types.ts`.
  - Create `src/data/mock/sampleTranscripts.ts` containing realistic UCI StudentAccess transcripts and DegreeWorks exports.

- [x] **Task 2: Implement Deterministic Parser Engines**
  - Implement `src/academic-engine/parser/transcriptParser.ts` for quarterly StudentAccess text blocks and transfer credit sections.
  - Implement `src/academic-engine/parser/degreeWorksParser.ts` for DegreeWorks `Applied:` lines.
  - Implement `src/academic-engine/parser/genericListParser.ts` for casual shorthand lists.
  - Implement `src/academic-engine/parser/parser.ts` to auto-detect format, sanitize PII, match against catalog courses, and check articulation.

- [x] **Task 3: Build Comprehensive Parser Tests (`tests/parser-engine.test.ts`)**
  - Verify parsing of multi-quarter StudentAccess transcripts with varying grades (`A` to `F`, `P`, `NP`).
  - Verify parsing of community college transfer credit (`MATH 260` -> `MATH 2A`).
  - Verify parsing of DegreeWorks audit blocks.
  - Verify PII redaction (student ID numbers, student names, GPA summaries).
  - Verify noisy input tolerance (tabs, multiple spaces, header lines).

- [x] **Task 4: Build Interactive `ImportTranscriptModal.tsx`**
  - Textarea with paste listener, drag-and-drop file upload, and "Try Sample Transcript" button.
  - Format detection badge.
  - Review table with course code, title, term, units, grade, and catalog matching badge.
  - Checkbox per row for inclusion/exclusion.
  - Import Options: "Replace Entire History" vs "Merge with Existing Record".

- [x] **Task 5: Wire Importer into Navbar, Drawer, and App.tsx**
  - Add "Import Transcript" button to `Navbar.tsx` and `StudentCourseDrawer.tsx`.
  - Connect import callback in `App.tsx` to update `profile.courseHistory`, recalculate units and standing, and re-run eligibility/degree audits.

- [x] **Task 6: Verification & Preflight Build**
  - Run `npm test` (all tests passing).
  - Run `npm run build` (0 TypeScript errors).

- [x] **Task 7: Documentation & Commit**
  - Update `README.md` to reflect Phase 4 completion.
  - Commit changes to `main`.
