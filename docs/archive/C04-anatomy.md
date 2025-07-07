# Chapter 4: Anatomy of a CRISP Component

*Or: Dissecting simplicity to understand its power*

## The Component Formula

Let's dissect a CRISP component like a biology class frog - except this one will still work when we put it back together.

```html
<article class="card as-stack with-shadow" 
  role="article"
  aria-label="Featured content"
  style="--bg: var(--color-primary);">
  <h2 class="heading">The Anatomy Lesson</h2>
  <p class="text">Every part has a purpose.</p>
</article>
```

## The Skeleton: HTML Element

```html
<article>
```

The semantic HTML element is your component's skeleton. It provides:
- **Structural meaning** - `<article>` = self-contained content
- **Default behaviour** - `<button>` = clickable, `<a>` = navigatable
- **Accessibility** - Screen readers understand `<nav>` without ARIA

### Choose Your Bones Wisely

```html
<!-- ❌ Wrong bone structure -->
<div class="article">
<span class="button">
<div class="navigation">

<!-- ✅ Correct bone structure -->
<article class="article">
<button class="button" type="button">
<nav class="navigation" data-entries="5" aria-label="Main navigation">
```

**The "Aha!"**: The right HTML element eliminates half your CSS and all your accessibility hacks.

## The Identity: Component Class

```html
<article class="card">
```

The component class is your element's identity. It defines what something **is**, not how it looks.

### The Identity Rules

1. **One identity per element** - You can't be both a card and a button
2. **Full words only** - `button`, not `btn`. We're not paying per character
3. **Singular form** - `card`, not `cards`, even in lists

```html
<!-- ❌ Identity crisis -->
<div class="card button">           <!-- Pick one -->
<div class="crd">                   <!-- We can spell -->
<article class="cards">             <!-- It's one card -->

<!-- ✅ Clear identity -->
<article class="card">
<button class="button" type="button">
<nav class="navigation" data-entries="5" aria-label="Main navigation">
```

## The Posture: Layout Class

```html
<article class="card as-stack">
```

The layout class defines how content is arranged. Always prefixed with `as-`.

### Layout Patterns

```html
<!-- Vertical rhythm -->
<article class="card as-stack">
  <h2>Stacked</h2>
  <p>Content flows downward</p>
</article>

<!-- Horizontal grouping -->
<nav class="navigation as-cluster" data-entries="2" aria-label="Site navigation">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
</nav>

<!-- Two-dimensional grid -->
<section class="gallery as-grid" data-entries="2">
  <img class="image" src="1.jpg" alt="Gallery image 1">
  <img class="image" src="2.jpg" alt="Gallery image 2">
</section>

<!-- Perfect centring -->
<div class="hero as-center">
  <h1>Centred Content</h1>
</div>
```

**The "Aha!"**: Layout classes work on ANY component. `as-stack` works on cards, forms, navigation - anything that needs vertical spacing.

## The Enhancements: Property Classes

```html
<article class="card as-stack with-shadow">
```

Property classes add special features. Always prefixed with `with-`. Maximum of 3.

### Common Properties

```html
<!-- Visual effects -->
<article class="card with-shadow">
<section class="hero with-overlay">
<figure class="image with-rounded">

<!-- Behaviour -->
<button class="button with-interaction" type="button">Click me</button>
<nav class="navigation with-sticky" data-entries="5" aria-label="Sticky nav">Links</nav>
<dialog class="modal with-animate" aria-label="Modal dialog">Content</dialog>

<!-- Spacing -->
<article class="card with-padding">
<section class="section with-margin">
<div class="container with-gap">
```

### The Sacred Limit

```html
<!-- ✅ Within limits -->
<article class="card with-shadow with-animate">
  Two properties
</article>

<button class="button with-interaction with-shadow with-pulse">
  Three properties (maximum)
</button>

<!-- ❌ Too greedy -->
<div class="card with-shadow with-border with-padding with-margin with-animate">
  Create a new component instead
</div>
```

## The Attributes: Order Matters

CRISP enforces consistent attribute order for scannability:

```html
<article class="card as-stack with-shadow"      <!-- 1. Classes (identity first) -->
  id="featured-article"                         <!-- 2. ID (only for accessibility) -->
  role="article"                                <!-- 3. ARIA role -->
  aria-label="Featured content"                 <!-- 4. ARIA attributes -->
  data-variant="featured"                       <!-- 5. Data attributes (can be on same element!) -->
  style="--bg: var(--color-primary);">         <!-- 6. Inline styles (custom properties only) -->
  Content
</article>
```

### The Order Rationale

1. **Class first** - Most important information (what is this?)
2. **ID second** - Only when accessibility requires it
3. **Role attributes** - role (if needed)
4. **ARIA attributes** - aria-label, aria-describedby, etc.
5. **Data attributes** - data-variant, data-entries, etc.
6. **Style last** - Visual customisation

**The Rule**: `class` → `id` → `role` → `aria-*` → `data-*` → `style`

### ARIA Label Requirements

**Be descriptive, not minimal**:

```html
<!-- ❌ Too vague -->
<nav aria-label="Main">
<nav aria-label="Nav">
<section aria-label="Content">

<!-- ✅ Descriptive and helpful -->
<nav aria-label="Main navigation">
<nav aria-label="Product categories">
<section aria-label="Featured products">
```

