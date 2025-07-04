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
<aside class="alert with-success" role="status">
  <strong>Success!</strong> Your order has been confirmed.
</aside>

<!-- Warning alert -->
<aside class="alert with-warning" role="alert">
  <strong>Warning:</strong> Your subscription expires in 3 days.
</aside>

<!-- Error alert -->
<aside class="alert with-error" role="alert">
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
<aside class="alert as-stack with-warning" role="alert">
  <h3 class="heading" style="--heading-size: var(--text-size-1-25);">
    Storage Almost Full
  </h3>
  <p class="text">You're using 9.5 GB of your 10 GB storage quota.</p>
  <div class="as-cluster">
    <button class="button" onclick="upgradeStorage()">Upgrade Storage</button>
    <button class="button" onclick="manageFiles()">Manage Files</button>
  </div>
</aside>
```

CSS for variants:
```css
.alert {
  padding: var(--alert-padding, var(--space-1-0) var(--space-1-5));
  border-radius: var(--radius-md);
  background: var(--alert-bg, var(--colour-info-10));
  border-left: 4px solid var(--alert-border, var(--colour-info-50));
}

.alert.with-success {
  --alert-bg: var(--colour-success-10);
  --alert-border: var(--colour-success-50);
}

.alert.with-warning {
  --alert-bg: var(--colour-warning-10);
  --alert-border: var(--colour-warning-50);
}

.alert.with-error {
  --alert-bg: var(--colour-danger-10);
  --alert-border: var(--colour-danger-50);
}
```

### Badge - Status Indicators

```html
<!-- Count badge -->
<span class="badge">42</span>

<!-- Status badges -->
<span class="badge with-success">Active</span>
<span class="badge with-warning">Pending</span>
<span class="badge with-error">Offline</span>

<!-- In context -->
<button class="button">
  Messages 
  <span class="badge" style="--badge-bg: var(--colour-danger-50);">3</span>
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

<!-- Coloured tags -->
<span class="tag" style="--tag-bg: var(--colour-primary-20); --tag-colour: var(--colour-primary-80);">
  Featured
</span>
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
```

CSS for positioning:
```css
.toasts {
  position: fixed;
  top: var(--space-1-0);
  right: var(--space-1-0);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--space-0-5);
  max-width: 400px;
}

.toast {
  background: var(--colour-neutral-90);
  color: white;
  padding: var(--space-1-0) var(--space-1-5);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-elevated);
  animation: slide-in 250ms ease-out;
}

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

.toast.removing {
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
function showToast(message, type = 'info', duration = 5000) {
  const container = document.querySelector('.toasts');
  const template = document.getElementById('toast-template');
  const toast = template.content.cloneNode(true);
  
  // Set message
  toast.querySelector('.text').textContent = message;
  
  // Set type
  const toastEl = toast.querySelector('.toast');
  toastEl.classList.add(`with-${type}`);
  
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
  toast.classList.add('removing');
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

<!-- Circular progress (CSS) -->
<div class="progress-circle" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <span class="text">75%</span>
</div>

<!-- Step progress -->
<div class="progress-steps as-cluster" role="progressbar" aria-valuenow="2" aria-valuemin="1" aria-valuemax="4">
  <span class="step completed">1</span>
  <span class="step completed">2</span>
  <span class="step current">3</span>
  <span class="step">4</span>
</div>
```

### Loading States

```html
<!-- Skeleton loading -->
<article class="card as-stack">
  <div class="skeleton" style="--skeleton-height: 2rem; --skeleton-width: 60%;"></div>
  <div class="skeleton" style="--skeleton-height: 1rem;"></div>
  <div class="skeleton" style="--skeleton-height: 1rem;"></div>
  <div class="skeleton" style="--skeleton-height: 1rem; --skeleton-width: 80%;"></div>
</article>

<!-- Loading overlay -->
<div class="loading-overlay as-centre">
  <div class="spinner" role="status" aria-label="Loading">
    <span class="sr-only">Loading...</span>
  </div>
</div>

<!-- Inline loading -->
<button class="button" disabled aria-busy="true">
  <span class="spinner" style="--spinner-size: 1em;"></span>
  Saving...
</button>
```

CSS for loading states:
```css
/* Skeleton */
.skeleton {
  height: var(--skeleton-height, 1rem);
  width: var(--skeleton-width, 100%);
  background: linear-gradient(
    90deg,
    var(--colour-neutral-20) 25%,
    var(--colour-neutral-10) 50%,
    var(--colour-neutral-20) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Spinner */
.spinner {
  width: var(--spinner-size, 2rem);
  height: var(--spinner-size, 2rem);
  border: 2px solid var(--colour-neutral-30);
  border-top-color: var(--colour-primary-50);
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
    aria-describedby="username-feedback">
  <small class="feedback with-success" id="username-feedback">
    ✓ Username is available
  </small>
</div>

<!-- Password strength -->
<div class="field">
  <label class="label" for="password">Password</label>
  <input class="input" id="password" type="password" 
    aria-describedby="password-strength">
  <div class="strength-indicator" id="password-strength">
    <div class="strength-bar" style="--strength: 60%; --strength-colour: var(--colour-warning-50);"></div>
    <small class="text">Medium strength</small>
  </div>
</div>

<!-- Form-level feedback -->
<form class="form as-stack">
  <div class="alert with-error" role="alert" hidden>
    <strong>Please fix the following errors:</strong>
    <ul class="list">
      <li>Email is required</li>
      <li>Password must be at least 8 characters</li>
    </ul>
  </div>
  
  <!-- Form fields... -->
</form>
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

## Feedback Best Practices

### 1. Be Contextual
```html
<!-- ❌ Vague -->
<aside class="alert">Error occurred</aside>

<!-- ✅ Specific -->
<aside class="alert with-error">
  <strong>Payment Failed:</strong> Your card was declined. 
  Please check your card details and try again.
</aside>
```

### 2. Offer Solutions
```html
<!-- ❌ Dead end -->
<aside class="alert with-error">File upload failed</aside>

<!-- ✅ Helpful -->
<aside class="alert with-error as-stack">
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

function queueToast(message, type) {
  toastQueue.push({ message, type });
  if (!isShowingToast) showNextToast();
}

function showNextToast() {
  if (toastQueue.length === 0) {
    isShowingToast = false;
    return;
  }
  
  isShowingToast = true;
  const { message, type } = toastQueue.shift();
  showToast(message, type);
  
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
- Users stay informed, not annoyed

Your app communicates clearly. Users feel confident. Trust is built.

→ Continue to [Chapter 12: From CSS to Enterprise Without Changing HTML](./C12-progressive.md)