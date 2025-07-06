# Chapter 12: From CSS to Enterprise Without Changing HTML

*Or: The same HTML, three levels of awesome*

## The Progressive Enhancement Promise

Remember the framework migration nightmare?

```javascript
// Monday: jQuery
$('.button').click(function() { });

// Tuesday: React
<Button onClick={handleClick} />

// Wednesday: Vue
<v-btn @click="handleClick">

// Thursday: Back to vanilla?
// *rewrites entire application*
```

## The CRISP Evolution Path

One HTML structure. Three capability levels. Zero rewrites.

```html
<!-- This HTML works at ALL levels -->
<button class="button with-interaction" 
  style="--bg: var(--color-primary);">
  Click Me
</button>
```

## Level 1: CRISP (~50KB) - Pure CSS Framework

### What You Get
- Complete design system
- All components and layouts
- Custom properties for customisation
- Zero JavaScript
- Works everywhere

### Example Implementation
```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <link rel="stylesheet" href="crisp.min.css">
</head>
<body>
  <!-- Pure CSS carousel -->
  <section class="carousel as-reel with-snap">
    <input class="radio" id="slide-1" type="radio" name="carousel" checked>
    <input class="radio" id="slide-2" type="radio" name="carousel">
    <input class="radio" id="slide-3" type="radio" name="carousel">
    
    <img class="image" src="1.jpg" alt="">
    <img class="image" src="2.jpg" alt="">
    <img class="image" src="3.jpg" alt="">
    
    <nav class="nav as-cluster">
      <label class="button" for="slide-1"></label>
      <label class="button" for="slide-2"></label>
      <label class="button" for="slide-3"></label>
    </nav>
  </section>
  
  <!-- Pure CSS tabs -->
  <div class="tabs" data-entries="2">
    <input class="radio" id="tab-1" type="radio" name="tabs" checked>
    <input class="radio" id="tab-2" type="radio" name="tabs">
    
    <nav class="navigation as-cluster" data-entries="2" data-variant="tabs">
      <label class="tab" for="tab-1">Tab 1</label>
      <label class="tab" for="tab-2">Tab 2</label>
    </nav>
    
    <div class="panels">
      <section class="panel">Content 1</section>
      <section class="panel">Content 2</section>
    </div>
  </div>
</body>
</html>
```

CSS for tabs (Define/Use pattern):
```css
.tabs {
  /* 1. Define defaults */
  --gap: var(--space-1-0);
  --radius: var(--radius-md);
  
  /* 2. Use the tokens */
  display: grid;
  gap: var(--gap);
}

.tab {
  /* 1. Define defaults */
  --bg: transparent;
  --color: var(--color-neutral);
  --padding: var(--space-0-75) var(--space-1-5);
  --border-width: 2px;
  --border-color: transparent;
  
  /* 2. Use the tokens */
  background: var(--bg);
  color: var(--color);
  padding: var(--padding);
  border-bottom: var(--border-width) solid var(--border-color);
  cursor: pointer;
  transition: all 250ms ease;
}

/* Active state */
input[type="radio"]:checked + .navigation .tab:nth-of-type(1),
input[type="radio"]:nth-of-type(2):checked ~ .navigation .tab:nth-of-type(2) {
  --border-color: var(--color-primary);
  --color: var(--color-primary);
}
```

### When to Use CRISP
- Static sites
- Blogs
- Documentation
- Landing pages
- Prototypes
- Any project that values simplicity

## Level 2: CRISP Theme (~60KB) - With Theme System

### What You Add
- Automatic theme detection
- Theme persistence
- Smooth transitions
- System preference sync
- Still works without JS

### Same HTML, More Features
```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <link rel="stylesheet" href="crisp.min.css">
  <script src="crisp-theme.min.js" defer></script>
</head>
<body>
  <!-- Exact same HTML -->
  <button class="button with-interaction" 
    style="--bg: var(--color-primary);">
    Click Me
  </button>
  
  <!-- Theme switcher (optional) -->
  <div class="theme-switcher as-cluster">
    <button class="button" data-function="theme" data-theme="light">Light</button>
    <button class="button" data-function="theme" data-theme="dark">Dark</button>
    <button class="button" data-function="theme" data-theme="auto">Auto</button>
  </div>
</body>
</html>
```

### Theme JavaScript (~10KB)
```javascript
// Automatic theme detection
(function() {
  // Check for saved preference
  const saved = localStorage.getItem('theme');
  const theme = saved || 'auto';
  
  // Apply theme
  if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  // Listen for system changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'auto') {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
  
  // Theme switcher
  document.querySelectorAll('[data-function="theme"]').forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.getAttribute('data-theme');
      localStorage.setItem('theme', theme);
      
      if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
    });
  });
})();
```

### When to Use CRISP Theme
- Marketing sites
- Blogs with dark mode
- Small applications
- Client websites
- Any project needing themes

## Level 3: CRISP Enterprise (~150KB) - Full Framework

### What You Add
- TypeScript components
- Full type safety
- i18n system
- Reactive attributes
- Advanced interactions
- Still progressive enhancement

