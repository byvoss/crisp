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

### 1. Stack (Vertical Flow)

The most common layout - things on top of each other:

```html
<div class="as-stack">
  <h2 class="heading">Stacked Content</h2>
  <p class="text">Everything flows vertically.</p>
  <button class="button">With consistent spacing</button>
</div>
```

Customise the gap:

```html
<article class="card as-stack" style="--stack-gap: var(--space-2);">
  <h3 class="heading">More Space</h3>
  <p class="text">Between elements.</p>
</article>
```

**The "Aha!"**: No margin utility classes. One property controls all spacing.

```css
/* Inside CRISP */
.as-stack {
  @property --stack-gap {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-1);
  }
  
  display: flex;
  flex-direction: column;
  gap: var(--stack-gap);
}
```

### 2. Cluster (Horizontal Group)

Things that belong together, side by side, wrapping at the end:

```html
<nav class="as-cluster" aria-label="Actions">
  <button class="button">Save</button>
  <button class="button">Cancel</button>
  <button class="button">Delete</button>
</nav>
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
  @property --cluster-gap {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-1);
  }
  
  @property --align {
    syntax: "start | center | end | baseline";
    inherits: false;
    initial-value: baseline;
  }
  
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-gap);
  align-items: var(--align);
}
```

### 3. Grid (True Flexibility)

Not your grandfather's 12-column grid:

```html
<!-- Auto-responsive grid -->
<div class="as-grid" data-entries="6">
  <article class="card">Item 1</article>
  <article class="card">Item 2</article>
  <article class="card">Item 3</article>
  <article class="card">Item 4</article>
  <article class="card">Item 5</article>
  <article class="card">Item 6</article>
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
  @property --grid-columns {
    syntax: "<integer>";
    inherits: false;
    initial-value: 0; /* 0 means auto */
  }
  
  @property --grid-gap {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-1);
  }
  
  @property --min-item-width {
    syntax: "<length>";
    inherits: false;
    initial-value: 250px;
  }
  
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: 
    var(--grid-columns, repeat(auto-fit, minmax(var(--min-item-width), 1fr)));
}
```

### 4. Center (The Holy Grail)

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

```css
/* Inside CRISP */
.as-center {
  @property --max-width {
    syntax: "<length>";
    inherits: false;
    initial-value: 65ch;
  }
  
  @property --center-padding {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-1);
  }
  
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--center-padding);
}
```

### 5. Split (Opposing Forces)

Push things apart:

```html
<header class="as-split">
  <h1 class="logo">CRISP</h1>
  <nav class="navigation as-cluster" data-entries="3">
    <a class="link" href="/about">About</a>
    <a class="link" href="/docs">Docs</a>
    <a class="link" href="/github">GitHub</a>
  </nav>
</header>
```

Works vertically too:

```html
<div class="card as-split" style="--direction: column; --min-height: 300px;">
  <div class="content">Main content</div>
  <footer class="meta">Pushed to bottom</footer>
</div>
```

```css
/* Inside CRISP */
.as-split {
  @property --direction {
    syntax: "row | column";
    inherits: false;
    initial-value: row;
  }
  
  @property --split-gap {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-1);
  }
  
  @property --min-height {
    syntax: "<length>";
    inherits: false;
    initial-value: auto;
  }
  
  display: flex;
  flex-direction: var(--direction);
  justify-content: space-between;
  gap: var(--split-gap);
  min-height: var(--min-height);
}
```

### 6. Sidebar (Classic Layout)

Content with a sidebar, responsive by default:

```html
<div class="as-sidebar">
  <aside class="sidebar">
    <nav class="navigation as-stack" data-entries="5">
      <a class="link" href="#intro">Introduction</a>
      <a class="link" href="#features">Features</a>
      <a class="link" href="#usage">Usage</a>
      <a class="link" href="#api">API</a>
      <a class="link" href="#examples">Examples</a>
    </nav>
  </aside>
  
  <main class="content">
    <h1 class="heading">Main Content</h1>
    <p class="text">Sidebar collapses on mobile automatically.</p>
  </main>
</div>
```

Control the sidebar width:

