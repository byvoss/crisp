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

**🚨 IMPORTANT**: CRISP uses OKLCH colors exclusively. No HSL, RGB, or HEX. Why? Because it's 2025 and we have perceptually uniform color spaces that actually work.

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

CRISP uses OKLCH for perceptually uniform colors:

```css
:root {
  /* Primary colour scale - OKLCH(lightness chroma hue) */
  --color-primary-10: oklch(95% 0.04 250);   /* Lightest */
  --color-primary-20: oklch(90% 0.08 250);
  --color-primary-30: oklch(80% 0.12 250);
  --color-primary-40: oklch(70% 0.16 250);
  --color-primary-50: oklch(60% 0.20 250);   /* Base */
  --color-primary-60: oklch(50% 0.20 250);
  --color-primary-70: oklch(40% 0.16 250);
  --color-primary-80: oklch(30% 0.12 250);
  --color-primary-90: oklch(20% 0.08 250);   /* Darkest */
  
  /* Neutral scale */
  --color-neutral-5:  oklch(98% 0 0);       /* Background */
  --color-neutral-10: oklch(95% 0.01 250);
  --color-neutral-20: oklch(90% 0.01 250);  /* Border */
  --color-neutral-50: oklch(50% 0.01 250);
  --color-neutral-90: oklch(10% 0.01 250);  /* Text */
  
  /* Semantic colours */
  --color-background: var(--color-neutral-5);
  --color-text: var(--color-neutral-90);
  --color-border: var(--color-neutral-20);
  
  /* Status colors */
  --color-error: oklch(55% 0.22 25);     /* Red */
  --color-warning: oklch(70% 0.15 90);   /* Yellow */
  --color-success: oklch(60% 0.18 145);  /* Green */
  --color-info: oklch(60% 0.15 220);     /* Blue */
}
```

**The "Aha!"**: OKLCH provides perceptually uniform colors. A lightness of 60% looks equally bright whether it's blue, red, or yellow. HSL can't do that!

### Why OKLCH?

```css
/* Automatic color variations with relative colors */
.button {
  --bg: var(--color-primary);
  
  /* Hover: 10% lighter */
  &:hover {
    --bg: oklch(from var(--bg) calc(l + 0.1) c h);
  }
  
  /* Active: 10% darker */
  &:active {
    --bg: oklch(from var(--bg) calc(l - 0.1) c h);
  }
}
```

