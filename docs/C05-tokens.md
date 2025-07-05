# Chapter 5: Design Tokens - Your Single Source of Truth

*Or: How to change your entire design system with one line of code*

## The Problem with Magic Numbers

Remember this nightmare?

```css
/* Monday's CSS */
.button { padding: 12px 24px; }
.card { padding: 16px; }
.input { padding: 12px 16px; }

/* Tuesday: "Make everything a bit more spacious" */
.button { padding: 16px 32px; } /* Wait, was this 12px or 14px before? */
.card { padding: 20px; }         /* Or was it 24px? */
.input { padding: 14px 20px; }   /* I'm just guessing now */

/* Wednesday: "Actually, can we go back?" */
/* *crying sounds* */
```

## Enter Design Tokens

Design tokens are your single source of truth. Change them once, update everywhere.

```css
/* Define once */
:root {
  --space-1-0: 1rem;      /* 16px */
  --space-1-5: 1.5rem;    /* 24px */
  --space-2-0: 2rem;      /* 32px */
}

/* Use everywhere */
.button { padding: var(--space-0-75) var(--space-1-5); }
.card { padding: var(--space-1-0); }
.input { padding: var(--space-0-75) var(--space-1-0); }

/* Change once, update everywhere */
:root {
  --space-1-0: 1.125rem;  /* Now everything is 12.5% bigger */
}
```

**The "Aha!"**: Design tokens aren't just variables - they're a contract between design and development.

## The CRISP Token System

### Spacing Tokens - The Rhythm of Your Design

```css
:root {
  /* Base unit = 1rem (usually 16px) */
  --space-0-25: 0.25rem;  /*  4px - Hairline */
  --space-0-5:  0.5rem;   /*  8px - Tight */
  --space-0-75: 0.75rem;  /* 12px - Snug */
  --space-1-0:  1rem;     /* 16px - Default */
  --space-1-5:  1.5rem;   /* 24px - Comfortable */
  --space-2-0:  2rem;     /* 32px - Spacious */
  --space-3-0:  3rem;     /* 48px - Generous */
  --space-4-0:  4rem;     /* 64px - Massive */
}
```

Usage becomes self-documenting:

```html
<!-- You read the spacing in the code -->
<article class="card as-stack" style="--stack-gap: var(--space-1-5);">
  <h2>Comfortable spacing</h2>
  <p>1.5rem between elements</p>
</article>
```

### Color Tokens - The Palette That Scales

CRISP uses HSL with an alpha channel for ultimate flexibility:

```css
:root {
  /* Primary colour scale */
  --color-primary-10: hsla(220, 80%, 95%, 1);   /* Lightest */
  --color-primary-20: hsla(220, 80%, 90%, 1);
  --color-primary-30: hsla(220, 80%, 80%, 1);
  --color-primary-40: hsla(220, 80%, 70%, 1);
  --color-primary-50: hsla(220, 80%, 60%, 1);   /* Base */
  --color-primary-60: hsla(220, 80%, 50%, 1);
  --color-primary-70: hsla(220, 80%, 40%, 1);
  --color-primary-80: hsla(220, 80%, 30%, 1);
  --color-primary-90: hsla(220, 80%, 20%, 1);   /* Darkest */
  
  /* Semantic colours */
  --color-background: var(--color-neutral-5);
  --color-text: var(--color-neutral-90);
  --color-border: var(--color-neutral-20);
}
```

**The "Aha!"**: HSL makes color relationships obvious. Need a darker primary? Decrease the lightness. Need it more muted? Decrease the saturation.

### Typography Tokens - Consistent Text Everywhere

```css
:root {
  /* Font families */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-mono: 'SF Mono', Monaco, monospace;
  
  /* Font sizes */
  --text-size-0-75: 0.75rem;    /* Small print */
  --text-size-1-0: 1rem;        /* Body text */
  --text-size-1-25: 1.25rem;    /* Large text */
  --text-size-1-5: 1.5rem;      /* H3 */
  --text-size-2-0: 2rem;        /* H2 */
  --text-size-3-0: 3rem;        /* H1 */
  
  /* Font weights */
  --text-weight-normal: 400;
  --text-weight-medium: 500;
  --text-weight-semibold: 600;
  --text-weight-bold: 700;
  
  /* Line heights */
  --text-leading-tight: 1.25;
  --text-leading-normal: 1.5;
  --text-leading-relaxed: 1.75;
}
```

### Effect Tokens - Consistent Visual Effects

