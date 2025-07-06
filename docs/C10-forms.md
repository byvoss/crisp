# Chapter 10: Forms That Users Actually Complete

*Or: How to collect data without causing therapy sessions*

## The Form Horror Show

Remember this form framework nightmare?

```css
/* Monday: Bootstrap forms (the div festival) */
.form-group { }
.form-control { }
.form-control-lg { }
.form-check { }
.form-check-input { }
.form-check-label { }
.form-text { }
.invalid-feedback { }
.valid-feedback { }
.input-group { }
.input-group-prepend { }
.input-group-append { }
/* Plus 47 state variations */

/* Tuesday: Material Design (even more divs) */
.mdc-text-field { }
.mdc-text-field__input { }
.mdc-floating-label { }
.mdc-line-ripple { }
.mdc-notched-outline { }
.mdc-notched-outline__leading { }
.mdc-notched-outline__notch { }
.mdc-notched-outline__trailing { }
/* Your form is now a Christmas tree of divs */

/* Wednesday: Custom framework (the rebellion) */
.form-field-wrapper-container { }
.form-field-inner-wrapper { }
.form-field-input-container { }
.form-field-label-wrapper { }
.form-field-error-message-container { }
/* Div-ception achieved */

/* Thursday: Tailwind forms (inline chaos) */
<input class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
/* My fingers hurt from typing */

/* Friday: *Switches career to pottery* */
```

**The "Aha!"**: What if forms were just... semantic HTML with proper ARIA? No wrapper divs, no JavaScript validation libraries, no CSS framework fights?

## The CRISP Form Philosophy

*Forms are conversations. Not interrogations. Not bureaucratic nightmares. Conversations.*

```html
<!-- ❌ The old way: Death by a thousand divs -->
<div class="form-wrapper">
  <div class="form-group">
    <div class="label-wrapper">
      <label class="form-label required">Email</label>
    </div>
    <div class="input-wrapper">
      <input class="form-control">
    </div>
    <div class="error-wrapper">
      <span class="error-message">Error here</span>
    </div>
  </div>
</div>

<!-- ✅ The CRISP way: Just HTML doing its job -->
<label class="label" for="email">
  Email <span aria-label="required">*</span>
</label>
<input class="input" id="email" type="email" name="email" 
  required aria-required="true" aria-describedby="email-error">
<p class="text" id="email-error" role="alert" hidden>
  Please enter a valid email
</p>
```

**Mind = Blown**: No wrapper divs. No framework classes. Just semantic HTML with ARIA. The browser does the heavy lifting.

## Form Foundation

### The Form Element - Where Magic Begins

*One form class. Infinite possibilities. Zero therapy bills.*

```html
<!-- The simplest form (it actually works!) -->
<form class="form as-stack" method="post" action="/submit">
  <input class="input" type="email" name="email" 
    placeholder="your@email.com" aria-label="Email address">
  <button class="button" type="submit">Subscribe</button>
</form>

<!-- Form with proper ARIA (screenreaders rejoice!) -->
<form class="form as-stack" style="--stack-gap: var(--space-1-5);">
  <div class="field">
    <label class="label" for="name">Name</label>
    <input class="input" id="name" type="text" name="name" 
      required aria-required="true">
  </div>
  
  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input" id="email" type="email" name="email" 
      required aria-required="true" aria-describedby="email-hint">
    <small class="text" id="email-hint" style="--color: var(--color-neutral);">
      We'll never spam you (we're not monsters)
    </small>
  </div>
  
  <button class="button" type="submit" style="--bg: var(--color-primary);">
    Submit
  </button>
</form>

<!-- Search form (Google, but prettier) -->
<form class="form as-cluster" style="--cluster-gap: var(--space-1-0);" 
  role="search" aria-label="Site search">
  <input class="input" type="search" name="q" 
    placeholder="Search for happiness..." 
    aria-label="Search query"
    autocomplete="off">
  <button class="button" type="submit" aria-label="Submit search">
    <span aria-hidden="true">🔍</span>
    <span class="visually-hidden">Search</span>
  </button>
</form>

<!-- Context-aware checkout (money time!) -->
<form class="form as-stack" data-variant="checkout" 
  aria-label="Secure checkout form">
  <div class="field">
    <label class="label" for="card">Card Number</label>
    <input class="input" id="card" type="text" name="card" 
      inputmode="numeric" pattern="[0-9\s]*" 
      autocomplete="cc-number"
      aria-describedby="card-security">
    <small class="text" id="card-security" style="--color: var(--color-success);">
      🔒 Secure SSL encryption
    </small>
  </div>
  <button class="button" type="submit" style="--bg: var(--color-success);">
    💳 Complete Purchase
  </button>
</form>
```

```css
@layer crisp {
  .form {
    /* Type-safe form properties */
    @property --form-gap {
      syntax: "<length>";
      inherits: false;
      initial-value: var(--space-1-0);
    }
    
    /* Context wins */
    &[data-variant="checkout"] {
      --form-gap: var(--space-1-5);
      padding: var(--space-2-0);
      background: oklch(98% 0.01 250);
      border: 1px solid var(--color-success);
      border-radius: var(--radius-lg);
    }
  }
}
```

**Pro tip**: `role="search"` tells screen readers this is a search form. `inputmode="numeric"` gives mobile users a number pad. Small touches, big UX wins!

### Field Grouping - Organization Without the Bureaucracy

*Fieldsets: Because related fields should stick together (like good friends)*

```html
<form class="form as-stack" aria-label="User registration">
  <fieldset class="fieldset as-stack" data-entries="2">
    <legend>Personal Information</legend>
    
    <div class="field">
      <label class="label" for="first-name">
        First Name <span aria-label="required">*</span>
      </label>
      <input class="input" id="first-name" type="text" name="first_name" 
        required aria-required="true" 
        autocomplete="given-name"
        aria-describedby="name-format">
    </div>
    
    <div class="field">
      <label class="label" for="last-name">
        Last Name <span aria-label="required">*</span>
      </label>
      <input class="input" id="last-name" type="text" name="last_name" 
        required aria-required="true" 
        autocomplete="family-name">
    </div>
    
    <small class="text" id="name-format" style="--color: var(--color-neutral);">
      Legal name please, not your gaming handle
    </small>
  </fieldset>
  
  <fieldset class="fieldset as-stack" data-entries="2">
    <legend>Account Security</legend>
    
    <div class="field">
      <label class="label" for="username">
        Username <span aria-label="required">*</span>
      </label>
      <input class="input" id="username" type="text" name="username" 
        required aria-required="true"
        pattern="[a-zA-Z0-9_]+"
        aria-describedby="username-help username-error"
        aria-invalid="false"
        autocomplete="username">
      <small class="text" id="username-help">
        Letters, numbers, underscores (no xXx_360NoScope_xXx please)
      </small>
      <p class="text" id="username-error" role="alert" hidden 
        style="--color: var(--color-error);">
        Username already taken (be more creative!)
      </p>
    </div>
    
    <div class="field">
      <label class="label" for="password">
        Password <span aria-label="required">*</span>
      </label>
      <input class="input" id="password" type="password" name="password" 
        required aria-required="true"
        minlength="8"
        aria-describedby="password-strength password-help"
        autocomplete="new-password">
      <small class="text" id="password-help">
        8+ characters (your cat's name + 123 doesn't count)
      </small>
      <progress class="progress" id="password-strength" 
        value="0" max="4" aria-label="Password strength">
        Password strength: Weak
      </progress>
    </div>
  </fieldset>
  
  <button class="button with-interaction" type="submit" 
    style="--bg: var(--color-primary); --size: 1.125rem;">
    🚀 Create Account
  </button>
</form>
```

