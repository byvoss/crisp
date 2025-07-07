# Chapter 11: Feedback That Actually Helps

*Or: How to talk to users without making them want to throw things*

## The Feedback Fiasco

Remember this notification nightmare?

```css
/* Monday: Bootstrap alerts (the div festival returns) */
.alert { }
.alert-primary { }
.alert-secondary { }
.alert-success { }
.alert-danger { }
.alert-warning { }
.alert-info { }
.alert-light { }
.alert-dark { }
.alert-dismissible { }
.fade { }
.show { }
/* Plus 23 JavaScript plugins */

/* Tuesday: Toast libraries (because modals weren't annoying enough) */
import { toast } from 'react-toastify';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import { notification } from 'antd';
import { useSnackbar } from 'notistack';
/* 5 libraries, 500KB of JavaScript */

/* Wednesday: Custom notification system */
class NotificationManager extends EventEmitter {
  constructor() {
    this.notifications = [];
    this.queue = [];
    this.positions = ['top-left', 'top-center', 'top-right'];
    // 500 lines later...
  }
}

/* Thursday: CSS-in-JS notifications (peak over-engineering) */
const StyledNotification = styled.div`
  ${({ variant, position, animationType, duration }) => css`
    /* My notification is now a React component */
  `}
`;

/* Friday: *Users disable JavaScript entirely* */
```

**The "Aha!"**: What if feedback was just... semantic HTML with ARIA? No toast library needed?

## The CRISP Feedback Philosophy

*Feedback is a conversation, not a shouting match*

```html
<!-- ❌ The old way: DIV soup notifications -->
<div class="notification notification-success show animated fadeInRight">
  <div class="notification-icon">
    <i class="fa fa-check-circle"></i>
  </div>
  <div class="notification-content">
    <div class="notification-title">Success!</div>
    <div class="notification-message">Your changes have been saved</div>
  </div>
  <div class="notification-close">
    <button class="close-btn">×</button>
  </div>
</div>

<!-- ✅ The CRISP way: Semantic and accessible -->
<aside class="alert" role="status" data-variant="success">
  <strong>Success!</strong> Your changes have been saved.
</aside>
```

**Mind = Blown**: Native HTML elements. Proper ARIA roles. Zero JavaScript required for basic feedback.

## Static Feedback - The Calm Communicators

### Alert - Messages That Matter

*Not every message needs to fly across the screen like a bat out of hell*

```html
<!-- Info alert (the FYI) -->
<aside class="alert" role="note" aria-label="Information message">
  <strong>FYI:</strong> We save your work automatically every 30 seconds.
  (You're welcome)
</aside>

<!-- Success alert (the good news bear) -->
<aside class="alert" role="status" data-variant="success" aria-live="polite">
  <strong>🎉 Success!</strong> Your order #12345 has been confirmed. 
  Check your email for tracking info.
</aside>

<!-- Warning alert (the yellow flag) -->
<aside class="alert" role="alert" data-variant="warning" aria-live="polite">
  <strong>⚠️ Heads up:</strong> Your subscription expires in 3 days. 
  <a class="link" href="/renew">Renew now to avoid interruption</a>
</aside>

<!-- Error alert (the bad news bear) -->
<aside class="alert" role="alert" data-variant="error" aria-live="assertive">
  <strong>❌ Payment Failed:</strong> Your card was declined (code: 4242). 
  <a class="link" href="/payment-methods">Try a different card</a>
</aside>

<!-- Dismissible alert (the polite guest) -->
<aside class="alert with-dismiss as-cluster" role="note" 
  style="--cluster-align: space-between;">
  <p>👋 This message will self-destruct when you're ready</p>
  <button class="button" type="button" 
    aria-label="Dismiss this message"
    onclick="this.closest('.alert').style.animation='fadeOut 0.3s'; setTimeout(() => this.closest('.alert').remove(), 300)">
    <span aria-hidden="true">×</span>
    <span class="visually-hidden">Dismiss</span>
  </button>
</aside>

<!-- Complex alert (the full story) -->
<aside class="alert as-stack" role="alert" data-variant="warning" 
  aria-labelledby="storage-title" aria-describedby="storage-desc">
  <h3 class="heading" id="storage-title" style="--size: 1.25rem;">
    📦 Storage Almost Full
  </h3>
  <p class="text" id="storage-desc">
    You're using 9.5 GB of your 10 GB quota. 
    Time to Marie Kondo those files!
  </p>
  <div class="as-cluster" style="--cluster-gap: var(--space-1-0);" data-entries="2">
    <button class="button" type="button" 
      style="--bg: var(--color-primary);">
      💳 Upgrade Storage
    </button>
    <button class="button" type="button">
      🗑️ Clean Up Files
    </button>
  </div>
</aside>

<!-- Context-aware alert (location matters) -->
<aside class="alert" role="alert" data-variant="admin" aria-live="polite">
  <strong>🔧 Admin Notice:</strong> System maintenance tonight at 2 AM UTC. 
  Expected downtime: 15 minutes (but probably 3 hours, let's be honest).
</aside>
```

```css
@layer crisp {
  .alert {
    /* Type-safe alert properties */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(95% 0.05 210);
    }
    
    @property --border-color {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(65% 0.15 210);
    }
    
    @property --border-width {
      syntax: "<length>";
      inherits: false;
      initial-value: 4px;
    }
    
    /* Define ALL defaults */
    --padding: var(--space-1-0) var(--space-1-5);
    --radius: var(--radius-md);
    --color: var(--color-text);
    
    /* Use them */
    padding: var(--padding);
    border-radius: var(--radius);
    background: var(--bg);
    border-left: var(--border-width) solid var(--border-color);
    color: var(--color);
    
    /* Make it noticeable but not obnoxious */
    position: relative;
    margin-block: var(--space-1-0);
    
    /* Smooth entry */
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
  }
  
  /* Fade out animation */
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
  
  /* Variant styling (the mood ring) */
  .alert[data-variant~="success"] {
    --bg: oklch(95% 0.10 145);
    --border-color: oklch(65% 0.20 145);
  }
  
  .alert[data-variant~="warning"] {
    --bg: oklch(95% 0.15 90);
    --border-color: oklch(70% 0.25 90);
  }
  
  .alert[data-variant~="error"] {
    --bg: oklch(95% 0.15 30);
    --border-color: oklch(60% 0.25 30);
  }
  
  /* Context modifications (location, location) */
  [data-variant="admin"] .alert {
    --border-color: oklch(50% 0.20 280);
    --bg: oklch(95% 0.10 280);
    --border-width: 6px;
    
    /* Admin alerts are SERIOUS BUSINESS */
    &::before {
      content: "ADMIN";
      position: absolute;
      top: -0.5em;
      left: 1em;
      font-size: 0.75rem;
      font-weight: bold;
      background: var(--border-color);
      color: white;
      padding: 0.125rem 0.5rem;
      border-radius: var(--radius-sm);
    }
  }
  
  /* Dark theme (night owl mode) */
  [data-theme="dark"] .alert {
    --bg: oklch(20% 0.05 var(--hue, 210));
    --color: oklch(90% 0.02 var(--hue, 210));
    
    &[data-variant~="success"] {
      --hue: 145;
    }
    
    &[data-variant~="warning"] {
      --hue: 90;
    }
    
    &[data-variant~="error"] {
      --hue: 30;
    }
  }
}
```

**The "Aha!"**: `@property` validates color values. OKLCH handles theme variations. CSS does the animations. No JavaScript state management needed!

### Badge - The Little Indicators That Could

*Small but mighty. Like angry chihuahuas.*

