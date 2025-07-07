# Chapter 15: Component Reference

*Or: The complete CRISP component encyclopaedia*

## How to Use This Reference

Each component includes:
- Basic usage
- Custom properties (without prefixes for elements)
- Common patterns
- Accessibility notes
- Define/Use pattern examples

## Interactive Elements

### button
**Purpose**: Interactive elements that trigger actions

```html
<button class="button" type="button">Default Button</button>
```

**Custom Properties**:
- `--bg`: Background color
- `--color`: Text color
- `--size`: Font size
- `--weight`: Font weight
- `--padding`: Internal spacing
- `--radius`: Corner radius
- `--border`: Border style

**Define/Use Pattern**:
```css
.button {
  /* 1. Define defaults */
  --bg: var(--color-neutral);
  --color: white;
  --size: var(--text-size-base);
  --weight: var(--text-weight-medium);
  --padding: var(--space-0-75) var(--space-1-5);
  --radius: var(--radius-md);
  --border: none;
  
  /* 2. Use the tokens */
  background: var(--bg);
  color: var(--color);
  font-size: var(--size);
  font-weight: var(--weight);
  padding: var(--padding);
  border-radius: var(--radius);
  border: var(--border);
}
```

**Common Patterns**:
```html
<!-- Primary button -->
<button class="button" type="button" 
  style="--bg: var(--color-primary);">
  Primary Action
</button>

<!-- Full-width button -->
<button class="button" type="submit" 
  style="width: 100%;">
  Submit Form
</button>

<!-- Icon button -->
<button class="button" type="button" aria-label="Settings">
  ⚙️
</button>

<!-- Loading state -->
<button class="button" type="button" disabled data-variant="loading">
  <span class="spinner"></span> Loading...
</button>
```

### link
**Purpose**: Navigation between pages or sections

```html
<a class="link" href="/about">About Us</a>
```

**Custom Properties**:
- `--color`: Text color
- `--decoration`: Underline style
- `--weight`: Font weight
- `--opacity`: Hover opacity

**Common Patterns**:
```html
<!-- External link -->
<a class="link" href="https://example.com" target="_blank" rel="noopener">
  External Site ↗
</a>

<!-- Link as button -->
<a class="link" href="/signup" role="button">
  Sign Up
</a>

<!-- Current page -->
<a class="link" href="/products" aria-current="page">
  Products
</a>
```

### input
**Purpose**: Single-line text input

```html
<input class="input" type="text" name="username">
```

**Custom Properties**:
- `--bg`: Background color
- `--border`: Border style
- `--radius`: Corner radius
- `--padding`: Internal spacing
- `--color`: Text color

**Common Patterns**:
```html
<!-- With label -->
<label class="label" for="email">Email</label>
<input class="input" id="email" type="email" name="email" required>

<!-- Full width -->
<input class="input" type="search" style="width: 100%;">

<!-- With validation state -->
<input class="input" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" data-variant="invalid">
```

### select
**Purpose**: Dropdown selection

```html
<select class="select" name="country">
  <option value="">Choose...</option>
  <option value="uk">United Kingdom</option>
</select>
```

**Custom Properties**:
- `--bg`: Background color
- `--border`: Border style
- `--radius`: Corner radius
- `--padding`: Internal spacing

### textarea
**Purpose**: Multi-line text input

```html
<textarea class="textarea" name="message" rows="4"></textarea>
```

**Custom Properties**:
- `--bg`: Background color
- `--border`: Border style
- `--radius`: Corner radius
- `--padding`: Internal spacing
- `--min-height`: Minimum height
- `--resize`: Resize behavior

### checkbox
**Purpose**: Binary choice input

```html
<label class="label">
  <input class="checkbox" type="checkbox" name="agree">
  <span>I agree to terms</span>
</label>
```

### radio
**Purpose**: Single choice from multiple options

```html
<label class="label">
  <input class="radio" type="radio" name="plan" value="basic">
  <span>Basic Plan</span>
</label>
```

### switch
**Purpose**: Toggle between on/off states

```html
<label class="label">
  <input class="switch" type="checkbox" name="notifications">
  <span>Enable notifications</span>
</label>
```

