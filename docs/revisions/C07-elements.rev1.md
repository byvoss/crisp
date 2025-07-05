# Chapter 7: The Building Blocks

*Or: Components so simple, you'll wonder why we made it complicated before*

## The Element Renaissance

Remember when we had 47 different button classes?

```scss
// The old madness
.btn { }
.btn-primary { }
.btn-secondary { }
.btn-success { }
.btn-danger { }
.btn-warning { }
.btn-info { }
.btn-light { }
.btn-dark { }
.btn-lg { }
.btn-sm { }
.btn-xs { }
.btn-block { }
.btn-outline-primary { }
.btn-outline-secondary { }
// ... 32 more variants
```

## The CRISP Way: One Class, Infinite Possibilities

```css
/* The entire button CSS */
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
  display: inline-block;
  padding: var(--padding);
  background: var(--bg);
  color: var(--color);
  font-family: var(--font-sans);
  font-size: var(--size);
  font-weight: var(--weight);
  border-radius: var(--radius);
  border: var(--border);
  
  /* Standard behaviour */
  cursor: pointer;
  transition: all var(--transition-fast);
}
```

That's it. One class handles every button you'll ever need.

## Interactive Elements

### Button - The Workhorse

```html
<!-- Default button -->
<button class="button" type="button">
  Default Button
</button>

<!-- Primary button -->
<button class="button" type="button" 
  style="--bg: var(--color-primary);">
  Primary Button
</button>

<!-- Large danger button -->
<button class="button" type="button"
  style="--bg: var(--color-danger); --size: var(--text-size-lg);">
  Delete Everything
</button>

<!-- Ghost button -->
<button class="button" type="button"
  style="--bg: transparent; --color: var(--color-primary); --border: 2px solid currentColor;">
  Ghost Button
</button>

<!-- With enhancements -->
<button class="button with-interaction with-shadow" type="button">
  Enhanced Button
</button>

<!-- Context-aware button -->
<button class="button" type="button" data-context="premium">
  Premium Action
</button>
```

**The "Aha!"**: No modifier classes. Just CSS custom properties doing what they do best. Plus, components can have data attributes for context without wrapper divs.

### Link - Navigation Done Right

```html
<!-- Standard link -->
<a class="link" href="/about">About Us</a>

<!-- Link styled as button (semantic href preserved) -->
<a class="link" href="/signup" role="button">
  Sign Up Now
</a>

<!-- External link -->
<a class="link" href="https://example.com" 
  target="_blank" 
  rel="noopener noreferrer">
  External Resource ↗
</a>

<!-- Current page link -->
<a class="link" href="/products" aria-current="page">
  Products
</a>
```

CSS for link-as-button:
```css
.link[role="button"] {
  /* Inherits button appearance without losing link semantics */
  /* 1. Define defaults - same as button */
  --bg: var(--color-neutral);
  --color: white;
  --padding: var(--space-0-75) var(--space-1-5);
  --radius: var(--radius-md);
  
  /* 2. Use the tokens */
  display: inline-block;
  padding: var(--padding);
  background: var(--bg);
  color: var(--color);
  border-radius: var(--radius);
  text-decoration: none;
}
```

### Input - Forms That Don't Hurt

```html
<!-- Text input -->
<input class="input" type="text" name="username" placeholder="Username">

<!-- With custom width -->
<input class="input" type="email" name="email" 
  style="--width: 100%;" 
  placeholder="email@example.com">

<!-- With validation styling -->
<input class="input with-validation" type="password" 
  aria-invalid="true"
  aria-describedby="password-error">
<p id="password-error" class="text" style="--color: var(--color-danger);">
  Password must be at least 8 characters
</p>

<!-- Search input with icon space -->
<input class="input with-icon" type="search" 
  style="--padding-left: var(--space-3-0);"
  placeholder="Search...">
```

```css
.input {
  /* 1. Define defaults */
  --bg: var(--color-white);
  --border-color: var(--color-neutral);
  --width: auto;
  --padding: var(--space-0-75) var(--space-1-0);
  --padding-left: var(--space-1-0);
  
  /* 2. Use the tokens */
  background: var(--bg);
  border: 1px solid var(--border-color);
  width: var(--width);
  padding: var(--padding);
  padding-left: var(--padding-left);
}
```

### Select - Dropdowns That Work

```html
<!-- Basic select -->
<select class="select" name="country">
  <option value="">Choose country...</option>
  <option value="gb">United Kingdom</option>
  <option value="us">United States</option>
</select>

<!-- Full-width select -->
<select class="select" style="--width: 100%;">
  <optgroup label="Europe">
    <option>United Kingdom</option>
    <option>Germany</option>
  </optgroup>
  <optgroup label="Americas">
    <option>Canada</option>
    <option>United States</option>
  </optgroup>
</select>
```

### Textarea - Multi-line Input

```html
<!-- Basic textarea -->
<textarea class="textarea" rows="4" placeholder="Tell us more..."></textarea>

<!-- Resizable with min height -->
<textarea class="textarea" 
  style="--min-height: 150px; --resize: vertical;"
  placeholder="Your message..."></textarea>

<!-- Full featured -->
<textarea class="textarea with-border" 
  name="comment"
  rows="6"
  maxlength="500"
  style="--width: 100%;"
  aria-label="Comment"
  placeholder="Share your thoughts (500 chars max)"></textarea>
```

