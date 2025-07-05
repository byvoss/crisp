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
<nav class="navigation" aria-label="Main navigation">
  <ul class="list as-cluster">
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

<button class="button with-interaction with-shadow with-animate">
  1 + 0 + 3 = 4 classes ✓
</button>

<!-- ❌ You have sinned -->
<div class="card as-stack with-shadow with-border with-padding with-margin with-animate">
  1 + 1 + 5 = 7 classes ✗ (Straight to CSS hell)
</div>
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

/* ✅ The New Covenant */
.button {
  background: var(--button-bg, var(--color-neutral-90));
  font-size: var(--button-size, 1rem);
}
```

### The Implementation
```html
<!-- Identity (class) says "I am a button" -->
<!-- Appearance (properties) says "I look like this" -->
<button class="button" 
  style="--button-bg: var(--color-primary-50); --size: 1.25rem;">
  Primary Large Button
</button>

<button class="button" 
  style="--button-bg: var(--color-danger-50); --size: 0.75rem;">
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
<article class="card">
<button class="button">
<nav class="navigation">

<!-- Layout (as-): How things arrange -->
<section class="as-grid">
<div class="as-stack">
<nav class="as-cluster">

<!-- Property (with-): Special features -->
<article class="card with-shadow">
<button class="button with-interaction">
<section class="hero with-overlay">
```

### The Language
CRISP classes read like English:

```html
<article class="card as-stack with-shadow">
<!-- "Article card displayed as stack with shadow" -->

<nav class="navigation as-cluster with-sticky">
<!-- "Navigation displayed as cluster with sticky" -->

<section class="gallery as-grid with-gap">
<!-- "Gallery displayed as grid with gap" -->
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

/* ✅ Flowing with the cascade */
.button {
  /* 1. Define defaults */
  --bg: var(--color-primary);
  
  /* 2. Use the tokens */
  background: var(--bg);
}

/* Context naturally overrides via data attributes */
[data-theme="dark"] {
  --color-primary: var(--color-primary-40);
}

[data-context="danger"] .button {
  --bg: var(--color-danger);
}
```

### The Inheritance
```html
<!-- Parent sets context via data attribute -->
<main data-theme="dark">
  <!-- Children inherit automatically -->
  <article class="card">
    Dark themed card
  </article>
  <button class="button">
    Dark themed button
  </button>
</main>

<!-- Danger context -->
<section data-context="danger">
  <button class="button">Delete Account</button>
  <p class="text">This action cannot be undone</p>
</section>
```

### The Simplicity
No theme-specific classes. No dark mode modifiers. Just CSS custom properties cascading as Håkon Wium Lie intended.

**The Principle**: CSS is for layout and presentation only - never for context. Context is semantic information that belongs in HTML via data attributes. Don't pollute your styling with meaning.

**The "Aha!"**: When you stop fighting the cascade and start using it, your CSS becomes dramatically simpler. Theme switching? One attribute. Responsive design? Container queries. Component variants? Custom properties.

## The Tablet of Stone (TL;DR)

1. **Semantic HTML First** - Use real elements, not div soup
2. **Rule of Three** - 1 component + 1 layout + max 3 properties  
3. **Identity vs Appearance** - Classes for what, properties for how
4. **Meaningful Prefixes** - None, `as-`, or `with-`
5. **Embrace the Cascade** - Work with CSS, not against it

## The Promise

Follow these commandments and you shall receive:
- HTML that explains itself
- CSS that stays maintainable
- Components that actually compose
- A codebase that sparks joy

Break them, and you'll end up with... well, BEM.

→ Continue to [Chapter 4: Anatomy of a CRISP Component](./C04-anatomy.md)