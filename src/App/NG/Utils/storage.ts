// @ts-nocheck

const STORAGE_PREFIX = 'octo.v1.';

interface StorageOptions {
  legacyKeys?: string[];
}

function getStorage(): Storage | null {
  try {
    return window.localStorage || null;
  } catch (_) {
    return null;
  }
}

function prefixKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

export function getStorageItem(key: string, options: StorageOptions = {}): string | null {
  const storage = getStorage();
  if (!storage) return null;
  const { legacyKeys = [] } = options;
  try {
    const namespacedKey = prefixKey(key);
    const value = storage.getItem(namespacedKey);
    if (value !== null && value !== undefined) {
      return value;
    }
    for (const legacyKey of legacyKeys) {
      const legacyValue = storage.getItem(legacyKey);
      if (legacyValue !== null && legacyValue !== undefined) {
        return legacyValue;
      }
    }
  } catch (error) {
    console.warn('[Storage] Failed to read key', key, error);
  }
  return null;
}

export function setStorageItem(key: string, value: string | null, options: StorageOptions = {}): void {
  const storage = getStorage();
  if (!storage) return;
  const { legacyKeys = [] } = options;
  try {
    const namespacedKey = prefixKey(key);
    if (value === null || value === undefined) {
      storage.removeItem(namespacedKey);
    } else {
      storage.setItem(namespacedKey, value);
    }
    legacyKeys.forEach((legacyKey) => {
      try {
        storage.removeItem(legacyKey);
      } catch (_) {
        /* ignore */
      }
    });
  } catch (error) {
    console.warn('[Storage] Failed to write key', key, error);
  }
}

export function removeStorageItem(key: string, options: StorageOptions = {}): void {
  const storage = getStorage();
  if (!storage) return;
  const { legacyKeys = [] } = options;
  try {
    storage.removeItem(prefixKey(key));
    legacyKeys.forEach((legacyKey) => {
      try {
        storage.removeItem(legacyKey);
      } catch (_) {
        /* ignore */
      }
    });
  } catch (error) {
    console.warn('[Storage] Failed to remove key', key, error);
  }
}

export function getJSONStorageItem<T>(key: string, options: StorageOptions = {}): T | null {
  const raw = getStorageItem(key, options);
  if (raw === null || raw === undefined) return null;
  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn('[Storage] Failed to parse JSON value for', key, error);
    return null;
  }
}

export function setJSONStorageItem(key: string, value: unknown, options: StorageOptions = {}): void {
  try {
    const payload = value === undefined ? null : JSON.stringify(value);
    setStorageItem(key, payload, options);
  } catch (error) {
    console.warn('[Storage] Failed to stringify JSON value for', key, error);
  }
}