### Same HTML, Maximum Power
```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <link rel="stylesheet" href="crisp.min.css">
  <script type="module" src="crisp-enterprise.min.js"></script>
</head>
<body data-lang="en-GB">
  <!-- EXACT same HTML, now with superpowers -->
  <button class="button with-interaction" 
    data-function="submit"
    data-i18n="actions.submit"
    style="--bg: var(--color-primary);">
    Click Me
  </button>
  
  <!-- Reactive form -->
  <form class="form as-stack" 
    data-function="form"
    data-validate="true"
    data-submit="async">
    
    <input class="input" 
      type="email" 
      name="email"
      data-function="input"
      data-validate="email"
      required>
    
    <button class="button" type="submit">
      Submit
    </button>
  </form>
</body>
</html>
```

### TypeScript Component Example
```typescript
// button.ts
export class Button extends CRISPComponent {
  static observedAttributes = ['disabled', 'loading'];
  
  connectedCallback() {
    // Progressive enhancement
    this.addEventListener('click', this.handleClick);
    
    // Add ripple effect
    this.addEventListener('click', this.createRipple);
  }
  
  handleClick = async (e: Event) => {
    if (this.loading) {
      e.preventDefault();
      return;
    }
    
    // Track analytics
    this.track('button_click', {
      label: this.textContent,
      variant: this.style.getPropertyValue('--bg')
    });
  }
  
  createRipple = (e: MouseEvent) => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    // Ripple implementation
  }
  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'loading') {
      this.ariaBusy = newValue === 'true' ? 'true' : 'false';
      this.setAttribute('data-variant', newValue === 'true' ? 'loading' : '');
    }
  }
}

// Auto-register components
document.querySelectorAll('[data-function="submit"]').forEach(el => {
  new Button(el);
});
```

### i18n System
```typescript
// i18n configuration
const translations = {
  'en-GB': {
    actions: {
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save'
    }
  },
  'de-DE': {
    actions: {
      submit: 'Absenden',
      cancel: 'Abbrechen',
      save: 'Speichern'
    }
  }
};

// Auto-translate on load
document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.getAttribute('data-i18n');
  const lang = document.body.getAttribute('data-lang') || 'en-GB';
  el.textContent = getTranslation(lang, key);
});
```

### When to Use CRISP Enterprise
- International applications
- Complex web apps
- Enterprise software
- Teams needing TypeScript
- Projects requiring strict validation

## Migration Path

### From CRISP to CRISP Theme
```html
<!-- Step 1: Add theme script -->
<script src="crisp-theme.min.js" defer></script>

<!-- That's it. Your HTML doesn't change. -->
```

### From CRISP Theme to Enterprise
```html
<!-- Step 1: Add enterprise script -->
<script type="module" src="crisp-enterprise.min.js"></script>

<!-- Step 2: Add data-function where needed (optional) -->
<button class="button" data-function="submit">

<!-- Step 3: Add i18n keys (optional) -->
<button class="button" data-function="submit" data-i18n="actions.submit">
```

## The Beautiful Truth

### What Stays the Same
- HTML structure
- CSS classes
- Custom properties
- Accessibility
- Semantic markup

### What Gets Enhanced
- **CRISP**: Just CSS
- **+ Theme**: Dynamic themes
- **+ Enterprise**: TypeScript, i18n, reactivity

### No Breaking Changes
```html
<!-- This button works in all three levels -->
<button class="button with-interaction" 
  style="--bg: var(--color-primary);">
  Always Works
</button>

<!-- Progressive enhancement in action -->
<button class="button with-interaction" 
  data-function="submit"             <!-- Enterprise only -->
  data-haptic="true"                <!-- Enterprise only -->
  data-analytics="cta-primary"      <!-- Enterprise only -->
  style="--bg: var(--color-primary);">
  Enhanced When Available
</button>
```

## Real World Example

### E-commerce Product Card
```html
<!-- Works at all levels -->
<article class="card as-stack with-shadow" data-variant="product">
  <img class="image" src="product.jpg" alt="Product">
  
  <div class="as-stack">
    <h3 class="heading">Product Name</h3>
    <p class="price" data-i18n-number="currency">£99.99</p>
    <p class="text">Product description</p>
  </div>
  
  <button class="button with-interaction" 
    data-function="buy"
    data-product-id="123"
    style="--bg: var(--color-primary);">
    Add to Cart
  </button>
</article>
```

CSS for product context:
```css
[data-variant="product"] {
  /* 1. Define context tokens */
  --spacing: var(--space-1-5);
  --highlight: var(--color-primary);
  
  /* 2. Apply to children */
  .card {
    --padding: var(--spacing);
  }
  
  .price {
    --color: var(--highlight);
    --size: var(--text-size-1-25);
    --weight: var(--text-weight-bold);
  }
}
```

**Level 1 (CRISP)**: Beautiful static card
**Level 2 (Theme)**: Adapts to dark/light mode
**Level 3 (Enterprise)**: 
- Price localises to user's currency
- Button adds haptic feedback
- Analytics tracking
- Inventory checking
- Loading states

## The Progressive Promise

With CRISP's progressive enhancement:
- Start simple, enhance later
- Never rewrite HTML
- Each level is production-ready
- Graceful degradation built-in
- Context-aware styling via data attributes
- Your future self thanks you

Your HTML is eternal. Your capabilities are progressive. Your users are happy.

And when the PM asks for "enterprise features"? You don't rewrite your HTML. You add data attributes and progressive JavaScript. That's the power of true progressive enhancement.

→ Continue to [Chapter 13: Common Patterns & Clever Tricks](./C13-patterns.md)