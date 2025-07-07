# Chapter 6: Layouts That Don't Make You Think

*Or: How to arrange things without arranging a therapist*

## The Layout Liberation

Remember the dark times?

```css
/* Monday: "I'll use flexbox for everything!" */
.header { display: flex; justify-content: space-between; align-items: center; }
.header__nav { display: flex; gap: 16px; }
.header__nav-item { margin-right: 16px; } /* Wait, I have gap... */
.header__nav-item:last-child { margin-right: 0; } /* ...why am I doing this? */

/* Tuesday: "Actually, let's try floats for the sidebar" */
.sidebar { float: left; width: 300px; margin-right: 20px; }
.main { margin-left: 320px; } /* Hope nobody has a 299px screen */
.clearfix::after { content: ""; display: table; clear: both; } /* I hate my life */

/* Wednesday: "Grid will save me!" */
.container { display: grid; grid-template-columns: 300px 1fr; }
/* Thursday: "Why doesn't it work in Safari?" */
/* Friday: *drinks heavily* */
```

**The "Aha!"**: What if layouts were just... utility classes? What if they worked on EVERYTHING?

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

*Or: How humanity learned to stop worrying and love vertical spacing*

The most common layout need: things flowing downward with consistent spacing. Revolutionary, I know.

```css
@property --stack-gap {
  syntax: "<length>";
  inherits: false;
  initial-value: var(--space-1-0);
}

@layer crisp {
  .as-stack {
    display: flex;
    flex-direction: column;
    gap: var(--stack-gap);
  }
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

**Secret sauce**: The gap is consistent. Always. No more "wait, was that margin-top or margin-bottom?" debugging sessions.

### 2. The Cluster - Flexible Grouping

*Because sometimes things need to huddle together for warmth*

For items that should wrap naturally, like navigation links or tags. Think of it as flexbox that actually makes sense.

```css
@property --cluster-gap {
  syntax: "<length>";
  inherits: false;
  initial-value: var(--space-1-0);
}

@layer crisp {
  .as-cluster {
    display: flex;
    flex-wrap: wrap;
    gap: var(--cluster-gap);
    align-items: var(--cluster-align, center);
  }
}
```

```html
<!-- Navigation cluster -->
<nav class="as-cluster" data-entries="4" aria-label="Main navigation">
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
<div class="as-cluster" style="--cluster-align: stretch;" data-entries="2">
  <button class="button" type="button">Cancel</button>
  <button class="button" type="button" style="--bg: var(--color-primary);">Save</button>
</div>
```

**Use for**: Navigation, tags, button groups, any horizontal grouping

**The "Aha!"**: No more `display: inline-block` with negative margins. The cluster knows how to wrap without your help.

### 3. The Grid - Two-Dimensional Layout

*Grid: Because life isn't always one-dimensional (unlike your ex)*

When you need rows AND columns. Auto-responsive by default because we're not savages.

```css
@property --grid-gap {
  syntax: "<length>";
  inherits: false;
  initial-value: var(--space-1-0);
}

@property --grid-columns {
  syntax: "<integer> | <custom-ident>";
  inherits: false;
  initial-value: auto-fit;
}

@layer crisp {
  .as-grid {
    display: grid;
    gap: var(--grid-gap);
    grid-template-columns: repeat(
      var(--grid-columns),
      minmax(var(--grid-min, 250px), 1fr)
    );
  }
}
```

```html
<!-- Auto-responsive grid -->
<section class="as-grid" data-entries="4">
  <article class="card">Auto-sizes to fit</article>
  <article class="card">Minimum 250px</article>
  <article class="card">Maximum 1fr</article>
  <article class="card">Wraps beautifully</article>
</section>

<!-- Fixed column grid -->
<div class="as-grid" style="--grid-columns: 3;" data-entries="3">
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

**Mind = Blown**: It's responsive WITHOUT media queries. The grid just... knows. `minmax()` is witchcraft, I tell you.

### 4. The Center - Perfect Centering

*Finally, the answer to "How do I center a div?" (Spoiler: It's one class)*

The holy grail of CSS, solved. Your ancestors would weep with joy.

```css
@property --center-height {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 100vh;
}

@layer crisp {
  .as-center {
    display: grid;
    place-items: center;
    min-height: var(--center-height);
  }
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

**The "Aha!"**: `place-items: center` is all you needed. All those Stack Overflow answers with `position: absolute` and `transform`? Delete them.

### 5. The Sidebar - Content with Aside

*The sidebar that knows when to get out of the way*

For main content with a sidebar that behaves intelligently. No JavaScript required - just pure CSS brilliance.

```css
@property --sidebar-gap {
  syntax: "<length>";
  inherits: false;
  initial-value: var(--space-1-0);
}

@property --sidebar-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 300px;
}

