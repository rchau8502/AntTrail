import { describe, expect, test } from 'vitest'
import {
  getInstitutionDirectoryStatus,
  getInstitutionFromSupabase,
  searchInstitutionsInSupabase
} from '@/lib/server/institutions'

describe('institution directory server module', () => {
  test('returns fallback directory status when Supabase is not configured', async () => {
    const status = await getInstitutionDirectoryStatus()
    expect(status.configured).toBe(true)
    expect(status.institution_count).toBeGreaterThanOrEqual(20)
    expect(status.is_fallback).toBe(true)
  })

  test('searches fallback institutions by query and control', async () => {
    const berkeleyResult = await searchInstitutionsInSupabase({ search: 'Berkeley' })
    expect(berkeleyResult.items.length).toBeGreaterThan(0)
    expect(berkeleyResult.items[0].name).toContain('Berkeley')

    const privateResult = await searchInstitutionsInSupabase({ control: 'Private nonprofit' })
    expect(privateResult.items.length).toBeGreaterThan(0)
    expect(privateResult.items.every((i) => i.control === 'Private nonprofit')).toBe(true)

    const uclaResult = await searchInstitutionsInSupabase({ search: 'UCLA' })
    expect(uclaResult.items.length).toBeGreaterThan(0)
    expect(uclaResult.items[0].name).toContain('Los Angeles')
  })

  test('retrieves single institution by Scorecard external ID in fallback mode', async () => {
    // 110635 is UC Berkeley
    const berkeley = await getInstitutionFromSupabase('110635')
    expect(berkeley).not.toBeNull()
    expect(berkeley?.name).toBe('University of California, Berkeley')
    expect(berkeley?.admission_rate).toBeDefined()
    expect(berkeley?.city).toBe('Berkeley')
  })

  test('returns null for non-existent external ID', async () => {
    const nonExistent = await getInstitutionFromSupabase('999999999')
    expect(nonExistent).toBeNull()
  })
})
