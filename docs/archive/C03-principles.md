# Chapter 3: The Five Commandments of CRISP

*Or: Rules that will set you free*

## The Sacred Principles

These aren't suggestions. They're the difference between CRISP and chaos.

## 1. Thou Shalt Write Semantic HTML First

### The Commandment
```html
<!-- ❌ The Path to Darkness -->
<div class="button" onclick="handleClick()">Click me</div>
<span class="heading">Important Title</span>
<div class="list">
  <div class="list-item">Item 1</div>
</div>

<!-- ✅ The Path to Light -->
<button class="button" type="button">Click me</button>
<h2 class="heading">Important Title</h2>
<ul class="list">
  <li>Item 1</li>
</ul>
```

### The Revelation
HTML elements aren't just generic containers. They have meaning, behaviour, and accessibility built in. A `<button>` knows it's clickable. A `<nav>` announces itself to screen readers. A `<main>` tells search engines where your content lives.

**The "Aha!"**: When you use semantic HTML, you get:
- Keyboard navigation for free
- Screen reader support without ARIA gymnastics  
- Better SEO without schema markup
- Meaningful document structure

### The Practice
```html
<!-- A real navigation, not a div pretending -->
<nav class="navigation" data-entries="3" aria-label="Main navigation">
  <ul class="list as-cluster" role="list">
    <li><a class="link" href="/" aria-current="page">Home</a></li>
    <li><a class="link" href="/about">About</a></li>
    <li><a class="link" href="/contact">Contact</a></li>
  </ul>
</nav>
```

## 2. Thou Shalt Honour the Rule of Three

