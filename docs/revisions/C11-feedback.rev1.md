# Chapter 11: Talking Back to Users

*Or: How to communicate without being annoying*

## The Feedback Fiasco

Remember notification systems like this?

```javascript
// The old chaos
showError('Error!');
displayAlert('success', 'Saved!', 'top-right', 5000, true, 'fade');
$.notify({message: 'Info'}, {type: 'info', placement: {from: 'bottom'}});
toastr.warning('Warning!', 'Title', {timeOut: 3000, progressBar: true});
new Notification('custom-alert alert-danger alert-dismissible fade show');

// 5 different libraries, 47 different APIs
```

## The CRISP Feedback Philosophy

Feedback should be helpful, not intrusive. Inform, don't interrupt.

## Static Feedback

### Alert - Important Messages

```html
<!-- Info alert -->
<aside class="alert" role="note">
  <strong>Note:</strong> Your changes have been saved as a draft.
</aside>

<!-- Success alert -->
<aside class="alert" role="status" data-variant="success">
  <strong>Success!</strong> Your order has been confirmed.
</aside>

<!-- Warning alert -->
<aside class="alert" role="alert" data-variant="warning">
  <strong>Warning:</strong> Your subscription expires in 3 days.
</aside>

<!-- Error alert -->
<aside class="alert" role="alert" data-variant="error">
  <strong>Error:</strong> Unable to process payment. Please try again.
</aside>

<!-- Dismissible alert -->
<aside class="alert with-dismiss" role="note">
  <p>This is a dismissible message.</p>
  <button class="button" type="button" aria-label="Close alert" onclick="this.parentElement.remove()">
    ×
  </button>
</aside>

<!-- Complex alert -->
<aside class="alert as-stack" role="alert" data-variant="warning">
  <h3 class="heading" style="--size: var(--text-size-1-25);">
    Storage Almost Full
  </h3>
  <p class="text">You're using 9.5 GB of your 10 GB storage quota.</p>
  <div class="as-cluster">
    <button class="button" onclick="upgradeStorage()">Upgrade Storage</button>
    <button class="button" onclick="manageFiles()">Manage Files</button>
  </div>
</aside>

<!-- Context-aware alert -->
<aside class="alert" role="alert" data-variant="admin info">
  <strong>Admin Notice:</strong> System maintenance scheduled for tonight.
</aside>
```

CSS for alerts:
```css
.alert {
  /* 1. Define defaults */
  --padding: var(--space-1-0) var(--space-1-5);
  --radius: var(--radius-md);
  --bg: var(--color-info-light);
  --border-width: 4px;
  --border-color: var(--color-info);
  
  /* 2. Use the tokens */
  padding: var(--padding);
  border-radius: var(--radius);
  background: var(--bg);
  border-left: var(--border-width) solid var(--border-color);
}

/* Variant styling */
[data-variant="success"] {
  --bg: var(--color-success-light);
  --border-color: var(--color-success);
}

[data-variant="warning"] {
  --bg: var(--color-warning-light);
  --border-color: var(--color-warning);
}

[data-variant="error"] {
  --bg: var(--color-danger-light);
  --border-color: var(--color-danger);
}

/* Context modifications */
[data-variant="admin"] .alert {
  --border-color: var(--color-admin);
  --bg: var(--color-admin-light);
}
```

### Badge - Status Indicators

```html
<!-- Count badge -->
<span class="badge">42</span>

<!-- Status badges -->
<span class="badge" data-variant="success">Active</span>
<span class="badge" data-variant="warning">Pending</span>
<span class="badge" data-variant="error">Offline</span>

<!-- In context -->
<button class="button">
  Messages 
  <span class="badge" style="--bg: var(--color-danger);">3</span>
</button>

<!-- With labels -->
<nav class="navigation">
  <a class="link" href="/inbox">
    Inbox
    <span class="badge" aria-label="3 unread messages">3</span>
  </a>
  <a class="link" href="/drafts">
    Drafts
    <span class="badge" aria-label="1 draft">1</span>
  </a>
</nav>

<!-- Context-aware badges -->
<span class="badge" data-variant="premium">PRO</span>
```

```css
.badge {
  /* 1. Define defaults */
  --bg: var(--color-neutral);
  --color: white;
  --size: var(--text-size-sm);
  --padding: var(--space-0-25) var(--space-0-5);
  --radius: var(--radius-full);
  
  /* 2. Use the tokens */
  background: var(--bg);
  color: var(--color);
  font-size: var(--size);
  padding: var(--padding);
  border-radius: var(--radius);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5em;
}

[data-variant="success"] { --bg: var(--color-success); }
[data-variant="warning"] { --bg: var(--color-warning); }
[data-variant="error"] { --bg: var(--color-danger); }

[data-variant="premium"] {
  --bg: var(--color-gold);
  --color: var(--color-neutral-dark);
}
```

