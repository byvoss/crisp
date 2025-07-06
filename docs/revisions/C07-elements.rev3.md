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

One class. Infinite customisation. Zero variants.

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
  /* Your spinner here */
}
```

**The "Aha!"**: CSS has pseudo-classes. HTML has ARIA. Why are we inventing new systems?

## Core Elements Collection

### Text Elements

*Words, words, words - but make them CRISP*

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
    
    font-size: var(--size);
    font-weight: var(--weight);
    line-height: var(--leading);
  }
  
  /* Body text that's actually readable */
  .text {
    --size: var(--text-size-1-0);
    --leading: var(--text-leading-normal);
    --color: var(--color-text);
    
    font-size: var(--size);
    line-height: var(--leading);
    color: var(--color);
  }
  
  /* Links that don't make you guess */
  .link {
    --color: var(--color-primary);
    --decoration: underline;
    
    color: var(--color);
    text-decoration: var(--decoration);
    transition: all var(--transition-fast);
  }
  
  .link:hover {
    --color: oklch(from var(--color) calc(l + 0.1) c h);
  }
  
  /* Visited links? We remember those */
  .link:visited {
    --color: var(--color-primary-dark);
  }
}
```

### Interactive Elements

*Things that do things when you poke them*

```css
@layer crisp {
  /* Inputs that don't suck */
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
  
  /* Textareas that grow */
  .textarea {
    /* All input styles */
    @extend .input;
    
    /* But textareas can resize */
    resize: vertical;
    min-height: 3rem;
    field-sizing: content;
    max-height: 20rem;
  }
  
  /* Selects that don't look like they're from 1995 */
  .select {
    @extend .input;
    
    appearance: none;
    background-image: url("data:image/svg+xml,...");
    background-repeat: no-repeat;
    background-position: right var(--space-0-75) center;
    padding-right: var(--space-2-5);
  }
}
```

**The "Aha!"**: Native form elements can be beautiful. Who knew?

### Media Elements

*Pictures and videos, oh my!*

```css
@layer crisp {
  /* Images that behave */
  .image {
    --fit: cover;
    --position: center;
    
    max-width: 100%;
    height: auto;
    object-fit: var(--fit);
    object-position: var(--position);
    
    /* Lazy loading by default in 2025 */
    loading: lazy;
  }
  
  /* Picture element for art direction */
  .picture {
    display: contents;
  }
  
  .picture .image {
    width: 100%;
    height: 100%;
  }
  
  /* Videos that don't break layouts */
  .video {
    max-width: 100%;
    height: auto;
    
    /* Respect user preferences */
    @media (prefers-reduced-motion: reduce) {
      autoplay: false;
    }
  }
}
```

### Semantic Elements

*For when a div just won't do*

```css
@layer crisp {
  /* Time that makes sense */
  .time {
    --color: var(--color-text-muted);
    color: var(--color);
  }
  
  /* Code that looks like code */
  .code {
    --bg: var(--color-neutral-10);
    --color: var(--color-primary);
    --padding: var(--space-0-25) var(--space-0-5);
    --radius: var(--radius-sm);
    
    background: var(--bg);
    color: var(--color);
    padding: var(--padding);
    border-radius: var(--radius);
    font-family: var(--font-mono);
    font-size: 0.9em;
  }
  
  /* Keyboard shortcuts */
  .kbd {
    @extend .code;
    
    --bg: var(--color-neutral-5);
    --border: 1px solid var(--color-neutral-20);
    border: var(--border);
    box-shadow: 0 1px 0 var(--color-neutral-20);
  }
  
  /* Badges for counts and labels */
  .badge {
    --bg: var(--color-primary);
    --color: var(--color-on-primary);
    --size: 0.75rem;
    --padding: var(--space-0-25) var(--space-0-5);
    --radius: var(--radius-full);
    
    background: var(--bg);
    color: var(--color);
    font-size: var(--size);
    padding: var(--padding);
    border-radius: var(--radius);
    font-weight: var(--text-weight-medium);
  }
}
```

## The Element Philosophy

### 1. Elements are Self-Contained

```html
<!-- Works immediately, anywhere -->
<button class="button">Click me</button>

<!-- In a form -->
<form class="as-stack">
  <input class="input" type="email" placeholder="Email">
  <button class="button">Subscribe</button>
</form>

<!-- In a card -->
<article class="card as-stack">
  <h2 class="heading">Card Title</h2>
  <p class="text">Card content</p>
  <button class="button">Action</button>
</article>
```

**The "Aha!"**: Elements don't need context. They work everywhere.

### 2. Customisation via Properties

```html
<!-- Size variations -->
<button class="button" style="--size: 0.875rem;">Small</button>
<button class="button">Default</button>
<button class="button" style="--size: 1.125rem;">Large</button>

<!-- Color variations -->
<button class="button" style="--bg: var(--color-primary);">Primary</button>
<button class="button" style="--bg: var(--color-success);">Success</button>
<button class="button" style="--bg: var(--color-error);">Danger</button>

<!-- Any combination -->
<button class="button" style="
  --bg: var(--color-gradient);
  --size: 1.25rem;
  --radius: 9999px;
  --padding: var(--space-1-0) var(--space-2-0);
">
  Custom Everything
</button>
```

**Pro tip**: No need for `.button-sm`, `.button-primary-lg-rounded`. Just set the properties.

### 3. Context Awareness

Elements can adapt to their container:

```css
/* Buttons in a toolbar might be more compact */
.toolbar .button {
  --padding: var(--space-0-5) var(--space-1-0);
}

/* Inputs in a dense form */
[data-variant="compact"] .input {
  --padding: var(--space-0-5) var(--space-0-75);
  --size: 0.875rem;
}

/* Dark theme adjustments */
[data-theme="dark"] .input {
  --bg: var(--color-neutral-80);
  --border: 1px solid var(--color-neutral-60);
}
```

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

*Because users need to know what went wrong*

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

## The Element Manifesto

1. **One class per element** - No variants, no modifiers
2. **Properties for customisation** - Not classes
3. **ARIA for states** - Not data attributes
4. **Semantic HTML** - `<button>` not `<div class="button">`
5. **Context awareness** - Elements adapt to containers
6. **Type safety** - @property catches mistakes
7. **Progressive enhancement** - Modern features when available

**The Ultimate "Aha!"**: You just learned every element pattern you'll ever need. No memorising class names. No checking documentation. It's just HTML with nice defaults.

Welcome to elements that spark joy, not rage.

→ Continue to [Chapter 8: Containers That Contain](./C08-containers.md)