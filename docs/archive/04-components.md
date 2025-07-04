# Components

## Component Structure

CRISP components follow a consistent pattern using semantic class prefixes:

```html
<element class="[component] [as-layout] [with-property]"
  role="[semantic-role]"
  aria-label="[accessible-name]"
  style="--custom-property: value;">
```

## Basic Components

### Button

The button component is the foundation of interactive elements:

```html
<!-- Basic button -->
<button class="button" role="button">
  Click me
</button>

<!-- Button with interaction effects -->
<button class="button with-interaction" role="button">
  Hover me
</button>

<!-- Customised button -->
<button class="button with-interaction with-shadow" 
  role="button"
  style="--button-bg: var(--colour-primary-50); --button-size: 1.125rem;">
  Primary Action
</button>
```

CSS:
```css
.button {
  /* Structure */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  
  /* Customisable properties */
  padding: var(--button-padding, var(--space-0-5) var(--space-1-0));
  background: var(--button-bg, var(--colour-neutral-90));
  color: var(--button-colour, currentColor);
  font-size: var(--button-size, 1rem);
  font-weight: var(--button-weight, 500);
  border-radius: var(--button-radius, var(--radius-sm));
  min-height: var(--button-height, 2.5rem);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Card

Cards are versatile content containers:

```html
<!-- Basic card -->
<article class="card" role="article">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</article>

<!-- Card with layout and properties -->
<article class="card as-stack with-shadow with-padding" 
  role="article"
  aria-label="Product card">
  <img src="product.jpg" alt="Product image">
  <h3>Product Name</h3>
  <p>Product description...</p>
  <button class="button with-interaction">
    Add to Cart
  </button>
</article>

<!-- Customised card -->
<article class="card as-stack with-border" 
  style="--card-padding: var(--space-2-0); --card-bg: var(--colour-primary-90);">
  <h3>Featured Content</h3>
  <p>This card has custom spacing and background.</p>
</article>
```

CSS:
```css
.card {
  /* Structure */
  display: block;
  overflow: hidden;
  
  /* Customisable properties */
  background: var(--card-bg, white);
  border-radius: var(--card-radius, var(--radius-md));
  padding: var(--card-padding, 0);
}

.with-padding {
  --card-padding: var(--space-1-5);
}

.with-border {
  border: var(--border-width, 1px) solid var(--border-colour, var(--colour-neutral-90));
}
```

### Navigation

Semantic navigation patterns:

```html
<!-- Primary navigation -->
<nav class="nav as-cluster" 
  role="navigation"
  aria-label="Primary navigation">
  <a href="/" aria-current="page">Home</a>
  <a href="/about">About</a>
  <a href="/services">Services</a>
  <a href="/contact">Contact</a>
</nav>

<!-- Mobile navigation with toggle -->
<nav class="nav as-stack with-collapsible" 
  role="navigation"
  aria-label="Mobile navigation"
  data-fn="mobile-menu">
  <button class="button with-interaction" 
    role="button"
    aria-expanded="false"
    aria-controls="nav-links">
    Menu
  </button>
  <div class="nav-links as-stack" id="nav-links" hidden>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/services">Services</a>
    <a href="/contact">Contact</a>
  </div>
</nav>
```

### Form Elements

Accessible form patterns:

```html
<!-- Form field -->
<div class="field as-stack" role="group">
  <label for="email">Email Address</label>
  <input class="input with-border" 
    type="email" 
    id="email"
    role="textbox"
    aria-required="true"
    aria-describedby="email-error">
  <span class="error" id="email-error" role="alert" hidden>
    Please enter a valid email address
  </span>
</div>

<!-- Complete form -->
<form class="form as-stack with-border with-padding"
  role="form"
  aria-label="Contact form">
  
  <fieldset class="fieldset as-stack">
    <legend>Personal Information</legend>
    
    <div class="field as-stack">
      <label for="name">Full Name</label>
      <input class="input with-border" 
        type="text" 
        id="name"
        required>
    </div>
    
    <div class="field as-stack">
      <label for="email">Email</label>
      <input class="input with-border" 
        type="email" 
        id="email"
        required>
    </div>
  </fieldset>
  
  <div class="field as-stack">
    <label for="message">Message</label>
    <textarea class="textarea with-border" 
      id="message" 
      rows="5"
      required></textarea>
  </div>
  
  <button class="button with-interaction with-shadow" 
    type="submit"
    role="button">
    Send Message
  </button>
</form>
```

## Layout Components

### Stack Layout

Vertical rhythm with consistent spacing:

```html
<!-- Basic stack -->
<section class="as-stack">
  <h2>Section Title</h2>
  <p>First paragraph with automatic spacing.</p>
  <p>Second paragraph maintains rhythm.</p>
</section>

<!-- Custom gap -->
<article class="card as-stack" style="--stack-gap: var(--space-2-0);">
  <h3>Larger Gaps</h3>
  <p>This stack has more breathing room.</p>
  <button class="button">Action</button>
