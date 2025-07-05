# Chapter 10: Forms That Users Actually Complete

*Or: How to collect data without causing trauma*

## The Form Horror Show

Remember building forms like this?

```html
<!-- The old nightmare -->
<div class="form-wrapper">
  <div class="form-group has-error">
    <label class="control-label required" for="email">
      Email <span class="required-indicator">*</span>
    </label>
    <div class="input-group">
      <span class="input-group-addon">
        <i class="icon icon-email"></i>
      </span>
      <input type="text" class="form-control form-control-lg" 
        id="email" name="email" required>
      <span class="input-group-addon validation-icon">
        <i class="icon icon-error"></i>
      </span>
    </div>
    <div class="help-block with-errors">
      Please enter a valid email address
    </div>
  </div>
</div>

<!-- 17 wrapper divs later, you might have a form -->
```

## The CRISP Form Philosophy

Forms are conversations. Make them feel like one.

## Form Foundation

### The Form Element

Start with semantic HTML:

```html
<!-- Basic form -->
<form class="form as-stack" method="post" action="/submit">
  <input class="input" type="email" name="email" placeholder="Email">
  <button class="button" type="submit">Subscribe</button>
</form>

<!-- Form with spacing control -->
<form class="form as-stack" style="--stack-gap: var(--space-1-5);">
  <label class="label" for="name">Name</label>
  <input class="input" id="name" type="text" name="name" required>
  
  <label class="label" for="email">Email</label>
  <input class="input" id="email" type="email" name="email" required>
  
  <button class="button" type="submit">Submit</button>
</form>

<!-- Horizontal form -->
<form class="form as-cluster" style="--cluster-gap: var(--space-1-0);">
  <input class="input" type="search" name="q" placeholder="Search...">
  <button class="button" type="submit">Search</button>
</form>

<!-- Context-aware form -->
<form class="form as-stack" data-context="checkout">
  <input class="input" type="text" name="card" placeholder="Card number">
  <button class="button" type="submit">Complete Purchase</button>
</form>
```

### Field Grouping

Use fieldsets for related inputs:

```html
<form class="form as-stack">
  <fieldset class="fieldset as-stack">
    <legend>Personal Information</legend>
    
    <div class="field">
      <label class="label" for="first-name">First Name</label>
      <input class="input" id="first-name" type="text" name="first_name" required>
    </div>
    
    <div class="field">
      <label class="label" for="last-name">Last Name</label>
      <input class="input" id="last-name" type="text" name="last_name" required>
    </div>
  </fieldset>
  
  <fieldset class="fieldset as-stack">
    <legend>Account Details</legend>
    
    <div class="field">
      <label class="label" for="username">Username</label>
      <input class="input" id="username" type="text" name="username" required>
      <small class="helper">Letters, numbers, and underscores only</small>
    </div>
    
    <div class="field">
      <label class="label" for="password">Password</label>
      <input class="input" id="password" type="password" name="password" required>
      <small class="helper">Minimum 8 characters</small>
    </div>
  </fieldset>
  
  <button class="button with-interaction" type="submit">Create Account</button>
</form>
```

## Form Patterns

### Login Form

```html
<form class="form as-stack" style="--stack-gap: var(--space-1-5);" data-variant="login">
  <h2 class="heading">Welcome Back</h2>
  
  <div class="field">
    <label class="label" for="login-email">Email</label>
    <input class="input" id="login-email" type="email" name="email" 
      required autocomplete="email">
  </div>
  
  <div class="field">
    <label class="label" for="login-password">
      <span>Password</span>
      <a class="link" href="/forgot-password" style="float: right;">
        Forgot password?
      </a>
    </label>
    <input class="input" id="login-password" type="password" name="password" 
      required autocomplete="current-password">
  </div>
  
  <label class="label">
    <input class="checkbox" type="checkbox" name="remember">
    <span>Remember me</span>
  </label>
  
  <button class="button with-interaction" type="submit" 
    style="--bg: var(--color-primary);">
    Sign In
  </button>
  
  <p class="text" style="text-align: center;">
    Don't have an account? 
    <a class="link" href="/register">Sign up</a>
  </p>
</form>
```

### Multi-Step Form