**Custom Properties**:
- `--on-bg`: Background when checked
- `--off-bg`: Background when unchecked
- `--size`: Overall size

## Content Containers

### card
**Purpose**: Container for related content

```html
<article class="card">
  Content goes here
</article>
```

**Custom Properties**:
- `--bg`: Background color
- `--padding`: Internal spacing
- `--radius`: Corner radius
- `--border`: Border style
- `--shadow`: Box shadow

**Define/Use Pattern**:
```css
.card {
  /* 1. Define defaults */
  --bg: white;
  --padding: var(--space-1-5);
  --radius: var(--radius-lg);
  --border: 1px solid var(--color-border);
  --shadow: none;
  
  /* 2. Use the tokens */
  background: var(--bg);
  padding: var(--padding);
  border-radius: var(--radius);
  border: var(--border);
  box-shadow: var(--shadow);
}
```

**Common Patterns**:
```html
<!-- Card with layout -->
<article class="card as-stack">
  <h3 class="heading">Card Title</h3>
  <p class="text">Card content</p>
</article>

<!-- Interactive card -->
<article class="card with-interaction" tabindex="0" role="button">
  Clickable card
</article>

<!-- Card with shadow -->
<article class="card with-shadow">
  Elevated card
</article>

<!-- Context-specific card -->
<article class="card" data-variant="premium">
  <h3 class="heading">Premium Feature</h3>
</article>
```

### article
**Purpose**: Self-contained content

```html
<article class="article">
  <h1>Article Title</h1>
  <p>Article content...</p>
</article>
```

### section
**Purpose**: Thematic grouping of content

```html
<section class="section">
  <h2>Section Title</h2>
  <!-- Related content -->
</section>
```

### dialog
**Purpose**: Modal or popup dialogs

```html
<dialog class="dialog" id="modal">
  <p>Dialog content</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>
```

**JavaScript**:
```javascript
document.getElementById('modal').showModal();
```

### figure
**Purpose**: Self-contained media with optional caption

```html
<figure class="figure">
  <img class="image" src="photo.jpg" alt="Description">
  <figcaption class="caption">Photo caption</figcaption>
</figure>
```

### blockquote
**Purpose**: Quoted content

```html
<blockquote class="quote">
  <p>"Quote text here"</p>
  <cite>- Author Name</cite>
</blockquote>
```

## Navigation Components

### navigation
**Purpose**: Navigation links container

```html
<nav class="navigation" data-entries="2" aria-label="Main">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
</nav>
```

### breadcrumb
**Purpose**: Hierarchical navigation trail

```html
<nav class="breadcrumb" data-entries="3" aria-label="Breadcrumb">
  <ol class="list as-cluster">
    <li><a class="link" href="/">Home</a></li>
    <li><a class="link" href="/products">Products</a></li>
    <li aria-current="page">Laptop</li>
  </ol>
</nav>
```

### pagination
**Purpose**: Page navigation

```html
<nav class="pagination" data-entries="3" aria-label="Pagination">
  <a class="link" href="?page=1">Previous</a>
  <span>Page 2 of 5</span>
  <a class="link" href="?page=3">Next</a>
</nav>
```

### tabs
**Purpose**: Content panel switching

```html
<div class="tabs" data-entries="2">
  <input class="radio" id="tab1" type="radio" name="tabs" checked>
  <input class="radio" id="tab2" type="radio" name="tabs">
  
  <nav class="navigation as-cluster" data-entries="2" data-variant="tabs">
    <label class="tab" for="tab1">Tab 1</label>
    <label class="tab" for="tab2">Tab 2</label>
  </nav>
  
  <div class="panels">
    <section class="panel">Panel 1</section>
    <section class="panel">Panel 2</section>
  </div>
</div>
```

## Form Components

### form
**Purpose**: Form container

```html
<form class="form as-stack" method="post">
  <!-- Form fields -->
</form>
```

### fieldset
**Purpose**: Group related form fields

```html
<fieldset class="fieldset as-stack">
  <legend>Personal Information</legend>
  <!-- Related fields -->
</fieldset>
```

### label
**Purpose**: Form field labels

```html
<label class="label" for="name">Your Name</label>
<input class="input" id="name" type="text">
```