### Tag - Content Labels

```html
<!-- Basic tags -->
<span class="tag">JavaScript</span>
<span class="tag">CSS</span>
<span class="tag">HTML</span>

<!-- Removable tags -->
<span class="tag with-remove">
  React
  <button class="remove" aria-label="Remove React tag" onclick="removeTag(this)">
    ×
  </button>
</span>

<!-- Tag groups -->
<div class="tags as-cluster" style="--cluster-gap: var(--space-0-5);">
  <span class="tag">Frontend</span>
  <span class="tag">Backend</span>
  <span class="tag">DevOps</span>
  <span class="tag">UI/UX</span>
</div>

<!-- Colored tags -->
<span class="tag" style="--bg: var(--color-primary-light); --color: var(--color-primary-dark);">
  Featured
</span>

<!-- Context tags -->
<span class="tag" data-variant="premium">Premium</span>
<span class="tag" data-variant="primary">Important</span>
```

```css
.tag {
  /* 1. Define defaults */
  --bg: var(--color-neutral-light);
  --color: var(--color-neutral-dark);
  --padding: var(--space-0-25) var(--space-0-75);
  --radius: var(--radius-sm);
  --size: var(--text-size-sm);
  
  /* 2. Use the tokens */
  background: var(--bg);
  color: var(--color);
  padding: var(--padding);
  border-radius: var(--radius);
  font-size: var(--size);
  display: inline-flex;
  align-items: center;
  gap: var(--space-0-5);
}
```

## Dynamic Feedback

### Toast - Temporary Notifications

```html
<!-- Toast container -->
<div class="toasts" role="region" aria-live="polite" aria-label="Notifications">
  <!-- Toasts will be inserted here -->
</div>

<!-- Toast template -->
<template id="toast-template">
  <div class="toast as-cluster" role="status">
    <p class="text">Message here</p>
    <button class="button" aria-label="Dismiss">×</button>
  </div>
</template>

<!-- Context-aware toasts -->
<div class="toasts" data-variant="admin">
  <!-- Admin-styled toasts appear here -->
</div>
```

CSS for positioning:
```css
.toasts {
  /* 1. Define defaults */
  --position-top: var(--space-1-0);
  --position-right: var(--space-1-0);
  --max-width: 400px;
  --toast-gap: var(--space-0-5);
  
  /* 2. Use the tokens */
  position: fixed;
  top: var(--position-top);
  right: var(--position-right);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--toast-gap);
  max-width: var(--max-width);
}

.toast {
  /* 1. Define defaults */
  --bg: var(--color-neutral-dark);
  --color: white;
  --padding: var(--space-1-0) var(--space-1-5);
  --radius: var(--radius-md);
  --shadow: var(--shadow-elevated);
  
  /* 2. Use the tokens */
  background: var(--bg);
  color: var(--color);
  padding: var(--padding);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  animation: slide-in 250ms ease-out;
}

/* Variant toasts */
.toast[data-variant="success"] { --bg: var(--color-success); }
.toast[data-variant="warning"] { --bg: var(--color-warning); }
.toast[data-variant="error"] { --bg: var(--color-danger); }

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast[data-variant="removing"] {
  animation: slide-out 250ms ease-in forwards;
}

@keyframes slide-out {
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
```

JavaScript helper:
```javascript
function showToast(message, variant = 'info', duration = 5000) {
  const container = document.querySelector('.toasts');
  const template = document.getElementById('toast-template');
  const toast = template.content.cloneNode(true);
  
  // Set message
  toast.querySelector('.text').textContent = message;
  
  // Set variant
  const toastEl = toast.querySelector('.toast');
  if (variant !== 'info') {
    toastEl.setAttribute('data-variant', variant);
  }
  
  // Add to container
  container.appendChild(toast);
  
  // Get the actual element
  const addedToast = container.lastElementChild;
  
  // Dismiss button
  addedToast.querySelector('button').onclick = () => {
    removeToast(addedToast);
  };
  
  // Auto-dismiss
  if (duration > 0) {
    setTimeout(() => removeToast(addedToast), duration);
  }
}

function removeToast(toast) {
  toast.setAttribute('data-variant', 'removing');
  toast.addEventListener('animationend', () => toast.remove());
}

// Usage
showToast('File saved successfully', 'success');
showToast('Network error, retrying...', 'error', 0); // No auto-dismiss
```

### Progress - Loading States

