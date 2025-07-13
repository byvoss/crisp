# Chapter 7: Growing Seasons - Progressive Enhancement Tiers

*Or: How to grow from a seed to a forest without transplant shock*

## The Three-Tier Garden

Remember installing 200MB of node_modules for a toggle button? CRISP grows with your needs:

1. **CRISP** (~50KB) - Pure CSS, more interactive than most JS frameworks
2. **CRISP Theme** (~60KB) - Add theme switching, that's it
3. **CRISP Enterprise** (~150KB) - Web Components and internationalisation

Let's explore each tier.

## Tier 1: CRISP (The CSS-Only Wonder)

**Package**: `@byvoss/crisp`  
**Size**: ~50KB  
**CDN**: `https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css`

**What it does**: Complete CSS framework with all blueprints, layouts, and design system. Includes CSS-only interactivity (accordions, tabs, dialogs) and automatic responsive behavior. Zero JavaScript required.

**When to use**: Static sites, blogs, documentation, landing pages, prototypes, any project that values simplicity and performance over complex state management.

```html
<!-- Just one link tag -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css">
```

**What you get**:

### Interactive Blueprints Without JavaScript

```html
<!-- Fully functional accordion -->
<details class="disclosure" open data-key="accordion-example">
  <summary>Click to toggle</summary>
  <div class="content">
    <p class="text">No JavaScript. Just HTML.</p>
  </div>
</details>

<!-- Dialog with backdrop -->
<dialog class="dialog" id="modal" data-key="modal-example">
  <form method="dialog">
    <h2 class="heading">Native Dialog</h2>
    <p class="text">Press Escape to close. No library needed.</p>
    <button class="button" type="submit" data-key="modal-close">Close</button>
  </form>
</dialog>

<!-- Smooth scroll navigation -->
<nav class="navigation" aria-label="Page sections" data-key="smooth-nav">
  <a class="link" href="#section1">Smooth scroll</a>
  <a class="link" href="#section2">No JS required</a>
</nav>
```

### State Management via CSS

```html
<!-- Tab interface (CSS only!) -->
<div class="tabs" role="tablist" data-key="css-tabs">
  <input type="radio" name="tabs" id="tab1" checked>
  <label class="tab" for="tab1" role="tab">Tab 1</label>
  
  <input type="radio" name="tabs" id="tab2">
  <label class="tab" for="tab2" role="tab">Tab 2</label>
  
  <div class="panel" role="tabpanel">
    <p class="text">Tab 1 content</p>
  </div>
  
  <div class="panel" role="tabpanel">
    <p class="text">Tab 2 content</p>
  </div>
</div>
```

### Responsive Everything

```css
/* Container queries built in */
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    --layout: horizontal;
  }
}

/* Preference queries */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Automatic dark mode */
  }
}
```

### Form Validation Styling

```html
<form class="form" data-key="validation-form">
  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input" type="email" id="email" required>
    <span class="error">Please enter a valid email</span>
  </div>
</form>
```

```css
/* Validation states */
.input:invalid:not(:placeholder-shown) {
  --border-color: var(--color-error);
}

.input:invalid:not(:placeholder-shown) ~ .error {
  display: block;
}
```

**The "Aha!"**: Most "JavaScript blueprints" are just CSS problems in disguise.

## Tier 2: CRISP Theme (Dark Mode & Beyond)

**Package**: `@byvoss/crisp-theme`  
**Size**: ~60KB (includes CRISP + 10KB theme system)  
**CDN**: Base CSS + `https://unpkg.com/@byvoss/crisp-theme@latest/dist/theme.esm.js`

**What it does**: Adds automatic theme detection, smooth transitions, and persistent user preferences. Includes light/dark/auto modes with system preference sync. Still works without JavaScript (falls back to system preference).

**When to use**: Marketing sites needing dark mode, blogs with reading preferences, small applications, any project where users expect theme options.

**Setup**:

```html
<!-- Add theme switcher -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css">
<script type="module" 
        src="https://unpkg.com/@byvoss/crisp-theme@latest/dist/theme.esm.js">
</script>
```

Now you can:

### Automatic Theme Detection

```javascript
// Automatically applied
const theme = window.matchMedia('(prefers-color-scheme: dark)').matches 
  ? 'dark' 
  : 'light';
document.documentElement.dataset.theme = theme;
```

### Theme Persistence

```javascript
// Remembers user choice
const savedTheme = localStorage.getItem('theme') || 'auto';
document.documentElement.dataset.theme = savedTheme;
```

### Theme Toggle UI

```html
<!-- Pre-built theme toggle -->
<button class="theme-toggle" aria-label="Toggle theme" data-key="theme-toggle">
  <span class="icon-light">☀️</span>
  <span class="icon-dark">🌙</span>
  <span class="icon-auto">🌓</span>
</button>
```

### Multiple Theme Support

```html
<!-- Not just dark/light -->
<select class="theme-selector" aria-label="Choose theme" data-key="theme-selector">
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="high-contrast">High Contrast</option>
  <option value="cyberpunk">Cyberpunk</option>
</select>
```

**The "Aha!"**: 10KB of JavaScript for theme switching. Not 200KB.

## Tier 3: CRISP Enterprise (Web Components)

**Package**: `@byvoss/crisp-enterprise`  
**Size**: ~150KB (includes everything + 90KB components)  
**CDN**: All previous + `https://unpkg.com/@byvoss/crisp-enterprise@latest/dist/components.esm.js`

**What it does**: Adds Web Components that generate semantic CRISP HTML, full TypeScript support, i18n system, and complex UI patterns. Components are HTML generators, not black boxes - they output vanilla CRISP blueprints.

