import {
  DriveStorageProvider,
  DriveUserInfo,
  RemoteFileMetadata,
  AntTrailCloudBackup
} from '../types'
import { validateBackupPayload } from '../checksum'
import { getSafeStorage } from '../storageHelper'

const STORAGE_KEY = 'anttrail_mock_google_drive_file'
const USER_KEY = 'anttrail_mock_google_drive_user'

export const DEFAULT_MOCK_USER: DriveUserInfo = {
  email: 'peter@uci.edu',
  name: 'Peter Anteater',
  pictureUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
}

/**
 * In-memory / localStorage simulation of Google Drive appDataFolder.
 * Provides instant, zero-configuration cloud sync testing and demo capabilities.
 */
export class MockDriveProvider implements DriveStorageProvider {
  private currentUser: DriveUserInfo | null = null
  private simulatedLatencyMs: number

  constructor(simulatedLatencyMs = 60) {
    this.simulatedLatencyMs = simulatedLatencyMs
    // Check if previously signed in in mock storage
    try {
      const storage = getSafeStorage()
      const stored = storage.getItem(USER_KEY)
      if (stored) {
        this.currentUser = JSON.parse(stored)
      }
    } catch {
      // storage unavailable
    }
  }

  private async delay(): Promise<void> {
    if (this.simulatedLatencyMs <= 0) return
    return new Promise((resolve) => setTimeout(resolve, this.simulatedLatencyMs))
  }

  async init(): Promise<boolean> {
    await this.delay()
    return true
  }

  async signIn(): Promise<DriveUserInfo> {
    await this.delay()
    this.currentUser = { ...DEFAULT_MOCK_USER }
    try {
      getSafeStorage().setItem(USER_KEY, JSON.stringify(this.currentUser))
    } catch {
      // ignore
    }
    return this.currentUser
  }

  async signOut(): Promise<void> {
    await this.delay()
    this.currentUser = null
    try {
      getSafeStorage().removeItem(USER_KEY)
    } catch {
      // ignore
    }
  }

  async getCurrentUser(): Promise<DriveUserInfo | null> {
    return this.currentUser
  }

  async getRemoteMetadata(): Promise<RemoteFileMetadata | null> {
    await this.delay()
    if (!this.currentUser) return null

    try {
      const raw = getSafeStorage().getItem(STORAGE_KEY)
      if (!raw) return null

      const parsed = JSON.parse(raw)
      const validated = validateBackupPayload(parsed)
      if (!validated) return null

      return {
        fileId: 'mock_file_id_anttrail_appdata',
        modifiedTime: validated.metadata.exportedAt,
        size: raw.length
      }
    } catch {
      return null
    }
  }

  async downloadBackup(_fileId: string): Promise<AntTrailCloudBackup> {
    await this.delay()
    if (!this.currentUser) {
      throw new Error('Unauthorized: Mock Google Drive user not signed in')
    }

    const raw = getSafeStorage().getItem(STORAGE_KEY)
    if (!raw) {
      throw new Error('File not found in Mock Google Drive appDataFolder')
    }

    const parsed = JSON.parse(raw)
    const validated = validateBackupPayload(parsed)
    if (!validated) {
      throw new Error('Corrupted backup file found in Mock Google Drive')
    }

    return validated
  }

  async uploadBackup(
    backup: AntTrailCloudBackup,
    _existingFileId?: string
  ): Promise<{ fileId: string; modifiedTime: string }> {
    await this.delay()
    if (!this.currentUser) {
      throw new Error('Unauthorized: Mock Google Drive user not signed in')
    }

    const modifiedTime = new Date().toISOString()
    const updatedBackup: AntTrailCloudBackup = {
      ...backup,
      metadata: {
        ...backup.metadata,
        exportedAt: modifiedTime
      }
    }

    getSafeStorage().setItem(STORAGE_KEY, JSON.stringify(updatedBackup))

    return {
      fileId: 'mock_file_id_anttrail_appdata',
      modifiedTime
    }
  }

  async deleteBackup(_fileId: string): Promise<void> {
    await this.delay()
    getSafeStorage().removeItem(STORAGE_KEY)
  }

  /**
   * Helper for tests or manual state inspection: clear mock storage.
   */
  clearStorage(): void {
    getSafeStorage().removeItem(STORAGE_KEY)
    getSafeStorage().removeItem(USER_KEY)
    this.currentUser = null
  }
}
