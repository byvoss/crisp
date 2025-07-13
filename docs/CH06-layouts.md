# Chapter 6: Garden Layouts - Arrangement Without Tears

*Or: How to arrange anything without a 12-column prison*

## The Layout Liberation

Remember Bootstrap's grid system?

```html
<!-- The old prison -->
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      Why are we doing this to ourselves?
    </div>
  </div>
</div>
```

CRISP has seven layout patterns. That's it. Seven patterns that handle every layout need you'll ever have.

## The Magnificent Seven

**A Note on Units**: Throughout CRISP, we avoid pixel values. When you see `calc(250 * var(--rem))`, this converts 250 design pixels to rem units (250px → 15.625rem). This ensures accessibility (users can scale their browser fonts) and consistency. The `--rem` converter is defined in the kernel layer as `calc(1rem / 16)`.

### 1. Stack (Vertical Flow)

**Layout class**: `as-stack`

**What it does**: Arranges elements vertically with consistent spacing between them. Think of it like stacking plates - each item sits perfectly above the next with a defined gap.

**When to use**: Navigation lists, form fields, article sections, card content, any vertical sequence of elements that need consistent spacing.

```
┌─────────────────────┐
│    Element 1        │
└─────────────────────┘
         ↓ gap ↑
┌─────────────────────┐
│    Element 2        │
└─────────────────────┘
         ↓ gap ↑
┌─────────────────────┐
│    Element 3        │
└─────────────────────┘
```

The most common layout - things on top of each other:

```html
<div class="as-stack" data-key="stacked-example">
  <h2 class="heading">Stacked Content</h2>
  <p class="text">Everything flows vertically.</p>
  <button class="button">With consistent spacing</button>
</div>
```

Customise the gap:

```html
<article class="card as-stack" style="--stack-gap: var(--space-2);" data-key="spaced-card">
  <h3 class="heading">More Space</h3>
  <p class="text">Between elements.</p>
</article>
```

**The "Aha!"**: No margin utility classes. One property controls all spacing.

```css
/* Inside CRISP */
.as-stack {
  /* --stack-gap is type-safe from kernel layer */
  display: flex;
  flex-direction: column;
  gap: var(--stack-gap, var(--space-1));
}
```

### 2. Container (Responsive Padding)

**Layout class**: `as-container`

**What it does**: Provides responsive padding that scales with the viewport. Ensures content has breathing room on all screen sizes without media queries.

**When to use**: Main page wrapper, section containers, any element that needs responsive internal spacing that adapts to screen size.

```
┌─────────────────────────────────────────────┐
│→ padding →┌─────────────────────┐← padding ←│
│           │                     │           │
│           │    Content Area     │           │
│           │                     │           │
│→ padding →└─────────────────────┘← padding ←│
└─────────────────────────────────────────────┘
      ↑                                 ↑
  responsive                       responsive
```

The wrapper that breathes:

```html
<section class="as-container">
  <h2 class="heading">Contained Content</h2>
  <p class="text">Padding adjusts to viewport. No media queries.</p>
</section>
```

```css
/* Inside CRISP */
.as-container {
  /* Properties are type-safe from kernel layer:
     --container-padding (default: clamp(1rem, 5vw, 3rem)) */
  
  padding-inline: var(--container-padding);
}
```

### 3. Cluster (Horizontal Group)

**Layout class**: `as-cluster`

**What it does**: Groups elements horizontally and wraps them naturally when space runs out. Like words in a sentence - they flow left to right and wrap to the next line when needed.

**When to use**: Tag lists, button groups, navigation bars, inline metadata, any collection of items that should stay together horizontally but can wrap if needed.

```
┌──────┐ ← gap → ┌──────┐ ← gap → ┌──────┐ ← gap → ┌──────┐ ↩ wrap
│ Tag1 │         │ Tag2 │         │ Tag3 │         │ Tag4 │
└──────┘         └──────┘         └──────┘         └──────┘
↓ gap ↑          ↓ gap ↑    
┌──────┐ ← gap → ┌──────┐
│ Tag5 │         │ Tag6 │
└──────┘         └──────┘
```

