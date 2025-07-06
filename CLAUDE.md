# CLAUDE.md - CRISP Development Guide

## 🚨 CRITICAL RULES (Non-negotiable)

### Language Rules

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

### Essential CRISP Rules

#### 1. The Sacred Formula
Every element follows: **1 component + 1 layout + max 3 properties**
```html
<article class="card as-stack with-shadow">
```

**Important**: Data attributes do NOT count toward this limit. They are data carriers for logic, not layout controls.
```html
<!-- ✅ Correct: Classes follow 1+1+3, unlimited data attributes -->
<article class="card as-stack with-shadow with-border" 
  data-variant="featured"
  data-entries="5"
  data-level="2">
```

#### 2. Class Prefixes
- **No prefix**: Components (`card`, `button`, `navigation`)
- **`as-`**: Layout modes (`as-stack`, `as-grid`, `as-center`)
- **`with-`**: Properties (`with-shadow`, `with-interaction`)

#### 3. Custom Properties Over Modifier Classes
```html
<!-- ❌ Wrong -->
<button class="button button-primary button-large">

<!-- ✅ Right -->
<button class="button" style="--button-bg: var(--color-primary-50); --button-size: large;">
```

#### 4. Semantic HTML First
Always use proper HTML elements. IDs only for accessibility.

#### 5. Progressive Enhancement Path
- **CRISP** (~50KB): Pure CSS
- **CRISP Theme** (~60KB): + Theme switching
- **CRISP Enterprise** (~150KB): + TypeScript & i18n

#### 6. Custom Property Pattern
```css
.component {
  /* 1. Define defaults */
  --bg: var(--color-neutral);
  --size: 1rem;
  
  /* 2. Use the tokens */
  background: var(--bg);
  font-size: var(--size);
}
```

**Token Naming Rules**:
- **Element classes** (`.button`, `.card`): Element tokens WITHOUT prefix (`--bg`, `--size`, `--color`)
- **Property classes** (`.with-shadow`, `.with-border`): Property tokens WITH prefix (`--shadow-blur`, `--border-width`)
- **All other tokens**: Need prefixes for identification (`--space-1-0`, `--color-primary`, `--radius-small`)

The logic: Element tokens are unambiguous within their element's context. Everything else needs identification.

#### 7. Component Naming Discipline
```css
/* ✅ Good - max one hyphen */
.card { }
.feature-card { }
.pricing-card { }

/* ❌ Bad - overqualified */
.pricing-card-professional { }
.feature-card-with-shadow { }
.pricing-card-monthly-special { }
```
One hyphen = one concept. Multiple hyphens = you're smuggling in modifiers. Use custom properties instead.

#### 8. The Critical Distinction: data-theme vs data-variant

**IMPORTANT**: These serve completely different purposes and must never be confused:

##### data-theme: ONLY for Colour Schemes
- **Purpose**: Controls colour scheme variations (light, dark, high-contrast)
- **Placement**: High-level containers (body, main, section)
- **Values**: `light`, `dark`, `high-contrast`
- **Inheritance**: Cascades to all children
- **Usage**: Theme switching, accessibility preferences

```html
<!-- ✅ Correct data-theme usage -->
<body data-theme="dark">
  <!-- Everything inherits dark theme -->
</body>

<main data-theme="light">
  <!-- Override for specific section -->
</main>

<!-- ❌ Wrong - don't use data-theme on components -->
<button data-theme="dark">Wrong!</button>
```

##### data-variant: EVERYTHING Else
- **Purpose**: ALL other variations (states, contexts, styles, behaviours)
- **Placement**: Individual components and elements
- **Values**: Any semantic descriptor
- **Inheritance**: Does not cascade by default
- **Usage**: Component variations, states, contexts

```html
<!-- ✅ Correct data-variant usage -->
<button class="button" data-variant="primary">Primary Button</button>
<button class="button" data-variant="loading">Loading...</button>
<article class="card" data-variant="danger">Error Card</article>
<nav class="navigation" data-variant="admin">Admin Nav</nav>
<form class="form" data-variant="disabled">Disabled Form</form>
```

##### The Key Principle
```html
<!-- ✅ Theme on container, variant on component -->
<main data-theme="dark">
  <button class="button" data-variant="primary">Correct!</button>
  <article class="card" data-variant="featured">Also Correct!</article>
</main>

<!-- ❌ Never mix their purposes -->
<button data-theme="primary">Wrong - themes aren't styles!</button>
<body data-variant="dark">Wrong - dark is a theme!</body>
```

##### Why This Matters
1. **Clarity**: No confusion about what controls what
2. **Cascade**: Themes cascade, variants don't
3. **Semantics**: Themes are about perception, variants are about purpose
4. **Maintenance**: Easy to find and change either system