```css
@layer crisp {
  .fieldset {
    /* Type-safe fieldset styling */
    @property --border-color {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-border);
    }
    
    --padding: var(--space-1-5);
    --radius: var(--radius-md);
    
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: var(--padding);
    
    /* Legend gets special treatment */
    legend {
      padding: 0 var(--space-0-5);
      font-weight: var(--text-weight-semibold);
    }
  }
  
  /* Password strength indicator (pure CSS magic) */
  .progress {
    @property --fill {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-error);
    }
    
    width: 100%;
    height: 0.5rem;
    margin-top: var(--space-0-5);
    
    /* Strength levels */
    &[value="1"] { --fill: oklch(55% 0.20 30); } /* Red - weak */
    &[value="2"] { --fill: oklch(65% 0.20 60); } /* Orange - fair */
    &[value="3"] { --fill: oklch(70% 0.15 120); } /* Yellow - good */
    &[value="4"] { --fill: oklch(65% 0.20 145); } /* Green - strong */
  }
}
```

**The "Aha!"**: Native `<progress>` element for password strength. No JavaScript library needed. The browser already knows how to show progress!

## Form Patterns That Actually Work

### Login Form - The Classic

*Everyone needs a login form. Here's one that doesn't suck.*

```html
<form class="form as-stack" style="--stack-gap: var(--space-1-5);" 
  data-variant="login" aria-label="Login form">
  <h2 class="heading">Welcome Back</h2>
  <p class="text" style="--color: var(--color-neutral);">
    Miss us? We missed you too. (Not really, we're just code)
  </p>
  
  <div class="field">
    <label class="label" for="login-email">Email</label>
    <input class="input" id="login-email" type="email" name="email" 
      required aria-required="true"
      autocomplete="email"
      aria-describedby="login-error"
      aria-invalid="false">
  </div>
  
  <div class="field">
    <label class="label" for="login-password">
      <span>Password</span>
      <a class="link" href="/forgot-password" style="float: right; font-size: 0.875rem;">
        Forgot password?
      </a>
    </label>
    <input class="input" id="login-password" type="password" name="password" 
      required aria-required="true"
      autocomplete="current-password"
      aria-describedby="login-error">
  </div>
  
  <!-- Error message (hidden until needed) -->
  <p class="text" id="login-error" role="alert" hidden 
    style="--color: var(--color-error);">
    Invalid email or password. Try again! (Or click forgot password like everyone else)
  </p>
  
  <label class="label">
    <input class="checkbox" type="checkbox" name="remember" 
      aria-describedby="remember-hint">
    <span>Remember me</span>
  </label>
  <small class="text" id="remember-hint" style="--size: 0.875rem; --color: var(--color-neutral);">
    On a shared computer? Maybe don't.
  </small>
  
  <button class="button with-interaction" type="submit" 
    style="--bg: var(--color-primary); --size: 1.125rem;"
    aria-busy="false">
    <span class="button-text">Sign In</span>
    <span class="spinner" hidden aria-hidden="true"></span>
  </button>
  
  <div class="as-center" style="--stack-gap: var(--space-0-5);">
    <p class="text">Don't have an account? <a class="link" href="/register">Sign up</a></p>
    <p class="text" style="--size: 0.875rem; --color: var(--color-neutral);">
      Or continue being a mysterious stranger 🕵️
    </p>
  </div>
</form>
```

### Multi-Step Form - The Journey

*Because sometimes one screen isn't enough torture*

```html
<form class="form as-stack" data-variant="wizard" aria-label="Registration wizard">
  <!-- Progress indicator (breadcrumbs on steroids) -->
  <nav class="progress as-cluster" aria-label="Form progress" data-entries="3">
    <span class="step" aria-current="step" data-step="1">
      <span aria-hidden="true">1.</span> Account
    </span>
    <span class="step" aria-label="Step 2: Profile" data-step="2">
      <span aria-hidden="true">2.</span> Profile
    </span>
    <span class="step" aria-label="Step 3: Preferences" data-step="3">
      <span aria-hidden="true">3.</span> Preferences
    </span>
  </nav>
  
  <!-- Step 1: The Beginning -->
  <fieldset class="fieldset as-stack" data-step="1" aria-label="Step 1: Account creation">
    <legend>Create Your Account</legend>
    
    <div class="field">
      <label class="label" for="wizard-email">
        Email <span aria-label="required">*</span>
      </label>
      <input class="input" id="wizard-email" type="email" name="email" 
        required aria-required="true"
        autocomplete="email"
        aria-describedby="email-hint">
      <small class="text" id="email-hint">
        We promise not to sell it to Nigerian princes
      </small>
    </div>
    
    <div class="field">
      <label class="label" for="wizard-password">
        Password <span aria-label="required">*</span>
      </label>
      <input class="input" id="wizard-password" type="password" name="password" 
        required aria-required="true"
        minlength="8"
        aria-describedby="password-meter"
        autocomplete="new-password">
      <div class="meter" id="password-meter" role="status" aria-live="polite">
        <progress class="progress" value="0" max="4" aria-label="Password strength">
          Password strength
        </progress>
        <span class="text" style="--size: 0.875rem;" data-strength="weak">
          Weak (my grandma could crack this)
        </span>
      </div>
    </div>
  </fieldset>
  
  <!-- Step 2: Getting Personal -->
  <fieldset class="fieldset as-stack" data-step="2" hidden aria-label="Step 2: Profile details">
    <legend>Tell Us About Yourself</legend>
    
    <div class="field">
      <label class="label" for="display-name">
        Display Name <span aria-label="required">*</span>
      </label>
      <input class="input" id="display-name" type="text" name="display_name" 
        required aria-required="true"
        aria-describedby="name-help"
        autocomplete="nickname">
      <small class="text" id="name-help">
        This is what others will see (choose wisely)
      </small>
    </div>
    
    <div class="field">
      <label class="label" for="bio">
        Bio <span class="text" style="--color: var(--color-neutral);">(optional but fun)</span>
      </label>
      <textarea class="textarea" id="bio" name="bio" rows="4" 
        placeholder="I enjoy long walks on the beach and perfectly semantic HTML..."
        aria-describedby="bio-counter"
        maxlength="200"></textarea>
      <small class="text" id="bio-counter" aria-live="polite">
        <span data-counter="200">200</span> characters remaining
      </small>
    </div>
    
    <div class="field">
      <label class="label" for="avatar">Profile Picture</label>
      <input class="input" id="avatar" type="file" name="avatar" 
        accept="image/*"
        aria-describedby="avatar-help">
      <small class="text" id="avatar-help">
        JPG, PNG, or GIF. No animated GIFs from 2003 please.
      </small>
    </div>
  </fieldset>
  
  <!-- Step 3: The End Game -->
  <fieldset class="fieldset as-stack" data-step="3" hidden aria-label="Step 3: Preferences">
    <legend>Your Preferences</legend>
    
    <div class="field">
      <p class="text">Email Notifications</p>
      <label class="label">
        <input class="checkbox" type="checkbox" name="notifications[]" value="updates" checked>
        <span>Product updates (the good stuff)</span>
      </label>
      <label class="label">
        <input class="checkbox" type="checkbox" name="notifications[]" value="newsletter">
        <span>Weekly newsletter (actually weekly, not daily)</span>
      </label>
      <label class="label">
        <input class="checkbox" type="checkbox" name="notifications[]" value="spam">
        <span>Marketing emails (just kidding, we don't do that)</span>
      </label>
    </div>
    
    <div class="field">
      <label class="label">
        <input class="switch" type="checkbox" name="dark_mode" checked>
        <span>🌙 Dark mode (join the dark side)</span>
      </label>
    </div>
  </fieldset>
  
  <!-- Navigation (the journey controls) -->
  <div class="as-cluster" style="--cluster-align: space-between;" data-entries="3">
    <button class="button" type="button" 
      data-action="previous" 
      aria-label="Go to previous step"
      hidden>
      ← Previous
    </button>
    <button class="button" type="button" 
      data-action="next"
      aria-label="Go to next step">
      Next →
    </button>
    <button class="button" type="submit" 
      hidden 
      style="--bg: var(--color-success); --size: 1.125rem;"
      aria-label="Complete registration">
      🎉 Complete Setup
    </button>
  </div>
</form>
```

