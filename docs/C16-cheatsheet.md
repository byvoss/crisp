# Chapter 16: CRISP Cheatsheet

*Or: Everything you need on one page*

## Quick Start

```html
<!-- Include CRISP -->
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

```html
<element class="[component] [as-layout] [with-property]" 
  style="--token: value;"
  data-variant="variant"
```

**Rules**:
- 1 component class (what it is)
- 1 layout class (how it's arranged)  
- Up to 3 property classes (special features)
- Custom properties WITHOUT prefixes for elements
- Data attributes for variants and states

## Core Components

### Interactive
```html
<button class="button">Click</button>
<a class="link" href="/">Link</a>
<input class="input" type="text">
<select class="select"><option>Choose</option></select>
<textarea class="textarea"></textarea>
<input class="checkbox" type="checkbox">
<input class="radio" type="radio">
<input class="switch" type="checkbox">
```

### Containers
```html
<article class="card">Card</article>
<section class="section">Section</section>
<aside class="aside">Aside</aside>
<dialog class="dialog">Modal</dialog>
<figure class="figure">Figure</figure>
<blockquote class="quote">Quote</blockquote>
```

### Navigation
```html
<nav class="navigation" data-entries="0">Nav</nav>
<nav class="breadcrumb" data-entries="0">Breadcrumb</nav>
<nav class="pagination" data-entries="0">Pages</nav>
<div class="tabs" data-entries="0">Tabs</div>
```

### Feedback
```html
<aside class="alert">Alert</aside>
<div class="toast">Toast</div>
<span class="badge">42</span>
<span class="tag">Tag</span>
<progress class="progress">Loading</progress>
```

## Layout Classes

### Vertical Stack
```html
<div class="as-stack">
  <p>Stacked</p>
  <p>Vertically</p>
</div>

<!-- Custom gap -->
<div class="as-stack" style="--gap: var(--space-2-0);">
```

### Horizontal Cluster  
```html
<div class="as-cluster">
  <span>Grouped</span>
  <span>Horizontally</span>
</div>

<!-- Custom alignment -->
<div class="as-cluster" style="--align: space-between;">
```

### Grid
```html
<div class="as-grid">
  <div>Auto</div>
  <div>Responsive</div>
</div>

<!-- Fixed columns -->
<div class="as-grid" style="--columns: 3;">
```

### Center
```html
<div class="as-center">
  <p>Perfectly centered</p>
</div>

<!-- Custom height -->
<div class="as-center" style="--height: 50vh;">
```

### Split Layout
```html
<div class="as-split">
  <aside>Fixed width</aside>
  <main>Flexible</main>
</div>

<!-- Custom split width -->
<div class="as-split" style="--split: 300px;">
```

### Container
```html
<div class="as-container">
  Constrained width
</div>
```

## Property Classes

```html
<div class="card with-shadow">Shadow</div>
<div class="card with-border">Border</div>
<button class="button with-interaction">Hover effects</button>
<div class="section with-padding">Extra padding</div>
<header class="header with-sticky">Sticky position</header>
<div class="card with-animate">Animated</div>
```

## Custom Properties

### Spacing
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

### Colors
```css
/* Semantic */
--color-background
--color-text
--color-border

/* Core colors (no numeric suffix) */
--color-primary
--color-neutral
--color-success
--color-warning
--color-danger

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

### Card Grid
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

### Form
```html
<form class="form as-stack">
  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input" id="email" type="email" required>
  </div>
  <button class="button" type="submit">Submit</button>
</form>
```

### Navigation Bar
```html
<nav class="navigation as-cluster" data-entries="2" style="--align: space-between;">
  <a class="link" href="/">Logo</a>
  <div class="as-cluster">
    <a class="link" href="/about">About</a>
    <a class="link" href="/contact">Contact</a>
  </div>
</nav>
```

### Hero Section
```html
<section class="hero as-center" style="--height: 80vh;">
  <div class="as-stack">
    <h1 class="heading" style="--size: var(--text-size-3-0);">
      Big Title
    </h1>
    <p class="text">Subtitle text</p>
    <button class="button with-interaction">CTA Button</button>
  </div>
</section>
```

