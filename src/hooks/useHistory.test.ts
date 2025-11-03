import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHistory } from './useHistory';

describe('useHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add entries', () => {
    const { result } = renderHook(() =>
      useHistory({ storageKey: 'test-history' })
    );

    act(() => {
      result.current.add({ value: 'test' });
    });

    expect(result.current.entries.length).toBe(1);
  });

  it('should support undo/redo', () => {
    const { result } = renderHook(() =>
      useHistory({ storageKey: 'test-history', enableUndoRedo: true })
    );

    act(() => {
      result.current.add({ value: 'first' });
      result.current.add({ value: 'second' });
    });

    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);

    let undoneData;
    act(() => {
      undoneData = result.current.undo();
    });

    expect(undoneData).toEqual({ value: 'first' });
    expect(result.current.canRedo).toBe(true);

    let redoneData;
    act(() => {
      redoneData = result.current.redo();
    });

    expect(redoneData).toEqual({ value: 'second' });
  });

  it('should clear history', () => {
    const { result } = renderHook(() =>
      useHistory({ storageKey: 'test-history' })
    );

    act(() => {
      result.current.add({ value: 'test' });
      result.current.clear();
    });

    expect(result.current.entries.length).toBe(0);
  });

  it('should select entries', () => {
    const { result } = renderHook(() =>
      useHistory({ storageKey: 'test-history', enableUndoRedo: true })
    );

    act(() => {
      result.current.add({ value: 'first' });
      result.current.add({ value: 'second' });
    });

    const entry = result.current.entries[1];

    act(() => {
      result.current.select(entry);
    });

    expect(result.current.currentIndex).toBe(1);
  });
});
