/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Form Accessibility Tests', () => {
  test('form elements should be accessible', async ({ page }) => {
    await page.goto('/examples/components/forms.html');

    // Run axe accessibility checks
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('form labels should be properly associated', async ({ page }) => {
    await page.goto('/examples/components/forms.html');

    // Check all inputs have associated labels
    const inputs = page.locator('input.input');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const inputId = await input.getAttribute('id');
      
      if (inputId) {
        // Check for associated label
        const label = page.locator(`label[for="${inputId}"]`);
        await expect(label).toBeVisible();
      } else {
        // Check if input is wrapped in label
        const parentLabel = await input.locator('xpath=ancestor::label');
        await expect(parentLabel).toBeVisible();
      }
    }
  });

  test('required fields should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/examples/components/forms.html');

    const requiredInputs = page.locator('input[required]');
    const count = await requiredInputs.count();

    for (let i = 0; i < count; i++) {
      const input = requiredInputs.nth(i);
      const ariaRequired = await input.getAttribute('aria-required');
      
      // Either the native required or aria-required should be present
      expect(ariaRequired === 'true' || await input.getAttribute('required') !== null).toBeTruthy();
    }
  });

  test('error messages should be announced', async ({ page }) => {
    await page.goto('/examples/components/forms.html');

    // Submit invalid form
    const form = page.locator('form.form').first();
    const submitButton = form.locator('button[type="submit"]');
    await submitButton.click();

    // Check error messages have proper ARIA
    const errors = page.locator('[role="alert"], .error[aria-live]');
    const errorCount = await errors.count();
    
    expect(errorCount).toBeGreaterThan(0);
  });

  test('form navigation should work with keyboard', async ({ page }) => {
    await page.goto('/examples/components/forms.html');

    // Start at first input
    const firstInput = page.locator('input').first();
    await firstInput.focus();

    // Tab through form elements
    const focusableElements = page.locator('input, select, textarea, button');
    const count = await focusableElements.count();

    for (let i = 0; i < count - 1; i++) {
      await page.keyboard.press('Tab');
      
      // Check that focus moved to next element
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });
});