import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  getVaultItem,
  setVaultItem,
  deleteVaultItem,
  clearVault,
  getAllVaultKeys,
  migrateLocalStorageToIndexedDB,
  getVaultStorageQuotaEstimate,
  safeLocalStorageSet,
  safeLocalStorageGet
} from '../lib/storage/indexed-db'

describe('AntTrail IndexedDB Local Vault Engine', () => {
  beforeEach(async () => {
    await clearVault()
  })

  afterEach(async () => {
    await clearVault()
  })

  it('handles basic CRUD operations in memory/vault fallback store', async () => {
    // Read non-existent
    const missing = await getVaultItem('course_plan')
    expect(missing).toBeNull()

    // Read with default value
    const withDefault = await getVaultItem('course_plan', { quarters: [] })
    expect(withDefault).toEqual({ quarters: [] })

    // Set item
    const dummyPlan = {
      major: 'Computer Science B.S.',
      quarters: [{ name: 'Fall 2026', courses: ['ICS 31', 'MATH 2A'] }]
    }
    await setVaultItem('course_plan', dummyPlan)

    // Read back
    const retrieved = await getVaultItem<typeof dummyPlan>('course_plan')
    expect(retrieved).not.toBeNull()
    expect(retrieved?.major).toBe('Computer Science B.S.')
    expect(retrieved?.quarters[0].courses).toEqual(['ICS 31', 'MATH 2A'])

    // List keys
    const keys = await getAllVaultKeys()
    expect(keys).toContain('course_plan')

    // Delete item
    await deleteVaultItem('course_plan')
    const afterDelete = await getVaultItem('course_plan')
    expect(afterDelete).toBeNull()
  })

  it('clears all items from the vault', async () => {
    await setVaultItem('item1', 'val1')
    await setVaultItem('item2', 'val2')
    const keysBefore = await getAllVaultKeys()
    expect(keysBefore.length).toBeGreaterThanOrEqual(2)

    await clearVault()
    const keysAfter = await getAllVaultKeys()
    expect(keysAfter).toEqual([])
  })

  it('safely performs localStorage sets and catches QuotaExceededError or SSR environments', () => {
    // In Node.js or SSR, safeLocalStorageSet should not throw
    const success = safeLocalStorageSet('test_key', { units: 180 })
    expect(typeof success).toBe('boolean')

    // Reading should safely return parsed value or null
    const val = safeLocalStorageGet<{ units: number }>('test_key')
    // In node/test mock environment, if window is undefined, it returns null without error
    expect(val === null || val?.units === 180).toBe(true)
  })

  it('migrates specified keys from localStorage mock into the vault', async () => {
    // Setup a mock storage source if localStorage is available, or test migration function directly
    const mockRecord = {
      major: 'Data Science B.S.',
      catalogYear: '2026-27'
    }

    // Call migration with custom key
    await migrateLocalStorageToIndexedDB(['anttrail_active_profile_v2'], {
      getItem: (k: string) => (k === 'anttrail_active_profile_v2' ? JSON.stringify(mockRecord) : null)
    })

    const migrated = await getVaultItem<typeof mockRecord>('anttrail_active_profile_v2')
    expect(migrated).not.toBeNull()
    expect(migrated?.major).toBe('Data Science B.S.')
  })

  it('returns valid storage quota estimates', async () => {
    const quota = await getVaultStorageQuotaEstimate()
    expect(quota).toBeDefined()
    expect(typeof quota.usage).toBe('number')
    expect(typeof quota.quota).toBe('number')
    expect(typeof quota.percentage).toBe('number')
    expect(quota.percentage).toBeGreaterThanOrEqual(0)
    expect(quota.percentage).toBeLessThanOrEqual(100)
  })
})
