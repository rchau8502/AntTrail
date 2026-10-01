# ZotCanvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build ZotCanvas, a privacy-first, zero-server-storage academic command center for UC Irvine students that integrates with Canvas LMS, provides deterministic workload planning, tactical homework milestone checklists, context-aware UCI campus resource matching, and optional free-tier AI assistance.

**Architecture:** Client-side Next.js (App Router) single-page application with a stateless proxy (`/api/canvas/*`) for Canvas LMS CORS bypass. All user tokens, keys, and progress are stored strictly in browser `localStorage`. All priority and scheduling calculations run on zero-cost deterministic client-side algorithms, with zero server-side AI or data retention.

**Tech Stack:** Next.js (App Router, React 19), TypeScript, Tailwind CSS, Lucide React, Vitest (for unit testing), Canvas LMS REST API.

---

## File Structure Map

```
/Users/richc/ZotCanvas/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── vitest.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/
│   │       └── canvas/
│   │           └── [...path]/
│   │               └── route.ts                  # Stateless Canvas CORS relay
│   ├── types/
│   │   ├── canvas.ts                             # Canvas API types
│   │   ├── storage.ts                            # LocalStorage schema & state
│   │   ├── study.ts                              # Priority, Workload, Milestones
│   │   └── uci.ts                                # UCI Campus Resources
│   ├── lib/
│   │   ├── canvas-client.ts                      # Client-side Canvas fetcher
│   │   ├── demo-data.ts                          # Realistic UCI course mock data
│   │   ├── priority-engine.ts                    # Eisenhower urgency & workload
│   │   ├── milestone-engine.ts                   # Rule-based homework breakdown
│   │   ├── uci-resources.ts                      # Context-aware UCI support matcher
│   │   ├── grade-simulator.ts                    # "What-If" grade calculator
│   │   └── gemini-client.ts                      # Optional BYOK Gemini caller
│   ├── context/
│   │   └── storage-context.tsx                   # LocalStorage state provider
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx
│       │   └── DisclaimerModal.tsx               # Academic integrity agreement
│       ├── onboarding/
│       │   └── TokenSetupModal.tsx               # Token entry & demo button
│       ├── dashboard/
│       │   ├── BurnoutGuard.tsx                  # Workload fatigue gauge
│       │   ├── EisenhowerMatrix.tsx              # Urgency categorization
│       │   └── PomodoroTimer.tsx                 # Focus work session tracker
│       ├── assignments/
│       │   ├── AssignmentDetailModal.tsx         # Milestone checklist & guidance
│       │   └── WhatIfGradeSimulator.tsx          # Grade forecaster
│       ├── calendar/
│       │   └── WorkloadHeatmap.tsx               # Daily stress visualizer
│       └── resources/
│           └── UciResourceHub.tsx                # LARC, CEWC, ICS tutoring
└── tests/
    ├── api/
    │   └── canvas-proxy.test.ts
    ├── lib/
    │   ├── priority-engine.test.ts
    │   ├── milestone-engine.test.ts
    │   ├── uci-resources.test.ts
    │   └── grade-simulator.test.ts
```

---

### Task 1: Project Scaffolding & Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/app/globals.css`

- [ ] **Step 1: Create package.json with dependencies**

```json
{
  "name": "zotcanvas",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.475.0",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.0.1"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.mjs, tailwind.config.ts, and postcss.config.mjs**

`next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

