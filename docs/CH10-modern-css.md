# Chapter 10: Garden Tools - Modern CSS Features

*Or: The superpowers you forgot CSS had*

## The CSS Renaissance

While we were fighting with JavaScript frameworks, CSS quietly became magical. Features that required entire libraries are now one line of CSS. Let's explore the tools that make CRISP possible.

## The :has() Selector - Parent Selection Finally!

Remember needing JavaScript to style a parent based on its children? Not anymore:

```css
/* Form knows when it has errors */
.form:has(.input:invalid:not(:placeholder-shown)) {
  --border-color: var(--color-error);
  --bg: oklch(from var(--color-error) 0.98 calc(c * 0.1) h);
}

/* Card adapts to content */
.card:has(.media) {
  --layout: horizontal;
  --padding: 0;
}

/* Navigation knows its state */
.navigation:has([aria-current="page"]) {
  --indicator-opacity: 1;
}

/* Container aware of child count */
.as-grid:has(> :nth-child(5)) {
  --grid-columns: 3; /* More items = more columns */
}
```

**The "Aha!"**: CSS can now look inside elements and make decisions. No JavaScript state management needed.

### Real-World :has() Patterns

```css
/* Disable form while submitting */
.form:has(.button[aria-busy="true"]) {
  pointer-events: none;
  opacity: 0.6;
}

/* Style labels with focus */
.field:has(.input:focus) .label {
  --color: var(--color-primary);
}

/* Empty state detection */
.list:not(:has(li)) {
  &::after {
    content: "No items yet";
    display: block;
    text-align: center;
    opacity: 0.5;
  }
}
```

## @starting-style - Entry Animations Without JavaScript

Animate elements when they first appear:

```css
/* Dialog animation */
dialog {
  @property --scale {
    syntax: "<number>";
    inherits: false;
    initial-value: 1;
  }
  
  opacity: 1;
  transform: scale(var(--scale)) translateY(0);
  transition: all 300ms ease-out;
  
  @starting-style {
    opacity: 0;
    --scale: 0.9;
    transform: scale(var(--scale)) translateY(20px);
  }
}

/* Smooth entry for dynamically added elements */
.notification {
  animation: slide-in 300ms ease-out;
  
  @starting-style {
    opacity: 0;
    transform: translateX(100%);
  }
}
```

**The "Aha!"**: Elements animate in automatically. No JavaScript classList manipulation.

## Container Queries - True Component Responsiveness

Forget viewport-based breakpoints. Components respond to their container:

```css
/* Card container */
.card {
  container-type: inline-size;
}

/* Card adapts to available space */
@container (min-width: 400px) {
  .card {
    --layout: horizontal;
    --media-width: 40%;
  }
}

@container (min-width: 600px) {
  .card {
    --padding: var(--space-2);
    --heading-size: var(--text-size-1-5);
  }
}

/* Typography that scales with container */
.hero {
  container-type: inline-size;
}

@container (min-width: 800px) {
  .hero .heading {
    --size: clamp(2rem, 5cqi, 4rem); /* cqi = container query units */
  }
}
```

**The "Aha!"**: Components are truly reusable. Same component works in sidebar or main content.

## Native Nesting - Write Less, Express More

CSS now supports nesting without preprocessors:

```css
.button {
  background: var(--bg);
  
  /* States nested */
  &:hover {
    --bg: oklch(from var(--bg) calc(l + 0.1) c h);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  /* Child elements */
  .icon {
    width: 1.25em;
    height: 1.25em;
  }
  
  /* Modifiers */
  &[data-variant="danger"] {
    --bg: var(--color-error);
  }
}
```

## Subgrid - Alignment Perfection

Children align to parent grids:

```css
/* Parent defines the grid */
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: var(--space-2);
}

/* Children participate in parent grid */
.card {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
  
  /* Card contents align to main grid */
  .media { grid-column: 1; }
  .content { grid-column: 2; }
  .actions { grid-column: 3; }
}
```

