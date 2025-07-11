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

## Internationalization (i18n)

Enterprise means global. CRISP's i18n system is type-safe and tree-shakeable:

```json
// packages/crisp/src/i18n/en-GB.json
{
  "actions": {
    "submit": "Submit",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete"
  },
  "messages": {
    "loading": "Loading...",
    "success": "Operation successful",
    "error": "An error occurred"
  },
  "aria": {
    "closeDialog": "Close dialog",
    "openMenu": "Open menu",
    "sortTable": "Sort table"
  }
}

// packages/crisp/src/i18n/de-DE.json
{
  "actions": {
    "submit": "Absenden",
    "cancel": "Abbrechen",
    "save": "Speichern",
    "delete": "Löschen"
  },
  "messages": {
    "loading": "Lädt...",
    "success": "Aktion erfolgreich",
    "error": "Ein Fehler ist aufgetreten"
  },
  "aria": {
    "closeDialog": "Dialog schließen",
    "openMenu": "Menü öffnen",
    "sortTable": "Tabelle sortieren"
  }
}

// packages/crisp/src/i18n/ja-JP.json
{
  "actions": {
    "submit": "送信",
    "cancel": "キャンセル",
    "save": "保存",
    "delete": "削除"
  },
  "messages": {
    "loading": "読み込み中...",
    "success": "操作が成功しました",
    "error": "エラーが発生しました"
  },
  "aria": {
    "closeDialog": "ダイアログを閉じる",
    "openMenu": "メニューを開く",
    "sortTable": "テーブルを並べ替える"
  }
}

// i18n.ts - The translation engine
export class CrispI18n {
  private locale: string;
  private translation: Translation | null = null;
  
  constructor() {
    this.locale = this.detectLocale();
    this.loadTranslation();
  }
  
  async loadTranslation() {
    try {
      // Dynamic import - only loads the needed JSON file!
      const response = await fetch(`/i18n/${this.locale}.json`);
      this.translation = await response.json();
      this.updateDOM();
    } catch (e) {
      // Fallback to English
      const response = await fetch(`/i18n/en-GB.json`);
      this.translation = await response.json();
      this.updateDOM();
    }
  }
  
  detectLocale(): string {
    return (
      document.documentElement.lang ||
      localStorage.getItem('crisp-locale') ||
      navigator.language ||
      'en-GB'
    );
  }
  
  setLocale(locale: string) {
    this.locale = locale;
    localStorage.setItem('crisp-locale', locale);
    this.updateDOM();
  }
  
  t(key: string, params?: Record<string, string>): string {
    if (!this.translation) return key; // Not loaded yet
    
    const keys = key.split('.');
    let value: any = this.translation;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value === 'string') {
      // Replace {param} with values
      return params 
        ? value.replace(/{(\w+)}/g, (_, k) => params[k] || '')
        : value;
    }
    
    return key; // Fallback to key if not found
  }
  
  updateDOM() {
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      (el as HTMLInputElement).placeholder = this.t(key);
    });
    
    // Update ARIA labels
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      el.setAttribute('aria-label', this.t(key));
    });
  }
}
```

Usage in HTML:

```html
<!-- Text content -->
<button class="button" data-i18n="actions.submit">Submit</button>

<!-- Placeholder -->
<input class="input" type="text" data-i18n-placeholder="messages.loading">

<!-- ARIA labels -->
<button class="button" data-i18n-aria-label="aria.closeDialog">×</button>

<!-- With parameters -->
<p class="text" data-i18n="messages.welcome" data-i18n-params='{"name": "Alice"}'>
  Welcome, {name}!
</p>
```

**The "Aha!"**: One file per language = perfect tree-shaking! If you only use English, you only ship English. No bloated translation objects with 50 languages you don't need. Dynamic imports load languages on demand.

File structure:
```
packages/crisp/src/i18n/
├── en-GB.json    # English (British)
├── en-US.json    # English (American)
├── de-DE.json    # German
├── fr-FR.json    # French
├── ja-JP.json    # Japanese
└── index.ts      # Export the i18n engine
```

### Server-Side i18n (Recommended!)

Pure JSON files work perfectly with any server template engine:

**Rust/Tera - The CRISP Way:**

CRISP recommends using a custom translate filter for the cleanest template syntax. Your server loads the JSON translation files and registers a filter that makes i18n as simple as `{{ "key" | t }}`. No JavaScript needed, no client-side translation library - just pure server-side rendering.

