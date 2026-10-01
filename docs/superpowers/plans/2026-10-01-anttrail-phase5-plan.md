# Google Authentication & Private Google Drive Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement zero-server-retention cloud backup and synchronization for AntTrail using Google Drive's private `appDataFolder` (`https://www.googleapis.com/auth/drive.appdata`), with full client-side token handling, conflict detection, auto-sync, and offline mock support.

**Architecture:** Pure client-side service layer using the Provider pattern (`DriveStorageProvider`), abstracting Google Identity Services (GIS) / Google Drive v3 REST API alongside a fully-featured `MockDriveProvider` for testing and offline demonstration. Integrated with React state for background auto-saving and user conflict resolution.

**Tech Stack:** React 18, TypeScript, Google Identity Services (GIS), Google Drive v3 REST API, Tailwind CSS, Lucide icons, Vitest.

---

### Task 1: Sync Types & Checksum Utilities

**Files:**
- Create: `src/services/drive/types.ts`
- Create: `src/services/drive/checksum.ts`
- Test: `tests/drive-sync-engine.test.ts`

- [ ] **Step 1: Define TypeScript schemas and types in `types.ts`**
  - Define `SyncStatus`, `DriveUserInfo`, `AntTrailBackupMetadata`, `AntTrailCloudBackup`, `DriveSyncState`, `DriveStorageProvider`.
- [ ] **Step 2: Implement deterministic checksum & serializer in `checksum.ts`**
  - Implement `computePayloadChecksum(backup: AntTrailCloudBackup): string`
  - Implement `createBackupPayload(profile, quarterPlans, selectedPersonaId, appVersion): AntTrailCloudBackup`
  - Implement `validateBackupPayload(data: unknown): AntTrailCloudBackup | null`

---

### Task 2: Storage Providers (Mock & Live Google API)

**Files:**
- Create: `src/services/drive/providers/mockDriveProvider.ts`
- Create: `src/services/drive/providers/googleDriveProvider.ts`
- Create: `src/services/drive/providers/index.ts`
- Test: `tests/drive-sync-engine.test.ts`

- [ ] **Step 1: Implement `MockDriveProvider`**
  - Stores backup data in isolated `sessionStorage` or local memory.
  - Implements full `DriveStorageProvider` interface (`init`, `signIn`, `signOut`, `getCurrentUser`, `getRemoteMetadata`, `downloadBackup`, `uploadBackup`, `deleteBackup`).
  - Supports simulated delays and mock user ("Peter Anteater", `peter@uci.edu`).
- [ ] **Step 2: Implement `GoogleDriveProvider`**
  - Dynamically loads Google Identity Services client script `https://accounts.google.com/gsi/client`.
  - Initializes `google.accounts.oauth2.initTokenClient` with scope `https://www.googleapis.com/auth/drive.appdata`.
  - Performs direct REST calls to Google Drive v3 endpoints for `appDataFolder` (`/drive/v3/files` and `/upload/drive/v3/files`).
  - Fetches basic user profile from `/oauth2/v3/userinfo`.

---

### Task 3: Drive Sync Manager

**Files:**
- Create: `src/services/drive/syncManager.ts`
- Test: `tests/drive-sync-engine.test.ts`

- [ ] **Step 1: Implement `DriveSyncManager` class**
  - Coordinates provider selection (`MockDriveProvider` vs `GoogleDriveProvider`).
  - Tracks sync status (`UNLINKED`, `IDLE`, `SYNCING`, `CONFLICT`, `ERROR`).
  - Handles auto-sync debouncing.
  - Detects conflicts between local modifications and remote modified timestamps.
  - Emits state updates via listener callbacks for React reactivity.

---

### Task 4: Unit Test Suite for Sync Engine

**Files:**
- Create: `tests/drive-sync-engine.test.ts`

- [ ] **Step 1: Write Vitest tests for checksum and payload validation**
- [ ] **Step 2: Write tests for `MockDriveProvider` lifecycle**
- [ ] **Step 3: Write tests for `DriveSyncManager` conflict detection and sync flow**
- [ ] **Step 4: Run `npx vitest run tests/drive-sync-engine.test.ts` and verify all pass**

---

### Task 5: UI Components (Sync Modal & Navbar Pill)

**Files:**
- Create: `src/components/drive/GoogleDriveSyncModal.tsx`
- Modify: `src/components/Navbar.tsx`
- Test: Visual & build verification

- [ ] **Step 1: Build `GoogleDriveSyncModal`**
  - Account connection card (Sign in / Sign out, profile avatar, user email).
  - Sync actions: "Sync Now (Upload)", "Restore from Cloud (Download)", "Auto-Sync Toggle".
  - Conflict resolution dialog when differences are detected.
  - Privacy explanation box detailing `appDataFolder` isolation and zero server retention.
  - Mode toggle: "Live Google Account" vs "Demo / Mock Mode (Offline)".
- [ ] **Step 2: Update `Navbar.tsx`**
  - Add cloud sync status pill button showing sync icon, email, and live status.
  - Clicking opens `GoogleDriveSyncModal`.

---

### Task 6: App State Integration & Verification

**Files:**
- Modify: `src/App.tsx`
- Test: Full build and runtime verification

- [ ] **Step 1: Wire `DriveSyncManager` into `App.tsx`**
  - Track `syncState` in React state.
  - Setup auto-sync trigger when `profile` or `quarterPlans` change.
  - Provide handlers for manual backup, restore, and conflict resolution.
- [ ] **Step 2: Run `npm test` and `npm run build`**
  - Verify all test suites pass.
  - Verify zero TypeScript or bundling errors.
