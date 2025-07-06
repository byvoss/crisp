# Chapter 7: Elements - The Building Blocks

*Or: How to build a UI without building a migraine*

## The Element Evolution

Remember this mess?

```css
/* Monday: Bootstrap approach */
.btn { }
.btn-primary { }
.btn-lg { }
.btn-primary-lg { }
.btn-primary-lg-block { }
.btn-primary-lg-block-disabled { }
/* 47 more variations... */

/* Tuesday: BEM to the rescue! */
.button { }
.button--primary { }
.button--large { }
.button__icon { }
.button__icon--left { }
/* Still 47 variations, but with more hyphens */

/* Wednesday: Tailwind arrives */
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  <!-- My HTML is now unreadable -->
</button>

/* Thursday: Back to inline styles? */
<button style="background: blue; padding: 10px;">
  <!-- Have we learned nothing? -->
</button>

/* Friday: *Googles "career change to farming"* */
```

**The "Aha!"**: What if elements just... worked? Out of the box? With sensible defaults?

## The CRISP Way: Elements That Think

*One class. Infinite customisation. Zero variants.*

```html
<!-- It just works -->
<button class="button">Click me</button>

<!-- Need it different? Use custom properties -->
<button class="button" style="--bg: var(--color-primary);">Primary</button>
<button class="button" style="--size: 0.875rem;">Small</button>
<button class="button" style="--radius: 9999px;">Pill shaped</button>
```

**Mind = Blown**: No modifier classes. No utility soup. Just properties.

## The Element Rules

### Rule 1: One Class, One Purpose

```css
/* ❌ The old way: Class proliferation */
.button { }
.button-primary { }
.button-secondary { }
.button-large { }
.button-small { }
.button-disabled { }
.button-loading { }
/* Death by a thousand classes */

/* ✅ The CRISP way: One class, properties handle the rest */
@layer crisp {
  .button {
    /* Type-safe properties with @property */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-neutral);
    }
    
    @property --size {
      syntax: "<length>";
      inherits: false;
      initial-value: 1rem;
    }
    
    /* Define ALL defaults */
    --color: var(--color-on-neutral);
    --padding: var(--space-0-75) var(--space-1-5);
    --radius: var(--radius-md);
    --border: none;
    
    /* Use them */
    background: var(--bg);
    color: var(--color);
    font-size: var(--size);
    padding: var(--padding);
    border-radius: var(--radius);
    border: var(--border);
    
    /* Always have type="button" */
    cursor: pointer;
    transition: all var(--transition-fast);
  }
}
```

**The "Aha!"**: Every property can be customised. No new classes needed. Ever.

### Rule 2: ARIA First, Not Last

*Because accessibility isn't a "nice to have" - it's the law (and common decency)*

```html
<!-- ❌ The afterthought approach -->
<div class="button" onclick="doThing()">
  Click me
</div>

<!-- ✅ The CRISP way: Semantic and accessible -->
<button class="button" type="button" aria-label="Save document">
  Save
</button>

<!-- Loading state? Use ARIA -->
<button class="button" type="button" aria-busy="true" disabled>
  <span class="visually-hidden">Loading</span>
  Saving...
</button>

<!-- Toggle button? ARIA's got you -->
<button class="button" type="button" aria-pressed="true">
  Bold
</button>
```

**Pro tip**: If you're using a `<div>` as a button, you're doing it wrong. Period.

### Rule 3: States via Attributes, Not Classes

```css
/* ❌ Class explosion */
.button-hover { }
.button-active { }
.button-disabled { }
.button-loading { }

/* ✅ CSS already has this */
@layer crisp {
  .button:hover {
    --bg: oklch(from var(--bg) calc(l + 0.1) c h);
  }
  
  .button:active {
    --bg: oklch(from var(--bg) calc(l - 0.1) c h);
  }
  
  .button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* ARIA states for the win */
  .button[aria-pressed="true"] {
    --bg: var(--color-primary);
    --color: var(--color-on-primary);
  }
  
  .button[aria-busy="true"] {
    --color: transparent;
    position: relative;
  }
  
  .button[aria-busy="true"]::after {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    /* Look ma, no JavaScript! */
  }
  
  @keyframes spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
}
```

**The "Aha!"**: CSS has pseudo-classes. HTML has ARIA. Why are we inventing new systems?

## Core Elements Collection

### Button - The Workhorse

*99% of your buttons will be one of these:*