```html
<div class="as-sidebar" style="--sidebar-width: 300px;">
  <!-- Wider sidebar -->
</div>
```

```css
/* Inside CRISP */
.as-sidebar {
  @property --sidebar-width {
    syntax: "<length>";
    inherits: false;
    initial-value: 250px;
  }
  
  @property --sidebar-gap {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-2);
  }
  
  @property --collapse-width {
    syntax: "<length>";
    inherits: false;
    initial-value: 768px;
  }
  
  display: grid;
  gap: var(--sidebar-gap);
  grid-template-columns: var(--sidebar-width) 1fr;
  
  @media (max-width: var(--collapse-width)) {
    grid-template-columns: 1fr;
  }
}
```

### 7. Container (Responsive Padding)

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
  @property --container-padding {
    syntax: "<length>";
    inherits: false;
    initial-value: clamp(1rem, 5vw, 3rem);
  }
  
  padding-inline: var(--container-padding);
}
```

## Composition Magic

The real power? Combining layouts:

```html
<!-- Header with split layout inside container -->
<header class="header as-container">
  <div class="as-split">
    <a class="logo" href="/">CRISP</a>
    <nav class="navigation as-cluster" data-entries="4">
      <a class="link" href="/features">Features</a>
      <a class="link" href="/docs">Docs</a>
      <a class="link" href="/examples">Examples</a>
      <a class="link" href="/github">GitHub</a>
    </nav>
  </div>
</header>

<!-- Card grid inside centred container -->
<main class="as-center">
  <section class="as-stack">
    <h2 class="heading">Our Products</h2>
    
    <div class="as-grid" data-entries="6">
      <article class="card as-stack">
        <h3 class="heading">Product 1</h3>
        <p class="text">Description</p>
        <button class="button">Learn More</button>
      </article>
      <!-- 5 more cards -->
    </div>
  </section>
</main>
```

## No Media Queries Required

Every layout is responsive by default:

- **Stack**: Always vertical
- **Cluster**: Wraps when needed
- **Grid**: Adjusts columns intelligently
- **Center**: Constrains to readable width
- **Split**: Stacks on mobile
- **Sidebar**: Collapses gracefully
- **Container**: Padding scales with viewport

Need specific breakpoints? Use container queries:

```css
/* Component-level responsiveness */
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
<body class="as-stack" style="--stack-gap: 0;">
  <header class="header as-container">
    <h1>Header</h1>
  </header>
  
  <div class="as-sidebar" style="min-height: 80vh;">
    <nav class="sidebar as-container">
      Navigation
    </nav>
    
    <main class="content as-container">
      <div class="as-center">
        Main content
      </div>
    </main>
    
    <aside class="sidebar as-container">
      Sidebar
    </aside>
  </div>
  
  <footer class="footer as-container">
    Footer
  </footer>
</body>
```

### Dashboard Layout

```html
<div class="as-sidebar" style="--sidebar-width: 250px;">
  <nav class="sidebar">
    <!-- Fixed navigation -->
  </nav>
  
  <main class="content as-stack">
    <header class="as-split">
      <h1 class="heading">Dashboard</h1>
      <button class="button">Settings</button>
    </header>
    
    <div class="as-grid" data-entries="4">
      <!-- Metric cards -->
    </div>
    
    <section class="as-stack">
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

## What You Don't Need

- Breakpoint utilities (`sm:`, `md:`, `lg:`)
- Column classes (`col-6`, `span-3`)
- Margin/padding utilities (`m-4`, `p-8`)
- Flexbox utilities (`flex`, `items-center`)
- Grid utilities (`grid-cols-3`)

It's all built into the seven patterns.

## Your Layout Toolbox

You now have:
- **Stack**: Vertical rhythm
- **Cluster**: Horizontal grouping
- **Grid**: 2D arrangements
- **Center**: Content focus
- **Split**: Opposing elements
- **Sidebar**: Classic two-column
- **Container**: Responsive spacing

Seven patterns. Infinite possibilities. Zero utility classes.

Ready to make everything work on every screen?

→ Continue to [Chapter 7: Growing Seasons - Progressive Enhancement Tiers](./CH07-progressive.md)