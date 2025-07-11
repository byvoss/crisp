# Contributing to CRISP

Thank you for your interest in contributing to CRISP! We welcome contributions that align with our core principles.

## Core Principles

1. **Semantic HTML First** - Every contribution must prioritise semantic HTML
2. **Class Formula** - No element should have more than 1 component + 1 layout + up to 3 properties
3. **Accessibility Always** - All features must meet WCAG 2.1 AA standards
4. **No ID Selectors** - IDs are reserved exclusively for accessibility
5. **Progressive Enhancement** - Features must work without JavaScript

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/crisp.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature`

## Development

```bash
# Build CSS files
npm run build

# Watch for changes
npm run watch

# Run linter
npm run lint
```

## File Organisation

- `src/` - Source CSS files
  - `crisp-reset.css` - Modern reset
  - `crisp-tokens.css` - Design tokens
  - `crisp-themes.css` - Theme system
  - `crisp-layouts.css` - Layout classes (as-*)
  - `crisp-components.css` - Core components
  - `crisp-properties.css` - Property classes (with-*)
  - `crisp-utilities.css` - Utility classes
  - `crisp-modern.css` - Progressive enhancements
  - `crisp-responsive.css` - Responsive system

## Adding New Features

### Components
```css
/* Component names must be semantic */
.article-list {
  /* Use existing tokens */
  padding: var(--space-1-0);
  /* Custom properties for variations */
  gap: var(--article-list-gap, var(--space-1-5));
}
```

### Layout Classes
```css
/* Layout classes use as- prefix */
.as-masonry {
  /* Clear, single-purpose layouts */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--masonry-min, 250px), 1fr));
}
```

### Property Classes
```css
/* Property classes use with- prefix */
.with-blur {
  /* Single, composable properties */
  backdrop-filter: blur(var(--blur-amount, 8px));
}
```

## Testing

Before submitting:

1. Ensure all classes follow naming conventions
2. Test in multiple browsers
3. Verify accessibility with screen readers
4. Check colour contrast ratios
5. Test with keyboard navigation

## Pull Request Process

1. Update documentation for new features
2. Ensure `npm run lint` passes
3. Update the README if needed
4. Reference any related issues

## Code Style

- Use CSS custom properties for all values
- Comment complex techniques
- Keep selectors flat (no nesting)
- One class = one purpose
- Mobile-first responsive design

## Documentation Standards

### Server-Side Examples

All server-side code examples use **Rust/Tera** syntax as our standard (established in docs/CH05-blueprints.md). This reflects CRISP's preference for memory-safe, performant server architecture.

When adding examples:
- Use Rust/Tera template syntax
- Follow the record pattern for data structures
- Include comments explaining the server-side logic
- Reference Chapter 5 for the complete pattern guide

## Questions?

Open an issue for discussion before making major changes.