```html
<!-- ✅ All variations use data-variant -->
<section data-variant="danger">
  <button class="button">Delete</button>
</section>

<main data-variant="admin">
  <article class="card">Admin only</article>
</main>

<button class="button" data-variant="loading">Saving...</button>
<alert class="alert" data-variant="success">Saved!</alert>
```

```css
/* Variant-specific styling */
[data-variant="danger"] .button {
  --bg: var(--color-danger);
}

[data-variant="admin"] .card {
  --border-color: var(--color-warning);
}

.button[data-variant="loading"] {
  opacity: 0.7;
  cursor: wait;
}
```
Keeps class namespace clean. All variations are data, not classes.

**The Principle**: CSS is for layout and presentation only - never for context. Context is semantic information that belongs in HTML via data attributes. This maintains proper separation of concerns.

**Important**: Elements can have BOTH component classes AND data attributes to avoid unnecessary nesting:
```html
<!-- ✅ Good - direct application -->
<button class="button" data-variant="primary">Primary Button</button>
<article class="card" data-variant="danger">Warning Card</article>
<form class="form" data-variant="loading">Loading Form</form>
<nav class="navigation" data-variant="admin">Admin Navigation</nav>

<!-- ❌ Bad - unnecessary wrapper -->
<div data-variant="premium">
  <button class="button">Premium Button</button>
</div>
```

#### 10. Data Attribute Guidelines

**Core Keys for Styling:**
- **`data-variant`**: ALL variations, states, and contexts
  - Visual styles: `primary`, `secondary`, `ghost`, `minimal`
  - States: `loading`, `error`, `success`, `disabled`
  - Behaviors: `expanded`, `collapsed`, `active`, `selected`
  - Contexts: `admin`, `danger`, `premium`, `authenticated`
  - Layouts: `horizontal`, `vertical`, `compact`, `pills`
- **`data-theme`**: Color scheme only (`light`, `dark`, `high-contrast`)

**Semantic Information Keys (CSS-friendly):**
- **`data-entries`**: Count of child elements (required for countable containers)
- **`data-level`**: Hierarchical depth (`1`, `2`, `3` for nested navigation)
- **`data-current`**: Current position in sequence (`3` for page 3, `2` for step 2)
- **`data-total`**: Total items when different from entries (`256` when showing 20 of 256)

**JavaScript-specific Keys:**
- **`data-function`**: JavaScript behavior hooks (`toggle`, `trigger`, `target`, `container`)
- **`data-action`**: User actions (`submit`, `close`, `expand`)
- **`data-target`**: Element references (`#element-id`)

**Rules:**
- One value per data attribute (no space-separated lists)
- Use kebab-case for custom keys (`data-user-role`)
- Semantic naming, not visual (`data-variant="premium"`, not `data-variant="gold"`)
- Keep the list minimal - these core keys cover most use cases
- Only use attributes that make sense without JavaScript (CSS-only first)
- **Use `data-variant` for everything except theme and semantic info**

#### 11. Complete Default Values Required

**Every element MUST define ALL its tokens with working defaults:**

```css
.button {
  /* 1. Define ALL defaults - element works immediately */
  --bg: var(--color-neutral);
  --color: white;
  --size: var(--text-size-base);
  --weight: var(--text-weight-medium);
  --padding: var(--space-0-75) var(--space-1-5);
  --radius: var(--radius-md);
  --border: none;
  
  /* 2. Use the tokens */
  background: var(--bg);
  color: var(--color);
  font-size: var(--size);
  /* etc. */
}
```

**The Principle**: Elements must work out-of-the-box in Tier 1 (pure CSS) without any custom properties. Users customize only what they need to change. This is fundamental CRISP functionality - not a nice-to-have.

```html
<!-- Must work immediately -->
<button class="button">Click me</button>

<!-- Customize only what's needed -->
<button class="button" style="--bg: var(--color-primary);">Primary</button>
```

#### 12. Layout Classes Must Use Pattern-Specific Tokens

**Layout classes (`as-*`) MUST use tokens that describe the PATTERN, not the content:**

```css
/* ✅ CORRECT: Token describes the layout pattern */
.as-split {
  --split: 300px;      /* How much space for fixed element */
  --gap: 1rem;         /* Space between elements */
}

.as-columns {
  --columns: 1fr 2fr;  /* Column ratios */
}

.as-grid {
  --columns: 3;        /* Number of columns */
  --min-width: 250px;  /* Minimum item width */
}

/* ❌ WRONG: Token suggests content */
.as-sidebar {          /* Bad name - suggests content */
  --width: 300px;      /* Too generic */
}
```

**The Principle**: Layout classes describe HOW things are arranged, not WHAT they contain. Tokens should reflect the layout mechanism, not element names or positions.

