import {
  AntTrailCloudBackup,
  AntTrailBackupMetadata
} from './types'
import { StudentProfile, PlannedQuarter } from '../../academic-engine/types'

/**
 * Deterministic 32-bit FNV-1a string hashing algorithm.
 * Operates synchronously and identically in Node and all browsers.
 */
export function fnv1a(str: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

/**
 * Computes a deterministic checksum of the payload data
 * (excluding metadata fields like timestamps).
 */
export function computePayloadChecksum(
  data: Pick<AntTrailCloudBackup, 'profile' | 'plannedQuarters' | 'selectedPersonaId'>
): string {
  // Normalize data deterministically
  const normalized = {
    selectedPersonaId: data.selectedPersonaId,
    profile: {
      major: data.profile.major,
      catalogYear: data.profile.catalogYear,
      classStanding: data.profile.classStanding,
      completedUnits: data.profile.completedUnits,
      courses: data.profile.courseHistory.map((c) => ({
        code: c.courseCode.trim().toUpperCase(),
        term: c.term,
        units: c.units,
        grade: c.grade,
        status: c.status
      }))
    },
    plannedQuarters: data.plannedQuarters.map((q) => ({
      id: q.id,
      term: q.term,
      year: q.year,
      courses: q.courses.map((c) => ({
        code: c.courseCode.trim().toUpperCase(),
        units: c.units
      }))
    }))
  }

  return fnv1a(JSON.stringify(normalized))
}

/**
 * Creates a validated, checksummed AntTrailCloudBackup payload.
 */
export function createBackupPayload(
  profile: StudentProfile,
  plannedQuarters: PlannedQuarter[],
  selectedPersonaId: string,
  appVersion = '0.5.0'
): AntTrailCloudBackup {
  const checksum = computePayloadChecksum({
    profile,
    plannedQuarters,
    selectedPersonaId
  })

  const totalCourses =
    profile.courseHistory.length +
    plannedQuarters.reduce((acc, q) => acc + q.courses.length, 0)

  const metadata: AntTrailBackupMetadata = {
    version: 1,
    exportedAt: new Date().toISOString(),
    appVersion,
    checksum,
    totalCourses,
    totalQuarters: plannedQuarters.length
  }

  return {
    metadata,
    profile,
    plannedQuarters,
    selectedPersonaId
  }
}

/**
 * Validates untrusted parsed JSON data to ensure it adheres to the
 * AntTrailCloudBackup schema before applying to live state.
 */
export function validateBackupPayload(data: unknown): AntTrailCloudBackup | null {
  if (!data || typeof data !== 'object') {
    return null
  }

  const obj = data as Record<string, unknown>

  // Validate metadata
  if (!obj.metadata || typeof obj.metadata !== 'object') {
    return null
  }
  const meta = obj.metadata as Record<string, unknown>
  if (meta.version !== 1 || typeof meta.exportedAt !== 'string' || typeof meta.checksum !== 'string') {
    return null
  }

  // Validate profile
  if (!obj.profile || typeof obj.profile !== 'object') {
    return null
  }
  const prof = obj.profile as Record<string, unknown>
  if (
    typeof prof.major !== 'string' ||
    typeof prof.catalogYear !== 'string' ||
    !Array.isArray(prof.courseHistory)
  ) {
    return null
  }

  // Validate plannedQuarters
  if (!Array.isArray(obj.plannedQuarters)) {
    return null
  }

  // Validate persona ID
  if (typeof obj.selectedPersonaId !== 'string') {
    return null
  }

  return data as AntTrailCloudBackup
}
