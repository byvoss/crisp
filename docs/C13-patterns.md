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
    <nav class="navigation as-cluster" data-entries="2" style="--cluster-align: space-between;">
      <a class="link logo" href="/">Logo</a>
      <div class="as-cluster">
        <a class="link" href="/about">About</a>
        <a class="link" href="/contact">Contact</a>
      </div>
    </nav>
  </header>
  
  <!-- Main content with sidebars -->
  <div class="as-container">
    <main class="as-split" style="--split-ratio: 250px;">
      <!-- Left sidebar -->
      <aside class="aside as-stack with-sticky" style="--top: 5rem;">
        <nav class="navigation as-stack" data-entries="4">
          <h3 class="heading">Categories</h3>
          <a class="link" href="#" aria-current="page">All Posts</a>
          <a class="link" href="#">Technology</a>
          <a class="link" href="#">Design</a>
        </nav>
      </aside>
      
      <!-- Main + right sidebar wrapper -->
      <div class="as-split" data-variant="reverse" style="--split-ratio: 300px;">
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
  <footer class="footer as-center" style="--center-height: 200px;">
    <p class="text">&copy; 2025</p>
  </footer>
</body>
```

### The App Shell
```html
<!-- Modern app layout -->
<div class="app as-grid" style="--template: 'nav main' / 250px 1fr; height: 100vh;">
  <!-- Sidebar navigation -->
  <nav class="navigation app-nav as-stack" data-entries="2" data-variant="app" style="grid-area: nav;">
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

CSS for app context:
```css
[data-variant="app"] {
  /* 1. Define context tokens */
  --nav-bg: var(--color-neutral-dark);
  --nav-color: white;
  --nav-padding: var(--space-1-5);
  
  /* 2. Apply to navigation */
  &.navigation {
    background: var(--nav-bg);
    color: var(--nav-color);
    padding: var(--nav-padding);
  }
  
  .nav-item {
    --padding: var(--space-0-75) var(--space-1-0);
    --radius: var(--radius-md);
    
    &[aria-current="page"] {
      --bg: var(--color-primary);
    }
  }
}
```

CSS for split layout:
```css
.as-split {
  /* 1. Define split layout tokens */
  --split-ratio: 300px;        /* Fixed width for first element */
  --split-gap: var(--space-1-0);
  --split-align: start;
  
  /* 2. Use the tokens */
  display: flex;
  gap: var(--split-gap);
  align-items: var(--split-align);
  
  /* First child gets fixed width */
  > :first-child {
    flex-basis: var(--split-ratio);
    flex-shrink: 0;
  }
  
  /* Second child fills remaining space */
  > :last-child {
    flex: 1;
  }
}

/* Reverse variant */
.as-split[data-variant="reverse"] {
  flex-direction: row-reverse;
}
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
  <img class="image" src="thumb.jpg" alt="" style="--width: 150px;">
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
<article class="card as-stack" data-variant="stat">
  <span class="icon" style="--size: 3rem;">📈</span>
  <p class="stat">1,234</p>
  <p class="text">Active users</p>
</article>
```

CSS for card variants:
```css
.card[data-variant="stat"] {
  /* 1. Define stat card tokens */
  --stat-align: center;
  --text-align: center;
  
  /* 2. Apply to children */
  .stat {
    --size: var(--text-size-3-0);
    --weight: var(--text-weight-bold);
    --color: var(--color-primary);
  }
  
  .text {
    --color: var(--color-neutral);
    --size: var(--text-size-sm);
  }
}
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
        style="--bg: var(--color-danger);">
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
<dialog class="dialog" id="photo-modal" data-variant="fullscreen">
  <button class="button close" onclick="this.closest('dialog').close()">
    ×
  </button>
  <img class="image" src="photo-large.jpg" alt="">
</dialog>
```

CSS for modal variants:
```css
.dialog {
  /* 1. Define defaults */
  --padding: var(--space-2-0);
  --radius: var(--radius-lg);
  --max-width: 600px;
  --bg: white;
  --shadow: var(--shadow-elevated);
  
  /* 2. Use the tokens */
  padding: var(--padding);
  border-radius: var(--radius);
  max-width: var(--max-width);
  background: var(--bg);
  box-shadow: var(--shadow);
  border: none;
}

.dialog[data-variant="fullscreen"] {
  --max-width: 100vw;
  --max-height: 100vh;
  --padding: 0;
  --radius: 0;
  
  width: 100%;
  height: 100%;
}
```

### Loading Patterns
```html
<!-- Skeleton screen -->
<article class="card as-stack" aria-busy="true" aria-label="Loading content">
  <div class="skeleton heading"></div>
  <div class="skeleton text"></div>
  <div class="skeleton text" style="--width: 80%;"></div>
</article>

<!-- Progressive image loading -->
<figure class="figure">
  <img class="image" 
    src="placeholder.jpg" 
    data-src="full-image.jpg"
    data-loading="lazy"
    alt="Description">
  <noscript>
    <img class="image" src="full-image.jpg" alt="Description">
  </noscript>
</figure>

<!-- Infinite scroll trigger -->
<div class="observer" 
  data-function="infinite-scroll"
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

document.querySelectorAll('[data-function="infinite-scroll"]').forEach(el => {
  observer.observe(el);
});
</script>
```

## Form Patterns

