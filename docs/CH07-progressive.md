# Chapter 7: Growing Seasons - Progressive Enhancement Tiers

*Or: How to grow from a seed to a forest without transplant shock*

## The Three-Tier Garden

Remember installing 200MB of node_modules for a toggle button? CRISP grows with your needs:

1. **CRISP Pure** (~50KB) - Zero JavaScript, more interactive than most JS frameworks
2. **CRISP Interactive** (~60KB) - Minimal JS for themes & enhancements
3. **CRISP Crown** (~150KB) - Full platform with components & i18n

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

**What you get**: A complete, pre-built CSS file with all blueprints included. No build process needed on your end. (Curious about how these blueprints are compiled? See [Chapter 17: Distribution](./CH17-distribution.md))

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

**What's added**: A small JavaScript module (~10KB) that adds theme switching and persistence. The JavaScript source is already compiled and optimized. (Build details → [Chapter 17](./CH17-distribution.md))

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

### Zero CLS Professional Technique

Modern browsers render pages progressively, which can cause elements to jump around as resources load - devastating for both user experience and SEO rankings. The professional solution? Show the complete page once it's ready, rather than in jarring pieces. Here's the enterprise-standard approach:

```html
<!-- In your <head> - before any CSS -->
<style>html{visibility:hidden;opacity:0}</style>

<!-- At the end of <head> or start of <body> -->
<script>
  // Reveal when initial styles are ready
  requestAnimationFrame(() => {
    document.documentElement.style.visibility = 'visible';
    document.documentElement.style.opacity = '1';
    document.documentElement.style.transition = 'opacity 0.2s';
  });
</script>
```

**Why this is standard practice:**
- Prevents content jumping (CLS = 0)
- Better perceived performance (cohesive reveal vs piecemeal loading)
- On decent infrastructure: 400-800ms total load time
- Users see a complete, stable page instead of a construction site

**The philosophy:** It's more professional to show a complete page after a brief moment than to show a broken page immediately. Quality over raw speed.

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

## Tier 3: CRISP Crown (Full Platform)

**Package**: `@byvoss/crisp-crown`  
**Size**: ~150KB (includes everything)  
**CDN**: Base CSS + `https://unpkg.com/@byvoss/crisp-crown@latest/dist/crown.esm.js`

**What it does**: Adds Web Components that generate semantic CRISP HTML, full TypeScript support, i18n system, and complex UI patterns. Components are HTML generators, not black boxes - they output vanilla CRISP blueprints.

**When to use**: International applications, complex web apps, enterprise software, teams needing TypeScript, projects requiring data tables, date pickers, or other advanced UI components.

**Setup**:

```html
<!-- Full platform -->
<link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css">
<script type="module" 
        src="https://unpkg.com/@byvoss/crisp-crown@latest/dist/crown.esm.js">
</script>
```

**What's included**: All the TypeScript components and i18n system, pre-compiled into an ES module. The source `.ts` files from the blueprint folders are already built - you just use the components. (Full architecture details → [Chapter 17](./CH17-distribution.md))

### What Are CRISP Web Components?

Imagine if your HTML could write itself. Not the dystopian AI takeover kind, but the helpful assistant kind - like having a very competent intern who knows all your design patterns by heart. That's what CRISP Web Components do: they take your intent and generate perfect, semantic CRISP HTML.

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

**Server-side with Rust/Tera:**
```html
<!-- Dynamic search with suggestions from your database -->
<crisp-search 
  placeholder="{{ search_config.placeholder | default(value='Search...') }}"
  data-key="search-{{ search_config.context }}"
  data-suggestions-url="/api/search/{{ search_config.context }}/suggestions"
  data-min-chars="{{ search_config.min_chars | default(value=2) }}">
</crisp-search>
```

**The "Aha!"**: Web Components generate vanilla CRISP HTML. No shadow DOM mysteries. Full CSS customisation.

### Enterprise Blueprints Available

Remember the blueprint folder structure from Chapter 5? In Tier 3, each blueprint folder expands with new powers:

```
blueprints/
├── table/
│   ├── table.css          # Tier 1: Basic table styles
│   ├── table.ts           # Tier 3: Sorting, filtering, pagination
│   └── table.tera         # Tier 3: Server-side generation
├── datepicker/
│   ├── datepicker.css     # Tier 1: Input styling
│   ├── datepicker.ts      # Tier 3: Calendar logic
│   └── datepicker.tera    # Tier 3: Locale-aware dates
└── ... (all Crown blueprints follow this pattern)
```

**Important**: This is the source structure. When you use Tier 3, you get pre-compiled components in `crown.esm.js` and aggregated macros in `base.tera`. (See [Chapter 17](./CH17-distribution.md) for how the build process works)

Remember building a data table from scratch? The endless hours of sorting logic, filter implementations, and accessibility attributes? Well, put down that coffee and step away from Stack Overflow. CRISP Crown brings the heavy machinery - pre-built patterns for the complex UI that makes developers weep.

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