```html
<form class="form as-stack" data-state="step-1">
  <!-- Progress indicator -->
  <nav class="progress as-cluster" aria-label="Form progress">
    <span class="step" aria-current="step">1. Account</span>
    <span class="step">2. Profile</span>
    <span class="step">3. Preferences</span>
  </nav>
  
  <!-- Step 1 -->
  <fieldset class="fieldset as-stack" data-function="step-content" data-step="1">
    <legend>Create Your Account</legend>
    
    <div class="field">
      <label class="label" for="email">Email</label>
      <input class="input" id="email" type="email" name="email" required>
    </div>
    
    <div class="field">
      <label class="label" for="password">Password</label>
      <input class="input" id="password" type="password" name="password" required>
      <progress class="progress" value="0" max="4" aria-label="Password strength">
        Password strength
      </progress>
    </div>
  </fieldset>
  
  <!-- Step 2 (hidden initially) -->
  <fieldset class="fieldset as-stack" data-function="step-content" data-step="2" hidden>
    <legend>Your Profile</legend>
    
    <div class="field">
      <label class="label" for="name">Display Name</label>
      <input class="input" id="name" type="text" name="name" required>
    </div>
    
    <div class="field">
      <label class="label" for="bio">Bio</label>
      <textarea class="textarea" id="bio" name="bio" rows="4" 
        placeholder="Tell us about yourself..."></textarea>
    </div>
  </fieldset>
  
  <!-- Navigation -->
  <div class="as-cluster" style="--cluster-align: space-between;">
    <button class="button" type="button" onclick="previousStep()" hidden>
      ← Previous
    </button>
    <button class="button" type="button" onclick="nextStep()">
      Next →
    </button>
    <button class="button" type="submit" hidden 
      style="--bg: var(--color-primary);">
      Complete
    </button>
  </div>
</form>
```

### Dynamic Form

```html
<form class="form as-stack" data-variant="dynamic">
  <fieldset class="fieldset as-stack">
    <legend>Order Items</legend>
    
    <div class="repeater as-stack" data-function="repeater" data-target="items">
      <!-- Template -->
      <template id="item-template">
        <div class="field as-cluster">
          <input class="input" type="text" name="items[][name]" 
            placeholder="Item name" required>
          <input class="input" type="number" name="items[][quantity]" 
            placeholder="Qty" min="1" required style="--width: 100px;">
          <button class="button" type="button" onclick="removeItem(this)">
            Remove
          </button>
        </div>
      </template>
      
      <!-- Initial item -->
      <div class="field as-cluster">
        <input class="input" type="text" name="items[][name]" 
          placeholder="Item name" required>
        <input class="input" type="number" name="items[][quantity]" 
          placeholder="Qty" min="1" required style="--width: 100px;">
        <button class="button" type="button" onclick="removeItem(this)">
          Remove
        </button>
      </div>
    </div>
    
    <button class="button" type="button" onclick="addItem()">
      + Add Item
    </button>
  </fieldset>
  
  <button class="button with-interaction" type="submit">
    Submit Order
  </button>
</form>
```

## Form Validation

### HTML5 Validation

```html
<form class="form as-stack" novalidate data-variant="validated">
  <!-- Email validation -->
  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input" id="email" type="email" name="email" 
      required 
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      aria-describedby="email-error"
      data-state="invalid">
    <small class="error" id="email-error" hidden>
      Please enter a valid email address
    </small>
  </div>
  
  <!-- Password validation -->
  <div class="field">
    <label class="label" for="password">Password</label>
    <input class="input" id="password" type="password" name="password"
      required 
      minlength="8"
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      aria-describedby="password-requirements">
    <small class="helper" id="password-requirements">
      Must contain at least one number, one uppercase and lowercase letter, 
      and at least 8 characters
    </small>
  </div>
  
  <!-- Matching fields -->
  <div class="field">
    <label class="label" for="confirm-password">Confirm Password</label>
    <input class="input" id="confirm-password" type="password" 
      name="confirm_password" required>
  </div>
</form>
```

### Visual Validation States

```css
/* Invalid input */
.input:invalid:not(:focus):not(:placeholder-shown) {
  --border-color: var(--color-danger);
}

.input[data-state="invalid"] {
  --border-color: var(--color-danger);
}

/* Valid input */
.input:valid:not(:focus):not(:placeholder-shown) {
  --border-color: var(--color-success);
}

.input[data-state="valid"] {
  --border-color: var(--color-success);
}

/* Error message */
.error {
  /* 1. Define defaults */
  --color: var(--color-danger);
  --size: var(--text-size-sm);
  
  /* 2. Use the tokens */
  color: var(--color);
  font-size: var(--size);
}

/* Loading state */
.form[data-state="loading"] .button[type="submit"] {
  opacity: 0.6;
  cursor: wait;
}

/* Progress bar */
.progress {
  /* 1. Define defaults */
  --bg: var(--color-neutral-light);
  --fill: var(--color-primary);
  --height: 0.5rem;
  
  /* 2. Use the tokens */
  background: var(--bg);
  height: var(--height);
}

.progress::-webkit-progress-value {
  background: var(--fill);
}

/* Strength levels */
.progress[value="1"] { --fill: var(--color-danger); }
.progress[value="2"] { --fill: var(--color-warning); }
.progress[value="3"] { --fill: var(--color-success); }
.progress[value="4"] { --fill: var(--color-success); }
```

### Custom Validation