```css
@layer crisp {
  /* Step indicators (the breadcrumb's cooler cousin) */
  .step {
    @property --step-color {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-neutral);
    }
    
    --size: 1rem;
    --padding: var(--space-0-5) var(--space-1-0);
    
    color: var(--step-color);
    font-size: var(--size);
    padding: var(--padding);
    
    /* Current step (you are here) */
    &[aria-current="step"] {
      --step-color: var(--color-primary);
      font-weight: var(--text-weight-semibold);
      
      &::before {
        content: "→ ";
      }
    }
    
    /* Completed steps */
    &[data-completed="true"] {
      --step-color: var(--color-success);
      
      &::after {
        content: " ✓";
      }
    }
  }
  
  /* Smooth transitions between steps */
  [data-step] {
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease-out;
    
    &:not([hidden]) {
      opacity: 1;
      transform: translateX(0);
    }
  }
}
```

**The "Aha!"**: Multi-step forms don't need a JavaScript framework. CSS transitions + ARIA attributes = smooth UX.

### Dynamic Form - The Shape-Shifter

*For when you need to add "just one more field" (said no one ever)*

```html
<form class="form as-stack" data-variant="dynamic" aria-label="Dynamic order form">
  <fieldset class="fieldset as-stack">
    <legend>Shopping List (aka "I'll just get one thing")</legend>
    
    <div class="repeater as-stack" role="group" 
      aria-label="Order items" 
      data-entries="1">
      
      <!-- Template for new items (the clone army) -->
      <template id="item-template">
        <div class="field as-cluster" data-entry style="--cluster-gap: var(--space-0-75);">
          <input class="input" type="text" name="items[][name]" 
            placeholder="What do you need?" 
            required aria-required="true"
            aria-label="Item name">
          <input class="input" type="number" name="items[][quantity]" 
            placeholder="How many?" 
            min="1" required aria-required="true"
            style="--width: 120px;"
            aria-label="Quantity">
          <button class="button" type="button" 
            aria-label="Remove this item"
            data-action="remove"
            style="--bg: var(--color-error);">
            <span aria-hidden="true">🗑</span>
            <span class="visually-hidden">Remove</span>
          </button>
        </div>
      </template>
      
      <!-- First item (the gateway drug) -->
      <div class="field as-cluster" data-entry="1" style="--cluster-gap: var(--space-0-75);">
        <input class="input" type="text" name="items[][name]" 
          placeholder="What do you need?" 
          required aria-required="true"
          aria-label="Item 1 name">
        <input class="input" type="number" name="items[][quantity]" 
          placeholder="How many?" 
          min="1" value="1" 
          required aria-required="true"
          style="--width: 120px;"
          aria-label="Item 1 quantity">
        <button class="button" type="button" 
          aria-label="Remove item 1"
          data-action="remove"
          style="--bg: var(--color-error);">
          <span aria-hidden="true">🗑</span>
          <span class="visually-hidden">Remove</span>
        </button>
      </div>
    </div>
    
    <div class="as-cluster" style="--cluster-align: space-between;">
      <button class="button" type="button" 
        data-action="add"
        aria-label="Add another item"
        style="--bg: var(--color-success);">
        <span aria-hidden="true">➕</span> Add Another Item
      </button>
      <small class="text" role="status" aria-live="polite">
        <span data-count="1">1</span> item(s) in list
      </small>
    </div>
  </fieldset>
  
  <div class="as-center">
    <button class="button with-interaction" type="submit" 
      style="--bg: var(--color-primary); --size: 1.125rem;">
      📦 Submit Order
    </button>
    <small class="text" style="--color: var(--color-neutral);">
      Delivery time: Eventually™
    </small>
  </div>
</form>
```

```css
@layer crisp {
  /* Dynamic entries (the multiplying fields) */
  [data-entry] {
    position: relative;
    padding-left: 2rem;
    
    /* Entry numbers (because counting is hard) */
    &::before {
      content: attr(data-entry) ".";
      position: absolute;
      left: 0;
      top: 0.75rem;
      font-weight: var(--text-weight-semibold);
      color: var(--color-neutral);
    }
    
    /* Smooth entry animation */
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Remove animation (goodbye, cruel field) */
  [data-removing="true"] {
    animation: slideOut 0.3s ease-out forwards;
  }
  
  @keyframes slideOut {
    to {
      opacity: 0;
      transform: translateX(-20px);
      height: 0;
      margin: 0;
      padding: 0;
    }
  }
}
```