```rust
use tera::{Context, Tera, Filter, Result, Value, to_value};
use serde_json;
use std::collections::HashMap;
use std::fs;

// Create a translate filter for clean template syntax
struct TranslateFilter {
    translations: HashMap<String, Value>,
}

impl Filter for TranslateFilter {
    fn filter(&self, value: &Value, _args: &HashMap<String, Value>) -> Result<Value> {
        let key = value.as_str().ok_or_else(|| 
            tera::Error::msg("translate filter expects a string")
        )?;
        
        // Navigate through nested keys (e.g., "site.title")
        let keys: Vec<&str> = key.split('.').collect();
        let mut current = &self.translations;
        
        for (i, k) in keys.iter().enumerate() {
            if let Some(val) = current.get(*k) {
                if i == keys.len() - 1 {
                    // We've reached the final key
                    return Ok(val.clone());
                } else if let Value::Object(map) = val {
                    // Continue navigating
                    current = map;
                } else {
                    // Path doesn't lead to final value
                    break;
                }
            } else {
                break;
            }
        }
        
        // Return the key itself if translation not found (for debugging)
        Ok(to_value(key)?)
    }
}

// Setup i18n in your app initialization
pub fn setup_tera(tera: &mut Tera, locale: &str) -> Result<()> {
    // Load the appropriate JSON translation file
    let translation_path = format!("packages/crisp/src/i18n/{}.json", locale);
    let translations_str = fs::read_to_string(&translation_path)
        .unwrap_or_else(|_| fs::read_to_string("packages/crisp/src/i18n/en-GB.json")
            .expect("Fallback translation file not found"));
    
    let translations: HashMap<String, Value> = serde_json::from_str(&translations_str)?;
    
    // Register both long and short versions
    tera.register_filter("translate", TranslateFilter { translations: translations.clone() });
    tera.register_filter("t", TranslateFilter { translations });
    
    Ok(())
}

// In your request handler - now much simpler!
pub fn render_page(request: &Request, tera: &Tera) -> Result<String> {
    let mut context = Context::new();
    
    // Add any dynamic data
    context.insert("user", &get_current_user(request));
    context.insert("locale", &get_locale(request));
    
    // Render - translations are handled by the filter
    tera.render("index.html", &context)
}
```

```html
<!-- templates/index.html - Clean CRISP i18n with filter -->
<!DOCTYPE html>
<html lang="{{ locale }}">
<head>
    <title>{{ "site.title" | t }}</title>
    <meta name="description" content="{{ "site.description" | t }}">
</head>
<body>
    <!-- Navigation with translated links -->
    <nav class="nav as-cluster" role="navigation" aria-label="{{ "nav.aria_label" | t }}">
        <a class="link" href="/home">{{ "nav.home" | t }}</a>
        <a class="link" href="/products">{{ "nav.products" | t }}</a>
        <a class="link" href="/about">{{ "nav.about" | t }}</a>
    </nav>

    <!-- Hero section -->
    <section class="as-center" style="min-height: 50dvh;">
        <div class="as-stack">
            <h1 class="heading">{{ "hero.title" | t }}</h1>
            <p class="text">{{ "hero.subtitle" | t }}</p>
        </div>
    </section>

    <!-- Form with translated labels -->
    <form class="as-stack" method="post">
        <div class="field">
            <label class="label" for="email">{{ "forms.email.label" | t }}</label>
            <input class="input" 
                   type="email" 
                   id="email" 
                   placeholder="{{ "forms.email.placeholder" | t }}"
                   aria-describedby="email-help">
            <small class="helper" id="email-help">{{ "forms.email.help" | t }}</small>
        </div>
        
        <button class="button with-interaction" type="submit">
            {{ "actions.submit" | t }}
        </button>
    </form>

    <!-- Dynamic content -->
    {% if user %}
        <p class="text">
            {# For parameterized translations, use replace filter #}
            {{ "messages.welcome" | t | replace(from="{name}", to=user.name) }}
        </p>
    {% endif %}

    <!-- Error handling with dynamic keys -->
    {% if error %}
        {% set error_key = "errors." ~ error.type %}
        <div class="alert" data-variant="error">
            {{ error_key | t | default(value="An error occurred") }}
        </div>
    {% endif %}

    <!-- The demo shop example! -->
    <div class="as-grid" data-entries="{{ products | length }}">
        {% for demo in demos %}
        <article class="card as-stack" data-key="demo-{{ demo.id }}">
            <h3 class="heading">{{ demo.name }}</h3>
            <p class="text">{{ ("demos." ~ demo.id ~ ".description") | t }}</p>
            <div class="as-cluster">
                <span class="badge">{{ demo.size }}</span>
                <span class="badge">{{ ("categories." ~ demo.category) | t }}</span>
            </div>
            <a class="button" href="{{ demo.url }}">
                {{ "actions.view_demo" | t }}
            </a>
        </article>
        {% endfor %}
    </div>
</body>
</html>
```

