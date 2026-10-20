# Specification: AntTrail ZotSniper WebReg Tactical Workstation (`/webreg`)

**Date:** 2026-10-20  
**Author:** AntTrail Engineering  
**Status:** Approved / In Planning  
**Target Route:** `/webreg`  

---

## 1. Problem Statement & Motivation

Course enrollment at UC Irvine via WebReg is notoriously stressful for students:
1. **8-Minute Session Expiration**: WebReg terminates user sessions after 8 minutes of inactivity or delay, causing panic and typing errors during frantic enrollment windows.
2. **Scattered 5-Digit Course Codes**: Students must manually look up 5-digit course codes on WebSoc, jot them down on scratch paper, and manually type them into WebReg.
3. **No Native Open-Seat Notifications**: When high-demand classes (`ICS 46`, `MATH 3A`, `COMPSCI 161`, etc.) fill up, students must manually refresh WebSoc multiple times a day hoping for someone to drop.
4. **Blind Waitlisting**: Students have no objective data on whether being #4 on a waitlist of 200 or #10 on a waitlist of 40 is likely to clear before the Week 2 drop deadline.
5. **Pre-flight Blunders**: Missing a \$5 fee hold on ZotAccount or encountering an unexpected prerequisite restriction locks students out of their enrollment window.

Automated bots that hold passwords and bypass Duo 2FA violate UC Irvine Computer and Network Use Policies and risk student suspension via OAISC. 

This specification establishes **AntTrail ZotSniper**, a privacy-first, 100% compliant, client-side tactical enrollment suite at `/webreg`.

---

## 2. Core Pillars & Architecture

```
                  [ User Input in /webreg ]
      Course Codes / Department / Enrollment Window Time
                               │
       ┌───────────────────────┼────────────────────────┐
       ▼                       ▼                        ▼
[ 1. WebSoc Live Radar ] [ 2. WebReg Pre-loader ] [ 3. Waitlist Odds Solver ]
- 5-digit code catalog   - AntTrail plan sync    - Capacity & position model
- Watchlist polling      - 1-click clipboard     - Dept historical drop rate
- Local Audio & Push     - Bookmarklet generator - Tactical clearance advice
- Discord Webhook relay  - Form auto-fill script - Discussion swap suggestions
                               │
                               ▼
            [ 4. Pre-Flight Window Countdown ]
            - Live countdown timer to window open
            - .ics Calendar export with 10-min alarm
            - Critical checklist (Holds, Prereqs, Backups)
```

---

## 3. Data Contracts & Mathematical Models

### 3.1 Course Section Model
```typescript
export interface WebSocSection {
  courseCode: string        // 5-digit code, e.g. "34010"
  courseTitle: string       // e.g. "ICS 46"
  sectionType: 'Lec' | 'Dis' | 'Lab' | 'Sem'
  sectionNum: string        // e.g. "Lec A", "Dis 1"
  instructor: string        // e.g. "PATTIS, R."
  time: string              // e.g. "M W F 11:00-11:50p"
  place: string             // e.g. "BS3 1200"
  maxCapacity: number       // e.g. 250
  enrolled: number          // e.g. 250
  waitlistCount: number     // e.g. 15
  status: 'OPEN' | 'Waitlist' | 'FULL'
  restrictions?: string     // e.g. "School of ICS only"
}
```

### 3.2 Waitlist Probability Model (`lib/webreg-engine.ts`)
The probability of clearing a waitlist is modeled as a function of class capacity ($C$), waitlist position ($P$), department category ($D$), and timing phase ($T$):

$$\text{Expected Drop Rate } R = R_{base}(D) \times M_{timing}(T)$$
$$\text{Expected Drops } E = C \times R$$
$$\text{Clearance Probability } P_{clear} = \min\left(0.99, \max\left(0.05, 1 - \frac{P - 1}{E \times 1.4}\right)\right)$$

Where:
- $R_{base}$:
  - `ICS / Computing`: ~10% (High attrition, fee drop + prereq drops)
  - `Mathematics`: ~14% (Significant drop rate in early weeks)
  - `Biological Sciences`: ~8% (Pre-med high hold rate)
  - `Social Sciences / Humanities`: ~12%
  - `General / Other`: ~10%