Things that belong together, side by side, wrapping at the end:

```html
<div class="as-cluster" role="group" aria-label="Filter options" data-key="filter-options">
  <span class="badge" data-active="true">All</span>
  <span class="badge">Active</span>
  <span class="badge">Archived</span>
</div>
```

With custom gap and alignment:

```html
<div class="as-cluster" style="--cluster-gap: var(--space-2); --align: center;">
  <img src="icon.svg" alt="" width="24" height="24">
  <span>Icon and text, perfectly aligned</span>
</div>
```

```css
/* Inside CRISP */
.as-cluster {
  /* Properties are type-safe from kernel layer */
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-gap, var(--space-1));
  align-items: var(--align, baseline);
}
```

### 4. Grid (True Flexibility)

**Layout class**: `as-grid`

**What it does**: Creates a grid that automatically adjusts the number of columns based on available space and your minimum item width. No media queries needed - it just works.

**When to use**: Product cards, image galleries, feature lists, team members, any collection of similar items that should be displayed in a grid.

```
┌─────────┐ ← gap → ┌─────────┐ ← gap → ┌─────────┐
│  Item 1 │         │  Item 2 │         │  Item 3 │
└─────────┘         └─────────┘         └─────────┘
↓ gap ↑             ↓ gap ↑             ↓ gap ↑
┌─────────┐ ← gap → ┌─────────┐ ← gap → ┌─────────┐
│  Item 4 │         │  Item 5 │         │  Item 6 │
└─────────┘         └─────────┘         └─────────┘
```

Not your grandfather's 12-column grid:

```html
<!-- Auto-responsive grid -->
<div class="as-grid" data-entries="6" data-key="product-grid">
  <article class="card" data-key="product-1">Item 1</article>
  <article class="card" data-key="product-2">Item 2</article>
  <article class="card" data-key="product-3">Item 3</article>
  <article class="card" data-key="product-4">Item 4</article>
  <article class="card" data-key="product-5">Item 5</article>
  <article class="card" data-key="product-6">Item 6</article>
</div>
```

Explicit columns when needed:

```html
<!-- Always 3 columns -->
<div class="as-grid" style="--grid-columns: 3;">
  <div>Exactly</div>
  <div>Three</div>
  <div>Columns</div>
</div>
```

**The Magic**: `data-entries` tells CSS how many items exist. It can make intelligent responsive decisions.

```css
/* Inside CRISP */
.as-grid {
  /* Properties are type-safe from kernel layer:
     --grid-columns (default: 0 = auto)
     --grid-gap (default: var(--space-1))
     --min-item-width (default: calc(250 * var(--rem))) = 15.625rem */
  
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: 
    var(--grid-columns, repeat(auto-fit, minmax(var(--min-item-width), 1fr)));
}
```

### 5. Center (Content Centering)

**Layout class**: `as-center`

**What it does**: Centers content both horizontally and vertically using modern CSS Grid. Content stays centered and readable regardless of screen size, with optional maximum width constraints.

**When to use**: Hero sections, centered forms, modal content, loading states, any content that needs to be perfectly centered in its container.

```
┌─────────────────────────────────────────────┐
│              ↑ align-content ↑              │
│         ┌─────────────────────────┐         │
│         │                         │         │
│    ←────│     Centered Content    │────→    │
│         │       (max-width)       │         │
│         │                         │         │
│         └─────────────────────────┘         │
│              ↓ align-content ↓              │
└─────────────────────────────────────────────┘
         ← justify-content: center →
```

Centre anything, without the tears:

```html
<main class="as-center">
  <h1 class="heading">Perfectly Centred</h1>
  <p class="text">Horizontally constrained, naturally.</p>
</main>
```

With custom max-width:

```html
<section class="as-center" style="--max-width: 60ch;">
  <article class="prose">
    <p>Optimal reading width, automatically centred.</p>
  </article>
</section>
```

Full viewport centering:

```html
<div class="as-center" style="min-height: 100dvh;">
  <div class="hero">
    <h1>Perfectly Centered</h1>
    <p>Both horizontally AND vertically!</p>
  </div>
</div>
```

