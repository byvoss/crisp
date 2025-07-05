# CRISP Documentation

> Code Rules for Intuitive Semantic Projects

## Welcome to CRISP

CRISP is both a CSS methodology and a framework that solves the complexity crisis in modern CSS. It prioritises semantic HTML, minimal classes, and accessibility-first design.

## Start Here

### 🚀 Quick Start
```html
<!-- The CRISP way: Clear, semantic, maintainable -->
<article class="card as-stack with-shadow">
  <h2 class="heading">Hello CRISP</h2>
  <p class="text">One component, one layout, minimal properties.</p>
  <button class="button with-interaction" 
    style="--button-bg: var(--color-primary-50);">
    Get Started
  </button>
</article>
```

### 📚 Complete Documentation

The documentation is structured as a journey from problem to solution:

#### Part I: Understanding the Problem
- [**Chapter 1: Why Your CSS Makes You Cry**](./C01-the-problem.md)  
  The mess we've made with BEM, Atomic CSS, and other methodologies

- [**Chapter 2: CRISP - CSS That Actually Makes Sense**](./C02-the-solution.md)  
  How CRISP solves these problems with radical simplicity

#### Part II: Core Principles
- [**Chapter 3: The Five Commandments of CRISP**](./C03-principles.md)  
  The sacred rules that keep your CSS sane

- [**Chapter 4: Anatomy of a CRISP Component**](./C04-anatomy.md)  
  Understanding the structure and formula

- [**Chapter 5: Design Tokens - Your Single Source of Truth**](./C05-tokens.md)  
  The variable system that powers everything

#### Part III: Building Blocks
- [**Chapter 6: Layouts That Don't Make You Think**](./C06-layouts.md)  
  Six layout patterns that solve 95% of your needs

- [**Chapter 7: The Building Blocks**](./C07-elements.md)  
  Interactive elements done right

- [**Chapter 8: Boxes That Contain Things**](./C08-containers.md)  
  Content containers without the complexity

- [**Chapter 9: Finding Your Way**](./C09-navigation.md)  
  Navigation patterns that actually work

- [**Chapter 10: Forms That Users Actually Complete**](./C10-forms.md)  
  Forms without the trauma

- [**Chapter 11: Talking Back to Users**](./C11-feedback.md)  
  Feedback and communication patterns

#### Part IV: Advanced Topics
- [**Chapter 12: From CSS to Enterprise Without Changing HTML**](./C12-progressive.md)  
  Progressive enhancement from 50KB to full framework

- [**Chapter 13: Common Patterns & Clever Tricks**](./C13-patterns.md)  
  Ready-to-use solutions for common problems

- [**Chapter 14: Escaping Your Legacy CSS Prison**](./C14-migration.md)  
  How to migrate without losing your mind

#### Part V: Reference
- [**Chapter 15: Component Reference**](./C15-component-reference.md)  
  Complete encyclopaedia of all components

- [**Chapter 16: CRISP Cheatsheet**](./C16-cheatsheet.md)  
  Everything you need on one page

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
2. **Rule of Three** - 1 component + 1 layout + max 3 properties
3. **Custom Properties for Variants** - Not modifier classes
4. **Meaningful Prefixes** - None, `as-`, or `with-`
5. **Embrace the Cascade** - Work with CSS, not against it

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
- 🎯 [Cheatsheet](./C16-cheatsheet.md)

---

*"Clarity is cleverness."* - The CRISP Philosophy