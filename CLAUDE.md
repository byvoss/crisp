# CLAUDE.md - CRISP Development Guide

## Language Rules

1. **Documentation**: British English (BBC standard)
   - All markdown files
   - Code comments
   - Error messages
   - README content

2. **Code**: US English (for consistency with CSS/JavaScript)
   - CSS properties and values: `color`, `center`, `gray`
   - Variable names: `--color-primary-50`
   - Class names: `as-center`
   - Function names: `initializeComponent()`
   - File names: `color-system.css`

## Essential CRISP Rules

### 1. The Sacred Formula
Every element follows: **1 component + 1 layout + max 3 properties**
```html
<article class="card as-stack with-shadow">
```

### 2. Class Prefixes
- **No prefix**: Components (`card`, `button`, `navigation`)
- **`as-`**: Layout modes (`as-stack`, `as-grid`, `as-center`)
- **`with-`**: Properties (`with-shadow`, `with-interaction`)

### 3. Custom Properties Over Modifier Classes
```html
<!-- ❌ Wrong -->
<button class="button button-primary button-large">

<!-- ✅ Right -->
<button class="button" style="--button-bg: var(--color-primary-50); --button-size: large;">
```

### 4. Semantic HTML First
Always use proper HTML elements. IDs only for accessibility.

### 5. Progressive Enhancement Path
- **CRISP** (~50KB): Pure CSS
- **CRISP Theme** (~60KB): + Theme switching
- **CRISP Enterprise** (~150KB): + TypeScript & i18n

## Required Reading

Please read these files in order to understand the complete project:

### Essential Files
- [ ] `README.md` - Project overview and quick start
- [ ] `LICENSE` - MIT License details
- [ ] `CONTRIBUTING.md` - Contribution guidelines
- [ ] `docs/README.md` - **Complete documentation overview with all chapters**
- [ ] `TODO.md` - **Current tasks and technical debt**

### Quick Reference
- [ ] `docs/C16-cheatsheet.md` - Everything on one page (for quick lookup)

*Note: The docs/README.md provides a complete overview of all 16 documentation chapters. Read specific chapters as needed for your current task.*

## Key Design Decisions

### Spacing Scale
```css
--space-0-25  /* 0.25rem */
--space-0-5   /* 0.5rem */
--space-0-75  /* 0.75rem */
--space-1-0   /* 1rem */
--space-1-5   /* 1.5rem */
--space-2-0   /* 2rem */
--space-3-0   /* 3rem */
--space-4-0   /* 4rem */
```

### Color System
- HSL-based with alpha channel
- Scales from 10 (lightest) to 90 (darkest)
- Semantic names: `--color-primary-50`, `--color-neutral-50`

### Component Naming
- Full words only (`button`, not `btn`)
- Singular form (`card`, not `cards`)
- Descriptive (`navigation`, not `nav` for the class)

## Development Workflow

### Task Management

**ALWAYS check TODO.md for:**
- Current tasks that need completion
- Known issues and technical debt
- Tasks to add when discovering problems
- Tasks to check off when completed

### GitHub Repository

- **Repository**: `github.com:byvoss/crisp.git`
- **Default Branch**: `main`
- **CI/CD**: GitHub Actions (must pass before merging)

### Essential Git Commands

```bash
# Check status
git status

# Commit with proper message format
git commit -m "type: Short description

- Detailed change 1
- Detailed change 2

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to remote
git push origin main

# ALWAYS check CI status after push
gh run list --limit=1
# If failed, investigate:
gh run view [RUN_ID] --log-failed
```

### Common Issues

- **CI Failures**: Check for missing `package-lock.json`
- **Dependency Conflicts**: Use `npm install --legacy-peer-deps`

### License Headers

All source files (.css, .ts, .js) must include this header:

```css
/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */
```

For TypeScript/JavaScript files:
```typescript
/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */
```

For HTML files:
```html
<!--
  @license
  CRISP - Code Rules for Intuitive Semantic Projects
  Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
  MIT License - see LICENSE file for details
-->
```

### Testing
- Check: `npm run lint`
- Check: `npm run typecheck`
- Always test in multiple browsers
- Verify accessibility with screen readers

### File Structure
```
src/
├── elements/      # CSS-only elements
├── components/    # Web Components (Enterprise)
├── layouts/       # Layout patterns
├── tokens/        # Design tokens
└── themes/        # Theme variations
```

## Common Pitfalls to Avoid

1. **Don't create modifier classes** - Use custom properties
2. **Don't fight the cascade** - Work with CSS, not against it
3. **Don't use IDs for styling** - Only for accessibility
4. **Don't nest selectors** - Keep specificity low
5. **Don't abbreviate** - Clarity over brevity

## Project Context

CRISP is part of the byvoss.tech ecosystem, created by Vivian Burkhard Voss (ByVoss Technologies). It prioritises semantic HTML, minimal classes, and accessibility-first design.

---

*Last updated: 2025-01-05*