**When to use**: International applications, complex web apps, enterprise software, teams needing TypeScript, projects requiring data tables, date pickers, or other advanced UI components.

**Setup**:

```html
<!-- Full platform -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css">
<script type="module" 
        src="https://unpkg.com/@byvoss/crisp-theme@latest/dist/theme.esm.js">
</script>
<script type="module" 
        src="https://unpkg.com/@byvoss/crisp-enterprise@latest/dist/components.esm.js">
</script>
```

### What Are CRISP Web Components?

**NOT** another blueprint library. They're HTML generators:

```html
<!-- Write this -->
<crisp-search placeholder="Search products..." data-key="product-search"></crisp-search>

<!-- Blueprint generates this -->
<form class="search as-cluster" role="search" data-key="product-search">
  <input class="input" type="search" placeholder="Search products..." 
         aria-label="Search">
  <button class="button with-interaction" type="submit">
    <span class="icon">🔍</span>
    <span class="sr-only">Search</span>
  </button>
</form>
```

**The "Aha!"**: Web Components generate vanilla CRISP HTML. No shadow DOM mysteries. Full CSS customisation.

### Enterprise Blueprints Available

```html
<!-- Data table with sorting/filtering -->
<crisp-table 
  data-source="/api/users" 
  columns="name,email,role"
  sortable
  filterable
  data-key="users-table">
</crisp-table>

<!-- Auto-complete search -->
<crisp-autocomplete 
  source="/api/search"
  min-chars="2"
  debounce="300"
  data-key="search-autocomplete">
</crisp-autocomplete>

<!-- Date picker -->
<crisp-datepicker 
  format="dd/mm/yyyy"
  min="2024-01-01"
  max="2025-12-31"
  data-key="date-picker">
</crisp-datepicker>

<!-- Rich text editor -->
<crisp-editor 
  toolbar="basic"
  max-length="5000"
  data-key="content-editor">
</crisp-editor>
```

### Internationalisation Built In

```html
<!-- Components auto-translate -->
<html lang="de">
  <crisp-datepicker data-key="german-datepicker"></crisp-datepicker>
  <!-- Shows German month names, formats -->
</html>

<!-- Or explicit -->
<crisp-table locale="fr-FR" data-key="french-table">
  <!-- French interface -->
</crisp-table>
```

### TypeScript Support

```typescript
// Full type safety
import { CrispTable } from '@byvoss/crisp-enterprise';

const table = document.querySelector<CrispTable>('crisp-table');
table.columns = ['name', 'email', 'status'];
table.data = await fetchUsers();
```

## The Progressive Path

### Starting Small

```html
<!-- Day 1: Just CSS -->
<link rel="stylesheet" href="...crisp.min.css">
<!-- Build your entire site -->
```

### Growing Needs

```html
<!-- Month 2: Add theme switching -->
<script type="module" src="...theme.esm.js"></script>
<!-- 10KB addition -->
```

### Enterprise Scale

```html
<!-- Year 2: Complex interactions -->
<script type="module" src="...components.esm.js"></script>
<!-- Only when needed -->
```

## Performance at Each Tier

### Tier 1 Performance
- Initial Load: ~50KB CSS
- No JavaScript execution
- Paint time: <100ms
- Interactive: Immediate
- Battery impact: Minimal

### Tier 2 Performance
- Additional: ~10KB JS
- Theme switch: <16ms
- LocalStorage: 1 key
- Battery impact: Negligible

### Tier 3 Performance
- Additional: ~90KB JS
- Lazy loaded components
- Tree-shaken imports
- Battery impact: On-demand

## The Same HTML Works Everywhere

The magic of progressive enhancement:

```html
<!-- This HTML works in all tiers -->
<article class="card as-stack with-shadow" data-key="universal-card">
  <h3 class="heading">Universal Blueprint</h3>
  <p class="text">Works with CSS only.</p>
  <p class="text">Enhanced with themes.</p>
  <p class="text">Supercharged with components.</p>
</article>
```

No rewriting. No migration. Just enhancement.

## CDN Loading Strategy

### Optimal Loading Order

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- 1. Critical CSS -->
  <link rel="stylesheet" 
        href="https://unpkg.com/@byvoss/crisp@latest/dist/crisp.min.css"
        crossorigin="anonymous">
</head>
<body>
  <!-- Your content -->
  
  <!-- 2. Optional theme (before layout shift) -->
  <script type="module" 
          src="https://unpkg.com/@byvoss/crisp-theme@latest/dist/theme.esm.js"
          crossorigin="anonymous">
  </script>
  
  <!-- 3. Optional components (lazy load) -->
  <script type="module" 
          src="https://unpkg.com/@byvoss/crisp-enterprise@latest/dist/components.esm.js"
          crossorigin="anonymous"
          defer>
  </script>
</body>
</html>
```

### Version Locking

```html
<!-- Lock to specific versions -->
<link rel="stylesheet" 
      href="https://unpkg.com/@byvoss/crisp@1.0.0/dist/crisp.min.css">
<script type="module" 
        src="https://unpkg.com/@byvoss/crisp-theme@1.0.0/dist/theme.esm.js">
</script>
```

## Your Growth Path

1. **Start with CSS** - Build everything
2. **Add themes when needed** - Not before
3. **Add components when complexity demands** - Not for fun

**The "Aha!"**: You might never need Tier 2 or 3. Tier 1 is that powerful.

Ready to make everything accessible by default?

→ Continue to [Chapter 8: Garden for All - Accessibility First](./CH08-accessibility.md)