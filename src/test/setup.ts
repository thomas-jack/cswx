import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

Object.defineProperty(window, 'crypto', {
  writable: true,
  value: {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
    randomUUID: () => {
      return '00000000-0000-0000-0000-000000000000';
    },
    subtle: {
      digest: async () => new ArrayBuffer(32),
      encrypt: async () => new ArrayBuffer(16),
      decrypt: async () => new ArrayBuffer(16),
    },
  },
});
