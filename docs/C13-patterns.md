# Chapter 13: Common Patterns & Clever Tricks

*Or: Solutions to problems you definitely have*

## The Pattern Collection

Years of web development distilled into CRISP patterns. Copy, paste, ship.

## Layout Patterns

### The Holy Grail Layout
```html
<!-- The legendary 3-column layout, finally simple -->
<body class="as-stack" style="--stack-gap: 0;">
  <!-- Sticky header -->
  <header class="header with-sticky as-container">
    <nav class="navigation as-cluster" style="--cluster-align: space-between;">
      <a class="link logo" href="/">Logo</a>
      <div class="as-cluster">
        <a class="link" href="/about">About</a>
        <a class="link" href="/contact">Contact</a>
      </div>
    </nav>
  </header>
  
  <!-- Main content with sidebars -->
  <div class="as-container">
    <main class="as-sidebar" style="--sidebar-width: 250px;">
      <!-- Left sidebar -->
      <aside class="aside as-stack with-sticky" style="--aside-top: 5rem;">
        <nav class="navigation as-stack">
          <h3 class="heading">Categories</h3>
          <a class="link" href="#" aria-current="page">All Posts</a>
          <a class="link" href="#">Technology</a>
          <a class="link" href="#">Design</a>
        </nav>
      </aside>
      
      <!-- Main + right sidebar wrapper -->
      <div class="as-sidebar" style="--sidebar-reverse: true; --sidebar-width: 300px;">
        <!-- Content -->
        <article class="article as-stack">
          <h1 class="heading">Article Title</h1>
          <p class="text">Content goes here...</p>
        </article>
        
        <!-- Right sidebar -->
        <aside class="aside as-stack">
          <section class="card as-stack">
            <h3 class="heading">Related</h3>
            <a class="link" href="#">Related Article 1</a>
            <a class="link" href="#">Related Article 2</a>
          </section>
        </aside>
      </div>
    </main>
  </div>
  
  <!-- Footer -->
  <footer class="footer as-centre" style="--centre-height: 200px;">
    <p class="text">&copy; 2025</p>
  </footer>
</body>
```

### The App Shell
```html
<!-- Modern app layout -->
<div class="app as-grid" style="--grid-template: 'nav main' / 250px 1fr; height: 100vh;">
  <!-- Sidebar navigation -->
  <nav class="navigation app-nav as-stack" style="grid-area: nav;">
    <div class="as-stack" style="--stack-gap: var(--space-2-0);">
      <!-- Logo -->
      <a class="link logo" href="/">
        <img class="image" src="logo.svg" alt="App">
      </a>
      
      <!-- Primary nav -->
      <div class="as-stack">
        <a class="link nav-item" href="/dashboard" aria-current="page">
          <span class="icon">📊</span>
          Dashboard
        </a>
        <a class="link nav-item" href="/projects">
          <span class="icon">📁</span>
          Projects
        </a>
      </div>
    </div>
    
    <!-- User section at bottom -->
    <div class="user as-cluster" style="margin-top: auto;">
      <img class="avatar" src="user.jpg" alt="">
      <span class="text">John Doe</span>
    </div>
  </nav>
  
  <!-- Main content -->
  <main class="app-main as-stack" style="grid-area: main; overflow-y: auto;">
    <header class="app-header as-cluster" style="--cluster-align: space-between;">
      <h1 class="heading">Dashboard</h1>
      <button class="button">New Project</button>
    </header>
    
    <div class="content as-stack">
      <!-- Content here -->
    </div>
  </main>
</div>
```

## Component Patterns

### Card Variations
```html
<!-- Clickable card -->
<article class="card with-interaction" 
  tabindex="0"
  role="button"
  onclick="navigateToArticle()"
  onkeydown="if(event.key === 'Enter') navigateToArticle()">
  <h3 class="heading">Clickable Card</h3>
  <p class="text">Entire card is interactive</p>
</article>

<!-- Card with CTA -->
<article class="card as-stack">
  <img class="image" src="feature.jpg" alt="">
  <div class="as-stack" style="--stack-gap: var(--space-0-75);">
    <h3 class="heading">Feature Card</h3>
    <p class="text">Description of the feature that explains its value.</p>
  </div>
  <a class="link" href="/learn-more" role="button" style="margin-top: auto;">
    Learn more →
  </a>
</article>

<!-- Horizontal card -->
<article class="card as-cluster" style="--cluster-gap: var(--space-1-5);">
  <img class="image" src="thumb.jpg" alt="" style="--image-width: 150px;">
  <div class="as-stack">
    <h3 class="heading">Side by Side</h3>
    <p class="text">Content flows horizontally</p>
    <div class="as-cluster">
      <span class="tag">Design</span>
      <span class="tag">CSS</span>
    </div>
  </div>
</article>

<!-- Stats card -->
<article class="card as-stack stat-card">
  <span class="icon" style="--icon-size: 3rem;">📈</span>
  <p class="stat" style="--stat-size: var(--text-size-3-0); --stat-weight: var(--text-weight-bold);">
    1,234
  </p>
  <p class="text" style="--text-colour: var(--colour-neutral-60);">
    Active users
  </p>
</article>
```

