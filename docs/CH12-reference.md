# Chapter 12: Seed Catalog - Complete Component Library

*Or: Every CRISP component in one place*

## How to Use This Reference

Each component shows:
1. Basic usage
2. All custom properties
3. Common patterns
4. Accessibility requirements

## Interactive Elements

### Button

The fundamental interactive element.

```html
<button class="button" type="button">Click me</button>
```

#### Custom Properties
```css
/* These properties are type-safe from kernel layer */
/* Default values when not specified: */
--bg: var(--color-neutral);
--color: white;
--size: 1rem;
--weight: 500;
--padding: var(--space-0-75) var(--space-1-5);
--radius: var(--radius-md);
```

#### Patterns
```html
<!-- Primary button -->
<button class="button with-interaction" 
        style="--bg: var(--color-primary);">
  Primary Action
</button>

<!-- Danger button -->
<button class="button" 
        data-variant="danger"
        style="--bg: var(--color-error);">
  Delete
</button>

<!-- Large button -->
<button class="button" 
        style="--size: 1.25rem; --padding: var(--space-1) var(--space-2);">
  Large Button
</button>

<!-- Full width -->
<button class="button" style="width: 100%;">
  Full Width
</button>
```

### Link

Navigation and references.

```html
<a class="link" href="/about">About us</a>
```

#### Custom Properties
```css
.link {
  @property --color {
    syntax: "<color>";
    inherits: false;
    initial-value: var(--color-primary);
  }
  
  @property --color-hover {
    syntax: "<color>";
    inherits: false;
    initial-value: oklch(from var(--color) calc(l - 0.1) c h);
  }
  
  @property --decoration {
    syntax: "none | underline";
    inherits: false;
    initial-value: underline;
  }
}
```

#### Patterns
```html
<!-- Current page -->
<a class="link" href="/" aria-current="page">Home</a>

<!-- External link -->
<a class="link" href="https://example.com" rel="external">
  External site <span aria-hidden="true">↗</span>
</a>

<!-- Download link -->
<a class="link" href="file.pdf" download>
  Download PDF
</a>
```

### Input

Text input fields.

```html
<input class="input" type="text" placeholder="Enter text">
```

#### Custom Properties
```css
.input {
  @property --bg {
    syntax: "<color>";
    inherits: false;
    initial-value: white;
  }
  
  @property --border {
    syntax: "<color>";
    inherits: false;
    initial-value: var(--color-border);
  }
  
  @property --padding {
    syntax: "<length>#";
    inherits: false;
    initial-value: var(--space-0-75) var(--space-1);
  }
  
  @property --radius {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--radius-md);
  }
}
```

#### Types
```html
<!-- Text -->
<input class="input" type="text" name="name">

<!-- Email -->
<input class="input" type="email" name="email">

<!-- Password -->
<input class="input" type="password" name="password">

<!-- Number -->
<input class="input" type="number" min="0" max="100">

<!-- Date -->
<input class="input" type="date">

<!-- Search -->
<input class="input" type="search" placeholder="Search...">
```

### Textarea

Multi-line text input.

```html
<textarea class="textarea" rows="4"></textarea>
```

#### Custom Properties
```css
.textarea {
  @property --min-height {
    syntax: "<length>";
    inherits: false;
    initial-value: 3rem;
  }
  
  @property --max-height {
    syntax: "<length>";
    inherits: false;
    initial-value: 20rem;
  }
  
  /* Includes all input properties */
}
```

#### Features
```html
<!-- Auto-growing -->
<textarea class="textarea" style="field-sizing: content;">
  Grows with content
</textarea>

<!-- Fixed size -->
<textarea class="textarea" rows="10" style="resize: none;">
  Fixed height
</textarea>
```

### Select

Dropdown selection.

```html
<select class="select">
  <option value="">Choose...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

#### Patterns
```html
<!-- With groups -->
<select class="select">
  <optgroup label="Group 1">
    <option>Option 1.1</option>
    <option>Option 1.2</option>
  </optgroup>
  <optgroup label="Group 2">
    <option>Option 2.1</option>
    <option>Option 2.2</option>
  </optgroup>
</select>

<!-- Multiple selection -->
<select class="select" multiple size="4">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
  <option>Option 4</option>
</select>
```

### Checkbox

Binary choice.

```html
<label class="checkbox">
  <input type="checkbox" name="agree">
  <span>I agree to terms</span>
</label>
```

#### States
```html
<!-- Checked -->
<label class="checkbox">
  <input type="checkbox" checked>
  <span>Checked by default</span>
</label>

<!-- Disabled -->
<label class="checkbox">
  <input type="checkbox" disabled>
  <span>Disabled option</span>
</label>

<!-- Indeterminate (via JS) -->
<label class="checkbox">
  <input type="checkbox" id="parent">
  <span>Select all</span>