```html
<!-- Default button (yes, it's this simple) -->
<button class="button" type="button">
  Click me
</button>

<!-- Primary button (no .btn-primary needed!) -->
<button class="button" type="button" 
  style="--bg: var(--color-primary);">
  Save the world
</button>

<!-- Large danger button (RIP .btn-lg.btn-danger) -->
<button class="button" type="button"
  style="--bg: var(--color-danger); --size: 1.25rem;">
  Delete Everything
</button>

<!-- Ghost button (who needs .btn-outline-primary?) -->
<button class="button" type="button"
  style="--bg: transparent; --color: var(--color-primary); --border: 2px solid currentColor;">
  I'm transparent about my intentions
</button>

<!-- Pill button (border-radius goes brrr) -->
<button class="button" type="button" style="--radius: 9999px;">
  So smooth
</button>

<!-- Loading button (spinner included, batteries not required) -->
<button class="button" type="button" aria-busy="true" disabled>
  <span class="visually-hidden">Loading</span>
  Saving...
</button>

<!-- Toggle button (pressed or not pressed, that is the question) -->
<button class="button" type="button" aria-pressed="true">
  <strong>B</strong>
</button>
```

**Secret sauce**: Need a loading button? Add `aria-busy="true"`. Need a toggle? Add `aria-pressed="true"`. CSS handles the rest.

### Link - Navigation Done Right

*Because not everything should be a button*

```html
<!-- Standard link (revolutionary, I know) -->
<a class="link" href="/about">About Us</a>

<!-- Current page (no .active class needed) -->
<a class="link" href="/products" aria-current="page">
  Products
</a>

<!-- External link (the arrow isn't just for show) -->
<a class="link" href="https://example.com" 
  target="_blank" 
  rel="noopener noreferrer">
  External Resource ↗
</a>

<!-- Download link (browsers know what to do) -->
<a class="link" href="/files/report.pdf" download>
  Download Report
</a>

<!-- Email link (yes, these still exist) -->
<a class="link" href="mailto:hello@example.com">
  Email us
</a>

<!-- Anchor link (smooth scrolling for free) -->
<a class="link" href="#features">
  Jump to features
</a>
```

```css
@layer crisp {
  .link {
    --color: var(--color-primary);
    --decoration: underline;
    
    color: var(--color);
    text-decoration: var(--decoration);
    transition: all var(--transition-fast);
    
    &:hover {
      --color: oklch(from var(--color) calc(l + 0.1) c h);
    }
    
    /* Current page styling */
    &[aria-current="page"] {
      --color: var(--color-text);
      --decoration: none;
      font-weight: var(--text-weight-semibold);
    }
  }
}
```

**The "Aha!"**: Links have built-in states. Use them! `aria-current="page"` beats `.active` every time.

### Text Elements

*Words matter. Make them CRISP.*

```css
@layer crisp {
  /* Headings that scale */
  .heading {
    @property --size {
      syntax: "<length>";
      inherits: false;
      initial-value: 2rem;
    }
    
    --weight: var(--text-weight-bold);
    --leading: var(--text-leading-tight);
    --color: var(--color-text);
    
    font-size: var(--size);
    font-weight: var(--weight);
    line-height: var(--leading);
    color: var(--color);
  }
  
  /* Body text that breathes */
  .text {
    --size: var(--text-size-1-0);
    --leading: var(--text-leading-normal);
    --color: var(--color-text);
    
    font-size: var(--size);
    line-height: var(--leading);
    color: var(--color);
  }
  
  /* Code that looks like code */
  .code {
    --bg: oklch(95% 0.02 250);
    --color: var(--color-primary);
    --padding: var(--space-0-25) var(--space-0-5);
    
    background: var(--bg);
    color: var(--color);
    padding: var(--padding);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.9em;
  }
}
```

**Pro tip**: Notice the `@property`? Type safety for CSS. The future is now.

### Input - Forms That Don't Suck

*Because forms are hard enough without fighting the CSS*

```html
<!-- Basic input (it just works™) -->
<input class="input" type="text" name="username" placeholder="Username">

<!-- Email with proper type (browsers do the heavy lifting) -->
<input class="input" type="email" name="email" 
  placeholder="you@example.com">

<!-- Password that's actually invalid -->
<input class="input" type="password" 
  aria-invalid="true"
  aria-describedby="password-error">
<p id="password-error" class="text" style="--color: var(--color-error);">
  Password must contain at least one emoji 🦄
</p>

<!-- Search that looks like search -->
<input class="input" type="search" 
  placeholder="Search for the meaning of life...">

<!-- Number input (with proper constraints) -->
<input class="input" type="number" 
  min="0" max="100" step="5"
  placeholder="0-100">

<!-- Date picker (native and beautiful) -->
<input class="input" type="date" 
  min="2024-01-01" 
  max="2025-12-31">

<!-- Color picker (yes, it's that easy) -->
<input class="input" type="color" 
  value="#6366f1">
```