### Modal Patterns
```html
<!-- Native dialog modal -->
<dialog class="dialog modal" id="confirm-modal">
  <form class="form as-stack" method="dialog">
    <h2 class="heading">Confirm Action</h2>
    <p class="text">Are you sure you want to proceed?</p>
    
    <div class="as-cluster" style="--cluster-align: flex-end;">
      <button class="button" value="cancel">Cancel</button>
      <button class="button" value="confirm" 
        style="--button-bg: var(--colour-danger-50);">
        Delete
      </button>
    </div>
  </form>
</dialog>

<script>
// Show modal
document.getElementById('confirm-modal').showModal();

// Handle result
document.getElementById('confirm-modal').addEventListener('close', (e) => {
  if (e.target.returnValue === 'confirm') {
    // User confirmed
  }
});
</script>

<!-- Fullscreen modal -->
<dialog class="dialog fullscreen" id="photo-modal">
  <button class="button close" onclick="this.closest('dialog').close()">
    ×
  </button>
  <img class="image" src="photo-large.jpg" alt="">
</dialog>

<style>
.dialog.fullscreen {
  max-width: 100vw;
  max-height: 100vh;
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>
```

### Loading Patterns
```html
<!-- Skeleton screen -->
<article class="card as-stack" aria-busy="true" aria-label="Loading content">
  <div class="skeleton heading"></div>
  <div class="skeleton text"></div>
  <div class="skeleton text" style="--skeleton-width: 80%;"></div>
</article>

<!-- Progressive image loading -->
<figure class="figure">
  <img class="image lazy" 
    src="placeholder.jpg" 
    data-src="full-image.jpg"
    loading="lazy"
    alt="Description">
  <noscript>
    <img class="image" src="full-image.jpg" alt="Description">
  </noscript>
</figure>

<!-- Infinite scroll trigger -->
<div class="observer" 
  data-observe="infinite-scroll"
  aria-label="Loading more content">
  <div class="spinner"></div>
</div>

<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMoreContent();
    }
  });
});

document.querySelectorAll('[data-observe="infinite-scroll"]').forEach(el => {
  observer.observe(el);
});
</script>
```

## Form Patterns

### Multi-Step Form
```html
<form class="form wizard" data-step="1">
  <!-- Progress -->
  <nav class="progress as-cluster" aria-label="Form progress">
    <button class="step" aria-current="step" data-step="1">
      1. Account
    </button>
    <button class="step" data-step="2" disabled>
      2. Details
    </button>
    <button class="step" data-step="3" disabled>
      3. Review
    </button>
  </nav>
  
  <!-- Steps -->
  <div class="steps">
    <!-- Step 1 -->
    <fieldset class="step-content as-stack" data-step="1">
      <legend>Create Account</legend>
      <!-- Fields -->
    </fieldset>
    
    <!-- Step 2 -->
    <fieldset class="step-content as-stack" data-step="2" hidden>
      <legend>Your Details</legend>
      <!-- Fields -->
    </fieldset>
    
    <!-- Step 3 -->
    <fieldset class="step-content as-stack" data-step="3" hidden>
      <legend>Review & Submit</legend>
      <!-- Summary -->
    </fieldset>
  </div>
  
  <!-- Navigation -->
  <div class="as-cluster" style="--cluster-align: space-between;">
    <button class="button" type="button" onclick="previousStep()" hidden>
      Previous
    </button>
    <button class="button" type="button" onclick="nextStep()">
      Next
    </button>
    <button class="button" type="submit" hidden>
      Submit
    </button>
  </div>
</form>
```

### Search Patterns
```html
<!-- Instant search -->
<search class="search as-stack">
  <form class="form as-cluster" role="search">
    <input class="input" 
      type="search" 
      name="q"
      placeholder="Search..."
      aria-label="Search"
      aria-controls="search-results"
      aria-describedby="search-help">
    <button class="button" type="submit">Search</button>
  </form>
  
  <small class="helper" id="search-help">
    Press / to focus search
  </small>
  
  <!-- Live results -->
  <div class="results as-stack" 
    id="search-results"
    role="region"
    aria-live="polite"
    aria-busy="false">
    <!-- Results appear here -->
  </div>
</search>

<script>
// Keyboard shortcut
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !e.target.matches('input, textarea')) {
    e.preventDefault();
    document.querySelector('[type="search"]').focus();
  }
});

// Debounced search
let timeout;
document.querySelector('[type="search"]').addEventListener('input', (e) => {
  clearTimeout(timeout);
  const results = document.getElementById('search-results');
  results.setAttribute('aria-busy', 'true');
  
  timeout = setTimeout(() => {
    performSearch(e.target.value).then(data => {
      results.setAttribute('aria-busy', 'false');
      renderResults(data);
    });
  }, 300);
});
</script>
```

