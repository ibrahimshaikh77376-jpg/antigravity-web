import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.lucide (icon library loaded via CDN)
if (!window.lucide) {
  window.lucide = {
    createIcons: vi.fn(),
  };
}

// Mock fetch API
global.fetch = vi.fn();

// Mock window.location
delete window.location;
window.location = {
  href: '',
  origin: 'http://localhost:5173',
  hostname: 'localhost',
  protocol: 'http:',
  reload: vi.fn(),
};

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Suppress console errors during tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
};