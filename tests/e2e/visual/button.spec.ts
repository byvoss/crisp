/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */

import { test, expect } from '@playwright/test';

test.describe('Button Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a test page with button examples
    await page.goto('/examples/components/button.html');
  });

  test('default button appearance', async ({ page }) => {
    const button = page.locator('button.button').first();
    
    // Visual regression test
    await expect(button).toHaveScreenshot('button-default.png');
  });

  test('button hover state', async ({ page }) => {
    const button = page.locator('button.button').first();
    
    // Hover over button
    await button.hover();
    
    // Capture hover state
    await expect(button).toHaveScreenshot('button-hover.png');
  });

  test('button with custom properties', async ({ page }) => {
    const primaryButton = page.locator('button.button[style*="--bg: var(--color-primary)"]').first();
    
    await expect(primaryButton).toHaveScreenshot('button-primary.png');
  });

  test('button focus state', async ({ page }) => {
    const button = page.locator('button.button').first();
    
    // Focus button
    await button.focus();
    
    // Capture focus state
    await expect(button).toHaveScreenshot('button-focus.png');
  });

  test('button loading state', async ({ page }) => {
    const loadingButton = page.locator('button.button[data-variant="loading"]').first();
    
    await expect(loadingButton).toHaveScreenshot('button-loading.png');
  });

  test('button disabled state', async ({ page }) => {
    const disabledButton = page.locator('button.button[disabled]').first();
    
    await expect(disabledButton).toHaveScreenshot('button-disabled.png');
  });
});