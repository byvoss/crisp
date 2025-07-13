# Chapter 7: Growing Seasons - Progressive Enhancement Tiers

*Or: How to grow from a seed to a forest without transplant shock*

## The Three-Tier Garden

Remember installing 200MB of node_modules for a toggle button? CRISP grows with your needs:

1. **CRISP Pure** (~50KB) - Zero JavaScript, more interactive than most JS frameworks
2. **CRISP Interactive** (~60KB) - Minimal JS for themes & enhancements
3. **CRISP Complete** (~150KB) - Full platform with components & i18n

Let's explore each tier.

## Tier 1: CRISP Pure (Zero JavaScript)

**Package**: `@byvoss/crisp-pure`  
**Size**: ~50KB  
**CDN**: `https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css`

**What it does**: Complete CSS framework with all blueprints, layouts, and design system. Includes CSS-only interactivity (accordions, tabs, dialogs) and automatic responsive behavior. Zero JavaScript required.

**When to use**: Static sites, blogs, documentation, landing pages, prototypes, any project that values simplicity and performance over complex state management.

```html
<!-- Just one link tag -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css">
```

**What you get**:

### Interactive Blueprints Without JavaScript

Remember when a toggle button required jQuery, React hooks, and a state management library? Well, grab your Earl Grey because this might shock you: CRISP's blueprints work without a single line of JavaScript. 

**The benefits are rather splendid:**
- **Lightning fast** - No script parsing, no execution time, just instant interaction
- **Battery friendly** - Your user's laptop won't sound like it's preparing for takeoff
- **Zero complexity** - No build process, no dependencies, no "Cannot read property 'undefined' of null"
- **Always works** - Even when JavaScript is disabled, broken, or still downloading on that dodgy hotel WiFi

It's like discovering your grandmother's Victoria cake recipe was perfect all along - no need for molecular gastronomy extravagance.

```html
<!-- Fully functional accordion - 100% no JS -->
<details class="disclosure" open data-key="accordion-example">
  <summary>Click to toggle</summary>
  <div class="content">
    <p class="text">No JavaScript. Just HTML.</p>
  </div>
</details>

<!-- Smooth scroll navigation - 100% no JS -->
<nav class="navigation" aria-label="Page sections" data-key="smooth-nav">
  <a class="link" href="#section1">Smooth scroll</a>
  <a class="link" href="#section2">No JS required</a>
</nav>
```

### Enhanced with Minimal Inline JS

Now, here's where it gets rather interesting. While CRISP is proudly CSS-only, we're not zealots. Some HTML5 features are like a locked garden gate - beautiful, functional, but need a tiny key (read: one line of JavaScript) to open. 

**Still Tier 1 compatible** because:
- No external scripts or libraries
- No build process or transpilation  
- No state management or event listeners
- Just a whisper of inline JS where HTML5 demands it

Think of it as adding a pinch of salt to your perfectly good chips - not essential, but it does unlock the full flavour:

```html
<!-- Dialog definition (closing works without JS) -->
<dialog class="dialog" id="example-dialog" data-key="modal-example">
  <form method="dialog">
    <h2 class="heading">Native Dialog</h2>
    <p class="text">ESC key and close button work natively.</p>
    <button class="button" type="submit" data-key="modal-close">Close</button>
  </form>
</dialog>

<!-- Opening requires a touch of inline JS -->
<button class="button" onclick="document.getElementById('example-dialog').showModal()">
  Open Dialog
</button>
```

### State Management via CSS

Who needs Redux when you have radio buttons? Behold the ancient art of state management using nothing but HTML's built-in form elements and CSS selectors. It's like discovering your car had cruise control all along - you just never pressed the right button.

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

CRISP doesn't just respond to viewport changes - it responds to user preferences, container sizes, and system settings. It's like having a sixth sense for what your users need, whether they're on a phone in bright sunlight or a desktop with reduced motion preferences.

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

HTML5 brought us built-in validation, but most developers still reach for JavaScript libraries. Why? Because they never learned the CSS pseudo-classes that make validation delightful. Watch as we turn browser validation from that annoying red border into helpful, context-aware feedback:

```html
<form class="form" data-key="validation-form">
  <!-- Email validation (most common) -->
  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input" type="email" id="email" required>
    <span class="error">Please enter a valid email</span>
  </div>

  <!-- Password with pattern (very common) -->
  <div class="field">
    <label class="label" for="password">Secure Password</label>
    <input class="input" type="password" id="password"
           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
           title="8+ chars, with uppercase, lowercase, number, and special char"
           required>
    <span class="error">Password too weak</span>
  </div>

  <!-- Number input (common for e-commerce) -->
  <div class="field">
    <label class="label" for="quantity">Quantity</label>
    <input class="input" type="number" id="quantity" 
           min="1" max="99" value="1" required>
    <span class="error">Please enter a valid quantity</span>
  </div>

  <!-- Date picker (common for bookings) -->
  <div class="field">
    <label class="label" for="booking">Booking Date</label>
    <input class="input" type="date" id="booking" 
           min="2025-01-13" 
           max="2025-12-31"
           required>
    <span class="error">Please select a valid future date</span>
  </div>

  <!-- Range slider with output -->
  <div class="field">
    <label class="label" for="rating">Rating: <output for="rating">5</output>/10</label>
    <input class="input" type="range" id="rating" 
           min="0" max="10" value="5" 
           oninput="this.previousElementSibling.querySelector('output').value = this.value">
  </div>

  <!-- Username with custom message (less common) -->
  <div class="field">
    <label class="label" for="username">Username</label>
    <input class="input" type="text" id="username" 
           pattern="[a-zA-Z0-9_-]{3,16}"
           oninvalid="this.setCustomValidity('3-16 chars, letters, numbers, _ or -')"
           oninput="this.setCustomValidity('')"
           placeholder="john_doe">
    <span class="error">Invalid username format</span>
  </div>

  <!-- Submit button (disabled by CSS when form invalid!) -->
  <button class="button" type="submit">
    Submit Form
  </button>
</form>
```

