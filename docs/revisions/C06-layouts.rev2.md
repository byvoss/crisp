# Chapter 6: Layouts That Don't Make You Think

*Or: How to arrange things without arranging a therapist*

## The Layout Liberation

Remember spending hours on this?

```css
/* The old way: Custom layout for everything */
.header { display: flex; justify-content: space-between; align-items: center; padding: 20px; }
.header__nav { display: flex; gap: 16px; }
.header__nav-item { margin-right: 16px; }
.header__nav-item:last-child { margin-right: 0; }

.sidebar { float: left; width: 300px; margin-right: 20px; }
.main { margin-left: 320px; }
.clearfix::after { content: ""; display: table; clear: both; }

/* Don't forget the responsive nightmare */
@media (max-width: 768px) {
  .sidebar { float: none; width: 100%; margin-right: 0; }
  .main { margin-left: 0; }
  /* 50 more lines... */
}
```

## The CRISP Way: Layout as a Utility

One layout pattern. Infinite uses. Zero custom CSS.

```html
<!-- Stack anything vertically -->
<header class="as-stack">
  <h1>Stacked Header</h1>
  <nav>Navigation</nav>
</header>

<article class="card as-stack">
  <h2>Stacked Card</h2>
  <p>Same layout, different component</p>
</article>

<form class="as-stack">
  <label>Stacked Form</label>
  <input type="text">
  <button>Submit</button>
</form>
```

**The "Aha!"**: Layout patterns are reusable. `as-stack` works on ANY component.

## The Layout Patterns

### 1. The Stack - Vertical Rhythm

The most common layout need: things flowing downward with consistent spacing.

```css
.as-stack {
  display: flex;
  flex-direction: column;
  gap: var(--stack-gap, var(--space-1-0));
}
```

```html
<!-- Default spacing -->
<article class="card as-stack">
  <h2>Title</h2>
  <p>Paragraph with 1rem gap above</p>
  <p>Another paragraph with 1rem gap</p>
</article>

<!-- Custom spacing -->
<section class="as-stack" style="--stack-gap: var(--space-2-0);">
  <h1>Big Title</h1>
  <p>Content with more breathing room</p>
</section>

<!-- Nested stacks -->
<main class="as-stack" style="--stack-gap: var(--space-3-0);">
  <header class="as-stack">
    <h1>Page Title</h1>
    <p>Subtitle with tighter spacing</p>
  </header>
  
  <article class="card as-stack">
    <h2>Article Title</h2>
    <p>Article content</p>
  </article>
</main>
```

**Use for**: Articles, forms, card contents, any vertical flow

### 2. The Cluster - Flexible Grouping

For items that should wrap naturally, like navigation links or tags.

```css
.as-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-gap, var(--space-1-0));
  align-items: var(--cluster-align, center);
}
```

```html
<!-- Navigation cluster -->
<nav class="as-cluster">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/services">Services</a>
  <a class="link" href="/contact">Contact</a>
</nav>

<!-- Tag cluster -->
<div class="as-cluster" style="--cluster-gap: var(--space-0-5);">
  <span class="tag">JavaScript</span>
  <span class="tag">CSS</span>
  <span class="tag">HTML</span>
  <span class="tag">Web Components</span>
</div>

<!-- Button cluster with custom alignment -->
<div class="as-cluster" style="--cluster-align: stretch;">
  <button class="button">Cancel</button>
  <button class="button" style="--bg: var(--color-primary);">Save</button>
</div>
```

**Use for**: Navigation, tags, button groups, any horizontal grouping

### 3. The Grid - Two-Dimensional Layout

When you need rows AND columns.

```css
.as-grid {
  display: grid;
  gap: var(--grid-gap, var(--space-1-0));
  grid-template-columns: repeat(
    var(--grid-columns, auto-fit),
    minmax(var(--grid-min, 250px), 1fr)
  );
}
```

