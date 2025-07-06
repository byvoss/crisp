# Chapter 8: Containers - Boxes That Contain Things

*Or: The art of putting stuff inside other stuff without losing your mind*

## The Container Conundrum

Remember this architectural nightmare?

```css
/* Monday: "Let's use Bootstrap!" */
.container { }
.container-fluid { }
.container-sm { }
.container-md { }
.container-lg { }
.container-xl { }
.container-xxl { }
/* Plus 47 breakpoint variations */

/* Tuesday: "Actually, let's go custom" */
.card-container { }
.card-container-with-shadow { }
.card-container-with-shadow-large { }
.modal-container { }
.modal-container-centered { }
.sidebar-container { }
/* Death by container proliferation */

/* Wednesday: "Maybe BEM will save us?" */
.container { }
.container--card { }
.container--modal { }
.container__header { }
.container__body { }
.container__footer { }
/* Spoiler: It didn't */

/* Thursday: *Discovers CSS-in-JS* */
const Container = styled.div`
  ${props => props.card && 'padding: 20px;'}
  ${props => props.modal && 'position: fixed;'}
  /* My component is now 500 lines */
`;

/* Friday: *Quits development, opens bakery* */
```

**The "Aha!"**: What if containers were just... semantic HTML with sensible defaults?

## The CRISP Container Philosophy

*One container class. Infinite possibilities. Zero therapy bills.*

```html
<!-- It's just a card -->
<article class="card">
  <h2>I'm content in a box</h2>
  <p>That's it. That's the tweet.</p>
</article>

<!-- Need spacing? Use layouts -->
<article class="card as-stack">
  <h2>Now I have rhythm</h2>
  <p>Spacing handled by layout utilities</p>
  <button class="button">Click me</button>
</article>

<!-- Need variations? Use properties -->
<article class="card" style="--padding: var(--space-2-0);">
  <h2>Custom padding without new classes</h2>
</article>

<!-- Need context? Use data attributes -->
<article class="card" data-variant="premium">
  <h2>Context-aware styling</h2>
</article>
```

**Mind = Blown**: No `.card-lg`, no `.card-primary`, no `.card-with-spacing-2`. Just a card.

## Container Rules That Rule

### Rule 1: Containers Are Semantic

```html
<!-- ❌ DIV soup -->
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
  <div class="card-footer">Footer</div>
</div>

<!-- ✅ Semantic HTML -->
<article class="card">
  <header>Title</header>
  <p>Content</p>
  <footer>Footer</footer>
</article>

<!-- Even better with proper heading levels -->
<article class="card as-stack">
  <h2 class="heading">Article Title</h2>
  <p class="text">Article content that makes sense</p>
  <footer class="meta">Published today</footer>
</article>
```

**The "Aha!"**: The browser already knows what these elements are. Why fight it?

### Rule 2: Type-Safe Container Properties

```css
@layer crisp {
  .card {
    /* Type-safe properties with @property */
    @property --bg {
      syntax: "<color>";
      inherits: false;
      initial-value: var(--color-surface);
    }
    
    @property --padding {
      syntax: "<length>";
      inherits: false;
      initial-value: var(--space-1-5);
    }
    
    @property --radius {
      syntax: "<length>";
      inherits: false;
      initial-value: var(--radius-lg);
    }
    
    /* Define ALL defaults */
    --border: 1px solid var(--color-border);
    --shadow: var(--shadow-default);
    
    /* Use them */
    background: var(--bg);
    padding: var(--padding);
    border: var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }
}
```

**Pro tip**: The browser validates your custom properties. `--padding: "lots"` won't work!

### Rule 3: Containers Don't Define Layout

*That's what layout utilities are for, Karen*

