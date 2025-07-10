# Chapter 8: Garden for All - Accessibility First

*Or: How CRISP makes WCAG 2.2 AA compliance the default, not an afterthought*

## The Accessibility Crisis

Most frameworks treat accessibility like a garnish - something you sprinkle on top if there's time. The result?

```html
<!-- The "accessible" modern web -->
<div class="btn" onclick="doThing()">
  <span class="icon">✓</span>
</div>

<!-- Missing: Everything that matters -->
<!-- - No keyboard access
     - No screen reader info
     - No focus states
     - No ARIA
     - Not even a real button -->
```

CRISP flips this. Accessibility isn't added. It's built in.

## WCAG 2.2 AA: The Default

Every CRISP blueprint meets WCAG 2.2 AA out of the box:

### Semantic HTML = 80% There

```html
<!-- CRISP way -->
<button class="button" type="button">
  Click me
</button>

<!-- What you get for free:
     - Keyboard accessible (Tab, Enter, Space)
     - Screen reader announces "button"
     - Focus states included
     - Proper click handling
     - No ARIA needed (it's a button!) -->
```

### Required ARIA Patterns

Where semantic HTML isn't enough, CRISP requires proper ARIA:

```html
<!-- Navigation requires label -->
<nav class="navigation" aria-label="Main navigation">
  <!-- Not just "navigation", but "Main navigation" -->
</nav>

<!-- Current page indication -->
<nav class="navigation" aria-label="Breadcrumb">
  <a class="link" href="/">Home</a>
  <span aria-hidden="true">/</span>
  <a class="link" href="/products">Products</a>
  <span aria-hidden="true">/</span>
  <span aria-current="page">Widgets</span>
</nav>

<!-- Tab interfaces -->
<div class="tabs" role="tablist" aria-label="Account settings">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Profile
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">
    Security
  </button>
</div>
```

**The "Aha!"**: ARIA describes what something IS, not how it looks.

## Focus Management

CRISP handles focus states intelligently:

```css
/* Visible focus for keyboard users */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* No focus ring for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* Skip links for keyboard navigation */
.skip-link {
  position: absolute;
  left: -9999px;
  
  &:focus {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
}
```

## Color Contrast

OKLCH makes contrast calculation predictable:

```css
/* Text on backgrounds - always WCAG AA */
.text {
  @property --color {
    syntax: "<color>";
    inherits: false;
    initial-value: var(--color-text);
  }
  
  color: var(--color);
}

/* Automatic contrast adjustment */
[data-theme="dark"] {
  --color-text: oklch(90% 0 0);      /* Light text */
  --color-bg: oklch(10% 0 0);        /* Dark background */
  /* Contrast ratio: 13.1:1 ✓ */
}

/* Error states with sufficient contrast */
.input:invalid {
  --border-color: var(--color-error); /* oklch(55% 0.22 25) */
  /* Against white: 4.6:1 ✓ */
}
```

## Form Accessibility

Every form element properly labeled:

```html
<!-- Label association -->
<div class="field">
  <label class="label" for="email">
    Email address
    <span class="required" aria-label="required">*</span>
  </label>
  <input class="input" 
         type="email" 
         id="email" 
         name="email"
         aria-describedby="email-error email-help"
         aria-invalid="false"
         required>
  <small class="helper" id="email-help">
    We'll never share your email
  </small>
  <span class="error" id="email-error" role="alert">
    Please enter a valid email address
  </span>
</div>

<!-- Grouped inputs -->
<fieldset class="fieldset" data-key="shipping-address">
  <legend class="legend">Shipping address</legend>
  <!-- Related inputs grouped -->
</fieldset>

<!-- Required field indication -->
<p class="form-required-notice">
  <span aria-hidden="true">*</span> indicates required field
</p>
```

## Keyboard Navigation

Everything keyboard accessible:

```html
<!-- Modal with focus trap -->
<dialog class="dialog" aria-labelledby="dialog-title" data-key="confirm-dialog">
  <h2 class="heading" id="dialog-title">Confirm action</h2>
  <form method="dialog">
    <!-- Focus trapped inside dialog -->
    <!-- Escape key closes -->
    <!-- Tab cycles through interactive elements -->
  </form>
</dialog>

<!-- Dropdown menu -->
<div class="dropdown" role="navigation" data-key="options-dropdown">
  <button class="button" 
          aria-expanded="false"
          aria-controls="dropdown-menu">
    Options
  </button>
  <ul class="menu" id="dropdown-menu" role="menu">
    <li role="none">
      <a class="link" href="#" role="menuitem">Edit</a>
    </li>
    <li role="none">
      <a class="link" href="#" role="menuitem">Delete</a>
    </li>
  </ul>
</div>
```

