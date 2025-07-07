# Chapter 9: Navigation - Finding Your Way

*Or: How to help users navigate without needing a GPS*

## The Navigation Nightmare

Remember this labyrinth of classes?

```css
/* Monday: "Let's use Bootstrap's nav!" */
.nav { }
.navbar { }
.navbar-nav { }
.nav-item { }
.nav-link { }
.nav-link.active { }
.navbar-expand-lg { }
.navbar-toggler { }
.navbar-collapse { }
/* Plus 37 utility classes */

/* Tuesday: "Actually, let's go BEM" */
.nav { }
.nav__list { }
.nav__item { }
.nav__item--active { }
.nav__link { }
.nav__link--current { }
.nav__dropdown { }
.nav__dropdown-menu { }
.nav__dropdown-item { }
/* BEM hell achieved */

/* Wednesday: "Material Design will save us!" */
.mdc-navigation { }
.mdc-navigation__list { }
.mdc-navigation__item { }
/* 200KB of JavaScript later... */

/* Thursday: *Builds own nav system* */
/* Friday: *Quits to become a shepherd* */
```

**The "Aha!"**: What if navigation was just... semantic HTML with `data-entries`?

## The CRISP Way: Navigation That Makes Sense

*Navigation is about wayfinding, not class-finding*

One navigation class. Semantic HTML. Always include `data-entries`. Done.

## Core Navigation

### Nav - The Foundation

```html
<!-- Basic navigation -->
<nav class="navigation" data-entries="4" aria-label="Main navigation">
  <a class="link" href="/" aria-current="page">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/services">Services</a>
  <a class="link" href="/contact">Contact</a>
</nav>

<!-- Navigation with layout -->
<nav class="navigation as-cluster" data-entries="4" aria-label="Main navigation">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/services">Services</a>
  <a class="link" href="/contact">Contact</a>
</nav>

<!-- Vertical navigation -->
<nav class="navigation as-stack" data-entries="3" aria-label="Sidebar navigation">
  <a class="link" href="/dashboard">Dashboard</a>
  <a class="link" href="/projects">Projects</a>
  <a class="link" href="/settings">Settings</a>
</nav>

<!-- Navigation with sections -->
<nav class="navigation as-stack" data-entries="2" aria-label="Documentation">
  <section class="as-stack">
    <h3 class="heading" style="--size: var(--text-size-0-875);">
      Getting Started
    </h3>
    <a class="link" href="/docs/intro">Introduction</a>
    <a class="link" href="/docs/install">Installation</a>
  </section>
  
  <section class="as-stack">
    <h3 class="heading" style="--size: var(--text-size-0-875);">
      Guides
    </h3>
    <a class="link" href="/docs/components">Components</a>
    <a class="link" href="/docs/layouts">Layouts</a>
  </section>
</nav>

<!-- Context-aware navigation -->
<nav class="navigation" data-entries="3" data-variant="authenticated" aria-label="User menu">
  <a class="link" href="/profile">Profile</a>
  <a class="link" href="/settings">Settings</a>
  <a class="link" href="/logout">Sign Out</a>
</nav>
```

```css
@layer crisp {
  .navigation {
    /* Type-safe properties */
    @property --gap {
      syntax: "<length>";
      inherits: false;
      initial-value: var(--space-1-0);
    }
    
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: transparent;
    }
    
    /* Use them */
    gap: var(--gap);
    background: var(--bg);
    
    /* Pro tip: data-entries helps with responsive design */
    &[data-entries="10"] {
      /* Maybe switch to hamburger menu? */
    }
  }
  
  /* Context wins */
  [data-variant="authenticated"] .navigation {
    --bg: oklch(95% 0.02 250);
  }
}
```

**The "Aha!"**: `data-entries` isn't just semantic - it helps CSS make smart decisions!

### Breadcrumb - The Trail

*Like Hansel and Gretel, but with better outcomes*

