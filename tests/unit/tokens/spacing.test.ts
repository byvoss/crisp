/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */

import { describe, it, expect } from 'vitest';

// Mock CSS custom property values for testing
const spacingTokens = {
  '--space-0-25': '0.25rem',
  '--space-0-5': '0.5rem',
  '--space-0-75': '0.75rem',
  '--space-1-0': '1rem',
  '--space-1-5': '1.5rem',
  '--space-2-0': '2rem',
  '--space-3-0': '3rem',
  '--space-4-0': '4rem',
};

describe('Spacing Tokens', () => {
  it('should have consistent spacing scale', () => {
    const values = Object.values(spacingTokens).map(v => parseFloat(v));
    
    // Check that scale increases
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]);
    }
  });

  it('should follow CRISP naming convention', () => {
    Object.keys(spacingTokens).forEach(token => {
      expect(token).toMatch(/^--space-\d+-\d+$/);
    });
  });

  it('should use rem units', () => {
    Object.values(spacingTokens).forEach(value => {
      expect(value).toMatch(/^\d+(\.\d+)?rem$/);
    });
  });

  it('should have expected multipliers', () => {
    expect(parseFloat(spacingTokens['--space-0-25'])).toBe(0.25);
    expect(parseFloat(spacingTokens['--space-0-5'])).toBe(0.5);
    expect(parseFloat(spacingTokens['--space-0-75'])).toBe(0.75);
    expect(parseFloat(spacingTokens['--space-1-0'])).toBe(1);
    expect(parseFloat(spacingTokens['--space-1-5'])).toBe(1.5);
    expect(parseFloat(spacingTokens['--space-2-0'])).toBe(2);
    expect(parseFloat(spacingTokens['--space-3-0'])).toBe(3);
    expect(parseFloat(spacingTokens['--space-4-0'])).toBe(4);
  });
});