**Pro tip**: `<template>` is native HTML! Clone it with JavaScript, no framework needed. The browser is smarter than you think.

## Form Validation That Doesn't Traumatize

### HTML5 Validation - The Browser Knows Best

*Let the browser do the work. It's literally built for this.*

```html
<form class="form as-stack" novalidate data-variant="validated" 
  aria-label="Validation example form">
  <!-- Email validation (the classic) -->
  <div class="field">
    <label class="label" for="val-email">
      Email <span aria-label="required">*</span>
    </label>
    <input class="input" id="val-email" type="email" name="email" 
      required aria-required="true"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      aria-describedby="email-hint email-error"
      aria-invalid="false"
      autocomplete="email">
    <small class="text" id="email-hint">
      your@email.com (yes, the @ is mandatory)
    </small>
    <p class="text" id="email-error" role="alert" hidden 
      style="--color: var(--color-error);">
      That's not an email. Nice try though! 🙃
    </p>
  </div>
  
  <!-- Password validation (the security theater) -->
  <div class="field">
    <label class="label" for="val-password">
      Password <span aria-label="required">*</span>
    </label>
    <input class="input" id="val-password" type="password" name="password"
      required aria-required="true"
      minlength="8"
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}"
      aria-describedby="password-requirements password-error"
      aria-invalid="false"
      autocomplete="new-password">
    <div class="text" id="password-requirements" style="--size: 0.875rem;">
      <p style="font-weight: var(--text-weight-semibold);">Password must have:</p>
      <ul class="list as-stack" style="--stack-gap: var(--space-0-25);">
        <li data-check="length">❌ At least 8 characters</li>
        <li data-check="lowercase">❌ One lowercase letter</li>
        <li data-check="uppercase">❌ One UPPERCASE letter</li>
        <li data-check="number">❌ One number</li>
        <li data-check="special">❌ One special character (@$!%*?&)</li>
        <li data-check="emoji">❌ One emoji (just kidding)</li>
      </ul>
    </div>
    <p class="text" id="password-error" role="alert" hidden 
      style="--color: var(--color-error);">
      Password needs more complexity. Maybe try your cat's name + your birthday + !@#
    </p>
  </div>
  
  <!-- Password confirmation (the double-check) -->
  <div class="field">
    <label class="label" for="confirm-password">
      Confirm Password <span aria-label="required">*</span>
    </label>
    <input class="input" id="confirm-password" type="password" 
      name="confirm_password" 
      required aria-required="true"
      aria-describedby="confirm-error"
      aria-invalid="false"
      autocomplete="new-password">
    <p class="text" id="confirm-error" role="alert" hidden 
      style="--color: var(--color-error);">
      Passwords don't match. Copy-paste is your friend here.
    </p>
  </div>
  
  <!-- Terms acceptance (the legal CYA) -->
  <div class="field">
    <label class="label">
      <input class="checkbox" type="checkbox" name="terms" 
        required aria-required="true"
        aria-describedby="terms-error">
      <span>
        I agree to the 
        <a class="link" href="/terms" target="_blank">terms and conditions</a>
        that I definitely read
      </span>
    </label>
    <p class="text" id="terms-error" role="alert" hidden 
      style="--color: var(--color-error);">
      You must pretend to read the terms first
    </p>
  </div>
  
  <button class="button with-interaction" type="submit" 
    style="--bg: var(--color-primary); --size: 1.125rem;">
    Create Account (and hope for the best)
  </button>
</form>
```

### Visual Validation States - Making Errors Beautiful

```css
@layer crisp {
  /* Input validation states (the traffic lights) */
  .input {
    @property --border-color {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-border);
    }
    
    @property --border-width {
      syntax: "<length>";
      inherits: false;
      initial-value: 1px;
    }
    
    /* Base state */
    border: var(--border-width) solid var(--border-color);
    transition: all var(--transition-fast);
    
    /* Invalid (red alert!) */
    &:invalid:not(:focus):not(:placeholder-shown),
    &[aria-invalid="true"] {
      --border-color: var(--color-error);
      --border-width: 2px;
      
      /* Subtle shake animation (for drama) */
      animation: shake 0.3s ease-in-out;
    }
    
    /* Valid (green means go) */
    &:valid:not(:focus):not(:placeholder-shown):required,
    &[aria-invalid="false"]:not(:placeholder-shown) {
      --border-color: var(--color-success);
      --border-width: 2px;
    }
    
    /* Focus (pay attention to me!) */
    &:focus {
      --border-color: var(--color-primary);
      --border-width: 2px;
      outline: 2px solid oklch(from var(--color-primary) l c h / 0.3);
      outline-offset: 2px;
    }
  }
  
  /* Shake animation (wake up!) */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  /* Error messages (the bad news) */
  [role="alert"] {
    @property --alert-color {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-error);
    }
    
    --size: 0.875rem;
    --padding: var(--space-0-5) 0;
    
    color: var(--alert-color);
    font-size: var(--size);
    padding: var(--padding);
    
    /* Entry animation */
    &:not([hidden]) {
      animation: slideDown 0.3s ease-out;
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Loading states (patience, young padawan) */
  .form[aria-busy="true"],
  .form[data-state="loading"] {
    pointer-events: none;
    
    .button[type="submit"] {
      --bg: oklch(from var(--bg) l c h / 0.7);
      cursor: wait;
      
      .spinner {
        display: inline-block;
        animation: spin 1s linear infinite;
      }
      
      .button-text {
        opacity: 0.7;
      }
    }
  }
  
  /* Progress indicators (the journey meter) */
  .progress {
    @property --fill {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-neutral);
    }
    
    --height: 0.5rem;
    --bg: oklch(90% 0.02 250);
    --radius: var(--radius-full);
    
    appearance: none;
    width: 100%;
    height: var(--height);
    background: var(--bg);
    border-radius: var(--radius);
    overflow: hidden;
    
    /* The fill (WebKit) */
    &::-webkit-progress-bar {
      background: var(--bg);
      border-radius: var(--radius);
    }
    
    &::-webkit-progress-value {
      background: var(--fill);
      border-radius: var(--radius);
      transition: width 0.3s ease;
    }
    
    /* The fill (Firefox) */
    &::-moz-progress-bar {
      background: var(--fill);
      border-radius: var(--radius);
    }
    
    /* Strength levels (password edition) */
    &[value="0"] { --fill: oklch(30% 0.02 250); } /* Empty */
    &[value="1"] { --fill: oklch(55% 0.20 30); } /* Weak (red) */
    &[value="2"] { --fill: oklch(65% 0.20 60); } /* Fair (orange) */
    &[value="3"] { --fill: oklch(70% 0.15 90); } /* Good (yellow) */
    &[value="4"] { --fill: oklch(65% 0.20 145); } /* Strong (green) */
  }
  
  /* Checkbox validation (tick or trick) */
  [data-check] {
    &::before {
      display: inline-block;
      width: 1.2em;
      text-align: center;
    }
    
    &[data-valid="true"]::before {
      content: "✅";
    }
    
    &[data-valid="false"]::before {
      content: "❌";
    }
  }
}
```

