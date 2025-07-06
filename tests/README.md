# CRISP Testing Guide

## Overview

CRISP uses a modern testing stack based on 2024/2025 developer satisfaction leaders:
- **Vitest**: Unit and integration testing
- **Playwright**: E2E, visual regression, and accessibility testing

## Test Structure

```
tests/
├── unit/          # Vitest unit tests
│   ├── tokens/    # Design token validation
│   ├── utils/     # Utility function tests
│   └── build/     # Build process tests
├── integration/   # Vitest integration tests
│   ├── css/       # CSS compilation tests
│   ├── themes/    # Theme switching tests
│   └── components/# Component integration
└── e2e/          # Playwright tests
    ├── visual/    # Visual regression
    ├── a11y/      # Accessibility
    ├── browser/   # Cross-browser
    └── components/# Web Component behavior
```

## Running Tests

### All Tests
```bash
npm test
```

### Unit Tests
```bash
npm run test:unit          # Run once
npm run test:unit:watch    # Watch mode
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e          # Headless
npm run test:e2e:ui       # Interactive UI
```

### Coverage
```bash
npm run test:coverage
```

## Writing Tests

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest';

describe('Token Validation', () => {
  it('should follow naming convention', () => {
    expect(token).toMatch(/^--[a-z-]+$/);
  });
});
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test';

test('button visual regression', async ({ page }) => {
  await page.goto('/examples/button.html');
  const button = page.locator('.button');
  await expect(button).toHaveScreenshot();
});
```

### Accessibility Test Example
```typescript
import AxeBuilder from '@axe-core/playwright';

test('form accessibility', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

## Test Utilities

Common test helpers are available in `tests/utils/test-helpers.ts`:

- `createTestPage()` - Create test HTML with CRISP loaded
- `getCSSVariable()` - Get computed custom property values
- `validateCRISPClasses()` - Validate 1+1+3 rule
- `waitForTransition()` - Wait for CSS transitions

## Best Practices

1. **Unit Tests**: Focus on logic and utilities
2. **Integration Tests**: Test build output and CSS compilation
3. **E2E Tests**: Test real browser behavior and visual appearance
4. **Accessibility**: Every component should pass WCAG 2.1 AA

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Before npm publish

Visual regression tests generate screenshots that are stored in Git LFS.