**Why This Approach Rocks:**

1. **Zero JavaScript for i18n** - The browser receives HTML with all text already translated. No loading states, no flashing content, no client-side processing.

2. **SEO Perfect** - Search engines index your content in all languages. Google sees "Produkte" on the German version, not "Products" that gets replaced by JavaScript later.

3. **Instant Rendering** - No waiting for JavaScript to load, parse, and execute. The page appears immediately with the correct language.

4. **Accessibility Built-in** - Screen readers get properly translated content from the start. ARIA labels are already in the right language.

5. **Cache Friendly** - You can cache entire rendered pages per language. The JSON files rarely change, so they're cached too.

6. **Developer Experience** - Just use `{{ "key" | t }}` in your templates. Clean, readable, chainable with other filters. No complex i18n library API to learn.

### Alternative: Direct Object Access

If you prefer, you can also pass translations as a context object:

```rust
// Add a custom translate filter to Tera
use tera::{Filter, Result, Value, to_value};
use std::collections::HashMap;

struct TranslateFilter {
    translations: HashMap<String, Value>,
}

impl Filter for TranslateFilter {
    fn filter(&self, value: &Value, args: &HashMap<String, Value>) -> Result<Value> {
        let key = value.as_str().ok_or_else(|| 
            tera::Error::msg("translate filter expects a string")
        )?;
        
        // Navigate through nested keys (e.g., "site.title")
        let keys: Vec<&str> = key.split('.').collect();
        let mut current = &self.translations;
        
        for k in keys {
            if let Some(Value::Object(map)) = current.get(k) {
                current = map;
            } else if let Some(value) = current.get(k) {
                return Ok(value.clone());
            } else {
                // Return the key itself if translation not found
                return Ok(to_value(key)?);
            }
        }
        
        Ok(to_value(key)?)
    }
}

// Register the filter
let translations = load_translations(&locale)?;
tera.register_filter("translate", TranslateFilter { translations });
tera.register_filter("t", TranslateFilter { translations }); // Short alias
```

Now your templates become even cleaner:

```html
<!-- Using the translate filter -->
<!DOCTYPE html>
<html lang="{{ locale }}">
<head>
    <title>{{ "site.title" | translate }}</title>
</head>
<body>
    <nav class="nav as-cluster">
        <a class="link" href="/home">{{ "nav.home" | t }}</a>
        <a class="link" href="/products">{{ "nav.products" | t }}</a>
        <a class="link" href="/about">{{ "nav.about" | t }}</a>
    </nav>
    
    <!-- With default values -->
    <p class="text">{{ "welcome.message" | t | default(value="Welcome!") }}</p>
    
    <!-- Can chain with other filters -->
    <h1 class="heading">{{ "page.title" | t | upper }}</h1>
    
    <!-- Dynamic keys -->
    {% set message_key = "errors." ~ error_type %}
    <div class="alert" data-variant="error">
        {{ message_key | t }}
    </div>
</body>
</html>
```

**The Filter Advantage:**
- Shorter, more readable syntax
- Can chain with other Tera filters
- Dynamic key construction
- Consistent with Tera's philosophy
- Works with any string, not just literal keys

**PHP/Twig example:**
```php
// Load translations
$locale = $_SESSION['locale'] ?? 'en-GB';
$translations = json_decode(file_get_contents("i18n/{$locale}.json"), true);
$twig->addGlobal('t', $translations);
```

```twig
<!-- Twig template -->
<button class="button">{{ t.actions.submit }}</button>
```

**The Ultimate "Aha!"**: Zero JavaScript for translations! The server renders everything in the correct language. No client-side translation library needed. This approach:
- **0KB JavaScript** for i18n
- **No loading states** (text is already translated)
- **Better SEO** (search engines see translated content)
- **Faster initial render** (no JS processing)
- **Works without JavaScript** (progressive enhancement at its finest)

## The Enterprise Toolkit

You now have:
- **Multi-brand support** - One codebase, many brands
- **Web Components** - Progressive enhancement
- **Internationalization (i18n)** - Type-safe global reach
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