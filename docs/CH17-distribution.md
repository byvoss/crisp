# Chapter 17: From Garden to Market - Distribution & Architecture

*Or: How CRISP gets from source code to your project*

## The Two Worlds of CRISP

There are two completely different directory structures in the CRISP ecosystem, and understanding this distinction clears up 90% of the confusion:

1. **Development World** - Where CRISP is built (GitHub repository)
2. **User World** - What you actually get and use

Let's explore both.

## Development World: The CRISP Repository

This is what CRISP contributors and maintainers work with:

```
github.com/byvoss/crisp/
├── blueprints/                 # Source files for all blueprints
│   ├── button/
│   │   ├── button.css         # CSS source
│   │   ├── button.ts          # TypeScript source
│   │   └── button.tera        # Tera macro source
│   ├── card/
│   │   ├── card.css
│   │   ├── card.ts
│   │   └── card.tera
│   └── ... (50+ blueprints)
├── build/                      # Build tools and scripts
│   ├── build-css.js           # Combines CSS, handles layers
│   ├── build-components.js    # Compiles TypeScript
│   └── build-macros.js        # Aggregates Tera macros
├── src/                       # Core framework code
│   ├── kernel/                # The secret kernel layer
│   ├── tokens/                # Design tokens
│   └── themes/                # Theme definitions
└── dist/                      # Build output (see below)
```

**The Build Process:**
1. **CSS Build**: Reads all `blueprints/*/*.css` files, sorts them into correct layers, outputs minified CSS
2. **Component Build**: Compiles all `blueprints/*/*.ts` files into ES modules
3. **Macro Build**: Aggregates all `blueprints/*/*.tera` files into `base.tera`
4. **Package Build**: Creates distribution packages for different channels

## User World: What You Actually Get

Depending on how you consume CRISP, you get different things:

### Option 1: CDN User (90% of users)

```html
<!-- You write this -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css">

<!-- You get these files from CDN -->
crisp.min.css     (50KB)  - All CSS, properly layered
interactive.js    (10KB)  - Theme switching (Tier 2)
crown.js          (90KB)  - Web Components (Tier 3)
```

**What you DON'T get:** Any source files, blueprints folders, build tools. Just the final, optimized assets.

### Option 2: NPM User

```bash
npm install @byvoss/crisp-pure
```

```
node_modules/
└── @byvoss/crisp-pure/
    ├── dist/
    │   └── crisp.min.css    # The only file you need
    ├── package.json
    └── README.md
```

Again, no source files - just the built CSS.

### Option 3: Server Installation

```bash
curl -sSf https://crisp.byvoss.tech/create-crisp-server.sh | sh
```

This creates:

```
my-crisp-app/
├── crisp-server              # Compiled Rust binary (~8MB)
├── public/                   # Static assets
│   ├── crisp.min.css        # Pre-built CSS
│   ├── interactive.js       # Pre-built JS
│   └── crown.js             # Pre-built JS
├── templates/               
│   └── base.tera            # Includes ALL macros
└── texts/
    └── en-GB.json           # Translations
```

**Key Point**: The `templates/base.tera` file already contains ALL the macro definitions from `blueprints/*/*.tera`. They're pre-aggregated during the build process.

## The Distribution Pipeline

Here's how CRISP flows from source to users:

```
1. Development:
   blueprints/*/*.css → build process → dist/

2. Distribution Preparation:
   dist/
   ├── npm/              # For NPM packages
   │   ├── crisp-pure/
   │   ├── crisp-interactive/
   │   └── crisp-crown/
   ├── cdn/              # For CDN deployment
   │   └── [versioned files]
   └── server/           # For server package
       └── [complete structure]

3. Release:
   - NPM: npm publish from dist/npm/*
   - CDN: Auto-deployed via unpkg.com
   - Server: Packaged into install script
```

## Why This Architecture?

**For CRISP Maintainers:**
- Modular development (one blueprint = one folder)
- Easy to maintain and test individual components
- Clear separation of concerns

**For CRISP Users:**
- Single file to include (no build step needed)
- Optimized and minified assets
- No exposure to internal complexity
- Works immediately

## The Build Magic

The build process is where the magic happens:

### CSS Build Example
```javascript
// Simplified build-css.js
const files = glob('blueprints/*/*.css');
const layers = {
  elements: [],
  properties: [],
  states: []
};

files.forEach(file => {
  const css = parseCSS(file);
  css.rules.forEach(rule => {
    if (rule.selector.includes(':hover')) {
      layers.states.push(rule);
    } else if (rule.selector.includes('.with-')) {
      layers.properties.push(rule);
    } else {
      layers.elements.push(rule);
    }
  });
});

// Output with proper layer structure
const output = `
@layer kernel, crisp, bridge, overrides;
@layer crisp {
  @layer tokens, base, layouts, elements, properties, states, themes;
  
  @layer elements {
    ${layers.elements.join('\n')}
  }
  
  @layer properties {
    ${layers.properties.join('\n')}
  }
  
  @layer states {
    ${layers.states.join('\n')}
  }
}
`;
```

### Macro Aggregation Example
```javascript
// Simplified build-macros.js
const macros = glob('blueprints/*/*.tera')
  .map(file => fs.readFileSync(file))
  .join('\n\n');

const baseTemplate = `
<!DOCTYPE html>
<html lang="{{ locale }}">
<head>
    <title>{% block title %}{{ site.title }}{% endblock %}</title>
    <link rel="stylesheet" href="/public/crisp.min.css">
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

{# All CRISP macros below #}
${macros}
`;

fs.writeFileSync('dist/server/templates/base.tera', baseTemplate);
```

## Versioning and Updates

CRISP follows semantic versioning:

- **Patch** (1.0.x): Bug fixes, no API changes
- **Minor** (1.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes

The CDN automatically serves the latest version, but you can pin versions:

```html
<!-- Latest -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css">

<!-- Pinned -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp-pure@1.0.0/dist/crisp.min.css">
```

## Contributing to CRISP

If you want to contribute:

1. Fork the repository
2. Work in the `blueprints/` structure
3. Run `npm run build` to test your changes
4. Submit a pull request

The build system ensures your blueprint follows all CRISP conventions.

## The Bottom Line

**As a user**, you never need to think about the build process or source structure. You just get clean, optimized files that work immediately.

**As a contributor**, you work with a well-organized source structure that makes development pleasant.

**The build pipeline** bridges these two worlds, turning modular source files into optimized distributions.

Ready to contribute to CRISP?

→ Continue to [Chapter 18: Contributing Guide](./CH18-contributing.md) *(coming soon)*

Or go back to using CRISP:

→ Return to [Chapter 1: The Discovery](./CH01-discovery.md)