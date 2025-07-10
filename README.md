# CRISP - Pattern & Framework

> Code Rules for Intuitive Semantic Projects
> 
> **"Learn concepts, not APIs."**

CRISP is both a **CSS methodology** (like BEM) and a lightweight but powerful **ready-to-use framework**. It prioritises semantic HTML, minimal classes, and accessibility-first design.

**The killer feature**: With CRISP, you learn CSS concepts that stay forever. With other frameworks, you learn APIs that change with every major version.

## The Philosophy of Respect

CRISP follows the demoscene philosophy - where 4KB demos create magic through elegance, not brute force. Every byte matters. Every cycle counts.

**We respect:**
- **Your users' bandwidth** - ~50KB, not 10MB of utilities
- **Their battery life** - Pure CSS uses zero CPU for interactions
- **Their time** - Instant load, no JavaScript parsing
- **Your time** - Write `.button`, not 47 utility classes
- **The planet** - Less data = less energy = cleaner environment

This isn't minimalism for aesthetics. It's minimalism as **respect**.

In the demoscene, constraints breed creativity. A 4KB limit forces elegance. CRISP applies this principle to web development:
- **10 colors** → hundreds of variations through math
- **3 layers** → infinite flexibility without complexity  
- **20 classes** → complete websites

True programming isn't about using every feature available. It's about achieving more with less. It's about respecting the machine, the network, the user, and the craft itself.

CRISP is our homage to this philosophy. Maximum capability, minimum footprint. As it should be.

## Use as Pattern (Methodology Only)

Implement CRISP conventions in your own CSS:
- Use semantic prefixes (`as-`, `with-`)
- Maximum 1 component + 1 layout + up to 3 properties per element
- IDs only for accessibility
- Custom properties for variations

See [docs/](./docs/) for the complete pattern guide.

### Adopt in Other Frameworks

CRISP patterns work great with:
- **Tailwind CSS** - Semantic classes over utilities
- **Bootstrap** - Better component semantics  
- **Material-UI** - Accessibility-first React components
- **Your Framework** - Apply CRISP principles to any framework

## Use as Framework

CRISP comes in three editions for different needs:

### 🎯 CRISP - Pure CSS Framework (~50KB)
The foundation for modern web projects.
- All CSS Elements (button, card, nav, etc.)
- Complete design system
- Zero JavaScript required
- Works everywhere

### 🎨 CRISP Theme - With Theme Switching (~60KB)
CRISP plus dynamic theming.
- Everything in CRISP
- JavaScript theme system (~10KB)
- Dark/light/auto modes
- Smooth transitions

### 🏢 CRISP Enterprise - Full Framework (~150KB)
For teams building international applications.
- Everything in CRISP Theme
- TypeScript Web Components
- Full i18n system
- Type-safe development
- Progressive enhancement

### Package Managers

```bash
# npm
npm install @byvoss/crisp              # Pure CSS Framework
npm install @byvoss/crisp-theme        # With Theme System  
npm install @byvoss/crisp-enterprise   # Full Platform

# yarn/pnpm/bun - same pattern
```

### CDN

```html
<!-- CRISP (Pure CSS) -->
<link rel="stylesheet" 
  href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css"
  integrity="sha384-..." 
  crossorigin="anonymous">

<!-- CRISP Theme (CSS + Theme JS) -->
<link rel="stylesheet" 
  href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css"
  integrity="sha384-..." 
  crossorigin="anonymous">
<script type="module" 
  src="https://unpkg.com/@byvoss/crisp-theme@latest/dist/theme.esm.js"
  integrity="sha384-..." 
  crossorigin="anonymous"></script>

<!-- CRISP Enterprise (Full Platform) -->
<link rel="stylesheet" 
  href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css"
  integrity="sha384-..." 
  crossorigin="anonymous">
<script type="module" 
  src="https://unpkg.com/@byvoss/crisp-theme@latest/dist/theme.esm.js"
  integrity="sha384-..." 
  crossorigin="anonymous"></script>
<script type="module" 
  src="https://unpkg.com/@byvoss/crisp-enterprise@latest/dist/components.esm.js"
  integrity="sha384-..." 
  crossorigin="anonymous"></script>
```

