# Chapter 2: CRISP - CSS That Actually Makes Sense

*Or: How to build websites without losing your sanity*

## The Revelation

It's 2025. CSS has custom properties. HTML has semantic elements. Browsers are incredibly capable.

So why are we still writing CSS like it's 2009?

## What is CRISP?

CRISP (Code Rules for Intuitive Semantic Projects) is what happens when you stop fighting the web platform and start using it.

It's not a framework. It's not a methodology. It's permission to write code that makes sense.

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
<!-- BEM way (15 classes in your CSS) -->
<button class="btn btn--primary btn--large">Old Way</button>
<button class="btn btn--secondary btn--small">Another Class</button>
<button class="btn btn--danger btn--medium">More Classes</button>

<!-- CRISP way (1 class in your CSS) -->
<button class="button" style="--button-bg: var(--colour-primary-50); --button-size: large;">Primary Large</button>
<button class="button" style="--button-bg: var(--colour-neutral-50); --button-size: small;">Secondary Small</button>
<button class="button" style="--button-bg: var(--colour-danger-50);">Danger Default</button>
```

```css
/* The entire button CSS */
.button {
  background: var(--button-bg, var(--colour-neutral-90));
  font-size: var(--button-size, 1rem);
  /* That's it. No variants. No modifiers. */
}
```

**The "Aha!"**: Custom properties eliminate modifier classes. One button class handles infinite variations.

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
<button class="button" style="--button-size: large;">
  Works perfectly
</button>

<!-- Level 2: CRISP Theme (+ Theme System ~60KB) -->
<button class="button" style="--button-size: large;">
  Now with dark mode
</button>

<!-- Level 3: CRISP Enterprise (+ TypeScript/i18n ~150KB) -->
<button class="button" data-component="button" style="--button-size: large;">
  Now with type safety and translations
</button>
```

**The "Aha!"**: Your HTML structure never changes. You can start simple and enhance without refactoring.

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
<article class="card" style="--card-bg: var(--colour-primary-10);">
```

### 3. Prefixes That Make Sense

Only three prefixes, each with clear purpose:

- **No prefix** = Component (`card`, `button`, `navigation`)
- **`as-`** = Layout mode (`as-stack`, `as-grid`, `as-centre`)
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
    --button-bg: var(--colour-primary-60);
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
<article class="card as-stack with-shadow" style="--card-bg: var(--colour-primary-5);">
  <header class="as-stack">
    <h2 class="heading" style="--heading-size: 1.5rem;">Professional</h2>
    <p class="text" style="--text-colour: var(--colour-neutral-60);">For growing teams</p>
  </header>
  
  <div class="as-stack" style="--stack-gap: var(--space-2-0);">
    <p class="text" style="--text-size: 2rem; --text-weight: bold;">
      £99/month
    </p>
    
    <ul class="list as-stack">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Advanced analytics</li>
    </ul>
  </div>
  
  <button class="button with-interaction" style="--button-variant: primary; --button-size: large;">
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
  background: var(--card-bg, white);
  padding: var(--card-padding, 1rem);
  border-radius: var(--card-radius, 0.5rem);
}

/* Use it */
<article class="card">
  Your content
</article>
```

No build step. No configuration. No 500-page documentation.

Just CSS that makes sense.

→ Continue to [Chapter 3: The Five Commandments of CRISP](./C03-principles.md)