</article>
```

### Grid Layout

Responsive grid patterns:

```html
<!-- Auto-fit grid -->
<div class="as-grid">
  <article class="card with-padding">Card 1</article>
  <article class="card with-padding">Card 2</article>
  <article class="card with-padding">Card 3</article>
</div>

<!-- Custom columns -->
<div class="as-grid" style="--grid-columns: 3; --grid-gap: var(--space-2-0);">
  <article class="card">Fixed 3 columns</article>
  <article class="card">With larger gap</article>
  <article class="card">Responsive below 768px</article>
</div>
```

### Cluster Layout

Flexible horizontal grouping:

```html
<!-- Tag list -->
<div class="tags as-cluster">
  <span class="tag with-border">JavaScript</span>
  <span class="tag with-border">CSS</span>
  <span class="tag with-border">HTML</span>
  <span class="tag with-border">CRISP</span>
</div>

<!-- Button group -->
<div class="button-group as-cluster" style="--cluster-gap: var(--space-0-5);">
  <button class="button with-border">Save</button>
  <button class="button with-border">Cancel</button>
  <button class="button with-border">Delete</button>
</div>
```

## Property Classes

### Shadow System

GPU-accelerated shadow implementation:

```html
<!-- Basic shadow -->
<article class="card with-shadow">
  Shadow card
</article>

<!-- Custom shadow -->
<article class="card with-shadow" 
  style="--shadow-colour: var(--colour-primary-50); 
         --shadow-opacity: 0.2;
         --shadow-blur: 16px;">
  Coloured shadow
</article>
```

CSS:
```css
.with-shadow {
  position: relative;
  transform: translateZ(0); /* GPU acceleration */
}

.with-shadow::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--shadow-colour, var(--colour-neutral-20));
  opacity: var(--shadow-opacity, 0.15);
  filter: blur(var(--shadow-blur, 8px));
  transform: translateY(var(--shadow-y, 4px)) scale(var(--shadow-scale, 1));
  z-index: -1;
  border-radius: inherit;
}
```

### Interactive States

Feedback for user interactions:

```html
<!-- Hover effects -->
<button class="button with-interaction">
  Hover for feedback
</button>

<!-- Click animation -->
<article class="card with-interaction with-shadow"
  role="button"
  tabindex="0">
  Clickable card
</article>
```

CSS:
```css
.with-interaction {
  cursor: pointer;
  transition: transform var(--transition-fast);
  will-change: transform;
}

.with-interaction:hover {
  transform: translateY(-2px);
}

.with-interaction:active {
  transform: translateY(0);
}
```

## Complex Components

### Modal Dialog

Accessible modal pattern:

```html
<dialog class="modal as-stack with-padding with-shadow"
  role="dialog"
  aria-labelledby="modal-title"
  aria-modal="true">
  
  <header class="modal-header as-cluster">
    <h2 id="modal-title">Confirm Action</h2>
    <button class="button" 
      aria-label="Close dialog"
      data-fn="close-modal">
      ×
    </button>
  </header>
  
  <div class="modal-content as-stack">
    <p>Are you sure you want to proceed?</p>
  </div>
  
  <footer class="modal-footer as-cluster" style="--cluster-justify: flex-end;">
    <button class="button with-border" data-fn="cancel">
      Cancel
    </button>
    <button class="button with-interaction" data-fn="confirm">
      Confirm
    </button>
  </footer>
</dialog>
```

### Tabs

Accessible tab interface:

```html
<div class="tabs" role="tablist">
  <div class="tab-list as-cluster with-border">
    <button class="tab-button" 
      role="tab"
      aria-selected="true"
      aria-controls="panel-1"
      id="tab-1">
      Tab 1
    </button>
    <button class="tab-button" 
      role="tab"
      aria-selected="false"
      aria-controls="panel-2"
      id="tab-2">
      Tab 2
    </button>
  </div>
  
  <div class="tab-panel as-stack with-padding"
    role="tabpanel"
    id="panel-1"
    aria-labelledby="tab-1">
    <h3>Panel 1 Content</h3>
    <p>Content for the first tab.</p>
  </div>
  
  <div class="tab-panel as-stack with-padding"
    role="tabpanel"
    id="panel-2"
    aria-labelledby="tab-2"
    hidden>
    <h3>Panel 2 Content</h3>
    <p>Content for the second tab.</p>
  </div>
</div>
```

## Responsive Patterns

Using container queries for component-level responsiveness:

```css
/* Component container queries */
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card.as-stack {
    --stack-gap: var(--space-2-0);
  }
  
  .card .button {
    --button-size: 1.125rem;
  }
}

/* Layout responsiveness */
@media (max-width: 768px) {
  .as-grid {
    --grid-columns: 1;
  }
  
  .as-cluster {
    --cluster-gap: var(--space-0-5);
  }
}
```

## Next Steps

Learn how to implement CRISP in your projects with the [Implementation Guide](./05-implementation.md).