```html
<!-- ✅ Clear separation of layout and content -->
<div class="as-split" style="--split: 250px;">
  <aside class="sidebar">...</aside>  <!-- Element class -->
  <main class="content">...</main>     <!-- Element class -->
</div>

<!-- ❌ Confusing mix of layout and content -->
<div class="as-sidebar" style="--width: 250px;">
  <!-- Is this a layout or an element? -->
</div>
```

#### 13. Semantic Data Attributes for Enhanced Meaning

**Components with countable child elements MUST include `data-entries`:**

```html
<!-- Navigation with entry count -->
<nav class="navigation" data-entries="5" aria-label="Main">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/products">Products</a>
  <a class="link" href="/services">Services</a>
  <a class="link" href="/contact">Contact</a>
</nav>

<!-- Accordion with panels -->
<div class="accordion" data-entries="3" data-state="expanded">
  <section class="panel">Content 1</section>
  <section class="panel">Content 2</section>
  <section class="panel">Content 3</section>
</div>

<!-- Tabs with count -->
<div class="tabs" data-entries="4" data-state="active:1">
  <nav class="navigation" data-variant="tabs">
    <button class="tab">Tab 1</button>
    <button class="tab">Tab 2</button>
    <button class="tab">Tab 3</button>
    <button class="tab">Tab 4</button>
  </nav>
</div>

<!-- Pagination -->
<nav class="pagination" data-entries="10" data-state="active:3">
  <a class="link">Previous</a>
  <span>Page 3 of 10</span>
  <a class="link">Next</a>
</nav>
```

**The Principle**: Fixed semantic data attributes enhance HTML readability and JavaScript integration. They make the DOM self-documenting and enable:

1. **Dynamic updates**: JavaScript can maintain accurate counts
2. **CSS reactions**: Different layouts based on item count
3. **Accessibility**: Screen readers can announce totals
4. **Semantic clarity**: Instantly understand structure

```javascript
// Easy dynamic maintenance
const updateNavCount = (nav) => {
  nav.dataset.entries = nav.querySelectorAll('.link').length;
};
```

```css
/* Responsive based on count */
.navigation[data-entries="2"] { --align: space-between; }
.navigation[data-entries="10"] { /* Switch to overflow menu */ }
```

**Components requiring `data-entries`:**
- Navigation menus
- Tab interfaces
- Accordions
- Sliders/Carousels
- Pagination
- Any container where count matters for UX

**Additional semantic data attributes for enhanced meaning:**

**`data-level`** - Hierarchical depth (for nested structures):
```html
<nav class="navigation" data-entries="4" data-level="1" aria-label="Main">
  <a href="/products">Products</a>
  <nav class="navigation" data-entries="3" data-level="2" aria-label="Products submenu">
    <a href="/products/crisp">CRISP Framework</a>
    <a href="/products/themes">Themes</a>
    <a href="/products/enterprise">Enterprise</a>
  </nav>
</nav>
```

**`data-current`** - Current position in a sequence:
```html
<nav class="pagination" data-entries="10" data-current="3" aria-label="Page navigation">
  <a class="link" href="?page=2">Previous</a>
  <span>Page 3 of 10</span>
  <a class="link" href="?page=4">Next</a>
</nav>

<nav class="steps" data-entries="5" data-current="2">
  <span class="step">Billing</span>
  <span class="step" aria-current="step">Shipping</span>
  <span class="step">Payment</span>
  <span class="step">Review</span>
  <span class="step">Confirm</span>
</nav>
```

**`data-total`** - Total count when different from visible entries:
```html
<section class="results" data-entries="20" data-total="256">
  <h2>Showing 20 of 256 results</h2>
  <!-- 20 visible items, but 256 total exist -->
</section>

<div class="gallery" data-entries="12" data-total="48">
  <!-- Showing 12 images, 48 total available -->
</div>
```

These semantic attributes work with pure CSS and enhance:
- **Readability**: HTML structure is self-documenting
- **Styling**: CSS can react to counts and positions
- **Accessibility**: Screen readers can announce totals and positions
- **JavaScript**: Easy progressive enhancement without DOM queries

### Documentation Writing Principles

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

### Testing Guidelines
- Check: `npm run lint`
- Check: `npm run typecheck`
- Always test in multiple browsers
- Verify accessibility with screen readers

## 📚 REFERENCE (Good to know)

### Required Reading

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
- **OKLCH-based** color system (perceptually uniform)
- Scales from light to dark with consistent perceived lightness
- Semantic names: `--color-primary`, `--color-neutral`
- Format: `oklch(lightness chroma hue / alpha)`
- Benefits: Better color mixing, consistent brightness, wider gamut

#### Component Naming
- Full words only (`button`, not `btn`)
- Singular form (`card`, not `cards`)
- Descriptive (`navigation`, not `nav` for the class)

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