import { describe, it, expect, vi } from 'vitest';
import { debounce, checkInputSize } from './debounce';

describe('debounce', () => {
  it('should debounce function calls', async () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(fn).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('checkInputSize', () => {
  it('should detect normal input', () => {
    const result = checkInputSize('Hello World');

    expect(result.isWarning).toBe(false);
    expect(result.isLimit).toBe(false);
  });

  it('should detect large input', () => {
    const largeInput = 'x'.repeat(150000);
    const result = checkInputSize(largeInput);

    expect(result.isWarning).toBe(true);
    expect(result.size).toBeGreaterThan(100000);
  });

  it('should format size correctly', () => {
    const result = checkInputSize('Hello');

    expect(result.formattedSize).toContain('Bytes');
  });
});
