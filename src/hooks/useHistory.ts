import { useState, useCallback } from 'react';
import { HistoryStorage, HistoryEntry } from '../utils/storage';

export interface UseHistoryOptions {
  storageKey: string;
  maxEntries?: number;
  enableUndoRedo?: boolean;
}

export interface UseHistoryReturn<T> {
  entries: HistoryEntry<T>[];
  currentIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  add: (data: T) => void;
  undo: () => T | undefined;
  redo: () => T | undefined;
  select: (entry: HistoryEntry<T>) => void;
  clear: () => void;
  refresh: () => void;
}

export function useHistory<T>({
  storageKey,
  maxEntries = 50,
  enableUndoRedo = true,
}: UseHistoryOptions): UseHistoryReturn<T> {
  const [storage] = useState(
    () => new HistoryStorage<T>({ storageKey, maxEntries })
  );
  const [entries, setEntries] = useState<HistoryEntry<T>[]>(() =>
    storage.getAll()
  );
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (enableUndoRedo) {
      const allEntries = storage.getAll();
      return allEntries.length > 0 ? 0 : -1;
    }
    return -1;
  });

  const refresh = useCallback(() => {
    const allEntries = storage.getAll();
    setEntries(allEntries);
  }, [storage]);

  const add = useCallback(
    (data: T) => {
      storage.add(data);
      const allEntries = storage.getAll();
      setEntries(allEntries);
      if (enableUndoRedo) {
        setCurrentIndex(0);
      }
    },
    [storage, enableUndoRedo]
  );

  const undo = useCallback((): T | undefined => {
    if (!enableUndoRedo || currentIndex >= entries.length - 1) {
      return undefined;
    }
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    return entries[newIndex]?.data;
  }, [entries, currentIndex, enableUndoRedo]);

  const redo = useCallback((): T | undefined => {
    if (!enableUndoRedo || currentIndex <= 0) {
      return undefined;
    }
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    return entries[newIndex]?.data;
  }, [entries, currentIndex, enableUndoRedo]);

  const select = useCallback(
    (entry: HistoryEntry<T>) => {
      const index = entries.findIndex((e) => e.id === entry.id);
      if (index !== -1 && enableUndoRedo) {
        setCurrentIndex(index);
      }
    },
    [entries, enableUndoRedo]
  );

  const clear = useCallback(() => {
    storage.clear();
    setEntries([]);
    setCurrentIndex(-1);
  }, [storage]);

  const canUndo = enableUndoRedo && currentIndex < entries.length - 1;
  const canRedo = enableUndoRedo && currentIndex > 0;

  return {
    entries,
    currentIndex,
    canUndo,
    canRedo,
    add,
    undo,
    redo,
    select,
    clear,
    refresh,
  };
}
