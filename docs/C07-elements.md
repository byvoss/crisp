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
  /* Base styles */
  display: inline-block;
  padding: var(--button-padding, var(--space-0-75) var(--space-1-5));
  
  /* Customisable appearance */
  background: var(--button-bg, var(--color-neutral-90));
  color: var(--button-color, white);
  
  /* Customisable typography */
  font-family: var(--font-sans);
  font-size: var(--button-size, var(--text-size-base));
  font-weight: var(--text-weight-medium);
  
  /* Customisable shape */
  border-radius: var(--button-radius, var(--radius-md));
  border: var(--button-border, none);
  
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
  style="--button-bg: var(--color-primary-50);">
  Primary Button
</button>

<!-- Large danger button -->
<button class="button" type="button"
  style="--button-bg: var(--color-danger-50); --button-size: var(--text-size-lg);">
  Delete Everything
</button>

<!-- Ghost button -->
<button class="button" type="button"
  style="--button-bg: transparent; --button-color: var(--color-primary-60); --button-border: 2px solid currentColor;">
  Ghost Button
</button>

<!-- With enhancements -->
<button class="button with-interaction with-shadow" type="button">
  Enhanced Button
</button>
```

**The "Aha!"**: No modifier classes. Just CSS custom properties doing what they do best.

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
  /* Inherits all button styles */
  @extend .button;
  text-decoration: none;
}
```

### Input - Forms That Don't Hurt

```html
<!-- Text input -->
<input class="input" type="text" name="username" placeholder="Username">

<!-- With custom width -->
<input class="input" type="email" name="email" 
  style="--input-width: 100%;" 
  placeholder="email@example.com">

<!-- With validation styling -->
<input class="input with-validation" type="password" 
  aria-invalid="true"
  aria-describedby="password-error">
<p id="password-error" class="text" style="--text-color: var(--color-danger-60);">
  Password must be at least 8 characters
</p>

<!-- Search input with icon space -->
<input class="input with-icon" type="search" 
  style="--input-padding-left: var(--space-3-0);"
  placeholder="Search...">
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
<select class="select" style="--select-width: 100%;">
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
  style="--textarea-min-height: 150px; --textarea-resize: vertical;"
  placeholder="Your message..."></textarea>

<!-- Full featured -->
<textarea class="textarea with-border" 
  name="comment"
  rows="6"
  maxlength="500"
  style="--textarea-width: 100%;"
  aria-label="Comment"
  placeholder="Share your thoughts (500 chars max)"></textarea>
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
    style="--switch-on-bg: var(--color-success-50);">
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
  appearance: none;
  width: 3rem;
  height: 1.5rem;
  background: var(--switch-off-bg, var(--color-neutral-30));
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
  background: white;
  top: 0.125rem;
  left: 0.125rem;
  transition: transform var(--transition-fast);
}

.switch:checked {
  background: var(--switch-on-bg, var(--color-primary-50));
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
      <small class="text" style="--text-size: var(--text-size-sm);">
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
      style="--button-bg: var(--color-primary-50);">
      Create Account
    </button>
  </div>
</form>
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
  style="--button-size: var(--text-size-lg); --button-bg: var(--color-primary-50);">
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

## The Beauty of Simplicity

With CRISP elements:
- One class per element type
- Infinite customisation via properties
- Semantic HTML preserved
- Accessibility built in
- No modifier class explosion

Your forms are readable. Your buttons are maintainable. Your inputs just work.

→ Continue to [Chapter 8: Boxes That Contain Things](./C08-containers.md)