### IDE Support

All CRISP editions include IDE autocomplete:

**VS Code** - Install the CRISP extension for:
- CSS class autocomplete
- Custom property suggestions
- Component documentation on hover

**JetBrains** (WebStorm, PhpStorm, etc.):
- Built-in support via CSS definitions
- Live documentation

**Zed** - Modern performance:
- Native CRISP support via extensions
- Lightning-fast autocomplete

**Vim/Neovim** - For the cultured:
- LSP support via `crisp-language-server`
- coc-crisp for CoC users
- Built-in via nvim-lsp

**Other Editors**:
- Sublime Text, Atom, etc. via LSP
- CSS definition files included

## Quick Start

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <link rel="stylesheet" href="path/to/crisp.css">
</head>
<body>
  <!-- Container constrains width and centres content -->
  <main class="as-container">
    
    <!-- Navigation: semantic element, layout mode, property -->
    <nav class="nav as-cluster with-sticky" role="navigation" aria-label="Main navigation">
      <a href="#home">Home</a>
      <a href="#features">Features</a>
      <a href="#docs">Docs</a>
    </nav>

    <!-- Hero section: layout with stack spacing -->
    <section class="as-stack" style="--stack-gap: var(--space-3-0);">
      
      <!-- Card component with layout and visual property -->
      <article class="card as-stack with-shadow" role="article">
        <h1 class="text" style="--text-size: var(--text-size-3-0);">
          Welcome to CRISP
        </h1>
        <p class="text" style="--text-colour: var(--colour-neutral-60);">
          Where <strong>clarity is cleverness</strong>. One component, one layout mode,
          up to three properties. IDs only for accessibility. Semantic HTML always.
        </p>
        <button class="button with-interaction with-shadow" 
          role="button"
          aria-label="Start learning CRISP">
          Get Started
        </button>
      </article>

      <!-- Grid layout for feature cards -->
      <div class="as-grid" style="--grid-min: 250px;">
        
        <!-- Feature cards demonstrating the pattern -->
        <article class="card with-border with-padding">
          <h2 class="text">Semantic Prefixes</h2>
          <p>Components, <code>as-</code> layouts, <code>with-</code> properties</p>
        </article>
        
        <article class="card with-border with-padding">
          <h2 class="text">Accessibility First</h2>
          <p>ARIA roles for functionality, IDs for a11y only</p>
        </article>
        
        <article class="card with-border with-padding">
          <h2 class="text">Custom Properties</h2>
          <p>Variations through CSS variables, not classes</p>
        </article>
        
      </div>
    </section>
    
  </main>
</body>
</html>
```

## Core Principles

1. **Semantic Prefixes**
   - No prefix: Components (`card`, `button`, `nav`)
   - `as-`: Layout modes (`as-stack`, `as-grid`)
   - `with-`: Properties (`with-shadow`, `with-border`)

2. **Class Formula: 1 + 1 + up to 3**
   ```html
   <!-- 1 component + 1 layout + up to 3 properties -->
   <article class="card as-stack with-shadow with-padding with-border">
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

CRISP is written in TypeScript and uses a modular architecture:

```
src/
├── elements/         # CSS-only elements
│   └── button/
│       ├── button.css
│       └── button.md
└── components/       # Web Components (TypeScript)
    └── button/
        ├── button.ts
        └── button.test.ts
```

### Setup

```bash
# Clone repository
git clone https://github.com/byvoss/crisp.git
cd crisp

# Install dependencies
npm install

# Development
npm run dev          # Watch mode with hot reload
npm run build        # Build all distributions
npm run test         # Run tests and linting
npm run docs         # Generate documentation
```

### Build Outputs

```bash
dist/
├── crisp-lite.css       # Pattern only
├── crisp.css            # Elements framework
├── crisp.js             # Core JavaScript
├── crisp-enterprise.js  # Web Components
└── types/               # TypeScript definitions
```

## Integration with byvoss.tech

CRISP is developed as part of the byvoss.tech ecosystem but can be used independently in any project.

## License

MIT © ByVoss