```html
<!-- ❌ Container trying to be a layout -->
<div class="card card-grid-3-columns">
  <!-- Stop it -->
</div>

<!-- ✅ Container + Layout utility -->
<article class="card">
  <div class="as-grid" style="--grid-columns: 3;" data-entries="3">
    <div>Clean</div>
    <div>Separation</div>
    <div>Of concerns</div>
  </div>
</article>

<!-- Stacking content inside a card -->
<article class="card as-stack">
  <h2 class="heading">Card Title</h2>
  <p class="text">Card content</p>
  <div class="as-cluster" data-entries="2">
    <button class="button">Cancel</button>
    <button class="button" style="--bg: var(--color-primary);">Save</button>
  </div>
</article>
```

## Core Container Types

### Card - The Swiss Army Knife

*If containers were superheroes, Card would be Superman (boring but reliable)*

```css
@layer crisp {
  .card {
    /* The classics */
    --bg: var(--color-surface);
    --padding: var(--space-1-5);
    --radius: var(--radius-lg);
    --border: 1px solid var(--color-border);
    --shadow: none;
    
    /* Apply them */
    background: var(--bg);
    padding: var(--padding);
    border-radius: var(--radius);
    border: var(--border);
    box-shadow: var(--shadow);
    
    /* Contain the floats (yes, people still use floats) */
    overflow: hidden;
    
    /* For absolute positioning inside */
    position: relative;
    
    /* Stacking context for shadows */
    isolation: isolate;
  }
  
  /* Dark theme? We got you */
  [data-theme="dark"] .card {
    --bg: oklch(20% 0.01 250);
    --border: 1px solid oklch(30% 0.02 250);
  }
}
```

Usage examples that spark joy:

```html
<!-- Basic card (works everywhere) -->
<article class="card">
  <h3>Simple Card</h3>
  <p>Just works™</p>
</article>

<!-- Card with image -->
<article class="card" style="--padding: 0;">
  <img class="image" src="hero.jpg" alt="Hero image">
  <div style="padding: var(--space-1-5);">
    <h3 class="heading">Image Card</h3>
    <p class="text">Padding only where needed</p>
  </div>
</article>

<!-- Clickable card (the whole thing!) -->
<article class="card">
  <a class="link" href="/details" style="
    display: block;
    padding: var(--space-1-5);
    margin: calc(var(--space-1-5) * -1);
    text-decoration: none;
  ">
    <h3 class="heading">Clickable Card</h3>
    <p class="text">The entire card is clickable</p>
  </a>
</article>

<!-- Premium card (context matters) -->
<article class="card" data-variant="premium">
  <h3 class="heading">✨ Premium Feature</h3>
  <p class="text">Styled by context</p>
</article>
```

### Panel - The Serious Container

*Like Card, but went to business school*

```css
@layer crisp {
  .panel {
    /* More serious than card */
    --bg: var(--color-background);
    --padding: var(--space-2-0);
    --border: 1px solid var(--color-border);
    --radius: var(--radius-md);
    
    background: var(--bg);
    padding: var(--padding);
    border: var(--border);
    border-radius: var(--radius);
    
    /* Panels often have headers */
    & > header:first-child {
      margin: calc(var(--padding) * -1);
      margin-bottom: var(--padding);
      padding: var(--space-1-0) var(--padding);
      border-bottom: var(--border);
      background: oklch(from var(--bg) calc(l - 0.02) c h);
    }
  }
}
```

```html
<!-- Dashboard panel -->
<section class="panel">
  <header>
    <h2 class="heading">Analytics</h2>
  </header>
  <div class="as-grid" data-entries="3">
    <div class="metric">Views: 1.2M</div>
    <div class="metric">Clicks: 45K</div>
    <div class="metric">Revenue: $12K</div>
  </div>
</section>

<!-- Collapsible panel (with details/summary) -->
<details class="panel">
  <summary style="cursor: pointer;">
    <h3 class="heading">Advanced Settings</h3>
  </summary>
  <div class="as-stack">
    <p>Hidden settings here</p>
  </div>
</details>
```

### Section - The Page Organizer

*Not really a container, but plays one on TV*