```css
/* Inside CRISP */
.as-center {
  /* Properties are type-safe from kernel layer:
     --max-width (default: 65ch)
     --center-padding (default: var(--space-1)) */
  
  /* True centering with Grid - both axes! */
  display: grid;
  place-content: center;
  width: min(100%, var(--max-width));
  padding-inline: var(--center-padding);
}
```

### 6. Split (Opposing Forces)

**Layout class**: `as-split`

**What it does**: Pushes two elements to opposite ends of their container - one to the start, one to the end. Works both horizontally (left/right) and vertically (top/bottom).

**When to use**: Headers with logo and navigation, cards with content and footer, toolbars with actions on both sides, any layout needing elements at opposite ends.

```
┌─────────────────────────────────────────────────┐
│ ┌────────┐                          ┌────────┐  │
│ │  Logo  │ ←──── push apart ────→   │  Menu  │  │
│ └────────┘                          └────────┘  │
└─────────────────────────────────────────────────┘
```

Push things apart:

```html
<header class="as-split" data-key="site-header">
  <h1 class="logo">CRISP</h1>
  <nav class="navigation as-cluster" data-entries="3" data-key="header-nav">
    <a class="link" href="/about">About</a>
    <a class="link" href="/docs">Docs</a>
    <a class="link" href="/github">GitHub</a>
  </nav>
</header>
```

Works vertically too:

```html
<div class="card as-split" style="--direction: column; --min-height: calc(300 * var(--rem));">
  <div class="content">Main content</div>
  <footer class="meta">Pushed to bottom</footer>
</div>
```

```css
/* Inside CRISP */
.as-split {
  /* Properties are type-safe from kernel layer:
     --direction (default: row)
     --split-gap (default: var(--space-1))
     --min-height (default: auto) */
  
  display: flex;
  flex-direction: var(--direction);
  justify-content: space-between;
  gap: var(--split-gap);
  min-height: var(--min-height);
}
```

### 7. Aside-Content (Classic Layout)

**Layout class**: `as-aside-content`

**What it does**: Creates a two-column layout with a fixed-width aside (sidebar) on the left and flexible main content area on the right. The aside maintains its width until space becomes too tight, then stacks vertically.

**When to use**: Documentation sites, admin dashboards, blog layouts with navigation or supplementary content, any layout needing an aside area next to main content.

```
┌────────────────────────────────────────────────┐
│ ┌──────────────┐ ← gap → ┌───────────────────┐ │
│ │              │         │                   │ │
│ │    Aside     │         │   Main Content    │ │
│ │  (15.625rem) │         │      (1fr)        │ │
│ │              │         │                   │ │
│ └──────────────┘         └───────────────────┘ │
└────────────────────────────────────────────────┘
```

Content with an aside area, responsive by default:

```html
<div class="as-aside-content" data-key="docs-layout">
  <aside class="aside">
    <nav class="navigation as-stack" data-entries="5" data-key="docs-nav">
      <a class="link" href="#intro">Introduction</a>
      <a class="link" href="#features">Features</a>
      <a class="link" href="#usage">Usage</a>
      <a class="link" href="#api">API</a>
      <a class="link" href="#examples">Examples</a>
    </nav>
  </aside>
  
  <main class="content">
    <h1 class="heading">Main Content</h1>
    <p class="text">Aside collapses on mobile automatically.</p>
  </main>
</div>
```

Control the aside width:

```html
<div class="as-aside-content" style="--aside-width: calc(300 * var(--rem));">
  <!-- Wider aside -->
</div>
```

```css
/* Inside CRISP */
.as-aside-content {
  /* Properties are type-safe from kernel layer:
     --aside-width (default: calc(250 * var(--rem)))
     --aside-gap (default: var(--space-2))
     --collapse-width (default: calc(768 * var(--rem))) */
  
  display: grid;
  gap: var(--aside-gap);
  grid-template-columns: var(--aside-width) 1fr;
  
  @container (max-width: var(--collapse-width)) {
    grid-template-columns: 1fr;
  }
}
```

