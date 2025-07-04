# Modern CSS Features in CRISP

CRISP embraces modern CSS while maintaining backwards compatibility through progressive enhancement.

## Browser Support Strategy

### Core CRISP (crisp.css)
- Works in all modern browsers (2021+)
- No build tools required
- Graceful degradation

### Modern CRISP (crisp-modern.css)
- Cutting-edge features
- Progressive enhancement
- Feature detection with `@supports`

## Container Queries

Component-responsive design instead of viewport-responsive:

```css
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    --card-padding: var(--space-2-0);
  }
}
```

**Browser Support**: Chrome 105+, Safari 16+, Firefox 110+

## CSS Nesting

Write cleaner, more maintainable CSS:

```css
.button {
  padding: var(--button-padding);
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &.with-interaction {
    transition: transform 150ms;
  }
}
```

**Browser Support**: Chrome 112+, Safari 16.5+, Firefox 117+

## CSS Scope

Isolate component styles:

```css
@scope (.card) {
  /* Styles only apply within .card */
  h2 { 
    font-size: 1.5rem; 
  }
  
  /* Nested scoping */
  @scope (.content) {
    p { 
      line-height: 1.6; 
    }
  }
}
```

**Browser Support**: Chrome 118+, Safari 17.4+ (limited)

## :has() Selector

Parent selection and conditional styling:

```css
/* Style field when input is invalid */
.field:has(input:invalid) {
  --border-colour: var(--colour-error-50);
}

/* Button with icon */
.button:has(svg) {
  gap: var(--space-0-5);
}
```

**Browser Support**: Chrome 105+, Safari 15.4+, Firefox 121+

## Cascade Layers

Control specificity with layers:

```css
@layer reset, tokens, components, utilities;

@layer components {
  .button {
    background: var(--button-bg);
  }
}

@layer utilities {
  .hidden {
    display: none !important;
  }
}
```

**Browser Support**: All modern browsers

## Logical Properties

Support all writing modes:

```css
.card {
  margin-block: var(--space-1-0);      /* top/bottom */
  padding-inline: var(--space-1-5);    /* left/right */
  border-start-start-radius: var(--radius-md); /* top-left in LTR */
}
```

**Browser Support**: All modern browsers

## Modern Color Functions

Advanced color manipulation:

```css
.with-shadow {
  box-shadow: 0 4px 8px 
    color-mix(in srgb, var(--shadow-colour) 20%, transparent);
}

.button:hover {
  background: color-mix(
    in oklab, 
    var(--button-bg) 90%, 
    white
  );
}
```

**Browser Support**: Chrome 111+, Safari 16.2+, Firefox 113+

## Feature Detection

Use `@supports` for progressive enhancement:

```css
/* Fallback */
.card {
  margin: 1rem;
}

/* Modern enhancement */
@supports (container-type: inline-size) {
  .card {
    container-type: inline-size;
  }
  
  @container (min-width: 400px) {
    .card {
      margin: 2rem;
    }
  }
}
```

## Subgrid

Better nested layouts:

```css
.as-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* Align with parent grid */
}
```

**Browser Support**: Firefox 71+, Chrome 117+, Safari 16+

## View Transitions

Smooth state changes:

```css
.card {
  view-transition-name: card;
}

::view-transition-old(card) {
  animation: fade-out 200ms;
}

::view-transition-new(card) {
  animation: fade-in 200ms;
}
```

**Browser Support**: Chrome 111+ (limited)

## Using Modern Features

### 1. Progressive Enhancement

```html
<!-- Link both versions -->
<link rel="stylesheet" href="crisp.css">
<link rel="stylesheet" href="crisp-modern.css" 
      media="(prefers-reduced-motion: no-preference)">
```

### 2. Feature Detection

```javascript
// Check for container query support
if (CSS.supports('container-type: inline-size')) {
  document.documentElement.classList.add('has-container-queries');
}
```

### 3. Polyfills

Some features can be polyfilled:
- Container Queries: `container-query-polyfill`
- `:has()`: Limited polyfills available
- CSS Nesting: PostCSS plugin

## Future CSS in CRISP

We're tracking these upcoming features:

- **Anchor Positioning**: Position elements relative to others
- **Style Queries**: Query custom properties
- **CSS Toggles**: Stateful CSS without JavaScript
- **Scroll-driven Animations**: Animate based on scroll

## Recommendation

1. **Use `crisp.css`** for production sites needing broad support
2. **Use `crisp-modern.css`** for:
   - Internal tools
   - Progressive web apps
   - Sites targeting modern browsers
3. **Combine both** with feature detection for best experience