// Simple in-memory cache utility for menu data

type CacheEntry = {
  data: any;
  timestamp: number;
};

const caches: Map<string, CacheEntry> = new Map();

export const menuCache = {
  get: (key: string, ttlMs: number = 5 * 60 * 1000): any | null => {
    const entry = caches.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > ttlMs) {
      caches.delete(key);
      return null;
    }
    return entry.data;
  },

  set: (key: string, data: any): void => {
    caches.set(key, {
      data,
      timestamp: Date.now(),
    });
  },

  invalidate: (key?: string): void => {
    if (key) {
      caches.delete(key);
    } else {
      caches.clear();
    }
  },

  invalidateAll: (): void => {
    caches.clear();
  },
};

// Cache keys
export const CACHE_KEYS = {
  MENU: 'header-menu',
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
};
