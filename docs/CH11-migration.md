# Chapter 11: Transplanting - Migration Without Wilting

*Or: How to escape your CSS prison one component at a time*

## The Legacy Nightmare

Your current CSS situation, visualised:

```css
/* styles.css - 47,000 lines of archaeological layers */
/* Last refactor attempt: 2019 (abandoned) */
/* Frameworks present: Bootstrap 3, 4, 5, some Tailwind, forgotten jQuery UI */
/* !important count: 2,847 */
/* z-index values: 1 to 999999999 */

.header { }                    /* 2015 */
.site-header { }              /* 2016 - "more specific" */
.main-site-header { }         /* 2018 - "even more specific" */
.main-site-header-new { }     /* 2020 - "the redesign" */
.main-site-header-new-v2 { }  /* 2023 - "the redesign fix" */
```

But here's the secret: You don't need to rewrite everything. You can migrate gradually, without breaking anything.

## The CRISP Migration Strategy

### Step 1: The Three-Layer Setup

Add this ONE line to your CSS:

```css
@layer crisp, bridge, overrides;
```

That's it. You've just created your migration workspace. Here's why:

```css
/* CRISP framework */
@layer crisp {
  @import "crisp.css";
}

/* Your bridge layer - empty by default */
@layer bridge {
  /* Your migration workspace */
  /* Add old CSS here when needed */
  /* Create sub-layers for organization */
  /* Toggle features on/off */
}

/* Your customizations */
@layer overrides {
  /* This ALWAYS wins */
}
```

**The "Aha!"**: The bridge layer is your playground. Add legacy code when needed, remove it when migrated.

### Step 2: Using the Bridge Layer

Put your legacy code IN the bridge layer:

```css
@layer crisp, bridge, overrides;

@layer bridge {
  /* Import your old CSS here */
  @import "old-styles.css";
  @import "bootstrap.css";
  @import "vendor-chaos.css";
  
  /* Or organize with sub-layers */
  @layer bootstrap-compat, tailwind-map, temp-fixes;
  
  @layer bootstrap-compat {
    /* Map Bootstrap to CRISP */
    .btn { @extend .button; }
    .btn-primary { --bg: var(--color-primary); }
    .btn-danger { --bg: var(--color-error); }
    
    .container { @extend .as-container; }
    .row { @extend .as-grid; }
    .col-md-6 { grid-column: span 6; }
  }
  
  @layer tailwind-map {
    /* Map utilities to CRISP */
    .flex { display: flex; }
    .items-center { align-items: center; }
    .p-4 { padding: var(--space-1); }
  }
}
```

### Step 3: Component-by-Component Migration

Pick one component type. Migrate it completely:

#### Week 1: Buttons

```html
<!-- Before: Bootstrap button -->
<button class="btn btn-primary btn-lg btn-block active">
  Click me
</button>

<!-- After: CRISP button -->
<button class="button with-interaction" 
        style="--bg: var(--color-primary); --size: 1.25rem; width: 100%;">
  Click me
</button>
```

Remove the bridge mapping when done:

```css
@layer bridge.bootstrap-compat {
  /* .btn { @extend .button; } -- Removed! */
}
```

#### Week 2: Cards

```html
<!-- Before: Bootstrap card -->
<div class="card shadow-lg">
  <div class="card-header">
    <h5 class="card-title mb-0">Title</h5>
  </div>
  <div class="card-body">
    <p class="card-text">Content</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>

<!-- After: CRISP card -->
<article class="card as-stack with-shadow">
  <header>
    <h3 class="heading">Title</h3>
  </header>
  <p class="text">Content</p>
  <footer>
    <button class="button with-interaction" 
            style="--bg: var(--color-primary);">
      Action
    </button>
  </footer>
</article>
```

## Migration Patterns

### The Strangler Fig Pattern

Wrap old components, gradually replace internals:

```html
<!-- Phase 1: Wrap old component -->
<article class="card" data-migration="phase-1">
  <div class="legacy-card-component">
    <!-- Old structure intact -->
  </div>
</article>

<!-- Phase 2: Mix old and new -->
<article class="card as-stack" data-migration="phase-2">
  <h3 class="heading">New heading</h3>
  <div class="legacy-card-body">
    <!-- Some old parts remain -->
  </div>
</article>

<!-- Phase 3: Fully migrated -->
<article class="card as-stack with-shadow">
  <h3 class="heading">New heading</h3>
  <p class="text">Fully CRISP</p>
</article>
```

### The Feature Flag Pattern

Toggle between old and new:

```css
/* Feature flag in HTML */
[data-crisp="enabled"] {
  /* Import CRISP */
  @import "crisp.css" layer(crisp);
}

[data-crisp="disabled"] {
  /* Use legacy only */
  @import "old-styles.css" layer(legacy);
}
```

```html
<!-- Easy testing -->
<body data-crisp="enabled">
  <!-- Try new styles -->
</body>
```

### The Island Pattern

New features in CRISP, old features untouched:

