# AntTrail Phase 6 Design Specification: GPA Projection Engine, What-If Simulator & WCAG Polish

**Date:** 2026-10-01  
**Project:** AntTrail (`/Volumes/Crucial X9/AI/AntTrail`)  
**Scope:** Phase 6 (Deterministic UCI GPA Calculator, Repeat Policy Engine, Target GPA Solver, What-If Scenario Simulator & Accessibility)  
**Status:** Approved for Implementation  

---

## 1. Executive Summary & Problem Statement

Academic planning is inextricably linked to GPA management. UCI students need to know:
- What is their official UC Cumulative GPA (accounting strictly for UC Irvine rules regarding transfer credit and P/NP coursework)?
- If they repeat a course they received a `C-`, `D`, or `F` in, how does UCI's **16-unit grade replacement policy** affect their GPA?
- If they aim for **Latin Honors** (top 16% of graduating class, ~3.6-3.9 depending on school) or **Dean's Honor List** ($\ge 3.5$ with 12+ graded units), what average grade do they need in their remaining planned quarters?
- In a "What-If" scenario, what will their cumulative GPA curve look like quarter-by-quarter based on hypothetical grades assigned to planned courses?

Phase 6 implements a **100% deterministic GPA calculation and projection engine** adhering to official UC Irvine Academic Senate regulations.

---

## 2. Official UCI Academic Regulations & Deterministic Invariants

1. **UC GPA Letter Grade Points (UCI Academic Senate Regulation A340):**  
   - `A+` = 4.0, `A` = 4.0, `A-` = 3.7  
   - `B+` = 3.3, `B` = 3.0, `B-` = 2.7  
   - `C+` = 2.3, `C` = 2.0, `C-` = 1.7  
   - `D+` = 1.3, `D` = 1.0, `D-` = 0.7  
   - `F` = 0.0  
2. **Transfer Course Exclusion Invariant:**  
   Per UC Irvine policy, coursework taken at California Community Colleges or institutions outside the UC system awards degree credit towards graduation, but is **EXCLUDED** from the UC Cumulative GPA. Only courses where `institution === 'UCI'` (or other UC campuses) contribute to graded GPA units and grade points.
3. **Pass / No Pass (`P` / `NP`) Exclusion Invariant:**  
   Passed courses award unit credits toward graduation, but 0 grade points and 0 GPA units are added to the numerator or denominator.
4. **UCI Course Repeat Policy (Academic Senate Regulation A345):**  
   - A student may repeat a course in which a grade of `C-`, `D+`, `D`, `D-`, `F`, or `NP` was received.
   - For the **first 16 units** of repeated coursework, the new grade **replaces** the original grade in the calculation of the cumulative GPA.
   - Beyond 16 units of repeated coursework, both the original grade and subsequent grades are averaged into the cumulative GPA.
5. **Academic Standing Invariant:**  
   - **Good Standing:** Cumulative GPA $\ge 2.0$.  
   - **Academic Probation:** Term or cumulative GPA $< 2.0$.  
   - **Dean's Honor List:** Term GPA $\ge 3.5$ in at least 12 graded units with no grade below `C` or `NP`.

---

## 3. Mathematical Models & Target GPA Solver

### 3.1. Cumulative GPA Formula
$$\text{GPA} = \frac{\sum_{\text{graded UC courses}} (\text{GradePoints}_i \times \text{Units}_i)}{\sum_{\text{graded UC courses}} \text{Units}_i}$$

### 3.2. Target GPA Required Grade Formula
Given current grade points $G_{\text{current}}$, current graded units $U_{\text{current}}$, target cumulative GPA $T$, and upcoming planned graded units $U_{\text{planned}}$:

$$\text{Required GPA} = \frac{T \times (U_{\text{current}} + U_{\text{planned}}) - G_{\text{current}}}{U_{\text{planned}}}$$

**Feasibility Categorization:**
- If $\text{Required GPA} > 4.0$: **Mathematically Impossible** (requires higher than straight A's).
- If $\text{Required GPA} \le 0.0$: **Already Guaranteed** (even with straight F's).
- If $0.0 < \text{Required GPA} \le 4.0$: **Achievable** (displays closest letter grade target, e.g. "Average of B+ (3.30)").

---

## 4. UI Architecture & Components

1. **`GpaCalculatorView.tsx`:**  
   - **Summary KPI Cards:**
     - Current Cumulative UC GPA (with color badge: Green $\ge 3.5$, Blue $\ge 3.0$, Yellow $\ge 2.0$, Red $< 2.0$).
     - Total Graded Units vs Total Earned Units (highlighting transfer exclusion).
     - Academic Standing Badge & Dean's Honor List eligibility.
   - **Target GPA Planner:**
     - Target slider (2.0 to 4.0) with presets: *Good Standing (2.0)*, *Dean's List (3.5)*, *Cum Laude (3.65)*, *Summa Cum Laude (3.90)*.
     - Feasibility status bar and required average grade.
     - Grade combination suggestion (e.g. "3 A's and 1 B").
   - **Quarterly GPA History & What-If Simulator:**
     - Term-by-term historical breakdown.
     - Interactive table for upcoming planned quarters allowing students to pick hypothetical grades (`A`, `B`, `C`, etc.) for each planned course.
     - Real-time projected cumulative trajectory line chart.
   - **UCI Repeat Policy Tracker:**
     - Shows units consumed out of the 16-unit replacement cap.
2. **Navbar Integration:**
   - Activate the `GPA` tab button in `Navbar.tsx` (switching between `ELIGIBILITY`, `PLANNER`, `DEGREE`, `GPA`).
3. **Accessibility & WCAG AA:**
   - ARIA labels for buttons and sliders.
   - High-contrast text on dark backgrounds.
   - Responsive layouts for mobile devices.
