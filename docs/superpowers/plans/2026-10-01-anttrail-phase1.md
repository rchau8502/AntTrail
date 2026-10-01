# AntTrail Phase 1 Implementation Plan: Academic Rules Engine & Eligibility Prototype

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production-ready Phase 1 foundation for AntTrail, featuring a framework-agnostic deterministic UCI prerequisite AST evaluator, full-catalog eligibility engine with transfer articulation, official UCI GPA calculator, versioned 2026-27 mock catalog (ICS & MATH sequences), privacy-first local storage with export/import, and an AntAlmanac-inspired reactive React prototype UI.

**Architecture:** Pure client-side SPA with a decoupled TypeScript academic rules engine (`src/academic-engine/`) completely free of UI/DOM dependencies. The engine processes AST trees for boolean prerequisites and evaluates student records against public catalog data. The UI (`src/app/`) provides reactive state management with instant eligibility updates, zero server-side persistence, and full JSON backup/restore.

**Tech Stack:** React 18 / 19, TypeScript, Vite, Tailwind CSS, Lucide React, Vitest, Testing Library.

---

### Task 1: Project Setup & Tooling Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Test: Run `npm run build` or `npm test`

- [ ] **Step 1: Create `package.json` with scripts and dependencies**

```json
{
  "name": "anttrail",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1",
    "@types/node": "^22.8.6",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.10",
    "vitest": "^2.1.4"
  }
}
```

- [ ] **Step 2: Create TypeScript configs (`tsconfig.json`, `tsconfig.node.json`) with path aliases**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 3: Create `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, and `src/index.css`**

`vite.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
});
```

`tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zot: {
          blue: '#0064a4',
          gold: '#ffd200',
          darkBlue: '#1b3d6d',
          lightBlue: '#e6f1f8',
        }
      }
    },
  },
  plugins: [],
}
```

`postcss.config.js`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

`index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AntTrail - UCI Academic Planner</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%22%20%22100%22><text y=%22.9em%22 font-size=%2290%22>🐜</text></svg>" />
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased">
    <div id="root"></div>
    <script type="module" src="/src/app/main.tsx"></script>
  </body>
</html>
```

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```

- [ ] **Step 4: Install dependencies using `npm install` and verify build setup**

Run: `npm install`  
Expected: packages installed successfully without fatal errors.

- [ ] **Step 5: Commit initial setup**

```bash
git add package.json tsconfig.json tsconfig.node.json vite.config.ts tailwind.config.js postcss.config.js index.html src/index.css
git commit -m "chore: setup Vite, TypeScript, Tailwind, and Vitest configuration"
```

---

### Task 2: Academic Engine - Domain Types & Prerequisite AST Models

**Files:**
- Create: `src/academic-engine/types.ts`
- Test: `src/academic-engine/__tests__/types.test.ts`

- [ ] **Step 1: Write type verification test in `src/academic-engine/__tests__/types.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { Course, PrereqNode, StudentProfile, UCIGrade } from '../types';

describe('Academic Engine Types', () => {
  it('instantiates valid Course and PrereqNode AST objects', () => {
    const prereq: PrereqNode = {
      type: 'and',
      children: [
        { type: 'course', courseId: 'MATH_2B', minGrade: 'C' },
        {
          type: 'or',
          children: [
            { type: 'course', courseId: 'MATH_3A' },
            { type: 'course', courseId: 'MATH_6G' },
          ],
        },
      ],
    };

    const course: Course = {
      id: 'MATH_105A',
      code: 'MATH 105A',
      department: 'MATH',
      number: '105A',
      title: 'Numerical Analysis I',
      units: 4,
      description: 'Introduction to numerical analysis.',
      prerequisites: prereq,
      prereqString: 'MATH 2B and (MATH 3A or MATH 6G)',
    };

    expect(course.id).toBe('MATH_105A');
    expect(course.prerequisites?.type).toBe('and');
  });

  it('instantiates valid StudentProfile with UCIGrade', () => {
    const grades: UCIGrade[] = ['A+', 'A', 'A-', 'B', 'C', 'P', 'NP'];
    const profile: StudentProfile = {
      catalogYear: '2026-27',
      major: 'Computer Science B.S.',
      classStanding: 'Junior',
      courses: [
        {
          id: 'rec-1',
          courseId: 'MATH_2A',
          term: 'Fall 2025',
          grade: 'A',
        },
      ],
    };
    expect(grades).toContain(profile.courses[0].grade);
    expect(profile.classStanding).toBe('Junior');
  });
});
```

- [ ] **Step 2: Run test to verify it fails before creating `types.ts`**

Run: `npx vitest run src/academic-engine/__tests__/types.test.ts`  
Expected: FAIL with "Cannot find module '../types'"

- [ ] **Step 3: Implement `src/academic-engine/types.ts`**

```ts
export type UCIGrade =
  | 'A+' | 'A' | 'A-'
  | 'B+' | 'B' | 'B-'
  | 'C+' | 'C' | 'C-'
  | 'D+' | 'D' | 'D-'
  | 'F'  | 'P' | 'NP' | 'IP';

export type ClassStanding = 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';

export type PrereqNode =
  | {
      type: 'course';
      courseId: string;
      minGrade?: UCIGrade;
      corequisite?: boolean;
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
      level: ClassStanding;
    }
  | {
      type: 'major_restriction';
      majors: string[];
      mode: 'only' | 'exclude';
    };

export interface Course {
  id: string;
  code: string;
  department: string;
  number: string;
  title: string;
  units: number;
  description: string;
  prerequisites: PrereqNode | null;
  prereqString?: string;
  geCategories?: string[];
}

export interface StudentCourse {
  id: string;
  courseId: string;
  term: string;
  grade: UCIGrade;
  isTransfer?: boolean;
  transferInstitution?: string;
  transferEquivalentCourseId?: string;
}

export interface StudentProfile {
  studentId?: string;
  catalogYear: string;
  major: string;
  classStanding: ClassStanding;
  courses: StudentCourse[];
}

export type ArticulationStatus = 'CONFIRMED' | 'REQUIRES_CLEARANCE' | 'HISTORICAL';

export interface CourseEquivalency {
  sourceInstitution: string;
  sourceCourseCode: string;
  targetUciCourseId: string;
  articulationStatus: ArticulationStatus;
  effectiveYears?: string;
}

export type OfferingConfidence = 'CONFIRMED' | 'EXPECTED' | 'LIKELY' | 'UNKNOWN';

export interface CourseOffering {
  courseId: string;
  term: string;
  confidence: OfferingConfidence;
  sectionsAvailable?: boolean;
}

export type CourseEligibilityStatus =
  | 'ELIGIBLE'
  | 'MISSING_PREREQUISITES'
  | 'TRANSFER_EQUIVALENCY_USED'
  | 'REQUIRES_REVIEW'
  | 'RESTRICTED'
  | 'ALREADY_COMPLETED';

export interface PrereqEvaluationResult {
  isSatisfied: boolean;
  status: CourseEligibilityStatus;
  missingReasons: string[];
  satisfiedDetails: string[];
  transferEquivalencyUsed?: {
    sourceInstitution: string;
    sourceCourse: string;
    uciCourse: string;
    articulationStatus: ArticulationStatus;
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/academic-engine/__tests__/types.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit domain types**

```bash
git add src/academic-engine/types.ts src/academic-engine/__tests__/types.test.ts
git commit -m "feat(engine): define academic engine domain types and prerequisite AST models"
```

---

### Task 3: Academic Engine - Prerequisite Boolean Evaluator (TDD)

**Files:**
- Create: `src/academic-engine/prerequisites.ts`
- Test: `src/academic-engine/__tests__/prerequisites.test.ts`

- [ ] **Step 1: Write comprehensive test suite in `src/academic-engine/__tests__/prerequisites.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { evaluatePrerequisites, compareGrades } from '../prerequisites';
import { PrereqNode, StudentProfile, CourseEquivalency } from '../types';

