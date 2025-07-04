# Design Tokens

## Overview

CRISP design tokens provide a consistent, scalable foundation for your design system. All tokens follow predictable naming patterns and use modern CSS custom properties.

## Token Categories

### Spacing System

Based on rem units with clear numeric indicators:

```css
:root {
  /* Fractional spaces */
  --space-0-25: 0.25rem;  /* 4px */
  --space-0-5: 0.5rem;    /* 8px */
  
  /* Whole number spaces */
  --space-1-0: 1rem;      /* 16px */
  --space-1-5: 1.5rem;    /* 24px */
  --space-2-0: 2rem;      /* 32px */
  --space-3-0: 3rem;      /* 48px */
  --space-4-0: 4rem;      /* 64px */
}
```

**Naming Pattern**: `--space-[value]` where value uses hyphen for decimal point

### Colour System

All colours use `hsla()` for consistency and flexibility:

```css
:root {
  /* Primary colours with lightness variants */
  --colour-primary-10: hsla(220, 70%, 10%, 1);
  --colour-primary-30: hsla(220, 70%, 30%, 1);
  --colour-primary-50: hsla(220, 70%, 50%, 1);
  --colour-primary-70: hsla(220, 70%, 70%, 1);
  --colour-primary-90: hsla(220, 70%, 90%, 1);
  
  /* Semantic colours */
  --colour-error-50: hsla(0, 85%, 50%, 1);
  --colour-warning-50: hsla(45, 90%, 50%, 1);
  --colour-success-50: hsla(120, 70%, 50%, 1);
  --colour-info-50: hsla(210, 70%, 50%, 1);
  
  /* Neutral colours */
  --colour-neutral-10: hsla(220, 10%, 10%, 1);
  --colour-neutral-20: hsla(220, 10%, 20%, 1);
  --colour-neutral-50: hsla(220, 10%, 50%, 1);
  --colour-neutral-90: hsla(220, 10%, 90%, 1);
  --colour-neutral-95: hsla(220, 10%, 95%, 1);
}
```

**Naming Pattern**: `--colour-[name]-[lightness]` where lightness is the L value in HSL

### Typography Scale

System fonts with fluid sizing:

```css
:root {
  /* Font families */
  --font-sans: system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, "SF Mono", Monaco, monospace;
  
  /* Font sizes using rem */
  --text-size-0-75: 0.75rem;   /* 12px */
  --text-size-1-0: 1rem;        /* 16px */
  --text-size-1-25: 1.25rem;    /* 20px */
  --text-size-1-5: 1.5rem;      /* 24px */
  --text-size-2-0: 2rem;        /* 32px */
  --text-size-3-0: 3rem;        /* 48px */
  
  /* Line heights */
  --text-height-tight: 1.2;
  --text-height-base: 1.5;
  --text-height-loose: 1.75;
  
  /* Font weights */
  --text-weight-normal: 400;
  --text-weight-medium: 500;
  --text-weight-semibold: 600;
  --text-weight-bold: 700;
}
```

### Layout Tokens

Container widths and breakpoints:

```css
:root {
  /* Container widths */
  --container-xs: 480px;
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  
  /* Grid gaps - reference spacing tokens */
  --grid-gap-small: var(--space-0-5);
  --grid-gap-base: var(--space-1-0);
  --grid-gap-large: var(--space-2-0);
}
```

### Visual Effects

Shadows and transitions:

```css
:root {
  /* Shadows using neutral colour */
  --shadow-colour: var(--colour-neutral-20);
  
  /* Shadow elevations */
  --shadow-xs: 0 1px 2px hsla(220, 10%, 20%, 0.1);
  --shadow-subtle: 0 2px 4px hsla(220, 10%, 20%, 0.12);
  --shadow-default: 0 4px 8px hsla(220, 10%, 20%, 0.15);
  --shadow-elevated: 0 8px 16px hsla(220, 10%, 20%, 0.18);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
  
  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
}
```

## Token Usage

### In CSS

```css
/* Reference tokens with fallbacks */
.button {
  padding: var(--space-0-5) var(--space-1-0);
  background: var(--button-bg, var(--colour-primary-50));
  border-radius: var(--radius-sm);
  transition: transform var(--transition-fast);
}

.card {
  padding: var(--card-padding, var(--space-1-5));
  background: var(--card-bg, var(--colour-neutral-95));
  box-shadow: var(--shadow-subtle);
}
```

### Inline Overrides

```html
<!-- Override specific properties -->
<article class="card" style="--card-padding: var(--space-2-0);">
  Extra padded card
</article>

<button class="button" style="--button-bg: var(--colour-error-50);">
  Danger button
</button>
```

## Responsive Tokens

CRISP uses CSS clamp() for fluid sizing:

```css
:root {
  /* Fluid spacing */
  --space-fluid-sm: clamp(0.5rem, 1vw, 1rem);
  --space-fluid-md: clamp(1rem, 2vw, 2rem);
  --space-fluid-lg: clamp(2rem, 4vw, 4rem);
  
  /* Fluid typography */
  --text-size-fluid-base: clamp(1rem, 1rem + 0.5vw, 1.125rem);
  --text-size-fluid-large: clamp(1.5rem, 1.5rem + 1vw, 2.5rem);
}
```

## Dark Mode Support

Tokens can adapt to colour scheme preferences:

```css
/* Light mode (default) */
:root {
  --colour-background: var(--colour-neutral-95);
  --colour-text: var(--colour-neutral-20);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --colour-background: var(--colour-neutral-10);
    --colour-text: var(--colour-neutral-90);
  }
}
```

## Custom Token Creation

Follow these patterns when adding tokens:

1. **Use descriptive prefixes**: `--space-`, `--colour-`, `--text-`
2. **Include units in names**: `--space-1-5` clearly indicates 1.5rem
3. **Be consistent**: If using hyphens for decimals, use everywhere
4. **Document usage**: Add comments for non-obvious tokens
5. **Consider inheritance**: Use existing tokens as bases

```css
/* Example: Creating a new component token set */
:root {
  /* Badge tokens */
  --badge-padding: var(--space-0-25) var(--space-0-5);
  --badge-font-size: var(--text-size-0-75);
  --badge-radius: var(--radius-full);
  
  /* Reference existing tokens for consistency */
  --badge-bg-default: var(--colour-neutral-90);
  --badge-bg-primary: var(--colour-primary-50);
  --badge-bg-error: var(--colour-error-50);
}
```

## Next Steps

See how these tokens are applied in [Components](./04-components.md).