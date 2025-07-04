# Introduction to CRISP

## What is CRISP?

CRISP (Code Rules for Intuitive Semantic Projects) is a modern CSS architecture pattern that prioritises simplicity, semantics, and accessibility. Unlike traditional methodologies that focus on CSS organisation, CRISP encompasses the entire front-end development stack.

## The Problem with Current Approaches

### BEM (Block Element Modifier)
```html
<!-- Verbose and difficult to maintain -->
<div class="card card--featured card--large">
  <h2 class="card__title card__title--primary">Title</h2>
  <button class="card__button card__button--disabled">Click</button>
</div>
```

### Utility-First CSS
```html
<!-- Cluttered and non-semantic -->
<div class="flex flex-col p-4 m-2 bg-blue-50 rounded-lg shadow-md hover:shadow-lg">
  <h2 class="text-2xl font-bold text-blue-900">Title</h2>
</div>
```

### CRISP Solution
```html
<!-- Clean, semantic, and accessible -->
<article class="card as-stack with-shadow" role="article" aria-label="Featured content">
  <h2 class="text" style="--text-size: 1.5rem;">Title</h2>
  <button class="button with-interaction" role="button" disabled>Click</button>
</article>
```

## Core Philosophy

### 1. Semantic First
Every element should describe what it is, not how it looks. Use proper HTML elements and ARIA attributes to convey meaning.

### 2. Semantic Class Prefixes
Classes are prefixed to indicate their purpose:
- **No prefix** - Core components (card, button, nav)
- **as-** - Layout modes (as-stack, as-grid, as-cluster)
- **with-** - Additional properties (with-shadow, with-border)

### 3. Custom Properties for Variation
Instead of modifier classes, use CSS custom properties for variations:
```html
<!-- Not this -->
<button class="button button--large button--primary">

<!-- But this -->
<button class="button" style="--button-size: large; --button-bg: var(--colour-primary-50);">
```

### 4. WCAG by Default
Accessibility isn't an afterthought. Every pattern includes proper ARIA attributes and follows WCAG guidelines.

## Key Benefits

### Developer Experience
- **Self-documenting code** - HTML reads like a specification
- **No naming debates** - Clear conventions for everything
- **Faster development** - Less time thinking about class names

### Performance
- **80% smaller CSS** - No duplicate modifier classes
- **Flat selectors** - Better performance, no specificity wars
- **Tree-shakeable** - Only include what you use

### Maintainability
- **Clear separation** - Layout, mechanism, and variation are distinct
- **Easy refactoring** - Change styles without touching HTML classes
- **Version control friendly** - Fewer merge conflicts

## When to Use CRISP

CRISP is ideal for:
- New projects that value simplicity
- Teams that prioritise accessibility
- Applications requiring high performance
- Projects with frequent design iterations

CRISP may not suit:
- Legacy systems with established patterns
- Teams heavily invested in existing frameworks
- Projects requiring IE11 support

## Next Steps

Continue to [Core Concepts](./02-core-concepts.md) to understand the fundamental patterns of CRISP.