```html
<!-- Basic breadcrumb -->
<nav class="breadcrumb" data-entries="3" aria-label="Breadcrumb">
  <ol class="list as-cluster">
    <li><a class="link" href="/">Home</a></li>
    <li><a class="link" href="/products">Products</a></li>
    <li><a class="link" aria-current="page">Laptops</a></li>
  </ol>
</nav>

<!-- With separators -->
<nav class="breadcrumb" data-entries="3" aria-label="Breadcrumb">
  <ol class="list as-cluster" style="--cluster-gap: var(--space-0-5);">
    <li>
      <a class="link" href="/">Home</a>
      <span class="separator" aria-hidden="true">/</span>
    </li>
    <li>
      <a class="link" href="/docs">Docs</a>
      <span class="separator" aria-hidden="true">/</span>
    </li>
    <li>
      <span aria-current="page">Navigation</span>
    </li>
  </ol>
</nav>

<!-- Schema.org friendly (Google loves this) -->
<nav class="breadcrumb" data-entries="3" aria-label="Breadcrumb">
  <ol class="list as-cluster" itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a class="link" itemprop="item" href="/">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a class="link" itemprop="item" href="/products">
        <span itemprop="name">Products</span>
      </a>
      <meta itemprop="position" content="2">
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Current Product</span>
      <meta itemprop="position" content="3">
    </li>
  </ol>
</nav>

<!-- Context-aware breadcrumb -->
<nav class="breadcrumb" data-entries="2" data-theme="dark" aria-label="Breadcrumb">
  <ol class="list as-cluster">
    <li><a class="link" href="/">Home</a></li>
    <li><span aria-current="page">Current</span></li>
  </ol>
</nav>
```

### Pagination - Page Navigation

*Because infinite scroll isn't always the answer*

```html
<!-- Basic pagination -->
<nav class="pagination" data-entries="5" aria-label="Pagination">
  <ol class="list as-cluster">
    <li>
      <a class="link" href="?page=1" aria-label="Previous page">
        ← Previous
      </a>
    </li>
    <li>
      <a class="link" href="?page=1">1</a>
    </li>
    <li>
      <a class="link" href="?page=2" aria-current="page">2</a>
    </li>
    <li>
      <a class="link" href="?page=3">3</a>
    </li>
    <li>
      <a class="link" href="?page=3" aria-label="Next page">
        Next →
      </a>
    </li>
  </ol>
</nav>

<!-- Compact pagination -->
<nav class="pagination as-cluster" data-entries="3" aria-label="Pagination" 
  style="--cluster-align: space-between;">
  <a class="link" href="?page=1" rel="prev">← Previous</a>
  <span class="text">Page 2 of 10</span>
  <a class="link" href="?page=3" rel="next">Next →</a>
</nav>

<!-- Load more pattern (the lazy way) -->
<nav class="pagination as-center" data-entries="1" aria-label="Load more">
  <button class="button" type="button"
    aria-label="Load more articles"
    onclick="loadMore()">
    Load More Articles
  </button>
</nav>

<!-- Pagination with context -->
<nav class="pagination" data-entries="3" data-variant="search-results" aria-label="Search results pagination">
  <ol class="list as-cluster">
    <li><a class="link" href="?page=1">1</a></li>
    <li><a class="link" href="?page=2" aria-current="page">2</a></li>
    <li><a class="link" href="?page=3">3</a></li>
  </ol>
</nav>
```

### Tabs - Content Switching

*No JavaScript? No problem! Radio buttons to the rescue*

```html
<!-- Tab navigation -->
<div class="tabs" data-entries="3" data-orientation="horizontal">
  <!-- Hidden radio buttons -->
  <input class="radio" id="tab-1" type="radio" name="tabs" checked>
  <input class="radio" id="tab-2" type="radio" name="tabs">
  <input class="radio" id="tab-3" type="radio" name="tabs">
  
  <!-- Tab labels -->
  <nav class="navigation as-cluster" data-entries="3" role="tablist">
    <label class="tab" for="tab-1" role="tab" aria-selected="true">
      Overview
    </label>
    <label class="tab" for="tab-2" role="tab">
      Features
    </label>
    <label class="tab" for="tab-3" role="tab">
      Pricing
    </label>
  </nav>
  
  <!-- Tab panels -->
  <div class="panels">
    <section class="panel as-stack" role="tabpanel" aria-labelledby="tab-1">
      <h2>Overview</h2>
      <p>Overview content...</p>
    </section>
    
    <section class="panel as-stack" role="tabpanel" aria-labelledby="tab-2">
      <h2>Features</h2>
      <p>Features content...</p>
    </section>
    
    <section class="panel as-stack" role="tabpanel" aria-labelledby="tab-3">
      <h2>Pricing</h2>
      <p>Pricing content...</p>
    </section>
  </div>
</div>
```

