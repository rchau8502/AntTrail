import {
  DriveStorageProvider,
  DriveSyncState,
  AntTrailCloudBackup,
  RemoteFileMetadata,
  DriveUserInfo,
  CloudSyncPayload
} from './types'
import { MockDriveProvider } from './providers/mockDriveProvider'
import { GoogleDriveProvider } from './providers/googleDriveProvider'
import { computePayloadChecksum } from './checksum'
import { getSafeStorage } from './storageHelper'
import { findBackupFile, downloadBackupFile, uploadBackupFile } from './driveStorage'
import { StudentProfile, PlannedQuarter } from '../../academic-engine/types'

const SETTINGS_KEY = 'anttrail_drive_sync_settings'

interface PersistedSettings {
  autoSyncEnabled: boolean
  isMockMode: boolean
  customClientId?: string
}

export type SyncStateListener = (state: DriveSyncState) => void

export class DriveSyncManager {
  private state: DriveSyncState
  private listeners: Set<SyncStateListener> = new Set()
  private mockProvider: MockDriveProvider
  private googleProvider: GoogleDriveProvider
  private autoSyncTimeout: ReturnType<typeof setTimeout> | null = null

  constructor() {
    const settings = this.loadSettings()
    this.mockProvider = new MockDriveProvider()
    this.googleProvider = new GoogleDriveProvider(settings.customClientId || '')

    this.state = {
      status: 'UNLINKED',
      userInfo: null,
      lastSyncedAt: null,
      remoteFileId: null,
      remoteModifiedTime: null,
      autoSyncEnabled: settings.autoSyncEnabled,
      isMockMode: settings.isMockMode,
      errorMessage: null,
      conflictBackup: null
    }
  }

  private loadSettings(): PersistedSettings {
    try {
      const raw = getSafeStorage().getItem(SETTINGS_KEY)
      if (raw) {
        return JSON.parse(raw)
      }
    } catch {
      // ignore
    }
    return {
      autoSyncEnabled: true,
      isMockMode: false
    }
  }