```html
<!-- Determinate progress -->
<progress class="progress" value="75" max="100">
  75% complete
</progress>

<!-- With label -->
<div class="field">
  <div class="as-cluster" style="--cluster-align: space-between;">
    <label class="label">Uploading file...</label>
    <span class="text">75%</span>
  </div>
  <progress class="progress" value="75" max="100"></progress>
</div>

<!-- Indeterminate progress -->
<progress class="progress">Loading...</progress>

<!-- Context-aware progress -->
<progress class="progress" value="50" max="100" data-variant="danger">
  Critical operation in progress
</progress>

<!-- Circular progress (CSS) -->
<div class="progress-circle" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <span class="text">75%</span>
</div>

<!-- Step progress -->
<div class="progress-steps as-cluster" role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="4">
  <span class="step" data-variant="completed">1</span>
  <span class="step" data-variant="completed">2</span>
  <span class="step" data-variant="current">3</span>
  <span class="step">4</span>
</div>
```

```css
.progress {
  /* 1. Define defaults */
  --bg: var(--color-neutral-light);
  --fill: var(--color-primary);
  --height: 0.5rem;
  --radius: var(--radius-full);
  
  /* 2. Use the tokens */
  appearance: none;
  width: 100%;
  height: var(--height);
  background: var(--bg);
  border-radius: var(--radius);
  overflow: hidden;
}

.progress::-webkit-progress-bar {
  background: var(--bg);
}

.progress::-webkit-progress-value {
  background: var(--fill);
}

/* Context modifications */
[data-variant="danger"] {
  --fill: var(--color-danger);
}

/* Step states */
.step[data-variant="completed"] {
  --bg: var(--color-success);
  --color: white;
}

.step[data-variant="current"] {
  --bg: var(--color-primary);
  --color: white;
}
```

### Loading States

```html
<!-- Skeleton loading -->
<article class="card as-stack">
  <div class="skeleton" style="--height: 2rem; --width: 60%;"></div>
  <div class="skeleton" style="--height: 1rem;"></div>
  <div class="skeleton" style="--height: 1rem;"></div>
  <div class="skeleton" style="--height: 1rem; --width: 80%;"></div>
</article>

<!-- Loading overlay -->
<div class="loading-overlay as-center" data-variant="active">
  <div class="spinner" role="status" aria-label="Loading">
    <span class="sr-only">Loading...</span>
  </div>
</div>

<!-- Inline loading -->
<button class="button" disabled aria-busy="true" data-variant="loading">
  <span class="spinner" style="--size: 1em;"></span>
  Saving...
</button>
```

CSS for loading states:
```css
/* Skeleton */
.skeleton {
  /* 1. Define defaults */
  --height: 1rem;
  --width: 100%;
  --radius: var(--radius-sm);
  --bg-gradient: linear-gradient(
    90deg,
    var(--color-neutral-light) 25%,
    var(--color-neutral) 50%,
    var(--color-neutral-light) 75%
  );
  
  /* 2. Use the tokens */
  height: var(--height);
  width: var(--width);
  background: var(--bg-gradient);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: var(--radius);
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Spinner */
.spinner {
  /* 1. Define defaults */
  --size: 2rem;
  --border-width: 2px;
  --border-color: var(--color-neutral);
  --active-color: var(--color-primary);
  
  /* 2. Use the tokens */
  width: var(--size);
  height: var(--size);
  border: var(--border-width) solid var(--border-color);
  border-top-color: var(--active-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## Validation Feedback

### Inline Validation

```html
<!-- Field with validation feedback -->
<div class="field">
  <label class="label" for="username">Username</label>
  <input class="input" id="username" type="text" 
    aria-invalid="false"
    aria-describedby="username-feedback"
    data-variant="valid">
  <small class="feedback" id="username-feedback" data-variant="success">
    ✓ Username is available
  </small>
</div>

<!-- Password strength -->
<div class="field">
  <label class="label" for="password">Password</label>
  <input class="input" id="password" type="password" 
    aria-describedby="password-strength">
  <div class="strength-indicator" id="password-strength" data-strength="medium">
    <div class="strength-bar" style="--strength: 60%;"></div>
    <small class="text">Medium strength</small>
  </div>
</div>

<!-- Form-level feedback -->
<form class="form as-stack" data-variant="error">
  <div class="alert" role="alert" data-variant="error">
    <strong>Please fix the following errors:</strong>
    <ul class="list">
      <li>Email is required</li>
      <li>Password must be at least 8 characters</li>
    </ul>
  </div>
  
  <!-- Form fields... -->