CSS magic (watch and learn):
```css
@layer crisp {
  /* Hide radio buttons (but keep them accessible) */
  .tabs input[type="radio"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  
  /* Hide all panels by default */
  .tabs .panel {
    display: none;
  }
  
  /* Show the chosen one */
  #tab-1:checked ~ .panels .panel:nth-of-type(1),
  #tab-2:checked ~ .panels .panel:nth-of-type(2),
  #tab-3:checked ~ .panels .panel:nth-of-type(3) {
    display: block;
    animation: fadeIn 0.3s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Tab styling (the pretty part) */
  .tab {
    /* Type-safe properties */
    @property --border-color {
      syntax: "<color>";
      inherits: false;
      initial-value: transparent;
    }
    
    --padding: var(--space-0-75) var(--space-1-5);
    --border-width: 2px;
    --active-color: var(--color-primary);
    
    /* Apply them */
    cursor: pointer;
    padding: var(--padding);
    border-bottom: var(--border-width) solid var(--border-color);
    transition: all var(--transition-fast);
    
    &:hover {
      --border-color: oklch(from var(--active-color) l c h / 0.3);
    }
  }

/* Active tab styling */
#tab-1:checked ~ nav .tab:nth-of-type(1),
#tab-2:checked ~ nav .tab:nth-of-type(2),
#tab-3:checked ~ nav .tab:nth-of-type(3) {
  --border-color: var(--active-color);
}

/* Vertical tabs */
[data-orientation="vertical"] .tab {
  border-bottom: none;
  border-left: var(--border-width) solid var(--border-color);
}
```

## Advanced Navigation Patterns

*When simple navigation isn't enough to impress the CEO*

### Mega Menu

*Because sometimes you need to show EVERYTHING*

```html
<nav class="navigation" data-entries="3" aria-label="Main navigation" data-type="mega">
  <div class="as-cluster">
    <!-- Regular links -->
    <a class="link" href="/">Home</a>
    
    <!-- Mega menu item -->
    <div class="dropdown">
      <button class="button" aria-expanded="false" aria-controls="products-menu">
        Products ▼
      </button>
      
      <div class="dropdown-menu as-grid" id="products-menu" hidden
        style="--grid-columns: 3; --grid-gap: var(--space-2-0);" data-entries="3">
        <section class="as-stack" data-entries="4">
          <h3 class="heading">Hardware</h3>
          <a class="link" href="/laptops">Laptops</a>
          <a class="link" href="/desktops">Desktops</a>
          <a class="link" href="/accessories">Accessories</a>
        </section>
        
        <section class="as-stack" data-entries="4">
          <h3 class="heading">Software</h3>
          <a class="link" href="/os">Operating Systems</a>
          <a class="link" href="/apps">Applications</a>
          <a class="link" href="/utilities">Utilities</a>
        </section>
        
        <section class="card as-stack" data-featured="true">
          <h3 class="heading">Featured</h3>
          <img class="image" src="new-laptop.jpg" alt="">
          <p class="text">Check out our latest laptop</p>
          <a class="link" href="/featured" role="button">Learn more</a>
        </section>
      </div>
    </div>
    
    <a class="link" href="/contact">Contact</a>
  </div>
</nav>
```

```css
@layer crisp {
  .dropdown-menu {
    /* Type-safe all the things */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-background);
    }
    
    --shadow: var(--shadow-elevated);
    --padding: var(--space-2-0);
    
    /* Make it float */
    position: absolute;
    background: var(--bg);
    box-shadow: var(--shadow);
    padding: var(--padding);
    z-index: 100;
    
    /* Smooth entry */
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.2s ease-out;
    
    &:not([hidden]) {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Featured section (because marketing) */
  [data-featured="true"] {
    --bg: oklch(95% 0.05 50); /* Subtle gold */
  }
}
```

**The "Aha!"**: Mega menus don't need mega JavaScript. Just semantic HTML and CSS.

### Mobile Navigation

*The hamburger icon: Not just for restaurants anymore*

