# Chapter 2: CRISP - CSS That Actually Makes Sense

*Or: How to build websites without losing your sanity*

## The Revelation

It's 2025. CSS has custom properties. HTML has semantic elements. Browsers are incredibly capable.

So why are we still writing CSS like it's 2009?

## What is CRISP?

CRISP (Code Rules for Intuitive Semantic Projects) is what happens when you stop fighting the web platform and start using it.

It starts as pure CSS. It can become a framework in enterprise tier - but only if you need it. But the core philosophy remains: semantic HTML and simple patterns.

## The Five Minutes to "Aha!"

### Minute 1: Your First CRISP Component

```html
<!-- This is a card -->
<article class="card">
  <h2 class="heading">Hello World</h2>
  <p class="text">This is content.</p>
</article>
```

That's it. No `.card__header`, no `.card-body-wrapper-inner`. Just `card`.

**The "Aha!"**: Your HTML explains itself. A new developer reads `class="card"` and knows exactly what it is. No documentation required.

### Minute 2: Layouts That Read Like English

```html
<!-- Stack things vertically -->
<article class="card as-stack">
  <h2 class="heading">Stacked Content</h2>
  <p class="text">Everything flows downward.</p>
  <button class="button" type="button">Click Me</button>
</article>

<!-- Arrange things in a grid -->
<section class="as-grid" data-entries="3">
  <article class="card">Card 1</article>
  <article class="card">Card 2</article>
  <article class="card">Card 3</article>
</section>
```

**The "Aha!"**: Classes read like English sentences. `card as-stack` = "card displayed as stack". No mental translation required.

### Minute 3: Properties Without Proliferation

Remember creating 15 button variants? Watch this:

```html
<!-- BEM way: Define every combination upfront -->
<button class="btn btn--primary btn--large">Primary Large</button>
<button class="btn btn--secondary btn--small">Secondary Small</button>
<button class="btn btn--danger btn--medium">Danger Medium</button>

<!-- CRISP way: Mix and match on demand -->
<button class="button" type="button" style="--bg: var(--color-primary); --size: 1.25rem;">Primary Large</button>
<button class="button" type="button" style="--bg: var(--color-neutral); --size: 0.875rem;">Secondary Small</button>
<button class="button" type="button" style="--bg: var(--color-danger);">Danger Default</button>
```

```css
/* BEM: 15+ button classes */
.btn { }
.btn--primary { }
.btn--secondary { }
.btn--danger { }
.btn--small { }
.btn--medium { }
.btn--large { }
/* Plus all combinations... */

/* CRISP: 1 button class with @property */
@property --bg {
  syntax: "<color>";
  inherits: false;
  initial-value: oklch(60% 0.01 250); /* neutral */
}

@property --size {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}

.button {
  /* Define/Use pattern */
  background: var(--bg);
  font-size: var(--size);
  
  /* Automatic hover state with relative colors */
  &:hover {
    --bg: oklch(from var(--bg) calc(l + 0.1) c h);
  }
}
```

**The "Aha!"**: Yes, the HTML is longer. But your CSS file went from 15+ classes to 1. Your brain remembers one pattern instead of a matrix of modifiers.

Now let's push this further with shadows:

```html
<!-- BEM: Predefined shadow steps -->
<div class="card card--shadow-sm">Small</div>
<div class="card card--shadow-md">Medium</div>
<div class="card card--shadow-lg">Large</div>
<!-- Need shadow-xs? Time to edit CSS! -->

<!-- CRISP: Any shadow you can imagine -->
<article class="card with-shadow" style="--shadow-blur: 5px;">Subtle</article>
<article class="card with-shadow" style="--shadow-blur: 20px;">Dramatic</article>
<article class="card with-shadow" style="--shadow-blur: 8px; --shadow-color: var(--color-primary);">Brand colored</article>
<!-- Need a new shadow? Just change the number! -->
```

```css
/* The with-shadow magic */
@property --shadow-blur {
  syntax: "<length>";
  inherits: false;
  initial-value: 10px;
}

@property --shadow-color {
  syntax: "<color>";
  inherits: false;
  initial-value: oklch(0% 0% 0 / 0.1);
}

.with-shadow {
  box-shadow: 0 4px var(--shadow-blur) var(--shadow-color);
}
```

**The deeper "Aha!"**: BEM locks you into predefined steps. CRISP gives you infinite flexibility without touching your CSS. Designer wants 7px shadow? With BEM, that's a CSS update. With CRISP, it's just `--shadow-blur: 7px;`.

### Minute 4: The Sacred Rule of Three

Every element follows one simple formula:

**1 component + 1 layout + up to 3 properties**

```html
<!-- ✅ Perfect CRISP -->
<article class="card as-stack with-shadow">
  <!-- content -->
</article>

<!-- ✅ Still good -->
<button class="button with-interaction with-shadow with-animate" type="button">
  Click me
</button>

<!-- ❌ You've lost the plot -->
<div class="card as-stack with-shadow with-border with-padding with-margin with-animate with-hover">
  <!-- Too many properties! -->
</div>
```

**The "Aha!"**: Constraints create clarity. If you need more than 3 properties, you're probably creating a new component.

### Minute 5: Progressive Enhancement Built In

The same HTML works at three levels:

```html
<!-- Level 1: CRISP (Pure CSS ~50KB) -->
<button class="button" type="button" style="--size: 1.25rem;">
  Works perfectly
</button>

<!-- Level 2: CRISP Theme (+ Theme System ~60KB) -->
<body data-theme="dark">
  <button class="button" type="button" style="--size: 1.25rem;">
    Now with dark mode
  </button>
</body>

<!-- Level 3: CRISP Enterprise (+ Web Components ~150KB) -->
<crisp-button size="large">
  Now with Web Components
</crisp-button>
```

