/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

global.localStorage = localStorageMock as any;

// Mock matchMedia
const matchMediaMock = vi.fn((query) => ({
  matches: query === '(prefers-color-scheme: dark)',
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

global.matchMedia = matchMediaMock as any;

describe('Theme Switching', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should detect system preference on load', () => {
    // Mock dark mode preference
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
    });

    // Simulate theme script execution
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme || savedTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should persist theme choice', () => {
    // Set theme
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');

    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should respect saved theme over system preference', () => {
    // System prefers light
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
    });

    // But user chose dark
    localStorageMock.getItem.mockReturnValue('dark');

    // Simulate theme script
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'auto') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should handle auto theme mode', () => {
    localStorageMock.getItem.mockReturnValue('auto');
    
    // Mock light mode preference
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
    });

    // Simulate theme script
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should update when system preference changes', () => {
    let changeCallback: ((e: any) => void) | null = null;
    
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: (event: string, cb: (e: any) => void) => {
        if (event === 'change') changeCallback = cb;
      },
    });

    localStorageMock.getItem.mockReturnValue('auto');

    // Initial setup
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (localStorage.getItem('theme') === 'auto') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });

    // Simulate system preference change
    if (changeCallback) {
      changeCallback({ matches: true });
    }

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});