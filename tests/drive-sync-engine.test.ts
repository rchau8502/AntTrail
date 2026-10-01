import { describe, it, expect, beforeEach } from 'vitest'
import {
  computePayloadChecksum,
  createBackupPayload,
  validateBackupPayload
} from '../src/services/drive/checksum'
import { MockDriveProvider } from '../src/services/drive/providers/mockDriveProvider'
import { DriveSyncManager } from '../src/services/drive/syncManager'
import { getSafeStorage } from '../src/services/drive/storageHelper'
import { StudentProfile, PlannedQuarter } from '../src/academic-engine/types'

describe('AntTrail Drive Sync Engine', () => {
  const dummyProfile: StudentProfile = {
    major: 'Computer Science B.S.',
    catalogYear: '2026-27',
    classStanding: 'Freshman',
    completedUnits: 12,
    courseHistory: [
      {
        id: 'rec_1',
        courseCode: 'ICS 31',
        institution: 'UCI',
        term: 'Fall 2025',
        units: 4,
        grade: 'A',
        status: 'COMPLETED'
      },
      {
        id: 'rec_2',
        courseCode: 'MATH 2A',
        institution: 'UCI',
        term: 'Fall 2025',
        units: 4,
        grade: 'B+',
        status: 'COMPLETED'
      }
    ]
  }

  const dummyQuarters: PlannedQuarter[] = [
    {
      id: 'winter-2026',
      term: 'Winter',
      year: 2026,
      courses: [
        { courseCode: 'ICS 32', units: 4 },
        { courseCode: 'MATH 2B', units: 4 }
      ]
    }
  ]

  describe('Checksum and Payload Serialization', () => {
    it('computes deterministic checksum for identical academic data', () => {
      const checksum1 = computePayloadChecksum({
        profile: dummyProfile,
        plannedQuarters: dummyQuarters,
        selectedPersonaId: 'freshman'
      })

      const checksum2 = computePayloadChecksum({
        profile: { ...dummyProfile },
        plannedQuarters: [...dummyQuarters],
        selectedPersonaId: 'freshman'
      })

      expect(checksum1).toBe(checksum2)
      expect(typeof checksum1).toBe('string')
      expect(checksum1.length).toBe(8)
    })

    it('computes different checksum when academic data changes', () => {
      const checksum1 = computePayloadChecksum({
        profile: dummyProfile,
        plannedQuarters: dummyQuarters,
        selectedPersonaId: 'freshman'
      })

      const modifiedProfile: StudentProfile = {
        ...dummyProfile,
        completedUnits: 16,
        courseHistory: [
          ...dummyProfile.courseHistory,
          {
            id: 'rec_3',
            courseCode: 'WRITING 39A',
            institution: 'UCI',
            term: 'Fall 2025',
            units: 4,
            grade: 'P',
            status: 'COMPLETED'
          }
        ]
      }

      const checksum2 = computePayloadChecksum({
        profile: modifiedProfile,
        plannedQuarters: dummyQuarters,
        selectedPersonaId: 'freshman'
      })

      expect(checksum1).not.toBe(checksum2)
    })

    it('creates validated backup payload with correct metadata counts', () => {
      const backup = createBackupPayload(dummyProfile, dummyQuarters, 'freshman', '0.5.0')

      expect(backup.metadata.version).toBe(1)
      expect(backup.metadata.appVersion).toBe('0.5.0')
      expect(backup.metadata.totalCourses).toBe(4) // 2 completed + 2 planned
      expect(backup.metadata.totalQuarters).toBe(1)
      expect(backup.selectedPersonaId).toBe('freshman')

      const validated = validateBackupPayload(backup)
      expect(validated).not.toBeNull()
      expect(validated?.metadata.checksum).toBe(backup.metadata.checksum)
    })

    it('rejects invalid or corrupted payload schemas', () => {
      expect(validateBackupPayload(null)).toBeNull()
      expect(validateBackupPayload('string')).toBeNull()
      expect(validateBackupPayload({})).toBeNull()
      expect(validateBackupPayload({ metadata: { version: 2 } })).toBeNull()
      expect(
        validateBackupPayload({
          metadata: { version: 1, exportedAt: '2026-10-01', checksum: 'abc' },
          profile: 'invalid'
        })
      ).toBeNull()
    })
  })

  describe('MockDriveProvider Lifecycle', () => {
    let mockProvider: MockDriveProvider

    beforeEach(() => {
      mockProvider = new MockDriveProvider(0) // 0ms delay for fast tests
      mockProvider.clearStorage()
    })

    it('blocks uploads and downloads when unauthenticated', async () => {
      const backup = createBackupPayload(dummyProfile, dummyQuarters, 'freshman')
      await expect(mockProvider.uploadBackup(backup)).rejects.toThrow(/Unauthorized/)
      await expect(mockProvider.downloadBackup('mock_id')).rejects.toThrow(/Unauthorized/)
    })

    it('supports sign-in, upload, metadata query, and download', async () => {
      const user = await mockProvider.signIn()
      expect(user.email).toBe('peter@uci.edu')

      const initialMeta = await mockProvider.getRemoteMetadata()
      expect(initialMeta).toBeNull()

      const backup = createBackupPayload(dummyProfile, dummyQuarters, 'freshman')
      const uploadResult = await mockProvider.uploadBackup(backup)
      expect(uploadResult.fileId).toBe('mock_file_id_anttrail_appdata')

      const meta = await mockProvider.getRemoteMetadata()
      expect(meta).not.toBeNull()
      expect(meta?.fileId).toBe('mock_file_id_anttrail_appdata')

      const downloaded = await mockProvider.downloadBackup(meta!.fileId)
      expect(downloaded.profile.major).toBe('Computer Science B.S.')
      expect(downloaded.metadata.totalCourses).toBe(4)

      await mockProvider.deleteBackup(meta!.fileId)
      const afterDeleteMeta = await mockProvider.getRemoteMetadata()
      expect(afterDeleteMeta).toBeNull()

      await mockProvider.signOut()
      const signedOutUser = await mockProvider.getCurrentUser()
      expect(signedOutUser).toBeNull()
    })
  })

  describe('DriveSyncManager Coordination & Conflict Detection', () => {
    let manager: DriveSyncManager

    beforeEach(() => {
      getSafeStorage().clear()
      manager = new DriveSyncManager()
      manager.setMockMode(true)
    })

    it('initializes in mock unlinked mode', async () => {
      await manager.init()
      expect(manager.getState().status).toBe('UNLINKED')
      expect(manager.getState().isMockMode).toBe(true)
    })

    it('completes sign-in and initial upload cleanly', async () => {
      await manager.init()
      await manager.signIn()
      expect(manager.getState().status).toBe('IDLE')
      expect(manager.getState().userInfo?.email).toBe('peter@uci.edu')

      const backup = createBackupPayload(dummyProfile, dummyQuarters, 'freshman')
      const conflict = await manager.sync(backup)
      expect(conflict).toBeNull()
      expect(manager.getState().status).toBe('IDLE')
      expect(manager.getState().remoteFileId).toBeTruthy()
    })

    it('detects conflict when remote backup is newer than local state', async () => {
      await manager.init()
      await manager.signIn()

      // 1. Initial backup uploaded to remote (earlier timestamp)
      const initialBackup = createBackupPayload(dummyProfile, dummyQuarters, 'freshman')
      await manager.sync(initialBackup)

      // 2. Simulate a remote change that happened LATER (e.g. from another device)
      const futureDate = new Date(Date.now() + 60000).toISOString()
      const remoteModifiedBackup = {
        ...initialBackup,
        metadata: {
          ...initialBackup.metadata,
          exportedAt: futureDate,
          totalCourses: 5
        },
        plannedQuarters: [
          ...dummyQuarters,
          {
            id: 'spring-2026',
            term: 'Spring' as const,
            year: 2026,
            courses: [{ courseCode: 'ICS 33', units: 4 }]
          }
        ]
      }
      getSafeStorage().setItem('anttrail_mock_google_drive_file', JSON.stringify(remoteModifiedBackup))

      // 3. Local attempt to sync with older timestamp and different checksum
      const olderLocalBackup = {
        ...initialBackup,
        metadata: {
          ...initialBackup.metadata,
          exportedAt: new Date(Date.now() - 30000).toISOString()
        }
      }

      const detectedConflict = await manager.sync(olderLocalBackup)
      expect(detectedConflict).not.toBeNull()
      expect(manager.getState().status).toBe('CONFLICT')
      expect(manager.getState().conflictBackup?.plannedQuarters.length).toBe(2)
    })

    it('allows pushing to cloud to override conflict', async () => {
      await manager.init()
      await manager.signIn()

      const backup = createBackupPayload(dummyProfile, dummyQuarters, 'freshman')
      await manager.pushToCloud(backup)
      expect(manager.getState().status).toBe('IDLE')
      expect(manager.getState().conflictBackup).toBeNull()
    })

    it('allows pulling from cloud to restore remote state', async () => {
      await manager.init()
      await manager.signIn()

      const backup = createBackupPayload(dummyProfile, dummyQuarters, 'freshman')
      await manager.pushToCloud(backup)

      const restored = await manager.pullFromCloud()
      expect(restored.profile.major).toBe('Computer Science B.S.')
      expect(restored.plannedQuarters.length).toBe(1)
    })
  })
})