</label>
```

### Radio

Single choice from group.

```html
<fieldset class="fieldset">
  <legend class="legend">Choose one</legend>
  
  <label class="radio">
    <input type="radio" name="choice" value="1" checked>
    <span>Option 1</span>
  </label>
  
  <label class="radio">
    <input type="radio" name="choice" value="2">
    <span>Option 2</span>
  </label>
</fieldset>
```

### Switch

Toggle state.

```html
<label class="switch">
  <input type="checkbox" role="switch">
  <span>Enable feature</span>
</label>
```

#### States
```html
<!-- On state -->
<label class="switch">
  <input type="checkbox" role="switch" checked aria-checked="true">
  <span>Feature enabled</span>
</label>

<!-- Disabled -->
<label class="switch">
  <input type="checkbox" role="switch" disabled>
  <span>Feature locked</span>
</label>
```

## Container Components

### Card

Content container.

```html
<article class="card">
  <h3 class="heading">Card Title</h3>
  <p class="text">Card content goes here.</p>
</article>
```

#### Custom Properties
```css
.card {
  @property --bg {
    syntax: "<color>";
    inherits: false;
    initial-value: var(--color-surface);
  }
  
  @property --padding {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-1-5);
  }
  
  @property --radius {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--radius-lg);
  }
  
  @property --border {
    syntax: "<color>";
    inherits: false;
    initial-value: transparent;
  }
}
```

#### Patterns
```html
<!-- With image -->
<article class="card">
  <img class="media" src="..." alt="...">
  <div class="content">
    <h3 class="heading">Media Card</h3>
    <p class="text">With image</p>
  </div>
</article>

<!-- Horizontal layout -->
<article class="card as-split">
  <img class="media" src="..." alt="..." style="width: 120px;">
  <div class="content">
    <h3 class="heading">Horizontal Card</h3>
    <p class="text">Side by side</p>
  </div>
</article>

<!-- Interactive -->
<article class="card with-interaction">
  <h3 class="heading">
    <a class="link" href="/details">Clickable Card</a>
  </h3>
  <p class="text">Whole card is clickable</p>
</article>
```

### Article

Semantic article container.

```html
<article class="article">
  <header>
    <h1 class="heading">Article Title</h1>
    <p class="meta">By Author • 5 min read</p>
  </header>
  
  <p class="text">Article content...</p>
  
  <footer>
    <p class="meta">Published in Category</p>
  </footer>
</article>
```

### Section

Page section.

```html
<section class="section" aria-labelledby="section-title">
  <h2 class="heading" id="section-title">Section Title</h2>
  <p class="text">Section content</p>
</section>
```

### Dialog

Modal dialog.

```html
<dialog class="dialog" id="modal">
  <form method="dialog">
    <h2 class="heading">Dialog Title</h2>
    <p class="text">Dialog content</p>
    <div class="as-cluster">
      <button class="button" value="cancel">Cancel</button>
      <button class="button with-interaction" value="confirm">Confirm</button>
    </div>
  </form>
</dialog>

<script>
  document.getElementById('modal').showModal();
</script>
```

#### Custom Properties
```css
.dialog {
  @property --max-width {
    syntax: "<length>";
    inherits: false;
    initial-value: 500px;
  }
  
  @property --padding {
    syntax: "<length>";
    inherits: false;
    initial-value: var(--space-2);
  }
}
```

### Figure

Media with caption.

```html
<figure class="figure">
  <img class="media" src="..." alt="Chart showing growth">
  <figcaption class="caption">
    Annual growth from 2020 to 2024
  </figcaption>
</figure>
```

### Blockquote

Quotations.

```html
<blockquote class="blockquote" cite="https://source.com">
  <p class="text">
    "The best way to predict the future is to invent it."
  </p>
  <footer>
    — <cite class="cite">Alan Kay</cite>
  </footer>
</blockquote>
```

## Layout Helpers

### Stack

Vertical arrangement.

```html
<div class="as-stack">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

Properties:
- `--stack-gap`: Space between items

### Cluster

Horizontal grouping with wrap.

```html
<div class="as-cluster">
  <span>Tag 1</span>
  <span>Tag 2</span>
  <span>Tag 3</span>
</div>
```

Properties:
- `--cluster-gap`: Space between items
- `--align`: Alignment (start, center, end, baseline)

### Grid

Responsive grid layout.

```html
<div class="as-grid" data-entries="6">
  <div>Cell 1</div>
  <div>Cell 2</div>
  <!-- ... -->
</div>
```

Properties:
- `--grid-columns`: Explicit column count
- `--grid-gap`: Space between cells
- `--min-item-width`: Minimum width before wrap

### Center

Centered content with max-width.

```html
<div class="as-center">
  <h1>Centered content</h1>
  <p>With automatic margins</p>
</div>
```

Properties:
- `--max-width`: Maximum content width
- `--center-padding`: Horizontal padding

### Split

Push content to opposite ends.

```html
<div class="as-split">
  <span>Left</span>
  <span>Right</span>
</div>
```

Properties:
- `--direction`: row or column
- `--split-gap`: Minimum space between