**The "Aha!"**: Perfect alignment across nested components without calculating positions.

## ::backdrop - Native Modal Backgrounds

No more overlay divs:

```css
/* Dialog backdrop */
dialog::backdrop {
  @property --blur {
    syntax: "<length>";
    inherits: false;
    initial-value: 4px;
  }
  
  background: oklch(0% 0 0 / 0.5);
  backdrop-filter: blur(var(--blur));
  animation: fade-in 200ms ease-out;
}

/* Fullscreen backdrop */
.video:fullscreen::backdrop {
  background: var(--color-ink);
}
```

## field-sizing - Auto-Growing Form Fields

Textareas that grow with content:

```css
.textarea {
  /* Base constraints */
  min-height: 3rem;
  max-height: 20rem;
  
  /* Magic property */
  field-sizing: content;
  
  /* Smooth growth */
  transition: height 200ms ease-out;
}
```

**The "Aha!"**: No JavaScript textarea auto-resize scripts. It just works.

## Scroll-Driven Animations

Animations tied to scroll position:

```css
/* Progress bar that tracks reading */
.reading-progress[data-key="progress-indicator"] {
  animation: grow linear;
  animation-timeline: scroll();
  transform-origin: left;
  
  @keyframes grow {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
}

/* Elements that fade in on scroll */
.fade-in {
  animation: reveal linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
  
  @keyframes reveal {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

## color-mix() - Dynamic Color Blending

Mix colors in CSS:

```css
/* Blend two colors */
.blended {
  --bg: color-mix(
    in oklch,
    var(--color-primary) 70%,
    var(--color-secondary)
  );
}

/* Create tints and shades */
.tinted {
  --bg-light: color-mix(
    in oklch,
    var(--color-primary),
    white 80%
  );
  
  --bg-dark: color-mix(
    in oklch,
    var(--color-primary),
    black 20%
  );
}
```

## @scope - Style Isolation

Limit styles to specific parts of the DOM:

```css
@scope (.widget) to (.widget-end) {
  /* Styles only apply within scope */
  .title {
    color: var(--color-primary);
  }
  
  /* Won't affect .title outside widget */
}

/* Donut scope - exclude descendants */
@scope (.card) to (.card .card) {
  /* Styles cards but not nested cards */
}
```

## Logical Properties - Internationalization Ready

Write once, work in any direction:

```css
.component {
  /* Instead of margin-left/right */
  margin-inline: auto;
  
  /* Instead of padding-top/bottom */
  padding-block: var(--space-2);
  
  /* Instead of left/right */
  inset-inline-start: 0;
  
  /* Instead of width/height */
  inline-size: 100%;
  block-size: auto;
}
```

**The "Aha!"**: Your layout automatically flips for RTL languages.

## Preference Queries - Respect User Choices

```css
/* Motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Contrast preferences */
@media (prefers-contrast: high) {
  :root {
    --color-primary: oklch(50% 0.3 250);
    --shadow-strength: 0; /* Remove shadows */
  }
}

/* Data saving mode */
@media (prefers-reduced-data: reduce) {
  .media {
    content-visibility: auto;
  }
}
```

## The Modern CSS Toolkit

You now have:
- **:has()** - Parent selection and state detection
- **@starting-style** - Entry animations
- **Container queries** - Component responsiveness
- **Native nesting** - Cleaner code
- **Subgrid** - Perfect alignment
- **::backdrop** - Modal overlays
- **field-sizing** - Auto-growing fields
- **Scroll animations** - Scroll-triggered effects
- **color-mix()** - Dynamic colors
- **@scope** - Style isolation
- **Logical properties** - i18n ready

All built into browsers. No libraries needed.

**The Bottom Line**: Modern CSS is more powerful than most JavaScript frameworks. Use it.

Ready to escape your legacy CSS?

→ Continue to [Chapter 11: Transplanting - Migration Without Wilting](./CH11-migration.md)