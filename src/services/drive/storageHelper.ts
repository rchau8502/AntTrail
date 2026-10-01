/**
 * Safe cross-environment Storage abstraction that falls back to in-memory
 * storage when window.localStorage is not available (e.g. Node tests, incognito restrictions).
 */
class MemoryStorage {
  private store = new Map<string, string>()

  getItem(key: string): string | null {
    return this.store.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value))
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }
}

const memoryStorage = new MemoryStorage()

export function getSafeStorage() {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    try {
      // Test if localStorage is functional
      const testKey = '__storage_test__'
      window.localStorage.setItem(testKey, testKey)
      window.localStorage.removeItem(testKey)
      return window.localStorage
    } catch {
      return memoryStorage
    }
  }
  return memoryStorage
}
