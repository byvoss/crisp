# CRISP Pattern Adoption Guide

## Using CRISP with Other Frameworks

CRISP's pattern can enhance any CSS framework or design system. Here's how to adopt CRISP principles in your existing setup.

## CRISP + Tailwind CSS

Combine CRISP's semantic patterns with Tailwind's utilities:

```html
<!-- Pure Tailwind -->
<div class="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">

<!-- CRISP Pattern with Tailwind -->
<article class="card as-stack with-shadow flex flex-col gap-4 p-6">
```

Configure Tailwind to respect CRISP conventions:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Use CRISP token naming
      spacing: {
        '0-25': '0.25rem',
        '0-5': '0.5rem',
        '1-0': '1rem',
        '1-5': '1.5rem',
      }
    }
  },
  // Preserve CRISP classes
  safelist: [
    { pattern: /^as-/ },
    { pattern: /^with-/ }
  ]
}
```

## CRISP + Bootstrap

Layer CRISP semantics over Bootstrap components:

```html
<!-- Bootstrap card with CRISP pattern -->
<article class="card as-stack" role="article">
  <div class="card-body">
    <h5 class="card-title text">Title</h5>
    <button class="button btn btn-primary with-interaction">
      Action
    </button>
  </div>
</article>
```

```scss
// Extend Bootstrap with CRISP patterns
.as-stack {
  @extend .d-flex;
  @extend .flex-column;
  gap: var(--stack-gap, $spacer);
}

.with-shadow {
  @extend .shadow;
}
```

## CRISP + Material-UI (React)

Implement CRISP patterns in component libraries:

```jsx
// CRISP-styled Material-UI component
import { Card, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CrispCard = styled(Card)(({ theme }) => ({
  '&.as-stack': {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--stack-gap, 1rem)',
  },
  '&.with-shadow': {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'var(--shadow-colour, rgba(0,0,0,0.1))',
      filter: 'blur(8px)',
      transform: 'translateY(4px)',
    }
  }
}));

// Usage
<CrispCard 
  className="card as-stack with-shadow"
  role="article"
  aria-label="Product card">
  <Typography className="text">
    CRISP + Material-UI
  </Typography>
  <Button className="button with-interaction">
    Action
  </Button>
</CrispCard>
```

## CRISP + CSS-in-JS

Use CRISP patterns with Emotion/Styled Components:

```javascript
import styled from '@emotion/styled';

// CRISP pattern as styled component
const Card = styled.article`
  &.as-stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap, 1rem);
  }
  
  &.with-shadow::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--shadow-colour, rgba(0,0,0,0.15));
    filter: blur(var(--shadow-blur, 8px));
    transform: translateY(var(--shadow-y, 4px));
    z-index: -1;
  }
`;

// Usage maintains CRISP semantics
<Card className="card as-stack with-shadow" role="article">
  {children}
</Card>
```

## Framework Integration Principles

### 1. Preserve Semantic HTML
Always maintain CRISP's semantic HTML approach:
```html
<!-- Good: Semantic + Framework -->
<article class="card mdl-card as-stack" role="article">

<!-- Avoid: Framework-only -->
<div class="mdl-card mdl-shadow--2dp">
```

### 2. Layer Patterns
CRISP patterns can layer over framework classes:
```html
<button class="button btn btn-primary with-interaction with-shadow">
  <!-- CRISP pattern + Bootstrap styling -->
</button>
```

### 3. Custom Properties Bridge
Use CSS custom properties to bridge frameworks:
```css
/* Map framework variables to CRISP tokens */
:root {
  /* Bootstrap to CRISP */
  --space-1-0: var(--bs-spacing-3);
  --colour-primary-50: var(--bs-primary);
  
  /* Tailwind to CRISP */
  --space-1-0: theme('spacing.4');
  --colour-primary-50: theme('colors.blue.500');
}
```

### 4. Progressive Enhancement
Start with framework components, enhance with CRISP:
```html
<!-- Stage 1: Framework -->
<div class="mui-panel">

<!-- Stage 2: Add CRISP semantics -->
<article class="mui-panel card" role="article">

<!-- Stage 3: Full CRISP pattern -->
<article class="mui-panel card as-stack with-shadow" role="article">
```

## Creating CRISP Adapters

Build adapters for seamless integration:

```javascript
// crisp-adapter-tailwind.js
export const crispTailwind = {
  'as-stack': 'flex flex-col gap-4',
  'as-grid': 'grid gap-4 grid-cols-auto-fit',
  'as-cluster': 'flex flex-wrap gap-2',
  'with-shadow': 'shadow-lg',
  'with-border': 'border border-gray-200',
  'with-padding': 'p-6',
};

// Usage with clsx
import clsx from 'clsx';
import { crispTailwind } from './crisp-adapter-tailwind';

<article className={clsx(
  'card',
  crispTailwind['as-stack'],
  crispTailwind['with-shadow']
)}>
```

## Benefits of Adoption

1. **Better Semantics** - Meaningful class names alongside utility classes
2. **Improved Accessibility** - CRISP's ARIA-first approach
3. **Consistent Patterns** - Unified approach across different frameworks
4. **Future-Proof** - Pattern survives framework changes
5. **Team Communication** - Shared vocabulary across projects

## License Compatibility

CRISP is MIT licensed and compatible with all major frameworks. Feel free to adopt, adapt, and integrate CRISP patterns into your projects and frameworks.