```css
@layer crisp {
  .section {
    /* Sections provide breathing room */
    --padding-block: var(--space-4-0);
    --padding-inline: 0;
    
    padding-block: var(--padding-block);
    padding-inline: var(--padding-inline);
    
    /* Often full-width with colored backgrounds */
    &[data-variant="highlight"] {
      --bg: var(--color-surface);
      background: var(--bg);
    }
    
    &[data-variant="dark"] {
      --bg: var(--color-neutral-90);
      background: var(--bg);
      color: var(--color-neutral-10);
    }
  }
}
```

```html
<!-- Hero section -->
<section class="section as-center" data-variant="dark" style="--center-height: 60vh;">
  <div class="as-container as-stack">
    <h1 class="heading" style="--size: 3rem;">Big Hero Energy</h1>
    <p class="text" style="--size: 1.25rem;">Subtitle that inspires action</p>
    <button class="button" style="--size: 1.125rem;">Get Started</button>
  </div>
</section>

<!-- Feature section -->
<section class="section">
  <div class="as-container">
    <h2 class="heading">Features</h2>
    <div class="as-grid" data-entries="3">
      <article class="card">Feature 1</article>
      <article class="card">Feature 2</article>
      <article class="card">Feature 3</article>
    </div>
  </div>
</section>
```

### Box - The Utility Container

*When you just need a box, man*

```css
@layer crisp {
  .box {
    /* Minimal styling */
    --bg: transparent;
    --padding: 0;
    --border: none;
    
    background: var(--bg);
    padding: var(--padding);
    border: var(--border);
    
    /* That's it. It's just a box */
  }
  
  /* Common box patterns */
  .box[data-variant="bordered"] {
    --border: 1px solid var(--color-border);
    --padding: var(--space-1-0);
  }
  
  .box[data-variant="shaded"] {
    --bg: var(--color-surface);
    --padding: var(--space-1-0);
  }
}
```

### Alert - The Attention Seeker

*Like a notification, but classier*

```css
@layer crisp {
  .alert {
    /* Defaults to info */
    --bg: var(--color-info-light);
    --color: var(--color-info-dark);
    --border: 1px solid var(--color-info);
    --padding: var(--space-1-0) var(--space-1-5);
    --radius: var(--radius-md);
    
    background: var(--bg);
    color: var(--color);
    border: var(--border);
    padding: var(--padding);
    border-radius: var(--radius);
    
    /* Icon space */
    &[data-icon]::before {
      content: attr(data-icon);
      margin-right: var(--space-0-75);
    }
    
    /* Semantic variants via data attributes */
    &[data-variant="success"] {
      --bg: var(--color-success-light);
      --color: var(--color-success-dark);
      --border: 1px solid var(--color-success);
    }
    
    &[data-variant="warning"] {
      --bg: var(--color-warning-light);
      --color: var(--color-warning-dark);
      --border: 1px solid var(--color-warning);
    }
    
    &[data-variant="error"] {
      --bg: var(--color-error-light);
      --color: var(--color-error-dark);
      --border: 1px solid var(--color-error);
    }
  }
}
```

```html
<!-- Info alert (default) -->
<div class="alert" role="alert">
  <strong>Heads up!</strong> This is some useful information.
</div>

<!-- Success alert with icon -->
<div class="alert" data-variant="success" data-icon="✅" role="alert">
  Your changes have been saved!
</div>

<!-- Dismissible alert -->
<div class="alert" data-variant="warning" role="alert">
  <div class="as-cluster" style="--cluster-align: space-between;">
    <span>⚠️ Your session will expire in 5 minutes</span>
    <button class="button" type="button" aria-label="Dismiss alert">×</button>
  </div>
</div>
```

## Advanced Container Patterns

### Modal - The Overlay Expert

*Native <dialog> element enters the chat*