### The Commandment
Every element may have:
- **1 component class** (what it is)
- **1 layout class** (how it's arranged)
- **Up to 3 property classes** (special features)

### The Mathematics of Sanity
```html
<!-- ✅ Within the sacred limits -->
<article class="card as-stack with-shadow">
  1 + 1 + 1 = 3 classes ✓
</article>

<button class="button with-interaction with-shadow with-animate" type="button">
  1 + 0 + 3 = 4 classes ✓
</button>

<!-- ❌ You have sinned -->
<div class="card as-stack with-shadow with-border with-padding with-margin with-animate">
  1 + 1 + 5 = 7 classes ✗ (Straight to CSS hell)
</div>
```

**The "Aha!"**: Data attributes don't count! They're semantic data, not layout instructions:

```html
<!-- ✅ Still only 3 layout classes -->
<article class="card as-stack with-shadow" 
  data-variant="featured"
  data-entries="5"
  data-level="2"
  aria-label="Featured articles">
  Classes: 3 ✓ | Data attributes: ∞ ✓
</article>
```

### The Wisdom
If you need more than 3 properties, you're not enhancing - you're creating a new component.

```html
<!-- ❌ Too many properties -->
<article class="card with-shadow with-border with-padding with-margin">

<!-- ✅ Make it a new component -->
<article class="feature-card">
  /* feature-card has shadow, border, padding, margin built in */
</article>
```

**The "Aha!"**: Constraints breed creativity. When you can't solve problems by adding classes, you write better CSS.

### Component Naming Discipline

```css
/* ✅ Good - maximum one hyphen */
.card { }              /* Base component */
.feature-card { }      /* Specific type */
.pricing-card { }      /* Another type */

/* ❌ Bad - overqualified names */
.pricing-card-professional { }      /* Too specific */
.feature-card-with-shadow { }       /* Property in the name */
.pricing-card-monthly-special { }   /* Way too specific */
```

**The Rule**: One hyphen = one concept. Multiple hyphens = you're creating modifiers in disguise.

If you need more specificity, use:
- Custom properties for variations
- Property classes for features  
- Or question if the component is too specific

**The Warning**: Without discipline, you can create 80 components and end up with more chaos than BEM ever gave you. Create components for genuine patterns, not one-off cases.

## 3. Thou Shalt Separate Identity from Appearance

### The Commandment
Classes define **what** something is. Custom properties define **how** it looks.

```css
/* ❌ The Old Testament (of CSS) */
.button-primary { background: blue; }
.button-secondary { background: gray; }
.button-large { font-size: 1.5rem; }
.button-small { font-size: 0.875rem; }
/* 20 more variants... */

/* ✅ The New Covenant with @property */
@property --bg {
  syntax: "<color>";
  inherits: false;
  initial-value: oklch(60% 0.01 250);
}

@property --size {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}

@layer crisp {
  .button {
    /* Define/Use pattern */
    background: var(--bg);
    font-size: var(--size);
    
    /* Automatic hover with relative colors */
    &:hover {
      --bg: oklch(from var(--bg) calc(l + 0.1) c h);
    }
  }
}
```

### The Implementation
```html
<!-- Identity (class) says "I am a button" -->
<!-- Appearance (properties) says "I look like this" -->
<button class="button" type="button"
  style="--bg: var(--color-primary); --size: 1.25rem;">
  Primary Large Button
</button>

<button class="button" type="button"
  style="--bg: var(--color-danger); --size: 0.75rem;">
  Danger Small Button
</button>
```

### The Power
One class. Infinite variations. No specificity wars. No modifier proliferation.

**The "Aha!"**: Your CSS file stays small whilst your design system stays flexible. Custom properties are the modifier classes you don't have to write.

## 4. Thou Shalt Use Prefixes That Speak Truth

### The Commandment
Three prefixes. Clear purposes. No ambiguity.

```html
<!-- Component (no prefix): The thing itself -->
<article class="card">Content</article>
<button class="button" type="button">Click</button>
<nav class="navigation" data-entries="5" aria-label="Main">Links</nav>

<!-- Layout (as-): How things arrange -->
<section class="as-grid" data-entries="3">Items</section>
<div class="as-stack">Stacked items</div>
<nav class="as-cluster">Clustered items</nav>

<!-- Property (with-): Special features -->
<article class="card with-shadow">Shadowed card</article>
<button class="button with-interaction" type="button">Interactive</button>
<section class="hero with-overlay">Hero with overlay</section>
```

### The Language
CRISP classes read like English:

```html
<article class="card as-stack with-shadow">
<!-- "Article card displayed as stack with shadow" -->

<nav class="navigation as-cluster with-sticky" data-entries="5" aria-label="Main">
<!-- "Navigation displayed as cluster with sticky positioning" -->

<section class="gallery as-grid with-gap" data-entries="12">
<!-- "Gallery displayed as grid with gap between items" -->
```

### The Clarity
No more debates about naming:
- Is it a component? No prefix.
- Is it a layout pattern? `as-` prefix.
- Is it an enhancement? `with-` prefix.

**The "Aha!"**: When naming conventions are this clear, you spend zero time thinking about them. You just build.

## 5. Thou Shalt Let the Cascade Flow

### The Commandment
Stop fighting CSS. The cascade is your friend.

```css
/* ❌ Fighting the cascade */
.button { background: blue !important; }
.wrapper .button { background: red !important; }
#page .wrapper .button { background: green !important; }

/* ✅ Flowing with the cascade + @layer */
/* Always declare the three layers */
@layer crisp, bridge, overrides;

@layer crisp {
  .button {
    /* Define with @property */
    --bg: var(--color-primary);
    background: var(--bg);
  }

  /* Theme changes colors globally */
  [data-theme="dark"] {
    --color-primary: var(--color-primary-light);
  }

  /* Variants change component appearance */
  [data-variant="danger"] .button {
    --bg: var(--color-danger);
  }
}

/* Bridge layer for migrations (empty by default) */
@layer bridge {
  /* Project-specific toggleable features */
}

/* User overrides always win */
@layer overrides {
  .button { --bg: hotpink; } /* No !important needed */
}
```

**The "Aha!"**: CSS @layer solved specificity wars forever. CRISP embraces it from day one. Your overrides always win, zero fights.

### The Inheritance
```html
<!-- Parent sets theme via data attribute -->
<main data-theme="dark">
  <!-- Children inherit automatically -->
  <article class="card">
    <p class="text">Dark themed card</p>
  </article>
  <button class="button" type="button">
    Dark themed button
  </button>
</main>

<!-- Danger variant with ARIA -->
<section data-variant="danger" role="alert">
  <button class="button" type="button" aria-describedby="danger-warning">
    Delete Account
  </button>
  <p class="text" id="danger-warning">This action cannot be undone</p>
</section>
```

### The Critical Distinction: Theme vs Variant

**data-theme**: ONLY for colour schemes (light, dark, high-contrast)
- Goes on containers (body, main, section)
- Cascades to all children
- Controls colour perception

**data-variant**: EVERYTHING else (states, styles, contexts)
- Goes on individual components
- Does not cascade
- Controls purpose and behaviour

```html
<!-- ✅ Correct usage -->
<body data-theme="dark">
  <button class="button" type="button" data-variant="primary">
    Primary in Dark Mode
  </button>
</body>

<!-- ❌ Wrong - mixing purposes -->
<button class="button" type="button" data-theme="primary">Wrong!</button>
<main data-variant="dark">Also Wrong!</main>
```

**The deeper "Aha!"**: Use ARIA for states, not data-variant:
```html
<!-- ✅ ARIA for states -->
<button aria-pressed="true">Active</button>
<div aria-expanded="true">Open</div>
<li aria-current="page">Current</li>

<!-- ❌ Don't duplicate with data-variant -->
<button data-variant="pressed">Wrong!</button>
<div data-variant="expanded">Wrong!</div>
```

### The Simplicity
No theme-specific classes. No dark mode modifiers. Just CSS custom properties cascading as Håkon Wium Lie intended.

**The Principle**: CSS is for layout and presentation only - never for variants. Variants are semantic information that belongs in HTML via data attributes. Don't pollute your styling with meaning.

### Direct Application
```html
<!-- ✅ Component AND variant on same element -->
<button class="button" type="button" data-variant="danger">
  Delete Account
</button>
<article class="card" data-variant="premium">
  <h2 class="heading">Premium Features</h2>
</article>

<!-- ❌ Unnecessary nesting -->
<div data-variant="danger">
  <button class="button" type="button">Delete Account</button>
</div>
```

**The "Aha!"**: When you stop fighting the cascade and start using it, your CSS becomes dramatically simpler. Theme switching? One attribute. Responsive design? Container queries. Component variants? Custom properties.

## The Tablet of Stone (TL;DR)

1. **Semantic HTML First** - Use real elements, not div soup
2. **Rule of Three** - 1 component + 1 layout + max 3 properties  
3. **Identity vs Appearance** - Classes for what, properties for how
4. **Meaningful Prefixes** - None, `as-`, or `with-`
5. **Embrace the Cascade** - Work with CSS, not against it

## The Bonus Commandments (2025 Edition)

### Thou Shalt Use Modern CSS Features

**@property for Type Safety**:
```css
@property --columns {
  syntax: "<integer>";
  inherits: false;
  initial-value: 3;
}

/* Browser validates this! */
.as-grid {
  --columns: 4; /* ✅ Valid */
  --columns: "four"; /* ❌ Browser ignores */
}
```

**:has() for Parent Selection**:
```css
/* Form knows when it has errors */
.form:has(.input:invalid) {
  --border-color: var(--color-error);
}

/* Card adapts to content */
.card:has(> .image) {
  --layout: "image-left";
}
```

**Container Queries for True Responsiveness**:
```css
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    --layout: "horizontal";
  }
}
```

### Thou Shalt Count Thy Children

Every container with countable items MUST declare data-entries:
```html
<nav class="navigation" data-entries="5" aria-label="Main">
<ul class="list" data-entries="10">
<div class="accordion" data-entries="3">
<section class="gallery" data-entries="24">
```

**The "Aha!"**: CSS can react to counts, JavaScript stays in sync, screen readers announce totals. One attribute, multiple benefits.

## The Promise

Follow these commandments and you shall receive:
- HTML that explains itself
- CSS that stays maintainable
- Components that actually compose
- A codebase that sparks joy

Break them, and you'll end up with... well, BEM.

→ Continue to [Chapter 4: Anatomy of a CRISP Component](./C04-anatomy.md)