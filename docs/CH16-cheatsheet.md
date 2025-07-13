# Chapter 16: The Complete Garden Guide - Cheat Sheet

*Or: Everything CRISP on one page*

## Quick Start

```html
<!-- Minimal CRISP page -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRISP Page</title>
  <link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css">
</head>
<body>
  <!-- Your semantic HTML here -->
</body>
</html>
```

## The 1+2+3 Formula

```html
<!-- 1 blueprint + max 2 layouts + max 3 custom properties -->
<article class="card as-stack" data-key="feature-card" style="--padding: 2rem; --gap: 1rem; --bg: var(--color-surface);">
  <h2 class="heading">Perfect Balance</h2>
  <p class="text">Simple yet flexible</p>
</article>
```

## CSS Layers

```css
/* Layer order (handled automatically by CRISP) */
/* kernel → crisp → bridge → overrides */

/* For overrides: Use the overrides/ directory */
/* overrides/my-styles.css */
.button {
  --bg: var(--color-brand);
}
/* Build wraps this in @layer overrides automatically */
```

## Core Blueprints

### Button
```html
<button class="button" type="button">Default</button>
<button class="button with-interaction" data-key="primary-action" style="--bg: var(--color-primary);">Primary</button>
<button class="button" style="--bg: var(--color-error);">Danger</button>
<button class="button" disabled>Disabled</button>
```

### Link
```html
<a class="link" href="#">Standard link</a>
<a class="link" href="#" aria-current="page">Current page</a>
<a class="link" href="#" rel="external">External link ↗</a>
```

### Input
```html
<input class="input" type="text" placeholder="Text input">
<input class="input" type="email" placeholder="Email">
<input class="input" type="password" placeholder="Password">
<input class="input" type="search" placeholder="Search...">
```

### Textarea
```html
<textarea class="textarea" rows="4" placeholder="Message"></textarea>
<textarea class="textarea" style="field-sizing: content;">Auto-growing</textarea>
```

### Select
```html
<select class="select">
  <option value="">Choose...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

### Form Controls
```html
<!-- Checkbox -->
<label class="checkbox">
  <input type="checkbox">
  <span>Checkbox label</span>
</label>

<!-- Radio -->
<label class="radio">
  <input type="radio" name="choice" value="1">
  <span>Radio option</span>
</label>

<!-- Switch -->
<label class="switch">
  <input type="checkbox" role="switch">
  <span>Toggle feature</span>
</label>
```

### Card
```html
<article class="card" data-key="info-card">
  <h3 class="heading">Card Title</h3>
  <p class="text">Card content</p>
</article>

<!-- With shadow -->
<article class="card with-shadow">
  <h3 class="heading">Elevated Card</h3>
</article>
```

### Navigation
```html
<nav class="navigation" data-key="main-nav" data-entries="4" aria-label="Main">
  <a class="link" href="/" aria-current="page">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/services">Services</a>
  <a class="link" href="/contact">Contact</a>
</nav>
```

### Form
```html
<form class="form as-stack" data-key="contact-form">
  <div class="field">
    <label class="label" for="name">Name</label>
    <input class="input" type="text" id="name" required>
  </div>
  
  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input" type="email" id="email" required>
    <small class="helper">We'll never share your email</small>
  </div>
  
  <button class="button with-interaction" data-key="submit-form" type="submit">Submit</button>
</form>
```

### Alert
```html
<div class="alert" data-key="success-alert" role="alert" data-variant="success">
  <p class="text">Success! Your changes have been saved.</p>
</div>

<div class="alert" data-key="error-alert" role="alert" data-variant="error">
  <p class="text">Error: Please check your input.</p>
</div>
```

## Layout Patterns

### Stack (Vertical)
```html
<div class="as-stack" style="--gap: 1.5rem;">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Cluster (Horizontal wrap)
```html
<div class="as-cluster" style="--gap: 1rem;">
  <span>Tag 1</span>
  <span>Tag 2</span>
  <span>Tag 3</span>
</div>
```

### Grid
```html
<div class="as-grid" data-entries="3" style="--gap: 2rem;">
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
</div>
```

### Center
```html
<div class="as-center" style="--max-width: 65ch;">
  <h1 class="heading">Centered Content</h1>
  <p class="text">With readable line length</p>
</div>
```

### Split
```html
<div class="as-split">
  <span>Left side</span>
  <span>Right side</span>
</div>
```

### Aside-Content
```html
<div class="as-aside-content" style="--aside-width: 300px;">
  <aside>Aside content</aside>
  <main>Main content</main>
</div>
```

## The 10-Color System

```css
/* Brand colors */
--color-primary:   oklch(60% 0.20 250);
--color-secondary: oklch(55% 0.15 280);
--color-accent:    oklch(65% 0.25 200);

/* Semantic colors */
--color-error:   oklch(60% 0.22 25);
--color-warning: oklch(75% 0.20 90);
--color-success: oklch(65% 0.20 145);
--color-info:    oklch(60% 0.15 220);

/* Neutral colors */
--color-neutral: oklch(50% 0.01 250);
--color-surface: oklch(98% 0.00 0);
--color-ink:     oklch(10% 0.01 250);
```

