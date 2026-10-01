# ZotCanvas Design Specification

**Date:** 2026-10-01  
**Project:** ZotCanvas  
**Platform:** Next.js (App Router, React 19, TypeScript, Tailwind CSS, Lucide Icons)  
**Target Users:** UC Irvine (UCI) Students  

---

## 1. Executive Summary & Vision

**ZotCanvas** is a privacy-first, student-centric academic command center for UC Irvine students. It connects to UCI Canvas LMS via a student-provided Personal Access Token and provides advanced workload management, tactical homework execution, and context-aware academic guidance.

Unlike official institutional tools like **UCI Spark**, ZotCanvas:
1. **Never tracks or reports student activity** to university administration.
2. **Focuses on micro-level homework execution** (milestones, rubric checklists, Pomodoro blocks) rather than generic advising advice.
3. **Minimizes AI dependency**, powering its core scheduling and task breakdown with fast, deterministic, 100% free rule-based algorithms.
4. **Supports an optional, zero-cost Google Gemini Free API Key** for students who want AI-assisted homework concept explanations.

---

## 2. Security & Zero-Storage Privacy Model

### 2.1 Threat Model & Security Invariants
* **Invariant 1 (Zero Server Storage)**: No databases, Redis instances, or persistent file stores exist on the hosting server.
* **Invariant 2 (Token Isolation)**: The student's Canvas API Token and optional Gemini API Key are stored exclusively in the browser's `localStorage`.
* **Invariant 3 (Stateless CORS Relay)**: Because UCI Canvas (`canvas.eee.uci.edu`) blocks direct browser origin requests via CORS, requests are relayed through a stateless Next.js API route (`/api/canvas/*`). This proxy forwards the incoming `Authorization: Bearer <token>` directly to Canvas and returns the payload without caching, logging, or inspecting the token.
* **Invariant 4 (One-Click Data Purge)**: A prominent "Purge Data & Logout" action deletes all local keys, cached course data, and history instantly from the client.

### 2.2 Local Storage Schema
```typescript
interface ZotCanvasLocalStorage {
  canvas_token?: string;                  // User's Canvas Personal Access Token
  canvas_host?: string;                   // Defaults to "canvas.eee.uci.edu"
  gemini_api_key?: string;                // Optional free-tier AI key
  cached_courses?: CourseSummary[];       // Offline course cache
  cached_assignments?: Assignment[];      // Offline assignment cache
  task_milestones?: Record<string, MilestoneState[]>; // Student task checkmarks
  focus_sessions?: FocusSessionLog[];     // Pomodoro study logs
  what_if_grades?: Record<string, number>; // Hypothetical scores per assignment
}
```

---

## 3. Core Architecture & Data Flow

```
[User Browser (Local Client)]
  ├── LocalStorage: Token & Local Checklist State
  ├── State Management: React Context / Hooks
  ├── Engine 1: Deterministic Workload & Priority Evaluator
  ├── Engine 2: Rule-Based Assignment Milestone Generator
  ├── Engine 3: Context-Aware UCI Resource Matcher
  │
  ├─► [Optional Free Gemini Flash API] (Direct client-to-Google or client-proxied)
  │
  └─► HTTP (Header: Authorization: Bearer <token>)
        │
        ▼
[Next.js Stateless Route: /api/canvas/[...path]]
  │  (Forwards request to Canvas API, streams back response)
  ▼
[UCI Canvas LMS (https://canvas.eee.uci.edu/api/v1/...)]
```

---

## 4. Feature Specifications

### 4.1 Onboarding, Token Input & Demo Mode
* **Token Setup Modal**: Clear, step-by-step instructions showing students how to generate their token in Canvas:
  * `Canvas -> Account -> Settings -> Approved Integrations -> + New Access Token`.
  * Security reassurance banner highlighting client-only storage and link to open-source repository.
* **Full-Featured Demo Mode**: One-click "Explore with Sample UCI Courses" preloads realistic courses (*COMPSCI 161*, *INF 133*, *STATS 67*, *WRITING 39C*) with realistic rubrics, assignments, and deadlines so users can test before generating a token.

---

### 4.2 Time Management & Workload Engine (Algorithmic & AI-Free)
All calculations run deterministically in the client browser at zero latency and zero cost:

1. **Urgency & Priority Calculator (Eisenhower Matrix)**:
   * **Score Formula**:
     $$\text{Priority Score} = \left(\frac{\text{Points Weight}}{\text{Total Course Points}}\right) \times 40 + \left(\frac{1}{\max(\text{Hours Until Due}, 1)}\right) \times 60$$
   * Categorizes into:
     * **Do Immediately (Red)**: Due within $<48$ hours or score $>70$.
     * **Schedule Ahead (Amber)**: Major projects / midterms due in $3\text{--}7$ days.
     * **Quick Wins (Green)**: Small quizzes / discussions estimated under 30 minutes.

2. **Workload Fatigue & Burnout Guard**:
   * Estimates required hours based on assignment type and point value (e.g. Programming Assignment $\approx 6\text{h}$, Reading quiz $\approx 0.5\text{h}$, Essay $\approx 4\text{h}$).
   * Aggregates daily hours. If a single day exceeds $6$ estimated hours, flags a **Burnout Alert** with suggested redistributions into earlier study blocks.

