/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

describe('CSS Build Process', () => {
  let crispCSS: string;
  let crispModernCSS: string;

  beforeAll(async () => {
    // Read built CSS files
    crispCSS = await readFile(resolve(__dirname, '../../../dist/crisp.css'), 'utf-8');
    crispModernCSS = await readFile(resolve(__dirname, '../../../dist/crisp-modern.css'), 'utf-8');
  });

  it('should include license header', () => {
    expect(crispCSS).toContain('@license');
    expect(crispCSS).toContain('CRISP - Code Rules for Intuitive Semantic Projects');
    expect(crispCSS).toContain('MIT License');
  });

  it('should include all token definitions', () => {
    // Spacing tokens
    expect(crispCSS).toContain('--space-0-25');
    expect(crispCSS).toContain('--space-1-0');
    expect(crispCSS).toContain('--space-4-0');

    // Color tokens
    expect(crispCSS).toContain('--color-primary');
    expect(crispCSS).toContain('--color-neutral');
    expect(crispCSS).toContain('--color-danger');
  });

  it('should include all layout classes', () => {
    expect(crispCSS).toContain('.as-stack');
    expect(crispCSS).toContain('.as-cluster');
    expect(crispCSS).toContain('.as-grid');
    expect(crispCSS).toContain('.as-split');
    expect(crispCSS).toContain('.as-center');
    expect(crispCSS).toContain('.as-container');
  });

  it('should include all component classes', () => {
    expect(crispCSS).toContain('.button');
    expect(crispCSS).toContain('.card');
    expect(crispCSS).toContain('.input');
    expect(crispCSS).toContain('.navigation');
  });

  it('should follow Define/Use pattern', () => {
    // Check button follows pattern
    const buttonMatch = crispCSS.match(/\.button\s*{[^}]*}/s);
    expect(buttonMatch).toBeTruthy();
    
    if (buttonMatch) {
      const buttonCSS = buttonMatch[0];
      // Should define tokens first
      expect(buttonCSS).toMatch(/--bg:\s*var\(--color-/);
      expect(buttonCSS).toMatch(/--color:\s*/);
      // Then use them
      expect(buttonCSS).toMatch(/background:\s*var\(--bg\)/);
      expect(buttonCSS).toMatch(/color:\s*var\(--color\)/);
    }
  });

  it('modern CSS should use OKLCH colors', () => {
    expect(crispModernCSS).toContain('oklch(');
  });

  it('should not contain vendor prefixes in modern build', () => {
    expect(crispModernCSS).not.toContain('-webkit-');
    expect(crispModernCSS).not.toContain('-moz-');
    expect(crispModernCSS).not.toContain('-ms-');
  });

  it('should include property classes', () => {
    expect(crispCSS).toContain('.with-shadow');
    expect(crispCSS).toContain('.with-border');
    expect(crispCSS).toContain('.with-interaction');
  });

  it('should include data attribute selectors', () => {
    expect(crispCSS).toContain('[data-variant=');
    expect(crispCSS).toContain('[data-theme=');
  });
});