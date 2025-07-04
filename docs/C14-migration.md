# Chapter 14: Escaping Your Legacy CSS Prison

*Or: How to migrate without losing your mind (or your job)*

## The Legacy Nightmare

Your current CSS:
```css
/* 47,000 lines of CSS */
/* Last cleaned: Never */
/* Authors: 17 different developers over 8 years */
/* Methodologies: All of them, at once */

.header { }
.header-nav { }          /* Dave, 2016 */
.header__nav { }         /* Sarah, 2018 - "We use BEM now" */
.nav-header { }          /* Tom, 2019 - "I prefer this" */
.navigation-header { }   /* Lisa, 2020 - "More semantic" */
.site-header-nav { }     /* Current dev, 2025 - "What is happening" */

/* Plus 2,847 !important declarations */
```

Sound familiar? Let's escape together.

## The Migration Strategy

### Step 0: Don't Panic

You don't need to rewrite everything. CRISP can coexist with your legacy CSS.

```html
<!-- Old component -->
<div class="old-card card-component card--large">
  Legacy content
</div>

<!-- New CRISP component -->
<article class="card as-stack with-shadow">
  New content
</article>

<!-- They can live together -->
```

### Step 1: Start With New Features

Don't refactor. Build new things with CRISP:

```html
<!-- New feature section using CRISP -->
<section class="section as-container">
  <h2 class="heading">New Feature</h2>
  
  <!-- CRISP components -->
  <div class="as-grid">
    <article class="card">New card 1</article>
    <article class="card">New card 2</article>
  </div>
  
  <!-- Can still use old components inside -->
  <div class="legacy-component">
    Old stuff that still works
  </div>
</section>
```

### Step 2: Create a Bridge Layer

Map your old classes to CRISP patterns:

```css
/* bridge.css - Temporary mapping layer */

/* Map old components to CRISP */
.old-button,
.btn,
.button-primary,
.action-button {
  @extend .button;
}

/* Map old layouts */
.row,
.grid-container,
.flex-wrapper {
  @extend .as-cluster;
}

.column,
.col,
.grid-item {
  /* Handled by parent .as-grid */
}

/* Map old utilities */
.text-center { text-align: center; }
.mt-20 { margin-top: var(--space-1-0); }
.hidden { display: none; }
```

### Step 3: Component-by-Component Migration

Pick one component type at a time:

#### Week 1: Buttons
```html
<!-- Before -->
<button class="btn btn-primary btn-lg btn-block">
  Click me
</button>

<!-- After -->
<button class="button" 
  style="--button-bg: var(--colour-primary-50); 
         --button-size: var(--text-size-1-25);
         --button-width: 100%;">
  Click me
</button>
```

#### Week 2: Cards
```html
<!-- Before -->
<div class="card card-shadow card-hover">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
  </div>
  <div class="card-body">
    <p class="card-text">Content</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>

<!-- After -->
<article class="card as-stack with-shadow with-interaction">
  <header>
    <h3 class="heading">Title</h3>
  </header>
  <p class="text">Content</p>
  <footer>
    <button class="button" style="--button-bg: var(--colour-primary-50);">
      Action
    </button>
  </footer>
</article>
```

### Step 4: Layout Migration

Replace layout systems gradually:

```html
<!-- Old Bootstrap grid -->
<div class="container">
  <div class="row">
    <div class="col-md-4">Column 1</div>
    <div class="col-md-4">Column 2</div>
    <div class="col-md-4">Column 3</div>
  </div>
</div>

<!-- CRISP replacement -->
<div class="as-container">
  <div class="as-grid" style="--grid-columns: 3;">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

<!-- Or even simpler for responsive -->
<div class="as-container">
  <div class="as-grid">
    <div>Auto-responsive 1</div>
    <div>Auto-responsive 2</div>
    <div>Auto-responsive 3</div>
  </div>
</div>
```

## Migration Patterns

### The Strangler Fig Pattern

Wrap old components and gradually replace internals:

```html
<!-- Phase 1: Wrap old component -->
<article class="card">
  <div class="legacy-card-component">
    <!-- Old HTML structure -->
  </div>
</article>

<!-- Phase 2: Replace internals -->
<article class="card as-stack">
  <h3 class="heading">New heading</h3>
  <div class="legacy-card-body">
    <!-- Still some old parts -->
  </div>
</article>

<!-- Phase 3: Fully migrated -->
<article class="card as-stack with-shadow">
  <h3 class="heading">New heading</h3>
  <p class="text">Fully CRISP</p>
</article>
```

### The Feature Flag Pattern

Use data attributes to toggle between old and new:

```html
<body data-use-crisp="true">
  <!-- CSS switches behaviour -->
</body>
```

```css
/* Old styles (default) */
.header {
  /* Complex legacy styles */
}

/* New styles when flag enabled */
[data-use-crisp="true"] .header {
  /* Clean CRISP styles */
  @extend .as-container;
}
```

