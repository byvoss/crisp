# CRISP Rules - The Laws of CRISP

This document contains ALL mandatory rules for CRISP development. Every rule MUST be followed without exception.

## Table of Contents

### 🔴 FUNDAMENTAL ARCHITECTURE RULES (Follow First!)
- [Rule 1: The Sacred 1+2+3 Formula](#rule-1-the-sacred-123-formula)
- [Rule 2: CSS @layer Architecture](#rule-2-css-layer-architecture)
- [Rule 3: CSS @layer Usage - Three Layers, Infinite Power!](#rule-3-layer-usage)
- [Rule 4: Custom Properties Pattern](#rule-4-custom-properties-pattern)

### 🟠 NAMING & STRUCTURE RULES (Follow When Writing)
- [Rule 5: Component Naming Discipline](#rule-5-component-naming-discipline)
- [Rule 6: Class Prefixes](#rule-6-class-prefixes)
- [Rule 7: Token Naming Rules](#rule-7-token-naming-rules)
- [Rule 8: No IDs in CSS](#rule-8-no-ids-in-css)

### 🟡 TECHNICAL CORE RULES (Always Apply)
- [Rule 9: Semantic HTML First](#rule-9-semantic-html-first)
- [Rule 10: WCAG 2.2 AA Compliance](#rule-10-wcag-22-aa-compliance)
- [Rule 11: Complete Default Values](#rule-11-complete-default-values)
- [Rule 12: Data Attributes vs ARIA](#rule-12-data-attributes-vs-aria)

### 🟢 DESIGN SYSTEM RULES (Follow When Styling)
- [Rule 13: OKLCH Colors Only](#rule-13-oklch-colors-only)
- [Rule 14: Relative Color Pattern](#rule-14-relative-color-pattern)
- [Rule 15: @property for All Tokens](#rule-15-property-for-all-tokens)
- [Rule 16: Layout Token Patterns](#rule-16-layout-token-patterns)
- [Rule 17: Theme vs Variant Distinction](#rule-17-theme-vs-variant-distinction)
- [Rule 29: Modern CSS Units Only](#rule-29-modern-units)

### 🔵 PROGRESSIVE ENHANCEMENT (Modern Features)
- [Rule 18: CSS :has() for Smart Components](#rule-18-css-has-for-smart-components)
- [Rule 19: @starting-style Animations](#rule-19-starting-style-animations)
- [Rule 20: Native ::backdrop Usage](#rule-20-native-backdrop-usage)
- [Rule 21: field-sizing Progressive Enhancement](#rule-21-field-sizing-progressive-enhancement)
- [Rule 22: CSS Subgrid System](#rule-22-css-subgrid-system)

### ⚪ META RULES (Overarching)
- [Rule 23: Progressive Enhancement Path](#rule-23-progressive-enhancement-path)
- [Rule 24: Battery-Efficient Design](#rule-24-battery-efficient-design)
- [Rule 25: Browser Support Policy](#rule-25-browser-support-policy)
- [Rule 26: Language Rules](#rule-26-language-rules)
- [Rule 27: Semantic Data Attributes](#rule-27-semantic-data-attributes)
- [Rule 28: Example Paradigm](#rule-28-example-paradigm)

---

## 🔴 FUNDAMENTAL ARCHITECTURE RULES

## <a id="rule-1-sacred-formula"></a>Rule 1: The Sacred 1+2+3 Formula

Every element follows: **1 component + max 2 layouts + max 3 properties**

```html
<!-- ✅ Correct -->
<article class="card as-stack with-shadow with-border">

<!-- ✅ Also correct - 2 layouts -->
<section class="hero as-center as-container with-overlay">

<!-- ❌ Wrong - too many classes -->
<article class="card card-featured as-stack as-grid as-center with-shadow with-border with-rounded">
```

**Important**: Data attributes do NOT count toward this limit. They are data carriers for logic, not layout only controls.

```html
<!-- ✅ Correct: Classes follow 1+2+3, unlimited data attributes -->
<article class="card as-stack with-shadow with-border" 
  data-variant="featured"
  data-entries="5"
  data-level="2">
```

## <a id="rule-2-layers"></a>Rule 2: CSS @layer Architecture

**🎯 CSS LAYERS - THE KILLER FEATURE**

CRISP uses @layer for complete isolation. Users can override ANYTHING without !important.

```css
/* CRISP structure */
@layer crisp, overrides;

@layer crisp {
  @layer tokens, base, layouts, elements, properties, states, themes;
  /* All CRISP styles isolated here */
  .button { background: var(--color-primary); }
}

/* User overrides ALWAYS win */
@layer overrides {
  .button { background: hotpink; } /* No !important needed */
}
```

### Benefits:
- Zero conflicts with existing styles
- No !important wars needed
- Works alongside any framework
- Drop into any project safely
- Predictable behavior always

## <a id="rule-3-layer-usage"></a>Rule 3: CSS @layer Usage - Three Layers, Infinite Power!

**CRISP uses exactly THREE layers: `crisp`, `bridge`, `overrides`. The `bridge` layer is your project's toggle system.**

### Standard CRISP Structure:

```css
/* Always these three layers */
@layer crisp, bridge, overrides;

/* CRISP framework styles */
@layer crisp {
  .button { 
    background: var(--color-primary);
    /* ALL CRISP styles */
  }
}

/* Bridge is empty by default but ALWAYS present */
@layer bridge {
  /* Your project-specific toggleable features go here */
}

/* User customizations */
@layer overrides {
  .button { 
    background: hotpink; /* This ALWAYS wins! */
  }
}
```

### The Bridge Layer - Your Migration & Toggle System:

The `bridge` layer is a permanent meta-layer for project-specific toggleable features:

```css
@layer crisp, bridge, overrides;

@layer bridge {
  /* Define your project's sub-layers */
  @layer old-framework, vendor-styles, legacy-components, temp-fixes;
  
  @layer old-framework {
    /* Bootstrap/Tailwind compatibility */
    .btn { @extend .button; }
    .col-md-6 { grid-column: span 6; }
  }
  
  @layer vendor-styles {
    /* Third-party CSS */
  }
  
  @layer legacy-components {
    /* Old custom components */
  }
}
```

### Toggle Features On/Off:

```css
/* All bridge features active (default) */
@layer crisp, bridge, overrides;

/* Only specific features active */
@layer crisp, bridge.old-framework, overrides;

/* Multiple features */
@layer crisp, bridge.vendor-styles bridge.temp-fixes, overrides;

/* All bridge features off (post-migration) */
@layer crisp, bridge, overrides;  /* bridge layer stays but is empty */
```

### Why This Architecture:

1. **Always Three Layers**: Consistent structure for every project
2. **Bridge = Meta Layer**: Organize all project-specific code
3. **Granular Control**: Toggle individual features
4. **Clean Migration**: Turn off old code without deleting
5. **No Legacy Layer**: Everything goes in organized bridge sub-layers

### Layer Purposes:

- **`crisp`** → The CRISP framework (never modify)
- **`bridge`** → Your project's toggleable features
- **`overrides`** → Final user customizations

The bridge layer is your playground - use it for migrations, experiments, temporary fixes, or any project-specific code that you might want to toggle.

## <a id="rule-4-properties"></a>Rule 4: Custom Properties Pattern

EVERY component MUST follow the Define/Use pattern:

```css
.component {
  /* 1. Define ALL defaults first */
  --bg: var(--color-neutral);
  --color: var(--color-on-neutral);
  --size: 1rem;
  --padding: var(--space-1-0);
  
  /* 2. Use the tokens */
  background: var(--bg);
  color: var(--color);
  font-size: var(--size);
  padding: var(--padding);
}
```

### The Principle:
- Elements must work out-of-the-box without custom properties
- Users customize only what they need to change
- This is fundamental CRISP functionality - not optional

```html
<!-- Must work immediately -->
<button class="button">Click me</button>

<!-- Customize only what's needed -->
<button class="button" style="--bg: var(--color-primary);">Primary</button>
```


## 🟠 NAMING & STRUCTURE RULES

## <a id="rule-5-naming"></a>Rule 5: Component Naming Discipline

```css
/* ✅ Good - max one hyphen */
.card { }
.feature-card { }
.pricing-card { }

/* ❌ Bad - overqualified */
.pricing-card-professional { }
.feature-card-with-shadow { }
```

One hyphen = one concept. Use custom properties for variations.

## <a id="rule-6-prefixes"></a>Rule 6: Class Prefixes

- **No prefix**: Components (`card`, `button`, `navigation`)
- **`as-`**: Layout modes (`as-stack`, `as-grid`, `as-center`)
- **`with-`**: Properties (`with-shadow`, `with-interaction`)

## <a id="rule-7-tokens"></a>Rule 7: Token Naming Rules

**Clear hierarchy for token prefixes:**

- **Element classes** (`.button`, `.card`): Tokens WITHOUT prefix (`--bg`, `--size`, `--color`)
- **Layout classes** (`.as-stack`, `.as-grid`): Tokens WITH prefix (`--stack-gap`, `--grid-columns`)
- **Property classes** (`.with-shadow`, `.with-border`): Tokens WITH prefix (`--shadow-blur`, `--border-width`)
- **Global tokens**: Always prefixed (`--space-1-0`, `--color-primary`, `--radius-small`)

The logic: Only element tokens are unprefixed because they're unambiguous within their element's context.

## <a id="rule-8-no-ids"></a>Rule 8: No IDs in CSS

**IDs are purely functional - NEVER for styling**

### IDs are ONLY for:
- Form label associations: `<label for="email-input">`
- Anchor targets: `<section class="section" id="features">`
- ARIA relationships: `aria-labelledby`, `aria-describedby`
- Skip links: `<main class="main" id="main-content">`

### NEVER use IDs in CSS:
```css
/* ❌ WRONG */
#header { background: blue; }

/* ✅ RIGHT */
.header { background: var(--bg); }
```

### Attribute Order:
```html
<!-- ✅ class ALWAYS before id -->
<section class="section" id="features" data-variant="highlight">

<!-- ❌ Wrong order -->
<section id="features" class="section" data-variant="highlight">
```


## 🟡 TECHNICAL CORE RULES

## <a id="rule-9-semantic"></a>Rule 9: Semantic HTML First

- Always use proper HTML elements
- `<nav>` for navigation, `<main>` for main content
- `<button>` for actions, `<a>` for navigation
- `<article>` for self-contained content
- IDs only for accessibility and anchors

## <a id="rule-10-accessibility"></a>Rule 10: WCAG 2.2 AA Compliance

**🚨 ACCESSIBILITY IS NON-NEGOTIABLE**

CRISP is 100% WCAG 2.2 AA compliant. No exceptions. No excuses.

- If it's not accessible, it's not CRISP
- Every example must include proper ARIA
- Every component must pass automated a11y tests  
- Keyboard navigation is mandatory
- Screen reader support is mandatory
- Test with axe DevTools before marking complete

### Required ARIA Patterns:
- Navigation: `aria-label` or `aria-labelledby` for all `<nav>` - MUST be descriptive (e.g. "Main navigation" not just "Main")
- Forms: Labels for ALL inputs (visible or `aria-label`)
- Buttons: Descriptive text or `aria-label`
- Images: `alt` text (empty for decorative)
- Dynamic content: `aria-live` regions
- States: `aria-expanded`, `aria-selected`, `aria-current`
- Modals: Full ARIA pattern (`role`, `aria-modal`, focus trap)

### ARIA Label Quality:
```html
<!-- ❌ WRONG - Too vague -->
<nav aria-label="Nav">
<section aria-label="Section">

<!-- ✅ RIGHT - Descriptive -->
<nav aria-label="Main navigation">
<section aria-label="Product features">
```

### Testing Requirements:
- Keyboard navigation must work
- Screen reader must announce properly
- WCAG 2.2 AA automated tests must pass

## <a id="rule-11-defaults"></a>Rule 11: Complete Default Values

EVERY element MUST define ALL its tokens with working defaults:

```css
.button {
  /* ALL defaults defined */
  --bg: var(--color-neutral);
  --color: white;
  --size: var(--text-size-base);
  --padding: var(--space-0-75) var(--space-1-5);
  --radius: var(--radius-md);
  --border: none;
  
  /* Then use them */
  background: var(--bg);
  color: var(--color);
  /* etc */
}
```

Elements must work immediately without any custom properties!

## <a id="rule-12-attributes"></a>Rule 12: Data Attributes vs ARIA

**KISS Principle - Don't duplicate functionality:**

### data-variant: Visual variations ONLY
```html
<!-- ✅ Use data-variant for visual styles -->
<button class="button" data-variant="primary">Primary</button>
<button class="button" data-variant="danger">Delete</button>
<div class="alert" data-variant="success">Saved!</div>
```

### ARIA: States and behaviors
```html
<!-- ✅ Use ARIA for states - NOT data-variant -->
<button aria-pressed="true">Active</button>
<div aria-expanded="true">Open</div>
<li aria-current="page">Current</li>
<input aria-invalid="true">
```

### CSS Styling:
```css
/* Style by ARIA state */
.button[aria-pressed="true"] {
  --bg: var(--color-primary-dark);
}

/* Style by variant */
.button[data-variant="danger"] {
  --bg: var(--color-danger);
}
```

### Semantic Information Keys (CSS-friendly):
- **`data-entries`**: Count of child elements (required for countable containers)
- **`data-level`**: Hierarchical depth (`1`, `2`, `3` for nested navigation)
- **`data-current`**: Current position in sequence (`3` for page 3, `2` for step 2)
- **`data-total`**: Total items when different from entries (`256` when showing 20 of 256)

### JavaScript-specific Keys:
- **`data-function`**: JavaScript behavior hooks (`toggle`, `trigger`, `target`, `container`)
- **`data-action`**: User actions (`submit`, `close`, `expand`)
- **`data-target`**: Element references (`#element-id`)

### Rules:
- One value per data attribute (no space-separated lists)
- Use kebab-case for custom keys (`data-user-role`)
- Semantic naming, not visual (`data-variant="premium"`, not `data-variant="gold"`)
- Keep the list minimal - these core keys cover most use cases
- Only use attributes that make sense without JavaScript (CSS-only first)


## 🟢 DESIGN SYSTEM RULES

## <a id="rule-13-colors"></a>Rule 13: OKLCH Colors Only

**ALL colors must be in OKLCH format - no HSL, RGB, or HEX**

- Format: `oklch(lightness chroma hue)` or `oklch(lightness chroma hue / alpha)`
- Manual conversion required for perceptual uniformity
- No fallbacks - modern browsers only (2023+)

### Conversion Pattern:
- Primary: `hsla(220, 70%, L%, 1)` → `oklch(L% C% 250)`
- Neutral: `hsla(220, 10%, L%, 1)` → `oklch(L% C% 250)`
- Error: `hsla(0, 85%, L%, 1)` → `oklch(L% C% 25)`
- Warning: `hsla(45, 90%, L%, 1)` → `oklch(L% C% 90)`
- Success: `hsla(120, 70%, L%, 1)` → `oklch(L% C% 145)`

## <a id="rule-14-relative-colors"></a>Rule 14: Relative Color Pattern

Use CSS relative colors for automatic variations:

```css
.element {
  /* Define base AND calculated variations */
  --bg: var(--color-primary);
  --bg-hover: oklch(from var(--bg) calc(l + 0.1) c h);
  --bg-active: oklch(from var(--bg) calc(l - 0.1) c h);
  --border-color: oklch(from var(--bg) calc(l - 0.15) c h);
  --shadow-color: oklch(from var(--bg) l c h / 0.2);
}
```

### Guidelines:
- Lightness: +0.1 hover, -0.1 active, -0.15 borders
- Alpha: 0.2 for shadows, 0.1 for subtle effects
- Always define as custom property (user can override)

## <a id="rule-15-property"></a>Rule 15: @property for All Tokens

**Use @property for ALL custom properties - it's a game-changer!**

```css
/* Color properties */
@property --bg {
  syntax: "<color>";
  inherits: false;
  initial-value: transparent;
}

/* Numeric properties */
@property --columns {
  syntax: "<integer>";
  inherits: false;
  initial-value: 1;
}

/* Length properties */
@property --size {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}
```

### Benefits:
- Type safety - browser validates values
- Smooth animations for custom properties
- Real defaults via initial-value
- Better DevTools experience
- Performance optimizations

## <a id="rule-16-layout-tokens"></a>Rule 16: Layout Token Patterns

Layout tokens MUST describe the pattern, not content:

```css
/* ✅ CORRECT */
.as-stack { --stack-gap: 1rem; }
.as-grid { --grid-columns: 3; }
.as-split { --split-ratio: 300px; }

/* ❌ WRONG */
.as-sidebar { --width: 300px; }
```

## <a id="rule-17-theme-variant"></a>Rule 17: Theme vs Variant Distinction

### data-theme: ONLY for Color Schemes
- Purpose: Controls color scheme (light, dark, high-contrast)
- Placement: High-level containers only
- Values: `light`, `dark`, `high-contrast`
- Inheritance: Cascades to all children

```html
<!-- ✅ Correct -->
<body data-theme="dark">
<main data-theme="light">

<!-- ❌ Wrong -->
<button data-theme="primary">
```

### data-variant: Everything Else
- Purpose: ALL other variations (styles, states, contexts)
- Placement: Individual components
- Values: Any semantic descriptor
- Inheritance: Does not cascade

```html
<!-- ✅ Correct -->
<button class="button" data-variant="primary">
<article class="card" data-variant="featured">
<nav class="navigation" data-variant="admin">
```


## 🔵 PROGRESSIVE ENHANCEMENT

## <a id="rule-18-has"></a>Rule 18: CSS :has() for Smart Components

Maximize CSS-only interactivity:

```css
/* Form validation without JS */
.form:has(.input:invalid:not(:placeholder-shown)) {
  --border-color: var(--color-error);
}

/* Content-aware layouts */
.card:has(.image) {
  --grid-template: "image content" / 1fr 2fr;
}

/* Smart containers */
.as-grid:has(> :nth-child(8)) {
  --grid-columns: 4;
}
```

## <a id="rule-19-starting-style"></a>Rule 19: @starting-style Animations

Use @starting-style for all entry animations:

```css
dialog {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease-out;
  
  @starting-style {
    opacity: 0;
    transform: translateY(20px);
  }
}
```

Zero JavaScript for smooth animations!

## <a id="rule-20-backdrop"></a>Rule 20: Native ::backdrop Usage

Always use ::backdrop pseudo-element for overlays:

```css
/* Dialog backdrop */
dialog::backdrop {
  background: oklch(from var(--color-neutral) l c h / 0.8);
  backdrop-filter: blur(4px);
}

/* Fullscreen backdrop */
.video:fullscreen::backdrop {
  background: var(--color-black);
}
```

No wrapper divs! Use the platform.

## <a id="rule-21-field-sizing"></a>Rule 21: field-sizing Progressive Enhancement

Add to all form fields - costs nothing, helps when supported:

```css
.textarea {
  /* Base styles */
  min-height: 3rem;
  resize: vertical;
  
  /* Progressive enhancement */
  field-sizing: content;
  max-height: 20rem;
}
```

## <a id="rule-22-subgrid"></a>Rule 22: CSS Subgrid System

### Grid Classes:
```css
.as-grid-2 { grid-template-columns: repeat(2, 1fr); }
.as-grid-3 { grid-template-columns: repeat(3, 1fr); }
.as-grid-4 { grid-template-columns: repeat(4, 1fr); }
.as-grid-6 { grid-template-columns: repeat(6, 1fr); }
.as-grid-8 { grid-template-columns: repeat(8, 1fr); }
.as-grid-10 { grid-template-columns: repeat(10, 1fr); }
.as-grid-12 { grid-template-columns: repeat(12, 1fr); }
```

### Global Grid Pattern:
```html
<body data-raster="12">
  <header data-position="1-12">Full width</header>
  <nav data-position="1-3">Sidebar</nav>
  <main data-position="4-9">Content</main>
  <aside data-position="10-12">Widgets</aside>
</body>
```

### Subgrid Usage:
```css
.with-subgrid {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
}
```


## ⚪ META RULES

## <a id="rule-23-progressive"></a>Rule 23: Progressive Enhancement Path

- **CRISP Pure** (~50KB): Zero JavaScript - More interactive than most JS frameworks!
- **CRISP Interactive** (~60KB): + Minimal JS for themes & enhancements
- **CRISP Complete** (~150KB): + Full platform with components & i18n

**Web Component Philosophy**: 
- WCs are CRISP Pattern Generators - convenience wrappers only
- They generate 100% pure CRISP HTML internally
- Minimal JavaScript footprint (not 200KB for a toggle!)
- Free with Tier 3, so everyone can use pre-built patterns
- Examples: `<crisp-search-box>`, `<crisp-product-card>`, `<crisp-data-table>`
- The component is just the container - content remains pure CRISP

## <a id="rule-24-battery"></a>Rule 24: Battery-Efficient Design

**🔋 CSS-only = Zero battery waste**

- Zero JavaScript in Tier 1 = No CPU cycles
- CSS animations = GPU-accelerated
- No framework re-renders = 30%+ better battery life
- Perfect for WebView apps, PWAs, mobile web
- Green tech: Reduced carbon footprint

Philosophy: "Maximum CSS, minimum JavaScript"

## <a id="rule-25-browser-support"></a>Rule 25: Browser Support Policy

**Target: Modern browsers (2023+)**

Minimum requirements:
- Chrome 57+ (March 2017)
- Firefox 52+ (March 2017)
- Safari 10.1+ (March 2017)
- Edge 16+ (October 2017)
- **No Internet Explorer support**

Philosophy: "Modern patterns for modern browsers - legacy users shop elsewhere"

## <a id="rule-26-language"></a>Rule 26: Language Rules

### Documentation: British English (BBC standard)
- All markdown files
- Code comments
- Error messages

### Code: US English (CSS/JS standard)
- CSS properties: `color`, `center`
- Variable names: `--color-primary`
- Class names: `as-center`

## <a id="rule-27-semantic-attributes"></a>Rule 27: Semantic Data Attributes

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
<div class="accordion" data-entries="3">
  <section class="panel">Content 1</section>
  <section class="panel">Content 2</section>
  <section class="panel">Content 3</section>
</div>

<!-- Tabs with count -->
<div class="tabs" data-entries="4">
  <nav class="navigation" data-variant="tabs">
    <button class="tab">Tab 1</button>
    <button class="tab">Tab 2</button>
    <button class="tab">Tab 3</button>
    <button class="tab">Tab 4</button>
  </nav>
</div>
```

### Extended Semantic Attributes:

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

### Benefits:
1. **Dynamic updates**: JavaScript can maintain accurate counts
2. **CSS reactions**: Different layouts based on item count
3. **Accessibility**: Screen readers can announce totals
4. **Semantic clarity**: Instantly understand structure

```css
/* Responsive based on count */
.navigation[data-entries="2"] { --align: space-between; }
.navigation[data-entries="10"] { /* Switch to overflow menu */ }
```

### Components requiring `data-entries`:
- Navigation menus
- Tab interfaces
- Accordions
- Sliders/Carousels
- Pagination
- Any container where count matters for UX

---

## <a id="rule-28-example-paradigm"></a>Rule 28: Example Paradigm - Make CRISP the Developer's Dream

**ALL documentation examples MUST follow this contrast pattern:**

### Before/After Examples Must Show:

1. **Legacy code must be realistically complex**:
   - Use actual Bootstrap/BEM/Tailwind patterns
   - Show real framework pain points (not strawmen)
   - Include typical overengineering: `btn btn-primary btn-lg btn-block active focus`
   - Show nested divs, wrapper elements, utility soup
   - NO CRISP concepts in legacy examples (no data-variant, no custom properties)

2. **CRISP solution must be the dream**:
   - Dramatically shorter and clearer
   - One semantic element + one class (usually)
   - Custom properties for variations
   - Proper ARIA included
   - The psychological impact: "Oh my god, it's that simple?"

### Example Pattern:
```html
<!-- ❌ BEFORE: Bootstrap nightmare (47 classes, 5 nested divs) -->
<div class="card card-default card-shadow-lg hover-card">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h3 class="card-title mb-0 text-dark font-weight-bold">Title</h3>
    <span class="badge badge-primary badge-pill">NEW</span>
  </div>
  <div class="card-body p-4">
    <p class="card-text text-muted line-clamp-3">Content here...</p>
  </div>
  <div class="card-footer bg-light border-top">
    <button class="btn btn-primary btn-sm float-right">Read More</button>
  </div>
</div>

<!-- ✅ AFTER: CRISP dream (semantic HTML + 2 classes) -->
<article class="card as-stack">
  <header>
    <h3 class="heading">Title</h3>
    <span class="badge" data-variant="new">NEW</span>
  </header>
  <p class="text">Content here...</p>
  <footer>
    <button class="button" style="--bg: var(--color-primary);">Read More</button>
  </footer>
</article>

<!-- The "Aha!": 5 lines vs 11 lines. Zero divs. Actual semantic HTML. -->
```

### Rules for Examples:

1. **Show real pain**: Legacy examples from actual codebases
2. **No artificial complexity**: But pick the worst real examples
3. **Visceral contrast**: CRISP must look like salvation
4. **Include "Aha!" moments**: Point out the revelation
5. **Respect the past**: "They tried their best with the tools they had"

### Psychological Impact Goals:
- First reaction: "Wait, that's it?"
- Second reaction: "This can't be real"
- Third reaction: "Where has this been all my life?"
- Final reaction: "I'm never going back to the old way"

### Common Legacy Patterns to Show:
- Bootstrap: `col-xs-12 col-sm-6 col-md-4 col-lg-3`
- BEM: `block__element--modifier-state-variant`
- Tailwind: `flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200`
- Atomic CSS: `mt-20 mb-20 pt-10 pb-10 fs-16 fw-bold`
- jQuery spaghetti: `$('.modal-trigger[data-target="#modal-1"]')`

Remember: We're not mocking - we're showing the honest difference. CRISP should feel like switching from assembly to Python.

---


## <a id="rule-29-modern-units"></a>Rule 29: Modern CSS Units Only - Future-Proof from Day One

**🚀 CRISP uses ONLY modern, future-proof CSS units. No legacy units allowed.**

### Viewport Units - Dynamic by Default:
```css
/* ❌ NEVER use static viewport units */
.hero {
  height: 100vh;  /* Wrong - doesn't account for mobile UI */
  width: 100vw;   /* Wrong - can cause scrollbars */
}

/* ✅ ALWAYS use dynamic viewport units */
.hero {
  height: 100dvh;  /* Dynamic - respects mobile browser UI */
  width: 100dvw;   /* Dynamic - accounts for scrollbars */
  
  /* Or use specific variants when needed */
  min-height: 100svh;  /* Small viewport (URL bar visible) */
  max-height: 100lvh;  /* Large viewport (URL bar hidden) */
}
```

### Logical Properties - Writing Mode Aware:
```css
/* ❌ NEVER use physical properties */
.card {
  margin-left: 1rem;
  margin-right: 1rem;
  width: 300px;
  height: 200px;
  padding-top: 1rem;
}

/* ✅ ALWAYS use logical properties */
.card {
  margin-inline: 1rem;      /* Replaces left/right */
  inline-size: 300px;       /* Replaces width */
  block-size: 200px;        /* Replaces height */
  padding-block-start: 1rem; /* Replaces top */
}
```

### Responsive Values - Built-in Flexibility:
```css
/* ❌ NEVER use fixed values without constraints */
.container {
  width: 1200px;
  font-size: 18px;
  gap: 20px;
}

/* ✅ ALWAYS use min/max/clamp for responsive design */
.container {
  inline-size: min(100% - 2rem, 1200px);
  font-size: clamp(1rem, 2vw + 0.5rem, 1.25rem);
  gap: clamp(1rem, 3vw, 2rem);
}
```

### Accessibility Units - User Preference Respected:
```css
/* ❌ NEVER use pixels for text or spacing */
.text {
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 20px;
}

/* ✅ ALWAYS use relative units */
.text {
  font-size: 1rem;        /* Respects user font size */
  line-height: 1.5;       /* Unitless for inheritance */
  margin-block-end: 1.25rem;  /* Scales with font size */
}
```

### Container Query Units - Context Aware:
```css
/* ✅ Use container units inside containers */
@container (min-width: 300px) {
  .card-content {
    padding: 5cqw;          /* 5% of container width */
    font-size: clamp(0.875rem, 4cqh, 1.125rem);  /* Responsive to container height */
  }
}
```

### Complete Modern Units Reference:

**Viewport Units:**
- `dvh`, `dvw` - Dynamic viewport (ALWAYS prefer these)
- `svh`, `svw` - Small viewport (mobile with UI shown)
- `lvh`, `lvw` - Large viewport (mobile with UI hidden)
- `dvmin`, `dvmax` - Dynamic viewport minimum/maximum

**Logical Properties:**
- `inline-size` / `block-size` (not width/height)
- `margin-inline` / `margin-block` (not margin-left/right/top/bottom)
- `padding-inline-start` / `padding-block-end` (not padding-left/top)
- `inset-inline` / `inset-block` (not left/right/top/bottom)
- `border-inline-end` (not border-right)

**Container Units:**
- `cqw`, `cqh` - Container query width/height
- `cqi`, `cqb` - Container query inline/block
- `cqmin`, `cqmax` - Container query minimum/maximum

**Mathematical Functions:**
- `min()`, `max()`, `clamp()` - ALWAYS use for constraints
- `calc()` - For calculations
- `round()`, `mod()`, `rem()` - For advanced math

### Philosophy:
- Future-proof from day one
- Respect user preferences always
- Support all writing modes
- Responsive by default
- No legacy baggage

CRISP doesn't just follow trends - it sets the standard for modern CSS.

---


## <a id="rule-30-documentation-pattern"></a>Rule 30: Documentation Pattern for Classes & Attributes

**📚 ALL documentation for CRISP classes, attributes, and features MUST follow this exact pattern.**

### The Sacred Documentation Structure:

When documenting any CRISP class, layout, or feature:

```markdown
### [Number]. [Name] ([Descriptive Category])

**[Type] class**: `class-name`  <!-- or "Layout class", "Property class", "Data attribute", etc. -->

**What it does**: [Clear, concise explanation of the functionality. Use metaphors where helpful.]

**When to use**: [Specific use cases and scenarios where this should be applied.]
```

### Real Example:
```markdown
### 2. Cluster (Horizontal Group)

**Layout class**: `as-cluster`

**What it does**: Groups elements horizontally and wraps them naturally when space runs out. Like words in a sentence - they flow left to right and wrap to the next line when needed.

**When to use**: Tag lists, button groups, navigation bars, inline metadata, any collection of items that should stay together horizontally but can wrap if needed.
```

### For Data Attributes:
```markdown
### Theme Selection

**Data attribute**: `data-theme="dark"`

**What it does**: Sets the color theme for the element and all its children. Overrides system preferences when explicitly set.

**When to use**: User theme preferences, section-specific theming, component variants that need different color schemes.
```

### For Properties:
```markdown
### Shadow Property

**Property class**: `with-shadow`

**What it does**: Adds a subtle drop shadow to create depth and hierarchy. Shadow adapts to theme automatically.

**When to use**: Cards, modals, dropdown menus, any element that should appear elevated above the page.
```

### Rules:
1. **ALWAYS start with the class/attribute** - developers scan for this first
2. **Use code formatting** for the actual class name (backticks)
3. **"What it does" must be understandable** without reading any CSS
4. **"When to use" must give concrete scenarios**, not abstract descriptions
5. **Use metaphors sparingly** but effectively (like "words in a sentence")
6. **Keep it scannable** - developers are often tired, rushed, or both

### Why This Pattern:
- **Scannable**: Developers see the class name immediately
- **Practical**: "When to use" answers the real question
- **Clear**: "What it does" explains without jargon
- **Consistent**: Same pattern everywhere reduces cognitive load

This pattern applies to ALL documentation chapters, not just layouts. When in doubt, follow this structure.

---

*These are the laws of CRISP. They are not suggestions. They are not guidelines. They are requirements.*

*Last updated: 2025-01-07*