**The Rule**: ARIA labels should describe the PURPOSE, not just the element type. Screen reader users hear "navigation" already - tell them WHICH navigation.

```html
<!-- Complete example -->
<nav class="navigation" data-entries="5" aria-label="Main navigation">
  <!-- Screen reader: "Main navigation, navigation landmark" -->
</nav>

<nav class="navigation" data-entries="3" aria-label="User account menu">
  <!-- Screen reader: "User account menu, navigation landmark" -->
</nav>
```

**The "Aha!"**: Consistent ordering makes HTML scannable. Your eyes know exactly where to look for each piece of information.

## The Customisation: Custom Properties

```html
<article class="card" style="--bg: var(--color-primary); --padding: var(--space-2-0);">
```

Custom properties handle variations without modifier classes.

### Property Naming Convention

```css
/* Component properties with @property */
@property --bg {
  syntax: "<color>";
  inherits: false;
  initial-value: var(--color-white);
}

@layer crisp {
  .card {
    /* Define/Use pattern */
    --padding: var(--space-1-5);
    --radius: var(--radius-md);
    
    background: var(--bg);
    padding: var(--padding);
    border-radius: var(--radius);
  }
}

@property --size {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}

.button {
  /* Define/Use pattern */
  --bg: var(--color-neutral);
  --weight: 500;
  
  background: var(--bg);
  font-size: var(--size);
  font-weight: var(--weight);
  
  /* Automatic hover state */
  &:hover {
    --bg: oklch(from var(--bg) calc(l + 0.1) c h);
  }
}
```

### Contextual Overrides

```html
<!-- Global context via data attributes -->
<main data-theme="neutral">
  <article class="card">Inherits theme styling</article>
  <article class="card">Also themed</article>
  <article class="card" style="--bg: var(--color-white);">Override to white</article>
</main>

<!-- Component context -->
<article class="feature-card card as-stack">
  /* feature-card can set different defaults */
</article>
```

## Complete Component Anatomy

Let's build a complete component step by step:

```html
<!-- 1. Start with semantic HTML -->
<article>

<!-- 2. Add identity -->
<article class="card">

<!-- 3. Add layout -->
<article class="card as-stack">

<!-- 4. Add enhancements (up to 3) -->
<article class="card as-stack with-shadow">

<!-- 5. Add attributes in order -->
<article class="card as-stack with-shadow"
  role="article"
  aria-label="Product feature">

<!-- 6. Customise with properties -->
<article class="card as-stack with-shadow"
  role="article"
  aria-label="Product feature"
  style="--bg: var(--color-primary); --stack-gap: var(--space-2-0);">
  
  <!-- 7. Add content with same principles -->
  <h2 class="heading" style="--size: 1.5rem;">Feature Title</h2>
  <p class="text">Feature description with default styling.</p>
  <button class="button with-interaction" type="button" style="--bg: var(--color-primary);">
    Learn More
  </button>
</article>
```

## The Progressive Enhancement Path

The same anatomy works across all three CRISP levels:

```html
<!-- CRISP (Pure CSS) -->
<button class="button with-interaction" type="button"
  style="--size: 1.25rem;">
  Click Me
</button>

<!-- CRISP Theme (Adds theme switching) -->
<body data-theme="dark">
  <button class="button with-interaction" type="button"
    style="--size: 1.25rem;">
    Click Me <!-- Automatically themed -->
  </button>
</body>

<!-- CRISP Enterprise (Adds Web Components) -->
<crisp-button variant="primary" size="large">
  Click Me <!-- Web Component generates CRISP HTML -->
</crisp-button>
```

**The "Aha!"**: The HTML structure never changes. You can upgrade from CRISP to Enterprise without touching your markup.

## Debugging Anatomy

When something looks wrong, check in order:

1. **Is the HTML semantic?** - Wrong element = wrong behaviour
2. **Is the identity clear?** - One component class only
3. **Is the layout appropriate?** - Does `as-stack` make sense here?
4. **Are properties within limits?** - Maximum 3 `with-` classes
5. **Are attributes ordered?** - Consistency aids debugging
6. **Are custom properties correct?** - No prefixes for element tokens
7. **Is accessibility complete?** - ARIA labels, roles, proper semantic HTML

## The Modern CSS Enhancements

### Type-Safe Custom Properties

```css
@property --shadow-blur {
  syntax: "<length>";
  inherits: false;
  initial-value: 10px;
}

.with-shadow {
  box-shadow: 0 4px var(--shadow-blur) var(--shadow-color);
}
```

**The "Aha!"**: Browser validates your custom properties. Pass a color to --shadow-blur? Browser ignores it. Type safety without TypeScript.

### Smart Components with :has()

```css
/* Card knows when it has an image */
.card:has(> .image) {
  --layout: "horizontal";
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* Form knows when it has errors */
.form:has(.input:invalid:not(:placeholder-shown)) {
  --border-color: var(--color-error);
}
```

## The Beauty of Anatomy

A CRISP component is like a well-designed product:
- Every part has a purpose
- Nothing is redundant
- Form follows function
- Constraints enable creativity

Master the anatomy, and you'll write components that are a joy to use and maintain.

→ Continue to [Chapter 5: Design Tokens - Your Single Source of Truth](./C05-tokens.md)