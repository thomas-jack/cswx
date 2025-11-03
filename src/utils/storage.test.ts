import { describe, it, expect, beforeEach } from 'vitest';
import { HistoryStorage, setStorageItem, getStorageItem } from './storage';

describe('HistoryStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add entries to history', () => {
    const storage = new HistoryStorage({ storageKey: 'test-history' });
    storage.add({ value: 'test' });

    const entries = storage.getAll();
    expect(entries.length).toBe(1);
    expect(entries[0].data).toEqual({ value: 'test' });
  });

  it('should respect max entries limit', () => {
    const storage = new HistoryStorage({
      storageKey: 'test-history',
      maxEntries: 3,
    });

    storage.add({ value: '1' });
    storage.add({ value: '2' });
    storage.add({ value: '3' });
    storage.add({ value: '4' });

    const entries = storage.getAll();
    expect(entries.length).toBe(3);
    expect(entries[0].data).toEqual({ value: '4' });
  });

  it('should remove specific entries', () => {
    const storage = new HistoryStorage({ storageKey: 'test-history' });
    storage.add({ value: 'test' });

    const entries = storage.getAll();
    const id = entries[0].id;

    storage.remove(id);
    const updatedEntries = storage.getAll();
    expect(updatedEntries.length).toBe(0);
  });

  it('should clear all history', () => {
    const storage = new HistoryStorage({ storageKey: 'test-history' });
    storage.add({ value: '1' });
    storage.add({ value: '2' });

    storage.clear();
    const entries = storage.getAll();
    expect(entries.length).toBe(0);
  });

  it('should get count', () => {
    const storage = new HistoryStorage({ storageKey: 'test-history' });
    storage.add({ value: '1' });
    storage.add({ value: '2' });

    expect(storage.getCount()).toBe(2);
  });

  it('should retrieve entry by id', () => {
    const storage = new HistoryStorage({ storageKey: 'test-history' });
    storage.add({ value: 'test' });

    const entries = storage.getAll();
    const id = entries[0].id;
    const entry = storage.get(id);

    expect(entry).toBeDefined();
    expect(entry?.data).toEqual({ value: 'test' });
  });
});

describe('Storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set and get storage items', () => {
    setStorageItem('test-key', { value: 'test' });
    const result = getStorageItem('test-key', null);

    expect(result).toEqual({ value: 'test' });
  });

  it('should return default value when key not found', () => {
    const result = getStorageItem('nonexistent', 'default');
    expect(result).toBe('default');
  });
});