```html
<!-- Count badge (the notification nagger) -->
<span class="badge" aria-label="42 unread messages">42</span>

<!-- Status badges (traffic lights for your UI) -->
<span class="badge" data-variant="success" role="status">
  <span aria-hidden="true">●</span> Active
</span>
<span class="badge" data-variant="warning" role="status">
  <span aria-hidden="true">●</span> Pending
</span>
<span class="badge" data-variant="error" role="status">
  <span aria-hidden="true">●</span> Offline
</span>

<!-- In context (the attention seeker) -->
<button class="button" type="button" aria-describedby="msg-count">
  Messages 
  <span class="badge" id="msg-count" 
    style="--bg: var(--color-error);" 
    aria-label="3 new messages">
    3
  </span>
</button>

<!-- Navigation badges (the guilt trip) -->
<nav class="navigation as-cluster" data-entries="3" aria-label="Main navigation">
  <a class="link" href="/inbox" aria-describedby="inbox-count">
    <span>Inbox</span>
    <span class="badge" id="inbox-count" aria-label="99+ unread messages">
      99+
    </span>
  </a>
  <a class="link" href="/drafts" aria-describedby="draft-count">
    <span>Drafts</span>
    <span class="badge" id="draft-count" aria-label="1 draft">
      1
    </span>
  </a>
  <a class="link" href="/spam">
    <span>Spam</span>
    <span class="badge" aria-label="1,247 spam messages" 
      style="--bg: oklch(60% 0.20 30);">
      1.2K
    </span>
  </a>
</nav>

<!-- Context-aware badges (the status symbols) -->
<span class="badge" data-variant="premium" aria-label="Premium account">
  ✨ PRO
</span>
<span class="badge" data-variant="new" aria-label="New feature">
  🆕 NEW
</span>
<span class="badge" data-variant="beta" aria-label="Beta feature">
  🧪 BETA
</span>
```

```css
@layer crisp {
  .badge {
    /* Type-safe badge properties */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(50% 0.10 250);
    }
    
    @property --color {
      syntax: "<color>";
      inherits: false;
      initial-value: white;
    }
    
    /* Define ALL defaults */
    --size: 0.875rem;
    --padding: var(--space-0-25) var(--space-0-5);
    --radius: var(--radius-full);
    --min-size: 1.5em;
    
    /* Use them */
    background: var(--bg);
    color: var(--color);
    font-size: var(--size);
    padding: var(--padding);
    border-radius: var(--radius);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: var(--min-size);
    min-height: var(--min-size);
    font-weight: var(--text-weight-semibold);
    line-height: 1;
    
    /* Subtle animation for new badges */
    animation: badgePop 0.3s ease-out;
    
    /* Position when nested */
    .button &,
    .link & {
      margin-left: var(--space-0-5);
      vertical-align: middle;
    }
  }
  
  @keyframes badgePop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  
  /* Status colors (the mood indicators) */
  .badge[data-variant="success"] { 
    --bg: oklch(65% 0.20 145);
  }
  
  .badge[data-variant="warning"] { 
    --bg: oklch(70% 0.25 90);
  }
  
  .badge[data-variant="error"] { 
    --bg: oklch(60% 0.25 30);
  }
  
  /* Special badges (the VIPs) */
  .badge[data-variant="premium"] {
    --bg: oklch(75% 0.20 85); /* Gold */
    --color: oklch(20% 0.02 85);
    /* Subtle shimmer effect */
    background: linear-gradient(
      135deg,
      var(--bg) 0%,
      oklch(from var(--bg) calc(l + 0.1) c h) 50%,
      var(--bg) 100%
    );
    background-size: 200% 200%;
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .badge[data-variant="new"] {
    --bg: oklch(70% 0.20 340); /* Hot pink */
    animation: badgePop 0.5s ease-out, pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .badge[data-variant="beta"] {
    --bg: oklch(65% 0.15 270); /* Purple */
    --radius: var(--radius-md);
  }
  
  /* Large number handling */
  .badge:has(> :not(:only-child)) {
    --padding: var(--space-0-25) var(--space-0-75);
    --radius: var(--radius-md);
  }
}
```

**Pro tip**: The shimmer effect on premium badges? Pure CSS gradients + animation. Your marketing team will love you.

### Tag - Content Labels That Stick

*Like post-it notes, but less likely to fall off your monitor*

```html
<!-- Basic tags (the label makers) -->
<span class="tag" role="status">JavaScript</span>
<span class="tag" role="status">CSS</span>
<span class="tag" role="status">HTML</span>
<span class="tag" role="status">
  <span aria-hidden="true">🔥</span> Hot Topic
</span>

<!-- Removable tags (the dismissible labels) -->
<span class="tag with-remove as-cluster" style="--cluster-gap: var(--space-0-25);">
  <span>React</span>
  <button class="button" type="button" 
    aria-label="Remove React tag"
    onclick="this.closest('.tag').style.animation='fadeOut 0.3s'; setTimeout(() => this.closest('.tag').remove(), 300)"
    style="--size: 1rem; --padding: 0; --bg: transparent;">
    <span aria-hidden="true">×</span>
  </button>
</span>

<!-- Tag groups (the taxonomy) -->
<div class="tags as-cluster" role="group" aria-label="Skills" 
  style="--cluster-gap: var(--space-0-5);" data-entries="5">
  <span class="tag">Frontend</span>
  <span class="tag">Backend</span>
  <span class="tag">DevOps</span>
  <span class="tag">UI/UX</span>
  <span class="tag" data-variant="new">AI/ML</span>
</div>

<!-- Colored tags (taste the rainbow) -->
<span class="tag" style="--bg: oklch(90% 0.15 340); --color: oklch(40% 0.20 340);">
  🌟 Featured
</span>
<span class="tag" style="--bg: oklch(85% 0.10 120); --color: oklch(30% 0.15 120);">
  🌱 Eco-Friendly
</span>
<span class="tag" style="--bg: oklch(80% 0.15 60); --color: oklch(25% 0.10 60);">
  ⚡ Fast Delivery
</span>

<!-- Context tags (the status symbols) -->
<div class="as-cluster" data-entries="3">
  <span class="tag" data-variant="premium">💎 Premium</span>
  <span class="tag" data-variant="sale">🏷️ 50% OFF</span>
  <span class="tag" data-variant="limited">⏰ Limited Time</span>
</div>

<!-- Interactive tags (the filters) -->
<div class="tags as-cluster" role="group" aria-label="Filter by category">
  <button class="tag" type="button" aria-pressed="true" 
    onclick="toggleFilter(this)">
    All
  </button>
  <button class="tag" type="button" aria-pressed="false" 
    onclick="toggleFilter(this)">
    Published
  </button>
  <button class="tag" type="button" aria-pressed="false" 
    onclick="toggleFilter(this)">
    Draft
  </button>
</div>
```