  private persistSettings(): void {
    try {
      const settings: PersistedSettings = {
        autoSyncEnabled: this.state.autoSyncEnabled,
        isMockMode: this.state.isMockMode,
        customClientId: this.googleProvider.getClientId()
      }
      getSafeStorage().setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch {
      // ignore
    }
  }

  private getActiveProvider(): DriveStorageProvider {
    return this.state.isMockMode ? this.mockProvider : this.googleProvider
  }

  public getState(): DriveSyncState {
    return { ...this.state }
  }

  public subscribe(listener: SyncStateListener): () => void {
    this.listeners.add(listener)
    listener(this.getState())
    return () => this.listeners.delete(listener)
  }

  private notify(): void {
    const current = this.getState()
    this.listeners.forEach((listener) => {
      try {
        listener(current)
      } catch (err) {
        console.error('Error in sync listener:', err)
      }
    })
  }

  private updateState(partial: Partial<DriveSyncState>): void {
    this.state = { ...this.state, ...partial }
    this.notify()
  }

  public setMockMode(enabled: boolean): void {
    this.updateState({
      isMockMode: enabled,
      status: 'UNLINKED',
      userInfo: null,
      conflictBackup: null,
      errorMessage: null
    })
    this.persistSettings()
  }

  public setCustomClientId(clientId: string): void {
    this.googleProvider.setClientId(clientId)
    this.persistSettings()
  }

  public getCustomClientId(): string {
    return this.googleProvider.getClientId()
  }

  public setAutoSyncEnabled(enabled: boolean): void {
    this.updateState({ autoSyncEnabled: enabled })
    this.persistSettings()
  }

  /**
   * Initializes the active provider and checks for an active session.
   */
  public async init(): Promise<void> {
    const provider = this.getActiveProvider()
    try {
      this.updateState({ status: 'INITIALIZING', errorMessage: null })
      await provider.init()
      const user = await provider.getCurrentUser()
      if (user) {
        this.updateState({
          status: 'IDLE',
          userInfo: user
        })
      } else {
        this.updateState({
          status: 'UNLINKED',
          userInfo: null
        })
      }
    } catch (err) {
      this.updateState({
        status: 'ERROR',
        errorMessage: (err as Error).message
      })
    }
  }

  /**
   * Initiates sign-in flow.
   */
  public async signIn(): Promise<DriveUserInfo> {
    const provider = this.getActiveProvider()
    try {
      this.updateState({ status: 'CONNECTING', errorMessage: null })
      const user = await provider.signIn()
      this.updateState({
        status: 'IDLE',
        userInfo: user,
        errorMessage: null
      })
      return user
    } catch (err) {
      this.updateState({
        status: 'ERROR',
        errorMessage: (err as Error).message
      })
      throw err
    }
  }

  /**
   * Signs out the user and clears active session.
   */
  public async signOut(): Promise<void> {
    const provider = this.getActiveProvider()
    try {
      await provider.signOut()
      this.updateState({
        status: 'UNLINKED',
        userInfo: null,
        remoteFileId: null,
        remoteModifiedTime: null,
        conflictBackup: null,
        errorMessage: null
      })
    } catch (err) {
      this.updateState({
        status: 'ERROR',
        errorMessage: (err as Error).message
      })
      throw err
    }
  }

  /**
   * Performs a smart synchronization between local backup and Google Drive appDataFolder.
   */
  public async sync(localBackup: AntTrailCloudBackup): Promise<AntTrailCloudBackup | null> {
    if (this.state.status === 'UNLINKED' || !this.state.userInfo) {
      return null
    }

    const provider = this.getActiveProvider()
    this.updateState({ status: 'SYNCING', errorMessage: null })

    try {
      const meta = await provider.getRemoteMetadata()

      if (!meta) {
        // No backup in cloud yet: upload local backup
        const result = await provider.uploadBackup(localBackup)
        this.updateState({
          status: 'IDLE',
          lastSyncedAt: Date.now(),
          remoteFileId: result.fileId,
          remoteModifiedTime: result.modifiedTime,
          conflictBackup: null
        })
        return null
      }

      // Existing remote backup found: download and check checksum
      const remoteBackup = await provider.downloadBackup(meta.fileId)
      const localChecksum = computePayloadChecksum(localBackup)
      const remoteChecksum = computePayloadChecksum(remoteBackup)

      if (localChecksum === remoteChecksum) {
        // Identical contents: in sync
        this.updateState({
          status: 'IDLE',
          lastSyncedAt: Date.now(),
          remoteFileId: meta.fileId,
          remoteModifiedTime: meta.modifiedTime,
          conflictBackup: null
        })
        return null
      }

      // Checksums differ: compare exported timestamps
      const localTime = new Date(localBackup.metadata.exportedAt).getTime()
      const remoteTime = new Date(remoteBackup.metadata.exportedAt).getTime()

      if (remoteTime > localTime) {
        // Remote is newer: trigger CONFLICT state
        this.updateState({
          status: 'CONFLICT',
          remoteFileId: meta.fileId,
          remoteModifiedTime: meta.modifiedTime,
          conflictBackup: remoteBackup
        })
        return remoteBackup
      } else {
        // Local is newer: upload to update remote
        const result = await provider.uploadBackup(localBackup, meta.fileId)
        this.updateState({
          status: 'IDLE',
          lastSyncedAt: Date.now(),
          remoteFileId: result.fileId,
          remoteModifiedTime: result.modifiedTime,
          conflictBackup: null
        })
        return null
      }
    } catch (err) {
      this.updateState({
        status: 'ERROR',
        errorMessage: (err as Error).message
      })
      throw err
    }
  }

  /**
   * Explicitly pushes local backup to Google Drive, overwriting any remote version.
   */
  public async pushToCloud(localBackup: AntTrailCloudBackup): Promise<void> {
    const provider = this.getActiveProvider()
    this.updateState({ status: 'SYNCING', errorMessage: null })

    try {
      const meta = await provider.getRemoteMetadata()
      const result = await provider.uploadBackup(localBackup, meta?.fileId)
      this.updateState({
        status: 'IDLE',
        lastSyncedAt: Date.now(),
        remoteFileId: result.fileId,
        remoteModifiedTime: result.modifiedTime,
        conflictBackup: null
      })
    } catch (err) {
      this.updateState({
        status: 'ERROR',
        errorMessage: (err as Error).message
      })
      throw err
    }
  }

  /**
   * Explicitly pulls the remote backup from Google Drive.
   */
  public async pullFromCloud(): Promise<AntTrailCloudBackup> {
    const provider = this.getActiveProvider()
    this.updateState({ status: 'SYNCING', errorMessage: null })

    try {
      const meta = await provider.getRemoteMetadata()
      if (!meta) {
        throw new Error('No backup file found in Google Drive appDataFolder')
      }

      const remoteBackup = await provider.downloadBackup(meta.fileId)
      this.updateState({
        status: 'IDLE',
        lastSyncedAt: Date.now(),
        remoteFileId: meta.fileId,
        remoteModifiedTime: meta.modifiedTime,
        conflictBackup: null
      })
      return remoteBackup
    } catch (err) {
      this.updateState({
        status: 'ERROR',
        errorMessage: (err as Error).message
      })
      throw err
    }
  }

  /**
   * Deletes the backup file from Google Drive appDataFolder.
   */
  public async deleteCloudBackup(): Promise<void> {
    const provider = this.getActiveProvider()
    if (!this.state.remoteFileId) {
      const meta = await provider.getRemoteMetadata()
      if (meta) {
        await provider.deleteBackup(meta.fileId)
      }
    } else {
      await provider.deleteBackup(this.state.remoteFileId)
    }

    this.updateState({
      lastSyncedAt: null,
      remoteFileId: null,
      remoteModifiedTime: null,
      conflictBackup: null
    })
  }

  /**
   * Triggers a debounced auto-sync if auto-save is enabled and user is signed in.
   */
  public triggerAutoSync(localBackup: AntTrailCloudBackup, delayMs = 2500): void {
    if (!this.state.autoSyncEnabled || this.state.status === 'UNLINKED' || !this.state.userInfo) {
      return
    }

    if (this.state.status === 'CONFLICT') {
      // Do not auto-overwrite when conflict is pending
      return
    }

    if (this.autoSyncTimeout) {
      clearTimeout(this.autoSyncTimeout)
    }

    this.autoSyncTimeout = setTimeout(() => {
      this.sync(localBackup).catch((err) => {
        console.warn('Auto-sync failed:', err)
      })
    }, delayMs)
  }

  /**
   * Helper to check remote metadata
   */
  public async checkRemote(): Promise<RemoteFileMetadata | null> {
    const provider = this.getActiveProvider()
    return provider.getRemoteMetadata()
  }
}

// Singleton instance for the application
export const driveSyncManager = new DriveSyncManager()

/**
 * Creates a compliant version 2 sync payload for Google Drive appDataFolder.
 */
export function createSyncPayload(
  profile: StudentProfile,
  plannedQuarters: PlannedQuarter[]
): CloudSyncPayload {
  const totalPlannedCourses = plannedQuarters.reduce(
    (sum, q) => sum + q.courses.length,
    0
  )
  return {
    version: 2,
    lastModified: Date.now(),
    profile,
    plannedQuarters,
    metadata: {
      appVersion: '0.1.0',
      exportedAt: new Date().toISOString(),
      totalCompletedUnits: profile.completedUnits,
      totalPlannedCourses
    }
  }
}

export type PayloadComparison = 'LOCAL_NEWER' | 'REMOTE_NEWER' | 'EQUAL'

/**
 * Compares two sync payloads using timestamp threshold.
 */
export function comparePayloads(
  local: CloudSyncPayload,
  remote: CloudSyncPayload,
  thresholdMs = 500
): PayloadComparison {
  const diff = local.lastModified - remote.lastModified
  if (Math.abs(diff) <= thresholdMs) {
    return 'EQUAL'
  }
  return diff > 0 ? 'LOCAL_NEWER' : 'REMOTE_NEWER'
}

/**
 * Uploads payload to Google Drive appDataFolder (creating or updating).
 */
export async function pushToGoogleDrive(
  accessToken: string,
  payload: CloudSyncPayload,
  existingFileId?: string
): Promise<{ fileId: string; modifiedTime: string }> {
  let fileId = existingFileId
  if (!fileId) {
    const existing = await findBackupFile(accessToken)
    if (existing) {
      fileId = existing.id
    }
  }
  const result = await uploadBackupFile(accessToken, payload, fileId)
  return {
    fileId: result.id,
    modifiedTime: result.modifiedTime
  }
}

/**
 * Retrieves the latest payload from Google Drive appDataFolder.
 */
export async function pullFromGoogleDrive(
  accessToken: string,
  cachedFileId?: string
): Promise<{ payload: CloudSyncPayload; fileId: string } | null> {
  let fileId = cachedFileId
  if (!fileId) {
    const file = await findBackupFile(accessToken)
    if (!file) return null
    fileId = file.id
  }
  const payload = await downloadBackupFile(accessToken, fileId)
  if (!payload) return null
  return { payload, fileId }
}
