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
  <h2>Hello World</h2>
  <p>This is content.</p>
</article>
```

That's it. No `.card__header`, no `.card-body-wrapper-inner`. Just `card`.

**The "Aha!"**: Your HTML explains itself. A new developer reads `class="card"` and knows exactly what it is. No documentation required.

### Minute 2: Layouts That Read Like English

```html
<!-- Stack things vertically -->
<article class="card as-stack">
  <h2>Stacked Content</h2>
  <p>Everything flows downward.</p>
  <button class="button">Click Me</button>
</article>

<!-- Arrange things in a grid -->
<section class="as-grid">
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
<button class="button" style="--bg: var(--color-primary); --size: large;">Primary Large</button>
<button class="button" style="--bg: var(--color-neutral); --size: small;">Secondary Small</button>
<button class="button" style="--bg: var(--color-danger);">Danger Default</button>
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

/* CRISP: 1 button class */
.button {
  /* 1. Define defaults */
  --bg: var(--color-neutral);
  --size: 1rem;
  
  /* 2. Use the tokens */
  background: var(--bg);
  font-size: var(--size);
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

**The deeper "Aha!"**: BEM locks you into predefined steps. CRISP gives you infinite flexibility without touching your CSS. Designer wants 7px shadow? With BEM, that's a CSS update. With CRISP, it's just `--shadow-blur: 7px;`.

### Minute 4: The Sacred Rule of Three

Every element follows one simple formula:

**1 component + 1 layout + up to 3 properties**

```html
<!-- ✅ Perfect CRISP -->
<article class="card as-stack with-shadow">

<!-- ✅ Still good -->
<button class="button with-interaction with-shadow with-animate">

<!-- ❌ You've lost the plot -->
<div class="card as-stack with-shadow with-border with-padding with-margin with-animate with-hover">
```

**The "Aha!"**: Constraints create clarity. If you need more than 3 properties, you're probably creating a new component.

### Minute 5: Progressive Enhancement Built In

The same HTML works at three levels:

```html
<!-- Level 1: CRISP (Pure CSS ~50KB) -->
<button class="button" style="--size: large;">
  Works perfectly
</button>

<!-- Level 2: CRISP Theme (+ Theme System ~60KB) -->
<button class="button" style="--size: large;">
  Now with dark mode
</button>

<!-- Level 3: CRISP Enterprise (+ TypeScript/i18n ~150KB) -->
<button class="button" data-component="button" style="--size: large;">
  Now with type safety and translations
</button>
```

**The "Aha!"**: Your HTML structure never changes. You can start simple and enhance without refactoring.

### Bonus: Context Without Class Pollution

Need different styling in different contexts? Use data attributes:

```html
<!-- Admin area with special styling -->
<main data-context="admin">
  <article class="card">
    Automatically styled for admin context
  </article>
  <button class="button">Admin actions</button>
</main>

<!-- Danger zone with warnings -->
<section data-context="danger">
  <p class="text">This action cannot be undone</p>
  <button class="button">Delete Forever</button>
</section>
```

```css
/* Context-specific styling */
[data-context="admin"] .card {
  --border-color: var(--color-warning);
}

[data-context="danger"] .button {
  --bg: var(--color-danger);
}
```

**The "Aha!"**: No `.admin-card` or `.danger-button` classes. Context is data, not CSS.

## The Core Philosophy

### 1. Semantic First
```html
<!-- ❌ Generic div soup -->
<div class="nav-wrapper">
  <div class="nav-inner">
    <div class="nav-list">

<!-- ✅ Semantic HTML -->
<nav class="navigation">
  <ul class="list">
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
/* Container queries? Of course */
.card {
  container-type: inline-size;
}

/* Nesting? Naturally */
.button {
  &:hover {
    --bg: var(--color-primary-60);
  }
}

/* Logical properties? Obviously */
.card {
  padding-inline: var(--space-1-0);
  margin-block-end: var(--space-2-0);
}
```

## Real World Example

Let's build a pricing card without crying:

```html
<article class="card as-stack with-shadow" style="--bg: var(--color-accent);">
  <header class="as-stack">
    <h2 class="heading" style="--size: 1.5rem;">Professional</h2>
    <p class="text" style="--color: var(--color-neutral);">For growing teams</p>
  </header>
  
  <div class="as-stack" style="--gap: var(--space-2-0);">
    <p class="text" style="--size: 2rem; --weight: bold;">
      £99/month
    </p>
    
    <ul class="list as-stack">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Advanced analytics</li>
    </ul>
  </div>
  
  <button class="button with-interaction" style="--bg: var(--color-primary); --size: large;">
    Start Free Trial
  </button>
</article>
```

Count the concepts you had to learn: `card`, `as-stack`, `with-shadow`. That's it.

No utility classes. No modifier chains. No BEM hieroglyphics. Just descriptive classes and custom properties.

## The Revelation, Revisited

CRISP isn't revolutionary. It's the opposite - it's admitting that HTML and CSS were pretty good all along.

We just spent 15 years making them complicated.

## Your Escape Route

You can start using CRISP today. Right now. In your current project:

```css
/* Add one component */
.card {
  /* 1. Define defaults */
  --bg: var(--color-white);
  --padding: var(--space-1-0);
  --radius: var(--radius-0-5);
  
  /* 2. Use the tokens */
  background: var(--bg);
  padding: var(--padding);
  border-radius: var(--radius);
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