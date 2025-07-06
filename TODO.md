# CRISP TODO List

Track all pending tasks here. Check off when completed.

## High Priority

- [ ] 🚨 WCAG 2.2 AA Compliance Audit (CLARIFICATIONS #17)
  - [ ] Review ALL documentation examples for proper ARIA
  - [ ] Add missing ARIA labels and relationships
  - [ ] Ensure all interactive elements are keyboard accessible
  - [ ] Test each component with screen readers
  - [ ] Run axe DevTools on all examples
  - [ ] Document ARIA patterns per component type
  - [ ] Create accessibility testing checklist

- [x] Apply new CRISP patterns to all documentation chapters
  - [x] C04-anatomy.md - Update custom property pattern (--button-bg → --bg)
  - [x] C05-tokens.md - Ensure token naming rules are consistent
  - [x] C06-layouts.md - Check for context classes → data attributes
  - [x] C07-elements.md - Update all component examples to new pattern
  - [x] C08-containers.md - Apply new custom property pattern
  - [x] C09-navigation.md - Update examples with new patterns
  - [x] C10-forms.md - Critical: update form component patterns
  - [x] C11-feedback.md - Update feedback component examples
  - [x] C12-progressive.md - Ensure examples follow new patterns
  - [x] C13-patterns.md - Most important: update all pattern examples
  - [x] C14-migration.md - Add migration notes for new patterns
  - [x] C15-component-reference.md - Update ALL component documentation
  - [x] C16-cheatsheet.md - Must reflect all new patterns

- [x] Content Review - Verify all documentation chapters
  - [x] C01-the-problem.md - Review problem statement accuracy
  - [x] C02-the-solution.md - Verify CRISP solution presentation
  - [x] C03-principles.md - Check all 5 principles are correct
  - [x] C04-anatomy.md - Verify component anatomy rules
  - [x] C05-tokens.md - Check token system completeness
  - [x] C06-layouts.md - Verify all layout patterns
  - [x] C07-elements.md - Check element documentation
  - [x] C08-containers.md - Verify container patterns
  - [x] C09-navigation.md - Check navigation components
  - [x] C10-forms.md - Verify form patterns and accessibility
  - [x] C11-feedback.md - Check feedback components
  - [x] C12-progressive.md - Verify 3-tier system accuracy
  - [x] C13-patterns.md - Check all patterns work correctly
  - [x] C14-migration.md - Verify migration strategies
  - [x] C15-component-reference.md - Check completeness
  - [x] C16-cheatsheet.md - Verify accuracy of quick reference

- [ ] Fix CSS files to pass stylelint rules (CLARIFICATIONS #14)
  - Configure CRISP-specific stylelint rules
  - Fix a11y warnings (focus states, reduced motion)
  - Fix color notation (modern syntax)
  - Remove duplicate selectors
  - Re-enable linting in package.json

- [x] Update British English to US English in code
  - [x] C01-the-problem.md
  - [x] C02-the-solution.md
  - [x] C03-principles.md
  - [x] C04-anatomy.md
  - [x] C05-tokens.md
  - [x] C06-layouts.md
  - [x] C07-elements.md
  - [x] C08-containers.md
  - [x] C09-navigation.md
  - [x] C10-forms.md
  - [x] C11-feedback.md
  - [x] C12-progressive.md
  - [x] C13-patterns.md
  - [x] C14-migration.md
  - [x] C15-component-reference.md
  - [x] C16-cheatsheet.md

- [ ] Convert color system to OKLCH (CLARIFICATIONS #19) 🎨 HIGH PRIORITY
  - [ ] Convert all 59 HSL base colors to OKLCH manually
    - [ ] Primary scale (10 shades)
    - [ ] Neutral scale (14 shades)
    - [ ] Secondary scale (10 shades)
    - [ ] Error scale (5 shades)
    - [ ] Warning scale (5 shades)
    - [ ] Success scale (5 shades)
    - [ ] Info scale (5 shades)
  - [ ] Convert shadow definitions with alpha
  - [ ] Update ALL documentation examples
  - [ ] Test perceptual uniformity of gradients
  - [ ] Update src/crisp-tokens.css
  - [ ] Update src/crisp-themes.css
  - [ ] No fallbacks - modern browsers only

- [ ] Implement CSS @layer Architecture (CLARIFICATIONS #20) 🎯
  - [ ] Restructure all CSS files to use @layer
  - [ ] Define layer hierarchy: tokens, base, layouts, elements, properties, states, themes
  - [ ] Wrap all CRISP styles in @layer crisp
  - [ ] Document override pattern with @layer overrides
  - [ ] Test with other frameworks (Bootstrap, Tailwind)
  - [ ] Update documentation to explain layer usage

## Medium Priority

- [ ] Configure TypeScript properly (CLARIFICATIONS #13)
  - Create tsconfig.json for Web Component development
  - Build pipeline for @byvoss/crisp-enterprise
  - Type definitions for component APIs
  - Proper ESM module output
  - Update build:types script

- [x] Set up proper testing
  - [x] Configure Vitest for unit/integration tests
  - [x] Configure Playwright for E2E/visual tests
  - [x] Add sample test files
  - [x] Create test utilities
  - [x] Document testing approach

- [ ] Implement proper CSS minification
  - Install clean-css
  - Update build scripts
  - Generate .min.css files

- [ ] Implement Vitest + Playwright tests (CLARIFICATIONS #15)
  - Write unit tests for tokens and utilities
  - Write integration tests for CSS compilation
  - Write E2E tests for visual regression
  - Set up accessibility testing
  - Configure CI/CD integration

## Low Priority

- [ ] Add component documentation
- [ ] Create examples directory
- [ ] Set up documentation site
- [ ] Add changelog
- [ ] Document browser fallback strategies (CLARIFICATIONS #16)
- [ ] Create ARIA usage guidelines (CLARIFICATIONS #17)
- [ ] Document required ID patterns for accessibility (CLARIFICATIONS #18)

## Completed

- [x] Fix CI pipeline
- [x] Add package-lock.json
- [x] Create build scripts
- [x] Add .npmrc for legacy-peer-deps

---

*Last updated: 2025-01-06*

## Documentation Update Summary

All documentation chapters (C01-C16) have been successfully updated with the new CRISP patterns:
- ✅ Custom properties without prefixes for element tokens
- ✅ Context via data attributes instead of CSS classes
- ✅ Component naming discipline (max 1 hyphen)
- ✅ Define/Use pattern for CSS properties
- ✅ Layout tokens that describe patterns, not content
- ✅ Complete default values for all elements
- ✅ Proper separation of concerns (CSS for layout/presentation, data attributes for context)