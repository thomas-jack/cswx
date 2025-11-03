import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyToClipboard, readFromClipboard } from './clipboard';

describe('Clipboard utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should copy text to clipboard using navigator.clipboard', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const result = await copyToClipboard('test text');

    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('test text');
  });

  it('should read from clipboard using navigator.clipboard', async () => {
    const readTextMock = vi.fn().mockResolvedValue('clipboard content');
    Object.assign(navigator, {
      clipboard: {
        readText: readTextMock,
      },
    });

    const result = await readFromClipboard();

    expect(result).toBe('clipboard content');
    expect(readTextMock).toHaveBeenCalled();
  });

  it('should handle clipboard read errors', async () => {
    const readTextMock = vi
      .fn()
      .mockRejectedValue(new Error('Permission denied'));
    Object.assign(navigator, {
      clipboard: {
        readText: readTextMock,
      },
    });

    const result = await readFromClipboard();

    expect(result).toBeNull();
  });
});