## Responsive Breakpoints

While CRISP layouts are responsive by default, sometimes you need explicit control. CRISP provides four semantic breakpoints that you can use directly in your blueprint files or custom CSS.

**Standard CRISP Breakpoints (in pixels for clarity):**
- **Phone**: < 660px (mobile devices in portrait)
- **Tablet**: 660px - 959px (tablets, large phones in landscape)
- **Screen**: 960px - 1259px (small desktops, tablets in landscape)
- **Wide**: 1260px+ (large screens, wide monitors)

Why pixels instead of rems? Because `768px` is immediately understandable, while `48rem` requires mental math. CRISP values clarity.

```css
/* In your blueprint CSS files - clean mobile-first approach */

/* blueprints/split/split.css */
.as-split {
  /* Mobile-first base styles */
  display: flex;
  flex-direction: column;
  gap: var(--split-gap, var(--space-1));
  
  /* Tablet and up */
  @media (min-width: 660px) {
    flex-direction: row;
  }
}

/* blueprints/visibility/visibility.css */
/* Default all visibility utilities */
.only-phone { display: none; }
.only-tablet { display: none; }
.only-screen { display: none; }
.only-wide { display: none; }

.not-phone { display: block; }
.not-tablet { display: block; }
.not-screen { display: block; }
.not-wide { display: block; }

/* Phone (320px+) */
@media (min-width: 320px) {
  .only-phone { display: block; }
  .not-phone { display: none; }
}

/* Tablet (660px+) */
@media (min-width: 660px) {
  .only-phone { display: none; }
  .only-tablet { display: block; }
  
  .not-phone { display: block; }
  .not-tablet { display: none; }
}

/* Screen (960px+) */
@media (min-width: 960px) {
  .only-tablet { display: none; }
  .only-screen { display: block; }
  
  .not-tablet { display: block; }
  .not-screen { display: none; }
}

/* Wide (1260px+) */
@media (min-width: 1260px) {
  .only-screen { display: none; }
  .only-wide { display: block; }
  
  .not-screen { display: block; }
  .not-wide { display: none; }
}
```

**The "Aha!"**: Media queries go directly in your blueprint files where they're needed! The build process handles layer sorting automatically, so you can focus on writing clean, responsive CSS.

### The Breakpoint Reality Check

**What we'd love** (but CSS doesn't support):
```css
/* This would be amazing... */
@layer crisp.phone {
  /* Styles that only apply on phones */
  .as-split { flex-direction: column; }
}

/* ...but layers can't be conditional! */
```

**What CRISP does instead** (simple and clean):
```css
/* Just put media queries where they belong - with their styles */
.as-split {
  display: flex;
  flex-direction: column;
  
  @media (min-width: 660px) {
    flex-direction: row;
  }
}
```

No layer complexity. Just clean, nested media queries that follow the cascade naturally.

### Using Breakpoints with Layouts

```html
<!-- Use visibility utilities -->
<nav class="not-phone">Desktop navigation</nav>
<nav class="only-phone">Mobile navigation</nav>
```

**Better approach**: Let layouts adapt naturally:

```css
/* In your overrides layer */
@layer overrides {
  @media (max-width: 659px) {
    .header-nav {
      --cluster-gap: var(--space-0-5);
      --align: stretch;
    }
  }
}
```

### Breakpoint Philosophy

1. **Container queries first** - Component-level responsiveness
2. **Breakpoints second** - Page-level layout changes
3. **Four is enough** - Phone, Tablet, Screen, Wide
4. **Semantic names** - Not "sm", "md", "lg", "xl"
5. **Progressive enhancement** - Mobile-first thinking

### Mobile-First Inheritance

**What mobile-first really means**:

```css
/* In blueprints/button/button.css - Clean and simple! */
.button {
  /* Mobile-first base styles */
  display: inline-flex;
  padding: var(--space-0-75) var(--space-1-5);
  font-size: 1rem;
  border-radius: 0.5rem;
  /* 10+ more properties... */
  
  /* Tablet (660px+) - ONLY what changes! */
  @media (min-width: 660px) {
    padding: var(--space-1) var(--space-2);  /* Bigger padding */
    font-size: 1.125rem;                    /* Bigger text */
  }
  
  /* Wide (1260px+) - Again, ONLY differences */
  @media (min-width: 1260px) {
    padding: var(--space-1-25) var(--space-2-5);  /* Even bigger */
    /* font-size stays from tablet - true cascade! */
  }
}
```

**Never do this** (copy-paste everything):
```css
/* WRONG - Don't duplicate everything! */
@media (min-width: 660px) {
  .button {
    display: inline-flex;      /* Duplicate */
    padding: var(--space-1);   /* Changed */
    font-size: 1.125rem;       /* Changed */
    border-radius: 0.5rem;     /* Duplicate */
    /* 10+ more duplicates... */
  }
}
```

**The cascade flows upward**: base → phone → tablet → screen → wide. Each layer only declares what CHANGES. This keeps code minimal, readable, and maintainable.

### The Architecture Protects Itself

**Why CRISP's layer structure matters:**

```css
/* The build process automatically sorts your styles into the right layers */

/* From blueprints/button/button.css */
.button {
  background: var(--color-primary);  /* Goes into @layer crisp.elements */
}

.button.with-icon {
  gap: var(--space-1);  /* Goes into @layer crisp.properties */
}

.button:hover {
  background: var(--color-primary-dark);  /* Goes into @layer crisp.states */
}
```

**The cascade hierarchy that matters:**
1. `kernel` - Core property definitions (you never touch this)
2. `crisp.elements` - Base component styles
3. `crisp.properties` - Property modifiers (.with-*)
4. `crisp.states` - Interactive states (:hover, :focus)
5. `overrides` - Your custom styles (always wins)

**The result**: Styles automatically cascade in the right order. No fighting specificity. No `!important` needed.

**Media queries?** They just work within this structure:
```css
.button {
  padding: var(--space-1);
  
  @media (min-width: 660px) {
    padding: var(--space-2);  /* Still in elements layer, just responsive */
  }
}

### Container Queries: The bound Exception

Both global media queries and container queries belong in your blueprint files - keep responsive styles with their components:

```css
/* In blueprints/card/card.css - All responsive styles together */
.card {
  container-type: inline-size;
  padding: var(--space-1);
  
  /* Container query RIGHT HERE - it's blueprint-specific */
  @container (min-width: 400px) {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: var(--space-1);
  }
  
  @container (min-width: 640px) {
    grid-template-columns: 200px 1fr;
    gap: var(--space-2);
  }
}

/* Also with nesting */
.product-grid {
  container-type: inline-size;
  
  .product-card {
    /* Mobile-first base */
    display: flex;
    flex-direction: column;
    
    /* Container-based enhancement */
    @container (min-width: 480px) {
      flex-direction: row;
      
      .media {
        width: 120px;
      }
    }
  }
}
```

**The Rule**:
- **Global viewport queries** → In blueprint files with @media rules
- **Container queries** → In the same blueprint files with @container rules
- **Both types** → Stay with their components for better maintainability

This is the ONLY case where responsive rules live directly with the blueprint - because container queries are inherently container-scoped, not global.

## Composition Magic

The real power? Combining layouts:

```html
<!-- Header with split layout inside container -->
<header class="header as-container" data-key="main-header">
  <div class="as-split">
    <a class="logo" href="/" data-key="logo">CRISP</a>
    <nav class="navigation as-cluster" data-entries="4" data-key="main-nav">
      <a class="link" href="/features">Features</a>
      <a class="link" href="/docs">Docs</a>
      <a class="link" href="/examples">Examples</a>
      <a class="link" href="/github">GitHub</a>
    </nav>
  </div>
</header>

