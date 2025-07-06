/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */

import { Page } from '@playwright/test';

/**
 * Creates a test HTML page with CRISP CSS loaded
 */
export async function createTestPage(page: Page, content: string) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CRISP Test Page</title>
      <link rel="stylesheet" href="/dist/crisp.css">
    </head>
    <body>
      ${content}
    </body>
    </html>
  `;
  
  await page.setContent(html);
}

/**
 * Gets computed CSS custom property value
 */
export async function getCSSVariable(page: Page, element: string, variable: string): Promise<string> {
  return page.evaluate(({ el, prop }) => {
    const elem = document.querySelector(el);
    if (!elem) return '';
    return getComputedStyle(elem).getPropertyValue(prop).trim();
  }, { el: element, prop: variable });
}

/**
 * Checks if element follows CRISP 1+1+3 rule
 */
export async function validateCRISPClasses(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    
    const classes = Array.from(element.classList);
    
    // Count class types
    let componentCount = 0;
    let layoutCount = 0;
    let propertyCount = 0;
    
    classes.forEach(cls => {
      if (cls.startsWith('as-')) layoutCount++;
      else if (cls.startsWith('with-')) propertyCount++;
      else componentCount++;
    });
    
    // Validate 1+1+3 rule
    return componentCount <= 1 && layoutCount <= 1 && propertyCount <= 3;
  }, selector);
}

/**
 * Mock token values for unit testing
 */
export const mockTokens = {
  spacing: {
    '--space-0-25': '0.25rem',
    '--space-0-5': '0.5rem',
    '--space-0-75': '0.75rem',
    '--space-1-0': '1rem',
    '--space-1-5': '1.5rem',
    '--space-2-0': '2rem',
    '--space-3-0': '3rem',
    '--space-4-0': '4rem',
  },
  colors: {
    '--color-primary': 'oklch(0.6 0.15 250)',
    '--color-secondary': 'oklch(0.7 0.1 150)',
    '--color-neutral': 'oklch(0.5 0.01 250)',
    '--color-danger': 'oklch(0.6 0.2 25)',
    '--color-success': 'oklch(0.65 0.15 145)',
  },
  radius: {
    '--radius-small': '0.25rem',
    '--radius-md': '0.5rem',
    '--radius-large': '1rem',
    '--radius-full': '9999px',
  },
  text: {
    '--text-size-small': '0.875rem',
    '--text-size-base': '1rem',
    '--text-size-large': '1.25rem',
    '--text-weight-normal': '400',
    '--text-weight-medium': '500',
    '--text-weight-bold': '700',
  }
};

/**
 * Wait for CSS transitions to complete
 */
export async function waitForTransition(page: Page, selector: string) {
  await page.waitForFunction((sel) => {
    const element = document.querySelector(sel);
    if (!element) return true;
    
    const computedStyle = getComputedStyle(element);
    const duration = parseFloat(computedStyle.transitionDuration) * 1000 || 0;
    
    return new Promise(resolve => {
      setTimeout(() => resolve(true), duration);
    });
  }, selector);
}