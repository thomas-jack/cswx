export interface HistoryEntry<T = unknown> {
  id: string;
  timestamp: number;
  data: T;
}

export interface StorageOptions {
  maxEntries?: number;
  storageKey: string;
}

export class HistoryStorage<T = unknown> {
  private maxEntries: number;
  private storageKey: string;

  constructor(options: StorageOptions) {
    this.maxEntries = options.maxEntries || 50;
    this.storageKey = options.storageKey;
  }

  private getEntries(): HistoryEntry<T>[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load history:', error);
      return [];
    }
  }

  private saveEntries(entries: HistoryEntry<T>[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(entries));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }

  add(data: T): void {
    const entries = this.getEntries();
    const newEntry: HistoryEntry<T> = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
      data,
    };

    entries.unshift(newEntry);

    if (entries.length > this.maxEntries) {
      entries.splice(this.maxEntries);
    }

    this.saveEntries(entries);
  }

  getAll(): HistoryEntry<T>[] {
    return this.getEntries();
  }

  get(id: string): HistoryEntry<T> | undefined {
    return this.getEntries().find((entry) => entry.id === id);
  }

  remove(id: string): void {
    const entries = this.getEntries().filter((entry) => entry.id !== id);
    this.saveEntries(entries);
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }

  getCount(): number {
    return this.getEntries().length;
  }
}

export function setStorageItem(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
}

export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from storage:', error);
    return defaultValue;
  }
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key);
}