**The "Aha!"**: CSS animations for validation feedback. No JavaScript state management. The browser tracks validity, CSS makes it pretty.

### Progressive Enhancement Validation

*Because not everyone has JavaScript enabled (shocking, I know)*

```javascript
// Only enhance if JavaScript is available
if ('validity' in document.createElement('input')) {
  // Real-time validation (the helpful friend)
  document.querySelectorAll('.input').forEach(input => {
    // On blur (when they're done typing)
    input.addEventListener('blur', () => {
      const isValid = input.validity.valid;
      const errorEl = document.getElementById(input.getAttribute('aria-describedby')?.split(' ').find(id => id.includes('error')));
      
      // Update ARIA state
      input.setAttribute('aria-invalid', !isValid);
      
      // Show/hide error message
      if (errorEl) {
        errorEl.hidden = isValid;
        if (!isValid) {
          // Custom error messages (be nice!)
          if (input.validity.valueMissing) {
            errorEl.textContent = `Please fill in this field (it's required)`;
          } else if (input.validity.typeMismatch) {
            errorEl.textContent = `That doesn't look like a valid ${input.type}`;
          } else if (input.validity.patternMismatch) {
            errorEl.textContent = `Please match the requested format`;
          } else {
            errorEl.textContent = input.validationMessage;
          }
        }
      }
    });
    
    // Clear error on input (give them hope)
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') {
        input.setAttribute('aria-invalid', 'false');
        const errorEl = document.getElementById(input.getAttribute('aria-describedby')?.split(' ').find(id => id.includes('error')));
        if (errorEl) errorEl.hidden = true;
      }
    });
  });
  
  // Password strength checker (the complexity theater)
  const passwordInput = document.querySelector('input[type="password"][minlength]');
  if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
      const password = e.target.value;
      const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&]/.test(password)
      };
      
      // Update checkmarks
      Object.entries(checks).forEach(([check, valid]) => {
        const el = document.querySelector(`[data-check="${check}"]`);
        if (el) el.setAttribute('data-valid', valid);
      });
      
      // Update progress bar
      const strength = Object.values(checks).filter(Boolean).length;
      const progress = document.querySelector('.progress');
      if (progress) {
        progress.value = strength === 5 ? 4 : strength;
        
        // Update strength text
        const messages = [
          "Password? What password?",
          "Weak (my grandma could crack this)",
          "Fair (getting warmer)",
          "Good (now we're talking)",
          "Strong (hacker-resistant!)"
        ];
        const strengthText = progress.nextElementSibling;
        if (strengthText) {
          strengthText.textContent = messages[strength] || messages[0];
        }
      }
    });
  }
  
  // Form submission (the final boss)
  document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      // Check if form is valid
      if (!form.checkValidity()) {
        e.preventDefault();
        
        // Find first invalid field
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Show all errors
        form.querySelectorAll(':invalid').forEach(field => {
          field.dispatchEvent(new Event('blur'));
        });
        
        return;
      }
      
      // If using AJAX submission
      if (form.hasAttribute('data-ajax')) {
        e.preventDefault();
        form.setAttribute('aria-busy', 'true');
        
        // Show loading state
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.setAttribute('aria-busy', 'true');
          submitBtn.disabled = true;
        }
        
        // Simulate async submission
        try {
          const formData = new FormData(form);
          // await fetch(form.action, { method: form.method, body: formData });
          
          // Success!
          form.innerHTML = `
            <div class="as-center" style="--center-height: 200px;">
              <div class="as-stack" style="text-align: center;">
                <span style="font-size: 3rem;">🎉</span>
                <h2 class="heading">Success!</h2>
                <p class="text">Form submitted successfully. Check your email!</p>
              </div>
            </div>
          `;
        } catch (error) {
          // Handle errors gracefully
          console.error('Form submission failed:', error);
        }
      }
    });
  });
}
```

**Pro tip**: Progressive enhancement means the form works without JavaScript. JS just makes it nicer. That's the CRISP way.

## Form Accessibility - Because Everyone Deserves Good UX

### Labels Are Not Optional (Ever. Period. Full Stop.)

*Placeholder text is not a label. Fight me.*

```html
<!-- ❌ The accessibility nightmare -->
<input class="input" type="text" placeholder="Name">
<!-- Screen reader: "Edit text" (helpful, right?) -->

<!-- ❌ Still wrong (placeholder disappears!) -->
<input class="input" type="text" placeholder="Enter your full name" required>

<!-- ✅ The right way: Visible label -->
<label class="label" for="name">Full Name</label>
<input class="input" id="name" type="text" name="name" 
  placeholder="John Doe" required>

<!-- ✅ Alternative: Wrapped label (no ID needed) -->
<label class="label">
  <span>Full Name</span>
  <input class="input" type="text" name="name" placeholder="John Doe">
</label>

<!-- ✅ Search with hidden label (icon says it all) -->
<label class="visually-hidden" for="search">Search the site</label>
<input class="input" id="search" type="search" 
  placeholder="Search for answers..." 
  aria-label="Search the site">

<!-- ✅ Icon + label (belt and suspenders) -->
<div class="field as-cluster">
  <label class="label" for="email-icon">
    <span aria-hidden="true">📧</span>
    <span class="visually-hidden">Email address</span>
  </label>
  <input class="input" id="email-icon" type="email" name="email">
</div>
```

```css
@layer crisp {
  /* Visually hidden but screen reader visible */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    
    /* Can still receive focus */
    &:focus {
      position: static;
      width: auto;
      height: auto;
      margin: 0;
      overflow: visible;
      clip: auto;
      white-space: normal;
    }
  }
}
```

**The "Aha!"**: Placeholders are hints, not labels. When users start typing, the placeholder disappears. Now they have amnesia about what the field was for. Don't do that to them.

### Error Messages That Actually Help

*"Error: An error occurred" helps nobody. Be specific!*

```html
<!-- ❌ Useless error messages -->
<p class="error">Invalid input</p>
<p class="error">Error</p>
<p class="error">Please correct the errors below</p>
<!-- Where? What errors? HELP ME! -->

<!-- ✅ Helpful error messages with context -->
<div class="field">
  <label class="label" for="email-field">
    Email <span aria-label="required">*</span>
  </label>
  <input class="input" id="email-field" type="email" 
    aria-invalid="true"
    aria-describedby="email-hint email-error"
    aria-errormessage="email-error">
  <small class="text" id="email-hint">
    We'll send your receipt here
  </small>
  <p class="text" id="email-error" role="alert" 
    style="--color: var(--color-error);">
    <strong>Email is missing the @ symbol.</strong> 
    Did you mean user@example.com?
  </p>