```html
<!-- Mobile nav toggle -->
<button class="button mobile-toggle" 
  aria-label="Toggle navigation"
  aria-expanded="false"
  aria-controls="mobile-nav"
  data-action="menu-toggle">
  <span class="hamburger"></span>
</button>

<!-- Mobile navigation (the slide-in kind) -->
<nav class="navigation mobile-nav as-stack" 
  id="mobile-nav"
  data-entries="4"
  aria-label="Mobile navigation"
  data-state="closed"
  hidden>
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/services">Services</a>
  <a class="link" href="/contact">Contact</a>
</nav>
```

CSS for mobile (responsive without tears):
```css
@layer crisp {
  /* Hide desktop nav on mobile */
  @media (max-width: 768px) {
    .navigation:not(.mobile-nav) {
      display: none;
    }
  }
  
  .mobile-nav {
    /* Type-safe mobile menu */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-background);
    }
    
    --padding: var(--space-2-0);
    
    /* Full screen takeover */
    position: fixed;
    inset: 0;
    background: var(--bg);
    padding: var(--padding);
    z-index: 100;
    
    /* Slide in from the right */
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
    
    &[data-state="open"] {
      transform: translateX(0);
    }
  }
  
  /* Hamburger animation (because why not) */
  .hamburger {
    display: block;
    width: 24px;
    height: 2px;
    background: currentColor;
    position: relative;
    transition: all 0.3s ease;
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: currentColor;
      transition: all 0.3s ease;
    }
    
    &::before { top: -8px; }
    &::after { top: 8px; }
    
    /* X marks the spot */
    [aria-expanded="true"] & {
      background: transparent;
      
      &::before {
        top: 0;
        transform: rotate(45deg);
      }
      
      &::after {
        top: 0;
        transform: rotate(-45deg);
      }
    }
  }
}
```

### Sticky Navigation

*Like a loyal dog, but for headers*

```html
<header class="header with-sticky" style="--top: 0;">
  <nav class="navigation as-container" data-entries="2" aria-label="Main navigation">
    <div class="as-cluster" style="--cluster-align: space-between;" data-entries="2">
      <a class="link logo" href="/">
        <img class="image" src="logo.svg" alt="CRISP Company">
      </a>
      
      <div class="as-cluster" data-entries="3">
        <a class="link" href="/about">About</a>
        <a class="link" href="/services">Services</a>
        <a class="link" href="/contact">Contact</a>
      </div>
    </div>
  </nav>
</header>
```

CSS:
```css
.with-sticky {
  /* 1. Define defaults */
  --top: 0;
  --bg: var(--color-background);
  --shadow: var(--shadow-subtle);
  
  /* 2. Use the tokens */
  position: sticky;
  top: var(--top);
  z-index: 50;
  background: var(--bg);
  box-shadow: var(--shadow);
}
```

## Navigation States

*Because navigation needs emotions too*

### Current Page

*"You are here" - The most important words in navigation*

```html
<!-- Using aria-current (semantic and accessible) -->
<nav class="navigation" data-entries="3" aria-label="Main navigation">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about" aria-current="page">About</a>
  <a class="link" href="/contact">Contact</a>
</nav>

<!-- Pills variant (for that Web 2.0 nostalgia) -->
<nav class="navigation" data-variant="pills" data-entries="3" aria-label="Main navigation">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about" aria-current="page">About</a>
  <a class="link" href="/contact">Contact</a>
</nav>
```

CSS (making current states obvious):
```css
@layer crisp {
  .link[aria-current="page"] {
    /* Type-safe current state */
    @property --color {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-primary);
    }
    
    --weight: var(--text-weight-semibold);
    --decoration: underline;
    --underline-offset: 0.25em;
    
    /* Apply the current state */
    color: var(--color);
    font-weight: var(--weight);
    text-decoration: var(--decoration);
    text-underline-offset: var(--underline-offset);
  }

  /* Pills variant (rounded and proud) */
  [data-variant="pills"] .link[aria-current="page"] {
    --bg: var(--color-primary);
    --color: var(--color-on-primary);
    --padding: var(--space-0-5) var(--space-1-0);
    --decoration: none; /* No underline needed */
    
    background: var(--bg);
    padding: var(--padding);
    border-radius: var(--radius-full);
    
    /* Subtle shadow for depth */
    box-shadow: 0 2px 4px oklch(from var(--bg) l c h / 0.2);
  }
}
```