describe('prerequisites AST evaluator', () => {
  const baseStudent: StudentProfile = {
    catalogYear: '2026-27',
    major: 'Computer Science B.S.',
    classStanding: 'Junior',
    courses: [],
  };

  const equivalencies: CourseEquivalency[] = [
    {
      sourceInstitution: 'Mt. San Antonio College',
      sourceCourseCode: 'MATH 260',
      targetUciCourseId: 'MATH_2A',
      articulationStatus: 'CONFIRMED',
    },
  ];

  it('returns ELIGIBLE when node is null (no prerequisites)', () => {
    const result = evaluatePrerequisites(null, baseStudent, equivalencies);
    expect(result.isSatisfied).toBe(true);
    expect(result.status).toBe('ELIGIBLE');
    expect(result.missingReasons).toEqual([]);
  });

  it('evaluates single course prerequisite with passing grade', () => {
    const studentWithMath2A: StudentProfile = {
      ...baseStudent,
      courses: [
        { id: '1', courseId: 'MATH_2A', term: 'Fall 2025', grade: 'B' },
      ],
    };

    const node: PrereqNode = { type: 'course', courseId: 'MATH_2A', minGrade: 'C' };
    const result = evaluatePrerequisites(node, studentWithMath2A, equivalencies);

    expect(result.isSatisfied).toBe(true);
    expect(result.status).toBe('ELIGIBLE');
    expect(result.satisfiedDetails.length).toBeGreaterThan(0);
  });

  it('fails course prerequisite when grade is below minGrade', () => {
    const studentWithLowGrade: StudentProfile = {
      ...baseStudent,
      courses: [
        { id: '1', courseId: 'MATH_2A', term: 'Fall 2025', grade: 'D' },
      ],
    };

    const node: PrereqNode = { type: 'course', courseId: 'MATH_2A', minGrade: 'C' };
    const result = evaluatePrerequisites(node, studentWithLowGrade, equivalencies);

    expect(result.isSatisfied).toBe(false);
    expect(result.status).toBe('MISSING_PREREQUISITES');
    expect(result.missingReasons).toContain('MATH_2A (Minimum grade C required, earned D)');
  });

  it('evaluates AND node correctly requiring all children to be satisfied', () => {
    const node: PrereqNode = {
      type: 'and',
      children: [
        { type: 'course', courseId: 'MATH_13' },
        { type: 'course', courseId: 'MATH_3A' },
      ],
    };

    const studentMissingMath3A: StudentProfile = {
      ...baseStudent,
      courses: [
        { id: '1', courseId: 'MATH_13', term: 'Fall 2025', grade: 'A' },
      ],
    };

    const result = evaluatePrerequisites(node, studentMissingMath3A, equivalencies);
    expect(result.isSatisfied).toBe(false);
    expect(result.status).toBe('MISSING_PREREQUISITES');
    expect(result.missingReasons).toContain('Missing: MATH_3A');
  });

  it('evaluates OR node correctly when at least one child is satisfied', () => {
    const node: PrereqNode = {
      type: 'or',
      children: [
        { type: 'course', courseId: 'MATH_3A' },
        { type: 'course', courseId: 'MATH_6G' },
      ],
    };

    const studentWithMath6G: StudentProfile = {
      ...baseStudent,
      courses: [
        { id: '1', courseId: 'MATH_6G', term: 'Fall 2025', grade: 'B' },
      ],
    };

    const result = evaluatePrerequisites(node, studentWithMath6G, equivalencies);
    expect(result.isSatisfied).toBe(true);
    expect(result.status).toBe('ELIGIBLE');
  });

  it('handles transfer course articulation to satisfy prerequisite', () => {
    const studentWithTransfer: StudentProfile = {
      ...baseStudent,
      courses: [
        {
          id: '1',
          courseId: 'MTSAC_MATH_260',
          term: 'Spring 2025',
          grade: 'A',
          isTransfer: true,
          transferInstitution: 'Mt. San Antonio College',
          transferEquivalentCourseId: 'MATH_2A',
        },
      ],
    };

    const node: PrereqNode = { type: 'course', courseId: 'MATH_2A' };
    const result = evaluatePrerequisites(node, studentWithTransfer, equivalencies);

    expect(result.isSatisfied).toBe(true);
    expect(result.status).toBe('TRANSFER_EQUIVALENCY_USED');
    expect(result.satisfiedDetails[0]).toContain('Mt. San Antonio College');
  });

  it('evaluates class standing and major restriction nodes', () => {
    const standingNode: PrereqNode = { type: 'standing', level: 'Senior' };
    const studentJunior: StudentProfile = { ...baseStudent, classStanding: 'Junior' };

    const result = evaluatePrerequisites(standingNode, studentJunior, equivalencies);
    expect(result.isSatisfied).toBe(false);
    expect(result.status).toBe('RESTRICTED');
    expect(result.missingReasons).toContain('Requires Senior standing (Current: Junior)');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/academic-engine/__tests__/prerequisites.test.ts`  
Expected: FAIL with "Cannot find module '../prerequisites'"

- [ ] **Step 3: Implement `src/academic-engine/prerequisites.ts`**

```ts
import {
  PrereqNode,
  StudentProfile,
  CourseEquivalency,
  PrereqEvaluationResult,
  UCIGrade,
  ClassStanding,
} from './types';

const GRADE_HIERARCHY: Record<UCIGrade, number> = {
  'A+': 12,
  'A': 11,
  'A-': 10,
  'B+': 9,
  'B': 8,
  'B-': 7,
  'C+': 6,
  'C': 5,
  'C-': 4,
  'D+': 3,
  'D': 2,
  'D-': 1,
  'F': 0,
  'P': 5, // Equivalent to C or better
  'NP': 0,
  'IP': 0,
};

const STANDING_RANK: Record<ClassStanding, number> = {
  Freshman: 1,
  Sophomore: 2,
  Junior: 3,
  Senior: 4,
};

export function compareGrades(earned: UCIGrade, required: UCIGrade): boolean {
  return GRADE_HIERARCHY[earned] >= GRADE_HIERARCHY[required];
}

export function evaluatePrerequisites(
  node: PrereqNode | null,
  student: StudentProfile,
  equivalencies: CourseEquivalency[] = []
): PrereqEvaluationResult {
  if (!node) {
    return {
      isSatisfied: true,
      status: 'ELIGIBLE',
      missingReasons: [],
      satisfiedDetails: ['No prerequisites required.'],
    };
  }

  switch (node.type) {
    case 'course': {
      const minGrade: UCIGrade = node.minGrade || 'D-';

      // 1. Direct completion at UCI
      const directMatch = student.courses.find(c => c.courseId === node.courseId);
      if (directMatch) {
        if (compareGrades(directMatch.grade, minGrade)) {
          return {
            isSatisfied: true,
            status: 'ELIGIBLE',
            missingReasons: [],
            satisfiedDetails: [`${node.courseId} completed with grade ${directMatch.grade}`],
          };
        } else {
          return {
            isSatisfied: false,
            status: 'MISSING_PREREQUISITES',
            missingReasons: [
              `${node.courseId} (Minimum grade ${minGrade} required, earned ${directMatch.grade})`,
            ],
            satisfiedDetails: [],
          };
        }
      }

      // 2. Transfer equivalency mapping
      const transferMatch = student.courses.find(c => {
        if (!c.isTransfer) return false;
        if (c.transferEquivalentCourseId === node.courseId) return true;
        // Check through official equivalencies table
        return equivalencies.some(
          eq =>
            eq.targetUciCourseId === node.courseId &&
            eq.sourceInstitution === c.transferInstitution &&
            eq.sourceCourseCode === c.courseId
        );
      });

      if (transferMatch) {
        if (compareGrades(transferMatch.grade, minGrade)) {
          const status = transferMatch.transferInstitution ? 'TRANSFER_EQUIVALENCY_USED' : 'ELIGIBLE';
          return {
            isSatisfied: true,
            status,
            missingReasons: [],
            satisfiedDetails: [
              `${node.courseId} satisfied via transfer: ${transferMatch.transferInstitution || 'Transfer'} (${transferMatch.courseId})`,
            ],
            transferEquivalencyUsed: {
              sourceInstitution: transferMatch.transferInstitution || 'Transfer Institution',
              sourceCourse: transferMatch.courseId,
              uciCourse: node.courseId,
              articulationStatus: 'CONFIRMED',
            },
          };
        } else {
          return {
            isSatisfied: false,
            status: 'MISSING_PREREQUISITES',
            missingReasons: [
              `Transfer course for ${node.courseId} earned ${transferMatch.grade}, but minimum ${minGrade} required`,
            ],
            satisfiedDetails: [],
          };
        }
      }

      // Not found
      return {
        isSatisfied: false,
        status: 'MISSING_PREREQUISITES',
        missingReasons: [`Missing: ${node.courseId}`],
        satisfiedDetails: [],
      };
    }

    case 'and': {
      let isAllSatisfied = true;
      const missingReasons: string[] = [];
      const satisfiedDetails: string[] = [];
      let usedTransfer = false;
      let isRestricted = false;

      for (const child of node.children) {
        const childResult = evaluatePrerequisites(child, student, equivalencies);
        if (!childResult.isSatisfied) {
          isAllSatisfied = false;
          missingReasons.push(...childResult.missingReasons);
          if (childResult.status === 'RESTRICTED') isRestricted = true;
        } else {
          satisfiedDetails.push(...childResult.satisfiedDetails);
          if (childResult.status === 'TRANSFER_EQUIVALENCY_USED') usedTransfer = true;
        }
      }

      return {
        isSatisfied: isAllSatisfied,
        status: isAllSatisfied
          ? usedTransfer
            ? 'TRANSFER_EQUIVALENCY_USED'
            : 'ELIGIBLE'
          : isRestricted
          ? 'RESTRICTED'
          : 'MISSING_PREREQUISITES',
        missingReasons,
        satisfiedDetails,
      };
    }

    case 'or': {
      const allMissing: string[] = [];
      const satisfiedOptions: string[] = [];
      let hasTransfer = false;

      for (const child of node.children) {
        const childResult = evaluatePrerequisites(child, student, equivalencies);
        if (childResult.isSatisfied) {
          satisfiedOptions.push(...childResult.satisfiedDetails);
          if (childResult.status === 'TRANSFER_EQUIVALENCY_USED') hasTransfer = true;
        } else {
          allMissing.push(...childResult.missingReasons);
        }
      }

      if (satisfiedOptions.length > 0) {
        return {
          isSatisfied: true,
          status: hasTransfer ? 'TRANSFER_EQUIVALENCY_USED' : 'ELIGIBLE',
          missingReasons: [],
          satisfiedDetails: satisfiedOptions,
        };
      }

      return {
        isSatisfied: false,
        status: 'MISSING_PREREQUISITES',
        missingReasons: [`At least one required: [${allMissing.join(' OR ')}]`],
        satisfiedDetails: [],
      };
    }

    case 'standing': {
      const studentRank = STANDING_RANK[student.classStanding];
      const requiredRank = STANDING_RANK[node.level];
      const isSatisfied = studentRank >= requiredRank;
      return {
        isSatisfied,
        status: isSatisfied ? 'ELIGIBLE' : 'RESTRICTED',
        missingReasons: isSatisfied
          ? []
          : [`Requires ${node.level} standing (Current: ${student.classStanding})`],
        satisfiedDetails: isSatisfied ? [`Meets ${node.level} standing requirement`] : [],
      };
    }

    case 'major_restriction': {
      const majorMatch = node.majors.includes(student.major);
      const isSatisfied = node.mode === 'only' ? majorMatch : !majorMatch;
      return {
        isSatisfied,
        status: isSatisfied ? 'ELIGIBLE' : 'RESTRICTED',
        missingReasons: isSatisfied
          ? []
          : [
              node.mode === 'only'
                ? `Restricted to majors: ${node.majors.join(', ')} (Current: ${student.major})`
                : `Excluded for majors: ${node.majors.join(', ')}`,
            ],
        satisfiedDetails: isSatisfied ? [`Meets major eligibility (${student.major})`] : [],
      };
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/academic-engine/__tests__/prerequisites.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit prerequisite engine**

```bash
git add src/academic-engine/prerequisites.ts src/academic-engine/__tests__/prerequisites.test.ts
git commit -m "feat(engine): implement AST prerequisite boolean evaluator with transfer mapping"
```

---

### Task 4: Academic Engine - Transfer Articulation & Catalog Eligibility Evaluator (TDD)

**Files:**
- Create: `src/academic-engine/eligibility.ts`
- Test: `src/academic-engine/__tests__/eligibility.test.ts`

- [ ] **Step 1: Write tests for full catalog eligibility in `src/academic-engine/__tests__/eligibility.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { evaluateCatalogEligibility } from '../eligibility';
import { Course, StudentProfile, CourseEquivalency } from '../types';

describe('evaluateCatalogEligibility', () => {
  const sampleCourses: Course[] = [
    {
      id: 'MATH_2A',
      code: 'MATH 2A',
      department: 'MATH',
      number: '2A',
      title: 'Calculus I',
      units: 4,
      description: 'Single-variable calc I',
      prerequisites: null,
    },
    {
      id: 'MATH_2B',
      code: 'MATH 2B',
      department: 'MATH',
      number: '2B',
      title: 'Calculus II',
      units: 4,
      description: 'Single-variable calc II',
      prerequisites: { type: 'course', courseId: 'MATH_2A' },
    },
    {
      id: 'MATH_2D',
      code: 'MATH 2D',
      department: 'MATH',
      number: '2D',
      title: 'Multivariable Calculus I',
      units: 4,
      description: 'Multivariable calculus',
      prerequisites: { type: 'course', courseId: 'MATH_2B' },
    },
  ];

  it('marks uncompleted courses without prerequisites as ELIGIBLE', () => {
    const student: StudentProfile = {
      catalogYear: '2026-27',
      major: 'Mathematics B.S.',
      classStanding: 'Freshman',
      courses: [],
    };

    const results = evaluateCatalogEligibility(sampleCourses, student, []);
    expect(results['MATH_2A'].status).toBe('ELIGIBLE');
    expect(results['MATH_2B'].status).toBe('MISSING_PREREQUISITES');
  });

  it('marks completed courses as ALREADY_COMPLETED', () => {
    const student: StudentProfile = {
      catalogYear: '2026-27',
      major: 'Mathematics B.S.',
      classStanding: 'Freshman',
      courses: [
        { id: 'c1', courseId: 'MATH_2A', term: 'Fall 2025', grade: 'A' },
      ],
    };

    const results = evaluateCatalogEligibility(sampleCourses, student, []);
    expect(results['MATH_2A'].status).toBe('ALREADY_COMPLETED');
    expect(results['MATH_2B'].status).toBe('ELIGIBLE');
    expect(results['MATH_2D'].status).toBe('MISSING_PREREQUISITES');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/academic-engine/__tests__/eligibility.test.ts`  
Expected: FAIL with "Cannot find module '../eligibility'"

- [ ] **Step 3: Implement `src/academic-engine/eligibility.ts`**

```ts
import {
  Course,
  StudentProfile,
  CourseEquivalency,
  PrereqEvaluationResult,
} from './types';
import { evaluatePrerequisites } from './prerequisites';

export type CatalogEligibilityMap = Record<string, PrereqEvaluationResult>;

export function evaluateCatalogEligibility(
  courses: Course[],
  student: StudentProfile,
  equivalencies: CourseEquivalency[] = []
): CatalogEligibilityMap {
  const map: CatalogEligibilityMap = {};

  for (const course of courses) {
    // Check if course is already completed by student
    const isCompleted = student.courses.some(
      c =>
        c.courseId === course.id ||
        c.transferEquivalentCourseId === course.id
    );

    if (isCompleted) {
      map[course.id] = {
        isSatisfied: true,
        status: 'ALREADY_COMPLETED',
        missingReasons: [],
        satisfiedDetails: ['Course already completed by student.'],
      };
      continue;
    }

    // Evaluate prerequisites
    map[course.id] = evaluatePrerequisites(course.prerequisites, student, equivalencies);
  }

  return map;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/academic-engine/__tests__/eligibility.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit catalog eligibility engine**

```bash
git add src/academic-engine/eligibility.ts src/academic-engine/__tests__/eligibility.test.ts
git commit -m "feat(engine): implement full catalog eligibility evaluator"
```

---

### Task 5: Academic Engine - Official UCI GPA Engine (TDD)

**Files:**
- Create: `src/academic-engine/gpa.ts`
- Test: `src/academic-engine/__tests__/gpa.test.ts`

- [ ] **Step 1: Write GPA calculation tests in `src/academic-engine/__tests__/gpa.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { calculateUciGpa, getGradePoints } from '../gpa';
import { StudentCourse } from '../types';

describe('UCI GPA Calculator', () => {
  it('returns correct grade point values for official UCI scale', () => {
    expect(getGradePoints('A+')).toBe(4.0);
    expect(getGradePoints('A')).toBe(4.0);
    expect(getGradePoints('A-')).toBe(3.7);
    expect(getGradePoints('B+')).toBe(3.3);
    expect(getGradePoints('B')).toBe(3.0);
    expect(getGradePoints('C')).toBe(2.0);
    expect(getGradePoints('F')).toBe(0.0);
    expect(getGradePoints('P')).toBeNull();
    expect(getGradePoints('NP')).toBeNull();
  });

  it('calculates weighted UCI GPA correctly', () => {
    const courses: (StudentCourse & { units: number })[] = [
      { id: '1', courseId: 'MATH_2A', term: 'Fall 2025', grade: 'A', units: 4 }, // 16.0
      { id: '2', courseId: 'MATH_2B', term: 'Winter 2026', grade: 'B', units: 4 }, // 12.0
      { id: '3', courseId: 'ICS_31', term: 'Fall 2025', grade: 'P', units: 4 }, // Excluded from GPA
    ];

    const result = calculateUciGpa(courses);
    // (16 + 12) / 8 = 28 / 8 = 3.50
    expect(result.gpa).toBe(3.5);
    expect(result.totalGpaUnits).toBe(8);
    expect(result.totalAttemptedUnits).toBe(12);
  });

  it('strictly excludes non-UC transfer courses from UCI GPA', () => {
    const courses: (StudentCourse & { units: number })[] = [
      { id: '1', courseId: 'MATH_2A', term: 'Fall 2025', grade: 'A', units: 4 }, // 16.0
      {
        id: '2',
        courseId: 'MTSAC_MATH_260',
        term: 'Spring 2025',
        grade: 'F', // Even if F, non-UC transfer does not affect UCI GPA
        units: 4,
        isTransfer: true,
        transferInstitution: 'Mt. San Antonio College',
      },
    ];

    const result = calculateUciGpa(courses);
    expect(result.gpa).toBe(4.0);
    expect(result.totalGpaUnits).toBe(4);
    expect(result.transferUnits).toBe(4);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/academic-engine/__tests__/gpa.test.ts`  
Expected: FAIL with "Cannot find module '../gpa'"

- [ ] **Step 3: Implement `src/academic-engine/gpa.ts`**

```ts
import { StudentCourse, UCIGrade } from './types';

const UCI_GRADE_POINTS: Partial<Record<UCIGrade, number>> = {
  'A+': 4.0,
  'A':  4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B':  3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C':  2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D':  1.0,
  'D-': 0.7,
  'F':  0.0,
};

export function getGradePoints(grade: UCIGrade): number | null {
  return UCI_GRADE_POINTS[grade] !== undefined ? UCI_GRADE_POINTS[grade]! : null;
}

export interface GpaCalculationResult {
  gpa: number;
  totalGpaUnits: number;
  totalAttemptedUnits: number;
  totalEarnedUnits: number;
  transferUnits: number;
}

export function calculateUciGpa(
  courses: (StudentCourse & { units?: number })[]
): GpaCalculationResult {
  let totalGradePoints = 0;
  let totalGpaUnits = 0;
  let totalAttemptedUnits = 0;
  let totalEarnedUnits = 0;
  let transferUnits = 0;

  for (const course of courses) {
    const units = course.units ?? 4;
    totalAttemptedUnits += units;

    // Transfer courses do NOT count towards UCI GPA
    if (course.isTransfer) {
      transferUnits += units;
      if (course.grade !== 'F' && course.grade !== 'NP') {
        totalEarnedUnits += units;
      }
      continue;
    }

    const points = getGradePoints(course.grade);
    if (points !== null) {
      totalGradePoints += points * units;
      totalGpaUnits += units;
    }

    if (course.grade !== 'F' && course.grade !== 'NP') {
      totalEarnedUnits += units;
    }
  }

  const gpa = totalGpaUnits > 0 ? Number((totalGradePoints / totalGpaUnits).toFixed(2)) : 0.0;

  return {
    gpa,
    totalGpaUnits,
    totalAttemptedUnits,
    totalEarnedUnits,
    transferUnits,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/academic-engine/__tests__/gpa.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit GPA engine**

```bash
git add src/academic-engine/gpa.ts src/academic-engine/__tests__/gpa.test.ts
git commit -m "feat(engine): implement official UCI GPA calculation engine"
```

---

### Task 6: Mock Catalog Data (2026-27 ICS & MATH Sequences)

**Files:**
- Create: `src/data/catalog-years/2026-27/courses.json`
- Create: `src/data/catalog-years/2026-27/offerings.json`
- Create: `src/data/catalog-years/2026-27/transfer-articulation.json`
- Create: `src/data/loader.ts`
- Test: `src/data/__tests__/loader.test.ts`

- [ ] **Step 1: Create `src/data/catalog-years/2026-27/courses.json`**

```json
[
  {
    "id": "MATH_2A",
    "code": "MATH 2A",
    "department": "MATH",
    "number": "2A",
    "title": "Single-Variable Calculus I",
    "units": 4,
    "description": "Differential calculus and applications.",
    "prerequisites": null,
    "prereqString": "None"
  },
  {
    "id": "MATH_2B",
    "code": "MATH 2B",
    "department": "MATH",
    "number": "2B",
    "title": "Single-Variable Calculus II",
    "units": 4,
    "description": "Integral calculus and infinite series.",
    "prerequisites": {
      "type": "course",
      "courseId": "MATH_2A",
      "minGrade": "C"
    },
    "prereqString": "MATH 2A with a grade of C or better"
  },
  {
    "id": "MATH_2D",
    "code": "MATH 2D",
    "department": "MATH",
    "number": "2D",
    "title": "Multivariable Calculus I",
    "units": 4,
    "description": "Differential and integral calculus in several variables.",
    "prerequisites": {
      "type": "course",
      "courseId": "MATH_2B",
      "minGrade": "C"
    },
    "prereqString": "MATH 2B with a grade of C or better"
  },
  {
    "id": "MATH_3A",
    "code": "MATH 3A",
    "department": "MATH",
    "number": "3A",
    "title": "Introduction to Linear Algebra",
    "units": 4,
    "description": "Systems of linear equations, matrices, determinants, vector spaces.",
    "prerequisites": {
      "type": "course",
      "courseId": "MATH_2B",
      "minGrade": "C"
    },
    "prereqString": "MATH 2B with a grade of C or better"
  },
  {
    "id": "MATH_13",
    "code": "MATH 13",
    "department": "MATH",
    "number": "13",
    "title": "Introduction to Abstract Mathematics",
    "units": 4,
    "description": "Writing mathematical proofs, logic, set theory, functions.",
    "prerequisites": {
      "type": "course",
      "courseId": "MATH_2B",
      "minGrade": "C"
    },
    "prereqString": "MATH 2B with a grade of C or better"
  },
  {
    "id": "MATH_105A",
    "code": "MATH 105A",
    "department": "MATH",
    "number": "105A",
    "title": "Numerical Analysis I",
    "units": 4,
    "description": "Introduction to numerical methods, error analysis, algorithms.",
    "prerequisites": {
      "type": "and",
      "children": [
        { "type": "course", "courseId": "MATH_3A" },
        { "type": "course", "courseId": "MATH_2D" }
      ]
    },
    "prereqString": "MATH 3A and MATH 2D"
  },
  {
    "id": "MATH_140A",
    "code": "MATH 140A",
    "department": "MATH",
    "number": "140A",
    "title": "Elementary Analysis I",
    "units": 4,
    "description": "Rigorous treatment of real numbers, continuity, differentiation.",
    "prerequisites": {
      "type": "and",
      "children": [
        { "type": "course", "courseId": "MATH_13", "minGrade": "C" },
        { "type": "course", "courseId": "MATH_3A", "minGrade": "C" }
      ]
    },
    "prereqString": "MATH 13 and MATH 3A with grades of C or better"
  },
  {
    "id": "ICS_31",
    "code": "ICS 31",
    "department": "ICS",
    "number": "31",
    "title": "Introduction to Programming",
    "units": 4,
    "description": "Fundamental programming concepts in Python.",
    "prerequisites": null,
    "prereqString": "None"
  },
  {
    "id": "ICS_32",
    "code": "ICS 32",
    "department": "ICS",
    "number": "32",
    "title": "Programming with Software Libraries",
    "units": 4,
    "description": "Construction of software systems with standard libraries.",
    "prerequisites": {
      "type": "course",
      "courseId": "ICS_31",
      "minGrade": "C"
    },
    "prereqString": "ICS 31 with a grade of C or better"
  },
  {
    "id": "ICS_33",
    "code": "ICS 33",
    "department": "ICS",
    "number": "33",
    "title": "Intermediate Programming",
    "units": 4,
    "description": "Intermediate-level Python programming, design patterns, testing.",
    "prerequisites": {
      "type": "course",
      "courseId": "ICS_32",
      "minGrade": "C"
    },
    "prereqString": "ICS 32 with a grade of C or better"
  },
  {
    "id": "ICS_45C",
    "code": "ICS 45C",
    "department": "ICS",
    "number": "45C",
    "title": "Programming in C/C++ as a Second Language",
    "units": 4,
    "description": "Syntax and semantics of C/C++, pointers, memory management.",
    "prerequisites": {
      "type": "course",
      "courseId": "ICS_33",
      "minGrade": "C"
    },
    "prereqString": "ICS 33 with a grade of C or better"
  },
  {
    "id": "ICS_46",
    "code": "ICS 46",
    "department": "ICS",
    "number": "46",
    "title": "Data Structure Implementation and Analysis",
    "units": 4,
    "description": "Stacks, queues, trees, graphs, sorting, searching algorithms in C++.",
    "prerequisites": {
      "type": "course",
      "courseId": "ICS_45C",
      "minGrade": "C"
    },
    "prereqString": "ICS 45C with a grade of C or better"
  },
  {
    "id": "ICS_51",
    "code": "ICS 51",
    "department": "ICS",
    "number": "51",
    "title": "Introductory Computer Organization",
    "units": 6,
    "description": "Digital logic, CPU architecture, assembly language programming.",
    "prerequisites": {
      "type": "course",
      "courseId": "ICS_33",
      "minGrade": "C"
    },
    "prereqString": "ICS 33 with a grade of C or better"
  },
  {
    "id": "COMPSCI_161",
    "code": "COMPSCI 161",
    "department": "COMPSCI",
    "number": "161",
    "title": "Design and Analysis of Algorithms",
    "units": 4,
    "description": "Techniques for algorithm design: greedy, divide and conquer, dynamic programming.",
    "prerequisites": {
      "type": "and",
      "children": [
        { "type": "course", "courseId": "ICS_46", "minGrade": "C" },
        { "type": "course", "courseId": "MATH_2B", "minGrade": "C" }
      ]
    },
    "prereqString": "ICS 46 and MATH 2B"
  }
]
```

- [ ] **Step 2: Create `src/data/catalog-years/2026-27/offerings.json` and `transfer-articulation.json`**

`src/data/catalog-years/2026-27/offerings.json`:
```json
[
  { "courseId": "MATH_2A", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "MATH_2A", "term": "Winter 2027", "confidence": "CONFIRMED" },
  { "courseId": "MATH_2A", "term": "Spring 2027", "confidence": "CONFIRMED" },
  { "courseId": "MATH_2B", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "MATH_2B", "term": "Winter 2027", "confidence": "CONFIRMED" },
  { "courseId": "MATH_2B", "term": "Spring 2027", "confidence": "CONFIRMED" },
  { "courseId": "MATH_2D", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "MATH_2D", "term": "Winter 2027", "confidence": "CONFIRMED" },
  { "courseId": "MATH_3A", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "MATH_3A", "term": "Spring 2027", "confidence": "EXPECTED" },
  { "courseId": "MATH_13", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "MATH_13", "term": "Winter 2027", "confidence": "CONFIRMED" },
  { "courseId": "MATH_105A", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "MATH_140A", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "ICS_31", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "ICS_31", "term": "Winter 2027", "confidence": "CONFIRMED" },
  { "courseId": "ICS_32", "term": "Winter 2027", "confidence": "CONFIRMED" },
  { "courseId": "ICS_32", "term": "Spring 2027", "confidence": "CONFIRMED" },
  { "courseId": "ICS_33", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "ICS_33", "term": "Spring 2027", "confidence": "CONFIRMED" },
  { "courseId": "ICS_45C", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "ICS_45C", "term": "Winter 2027", "confidence": "CONFIRMED" },
  { "courseId": "ICS_46", "term": "Winter 2027", "confidence": "CONFIRMED" },
  { "courseId": "ICS_46", "term": "Spring 2027", "confidence": "CONFIRMED" },
  { "courseId": "ICS_51", "term": "Winter 2027", "confidence": "CONFIRMED" },
  { "courseId": "COMPSCI_161", "term": "Fall 2026", "confidence": "CONFIRMED" },
  { "courseId": "COMPSCI_161", "term": "Spring 2027", "confidence": "CONFIRMED" }
]
```

`src/data/catalog-years/2026-27/transfer-articulation.json`:
```json
[
  {
    "sourceInstitution": "Mt. San Antonio College",
    "sourceCourseCode": "MATH 260",
    "targetUciCourseId": "MATH_2A",
    "articulationStatus": "CONFIRMED",
    "effectiveYears": "2020-Present"
  },
  {
    "sourceInstitution": "Irvine Valley College",
    "sourceCourseCode": "CS 10",
    "targetUciCourseId": "ICS_31",
    "articulationStatus": "CONFIRMED",
    "effectiveYears": "2022-Present"
  },
  {
    "sourceInstitution": "Orange Coast College",
    "sourceCourseCode": "MATH A180",
    "targetUciCourseId": "MATH_2A",
    "articulationStatus": "CONFIRMED",
    "effectiveYears": "2019-Present"
  }
]
```

- [ ] **Step 3: Implement `src/data/loader.ts` and test suite**

`src/data/loader.ts`:
```ts
import { Course, CourseOffering, CourseEquivalency } from '@/academic-engine/types';
import courses2026 from './catalog-years/2026-27/courses.json';
import offerings2026 from './catalog-years/2026-27/offerings.json';
import articulation2026 from './catalog-years/2026-27/transfer-articulation.json';

export interface CatalogData {
  catalogYear: string;
  courses: Course[];
  offerings: CourseOffering[];
  articulations: CourseEquivalency[];
}

export function loadCatalog(catalogYear: string = '2026-27'): CatalogData {
  if (catalogYear === '2026-27') {
    return {
      catalogYear: '2026-27',
      courses: courses2026 as Course[],
      offerings: offerings2026 as CourseOffering[],
      articulations: articulation2026 as CourseEquivalency[],
    };
  }

  throw new Error(`Catalog year ${catalogYear} not found`);
}
```

`src/data/__tests__/loader.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { loadCatalog } from '../loader';

describe('Catalog Loader', () => {
  it('loads 2026-27 catalog with complete courses, offerings, and articulations', () => {
    const catalog = loadCatalog('2026-27');
    expect(catalog.catalogYear).toBe('2026-27');
    expect(catalog.courses.length).toBeGreaterThanOrEqual(14);
    expect(catalog.offerings.length).toBeGreaterThan(0);
    expect(catalog.articulations.length).toBeGreaterThanOrEqual(3);

    const math2a = catalog.courses.find(c => c.id === 'MATH_2A');
    expect(math2a).toBeDefined();
    expect(math2a?.code).toBe('MATH 2A');
  });

  it('throws error for unsupported catalog year', () => {
    expect(() => loadCatalog('1999-00')).toThrowError();
  });
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/data/__tests__/loader.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit mock catalog and loader**

```bash
git add src/data/catalog-years/ src/data/loader.ts src/data/__tests__/loader.test.ts
git commit -m "feat(data): add versioned 2026-27 UCI mock catalog, offerings, and transfer articulation"
```

---

### Task 7: Client-Side Storage & Backup Manager (Privacy-First)

**Files:**
- Create: `src/storage/types.ts`
- Create: `src/storage/local-storage.ts`
- Test: `src/storage/__tests__/storage.test.ts`

- [ ] **Step 1: Write test for local storage & backup import/export in `src/storage/__tests__/storage.test.ts`**

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveStudentProfile,
  loadStudentProfile,
  exportProfileAsJson,
  importProfileFromJson,
  clearStudentData,
} from '../local-storage';
import { StudentProfile } from '@/academic-engine/types';

describe('Privacy-First Storage Manager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const sampleProfile: StudentProfile = {
    catalogYear: '2026-27',
    major: 'Computer Science B.S.',
    classStanding: 'Sophomore',
    courses: [
      { id: '1', courseId: 'MATH_2A', term: 'Fall 2025', grade: 'A' },
      { id: '2', courseId: 'ICS_31', term: 'Fall 2025', grade: 'A' },
    ],
  };

  it('saves and retrieves student profile from localStorage without external leakage', () => {
    saveStudentProfile(sampleProfile);
    const retrieved = loadStudentProfile();
    expect(retrieved).toEqual(sampleProfile);
  });

  it('exports and re-imports valid JSON backup string', () => {
    const jsonStr = exportProfileAsJson(sampleProfile);
    const imported = importProfileFromJson(jsonStr);
    expect(imported).toEqual(sampleProfile);
  });

  it('clears all student data on reset', () => {
    saveStudentProfile(sampleProfile);
    clearStudentData();
    const retrieved = loadStudentProfile();
    expect(retrieved.courses).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/storage/__tests__/storage.test.ts`  
Expected: FAIL with "Cannot find module '../local-storage'"

- [ ] **Step 3: Implement `src/storage/types.ts` and `src/storage/local-storage.ts`**

`src/storage/types.ts`:
```ts
import { StudentProfile } from '@/academic-engine/types';

export interface AntTrailBackup {
  version: '1.0';
  exportedAt: string;
  profile: StudentProfile;
}
```

`src/storage/local-storage.ts`:
```ts
import { StudentProfile } from '@/academic-engine/types';
import { AntTrailBackup } from './types';

const STORAGE_KEY = 'anttrail_student_profile_v1';

export const DEFAULT_PROFILE: StudentProfile = {
  catalogYear: '2026-27',
  major: 'Computer Science B.S.',
  classStanding: 'Freshman',
  courses: [],
};

export function saveStudentProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save AntTrail profile to localStorage', error);
  }
}

export function loadStudentProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
    };
  } catch (error) {
    console.error('Failed to parse profile from localStorage', error);
    return DEFAULT_PROFILE;
  }
}

export function exportProfileAsJson(profile: StudentProfile): string {
  const backup: AntTrailBackup = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    profile,
  };
  return JSON.stringify(backup, null, 2);
}

export function importProfileFromJson(jsonString: string): StudentProfile {
  const parsed = JSON.parse(jsonString);
  if (!parsed.profile || !Array.isArray(parsed.profile.courses)) {
    throw new Error('Invalid AntTrail backup file format.');
  }
  return parsed.profile;
}

export function clearStudentData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/storage/__tests__/storage.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit storage manager**

```bash
git add src/storage/ src/storage/__tests__/storage.test.ts
git commit -m "feat(storage): implement privacy-first local storage and JSON export/import manager"
```

---

### Task 8: UI State Management & Reactive Store

**Files:**
- Create: `src/app/state/useStudentStore.ts`
- Test: `src/app/state/__tests__/useStudentStore.test.ts`

- [ ] **Step 1: Write store test in `src/app/state/__tests__/useStudentStore.test.ts`**

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { createStudentStore } from '../useStudentStore';

describe('Student Store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('toggles course completion and updates eligibility immediately', () => {
    const store = createStudentStore();
    expect(store.getState().profile.courses).toHaveLength(0);

    // Toggle MATH 2A on
    store.getState().toggleCourseCompleted('MATH_2A', 'A');
    expect(store.getState().profile.courses.some(c => c.courseId === 'MATH_2A')).toBe(true);

    // Eligibility for MATH 2B should now be ELIGIBLE
    const eligibility = store.getState().eligibilityMap;
    expect(eligibility['MATH_2B'].status).toBe('ELIGIBLE');

    // Toggle MATH 2A off
    store.getState().toggleCourseCompleted('MATH_2A');
    expect(store.getState().profile.courses.some(c => c.courseId === 'MATH_2A')).toBe(false);
    expect(store.getState().eligibilityMap['MATH_2B'].status).toBe('MISSING_PREREQUISITES');
  });

  it('adds transfer course with source institution', () => {
    const store = createStudentStore();
    store.getState().addTransferCourse('Mt. San Antonio College', 'MATH 260', 'MATH_2A', 'A');

    const eligibility = store.getState().eligibilityMap;
    expect(eligibility['MATH_2A'].status).toBe('ALREADY_COMPLETED');
    expect(eligibility['MATH_2B'].status).toBe('TRANSFER_EQUIVALENCY_USED');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/state/__tests__/useStudentStore.test.ts`  
Expected: FAIL with "Cannot find module '../useStudentStore'"

- [ ] **Step 3: Implement `src/app/state/useStudentStore.ts`**

```ts
import { StudentProfile, StudentCourse, UCIGrade, Course, CourseOffering, CourseEquivalency } from '@/academic-engine/types';
import { evaluateCatalogEligibility, CatalogEligibilityMap } from '@/academic-engine/eligibility';
import { calculateUciGpa, GpaCalculationResult } from '@/academic-engine/gpa';
import { loadCatalog } from '@/data/loader';
import { loadStudentProfile, saveStudentProfile, clearStudentData, DEFAULT_PROFILE } from '@/storage/local-storage';

export interface StudentStoreState {
  profile: StudentProfile;
  catalog: {
    courses: Course[];
    offerings: CourseOffering[];
    articulations: CourseEquivalency[];
  };
  eligibilityMap: CatalogEligibilityMap;
  gpaStats: GpaCalculationResult;
  searchQuery: string;
  filterDepartment: string;
  filterEligibility: 'ALL' | 'ELIGIBLE' | 'MISSING' | 'COMPLETED';

  // Actions
  setSearchQuery: (q: string) => void;
  setFilterDepartment: (dept: string) => void;
  setFilterEligibility: (filter: 'ALL' | 'ELIGIBLE' | 'MISSING' | 'COMPLETED') => void;
  setMajor: (major: string) => void;
  setStanding: (standing: StudentProfile['classStanding']) => void;
  toggleCourseCompleted: (courseId: string, grade?: UCIGrade) => void;
  updateCourseGrade: (courseId: string, grade: UCIGrade) => void;
  addTransferCourse: (institution: string, sourceCode: string, targetUciId: string, grade: UCIGrade) => void;
  removeCourse: (recordId: string) => void;
  resetAll: () => void;
  loadFromBackup: (profile: StudentProfile) => void;
}

export function createStudentStore() {
  const catalog = loadCatalog('2026-27');
  let currentProfile = loadStudentProfile();

  function computeDerived(prof: StudentProfile) {
    const eligibilityMap = evaluateCatalogEligibility(catalog.courses, prof, catalog.articulations);
    const enrichedCourses = prof.courses.map(c => {
      const match = catalog.courses.find(cr => cr.id === c.courseId || cr.id === c.transferEquivalentCourseId);
      return { ...c, units: match?.units ?? 4 };
    });
    const gpaStats = calculateUciGpa(enrichedCourses);
    return { eligibilityMap, gpaStats };
  }

  let derived = computeDerived(currentProfile);

  const listeners = new Set<() => void>();

  const state: StudentStoreState = {
    profile: currentProfile,
    catalog: {
      courses: catalog.courses,
      offerings: catalog.offerings,
      articulations: catalog.articulations,
    },
    eligibilityMap: derived.eligibilityMap,
    gpaStats: derived.gpaStats,
    searchQuery: '',
    filterDepartment: 'ALL',
    filterEligibility: 'ALL',

    setSearchQuery: (q: string) => {
      state.searchQuery = q;
      notify();
    },

    setFilterDepartment: (dept: string) => {
      state.filterDepartment = dept;
      notify();
    },

    setFilterEligibility: (filter) => {
      state.filterEligibility = filter;
      notify();
    },

    setMajor: (major: string) => {
      state.profile = { ...state.profile, major };
      saveStudentProfile(state.profile);
      updateDerived();
    },

    setStanding: (standing) => {
      state.profile = { ...state.profile, classStanding: standing };
      saveStudentProfile(state.profile);
      updateDerived();
    },

    toggleCourseCompleted: (courseId: string, grade: UCIGrade = 'A') => {
      const exists = state.profile.courses.some(c => c.courseId === courseId);
      if (exists) {
        state.profile = {
          ...state.profile,
          courses: state.profile.courses.filter(c => c.courseId !== courseId),
        };
      } else {
        const newRecord: StudentCourse = {
          id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          courseId,
          term: 'Fall 2025',
          grade,
        };
        state.profile = {
          ...state.profile,
          courses: [...state.profile.courses, newRecord],
        };
      }
      saveStudentProfile(state.profile);
      updateDerived();
    },

    updateCourseGrade: (courseId: string, grade: UCIGrade) => {
      state.profile = {
        ...state.profile,
        courses: state.profile.courses.map(c =>
          c.courseId === courseId ? { ...c, grade } : c
        ),
      };
      saveStudentProfile(state.profile);
      updateDerived();
    },

    addTransferCourse: (institution: string, sourceCode: string, targetUciId: string, grade: UCIGrade) => {
      const newRecord: StudentCourse = {
        id: `transfer-${Date.now()}`,
        courseId: sourceCode,
        term: 'Transfer Term',
        grade,
        isTransfer: true,
        transferInstitution: institution,
        transferEquivalentCourseId: targetUciId,
      };
      state.profile = {
        ...state.profile,
        courses: [...state.profile.courses, newRecord],
      };
      saveStudentProfile(state.profile);
      updateDerived();
    },

    removeCourse: (recordId: string) => {
      state.profile = {
        ...state.profile,
        courses: state.profile.courses.filter(c => c.id !== recordId),
      };
      saveStudentProfile(state.profile);
      updateDerived();
    },

    resetAll: () => {
      clearStudentData();
      state.profile = DEFAULT_PROFILE;
      updateDerived();
    },

    loadFromBackup: (newProfile: StudentProfile) => {
      state.profile = newProfile;
      saveStudentProfile(newProfile);
      updateDerived();
    },
  };

  function updateDerived() {
    const updated = computeDerived(state.profile);
    state.eligibilityMap = updated.eligibilityMap;
    state.gpaStats = updated.gpaStats;
    notify();
  }

  function notify() {
    listeners.forEach(fn => fn());
  }

  return {
    getState: () => state,
    subscribe: (fn: () => void) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/state/__tests__/useStudentStore.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit UI reactive store**

```bash
git add src/app/state/
git commit -m "feat(app): implement reactive student store with instant eligibility & GPA derivation"
```

---

### Task 9: Interactive UI Components (AntAlmanac / ZotCourse Style)

**Files:**
- Create: `src/app/components/Header.tsx`
- Create: `src/app/components/PrereqBadge.tsx`
- Create: `src/app/components/PrereqTreeInspector.tsx`
- Create: `src/app/components/CourseCard.tsx`
- Create: `src/app/components/CourseHistoryPanel.tsx`
- Create: `src/app/components/ExportImportModal.tsx`

- [ ] **Step 1: Implement `src/app/components/PrereqBadge.tsx`**

```tsx
import React from 'react';
import { CourseEligibilityStatus } from '@/academic-engine/types';

interface PrereqBadgeProps {
  status: CourseEligibilityStatus;
}

export const PrereqBadge: React.FC<PrereqBadgeProps> = ({ status }) => {
  switch (status) {
    case 'ELIGIBLE':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          ✓ Eligible to take
        </span>
      );
    case 'ALREADY_COMPLETED':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          ✓ Completed
        </span>
      );
    case 'TRANSFER_EQUIVALENCY_USED':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
          ⚡ Transfer Equivalent
        </span>
      );
    case 'RESTRICTED':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
          ⛔ Restricted
        </span>
      );
    case 'MISSING_PREREQUISITES':
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
          ✕ Prereqs Needed
        </span>
      );
  }
};
```

- [ ] **Step 2: Implement `src/app/components/PrereqTreeInspector.tsx`**

```tsx
import React from 'react';
import { PrereqNode, StudentProfile, CourseEquivalency } from '@/academic-engine/types';
import { evaluatePrerequisites } from '@/academic-engine/prerequisites';

interface InspectorProps {
  node: PrereqNode | null;
  prereqString?: string;
  student: StudentProfile;
  equivalencies: CourseEquivalency[];
}

export const PrereqTreeInspector: React.FC<InspectorProps> = ({
  node,
  prereqString,
  student,
  equivalencies,
}) => {
  if (!node) {
    return (
      <div className="text-xs text-slate-500 italic py-1">
        No prerequisites required. Course is open for direct enrollment.
      </div>
    );
  }

  const evalResult = evaluatePrerequisites(node, student, equivalencies);

  return (
    <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
      <div className="font-semibold text-slate-700 mb-1 flex items-center justify-between">
        <span>Prerequisite Requirements:</span>
        <span className="text-slate-500 font-normal italic">{prereqString || 'Official Rule'}</span>
      </div>

      {evalResult.satisfiedDetails.length > 0 && (
        <div className="mb-2">
          <div className="text-emerald-700 font-medium">Satisfied requirements:</div>
          <ul className="list-disc list-inside text-emerald-800 pl-1 space-y-0.5">
            {evalResult.satisfiedDetails.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {evalResult.missingReasons.length > 0 && (
        <div>
          <div className="text-amber-800 font-medium">Missing requirements:</div>
          <ul className="list-disc list-inside text-rose-700 pl-1 space-y-0.5">
            {evalResult.missingReasons.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 3: Implement `src/app/components/CourseCard.tsx`**

```tsx
import React, { useState } from 'react';
import { Course, CourseOffering, CourseEquivalency, StudentProfile } from '@/academic-engine/types';
import { PrereqEvaluationResult } from '@/academic-engine/types';
import { PrereqBadge } from './PrereqBadge';
import { PrereqTreeInspector } from './PrereqTreeInspector';

interface CourseCardProps {
  course: Course;
  evaluation: PrereqEvaluationResult;
  offerings: CourseOffering[];
  student: StudentProfile;
  equivalencies: CourseEquivalency[];
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  evaluation,
  offerings,
  student,
  equivalencies,
  isCompleted,
  onToggleComplete,
}) => {
  const [expanded, setExpanded] = useState(false);

  const relevantOfferings = offerings.filter(o => o.courseId === course.id);

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      isCompleted
        ? 'bg-slate-50/80 border-slate-200 opacity-80'
        : evaluation.status === 'ELIGIBLE'
        ? 'bg-white border-emerald-300 shadow-sm hover:border-emerald-400'
        : 'bg-white border-slate-200 hover:border-slate-300'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">{course.code}</h3>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
              {course.units} units
            </span>
            <PrereqBadge status={evaluation.status} />
          </div>
          <p className="text-sm font-medium text-slate-700 mt-0.5">{course.title}</p>
        </div>

        <button
          onClick={onToggleComplete}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
            isCompleted
              ? 'bg-slate-200 text-slate-700 hover:bg-rose-100 hover:text-rose-700'
              : 'bg-zot-blue text-white hover:bg-zot-darkBlue'
          }`}
        >
          {isCompleted ? 'Mark Incomplete' : 'Mark Completed'}
        </button>
      </div>

      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{course.description}</p>

      {/* Offerings badges */}
      <div className="mt-3 flex flex-wrap gap-1.5 items-center text-xs">
        <span className="text-slate-500 font-medium">Offerings:</span>
        {relevantOfferings.length > 0 ? (
          relevantOfferings.map((off, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                off.confidence === 'CONFIRMED'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {off.term} ({off.confidence.toLowerCase()})
            </span>
          ))
        ) : (
          <span className="text-slate-400 italic">Not scheduled in upcoming terms</span>
        )}
      </div>

      {/* Expand/Collapse Inspector toggle */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium text-zot-blue hover:underline flex items-center gap-1"
        >
          {expanded ? 'Hide Details ▲' : 'Inspect Prerequisites & Rules ▼'}
        </button>
      </div>

      {expanded && (
        <PrereqTreeInspector
          node={course.prerequisites}
          prereqString={course.prereqString}
          student={student}
          equivalencies={equivalencies}
        />
      )}
    </div>
  );
};
```

- [ ] **Step 4: Implement `src/app/components/CourseHistoryPanel.tsx`**

```tsx
import React, { useState } from 'react';
import { StudentProfile, UCIGrade, Course } from '@/academic-engine/types';

interface HistoryProps {
  student: StudentProfile;
  catalogCourses: Course[];
  onToggleCourse: (courseId: string, grade?: UCIGrade) => void;
  onUpdateGrade: (courseId: string, grade: UCIGrade) => void;
  onAddTransfer: (institution: string, code: string, targetUci: string, grade: UCIGrade) => void;
  onRemove: (recordId: string) => void;
}

const GRADES: UCIGrade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'P'];

export const CourseHistoryPanel: React.FC<HistoryProps> = ({
  student,
  catalogCourses,
  onToggleCourse,
  onUpdateGrade,
  onAddTransfer,
  onRemove,
}) => {
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [transInst, setTransInst] = useState('Mt. San Antonio College');
  const [transCode, setTransCode] = useState('MATH 260');
  const [transTarget, setTransTarget] = useState('MATH_2A');
  const [transGrade, setTransGrade] = useState<UCIGrade>('A');

  const handleAddTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransfer(transInst, transCode, transTarget, transGrade);
    setShowTransferForm(false);
  };

  const introCourses = ['MATH_2A', 'MATH_2B', 'ICS_31', 'ICS_32', 'ICS_33'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <span>📚 Course History & Records</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {student.courses.length} courses
          </span>
        </h2>
      </div>

      {/* Quick Checklist */}
      <div className="mt-3">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Quick Intro Check-off
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {introCourses.map(cid => {
            const isDone = student.courses.some(c => c.courseId === cid || c.transferEquivalentCourseId === cid);
            return (
              <button
                key={cid}
                onClick={() => onToggleCourse(cid, 'A')}
                className={`px-2.5 py-1.5 text-xs rounded font-medium text-left border flex items-center justify-between transition-colors ${
                  isDone
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{cid.replace('_', ' ')}</span>
                <span>{isDone ? '✓' : '+'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Course List */}
      <div className="mt-4">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Your Courses & Grades
        </div>
        {student.courses.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">
            No courses marked yet. Click courses to mark them completed or add transfer credit.
          </p>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {student.courses.map(sc => (
              <div
                key={sc.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-800">
                    {sc.courseId.replace('_', ' ')}
                    {sc.isTransfer && (
                      <span className="ml-1 text-[10px] text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">
                        Transfer ({sc.transferInstitution})
                      </span>
                    )}
                  </div>
                  <div className="text-slate-500 text-[11px]">{sc.term}</div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sc.grade}
                    onChange={e => onUpdateGrade(sc.courseId, e.target.value as UCIGrade)}
                    className="text-xs border border-slate-300 rounded px-1.5 py-0.5 bg-white font-medium"
                  >
                    {GRADES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => onRemove(sc.id)}
                    title="Remove record"
                    className="text-slate-400 hover:text-rose-600 font-bold px-1"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transfer Course Adder */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        {!showTransferForm ? (
          <button
            onClick={() => setShowTransferForm(true)}
            className="w-full py-1.5 px-3 rounded-lg border border-dashed border-indigo-300 text-indigo-700 text-xs font-semibold hover:bg-indigo-50 transition-colors"
          >
            + Add Transfer Course (Mt. SAC, IVC, OCC...)
          </button>
        ) : (
          <form onSubmit={handleAddTransferSubmit} className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-200 space-y-2 text-xs">
            <div className="font-semibold text-indigo-900">Add Transfer Articulation</div>
            <div>
              <label className="block text-[11px] text-slate-600 mb-0.5">Institution</label>
              <input
                type="text"
                value={transInst}
                onChange={e => setTransInst(e.target.value)}
                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-600 mb-0.5">Transfer Code</label>
                <input
                  type="text"
                  value={transCode}
                  onChange={e => setTransCode(e.target.value)}
                  className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-0.5">UCI Equivalent</label>
                <select
                  value={transTarget}
                  onChange={e => setTransTarget(e.target.value)}
                  className="w-full border border-slate-300 rounded px-1.5 py-1 text-xs bg-white"
                >
                  {catalogCourses.map(c => (
                    <option key={c.id} value={c.id}>{c.code}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-600">Grade:</span>
                <select
                  value={transGrade}
                  onChange={e => setTransGrade(e.target.value as UCIGrade)}
                  className="border border-slate-300 rounded px-1 py-0.5 text-xs bg-white font-medium"
                >
                  {GRADES.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowTransferForm(false)}
                  className="px-2 py-1 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700"
                >
                  Save Transfer
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
```

- [ ] **Step 5: Implement `src/app/components/Header.tsx` and `ExportImportModal.tsx`**

`src/app/components/Header.tsx`:
```tsx
import React, { useState } from 'react';
import { GpaCalculationResult } from '@/academic-engine/gpa';
import { StudentProfile } from '@/academic-engine/types';
import { ExportImportModal } from './ExportImportModal';

interface HeaderProps {
  profile: StudentProfile;
  gpaStats: GpaCalculationResult;
  onUpdateMajor: (m: string) => void;
  onUpdateStanding: (s: StudentProfile['classStanding']) => void;
  onResetAll: () => void;
  onLoadBackup: (p: StudentProfile) => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  gpaStats,
  onUpdateMajor,
  onUpdateStanding,
  onResetAll,
  onLoadBackup,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐜</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-xl text-zot-darkBlue tracking-tight">AntTrail</h1>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-zot-gold/30 text-amber-900 px-2 py-0.5 rounded">
                  UCI {profile.catalogYear}
                </span>
              </div>
              <p className="text-xs text-slate-500">Privacy-First Academic Planner for UC Irvine</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Major & Standing select */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
              <span className="text-slate-500 font-medium">Major:</span>
              <select
                value={profile.major}
                onChange={e => onUpdateMajor(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer"
              >
                <option value="Computer Science B.S.">Computer Science B.S.</option>
                <option value="Mathematics B.S.">Mathematics B.S.</option>
                <option value="Data Science B.S.">Data Science B.S.</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
              <span className="text-slate-500 font-medium">Standing:</span>
              <select
                value={profile.classStanding}
                onChange={e => onUpdateStanding(e.target.value as StudentProfile['classStanding'])}
                className="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer"
              >
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            {/* GPA badge */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
              <span className="text-emerald-800 font-bold">UCI GPA: {gpaStats.gpa.toFixed(2)}</span>
              <span className="text-emerald-600 text-[11px]">({gpaStats.totalGpaUnits} GPA units)</span>
            </div>

            {/* Privacy & Backup tools */}
            <button
              onClick={() => setModalOpen(true)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors"
            >
              Backup & Privacy
            </button>
          </div>
        </div>
      </header>

      {modalOpen && (
        <ExportImportModal
          profile={profile}
          onClose={() => setModalOpen(false)}
          onLoadBackup={onLoadBackup}
          onResetAll={onResetAll}
        />
      )}
    </>
  );
};
```

`src/app/components/ExportImportModal.tsx`:
```tsx
import React, { useState } from 'react';
import { StudentProfile } from '@/academic-engine/types';
import { exportProfileAsJson, importProfileFromJson } from '@/storage/local-storage';

interface ModalProps {
  profile: StudentProfile;
  onClose: () => void;
  onLoadBackup: (p: StudentProfile) => void;
  onResetAll: () => void;
}

export const ExportImportModal: React.FC<ModalProps> = ({
  profile,
  onClose,
  onLoadBackup,
  onResetAll,
}) => {
  const [importText, setImportText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDownload = () => {
    const jsonStr = exportProfileAsJson(profile);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anttrail-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    try {
      const parsed = importProfileFromJson(importText);
      onLoadBackup(parsed);
      onClose();
    } catch {
      setErrorMsg('Failed to parse backup JSON. Please check file format.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">🔒 Privacy & Data Backup</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-lg">×</button>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-xs text-sky-900 leading-relaxed">
          <strong>Zero Server Retention:</strong> AntTrail runs completely in your browser. None of your academic course history, grades, or planning choices are uploaded to any backend database.
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Export Your Data</h3>
            <p className="text-xs text-slate-600 mb-2">Save a local JSON backup of your coursework and profile:</p>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-zot-blue text-white rounded-lg text-xs font-semibold hover:bg-zot-darkBlue transition-colors"
            >
              Download Backup JSON
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Restore from Backup</h3>
            <textarea
              value={importText}
              onChange={e => {
                setImportText(e.target.value);
                setErrorMsg(null);
              }}
              placeholder="Paste AntTrail backup JSON here..."
              className="w-full h-24 text-xs font-mono border border-slate-300 rounded-lg p-2"
            />
            {errorMsg && <div className="text-xs text-rose-600 mt-1">{errorMsg}</div>}
            <button
              onClick={handleImportSubmit}
              disabled={!importText.trim()}
              className="mt-2 px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold disabled:opacity-50 hover:bg-slate-900 transition-colors"
            >
              Restore State
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-rose-700">Wipe All Local Data</div>
              <div className="text-[11px] text-slate-500">Purges browser cache and resets records</div>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all data?')) {
                  onResetAll();
                  onClose();
                }
              }}
              className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold transition-colors"
            >
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 6: Commit UI components**

```bash
git add src/app/components/
git commit -m "feat(ui): implement AntAlmanac-inspired course cards, history panel, and backup modal"
```

---

### Task 10: Complete Prototype Integration & System Verification

**Files:**
- Create: `src/app/App.tsx`
- Create: `src/app/main.tsx`
- Create: `README.md`
- Test: Vitest test suite (`npm test`) & Vite build (`npm run build`)

- [ ] **Step 1: Implement `src/app/App.tsx` and `src/app/main.tsx`**

`src/app/App.tsx`:
```tsx
import React, { useState, useEffect } from 'react';
import { createStudentStore, StudentStoreState } from './state/useStudentStore';
import { Header } from './components/Header';
import { CourseHistoryPanel } from './components/CourseHistoryPanel';
import { CourseCard } from './components/CourseCard';

const storeInstance = createStudentStore();

export const App: React.FC = () => {
  const [store, setStore] = useState<StudentStoreState>(storeInstance.getState());

  useEffect(() => {
    return storeInstance.subscribe(() => {
      setStore({ ...storeInstance.getState() });
    });
  }, []);

  const {
    profile,
    catalog,
    eligibilityMap,
    gpaStats,
    searchQuery,
    filterDepartment,
    filterEligibility,
    setSearchQuery,
    setFilterDepartment,
    setFilterEligibility,
    setMajor,
    setStanding,
    toggleCourseCompleted,
    updateCourseGrade,
    addTransferCourse,
    removeCourse,
    resetAll,
    loadFromBackup,
  } = store;

  // Filter courses
  const filteredCourses = catalog.courses.filter(course => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        course.code.toLowerCase().includes(q) ||
        course.title.toLowerCase().includes(q) ||
        course.department.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Department filter
    if (filterDepartment !== 'ALL' && course.department !== filterDepartment) {
      return false;
    }

    // Eligibility filter
    const status = eligibilityMap[course.id]?.status;
    if (filterEligibility === 'ELIGIBLE' && status !== 'ELIGIBLE' && status !== 'TRANSFER_EQUIVALENCY_USED') {
      return false;
    }
    if (filterEligibility === 'MISSING' && status !== 'MISSING_PREREQUISITES') {
      return false;
    }
    if (filterEligibility === 'COMPLETED' && status !== 'ALREADY_COMPLETED') {
      return false;
    }

    return true;
  });

  const eligibleCount = catalog.courses.filter(
    c => eligibilityMap[c.id]?.status === 'ELIGIBLE' || eligibilityMap[c.id]?.status === 'TRANSFER_EQUIVALENCY_USED'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        profile={profile}
        gpaStats={gpaStats}
        onUpdateMajor={setMajor}
        onUpdateStanding={setStanding}
        onResetAll={resetAll}
        onLoadBackup={loadFromBackup}
      />

      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Course History & Records */}
        <div className="lg:col-span-4 space-y-4">
          <CourseHistoryPanel
            student={profile}
            catalogCourses={catalog.courses}
            onToggleCourse={toggleCourseCompleted}
            onUpdateGrade={updateCourseGrade}
            onAddTransfer={addTransferCourse}
            onRemove={removeCourse}
          />

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed shadow-xs">
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <span>💡 AntTrail Rule Engine</span>
            </div>
            Mark courses completed on the left. The engine evaluates prerequisite trees instantly to show you exactly which upper-division and core courses you are eligible to take!
          </div>
        </div>

        {/* Right Side: Catalog & Eligibility Explorer */}
        <div className="lg:col-span-8 space-y-4">
          {/* Controls Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by course code or title (e.g. MATH 140A, Analysis, Python)..."
                className="w-full pl-3 pr-8 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-zot-blue"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <select
                value={filterDepartment}
                onChange={e => setFilterDepartment(e.target.value)}
                className="border border-slate-300 rounded-lg px-2.5 py-2 bg-white font-medium text-slate-700"
              >
                <option value="ALL">All Departments</option>
                <option value="MATH">Mathematics (MATH)</option>
                <option value="ICS">Informatics & CS (ICS)</option>
                <option value="COMPSCI">Computer Science (COMPSCI)</option>
              </select>

              <select
                value={filterEligibility}
                onChange={e => setFilterEligibility(e.target.value as any)}
                className="border border-slate-300 rounded-lg px-2.5 py-2 bg-white font-medium text-slate-700"
              >
                <option value="ALL">All Statuses</option>
                <option value="ELIGIBLE">Eligible Now ({eligibleCount})</option>
                <option value="MISSING">Missing Prerequisites</option>
                <option value="COMPLETED">Already Completed</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing {filteredCourses.length} of {catalog.courses.length} courses</span>
            <span className="text-emerald-700 font-semibold">{eligibleCount} courses currently eligible</span>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                evaluation={eligibilityMap[course.id]}
                offerings={catalog.offerings}
                student={profile}
                equivalencies={catalog.articulations}
                isCompleted={profile.courses.some(
                  c => c.courseId === course.id || c.transferEquivalentCourseId === course.id
                )}
                onToggleComplete={() => toggleCourseCompleted(course.id)}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">No courses match your filter.</p>
              <p className="text-xs text-slate-400 mt-1">Try resetting the department or status filter.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        AntTrail • Production-Quality Academic Planner for UC Irvine • Privacy-First: All student data stays on your device.
      </footer>
    </div>
  );
};
```

`src/app/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 2: Create `README.md`**

```markdown
# AntTrail 🐜

**Production-Quality, Privacy-First Academic Planner for UC Irvine Students.**

AntTrail helps UCI students import what they have taken, immediately see which courses they are eligible for, and generate realistic quarter-by-quarter academic plans using deterministic UCI prerequisites, degree rules, and course offerings.

---

## 🌟 Key Principles

1. **Privacy-First Architecture (Zero Server Persistence):**
   - Student academic records, transcripts, course histories, and grades are never sent to or persisted on our servers.
   - All student state lives exclusively in client memory / local storage and the user's private Google Drive (`appDataFolder`).
   - Supports local JSON export, JSON backup restore, and instant cache purge.

2. **Deterministic Rules Engine (No AI in Academic Decisions):**
   - Academic decisions are 100% deterministic code.
   - No LLM guessing for prerequisite satisfaction, transfer equivalencies, degree completion, or GPA.
   - Prerequisite expressions are modeled as Abstract Syntax Trees (AST) supporting boolean combinations (`A AND (B OR C)`), minimum grade thresholds, and standing restrictions.

3. **Academic-Year Versioning:**
   - Catalog rules, prerequisites, and degree requirements are scoped to academic years (`2026-27`) and never overwritten.

4. **Official UCI GPA Calculation:**
   - Evaluates UCI grade point averages on the official Senate scale ($A+=4.0, A=4.0, A-=3.7, ...$).
   - Strictly excludes non-UC transfer course grades while counting transferable units.

---

## 🚀 Quickstart & Development

```bash
# Install dependencies
npm install

# Run unit test suite (Vitest)
npm test

# Start local development server
npm run dev

# Production build
npm run build
```

---

## 🏗️ Architecture

```text
src/
├── academic-engine/      # Pure TypeScript, zero DOM/React dependencies
│   ├── types.ts          # Core domain models and AST schemas
│   ├── prerequisites.ts  # Recursive AST prerequisite boolean evaluator
│   ├── eligibility.ts    # Multi-course catalog eligibility resolver
│   ├── gpa.ts            # Official UCI GPA calculation engine
│   └── __tests__/        # Unit test suite
├── data/                 # Public UCI catalog & articulation data
│   ├── catalog-years/    # Scoped catalog year databases (e.g. 2026-27)
│   └── loader.ts         # Type-safe catalog loader
├── storage/              # Privacy-first local storage and backup manager
└── app/                  # React UI (AntAlmanac / ZotCourse inspired)
```

---

## 📋 Implementation Milestones

- [x] **Phase 1: Project Foundation, Core AST Rules Engine, & Eligibility Prototype**
- [ ] **Phase 2: UCI Degree Requirement Engine & Quarter Planner UI**
- [ ] **Phase 3: Quarterly Offerings & Auto Plan Constraint Solver**
- [ ] **Phase 4: DegreeWorks & UCI Transcript Deterministic Document Parsers**
- [ ] **Phase 5: Google Authentication & Google Drive Private App Storage**
- [ ] **Phase 6: Multi-Term GPA Projections & Polish**
```

- [ ] **Step 3: Run full Vitest test suite to verify all unit tests pass**

Run: `npm test`  
Expected: All tests PASS.

- [ ] **Step 4: Run Vite build to verify clean compilation**

Run: `npm run build`  
Expected: Build succeeds with zero TypeScript or bundling errors.

- [ ] **Step 5: Commit full prototype and documentation**

```bash
git add src/app/App.tsx src/app/main.tsx README.md
git commit -m "feat: complete Phase 1 interactive prototype and documentation"
```