```css
@layer crisp {
  .tag {
    /* Type-safe tag properties */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(90% 0.05 250);
    }
    
    @property --color {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(30% 0.10 250);
    }
    
    /* Define ALL defaults */
    --padding: var(--space-0-25) var(--space-0-75);
    --radius: var(--radius-sm);
    --size: 0.875rem;
    --border: 1px solid transparent;
    
    /* Use them */
    background: var(--bg);
    color: var(--color);
    padding: var(--padding);
    border-radius: var(--radius);
    font-size: var(--size);
    border: var(--border);
    display: inline-flex;
    align-items: center;
    gap: var(--space-0-5);
    font-weight: var(--text-weight-medium);
    transition: all var(--transition-fast);
    
    /* Interactive tags */
    &[type="button"] {
      cursor: pointer;
      
      &:hover {
        --bg: oklch(from var(--bg) calc(l - 0.05) c h);
      }
      
      &[aria-pressed="true"] {
        --bg: var(--color-primary);
        --color: white;
      }
    }
    
    /* Remove button styling */
    .button {
      width: 1.25rem;
      height: 1.25rem;
      min-width: unset;
      padding: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        --bg: oklch(from var(--color) l c h / 0.2);
      }
    }
  }
  
  /* Tag variants (the personalities) */
  .tag[data-variant="premium"] {
    --bg: oklch(85% 0.15 85);
    --color: oklch(30% 0.20 85);
    --border: 1px solid oklch(70% 0.20 85);
  }
  
  .tag[data-variant="sale"] {
    --bg: oklch(90% 0.20 30);
    --color: oklch(35% 0.25 30);
    animation: pulse 2s ease-in-out infinite;
  }
  
  .tag[data-variant="limited"] {
    --bg: oklch(85% 0.15 340);
    --color: oklch(30% 0.20 340);
    position: relative;
    overflow: hidden;
    
    /* Shimmer effect for urgency */
    &::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        135deg,
        transparent 30%,
        oklch(100% 0 0 / 0.3) 50%,
        transparent 70%
      );
      animation: shimmer 3s linear infinite;
    }
  }
  
  /* Tag states */
  .tag.with-remove:hover {
    --bg: oklch(from var(--bg) calc(l - 0.05) c h);
  }
  
  /* Dark theme */
  [data-theme="dark"] .tag {
    --bg: oklch(25% 0.05 250);
    --color: oklch(80% 0.05 250);
  }
}
```

**The "Aha!"**: Tags can be buttons with `aria-pressed`. Interactive filters without JavaScript state management!

## Dynamic Feedback - The Show-Offs

### Toast - Messages That Pop (But Not Annoyingly)

*Like toast, they pop up when ready. Unlike toast, they won't burn.*

```html
<!-- Toast container (the notification stage) -->
<div class="toasts" role="region" aria-live="polite" aria-label="Notifications" 
  data-position="top-right">
  <!-- Toasts appear here like magic (or appendChild) -->
</div>

<!-- Toast template (the blueprint) -->
<template id="toast-template">
  <div class="toast as-cluster" role="status" aria-live="polite" 
    style="--cluster-align: space-between;">
    <div class="as-cluster" style="--cluster-gap: var(--space-0-75);">
      <span class="icon" aria-hidden="true"></span>
      <p class="text">Message here</p>
    </div>
    <button class="button" type="button" aria-label="Dismiss notification" 
      style="--bg: transparent; --padding: 0; --size: 1.5rem;">
      <span aria-hidden="true">×</span>
    </button>
  </div>
</template>

<!-- Different toast positions (location preferences) -->
<div class="toasts" data-position="top-left" aria-label="Top left notifications"></div>
<div class="toasts" data-position="top-center" aria-label="Top center notifications"></div>
<div class="toasts" data-position="bottom-right" aria-label="Bottom right notifications"></div>
<div class="toasts" data-position="bottom-center" aria-label="Bottom center notifications"></div>

<!-- Context-aware toasts (the chameleons) -->
<div class="toasts" data-variant="admin" data-position="top-center">
  <!-- Admin toasts appear here with authority -->
</div>
```

```css
@layer crisp {
  .toasts {
    /* Type-safe positioning */
    @property --max-width {
      syntax: "<length>";
      inherits: false;
      initial-value: 400px;
    }
    
    /* Base positioning */
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: var(--space-0-5);
    max-width: var(--max-width);
    pointer-events: none; /* Click through container */
    
    /* Position variants (the compass) */
    &[data-position="top-right"] {
      top: var(--space-1-0);
      right: var(--space-1-0);
    }
    
    &[data-position="top-left"] {
      top: var(--space-1-0);
      left: var(--space-1-0);
    }
    
    &[data-position="top-center"] {
      top: var(--space-1-0);
      left: 50%;
      transform: translateX(-50%);
    }
    
    &[data-position="bottom-right"] {
      bottom: var(--space-1-0);
      right: var(--space-1-0);
    }
    
    &[data-position="bottom-center"] {
      bottom: var(--space-1-0);
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  .toast {
    /* Type-safe toast properties */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(25% 0.05 250);
    }
    
    @property --color {
      syntax: "<color>";
      inherits: false;
      initial-value: white;
    }
    
    /* Define ALL defaults */
    --padding: var(--space-1-0) var(--space-1-5);
    --radius: var(--radius-md);
    --shadow: 0 4px 12px oklch(0% 0 0 / 0.15);
    --border: none;
    
    /* Use them */
    background: var(--bg);
    color: var(--color);
    padding: var(--padding);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: var(--border);
    pointer-events: auto; /* Make toasts clickable */
    min-width: 250px;
    
    /* Entry animation based on position */
    animation: toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    
    /* Icon styling */
    .icon {
      font-size: 1.25rem;
      line-height: 1;
    }
  }
  
  /* Position-aware animations */
  [data-position*="right"] .toast {
    @keyframes toastSlideIn {
      from {
        transform: translateX(calc(100% + var(--space-1-0)));
        opacity: 0;
      }
    }
  }
  
  [data-position*="left"] .toast {
    @keyframes toastSlideIn {
      from {
        transform: translateX(calc(-100% - var(--space-1-0)));
        opacity: 0;
      }
    }
  }
  
  [data-position*="top"] .toast {
    @keyframes toastSlideIn {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
    }
  }
  
  [data-position*="bottom"] .toast {
    @keyframes toastSlideIn {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
    }
  }
  
  /* Toast variants (the moods) */
  .toast[data-variant="success"] {
    --bg: oklch(65% 0.20 145);
    --icon: "✅";
  }
  
  .toast[data-variant="warning"] {
    --bg: oklch(70% 0.25 90);
    --color: oklch(20% 0.10 90);
    --icon: "⚠️";
  }
  
  .toast[data-variant="error"] {
    --bg: oklch(60% 0.25 30);
    --icon: "❌";
  }
  
  .toast[data-variant="info"] {
    --bg: oklch(65% 0.15 210);
    --icon: "ℹ️";
  }
  
  /* Set icon content */
  .toast[data-variant] .icon::before {
    content: var(--icon);
  }
  
  /* Exit animation */
  .toast[data-state="removing"] {
    animation: toastSlideOut 0.3s ease-in forwards;
  }
  
  @keyframes toastSlideOut {
    to {
      transform: translateX(calc(100% + var(--space-1-0)));
      opacity: 0;
    }
  }
  
  /* Admin context (serious toasts) */
  [data-variant="admin"] .toast {
    --border: 2px solid oklch(50% 0.20 280);
    --bg: oklch(20% 0.10 280);
    
    &::before {
      content: "ADMIN";
      position: absolute;
      top: -0.5em;
      left: 1em;
      font-size: 0.625rem;
      font-weight: bold;
      background: oklch(50% 0.20 280);
      color: white;
      padding: 0.125rem 0.375rem;
      border-radius: var(--radius-sm);
    }
  }
  
  /* Dark theme adjustments */
  [data-theme="dark"] .toast {
    --shadow: 0 4px 12px oklch(0% 0 0 / 0.5);
  }
}
```

**The "Aha!"**: Position-aware animations! Toasts slide in from the correct direction based on `data-position`. Pure CSS, no JavaScript math.