```html
<!-- Native dialog (the future is now) -->
<dialog class="modal" id="confirm-modal">
  <article class="card as-stack">
    <header class="as-cluster" style="--cluster-align: space-between;">
      <h2 class="heading">Confirm Action</h2>
      <button class="button" type="button" onclick="this.closest('dialog').close()">
        ×
      </button>
    </header>
    
    <p class="text">Are you sure you want to do this?</p>
    
    <footer class="as-cluster" style="--cluster-align: flex-end;" data-entries="2">
      <button class="button" type="button" onclick="this.closest('dialog').close()">
        Cancel
      </button>
      <button class="button" type="button" style="--bg: var(--color-primary);">
        Confirm
      </button>
    </footer>
  </article>
</dialog>

<!-- Trigger -->
<button class="button" onclick="document.getElementById('confirm-modal').showModal()">
  Open Modal
</button>
```

```css
@layer crisp {
  .modal {
    /* Reset dialog styles */
    padding: 0;
    border: none;
    background: transparent;
    max-width: min(90vw, 600px);
    max-height: min(90vh, 800px);
    margin: auto;
    
    /* The backdrop (pure CSS!) */
    &::backdrop {
      background: oklch(0% 0 0 / 0.5);
      backdrop-filter: blur(4px);
    }
    
    /* Smooth entry */
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease-out;
    
    &[open] {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Using @starting-style for entry animation */
    @starting-style {
      &[open] {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  }
}
```

**The "Aha!"**: Native `<dialog>` has backdrop, focus trapping, and ESC key handling. For free!

### Accordion - The Space Saver

*Details/Summary: The unsung heroes of semantic HTML*

```html
<!-- Single accordion item -->
<details class="accordion">
  <summary class="accordion-trigger">
    <h3 class="heading">What is CRISP?</h3>
  </summary>
  <div class="accordion-content">
    <p class="text">CRISP is a CSS methodology that actually makes sense.</p>
  </div>
</details>

<!-- Accordion group -->
<div class="as-stack" data-entries="3" role="region" aria-label="FAQ">
  <details class="accordion">
    <summary>Question 1</summary>
    <div class="as-stack">
      <p>Answer 1</p>
    </div>
  </details>
  
  <details class="accordion">
    <summary>Question 2</summary>
    <div class="as-stack">
      <p>Answer 2</p>
    </div>
  </details>
  
  <details class="accordion" open>
    <summary>Question 3</summary>
    <div class="as-stack">
      <p>This one starts open</p>
    </div>
  </details>
</div>
```

```css
@layer crisp {
  .accordion {
    --border: 1px solid var(--color-border);
    --radius: var(--radius-md);
    
    border: var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    
    /* The trigger */
    summary {
      padding: var(--space-1-0) var(--space-1-5);
      background: var(--color-surface);
      cursor: pointer;
      user-select: none;
      
      /* Remove default arrow */
      list-style: none;
      
      /* Custom arrow */
      &::after {
        content: "▼";
        float: right;
        transition: transform 0.3s ease;
      }
      
      &:hover {
        background: oklch(from var(--color-surface) calc(l - 0.02) c h);
      }
    }
    
    /* Rotate arrow when open */
    &[open] summary::after {
      transform: rotate(180deg);
    }
    
    /* Content padding */
    & > :not(summary) {
      padding: var(--space-1-5);
    }
  }
}
```

### Tabs - The Navigator

*When accordions aren't enough*

```html
<!-- Tab container -->
<div class="tabs" role="tablist" data-entries="3">
  <!-- Tab triggers -->
  <button class="tab" role="tab" aria-selected="true" aria-controls="panel-1">
    Tab 1
  </button>
  <button class="tab" role="tab" aria-selected="false" aria-controls="panel-2">
    Tab 2
  </button>
  <button class="tab" role="tab" aria-selected="false" aria-controls="panel-3">
    Tab 3
  </button>
</div>

<!-- Tab panels -->
<div class="tab-panel" role="tabpanel" id="panel-1">
  <div class="as-stack">
    <h3>Panel 1</h3>
    <p>Content for first tab</p>
  </div>
</div>

<div class="tab-panel" role="tabpanel" id="panel-2" hidden>
  <div class="as-stack">
    <h3>Panel 2</h3>
    <p>Content for second tab</p>
  </div>
</div>

<div class="tab-panel" role="tabpanel" id="panel-3" hidden>
  <div class="as-stack">
    <h3>Panel 3</h3>
    <p>Content for third tab</p>
  </div>
</div>
```

