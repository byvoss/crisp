# Chapter 16: CRISP Cheatsheet

*Or: Your pocket guide to CSS sanity*

**The "Aha!"**: This entire framework fits on 3 pages. Try doing that with Bootstrap's 200-page documentation.

## Quick Start

*From zero to hero in 30 seconds*

```html
<!-- Include CRISP (50KB of pure power) -->
<link rel="stylesheet" href="crisp.min.css">

<!-- Basic structure -->
<body class="as-stack">
  <header class="header as-container">
    <nav class="navigation as-cluster" data-entries="1">
      <a class="link" href="/">Home</a>
    </nav>
  </header>
  
  <main class="as-container as-stack">
    <h1 class="heading">Hello CRISP</h1>
    <article class="card">
      <p class="text">Content here</p>
    </article>
  </main>
</body>
```

## The CRISP Formula

*The only formula you'll ever need to memorise*

```html
<!-- The sacred 1+1+3 pattern -->
<element class="[component] [as-layout] [with-property]" 
  style="--token: value;"
  data-variant="variant"
  aria-label="Descriptive label">
```

**Rules** (yes, there are only 5):
- 1 component class (what it is)
- 1 layout class (how it's arranged)  
- Up to 3 property classes (special features)
- Custom properties WITHOUT prefixes for elements
- Data attributes for variants and states

**Mind = Blown**: That's it. The entire system. No 47-page class naming convention guide.

## Core Components

*Every component you'll actually use (not 500 you won't)*

### Interactive Elements

```html
<!-- Buttons that just work -->
<button class="button">Click</button>
<a class="link" href="/">Link</a>
<input class="input" type="text">
<select class="select"><option>Choose</option></select>
<textarea class="textarea"></textarea>
<input class="checkbox" type="checkbox">
<input class="radio" type="radio">
<input class="switch" type="checkbox">
```

### Content Containers

```html
<!-- Semantic containers (remember those?) -->
<article class="card">Card</article>
<section class="section">Section</section>
<aside class="aside">Aside</aside>
<dialog class="dialog">Modal</dialog>
<figure class="figure">Figure</figure>
<blockquote class="quote">Quote</blockquote>
```

### Navigation Components

```html
<!-- Navigation with proper ARIA (always!) -->
<nav class="navigation" data-entries="3" aria-label="Main navigation">Nav</nav>
<nav class="breadcrumb" data-entries="0">Breadcrumb</nav>
<nav class="pagination" data-entries="0">Pages</nav>
<div class="tabs" data-entries="0">Tabs</div>
```

### Feedback Components

```html
<!-- User feedback without the drama -->
<aside class="alert" role="alert" aria-live="polite">Alert</aside>
<div class="toast">Toast</div>
<span class="badge">42</span>
<span class="tag">Tag</span>
<progress class="progress">Loading</progress>
```

## Layout Classes

*The magnificent seven that replace your entire grid system*

### Vertical Stack (as-stack)
```html
<div class="as-stack">
  <p>Stacked</p>
  <p>Vertically</p>
</div>

<!-- Custom gap -->
<div class="as-stack" style="--stack-gap: var(--space-2-0);">
```

### Horizontal Cluster (as-cluster)

```html
<div class="as-cluster">
  <span>Grouped</span>
  <span>Horizontally</span>
</div>

<!-- Custom alignment -->
<div class="as-cluster" style="--cluster-align: space-between;">
```

### Responsive Grid (as-grid)

```html
<!-- No more col-xs-12 col-sm-6 col-md-4 nonsense -->
<div class="as-grid" data-entries="3">
  <div>Auto</div>
  <div>Responsive</div>
</div>

<!-- Fixed columns -->
<div class="as-grid" style="--grid-columns: 3;">
```

### Perfect Centering (as-center)

```html
<!-- The holy grail, achieved -->
<div class="as-center">
  <p>Perfectly centered</p>
</div>

<!-- Custom height -->
<div class="as-center" style="--center-height: 50vh;">
```

### Split Layout
```html
<div class="as-split">
  <aside>Fixed width</aside>
  <main>Flexible</main>
</div>

<!-- Custom split width -->
<div class="as-split" style="--split-ratio: 300px;">
```

### Container (as-container)

```html
<!-- Max-width + padding, like containers should be -->
<main class="as-container" role="main">
  Constrained width with nice padding
</main>
```

