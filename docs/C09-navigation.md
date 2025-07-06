# Chapter 9: Finding Your Way

*Or: Navigation that doesn't make users feel lost*

## The Navigation Nightmare

Remember building navigation like this?

```scss
// The old maze
.nav { }
.nav__list { }
.nav__item { }
.nav__link { }
.nav__link--active { }
.nav--horizontal { }
.nav--vertical { }
.nav--pills { }
.nav--tabs { }
.nav--breadcrumb { }
.nav--pagination { }
.nav--mobile { }
.nav--desktop { }
.nav__toggle { }
.nav__dropdown { }
.nav__dropdown__menu { }
.nav__dropdown__item { }
// And 47 media queries...
```

## The CRISP Way: Navigation That Makes Sense

Navigation is about wayfinding. Make it obvious.

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
.navigation {
  /* 1. Define defaults */
  --gap: var(--space-1-0);
  --bg: transparent;
  
  /* 2. Use the tokens */
  gap: var(--gap);
  background: var(--bg);
}

/* Context styling */
[data-variant="authenticated"] .navigation {
  --bg: var(--color-neutral-light);
}
```

### Breadcrumb - The Trail

Show users where they are:

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

<!-- Schema.org friendly -->
<nav class="breadcrumb" data-entries="1" aria-label="Breadcrumb">
  <ol class="list as-cluster" itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a class="link" itemprop="item" href="/">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1">
    </li>
    <!-- More items... -->
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

<!-- Load more pattern -->
<nav class="pagination as-center" data-entries="1" aria-label="Load more">
  <button class="button with-interaction" 
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

CSS-only tabs using radio buttons:

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

CSS magic:
```css
/* Hide radio buttons */
.tabs input[type="radio"] {
  position: absolute;
  opacity: 0;
}

/* Show active panel */
.tabs .panel {
  display: none;
}

#tab-1:checked ~ .panels .panel:nth-of-type(1),
#tab-2:checked ~ .panels .panel:nth-of-type(2),
#tab-3:checked ~ .panels .panel:nth-of-type(3) {
  display: block;
}

