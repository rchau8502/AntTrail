/**
 * AntTrail Zero-Server IndexedDB Local Vault
 *
 * Provides a high-capacity (>50MB-1GB) browser-native storage engine for
 * multi-year academic schedules, prerequisite AST graphs, CCC articulation audits,
 * and drill histories without hitting localStorage's 5MB origin quota.
 *
 * Automatically falls back to in-memory / localStorage when running in SSR or environments
 * where IndexedDB is blocked.
 */

const DB_NAME = 'anttrail_vault'
const DB_VERSION = 1
const STORE_NAME = 'keyval'

// In-memory fallback for SSR, Node.js testing, and incognito restrictions
const memoryVault = new Map<string, unknown>()

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function isIndexedDBAvailable(): boolean {
  if (!isBrowser()) return false
  try {
    return 'indexedDB' in window && window.indexedDB !== null && window.indexedDB !== undefined
  } catch {
    return false
  }
}

/**
 * Opens or reuses an IndexedDB database connection.
 */
function openVaultDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDBAvailable()) {
      return reject(new Error('IndexedDB is not available in current environment.'))
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB vault.'))
    }
  })
}

/**
 * Retrieve an item from the vault with optional default fallback.
 */
export async function getVaultItem<T>(key: string, defaultValue: T | null = null): Promise<T | null> {
  if (!isIndexedDBAvailable()) {
    if (memoryVault.has(key)) {
      return (memoryVault.get(key) as T) ?? defaultValue
    }
    return defaultValue
  }

  try {
    const db = await openVaultDB()
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get(key)

      request.onsuccess = () => {
        const result = request.result
        if (result === undefined) {
          resolve(defaultValue)
        } else {
          resolve(result as T)
        }
      }

      request.onerror = () => {
        resolve(defaultValue)
      }
    })
  } catch {
    return (memoryVault.get(key) as T) ?? defaultValue
  }
}

/**
 * Save an item into the vault. Supports structured objects, arrays, and primitives.
 */
export async function setVaultItem<T>(key: string, value: T): Promise<void> {
  memoryVault.set(key, value)

  if (!isIndexedDBAvailable()) {
    return
  }

  try {
    const db = await openVaultDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.put(value, key)

      request.onsuccess = () => {
        if (isBrowser()) {
          try {
            window.dispatchEvent(
              new CustomEvent('anttrail_vault_sync', {
                detail: { key, timestamp: Date.now() }
              })
            )
          } catch {
            // Ignore dispatch errors
          }
        }
        resolve()
      }

      request.onerror = () => {
        reject(request.error || new Error(`Failed to save key ${key} to IndexedDB vault.`))
      }
    })
  } catch (err) {
    // If IDB write fails, in-memory vault already holds the value
    console.warn(`[Vault] Fallback to in-memory store for ${key}:`, err)
  }
}

/**
 * Delete a specific key from the vault.
 */
export async function deleteVaultItem(key: string): Promise<void> {
  memoryVault.delete(key)

  if (!isIndexedDBAvailable()) {
    return
  }

  try {
    const db = await openVaultDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.delete(key)

      request.onsuccess = () => {
        if (isBrowser()) {
          try {
            window.dispatchEvent(
              new CustomEvent('anttrail_vault_sync', {
                detail: { key, deleted: true, timestamp: Date.now() }
              })
            )
          } catch {
            // Ignore
          }
        }
        resolve()
      }

      request.onerror = () => {
        reject(request.error || new Error(`Failed to delete key ${key} from IndexedDB vault.`))
      }
    })
  } catch {
    // Silent in-memory deletion already completed
  }
}

/**
 * Remove all keys from the vault.
 */
export async function clearVault(): Promise<void> {
  memoryVault.clear()

  if (!isIndexedDBAvailable()) {
    return
  }

  try {
    const db = await openVaultDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.clear()

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = () => {
        reject(request.error || new Error('Failed to clear IndexedDB vault.'))
      }
    })
  } catch {
    // Memory vault already cleared
  }
}

/**
 * Retrieve all stored keys from the vault.
 */
export async function getAllVaultKeys(): Promise<string[]> {
  if (!isIndexedDBAvailable()) {
    return Array.from(memoryVault.keys())
  }

  try {
    const db = await openVaultDB()
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.getAllKeys()

      request.onsuccess = () => {
        resolve((request.result as string[]) || [])
      }

      request.onerror = () => {
        resolve(Array.from(memoryVault.keys()))
      }
    })
  } catch {
    return Array.from(memoryVault.keys())
  }
}

/**
 * Migrate legacy localStorage records into the IndexedDB vault without losing data.
 */
export async function migrateLocalStorageToIndexedDB(
  keys: string[],
  customStorage?: { getItem: (k: string) => string | null }
): Promise<void> {
  const storage = customStorage || (isBrowser() ? window.localStorage : null)
  if (!storage) return

  for (const key of keys) {
    try {
      const raw = storage.getItem(key)
      if (raw) {
        let parsed: unknown
        try {
          parsed = JSON.parse(raw)
        } catch {
          parsed = raw
        }
        await setVaultItem(key, parsed)
      }
    } catch {
      // Ignore migration error on individual key
    }
  }
}

/**
 * Estimate storage quota and usage.
 */
export async function getVaultStorageQuotaEstimate(): Promise<{
  usage: number
  quota: number
  percentage: number
}> {
  if (isBrowser() && navigator.storage && typeof navigator.storage.estimate === 'function') {
    try {
      const estimate = await navigator.storage.estimate()
      const usage = estimate.usage || 0
      const quota = estimate.quota || 1024 * 1024 * 50 // default 50MB estimate
      const percentage = quota > 0 ? Math.min(100, Math.round((usage / quota) * 100)) : 0
      return { usage, quota, percentage }
    } catch {
      // fall through
    }
  }

  return {
    usage: 0,
    quota: 1024 * 1024 * 50,
    percentage: 0
  }
}

/**
 * Safe localStorage setter that catches QuotaExceededError or SSR limitations.
 */
export function safeLocalStorageSet(key: string, value: unknown): boolean {
  if (!isBrowser()) return false
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value)
    window.localStorage.setItem(key, serialized)
    return true
  } catch {
    // Quota exceeded or storage disabled
    return false
  }
}

/**
 * Safe localStorage getter that safely parses JSON and returns default value on failure.
 */
export function safeLocalStorageGet<T>(key: string, defaultValue: T | null = null): T | null {
  if (!isBrowser()) return defaultValue
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null || raw === undefined) return defaultValue
    try {
      return JSON.parse(raw) as T
    } catch {
      return (raw as unknown) as T
    }
  } catch {
    return defaultValue
  }
}