@layer crisp {
  .as-sidebar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sidebar-gap);
  }

  .as-sidebar > :first-child {
    flex-basis: var(--sidebar-width);
    flex-grow: 1;
  }

  .as-sidebar > :last-child {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: var(--sidebar-content-min, 50%);
  }
}
```

```html
<!-- Standard sidebar -->
<div class="as-sidebar">
  <aside class="card as-stack">
    <h2>Sidebar</h2>
    <nav class="as-stack" data-entries="2" aria-label="Sidebar navigation">
      <a class="link" href="#">Link 1</a>
      <a class="link" href="#">Link 2</a>
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

**Magic trick**: The `flex-grow: 999` on the main content means it always wins. The sidebar knows its place. As it should.

### 6. The Container - Constrained Width

*Because nobody wants to read a 4000px wide paragraph on their ultrawide monitor*

For readable line lengths and consistent padding. Your eyes will thank you.

```css
@property --container-max {
  syntax: "<length>";
  inherits: false;
  initial-value: 1200px;
}

@layer crisp {
  .as-container {
    max-inline-size: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-padding, var(--space-1-0));
  }
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

**Pro tip**: `max-inline-size` instead of `max-width` because we're international now. RTL languages rejoice!

## Composing Layouts

*Like LEGO, but for web layouts (and less painful to step on)*

The real power comes from composition. Watch this magic:

```html
<!-- A complete page layout -->
<body class="as-stack" style="--stack-gap: 0;">
  <!-- Header -->
  <header class="as-container">
    <nav class="as-cluster" style="--cluster-align: space-between;" data-entries="3" aria-label="Site navigation">
      <a class="link" href="/">Logo</a>
      <div class="as-cluster" data-entries="2">
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
      <nav class="as-stack" style="--stack-gap: var(--space-0-5);" data-entries="2" aria-label="Categories">
        <a class="link" href="#">Category 1</a>
        <a class="link" href="#">Category 2</a>
      </nav>
    </aside>
    
    <!-- Content -->
    <section class="as-stack" style="--stack-gap: var(--space-2-0);">
      <h1>Page Title</h1>
      
      <!-- Card grid -->
      <div class="as-grid" data-entries="2">
        <article class="card as-stack">
          <h2 class="heading">Card 1</h2>
          <p class="text">Card content</p>
          <button class="button" type="button">Action</button>
        </article>
        
        <article class="card as-stack">
          <h2 class="heading">Card 2</h2>
          <p class="text">Card content</p>
          <button class="button" type="button">Action</button>
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

*Or: The Seven Commandments of Not Hating CSS*

1. **Layouts are utilities** - They work on ANY component (yes, even that weird one)
2. **Composition over configuration** - Stack your stacks in grids in containers. It's stacks all the way down
3. **Custom properties over classes** - Because `--stack-gap: 2rem` is cleaner than `stack-gap-8`
4. **Semantic HTML still matters** - A `<div>` soup is still soup, even with nice layouts
5. **Context affects layouts** - Your card knows it's in a dashboard. Spooky
6. **Type-safe properties** - @property catches your `--columns: "twelve"` mistakes
7. **Layer isolation** - @layer crisp means we play nice with others

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
  <h2 class="heading">Our Services</h2>
  <div class="as-grid" style="--grid-columns: 3;" data-entries="3">
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
    <h1 class="heading">Big Hero Title</h1>
    <p class="text">Compelling subtitle</p>
    <div class="as-cluster" data-entries="2">
      <button class="button" type="button">Primary CTA</button>
      <button class="button" type="button">Secondary CTA</button>
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

## The Global Raster System - Bootstrap Killer!

*Warning: May cause Bootstrap developers to question their life choices*

### Priority 1: Global Layout with data-raster/data-position

**THIS IS THE PRIMARY CRISP LAYOUT SYSTEM** - Forget Bootstrap's class soup! 

Remember `col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2`? Yeah, we don't do that here.

```html
<!-- The ONLY way to do global layouts in CRISP -->
<body data-raster="12">
  <!-- Position elements using data-position="start-end" -->
  <header class="header" data-position="1-12">Full width header</header>
  
  <nav class="navigation" data-position="1-3" aria-label="Main navigation">
    Sidebar navigation
  </nav>
  
  <main class="content" data-position="4-9">
    Main content area
  </main>
  
  <aside class="widgets" data-position="10-12">
    Widget sidebar
  </aside>
  
  <footer class="footer" data-position="1-12">Full width footer</footer>
</body>
```

**The "Aha!"**: No more `col-xs-12 col-md-6 col-lg-4` class soup! Just `data-position="1-6"` and you're done.

**Brain explosion moment**: The positions are human-readable. `data-position="4-9"` means "from column 4 to column 9". Even your PM can understand it!