```html
<body>
  <!-- Old header (don't touch yet) -->
  <header class="legacy-header">
    <!-- Bootstrap/jQuery madness -->
  </header>
  
  <!-- New feature section (pure CRISP) -->
  <section class="section as-container" data-crisp="island">
    <h2 class="heading">New Feature</h2>
    <div class="as-grid" data-entries="3">
      <article class="card">CRISP content</article>
      <article class="card">No legacy classes</article>
      <article class="card">Pure and clean</article>
    </div>
  </section>
  
  <!-- Old footer (migrate later) -->
  <footer class="legacy-footer">
    <!-- More Bootstrap -->
  </footer>
</body>
```

## Dealing with Specificity

Your legacy CSS has crazy specificity:

```css
/* Legacy monster */
body.home #main .container .row .col-md-8 .content .article h2.title {
  color: #333 !important;
}
```

CRISP wins anyway:

```css
@layer bridge {
  /* That monster selector lives here */
  body.home #main .container .row .col-md-8 .content .article h2.title {
    color: #333 !important;
  }
}

@layer overrides {
  .heading {
    color: var(--color-text); /* This wins! */
  }
}
```

**The "Aha!"**: Layers beat specificity. Even `!important` in bridge loses to simple selectors in overrides.

## JavaScript Compatibility

Your legacy JavaScript expects certain classes:

```javascript
// Legacy code
$('.btn-primary').click(function() {
  $(this).addClass('btn-loading');
});
```

Bridge the gap:

```html
<!-- Keep both classes during migration -->
<button class="button btn-primary" data-legacy="true">
  Works with both
</button>
```

```css
@layer bridge {
  /* Support legacy JavaScript */
  .button[data-legacy] {
    &.btn-loading {
      opacity: 0.6;
      pointer-events: none;
    }
  }
}
```

## Third-Party Components

That datepicker you can't replace yet:

```css
@layer bridge {
  /* Isolate third-party styles */
  @layer vendors {
    @import "datepicker.css";
    @import "select2.css";
    
    /* Scope them */
    @scope ([data-vendor]) {
      /* Vendor styles only apply here */
    }
  }
}
```

```html
<!-- Wrap vendor components -->
<div data-vendor="datepicker" data-key="vendor-wrapper">
  <!-- Third-party component unchanged -->
</div>
```

## Migration Checklist

### Phase 1: Setup (Day 1)
- [ ] Add layer structure to main CSS
- [ ] Import legacy CSS into legacy layer
- [ ] Import CRISP into crisp layer
- [ ] Test that nothing broke
- [ ] Create bridge layer

### Phase 2: New Development (Week 1+)
- [ ] Build all NEW features with CRISP
- [ ] Don't touch working legacy code
- [ ] Document CRISP patterns for team
- [ ] Create component examples

### Phase 3: Gradual Migration (Months)
- [ ] Migrate buttons first (easiest)
- [ ] Then forms (big impact)
- [ ] Then navigation (visible improvement)
- [ ] Then layout system (biggest win)
- [ ] Track CSS file size reduction

### Phase 4: Cleanup (Ongoing)
- [ ] Remove unused legacy CSS (use tools)
- [ ] Delete empty bridge mappings
- [ ] Consolidate custom properties
- [ ] Celebrate milestones!

## Measuring Success

### Before Migration
```
CSS Size: 2.3MB (minified)
Classes: 3,847 unique
Build time: 3 minutes
Specificity graph: 📈 (exponential)
Developer happiness: 😢
```

### After 6 Months
```
CSS Size: 245KB (90% reduction!)
Classes: ~200 unique
Build time: 10 seconds
Specificity graph: 📉 (flat)
Developer happiness: 😊
```

## Common Gotchas

### Gotcha 1: Global Resets

```css
/* Legacy global reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

Solution: Put resets in bridge layer:

```css
@layer bridge {
  /* Scoped to prevent conflicts */
  @scope ([data-legacy]) {
    * { /* Reset only legacy sections */ }
  }
}
```

### Gotcha 2: z-index Wars

```css
/* Legacy z-index madness */
.modal { z-index: 9999; }
.dropdown { z-index: 99999; }
.tooltip { z-index: 999999; }
```

Solution: Stacking contexts:

```css
@layer crisp {
  .modal { isolation: isolate; }
  /* No z-index needed! */
}
```

### Gotcha 3: Vendor Prefixes

Legacy CSS full of prefixes:

```css
.thing {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
```

CRISP doesn't need them. Modern browsers only.

## Your Escape Plan

1. **Start Tomorrow**: Add the layer structure
2. **Start Small**: One component type
3. **Stay Calm**: Both systems coexist
4. **Track Progress**: Measure improvements
5. **Celebrate Wins**: Each migration matters

**The Promise**: In 6 months, you'll have:
- 90% less CSS
- Zero specificity wars
- Happy developers
- Maintainable styles

Ready to see all components in one place?

→ Continue to [Chapter 12: Seed Catalog - Complete Component Library](./CH12-reference.md)