### Aside-Content

Two-column layout with aside (left) and content (right), responsive collapse.

```html
<div class="as-aside-content">
  <aside class="aside">Aside content</aside>
  <main class="content">Main content</main>
</div>
```

Properties:
- `--aside-width`: Width of aside area
- `--aside-gap`: Space between columns
- `--collapse-width`: Breakpoint for stacking

### Container

Responsive padding container.

```html
<div class="as-container">
  <p>Content with responsive padding</p>
</div>
```

Properties:
- `--container-padding`: Responsive padding value

## Navigation Components

### Navigation

Link collections.

```html
<nav class="navigation" data-entries="4" aria-label="Main">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/products">Products</a>
  <a class="link" href="/contact">Contact</a>
</nav>
```

Required:
- `data-entries`: Number of items
- `aria-label`: Descriptive label

## Form Components

### Form

Form wrapper.

```html
<form class="form" data-key="contact-form">
  <!-- Form fields -->
</form>
```

### Field

Field wrapper with label.

```html
<div class="field">
  <label class="label" for="input-id">Label</label>
  <input class="input" id="input-id" type="text">
  <small class="helper">Help text</small>
</div>
```

### Fieldset

Related field group.

```html
<fieldset class="fieldset">
  <legend class="legend">Group Title</legend>
  <!-- Related fields -->
</fieldset>
```

## Feedback Components

### Alert

Status messages.

```html
<div class="alert" role="alert" data-variant="success">
  <p class="text">Operation successful!</p>
</div>
```

Variants:
- `success`: Positive outcome
- `error`: Problem occurred
- `warning`: Caution needed
- `info`: Neutral information

### Badge

Small status indicators.

```html
<span class="badge" data-variant="new">NEW</span>
```

### Progress

Progress indicators.

```html
<progress class="progress" value="60" max="100">60%</progress>
```

## Typography Components

### Heading

Section headings.

```html
<h1 class="heading">Page Title</h1>
<h2 class="heading">Section Title</h2>
<h3 class="heading">Subsection Title</h3>
```

Properties:
- `--size`: Font size
- `--weight`: Font weight
- `--color`: Text color

### Text

Body text.

```html
<p class="text">Regular paragraph text.</p>
```

Properties:
- `--size`: Font size
- `--leading`: Line height
- `--color`: Text color

### Meta

Metadata text.

```html
<p class="meta">Published 2 hours ago • 5 min read</p>
```

## Utility Classes

### with-shadow

Add shadow to any element.

```html
<div class="card with-shadow">
  Elevated card
</div>
```

Properties:
- `--shadow-strength`: Shadow opacity
- `--shadow-blur`: Blur radius

### with-interaction

Enhanced interactive states.

```html
<button class="button with-interaction">
  Enhanced hover states
</button>
```

### with-border

Add border to any element.

```html
<article class="card with-border">
  Bordered card
</article>
```

Properties:
- `--border-width`: Border thickness
- `--border-color`: Border color

## Quick Copy Templates

### Basic Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRISP Page</title>
  <link rel="stylesheet" href="https://unpkg.com/@byvoss/crisp-pure@latest/dist/crisp.min.css">
</head>
<body>
  <header class="header as-container">
    <nav class="navigation as-cluster" data-entries="3" aria-label="Main">
      <a class="link" href="/">Home</a>
      <a class="link" href="/about">About</a>
      <a class="link" href="/contact">Contact</a>
    </nav>
  </header>
  
  <main class="as-container">
    <h1 class="heading">Welcome</h1>
    <p class="text">Your content here.</p>
  </main>
  
  <footer class="footer as-container">
    <p class="text">&copy; 2025 Your Site</p>
  </footer>
</body>
</html>
```

### Contact Form

```html
<form class="form as-stack">
  <div class="field">
    <label class="label" for="name">Name</label>
    <input class="input" type="text" id="name" name="name" required>
  </div>
  
  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input" type="email" id="email" name="email" required>
  </div>
  
  <div class="field">
    <label class="label" for="message">Message</label>
    <textarea class="textarea" id="message" name="message" rows="5" required></textarea>
  </div>
  
  <button class="button with-interaction" type="submit">Send Message</button>
</form>
```

### Card Grid

```html
<div class="as-grid" data-entries="3">
  <article class="card as-stack">
    <h3 class="heading">Card 1</h3>
    <p class="text">Description</p>
    <a class="link" href="#">View Details</a>
  </article>
  
  <article class="card as-stack">
    <h3 class="heading">Card 2</h3>
    <p class="text">Description</p>
    <a class="link" href="#">View Details</a>
  </article>
  
  <article class="card as-stack">
    <h3 class="heading">Card 3</h3>
    <p class="text">Description</p>
    <a class="link" href="#">View Details</a>
  </article>
</div>
```

Ready to master the advanced patterns?

→ Continue to [Chapter 13: Rare Specimens - Advanced Patterns](./CH13-advanced.md)