```css
:root {
  /* Border radius */
  --radius-none: 0;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows (GPU-optimised) */
  --shadow-subtle: 0 1px 2px hsla(0, 0%, 0%, 0.05);
  --shadow-default: 0 4px 6px hsla(0, 0%, 0%, 0.1);
  --shadow-elevated: 0 10px 15px hsla(0, 0%, 0%, 0.1);
  --shadow-floating: 0 20px 25px hsla(0, 0%, 0%, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
```

## Using Tokens in Components

Tokens make components predictable:

```css
.button {
  /* Spacing tokens for padding */
  padding: var(--space-0-75) var(--space-1-5);
  
  /* Colour tokens for theme */
  background: var(--button-bg, var(--color-primary-50));
  color: var(--button-color, white);
  
  /* Typography tokens for text */
  font-family: var(--font-sans);
  font-size: var(--button-size, var(--text-size-base));
  font-weight: var(--text-weight-medium);
  
  /* Effect tokens for polish */
  border-radius: var(--button-radius, var(--radius-md));
  transition: all var(--transition-fast);
}

.card {
  /* Consistent spacing */
  padding: var(--card-padding, var(--space-1-5));
  
  /* Semantic colours */
  background: var(--card-bg, var(--color-background));
  border: 1px solid var(--color-border);
  
  /* Standard effects */
  border-radius: var(--card-radius, var(--radius-lg));
}
```

## Theme Switching with Tokens

This is where tokens shine:

```css
/* Light theme (default) */
:root {
  --color-background: hsla(0, 0%, 100%, 1);
  --color-text: hsla(0, 0%, 10%, 1);
  --color-border: hsla(0, 0%, 90%, 1);
}

/* Dark theme */
[data-theme="dark"] {
  --color-background: hsla(0, 0%, 10%, 1);
  --color-text: hsla(0, 0%, 90%, 1);
  --color-border: hsla(0, 0%, 20%, 1);
}

/* System preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-background: hsla(0, 0%, 10%, 1);
    --color-text: hsla(0, 0%, 90%, 1);
  }
}
```

**The "Aha!"**: Every component automatically adapts. No `.dark-mode-card` classes needed.

## Responsive Tokens

Tokens can be responsive too:

```css
:root {
  /* Mobile first */
  --space-section: var(--space-2-0);
  --text-size-hero: var(--text-size-2xl);
}

@media (min-width: 768px) {
  :root {
    --space-section: var(--space-3-0);
    --text-size-hero: var(--text-size-3xl);
  }
}

@media (min-width: 1200px) {
  :root {
    --space-section: var(--space-4-0);
    --text-size-hero: clamp(3rem, 4vw, 4rem);
  }
}
```

## Creating Custom Token Sets

For different brands or contexts:

```css
/* Default brand */
.brand-default {
  --color-primary-50: hsla(220, 80%, 60%, 1);
  --font-sans: system-ui, sans-serif;
}

/* Premium brand */
.brand-premium {
  --color-primary-50: hsla(280, 60%, 50%, 1);
  --font-sans: 'Elegant Font', serif;
  --space-1-0: 1.25rem; /* More spacious */
}

/* Compact context */
.context-compact {
  --space-1-0: 0.875rem;
  --text-size-base: 0.9375rem;
}
```

## Token Best Practices

### 1. Use Semantic Names
```css
/* ❌ Bad: Tied to appearance */
--blue-500: #3b82f6;
--spacing-16: 16px;

/* ✅ Good: Describes purpose */
--color-primary-50: hsla(220, 80%, 60%, 1);
--space-1-0: 1rem;
```

### 2. Create Scales That Make Sense
```css
/* ❌ Random values */
--space-1: 13px;
--space-2: 18px;
--space-3: 27px;

/* ✅ Logical progression */
--space-0-5: 0.5rem;   /* Half */
--space-1-0: 1rem;     /* Base */
--space-2-0: 2rem;     /* Double */
```

### 3. Document Token Relationships
```css
:root {
  /* Base values */
  --color-primary-50: hsla(220, 80%, 60%, 1);
  
  /* Derived values */
  --color-primary-hover: var(--color-primary-60);
  --color-primary-active: var(--color-primary-70);
  --color-primary-disabled: hsla(220, 80%, 60%, 0.5);
}
```

## The Token Contract

Design tokens create a contract:
- **Designers** define the values
- **Developers** use the tokens
- **Changes** happen in one place
- **Consistency** is automatic

## Your Token Journey

Start small:
1. Define spacing tokens
2. Add color tokens
3. Include typography tokens
4. Add effect tokens as needed

Remember: Tokens aren't just variables - they're the foundation of a maintainable design system.

→ Continue to [Chapter 6: Layouts That Don't Make You Think](./C06-layouts.md)