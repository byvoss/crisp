# CRISP - Pattern & Framework

> Code Rules for Intuitive Semantic Projects

CRISP is both a **CSS methodology** (like BEM) and a **ready-to-use framework**. It prioritises semantic HTML, minimal classes, and accessibility-first design.

## Use as Pattern (Methodology Only)

Implement CRISP conventions in your own CSS:
- Use semantic prefixes (`as-`, `with-`)
- Maximum 3 classes per element
- IDs only for accessibility
- Custom properties for variations

See [docs/](./docs/) for the complete pattern guide.

### Adopt in Other Frameworks

CRISP patterns work great with:
- **Tailwind CSS** - Semantic classes over utilities
- **Bootstrap** - Better component semantics  
- **Material-UI** - Accessibility-first React components
- **Your Framework** - [Adoption Guide](./docs/adoption-guide.md)

## Use as Framework

```bash
# Install via npm
npm install @byvoss/crisp

# Or use CDN
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp">
```

## Quick Start

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <link rel="stylesheet" href="path/to/crisp.css">
</head>
<body>
  <main class="as-container">
    <article class="card as-stack with-shadow">
      <h1 class="text" style="--text-size: 2rem;">
        Hello CRISP
      </h1>
      <p>Semantic, accessible, and beautiful.</p>
      <button class="button with-interaction">
        Get Started
      </button>
    </article>
  </main>
</body>
</html>
```

## Core Principles

1. **Semantic Prefixes**
   - No prefix: Components (`card`, `button`, `nav`)
   - `as-`: Layout modes (`as-stack`, `as-grid`)
   - `with-`: Properties (`with-shadow`, `with-border`)

2. **Maximum 3 Classes Rule**
   ```html
   <div class="card as-stack with-shadow">
   ```

3. **Custom Properties for Variations**
   ```html
   <button class="button" style="--button-bg: red;">
   ```

4. **Accessibility First**
   - ARIA attributes for functionality
   - IDs only for accessibility
   - WCAG compliant by default

## Documentation

See [docs/](./docs/) for comprehensive documentation.

## Development

```bash
# Clone repository
git clone https://github.com/byvoss/crisp.git
cd crisp

# Install dependencies
npm install

# Build CSS
npm run build

# Watch for changes
npm run watch

# Run linting
npm test
```

## Integration with byvoss.tech

CRISP is developed as part of the byvoss.tech ecosystem but can be used independently in any project.

## License

MIT © ByVoss