`postcss.config.mjs`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
  },
};
```

`tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        uci: {
          blue: "#0064a4",
          gold: "#ffd200",
          darkblue: "#003b63",
          lightgold: "#fff3b3",
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

`vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

`src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
```

- [ ] **Step 4: Install dependencies and verify build config**

Run: `npm install`
Expected: Dependencies installed successfully.

- [ ] **Step 5: Commit scaffolding**

```bash
git add package.json tsconfig.json next.config.mjs tailwind.config.ts postcss.config.mjs vitest.config.ts src/app/globals.css
git commit -m "chore: scaffold Next.js 15, Tailwind, and Vitest configuration"
```

---

### Task 2: Core TypeScript Models & Definitions

**Files:**
- Create: `src/types/canvas.ts`
- Create: `src/types/storage.ts`
- Create: `src/types/study.ts`
- Create: `src/types/uci.ts`

- [ ] **Step 1: Create `src/types/canvas.ts`**

```typescript
export interface CanvasCourse {
  id: number;
  name: string;
  course_code: string;
  enrollment_term_id?: number;
  term_name?: string;
  current_score?: number;
  current_grade?: string;
}

export interface CanvasRubricRating {
  id: string;
  description: string;
  points: number;
}

export interface CanvasRubricCriterion {
  id: string;
  description: string;
  points: number;
  ratings: CanvasRubricRating[];
}

export interface CanvasAssignment {
  id: number;
  course_id: number;
  name: string;
  description: string;
  due_at: string | null;
  points_possible: number;
  submission_types: string[];
  rubric?: CanvasRubricCriterion[];
  has_submitted_submissions?: boolean;
}
```

- [ ] **Step 2: Create `src/types/study.ts`**

```typescript
export type UrgencyQuadrant = "do_first" | "schedule" | "delegate_or_quick" | "backlog";

export interface PrioritizedAssignment {
  assignment: import("./canvas").CanvasAssignment;
  courseName: string;
  priorityScore: number;
  estimatedHours: number;
  hoursUntilDue: number | null;
  quadrant: UrgencyQuadrant;
  isOverdue: boolean;
}

export interface DailyWorkload {
  dateString: string; // YYYY-MM-DD
  dayLabel: string;   // e.g., "Wed Oct 4"
  estimatedHours: number;
  assignmentCount: number;
  isBurnoutRisk: boolean; // > 6.0 hours
}

export interface AssignmentMilestone {
  id: string;
  title: string;
  phase: "understand" | "draft" | "execute" | "review";
  description: string;
  completed: boolean;
  isCustom?: boolean;
}
```

- [ ] **Step 3: Create `src/types/uci.ts`**

```typescript
export type UciResourceType = "tutoring" | "writing" | "stem" | "wellness" | "library";

export interface UciResource {
  id: string;
  name: string;
  type: UciResourceType;
  description: string;
  targetSubjects: string[]; // e.g. ["COMPSCI", "INF", "MATH", "WRITING", "ALL"]
  location: string;
  url: string;
  hours: string;
  tags: string[];
}
```

- [ ] **Step 4: Create `src/types/storage.ts`**

```typescript
import { CanvasCourse, CanvasAssignment } from "./canvas";
import { AssignmentMilestone } from "./study";

export interface FocusSessionLog {
  id: string;
  assignmentId?: number;
  courseId?: number;
  durationMinutes: number;
  timestamp: string;
}

export interface ZotCanvasStorage {
  canvas_token: string | null;
  canvas_host: string;
  gemini_api_key: string | null;
  is_demo_mode: boolean;
  has_agreed_disclaimer: boolean;
  cached_courses: CanvasCourse[];
  cached_assignments: CanvasAssignment[];
  assignment_milestones: Record<number, AssignmentMilestone[]>; // assignmentId -> milestones
  focus_sessions: FocusSessionLog[];
  what_if_grades: Record<number, number>; // assignmentId -> simulated score
}
```

- [ ] **Step 5: Commit types**

```bash
git add src/types/
git commit -m "feat(types): define Canvas, Study, Storage, and UCI Resource models"
```

---

### Task 3: Stateless Canvas API Relay Proxy

**Files:**
- Create: `src/app/api/canvas/[...path]/route.ts`
- Test: `tests/api/canvas-proxy.test.ts`

- [ ] **Step 1: Write the failing unit test for the proxy route**

`tests/api/canvas-proxy.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/canvas/[...path]/route";
import { NextRequest } from "next/server";

describe("Canvas Stateless Relay Route", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 401 if Authorization header is missing", async () => {
    const req = new NextRequest("http://localhost:3000/api/canvas/courses");
    const res = await GET(req, { params: Promise.resolve({ path: ["courses"] }) });
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toContain("Missing Canvas authorization token");
  });

  it("relays request with bearer token to canvas.eee.uci.edu", async () => {
    const mockCanvasResponse = [{ id: 1234, name: "COMPSCI 161" }];
    const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockCanvasResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const req = new NextRequest("http://localhost:3000/api/canvas/courses", {
      headers: {
        Authorization: "Bearer test-uci-token-123",
      },
    });

    const res = await GET(req, { params: Promise.resolve({ path: ["courses"] }) });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual(mockCanvasResponse);

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://canvas.eee.uci.edu/api/v1/courses",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-uci-token-123",
        }),
      })
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/api/canvas-proxy.test.ts`
Expected: FAIL (Cannot find module `@/app/api/canvas/[...path]/route`)

- [ ] **Step 3: Implement minimal route handler**

`src/app/api/canvas/[...path]/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_CANVAS_HOST = "canvas.eee.uci.edu";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing Canvas authorization token in Authorization header." },
      { status: 401 }
    );
  }

  const canvasHost = req.headers.get("x-canvas-host") || DEFAULT_CANVAS_HOST;
  const queryString = req.nextUrl.search;
  const targetUrl = `https://${canvasHost}/api/v1/${path.join("/")}${queryString}`;

  try {
    const canvasRes = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
    });

    const data = await canvasRes.text();
    return new NextResponse(data, {
      status: canvasRes.status,
      headers: {
        "Content-Type": canvasRes.headers.get("content-Type") || "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown network error";
    return NextResponse.json(
      { error: `Failed to relay request to Canvas: ${message}` },
      { status: 502 }
    );
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/api/canvas-proxy.test.ts`
Expected: PASS (2 tests passed)

- [ ] **Step 5: Commit**

```bash
git add src/app/api/canvas/[...path]/route.ts tests/api/canvas-proxy.test.ts
git commit -m "feat(api): implement stateless Canvas CORS relay proxy route"
```

---

### Task 4: Deterministic Workload & Priority Engine

**Files:**
- Create: `src/lib/priority-engine.ts`
- Test: `tests/lib/priority-engine.test.ts`

- [ ] **Step 1: Write unit tests for Priority & Workload Engine**

`tests/lib/priority-engine.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import {
  calculatePriorityScore,
  estimateAssignmentHours,
  categorizeAssignment,
  calculateDailyWorkload,
} from "@/lib/priority-engine";
import { CanvasAssignment } from "@/types/canvas";

describe("Priority & Workload Engine", () => {
  const sampleAssignment: CanvasAssignment = {
    id: 101,
    course_id: 1,
    name: "Project 2: Graph Routing",
    description: "Implement Dijkstra algorithm in Python. 100 points.",
    due_at: new Date(Date.now() + 18 * 3600 * 1000).toISOString(), // 18 hours from now
    points_possible: 100,
    submission_types: ["online_upload"],
  };

  it("calculates higher priority score for assignments due within 24 hours", () => {
    const hoursLeft = 18;
    const score = calculatePriorityScore(sampleAssignment, hoursLeft);
    expect(score).toBeGreaterThan(60);
  });

  it("estimates completion hours appropriately based on points and keywords", () => {
    const hours = estimateAssignmentHours(sampleAssignment);
    expect(hours).toBeGreaterThanOrEqual(4); // Programming project with 100 points
  });

  it("categorizes urgent assignment into do_first quadrant", () => {
    const quad = categorizeAssignment(85, 18, false);
    expect(quad).toBe("do_first");
  });

  it("flags burnout risk when daily work exceeds 6 hours", () => {
    const assignments: CanvasAssignment[] = [
      { ...sampleAssignment, id: 1, points_possible: 100 },
      { ...sampleAssignment, id: 2, points_possible: 100 },
    ];
    const dailyMap = calculateDailyWorkload(assignments);
    const hasRisk = dailyMap.some((d) => d.isBurnoutRisk);
    expect(hasRisk).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run tests/lib/priority-engine.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/priority-engine.ts`**

```typescript
import { CanvasAssignment } from "@/types/canvas";
import { PrioritizedAssignment, UrgencyQuadrant, DailyWorkload } from "@/types/study";

export function estimateAssignmentHours(assignment: CanvasAssignment): number {
  const text = (assignment.name + " " + assignment.description).toLowerCase();
  let baseHours = 1.5;

  if (text.includes("project") || text.includes("programming") || text.includes("lab")) {
    baseHours = 5.0;
  } else if (text.includes("essay") || text.includes("paper") || text.includes("write")) {
    baseHours = 4.0;
  } else if (text.includes("quiz") || text.includes("survey") || text.includes("reading check")) {
    baseHours = 0.5;
  } else if (text.includes("homework") || text.includes("problem set") || text.includes("hw")) {
    baseHours = 3.0;
  }

  // Adjust by points weight
  if (assignment.points_possible >= 100) {
    baseHours = Math.max(baseHours, 4.0);
  } else if (assignment.points_possible <= 10) {
    baseHours = Math.min(baseHours, 1.0);
  }

  return Math.round(baseHours * 10) / 10;
}

export function calculatePriorityScore(
  assignment: CanvasAssignment,
  hoursUntilDue: number | null
): number {
  if (hoursUntilDue === null) return 10; // No due date = low priority
  if (hoursUntilDue < 0) return 99; // Overdue = max panic

  // Weight point factor (up to 40 pts)
  const pointsFactor = Math.min(assignment.points_possible / 100, 1.0) * 40;

  // Urgency factor: decays as hours grow (up to 60 pts)
  // 12 hours left -> 50 pts; 72 hours left -> 15 pts
  const urgencyFactor = (1 / Math.max(hoursUntilDue / 24, 0.2)) * 25;
  const clampedUrgency = Math.min(urgencyFactor, 60);

  return Math.round(pointsFactor + clampedUrgency);
}

export function categorizeAssignment(
  priorityScore: number,
  hoursUntilDue: number | null,
  isOverdue: boolean
): UrgencyQuadrant {
  if (isOverdue || (hoursUntilDue !== null && hoursUntilDue <= 36) || priorityScore >= 75) {
    return "do_first";
  }
  if (hoursUntilDue !== null && hoursUntilDue <= 120) {
    return "schedule";
  }
  if (priorityScore < 30) {
    return "delegate_or_quick";
  }
  return "backlog";
}

export function prioritizeAssignments(
  assignments: CanvasAssignment[],
  courseMap: Record<number, string> = {}
): PrioritizedAssignment[] {
  const now = Date.now();

  return assignments.map((assignment) => {
    let hoursUntilDue: number | null = null;
    let isOverdue = false;

    if (assignment.due_at) {
      const diffMs = new Date(assignment.due_at).getTime() - now;
      hoursUntilDue = Math.round(diffMs / (1000 * 60 * 60));
      isOverdue = diffMs < 0;
    }

    const priorityScore = calculatePriorityScore(assignment, hoursUntilDue);
    const estimatedHours = estimateAssignmentHours(assignment);
    const quadrant = categorizeAssignment(priorityScore, hoursUntilDue, isOverdue);

    return {
      assignment,
      courseName: courseMap[assignment.course_id] || `Course ${assignment.course_id}`,
      priorityScore,
      estimatedHours,
      hoursUntilDue,
      quadrant,
      isOverdue,
    };
  }).sort((a, b) => b.priorityScore - a.priorityScore);
}

export function calculateDailyWorkload(assignments: CanvasAssignment[]): DailyWorkload[] {
  const dayBuckets: Record<string, { hours: number; count: number; date: Date }> = {};
  const today = new Date();

  // Initialize next 7 days
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const key = d.toISOString().split("T")[0];
    dayBuckets[key] = { hours: 0, count: 0, date: d };
  }

  for (const a of assignments) {
    if (!a.due_at) continue;
    const dueKey = a.due_at.split("T")[0];
    if (dayBuckets[dueKey]) {
      dayBuckets[dueKey].hours += estimateAssignmentHours(a);
      dayBuckets[dueKey].count += 1;
    }
  }

  return Object.entries(dayBuckets).map(([dateString, info]) => {
    const dayLabel = info.date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    return {
      dateString,
      dayLabel,
      estimatedHours: Math.round(info.hours * 10) / 10,
      assignmentCount: info.count,
      isBurnoutRisk: info.hours >= 6.0,
    };
  });
}
```

- [ ] **Step 4: Run test to verify pass**

Run: `npx vitest run tests/lib/priority-engine.test.ts`
Expected: PASS (4 tests passed)

- [ ] **Step 5: Commit**

```bash
git add src/lib/priority-engine.ts tests/lib/priority-engine.test.ts
git commit -m "feat(study): implement deterministic workload and priority score engine"
```

---

### Task 5: Rule-Based Assignment Milestone Breakdown Engine

**Files:**
- Create: `src/lib/milestone-engine.ts`
- Test: `tests/lib/milestone-engine.test.ts`

- [ ] **Step 1: Write unit tests for Milestone Engine**

`tests/lib/milestone-engine.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { generateMilestonesForAssignment } from "@/lib/milestone-engine";
import { CanvasAssignment } from "@/types/canvas";

describe("Milestone Engine", () => {
  it("generates programming-specific milestones for coding assignments", () => {
    const assignment: CanvasAssignment = {
      id: 201,
      course_id: 1,
      name: "ICS 46: Lab 3 Binary Search Trees",
      description: "Submit your bst.cpp and Makefile to Gradescope.",
      due_at: null,
      points_possible: 50,
      submission_types: ["online_upload"],
    };

    const milestones = generateMilestonesForAssignment(assignment);
    expect(milestones.length).toBeGreaterThanOrEqual(4);
    expect(milestones.some((m) => m.phase === "understand")).toBe(true);
    expect(milestones.some((m) => m.phase === "execute")).toBe(true);
    expect(milestones.some((m) => m.title.toLowerCase().includes("code") || m.title.toLowerCase().includes("logic"))).toBe(true);
  });

  it("extracts milestones based on rubric criteria if present", () => {
    const assignment: CanvasAssignment = {
      id: 202,
      course_id: 2,
      name: "Writing 39C Advocacy Essay",
      description: "Write 1500 words on water conservation.",
      due_at: null,
      points_possible: 100,
      submission_types: ["online_upload"],
      rubric: [
        { id: "r1", description: "Thesis Statement & Context", points: 25, ratings: [] },
        { id: "r2", description: "Scholarly Evidence & Citations", points: 35, ratings: [] },
      ],
    };

    const milestones = generateMilestonesForAssignment(assignment);
    expect(milestones.some((m) => m.description.includes("Thesis Statement"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run tests/lib/milestone-engine.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/milestone-engine.ts`**

```typescript
import { CanvasAssignment } from "@/types/canvas";
import { AssignmentMilestone } from "@/types/study";

export function generateMilestonesForAssignment(
  assignment: CanvasAssignment,
  existingMilestones: AssignmentMilestone[] = []
): AssignmentMilestone[] {
  if (existingMilestones && existingMilestones.length > 0) {
    return existingMilestones;
  }

  const name = assignment.name.toLowerCase();
  const desc = (assignment.description || "").toLowerCase();
  const isCoding = name.includes("lab") || name.includes("project") || name.includes("code") || desc.includes("github") || desc.includes("gradescope");
  const isWriting = name.includes("essay") || name.includes("paper") || name.includes("draft") || name.includes("writing");

  const milestones: AssignmentMilestone[] = [];

  // Phase 1: Understand
  milestones.push({
    id: `${assignment.id}-m1`,
    title: "Review Prompt & Submission Formats",
    phase: "understand",
    description: `Read assignment details (${assignment.points_possible} pts). Check required formats: ${assignment.submission_types.join(", ") || "Canvas upload"}.`,
    completed: false,
  });

  // Phase 2: Draft & Outline
  if (isCoding) {
    milestones.push({
      id: `${assignment.id}-m2`,
      title: "Architecture & Starter Environment",
      phase: "draft",
      description: "Set up local repository/files, create test harness, and design algorithm edge cases.",
      completed: false,
    });
  } else if (isWriting) {
    milestones.push({
      id: `${assignment.id}-m2`,
      title: "Outline Arguments & Collect Sources",
      phase: "draft",
      description: "Create section outline, gather primary and secondary scholarly citations.",
      completed: false,
    });
  } else {
    milestones.push({
      id: `${assignment.id}-m2`,
      title: "Gather Course Notes & Resources",
      phase: "draft",
      description: "Review relevant lecture slides, textbook readings, and discussion worksheets.",
      completed: false,
    });
  }

  // Phase 3: Core Execution (Include Rubric if available)
  if (assignment.rubric && assignment.rubric.length > 0) {
    for (let i = 0; i < Math.min(assignment.rubric.length, 3); i++) {
      const criterion = assignment.rubric[i];
      milestones.push({
        id: `${assignment.id}-rubric-${i}`,
        phase: "execute",
        title: `Deliverable: ${criterion.description.slice(0, 40)}`,
        description: `Targeting all ${criterion.points} pts for criterion: "${criterion.description}".`,
        completed: false,
      });
    }
  } else {
    milestones.push({
      id: `${assignment.id}-m3`,
      title: isCoding ? "Implement Core Functionality" : "Execute Deliverable Draft",
      phase: "execute",
      description: isCoding ? "Write core logic, data structures, and handle normal/boundary inputs." : "Complete initial full draft according to prompt requirements.",
      completed: false,
    });
  }

  // Phase 4: Review & Verification
  milestones.push({
    id: `${assignment.id}-m4`,
    title: "Final Verification & Canvas Submission",
    phase: "review",
    description: "Self-check against rubric criteria, confirm clean file export, and verify submission confirmation on Canvas.",
    completed: false,
  });

  return milestones;
}
```

- [ ] **Step 4: Run test to verify pass**

Run: `npx vitest run tests/lib/milestone-engine.test.ts`
Expected: PASS (2 tests passed)

- [ ] **Step 5: Commit**

```bash
git add src/lib/milestone-engine.ts tests/lib/milestone-engine.test.ts
git commit -m "feat(study): implement rule-based homework milestone breakdown engine"
```

---

### Task 6: Context-Aware UCI Academic & Wellness Resource Matcher

**Files:**
- Create: `src/lib/uci-resources.ts`
- Test: `tests/lib/uci-resources.test.ts`

- [ ] **Step 1: Write unit tests for UCI Resource Matcher**

`tests/lib/uci-resources.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { findRelevantUciResources, UCI_CAMPUS_RESOURCES } from "@/lib/uci-resources";

describe("UCI Campus Resource Matcher", () => {
  it("includes LARC tutoring and ICS labs in directory", () => {
    expect(UCI_CAMPUS_RESOURCES.some((r) => r.name.includes("LARC"))).toBe(true);
    expect(UCI_CAMPUS_RESOURCES.some((r) => r.name.includes("Writing Center"))).toBe(true);
  });

  it("matches ICS tutoring for COMPSCI courses", () => {
    const matches = findRelevantUciResources("COMPSCI 161", "Algorithm design");
    expect(matches.some((r) => r.id === "ics-peer-tutoring")).toBe(true);
  });

  it("matches Writing Center for Writing or Essay courses", () => {
    const matches = findRelevantUciResources("WRITING 39C", "Research paper draft");
    expect(matches.some((r) => r.id === "cewc-writing-center")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run tests/lib/uci-resources.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/uci-resources.ts`**

```typescript
import { UciResource } from "@/types/uci";

export const UCI_CAMPUS_RESOURCES: UciResource[] = [
  {
    id: "larc-peer-tutoring",
    name: "LARC (Learning & Academic Resource Center)",
    type: "tutoring",
    description: "Small-group peer tutoring sessions and exam reviews for Math, Chemistry, BioSci, and Physics.",
    targetSubjects: ["MATH", "CHEM", "BIO SCI", "PHYSICS", "STATS"],
    location: "Rowland Hall 284",
    url: "https://larc.uci.edu",
    hours: "Mon-Thu 9am-6pm, Fri 9am-3pm",
    tags: ["STEM", "Tutoring", "Exam Prep"],
  },
  {
    id: "cewc-writing-center",
    name: "Center for Excellence in Writing & Communication",
    type: "writing",
    description: "One-on-one writing consultations for WRITING 39, upper-division essays, resumes, and research papers.",
    targetSubjects: ["WRITING", "HUMANITIES", "HISTORY", "ENGLISH", "ALL"],
    location: "Ayala Science Library 193",
    url: "https://writingcenter.uci.edu",
    hours: "Mon-Fri 9am-5pm (In-person & Zoom)",
    tags: ["Essays", "Writing", "Citations"],
  },
  {
    id: "ics-peer-tutoring",
    name: "ICS Peer Tutoring & Drop-in Labs",
    type: "stem",
    description: "Free drop-in debugging and concept help from undergraduate tutors for ICS 31-46, CS 161, and CS 141.",
    targetSubjects: ["COMPSCI", "ICS", "IN4MATX", "INF", "SWE"],
    location: "Donald Bren Hall (DBH) 1st Floor Labs",
    url: "https://ics.uci.edu/academics/undergraduate-academic-advising/",
    hours: "Mon-Fri 10am-5pm",
    tags: ["Python", "C++", "Java", "Debugging"],
  },
  {
    id: "uci-counseling-center",
    name: "UCI Counseling Center",
    type: "wellness",
    description: "Confidential mental health support, stress management, and walk-in crisis appointments for registered Anteaters.",
    targetSubjects: ["ALL"],
    location: "Student Services 1, Room 202",
    url: "https://counseling.uci.edu",
    hours: "Mon-Fri 8am-5pm (24/7 Phone Support: 949-824-6457)",
    tags: ["Mental Health", "Stress", "Confidential"],
  },
  {
    id: "uci-libraries-study",
    name: "UCI Libraries & Subject Librarians",
    type: "library",
    description: "Reserve group study rooms at Langson / Ayala and connect with research subject librarians for scholarly citations.",
    targetSubjects: ["ALL"],
    location: "Langson Library & Ayala Science Library",
    url: "https://www.lib.uci.edu",
    hours: "Open late during academic weeks",
    tags: ["Study Rooms", "Research", "Quiet Study"],
  },
];

export function findRelevantUciResources(
  courseCodeOrName: string,
  assignmentText: string = ""
): UciResource[] {
  const normalized = (courseCodeOrName + " " + assignmentText).toUpperCase();

  const relevant = UCI_CAMPUS_RESOURCES.filter((res) => {
    if (res.targetSubjects.includes("ALL")) return false; // Put general ones in secondary
    return res.targetSubjects.some((subj) => normalized.includes(subj));
  });

  // Always append general library and wellness support
  const general = UCI_CAMPUS_RESOURCES.filter((r) => r.targetSubjects.includes("ALL"));
  return [...relevant, ...general];
}
```

- [ ] **Step 4: Run test to verify pass**

Run: `npx vitest run tests/lib/uci-resources.test.ts`
Expected: PASS (3 tests passed)

- [ ] **Step 5: Commit**

```bash
git add src/lib/uci-resources.ts tests/lib/uci-resources.test.ts
git commit -m "feat(uci): implement context-aware UCI campus resource matcher"
```

---

### Task 7: Quarter Pace Tracker & Grade "What-If" Simulator Engine

**Files:**
- Create: `src/lib/grade-simulator.ts`
- Test: `tests/lib/grade-simulator.test.ts`

- [ ] **Step 1: Write unit tests for Grade Simulator & Quarter Pace**

`tests/lib/grade-simulator.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import {
  calculateQuarterWeek,
  calculateWhatIfGrade,
  getLetterGrade,
} from "@/lib/grade-simulator";
import { CanvasAssignment } from "@/types/canvas";

describe("Grade Simulator & Quarter Pace", () => {
  it("converts percentage into letter grades accurately", () => {
    expect(getLetterGrade(94)).toBe("A");
    expect(getLetterGrade(88)).toBe("B+");
    expect(getLetterGrade(72)).toBe("C-");
    expect(getLetterGrade(55)).toBe("F");
  });

  it("calculates what-if grade correctly with simulated scores", () => {
    const assignments: CanvasAssignment[] = [
      { id: 1, course_id: 10, name: "HW1", description: "", due_at: null, points_possible: 100, submission_types: [] },
      { id: 2, course_id: 10, name: "HW2", description: "", due_at: null, points_possible: 100, submission_types: [] },
    ];
    // HW1 scored 90, HW2 simulated 80
    const whatIfScores = { 1: 90, 2: 80 };
    const result = calculateWhatIfGrade(assignments, whatIfScores);
    expect(result.totalPoints).toBe(200);
    expect(result.earnedPoints).toBe(170);
    expect(result.percentage).toBe(85);
    expect(result.letterGrade).toBe("B");
  });

  it("computes quarter week within 1 to 11", () => {
    const week = calculateQuarterWeek(new Date());
    expect(week).toBeGreaterThanOrEqual(1);
    expect(week).toBeLessThanOrEqual(11);
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npx vitest run tests/lib/grade-simulator.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/lib/grade-simulator.ts`**

```typescript
import { CanvasAssignment } from "@/types/canvas";

export function getLetterGrade(percentage: number): string {
  if (percentage >= 93) return "A";
  if (percentage >= 90) return "A-";
  if (percentage >= 87) return "B+";
  if (percentage >= 83) return "B";
  if (percentage >= 80) return "B-";
  if (percentage >= 77) return "C+";
  if (percentage >= 73) return "C";
  if (percentage >= 70) return "C-";
  if (percentage >= 67) return "D+";
  if (percentage >= 60) return "D";
  return "F";
}

export function calculateWhatIfGrade(
  assignments: CanvasAssignment[],
  whatIfScores: Record<number, number>
): { totalPoints: number; earnedPoints: number; percentage: number; letterGrade: string } {
  let totalPossible = 0;
  let totalEarned = 0;

  for (const a of assignments) {
    if (a.points_possible <= 0) continue;
    totalPossible += a.points_possible;
    const score = whatIfScores[a.id] !== undefined ? whatIfScores[a.id] : a.points_possible * 0.85; // default estimate
    totalEarned += Math.max(0, Math.min(score, a.points_possible));
  }

  const percentage = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 1000) / 10 : 100;
  return {
    totalPoints: totalPossible,
    earnedPoints: Math.round(totalEarned * 10) / 10,
    percentage,
    letterGrade: getLetterGrade(percentage),
  };
}

export function calculateQuarterWeek(now: Date = new Date()): number {
  // Approximate standard UCI 10-week cycle + Finals week
  // Month 9/10/11 = Fall, 1/2/3 = Winter, 4/5/6 = Spring
  const month = now.getMonth(); // 0-indexed
  let startMonth = 8; // Sep (Fall)
  if (month >= 0 && month <= 2) startMonth = 0; // Jan (Winter)
  else if (month >= 3 && month <= 5) startMonth = 3; // Apr (Spring)

  const quarterStartDate = new Date(now.getFullYear(), startMonth, 25);
  const diffTime = now.getTime() - quarterStartDate.getTime();
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const weekNumber = Math.floor(diffDays / 7) + 1;

  return Math.min(Math.max(weekNumber, 1), 11);
}
```

- [ ] **Step 4: Run test to verify pass**

Run: `npx vitest run tests/lib/grade-simulator.test.ts`
Expected: PASS (3 tests passed)

- [ ] **Step 5: Commit**

```bash
git add src/lib/grade-simulator.ts tests/lib/grade-simulator.test.ts
git commit -m "feat(study): implement Grade What-If simulator and Quarter pace tracker"
```

---

### Task 8: UCI Demo Dataset & Canvas Service Layer

**Files:**
- Create: `src/lib/demo-data.ts`
- Create: `src/lib/canvas-client.ts`

- [ ] **Step 1: Create realistic UCI sample courses & assignments in `src/lib/demo-data.ts`**

```typescript
import { CanvasCourse, CanvasAssignment } from "@/types/canvas";

export const DEMO_UCI_COURSES: CanvasCourse[] = [
  {
    id: 101,
    name: "COMPSCI 161: Design and Analysis of Algorithms",
    course_code: "COMPSCI 161",
    term_name: "Fall Quarter",
    current_score: 92.4,
    current_grade: "A-",
  },
  {
    id: 102,
    name: "INF 133: User Interaction Software",
    course_code: "INF 133",
    term_name: "Fall Quarter",
    current_score: 96.0,
    current_grade: "A",
  },
  {
    id: 103,
    name: "STATS 67: Introduction to Probability & Statistics for CS",
    course_code: "STATS 67",
    term_name: "Fall Quarter",
    current_score: 87.5,
    current_grade: "B+",
  },
  {
    id: 104,
    name: "WRITING 39C: Argument & Research",
    course_code: "WRITING 39C",
    term_name: "Fall Quarter",
    current_score: 89.0,
    current_grade: "B+",
  },
];

const now = Date.now();
const hour = 3600 * 1000;

export const DEMO_UCI_ASSIGNMENTS: CanvasAssignment[] = [
  {
    id: 201,
    course_id: 101,
    name: "Homework 3: Dynamic Programming & Shortest Paths",
    description: "Complete problems 1-4 on LeetCode/Canvas. Provide recurrence relations and time complexity proofs. Submit PDF on Gradescope.",
    due_at: new Date(now + 26 * hour).toISOString(), // Due tomorrow
    points_possible: 100,
    submission_types: ["online_upload"],
    rubric: [
      { id: "r1", description: "Recurrence Relation Correctness", points: 40, ratings: [] },
      { id: "r2", description: "Time & Space Complexity Proofs", points: 30, ratings: [] },
      { id: "r3", description: "Base Cases & Edge Conditions", points: 30, ratings: [] },
    ],
  },
  {
    id: 202,
    course_id: 102,
    name: "Project 2: React Component Library & Accessibility Audit",
    description: "Design accessible modal components compliant with WCAG 2.1 AA standards. Include keyboard navigation and screen reader tags.",
    due_at: new Date(now + 68 * hour).toISOString(), // Due in ~3 days
    points_possible: 150,
    submission_types: ["online_url", "online_upload"],
    rubric: [
      { id: "r1", description: "Keyboard Navigation & Focus Traps", points: 50, ratings: [] },
      { id: "r2", description: "WCAG 2.1 AA Color Contrast", points: 50, ratings: [] },
      { id: "r3", description: "Component Modularity & Code Quality", points: 50, ratings: [] },
    ],
  },
  {
    id: 203,
    course_id: 103,
    name: "Weekly Quiz 4: Central Limit Theorem",
    description: "Timed 20-minute multiple-choice quiz covering sample distributions and standard normal calculations.",
    due_at: new Date(now + 12 * hour).toISOString(), // Due in 12 hours (URGENT)
    points_possible: 20,
    submission_types: ["online_quiz"],
  },
  {
    id: 204,
    course_id: 104,
    name: "Historical Conversations Project: Final Draft",
    description: "Submit 2,500 word research essay analyzing environmental policy in Southern California. Minimum 8 peer-reviewed citations.",
    due_at: new Date(now + 110 * hour).toISOString(), // Due in ~4.5 days
    points_possible: 200,
    submission_types: ["online_upload"],
    rubric: [
      { id: "r1", description: "Thesis Originality & Scholarly Context", points: 60, ratings: [] },
      { id: "r2", description: "Evidence Integration & MLA Citations", points: 70, ratings: [] },
      { id: "r3", description: "Prose Clarity, Transitions, & Revision", points: 70, ratings: [] },
    ],
  },
];
```

- [ ] **Step 2: Create `src/lib/canvas-client.ts`**

```typescript
import { CanvasCourse, CanvasAssignment } from "@/types/canvas";

export async function fetchCanvasCourses(token: string, host = "canvas.eee.uci.edu"): Promise<CanvasCourse[]> {
  const res = await fetch("/api/canvas/courses?enrollment_state=active&include[]=total_scores&include[]=term", {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-canvas-host": host,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch Canvas courses (${res.status}): ${errorText}`);
  }

  const raw = await res.json();
  return raw
    .filter((c: any) => c.name && !c.access_restricted_by_date)
    .map((c: any) => ({
      id: c.id,
      name: c.name,
      course_code: c.course_code || c.name,
      term_name: c.term?.name,
      current_score: c.enrollments?.[0]?.computed_current_score,
      current_grade: c.enrollments?.[0]?.computed_current_grade,
    }));
}

export async function fetchCanvasAssignments(
  courseId: number,
  token: string,
  host = "canvas.eee.uci.edu"
): Promise<CanvasAssignment[]> {
  const res = await fetch(`/api/canvas/courses/${courseId}/assignments?include[]=rubric&per_page=50`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-canvas-host": host,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch assignments for course ${courseId}`);
  }

  const raw = await res.json();
  return raw.map((a: any) => ({
    id: a.id,
    course_id: a.course_id,
    name: a.name,
    description: a.description || "",
    due_at: a.due_at,
    points_possible: a.points_possible || 0,
    submission_types: a.submission_types || [],
    rubric: a.rubric?.map((r: any) => ({
      id: String(r.id),
      description: r.description,
      points: r.points,
      ratings: r.ratings || [],
    })),
    has_submitted_submissions: a.has_submitted_submissions || false,
  }));
}
```

- [ ] **Step 3: Commit demo data and Canvas client**

```bash
git add src/lib/demo-data.ts src/lib/canvas-client.ts
git commit -m "feat(canvas): add realistic UCI demo data and client-side Canvas API fetchers"
```

---

### Task 9: Optional Bring-Your-Own Gemini Free AI Client

**Files:**
- Create: `src/lib/gemini-client.ts`

- [ ] **Step 1: Implement direct client-side Google Gemini Flash API caller**

`src/lib/gemini-client.ts`:
```typescript
export interface AiHomeworkGuidance {
  plainSummary: string;
  keyActionItems: string[];
  conceptTips: string[];
  rubricAdvice: string;
}

export async function explainAssignmentWithGemini(
  assignmentName: string,
  assignmentDescription: string,
  geminiApiKey: string
): Promise<AiHomeworkGuidance> {
  const cleanDescription = assignmentDescription.replace(/<[^>]*>?/gm, "").slice(0, 2000);

  const prompt = `You are a helpful UCI academic peer tutor. Analyze this university assignment prompt.
Provide:
1. A concise plain-English 2-sentence summary.
2. 3-4 concrete action items to finish it efficiently.
3. 2 key concept tips or pitfalls to avoid.
4. 1 sentence on maximizing rubric points.

Assignment Name: ${assignmentName}
Details:
${cleanDescription}

Respond strictly in valid JSON with keys: "plainSummary", "keyActionItems" (array of strings), "conceptTips" (array of strings), "rubricAdvice" (string).`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini.");
  }

  return JSON.parse(text) as AiHomeworkGuidance;
}
```

- [ ] **Step 2: Commit optional Gemini client**

```bash
git add src/lib/gemini-client.ts
git commit -m "feat(ai): add optional client-side Gemini Flash BYOK caller"
```

---

### Task 10: Client-Side Storage Context & State Management

**Files:**
- Create: `src/context/storage-context.tsx`

- [ ] **Step 1: Implement `src/context/storage-context.tsx` with local storage synchronization and purge action**

```typescript
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ZotCanvasStorage, FocusSessionLog } from "@/types/storage";
import { CanvasCourse, CanvasAssignment } from "@/types/canvas";
import { AssignmentMilestone } from "@/types/study";
import { DEMO_UCI_COURSES, DEMO_UCI_ASSIGNMENTS } from "@/lib/demo-data";
import { fetchCanvasCourses, fetchCanvasAssignments } from "@/lib/canvas-client";

interface StorageContextType extends ZotCanvasStorage {
  setCanvasToken: (token: string, host?: string) => void;
  setGeminiApiKey: (key: string | null) => void;
  setAgreedDisclaimer: (agreed: boolean) => void;
  enableDemoMode: () => void;
  purgeAllData: () => void;
  toggleMilestone: (assignmentId: number, milestoneId: string) => void;
  setMilestones: (assignmentId: number, milestones: AssignmentMilestone[]) => void;
  addFocusSession: (session: Omit<FocusSessionLog, "id" | "timestamp">) => void;
  setWhatIfScore: (assignmentId: number, score: number) => void;
  refreshCanvasData: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const STORAGE_KEY = "zotcanvas_state_v1";

const defaultState: ZotCanvasStorage = {
  canvas_token: null,
  canvas_host: "canvas.eee.uci.edu",
  gemini_api_key: null,
  is_demo_mode: false,
  has_agreed_disclaimer: false,
  cached_courses: [],
  cached_assignments: [],
  assignment_milestones: {},
  focus_sessions: [],
  what_if_grades: {},
};

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ZotCanvasStorage>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch (e) {
      console.error("Failed to read from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to LocalStorage on state change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error("Failed to persist to localStorage:", e);
      }
    }
  }, [state, isHydrated]);

  const setCanvasToken = (token: string, host = "canvas.eee.uci.edu") => {
    setState((prev) => ({
      ...prev,
      canvas_token: token,
      canvas_host: host,
      is_demo_mode: false,
    }));
  };

  const setGeminiApiKey = (key: string | null) => {
    setState((prev) => ({ ...prev, gemini_api_key: key }));
  };

  const setAgreedDisclaimer = (agreed: boolean) => {
    setState((prev) => ({ ...prev, has_agreed_disclaimer: agreed }));
  };

  const enableDemoMode = () => {
    setState((prev) => ({
      ...prev,
      is_demo_mode: true,
      has_agreed_disclaimer: true,
      cached_courses: DEMO_UCI_COURSES,
      cached_assignments: DEMO_UCI_ASSIGNMENTS,
    }));
  };

  const purgeAllData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setState(defaultState);
  };

  const toggleMilestone = (assignmentId: number, milestoneId: string) => {
    setState((prev) => {
      const current = prev.assignment_milestones[assignmentId] || [];
      const updated = current.map((m) =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      );
      return {
        ...prev,
        assignment_milestones: {
          ...prev.assignment_milestones,
          [assignmentId]: updated,
        },
      };
    });
  };

  const setMilestones = (assignmentId: number, milestones: AssignmentMilestone[]) => {
    setState((prev) => ({
      ...prev,
      assignment_milestones: {
        ...prev.assignment_milestones,
        [assignmentId]: milestones,
      },
    }));
  };

  const addFocusSession = (session: Omit<FocusSessionLog, "id" | "timestamp">) => {
    const newSession: FocusSessionLog = {
      ...session,
      id: `focus-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      focus_sessions: [newSession, ...prev.focus_sessions],
    }));
  };

  const setWhatIfScore = (assignmentId: number, score: number) => {
    setState((prev) => ({
      ...prev,
      what_if_grades: {
        ...prev.what_if_grades,
        [assignmentId]: score,
      },
    }));
  };

  const refreshCanvasData = async () => {
    if (state.is_demo_mode) {
      setState((prev) => ({
        ...prev,
        cached_courses: DEMO_UCI_COURSES,
        cached_assignments: DEMO_UCI_ASSIGNMENTS,
      }));
      return;
    }

    if (!state.canvas_token) return;

    setIsLoading(true);
    setError(null);
    try {
      const courses = await fetchCanvasCourses(state.canvas_token, state.canvas_host);
      const allAssignments: CanvasAssignment[] = [];

      for (const c of courses) {
        try {
          const assignList = await fetchCanvasAssignments(c.id, state.canvas_token, state.canvas_host);
          allAssignments.push(...assignList);
        } catch (e) {
          console.warn(`Could not fetch assignments for course ${c.id}:`, e);
        }
      }

      setState((prev) => ({
        ...prev,
        cached_courses: courses,
        cached_assignments: allAssignments,
      }));
    } catch (err: any) {
      setError(err.message || "Failed to sync Canvas data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StorageContext.Provider
      value={{
        ...state,
        setCanvasToken,
        setGeminiApiKey,
        setAgreedDisclaimer,
        enableDemoMode,
        purgeAllData,
        toggleMilestone,
        setMilestones,
        addFocusSession,
        setWhatIfScore,
        refreshCanvasData,
        isLoading,
        error,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const ctx = useContext(StorageContext);
  if (!ctx) throw new Error("useStorage must be used within StorageProvider");
  return ctx;
}
```

- [ ] **Step 2: Commit storage context**

```bash
git add src/context/storage-context.tsx
git commit -m "feat(context): implement secure client-only local storage state provider"
```

---

### Task 11: UI Components - Academic Disclaimer & Token Setup Modal

**Files:**
- Create: `src/components/layout/DisclaimerModal.tsx`
- Create: `src/components/onboarding/TokenSetupModal.tsx`
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create `src/components/layout/DisclaimerModal.tsx`**

```typescript
"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

export function DisclaimerModal() {
  const { has_agreed_disclaimer, setAgreedDisclaimer } = useStorage();

  if (has_agreed_disclaimer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center space-x-3 text-amber-600 mb-4">
          <ShieldAlert className="w-8 h-8 flex-shrink-0" />
          <h2 className="text-xl font-bold text-slate-900">Academic Integrity & Disclaimer</h2>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          <strong>ZotCanvas</strong> is an independent, student-built time management, study organization, and campus resource companion for UC Irvine students.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-relaxed space-y-2 mb-6">
          <p>
            <strong>UCI Academic Honesty Notice:</strong> ZotCanvas is strictly an organizational aid. It does <em>not</em> complete assignments, write code, or generate exam solutions.
          </p>
          <p>
            Any academic dishonesty, unauthorized collaboration, or violation of the UCI Academic Honesty Policy is <strong>entirely the user's own responsibility</strong>. The authors and hosts disclaim all liability for user academic conduct.
          </p>
        </div>

        <button
          onClick={() => setAgreedDisclaimer(true)}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-uci-blue text-white font-medium hover:bg-uci-darkblue transition-colors shadow-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-uci-gold" />
          <span>I Understand & Agree</span>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/onboarding/TokenSetupModal.tsx`**

```typescript
"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { KeyRound, Lock, ExternalLink, Sparkles, AlertCircle } from "lucide-react";

export function TokenSetupModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { canvas_token, setCanvasToken, gemini_api_key, setGeminiApiKey, enableDemoMode, refreshCanvasData } = useStorage();
  const [tokenInput, setTokenInput] = useState(canvas_token || "");
  const [geminiInput, setGeminiInput] = useState(gemini_api_key || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    setIsSubmitting(true);
    setCanvasToken(tokenInput.trim());
    if (geminiInput.trim()) {
      setGeminiApiKey(geminiInput.trim());
    } else {
      setGeminiApiKey(null);
    }

    setTimeout(async () => {
      await refreshCanvasData();
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const handleDemoClick = () => {
    enableDemoMode();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-uci-blue">
            <KeyRound className="w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900">Connect Your UCI Canvas</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-xl">
            ×
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start space-x-2 mb-4">
          <Lock className="w-4 h-4 text-uci-blue flex-shrink-0 mt-0.5" />
          <span>
            <strong>100% Private:</strong> Your token is stored only in your browser&apos;s localStorage and never saved to any database.
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Canvas Personal Access Token <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Paste token from Canvas Settings..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uci-blue font-mono"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
              <span>How to get: Go to Canvas → Account → Settings → + New Access Token</span>
              <a
                href="https://canvas.eee.uci.edu/profile/settings"
                target="_blank"
                rel="noreferrer"
                className="text-uci-blue underline flex items-center space-x-0.5 ml-1"
              >
                <span>Open Canvas</span>
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
              <span>Google Gemini API Key (Strictly Optional)</span>
              <span className="text-[10px] font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">100% Free Tier</span>
            </label>
            <input
              type="password"
              value={geminiInput}
              onChange={(e) => setGeminiInput(e.target.value)}
              placeholder="AIzaSy... (Optional for AI guidance)"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uci-blue font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Leave blank if you don&apos;t want AI. The app is fully operational with rule-based algorithms.
            </p>
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !tokenInput.trim()}
              className="flex-1 py-2.5 rounded-xl bg-uci-blue text-white font-medium hover:bg-uci-darkblue transition-colors disabled:opacity-50 text-sm shadow-sm"
            >
              {isSubmitting ? "Connecting..." : "Save & Sync Canvas"}
            </button>
            <button
              type="button"
              onClick={handleDemoClick}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium flex items-center space-x-1"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Use Demo Mode</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/layout/Navbar.tsx`**

```typescript
"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { TokenSetupModal } from "../onboarding/TokenSetupModal";
import { BookOpen, RefreshCw, Trash2, Key, Sparkles, CheckCircle2 } from "lucide-react";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) {
  const { canvas_token, is_demo_mode, purgeAllData, refreshCanvasData, isLoading } = useStorage();
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-uci-blue to-uci-darkblue flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-uci-gold">
              Z
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">ZotCanvas</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-uci-lightgold text-uci-darkblue border border-amber-300">
                  UCI
                </span>
                {is_demo_mode && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Demo Mode
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Anteater Study & Workload Command Center</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "assignments", label: "Assignments & Milestones" },
              { id: "workload", label: "Workload & Calendar" },
              { id: "resources", label: "UCI Campus Hub" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-uci-blue text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => refreshCanvasData()}
              disabled={isLoading}
              title="Refresh Canvas Data"
              className="p-2 text-slate-600 hover:text-uci-blue rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-uci-blue" : ""}`} />
            </button>

            <button
              onClick={() => setIsTokenModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 hover:border-uci-blue hover:text-uci-blue text-slate-700 bg-white transition-all shadow-sm"
            >
              <Key className="w-3.5 h-3.5 text-uci-blue" />
              <span>{canvas_token ? "Token Active" : "Connect Token"}</span>
            </button>

            <button
              onClick={() => {
                if (confirm("Purge all locally stored tokens and course data?")) {
                  purgeAllData();
                }
              }}
              title="Purge all local data and log out"
              className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <TokenSetupModal isOpen={isTokenModalOpen} onClose={() => setIsTokenModalOpen(false)} />
    </>
  );
}
```

- [ ] **Step 4: Commit components**

```bash
git add src/components/layout/ src/components/onboarding/
git commit -m "feat(ui): add DisclaimerModal, TokenSetupModal, and responsive Navbar"
```

---

### Task 12: UI Components - Dashboard (Burnout Guard, Urgency Matrix, Focus Timer)

**Files:**
- Create: `src/components/dashboard/BurnoutGuard.tsx`
- Create: `src/components/dashboard/EisenhowerMatrix.tsx`
- Create: `src/components/dashboard/PomodoroTimer.tsx`

- [ ] **Step 1: Create `src/components/dashboard/BurnoutGuard.tsx`**

```typescript
"use client";

import React from "react";
import { DailyWorkload } from "@/types/study";
import { AlertTriangle, CheckCircle, Flame } from "lucide-react";

export function BurnoutGuard({ workloads }: { workloads: DailyWorkload[] }) {
  const burnoutDays = workloads.filter((w) => w.isBurnoutRisk);
  const totalUpcomingHours = workloads.reduce((acc, curr) => acc + curr.estimatedHours, 0);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 text-sm">Workload Fatigue & Burnout Guard</h3>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
          {totalUpcomingHours} hrs estimated across 7 days
        </span>
      </div>

      {burnoutDays.length > 0 ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start space-x-3 text-red-900">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold">Heavy Crunch Alert on {burnoutDays.map((d) => d.dayLabel).join(", ")}!</p>
            <p className="text-red-800">
              You have {burnoutDays[0].estimatedHours} hours of estimated homework due on a single day. Consider pulling the core drafting phase forward by 24–48 hours to prevent fatigue.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center space-x-2 text-emerald-900 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Workload is well-balanced across the week. No excessive deadline clustering detected!</span>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/dashboard/PomodoroTimer.tsx`**

```typescript
"use client";

import React, { useState, useEffect } from "react";
import { useStorage } from "@/context/storage-context";
import { Play, Pause, RotateCcw, Target } from "lucide-react";

export function PomodoroTimer({ activeAssignmentName }: { activeAssignmentName?: string }) {
  const { addFocusSession } = useStorage();
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      if (mode === "work") {
        addFocusSession({ durationMinutes: 25 });
        alert("Focus session complete! Take a well-earned 5-minute break.");
        setMode("break");
        setSecondsLeft(5 * 60);
      } else {
        alert("Break is over! Ready for the next sprint?");
        setMode("work");
        setSecondsLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode, addFocusSession]);

  const toggle = () => setIsRunning(!isRunning);
  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="bg-gradient-to-br from-uci-darkblue to-slate-900 rounded-2xl p-5 text-white shadow-lg border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 text-uci-gold">
          <Target className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Anteater Focus Sprint</span>
        </div>
        <div className="flex space-x-1 bg-slate-800/80 rounded-lg p-0.5 text-[11px]">
          <button
            onClick={() => { setMode("work"); setSecondsLeft(25 * 60); setIsRunning(false); }}
            className={`px-2 py-0.5 rounded ${mode === "work" ? "bg-uci-blue text-white" : "text-slate-400"}`}
          >
            25m Focus
          </button>
          <button
            onClick={() => { setMode("break"); setSecondsLeft(5 * 60); setIsRunning(false); }}
            className={`px-2 py-0.5 rounded ${mode === "break" ? "bg-emerald-600 text-white" : "text-slate-400"}`}
          >
            5m Break
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          <div className="text-3xl font-mono font-black tracking-tight">{formattedTime}</div>
          <p className="text-[11px] text-slate-300 truncate max-w-[200px]">
            {activeAssignmentName || "General Focus"}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggle}
            className="w-10 h-10 rounded-full bg-uci-gold text-slate-900 flex items-center justify-center font-bold hover:bg-yellow-400 transition-colors shadow"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button
            onClick={reset}
            className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/dashboard/EisenhowerMatrix.tsx`**

```typescript
"use client";

import React from "react";
import { PrioritizedAssignment } from "@/types/study";
import { AlertCircle, Calendar, CheckSquare, Clock } from "lucide-react";

export function EisenhowerMatrix({
  priorities,
  onSelectAssignment,
}: {
  priorities: PrioritizedAssignment[];
  onSelectAssignment: (p: PrioritizedAssignment) => void;
}) {
  const doFirst = priorities.filter((p) => p.quadrant === "do_first");
  const schedule = priorities.filter((p) => p.quadrant === "schedule");
  const quick = priorities.filter((p) => p.quadrant === "delegate_or_quick");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-base">Prioritized Task Matrix (Eisenhower Engine)</h3>
        <span className="text-xs text-slate-500 font-medium">Auto-scored by points & due countdown</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Do First */}
        <div className="bg-red-50/60 rounded-2xl p-4 border border-red-200">
          <div className="flex items-center space-x-2 text-red-700 font-bold text-xs uppercase tracking-wide mb-3">
            <AlertCircle className="w-4 h-4" />
            <span>Do Today / Urgent ({doFirst.length})</span>
          </div>
          <div className="space-y-2">
            {doFirst.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No urgent deadlines pending!</p>
            ) : (
              doFirst.map((item) => (
                <div
                  key={item.assignment.id}
                  onClick={() => onSelectAssignment(item)}
                  className="bg-white rounded-xl p-3 border border-red-100 shadow-sm hover:border-red-300 hover:shadow transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-uci-blue uppercase">{item.courseName}</span>
                    <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                      {item.hoursUntilDue !== null ? `${item.hoursUntilDue}h left` : "Urgent"}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 mt-1 line-clamp-2">{item.assignment.name}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>{item.assignment.points_possible} pts</span>
                    <span>~{item.estimatedHours} hrs</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200">
          <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-wide mb-3">
            <Calendar className="w-4 h-4" />
            <span>Schedule Ahead ({schedule.length})</span>
          </div>
          <div className="space-y-2">
            {schedule.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No mid-term projects pending.</p>
            ) : (
              schedule.map((item) => (
                <div
                  key={item.assignment.id}
                  onClick={() => onSelectAssignment(item)}
                  className="bg-white rounded-xl p-3 border border-amber-100 shadow-sm hover:border-amber-300 hover:shadow transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-uci-blue uppercase">{item.courseName}</span>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {item.hoursUntilDue !== null ? `${Math.round(item.hoursUntilDue / 24)}d left` : "Upcoming"}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 mt-1 line-clamp-2">{item.assignment.name}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>{item.assignment.points_possible} pts</span>
                    <span>~{item.estimatedHours} hrs</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Wins */}
        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wide mb-3">
            <CheckSquare className="w-4 h-4" />
            <span>Quick Wins / Low Stakes ({quick.length})</span>
          </div>
          <div className="space-y-2">
            {quick.length === 0 ? (
              <p className="text-xs text-slate-500 italic">All minor tasks clear.</p>
            ) : (
              quick.map((item) => (
                <div
                  key={item.assignment.id}
                  onClick={() => onSelectAssignment(item)}
                  className="bg-white rounded-xl p-3 border border-emerald-100 shadow-sm hover:border-emerald-300 hover:shadow transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-uci-blue uppercase">{item.courseName}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Fast
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 mt-1 line-clamp-2">{item.assignment.name}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>{item.assignment.points_possible} pts</span>
                    <span>~{item.estimatedHours} hrs</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit dashboard components**

```bash
git add src/components/dashboard/
git commit -m "feat(ui): implement BurnoutGuard, PomodoroTimer, and EisenhowerMatrix"
```

---

### Task 13: UI Components - Assignment Milestone Inspector & What-If Simulator

**Files:**
- Create: `src/components/assignments/AssignmentDetailModal.tsx`
- Create: `src/components/assignments/WhatIfGradeSimulator.tsx`

- [ ] **Step 1: Create `src/components/assignments/AssignmentDetailModal.tsx`**

```typescript
"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { CanvasAssignment } from "@/types/canvas";
import { generateMilestonesForAssignment } from "@/lib/milestone-engine";
import { findRelevantUciResources } from "@/lib/uci-resources";
import { explainAssignmentWithGemini, AiHomeworkGuidance } from "@/lib/gemini-client";
import { CheckCircle2, Circle, Sparkles, ExternalLink, BookOpen, Clock, AlertCircle } from "lucide-react";

export function AssignmentDetailModal({
  assignment,
  courseName,
  onClose,
  onStartFocus,
}: {
  assignment: CanvasAssignment | null;
  courseName?: string;
  onClose: () => void;
  onStartFocus: (a: CanvasAssignment) => void;
}) {
  const { assignment_milestones, toggleMilestone, setMilestones, gemini_api_key } = useStorage();
  const [aiGuidance, setAiGuidance] = useState<AiHomeworkGuidance | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!assignment) return null;

  const currentMilestones = generateMilestonesForAssignment(
    assignment,
    assignment_milestones[assignment.id]
  );

  const uciResources = findRelevantUciResources(courseName || "", assignment.description);

  const handleAskGemini = async () => {
    if (!gemini_api_key) {
      alert("No Gemini API Key entered. You can add your free key in the Token settings, or use the built-in rule milestones!");
      return;
    }
    setIsAiLoading(true);
    setAiError(null);
    try {
      const guidance = await explainAssignmentWithGemini(
        assignment.name,
        assignment.description,
        gemini_api_key
      );
      setAiGuidance(guidance);
    } catch (e: any) {
      setAiError(e.message || "Failed to call Gemini.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <span className="text-xs font-bold text-uci-blue uppercase tracking-wide">{courseName}</span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{assignment.name}</h2>
            <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
              <span>{assignment.points_possible} Total Points</span>
              <span>•</span>
              <span>Due: {assignment.due_at ? new Date(assignment.due_at).toLocaleString() : "No fixed due date"}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-xl">
            ×
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={() => onStartFocus(assignment)}
            className="flex-1 py-2 px-3 rounded-xl bg-uci-blue text-white text-xs font-semibold hover:bg-uci-darkblue transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <Clock className="w-3.5 h-3.5 text-uci-gold" />
            <span>Launch Pomodoro Focus Sprint</span>
          </button>

          {gemini_api_key && (
            <button
              onClick={handleAskGemini}
              disabled={isAiLoading}
              className="py-2 px-3 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>{isAiLoading ? "Analyzing..." : "AI Study Advice"}</span>
            </button>
          )}
        </div>

        {/* AI Guidance Box if loaded */}
        {aiGuidance && (
          <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 mb-6 text-xs text-purple-950 space-y-2">
            <div className="font-bold flex items-center space-x-1.5 text-purple-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Gemini Study Assistant Breakdown</span>
            </div>
            <p className="italic">{aiGuidance.plainSummary}</p>
            <div className="space-y-1 pt-1">
              <span className="font-semibold block">Key Action Steps:</span>
              <ul className="list-disc pl-4 space-y-0.5">
                {aiGuidance.keyActionItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="pt-1 text-[11px] text-purple-800">
              <strong>Rubric Advice:</strong> {aiGuidance.rubricAdvice}
            </p>
          </div>
        )}

        {/* Milestone Checklist */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center justify-between">
            <span>Actionable Milestone Checklist (Rule-Engine)</span>
            <span className="text-xs font-normal text-slate-500">
              {currentMilestones.filter((m) => m.completed).length} / {currentMilestones.length} Completed
            </span>
          </h3>

          <div className="space-y-2">
            {currentMilestones.map((m) => (
              <div
                key={m.id}
                onClick={() => toggleMilestone(assignment.id, m.id)}
                className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  m.completed
                    ? "bg-emerald-50/50 border-emerald-200 text-slate-500"
                    : "bg-slate-50 border-slate-200 hover:border-uci-blue"
                }`}
              >
                {m.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`text-xs font-bold ${m.completed ? "line-through text-slate-500" : "text-slate-900"}`}>
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Context-Aware UCI Resources */}
        {uciResources.length > 0 && (
          <div className="border-t border-slate-100 pt-4">
            <h4 className="font-bold text-slate-900 text-xs mb-2">Recommended UCI Campus Support for this Task:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {uciResources.slice(0, 2).map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 hover:border-uci-blue bg-white flex items-center justify-between text-xs group transition-colors"
                >
                  <div>
                    <span className="font-bold text-slate-800 group-hover:text-uci-blue">{res.name}</span>
                    <p className="text-[10px] text-slate-500">{res.location}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-uci-blue" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/assignments/WhatIfGradeSimulator.tsx`**

```typescript
"use client";

import React from "react";
import { useStorage } from "@/context/storage-context";
import { CanvasAssignment } from "@/types/canvas";
import { calculateWhatIfGrade } from "@/lib/grade-simulator";
import { Calculator } from "lucide-react";

export function WhatIfGradeSimulator({
  assignments,
  courseName,
}: {
  assignments: CanvasAssignment[];
  courseName: string;
}) {
  const { what_if_grades, setWhatIfScore } = useStorage();
  const summary = calculateWhatIfGrade(assignments, what_if_grades);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-uci-blue" />
          <h3 className="font-bold text-slate-900 text-sm">What-If Grade Simulator ({courseName})</h3>
        </div>
        <div className="text-right">
          <span className="text-xl font-extrabold text-uci-blue">{summary.percentage}%</span>
          <span className="ml-1.5 text-sm font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {summary.letterGrade}
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {assignments.map((a) => {
          const currentScore = what_if_grades[a.id] ?? Math.round(a.points_possible * 0.85);
          return (
            <div key={a.id} className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-800 truncate max-w-[240px]">{a.name}</span>
                <span className="font-mono text-slate-600 font-bold">
                  {currentScore} / {a.points_possible} pts
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={a.points_possible}
                value={currentScore}
                onChange={(e) => setWhatIfScore(a.id, Number(e.target.value))}
                className="w-full accent-uci-blue cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit assignment components**

```bash
git add src/components/assignments/
git commit -m "feat(ui): implement AssignmentDetailModal and WhatIfGradeSimulator"
```

---

### Task 14: UI Components - Workload Calendar & Study Heatmap

**Files:**
- Create: `src/components/calendar/WorkloadHeatmap.tsx`

- [ ] **Step 1: Create `src/components/calendar/WorkloadHeatmap.tsx`**

```typescript
"use client";

import React from "react";
import { DailyWorkload } from "@/types/study";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

export function WorkloadHeatmap({ workloads }: { workloads: DailyWorkload[] }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-uci-blue" />
          <h3 className="font-bold text-slate-900 text-sm">7-Day Study Workload Heatmap</h3>
        </div>
        <span className="text-xs text-slate-500">Calculated from assignment due dates</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {workloads.map((day) => {
          let bgClass = "bg-slate-50 border-slate-200 text-slate-700";
          if (day.estimatedHours >= 6) {
            bgClass = "bg-red-50 border-red-300 text-red-900";
          } else if (day.estimatedHours >= 3) {
            bgClass = "bg-amber-50 border-amber-300 text-amber-900";
          } else if (day.estimatedHours > 0) {
            bgClass = "bg-emerald-50 border-emerald-300 text-emerald-900";
          }

          return (
            <div key={day.dateString} className={`p-3.5 rounded-xl border ${bgClass} text-center space-y-1`}>
              <span className="block text-[11px] font-bold uppercase">{day.dayLabel}</span>
              <div className="text-xl font-black">{day.estimatedHours}h</div>
              <span className="block text-[10px] text-slate-500">
                {day.assignmentCount} {day.assignmentCount === 1 ? "task" : "tasks"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit WorkloadHeatmap**

```bash
git add src/components/calendar/
git commit -m "feat(ui): implement 7-day WorkloadHeatmap component"
```

---

### Task 15: UI Components - UCI Campus Hub (Resource Matcher & Directory)

**Files:**
- Create: `src/components/resources/UciResourceHub.tsx`

- [ ] **Step 1: Create `src/components/resources/UciResourceHub.tsx`**

```typescript
"use client";

import React, { useState } from "react";
import { UCI_CAMPUS_RESOURCES } from "@/lib/uci-resources";
import { ExternalLink, Search, MapPin, Clock, Compass } from "lucide-react";

export function UciResourceHub() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = UCI_CAMPUS_RESOURCES.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = filterType === "all" || res.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-uci-blue to-uci-darkblue rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center space-x-2 text-uci-gold mb-1">
          <Compass className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Anteater Resource Compass</span>
        </div>
        <h2 className="text-xl font-bold">UCI Academic & Wellness Campus Hub</h2>
        <p className="text-xs text-slate-200 mt-1 max-w-xl">
          Curated directory of UC Irvine tutoring centers, writing consultations, drop-in labs, and wellness counseling.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search LARC, CEWC, tutoring, DBH labs..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-uci-blue bg-white"
          />
        </div>

        <div className="flex space-x-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["all", "tutoring", "writing", "stem", "wellness", "library"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                filterType === type
                  ? "bg-uci-blue text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-uci-blue bg-blue-50 px-2 py-0.5 rounded">
                    {res.type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-2">{res.name}</h3>
                </div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-uci-blue hover:bg-slate-50"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{res.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{res.location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{res.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit UciResourceHub**

```bash
git add src/components/resources/
git commit -m "feat(ui): implement UciResourceHub directory component"
```

---

### Task 16: Main Application Page & Integration

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Create `src/app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { StorageProvider } from "@/context/storage-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZotCanvas | Anteater Study & Workload Command Center",
  description: "Privacy-first study organization and workload companion for UC Irvine students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">
        <StorageProvider>
          {children}
        </StorageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create `src/app/page.tsx`**

```typescript
"use client";

import React, { useState } from "react";
import { useStorage } from "@/context/storage-context";
import { Navbar } from "@/components/layout/Navbar";
import { DisclaimerModal } from "@/components/layout/DisclaimerModal";
import { BurnoutGuard } from "@/components/dashboard/BurnoutGuard";
import { PomodoroTimer } from "@/components/dashboard/PomodoroTimer";
import { EisenhowerMatrix } from "@/components/dashboard/EisenhowerMatrix";
import { AssignmentDetailModal } from "@/components/assignments/AssignmentDetailModal";
import { WhatIfGradeSimulator } from "@/components/assignments/WhatIfGradeSimulator";
import { WorkloadHeatmap } from "@/components/calendar/WorkloadHeatmap";
import { UciResourceHub } from "@/components/resources/UciResourceHub";
import { prioritizeAssignments, calculateDailyWorkload } from "@/lib/priority-engine";
import { calculateQuarterWeek } from "@/lib/grade-simulator";
import { CanvasAssignment } from "@/types/canvas";
import { PrioritizedAssignment } from "@/types/study";
import { Sparkles, Calendar, BookOpen, AlertCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const { cached_courses, cached_assignments, canvas_token, is_demo_mode } = useStorage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAssignment, setSelectedAssignment] = useState<CanvasAssignment | null>(null);
  const [activeFocusName, setActiveFocusName] = useState<string | undefined>(undefined);

  const courseMap = cached_courses.reduce<Record<number, string>>((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {});

  const prioritized = prioritizeAssignments(cached_assignments, courseMap);
  const workloads = calculateDailyWorkload(cached_assignments);
  const quarterWeek = calculateQuarterWeek();

  const handleSelectPrioritized = (item: PrioritizedAssignment) => {
    setSelectedAssignment(item.assignment);
  };

  const handleStartFocus = (a: CanvasAssignment) => {
    setActiveFocusName(a.name);
    setSelectedAssignment(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <DisclaimerModal />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Quarter Pace Header Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-uci-blue uppercase tracking-wider">Quarter Pace Tracker</span>
              <span className="text-xs bg-uci-lightgold text-uci-darkblue px-2 py-0.5 rounded font-bold">
                Week {quarterWeek} of 10
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active Courses: {cached_courses.length || "0"} | Pending Tasks: {cached_assignments.length}
            </p>
          </div>

          {!canvas_token && !is_demo_mode && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-3.5 py-2 text-xs text-blue-900 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-uci-blue flex-shrink-0" />
              <span>Connect your Canvas Token above or launch Demo Mode to load courses!</span>
            </div>
          )}
        </div>

        {/* View Switching */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <BurnoutGuard workloads={workloads} />
                <EisenhowerMatrix priorities={prioritized} onSelectAssignment={handleSelectPrioritized} />
              </div>

              <div className="space-y-6">
                <PomodoroTimer activeAssignmentName={activeFocusName} />
                {cached_courses.length > 0 && (
                  <WhatIfGradeSimulator
                    assignments={cached_assignments.filter((a) => a.course_id === cached_courses[0].id)}
                    courseName={cached_courses[0].name}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "assignments" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Assignments & Milestone Breakdown</h2>
                <p className="text-xs text-slate-500">Click any assignment to view rubric milestones and study support.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cached_assignments.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedAssignment(a)}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-uci-blue hover:shadow transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-uci-blue uppercase">
                      {courseMap[a.course_id] || `Course ${a.course_id}`}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-1 line-clamp-2">{a.name}</h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {a.description.replace(/<[^>]*>?/gm, "") || "No prompt details."}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-bold">{a.points_possible} pts</span>
                    <span className="text-uci-blue font-semibold flex items-center space-x-1">
                      <span>View Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "workload" && (
          <div className="space-y-6">
            <WorkloadHeatmap workloads={workloads} />
            <BurnoutGuard workloads={workloads} />
          </div>
        )}

        {activeTab === "resources" && (
          <div className="space-y-6">
            <UciResourceHub />
          </div>
        )}
      </main>

      {/* Assignment Detail Modal */}
      <AssignmentDetailModal
        assignment={selectedAssignment}
        courseName={selectedAssignment ? courseMap[selectedAssignment.course_id] : ""}
        onClose={() => setSelectedAssignment(null)}
        onStartFocus={handleStartFocus}
      />
    </div>
  );
}
```

- [ ] **Step 3: Run all unit tests to verify system integrity**

Run: `npx vitest run`
Expected: All test suites PASS.

- [ ] **Step 4: Verify production build**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 5: Commit complete application integration**

```bash
git add src/app/ tests/
git commit -m "feat: complete ZotCanvas application integration and verified build"
```
