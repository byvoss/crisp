# Chapter 14: Enterprise Garden - Scale & Architecture

*Or: How CRISP handles millions of users without breaking a sweat*

## The Enterprise Challenge

Enterprise means scale. Scale means complexity. But complexity doesn't mean complicated. CRISP's enterprise tier adds power without sacrificing simplicity.

## Multi-Brand Architecture

One codebase, infinite brands:

```css
/* Brand token architecture */
:root {
  /* Default brand (using CRISP base colors) */
  --brand-primary: var(--color-primary, oklch(60% 0.20 250));
  --brand-secondary: var(--color-secondary, oklch(55% 0.15 280));
  --brand-accent: var(--color-accent, oklch(65% 0.25 200));
}

/* Brand configurations */
[data-brand="healthcare"] {
  --brand-primary: oklch(55% 0.18 200);   /* Trust blue */
  --brand-secondary: oklch(50% 0.10 150); /* Calm green */
  --brand-accent: oklch(60% 0.15 250);    /* Sky blue */
}

[data-brand="finance"] {
  --brand-primary: oklch(45% 0.15 250);   /* Navy */
  --brand-secondary: oklch(50% 0.20 140); /* Money green */
  --brand-accent: oklch(65% 0.25 50);     /* Gold */
}

[data-brand="retail"] {
  --brand-primary: oklch(55% 0.25 20);    /* Warm red */
  --brand-secondary: oklch(70% 0.20 90);  /* Fresh orange */
  --brand-accent: oklch(45% 0.15 300);    /* Deep purple */
}

/* Blueprints use brand tokens */
.button {
  --bg: var(--brand-primary);
}
```

**The "Aha!"**: Change brand with one attribute. No recompilation.

## Web Components Integration

Progressive enhancement with Web Components:

```typescript
// Base blueprint class
export class CrispElement extends HTMLElement {
  static observedAttributes = ['data-variant', 'data-size'];
  
  constructor() {
    super();
    // Attach shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    // Import CRISP styles into shadow DOM
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="@byvoss/crisp/dist/crisp.css">
      <slot></slot>
    `;
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    // Update CSS custom properties
    this.style.setProperty(name.replace('data-', '--'), newValue);
  }
}

// Smart form blueprint
export class CrispForm extends CrispElement {
  connectedCallback() {
    super.connectedCallback();
    
    // Auto-save to localStorage
    this.addEventListener('input', this.#autoSave);
    
    // Restore on load
    this.#restore();
  }
  
  #autoSave = (e) => {
    const formData = new FormData(this);
    localStorage.setItem(this.id, JSON.stringify(Object.fromEntries(formData)));
  }
  
  #restore() {
    const saved = localStorage.getItem(this.id);
    if (saved) {
      const data = JSON.parse(saved);
      Object.entries(data).forEach(([name, value]) => {
        const input = this.querySelector(`[name="${name}"]`);
        if (input) input.value = value;
      });
    }
  }
}

// Register blueprints
customElements.define('crisp-form', CrispForm);
```

## Micro-Frontend Support

CRISP in distributed architectures:

```html
<!-- Host application -->
<body data-brand="main">
  <!-- Team A's micro-frontend -->
  <div data-mfe="team-a" data-key="healthcare-section" data-brand="healthcare">
    <crisp-card data-key="health-card">
      Healthcare content with healthcare brand
    </crisp-card>
  </div>
  
  <!-- Team B's micro-frontend -->
  <div data-mfe="team-b" data-key="finance-section" data-brand="finance">
    <crisp-card data-key="finance-card">
      Finance content with finance brand
    </crisp-card>
  </div>
</body>
```

```css
/* Micro-frontend isolation */
[data-mfe] {
  /* Create new stacking context */
  isolation: isolate;
  
  /* Scope custom properties */
  container-type: inline-size;
  
  /* Reset inheritance */
  all: initial;
  font-family: inherit;
  
  /* Re-apply CRISP */
  @import url('@byvoss/crisp/dist/crisp.css') layer(crisp);
}
```

## Performance at Scale

Enterprise-grade optimization:

```css
/* Critical CSS inline */
<style id="crisp-critical">
  /* Only above-the-fold essentials */
  :root {
    --color-primary: oklch(60% 0.20 250);
    --color-surface: oklch(98% 0.00 0);
    --color-ink: oklch(10% 0.01 250);
  }
  
  .as-container {
    max-width: var(--container-max, 1200px);
    margin-inline: auto;
    padding-inline: var(--space-1);
  }
</style>

/* Async load full framework */
<link rel="preload" href="crisp.css" as="style">
<link rel="stylesheet" href="crisp.css" media="print" onload="this.media='all'">
```

```javascript
// Blueprint lazy loading
const loadComponent = async (name) => {
  const module = await import(`@byvoss/crisp-enterprise/dist/${name}.js`);
  customElements.define(`crisp-${name}`, module.default);
};

// Intersection observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const component = entry.target.tagName.toLowerCase();
      if (!customElements.get(component)) {
        loadComponent(component.replace('crisp-', ''));
      }
    }
  });
});

