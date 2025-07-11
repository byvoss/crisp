# CRISP TODO List

Track all pending tasks here. Check off when completed.

## 🚨 PROJECT RULE: SEQUENTIAL PHASES

**⚠️ IMPORTANT: Work ONLY in the active phase! Complete all tasks in the current phase before moving to the next.**

---

## 🟢 ACTIVE PHASE: DOCUMENTATION

### ✅ COMPLETED
**All Rule 27 reviews completed successfully!**

### ⚠️ PHASE NOTE
The `src/` directory contains PROTOTYPE CODE ONLY. Do not update these files - they will be rewritten from scratch in the Implementation Phase.

---

## 📚 [ACTIVE] DOCUMENTATION PHASE

### Documentation Finalization
- [x] Apply Rule 27 (Example Paradigm) to ALL chapters ✅ COMPLETE!
  - [x] Rule 27 created and added to CLAUDE-RULES.md ✅
  - [x] C14-migration.md already fixed (Side-by-Side pattern) ✅
  - [x] Review C01-C05 for Rule 27 compliance ✅
  - [x] Review C06-C10 for Rule 27 compliance ✅
  - [x] Review C11-C16 for Rule 27 compliance ✅ (2025-01-07)
  - [x] All documentation now follows Rule 27! ✅

### Terminology Updates
- [ ] Rename "Component Classes" to "Blueprint Classes" throughout all documentation
  - [ ] Update CLAUDE-RULES.md
  - [ ] Update all CH01-CH16 documentation files
    - [x] CH02-solution.md ✅
  - [ ] Update README.md
  - [ ] Update any code comments
  - Reason: "Blueprint" better conveys the concept of a complete template that can be extended

### Pattern Updates
- [ ] Add `data-key` attributes to examples throughout documentation
  - [ ] Include in all interactive examples (buttons, forms, navigation)
  - [ ] Show realistic naming patterns (e.g., "newsletter-signup-submit", "homepage-hero-main")
  - [ ] Add note about programmatic access (not just testing)
  - Reason: Provides stable anchors for automation, analytics, and JavaScript without coupling to CSS classes

### Documentation Site
- [ ] Set up documentation site (GitHub Pages or similar)
- [ ] Create examples directory with live demos
- [ ] Add component playground
- [ ] Create getting started guide
- [ ] Add changelog/release notes template
- [ ] Create CH17-demo-shop.md - The Demo Scene Shop
  - [ ] Showcase legendary 4KB/64KB demos as "products"
  - [ ] Include .kkrieger as featured item
  - [ ] Add CSS-only madness section (Minecraft, Excel games)
  - [ ] Prove entire shop is smaller than one React component (~60KB total)
  - [ ] Ultimate demonstration of CRISP efficiency meets demoscene philosophy

### IDE Extensions & Tooling
- [ ] Create VS Code CRISP extension
  - [ ] CSS class autocomplete for CRISP patterns
  - [ ] Custom property IntelliSense
  - [ ] Tera syntax highlighting (clone Twig grammar)
  - [ ] Hover documentation for blueprints
  - [ ] Record pattern snippets
- [ ] Create JetBrains plugin
  - [ ] Same features as VS Code
  - [ ] Live templates for CRISP patterns
- [ ] Create Zed extension
  - [ ] Leverage Zed's performance for instant autocomplete
  - [ ] Tera syntax support
- [ ] Create Neovim plugin
  - [ ] LSP integration
  - [ ] Treesitter grammar for Tera
  - [ ] coc-crisp for CoC users
- [ ] Create Sublime Text package
  - [ ] Basic syntax highlighting
  - [ ] Completions file

### Documentation Structure Rewrite (HIGH PRIORITY)
- [ ] Archive old docs to /archive folder ✓
- [ ] Create TODO-DOCS-REBUILD.md guide ✓
- [ ] Complete restructuring per TODO-DOCS-REBUILD.md:
  - **Part 1: The Discovery**
    - [ ] CH01-discovery.md - Winter's End (adapt from archive)
    - [ ] CH02-solution.md - The 1+1+3 Formula (NEW showcase)
    - [ ] CH03-quickstart.md - Your First Page (NEW)
    - [ ] CH04-layers.md - Three Layers (NEW)
  - **Part 2: The Toolkit**
    - [ ] CH05-components.md - Basic Patterns
    - [ ] CH06-layouts.md - Layouts Without Tears
    - [ ] CH07-progressive.md - Three Tiers
    - [ ] CH08-accessibility.md - WCAG First
  - **Part 3: The Deep Dive**
    - [ ] CH09-tokens.md - 10-Color System & Tokens
    - [ ] CH10-modern-css.md - Modern CSS Magic
    - [ ] CH11-migration.md - Escape Legacy
    - [ ] CH12-reference.md - Component Library
  - **Part 4: The Mastery**
    - [ ] CH13-advanced.md - Advanced Patterns
    - [ ] CH14-enterprise.md - Enterprise Features
    - [ ] CH15-practices.md - Best Practices
    - [ ] CH16-cheatsheet.md - The Almanac