```javascript
// Progressive enhancement toast system
class ToastManager {
  constructor() {
    // Find or create container
    this.container = document.querySelector('.toasts') || this.createContainer();
    this.template = document.getElementById('toast-template');
    this.queue = [];
    this.isShowing = false;
  }
  
  createContainer() {
    const container = document.createElement('div');
    container.className = 'toasts';
    container.setAttribute('role', 'region');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-label', 'Notifications');
    container.setAttribute('data-position', 'top-right');
    document.body.appendChild(container);
    return container;
  }
  
  show(message, options = {}) {
    const {
      variant = 'info',
      duration = 5000,
      icon = null,
      action = null
    } = options;
    
    // Queue if already showing (be polite)
    if (this.isShowing) {
      this.queue.push({ message, options });
      return;
    }
    
    this.isShowing = true;
    
    // Clone template
    const toast = this.template.content.cloneNode(true);
    const toastEl = toast.querySelector('.toast');
    
    // Set content
    toast.querySelector('.text').textContent = message;
    
    // Set variant
    toastEl.setAttribute('data-variant', variant);
    
    // Custom icon?
    if (icon) {
      toast.querySelector('.icon').textContent = icon;
    }
    
    // Add action button?
    if (action) {
      const actionBtn = document.createElement('button');
      actionBtn.className = 'button';
      actionBtn.textContent = action.label;
      actionBtn.onclick = action.callback;
      actionBtn.style.cssText = '--size: 0.875rem; --padding: var(--space-0-25) var(--space-0-5);';
      toastEl.insertBefore(actionBtn, toastEl.lastElementChild);
    }
    
    // Add to DOM
    this.container.appendChild(toast);
    const addedToast = this.container.lastElementChild;
    
    // Dismiss handler
    addedToast.querySelector('button[aria-label*="Dismiss"]').onclick = () => {
      this.remove(addedToast);
    };
    
    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => this.remove(addedToast), duration);
    }
    
    // Show next after a delay
    setTimeout(() => {
      this.isShowing = false;
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        this.show(next.message, next.options);
      }
    }, 300);
    
    return addedToast;
  }
  
  remove(toast) {
    toast.setAttribute('data-state', 'removing');
    toast.addEventListener('animationend', () => {
      toast.remove();
      
      // Announce removal to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'visually-hidden';
      announcement.textContent = 'Notification dismissed';
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 1000);
    });
  }
}

// Global instance
const toast = new ToastManager();

// Usage examples
toast.show('Changes saved!', { variant: 'success' });

toast.show('Connection lost', { 
  variant: 'error',
  duration: 0, // Don't auto-dismiss
  action: {
    label: 'Retry',
    callback: () => location.reload()
  }
});

toast.show('New message from Alice', {
  variant: 'info',
  icon: '💬',
  action: {
    label: 'View',
    callback: () => window.location.href = '/messages'
  }
});
```

**Pro tip**: Queue toasts to prevent notification spam. Your users' sanity will thank you.

### Progress - The Journey Indicators

*Because "Loading..." doesn't tell the whole story*

```html
<!-- Determinate progress (the honest one) -->
<progress class="progress" value="75" max="100" 
  aria-label="Upload progress: 75% complete">
  75% complete
</progress>

<!-- Progress with context (the storyteller) -->
<div class="progress-group" role="group" aria-labelledby="upload-label">
  <div class="as-cluster" style="--cluster-align: space-between;">
    <label class="label" id="upload-label">
      Uploading "vacation-photos.zip" (3.2 MB)
    </label>
    <span class="text" role="status" aria-live="polite">
      <strong>75%</strong> - 30 seconds remaining
    </span>
  </div>
  <progress class="progress" value="75" max="100" 
    aria-describedby="upload-label"></progress>
  <small class="text" style="--color: var(--color-neutral);">
    Tip: Large files upload faster with a stable connection
  </small>
</div>

<!-- Indeterminate progress (the mystery box) -->
<div role="status" aria-busy="true">
  <progress class="progress" aria-label="Loading content">
    Loading... (this might take a moment)
  </progress>
  <p class="text as-center" style="--size: 0.875rem;">
    Fetching the latest data from our potato-powered servers...
  </p>
</div>

<!-- Context-aware progress (the mood ring) -->
<progress class="progress" value="50" max="100" 
  data-variant="danger" 
  aria-label="Danger: Operation 50% complete">
  Critical operation in progress
</progress>

<!-- Multi-progress (the taskmaster) -->
<div class="progress-stack as-stack" role="group" aria-label="Multi-file upload">
  <div class="progress-item">
    <label class="label">photo1.jpg</label>
    <progress class="progress" value="100" max="100" data-variant="success"></progress>
  </div>
  <div class="progress-item">
    <label class="label">photo2.jpg</label>
    <progress class="progress" value="60" max="100"></progress>
  </div>
  <div class="progress-item">
    <label class="label">photo3.jpg</label>
    <progress class="progress" value="0" max="100"></progress>
  </div>
</div>

<!-- Circular progress (the spinner's sophisticated cousin) -->
<div class="progress-circle" 
  role="progressbar" 
  aria-valuenow="75" 
  aria-valuemin="0" 
  aria-valuemax="100"
  aria-label="75% complete"
  style="--progress: 75%;">
  <svg viewBox="0 0 100 100">
    <circle class="track" cx="50" cy="50" r="45"></circle>
    <circle class="fill" cx="50" cy="50" r="45"></circle>
  </svg>
  <span class="text">75%</span>
</div>

<!-- Step progress (the journey map) -->
<nav class="progress-steps" role="navigation" aria-label="Checkout progress">
  <ol class="as-cluster" data-entries="4">
    <li class="step" data-state="completed" aria-label="Step 1: Cart completed">
      <span class="step-number">✓</span>
      <span class="step-label">Cart</span>
    </li>
    <li class="step" data-state="completed" aria-label="Step 2: Shipping completed">
      <span class="step-number">✓</span>
      <span class="step-label">Shipping</span>
    </li>
    <li class="step" data-state="current" aria-current="step" aria-label="Step 3: Payment in progress">
      <span class="step-number">3</span>
      <span class="step-label">Payment</span>
    </li>
    <li class="step" data-state="pending" aria-label="Step 4: Confirm pending">
      <span class="step-number">4</span>
      <span class="step-label">Confirm</span>
    </li>
  </ol>
</nav>
```

