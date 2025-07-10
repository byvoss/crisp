# Chapter 5: Planting Patterns - Blueprint Classes

*Or: Everything you need, nothing you don't*

## The Secret Fourth Layer

Remember in Chapter 4 when we mentioned a secret? Here it is:

```css
/* The complete layer architecture */
@layer kernel, crisp, bridge, overrides;
```

**The "Aha!"**: There's a `kernel` layer that contains all the @property definitions. It's like the engine room of a ship - you never go there, but it powers everything:

```css
/* In kernel layer (you never edit this) */
@layer kernel {
  * {
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: transparent;
    }
    
    @property --size {
      syntax: "<length>";
      inherits: false;
      initial-value: 1rem;
    }
    
    /* ... all standard properties defined once ... */
  }
}

/* In your blueprints (what you write) */
@layer crisp {
  .button {
    --bg: var(--color-neutral);    /* Just set values */
    --size: 1rem;                  /* Kernel handles the rest */
    
    background: var(--bg);         /* Already type-safe! */
    font-size: var(--size);        /* No @property needed */
  }
}
```

**Important**: Never modify the kernel layer. It's infrastructure. If you break the kernel, everything breaks. Now let's use what it provides...

## The Blueprint Philosophy

Remember building components with 47 modifier classes? CRISP has a different idea:

**One blueprint class. Infinite variations. Zero complexity.**

Let's explore the essential blueprints that power 90% of the web.

## Interactive Elements

### The Button

The workhorse of the web:

```html
<!-- Just a button -->
<button class="button" type="button">Click me</button>

<!-- With interaction feedback -->
<button class="button with-interaction" type="button" data-key="cta-hover">Hover me</button>

<!-- Customised -->
<button class="button" type="button" 
        style="--bg: var(--color-primary); --size: 1.25rem;"
        data-key="primary-action">
  Primary Action
</button>
```

**The Magic**: Every button has hover states, active states, and focus styles built in. No extra classes needed.

```css
/* Inside CRISP (kernel already defined these properties with defaults) */
.button {
  /* Override kernel defaults for button-specific values */
  --bg: var(--color-neutral);
  --color: white;
  
  /* Use the properties (kernel or overridden values) */
  background: var(--bg);
  color: var(--color);
  font-size: var(--size);      /* Uses kernel default */
  font-weight: var(--weight);  /* Uses kernel default */
  padding: var(--padding);     /* Uses kernel default */
  border-radius: var(--radius);/* Uses kernel default */
  
  /* Behaviour */
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-0-5);
  
  /* States included */
  &:hover {
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translateY(1px);
  }
}
```

### The Link

Semantic, accessible, styled:

```html
<!-- Basic link -->
<a class="link" href="/about">About us</a>

<!-- Current page (set by your server!) -->
<a class="link" href="/" aria-current="page">Home</a>

<!-- External link -->
<a class="link" href="https://example.com" rel="external">
  Visit site
</a>
```

**The "Aha!"**: `aria-current="page"` comes from YOUR SERVER. Not JavaScript. The days of "let the client pay for it" are over. Your server knows which page is current - so it should say so in the HTML.

### Form Inputs

Every input type, properly styled:

```html
<!-- Text input -->
<div class="field">
  <label class="label" for="name">Name</label>
  <input class="input" type="text" id="name" name="name" required>
</div>

<!-- Email with description -->
<div class="field">
  <label class="label" for="email">Email</label>
  <input class="input" type="email" id="email" name="email" 
         aria-describedby="email-help" required>
  <small class="helper" id="email-help">We'll never share your email</small>
</div>

<!-- Select dropdown -->
<div class="field">
  <label class="label" for="country">Country</label>
  <select class="select" id="country" name="country">
    <option value="">Choose...</option>
    <option value="uk">United Kingdom</option>
    <option value="us">United States</option>
  </select>
</div>

<!-- Textarea -->
<div class="field">
  <label class="label" for="message">Message</label>
  <textarea class="textarea" id="message" name="message" rows="4"></textarea>
</div>
```

**The "Aha!"**: Every field includes:
- Consistent spacing
- Focus states
- Error states (automatic with `:invalid`)
- Helper text support
- Full accessibility

### Checkboxes & Radios

Properly styled, properly semantic:

```html
<!-- Checkbox -->
<label class="checkbox">
  <input type="checkbox" name="terms" required>
  <span>I agree to the terms</span>
</label>

<!-- Radio group -->
<fieldset class="fieldset">
  <legend class="legend">Preferred contact</legend>
  
  <label class="radio">
    <input type="radio" name="contact" value="email" checked>
    <span>Email</span>
  </label>
  
  <label class="radio">
    <input type="radio" name="contact" value="phone">
    <span>Phone</span>
  </label>
</fieldset>
```

### The Switch

A modern toggle:

```html
<!-- Basic switch -->
<label class="switch" data-key="notifications-toggle">
  <input type="checkbox" role="switch" aria-checked="false">
  <span>Enable notifications</span>
</label>

<!-- Checked state -->
<label class="switch" data-key="theme-toggle">
  <input type="checkbox" role="switch" aria-checked="true" checked>
  <span>Dark mode</span>
</label>
```

