import { StudentProfile, PlannedQuarter } from '../../academic-engine/types'

export type SyncStatus =
  | 'DISCONNECTED'   // Not connected to Google
  | 'UNLINKED'       // Not authenticated to Google
  | 'INITIALIZING'   // Loading Google script
  | 'CONNECTING'     // OAuth in progress
  | 'IDLE'           // Authenticated and in sync
  | 'SYNCED'         // Successfully synchronized
  | 'SYNCING'        // Upload or download in progress
  | 'CONFLICT'       // Remote backup newer or different
  | 'ERROR'          // Network or permission failure
  | 'OFFLINE'        // Offline

export interface GoogleTokenResponse {
  access_token?: string
  expires_in?: number
  error?: string
  error_description?: string
}

export interface GoogleTokenClient {
  requestAccessToken: (options?: { prompt?: string }) => void
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (response: GoogleTokenResponse) => void
            error_callback?: (error: unknown) => void
          }) => GoogleTokenClient
          revoke?: (token: string, done?: () => void) => void
        }
      }
    }
  }
}

export interface GoogleUser {
  id: string
  name: string
  email: string
  picture?: string
}

export interface DriveFileMetadata {
  id: string
  name: string
  modifiedTime: string
  size?: string
}

export interface CloudSyncPayload {
  version: 2
  lastModified: number
  profile: StudentProfile
  plannedQuarters: PlannedQuarter[]
  metadata: {
    appVersion: string
    exportedAt: string
    totalCompletedUnits: number
    totalPlannedCourses: number
  }
}

export interface DriveUserInfo {
  email: string
  name: string
  pictureUrl?: string
}

export interface AntTrailBackupMetadata {
  version: 1
  exportedAt: string          // ISO timestamp
  appVersion: string          // e.g. "0.5.0"
  checksum: string            // Checksum of content payload
  totalCourses: number
  totalQuarters: number
}

export interface AntTrailCloudBackup {
  metadata: AntTrailBackupMetadata
  profile: StudentProfile
  plannedQuarters: PlannedQuarter[]
  selectedPersonaId: string
}

export interface DriveSyncState {
  status: SyncStatus
  userInfo: DriveUserInfo | null
  lastSyncedAt: number | null
  remoteFileId: string | null
  remoteModifiedTime: string | null
  autoSyncEnabled: boolean
  isMockMode: boolean
  errorMessage: string | null
  conflictBackup: AntTrailCloudBackup | null
}

export interface RemoteFileMetadata {
  fileId: string
  modifiedTime: string
  size: number
}

export interface DriveStorageProvider {
  /**
   * Initializes the provider (loads OAuth client script or memory state).
   * Returns true if successfully initialized.
   */
  init(clientId?: string): Promise<boolean>

  /**
   * Initiates Google Sign-In and returns user info.
   */
  signIn(): Promise<DriveUserInfo>

  /**
   * Signs out current user and invalidates session token.
   */
  signOut(): Promise<void>

  /**
   * Returns active user info if currently signed in.
   */
  getCurrentUser(): Promise<DriveUserInfo | null>

  /**
   * Searches for the remote backup file in appDataFolder.
   */
  getRemoteMetadata(): Promise<RemoteFileMetadata | null>

  /**
   * Downloads and parses the backup payload from appDataFolder.
   */
  downloadBackup(fileId: string): Promise<AntTrailCloudBackup>

  /**
   * Uploads (creates or updates) the backup file in appDataFolder.
   */
  uploadBackup(
    backup: AntTrailCloudBackup,
    existingFileId?: string
  ): Promise<{ fileId: string; modifiedTime: string }>

  /**
   * Deletes the backup file from appDataFolder.
   */
  deleteBackup(fileId: string): Promise<void>
}
