# Implementation Guide

## Getting Started with CRISP

### Basic HTML Structure

Start with semantic HTML and add CRISP classes progressively:

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRISP Implementation</title>
  <link rel="stylesheet" href="crisp-tokens.css">
  <link rel="stylesheet" href="crisp-components.css">
</head>
<body>
  <main class="as-container">
    <!-- Your content here -->
  </main>
</body>
</html>
```

### File Organisation

```
/css
├── crisp-tokens.css      # Design tokens
├── crisp-layouts.css     # Layout classes (as-)
├── crisp-components.css  # Component classes
├── crisp-properties.css  # Property classes (with-)
└── app.css              # Your custom styles
```

## Step-by-Step Implementation

### 1. Set Up Design Tokens

Create `crisp-tokens.css`:

```css
:root {
  /* Spacing */
  --space-0-5: 0.5rem;
  --space-1-0: 1rem;
  --space-1-5: 1.5rem;
  --space-2-0: 2rem;
  
  /* Colours */
  --colour-primary-50: hsla(220, 70%, 50%, 1);
  --colour-neutral-90: hsla(220, 10%, 90%, 1);
  
  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --text-size-1-0: 1rem;
  --text-weight-medium: 500;
  
  /* Effects */
  --transition-fast: 150ms ease;
  --radius-sm: 0.25rem;
}
```

### 2. Create Layout Classes

Create `crisp-layouts.css`:

```css
/* Stack Layout */
.as-stack {
  display: flex;
  flex-direction: column;
  gap: var(--stack-gap, var(--space-1-0));
}

/* Grid Layout */
.as-grid {
  display: grid;
  gap: var(--grid-gap, var(--space-1-0));
  grid-template-columns: repeat(
    auto-fit, 
    minmax(var(--grid-min, 250px), 1fr)
  );
}

/* Cluster Layout */
.as-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-gap, var(--space-0-5));
  align-items: var(--cluster-align, center);
  justify-content: var(--cluster-justify, flex-start);
}

/* Container */
.as-container {
  width: 100%;
  max-width: var(--container-width, var(--container-lg));
  margin-inline: auto;
  padding-inline: var(--container-padding, var(--space-1-5));
}
```

### 3. Build Core Components

Create `crisp-components.css`:

```css
/* Button Component */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding: var(--button-padding, var(--space-0-5) var(--space-1-0));
  background: var(--button-bg, var(--colour-neutral-90));
  color: var(--button-colour, currentColor);
  font-size: var(--button-size, 1rem);
  font-weight: var(--button-weight, var(--text-weight-medium));
  border-radius: var(--button-radius, var(--radius-sm));
  min-height: var(--button-height, 2.5rem);
  transition: transform var(--transition-fast);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Card Component */
.card {
  display: block;
  overflow: hidden;
  background: var(--card-bg, white);
  border-radius: var(--card-radius, var(--radius-md));
  padding: var(--card-padding, 0);
}

/* Navigation Component */
.nav {
  display: block;
}

.nav a {
  color: var(--nav-colour, currentColor);
  text-decoration: none;
  padding: var(--nav-padding, var(--space-0-5));
}

.nav [aria-current="page"] {
  font-weight: var(--text-weight-semibold);
}
```

### 4. Add Property Classes

Create `crisp-properties.css`:

```css
/* Shadow Property */
.with-shadow {
  position: relative;
  transform: translateZ(0);
}

.with-shadow::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--shadow-colour, var(--colour-neutral-20));
  opacity: var(--shadow-opacity, 0.15);
  filter: blur(var(--shadow-blur, 8px));
  transform: translateY(var(--shadow-y, 4px)) scale(var(--shadow-scale, 1));
  z-index: -1;
  border-radius: inherit;
}

/* Border Property */
.with-border {
  border: var(--border-width, 1px) solid 
          var(--border-colour, var(--colour-neutral-90));
}

/* Interaction Property */
.with-interaction {
  cursor: pointer;
  transition: transform var(--transition-fast);
  will-change: transform;
}

.with-interaction:hover {
  transform: translateY(-2px);
}

.with-interaction:active {
  transform: translateY(0);
}

/* Padding Property */
.with-padding {
  padding: var(--padding, var(--space-1-5));
}

/* Margin Property */
.with-margin {
  margin: var(--margin, var(--space-1-0));
}
```

## Real-World Example: Blog Post Card

### HTML Structure

```html
<article class="card as-stack with-shadow"
  role="article"
  aria-label="Blog post">
  
  <!-- Featured Image -->
  <img src="post-image.jpg" 
    alt="Post featured image"
    loading="lazy">
  
  <!-- Content -->
  <div class="card-content as-stack with-padding">
    <!-- Meta Information -->
    <div class="meta as-cluster" 
      style="--cluster-gap: var(--space-1-0);">
      <time datetime="2024-01-15">15 January 2024</time>
      <span aria-label="Reading time">5 min read</span>
    </div>
    
    <!-- Title -->
    <h2 class="title" style="--text-size: 1.5rem;">
      Understanding CRISP Pattern
    </h2>
    
    <!-- Excerpt -->
    <p class="excerpt">
      Learn how CRISP simplifies CSS architecture with semantic 
      classes and modern techniques...
    </p>
    
    <!-- Action -->
    <a href="/blog/understanding-crisp" 
      class="button with-interaction"
      style="--button-bg: var(--colour-primary-50);">
      Read More
    </a>
  </div>