```css
@layer crisp {
  /* Global raster implementation */
  [data-raster] {
    display: grid;
    gap: var(--grid-gap, var(--space-1-0));
  }
  
  [data-raster="12"] {
    grid-template-columns: repeat(12, 1fr);
  }
  
  /* Position elements */
  [data-position] {
    grid-column: var(--grid-position);
  }
  
  /* Core position mappings */
  [data-position="1-3"] { --grid-position: 1 / 4; }
  [data-position="1-4"] { --grid-position: 1 / 5; }
  [data-position="1-6"] { --grid-position: 1 / 7; }
  [data-position="1-8"] { --grid-position: 1 / 9; }
  [data-position="1-12"] { --grid-position: 1 / 13; }
  
  [data-position="4-9"] { --grid-position: 4 / 10; }
  [data-position="4-12"] { --grid-position: 4 / 13; }
  
  [data-position="7-12"] { --grid-position: 7 / 13; }
  [data-position="10-12"] { --grid-position: 10 / 13; }
  
  /* Responsive: Everything goes full-width on mobile */
  @media (max-width: 768px) {
    [data-position] {
      grid-column: 1 / -1;
    }
  }
}
```

### Common Layout Patterns

```html
<!-- Holy Grail Layout -->
<body data-raster="12">
  <header data-position="1-12">Header</header>
  <nav data-position="1-2" aria-label="Main navigation">Nav</nav>
  <main data-position="3-10">Content</main>
  <aside data-position="11-12">Sidebar</aside>
  <footer data-position="1-12">Footer</footer>
</body>

<!-- Two Column Layout -->
<body data-raster="12">
  <header data-position="1-12">Header</header>
  <main data-position="1-8">Main Content</main>
  <aside data-position="9-12">Sidebar</aside>
  <footer data-position="1-12">Footer</footer>
</body>

<!-- Centered Content -->
<body data-raster="12">
  <main data-position="3-10">Centered with margins</main>
</body>
```

### Priority 2: Component Subdivision with as-grid-X

*For when your components need their own little grid party*

For subdividing components (NOT for page layouts), use fixed grid classes. This is for the interior decorating, not the architecture:

```css
@layer crisp {
  /* Component subdivision grids ONLY */
  .as-grid-2 { grid-template-columns: repeat(2, 1fr); }
  .as-grid-3 { grid-template-columns: repeat(3, 1fr); }
  .as-grid-4 { grid-template-columns: repeat(4, 1fr); }
  .as-grid-6 { grid-template-columns: repeat(6, 1fr); }
}
```

```html
<!-- ✅ CORRECT: Subdividing a component -->
<main data-position="4-9">
  <div class="as-grid-3" data-entries="3">
    <article class="card">Card 1</article>
    <article class="card">Card 2</article>
    <article class="card">Card 3</article>
  </div>
</main>

<!-- ❌ WRONG: Don't use for page layout -->
<div class="as-grid-12">
  <header style="grid-column: span 12;">Don't do this!</header>
</div>
```

**The Golden Rule**: 
- **Page layout** → `data-raster` + `data-position` (The big picture)
- **Component subdivision** → `.as-grid-X` or `.as-grid` with `--grid-columns` (The details)

Think of it like architecture vs interior design. You don't use kitchen tiles to build the foundation.

## Modern Layout Enhancements

### CSS Subgrid Support

```css
/* Enable subgrid for perfect alignment */
.as-grid.with-subgrid > * {
  display: grid;
  grid-template-columns: subgrid;
}

/* Raster with subgrid */
[data-raster].with-subgrid > * {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
}
```

### Container Queries

```css
/* Layouts can respond to container size */
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card .as-stack {
    --stack-gap: var(--space-2-0);
  }
}
```

### Smart Grid with :has()

```css
/* Grid adapts to content count */
.as-grid:has(> :nth-child(5)) {
  --grid-columns: 3;
}

.as-grid:has(> :nth-child(9)) {
  --grid-columns: 4;
}

/* Raster adapts to viewport */
@media (min-width: 1200px) {
  [data-raster]:has([data-position*="10"]) {
    grid-template-columns: repeat(12, 1fr);
  }
}
```

## The Layout Liberation

*Achievement Unlocked: CSS Mastery*

With CRISP layouts:
- **No more custom CSS for every component** - One pattern to rule them all
- **No more fighting with flexbox** - It works WITH you now, not against you
- **No more clearfix hacks** - What year is this, 2010?
- **No more responsive nightmares** - It just... works
- **Type-safe custom properties** - The browser is your spell-checker
- **Automatic content adaptation** - Like magic, but real
- **Zero conflicts with @layer** - Play nice with every framework

Just pick a layout, apply it, customise if needed. Done.

**The Ultimate "Aha!"**: You just built an entire site layout system in less code than one Bootstrap component. Your CSS file lost 80% of its weight. Your build time is instant. Your users' phones don't catch fire. 

Welcome to the future. It's rather nice here.

→ Continue to [Chapter 7: The Building Blocks](./C07-elements.md)