**The deeper "Aha!"**: Relative color functions let you create consistent variations without defining every state. The browser does the math!

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
  --text-weight-massiv: 900;
  
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
  --shadow-subtle: 0 1px 2px oklch(0% 0 0 / 0.05);
  --shadow-default: 0 4px 6px oklch(0% 0 0 / 0.1);
  --shadow-elevated: 0 10px 15px oklch(0% 0 0 / 0.1);
  --shadow-floating: 0 20px 25px oklch(0% 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
```

## Using Tokens in Components

Tokens make components predictable:

```css
/* Type-safe with @property */
@property --bg {
  syntax: "<color>";
  inherits: false;
  initial-value: var(--color-primary);
}

@property --size {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}

.button {
  /* Define/Use pattern */
  --color: var(--color-white);
  --radius: var(--radius-md);
  
  padding: var(--space-0-75) var(--space-1-5);
  background: var(--bg);
  color: var(--color);
  
  font-family: var(--font-sans);
  font-size: var(--size);
  font-weight: var(--text-weight-medium);
  
  border-radius: var(--radius);
  transition: all var(--transition-fast);
}

.card {
  /* 1. Define defaults using tokens */
  --bg: var(--color-background);
  --padding: var(--space-1-5);
  --radius: var(--radius-lg);
  
  /* 2. Use the tokens */
  padding: var(--padding);
  background: var(--bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
```

## Theme Switching with Tokens

This is where tokens shine:

```css
/* Light theme (default) */
:root {
  --color-background: oklch(100% 0 0);     /* Pure white */
  --color-text: oklch(10% 0 0);            /* Near black */
  --color-border: oklch(90% 0 0);          /* Light gray */
}

/* Dark theme */
[data-theme="dark"] {
  --color-background: oklch(10% 0 0);      /* Near black */
  --color-text: oklch(90% 0 0);            /* Light gray */
  --color-border: oklch(20% 0 0);          /* Dark gray */
}

/* High contrast theme */
[data-theme="high-contrast"] {
  --color-background: oklch(0% 0 0);       /* Pure black */
  --color-text: oklch(100% 0 0);           /* Pure white */
  --color-border: oklch(100% 0 0);         /* Pure white */
}

/* System preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-background: oklch(10% 0 0);
    --color-text: oklch(90% 0 0);
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
  --text-size-hero: var(--text-size-2-0);
}

@media (min-width: 768px) {
  :root {
    --space-section: var(--space-3-0);
    --text-size-hero: var(--text-size-3-0);
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
[data-brand="default"] {
  --color-primary: oklch(60% 0.20 250);    /* Blue */
  --font-sans: system-ui, sans-serif;
}

/* Premium brand */
[data-brand="premium"] {
  --color-primary: oklch(50% 0.18 280);    /* Purple */
  --font-sans: 'Elegant Font', serif;
  --space-1-0: 1.25rem; /* More spacious */
}

/* Compact variant */
[data-variant="compact"] {
  --space-1-0: 0.875rem;
  --text-size-1-0: 0.9375rem;
}
```

## Token Best Practices

### 1. Use Semantic Names
```css
/* ❌ Bad: Tied to appearance */
--blue-500: #3b82f6;
--spacing-16: 16px;

/* ✅ Good: Describes purpose */
--color-primary: oklch(60% 0.20 250);
--space-1-0: 1rem;
```

**Note**: While colour scales (10-90) are useful internally, consider simplifying to semantic names in components (`--color-primary` instead of `--color-primary-50`).

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
  --color-primary: oklch(60% 0.20 250);
  
  /* Derived values - use relative colors! */
  --color-primary-hover: oklch(from var(--color-primary) calc(l + 0.1) c h);
  --color-primary-active: oklch(from var(--color-primary) calc(l - 0.1) c h);
  --color-primary-disabled: oklch(from var(--color-primary) l c h / 0.5);
}
```

**The "Aha!"**: No more manually calculating hover states. The browser does it for you!

## Token Naming Rules

Remember the hierarchy:
- **Element tokens** - No prefix needed (`--bg`, `--size`, `--color`)
- **Property tokens** - Need prefixes (`--shadow-blur`, `--border-width`)
- **Global tokens** - Always prefixed (`--space-1-0`, `--color-primary`, `--radius-md`)

**The "Aha!"**: Element tokens are unambiguous within their element's context. Everything else needs identification.

## Modern Token Features

### Type-Safe Tokens with @property

```css
@property --columns {
  syntax: "<integer>";
  inherits: false;
  initial-value: 3;
}

@property --gap {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}

/* Browser validates these! */
.as-grid {
  --columns: 4;          /* ✅ Valid */
  --columns: "four";     /* ❌ Ignored */
  
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
}
```

### CSS Layers for Token Organization

```css
/* Standard CRISP structure */
@layer crisp, bridge, overrides;

@layer crisp {
  /* All CRISP tokens and components */
  :root {
    /* Design tokens defined here */
    --color-primary: oklch(60% 0.20 250);
    --space-1-0: 1rem;
  }
  
  .button {
    /* Components use tokens */
    background: var(--color-primary);
    padding: var(--space-1-0);
  }
}
```

## The Token Contract

Design tokens create a contract:
- **Designers** define the values
- **Developers** use the tokens
- **Changes** happen in one place
- **Consistency** is automatic
- **Type safety** is built-in (with @property)
- **Perceptual uniformity** is guaranteed (with OKLCH)

## Your Token Journey

Start small:
1. Define spacing tokens
2. Add color tokens
3. Include typography tokens
4. Add effect tokens as needed

Remember: Tokens aren't just variables - they're the foundation of a maintainable design system.

→ Continue to [Chapter 6: Layouts That Don't Make You Think](./C06-layouts.md)