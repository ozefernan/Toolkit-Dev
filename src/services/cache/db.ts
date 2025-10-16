import Dexie, { type Table } from 'dexie';
import type { CacheEntry } from '../../types';

// Define database schema
class DevHubDB extends Dexie {
  docIndexes!: Table<CacheEntry<unknown>>;
  docContents!: Table<CacheEntry<unknown>>;
  docDatabases!: Table<CacheEntry<unknown>>; // Complete db.json for each language
  preferences!: Table<{ key: string; value: unknown }>;

  constructor() {
    super('DevHubDB');

    this.version(1).stores({
      docIndexes: 'key, timestamp, expiresAt',
      docContents: 'key, timestamp, expiresAt',
      preferences: 'key',
    });

    // Add new table for databases in version 2
    this.version(2).stores({
      docIndexes: 'key, timestamp, expiresAt',
      docContents: 'key, timestamp, expiresAt',
      docDatabases: 'key, timestamp, expiresAt',
      preferences: 'key',
    });
  }
}

// Create database instance
export const db = new DevHubDB();

// Cache utilities
export const cache = {
  /**
   * Get item from cache
   */
  async get<T>(table: 'docIndexes' | 'docContents' | 'docDatabases', key: string): Promise<T | null> {
    try {
      const entry = await db[table].get(key) as CacheEntry<T> | undefined;

      if (!entry) return null;

      // Check if expired
      if (entry.expiresAt && entry.expiresAt < Date.now()) {
        await db[table].delete(key);
        return null;
      }

      return entry.value;
    } catch (error) {
      console.error(`Error getting cache for ${key}:`, error);
      return null;
    }
  },

  /**
   * Set item in cache
   */
  async set<T>(
    table: 'docIndexes' | 'docContents' | 'docDatabases',
    key: string,
    value: T,
    ttl?: number // Time to live in milliseconds
  ): Promise<void> {
    try {
      const entry: CacheEntry<T> = {
        key,
        value,
        timestamp: Date.now(),
        expiresAt: ttl ? Date.now() + ttl : undefined,
      };

      await db[table].put(entry);
    } catch (error) {
      console.error(`Error setting cache for ${key}:`, error);
    }
  },

  /**
   * Delete item from cache
   */
  async delete(table: 'docIndexes' | 'docContents' | 'docDatabases', key: string): Promise<void> {
    try {
      await db[table].delete(key);
    } catch (error) {
      console.error(`Error deleting cache for ${key}:`, error);
    }
  },

  /**
   * Clear all expired entries
   */
  async clearExpired(): Promise<void> {
    try {
      const now = Date.now();

      await db.docIndexes.where('expiresAt').below(now).delete();
      await db.docContents.where('expiresAt').below(now).delete();
      await db.docDatabases.where('expiresAt').below(now).delete();
    } catch (error) {
      console.error('Error clearing expired cache:', error);
    }
  },

  /**
   * Clear all cache
   */
  async clearAll(): Promise<void> {
    try {
      await db.docIndexes.clear();
      await db.docContents.clear();
      await db.docDatabases.clear();
    } catch (error) {
      console.error('Error clearing all cache:', error);
    }
  },

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{
    docIndexes: number;
    docContents: number;
    docDatabases: number;
    totalSize: number;
  }> {
    try {
      const [docIndexesCount, docContentsCount, docDatabasesCount] = await Promise.all([
        db.docIndexes.count(),
        db.docContents.count(),
        db.docDatabases.count(),
      ]);

      return {
        docIndexes: docIndexesCount,
        docContents: docContentsCount,
        docDatabases: docDatabasesCount,
        totalSize: docIndexesCount + docContentsCount + docDatabasesCount,
      };
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return { docIndexes: 0, docContents: 0, docDatabases: 0, totalSize: 0 };
    }
  },
};

// Preferences utilities
export const preferences = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const item = await db.preferences.get(key);
      return item ? (item.value as T) : null;
    } catch (error) {
      console.error(`Error getting preference ${key}:`, error);
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await db.preferences.put({ key, value });
    } catch (error) {
      console.error(`Error setting preference ${key}:`, error);
    }
  },

  async delete(key: string): Promise<void> {
    try {
      await db.preferences.delete(key);
    } catch (error) {
      console.error(`Error deleting preference ${key}:`, error);
    }
  },
};

// Clear expired cache on initialization
cache.clearExpired();