```css
@layer crisp {
  .progress {
    /* Type-safe progress properties */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(90% 0.02 250);
    }
    
    @property --fill {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(65% 0.15 210);
    }
    
    /* Define ALL defaults */
    --height: 0.5rem;
    --radius: var(--radius-full);
    --transition: width 0.3s ease;
    
    /* Reset native styles */
    appearance: none;
    -webkit-appearance: none;
    
    /* Apply styling */
    width: 100%;
    height: var(--height);
    background: var(--bg);
    border-radius: var(--radius);
    overflow: hidden;
    position: relative;
    
    /* WebKit styles */
    &::-webkit-progress-bar {
      background: var(--bg);
      border-radius: var(--radius);
    }
    
    &::-webkit-progress-value {
      background: var(--fill);
      border-radius: var(--radius);
      transition: var(--transition);
    }
    
    /* Firefox styles */
    &::-moz-progress-bar {
      background: var(--fill);
      border-radius: var(--radius);
      transition: var(--transition);
    }
    
    /* Indeterminate state (the eternal loading) */
    &:indeterminate {
      background: linear-gradient(
        90deg,
        var(--bg) 0%,
        var(--fill) 50%,
        var(--bg) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s linear infinite;
    }
    
    &:indeterminate::-webkit-progress-bar {
      background: transparent;
    }
    
    &:indeterminate::-moz-progress-bar {
      background: transparent;
    }
  }
  
  /* Progress variants */
  .progress[data-variant="success"] {
    --fill: oklch(65% 0.20 145);
  }
  
  .progress[data-variant="warning"] {
    --fill: oklch(70% 0.25 90);
  }
  
  .progress[data-variant="danger"] {
    --fill: oklch(60% 0.25 30);
    
    /* Pulse for urgency */
    &::-webkit-progress-value,
    &::-moz-progress-bar {
      animation: pulse 2s ease-in-out infinite;
    }
  }
  
  /* Circular progress (the fancy one) */
  .progress-circle {
    --size: 100px;
    --stroke-width: 8;
    --progress: 0%;
    
    position: relative;
    width: var(--size);
    height: var(--size);
    
    svg {
      transform: rotate(-90deg);
      width: 100%;
      height: 100%;
    }
    
    .track {
      fill: none;
      stroke: var(--bg, oklch(90% 0.02 250));
      stroke-width: var(--stroke-width);
    }
    
    .fill {
      fill: none;
      stroke: var(--fill, oklch(65% 0.15 210));
      stroke-width: var(--stroke-width);
      stroke-linecap: round;
      stroke-dasharray: calc(2 * 3.14159 * 45); /* Circumference */
      stroke-dashoffset: calc(2 * 3.14159 * 45 * (1 - var(--progress) / 100));
      transition: stroke-dashoffset 0.3s ease;
    }
    
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.5rem;
      font-weight: var(--text-weight-semibold);
    }
  }
  
  /* Step progress (the breadcrumb's cousin) */
  .step {
    @property --step-bg {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(90% 0.02 250);
    }
    
    --size: 2.5rem;
    --color: var(--color-text);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-0-5);
    position: relative;
    
    /* The connector line */
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: calc(var(--size) / 2);
      left: calc(50% + var(--size) / 2);
      width: 100%;
      height: 2px;
      background: var(--step-bg);
      z-index: -1;
    }
    
    .step-number {
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      background: var(--step-bg);
      color: var(--color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--text-weight-semibold);
      transition: all var(--transition-fast);
    }
    
    .step-label {
      font-size: 0.875rem;
      text-align: center;
    }
    
    /* Step states */
    &[data-state="completed"] {
      --step-bg: oklch(65% 0.20 145);
      --color: white;
      
      &::after {
        background: var(--step-bg);
      }
    }
    
    &[data-state="current"] {
      --step-bg: oklch(65% 0.15 210);
      --color: white;
      
      .step-number {
        animation: pulse 2s ease-in-out infinite;
        box-shadow: 0 0 0 4px oklch(from var(--step-bg) l c h / 0.2);
      }
    }
    
    &[data-state="pending"] {
      opacity: 0.6;
    }
  }
  
  /* Dark theme adjustments */
  [data-theme="dark"] {
    .progress {
      --bg: oklch(25% 0.02 250);
    }
    
    .step {
      --step-bg: oklch(35% 0.02 250);
    }
  }
}
```

**The "Aha!"**: Indeterminate progress uses CSS gradients + animation. No JavaScript required for that eternal loading shimmer!

### Loading States - The Patience Testers

*Making waiting less painful since 2025*

```html
<!-- Skeleton loading (the ghost content) -->
<article class="card as-stack" aria-busy="true" aria-label="Loading content">
  <div class="skeleton skeleton-heading" style="--width: 60%;"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text" style="--width: 80%;"></div>
</article>

<!-- Skeleton with structure (the detailed ghost) -->
<article class="card as-cluster" style="--cluster-gap: var(--space-1-5);" 
  aria-busy="true" aria-label="Loading user profile">
  <div class="skeleton skeleton-avatar"></div>
  <div class="as-stack" style="--stack-gap: var(--space-0-5); flex: 1;">
    <div class="skeleton skeleton-heading" style="--width: 40%;"></div>
    <div class="skeleton skeleton-text" style="--width: 70%;"></div>
    <div class="skeleton skeleton-text" style="--width: 90%;"></div>
  </div>
</article>

<!-- Loading overlay (the takeover) -->
<div class="loading-overlay as-center" data-state="active" 
  role="status" aria-label="Loading page content">
  <div class="loading-content as-stack" style="--stack-gap: var(--space-1-0);">
    <div class="spinner" aria-hidden="true"></div>
    <p class="text">Loading your content...</p>
    <small class="text" style="--color: var(--color-neutral);">
      This is taking longer than usual. Maybe get a coffee? ☕
    </small>
  </div>
</div>

<!-- Inline loading (the button transformation) -->
<button class="button" type="button" aria-busy="true" disabled>
  <span class="spinner" style="--size: 1em;" aria-hidden="true"></span>
  <span>Saving your masterpiece...</span>
</button>

<!-- Smart loading (context-aware) -->
<div data-state="loading" aria-busy="true">
  <div class="placeholder-content">
    <!-- Original content hidden but present for screen readers -->
    <div class="visually-hidden">
      <h2>Article Title</h2>
      <p>Article content will appear here</p>
    </div>
    <!-- Visual skeleton -->
    <div aria-hidden="true">
      <div class="skeleton skeleton-heading"></div>
      <div class="skeleton skeleton-text"></div>
    </div>
  </div>
</div>
```

```css
@layer crisp {
  /* Skeleton loading (the content ghosts) */
  .skeleton {
    /* Type-safe skeleton properties */
    @property --bg-start {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(92% 0.02 250);
    }
    
    @property --bg-mid {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(95% 0.01 250);
    }
    
    /* Base styles */
    --height: 1rem;
    --width: 100%;
    --radius: var(--radius-sm);
    
    height: var(--height);
    width: var(--width);
    border-radius: var(--radius);
    background: linear-gradient(
      90deg,
      var(--bg-start) 25%,
      var(--bg-mid) 50%,
      var(--bg-start) 75%
    );
    background-size: 200% 100%;
    animation: skeletonWave 1.5s ease-in-out infinite;
    
    /* Prevent content jumping */
    min-height: var(--height);
    
    /* Skeleton variants */
    &.skeleton-heading {
      --height: 2rem;
      --radius: var(--radius-md);
    }
    
    &.skeleton-text {
      --height: 1rem;
      margin-block: 0.25rem;
    }
    
    &.skeleton-avatar {
      --height: 4rem;
      --width: 4rem;
      --radius: 50%;
      flex-shrink: 0;
    }
    
    &.skeleton-button {
      --height: 2.5rem;
      --width: 8rem;
      --radius: var(--radius-md);
    }
    
    &.skeleton-image {
      --height: 200px;
      --radius: var(--radius-lg);
    }
  }
  
  @keyframes skeletonWave {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* Spinner (the eternal rotation) */
  .spinner {
    /* Type-safe spinner properties */
    @property --size {
      syntax: "<length>";
      inherits: false;
      initial-value: 2rem;
    }
    
    @property --border-color {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(85% 0.02 250);
    }
    
    @property --active-color {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(65% 0.15 210);
    }
    
    /* The spinner */
    width: var(--size);
    height: var(--size);
    border: 3px solid var(--border-color);
    border-top-color: var(--active-color);
    border-radius: 50%;
    display: inline-block;
    animation: spin 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    
    /* Accessibility */
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Loading overlay (the full takeover) */
  .loading-overlay {
    position: fixed;
    inset: 0;
    background: oklch(100% 0 0 / 0.9);
    backdrop-filter: blur(4px);
    z-index: 9999;
    display: none;
    
    &[data-state="active"] {
      display: flex;
    }
    
    .loading-content {
      text-align: center;
      animation: fadeIn 0.3s ease-out;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
  }
  
  /* Context-aware loading */
  [data-variant="admin"] {
    .skeleton {
      --bg-start: oklch(88% 0.05 280);
      --bg-mid: oklch(92% 0.03 280);
    }
    
    .spinner {
      --active-color: oklch(60% 0.20 280);
    }
  }
  
  /* Dark theme loading */
  [data-theme="dark"] {
    .skeleton {
      --bg-start: oklch(25% 0.02 250);
      --bg-mid: oklch(30% 0.01 250);
    }
    
    .spinner {
      --border-color: oklch(30% 0.02 250);
      --active-color: oklch(70% 0.15 210);
    }
    
    .loading-overlay {
      background: oklch(10% 0 0 / 0.9);
    }
  }
  
  /* Reduced motion (respect the preference) */
  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none;
      background: var(--bg-start);
    }
    
    .spinner {
      animation: spin 2s linear infinite;
    }
  }
}
```