### field
**Purpose**: Form field wrapper

```html
<div class="field">
  <label class="label" for="email">Email</label>
  <input class="input" id="email" type="email">
  <small class="helper">We'll never share your email</small>
</div>
```

## Feedback Components

### alert
**Purpose**: Important messages

```html
<aside class="alert" role="alert">
  Alert message
</aside>
```

**Variants** (using data attributes):
```html
<aside class="alert" role="alert" data-variant="success">
  Success message
</aside>

<aside class="alert" role="alert" data-variant="warning">
  Warning message
</aside>

<aside class="alert" role="alert" data-variant="error">
  Error message
</aside>

<aside class="alert with-dismiss" role="alert">
  <p>Dismissible alert</p>
  <button aria-label="Dismiss">×</button>
</aside>
```

### toast
**Purpose**: Temporary notifications

```html
<div class="toast" role="status">
  <p>Notification message</p>
  <button aria-label="Dismiss">×</button>
</div>
```

### badge
**Purpose**: Status indicators or counts

```html
<span class="badge">42</span>
<span class="badge" data-variant="success">Active</span>
<span class="badge" data-variant="warning">Pending</span>
<span class="badge" data-variant="error">Offline</span>
```

### tag
**Purpose**: Content labels or categories

```html
<span class="tag">JavaScript</span>
<span class="tag with-remove">
  React
  <button aria-label="Remove">×</button>
</span>
```

### progress
**Purpose**: Progress indication

```html
<!-- Determinate -->
<progress class="progress" value="75" max="100">75%</progress>

<!-- Indeterminate -->
<progress class="progress">Loading...</progress>
```

## Media Components

### image
**Purpose**: Responsive images

```html
<img class="image" src="photo.jpg" alt="Description">
```

**Custom Properties**:
- `--width`: Width constraint
- `--height`: Height constraint
- `--fit`: Object fit
- `--radius`: Corner radius

### video
**Purpose**: Video player

```html
<video class="video" controls>
  <source src="video.mp4" type="video/mp4">
</video>
```

### audio
**Purpose**: Audio player

```html
<audio class="audio" controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>
```

## Text Components

### heading
**Purpose**: Section headings

```html
<h1 class="heading">Main Heading</h1>
<h2 class="heading">Sub Heading</h2>
```

**Custom Properties**:
- `--size`: Font size
- `--weight`: Font weight
- `--color`: Text color
- `--line-height`: Line height

### text
**Purpose**: Body text

```html
<p class="text">Paragraph of text</p>
```

**Custom Properties**:
- `--size`: Font size
- `--weight`: Font weight
- `--color`: Text color
- `--line-height`: Line height

### code
**Purpose**: Code snippets

```html
<code class="code">const x = 42;</code>

<pre class="code">
function example() {
  return true;
}
</pre>
```

### list
**Purpose**: Ordered or unordered lists

```html
<ul class="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol class="list">
  <li>First</li>
  <li>Second</li>
</ol>
```

## Data Display

### table
**Purpose**: Tabular data

```html
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item 1</td>
      <td>£10</td>
    </tr>
  </tbody>
</table>
```

### definition
**Purpose**: Term/definition pairs

```html
<dl class="definition">
  <dt>CRISP</dt>
  <dd>Code Rules for Intuitive Semantic Projects</dd>
</dl>
```

## Layout Utilities

### as-stack
**Purpose**: Vertical spacing

```html
<div class="as-stack">
  <p>Item 1</p>
  <p>Item 2</p>
</div>
```

**Custom Properties**:
- `--gap`: Gap between items

### as-cluster
**Purpose**: Horizontal grouping with wrap

```html
<div class="as-cluster">
  <button>One</button>
  <button>Two</button>
</div>
```

**Custom Properties**:
- `--gap`: Gap between items
- `--align`: Alignment

### as-grid
**Purpose**: Two-dimensional grid

```html
<div class="as-grid">
  <div>Cell 1</div>
  <div>Cell 2</div>
</div>
```

**Custom Properties**:
- `--columns`: Number of columns or `auto-fit`
- `--gap`: Gap between cells
- `--min-width`: Minimum cell width

### as-center
**Purpose**: Perfect centering

