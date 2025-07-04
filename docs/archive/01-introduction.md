# Introduction to CRISP

## What is CRISP?

CRISP (Code Rules for Intuitive Semantic Projects) is a modern CSS architecture pattern that prioritises simplicity, semantics, and accessibility. Unlike traditional methodologies that focus on CSS organisation, CRISP encompasses the entire front-end development stack.

## The Problem with Current Approaches

### BEM (Block Element Modifier) - 2013
*Over a decade old, created before CSS custom properties existed. Results in monstrosities like `sidebar__navigation-item--active--highlighted` or `card__header__title--primary--large`. The double-dash and double-underscore syntax creates a morse code that makes your eyes bleed. One typo in those underscores and you're debugging for hours.*


### SMACSS (Scalable and Modular Architecture) - 2011
*13 years old, predates flexbox and grid. Forces you to categorise every single style: Is this `.l-header-inner` or `.mod-header-inner`? Should it be `.is-active` or `.state-active`? You'll need a PhD in SMACSS taxonomy just to name a button. Teams spend more time debating categories than actually building.*


### OOCSS (Object-Oriented CSS) - 2009
*15 years old, created when IE6 was still supported. A simple card becomes `<div class="box skin-white corners-rounded shadow-large padding-medium margin-small border-grey text-dark bg-gradient float-left clearfix">`. That's 11 classes before you've even added your content. Your HTML looks like someone spilled alphabet soup.*

### Atomic CSS - 2013
*One class per CSS property - taken to its logical extreme: `.mt-10 .mr-15 .mb-10 .ml-15 .pt-5 .pr-8 .pb-5 .pl-8 .bg-blue .c-white .fs-16 .fw-bold .lh-1-5 .br-4 .bs-lg`. That's 15 classes just for a basic button. Now add responsive variants: `.sm:mt-5 .md:mt-10 .lg:mt-15`. Your HTML is now longer than your actual content.*


### Utility-First CSS (Tailwind) - 2017
*More recent but throws semantics out the window. A navbar becomes `<div class="flex items-center justify-between px-4 py-2 bg-gray-800 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 transition-all duration-300 hover:shadow-xl md:px-6 lg:px-8">`. That's 18 classes for a navbar. Your components are now indistinguishable walls of utilities. "Find the navbar" becomes a game of Where's Waldo in your codebase.*


### CRISP Solution
*Built for 2025 and beyond - semantic HTML, accessibility baked in, and actually simple to use and easy to learn*
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

> **The "Aha!" Moment:** Your HTML becomes self-documenting. A new developer can read `<article class="card">` and instantly know it's a content card - not a `<div class="bx-4c">`. The code explains itself without comments or documentation lookups.

### 2. Semantic Class Prefixes
Classes are prefixed to indicate their purpose in a human readable way:
- **No prefix** - Core components (card, button, nav)
- **as-** - Layout modes (as-stack, as-grid, as-cluster)
- **with-** - Additional properties (with-shadow, with-border)

> **The "Aha!" Moment:** You can read classes like English sentences! `class="card as-grid with-shadow"` literally reads as "a card displayed as grid with shadow". No more mental translation from `card--grid-layout shadow-md` or wondering what `bx-shd-2` means.

### 3. Custom Properties for Variation
Instead of modifier classes, use CSS custom properties for variations:
```html
<!-- Not this (BEM approach) -->
<button class="button button--large button--primary">

<!-- CRISP (Pure CSS Framework) -->
<button class="button" style="--button-size: large; --button-bg: var(--colour-primary-50);">

<!-- CRISP Theme (With Theme System) -->
<button class="button" style="--button-size: large; --button-bg: var(--colour-primary-50);">

<!-- CRISP Enterprise (Full Framework) -->
<button class="button" data-component="button" style="--button-variant: primary; --button-size: large;">
```

> **The "Aha!" Moment:** Same semantic HTML across all levels!
> - **CRISP**: Full CSS framework with all components
> - **CRISP Theme**: Adds dynamic theme switching  
> - **CRISP Enterprise**: Enhanced with type validation, i18n, and reactive updates
> 
> Each level builds upon the previous WITHOUT changing your HTML structure. Progressive enhancement at its finest!
```css
.button {
  /* Component defines which properties it accepts */
  padding: var(--button-padding, var(--space-1-0));
  background: var(--button-bg, var(--colour-neutral-90));
  font-size: var(--button-size, 1rem);
}
```

When you set `style="--button-bg: var(--colour-primary-50);"`, you're overriding just that specific property for this instance. No `!important` needed - CSS cascade handles it naturally. This is K.I.S.S. in action: components expose their customisation points explicitly.

### 4. WCAG by Default
Accessibility isn't an afterthought. Every pattern includes proper ARIA attributes and follows WCAG guidelines.

> **The "Aha!" Moment:** You get accessibility for free! Using `<button class="button">` automatically includes focus states, keyboard navigation, and screen reader support. No extra `a11y-button` class or plugin needed - it just works because we use the right HTML elements.

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