## Container Composition

*Like Russian dolls, but useful*

```html
<!-- Dashboard layout with nested containers -->
<body class="as-stack" style="--stack-gap: 0;">
  <!-- Header -->
  <header class="section" data-variant="dark">
    <nav class="as-container as-cluster" data-entries="3">
      <a class="link">Logo</a>
      <div class="as-cluster" data-entries="3">
        <a class="link">Dashboard</a>
        <a class="link">Reports</a>
        <a class="link">Settings</a>
      </div>
    </nav>
  </header>
  
  <!-- Main content -->
  <main class="as-container as-sidebar" style="--sidebar-gap: var(--space-2-0);">
    <!-- Sidebar -->
    <aside class="panel as-stack">
      <h2>Filters</h2>
      <form class="as-stack">
        <!-- Filter controls -->
      </form>
    </aside>
    
    <!-- Content area -->
    <section class="as-stack">
      <!-- Metrics row -->
      <div class="as-grid" style="--grid-columns: 4;" data-entries="4">
        <article class="card">
          <h3 class="heading">Total Users</h3>
          <p class="metric">1,234</p>
        </article>
        <!-- More metrics -->
      </div>
      
      <!-- Data table -->
      <article class="panel">
        <header>
          <h2>Recent Activity</h2>
        </header>
        <table class="table">
          <!-- Table content -->
        </table>
      </article>
    </section>
  </main>
</body>
```

## Container Best Practices

### 1. Semantic HTML First

```html
<!-- ❌ Wrong -->
<div class="card">
  <div>Title</div>
  <div>Content</div>
</div>

<!-- ✅ Right -->
<article class="card">
  <h2>Title</h2>
  <p>Content</p>
</article>
```

### 2. Don't Nest Unnecessarily

```html
<!-- ❌ Div-itis -->
<div class="card">
  <div class="card-inner">
    <div class="card-content">
      <div class="card-text">
        Hello
      </div>
    </div>
  </div>
</div>

<!-- ✅ Direct and simple -->
<article class="card">
  <p>Hello</p>
</article>
```

### 3. Context Over Classes

```html
<!-- ❌ Class explosion -->
<div class="card card-premium card-large card-shadow">

<!-- ✅ Context + properties -->
<article class="card" data-variant="premium" style="--padding: var(--space-2-0);">
```

### 4. Containers Don't Constrain

```html
<!-- ❌ Container forcing layout -->
<div class="card three-column-layout">

<!-- ✅ Container + separate layout -->
<article class="card">
  <div class="as-grid" style="--grid-columns: 3;">
```

## The Container Manifesto

1. **Semantic HTML** - `<article>` for cards, `<section>` for sections
2. **One class per container** - No modifiers, no variants  
3. **Properties for customization** - `--padding`, `--bg`, not new classes
4. **Layouts are separate** - Containers contain, layouts lay out
5. **Context via data attributes** - `data-variant="premium"` not `.card-premium`
6. **Native elements when possible** - `<dialog>`, `<details>`, not divs
7. **Type safety with @property** - Let the browser validate

**The Ultimate "Aha!"**: You just learned every container pattern. No memorizing component variations. No checking if it's `.card-lg` or `.card-large`. 

Your containers are predictable. Your HTML is semantic. Your CSS is 80% smaller.

Welcome to containers that contain joy, not complexity.

→ Continue to [Chapter 9: Navigation That Goes Places](./C09-navigation.md)