```html
<div class="as-center">
  <p>Centered content</p>
</div>
```

**Custom Properties**:
- `--height`: Container height

### as-split
**Purpose**: Two elements with one fixed width

```html
<div class="as-split">
  <aside>Fixed width</aside>
  <main>Flexible content</main>
</div>
```

**Custom Properties**:
- `--split`: Fixed element width
- `--gap`: Gap between sections

**Variants**:
```html
<!-- Reverse order -->
<div class="as-split" data-variant="reverse">
  <main>Flexible content</main>
  <aside>Fixed width</aside>
</div>
```

### as-container
**Purpose**: Width constraint and centering

```html
<div class="as-container">
  Contained content
</div>
```

**Custom Properties**:
- `--max-width`: Maximum width
- `--padding`: Horizontal padding

## Property Modifiers

### with-shadow
**Purpose**: Add elevation shadow

```html
<article class="card with-shadow">
  Elevated content
</article>
```

**Custom Properties**:
- `--shadow-color`: Shadow color
- `--shadow-blur`: Blur radius
- `--shadow-offset`: Offset distance

### with-border
**Purpose**: Add border styling

```html
<article class="card with-border">
  Bordered content
</article>
```

**Custom Properties**:
- `--border-width`: Border thickness
- `--border-color`: Border color
- `--border-style`: Border style

### with-interaction
**Purpose**: Interactive states (hover, focus)

```html
<button class="button with-interaction">
  Interactive button
</button>
```

### with-padding
**Purpose**: Internal spacing

```html
<section class="section with-padding">
  Padded section
</section>
```

**Custom Properties**:
- `--padding-size`: Padding amount

### with-margin
**Purpose**: External spacing

```html
<article class="card with-margin">
  Spaced card
</article>
```

**Custom Properties**:
- `--margin-size`: Margin amount

### with-sticky
**Purpose**: Sticky positioning

```html
<header class="header with-sticky">
  Sticky header
</header>
```

**Custom Properties**:
- `--sticky-top`: Top offset

### with-animate
**Purpose**: Animation effects

```html
<div class="card with-animate">
  Animated on entry
</div>
```

## Quick Lookup

| Need to... | Use this... |
|------------|-------------|
| Create a button | `button` |
| Make a card | `card` |
| Build navigation | `navigation` |
| Stack things vertically | `as-stack` |
| Create a grid | `as-grid` |
| Center something | `as-center` |
| Split layout | `as-split` |
| Add a shadow | `with-shadow` |
| Make it interactive | `with-interaction` |
| Show an alert | `alert` |
| Display a badge | `badge` |
| Create a form | `form` |

## State Management

Use data attributes for variants:
- `data-variant="loading"` - Loading variant
- `data-variant="error"` - Error variant
- `data-variant="success"` - Success variant
- `data-variant="disabled"` - Disabled variant

## Variant Management

Use data attributes for variants:
- `data-variant="admin"` - Admin interface
- `data-variant="premium"` - Premium features
- `data-variant="checkout"` - Checkout flow
- `data-variant="authenticated"` - Logged-in users

## Enterprise Web Components

**Available in Tier 3 (Free!)** - Web Components that generate CRISP HTML:

### Pattern Generators
```html
<!-- Search with auto-complete -->
<crisp-search-box 
  placeholder="Search..."
  api="/api/search"
  min-chars="2">
  <!-- Generates complete CRISP search pattern -->
</crisp-search-box>

<!-- Product display -->
<crisp-product-card
  name="Product Name"
  price="99.99"
  currency="USD"
  image="/path/to/image.jpg">
  <!-- Generates formatted CRISP product card -->
</crisp-product-card>

<!-- Data table with sorting -->
<crisp-data-table
  source="/api/data"
  sortable="true"
  paginate="10">
  <!-- Generates responsive CRISP table -->
</crisp-data-table>
```

### Key Concept
Web Components are **containers only** - they:
- Accept typed attributes
- Handle business logic
- Generate 100% pure CRISP HTML
- Save typing, not philosophy

The output is always standard CRISP components that work in all tiers!

→ Continue to [Chapter 16: CRISP Cheatsheet](./C16-cheatsheet.md)