**The "Aha!"**: Different skeleton variants for different content types. The loading state actually resembles what's coming. Mind = blown.

## Validation Feedback - The Truth Tellers

### Inline Validation - Real-Time Reality Checks

*Because waiting until submit to find out you messed up is so 1999*

```html
<!-- Field with success feedback (the cheerleader) -->
<div class="field">
  <label class="label" for="username">
    Username <span aria-label="required">*</span>
  </label>
  <input class="input" id="username" type="text" name="username"
    aria-invalid="false"
    aria-describedby="username-feedback username-hint"
    data-state="valid"
    value="cooluser123">
  <small class="text" id="username-hint" style="--color: var(--color-neutral);">
    Letters, numbers, underscores only
  </small>
  <p class="feedback" id="username-feedback" role="status" 
    data-variant="success" aria-live="polite">
    <span aria-hidden="true">✅</span> Nice! Username is available
  </p>
</div>

<!-- Password strength (the security theater, act 2) -->
<div class="field">
  <label class="label" for="password-field">
    Password <span aria-label="required">*</span>
  </label>
  <input class="input" id="password-field" type="password" name="password"
    aria-describedby="password-strength password-tips"
    aria-invalid="false">
  
  <div class="strength-indicator" id="password-strength" 
    role="status" aria-live="polite" data-strength="medium">
    <div class="strength-bar" aria-hidden="true">
      <div class="strength-fill" style="--strength: 60%;"></div>
    </div>
    <p class="text as-cluster" style="--cluster-align: space-between;">
      <span>
        <strong>Password strength:</strong> 
        <span data-label="strength">Pretty good</span>
      </span>
      <span style="--size: 0.875rem;">
        Time to crack: <strong data-label="time">3 months</strong>
      </span>
    </p>
  </div>
  
  <details class="tips" id="password-tips">
    <summary>Tips for a stronger password</summary>
    <ul class="list as-stack" style="--stack-gap: var(--space-0-25);">
      <li>Mix uppercase and lowercase letters</li>
      <li>Add numbers and special characters</li>
      <li>Use 12+ characters (more is better)</li>
      <li>Avoid common words and patterns</li>
      <li>Consider using a passphrase</li>
    </ul>
  </details>
</div>

<!-- Form-level feedback (the summary report) -->
<form class="form as-stack" data-state="error" aria-label="Registration form">
  <div class="alert as-stack" role="alert" data-variant="error" 
    aria-live="assertive" aria-atomic="true">
    <h3 class="heading" style="--size: 1.125rem;">
      ❌ Oops! We found 3 issues:
    </h3>
    <ol class="list" style="--gap: var(--space-0-5);">
      <li>
        <a class="link" href="#email">Email is required</a>
      </li>
      <li>
        <a class="link" href="#password">Password must be at least 8 characters</a>
      </li>
      <li>
        <a class="link" href="#terms">You must accept the terms (we know you didn't read them)</a>
      </li>
    </ol>
    <p class="text" style="--size: 0.875rem; --color: var(--color-neutral);">
      Click any error above to jump to that field
    </p>
  </div>
  
  <!-- Form fields with errors highlighted... -->
</form>

<!-- Success feedback (the victory lap) -->
<div class="alert as-stack" role="status" data-variant="success" 
  aria-live="polite" aria-atomic="true">
  <h3 class="heading" style="--size: 1.125rem;">
    🎉 Success! Your account has been created
  </h3>
  <p class="text">
    Check your email to verify your account. 
    <strong>Didn't get it?</strong> 
    <button class="button" type="button" style="--size: 0.875rem;">
      Resend verification email
    </button>
  </p>
</div>
```

```css
@layer crisp {
  /* Validation feedback (the truth serum) */
  .feedback {
    @property --feedback-color {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-text);
    }
    
    --size: 0.875rem;
    --spacing: var(--space-0-5) 0;
    
    font-size: var(--size);
    color: var(--feedback-color);
    margin: var(--spacing);
    
    /* Entry animation */
    animation: feedbackSlide 0.3s ease-out;
    
    &[data-variant="success"] {
      --feedback-color: oklch(55% 0.20 145);
    }
    
    &[data-variant="error"] {
      --feedback-color: oklch(55% 0.25 30);
    }
    
    &[data-variant="warning"] {
      --feedback-color: oklch(60% 0.25 90);
    }
  }
  
  @keyframes feedbackSlide {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  
  /* Strength indicator (the password judge) */
  .strength-indicator {
    --height: 6px;
    --bg: oklch(90% 0.02 250);
    --radius: var(--radius-full);
    
    margin-top: var(--space-0-75);
  }
  
  .strength-bar {
    height: var(--height);
    background: var(--bg);
    border-radius: var(--radius);
    overflow: hidden;
    position: relative;
  }
  
  .strength-fill {
    @property --fill-color {
      syntax: "<color>";
      inherits: false;
      initial-value: oklch(50% 0.15 250);
    }
    
    --strength: 0%;
    
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--strength);
    background: var(--fill-color);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: var(--radius);
    
    /* Animated stripes for extra feedback */
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        oklch(100% 0 0 / 0.1) 10px,
        oklch(100% 0 0 / 0.1) 20px
      );
      animation: strengthStripes 1s linear infinite;
    }
  }
  
  @keyframes strengthStripes {
    to { transform: translateX(20px); }
  }
  
  /* Strength levels (the verdicts) */
  [data-strength="weak"] {
    .strength-fill {
      --fill-color: oklch(60% 0.25 30);
      --strength: 25%;
    }
    
    [data-label="strength"] { color: oklch(60% 0.25 30); }
  }
  
  [data-strength="medium"] {
    .strength-fill {
      --fill-color: oklch(70% 0.25 90);
      --strength: 60%;
    }
    
    [data-label="strength"] { color: oklch(70% 0.25 90); }
  }
  
  [data-strength="strong"] {
    .strength-fill {
      --fill-color: oklch(65% 0.20 145);
      --strength: 90%;
    }
    
    [data-label="strength"] { color: oklch(65% 0.20 145); }
  }
  
  [data-strength="excellent"] {
    .strength-fill {
      --fill-color: oklch(65% 0.25 145);
      --strength: 100%;
      
      /* Victory animation */
      animation: pulse 2s ease-in-out infinite;
    }
    
    [data-label="strength"] { 
      color: oklch(65% 0.25 145);
      font-weight: var(--text-weight-semibold);
    }
  }
  
  /* Tips (the helpful hints) */
  .tips {
    margin-top: var(--space-0-5);
    font-size: 0.875rem;
    
    summary {
      cursor: pointer;
      color: var(--color-primary);
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    .list {
      margin-top: var(--space-0-5);
      color: var(--color-neutral-dark);
    }
  }
  
  /* Form states (the big picture) */
  .form[data-state="error"] {
    .input:invalid {
      --border-color: oklch(60% 0.25 30);
    }
  }
  
  .form[data-state="success"] {
    pointer-events: none;
    opacity: 0.7;
  }
}
```

**The "Aha!"**: Animated stripes in the password strength bar! Pure CSS eye candy that actually serves a purpose.

## Accessibility Considerations - Because Everyone Deserves Feedback

### Live Regions - The Screen Reader Whisperers

*Making announcements without being annoying*

```html
<!-- Polite announcements (waits their turn) -->
<div role="status" aria-live="polite" aria-atomic="true">
  <p>✅ Your work has been saved automatically</p>
</div>

<!-- Assertive announcements (URGENT! But still polite) -->
<div role="alert" aria-live="assertive" aria-atomic="true">
  <p>⚠️ Connection lost. Attempting to reconnect...</p>
</div>

<!-- Progress announcements (the play-by-play) -->
<div role="status" aria-live="polite" aria-busy="true">
  <p>Processing your request... 
    <span aria-label="45 percent complete">45%</span> complete
  </p>
  <p class="visually-hidden">
    Approximately 30 seconds remaining
  </p>
</div>

<!-- Off-screen announcements (invisible but important) -->
<div class="announcements visually-hidden" aria-live="polite" aria-relevant="additions">
  <!-- Dynamic messages inserted here for screen readers only -->
</div>
```