**The "Aha!"**: `aria-current` isn't just for screen readers. It's a styling hook too!

### Active States

*When navigation elements need to show they're working*

```html
<!-- Dropdown expanded -->
<button class="button" aria-expanded="true" data-variant="active">
  Menu ▼
</button>

<!-- Tab selected -->
<button class="tab" role="tab" aria-selected="true">
  Active Tab
</button>

<!-- Navigation expanded -->
<nav class="navigation" data-state="expanded" data-entries="5" aria-label="Expanded menu">
  <!-- Navigation items -->
</nav>
```

## Accessible Navigation Tips

*Because everyone deserves to find their way*

### 1. Always Label Navigation
```html
<!-- ❌ Unlabelled (screen readers cry) -->
<nav class="navigation" data-entries="3">
  <!-- Mystery navigation -->
</nav>

<!-- ✅ Labelled (screen readers rejoice) -->
<nav class="navigation" data-entries="3" aria-label="Main navigation">
<nav class="navigation" data-entries="5" aria-label="Footer links">
<nav class="navigation" data-entries="4" aria-label="Social media">
```

**Pro tip**: Be specific! "Navigation" alone is like labeling a door "Door".

### 2. Mark Current Location
```html
<!-- Current page -->
<a class="link" href="/about" aria-current="page">About</a>

<!-- Current section -->
<a class="link" href="#section" aria-current="location">Section</a>

<!-- Current step -->
<a class="link" href="/step-2" aria-current="step">Step 2</a>
```

### 3. Use Semantic Structure
```html
<!-- ❌ DIV soup (semantic sadness) -->
<nav data-entries="2" aria-label="Main navigation">
  <div><a href="/">Home</a></div>
  <div><a href="/about">About</a></div>
</nav>

<!-- ✅ Lists for many items (screen readers count them!) -->
<nav data-entries="5" aria-label="Main navigation">
  <ul class="list as-cluster">
    <li><a class="link" href="/">Home</a></li>
    <li><a class="link" href="/about">About</a></li>
    <li><a class="link" href="/services">Services</a></li>
    <li><a class="link" href="/blog">Blog</a></li>
    <li><a class="link" href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- ✅ Direct links for few items (keep it simple) -->
<nav class="navigation as-cluster" data-entries="3" aria-label="User menu">
  <a class="link" href="/profile">Profile</a>
  <a class="link" href="/settings">Settings</a>
  <a class="link" href="/logout">Logout</a>
</nav>
```

### 4. Keyboard Navigation

*Because not everyone has a mouse (shocking, I know)*
```javascript
// Minimal JavaScript for maximum accessibility
document.querySelectorAll('.dropdown').forEach(dropdown => {
  const button = dropdown.querySelector('button');
  const menu = dropdown.querySelector('.dropdown-menu');
  
  // Toggle on click/Enter/Space
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    menu.hidden = expanded;
  });
  
  // Close on Escape (the universal "nope" key)
  dropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      button.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      button.focus();
    }
  });
  
  // Close when clicking outside (because users)
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      button.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  });
});
```

**The "Aha!"**: Good keyboard navigation is just good UX. Everyone benefits.

## The Navigation Manifesto

1. **Always use `data-entries`** - It's not optional, it's essential
2. **Semantic HTML** - `<nav>` with proper ARIA labels
3. **One navigation class** - Not 47 variants
4. **Current states via ARIA** - `aria-current="page"` not `.active`
5. **Context via data attributes** - `data-variant="pills"` not `.nav-pills`
6. **Keyboard accessible** - Tab, Enter, Escape should just work
7. **CSS-only when possible** - Tabs without JavaScript? Yes!

**The Ultimate "Aha!"**: Navigation isn't about clever class names or JavaScript gymnastics. It's about helping users find their way with semantic HTML and smart CSS.

Your navigation is predictable. Your users don't get lost. Your code doesn't need a map.

And when the PM asks for "premium authenticated navigation with hover effects and a subtle glow"? You add `data-variant="premium" data-state="authenticated"` and write 5 lines of CSS. Not 50. Not 500. Just 5.

Welcome to navigation that actually navigates.

→ Continue to [Chapter 10: Forms That Users Actually Complete](./C10-forms.md)