## Responsive Patterns

### Responsive Tables
```html
<!-- Mobile-friendly table -->
<div class="table-wrapper">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Name">John Doe</td>
        <td data-label="Email">john@example.com</td>
        <td data-label="Role">Admin</td>
        <td data-label="Actions">
          <button class="button">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<style>
@media (max-width: 768px) {
  .table thead {
    display: none;
  }
  
  .table tr {
    display: block;
    margin-bottom: var(--space-1-0);
    border: 1px solid var(--colour-border);
    border-radius: var(--radius-md);
  }
  
  .table td {
    display: flex;
    justify-content: space-between;
    padding: var(--space-0-75);
    text-align: right;
  }
  
  .table td::before {
    content: attr(data-label);
    font-weight: var(--text-weight-semibold);
    text-align: left;
  }
}
</style>
```

### Container Queries
```html
<!-- Component that adapts to container -->
<article class="card product-card" style="container-type: inline-size;">
  <img class="image" src="product.jpg" alt="">
  <div class="details as-stack">
    <h3 class="heading">Product Name</h3>
    <p class="price">£99</p>
    <p class="description">Product description text</p>
    <button class="button">Add to Cart</button>
  </div>
</article>

<style>
/* Default: Vertical layout */
.product-card {
  display: flex;
  flex-direction: column;
}

/* Wide container: Horizontal layout */
@container (min-width: 500px) {
  .product-card {
    flex-direction: row;
    gap: var(--space-1-5);
  }
  
  .product-card .image {
    width: 200px;
  }
  
  .product-card .description {
    display: block;
  }
}

/* Narrow container: Compact */
@container (max-width: 300px) {
  .product-card .description {
    display: none;
  }
}
</style>
```

## Performance Patterns

### Lazy Loading
```html
<!-- Images -->
<img class="image" 
  src="placeholder.jpg"
  data-src="actual-image.jpg"
  loading="lazy"
  alt="Description">

<!-- Videos -->
<video class="video"
  poster="thumbnail.jpg"
  preload="none">
  <source data-src="video.mp4" type="video/mp4">
</video>

<!-- Components -->
<div class="component" 
  data-component="heavy-component"
  data-load="lazy">
  <!-- Loaded when visible -->
</div>
```

### Optimistic UI
```html
<form class="form" data-optimistic="true">
  <button class="button" type="submit">
    <span class="default">Save</span>
    <span class="loading" hidden>Saving...</span>
    <span class="success" hidden>Saved!</span>
  </button>
</form>

<script>
document.querySelector('[data-optimistic]').addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = e.target.querySelector('button');
  
  // Immediate feedback
  button.disabled = true;
  button.querySelector('.default').hidden = true;
  button.querySelector('.loading').hidden = false;
  
  try {
    await saveData();
    button.querySelector('.loading').hidden = true;
    button.querySelector('.success').hidden = false;
    
    // Reset after delay
    setTimeout(() => {
      button.disabled = false;
      button.querySelector('.success').hidden = true;
      button.querySelector('.default').hidden = false;
    }, 2000);
  } catch (error) {
    // Handle error
  }
});
</script>
```

## Clever CSS Tricks

### Quantity Queries
```css
/* Different layouts based on child count */
.as-grid {
  /* 1 child: full width */
  &:has(> :only-child) {
    --grid-columns: 1;
  }
  
  /* 2 children: two columns */
  &:has(> :nth-child(2):last-child) {
    --grid-columns: 2;
  }
  
  /* 3+ children: three columns */
  &:has(> :nth-child(3)) {
    --grid-columns: 3;
  }
  
  /* 5+ children: four columns */
  &:has(> :nth-child(5)) {
    --grid-columns: 4;
  }
}
```

### Smart Spacing
```css
/* Remove margin from last element */
.as-stack > *:last-child {
  margin-block-end: 0;
}

/* Consistent spacing between different elements */
.article > * + * {
  margin-block-start: var(--space-1-0);
}

.article > h2 + * {
  margin-block-start: var(--space-0-5);
}

.article > * + h2 {
  margin-block-start: var(--space-2-0);
}
```

### State-Based Styling
```css
/* Style based on form validity */
.form:valid .button[type="submit"] {
  --button-bg: var(--colour-success-50);
}

/* Style based on empty state */
.list:empty::before {
  content: "No items yet";
  display: block;
  text-align: center;
  padding: var(--space-2-0);
  color: var(--colour-neutral-60);
}

/* Style based on sibling state */
.input:invalid ~ .helper {
  color: var(--colour-danger-60);
}
```

## The Pattern Wisdom

These patterns solve real problems:
- Copy what works
- Adapt to your needs
- Keep it semantic
- Progressive enhancement always

Your problems aren't unique. The solutions already exist.

→ Continue to [Chapter 14: Escaping Your Legacy CSS Prison](./C14-migration.md)