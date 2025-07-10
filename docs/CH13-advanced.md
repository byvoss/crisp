# Chapter 13: Rare Specimens - Advanced Patterns

*Or: The patterns that make senior developers smile*

## Beyond the Basics

You've mastered the fundamentals. Now let's explore patterns that solve complex problems with elegant simplicity. These are the "aha!" moments that make CRISP truly powerful.

## Dynamic Theme Switching

Not just light/dark, but infinite possibilities:

```css
/* Base theme architecture */
[data-theme] {
  /* Color tokens automatically adjust */
  --color-primary: var(--theme-primary, oklch(60% 0.20 250));
  --color-bg: var(--theme-bg, var(--color-surface));
  --color-text: var(--theme-text, var(--color-ink));
}

/* Predefined themes */
[data-theme="dark"] {
  --theme-bg: var(--color-ink);
  --theme-text: var(--color-surface);
  --theme-primary: oklch(from var(--color-primary) calc(l + 0.1) c h);
}

[data-theme="sepia"] {
  --theme-bg: oklch(95% 0.02 70);
  --theme-text: oklch(20% 0.05 70);
  --theme-primary: oklch(50% 0.15 30);
}

[data-theme="high-contrast"] {
  --theme-bg: white;
  --theme-text: black;
  --theme-primary: oklch(40% 0.3 250);
}
```

**The "Aha!"**: One data attribute changes everything. No class toggles on every element.

## Contextual Components

Components that adapt to their surroundings:

```css
/* Card knows where it lives */
.card {
  container-type: inline-size;
  
  /* Default layout */
  --layout: vertical;
  --padding: var(--space-1);
  
  /* In sidebar: compact */
  .sidebar & {
    --padding: var(--space-0-75);
    --text-size: 0.875rem;
  }
  
  /* In grid: responsive */
  .as-grid & {
    @container (min-width: 300px) {
      --padding: var(--space-1-5);
    }
  }
  
  /* In carousel: horizontal */
  .carousel & {
    --layout: horizontal;
    --media-aspect: 16/9;
  }
}
```

## State-Driven Animations

CSS-only state machines:

```css
/* Multi-step form wizard */
.wizard {
  /* Track current step */
  counter-reset: step var(--current-step, 1);
  
  /* Hide future steps */
  .step {
    display: none;
    
    /* Show current and past steps */
    &:nth-child(-n + var(--current-step)) {
      display: block;
    }
    
    /* Animate current step in */
    &:nth-child(var(--current-step)) {
      animation: slide-in 300ms ease-out;
      
      @starting-style {
        opacity: 0;
        transform: translateX(20px);
      }
    }
  }
  
  /* Progress indicator */
  &::before {
    content: "Step " counter(step) " of " var(--total-steps);
    display: block;
    margin-bottom: var(--space-2);
  }
}

/* Usage */
<div class="wizard" data-key="checkout-wizard" style="--current-step: 2; --total-steps: 4;">
  <div class="step">Step 1 content</div>
  <div class="step">Step 2 content (current)</div>
  <div class="step">Step 3 content (hidden)</div>
  <div class="step">Step 4 content (hidden)</div>
</div>
```

## Responsive Typography Scale

One token, infinite sizes:

```css
/* Fluid type scale */
:root {
  /* Base size responds to viewport */
  --text-base: clamp(
    1rem,                    /* Minimum */
    0.875rem + 0.5vw,       /* Fluid */
    1.125rem                /* Maximum */
  );
  
  /* Scale ratios */
  --text-scale: 1.25;      /* Major third */
  --text-scale-mobile: 1.2; /* Minor third */
  
  /* Calculated sizes */
  --text-sm: calc(var(--text-base) / var(--text-scale));
  --text-lg: calc(var(--text-base) * var(--text-scale));
  --text-xl: calc(var(--text-base) * pow(var(--text-scale), 2));
  --text-2xl: calc(var(--text-base) * pow(var(--text-scale), 3));
  --text-3xl: calc(var(--text-base) * pow(var(--text-scale), 4));
}

/* Component uses scale */
.heading {
  font-size: var(--size, var(--text-xl));
  
  /* Levels set their size */
  h1& { --size: var(--text-3xl); }
  h2& { --size: var(--text-2xl); }
  h3& { --size: var(--text-xl); }
  h4& { --size: var(--text-lg); }
}
```

## Advanced Grid Systems

Beyond basic grids:

```css
/* Auto-fit grid with ideal size */
.as-grid[data-ideal-size] {
  --ideal: var(--ideal-size, 250px);
  
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, var(--ideal)), 1fr)
  );
  
  /* Subgrid for alignment */
  > .card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3; /* header, content, footer */
    
    > * {
      grid-column: 1;
    }
  }
}

/* Masonry layout (when supported) */
@supports (grid-template-rows: masonry) {
  .as-masonry {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-rows: masonry;
    grid-gap: var(--space-1);
  }
}
```

## Scroll-Driven Experiences

No JavaScript required:

```css
/* Parallax scrolling */
.parallax-container {
  overflow-x: hidden;
  
  .layer {
    animation: parallax linear;
    animation-timeline: scroll();
    
    /* Background moves slower */
    &[data-speed="slow"] {
      --rate: 0.5;
    }
    
    /* Foreground moves faster */
    &[data-speed="fast"] {
      --rate: 1.5;
    }
    
    @keyframes parallax {
      to {
        transform: translateY(calc(var(--rate, 1) * 100px));
      }
    }
  }
}

/* Reveal on scroll */
.reveal {
  animation: reveal linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
  
  @keyframes reveal {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
}
```