## Property Classes

*The cherry on top (max 3 per element, remember?)*

```html
<!-- Visual enhancements, not core functionality -->
<article class="card with-shadow" role="article">Shadow</article>
<div class="card with-border">Border</div>
<button class="button with-interaction">Hover effects</button>
<div class="section with-padding">Extra padding</div>
<header class="header with-sticky">Sticky position</header>
<div class="card with-animate">Animated</div>
```

## Custom Properties (Design Tokens)

*OKLCH colors, mathematical spacing, and actual system design*

### Spacing Scale
```css
--space-0-25  /* 0.25rem -  4px */
--space-0-5   /* 0.5rem  -  8px */
--space-0-75  /* 0.75rem - 12px */
--space-1-0   /* 1rem    - 16px */
--space-1-5   /* 1.5rem  - 24px */
--space-2-0   /* 2rem    - 32px */
--space-3-0   /* 3rem    - 48px */
--space-4-0   /* 4rem    - 64px */
```

### Colors (OKLCH Only!)

```css
/* Semantic colours (note the British spelling in docs) */
--color-background   /* oklch(98% 0.01 250) */
--color-text        /* oklch(20% 0.01 250) */
--color-border      /* oklch(90% 0.01 250) */

/* Core colours (no numeric suffix) */
--color-primary     /* oklch(55% 0.20 250) */
--color-neutral     /* oklch(50% 0.01 250) */
--color-success     /* oklch(55% 0.15 145) */
--color-warning     /* oklch(70% 0.15 90) */
--color-danger      /* oklch(55% 0.20 25) */

/* Light/dark variants */
--color-primary-light
--color-primary-dark
--color-neutral-light
--color-neutral-dark
```

### Typography
```css
/* Sizes */
--text-size-sm     /* 0.875rem */
--text-size-base   /* 1rem */
--text-size-lg     /* 1.125rem */
--text-size-1-25   /* 1.25rem */
--text-size-1-5    /* 1.5rem */
--text-size-2-0    /* 2rem */
--text-size-3-0    /* 3rem */

/* Weights */
--text-weight-normal    /* 400 */
--text-weight-medium    /* 500 */
--text-weight-semibold  /* 600 */
--text-weight-bold      /* 700 */
```

### Effects
```css
/* Radius */
--radius-sm    /* 0.25rem */
--radius-md    /* 0.5rem */
--radius-lg    /* 0.75rem */
--radius-xl    /* 1rem */
--radius-full  /* 9999px */

/* Shadows */
--shadow-subtle
--shadow-default
--shadow-elevated
--shadow-floating

/* Transitions */
--transition-fast    /* 150ms */
--transition-normal  /* 250ms */
--transition-slow    /* 350ms */
```

## Common Patterns

