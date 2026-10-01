import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  createSyncPayload,
  comparePayloads,
  pushToGoogleDrive,
  pullFromGoogleDrive
} from '../src/services/drive/syncManager'
import {
  findBackupFile,
  downloadBackupFile,
  uploadBackupFile,
  BACKUP_FILENAME
} from '../src/services/drive/driveStorage'
import { STUDENT_PERSONAS } from '../src/data/mock/mockStudentData'
import { PlannedQuarter } from '../src/academic-engine/types'

describe('Google Drive appDataFolder Sync Engine', () => {
  const freshmanProfile = STUDENT_PERSONAS[0].profile
  const sampleQuarters: PlannedQuarter[] = [
    {
      id: 'q-fall-2026',
      term: 'Fall',
      year: 2026,
      courses: [{ courseCode: 'ICS 31', units: 4 }]
    }
  ]

  const mockAccessToken = 'ya29.mock_token_for_anttrail_tests'

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Sync Payload Formatting & Comparison', () => {
    it('creates a compliant version 2 sync payload', () => {
      const payload = createSyncPayload(freshmanProfile, sampleQuarters)

      expect(payload.version).toBe(2)
      expect(payload.profile.major).toBe(freshmanProfile.major)
      expect(payload.plannedQuarters).toHaveLength(1)
      expect(payload.lastModified).toBeGreaterThan(0)
      expect(payload.metadata.appVersion).toBe('0.1.0')
    })

    it('correctly compares timestamps for conflict resolution', () => {
      const base = createSyncPayload(freshmanProfile, sampleQuarters)
      const older = { ...base, lastModified: base.lastModified - 10000 }
      const newer = { ...base, lastModified: base.lastModified + 10000 }
      const nearSimultaneous = { ...base, lastModified: base.lastModified + 200 }

      expect(comparePayloads(base, older)).toBe('LOCAL_NEWER')
      expect(comparePayloads(base, newer)).toBe('REMOTE_NEWER')
      expect(comparePayloads(base, nearSimultaneous)).toBe('EQUAL')
    })
  })

  describe('Google Drive appDataFolder REST API', () => {
    it('findBackupFile queries appDataFolder space with exact filename', async () => {
      const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          files: [
            {
              id: 'file_123',
              name: BACKUP_FILENAME,
              modifiedTime: '2026-10-01T12:00:00Z',
              size: '4096'
            }
          ]
        })
      } as any)

      const result = await findBackupFile(mockAccessToken)

      expect(result).not.toBeNull()
      expect(result?.id).toBe('file_123')
      expect(mockFetch).toHaveBeenCalledTimes(1)
      const calledUrl = mockFetch.mock.calls[0][0] as string
      expect(calledUrl).toContain('spaces=appDataFolder')
      expect(calledUrl).toContain(encodeURIComponent(`name='${BACKUP_FILENAME}' and trashed=false`))
    })

    it('findBackupFile returns null if no backup exists yet', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ files: [] })
      } as any)

      const result = await findBackupFile(mockAccessToken)
      expect(result).toBeNull()
    })

    it('findBackupFile throws descriptive error on 401 Unauthorized', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      } as any)

      await expect(findBackupFile(mockAccessToken)).rejects.toThrow(
        'Google authorization expired or invalid.'
      )
    })

    it('downloadBackupFile retrieves and parses valid payload', async () => {
      const payload = createSyncPayload(freshmanProfile, sampleQuarters)
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => payload
      } as any)

      const downloaded = await downloadBackupFile(mockAccessToken, 'file_123')
      expect(downloaded).not.toBeNull()
      expect(downloaded?.version).toBe(2)
      expect(downloaded?.profile.major).toBe(freshmanProfile.major)
    })

    it('downloadBackupFile rejects outdated schema versions', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ version: 1, legacyData: true })
      } as any)

      await expect(downloadBackupFile(mockAccessToken, 'file_123')).rejects.toThrow(
        'Incompatible backup format'
      )
    })

    it('uploadBackupFile performs PATCH update if fileId exists', async () => {
      const payload = createSyncPayload(freshmanProfile, sampleQuarters)
      const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'existing_id_999', modifiedTime: '2026-10-01T15:00:00Z' })
      } as any)

      const result = await uploadBackupFile(mockAccessToken, payload, 'existing_id_999')

      expect(result.id).toBe('existing_id_999')
      expect(mockFetch).toHaveBeenCalledTimes(1)
      const [url, options] = mockFetch.mock.calls[0]
      expect(url).toContain('files/existing_id_999?uploadType=media')
      expect(options?.method).toBe('PATCH')
    })

    it('uploadBackupFile performs multipart POST if creating new file', async () => {
      const payload = createSyncPayload(freshmanProfile, sampleQuarters)
      const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'new_created_file_1', modifiedTime: '2026-10-01T15:00:00Z' })
      } as any)

      const result = await uploadBackupFile(mockAccessToken, payload)

      expect(result.id).toBe('new_created_file_1')
      expect(mockFetch).toHaveBeenCalledTimes(1)
      const [url, options] = mockFetch.mock.calls[0]
      expect(url).toContain('files?uploadType=multipart')
      expect(options?.method).toBe('POST')
      expect(options?.body).toContain('appDataFolder')
    })
  })

  describe('Full Sync Push and Pull Workflow', () => {
    it('pushToGoogleDrive creates new file when none is cached', async () => {
      // 1. findBackupFile returns null
      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ files: [] })
        } as any)
        // 2. uploadBackupFile creates new
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: 'new_file_id', modifiedTime: '2026-10-01T16:00:00Z' })
        } as any)

      const payload = createSyncPayload(freshmanProfile, sampleQuarters)
      const res = await pushToGoogleDrive(mockAccessToken, payload)

      expect(res.fileId).toBe('new_file_id')
    })

    it('pullFromGoogleDrive returns null when no remote file exists', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ files: [] })
      } as any)

      const res = await pullFromGoogleDrive(mockAccessToken)
      expect(res).toBeNull()
    })
  })
})