/* Tab styling */
.tab {
  /* 1. Define defaults */
  --padding: var(--space-0-75) var(--space-1-5);
  --border-width: 2px;
  --border-color: transparent;
  --active-color: var(--color-primary);
  
  /* 2. Use the tokens */
  cursor: pointer;
  padding: var(--padding);
  border-bottom: var(--border-width) solid var(--border-color);
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

### Mega Menu

```html
<nav class="navigation" aria-label="Main navigation" data-type="mega">
  <div class="as-cluster">
    <!-- Regular links -->
    <a class="link" href="/">Home</a>
    
    <!-- Mega menu item -->
    <div class="dropdown">
      <button class="button" aria-expanded="false" aria-controls="products-menu">
        Products ▼
      </button>
      
      <div class="dropdown-menu as-grid" id="products-menu" hidden
        style="--grid-columns: 3; --grid-gap: var(--space-2-0);">
        <section class="as-stack">
          <h3 class="heading">Hardware</h3>
          <a class="link" href="/laptops">Laptops</a>
          <a class="link" href="/desktops">Desktops</a>
          <a class="link" href="/accessories">Accessories</a>
        </section>
        
        <section class="as-stack">
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
.dropdown-menu {
  /* 1. Define defaults */
  --bg: var(--color-background);
  --shadow: var(--shadow-elevated);
  --padding: var(--space-2-0);
  
  /* 2. Use the tokens */
  position: absolute;
  background: var(--bg);
  box-shadow: var(--shadow);
  padding: var(--padding);
  z-index: 100;
}

[data-featured="true"] {
  --bg: var(--color-accent-light);
}
```

### Mobile Navigation

```html
<!-- Mobile nav toggle -->
<button class="button mobile-toggle" 
  aria-label="Toggle navigation"
  aria-expanded="false"
  aria-controls="mobile-nav"
  data-action="menu-toggle">
  <span class="hamburger"></span>
</button>

<!-- Mobile navigation -->
<nav class="navigation mobile-nav as-stack" 
  id="mobile-nav"
  aria-label="Mobile navigation"
  data-variant="closed"
  hidden>
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/services">Services</a>
  <a class="link" href="/contact">Contact</a>
</nav>
```

CSS for mobile:
```css
@media (max-width: 768px) {
  .navigation:not(.mobile-nav) {
    display: none;
  }
  
  .mobile-nav {
    /* 1. Define defaults */
    --bg: var(--color-background);
    --padding: var(--space-2-0);
    
    /* 2. Use the tokens */
    position: fixed;
    inset: 0;
    background: var(--bg);
    padding: var(--padding);
    z-index: 100;
  }
  
  .mobile-nav[data-variant="closed"] {
    display: none;
  }
}
```

### Sticky Navigation

```html
<header class="header with-sticky" style="--top: 0;">
  <nav class="navigation as-container">
    <div class="as-cluster" style="--cluster-align: space-between;">
      <a class="link logo" href="/">
        <img class="image" src="logo.svg" alt="Company">
      </a>
      
      <div class="as-cluster">
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

### Current Page

```html
<!-- Using aria-current -->
<nav class="navigation">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about" aria-current="page">About</a>
  <a class="link" href="/contact">Contact</a>
</nav>

<!-- With data attribute for variant context -->
<nav class="navigation" data-variant="pills">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about" aria-current="page">About</a>
  <a class="link" href="/contact">Contact</a>
</nav>
```

CSS:
```css
.link[aria-current="page"] {
  /* 1. Define defaults */
  --color: var(--color-primary);
  --weight: var(--text-weight-semibold);
  --decoration: underline;
  --underline-offset: 0.25em;
  
  /* 2. Use the tokens */
  color: var(--color);
  font-weight: var(--weight);
  text-decoration: var(--decoration);
  text-underline-offset: var(--underline-offset);
}

/* Variant-specific current styles */
[data-variant="pills"] .link[aria-current="page"] {
  --bg: var(--color-primary);
  --color: white;
  --padding: var(--space-0-5) var(--space-1-0);
  
  background: var(--bg);
  padding: var(--padding);
  border-radius: var(--radius-full);
}
```

### Active States

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
<nav class="navigation" data-variant="expanded">
  <!-- Navigation items -->
</nav>
```

## Accessible Navigation Tips

### 1. Always Label Navigation
```html
<!-- ❌ Unlabelled -->
<nav class="navigation" data-entries="0">

<!-- ✅ Labelled -->
<nav aria-label="Main navigation">
<nav aria-label="Breadcrumb">
<nav aria-label="Social links">
```

### 2. Mark Current Location
```html
<!-- Current page -->
<a class="link" href="/about" aria-current="page">About</a>

<!-- Current section -->
<a class="link" href="#section" aria-current="location">Section</a>

<!-- Current step -->
<a class="link" href="/step-2" aria-current="step">Step 2</a>
```

### 3. Use Semantic Lists
```html
<!-- ❌ Divs -->
<nav>
  <div><a href="/">Home</a></div>
  <div><a href="/about">About</a></div>
</nav>

<!-- ✅ Lists for multiple items -->
<nav>
  <ul class="list as-cluster">
    <li><a class="link" href="/">Home</a></li>
    <li><a class="link" href="/about">About</a></li>
  </ul>
</nav>

<!-- ✅ Direct links for few items -->
<nav class="as-cluster">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
</nav>
```

### 4. Keyboard Navigation
```javascript
// Ensure keyboard access
document.querySelectorAll('.dropdown').forEach(dropdown => {
  const button = dropdown.querySelector('button');
  const menu = dropdown.querySelector('.dropdown-menu');
  
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    menu.hidden = expanded;
  });
  
  // Close on Escape
  dropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      button.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      button.focus();
    }
  });
});
```

## The Navigation Liberation

With CRISP navigation:
- Semantic HTML that search engines love
- Accessible by default
- No framework-specific markup
- Works without JavaScript
- Responsive without media query hell
- Variants via data attributes, not modifier classes

Your users can find their way. Your code stays maintainable. Everyone wins.

And when the designer asks for "authenticated user navigation with a premium feel"? You don't create `.nav--authenticated-premium`. You add `data-variant="authenticated" data-tier="premium"` and style once. That's the power of semantic variants.

→ Continue to [Chapter 10: Forms That Users Actually Complete](./C10-forms.md)