*Copy, paste, ship (it's that simple)*

### Card Grid

**The "Aha!"**: No more Bootstrap's `row` + `col-md-4` + `mb-3` + `px-2`. Just `as-grid`.
```html
<div class="as-grid">
  <article class="card as-stack">
    <h3 class="heading">Card 1</h3>
    <p class="text">Content</p>
  </article>
  <article class="card as-stack">
    <h3 class="heading">Card 2</h3>
    <p class="text">Content</p>
  </article>
</div>
```

### Accessible Form

```html
<!-- Forms with actual labels (revolutionary!) -->
<form class="form as-stack" novalidate>
  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input" id="email" type="email" required>
  </div>
  <button class="button" type="submit">Submit</button>
</form>
```

### Navigation Bar

```html
<!-- Nav bars without 47 wrapper divs -->
<nav class="navigation as-cluster" data-entries="3" aria-label="Main navigation" style="--cluster-align: space-between;">
  <a class="link" href="/">Logo</a>
  <div class="as-cluster">
    <a class="link" href="/about">About</a>
    <a class="link" href="/contact">Contact</a>
  </div>
</nav>
```

### Hero Section

```html
<!-- Hero sections that actually center content -->
<section class="hero as-center" role="banner" style="--center-height: 80vh;">
  <div class="as-stack">
    <h1 class="heading" style="--size: var(--text-size-3-0);">
      Big Title
    </h1>
    <p class="text">Subtitle text</p>
    <button class="button with-interaction">CTA Button</button>
  </div>
</section>
```

### Native Modal Dialog

```html
<!-- Native <dialog>! No modal library needed! -->
<dialog class="dialog" id="modal" aria-labelledby="modal-title">
  <h2 class="heading">Modal Title</h2>
  <p class="text">Modal content</p>
  <button class="button" onclick="this.closest('dialog').close()">
    Close
  </button>
</dialog>

<script>
document.getElementById('modal').showModal();
</script>
```

## Data Attributes

*State management without state machines*

### Visual Variants (data-variant)
```html
<!-- Visual variations -->
<button class="button" data-variant="primary">Primary</button>
<aside class="alert" data-variant="success">Success!</aside>
<span class="badge" data-variant="warning">3</span>
<nav class="navigation" data-entries="0" data-variant="tabs">Tab nav</nav>
```

### State Variants

```html
<!-- State without classes (use ARIA when possible) -->
<button class="button" data-variant="loading" aria-busy="true">
  <span class="spinner" aria-hidden="true"></span>
  Loading...
</button>
<input class="input" data-variant="invalid">
<form class="form" data-variant="error">
<div class="card" data-variant="expanded">
```

### Contextual Variants
```html
<!-- Environmental variants -->
<main data-variant="admin">Admin area</main>
<section data-variant="premium">Premium content</section>
<form data-variant="checkout">Checkout form</form>
```

## 🚨 Critical: data-theme vs data-variant

**Never mix these two!**

### data-theme = Color Schemes ONLY
```html
<!-- ✅ Correct: Theme on high-level containers -->
<body data-theme="dark">
<main data-theme="light">
<section data-theme="high-contrast">

<!-- ❌ Wrong: Never on components -->
<button data-theme="primary">  <!-- NO! -->
```

### data-variant = Everything Else
```html
<!-- ✅ All variations use data-variant -->
<button class="button" data-variant="primary">Primary</button>
<button class="button" data-variant="loading">Loading...</button>
<article class="card" data-variant="danger">Error</article>
<nav class="navigation" data-variant="admin">Admin Nav</nav>
```

**Remember**: Themes cascade and control colors. Variants don't cascade and control purpose.

## Theme Switching (Tier 2)

```html
<!-- Add theme script (10KB for theme switching) -->
<script type="module" src="crisp-theme.min.js"></script>

<!-- Theme controls -->
<button data-function="theme" data-theme="light">Light</button>
<button data-function="theme" data-theme="dark">Dark</button>
<button data-function="theme" data-theme="auto">Auto</button>
```

## Accessibility Checklist

*WCAG 2.2 AA or bust*

- ✅ Use semantic HTML elements (not `<div class="button">`)
- ✅ Add `aria-label` to icon buttons
- ✅ Mark current page with `aria-current="page"`
- ✅ Label all form inputs
- ✅ Use `role="alert"` for important messages
- ✅ Add `aria-busy="true"` during loading
- ✅ Ensure focus states are visible
- ✅ Test with keyboard navigation

## Quick Conversions

*From framework slavery to CSS freedom*

| Old Way (The Horror) | CRISP Way (The Dream) |
|---------|-----------|
| `.btn .btn-primary .btn-lg` | `.button` + `style="--bg: var(--color-primary); --size: var(--text-size-1-25);"` |
| `.card-header` + `.card-body` | `.card.as-stack` |
| `.row` + `.col-md-4` | `.as-grid` |
| `.text-center` | `style="text-align: center;"` |
| `.mt-3 .mb-3` | `style="margin-block: var(--space-1-5);"` |
| `.d-none` | `hidden` attribute |
| `.btn-success` | `.button` + `data-variant="success"` |
| `.alert-warning` | `.alert` + `data-variant="warning"` |

## Component + Layout Combinations

*Mix and match like LEGO blocks*

```html
<!-- Card layouts (all semantic, all flexible) -->
<article class="card as-stack">Vertical card</article>
<article class="card as-cluster">Horizontal card</article>
<article class="card as-center">Centered content card</article>

<!-- Form layouts -->
<form class="form as-stack">Vertical form</form>
<form class="form as-cluster">Inline form</form>
<form class="form as-grid">Grid form</form>

<!-- Navigation layouts -->
<nav class="navigation as-cluster" data-entries="0">Horizontal nav</nav>
<nav class="navigation as-stack" data-entries="0">Vertical nav</nav>
<nav class="navigation as-grid" data-entries="0">Grid nav</nav>
```

## Progressive Enhancement Path

*Start simple, add complexity only when needed*

```html
<!-- Tier 1: CRISP (CSS only - 50KB) -->
<button class="button">Works</button>

<!-- Tier 2: CRISP Theme (+ themes - 60KB total) -->
<button class="button">Works + themes</button>

<!-- Tier 3: CRISP Enterprise (+ Web Components - 150KB total) -->
<button class="button" data-function="submit">
  Works + themes + TypeScript
</button>
```

### Enterprise Web Components (Tier 3)

**The "Aha!"**: Web Components that generate CRISP HTML, not replace it. They're just smart includes.

```html
<!-- Use pre-built Web Component -->
<crisp-search-box placeholder="Search products...">
  <!-- Generates this CRISP HTML automatically: -->
  <div class="search as-cluster">
    <input class="input" type="search" placeholder="Search products...">
    <button class="button" data-variant="primary">
      <span class="icon">🔍</span>
    </button>
  </div>
</crisp-search-box>

<!-- Simple product card component -->
<crisp-product-card 
  name="CRISP Framework"
  price="0.00"
  currency="EUR">
  <!-- Generates this CRISP HTML: -->
  <article class="card as-stack" data-variant="product">
    <h3 class="heading">CRISP Framework</h3>
    <p class="price">€ 0,00</p>
    <button class="button" data-variant="primary">Get it free</button>
  </article>
</crisp-product-card>
```

**Remember**: Web Components are just containers - they output 100% CRISP HTML!

## Define/Use Pattern

*The pattern that makes everything work*

```css
@layer crisp {
  /* Every element defines its defaults with @property */
  .button {
    /* 1. Define with type safety */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-neutral);
    }
    --color: white;
    --size: var(--text-size-base);
    
    /* 2. Use the tokens */
    background: var(--bg);
    color: var(--color);
    font-size: var(--size);
  }
}

/* Customize only what you need */
<button class="button" style="--bg: var(--color-primary);">
  Primary Button
</button>
```

## Golden Rules

*The commandments of CRISP*

1. **Semantic HTML first** - Use real elements (`<button>`, not `<div onclick>`)
2. **One component class** - Be clear what it is (not `btn-primary-large-active`)
3. **Custom properties for variants** - Not modifier classes (`--bg: red`, not `.btn-red`)
4. **Data attributes for state** - Not state classes (`data-variant="loading"`, not `.is-loading`)
5. **Progressive enhancement** - Works without JS (unlike 99% of "modern" frameworks)
6. **Define/Use pattern** - Define defaults, then use them (with @property for type safety)
7. **Layout tokens describe pattern** - Not content (`--gap`, not `--sidebar-spacing`)

## Token Naming Rules

*Logic so simple it hurts*

- **Element classes**: No prefix (`--bg`, `--color`, `--size`)
- **Property classes**: With prefix (`--shadow-color`, `--border-width`)
- **Layout classes**: Pattern-specific (`--gap`, `--split`, `--columns`)
- **Global tokens**: Always prefixed (`--space-1-0`, `--color-primary`)

**The "Aha!"**: Element tokens are scoped to their element. No ambiguity. No conflicts.

## Need Help?

*Everything you need, nothing you don't*

- 📖 [Full Documentation](./README.md) - Start here
- 🧩 [Component Reference](./C15-component-reference.md) - Every component explained
- 🎨 [Design Tokens](./C05-tokens.md) - OKLCH colours and spacing
- 🏗️ [Layouts Guide](./C06-layouts.md) - The 7 layouts you need
- 🔄 [Migration Guide](./C14-migration.md) - Escape your CSS prison

---

## The CRISP Promise

- **50KB** - Entire framework (not 500KB like others)
- **Zero build** - Just include and use
- **Zero dependencies** - CSS doesn't need npm
- **Zero JavaScript** - For Tier 1 (pure CSS)
- **100% semantic** - HTML that makes sense
- **100% accessible** - WCAG 2.2 AA compliant

**Remember**: If your HTML reads like English and your CSS stays small, you're doing CRISP right.

**The Final "Aha!"**: You just learned an entire CSS framework from a 3-page cheatsheet. When was the last time that happened?

Now go build something beautiful. And simple. And maintainable.

*Welcome to the post-framework era.* 🚀