<!-- Card grid inside centred container -->
<main class="as-center" data-key="main-content">
  <section class="as-stack" data-key="products-section">
    <h2 class="heading">Our Products</h2>
    
    <div class="as-grid" data-entries="6" data-key="products-grid">
      <article class="card as-stack" data-key="product-card-1">
        <h3 class="heading">Product 1</h3>
        <p class="text">Description</p>
        <a class="link" href="/products/1">Learn More</a>
      </article>
      <!-- 5 more cards -->
    </div>
  </section>
</main>
```

## Responsive by Default

Every layout adapts naturally without media queries:

- **Stack**: Always vertical, gap scales with space
- **Container**: Padding scales with viewport automatically
- **Cluster**: Wraps when space runs out
- **Grid**: Adjusts columns based on available space
- **Center**: Constrains to readable width
- **Split**: Can change direction via custom properties
- **Aside-Content**: Collapses when space is tight

For blueprint-specific responsiveness, prefer container queries:

```css
/* Blueprint-level responsiveness */
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    --layout: horizontal;
  }
}
```

## The Global Raster

For complex apps, CRISP offers a global grid system:

```html
<body data-raster="12">
  <header data-position="1-12">Full width header</header>
  
  <nav data-position="1-3">Sidebar navigation</nav>
  
  <main data-position="4-10">Main content area</main>
  
  <aside data-position="11-12">Right sidebar</aside>
  
  <footer data-position="1-12">Full width footer</footer>
</body>
```

**The "Aha!"**: Not classes - data attributes. Your layout isn't polluting your styling.

## Real-World Patterns

### Holy Grail Layout

```html
<body class="as-stack" style="--stack-gap: 0;" data-key="holy-grail-layout">
  <header class="header as-container" data-key="layout-header">
    <h1>Header</h1>
  </header>
  
  <div class="as-grid" style="--grid-columns: 3; --grid-gap: 0; min-height: 80dvh;" data-key="layout-main">
    <nav class="navigation as-container" data-key="layout-nav">
      Navigation
    </nav>
    
    <main class="content as-container" data-key="layout-content">
      Main content
    </main>
    
    <aside class="aside as-container" data-key="layout-aside">
      Aside
    </aside>
  </div>
  
  <footer class="footer as-container" data-key="layout-footer">
    Footer
  </footer>
</body>
```

### Dashboard Layout

```html
<div class="as-aside-content" style="--aside-width: calc(250 * var(--rem));" data-key="dashboard-layout">
  <nav class="aside" data-key="dashboard-nav">
    <!-- Fixed navigation -->
  </nav>
  
  <main class="content as-stack" data-key="dashboard-main">
    <header class="as-split" data-key="dashboard-header">
      <h1 class="heading">Dashboard</h1>
      <button class="button" data-key="settings-button">Settings</button>
    </header>
    
    <div class="as-grid" data-entries="4" data-key="metrics-grid">
      <!-- Metric cards -->
    </div>
    
    <section class="as-stack" data-key="content-sections">
      <!-- Content sections -->
    </section>
  </main>
</div>
```

## The Layout Principles

1. **Layouts describe relationships**, not appearance
2. **One layout pattern per element** (usually)
3. **Compose for complexity** - nest simple layouts
4. **Data attributes for configuration**, not classes
5. **Let CSS be intelligent** - it knows more than you think
6. **All containers that center are grids** - modern CSS, no margins

## What You Don't Need

- Breakpoint utilities (`sm:`, `md:`, `lg:`)
- Column classes (`col-6`, `span-3`)
- Margin/padding utilities (`m-4`, `p-8`)
- Flexbox utilities (`flex`, `items-center`)
- Grid utilities (`grid-cols-3`)
- `margin: auto` for centering (use Grid!)

It's all built into the seven patterns.

## Your Layout Toolbox

You now have:
- **Stack**: Vertical rhythm
- **Container**: Responsive spacing
- **Cluster**: Horizontal grouping  
- **Grid**: 2D arrangements
- **Center**: Content focus
- **Split**: Opposing elements
- **Aside-Content**: Classic two-column

Seven patterns. Infinite possibilities. Zero utility classes.

Ready to make everything work on every screen?

→ Continue to [Chapter 7: Growing Seasons - Progressive Enhancement Tiers](./CH07-progressive.md)