```javascript
// Real-time validation
document.querySelectorAll('.input').forEach(input => {
  input.addEventListener('blur', () => {
    if (!input.validity.valid) {
      const error = input.parentElement.querySelector('.error');
      if (error) {
        error.hidden = false;
        error.textContent = input.validationMessage;
      }
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('data-state', 'invalid');
    } else {
      const error = input.parentElement.querySelector('.error');
      if (error) error.hidden = true;
      input.setAttribute('aria-invalid', 'false');
      input.setAttribute('data-state', 'valid');
    }
  });
});

// Password strength indicator
document.getElementById('password').addEventListener('input', (e) => {
  const password = e.target.value;
  const strength = calculateStrength(password);
  const progress = document.querySelector('progress');
  progress.value = strength;
});
```

## Form Accessibility

### Labels Are Mandatory

```html
<!-- ❌ No label -->
<input class="input" type="text" placeholder="Name">

<!-- ✅ Visible label -->
<label class="label" for="name">Name</label>
<input class="input" id="name" type="text" name="name">

<!-- ✅ Wrapped label -->
<label class="label">
  <span>Name</span>
  <input class="input" type="text" name="name">
</label>

<!-- ✅ Screen reader only label -->
<label class="label sr-only" for="search">Search</label>
<input class="input" id="search" type="search" placeholder="Search...">
```

### Error Messages

```html
<!-- Associate errors with inputs -->
<div class="field">
  <label class="label" for="email">Email</label>
  <input class="input" id="email" type="email" 
    aria-invalid="true"
    aria-describedby="email-error email-hint"
    data-state="invalid">
  <small class="helper" id="email-hint">We'll never share your email</small>
  <small class="error" id="email-error">Email is required</small>
</div>
```

### Required Fields

```html
<!-- Mark required fields consistently -->
<form class="form">
  <p class="text">Fields marked with * are required</p>
  
  <div class="field">
    <label class="label" for="name">
      Name <span aria-label="required">*</span>
    </label>
    <input class="input" id="name" type="text" required aria-required="true">
  </div>
</form>
```

## Form Context Patterns

### Checkout Forms

```html
<form class="form as-stack" data-context="checkout">
  <h2 class="heading">Secure Checkout</h2>
  
  <fieldset class="fieldset as-stack" data-variant="payment">
    <legend>Payment Information</legend>
    <!-- Fields automatically styled for checkout context -->
  </fieldset>
</form>
```

### Admin Forms

```html
<form class="form as-stack" data-context="admin">
  <h2 class="heading">Admin Settings</h2>
  <!-- Form fields get admin-specific styling -->
</form>
```

```css
/* Context styling */
[data-context="checkout"] {
  --bg: var(--color-neutral-light);
  --padding: var(--space-2-0);
}

[data-context="checkout"] .button[type="submit"] {
  --bg: var(--color-success);
  --size: var(--text-size-lg);
}

[data-context="admin"] .input {
  --border-color: var(--color-warning);
}
```

## Form Best Practices

### 1. Progressive Enhancement
```html
<!-- Works without JavaScript -->
<form class="form" method="post" action="/submit">
  <input class="input" type="email" name="email" required>
  <button class="button" type="submit">Submit</button>
</form>

<script>
// Enhance with JavaScript if available
document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault();
  e.target.setAttribute('data-state', 'loading');
  // AJAX submission
});
</script>
```

### 2. Autocomplete Everything
```html
<input class="input" type="email" autocomplete="email">
<input class="input" type="tel" autocomplete="tel">
<input class="input" type="text" autocomplete="name">
<input class="input" type="text" autocomplete="street-address">
<input class="input" type="password" autocomplete="new-password">
```

### 3. Mobile-Friendly Inputs
```html
<!-- Numeric keyboard -->
<input class="input" type="tel" inputmode="numeric" pattern="[0-9]*">

<!-- Email keyboard -->
<input class="input" type="email" inputmode="email">

<!-- URL keyboard -->
<input class="input" type="url" inputmode="url">

<!-- Search keyboard -->
<input class="input" type="search" inputmode="search">
```

### 4. Clear Actions
```html
<!-- Primary action is obvious -->
<div class="as-cluster" style="--cluster-align: flex-end;">
  <button class="button" type="button">Cancel</button>
  <button class="button with-interaction" type="submit" 
    style="--bg: var(--color-primary); --size: var(--text-size-1-25);">
    Complete Purchase
  </button>
</div>
```

## The Form Liberation

With CRISP forms:
- Semantic HTML that works everywhere
- Validation that helps, not hinders
- Accessible by default
- Mobile-friendly automatically
- No framework dependencies
- Context via data attributes, not classes

Your users complete forms. Your conversion rates improve. Everyone's happy.

And when the PM asks for "checkout forms that feel more secure"? You don't create `.form--checkout-secure`. You add `data-context="checkout"` and style once. That's the power of semantic context.

→ Continue to [Chapter 11: Talking Back to Users](./C11-feedback.md)