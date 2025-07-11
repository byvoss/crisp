# CRISP Documentation

> Code Rules for Intuitive Semantic Projects

## Welcome to CRISP

CRISP is both a CSS methodology and a framework that solves the complexity crisis in modern CSS. It prioritises semantic HTML, minimal classes, and accessibility-first design.

## Start Here

### 🚀 Quick Start
```html
<!-- The CRISP way: Clear, semantic, maintainable -->
<article class="card as-stack with-shadow" data-key="welcome-card">
  <h2 class="heading">Hello CRISP</h2>
  <p class="text">One blueprint, one layout, minimal properties.</p>
  <button class="button with-interaction" data-key="cta-button"
    style="--bg: var(--color-primary);">
    Get Started
  </button>
</article>
```

### 📚 Complete Documentation

The documentation is structured as a journey from discovery to mastery:

#### Part I: The Journey Begins
- [**Chapter 1: The Great CSS Conspiracy**](./CH01-discovery.md)  
  Why your CSS makes you question your life choices (and it's not your fault)

- [**Chapter 2: The Sacred Formula**](./CH02-solution.md)  
  CRISP's 1+2+3 formula - the most important equation you'll learn this year

- [**Chapter 3: Your First CRISP Garden**](./CH03-quickstart.md)  
  10 minutes to your first "aha!" moment

#### Part II: Core Architecture
- [**Chapter 4: Garden Beds - The Three-Layer Architecture**](./CH04-layers.md)  
  CSS @layer - the killer feature that changes everything

- [**Chapter 5: Planting Patterns - Blueprint Classes**](./CH05-blueprints.md)  
  The complete component system built on semantic HTML

- [**Chapter 6: Growing Arrangements - Layout Patterns**](./CH06-layouts.md)  
  Six patterns that solve 95% of layout needs

#### Part III: Advanced Concepts
- [**Chapter 7: Progressive Growth**](./CH07-progressive.md)  
  The three-tier enhancement strategy

- [**Chapter 8: Accessibility Garden**](./CH08-accessibility.md)  
  Making the web work for everyone (it's not optional)

- [**Chapter 9: The Garden's Foundation - Token System**](./CH09-tokens.md)  
  The complete design token architecture

- [**Chapter 10: Growing with Modern CSS**](./CH10-modern-css.md)  
  Container queries, :has(), and other magic

#### Part IV: Implementation & Scale
- [**Chapter 11: The Great Migration**](./CH11-migration.md)  
  Escape your CSS prison without losing your mind

- [**Chapter 12: Component Encyclopedia**](./CH12-reference.md)  
  Every blueprint, layout, and pattern documented

- [**Chapter 13: Rare Specimens - Advanced Patterns**](./CH13-advanced.md)  
  The patterns that make senior developers smile

- [**Chapter 14: Enterprise Garden - Scale & Architecture**](./CH14-enterprise.md)  
  From prototype to production without changing approach

#### Part V: Mastery
- [**Chapter 15: Master Gardener - Best Practices**](./CH15-best-practices.md)  
  The wisdom gained from a thousand projects

- [**Chapter 16: The Complete Garden Guide - Cheat Sheet**](./CH16-cheatsheet.md)  
  Everything CRISP on one page

### 🎯 For Different Audiences

**New to CRISP?**  
Start with Chapters 1-4 to understand the philosophy

**Want to use CRISP?**  
Jump to Chapter 16 (Cheatsheet) for immediate productivity

**Migrating existing CSS?**  
Chapter 14 has your escape plan

**Building a design system?**  
Chapters 5-11 cover all components in detail

## Core Principles at a Glance

1. **Semantic HTML First** - Use real elements, not div soup
2. **The Sacred Formula** - 1 blueprint + max 2 layouts + max 3 properties (1+2+3)
3. **Define/Use Pattern** - Define defaults, then use the tokens
4. **Data Attributes for Context** - Keep CSS for styling only
5. **Embrace the Cascade** - Work with CSS @layer, not against specificity

### Key Patterns

**Custom Properties Without Prefixes** (for blueprints):
```css
.button {
  /* 1. Define defaults */
  --bg: var(--color-neutral);
  --color: white;
  
  /* 2. Use the tokens */
  background: var(--bg);
  color: var(--color);
}
```

**Variants via Data Attributes**:
```html
<!-- All variants use data attributes -->
<button class="button" data-variant="primary">Primary</button>
<article class="card" data-variant="danger">Warning Card</article>
<form class="form" data-variant="loading">Loading...</form>
```

## Three Levels of CRISP

- **CRISP** (~50KB) - Pure CSS framework
- **CRISP Theme** (~60KB) - Adds theme switching
- **CRISP Enterprise** (~150KB) - Adds TypeScript & i18n

Same HTML works at all levels. Start simple, enhance as needed.

## Browser Support

CRISP uses modern CSS features:
- Chrome/Edge 88+ (January 2021)
- Firefox 78+ (June 2020)
- Safari 14+ (September 2020)

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## Quick Links

- 🏠 [Main README](../README.md)
- 📝 [License](../LICENSE)
- 🤝 [Contributing](../CONTRIBUTING.md)
- 🎯 [Cheatsheet](./CH16-cheatsheet.md)

---

*"Clarity is cleverness."* - The CRISP Philosophy