**Server-side with Rust/Tera:**
```html
<!-- Dynamic user table with permissions -->
<crisp-table 
  data-source="{{ api_config.base_url }}/users"
  columns="{{ table_config.columns | join(sep=',') }}"
  {% if user_permissions.can_sort %}sortable{% endif %}
  {% if user_permissions.can_filter %}filterable{% endif %}
  data-key="users-{{ department.slug }}"
  data-page-size="{{ pagination.per_page | default(value=25) }}">
</crisp-table>

<!-- Autocomplete with dynamic endpoints -->
<crisp-autocomplete 
  source="{{ api_endpoints.search }}"
  min-chars="{{ search_settings.min_chars }}"
  debounce="{{ search_settings.debounce_ms }}"
  data-key="search-{{ search_context }}"
  placeholder="{{ 'search.placeholder' | t }}">
</crisp-autocomplete>

<!-- Date picker with business rules -->
<crisp-datepicker 
  format="{{ locale_settings.date_format }}"
  min="{{ booking_rules.min_date | date(format='%Y-%m-%d') }}"
  max="{{ booking_rules.max_date | date(format='%Y-%m-%d') }}"
  data-key="booking-date"
  data-blocked-dates="{{ blocked_dates | json_encode }}">
</crisp-datepicker>

<!-- Content editor with role-based features -->
<crisp-editor 
  toolbar="{{ user_role.editor_toolbar | default(value='basic') }}"
  max-length="{{ content_rules.max_length }}"
  data-key="content-{{ content_type }}"
  data-upload-url="{% if user_permissions.can_upload %}/api/upload{% endif %}">
</crisp-editor>
```

### Smart Text Management (Not Just i18n)

Here's the clever bit: even if your site only speaks one language, the text management system is brilliant for consistency. Define your button text once, use it everywhere. Need to change "Submit" to "Send"? One edit, updates everywhere. Oh, and if you DO add languages later, it just works - your German users automatically see "Absenden" without touching your templates.

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

For those who like their JavaScript with training wheels (and we mean that in the best possible way), CRISP Crown comes with full TypeScript definitions. Every property, every method, every event - all typed tighter than a Victorian corset, but considerably more comfortable to work with.

```typescript
// Full type safety
import { CrispTable } from '@byvoss/crisp-crown';

const table = document.querySelector<CrispTable>('crisp-table');
table.columns = ['name', 'email', 'status'];
table.data = await fetchUsers();
```

### Bonus: Rust Server Blueprint

Fancy seeing CRISP at warp speed? We've included a production-ready Rust server blueprint. One command creates everything you need:

```bash
# Create a complete CRISP + Rust project
curl -sSf https://crisp.byvoss.tech/create-crisp-server.sh | sh

# Interactive setup:
# Project name: My Amazing Site
# Type: [local/server]? local
# URL: my-site.com
# → Creates: local.my-site.com (auto-adds to /etc/hosts)
# Web server: [Apache2/Nginx]? Nginx
# → Generates perfect reverse proxy config

# What you get:
# ✓ Axum web server (blazing fast)
# ✓ Tera templates with CRISP HTML
# ✓ Text management system built-in  
# ✓ All CRISP assets served efficiently
# ✓ Custom nginx/Apache config for YOUR setup
# ✓ systemd service file (server mode only)
```

**Start developing immediately:**
```bash
cd my-crisp-app
cargo run

# Visit http://localhost:3000
# Edit templates in templates/
# Texts in texts/en-GB.json
# Automatic hot-reload included
```

**What's Included:**

The Rust server blueprint includes:
- Pre-configured Axum web server (~8MB total)
- Tera templates with CRISP HTML
- All CRISP blueprints as macros
- Text management system
- Session handling
- Hot-reload in development

Think of it as a mini-CMS foundation - everything you need to build a production site, nothing you don't. For detailed implementation patterns and macro usage, see Chapter 14.

**Deploy to production:**
```bash
cargo build --release
sudo cp target/release/crisp-server /usr/local/bin/
sudo cp crisp-server.service /etc/systemd/system/
sudo systemctl enable --now crisp-server

# Done! Your site is live.
```

The entire server is ~8MB. Yes, megabytes. Not gigabytes. No node_modules folder, no build step, just instant productivity. See Chapter 14 for the mind-blowing performance comparisons.

## The Progressive Path

Like a well-planned garden, CRISP grows with you. Start with a seed (Pure CSS), add water when needed (Interactive features), and eventually cultivate a full ecosystem (Complete platform). No transplant shock, no growing pains - just natural progression.

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

Numbers don't lie, and these numbers are positively giddy with excitement. Watch as your Lighthouse scores do a happy dance while your users' batteries breathe a sigh of relief. Here's what each tier costs (spoiler: not much).

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

This is the secret sauce, the philosopher's stone of web development: write once, enhance progressively. Your HTML doesn't need to know which tier it's running in - it just gets better features automatically, like a phone getting OS updates but without the planned obsolescence.

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

The art of loading resources is like conducting an orchestra - timing is everything. Too early and you block the render, too late and you get layout shifts. Here's the perfect symphony, refined through countless performance audits and user tears.

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
          src="https://unpkg.com/@byvoss/crisp-crown@latest/dist/crown.esm.js"
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

Like choosing the right tea for the occasion, picking your CRISP tier is about matching the tool to the task. Start with Pure (Earl Grey - classic, reliable), move to Interactive when users demand themes (English Breakfast - bit more robust), and reach for Complete only when complexity truly demands it (Builder's Tea - gets the job done).

1. **Start with CSS** - Build everything
2. **Add themes when needed** - Not before
3. **Add components when complexity demands** - Not for fun

**The "Aha!"**: You might never need Tier 2 or 3. Tier 1 is that powerful.

Ready to make everything accessible by default?

→ Continue to [Chapter 8: Garden for All - Accessibility First](./CH08-accessibility.md)