```html
<!-- Auto-responsive grid -->
<section class="as-grid">
  <article class="card">Auto-sizes to fit</article>
  <article class="card">Minimum 250px</article>
  <article class="card">Maximum 1fr</article>
  <article class="card">Wraps beautifully</article>
</section>

<!-- Fixed column grid -->
<div class="as-grid" style="--grid-columns: 3;">
  <div class="card">Always</div>
  <div class="card">Three</div>
  <div class="card">Columns</div>
</div>

<!-- Custom sizing -->
<main class="as-grid" style="--grid-min: 300px; --grid-gap: var(--space-2-0);">
  <article class="card">Minimum 300px</article>
  <article class="card">With 2rem gap</article>
</main>
```

**Use for**: Card grids, image galleries, any multi-column layout

### 4. The Center - Perfect Centering

The holy grail of CSS, solved.

```css
.as-center {
  display: grid;
  place-items: center;
  min-height: var(--center-height, 100vh);
}
```

```html
<!-- Full viewport centering -->
<div class="as-center">
  <div class="card">
    <h1>Perfectly Centered</h1>
    <p>Horizontally AND vertically</p>
  </div>
</div>

<!-- Custom height centering -->
<section class="hero as-center" style="--center-height: 50vh;">
  <div class="as-stack">
    <h1>Hero Title</h1>
    <p>Hero subtitle</p>
    <button class="button">Call to Action</button>
  </div>
</section>
```

**Use for**: Hero sections, modals, loading states, any centered content

### 5. The Sidebar - Content with Aside

For main content with a sidebar that behaves intelligently.

```css
.as-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sidebar-gap, var(--space-1-0));
}

.as-sidebar > :first-child {
  flex-basis: var(--sidebar-width, 300px);
  flex-grow: 1;
}

.as-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--sidebar-content-min, 50%);
}
```

```html
<!-- Standard sidebar -->
<div class="as-sidebar">
  <aside class="card as-stack">
    <h2>Sidebar</h2>
    <nav class="as-stack">
      <a class="link">Link 1</a>
      <a class="link">Link 2</a>
    </nav>
  </aside>
  
  <main class="as-stack">
    <h1>Main Content</h1>
    <p>This reflows under sidebar on small screens</p>
  </main>
</div>

<!-- Reverse sidebar (content first) -->
<div class="as-sidebar" style="--sidebar-reverse: true;">
  <main class="as-stack">
    <h1>Content First</h1>
  </main>
  
  <aside class="card">
    <h2>Sidebar Second</h2>
  </aside>
</div>
```

**Use for**: Documentation, dashboards, any content+sidebar layout

### 6. The Container - Constrained Width

For readable line lengths and consistent padding.

```css
.as-container {
  max-inline-size: var(--container-max, 1200px);
  margin-inline: auto;
  padding-inline: var(--container-padding, var(--space-1-0));
}
```

```html
<!-- Standard container -->
<div class="as-container">
  <h1>Contained Content</h1>
  <p>Maximum width with automatic centering</p>
</div>

<!-- Article container (narrower for readability) -->
<article class="as-container as-stack" style="--container-max: 65ch;">
  <h1>Readable Article</h1>
  <p>Content constrained to comfortable reading width</p>
</article>

<!-- Full-width with contained content -->
<section class="hero" style="background: var(--color-primary);">
  <div class="as-container as-center" style="--center-height: 40vh;">
    <h1>Full-width background, contained content</h1>
  </div>
</section>
```

**Use for**: Page wrappers, article content, any width-constrained layout

## Composing Layouts

The real power comes from composition:

```html
<!-- A complete page layout -->
<body class="as-stack" style="--stack-gap: 0;">
  <!-- Header -->
  <header class="as-container">
    <nav class="as-cluster" style="--cluster-align: space-between;">
      <a class="link" href="/">Logo</a>
      <div class="as-cluster">
        <a class="link" href="/about">About</a>
        <a class="link" href="/contact">Contact</a>
      </div>
    </nav>
  </header>
  
  <!-- Main content -->
  <main class="as-container as-sidebar" style="--sidebar-gap: var(--space-2-0);">
    <!-- Sidebar -->
    <aside class="card as-stack">
      <h2>Categories</h2>
      <nav class="as-stack" style="--stack-gap: var(--space-0-5);">
        <a class="link">Category 1</a>
        <a class="link">Category 2</a>
      </nav>
    </aside>
    
    <!-- Content -->
    <section class="as-stack" style="--stack-gap: var(--space-2-0);">
      <h1>Page Title</h1>
      
      <!-- Card grid -->
      <div class="as-grid">
        <article class="card as-stack">
          <h2>Card 1</h2>
          <p>Card content</p>
          <button class="button">Action</button>
        </article>
        
        <article class="card as-stack">
          <h2>Card 2</h2>
          <p>Card content</p>
          <button class="button">Action</button>
        </article>
      </div>
    </section>
  </main>
  
  <!-- Footer -->
  <footer class="as-container as-center" style="--center-height: 200px;">
    <p>&copy; 2025 Your Company</p>
  </footer>
</body>
```

## Layout Custom Properties

Each layout accepts customisation:

| Layout | Properties | Default |
|--------|-----------|---------|
| `as-stack` | `--stack-gap` | `var(--space-1-0)` |
| `as-cluster` | `--cluster-gap`<br>`--cluster-align` | `var(--space-1-0)`<br>`center` |
| `as-grid` | `--grid-columns`<br>`--grid-min`<br>`--grid-gap` | `auto-fit`<br>`250px`<br>`var(--space-1-0)` |
| `as-center` | `--center-height` | `100vh` |
| `as-sidebar` | `--sidebar-width`<br>`--sidebar-gap`<br>`--sidebar-content-min` | `300px`<br>`var(--space-1-0)`<br>`50%` |
| `as-container` | `--container-max`<br>`--container-padding` | `1200px`<br>`var(--space-1-0)` |

## The Layout Philosophy

1. **Layouts are utilities** - They work on any component
2. **Composition over configuration** - Combine simple layouts for complex designs
3. **Custom properties over classes** - Adjust spacing without new CSS
4. **Semantic HTML still matters** - Use the right elements inside layouts
5. **Context affects layouts** - Use data attributes for contextual changes

### Context-Aware Layouts

```html
<!-- Compact context reduces spacing -->
<main data-variant="compact">
  <div class="as-stack">
    <!-- Inherits compact spacing from context -->
    <h1>Compact Layout</h1>
    <p>Less spacing throughout</p>
  </div>
</main>

<!-- Dashboard context might change grid behavior -->
<section data-variant="dashboard">
  <div class="as-grid">
    <!-- Context can override grid settings -->
    <widget class="card">Widget 1</widget>
    <widget class="card">Widget 2</widget>
  </div>
</section>
```

**The "Aha!"**: Layout properties have prefixes because they belong to the layout utility classes, not the components themselves.

## Common Patterns

### Card Grid
```html
<section class="as-container as-stack">
  <h2>Our Services</h2>
  <div class="as-grid" style="--grid-columns: 3;">
    <article class="card as-stack">...</article>
    <article class="card as-stack">...</article>
    <article class="card as-stack">...</article>
  </div>
</section>
```

### Hero Section
```html
<section class="hero as-center" style="--center-height: 80vh;">
  <div class="as-stack" style="--stack-gap: var(--space-2-0);">
    <h1>Big Hero Title</h1>
    <p>Compelling subtitle</p>
    <div class="as-cluster">
      <button class="button">Primary CTA</button>
      <button class="button">Secondary CTA</button>
    </div>
  </div>
</section>
```

### Dashboard Layout
```html
<div class="as-sidebar">
  <nav class="sidebar as-stack">
    <!-- Navigation items -->
  </nav>
  <main class="as-stack">
    <header class="as-cluster" style="--cluster-align: space-between;">
      <!-- Dashboard header -->
    </header>
    <div class="as-grid">
      <!-- Dashboard widgets -->
    </div>
  </main>
</div>
```

## The Layout Liberation

With CRISP layouts:
- No more custom CSS for every component
- No more fighting with flexbox
- No more clearfix hacks
- No more responsive nightmares

Just pick a layout, apply it, customise if needed. Done.

→ Continue to [Chapter 7: The Building Blocks](./C07-elements.md)