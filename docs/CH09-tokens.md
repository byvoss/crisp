# Chapter 9: The Root System - Design Tokens & Color Magic

*Or: How 10 colors become infinite possibilities*

## The Token Revolution

Remember managing 300 color variables in Sass? CRISP starts with just 10. Yes, ten. And from those ten, you get hundreds of perfectly calculated variations.

## The 10-Color System

Here's the entire CRISP color system:

```css
:root {
  /* The Brand Trinity (3 colors) */
  --color-primary:   oklch(60% 0.20 250);  /* Your main brand */
  --color-secondary: oklch(55% 0.15 280);  /* Supporting actor */
  --color-accent:    oklch(65% 0.25 200);  /* Attention grabber */
  
  /* The Semantic Quartet (4 colors) */
  --color-error:   oklch(60% 0.22 25);   /* Danger/Error */
  --color-warning: oklch(75% 0.20 90);   /* Warning/Caution */
  --color-success: oklch(65% 0.20 145);  /* Success/Good */
  --color-info:    oklch(60% 0.15 220);  /* Info/Notice */
  
  /* The Neutral Trio (3 colors) */
  --color-neutral: oklch(50% 0.01 250);  /* Mid-gray */
  --color-surface: oklch(98% 0.00 0);    /* Background */
  --color-ink:     oklch(10% 0.01 250);  /* Text */
}
```

That's it. Ten colors. Now watch the magic.

## Automatic Color Variations

From those 10 base colors, CRISP calculates everything else:

```css
/* Every interactive element gets automatic states */
.link {
  @property --color {
    syntax: "<color>";
    inherits: false;
    initial-value: var(--color-primary);
  }
  
  color: var(--color);
  
  /* Hover: 10% lighter */
  &:hover {
    --color: oklch(from var(--color) calc(l + 0.1) c h);
  }
  
  /* Active: 10% darker */
  &:active {
    --color: oklch(from var(--color) calc(l - 0.1) c h);
  }
  
  /* Visited: Hue shift */
  &:visited {
    --color: oklch(from var(--color) l c calc(h + 30));
  }
}
```

**The "Aha!"**: No more `--color-primary-hover`, `--color-primary-active`, `--color-primary-disabled`. The browser calculates them all.

## Background Variations

Need subtle backgrounds? Calculated:

```css
/* Alert backgrounds - super light versions */
.alert {
  /* Error alert */
  &[data-variant="error"] {
    --bg: oklch(from var(--color-error) 0.95 calc(c * 0.2) h);
    --border: oklch(from var(--color-error) 0.8 calc(c * 0.5) h);
    --color: var(--color-error);
  }
  
  /* Success alert */
  &[data-variant="success"] {
    --bg: oklch(from var(--color-success) 0.95 calc(c * 0.2) h);
    --border: oklch(from var(--color-success) 0.8 calc(c * 0.5) h);
    --color: var(--color-success);
  }
}
```

## Text on Colored Backgrounds

Automatic contrast calculation:

```css
/* Ensure readable text on any background */
.on-primary {
  /* If primary is dark, use light text */
  --color: oklch(from var(--color-primary) 
    calc(l < 0.5 ? 0.95 : 0.05) 0 h);
}

/* Or use color-contrast() when supported */
.smart-contrast {
  color: color-contrast(var(--bg) vs white, black);
}
```

## Dark Mode with 10 Colors

Watch how simple dark mode becomes:

```css
/* Light mode (default) */
:root {
  --color-bg: var(--color-surface);    /* White */
  --color-text: var(--color-ink);      /* Black */
}

/* Dark mode - just swap two variables */
[data-theme="dark"] {
  --color-bg: var(--color-ink);        /* Black */
  --color-text: var(--color-surface);  /* White */
  
  /* Adjust semantic colors for dark backgrounds */
  --color-primary: oklch(from var(--color-primary) calc(l + 0.1) c h);
  --color-error: oklch(from var(--color-error) calc(l + 0.1) c h);
  /* etc */
}
```

## The Power of OKLCH

Why OKLCH instead of RGB or HSL?

### Perceptual Uniformity

```css
/* In HSL, these look different despite same lightness */
hsl(0, 100%, 50%);    /* Red - looks darker */
hsl(60, 100%, 50%);   /* Yellow - looks lighter */

/* In OKLCH, same lightness = same perceived brightness */
oklch(60% 0.20 25);   /* Red */
oklch(60% 0.20 90);   /* Yellow */
/* Both appear equally bright! */
```

### Predictable Color Math

```css
/* Create a whole palette from one color */
.color-scale {
  /* Base */
  --color-base: oklch(60% 0.20 250);
  
  /* Lighter shades */
  --color-10: oklch(from var(--color-base) 0.95 calc(c * 0.2) h);
  --color-20: oklch(from var(--color-base) 0.85 calc(c * 0.4) h);
  --color-30: oklch(from var(--color-base) 0.75 calc(c * 0.6) h);
  
  /* Darker shades */
  --color-70: oklch(from var(--color-base) 0.35 c h);
  --color-80: oklch(from var(--color-base) 0.25 c h);
  --color-90: oklch(from var(--color-base) 0.15 c h);
}
```

