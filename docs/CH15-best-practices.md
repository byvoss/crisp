# Chapter 15: Master Gardener - Best Practices

*Or: The wisdom gained from a thousand projects*

## The CRISP Mindset

Before diving into practices, understand the philosophy:

1. **Simplicity scales, complexity fails**
2. **Convention over configuration**
3. **Progressive enhancement always**
4. **Accessibility is not optional**
5. **Performance is a feature**

## Component Best Practices

### Do: Semantic First

```html
<!-- ✅ GOOD: Semantic HTML -->
<article class="card">
  <h3 class="heading">Title</h3>
  <p class="text">Content</p>
</article>

<!-- ❌ BAD: Div soup -->
<div class="card">
  <div class="card-header">
    <div class="card-title">Title</div>
  </div>
  <div class="card-body">
    <div class="card-text">Content</div>
  </div>
</div>
```

**Why**: Screen readers understand `<article>` and `<h3>`. They don't understand nested divs.

### Do: Custom Properties for Variants

```css
/* ✅ GOOD: Properties for variations */
.button {
  background: var(--bg, var(--color-primary));
  font-size: var(--size, 1rem);
  padding: var(--padding, var(--space-0-75) var(--space-1-5));
}

/* Usage */
<button class="button" style="--bg: var(--color-error); --size: 1.25rem;">
  Large Danger Button
</button>

/* ❌ BAD: Modifier classes */
.button {}
.button--danger {}
.button--large {}
.button--danger-large {} /* Combinatorial explosion! */
```

**Why**: Infinite variations without infinite classes.

### Do: Single Source of Truth

```css
/* ✅ GOOD: Tokens define everything */
:root {
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

.card { border-radius: var(--radius-lg); }
.button { border-radius: var(--radius-md); }
.input { border-radius: var(--radius-md); }

/* ❌ BAD: Magic numbers everywhere */
.card { border-radius: 12px; }
.button { border-radius: 8px; }
.input { border-radius: 6px; } /* Wait, was it 8px? */
```

**Why**: Change once, update everywhere.

## Layout Best Practices

### Do: Container Queries Over Media Queries

```css
/* ✅ GOOD: Component knows its size */
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    --layout: horizontal;
  }
}

/* ❌ BAD: Component assumes viewport */
@media (min-width: 768px) {
  .sidebar .card {
    /* But sidebar might be collapsed! */
  }
}
```

**Why**: Components work anywhere, not just specific viewports.

### Do: Logical Properties

```css
/* ✅ GOOD: Works in any direction */
.component {
  margin-inline-start: auto;
  padding-block: var(--space-1);
  border-inline-end: 1px solid;
}

/* ❌ BAD: Assumes left-to-right */
.component {
  margin-left: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-right: 1px solid;
}
```

**Why**: Automatic RTL support without separate stylesheets.

## State Management Best Practices

### Do: CSS-Only When Possible

```css
/* ✅ GOOD: CSS handles state */
.accordion {
  .panel {
    display: none;
  }
  
  .trigger:checked + .panel {
    display: block;
  }
}

/* ❌ BAD: JavaScript for everything */
element.addEventListener('click', () => {
  element.classList.toggle('is-open');
});
```

**Why**: Less JavaScript = better performance, better reliability.

### Do: Progressive Enhancement

```html
<!-- ✅ GOOD: Works without JS -->
<details class="accordion">
  <summary class="trigger">Click to expand</summary>
  <div class="panel">Content</div>
</details>

<!-- Enhance with JS if needed -->
<script>
if (CSS.supports('selector(:has(*))')) {
  // Add enhanced behavior
}
</script>

<!-- ❌ BAD: Requires JS -->
<div class="accordion" onclick="toggle()">
  <!-- Broken without JavaScript -->
</div>
```

**Why**: Core functionality always works.

## Performance Best Practices

### Do: Contain Layout

```css
/* ✅ GOOD: Prevent layout thrashing */
.card {
  contain: layout style;
}

.large-list {
  contain: strict;
  content-visibility: auto;
}

/* ❌ BAD: Unconstrained layouts */
.card {
  /* Changes here affect entire page */
}
```

**Why**: Browser can optimize rendering.

### Do: Reduce Specificity

```css
/* ✅ GOOD: Low specificity */
.button { }
.card { }
.heading { }

/* ❌ BAD: Specificity wars */
.page .content .card .header .title { }
#main > .card:first-child .button.primary { }
```

**Why**: Easier overrides, smaller CSS, better performance.

## Accessibility Best Practices

### Do: Focus Visible

```css
/* ✅ GOOD: Smart focus */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* ❌ BAD: No focus indicator */
:focus {
  outline: none; /* Keyboard users can't navigate! */
}
```

