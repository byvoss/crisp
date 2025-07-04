# CRISP Documentation

> Code Rules for Intuitive Semantic Projects

## What is CRISP?

CRISP is two things:

1. **A CSS Methodology** - A set of rules and conventions for writing maintainable CSS (like BEM or OOCSS)
2. **A CSS Framework** - A ready-to-use implementation of these patterns

It prioritises semantic HTML, minimal CSS, and accessibility-first design.

## Quick Start

```html
<!-- CRISP in action -->
<article class="card as-stack with-shadow" 
  role="article"
  aria-label="Product card">
  <h2 class="text" style="--text-size: 1.5rem;">
    CRISP Pattern
  </h2>
  <button class="button with-interaction" 
    role="button"
    aria-label="Add to cart"
    style="--button-bg: var(--colour-primary-50);">
    Add to Cart
  </button>
</article>
```

## Core Principles

1. **Semantic class prefixes** (no prefix, `as-`, `with-`)
2. **Maximum 1 component + 1 layout + up to 3 properties per element**
3. **ARIA/role for functionality**
4. **Custom Properties for variations**
5. **WCAG-compliant by default**

## Documentation Structure

- [Introduction](./01-introduction.md) - Philosophy and principles
- [Core Concepts](./02-core-concepts.md) - Fundamental patterns
- [Design Tokens](./03-design-tokens.md) - Variables and naming conventions
- [Components](./04-components.md) - Common UI patterns
- [Implementation](./05-implementation.md) - Practical usage guide
- [Migration Guide](./06-migration.md) - Moving from BEM/OOCSS
- [API Reference](./07-api-reference.md) - Complete property list

## Browser Support

CRISP uses modern CSS features. Minimum browser requirements:
- Chrome 88+ (January 2021)
- Firefox 78+ (June 2020)
- Safari 14+ (September 2020)
- Edge 88+ (January 2021)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Licence

CRISP is open source under the MIT licence.