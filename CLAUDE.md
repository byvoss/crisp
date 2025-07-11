# CLAUDE.md - CRISP Development Guide

## 🚨 MANDATORY: READ CLAUDE-RULES.md FIRST!

**This guide references the complete CRISP rules. You MUST read [CLAUDE-RULES.md](./CLAUDE-RULES.md) for all mandatory requirements.**

## 📋 Quick Rules Index

### 🔴 FUNDAMENTAL ARCHITECTURE RULES (Follow First!)
1. **[The Sacred 1+1+3 Formula](./CLAUDE-RULES.md#rule-1-sacred-formula)** - Component + layout + max 3 properties
2. **[CSS @layer Architecture](./CLAUDE-RULES.md#rule-2-layers)** 🎯 - The killer feature for isolation
3. **[CSS @layer Usage](./CLAUDE-RULES.md#rule-3-layer-usage)** 🎯 - Three layers with toggle system
4. **[Custom Properties Pattern](./CLAUDE-RULES.md#rule-4-properties)** - Define/Use pattern

### 🟠 NAMING & STRUCTURE RULES (Follow When Writing)
5. **[Component Naming Discipline](./CLAUDE-RULES.md#rule-5-naming)** - Max one hyphen
6. **[Class Prefixes](./CLAUDE-RULES.md#rule-6-prefixes)** - as-, with-, no prefix
7. **[Token Naming Rules](./CLAUDE-RULES.md#rule-7-tokens)** - Clear prefix hierarchy
8. **[No IDs in CSS](./CLAUDE-RULES.md#rule-8-no-ids)** - IDs for function only

### 🟡 TECHNICAL CORE RULES (Always Apply)
9. **[Semantic HTML First](./CLAUDE-RULES.md#rule-9-semantic)** - Proper elements
10. **[WCAG 2.2 AA Compliance](./CLAUDE-RULES.md#rule-10-accessibility)** 🚨 - Accessibility is non-negotiable
11. **[Complete Default Values](./CLAUDE-RULES.md#rule-11-defaults)** - All tokens defined
12. **[Data Attributes vs ARIA](./CLAUDE-RULES.md#rule-12-attributes)** - KISS principle

### 🟢 DESIGN SYSTEM RULES (Follow When Styling)
13. **[OKLCH Colors Only](./CLAUDE-RULES.md#rule-13-colors)** - No HSL, RGB, or HEX
14. **[Relative Color Pattern](./CLAUDE-RULES.md#rule-14-relative-colors)** - Automatic variations
15. **[@property for All Tokens](./CLAUDE-RULES.md#rule-15-property)** - Type safety
16. **[Layout Token Patterns](./CLAUDE-RULES.md#rule-16-layout-tokens)** - Pattern-specific tokens
17. **[Theme vs Variant Distinction](./CLAUDE-RULES.md#rule-17-theme-variant)** - Clear separation

### 🔵 PROGRESSIVE ENHANCEMENT (Modern Features)
18. **[CSS :has() for Smart Components](./CLAUDE-RULES.md#rule-18-has)** - CSS-only interactivity
19. **[@starting-style Animations](./CLAUDE-RULES.md#rule-19-starting-style)** - Zero JS
20. **[Native ::backdrop Usage](./CLAUDE-RULES.md#rule-20-backdrop)** - No wrapper divs
21. **[field-sizing Progressive Enhancement](./CLAUDE-RULES.md#rule-21-field-sizing)** - Auto-growing fields
22. **[CSS Subgrid System](./CLAUDE-RULES.md#rule-22-subgrid)** - Grid layouts

### ⚪ META RULES (Overarching)
23. **[Progressive Enhancement Path](./CLAUDE-RULES.md#rule-23-progressive)** - Three tiers
24. **[Battery-Efficient Design](./CLAUDE-RULES.md#rule-24-battery)** 🔋 - CSS-only philosophy
25. **[Browser Support Policy](./CLAUDE-RULES.md#rule-25-browser-support)** - Modern browsers only
26. **[Language Rules](./CLAUDE-RULES.md#rule-26-language)** - British docs, US code
27. **[Semantic Data Attributes](./CLAUDE-RULES.md#rule-27-semantic-attributes)** - Enhanced HTML meaning
28. **[Example Paradigm](./CLAUDE-RULES.md#rule-28-example-paradigm)** - Make CRISP the developer's dream

## 📝 Documentation Writing Principles

1. **British Humour with Bite** - Use sarcasm to highlight absurdities, but never be malicious. Think "cricket analogies" and "mint-flavoured dental floss", not personal attacks.

2. **Respect Despite Critique** - Always acknowledge the good intentions and complexity of the problems others tried to solve. Criticise the solution, not the person.

3. **Real-World Examples** - Support arguments with scenarios every developer has experienced (SCSS nesting hell, Bootstrap kitchen-sink mentality).

4. **Self-Deprecating Honesty** - Don't position CRISP as the ultimate solution. Acknowledge it might also end up in the methodology graveyard.

5. **Semantic Purity** - Always prefer semantic HTML5 elements over redundant class names. No `<button class="button">` nonsense.

6. **Engineering Philosophy** - Champion simplification over sophistication. Real engineering removes layers, it doesn't add them.

7. **Team Reality** - Address the actual problems teams face, like interpretation differences and philosophical debates that block progress.

8. **No Redundancy** - Examples should demonstrate concepts without redundant attributes or unnecessary complexity.

9. **Aha Moments** - When showing examples, include **The "Aha!":** sections that highlight the key insight or benefit. These moments help readers grasp why CRISP's approach is better.

10. **Simplest Examples First** - Always show the simplest possible CRISP solution in examples. Remove any unnecessary complexity while keeping the message clear. Psychologically, shorter examples are more convincing. Only add complexity when absolutely necessary to demonstrate a specific point.

Remember: Be honest, practical, respectfully sarcastic, and always focus on genuine simplification rather than creating new abstraction layers.

## ⚠️ IMPORTANT RULES (Must follow)

### Conversation Language

**Always communicate in German with the developer**
- All conversations between you and Claude must be in German
- Documentation remains in British English (as defined in Rule 15)
- Code comments remain in British English
- But our conversations: Always in German!

### Development Workflow

#### Task Management

**ALWAYS check TODO.md for:**
- Current tasks that need completion
- Known issues and technical debt
- Tasks to add when discovering problems
- Tasks to check off when completed

**Workflow for EVERY task:**
1. Complete the implementation
2. Commit and push changes
3. Check CI with `gh run list --limit=1` (skip for documentation-only changes: *.md files)
4. If CI fails: Fix issues and repeat
5. When CI passes:
   - For TODO tasks: Check off in TODO.md
   - For other tasks: Write "TASK: [Task name] completed successfully"

### Common Pitfalls to Avoid

1. **Don't create modifier classes** - Use custom properties
2. **Don't fight the cascade** - Work with CSS, not against it
3. **Don't use IDs for styling** - Only for accessibility
4. **Don't nest selectors** - Keep specificity low
5. **Don't abbreviate** - Clarity over brevity

### Package & Build Strategy

**Three separate NPM packages** (not a monolith):
1. **@byvoss/crisp** - Pure CSS (~50KB)
2. **@byvoss/crisp-theme** - Theme JS only (~10KB)
3. **@byvoss/crisp-enterprise** - Web Components only (~90KB)

**Build Process**:
- Three separate build pipelines
- Each package has its own dependencies
- Users only install what they need
- No Bootstrap-style bloat

### State-of-the-Art CDN Distribution

**Modern ESM modules with SRI integrity for security and performance:**

```html
<!-- Tier 1: CRISP (Pure CSS) -->
<link rel="stylesheet" 
  href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css"
  integrity="sha384-..." 
  crossorigin="anonymous">

<!-- Tier 2: CRISP Theme (CSS + Theme JS) -->
<link rel="stylesheet" 
  href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css"
  integrity="sha384-..." 
  crossorigin="anonymous">
<script type="module" 
  src="https://unpkg.com/@byvoss/crisp-theme@latest/dist/theme.esm.js"
  integrity="sha384-..." 
  crossorigin="anonymous"></script>

<!-- Tier 3: CRISP Enterprise (Full Platform) -->
<link rel="stylesheet" 
  href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css"
  integrity="sha384-..." 
  crossorigin="anonymous">
<script type="module" 
  src="https://unpkg.com/@byvoss/crisp-theme@latest/dist/theme.esm.js"
  integrity="sha384-..." 
  crossorigin="anonymous"></script>
<script type="module" 
  src="https://unpkg.com/@byvoss/crisp-enterprise@latest/dist/components.esm.js"
  integrity="sha384-..." 
  crossorigin="anonymous"></script>
```

**CDN Best Practices:**
- Modern ESM modules for tree-shaking
- SRI (Subresource Integrity) for security
- Crossorigin anonymous for proper CORS
- Progressive loading (CSS first, then JS enhancements)
- Version locking available (`@1.0.0` instead of `@latest`)

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

### Common CI/CD Issues

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

### Document Revision Process
When making significant changes to documentation:

1. **Create revision copy**: `cp docs/chapter.md docs/revisions/chapter.rev[N].md`
2. **Make changes** in the original file
3. **Keep revisions** for reference and rollback
4. **Naming**: rev1, rev2, rev3... in chronological order

Example:
```bash
cp docs/C04-anatomy.md docs/revisions/C04-anatomy.rev1.md
# Now edit docs/C04-anatomy.md with new patterns
```

The `revisions/` folder maintains history without cluttering the main docs.

### Server-Side Examples Standard

**All server-side examples in CRISP documentation use Rust/Tera** as established in [Chapter 5: Blueprint Classes](./docs/CH05-blueprints.md). This decision reflects our preference for memory-safe, performant server architecture while acknowledging that PHP/Twig, Python/Jinja2, and Node.js/EJS are equally valid choices.

When writing documentation:
- Use Rust/Tera syntax for all server-side examples
- Follow the record pattern for maintainable templates (see CH05)
- Reference Chapter 5 when introducing server-side concepts in new sections

### Testing Guidelines
- Check: `npm run lint`
- Check: `npm run typecheck`
- Always test in multiple browsers
- Verify accessibility with screen readers

## 📚 REFERENCE (Good to know)

### Required Reading

Please read these files in order to understand the complete project:

### Essential Files - IMPORTANT!
- [ ] `README.md` - Project overview and quick start
- [ ] `LICENSE` - MIT License details
- [ ] `CONTRIBUTING.md` - Contribution guidelines
- [ ] `docs/README.md` - **Complete documentation overview with all chapters**
- [ ] `TODO.md` - **Current tasks and technical debt**
- [ ] `CLAUDE-RULES.md` - **All mandatory CRISP rules**

### Quick Reference
- [ ] `docs/C16-cheatsheet.md` - Everything on one page (for quick lookup)

*Note: The docs/README.md provides a complete overview of all 16 documentation chapters. Read specific chapters as needed for your current task.*

### Key Design Decisions

#### Spacing Scale
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

#### Color System
See [Rule 5: OKLCH Colors Only](./CLAUDE-RULES.md#rule-5-colors) and [Rule 16: Relative Color Pattern](./CLAUDE-RULES.md#rule-16-relative-colors) for complete color system details.

#### Component Naming
See [Rule 11: Component Naming Discipline](./CLAUDE-RULES.md#rule-11-naming) for naming conventions.

### File Structure
```
src/
├── elements/      # CSS-only elements
├── components/    # Web Components (Enterprise)
├── layouts/       # Layout patterns
├── tokens/        # Design tokens
└── themes/        # Theme variations
```

### Project Context

CRISP is part of the byvoss.tech ecosystem, created by Vivian Burkhard Voss (ByVoss Technologies). It prioritises semantic HTML, minimal classes, and accessibility-first design.

---

*Last updated: 2025-01-06*