3. **Integrated Focus Timer (Pomodoro / Deep Work)**:
   * 25m focus / 5m break or 50m / 10m customizable intervals.
   * Attach directly to an active assignment, logging completed focus sessions to course study stats.

---

### 4.3 Tactical Homework Guidance (Rule-Based First, AI-Optional)

1. **Algorithmic Milestone Breakdown (Rule-Based)**:
   * Parses assignment description, submission types (file upload, URL, text), and rubrics to automatically generate a 4-stage actionable checklist:
     * **Phase 1: Understand & Setup** (Read prompt, check rubric thresholds, set up environment/repo).
     * **Phase 2: Core Draft / Implementation** (Draft main arguments, implement core logic/code).
     * **Phase 3: Validation & Polish** (Run unit tests, grammar/format check, rubric compliance).
     * **Phase 4: Submission & Verification** (Export required format, verify file upload on Canvas).
   * Students can customize, add custom steps, and check off milestones; saved to `localStorage`.

2. **Optional Free AI Assistant (Bring-Your-Own Gemini API Key)**:
   * **Minimal & Optional**: The app is 100% functional without AI.
   * If the student enters a free Google Gemini key (from Google AI Studio, $0 cost, no credit card):
     * **Prompt Simplifier**: Translates multi-page academic prompts into bullet-point action items.
     * **Concept Explainer**: Explains technical algorithms or reading topics directly from the assignment prompt.
     * **Rubric Decoder**: Tells the student exactly what criteria must be met to get maximum points.

---

### 4.4 UCI Spark Integration: Campus Resources & Academic Analytics

1. **Context-Aware UCI Resource Matcher**:
   * Analyzes course code and assignment description to dynamically surface the exact UCI academic or wellness resource needed:
     * **Computer Science / ICS**: Drop-in ICS Peer Tutoring, Donald Bren Hall lab schedules.
     * **Writing / Humanities**: UCI Center for Excellence in Writing & Communication (CEWC) appointment scheduler.
     * **Math, Chemistry, Physics, Biology**: LARC (Learning and Academic Resource Center) tutorial schedules.
     * **Research Papers**: UCI Libraries Subject Specialists & Study Room reservations.
     * **Wellness Support**: Direct, confidential links to UCI Counseling Center, Campus Recreation, and Student Health Center.

2. **Academic Analytics & Quarter Pace**:
   * **Quarter Progress Tracker**: 10-week + Finals Week visual timeline showing current academic pacing.
   * **"What-If" Grade Simulator**: Interactive slider for every pending assignment to calculate projected final course grades and GPA impacts.

---

## 5. UI/UX Design Standards

* **Design Theme**: Clean, modern, high-density interface with UCI Anteater accents.
  * Primary: UCI Blue (`#0064a4`)
  * Accent: Anteater Gold (`#ffd200`)
  * Neutral Dark: Slate / Zinc (`#0f172a`, `#1e293b`)
  * Neutral Light: Crisp white with subtle borders (`#f8fafc`, `#e2e8f0`)
* **Responsive & Mobile-First**: Optimized for both laptop study sessions and quick phone checks on Ring Road or the Anteater Express.
* **Views**:
  1. **Command Center (Home)**: Today's agenda, burnout fatigue gauge, Eisenhower priority matrix, active Pomodoro bar.
  2. **Courses & Assignments**: Filterable by course, with full assignment prompt viewer, rubric breakdown, and milestone checklist.
  3. **Calendar & Workload**: Week/Month view with daily study hour heatmaps.
  4. **UCI Campus Hub**: Curated, searchable directory of UCI academic tutoring & wellness resources.
  5. **Settings & Security**: Token management, Gemini API key manager, local storage inspector, and Purge button.

---

## 6. Implementation Scope & Verification Plan

### Phase 1: Foundation & Proxy
* Initialize Next.js project with Tailwind CSS, Lucide Icons, and TypeScript.
* Implement stateless `/api/canvas/[...path]` proxy route with header forwarding and error handling.
* Implement client-side `StorageContext` for `localStorage` persistence and token lifecycle.

### Phase 2: Canvas Data & Mock Engine
* Build Canvas API client (Courses, Assignments, Submissions, Rubrics).
* Build rich UCI Demo dataset (*COMPSCI 161*, *INF 133*, *STATS 67*, *WRITING 39C*) for instant zero-token exploration.

### Phase 3: Workload & Time Management
* Implement Priority Scoring algorithm and Eisenhower categorization.
* Implement Workload Fatigue calculator & Burnout Guard.
* Implement Pomodoro Focus Timer with audio/visual notifications and local session tracking.

### Phase 4: Homework Guidance & UCI Resources
* Implement rule-based Assignment Milestone generator.
* Implement optional client-side Google Gemini Flash API caller.
* Implement Context-Aware UCI Resource Matcher (LARC, CEWC, ICS Tutoring, Wellness).
* Implement "What-If" Grade Simulator.

### Phase 5: Verification & Polish
* Verify zero data leakage (inspect network payloads, ensure no server-side retention).
* Verify mobile and desktop responsiveness.
* Run automated tests for priority algorithms and proxy handlers.