```css
/* Validation states - works for ALL validation types */
.input:invalid:not(:placeholder-shown) {
  --border-color: var(--color-error);
}

.input:valid:not(:placeholder-shown) {
  --border-color: var(--color-success);
}

/* Show/hide error messages automatically */
.input:invalid:not(:placeholder-shown) ~ .error {
  display: block;
  color: var(--color-error);
}

/* Disable submit button when form invalid - NO JS! */
.form:invalid .button[type="submit"] {
  --bg: var(--color-neutral);
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

/* Enable when valid */
.form:valid .button[type="submit"] {
  --bg: var(--color-primary);
  opacity: 1;
  pointer-events: auto;
}
```

**The "Aha!"**: Most "JavaScript blueprints" are just CSS problems in disguise.

## Tier 2: CRISP Interactive (Minimal JavaScript)

**Package**: `@byvoss/crisp-interactive`  
**Size**: ~60KB (includes Pure CSS + 10KB JS)  
**CDN**: Base CSS + `https://unpkg.com/@byvoss/crisp-interactive@latest/dist/interactive.esm.js`

**What it does**: Adds automatic theme detection, smooth transitions, and persistent user preferences. Includes light/dark/auto modes with system preference sync. Still works without JavaScript (falls back to system preference).

**When to use**: Marketing sites needing dark mode, blogs with reading preferences, small applications, any project where users expect theme options.

**Setup**:

```html
<!-- Add interactive features -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css">
<script type="module" 
        src="https://unpkg.com/@byvoss/crisp-interactive@latest/dist/interactive.esm.js">
</script>
```

Now you can enhance your Tier 1 elements:

### Enhanced Dialog with Theme Support

Remember our dialog from Tier 1? Now it adapts to themes:

```html
<!-- Same dialog, now theme-aware -->
<dialog class="dialog" id="theme-dialog" data-key="themed-modal">
  <form method="dialog">
    <h2 class="heading">Theme-Aware Dialog</h2>
    <p class="text">This dialog respects your theme preference!</p>
    <button class="button" type="submit">Close</button>
  </form>
</dialog>

<!-- Open button now shows theme state -->
<button class="button" 
        onclick="document.getElementById('theme-dialog').showModal()"
        data-theme-aware="true">
  Open Themed Dialog
</button>
```

### Enhanced Form with Theme-Aware Validation

Our validation form now has theme-appropriate colors:

```javascript
// Automatically adjusts validation colors per theme
document.documentElement.style.setProperty(
  '--color-error',
  theme === 'dark' ? 'oklch(65% 0.3 25)' : 'oklch(55% 0.3 25)'
);
```

### Automatic Theme Detection

```javascript
// Automatically applied by CRISP Interactive
const theme = window.matchMedia('(prefers-color-scheme: dark)').matches 
  ? 'dark' 
  : 'light';
document.documentElement.dataset.theme = theme;
```

### Theme Persistence

```javascript
// Remembers user choice across sessions
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

## Tier 3: CRISP Complete (Full Platform)

**Package**: `@byvoss/crisp-complete`  
**Size**: ~150KB (includes everything)  
**CDN**: Base CSS + `https://unpkg.com/@byvoss/crisp-complete@latest/dist/complete.esm.js`

**What it does**: Adds Web Components that generate semantic CRISP HTML, full TypeScript support, i18n system, and complex UI patterns. Components are HTML generators, not black boxes - they output vanilla CRISP blueprints.

**When to use**: International applications, complex web apps, enterprise software, teams needing TypeScript, projects requiring data tables, date pickers, or other advanced UI components.

**Setup**:

```html
<!-- Full platform -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css">
<script type="module" 
        src="https://unpkg.com/@byvoss/crisp-complete@latest/dist/complete.esm.js">
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
import { CrispTable } from '@byvoss/crisp-complete';

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
        href="https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css"
        crossorigin="anonymous">
</head>
<body>
  <!-- Your content -->
  
  <!-- 2. Optional theme (before layout shift) -->
  <script type="module" 
          src="https://unpkg.com/@byvoss/crisp-interactive@latest/dist/interactive.esm.js"
          crossorigin="anonymous">
  </script>
  
  <!-- 3. Optional components (lazy load) -->
  <script type="module" 
          src="https://unpkg.com/@byvoss/crisp-complete@latest/dist/complete.esm.js"
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
      href="https://unpkg.com/@byvoss/crisp-pure@1.0.0/dist/crisp.min.css">
<script type="module" 
        src="https://unpkg.com/@byvoss/crisp-interactive@1.0.0/dist/interactive.esm.js">
</script>
```

## Your Growth Path

1. **Start with CSS** - Build everything
2. **Add themes when needed** - Not before
3. **Add components when complexity demands** - Not for fun

**The "Aha!"**: You might never need Tier 2 or 3. Tier 1 is that powerful.

Ready to make everything accessible by default?

→ Continue to [Chapter 8: Garden for All - Accessibility First](./CH08-accessibility.md)