import { describe, it, expect } from 'vitest';
import { detectFileType, formatFileSize } from './file';

describe('File utilities', () => {
  describe('detectFileType', () => {
    it('should detect text files', () => {
      expect(detectFileType('test.txt')).toBe('text');
      expect(detectFileType('data.json')).toBe('text');
      expect(detectFileType('style.css')).toBe('text');
      expect(detectFileType('script.js')).toBe('text');
    });

    it('should detect binary files', () => {
      expect(detectFileType('image.png')).toBe('binary');
      expect(detectFileType('document.pdf')).toBe('binary');
      expect(detectFileType('archive.zip')).toBe('binary');
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(500)).toBe('500 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    });
  });
});
