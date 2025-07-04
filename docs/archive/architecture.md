# CRISP Architecture Overview

## Three Editions for Different Needs

### 🎯 CRISP (~50KB) - Pure CSS Framework
The foundation for modern web projects.

**Includes:**
- CSS Reset
- Design Tokens  
- All layouts (`as-stack`, `as-grid`, etc.)
- All components (button, card, nav, etc.)
- Typography system
- Zero JavaScript

**Use when:**
- Building any web project
- Want pure CSS solution
- Need semantic components

### 🎨 CRISP Theme (~60KB) - With Dynamic Theming
CRISP plus theme switching capabilities.

**Includes everything in CRISP plus:**
- JavaScript theme system (~10KB)
- Dark/light/auto modes
- System preference detection
- Smooth transitions

**Use when:**
- Building production websites
- Need ready-to-use components
- Want theme switching
- Prefer CSS-only solutions

### 🏢 CRISP Enterprise (~150KB) - Full Framework
For teams building international applications.

**Includes everything in CRISP Theme plus:**
- TypeScript Web Components
- Progressive enhancement via `data-component`
- Full i18n system
- Type definitions
- Reactive attributes
- Automated accessibility

**Use when:**
- Building international applications
- Need strict type safety
- Want component-level control
- Require i18n support

## Directory Structure

```
src/
├── crisp/                      # Core CRISP (read-only)
│   ├── core/                   # Shared basics
│   │   ├── reset.css
│   │   ├── tokens.css
│   │   └── themes.css
│   ├── layouts/                # Layout patterns
│   │   ├── stack.css
│   │   ├── grid.css
│   │   └── ...
│   ├── components/             # Component library
│   │   ├── button/
│   │   │   ├── button.css     # Styles (all editions)
│   │   │   ├── button.md      # Documentation
│   │   │   ├── button.ts      # Web Component (Enterprise)
│   │   │   ├── button.test.ts # Tests (Enterprise)
│   │   │   └── i18n/          # Translations (Enterprise)
│   │   │       ├── en-GB.json # Default language
│   │   │       ├── de-DE.json
│   │   │       └── ...
│   │   └── ...
│   └── lib/                    # Enterprise libraries
│       ├── i18n.ts
│       ├── component-base.ts
│       └── ...
└── [project-name]/             # Your customisations
    ├── components/             # Override/extend components
    │   └── button/
    │       ├── button.css      # Custom styles
    │       └── i18n/
    │           └── de-DE.json  # Override translations
    └── translations/           # Additional languages
        └── tr-TR.csv           # Project-specific language
```

## Progressive Enhancement Strategy

### 1. Base HTML (Works Everywhere)
```html
<button class="button">Submit</button>
```

### 2. Enhanced with Custom Properties
```html
<button class="button" style="--button-variant: primary;">Submit</button>
```

### 3. Enterprise Web Component
```html
<button class="button" data-component="button" style="--button-variant: primary;">Submit</button>
```

The HTML structure remains identical - only capabilities increase.

## i18n Architecture (Enterprise Only)

### Language Detection Priority
1. `<body data-lang="xx-XX">` - Highest priority
2. `<html lang="xx-XX">` - Standard approach
3. `navigator.language` - Browser preference
4. `'en-GB'` - Fallback

### Translation Structure
```
component/
└── i18n/
    ├── en-GB.json    # Always required (fallback)
    ├── de-DE.json
    └── zh-CN.json
```

### Usage
```html
<!-- Any element can be translated -->
<h1 data-i18n="page.title">Welcome</h1>
<button class="button" data-i18n="actions.submit">Submit</button>
```

### Override Mechanism
Project translations merge with CRISP defaults:
```json
// crisp/components/button/i18n/de-DE.json
{
  "submit": "Absenden",
  "cancel": "Abbrechen"
}

// my-project/components/button/i18n/de-DE.json
{
  "submit": "Jetzt absenden"  // Only override what changes
}

// Result: { submit: "Jetzt absenden", cancel: "Abbrechen" }
```

## Build Output Structure

```
dist/
├── crisp.css               # Pure CSS framework
├── crisp.min.css
├── crisp-theme.js          # Theme system
├── crisp-theme.min.js
├── crisp-theme.d.ts        # Theme type definitions
├── crisp-enterprise.js     # Full framework
├── crisp-enterprise.min.js
├── crisp-enterprise.d.ts   # Full type definitions
└── components/             # Individual components
    ├── button.css
    ├── button.js
    ├── button.d.ts         # Component types
    └── ...
```

## Key Principles

1. **CSS First** - Everything works without JavaScript
2. **Progressive Enhancement** - Add features, don't require them
3. **Co-location** - Keep related files together
4. **Override, Don't Fork** - Extend via project directory
5. **Type Safety** - TypeScript throughout Enterprise edition
6. **Performance** - Only load what you use
7. **Standards** - Web standards over proprietary solutions