**Why**: Keyboard users need to see focus.

### Do: Meaningful HTML

```html
<!-- ✅ GOOD: Semantic markup -->
<nav aria-label="Main">
  <a href="/" aria-current="page">Home</a>
  <a href="/about">About</a>
</nav>

<!-- ❌ BAD: Meaningless markup -->
<div class="nav">
  <span class="link active">Home</span>
  <span class="link">About</span>
</div>
```

**Why**: Assistive technology understands semantic HTML.

## Token Best Practices

### Do: Systematic Scales

```css
/* ✅ GOOD: Mathematical scale */
:root {
  --space-base: 1rem;
  --space-scale: 1.5;
  
  --space-xs: calc(var(--space-base) / var(--space-scale));
  --space-sm: var(--space-base);
  --space-md: calc(var(--space-base) * var(--space-scale));
  --space-lg: calc(var(--space-md) * var(--space-scale));
}

/* ❌ BAD: Random values */
:root {
  --space-1: 4px;
  --space-2: 7px;
  --space-3: 11px;
  --space-4: 18px; /* No relationship! */
}
```

**Why**: Consistent, predictable spacing.

### Do: Semantic Naming

```css
/* ✅ GOOD: Purpose-based names */
:root {
  --color-primary: oklch(60% 0.20 250);
  --color-error: oklch(55% 0.22 25);
  --color-success: oklch(55% 0.20 145);
}

/* ❌ BAD: Visual names */
:root {
  --color-blue: #0066cc;
  --color-red: #cc0000;
  --color-green: #00cc00; /* What if brand changes? */
}
```

**Why**: Colors can change, purposes don't.

## Migration Best Practices

### Do: Incremental Migration

```css
/* ✅ GOOD: Gradual transition */
@layer crisp, bridge, overrides;

@layer bridge {
  /* Old styles here temporarily */
  .legacy-component {
    /* Map to CRISP gradually */
  }
}

/* ❌ BAD: Big bang rewrite */
/* Delete everything and start over */
/* (Never works!) */
```

**Why**: Reduces risk, maintains functionality.

### Do: Measure Success

```javascript
/* ✅ GOOD: Track improvements */
console.log({
  cssSize: '245KB → 52KB',
  classes: '3,847 → 142',
  specificity: 'max 5 → max 2',
  buildTime: '3min → 10s'
});

/* ❌ BAD: No metrics */
// "It feels faster" - Developer
```

**Why**: Data drives decisions.

## Team Best Practices

### Do: Document Patterns

```css
/* ✅ GOOD: Self-documenting */
/**
 * Card Component
 * @custom-properties
 *   --bg: Background color (default: surface)
 *   --padding: Internal spacing (default: 1.5rem)
 *   --radius: Border radius (default: 0.75rem)
 * @usage
 *   <article class="card">Content</article>
 */
.card {
  /* Implementation */
}
```

### Do: Consistent Conventions

```css
/* ✅ GOOD: Team conventions */
/* Layout classes: as-* prefix */
/* State classes: with-* prefix */
/* Components: semantic names only */
/* Tokens: systematic naming */

/* ❌ BAD: Everyone does their own thing */
/* Bob likes BEM */
/* Alice prefers utilities */
/* Carlos uses CSS-in-JS */
/* Chaos ensues */
```

## Common Pitfalls

### Don't: Over-Engineer

```css
/* ❌ BAD: Too clever */
.button {
  --bg: var(--button-bg, var(--component-bg, var(--theme-bg, var(--color-primary))));
}

/* ✅ GOOD: Just right */
.button {
  --bg: var(--color-primary);
}
```

### Don't: Premature Abstraction

```css
/* ❌ BAD: Abstract everything */
@mixin flex-center-space-between-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

/* ✅ GOOD: Use CSS */
.as-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
}
```

### Don't: Ignore Browser Support

```css
/* ❌ BAD: No fallbacks */
.modern-only {
  /* Breaks in 10% of browsers */
}

/* ✅ GOOD: Progressive enhancement */
.component {
  /* Base styles work everywhere */
}

@supports (selector(:has(*))) {
  .component {
    /* Enhanced for modern browsers */
  }
}
```

## The Golden Rules

1. **Start simple, enhance progressively**
2. **Semantic HTML is your foundation**
3. **Custom properties over modifier classes**
4. **Low specificity wins**
5. **Accessibility from the start**
6. **Measure everything**
7. **Document for your team**
8. **CSS can do more than you think**

**The Bottom Line**: Good practices aren't rules to follow blindly. They're patterns that prevent problems.

Ready for the complete reference?

→ Continue to [Chapter 16: The Complete Garden Guide - Cheat Sheet](./CH16-cheatsheet.md)