</article>
```

### Supporting CSS

```css
/* Blog-specific customisations */
.card img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.card-content {
  --stack-gap: var(--space-1-0);
}

.meta {
  font-size: var(--text-size-0-875);
  color: var(--colour-neutral-50);
}

.title {
  font-size: var(--text-size, 1.25rem);
  font-weight: var(--text-weight-semibold);
  line-height: var(--text-height-tight);
}

.excerpt {
  color: var(--colour-neutral-30);
  line-height: var(--text-height-base);
}
```

## JavaScript Integration

### Using Semantic Selectors

```javascript
// Target by role attributes
document.querySelectorAll('[role="button"]').forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Target by aria attributes
document.querySelectorAll('[aria-expanded]').forEach(toggle => {
  toggle.addEventListener('click', handleToggle);
});

// Target by data-fn for special functionality
document.querySelectorAll('[data-fn="auto-save"]').forEach(form => {
  form.addEventListener('input', debounce(autoSave, 1000));
});
```

### Progressive Enhancement Example

```javascript
// Enhance navigation with smooth scroll
class CrispNavigation {
  constructor() {
    this.nav = document.querySelector('[role="navigation"]');
    if (!this.nav) return;
    
    this.enhance();
  }
  
  enhance() {
    // Add smooth scrolling to anchor links
    this.nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', this.smoothScroll.bind(this));
    });
  }
  
  smoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.hash);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}

// Initialise on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new CrispNavigation();
});
```

## Accessibility Checklist

When implementing CRISP components:

- [ ] All interactive elements have appropriate `role` attributes
- [ ] Form inputs have associated `<label>` elements
- [ ] Images have meaningful `alt` text
- [ ] Focus states are clearly visible
- [ ] Colour contrast meets WCAG AA standards
- [ ] Interactive elements are keyboard accessible
- [ ] Error messages use `role="alert"`
- [ ] Loading states are announced to screen readers

## Performance Optimisation

### CSS Loading Strategy

```html
<!-- Critical CSS inline -->
<style>
  /* Minimal CRISP tokens for above-the-fold content */
  :root {
    --space-1-0: 1rem;
    --colour-primary-50: hsla(220, 70%, 50%, 1);
  }
  .as-container { /* ... */ }
</style>

<!-- Full CSS async -->
<link rel="preload" href="/css/crisp.css" as="style">
<link rel="stylesheet" href="/css/crisp.css" 
  media="print" onload="this.media='all'">
```

### Component Lazy Loading

```javascript
// Load components on demand
const loadComponent = async (name) => {
  const module = await import(`./components/${name}.js`);
  return module.default;
};

// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const component = entry.target.dataset.component;
      loadComponent(component).then(Component => {
        new Component(entry.target);
      });
      observer.unobserve(entry.target);
    }
  });
});

// Observe components
document.querySelectorAll('[data-component]').forEach(el => {
  observer.observe(el);
});
```

## Testing CRISP Implementation

### Visual Regression Testing

```javascript
// Example using Playwright
test('Card component renders correctly', async ({ page }) => {
  await page.goto('/components/card');
  
  const card = await page.locator('.card.as-stack.with-shadow');
  await expect(card).toBeVisible();
  await expect(card).toHaveScreenshot('card-default.png');
});
```

### Accessibility Testing

```javascript
// Using axe-core
const runAccessibilityTests = async () => {
  const results = await axe.run('.card');
  expect(results.violations).toHaveLength(0);
};
```

## Common Patterns

### Form with Validation

```html
<form class="form as-stack with-border with-padding"
  role="form"
  aria-label="Contact form"
  data-fn="validate-on-submit">
  
  <div class="field as-stack" role="group">
    <label for="email">Email Address</label>
    <input class="input with-border"
      type="email"
      id="email"
      required
      aria-describedby="email-error">
    <span class="error" 
      id="email-error" 
      role="alert" 
      hidden>
      Please enter a valid email
    </span>
  </div>
  
  <button class="button with-interaction with-shadow"
    type="submit">
    Submit
  </button>
</form>
```

### Responsive Navigation

```html
<nav class="nav as-cluster" 
  role="navigation"
  aria-label="Primary navigation"
  style="--cluster-gap: var(--space-2-0);">
  
  <a href="/" aria-current="page">Home</a>
  <a href="/about">About</a>
  <a href="/services">Services</a>
  <a href="/contact">Contact</a>
</nav>

<style>
@media (max-width: 768px) {
  .nav.as-cluster {
    --cluster-gap: var(--space-1-0);
    --cluster-justify: center;
  }
}
</style>
```

## Next Steps

Learn how to migrate existing projects in the [Migration Guide](./06-migration.md).