```css
.textarea {
  /* 1. Define defaults */
  --width: auto;
  --min-height: 100px;
  --resize: both;
  --padding: var(--space-1-0);
  
  /* 2. Use the tokens */
  width: var(--width);
  min-height: var(--min-height);
  resize: var(--resize);
  padding: var(--padding);
}
```

### Checkbox & Radio - Choice Elements

```html
<!-- Checkbox -->
<label class="label">
  <input class="checkbox" type="checkbox" name="terms">
  <span>I agree to the terms</span>
</label>

<!-- Radio group -->
<fieldset class="fieldset as-stack">
  <legend>Choose your plan</legend>
  
  <label class="label">
    <input class="radio" type="radio" name="plan" value="basic" checked>
    <span>Basic - £9/month</span>
  </label>
  
  <label class="label">
    <input class="radio" type="radio" name="plan" value="pro">
    <span>Pro - £19/month</span>
  </label>
</fieldset>

<!-- Switch (enhanced checkbox) -->
<label class="label">
  <input class="switch" type="checkbox" name="notifications">
  <span>Enable notifications</span>
</label>
```

### Switch - Toggle with Style

```html
<!-- Basic switch -->
<label class="label">
  <input class="switch" type="checkbox" name="darkmode">
  <span>Dark mode</span>
</label>

<!-- Switch with custom colors -->
<label class="label">
  <input class="switch" type="checkbox" 
    style="--on-bg: var(--color-success);">
  <span>Available for hire</span>
</label>

<!-- Disabled switch -->
<label class="label">
  <input class="switch" type="checkbox" disabled>
  <span>Premium feature</span>
</label>
```

CSS-only implementation:
```css
.switch {
  /* 1. Define defaults */
  --off-bg: var(--color-neutral);
  --on-bg: var(--color-primary);
  --thumb-color: white;
  
  /* 2. Use the tokens */
  appearance: none;
  width: 3rem;
  height: 1.5rem;
  background: var(--off-bg);
  border-radius: var(--radius-full);
  position: relative;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.switch::before {
  content: '';
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--radius-full);
  background: var(--thumb-color);
  top: 0.125rem;
  left: 0.125rem;
  transition: transform var(--transition-fast);
}

.switch:checked {
  background: var(--on-bg);
}

.switch:checked::before {
  transform: translateX(1.5rem);
}
```

## Form Composition

Bringing it all together:

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

## Context-Aware Forms

Forms can respond to their context without changing their structure:

```html
<!-- Admin context changes appearance automatically -->
<form class="form as-stack" data-context="admin">
  <input class="input" type="text" placeholder="Admin only field">
  <button class="button" type="submit">Admin Action</button>
</form>

<!-- Checkout context with special styling -->
<form class="form as-stack" data-context="checkout">
  <input class="input" type="text" placeholder="Card number">
  <button class="button" type="submit">Complete Purchase</button>
</form>
```

```css
/* Context-specific styling */
[data-context="admin"] .input {
  --border-color: var(--color-warning);
}

[data-context="checkout"] .button {
  --bg: var(--color-success);
  --size: var(--text-size-lg);
}
```

## Element Best Practices

### 1. Always Use Semantic Types
```html
<!-- ❌ Wrong -->
<input class="input" type="text" name="email">
<button class="button">Submit</button>

<!-- ✅ Right -->
<input class="input" type="email" name="email">
<button class="button" type="submit">Submit</button>
```

### 2. Label Everything
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

### 3. Customise with Properties, Not Classes
```html
<!-- ❌ Old way -->
<button class="button button-large button-primary">

<!-- ✅ CRISP way -->
<button class="button" 
  style="--size: var(--text-size-lg); --bg: var(--color-primary);">
```

### 4. Enhance Progressively
```html
<!-- Level 1: Basic functionality -->
<button class="button">Click</button>

<!-- Level 2: Enhanced interaction -->
<button class="button with-interaction">Click</button>

<!-- Level 3: Full enhancement -->
<button class="button with-interaction with-shadow" 
  data-component="button">Click</button>
```

### 5. Use Data Attributes for Context
```html
<!-- ✅ Component with direct context -->
<button class="button" data-brand="premium">Premium Feature</button>
<input class="input" data-state="error" aria-invalid="true">

<!-- ❌ Avoid context classes -->
<button class="button button--premium">Premium Feature</button>
<input class="input input--error">
```

## The Beauty of Simplicity

With CRISP elements:
- One class per element type
- Infinite customisation via properties
- Semantic HTML preserved
- Accessibility built in
- No modifier class explosion
- Context via data attributes, not classes

Your forms are readable. Your buttons are maintainable. Your inputs just work.

And when the designer asks for a 7px shadow on the premium buttons? You don't touch your CSS. You just add `data-brand="premium"` and define the styles once. That's the power of separation of concerns.

→ Continue to [Chapter 8: Boxes That Contain Things](./C08-containers.md)