### Modal Dialog
```html
<dialog class="dialog card" id="modal">
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

### Variants
```html
<!-- Visual variations -->
<button class="button" data-variant="primary">Primary</button>
<aside class="alert" data-variant="success">Success!</aside>
<span class="badge" data-variant="warning">3</span>
<nav class="navigation" data-entries="0" data-variant="tabs">Tab nav</nav>
```

### Variants
```html
<!-- Element variants -->
<button class="button" data-variant="loading">Loading...</button>
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

## Theme Switching

```html
<!-- Add theme script -->
<script src="crisp-theme.min.js"></script>

<!-- Theme controls -->
<button data-function="theme" data-theme="light">Light</button>
<button data-function="theme" data-theme="dark">Dark</button>
<button data-function="theme" data-theme="auto">Auto</button>
```

## Accessibility Checklist

- ✅ Use semantic HTML elements
- ✅ Add `aria-label` to icon buttons
- ✅ Mark current page with `aria-current="page"`
- ✅ Label all form inputs
- ✅ Use `role="alert"` for important messages
- ✅ Add `aria-busy="true"` during loading
- ✅ Ensure focus states are visible
- ✅ Test with keyboard navigation

## Quick Conversions

| Old Way | CRISP Way |
|---------|-----------|
| `.btn .btn-primary .btn-lg` | `.button` + `style="--bg: var(--color-primary); --size: var(--text-size-lg);"` |
| `.card-header` + `.card-body` | `.card.as-stack` |
| `.row` + `.col-md-4` | `.as-grid` |
| `.text-center` | `style="text-align: center;"` |
| `.mt-3 .mb-3` | `style="margin-block: var(--space-1-5);"` |
| `.d-none` | `hidden` attribute |
| `.btn-success` | `.button` + `data-variant="success"` |
| `.alert-warning` | `.alert` + `data-variant="warning"` |

## Component + Layout Combinations

```html
<!-- Card layouts -->
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

```html
<!-- Level 1: CRISP (CSS only) -->
<button class="button">Works</button>

<!-- Level 2: CRISP Theme (+ themes) -->
<button class="button">Works + themes</button>

<!-- Level 3: CRISP Enterprise (+ TypeScript) -->
<button class="button" data-function="submit">
  Works + themes + TypeScript
</button>
```

## Define/Use Pattern

```css
/* Every element defines its defaults */
.button {
  /* 1. Define */
  --bg: var(--color-neutral);
  --color: white;
  --size: var(--text-size-base);
  
  /* 2. Use */
  background: var(--bg);
  color: var(--color);
  font-size: var(--size);
}

/* Customize only what you need */
<button class="button" style="--bg: var(--color-primary);">
  Primary Button
</button>
```

## Golden Rules

1. **Semantic HTML first** - Use real elements
2. **One component class** - Be clear what it is
3. **Custom properties for variants** - Not modifier classes
4. **Data attributes for state** - Not state classes
5. **Progressive enhancement** - Works without JS
6. **Define/Use pattern** - Define defaults, then use them
7. **Layout tokens describe pattern** - Not content

## Token Naming Rules

- **Element classes**: No prefix (`--bg`, `--color`, `--size`)
- **Property classes**: With prefix (`--shadow-color`, `--border-width`)
- **Layout classes**: Pattern-specific (`--gap`, `--split`, `--columns`)
- **All other tokens**: Need identification (`--space-1-0`, `--color-primary`)

## Need Help?

- 📖 [Full Documentation](./README.md)
- 🧩 [Component Reference](./C15-component-reference.md)
- 🎨 [Design Tokens](./C05-tokens.md)
- 🏗️ [Layouts Guide](./C06-layouts.md)
- 🔄 [Migration Guide](./C14-migration.md)

---

**Remember**: If your HTML reads like English and your CSS stays small, you're doing CRISP right.

Happy coding! 🚀