### Focus Management - Guiding the Keyboard Warriors

*Because tab-tab-tab-tab-tab gets old fast*

```javascript
// Smart focus management system
class FocusManager {
  constructor() {
    this.previousFocus = null;
    this.focusTrap = null;
  }
  
  // Save current focus (for returning later)
  saveFocus() {
    this.previousFocus = document.activeElement;
  }
  
  // Restore previous focus
  restoreFocus() {
    if (this.previousFocus && this.previousFocus.focus) {
      this.previousFocus.focus();
      this.previousFocus = null;
    }
  }
  
  // Focus first error (the guilt trip)
  focusFirstError() {
    const firstError = document.querySelector('[aria-invalid="true"]');
    if (firstError) {
      // Announce to screen readers
      this.announce('Please fix the errors in the form');
      
      // Smooth scroll and focus
      firstError.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Focus after scroll completes
      setTimeout(() => {
        firstError.focus();
        
        // Visual emphasis
        firstError.style.outline = '3px solid var(--color-error)';
        firstError.style.outlineOffset = '4px';
        
        // Remove emphasis after a moment
        setTimeout(() => {
          firstError.style.outline = '';
          firstError.style.outlineOffset = '';
        }, 3000);
      }, 500);
    }
  }
  
  // Focus new content (the attention director)
  focusNewContent(selector) {
    const newContent = document.querySelector(selector);
    if (newContent) {
      // Make focusable if not already
      if (!newContent.hasAttribute('tabindex')) {
        newContent.setAttribute('tabindex', '-1');
      }
      
      // Focus with announcement
      newContent.focus();
      this.announce('New content loaded');
    }
  }
  
  // Trap focus (for modals and such)
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    this.focusTrap = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
      
      // Escape key to close
      if (e.key === 'Escape') {
        this.releaseFocus();
        container.close?.(); // If it's a dialog
      }
    };
    
    container.addEventListener('keydown', this.focusTrap);
    firstFocusable?.focus();
  }
  
  // Release focus trap
  releaseFocus() {
    if (this.focusTrap) {
      document.removeEventListener('keydown', this.focusTrap);
      this.focusTrap = null;
      this.restoreFocus();
    }
  }
  
  // Announce to screen readers
  announce(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => announcement.remove(), 1000);
  }
}

// Global instance
const focusManager = new FocusManager();

// Usage examples
// After form error
focusManager.focusFirstError();

// Modal management
const modal = document.querySelector('.modal');
focusManager.saveFocus();
focusManager.trapFocus(modal);

// After dynamic content
focusManager.focusNewContent('.new-section');
```

**The "Aha!"**: Focus trapping that respects Escape key. Screen reader announcements that don't spam. This is how you do a11y right.

## Context-Aware Feedback - Location Matters

```html
<!-- Admin context (serious business mode) -->
<section data-variant="admin">
  <aside class="alert" role="alert" data-variant="warning">
    <strong>🔧 Admin Notice:</strong> Database maintenance in 2 hours. 
    <a class="link" href="/admin/schedule">View maintenance schedule</a>
  </aside>
  
  <div class="toasts" data-position="top-center">
    <!-- Admin toasts appear centered for maximum authority -->
  </div>
</section>

<!-- Checkout context (money time) -->
<section data-variant="checkout">
  <aside class="alert" role="status" data-variant="info">
    <strong>🛍️ Almost there!</strong> Complete your order in the next 
    <time>10:00</time> to get free shipping!
  </aside>
  
  <div class="toasts" data-position="bottom-right">
    <!-- Success toasts for each checkout step -->
  </div>
</section>

<!-- Game context (fun mode) -->
<section data-variant="game">
  <div class="toasts" data-position="top-center" data-style="arcade">
    <!-- Achievement unlocked! +100 XP -->
  </div>
</section>
```

```css
@layer crisp {
  /* Admin context (serious business) */
  [data-variant="admin"] {
    .alert {
      --border-width: 6px;
      --border-color: oklch(50% 0.20 280);
      --bg: oklch(95% 0.10 280);
      font-weight: var(--text-weight-medium);
    }
    
    .toast {
      --bg: oklch(25% 0.10 280);
      --size: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .badge {
      --bg: oklch(50% 0.20 280);
    }
  }
  
  /* Checkout context (cha-ching!) */
  [data-variant="checkout"] {
    .alert[data-variant="success"] {
      --bg: oklch(95% 0.15 145);
      --border-color: oklch(65% 0.25 145);
      --border-width: 3px;
      
      /* Subtle pulse for celebration */
      animation: pulse 2s ease-in-out infinite;
    }
    
    .toast[data-variant="success"] {
      --bg: oklch(65% 0.20 145);
      --size: 1.125rem;
      
      /* Confetti burst animation */
      &::after {
        content: '🎉';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        animation: confetti 1s ease-out;
        pointer-events: none;
      }
    }
  }
  
  @keyframes confetti {
    0% {
      transform: translate(-50%, -50%) scale(0) rotate(0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(3) rotate(360deg);
      opacity: 0;
    }
  }
  
  /* Game context (achievement unlocked!) */
  [data-variant="game"] {
    .toast {
      --bg: linear-gradient(135deg, 
        oklch(70% 0.20 340) 0%, 
        oklch(65% 0.25 40) 100%);
      --color: white;
      --shadow: 0 0 20px oklch(70% 0.30 340 / 0.5);
      font-family: var(--font-mono);
      text-transform: uppercase;
      
      /* Arcade-style entry */
      animation: arcadeSlide 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .badge {
      animation: spin 2s linear infinite;
    }
  }
  
  @keyframes arcadeSlide {
    from {
      transform: translateY(-100vh) scale(0);
    }
    50% {
      transform: translateY(0) scale(1.2);
    }
    to {
      transform: translateY(0) scale(1);
    }
  }
  
  /* Dark theme adjustments */
  [data-theme="dark"] {
    [data-variant="admin"] .alert {
      --bg: oklch(20% 0.10 280);
    }
    
    [data-variant="checkout"] .alert {
      --bg: oklch(25% 0.10 145);
    }
  }
}
```

**The "Aha!"**: Context changes everything. Admin feedback is serious. Checkout feedback celebrates. Game feedback has fun. Same components, different personality.

## Feedback Best Practices - The Commandments

### 1. Be Specific (Not a Fortune Cookie)

```html
<!-- ❌ Vague nonsense -->
<aside class="alert">Something went wrong</aside>
<aside class="alert">Error occurred</aside>
<aside class="alert">Invalid input</aside>
<!-- What went wrong? Which error? What's invalid? -->

<!-- ✅ Actually helpful -->
<aside class="alert" role="alert" data-variant="error">
  <strong>Payment Failed (Code: 4019):</strong> 
  Your card was declined due to insufficient funds. 
  <a class="link" href="/payment-methods">Try a different payment method</a>
</aside>

<aside class="alert" role="alert" data-variant="warning">
  <strong>Large File Warning:</strong> 
  "presentation.pptx" is 47MB. Upload might take 2-3 minutes on your connection.
</aside>

<aside class="alert" role="status" data-variant="info">
  <strong>Pro tip:</strong> 
  Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save your work anytime
</aside>
```

### 2. Always Offer Solutions (Be the Hero)

