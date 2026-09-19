# ScholarStack

> **Evidence-Grounded Intelligence for Higher-Education Transfer & Admissions Pathways**

ScholarStack is an open-source, multi-platform monorepo that provides verifiable admissions data, GPA percentile chancing, degree audit tracking, and college directory search for California Community College (CCC) transfer students and first-year applicants.

---

## The Ecosystem

| Subsystem | Tech Stack | Platform | Path |
| :--- | :--- | :--- | :--- |
| **ScholarStack Web** | Next.js 15, React, Tailwind, Vitest | Web / Desktop / Mobile Browser | `apps/scholarpath` |
| **ScholarStack iOS** | Swift 6, SwiftUI, Swift Charts, VisionKit OCR | iOS 17+ / iPadOS 17+ Native | `apps/scholarstack-ios` |
| **ScholarHarvester** | Python 3.13, Poetry, Pytest, Alembic | Data Extraction Pipeline | `apps/scholarharvester` |
| **Supabase Database** | PostgreSQL, Row Level Security, Full-Text Search | Backend / Managed Storage | `supabase/` |

---

## Key Features

1. **Admissions Pathway Planner**:
   - Filter by campus (all 9 UCs, CSUs, Privates), cohort (Transfer vs. First-Year), major, and feeder school.
   - Interactive middle 50% GPA range charts (25th to 75th percentiles) and acceptance rate trends.
   - **Every metric links directly to an official citation** with publisher name, reporting year, and official provenance URL.

2. **Portfolio Strategy & Chancing Engine**:
   - Automated categorization into **Guaranteed (TAG)**, **Likely / Safety**, **Target**, and **Reach**.
   - Direct integration with UC Transfer Admission Guarantee (TAG) rules and CSU Associate Degree for Transfer (ADT) benefits.
   - 0–100 Portfolio Health Score diagnosing top-heavy risks and recommending balanced campus mixes.

3. **Transcript Auditor & OCR Degree Progress**:
   - Automatically parses course codes, units, and grades from pasted text or camera/photo OCR scans.
   - Computes cumulative transfer GPA and progress toward the 60-unit junior standing milestone.
   - Verifies satisfaction of the **UC 7-Course Pattern** and the **CSU Golden Four**.

4. **National College Directory**:
   - Sub-millisecond searchable directory of U.S. colleges and universities powered by College Scorecard data.
   - Compares in-state/out-of-state tuition, average net price, 10-year median earnings, and retention rates.

---

## Quickstart (Under 3 Minutes)

### Prerequisites
- Node.js 20+
- Python 3.11+ and Poetry
- macOS with Xcode 16+ / Swift 6+ (for iOS development)
- Docker (optional, for local Postgres/Redis)

### Unified Commands

```sh
# 1. Run all unit and domain tests across Web, Data Harvester, and iOS
make test

# 2. Run Playwright end-to-end browser tests
make test-e2e

# 3. Run code linters (ESLint & Ruff)
make lint

# 4. Build production web bundle and iOS simulator application
make build

# 5. Start local web development server (http://localhost:3000)
make dev
```

---

## Architecture & Subsystem Guides

For deep technical specifications, design patterns, and domain formulas, see [ARCHITECTURE.md](ARCHITECTURE.md).

Individual package guides:
- [ScholarStack Web README](apps/scholarpath/README.md)
- [ScholarStack iOS README](apps/scholarstack-ios/README.md)
- [ScholarHarvester README](apps/scholarharvester/README.md)
- [Data Provenance Ethics](apps/scholarharvester/DATA_PROVENANCE.md)

---

## Disclaimer & Legal Notes

ScholarStack is an independent research and educational platform. It is not affiliated with, endorsed by, or sponsored by the University of California, the California State University, or ASSIST. All metrics and institutional statistics originate from verified public research databases.
EOF