</div>

<!-- ✅ Multiple errors (be specific!) -->
<div class="field">
  <label class="label" for="phone">Phone Number</label>
  <input class="input" id="phone" type="tel" 
    aria-invalid="true"
    aria-describedby="phone-format phone-errors">
  <small class="text" id="phone-format">
    Format: (555) 123-4567
  </small>
  <div id="phone-errors" role="alert">
    <p class="text" style="--color: var(--color-error);">
      Phone number has 2 issues:
    </p>
    <ul class="list">
      <li>Missing area code</li>
      <li>Too few digits (need 10)</li>
    </ul>
  </div>
</div>

<!-- ✅ Success messages (positive reinforcement!) -->
<div class="field">
  <label class="label" for="username-check">Username</label>
  <input class="input" id="username-check" type="text" 
    aria-invalid="false"
    aria-describedby="username-status">
  <p class="text" id="username-status" role="status" 
    style="--color: var(--color-success);">
    ✅ Username is available!
  </p>
</div>
```

**Pro tip**: `aria-errormessage` is newer and more semantic than `aria-describedby` for errors. Use both for maximum compatibility.

### Required Fields - The Asterisk Debate

*To * or not to *, that is the question*

```html
<!-- ❌ The confusion method -->
<label>Name *</label> <!-- Is * part of my name? -->
<label>Email*</label> <!-- No space, hard to see -->
<label>Phone <span class="red">*</span></label> <!-- Color only = bad -->

<!-- ✅ Clear required field patterns -->
<form class="form as-stack">
  <!-- Explain the system upfront -->
  <p class="text" style="--size: 0.875rem;">
    <span aria-label="required">*</span> indicates required fields
  </p>
  
  <!-- Visual + semantic markup -->
  <div class="field">
    <label class="label" for="required-name">
      Name <span class="required" aria-label="required">*</span>
    </label>
    <input class="input" id="required-name" type="text" 
      name="name" 
      required aria-required="true">
  </div>
  
  <!-- Optional field (no asterisk) -->
  <div class="field">
    <label class="label" for="optional-nick">
      Nickname 
      <span class="text" style="--size: 0.875rem; --color: var(--color-neutral);">
        (optional)
      </span>
    </label>
    <input class="input" id="optional-nick" type="text" name="nickname">
  </div>
  
  <!-- Alternative: Mark optional fields instead -->
  <div class="field">
    <label class="label" for="alt-email">
      Email
    </label>
    <input class="input" id="alt-email" type="email" 
      required aria-required="true">
  </div>
  
  <div class="field">
    <label class="label" for="alt-company">
      Company <span class="optional">(optional)</span>
    </label>
    <input class="input" id="alt-company" type="text">
  </div>
</form>
```

```css
@layer crisp {
  /* Required indicator */
  .required {
    color: var(--color-error);
    font-weight: var(--text-weight-bold);
    margin-left: 0.25em;
  }
  
  /* Optional indicator */
  .optional {
    color: var(--color-neutral);
    font-size: 0.875em;
    font-weight: var(--text-weight-normal);
    margin-left: 0.5em;
  }
  
  /* Focus styles for required fields */
  [required]:focus,
  [aria-required="true"]:focus {
    outline-color: var(--color-primary);
    outline-width: 3px;
  }
}
```

**The "Aha!"**: Both `required` and `aria-required="true"` together. Belt and suspenders. Some screen readers need one, some need the other. Use both.

## Form Context Patterns - Location, Location, Location

### Checkout Forms - Where Money Changes Hands

```html
<form class="form as-stack" data-variant="checkout" 
  aria-label="Secure checkout">
  <div class="as-cluster" style="--cluster-align: center;">
    <h2 class="heading">🔒 Secure Checkout</h2>
    <span class="text" style="--color: var(--color-success);">
      SSL Encrypted
    </span>
  </div>
  
  <fieldset class="fieldset as-stack" data-variant="billing">
    <legend>Billing Information</legend>
    
    <div class="field">
      <label class="label" for="card-number">
        Card Number <span aria-label="required">*</span>
      </label>
      <input class="input" id="card-number" type="text" 
        name="card_number"
        inputmode="numeric" 
        pattern="[0-9\s]*"
        maxlength="19"
        placeholder="1234 5678 9012 3456"
        autocomplete="cc-number"
        required aria-required="true">
    </div>
    
    <div class="as-cluster" data-entries="2">
      <div class="field">
        <label class="label" for="expiry">
          Expiry <span aria-label="required">*</span>
        </label>
        <input class="input" id="expiry" type="text" 
          name="expiry"
          placeholder="MM/YY"
          pattern="[0-9]{2}/[0-9]{2}"
          inputmode="numeric"
          autocomplete="cc-exp"
          required aria-required="true">
      </div>
      
      <div class="field">
        <label class="label" for="cvv">
          CVV <span aria-label="required">*</span>
        </label>
        <input class="input" id="cvv" type="text" 
          name="cvv"
          pattern="[0-9]{3,4}"
          inputmode="numeric"
          autocomplete="cc-csc"
          required aria-required="true"
          aria-describedby="cvv-help">
        <small class="text" id="cvv-help">
          3 digits on back
        </small>
      </div>
    </div>
  </fieldset>
  
  <div class="summary card" style="--bg: oklch(95% 0.05 120);">
    <h3 class="heading">Order Summary</h3>
    <dl class="as-stack" style="--stack-gap: var(--space-0-5);">
      <div class="as-cluster" style="--cluster-align: space-between;">
        <dt>Subtotal:</dt>
        <dd>$99.00</dd>
      </div>
      <div class="as-cluster" style="--cluster-align: space-between;">
        <dt>Tax:</dt>
        <dd>$8.91</dd>
      </div>
      <div class="as-cluster" style="--cluster-align: space-between; font-weight: bold;">
        <dt>Total:</dt>
        <dd>$107.91</dd>
      </div>
    </dl>
  </div>
  
  <button class="button with-interaction" type="submit" 
    style="--bg: var(--color-success); --size: 1.25rem; --padding: var(--space-1-0) var(--space-3-0);">
    💳 Complete Purchase - $107.91
  </button>
  
  <p class="text as-center" style="--size: 0.875rem; --color: var(--color-neutral);">
    <span aria-hidden="true">🔒</span> Your payment info is encrypted and secure
  </p>