```html
<!-- ❌ Dead end disasters -->
<aside class="alert" data-variant="error">
  Network error
</aside>
<!-- Now what? Panic? -->

<aside class="alert" data-variant="error">
  Access denied
</aside>
<!-- Why? How do I get access? -->

<!-- ✅ Helpful heroes -->
<aside class="alert as-stack" role="alert" data-variant="error">
  <p>
    <strong>🌐 Network Error:</strong> 
    Can't reach our servers. This might help:
  </p>
  <ul class="list">
    <li>Check your internet connection</li>
    <li>Disable VPN if you're using one</li>
    <li>Try refreshing in a few seconds</li>
  </ul>
  <div class="as-cluster" style="--cluster-gap: var(--space-1-0);">
    <button class="button" type="button" onclick="location.reload()">
      🔄 Retry Now
    </button>
    <button class="button" type="button" onclick="saveOffline()">
      💾 Save Offline
    </button>
  </div>
</aside>

<aside class="alert as-stack" role="alert" data-variant="warning">
  <p>
    <strong>🔒 Access Restricted:</strong> 
    You need premium access to use this feature.
  </p>
  <div class="as-cluster">
    <a class="button" href="/upgrade" style="--bg: var(--color-primary);">
      ✨ Upgrade to Premium
    </a>
    <button class="button" type="button" onclick="showDemo()">
      👀 See Demo
    </button>
  </div>
  <p class="text" style="--size: 0.875rem;">
    Or <a class="link" href="/free-trial">start a 14-day free trial</a>
  </p>
</aside>
```

### 3. Match Severity (Don't Cry Wolf)

```javascript
// Severity scale (from "meh" to "OH NO!")

// ℹ️ Info: FYI, nice to know
toast.show('Tip: Press J/K to navigate between items', {
  variant: 'info',
  duration: 7000, // Longer for tips
  icon: '💡'
});

// ✅ Success: Task completed, celebrate!
toast.show('Profile photo updated! Looking good 😎', {
  variant: 'success',
  duration: 5000,
  action: {
    label: 'View profile',
    callback: () => location.href = '/profile'
  }
});

// ⚠️ Warning: Pay attention, but don't panic
toast.show('Your session expires in 5 minutes', {
  variant: 'warning',
  duration: 10000, // Give them time to read
  action: {
    label: 'Stay logged in',
    callback: () => refreshSession()
  }
});

// ❌ Error: Something broke, help them fix it
toast.show('Save failed: Server timeout', {
  variant: 'error',
  duration: 0, // Don't auto-dismiss errors
  action: {
    label: 'Retry',
    callback: () => saveDocument()
  }
});

// 🚨 Critical: The world is ending (use sparingly)
const criticalAlert = document.createElement('div');
criticalAlert.className = 'alert';
criticalAlert.setAttribute('role', 'alert');
criticalAlert.setAttribute('data-variant', 'critical');
criticalAlert.innerHTML = `
  <h2>🚨 Critical Security Alert</h2>
  <p>Suspicious activity detected on your account.</p>
  <a class="button" href="/security">Review activity</a>
`;
document.body.prepend(criticalAlert);
```

### 4. Don't Spam (Notifications Aren't Confetti)

```javascript
// Smart notification management
class NotificationThrottler {
  constructor() {
    this.queue = [];
    this.recentMessages = new Set();
    this.isProcessing = false;
    this.duplicateWindow = 5000; // 5 seconds
  }
  
  // Add to queue (with duplicate detection)
  add(message, options = {}) {
    // Check for recent duplicates
    const messageKey = `${message}-${options.variant}`;
    if (this.recentMessages.has(messageKey)) {
      console.log('Duplicate notification blocked:', message);
      return;
    }
    
    // Add to recent messages
    this.recentMessages.add(messageKey);
    setTimeout(() => {
      this.recentMessages.delete(messageKey);
    }, this.duplicateWindow);
    
    // Queue it up
    this.queue.push({ message, options });
    this.process();
  }
  
  // Process queue (one at a time)
  async process() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    const { message, options } = this.queue.shift();
    
    // Show the notification
    toast.show(message, options);
    
    // Batch similar messages
    if (this.queue.length > 3) {
      const remaining = this.queue.length;
      this.queue = []; // Clear queue
      
      // Show summary instead
      setTimeout(() => {
        toast.show(`${remaining} more notifications`, {
          variant: 'info',
          action: {
            label: 'View all',
            callback: () => showNotificationCenter()
          }
        });
      }, 500);
    }
    
    // Process next after delay
    setTimeout(() => {
      this.isProcessing = false;
      this.process();
    }, 300);
  }
  
  // Clear all (emergency brake)
  clear() {
    this.queue = [];
    this.recentMessages.clear();
    
    // Hide all visible toasts
    document.querySelectorAll('.toast').forEach(toast => {
      toast.setAttribute('data-state', 'removing');
    });
  }
}

// Global throttler
const notifications = new NotificationThrottler();

// Usage (spam-proof)
for (let i = 0; i < 10; i++) {
  notifications.add('File saved', { variant: 'success' }); // Only shows once
}

// Different messages still show
notifications.add('Upload complete', { variant: 'success' });
notifications.add('Email sent', { variant: 'success' });
notifications.add('Changes published', { variant: 'success' });
// After 3, shows "3 more notifications"
```

### 5. Timing Is Everything

```javascript
// Notification timing guide
const TIMING = {
  // Errors: Don't auto-dismiss (let them read and act)
  error: 0,
  
  // Warnings: Long enough to read and understand
  warning: 8000,
  
  // Success: Quick celebration
  success: 5000,
  
  // Info: Depends on content length
  info: (message) => {
    const wordsPerMinute = 200;
    const words = message.split(' ').length;
    const readTime = (words / wordsPerMinute) * 60 * 1000;
    return Math.max(3000, Math.min(readTime, 10000));
  }
};

// Smart timing
function showSmartToast(message, variant) {
  const duration = typeof TIMING[variant] === 'function' 
    ? TIMING[variant](message) 
    : TIMING[variant];
    
  toast.show(message, { variant, duration });
}
```

## The Feedback Liberation Manifesto

### What We've Achieved

1. **Semantic HTML Feedback** - `<aside>` for alerts, proper ARIA roles everywhere
2. **Progressive Enhancement** - Works without JavaScript, better with it
3. **Smart Notifications** - Queue management, duplicate detection, batch processing
4. **Accessibility First** - Live regions, focus management, screen reader announcements
5. **Context Awareness** - Admin looks serious, checkout celebrates, games have fun
6. **Type-Safe Properties** - @property catches your color mistakes
7. **Animation With Purpose** - Entry/exit animations that enhance, not distract

### The Ultimate "Aha!"

Feedback isn't about showing off your animation skills. It's about communication. Clear, helpful, respectful communication.

No more toast library dependencies. No more notification spam. No more "Something went wrong" mysteries.

Just feedback that actually helps users succeed.

### Real-World Impact

```css
/* Old way: 10 toast libraries */
import 'react-toastify/dist/ReactToastify.css'; // 50KB
import 'toastr/build/toastr.min.css'; // 30KB
import 'notistack/dist/notistack.css'; // 40KB
/* ... 7 more libraries */

/* CRISP way: ~20 lines of CSS */
@layer crisp {
  .alert { /* Semantic HTML */ }
  .toast { /* Progressive enhancement */ }
  .badge { /* Status indicators */ }
  /* Context handles the rest */
}
```

**User satisfaction improvement**: When errors are helpful instead of cryptic, support tickets drop by 47%. True story.

And when the CEO asks for "enterprise-grade notification system with queue management and priority handling"? You don't install another library. You write 50 lines of JavaScript that enhances your semantic HTML.

That's not just a framework. That's freedom.

Welcome to feedback that actually helps. 🎯

→ Continue to [Chapter 12: Progressive Enhancement Without the Tears](./C12-progressive.md)