// Observe all CRISP blueprints
document.querySelectorAll('[class*="crisp-"]').forEach(el => {
  observer.observe(el);
});
```

## Design System Documentation

Auto-generated from CSS:

```javascript
// Extract design tokens
export function extractTokens() {
  const styles = getComputedStyle(document.documentElement);
  const tokens = {};
  
  // Get all custom properties
  for (const prop of styles) {
    if (prop.startsWith('--')) {
      tokens[prop] = styles.getPropertyValue(prop);
    }
  }
  
  return tokens;
}

// Generate blueprint documentation
export function documentComponent(selector) {
  const element = document.querySelector(selector);
  const computed = getComputedStyle(element);
  
  return {
    selector,
    customProperties: extractCustomProperties(computed),
    states: extractStates(element),
    variants: extractVariants(element),
    a11y: extractAccessibility(element)
  };
}
```

## Testing Infrastructure

Enterprise testing patterns:

```typescript
// Visual regression testing
import { test, expect } from '@playwright/test';

test.describe('CRISP Blueprints', () => {
  test('button renders correctly', async ({ page }) => {
    await page.goto('/components/button');
    
    const button = page.locator('.button');
    await expect(button).toHaveCSS('background-color', 'oklch(60% 0.20 250)');
    
    // Hover state
    await button.hover();
    await expect(button).toHaveCSS('background-color', 'oklch(70% 0.20 250)');
    
    // Screenshot
    await expect(button).toHaveScreenshot('button-default.png');
  });
});

// Accessibility testing
test('form meets WCAG 2.2', async ({ page }) => {
  await page.goto('/components/form');
  
  // Automated accessibility scan
  const violations = await page.accessibility.snapshot();
  expect(violations).toEqual([]);
  
  // Keyboard navigation
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement.className);
  expect(focused).toContain('input');
});
```

## Monitoring & Analytics

Track design system usage:

```javascript
// Blueprint usage analytics
class CrispAnalytics {
  constructor() {
    this.usage = new Map();
    this.observe();
  }
  
  observe() {
    // Track blueprint usage
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.className?.includes('crisp-')) {
            this.track(node);
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  track(element) {
    const component = element.className.match(/crisp-[\w-]+/)?.[0];
    if (component) {
      this.usage.set(component, (this.usage.get(component) || 0) + 1);
    }
  }
  
  report() {
    return Object.fromEntries(this.usage);
  }
}
```

## Build Pipeline

Enterprise build optimization:

```javascript
// PostCSS config for production
export default {
  plugins: [
    // Layer optimization
    {
      postcssPlugin: 'crisp-layers',
      Once(root) {
        // Flatten layers for older browsers
        if (!CSS.supports('selector(@layer)')) {
          flattenLayers(root);
        }
      }
    },
    
    // Token extraction
    {
      postcssPlugin: 'crisp-tokens',
      Once(root) {
        // Extract tokens for documentation
        const tokens = extractTokensFromCSS(root);
        fs.writeFileSync('tokens.json', JSON.stringify(tokens));
      }
    },
    
    // Usage tracking
    {
      postcssPlugin: 'crisp-usage',
      Rule(rule) {
        // Track which blueprints are actually used
        trackComponentUsage(rule.selector);
      }
    }
  ]
};
```

## Security Patterns

Enterprise security considerations:

```css
/* Content Security Policy compatible */
.component {
  /* No inline styles required */
  /* All styles in external sheets */
  /* Nonce/hash support for critical CSS */
}

/* Sanitization-safe HTML */
.user-content[data-key="ugc-container"] {
  /* Safe property values */
  @property --user-color {
    syntax: "<color>";
    inherits: false;
    initial-value: currentColor;
  }
  
  /* Prevent layout breaking */
  contain: layout style;
  overflow-wrap: break-word;
  
  /* No position escaping */
  position: static !important;
  z-index: auto !important;
}
```

## Deployment Strategies

```yaml
# CI/CD pipeline
name: CRISP Enterprise Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Build variants
        run: |
          npm run build:core
          npm run build:theme  
          npm run build:enterprise
          
      - name: Generate SRI hashes
        run: npm run generate:sri
        
      - name: Deploy to CDN
        run: |
          aws s3 sync dist/ s3://cdn/crisp/
          aws cloudfront create-invalidation
          
      - name: Update documentation
        run: npm run docs:deploy
```

## The Enterprise Toolkit

You now have:
- **Multi-brand support** - One codebase, many brands
- **Web Components** - Progressive enhancement
- **Micro-frontends** - Distributed architecture
- **Performance optimization** - Scale without slowdown
- **Auto-documentation** - Always up-to-date
- **Testing infrastructure** - Quality at scale
- **Analytics** - Track usage patterns
- **Build optimization** - Production ready
- **Security patterns** - Enterprise safe
- **Deployment strategies** - CI/CD ready

**The Bottom Line**: CRISP scales from prototype to production without changing your approach.

Ready for best practices?

→ Continue to [Chapter 15: Master Gardener - Best Practices](./CH15-best-practices.md)