```css
@layer crisp {
  .input {
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-background);
    }
    
    --border: 1px solid var(--color-border);
    --padding: var(--space-0-75) var(--space-1-0);
    --radius: var(--radius-sm);
    
    background: var(--bg);
    border: var(--border);
    padding: var(--padding);
    border-radius: var(--radius);
    
    /* Progressive enhancement */
    field-sizing: content;
    
    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
    
    /* Validation states via ARIA */
    &[aria-invalid="true"] {
      --border: 2px solid var(--color-error);
    }
  }
}
```

**The "Aha!"**: `field-sizing: content` makes inputs grow with content. No JS needed. Magic.

### Select - Dropdowns from This Century

*Because native selects don't have to look like Windows 95*

```html
<!-- Basic select (with actual style) -->
<select class="select" name="country">
  <option value="">Choose your destiny...</option>
  <option value="gb">🇬🇧 United Kingdom</option>
  <option value="us">🇺🇸 United States</option>
  <option value="de">🇩🇪 Germany</option>
  <option value="fr">🇫🇷 France</option>
</select>

<!-- Grouped select (organization is sexy) -->
<select class="select" name="timezone">
  <option value="">Select timezone...</option>
  <optgroup label="Europe">
    <option value="GMT">London (GMT)</option>
    <option value="CET">Berlin (CET)</option>
    <option value="EET">Athens (EET)</option>
  </optgroup>
  <optgroup label="Americas">
    <option value="EST">New York (EST)</option>
    <option value="PST">Los Angeles (PST)</option>
    <option value="BRT">São Paulo (BRT)</option>
  </optgroup>
</select>

<!-- Multiple select (Ctrl+Click like it's 1999) -->
<select class="select" name="skills[]" multiple size="5">
  <option>HTML</option>
  <option>CSS</option>
  <option>JavaScript</option>
  <option>Crying</option>
  <option>Googling</option>
</select>
```

### Textarea - Multi-line Magic

*Auto-growing textareas without a single line of JavaScript*

```html
<!-- Basic textarea (grows as you type!) -->
<textarea class="textarea" placeholder="Start typing and watch me grow..."></textarea>

<!-- Character limited (Twitter vibes) -->
<textarea class="textarea" 
  maxlength="280"
  placeholder="What's happening? (280 chars max)"></textarea>

<!-- Code editor wannabe -->
<textarea class="textarea" 
  style="font-family: var(--font-mono);"
  placeholder="function writeCode() {
  // Your code here
  return '🎉';
}"></textarea>

<!-- The complaint box -->
<textarea class="textarea" 
  rows="10"
  placeholder="Tell us how you really feel..."></textarea>
```

```css
@layer crisp {
  .textarea {
    /* All input styles */
    @extend .input;
    
    /* But textareas can resize */
    resize: vertical;
    min-height: 3rem;
    field-sizing: content;
    max-height: 20rem;
  }
}
```

**Mind = Blown**: `field-sizing: content` means it grows as you type. Welcome to 2025.

### Checkbox & Radio - Choice Elements

*Because square boxes and round circles shouldn't require a PhD*

```html
<!-- Checkbox (square = multiple choices) -->
<label class="label">
  <input class="checkbox" type="checkbox" name="terms">
  <span>I agree to the terms I didn't read</span>
</label>

<!-- Checkbox group (for the indecisive) -->
<fieldset class="fieldset as-stack">
  <legend>Pizza toppings</legend>
  
  <label class="label">
    <input class="checkbox" type="checkbox" name="toppings[]" value="cheese">
    <span>🧀 Extra cheese</span>
  </label>
  
  <label class="label">
    <input class="checkbox" type="checkbox" name="toppings[]" value="pepperoni">
    <span>🍕 Pepperoni</span>
  </label>
  
  <label class="label">
    <input class="checkbox" type="checkbox" name="toppings[]" value="pineapple">
    <span>🍍 Pineapple (controversial)</span>
  </label>
</fieldset>

<!-- Radio group (circle = one choice only) -->
<fieldset class="fieldset as-stack">
  <legend>Choose your superpower</legend>
  
  <label class="label">
    <input class="radio" type="radio" name="power" value="fly" checked>
    <span>🦸 Flying</span>
  </label>
  
  <label class="label">
    <input class="radio" type="radio" name="power" value="invisible">
    <span>👻 Invisibility</span>
  </label>
  
  <label class="label">
    <input class="radio" type="radio" name="power" value="debug">
    <span>🐛 Debug any code instantly</span>
  </label>
</fieldset>
```