### Keyboard Shortcuts Built In

- `Tab` - Navigate forward
- `Shift + Tab` - Navigate backward
- `Enter/Space` - Activate buttons
- `Arrow keys` - Navigate within blueprints
- `Escape` - Close modals/dropdowns
- `Home/End` - Jump to first/last

## Screen Reader Optimization

### Proper Heading Structure

```html
<main>
  <h1 class="heading">Page title (only one!)</h1>
  
  <section aria-labelledby="section-1">
    <h2 class="heading" id="section-1">Section heading</h2>
    
    <h3 class="heading">Subsection</h3>
    <!-- Never skip levels! -->
  </section>
</main>
```

### Live Regions for Dynamic Content

```html
<!-- Status messages -->
<div class="status" role="status" aria-live="polite">
  <p class="text">Form saved successfully</p>
</div>

<!-- Urgent alerts -->
<div class="alert" role="alert" aria-live="assertive">
  <p class="text">Error: Connection lost</p>
</div>

<!-- Loading states -->
<div class="loading" aria-busy="true" aria-live="polite">
  <span class="spinner" aria-hidden="true"></span>
  <span class="sr-only">Loading results...</span>
</div>
```

### Data Tables

```html
<table class="table" role="table" data-key="users-table">
  <caption class="caption">
    User accounts
    <small class="helper">Sorted by registration date</small>
  </caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jane Smith</td>
      <td>jane@example.com</td>
      <td>Admin</td>
      <td>
        <button class="button" aria-label="Edit Jane Smith">
          Edit
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

## Motion and Animation

Respecting user preferences:

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Smooth scrolling with preference check */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

## Testing Your Accessibility

### Quick Checks

1. **Tab through everything** - Can you reach all interactive elements?
2. **Use without mouse** - Can you complete all tasks?
3. **Screen reader test** - Does VoiceOver/NVDA announce properly?
4. **Zoom to 200%** - Does layout remain usable?
5. **Check contrast** - Use browser DevTools

### Automated Testing

```bash
# axe DevTools
# WAVE browser extension
# Lighthouse audits
# pa11y command line
```

### Manual Testing Checklist

- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] All buttons have accessible names
- [ ] Color isn't the only indicator
- [ ] Focus order makes sense
- [ ] Error messages are announced
- [ ] Page has proper landmarks
- [ ] Headings follow hierarchy

## Common Patterns

### Accessible Navigation

```html
<!-- Server renders this - knows /products is current page -->
<nav class="navigation" aria-label="Main" data-entries="4" data-key="main-nav">
  <a class="link" href="/">Home</a>
  <a class="link" href="/about">About</a>
  <a class="link" href="/products" aria-current="page">Products</a>
  <a class="link" href="/contact">Contact</a>
</nav>
```

**Important**: Your server sets `aria-current="page"`. Not JavaScript. The server knows which page it's serving!

### Accessible Cards

```html
<article class="card" role="article" aria-labelledby="card-title-1" data-key="product-card">
  <h3 class="heading" id="card-title-1">
    <a class="link" href="/details">Product Name</a>
  </h3>
  <p class="text">Description text</p>
  <p class="meta">
    <span class="price">£99.99</span>
    <span class="sr-only">Price</span>
  </p>
</article>
```

### Accessible Forms

```html
<form class="form" aria-label="Contact form" data-key="contact-form">
  <div class="field">
    <label class="label" for="name">
      Your name
      <span class="required" aria-label="required">*</span>
    </label>
    <input class="input" 
           type="text" 
           id="name" 
           name="name"
           autocomplete="name"
           required>
  </div>
  
  <button class="button with-interaction" type="submit">
    Send message
  </button>
</form>
```

## The CRISP Promise

- **Semantic HTML first** - Right element for the job
- **ARIA where needed** - Enhance, don't replace
- **Keyboard navigable** - Everything reachable
- **Screen reader friendly** - Proper announcements
- **WCAG 2.2 AA compliant** - By default
- **No retrofitting** - Accessible from the start

## Your Accessibility Checklist

Before shipping any blueprint:

1. ✓ Can I use it with keyboard only?
2. ✓ Does screen reader announce it properly?
3. ✓ Are all interactive elements labeled?
4. ✓ Do colors meet contrast requirements?
5. ✓ Does it work at 200% zoom?
6. ✓ Are errors clearly communicated?
7. ✓ Is focus visible and logical?

**The Bottom Line**: In CRISP, if it's not accessible, it's not done.

Ready to dive deeper into the technical foundations?

→ Continue to [Chapter 9: The Root System - Design Tokens & Color Magic](./CH09-tokens.md)