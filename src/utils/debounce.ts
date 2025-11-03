export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export const INPUT_SIZE_WARNING_THRESHOLD = 100000; // 100KB
export const INPUT_SIZE_LIMIT = 5000000; // 5MB

export function checkInputSize(input: string): {
  isWarning: boolean;
  isLimit: boolean;
  size: number;
  formattedSize: string;
} {
  const size = new Blob([input]).size;
  const formattedSize = formatBytes(size);

  return {
    isWarning: size > INPUT_SIZE_WARNING_THRESHOLD,
    isLimit: size > INPUT_SIZE_LIMIT,
    size,
    formattedSize,
  };
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