### Switch - Toggle with Style

*iOS called. They want their switches back. We said no.*

```html
<!-- Basic switch (iOS engineers hate this one trick) -->
<label class="label">
  <input class="switch" type="checkbox" name="darkmode">
  <span>🌙 Dark mode</span>
</label>

<!-- Success switch (money maker) -->
<label class="label">
  <input class="switch" type="checkbox" 
    style="--on-bg: var(--color-success);">
  <span>💰 Accept payments</span>
</label>

<!-- Danger switch (handle with care) -->
<label class="label">
  <input class="switch" type="checkbox"
    style="--on-bg: var(--color-error);">
  <span>🚨 Self-destruct mode</span>
</label>

<!-- Disabled switch (pay us first) -->
<label class="label">
  <input class="switch" type="checkbox" disabled>
  <span>✨ Premium feature</span>
</label>
```

```css
@layer crisp {
  .switch {
    /* Define with @property */
    @property --off-bg {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(75% 0.02 250);
    }
    
    @property --on-bg {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-primary);
    }
    
    --thumb-color: white;
    
    /* The magic begins */
    appearance: none; /* Goodbye, native checkbox */
    width: 3rem;
    height: 1.5rem;
    background: var(--off-bg);
    border-radius: var(--radius-full);
    position: relative;
    cursor: pointer;
    transition: all var(--transition-fast);
    
    /* Focus ring for keyboard warriors */
    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
    
    /* The sliding thumb (not your thumb) */
    &::before {
      content: '';
      position: absolute;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: var(--radius-full);
      background: var(--thumb-color);
      top: 0.125rem;
      left: 0.125rem;
      transition: transform var(--transition-fast);
      /* Subtle shadow for depth */
      box-shadow: 0 2px 4px oklch(0% 0 0 / 0.2);
    }
    
    /* The ON state */
    &:checked {
      background: var(--on-bg);
    }
    
    /* Slide to the right (cha cha real smooth) */
    &:checked::before {
      transform: translateX(1.5rem);
    }
    
    /* Disabled state (premium only, sorry) */
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
```

**The "Aha!"**: Pure CSS. Zero JavaScript. Still animated. Still accessible. Checkmate.

## Form Composition

*Where it all comes together like a symphony (but less pretentious)*

```html
<form class="form as-stack" style="--stack-gap: var(--space-1-5);">
  <fieldset class="fieldset as-stack">
    <legend>Account Information</legend>
    
    <div class="field">
      <label class="label" for="email">Email</label>
      <input class="input" id="email" type="email" name="email" required>
    </div>
    
    <div class="field">
      <label class="label" for="password">Password</label>
      <input class="input" id="password" type="password" name="password" required>
      <small class="text" style="--size: var(--text-size-sm);">
        At least 8 characters
      </small>
    </div>
  </fieldset>
  
  <fieldset class="fieldset as-stack">
    <legend>Preferences</legend>
    
    <label class="label">
      <input class="checkbox" type="checkbox" name="newsletter">
      <span>Subscribe to newsletter</span>
    </label>
    
    <label class="label">
      <input class="switch" type="checkbox" name="public">
      <span>Make profile public</span>
    </label>
  </fieldset>
  
  <div class="as-cluster" style="--cluster-align: flex-end;">
    <button class="button" type="button">Cancel</button>
    <button class="button" type="submit" 
      style="--bg: var(--color-primary);">
      Create Account
    </button>
  </div>
</form>
```

## Context-Aware Elements

*Because elements should know where they are*

```html
<!-- Admin context (danger zone) -->
<form class="form as-stack" data-variant="admin">
  <input class="input" type="text" placeholder="Type 'DELETE' to confirm">
  <button class="button" type="submit">Delete Everything</button>
</form>

<!-- Checkout context (cha-ching!) -->
<form class="form as-stack" data-variant="checkout">
  <input class="input" type="text" placeholder="4242 4242 4242 4242">
  <button class="button" type="submit">💳 Take My Money</button>
</form>

<!-- Compact context (for ants) -->
<div data-variant="compact">
  <input class="input" type="text" placeholder="Tiny input">
  <button class="button">Smol button</button>
</div>
```

