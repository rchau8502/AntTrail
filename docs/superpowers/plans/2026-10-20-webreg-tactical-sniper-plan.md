# AntTrail ZotSniper WebReg Tactical Workstation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the ZotSniper WebReg Tactical Command workstation at `/webreg` providing live open-seat monitoring, waitlist clearance probability modeling, 5-digit course code 1-click WebReg preloading/bookmarklet, and enrollment window countdown.

**Architecture:** Pure algorithmic calculation engine in `lib/webreg-engine.ts` with comprehensive Vitest tests in `tests/webreg-sniper.test.ts`, paired with an interactive Next.js workstation in `app/webreg/page.tsx`, and wired into global navigation (`Navbar.tsx`, `Footer.tsx`, and `app/page.tsx`).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide icons, Web Audio API, Web Notifications API, Vitest.

---

### Task 1: Core Engine & Data Models (`lib/webreg-engine.ts`)

**Files:**
- Create: `lib/webreg-engine.ts`
- Test: `tests/webreg-sniper.test.ts`

- [x] **Step 1: Define TypeScript interfaces for WebSoc sections, waitlist inputs, and calculation outputs**
  - `WebSocSection`, `WaitlistProbabilityParams`, `WaitlistProbabilityReport`, `EnrollmentChecklistItem`.
- [x] **Step 2: Implement `calculateWaitlistProbability` function**
  - Formula applying class capacity, position, department attrition rate, and timing multipliers.
  - Return probability (0-100), tier (`HIGH`, `MODERATE`, `LOW`), expected drops, and tactical advice text.
- [x] **Step 3: Implement `generateWebRegBookmarklet` helper**
  - Produce encoded `javascript:(function(){...})()` that safely populates WebReg form inputs with 5-digit codes.
- [x] **Step 4: Implement `generateEnrollmentIcs` helper**
  - Produce valid iCalendar (`.ics`) format with 10-minute alarm and WebReg direct link.
- [x] **Step 5: Provide preloaded WebSoc course catalog for high-demand UCI courses**
  - Sections for `ICS 46`, `MATH 3A`, `COMPSCI 161`, `STATS 67`, `I&C SCI 33`, `ECON 20A`, `WRITING 60`.

---

### Task 2: Comprehensive Unit Tests (`tests/webreg-sniper.test.ts`)

**Files:**
- Create: `tests/webreg-sniper.test.ts`

- [x] **Step 1: Write unit tests for `calculateWaitlistProbability`**
  - Test boundary conditions (Position 1 on 250-person class -> HIGH probability > 90%).
  - Test deep waitlist (Position 35 on 50-person class -> LOW probability < 20%).
  - Test department drop rate variations (Math vs Bio Sci vs ICS).
  - Test timing phase multipliers (Fee deadline spike vs Week 2 late drop).
- [x] **Step 2: Write unit tests for `generateWebRegBookmarklet`**
  - Verify script includes course codes and handles empty inputs safely.
- [x] **Step 3: Write unit tests for `generateEnrollmentIcs`**
  - Verify VCALENDAR headers, alarm triggers, and ISO date formatting.
- [x] **Step 4: Run Vitest and verify all pass**
  - Run: `npx vitest run tests/webreg-sniper.test.ts`
  - Expected: 100% pass rate.

---

### Task 3: Interactive Tactical UI (`app/webreg/page.tsx`)

**Files:**
- Create: `app/webreg/page.tsx`

- [x] **Step 1: Build Header & Hero with Audio Chime synthesizer**
  - Anteater Blue (`#0064a4`), Gold (`#ffd200`), and Tactical Amber styling.
  - Badge: `ZotSniper WebReg Tactical Command`.
  - Title: `UCI Course Sniper & WebReg Fast-Action Hub`.
  - Built-in Web Audio API Anteater chime generator for seat alerts.
- [x] **Step 2: Build Module 1: WebSoc Live Seat Radar & Watchlist**
  - Search filter by department and course code.
  - Section cards with live status badges (`OPEN`, `Waitlist`, `FULL`), enroll count, time, room, instructor.
  - "+ Watch Section" button.
  - Active Watchlist with toggles for Browser Push notifications, audio chime, Discord Webhook URL input, and "Simulate Open Seat Drop" test trigger.
- [x] **Step 3: Build Module 2: WebReg Fast Copy & 1-Click Bookmarklet**
  - Sequence display of 5-digit course codes (e.g. `34010 34025 44100 12050`).
  - "1-Click Copy All Codes" with visual feedback.
  - Draggable Bookmarklet button for instant form autofill.
  - 3-step visual instruction guide for WebReg window execution.
- [x] **Step 4: Build Module 3: Waitlist Probability Calculator**
  - Real-time sliders for Class Capacity, Waitlist Position, Department, and Timing Phase.
  - Color-coded probability gauge (High, Moderate, Low).
  - Tactical advice callout (Hold position vs switch discussion section).
- [x] **Step 5: Build Module 4: Window Countdown & Pre-flight Checklist**
  - Real-time countdown timer to enrollment window opening.
  - One-click `.ics` Calendar export with 10-minute warning.
  - Interactive pre-flight checklist (ZotAccount financial hold, prerequisite clearance, backup sections) with `localStorage` persistence.

---

### Task 4: Global Navigation & Inter-Module Linkage

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `components/Footer.tsx`
- Modify: `app/page.tsx`
- Modify: `app/degree-planning/page.tsx`

- [x] **Step 1: Update `components/Navbar.tsx`**
  - Add `{ label: 'ZotSniper', href: '/webreg', badge: 'Radar' }` to desktop and mobile navigation.
- [x] **Step 2: Update `components/Footer.tsx`**
  - Add `/webreg` link under Academic Planning.
- [x] **Step 3: Update `app/page.tsx`**
  - Update Bento Grid to feature ZotSniper Tactical Command.
- [x] **Step 4: Update `app/degree-planning/page.tsx`**
  - Add a direct launch button into `/webreg` to bridge planned courses into 5-digit codes.

---

### Task 5: End-to-End Verification & Build

**Files:**
- All touched files

- [x] **Step 1: Run full Vitest suite**
  - Run: `npm test`
  - Verify all 15 test files pass.
- [x] **Step 2: Run Next.js production build**
  - Run: `npm run build`
  - Verify `/webreg` route builds cleanly.
- [x] **Step 3: Git commit**
  - Commit all changes with clear descriptive message.