</form>
```

### Admin Forms - With Great Power...

```html
<form class="form as-stack" data-variant="admin" 
  aria-label="Admin configuration">
  <div class="alert" data-variant="warning" role="alert">
    <strong>⚠️ Admin Mode:</strong> Changes here affect all users. 
    No pressure.
  </div>
  
  <h2 class="heading">🔧 System Settings</h2>
  
  <fieldset class="fieldset as-stack" data-variant="danger-zone">
    <legend>☠️ Danger Zone</legend>
    
    <div class="field">
      <label class="label" for="confirm-delete">
        Type "DELETE EVERYTHING" to confirm
      </label>
      <input class="input" id="confirm-delete" type="text" 
        pattern="DELETE EVERYTHING"
        aria-describedby="delete-warning"
        style="--border-color: var(--color-error);">
      <p class="text" id="delete-warning" style="--color: var(--color-error);">
        This will delete all data. Forever. No takebacks.
      </p>
    </div>
    
    <button class="button" type="submit" 
      style="--bg: var(--color-error);"
      disabled
      aria-describedby="delete-confirm">
      🗑 Delete Everything
    </button>
    <small class="text" id="delete-confirm">
      Button enables when you type the magic words
    </small>
  </fieldset>
</form>
```

```css
@layer crisp {
  /* Checkout context (money time) */
  [data-variant="checkout"] {
    --bg: oklch(98% 0.01 120);
    --padding: var(--space-2-0);
    --radius: var(--radius-lg);
    
    background: var(--bg);
    padding: var(--padding);
    border-radius: var(--radius);
    border: 2px solid var(--color-success);
    
    /* Bigger submit button (it's important!) */
    .button[type="submit"] {
      width: 100%;
      font-size: var(--text-size-1-25);
      padding: var(--space-1-0) var(--space-2-0);
      
      /* Pulse animation (subtle urgency) */
      animation: pulse 2s ease-in-out infinite;
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  
  /* Admin context (serious business) */
  [data-variant="admin"] {
    --border: 2px solid var(--color-warning);
    
    border: var(--border);
    
    /* All inputs get warning borders */
    .input {
      --border-color: var(--color-warning);
    }
    
    /* Danger zone (here be dragons) */
    [data-variant="danger-zone"] {
      --bg: oklch(95% 0.10 30);
      --border: 2px dashed var(--color-error);
      
      background: var(--bg);
      border: var(--border);
      
      /* Shake on hover (are you sure?) */
      &:hover {
        animation: shake 0.5s ease-in-out;
      }
    }
  }
  
  /* Dark theme adjustments */
  [data-theme="dark"] {
    [data-variant="checkout"] {
      --bg: oklch(20% 0.05 120);
    }
    
    [data-variant="admin"] {
      --bg: oklch(15% 0.05 30);
    }
  }
}
```

**The "Aha!"**: Context flows down through data attributes. No need for `.checkout-form-input-field-required`. Just `[data-variant="checkout"] .input`.

## Form Best Practices - The Commandments

### 1. Progressive Enhancement (It's Not Dead)

*Build for 1999, enhance for 2025*

```html
<!-- Level 1: Pure HTML (works in Lynx!) -->
<form class="form" method="post" action="/api/submit">
  <label for="basic-email">Email</label>
  <input id="basic-email" type="email" name="email" required>
  <button type="submit">Submit</button>
</form>

<!-- Level 2: Enhanced with CSS (pretty!) -->
<form class="form as-stack" method="post" action="/api/submit">
  <div class="field">
    <label class="label" for="enhanced-email">Email</label>
    <input class="input" id="enhanced-email" type="email" 
      name="email" required>
  </div>
  <button class="button" type="submit">Submit</button>
</form>

<!-- Level 3: Turbo-charged with JS (if available) -->
<script type="module">
// Only enhance if the browser is capable
if ('fetch' in window && 'FormData' in window) {
  document.querySelectorAll('form[action^="/api/"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      // Still submits normally if JS fails!
      if (!navigator.onLine) return;
      
      e.preventDefault();
      const formData = new FormData(form);
      
      // Visual feedback
      form.setAttribute('aria-busy', 'true');
      
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData
        });
        
        if (response.ok) {
          // Success animation
          form.style.transition = 'all 0.5s ease-out';
          form.style.transform = 'scale(0.95)';
          form.style.opacity = '0';
          
          setTimeout(() => {
            form.innerHTML = `
              <div class="as-center" style="--center-height: 300px;">
                <div class="as-stack" style="text-align: center;">
                  <span style="font-size: 4rem;">✅</span>
                  <h2 class="heading">Success!</h2>
                  <p class="text">Check your email for confirmation</p>
                </div>
              </div>
            `;
            form.style.transform = 'scale(1)';
            form.style.opacity = '1';
          }, 500);
        }
      } catch (error) {
        // Let the form submit normally
        form.submit();
      }
    });
  });
}
</script>
```

**The "Aha!"**: JavaScript breaks? Form still works. CSS fails to load? Form still works. This is the web. Embrace it.

### 2. Autocomplete Everything (Be a Hero)

*Your users have filled out 47,000 forms. Help them out!*

```html
<!-- ❌ Making users type everything again -->
<input type="text" name="name">
<input type="text" name="email">
<input type="text" name="phone">

<!-- ✅ The autocomplete buffet -->
<!-- Personal info -->
<input class="input" type="text" autocomplete="name" name="name">
<input class="input" type="text" autocomplete="given-name" name="first_name">
<input class="input" type="text" autocomplete="family-name" name="last_name">
<input class="input" type="email" autocomplete="email" name="email">
<input class="input" type="tel" autocomplete="tel" name="phone">
<input class="input" type="text" autocomplete="organization" name="company">

<!-- Address (the full treatment) -->
<input class="input" type="text" autocomplete="street-address" name="address">
<input class="input" type="text" autocomplete="address-line1" name="address1">
<input class="input" type="text" autocomplete="address-line2" name="address2">
<input class="input" type="text" autocomplete="address-level2" name="city">
<input class="input" type="text" autocomplete="address-level1" name="state">
<input class="input" type="text" autocomplete="postal-code" name="zip">
<input class="input" type="text" autocomplete="country-name" name="country">

<!-- Payment (ka-ching!) -->
<input class="input" type="text" autocomplete="cc-name" name="cardholder">
<input class="input" type="text" autocomplete="cc-number" name="cardnumber">
<input class="input" type="text" autocomplete="cc-exp" name="expiry">
<input class="input" type="text" autocomplete="cc-csc" name="cvv">

<!-- Account (the classics) -->
<input class="input" type="text" autocomplete="username" name="username">
<input class="input" type="password" autocomplete="current-password" name="password">
<input class="input" type="password" autocomplete="new-password" name="new_password">

<!-- Bonus: One-time codes -->
<input class="input" type="text" autocomplete="one-time-code" name="otp"
  inputmode="numeric" pattern="[0-9]{6}">