### Multi-Step Form
```html
<form class="form wizard" data-variant="step-1">
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
    <button class="button" type="button" data-function="previous" hidden>
      Previous
    </button>
    <button class="button" type="button" data-function="next">
      Next
    </button>
    <button class="button" type="submit" hidden>
      Submit
    </button>
  </div>
</form>
```

CSS for wizard forms:
```css
.wizard {
  /* 1. Define wizard tokens */
  --step-spacing: var(--space-2-0);
  --step-transition: opacity 250ms ease;
  
  /* 2. Apply to steps */
  .step[aria-current="step"] {
    --bg: var(--color-primary);
    --color: white;
  }
  
  .step:disabled {
    --opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Form states */
.form[data-variant^="step-"] .step-content {
  transition: var(--step-transition);
}
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
  <table class="table" data-variant="responsive">
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
```

CSS for responsive tables:
```css
.table[data-variant="responsive"] {
  /* 1. Define table tokens */
  --border: 1px solid var(--color-border);
  --padding: var(--space-0-75);
  --radius: var(--radius-md);
  
  /* 2. Mobile layout */
  @media (max-width: 768px) {
    thead {
      display: none;
    }
    
    tr {
      display: block;
      margin-bottom: var(--space-1-0);
      border: var(--border);
      border-radius: var(--radius);
    }
    
    td {
      display: flex;
      justify-content: space-between;
      padding: var(--padding);
      text-align: right;
      
      &::before {
        content: attr(data-label);
        font-weight: var(--text-weight-semibold);
        text-align: left;
      }
    }
  }
}
```

### Container Queries
```html
<!-- Component that adapts to container -->
<article class="card product-card" style="container-type: inline-size;" data-variant="product">
  <img class="image" src="product.jpg" alt="">
  <div class="details as-stack">
    <h3 class="heading">Product Name</h3>
    <p class="price">£99</p>
    <p class="description">Product description text</p>
    <button class="button">Add to Cart</button>
  </div>
</article>
```

CSS with container queries:
```css
.product-card {
  /* 1. Define defaults */
  --card-gap: var(--space-1-0);
  --direction: column;
  
  /* 2. Use the tokens */
  display: flex;
  flex-direction: var(--direction);
  gap: var(--card-gap);
  
  /* Wide container: Horizontal layout */
  @container (min-width: 500px) {
    --direction: row;
    --card-gap: var(--space-1-5);
    
    .image {
      --width: 200px;
    }
    
    .description {
      display: block;
    }
  }
  
  /* Narrow container: Compact */
  @container (max-width: 300px) {
    .description {
      display: none;
    }
  }
}
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
  data-function="heavy-component"
  data-load="lazy">
  <!-- Loaded when visible -->
</div>
```

### Optimistic UI
```html
<form class="form" data-function="optimistic">
  <button class="button" type="submit">
    <span class="default">Save</span>
    <span class="loading" hidden>Saving...</span>
    <span class="success" hidden>Saved!</span>
  </button>
</form>

<script>
document.querySelector('[data-function="optimistic"]').addEventListener('submit', async (e) => {
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
  /* 1. Define base tokens */
  --grid-columns: 1;
  
  /* 2. Adjust based on children */
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
/* Define spacing tokens */
.article {
  --flow-space: var(--space-1-0);
  --heading-space: var(--space-2-0);
  --tight-space: var(--space-0-5);
  
  /* Consistent spacing between elements */
  > * + * {
    margin-block-start: var(--flow-space);
  }
  
  /* Tighter spacing after headings */
  > h2 + *,
  > h3 + * {
    margin-block-start: var(--tight-space);
  }
  
  /* More space before headings */
  > * + h2,
  > * + h3 {
    margin-block-start: var(--heading-space);
  }
}
```

### State-Based Styling
```css
/* Style based on form validity */
.form:valid .button[type="submit"] {
  --bg: var(--color-success);
}

/* Style based on empty state */
.list:empty::before {
  content: "No items yet";
  display: block;
  text-align: center;
  padding: var(--space-2-0);
  color: var(--color-neutral);
}

/* Style based on sibling state */
.input:invalid ~ .helper {
  --color: var(--color-danger);
}

/* Style based on data state */
[data-variant="loading"] {
  --opacity: 0.6;
  cursor: wait;
}

[data-variant="error"] {
  --border-color: var(--color-danger);
}

[data-variant="success"] {
  --border-color: var(--color-success);
}
```

## Context-Aware Patterns

### Theme Context
```html
<main data-variant="dashboard" data-theme="dark">
  <section class="stats as-grid">
    <article class="card" data-variant="stat">
      <p class="number">1,234</p>
      <p class="label">Users</p>
    </article>
  </section>
</main>
```

CSS for variant combinations:
```css
/* Dashboard variant with dark theme */
[data-variant="dashboard"][data-theme="dark"] {
  --card-bg: var(--color-neutral-dark);
  --card-color: white;
  --card-border: 1px solid var(--color-neutral);
  
  .card[data-variant="stat"] {
    .number {
      --color: var(--color-primary-light);
    }
  }
}
```

## The Pattern Wisdom

These patterns solve real problems:
- Copy what works
- Adapt to your needs  
- Keep it semantic
- Use data attributes for state and variants
- Define tokens, then use them
- Progressive enhancement always

Your problems aren't unique. The solutions already exist. And with CRISP, they're simple.

→ Continue to [Chapter 14: Escaping Your Legacy CSS Prison](./C14-migration.md)