## Spacing Tokens

Consistent rhythm throughout:

```css
:root {
  /* Mathematical scale */
  --space-0-25: 0.25rem;  /*  4px - Hairline */
  --space-0-5:  0.5rem;   /*  8px - Tight */
  --space-0-75: 0.75rem;  /* 12px - Snug */
  --space-1:    1rem;     /* 16px - Default */
  --space-1-5:  1.5rem;   /* 24px - Comfortable */
  --space-2:    2rem;     /* 32px - Spacious */
  --space-3:    3rem;     /* 48px - Generous */
  --space-4:    4rem;     /* 64px - Massive */
}
```

Use them everywhere:

```css
.component {
  @property --padding {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-1);
  }
  
  @property --gap {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-1);
  }
  
  padding: var(--padding);
  gap: var(--gap);
}
```

## Typography Tokens

Type system with purpose:

```css
:root {
  /* Font stacks */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-mono: ui-monospace, 'SF Mono', monospace;
  
  /* Size scale */
  --text-size-0-75: 0.75rem;    /* Small */
  --text-size-1:    1rem;        /* Base */
  --text-size-1-25: 1.25rem;    /* Large */
  --text-size-1-5:  1.5rem;      /* H3 */
  --text-size-2:    2rem;        /* H2 */
  --text-size-3:    3rem;        /* H1 */
  
  /* Weights */
  --text-weight-normal: 400;
  --text-weight-medium: 500;
  --text-weight-bold: 700;
  
  /* Leading */
  --text-leading-tight: 1.25;
  --text-leading-normal: 1.5;
  --text-leading-relaxed: 1.75;
}
```

## Effect Tokens

Consistent visual effects:

```css
:root {
  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows using OKLCH */
  --shadow-sm: 0 1px 2px oklch(0% 0 0 / 0.05);
  --shadow-md: 0 4px 6px oklch(0% 0 0 / 0.1);
  --shadow-lg: 0 10px 15px oklch(0% 0 0 / 0.15);
  --shadow-xl: 0 20px 25px oklch(0% 0 0 / 0.2);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
```

## Custom Token Creation

Need more than 10 colors? Add them:

```css
:root {
  /* Project-specific additions */
  --color-brand-alt: oklch(45% 0.25 320);  /* Special purple */
  
  /* Chart colors */
  --color-chart-1: oklch(65% 0.20 120);  /* Green */
  --color-chart-2: oklch(70% 0.18 60);   /* Orange */
  --color-chart-3: oklch(55% 0.22 300);  /* Purple */
}

/* They still get automatic variations! */
.chart-bar {
  --bg: var(--color-chart-1);
  
  &:hover {
    --bg: oklch(from var(--color-chart-1) calc(l + 0.1) c h);
  }
}
```

## Token Usage Patterns

### Component Tokens

```css
.card {
  /* Define all tokens with @property */
  @property --bg {
    syntax: "<color>";
    inherits: false;
    initial-value: var(--color-surface);
  }
  
  @property --padding {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-1-5);
  }
  
  @property --radius {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--radius-lg);
  }
  
  /* Use them */
  background: var(--bg);
  padding: var(--padding);
  border-radius: var(--radius);
}
```

### Responsive Tokens

```css
/* Tokens can be responsive */
:root {
  --space-section: clamp(2rem, 5vw, 4rem);
  --text-hero: clamp(2rem, 5vw + 1rem, 4rem);
}
```

### Calculated Relationships

```css
/* Related values stay in sync */
.component {
  --base-size: 1rem;
  --padding: calc(var(--base-size) * 0.75);
  --gap: calc(var(--base-size) * 0.5);
  --radius: calc(var(--base-size) * 0.25);
}
```

## The Token Philosophy

1. **Start with 10** - Cover 90% of needs
2. **Calculate variations** - Don't define them
3. **Use OKLCH** - Perceptual uniformity
4. **Type everything** - @property for safety
5. **Compose tokens** - Build relationships

## Your Token Toolkit

You now have:
- **10 colors** → Hundreds of variations
- **8 spacing values** → Consistent rhythm
- **6 text sizes** → Clear hierarchy
- **5 radii** → Consistent corners
- **4 shadows** → Depth system
- **3 transitions** → Smooth motion

That's your entire design system. No more, no less.

**The Bottom Line**: Stop managing hundreds of variables. Start with 10 colors and let CSS do the math.

Ready to see what modern CSS can really do?

→ Continue to [Chapter 10: Garden Tools - Modern CSS Features](./CH10-modern-css.md)