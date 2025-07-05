# Chapter 15: Component Reference

*Or: The complete CRISP component encyclopaedia*

## How to Use This Reference

Each component includes:
- Basic usage
- Custom properties
- Common patterns
- Accessibility notes
- Link to detailed docs

## Interactive Elements

### button
**Purpose**: Interactive elements that trigger actions

```html
<button class="button" type="button">Default Button</button>
```

**Custom Properties**:
- `--button-bg`: Background color
- `--button-color`: Text color
- `--button-size`: Font size
- `--button-padding`: Internal spacing
- `--button-radius`: Corner radius
- `--button-border`: Border style
- `--button-width`: Width (defaults to auto)

**Common Patterns**:
```html
<!-- Primary button -->
<button class="button" type="button" 
  style="--button-bg: var(--color-primary-50);">
  Primary Action
</button>

<!-- Full-width button -->
<button class="button" type="submit" 
  style="--button-width: 100%;">
  Submit Form
</button>

<!-- Icon button -->
<button class="button" type="button" aria-label="Settings">
  ⚙️
</button>
```

**See**: [Button Documentation](./components/button.md)

### link
**Purpose**: Navigation between pages or sections

```html
<a class="link" href="/about">About Us</a>
```

**Custom Properties**:
- `--link-color`: Text color
- `--link-decoration`: Underline style
- `--link-weight`: Font weight
- `--link-opacity`: Hover opacity

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

**See**: [Link Documentation](./components/link.md)

### input
**Purpose**: Single-line text input

```html
<input class="input" type="text" name="username">
```

**Custom Properties**:
- `--input-bg`: Background color
- `--input-border`: Border style
- `--input-radius`: Corner radius
- `--input-padding`: Internal spacing
- `--input-width`: Width
- `--input-color`: Text color

**Common Patterns**:
```html
<!-- With label -->
<label class="label" for="email">Email</label>
<input class="input" id="email" type="email" name="email" required>

<!-- Full width -->
<input class="input" type="search" style="--input-width: 100%;">

<!-- With validation -->
<input class="input" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
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
- `--select-bg`: Background color
- `--select-border`: Border style
- `--select-radius`: Corner radius
- `--select-padding`: Internal spacing
- `--select-width`: Width

### textarea
**Purpose**: Multi-line text input

```html
<textarea class="textarea" name="message" rows="4"></textarea>
```

**Custom Properties**:
- `--textarea-bg`: Background color
- `--textarea-border`: Border style
- `--textarea-radius`: Corner radius
- `--textarea-padding`: Internal spacing
- `--textarea-width`: Width
- `--textarea-min-height`: Minimum height
- `--textarea-resize`: Resize behavior (vertical, horizontal, both, none)

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
- `--switch-on-bg`: Background when checked
- `--switch-off-bg`: Background when unchecked
- `--switch-size`: Overall size

## Content Containers

### card
**Purpose**: Container for related content

```html
<article class="card">
  Content goes here
</article>
```

**Custom Properties**:
- `--card-bg`: Background color
- `--card-padding`: Internal spacing
- `--card-radius`: Corner radius
- `--card-border`: Border style
- `--card-shadow`: Box shadow

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
<nav class="navigation" aria-label="Main">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
</nav>
```

### breadcrumb
**Purpose**: Hierarchical navigation trail

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
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
<nav class="pagination" aria-label="Pagination">
  <a class="link" href="?page=1">Previous</a>
  <span>Page 2 of 5</span>
  <a class="link" href="?page=3">Next</a>
</nav>
```

### tabs
**Purpose**: Content panel switching

```html
<div class="tabs">
  <input class="radio" id="tab1" type="radio" name="tabs" checked>
  <input class="radio" id="tab2" type="radio" name="tabs">
  
  <nav class="navigation as-cluster">
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

**Variants**:
- `with-success`: Success messages
- `with-warning`: Warning messages
- `with-error`: Error messages
- `with-dismiss`: Dismissible alerts

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
<span class="badge with-success">Active</span>
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
- `--image-width`: Width constraint
- `--image-height`: Height constraint
- `--image-fit`: Object fit (cover, contain, etc.)
- `--image-radius`: Corner radius

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
- `--heading-size`: Font size
- `--heading-weight`: Font weight
- `--heading-color`: Text color
- `--heading-line`: Line height

### text
**Purpose**: Body text

```html
<p class="text">Paragraph of text</p>
```

**Custom Properties**:
- `--text-size`: Font size
- `--text-weight`: Font weight
- `--text-color`: Text color
- `--text-line`: Line height

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
- `--stack-gap`: Gap between items

### as-cluster
**Purpose**: Horizontal grouping with wrap

```html
<div class="as-cluster">
  <button>One</button>
  <button>Two</button>
</div>
```

**Custom Properties**:
- `--cluster-gap`: Gap between items
- `--cluster-align`: Alignment (center, space-between, etc.)

### as-grid
**Purpose**: Two-dimensional grid

```html
<div class="as-grid">
  <div>Cell 1</div>
  <div>Cell 2</div>
</div>
```

**Custom Properties**:
- `--grid-columns`: Number of columns or `auto-fit`
- `--grid-gap`: Gap between cells
- `--grid-min`: Minimum cell width

### as-center
**Purpose**: Perfect centering

```html
<div class="as-center">
  <p>Centered content</p>
</div>
```

**Custom Properties**:
- `--center-height`: Container height

### as-sidebar
**Purpose**: Main content with sidebar

```html
<div class="as-sidebar">
  <aside>Sidebar</aside>
  <main>Main content</main>
</div>
```

**Custom Properties**:
- `--sidebar-width`: Sidebar width
- `--sidebar-gap`: Gap between sections
- `--sidebar-content-min`: Main content minimum width

### as-container
**Purpose**: Width constraint and centering

```html
<div class="as-container">
  Contained content
</div>
```

**Custom Properties**:
- `--container-max`: Maximum width
- `--container-padding`: Horizontal padding

## Property Modifiers

### with-shadow
**Purpose**: Add elevation shadow

```html
<article class="card with-shadow">
  Elevated content
</article>
```

### with-border
**Purpose**: Add border styling

```html
<article class="card with-border">
  Bordered content
</article>
```

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

### with-margin
**Purpose**: External spacing

```html
<article class="card with-margin">
  Spaced card
</article>
```

### with-sticky
**Purpose**: Sticky positioning

```html
<header class="header with-sticky">
  Sticky header
</header>
```

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
| Add a shadow | `with-shadow` |
| Make it interactive | `with-interaction` |
| Show an alert | `alert` |
| Display a badge | `badge` |
| Create a form | `form` |

→ Continue to [Chapter 16: CRISP Cheatsheet](./C16-cheatsheet.md)