```

**Pro tip**: Combine `autocomplete` with proper `type` and `inputmode`. Triple threat of good UX!

### 3. Mobile Keyboards - The Right Tool for the Job

*Stop making people switch keyboards 47 times per form*

```html
<!-- ❌ Desktop-first thinking -->
<input type="text" placeholder="Phone"> <!-- Full keyboard for numbers?! -->
<input type="text" placeholder="Email"> <!-- Where's the @ key? -->
<input type="text" placeholder="Website"> <!-- Good luck typing https:// -->

<!-- ✅ Mobile-optimized inputs -->
<!-- Numbers only (PIN, verification codes) -->
<input class="input" 
  type="text" 
  inputmode="numeric" 
  pattern="[0-9]*"
  placeholder="123456"
  autocomplete="one-time-code">

<!-- Phone numbers (with formatting) -->
<input class="input" 
  type="tel" 
  inputmode="tel"
  placeholder="(555) 123-4567"
  autocomplete="tel">

<!-- Decimal numbers (prices, measurements) -->
<input class="input" 
  type="text" 
  inputmode="decimal"
  pattern="[0-9]*[\.]?[0-9]*"
  placeholder="99.99">

<!-- Email (with @ and .com shortcuts) -->
<input class="input" 
  type="email" 
  inputmode="email"
  autocomplete="email"
  placeholder="you@example.com">

<!-- URLs (with .com key) -->
<input class="input" 
  type="url" 
  inputmode="url"
  placeholder="https://example.com">

<!-- Search (with search key) -->
<input class="input" 
  type="search" 
  inputmode="search"
  enterkeyhint="search"
  placeholder="Search products...">

<!-- Bonus: Enter key hints -->
<input class="input" type="text" enterkeyhint="next"> <!-- → Next -->
<input class="input" type="text" enterkeyhint="done"> <!-- ✓ Done -->
<input class="input" type="text" enterkeyhint="go"> <!-- → Go -->
<input class="input" type="text" enterkeyhint="search"> <!-- 🔍 Search -->
<input class="input" type="text" enterkeyhint="send"> <!-- ↗ Send -->
```

**The "Aha!"**: `inputmode` changes the virtual keyboard. `type` handles validation. `enterkeyhint` customizes the enter key. Your mobile users will love you.

### 4. Clear Actions - What Happens When I Click This?

*Make the primary action impossible to miss*

```html
<!-- ❌ Button soup (which one do I click?!) -->
<button>Submit</button>
<button>Save</button>
<button>Continue</button>
<button>OK</button>
<button>Cancel</button>

<!-- ✅ Clear hierarchy of actions -->
<!-- Primary action (the main event) -->
<div class="as-cluster" style="--cluster-align: flex-end;" data-entries="2">
  <button class="button" type="button" 
    style="--bg: transparent; --color: var(--color-neutral);">
    Cancel
  </button>
  <button class="button with-interaction" type="submit" 
    style="--bg: var(--color-primary); 
           --size: 1.125rem; 
           --padding: var(--space-0-75) var(--space-2-0);">
    💾 Save Changes
  </button>
</div>

<!-- Destructive action (danger!) -->
<div class="as-cluster" style="--cluster-align: space-between;" data-entries="2">
  <button class="button" type="button">
    ← Go Back
  </button>
  <button class="button" type="submit" 
    style="--bg: var(--color-error); --color: white;"
    aria-describedby="delete-warning">
    🗑 Delete Forever
  </button>
</div>
<small class="text" id="delete-warning" style="--color: var(--color-error);">
  This cannot be undone!
</small>

<!-- Multi-step actions (the journey) -->
<div class="as-cluster" style="--cluster-align: space-between;" data-entries="3">
  <button class="button" type="button" 
    style="--bg: transparent;">
    ← Previous
  </button>
  <button class="button" type="button" 
    style="--bg: transparent; --color: var(--color-neutral);">
    Skip for now
  </button>
  <button class="button with-interaction" type="button" 
    style="--bg: var(--color-primary);">
    Next Step →
  </button>
</div>

<!-- Loading states (patience indicator) -->
<button class="button" type="submit" 
  aria-busy="true" 
  disabled
  style="--bg: var(--color-primary);">
  <span class="spinner" aria-hidden="true">⏳</span>
  <span>Processing... Please wait</span>
</button>
```

```css
@layer crisp {
  /* Primary actions stand out */
  .button[type="submit"]:not([style*="--bg"]) {
    --bg: var(--color-primary);
    --color: var(--color-on-primary);
  }
  
  /* Secondary actions fade back */
  .button[type="button"]:not([style*="--bg"]) {
    --bg: var(--color-neutral-light);
    --color: var(--color-text);
  }
  
  /* Disabled state (can't touch this) */
  .button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    /* Remove hover effects */
    &:hover {
      transform: none;
    }
  }
  
  /* Loading animation */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .spinner {
    display: inline-block;
    animation: spin 1s linear infinite;
  }
}
```

**The "Aha!"**: Primary action = biggest, brightest, rightmost. Secondary = subtle. Destructive = red and scary. Users' muscle memory will thank you.

## The Form Liberation Manifesto

### What We've Achieved

1. **Semantic HTML First** - `<label>`, `<fieldset>`, `<legend>` actually mean something
2. **ARIA Everywhere** - `aria-invalid`, `aria-describedby`, `aria-required` for everyone
3. **Progressive Enhancement** - Works without CSS, better with CSS, best with JS
4. **Mobile-First Inputs** - Right keyboard, right time, every time
5. **Clear Visual Hierarchy** - Primary actions obvious, errors helpful
6. **Context via Data Attributes** - `data-variant="checkout"` not `.form--checkout--secure--final--v2`
7. **Native Validation** - Let the browser help (it wants to!)

### The Ultimate "Aha!"

Forms aren't about collecting data. They're about having a conversation. Make that conversation pleasant, and users will actually complete your forms.

No more 47-field monstrosities. No more mystery meat error messages. No more "Is the asterisk before or after the label?" debates.

Just forms that work. For everyone. On everything.

### Real-World Impact

```css
/* Old way: 500+ lines of form CSS */
.form { }
.form-group { }
.form-control { }
.form-control-lg { }
.form-control-sm { }
.form-label { }
.form-text { }
/* ... 493 more classes */

/* CRISP way: ~50 lines */
@layer crisp {
  .form { /* One class */ }
  .input { /* Covers all inputs */ }
  .label { /* Simple */ }
  /* Context handles the rest */
}
```

**Conversion rate improvement**: When forms are this easy to fill out, people actually fill them out. Shocking, I know.

And when the designer asks for "enterprise-grade admin forms with enhanced security visuals"? You don't create 47 new classes. You add `data-variant="admin" data-security="enhanced"` and write 5 lines of CSS.

That's not just a framework. That's freedom.

Welcome to forms that users actually complete. 🎉

→ Continue to [Chapter 11: Feedback That Actually Helps](./C11-feedback.md)