# Chapter 15: Component Reference

*Or: The only component documentation you'll ever bookmark*

## How to Use This Reference

*Your cheat sheet for "How do I make a...?" moments*

Each component includes:
- **Basic usage** (copy, paste, done)
- **Custom properties** (no prefixes needed for elements!)
- **Common patterns** (the ones you'll actually use)
- **Accessibility notes** (because we're not monsters)
- **Define/Use pattern examples** (the CRISP way)

**The "Aha!"**: Every component is just semantic HTML + one class. No divs wrapping divs. No utility class soup. Just clarity.

## Interactive Elements

*The things users click, tap, and type into*

### button
**Purpose**: Interactive elements that trigger actions (not navigation!)

```html
<!-- The simplest button (yes, it's really this simple) -->
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
@layer crisp {
  .button {
    /* 1. Define defaults with @property */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-neutral);
    }
    
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
    
    /* Hover with relative color */
    &:hover {
      --bg: oklch(from var(--bg) calc(l - 0.05) c h);
    }
  }
}
```

**Common Patterns**:
```html
<!-- Primary button (the star of the show) -->
<button class="button with-interaction" type="button" 
  style="--bg: var(--color-primary);"
  aria-label="Primary action">
  Primary Action
</button>

<!-- Full-width button -->
<button class="button" type="submit" 
  style="width: 100%;">
  Submit Form
</button>

<!-- Icon button (accessibility matters!) -->
<button class="button" type="button" aria-label="Open settings">
  <span aria-hidden="true">⚙️</span>
</button>

<!-- Loading state (no spinners.css required) -->
<button class="button" type="button" disabled aria-busy="true" data-state="loading">
  <span class="spinner" aria-hidden="true"></span>
  <span>Loading...</span>
</button>
```

**Mind = Blown**: One button class. Infinite variations through custom properties. No more `.btn-primary-large-rounded-loading`.

### link
**Purpose**: Navigation between pages or sections (not actions!)

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
<!-- External link (security included) -->
<a class="link" href="https://example.com" 
   target="_blank" 
   rel="noopener noreferrer"
   aria-label="Visit external site (opens in new tab)">
  External Site <span aria-hidden="true">↗</span>
</a>

<!-- Link styled as button (when navigation looks like action) -->
<a class="link" href="/signup" 
   role="button"
   style="--bg: var(--color-primary); --padding: var(--space-0-75) var(--space-1-5);">
  Sign Up
</a>

<!-- Current page -->
<a class="link" href="/products" aria-current="page">
  Products
</a>
```

### input
**Purpose**: Single-line text input (the workhorse of forms)

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
<!-- With label (always use labels!) -->
<label class="label" for="email">Email</label>
<input class="input" id="email" type="email" name="email" 
       required aria-required="true"
       aria-describedby="email-hint">
<small class="helper" id="email-hint">We'll never spam you</small>

<!-- Full width -->
<input class="input" type="search" style="width: 100%;">

<!-- With validation state (no JS required) -->
<input class="input" type="tel" 
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
       placeholder="123-456-7890"
       aria-invalid="true"
       aria-describedby="tel-error"
       data-state="invalid">
<small class="error" id="tel-error" role="alert">Please use format: 123-456-7890</small>
```

### select
**Purpose**: Dropdown selection (still better than a custom dropdown)

```html
<select class="select" name="country" aria-label="Select country">
  <option value="" disabled selected>Choose country...</option>
  <option value="uk">United Kingdom</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>
```

**Custom Properties**:
- `--bg`: Background color
- `--border`: Border style
- `--radius`: Corner radius
- `--padding`: Internal spacing

### textarea
**Purpose**: Multi-line text input (for when input isn't enough)

```html
<textarea class="textarea" name="message" rows="4"
          placeholder="Tell us your thoughts..."
          aria-label="Message"
          style="--resize: vertical;"></textarea>
```

**Custom Properties**:
- `--bg`: Background color
- `--border`: Border style
- `--radius`: Corner radius
- `--padding`: Internal spacing
- `--min-height`: Minimum height
- `--resize`: Resize behavior

### checkbox
**Purpose**: Binary choice input (yes/no, on/off, subscribe/unsubscribe)

```html
<label class="label">
  <input class="checkbox" type="checkbox" name="agree" 
         value="yes" aria-describedby="terms-link">
  <span>I agree to the <a href="/terms" id="terms-link">terms and conditions</a></span>
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
**Purpose**: Toggle between on/off states (fancier than checkbox)

```html
<label class="label">
  <input class="switch" type="checkbox" name="notifications"
         role="switch" aria-checked="false">
  <span>Enable notifications</span>
</label>
```

**Custom Properties**:
- `--on-bg`: Background when checked
- `--off-bg`: Background when unchecked
- `--size`: Overall size

## Content Containers

*The building blocks of every modern interface*

### card
**Purpose**: Container for related content (the Swiss Army knife of UI)

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
@layer crisp {
  .card {
    /* 1. Define defaults with @property */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-bg);
    }
    
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
    
    /* Dark mode automatic */
    @media (prefers-color-scheme: dark) {
      --bg: var(--color-bg-dark);
      --border: 1px solid var(--color-border-dark);
    }
  }
}
```

**Common Patterns**:
```html
<!-- Card with layout (structure included!) -->
<article class="card as-stack" role="article">
  <h3 class="heading">Card Title</h3>
  <p class="text">Card content</p>
  <a class="link" href="#">Learn more →</a>
</article>

<!-- Interactive card (entire card is clickable) -->
<article class="card with-interaction" 
         tabindex="0" 
         role="button"
         aria-label="View details"
         onclick="handleCardClick()"
         onkeydown="if(event.key === 'Enter' || event.key === ' ') handleCardClick()">
  <h3 class="heading">Clickable card</h3>
  <p class="text">Click anywhere on this card</p>
</article>

<!-- Card with shadow -->
<article class="card with-shadow">
  Elevated card
</article>

<!-- Context-specific card (variants through data attributes) -->
<article class="card" data-variant="premium" role="article">
  <span class="badge" data-variant="premium">PRO</span>
  <h3 class="heading">Premium Feature</h3>
  <p class="text">Available for premium members</p>
</article>
```

**The "Aha!"**: Cards aren't special. They're just `<article>` elements with nice defaults. Semantic HTML wins again.

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
**Purpose**: Modal or popup dialogs (yes, native HTML!)

```html
<dialog class="dialog" id="modal" aria-labelledby="modal-title">
  <h2 id="modal-title">Dialog Title</h2>
  <p>Dialog content with proper semantics</p>
  <form method="dialog">
    <button class="button">Close</button>
  </form>
</dialog>
```

**JavaScript**:
```javascript
// Show modal (native API!)
const dialog = document.getElementById('modal');
dialog.showModal();

// Handle escape key and backdrop clicks automatically!
// No library needed. Thank you, browser makers.
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
**Purpose**: Quoted content (give credit where it's due)

```html
<blockquote class="quote" cite="https://source.com">
  <p>"The best code is no code at all."</p>
  <footer>
    <cite>Jeff Atwood</cite>
  </footer>
</blockquote>
```

## Navigation Components

*Because users need to find things*

### navigation
**Purpose**: Navigation links container (with proper ARIA)

```html
<nav class="navigation as-cluster" data-entries="3" aria-label="Main navigation">
  <a class="link" href="/" aria-current="page">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/contact">Contact</a>
</nav>
```

### breadcrumb
**Purpose**: Hierarchical navigation trail (Hansel and Gretel style)

```html
<nav class="breadcrumb" data-entries="3" aria-label="Breadcrumb">
  <ol class="list as-cluster" role="list">
    <li><a class="link" href="/">Home</a> <span aria-hidden="true">/</span></li>
    <li><a class="link" href="/products">Products</a> <span aria-hidden="true">/</span></li>
    <li aria-current="page">MacBook Pro</li>
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
**Purpose**: Content panel switching (no JavaScript required!)

```html
<!-- Pure CSS tabs (yes, really!) -->
<div class="tabs" role="tablist" aria-label="Product information">
  <input class="radio" id="tab1" type="radio" name="tabs" checked aria-hidden="true">
  <input class="radio" id="tab2" type="radio" name="tabs" aria-hidden="true">
  
  <nav class="navigation as-cluster" data-entries="2" data-variant="tabs" role="tablist">
    <label class="tab" for="tab1" role="tab" aria-selected="true">Description</label>
    <label class="tab" for="tab2" role="tab" aria-selected="false">Specifications</label>
  </nav>
  
  <div class="panels">
    <section class="panel" role="tabpanel" aria-labelledby="tab1">
      <h3>Product Description</h3>
      <p>Details here...</p>
    </section>
    <section class="panel" role="tabpanel" aria-labelledby="tab2">
      <h3>Technical Specifications</h3>
      <p>Specs here...</p>
    </section>
  </div>
</div>
```

**Mind = Blown**: Tabs without JavaScript. Using radio buttons and CSS sibling selectors. Your 50KB tab library is crying.

## Form Components

*Where data collection happens (hopefully painlessly)*

### form
**Purpose**: Form container (the semantic wrapper)

```html
<form class="form as-stack" method="post" action="/submit"
      aria-label="Contact form"
      novalidate>
  <!-- Form fields -->
  <!-- novalidate because we'll handle validation ourselves -->
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
**Purpose**: Form field wrapper (label + input + help text)

```html
<div class="field" role="group">
  <label class="label" for="email">Email <span aria-label="required">*</span></label>
  <input class="input" id="email" type="email" 
         required aria-required="true"
         aria-describedby="email-help email-error">
  <small class="helper" id="email-help">We'll never share your email</small>
  <small class="error" id="email-error" role="alert" hidden>Please enter a valid email</small>
</div>
```

## Feedback Components

*How to talk to users without annoying them*

### alert
**Purpose**: Important messages (that actually get noticed)

```html
<!-- Basic alert -->
<aside class="alert" role="alert" aria-live="polite">
  <strong>Note:</strong> Alert message that doesn't shout
</aside>
```

**Variants** (using data attributes):
```html
<!-- Success (the good news) -->
<aside class="alert" role="status" data-variant="success" aria-live="polite">
  <strong>Success!</strong> Your changes have been saved.
</aside>

<aside class="alert" role="alert" data-variant="warning">
  Warning message
</aside>

<!-- Error (the bad news, delivered gently) -->
<aside class="alert" role="alert" data-variant="error" aria-live="assertive">
  <strong>Error:</strong> Something went wrong. Please try again.
</aside>

<!-- Dismissible (for non-critical messages) -->
<aside class="alert with-dismiss" role="alert" aria-live="polite">
  <p>This website uses cookies. Deal with it.</p>
  <button class="button" aria-label="Dismiss cookie notice" 
          onclick="this.parentElement.remove()">
    <span aria-hidden="true">×</span>
  </button>
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
**Purpose**: Status indicators or counts (the little attention grabbers)

```html
<!-- Count badge (inbox zero is a myth) -->
<span class="badge" aria-label="42 unread messages">42</span>

<!-- Status badges (traffic lights for your UI) -->
<span class="badge" data-variant="success" role="status">Active</span>
<span class="badge" data-variant="warning" role="status">Pending</span>
<span class="badge" data-variant="error" role="status">Offline</span>

<!-- In context -->
<button class="button">
  Messages <span class="badge" aria-label="3 new">3</span>
</button>
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
**Purpose**: Progress indication (showing users there's hope)

```html
<!-- Determinate (when you know how long) -->
<label for="upload">Upload progress:</label>
<progress class="progress" id="upload" value="75" max="100" aria-label="75% complete">
  75%
</progress>

<!-- Indeterminate (when you're guessing) -->
<progress class="progress" aria-label="Loading, please wait">
  Loading...
</progress>
```

## Media Components

*Pictures, videos, and sounds (oh my!)*

### image
**Purpose**: Responsive images (that don't break layouts)

```html
<!-- Basic image (always use alt text!) -->
<img class="image" 
     src="photo.jpg" 
     alt="Descriptive text for screen readers"
     loading="lazy"
     decoding="async">
```

**Custom Properties**:
- `--width`: Width constraint
- `--height`: Height constraint  
- `--fit`: Object fit (cover, contain, etc.)
- `--radius`: Corner radius (for that Instagram look)
- `--aspect-ratio`: Aspect ratio (16/9, 4/3, 1/1)

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

*Words, words, words*

### heading
**Purpose**: Section headings (hierarchy matters)

```html
<!-- Semantic heading levels (please use them in order) -->
<h1 class="heading">Main Heading</h1>
<h2 class="heading">Sub Heading</h2>
<h3 class="heading">Sub-sub Heading</h3>
<!-- Don't skip levels! h1 → h3 makes screen readers sad -->
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
**Purpose**: Code snippets (monospace goodness)

```html
<!-- Inline code -->
<p>Use <code class="code">const</code> instead of <code class="code">var</code>.</p>

<!-- Code blocks (with syntax highlighting classes if needed) -->
<pre class="code" data-language="javascript">
<code>function example() {
  return true; // No more var!
}</code>
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

*When you need to show data, not just pretty pictures*

### table
**Purpose**: Tabular data (yes, tables are still okay for data!)

```html
<table class="table" role="table">
  <caption class="sr-only">Product pricing table</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Value</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Item 1</td>
      <td>£10</td>
      <td><button class="button">Buy</button></td>
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

*The magic that makes everything line up*

### as-stack
**Purpose**: Vertical spacing (the end of margin-bottom hell)

```html
<div class="as-stack" style="--stack-gap: var(--space-1-0);">
  <h2>Heading</h2>
  <p>Paragraph with automatic spacing</p>
  <button class="button">No margin needed!</button>
</div>
```

**Custom Properties**:
- `--gap`: Gap between items

### as-cluster
**Purpose**: Horizontal grouping with wrap (inline friends that stick together)

```html
<nav class="as-cluster" data-entries="3" aria-label="Actions">
  <button class="button">Save</button>
  <button class="button">Cancel</button>
  <button class="button">Delete</button>
</nav>
```

**Custom Properties**:
- `--gap`: Gap between items
- `--align`: Alignment

### as-grid
**Purpose**: Two-dimensional grid (CSS Grid made simple)

```html
<!-- Auto-responsive grid (it just works) -->
<div class="as-grid" data-entries="3">
  <article class="card">Card 1</article>
  <article class="card">Card 2</article>
  <article class="card">Card 3</article>
</div>
```

**Custom Properties**:
- `--grid-columns`: Number of columns or `auto-fit`
- `--grid-gap`: Gap between cells
- `--grid-min`: Minimum cell width (for auto-fit)

**The "Aha!"**: No more `col-xs-12 col-sm-6 col-md-4 col-lg-3`. Just `as-grid` and it figures it out.

### as-center
**Purpose**: Perfect centering (the holy grail, achieved)

```html
<!-- Finally, centering that just works -->
<div class="as-center" style="--center-height: 100vh;">
  <div class="card">
    <h2 class="heading">Perfectly Centered</h2>
    <p class="text">Horizontally AND vertically!</p>
  </div>
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
**Purpose**: Width constraint and centering (your content's best friend)

```html
<main class="as-container" role="main">
  <!-- Content is centered with nice padding -->
  <!-- Max-width prevents those super-wide paragraphs -->
  <h1>Your content lives here</h1>
</main>
```

**Custom Properties**:
- `--max-width`: Maximum width
- `--padding`: Horizontal padding

## Property Modifiers

*The cherries on top*

### with-shadow
**Purpose**: Add elevation shadow (instant depth)

```html
<article class="card with-shadow" role="article">
  <!-- Looks like it's floating (but it's not) -->
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
**Purpose**: Interactive states (hover, focus, and friends)

```html
<button class="button with-interaction">
  <!-- Hover me! Focus me! I respond! -->
  Interactive button
</button>

<article class="card with-interaction" tabindex="0" role="button">
  <!-- Entire card is interactive -->
  Click anywhere
</article>
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

*For those "what was that class again?" moments*

| Need to... | Use this... |
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

*Let data attributes handle your component states*

Use `data-state` for component states:
- `data-state="loading"` - Currently loading
- `data-state="error"` - Error state
- `data-state="success"` - Success state  
- `data-state="disabled"` - Disabled state

```html
<!-- Component states in action -->
<button class="button" data-state="loading" aria-busy="true">
  <span class="spinner"></span> Saving...
</button>

<form class="form" data-state="error">
  <!-- Form has errors -->
</form>
```

## Variant Management

*Context-aware styling without class explosions*

Use `data-variant` for contextual styling:
- `data-variant="admin"` - Admin interface
- `data-variant="premium"` - Premium features
- `data-variant="checkout"` - Checkout flow
- `data-variant="authenticated"` - Logged-in users

```html
<!-- Apply variant to container, children inherit -->
<main data-variant="admin">
  <nav class="navigation"><!-- Gets admin styling --></nav>
  <section class="card"><!-- Also gets admin styling --></section>
</main>
```

## Enterprise Web Components

**Available in Tier 3** - Web Components that generate CRISP HTML:

**The "Aha!"**: These aren't replacements for HTML. They're generators that create perfect CRISP markup. Think of them as very smart snippets.

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

*Progressive enhancement, not replacement*

Web Components are **generators only** - they:
- Accept typed attributes (TypeScript powered)
- Handle business logic (the complex stuff)
- Generate 100% pure CRISP HTML (view source and see)
- Save typing, not philosophy (semantic HTML forever)

The output is always standard CRISP components that work in all tiers!

```javascript
// What the Web Component does:
customElements.define('crisp-search-box', class extends HTMLElement {
  connectedCallback() {
    // Generates the exact CRISP HTML you'd write by hand
    this.innerHTML = `
      <search class="search as-stack" role="search">
        <form class="form as-cluster">
          <input class="input" type="search" 
                 placeholder="${this.getAttribute('placeholder')}">
          <button class="button with-interaction">Search</button>
        </form>
        <div class="results" aria-live="polite"></div>
      </search>
    `;
  }
});
```

**Mind = Blown**: View source still shows semantic HTML. SEO still works. CSS still applies. It's just HTML with helpers.

→ Continue to [Chapter 16: CRISP Cheatsheet](./C16-cheatsheet.md)