</form>
```

```css
.strength-indicator {
  /* 1. Define defaults */
  --height: 4px;
  --bar-bg: var(--color-neutral-light);
  --bar-fill: var(--color-neutral);
  
  /* 2. Use the tokens */
  margin-top: var(--space-0-5);
}

.strength-bar {
  height: var(--height);
  background: var(--bar-bg);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.strength-bar::before {
  content: '';
  display: block;
  height: 100%;
  width: var(--strength, 0%);
  background: var(--bar-fill);
  transition: width 300ms ease;
}

/* Strength levels */
[data-strength="weak"] { --bar-fill: var(--color-danger); }
[data-strength="medium"] { --bar-fill: var(--color-warning); }
[data-strength="strong"] { --bar-fill: var(--color-success); }
```

## Accessibility Considerations

### Live Regions

```html
<!-- Polite announcements (waits for screen reader to finish) -->
<div role="status" aria-live="polite">
  <p>Form saved automatically</p>
</div>

<!-- Assertive announcements (interrupts screen reader) -->
<div role="alert" aria-live="assertive">
  <p>Error: Unable to save. Please try again.</p>
</div>

<!-- Progress announcements -->
<div role="progressbar" aria-live="polite" aria-busy="true">
  <p>Processing... <span aria-valuenow="45">45%</span> complete</p>
</div>
```

### Focus Management

```javascript
// After showing an error
const firstError = document.querySelector('[aria-invalid="true"]');
if (firstError) {
  firstError.focus();
  firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// After dismissing a modal
const trigger = document.querySelector('[aria-controls="modal"]');
trigger.focus();

// After dynamic content loads
const newContent = document.querySelector('.new-content');
newContent.setAttribute('tabindex', '-1');
newContent.focus();
```

## Context-Aware Feedback

```html
<!-- Admin context feedback -->
<div data-variant="admin">
  <aside class="alert" role="alert">
    Admin-specific styling automatically applied
  </aside>
</div>

<!-- Checkout context -->
<div data-variant="checkout">
  <div class="toasts">
    <!-- Success messages styled for checkout -->
  </div>
</div>
```

```css
/* Context modifications */
[data-variant="admin"] .alert {
  --border-color: var(--color-admin);
  --bg: var(--color-admin-light);
}

[data-variant="checkout"] .toast[data-variant="success"] {
  --bg: var(--color-success);
  --size: var(--text-size-lg);
}
```

## Feedback Best Practices

### 1. Be Contextual
```html
<!-- ❌ Vague -->
<aside class="alert">Error occurred</aside>

<!-- ✅ Specific -->
<aside class="alert" data-variant="error">
  <strong>Payment Failed:</strong> Your card was declined. 
  Please check your card details and try again.
</aside>
```

### 2. Offer Solutions
```html
<!-- ❌ Dead end -->
<aside class="alert" data-variant="error">File upload failed</aside>

<!-- ✅ Helpful -->
<aside class="alert as-stack" data-variant="error">
  <p><strong>Upload Failed:</strong> File size exceeds 10MB limit.</p>
  <div class="as-cluster">
    <button class="button" onclick="compressFile()">Compress File</button>
    <button class="button" onclick="selectDifferentFile()">Choose Another</button>
  </div>
</aside>
```

### 3. Match Severity
```javascript
// Info: Non-critical information
showToast('Tip: Use keyboard shortcuts for faster editing', 'info');

// Success: Confirm completion
showToast('Profile updated successfully', 'success');

// Warning: Important but not critical
showToast('Your session expires in 5 minutes', 'warning');

// Error: Critical issues
showToast('Failed to save. Please try again.', 'error', 0);
```

### 4. Don't Overwhelm
```javascript
// Debounce notifications
let toastQueue = [];
let isShowingToast = false;

function queueToast(message, variant) {
  toastQueue.push({ message, variant });
  if (!isShowingToast) showNextToast();
}

function showNextToast() {
  if (toastQueue.length === 0) {
    isShowingToast = false;
    return;
  }
  
  isShowingToast = true;
  const { message, variant } = toastQueue.shift();
  showToast(message, variant);
  
  // Show next after delay
  setTimeout(showNextToast, 300);
}
```

## The Feedback Liberation

With CRISP feedback:
- Clear communication patterns
- Accessible by default
- No dependency on toast libraries
- Consistent visual language
- Variant-aware styling
- Users stay informed, not annoyed

Your app communicates clearly. Users feel confident. Trust is built.

And when the PM asks for "admin notifications that feel more authoritative"? You don't create `.alert--admin-authoritative`. You add `data-variant="admin"` and style once. That's the power of semantic feedback.

→ Continue to [Chapter 12: From CSS to Enterprise Without Changing HTML](./C12-progressive.md)