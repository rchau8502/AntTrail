# CI/CD Pipeline & IndexedDB Local Storage Vault Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish GitHub Actions automated CI/CD verification, upgrade student record persistence to a high-capacity IndexedDB Local Vault with automatic fallback, and publish all commits to the remote GitHub repository.

**Architecture:** 
1. CI/CD runs TypeScript validation, Vitest (100+ tests), and Next.js Turbopack build on every push and pull request.
2. The IndexedDB Vault provides a zero-server, high-capacity (>50MB-1GB) local database abstraction for multi-year academic plans, degree audits, and course histories with automatic graceful fallback to `localStorage` and `MemoryStorage`.
3. An automatic migration layer copies existing `localStorage` student profiles and quarters into the vault seamlessly.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Vitest, Native IndexedDB API, GitHub Actions.

---

### Task 1: GitHub Actions CI/CD Pipeline

**Files:**
- Create: `.github/workflows/ci.yml`

- [x] **Step 1: Create `.github/workflows/ci.yml`**
  - Triggers: `push` on `main`, `pull_request` on `main`.
  - Steps: Checkout, Node.js 20 setup with npm cache, `npm ci`, `npx tsc --noEmit`, `npm test`, and `npm run build`.

- [x] **Step 2: Validate YAML syntax and local pipeline equivalents**
  - Verify `npx tsc --noEmit`, `npm test`, and `npm run build` run cleanly.

---

### Task 2: Native IndexedDB Vault Engine (`lib/storage/indexed-db.ts`)

**Files:**
- Create: `lib/storage/indexed-db.ts`
- Create: `tests/indexed-db.test.ts`

- [x] **Step 1: Write unit tests for IndexedDB Vault (`tests/indexed-db.test.ts`)**
  - Test safe fallback to memory storage in Node.js / non-browser environments.
  - Test `getVaultItem`, `setVaultItem`, `deleteVaultItem`, `clearVault`, `getAllVaultKeys`.
  - Test migration helper `migrateLocalStorageToIndexedDB`.
  - Test quota estimation fallback (`getVaultStorageQuotaEstimate`).

- [x] **Step 2: Implement `lib/storage/indexed-db.ts`**
  - Native browser `indexedDB` wrapper opening `'anttrail_vault'` (version 1) with object store `'keyval'`.
  - Handle SSR and environments where `window.indexedDB` is undefined or blocked.
  - Implement dual-write / quota-safe persistence.
  - Implement automatic localStorage-to-vault migration.

- [x] **Step 3: Run Vitest and verify all tests pass**
  - Run: `npx vitest run tests/indexed-db.test.ts`

---

### Task 3: Integrate Vault into Academic Workstation & Transfer Workstation

**Files:**
- Modify: `src/App.tsx`
- Modify: `app/transfer/page.tsx`

- [x] **Step 1: Connect `src/App.tsx` to IndexedDB Vault**
  - On mount, query vault for `anttrail_active_profile_v2` and `anttrail_planned_quarters_v2`.
  - Whenever profile or quarters update, dual-write to both `localStorage` (for fast sync SSR hydration) and `setVaultItem` (for high-capacity persistence).
  - Automatically handle `QuotaExceededError` so multi-year plans never crash browser storage.

- [x] **Step 2: Connect `app/transfer/page.tsx` to IndexedDB Vault**
  - When bridging articulated courses into `anttrail_active_profile_v2`, persist to vault.

---

### Task 4: Verification, Git Commit & Push to Remote

**Files:**
- All touched files

- [x] **Step 1: Run full test suite**
  - Run: `npm test`
  - Ensure all 16 test suites pass 100%.

- [x] **Step 2: Run TypeScript typecheck**
  - Run: `npx tsc --noEmit`

- [x] **Step 3: Run Next.js production build**
  - Run: `npm run build`

- [x] **Step 4: Commit changes and push to `origin/main`**
  - Run: `git add . && git commit -m "feat(storage,ci): add GitHub Actions CI/CD pipeline and IndexedDB Local Vault architecture"`
  - Run: `git push origin main`