### The Side-by-Side Pattern

Run both systems during migration:

```html
<!-- Header with both systems -->
<header>
  <!-- Old navigation for desktop -->
  <nav class="legacy-nav desktop月nly">
    <!-- Complex legacy navigation -->
  </nav>
  
  <!-- New CRISP navigation for mobile -->
  <nav class="navigation as-cluster mobile-only">
    <a class="link" href="/">Home</a>
    <a class="link" href="/about">About</a>
  </nav>
</header>

<!-- Gradually expand CRISP usage -->
```

## Dealing with Specificity

### The Legacy Specificity Wars
```css
/* Your legacy CSS */
#page .container .row .col .card .card-body .text {
  color: blue !important;
}

/* CRISP won't win this fight directly */
.text {
  color: var(--text-colour);
}
```

### The Solution: Layer Your CSS
```css
/* 1. Legacy layer (lowest priority) */
@layer legacy {
  @import 'old-styles.css';
}

/* 2. Bridge layer */
@layer bridge {
  /* Migration mappings */
}

/* 3. CRISP layer (highest priority) */
@layer crisp {
  @import 'crisp.css';
}

/* Now CRISP wins without !important */
```

### Or Use Isolation
```css
/* Isolate CRISP sections */
.crisp-section {
  /* Reset cascade */
  all: initial;
  
  /* Apply CRISP */
  font-family: var(--font-sans);
  /* ... */
}
```

## Common Migration Challenges

### Challenge 1: Global Styles
```css
/* Legacy global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1, h2, h3 { 
  margin-bottom: 20px;
  font-family: 'CustomFont', sans-serif;
}
```

**Solution**: Scope CRISP components
```css
/* Scope CRISP to avoid conflicts */
.crisp-content {
  /* CRISP resets */
  h1, h2, h3 {
    margin: 0;
    font-family: var(--font-sans);
  }
}
```

### Challenge 2: JavaScript Dependencies
```javascript
// Legacy JS expects specific classes
$('.btn-primary').click(function() {
  $(this).addClass('btn-loading');
});
```

**Solution**: Add compatibility classes
```html
<button class="button btn-primary" 
  data-component="button">
  Works with both
</button>
```

### Challenge 3: Third-Party Components
```html
<!-- Datepicker needs specific structure -->
<div class="datepicker-wrapper">
  <input type="text" class="form-control datepicker">
</div>
```

**Solution**: Don't migrate these (yet)
```html
<!-- Keep third-party components as-is -->
<div class="field">
  <label class="label">Date</label>
  <!-- Legacy datepicker -->
  <div class="datepicker-wrapper">
    <input type="text" class="form-control datepicker">
  </div>
</div>
```

## Migration Checklist

### Phase 1: Preparation (Week 1)
- [ ] Add CRISP CSS to your project
- [ ] Create `bridge.css` for mapping
- [ ] Set up CSS layers
- [ ] Choose first component to migrate
- [ ] Document migration patterns for team

### Phase 2: New Development (Weeks 2-4)
- [ ] Build all new features with CRISP
- [ ] Create CRISP component library
- [ ] Train team on CRISP patterns
- [ ] Establish CRISP code review guidelines

### Phase 3: Gradual Migration (Months 2-6)
- [ ] Migrate buttons
- [ ] Migrate forms
- [ ] Migrate cards
- [ ] Migrate navigation
- [ ] Migrate layouts
- [ ] Remove bridge.css mappings

### Phase 4: Cleanup (Month 6+)
- [ ] Remove unused legacy CSS
- [ ] Remove compatibility classes
- [ ] Update build process
- [ ] Celebrate! 🎉

## The Psychological Part

### For Your Team
```javascript
// Monday
"We're migrating to a new CSS architecture"
// *Panic*

// Tuesday
"But we're doing it gradually, and your old code still works"
// *Relief*

// Friday
"Look, I built this new feature in half the time"
// *Interest*

// Next month
"Can we migrate my component next?"
// *Buy-in*
```

### For Your Manager
- **Risk**: Minimal (gradual migration)
- **Cost**: Low (reuse during new development)
- **Benefit**: Faster development, fewer bugs
- **Timeline**: See results in weeks, not months

## Success Stories

### Before CRISP
- 47,000 lines of CSS
- 2.3MB CSS bundle
- 45 minutes to add a new component
- "I'm afraid to touch the CSS"

### After CRISP (6 months)
- 12,000 lines of CSS
- 245KB CSS bundle
- 5 minutes to add a new component
- "CSS is fun again"

## Your Escape Plan

1. **Start tomorrow**: Add CRISP to one new feature
2. **Start small**: Migrate one button
3. **Show success**: Share the time saved
4. **Build momentum**: Let others join
5. **Stay patient**: Rome wasn't rebuilt in a day

Your legacy CSS is not your destiny. Freedom awaits.

→ Continue to [Chapter 15: Component Reference](./C15-component-reference.md)