```css
@layer crisp {
  /* Admin context = serious business */
  [data-variant="admin"] .input {
    --border: 2px solid var(--color-warning);
  }
  
  [data-variant="admin"] .button {
    --bg: var(--color-error);
  }
  
  /* Checkout context = make it obvious */
  [data-variant="checkout"] .button[type="submit"] {
    --bg: var(--color-success);
    --size: var(--text-size-lg);
    --padding: var(--space-1-0) var(--space-3-0);
  }
  
  /* Dark theme adjustments */
  [data-theme="dark"] .input {
    --bg: oklch(15% 0.01 250);
    --border: 1px solid oklch(30% 0.02 250);
  }
}
```

**Pro tip**: Context flows down. Elements adapt up. No extra classes needed.

## Advanced Element Patterns

### Loading States

*For when things take time (because physics)*

```html
<!-- Button with loading -->
<button class="button" type="button" aria-busy="true" disabled>
  <span class="spinner" aria-hidden="true"></span>
  <span>Saving...</span>
</button>

<!-- Input with loading -->
<div class="input-wrapper">
  <input class="input" type="search" aria-busy="true">
  <span class="spinner"></span>
</div>
```

### Validation Feedback

*Because "Something went wrong" helps nobody*

```html
<!-- Invalid input with message -->
<div class="field">
  <input 
    class="input" 
    type="email" 
    aria-invalid="true"
    aria-describedby="email-error"
    required
  >
  <p class="text" id="email-error" role="alert">
    Please enter a valid email address
  </p>
</div>
```

### Compound Elements

*When elements need friends*

```html
<!-- Button group -->
<div class="as-cluster" role="group" aria-label="Text formatting">
  <button class="button" type="button" aria-pressed="true">B</button>
  <button class="button" type="button" aria-pressed="false">I</button>
  <button class="button" type="button" aria-pressed="false">U</button>
</div>

<!-- Input with addon -->
<div class="as-cluster" style="--cluster-gap: 0;">
  <span class="addon">https://</span>
  <input class="input" type="text" placeholder="your-site.com">
</div>
```

## Element Best Practices

*The rules that separate the pros from the "why is this button 400px tall?" crowd*

### 1. Type Everything Properly
```html
<!-- ❌ Wrong -->
<input class="input" type="text" name="email">
<button class="button">Submit</button>

<!-- ✅ Right -->
<input class="input" type="email" name="email">
<button class="button" type="submit">Submit</button>
```

### 2. Label Everything (Your Users Will Thank You)
```html
<!-- ❌ Unlabelled -->
<input class="input" type="text" placeholder="Name">

<!-- ✅ Properly labelled -->
<label class="label" for="name">Name</label>
<input class="input" id="name" type="text" name="name">

<!-- ✅ Or wrapped -->
<label class="label">
  <span>Name</span>
  <input class="input" type="text" name="name">
</label>
```

### 3. Properties > Classes (Always)
```html
<!-- ❌ Old way -->
<button class="button button-large button-primary">

<!-- ✅ CRISP way -->
<button class="button" 
  style="--size: var(--text-size-lg); --bg: var(--color-primary);">
```

### 4. Progressive Enhancement is Not Dead
```html
<!-- Level 1: Basic functionality -->
<button class="button">Click</button>

<!-- Level 2: Enhanced interaction -->
<button class="button with-interaction">Click</button>

<!-- Level 3: Full enhancement -->
<button class="button with-interaction with-shadow" 
  data-component="button">Click</button>
```

### 5. Context via Data Attributes
```html
<!-- ✅ Component with direct context -->
<button class="button" data-brand="premium">Premium Feature</button>
<input class="input" data-variant="error" aria-invalid="true">

<!-- ❌ Avoid context classes -->
<button class="button button--premium">Premium Feature</button>
<input class="input input--error">
```

## The Element Manifesto

*Or: Everything you need to know in 7 bullet points*

1. **One class per element** - `.button`, not `.button-primary-large-disabled`
2. **Properties for customisation** - `--bg: red` not `.button-red`
3. **ARIA for states** - `aria-pressed="true"` not `.active`
4. **Semantic HTML** - `<button>` not `<div class="button">`
5. **Context awareness** - Elements adapt to `data-variant` containers
6. **Type safety** - @property catches your `--size: "big"` mistakes
7. **Progressive enhancement** - Modern features when available

**The Ultimate "Aha!"**: You just learned every element pattern you'll ever need. No memorising class names. No checking documentation. No "wait, was it `.btn` or `.button`?" moments.

Your elements are predictable. Your code is maintainable. Your designer can change their mind 47 times and you'll just update a custom property.

Welcome to elements that spark joy, not rage.

→ Continue to [Chapter 8: Boxes That Contain Things](./C08-containers.md)