## Complex Form Validation

Pure CSS form validation:

```css
/* Form tracks validity */
.form {
  /* Invalid fields count */
  counter-reset: errors;
  
  /* Style based on validity */
  &:has(:invalid:not(:placeholder-shown)) {
    --border-color: var(--color-error);
    
    /* Show error summary */
    &::before {
      content: counter(errors) " errors to fix";
      color: var(--color-error);
      display: block;
      margin-bottom: var(--space-1);
    }
  }
  
  /* Count each error */
  .input:invalid:not(:placeholder-shown) {
    counter-increment: errors;
    
    /* Show field error */
    & + .error {
      display: block;
    }
  }
  
  /* Disable submit when invalid */
  &:has(:invalid:not(:placeholder-shown)) .button[type="submit"] {
    opacity: 0.5;
    pointer-events: none;
  }
}
```

## Responsive Tables

Tables that actually work on mobile:

```css
/* Smart table */
.table {
  /* Desktop: normal table */
  @container (min-width: 600px) {
    display: table;
  }
  
  /* Mobile: card layout */
  @container (max-width: 599px) {
    display: block;
    
    thead { display: none; }
    
    tbody, tr, td {
      display: block;
    }
    
    tr {
      margin-bottom: var(--space-1);
      padding: var(--space-1);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }
    
    td {
      display: grid;
      grid-template-columns: 35% 65%;
      padding: var(--space-0-5) 0;
      
      /* Label from data attribute */
      &::before {
        content: attr(data-label);
        font-weight: var(--text-weight-medium);
      }
    }
  }
}

/* Usage */
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Name">Jane Smith</td>
      <td data-label="Email">jane@example.com</td>
      <td data-label="Role">Admin</td>
    </tr>
  </tbody>
</table>
```

## Print Styles

Often forgotten, always important:

```css
@media print {
  /* Hide non-content */
  .navigation,
  .sidebar,
  .footer,
  .no-print {
    display: none !important;
  }
  
  /* Optimize layout */
  .as-container {
    max-width: 100%;
    margin: 0;
    padding: 0;
  }
  
  /* Ensure readability */
  * {
    color: black !important;
    background: white !important;
  }
  
  /* Show link URLs */
  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.875em;
    opacity: 0.7;
  }
  
  /* Avoid breaks */
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
  }
  
  .card, .figure {
    page-break-inside: avoid;
  }
}
```

## Loading States

Pure CSS loading patterns:

```css
/* Skeleton screens */
.skeleton {
  @property --shimmer-x {
    syntax: "<percentage>";
    inherits: false;
    initial-value: -100%;
  }
  
  background: linear-gradient(
    90deg,
    var(--color-surface) 0%,
    oklch(from var(--color-surface) calc(l + 0.05) c h) 50%,
    var(--color-surface) 100%
  );
  background-size: 200% 100%;
  background-position-x: var(--shimmer-x);
  animation: shimmer 2s infinite;
  
  @keyframes shimmer {
    to { --shimmer-x: 100%; }
  }
}

/* Loading dots */
.loading-dots {
  &::after {
    content: "...";
    display: inline-block;
    width: 1.5em;
    overflow: hidden;
    vertical-align: bottom;
    animation: dots 1.5s steps(4) infinite;
  }
  
  @keyframes dots {
    to { text-indent: 1.5em; }
  }
}
```

## Debugging Helpers

Development-only visual aids:

```css
/* Debug mode */
[data-debug="true"] {
  /* Show all boxes */
  * {
    outline: 1px solid oklch(50% 0.2 300 / 0.2);
  }
  
  /* Label components */
  [class*="as-"]::before {
    content: attr(class);
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.75rem;
    background: oklch(50% 0.2 300);
    color: white;
    padding: 0.125rem 0.25rem;
    pointer-events: none;
    z-index: 9999;
  }
  
  /* Show custom property values */
  [style]::after {
    content: attr(style);
    display: block;
    font-size: 0.625rem;
    color: oklch(50% 0.2 300);
    margin-top: 0.5rem;
  }
}
```

## Performance Patterns

CSS-only performance optimization:

```css
/* Optimize large lists */
.large-list {
  /* Improve scroll performance */
  will-change: transform;
  
  /* Virtual scrolling hint */
  content-visibility: auto;
  contain-intrinsic-size: 0 48px;
  
  /* Stagger animations */
  > * {
    animation: fade-in 300ms ease-out backwards;
    animation-delay: calc(var(--index, 0) * 50ms);
  }
}

/* Reduce motion for performance */
@media (prefers-reduced-data: reduce) {
  * {
    animation-duration: 0ms !important;
    transition-duration: 0ms !important;
  }
  
  img, video {
    content-visibility: auto;
  }
}
```

## The Advanced Toolkit

You now have patterns for:
- **Dynamic theming** - Beyond light/dark
- **Contextual adaptation** - Smart components
- **State machines** - CSS-only logic
- **Fluid typography** - Responsive scales
- **Advanced grids** - Masonry and subgrid
- **Scroll effects** - No JS required
- **Form validation** - Pure CSS
- **Responsive tables** - Mobile-friendly
- **Print optimization** - Often forgotten
- **Loading states** - Skeleton screens
- **Debug helpers** - Development tools
- **Performance** - CSS optimization

**The Bottom Line**: These patterns show CRISP's true power - solving complex problems with elegant, maintainable CSS.

Ready for enterprise features?

→ Continue to [Chapter 14: Enterprise Garden - Scale & Architecture](./CH14-enterprise.md)