- [ ] Add OKLCH relative color power examples throughout docs:
  - Show automatic hover/active states with calc()
  - Demonstrate theme variations from single base color
  - Show perceptual uniformity advantage over HSL
  - Examples: `oklch(from var(--bg) calc(l + 0.1) c h)`
  - Emphasize: "One color, infinite variations, zero manual calculation"
- [ ] Design CRISP "10-Color System" - everything else computed:
  - 3 Brand colors (primary, secondary, accent)
  - 4 Semantic colors (error, warning, success, info)
  - 3 Neutrals (text, background, border)
  - ALL other colors derived via calc() from these 10
  - Document the mathematical relationships
  - Show how 10 colors become 100+ variations

### Documentation Enhancements (Optional)
- [ ] Could always add MORE humor to chapters
- [ ] Add more real-world examples
- [ ] Create video tutorials
- [ ] Document browser fallback strategies (CLARIFICATIONS #16)

---

## 🔒 [LOCKED] IMPLEMENTATION PHASE

**⚠️ LOCKED: Complete Documentation Phase first!**

### Core CSS Implementation
- [ ] 🚀 BUILD FINAL CRISP CSS FROM SPECIFICATIONS
  - [ ] Complete documentation review and finalization
  - [ ] Build crisp.css from scratch based on final specs
  - [ ] Implement all patterns from documentation
  - [ ] Include @layer architecture
  - [ ] Use OKLCH colors throughout
  - [ ] Full WCAG 2.2 AA compliance
  - [ ] Implement CSS minification pipeline

### Theme Package Implementation
- [ ] Build @byvoss/crisp-theme package
  - [ ] Theme switching logic (10KB limit)
  - [ ] Local storage persistence
  - [ ] Auto theme detection
  - [ ] Smooth transitions

### Enterprise Package Implementation
- [ ] Configure TypeScript properly (CLARIFICATIONS #13)
  - [ ] Create tsconfig.json for Web Component development
  - [ ] Build pipeline for @byvoss/crisp-enterprise
  - [ ] Type definitions for component APIs
  - [ ] Proper ESM module output
  - [ ] Update build:types script
- [ ] Implement Web Component generators
  - [ ] Search box component
  - [ ] Product card component
  - [ ] Data table component
  - [ ] Form builder component

---

## 🔒 [LOCKED] TESTING PHASE

**⚠️ LOCKED: Complete Implementation Phase first!**

### Accessibility Testing
- [ ] Test each component with screen readers
- [ ] Run axe DevTools on all examples
- [ ] Create accessibility testing checklist
- [ ] WCAG 2.2 AA certification

### Automated Testing
- [ ] Implement Vitest + Playwright tests (CLARIFICATIONS #15)
  - [ ] Write unit tests for tokens and utilities
  - [ ] Write integration tests for CSS compilation
  - [ ] Write E2E tests for visual regression
  - [ ] Set up accessibility testing automation
  - [ ] Configure CI/CD integration

### Browser Testing
- [ ] Test in all modern browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify CSS features work as expected
- [ ] Test progressive enhancement tiers
- [ ] Performance benchmarking

### Framework Integration Testing
- [ ] Test with other frameworks (Bootstrap, Tailwind)
- [ ] Verify @layer isolation works
- [ ] Document any conflicts/solutions

---

## 🔒 [LOCKED] RELEASE PHASE

**⚠️ LOCKED: Complete Testing Phase first!**

### Pre-Release
- [ ] Final code review
- [ ] Security audit
- [ ] Performance optimization
- [ ] Bundle size verification (<50KB, <60KB, <150KB)

### Release Preparation
- [ ] Configure NPM publishing
- [ ] Set up CDN distribution
- [ ] Generate SRI hashes
- [ ] Create release notes

### Post-Release
- [ ] Monitor GitHub issues
- [ ] Gather community feedback
- [ ] Plan v1.1 improvements
- [ ] Create roadmap

---

## ✅ COMPLETED TASKS

### Documentation Updates (2025-01-07)
- ✅ All chapters (C01-C16) updated with new CRISP patterns
- ✅ WCAG 2.2 AA compliance in documentation
- ✅ OKLCH color system in all examples
- ✅ CSS @layer architecture documented
- ✅ British humor and "Aha!" moments added
- ✅ ARIA usage guidelines created
- ✅ ID patterns for accessibility documented
- ✅ Rule 27 (Example Paradigm) created

### Technical Specifications
- ✅ Custom properties without prefixes for elements
- ✅ Context via data attributes
- ✅ Component naming discipline
- ✅ Define/Use pattern with @property
- ✅ Layout tokens that describe patterns
- ✅ Complete default values
- ✅ Proper separation of concerns

---

## 📊 PHASE PROGRESS

```
Documentation Phase: [▓▓▓▓▓▓▓▓▓░] 90% - ACTIVE ✅
Implementation Phase: [░░░░░░░░░░] 0%  - LOCKED 🔒
Testing Phase:        [░░░░░░░░░░] 0%  - LOCKED 🔒
Release Phase:        [░░░░░░░░░░] 0%  - LOCKED 🔒
```

*Last updated: 2025-01-07*