## Container Blueprints

### The Card

Your content container:

```html
<!-- Basic card -->
<article class="card" data-key="simple-card">
  <h3 class="heading">Simple Card</h3>
  <p class="text">Just content in a box.</p>
</article>

<!-- Card with image -->
<article class="card" data-key="media-card">
  <img class="media" src="..." alt="..." loading="lazy">
  <div class="content">
    <h3 class="heading">Media Card</h3>
    <p class="text">Image + content, no extra markup.</p>
  </div>
</article>

<!-- Linked card -->
<article class="card" data-key="clickable-card">
  <h3 class="heading">
    <a class="link" href="/details">Clickable Card</a>
  </h3>
  <p class="text">The heading link extends to the whole card.</p>
</article>
```

### The Article

Semantic content container:

```html
<article class="article" role="article" data-key="blog-article">
  <header>
    <h1 class="heading">Article Title</h1>
    <p class="meta">Published <time datetime="2025-01-15">15 January 2025</time></p>
  </header>
  
  <p class="text">Article content goes here...</p>
  
  <footer>
    <p class="meta">Tagged: <a class="link" href="/tags/css">CSS</a></p>
  </footer>
</article>
```

### The Section

Page sections made simple:

```html
<section class="section" aria-labelledby="features-title" data-key="features-section">
  <h2 class="heading" id="features-title">Features</h2>
  <p class="text">What makes us different.</p>
  <!-- Section content -->
</section>
```

### The Dialog

Native, accessible modals:

```html
<dialog class="dialog" id="confirm-dialog" data-key="confirm-modal">
  <form method="dialog" class="as-stack">
    <h2 class="heading">Confirm Action</h2>
    <p class="text">Are you sure you want to continue?</p>
    <div class="as-cluster">
      <button class="button" type="submit" value="cancel" data-key="confirm-cancel">Cancel</button>
      <button class="button with-interaction" type="submit" value="confirm"
              style="--bg: var(--color-primary);" data-key="confirm-submit">
        Confirm
      </button>
    </div>
  </form>
</dialog>

<!-- Open with JavaScript -->
<script>
  document.getElementById('confirm-dialog').showModal();
</script>
```

**The "Aha!"**: Native `<dialog>` means:
- Built-in focus trap
- Escape key handling
- Backdrop included
- Form integration
- Zero libraries needed

### The Figure

Semantic media container:

```html
<figure class="figure" data-key="sales-chart">
  <img class="media" src="chart.png" alt="Sales data for 2024">
  <figcaption class="caption">
    Sales increased by 23% year-over-year
  </figcaption>
</figure>
```

### The Blockquote

Quotes done right:

```html
<blockquote class="blockquote" cite="https://example.com/article" data-key="alan-kay-quote">
  <p class="text">
    "The best way to predict the future is to invent it."
  </p>
  <footer>
    <cite class="cite">Alan Kay</cite>
  </footer>
</blockquote>
```

## Composition Patterns

The power comes from combining:

```html
<!-- Card grid -->
<div class="as-grid" data-entries="3" data-key="card-grid">
  <article class="card as-stack" data-key="card-1">
    <h3 class="heading">Card 1</h3>
    <p class="text">Content</p>
    <button class="button" data-key="card-1-action">Action</button>
  </article>
  
  <article class="card as-stack" data-key="card-2">
    <h3 class="heading">Card 2</h3>
    <p class="text">Content</p>
    <button class="button" data-key="card-2-action">Action</button>
  </article>
  
  <article class="card as-stack" data-key="card-3">
    <h3 class="heading">Card 3</h3>
    <p class="text">Content</p>
    <button class="button" data-key="card-3-action">Action</button>
  </article>
</div>
```

## State Management

Use data attributes and ARIA, not classes:

```html
<!-- Visual variants -->
<button class="button" data-variant="danger" data-key="delete-button">Delete</button>
<div class="alert" data-variant="success" data-key="success-alert">Saved!</div>

<!-- Actual states -->
<button class="button" aria-pressed="true" data-key="toggle-button">Active</button>
<details class="disclosure" open data-key="expandable-details">
  <summary>Expanded content</summary>
  <p>Details here</p>
</details>
```

## The Blueprint Promise

Every CRISP blueprint:
- Works without JavaScript
- Responds without media queries
- Themes without modifications
- Validates without libraries
- Animates without frameworks

## Your Toolkit

You now have:
- **Buttons & Links**: For actions and navigation
- **Form Controls**: For user input
- **Cards & Articles**: For content
- **Dialogs & Figures**: For special content
- **State patterns**: For dynamic UI

With these ~15 blueprints, you can build almost anything.

**The "Aha!"**: You don't need 200 blueprints. You need 15 good ones that compose well.

Ready to arrange them beautifully?

→ Continue to [Chapter 6: Garden Layouts - Arrangement Without Tears](./CH06-layouts.md)