- $M_{timing}$:
  - `BEFORE_FEE_DEADLINE`: 1.25 (Spike of unpaid registration drops)
  - `WEEK_0`: 1.0 (Normal orientation adjustments)
  - `WEEK_1`: 0.75 (Active syllabus shopping)
  - `WEEK_2`: 0.35 (Last-minute emergency drops)

### 3.3 Bookmarklet Auto-Filler Contract
The bookmarklet generates an encoded `javascript:(function(){...})()` snippet that queries WebReg's DOM elements (`input[name="courseCode"]`) and populates them safely with a single click.

---

## 4. UI Specification (`app/webreg/page.tsx`)

### 4.1 Header & Hero
- AntTrail Anteater Blue (`#0064a4`), Gold (`#ffd200`), and Tactical Amber badges.
- Title: `ZotSniper: WebReg Tactical Command`.
- Subtitle: `Open-seat drop radar, 1-click WebReg course preloader, waitlist probability solver, and enrollment window countdown.`

### 4.2 Module 1: WebSoc Live Seat Radar & Watchlist
- Search bar supporting Department & Course Code (e.g. `ICS 46`, `MATH 3A`, `STATS 7`, `COMPSCI 161`).
- Section cards showing 5-digit code, instructor, time, enrolled/capacity, and status badge.
- "+ Add to Watchlist" button.
- Active Watchlist tray:
  - Audio alert toggle (synthesizes chime via Web Audio API).
  - Browser Push notification toggle (requests permission via Notification API).
  - Discord Webhook URL input + "Test Push" button.
  - "Simulate Seat Drop" button for instant testing.

### 4.3 Module 2: WebReg Fast Copy & 1-Click Bookmarklet
- Course sequence bar showing selected 5-digit codes (e.g. `34010 34025 44100 12050`).
- "1-Click Copy All Codes" with green check feedback.
- Drag-and-drop Bookmarklet button: "AntTrail WebReg Preloader".
- Step-by-step 3-step usage instruction banner with screenshot preview.

### 4.4 Module 3: Waitlist Probability Calculator
- Sliders/Inputs for:
  - Total Class Capacity ($50$ to $500$)
  - Your Waitlist Position ($1$ to $50$)
  - Academic Department (ICS, Math, Bio Sci, Engineering, Social Sciences)
  - Current Timing Phase (Before Fee Deadline, Week 0/Shopping, Week 1, Week 2)
- Real-time gauge:
  - Probability percentage ($0$ to $100\%$)
  - Tier badge: `High Clearance Odds` (emerald), `Moderate - Worth Holding` (amber), `Low - Switch to Plan B` (rose).
  - Actionable tactical recommendation text.

### 4.5 Module 4: Window Countdown & Pre-Flight Checklist
- Date-time picker for student's WebReg window (defaulted to next major enrollment period).
- Live flip/digital countdown (Days : Hours : Mins : Secs).
- "Add Alarm to Calendar (.ics)" button.
- Pre-flight interactive checklist with persistable checkbox state in `localStorage`.

---

## 5. Global Navigation & Discoverability

1. `components/Navbar.tsx`: Add `{ label: 'ZotSniper', href: '/webreg', badge: 'Radar' }` to nav links.
2. `components/Footer.tsx`: Add `/webreg` under Academic Planning.
3. `app/page.tsx`: Spotlight ZotSniper in the Bento Grid.
4. `app/degree-planning/page.tsx`: Add a direct link button: "Send Planned Courses to WebReg Pre-loader →".

---

## 6. Testing & Quality Assurance (`tests/webreg-sniper.test.ts`)

1. Unit tests for `lib/webreg-engine.ts`:
   - Waitlist probability solver boundary checks ($P=1$, $P > C$, edge-cases).
   - Drop rate multipliers by department and timing phase.
   - Bookmarklet script generator syntax validity.
   - Calendar `.ics` event string generator.
2. Build & Typecheck:
   - `npm test` runs with 100% passing tests.
   - `npm run build` succeeds cleanly.