### Color Variations
```css
/* Automatic hover state */
.button:hover {
  --bg: oklch(from var(--bg) calc(l + 0.1) c h);
}

/* Automatic disabled state */
.button:disabled {
  --bg: oklch(from var(--bg) l c h / 0.5);
}

/* Automatic background tint */
.alert {
  --bg: oklch(from var(--color) 0.95 calc(c * 0.2) h);
}
```

## Spacing Scale

```css
--space-0-25: 0.25rem;  /*  4px */
--space-0-5:  0.5rem;   /*  8px */
--space-0-75: 0.75rem;  /* 12px */
--space-1:    1rem;     /* 16px */
--space-1-5:  1.5rem;   /* 24px */
--space-2:    2rem;     /* 32px */
--space-3:    3rem;     /* 48px */
--space-4:    4rem;     /* 64px */
```

## Typography Scale

```css
--text-size-0-75: 0.75rem;   /* Small */
--text-size-1:    1rem;      /* Base */
--text-size-1-25: 1.25rem;   /* Large */
--text-size-1-5:  1.5rem;    /* H3 */
--text-size-2:    2rem;      /* H2 */
--text-size-3:    3rem;      /* H1 */
```

## Common Patterns

### Responsive Card Grid
```html
<div class="as-grid" data-entries="6" style="--min-item-width: 300px;">
  <article class="card">Card 1</article>
  <article class="card">Card 2</article>
  <article class="card">Card 3</article>
  <!-- ... -->
</div>
```

### Hero Section
```html
<section class="as-center as-stack" data-key="hero-section" style="--max-width: 800px; --gap: 2rem;">
  <h1 class="heading" style="--size: clamp(2rem, 5vw, 4rem);">
    Welcome to CRISP
  </h1>
  <p class="text" style="--size: 1.25rem;">
    Semantic HTML, minimal classes, maximum flexibility
  </p>
  <div class="as-cluster">
    <button class="button with-interaction" data-key="cta-start">Get Started</button>
    <a class="link" href="/docs">Learn More</a>
  </div>
</section>
```

### Feature Grid
```html
<div class="as-grid" data-key="feature-grid" data-entries="3">
  <article class="card as-stack">
    <h3 class="heading">Feature 1</h3>
    <p class="text">Description</p>
  </article>
  <!-- Repeat for more features -->
</div>
```

### Contact Form
```html
<form class="form as-stack" data-key="contact-form" style="--gap: 1.5rem;">
  <div class="as-cluster" style="--gap: 1rem;">
    <div class="field" style="flex: 1;">
      <label class="label" for="first">First Name</label>
      <input class="input" type="text" id="first">
    </div>
    <div class="field" style="flex: 1;">
      <label class="label" for="last">Last Name</label>
      <input class="input" type="text" id="last">
    </div>
  </div>
  
  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input" type="email" id="email">
  </div>
  
  <div class="field">
    <label class="label" for="message">Message</label>
    <textarea class="textarea" id="message" rows="5"></textarea>
  </div>
  
  <button class="button with-interaction" data-key="send-message" type="submit">
    Send Message
  </button>
</form>
```

## Theme Switching

```html
<!-- Theme toggle -->
<button onclick="toggleTheme()">Toggle Theme</button>

<script>
function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = 
    current === 'dark' ? 'light' : 'dark';
}
</script>
```

## Accessibility Checklist

- ✓ Use semantic HTML elements
- ✓ Add `aria-label` to navigation
- ✓ Include `aria-current="page"` for current page
- ✓ Label all form inputs
- ✓ Use `role="alert"` for important messages
- ✓ Ensure color contrast meets WCAG AA
- ✓ Test with keyboard navigation
- ✓ Test with screen reader

## Browser Support

Modern browsers only (2024+):
- Chrome 120+
- Firefox 120+
- Safari 17.2+
- Edge 120+

## Quick Wins

1. **Replace Bootstrap buttons**: Change `class="btn btn-primary"` to `class="button with-interaction"`
2. **Replace utility classes**: Change `class="p-4 m-2"` to `style="--padding: 1rem; --margin: 0.5rem;"`
3. **Fix div soup**: Change `<div class="card">` to `<article class="card">`
4. **Add layers**: Add `@layer crisp, bridge, overrides;` to your CSS
5. **Use OKLCH**: Replace `#0066cc` with `oklch(50% 0.25 250)`

## Common Gotchas

1. **Don't forget data-entries**: Grid needs `data-entries="N"`
2. **Use semantic HTML**: `<button>` not `<div onclick>`
3. **Custom properties need @property**: Define before use
4. **Layers beat specificity**: Even `!important`
5. **Container queries > media queries**: Blueprints should be self-aware

## Resources

- GitHub: [github.com/byvoss/crisp](https://github.com/byvoss/crisp)
- CDN: `https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css`
- NPM: `npm install @byvoss/crisp-pure`

---

**Remember**: CRISP is about simplicity. When in doubt, choose the simpler solution.

*Happy styling! 🌱*