**The "Aha!"**: Your HTML structure never changes. You can start simple and enhance without refactoring.

### Bonus: Variants Without Class Pollution

Need different styling in different contexts? Use data-variant:

```html
<!-- Admin area with special styling -->
<main data-variant="admin" aria-label="Admin panel">
  <article class="card">
    <p class="text">Automatically styled for admin variant</p>
  </article>
  <button class="button" type="button">Admin actions</button>
</main>

<!-- Danger zone with warnings -->
<section data-variant="danger" role="alert">
  <p class="text">This action cannot be undone</p>
  <button class="button" type="button" aria-describedby="danger-warning">
    Delete Forever
  </button>
</section>
```

```css
/* CSS @layer for perfect isolation */
@layer crisp {
  /* Variant-specific styling */
  [data-variant="admin"] .card {
    --border-color: var(--color-warning);
  }

  [data-variant="danger"] .button {
    --bg: var(--color-danger);
    
    /* Automatic hover state */
    &:hover {
      --bg: oklch(from var(--bg) calc(l - 0.1) c h);
    }
  }
}
```

**The "Aha!"**: No `.admin-card` or `.danger-button` classes. Variants are data, not CSS.

## The Core Philosophy

### 1. Semantic First
```html
<!-- ❌ Generic div soup -->
<div class="nav-wrapper">
  <div class="nav-inner">
    <div class="nav-list">

<!-- ✅ Semantic HTML with ARIA -->
<nav class="navigation" data-entries="5" aria-label="Main navigation">
  <ul class="list" role="list">
```

HTML elements have meaning. Use them.

### 2. Classes Describe, Properties Customize
```html
<!-- Class says WHAT it is -->
<article class="card">

<!-- Properties say HOW it looks -->
<article class="card" style="--bg: var(--color-primary);">
```

### 3. Prefixes That Make Sense

Only three prefixes, each with clear purpose:

- **No prefix** = Component (`card`, `button`, `navigation`)
- **`as-`** = Layout mode (`as-stack`, `as-grid`, `as-center`)
- **`with-`** = Enhancement (`with-shadow`, `with-animate`)

```html
<!-- Reads like a sentence -->
<article class="card as-stack with-shadow">
  "Article card displayed as stack with shadow"
</article>
```

### 4. The Platform is Good, Actually

Modern CSS is incredible. CRISP embraces it:

```css
/* CSS @layer for isolation */
@layer crisp {
  /* Container queries? Of course */
  .card {
    container-type: inline-size;
  }

  /* :has() for parent selection */
  .form:has(.input:invalid) {
    --border-color: var(--color-error);
  }

  /* Logical properties? Obviously */
  .card {
    padding-inline: var(--space-1-0);
    margin-block-end: var(--space-2-0);
  }
}
```

## Real World Example

Let's build a pricing card without crying:

```html
<article class="card as-stack with-shadow" data-variant="professional" style="--bg: var(--color-accent);">
  <header class="as-stack">
    <h2 class="heading" style="--size: 1.5rem;">Professional</h2>
    <p class="text" style="--color: var(--color-neutral);">For growing teams</p>
  </header>
  
  <div class="as-stack" style="--stack-gap: var(--space-2-0);">
    <p class="text" style="--size: 2rem; --weight: bold;">
      <span aria-label="99 pounds per month">£99/month</span>
    </p>
    
    <ul class="list as-stack" data-entries="3">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Advanced analytics</li>
    </ul>
  </div>
  
  <button class="button with-interaction" type="button" style="--bg: var(--color-primary); --size: 1.25rem;">
    Start Free Trial
  </button>
</article>
```

Count the concepts you had to learn: `card`, `as-stack`, `with-shadow`. That's it.

No utility classes. No modifier chains. No BEM hieroglyphics. Just descriptive classes and custom properties.

**The "Aha!"**: Notice the `data-variant="professional"` directly on the card? No wrapper needed. Components can have both classes AND data attributes. Classes define what it is, data attributes provide context that changes how it looks. One element, multiple concerns, zero wrapper divs.

**The deeper "Aha!"**: All colors are in OKLCH format. Why? Because it's 2025 and we have perceptually uniform color spaces. No more "why does this yellow look greenish?" OKLCH ensures your color adjustments actually look like you intended. The relative color functions (`calc(l + 0.1)`) give you perfect, predictable hover states without manual color picking.

## The Revelation, Revisited

CRISP isn't revolutionary. It's the opposite - it's admitting that HTML and CSS were pretty good all along.

We just spent 15 years making them complicated.

## Your Escape Route

You can start using CRISP today. Right now. In your current project:

```css
/* Add one component with @property */
@property --bg {
  syntax: "<color>";
  inherits: false;
  initial-value: oklch(100% 0% 0); /* white */
}

@layer crisp {
  .card {
    /* Define/Use pattern */
    --padding: var(--space-1-0);
    --radius: var(--radius-md);
    
    background: var(--bg);
    padding: var(--padding);
    border-radius: var(--radius);
  }
}
```

```html
<!-- Use it -->
<article class="card">
  Your content
</article>
```

No build step. No configuration. No 500-page documentation.

Just CSS that makes sense.

→ Continue to [Chapter 3: The Five Commandments of CRISP](./C03-principles.md)