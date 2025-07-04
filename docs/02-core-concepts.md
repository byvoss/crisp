# Core Concepts

## The CRISP Formula

Every CRISP element follows this pattern:

```html
<element class="[component] [as-layout] [with-property]" 
  role="[function]"
  aria-label="[description]"
  style="--property: value;">
  Content
</element>
```

## Class System

### Semantic Class Prefixes

CRISP uses semantic prefixes to clearly identify the purpose of each class:

1. **No prefix** - Core components (`card`, `button`, `nav`)
2. **`as-`** - Layout modes (`as-stack`, `as-grid`, `as-cluster`)
3. **`with-`** - Additional properties (`with-shadow`, `with-border`)

This creates self-documenting HTML that reads like natural language:

```html
<!-- Reads as: "Article card displayed as stack with shadow" -->
<article class="card as-stack with-shadow">
  Content
</article>

<!-- Reads as: "Navigation displayed as cluster with sticky positioning" -->
<nav class="nav as-cluster with-sticky">
  Links
</nav>
```

### Maximum Three Classes Rule

Each element may have up to three classes:

```html
<!-- Component + Layout + Property -->
<article class="card as-stack with-shadow">
  All three types
</article>

<!-- Component + Property -->
<button class="button with-interaction">
  Two classes
</button>

<!-- Layout only -->
<div class="as-grid">
  One class
</div>
```

## Class Categories

### Core Components (No Prefix)

Base building blocks of your interface:

- `button` - Interactive button
- `card` - Content container
- `nav` - Navigation element
- `form` - Form container
- `table` - Data table
- `list` - List container

```html
<button class="button" role="button">
  Click me
</button>

<article class="card" role="article">
  Content
</article>
```

### Layout Classes (as-)

Control spatial arrangement and display:

- `as-stack` - Vertical rhythm with consistent spacing
- `as-cluster` - Horizontal grouping with wrap
- `as-grid` - Two-dimensional layouts
- `as-centre` - Perfect centring
- `as-sidebar` - Sidebar layout pattern
- `as-container` - Width constraint and padding

```html
<!-- Stack layout for vertical spacing -->
<section class="as-stack">
  <h2>Title</h2>
  <p>Paragraph</p>
  <p>Another paragraph</p>
</section>

<!-- Grid layout for cards -->
<div class="as-grid" style="--grid-columns: 3;">
  <article class="card">Card 1</article>
  <article class="card">Card 2</article>
  <article class="card">Card 3</article>
</div>
```

### Property Classes (with-)

Add specific behaviours or visual properties:

- `with-shadow` - Elevation effect
- `with-border` - Border styling
- `with-interaction` - Interactive states
- `with-padding` - Internal spacing
- `with-margin` - External spacing
- `with-sticky` - Sticky positioning
- `with-animation` - Animated properties

```html
<!-- Button with interaction effects -->
<button class="button with-interaction with-shadow">
  Hover me
</button>

<!-- Card with border and padding -->
<article class="card with-border with-padding">
  Bordered content
</article>
```

## Semantic Patterns

### Role and ARIA as Function Hooks

Use semantic attributes for JavaScript functionality:

```html
<!-- Tab system -->
<div class="tabs as-cluster">
  <button class="button" 
    role="tab" 
    aria-selected="true"
    aria-controls="panel-1">
    Tab 1
  </button>
  <button class="button" 
    role="tab" 
    aria-selected="false"
    aria-controls="panel-2">
    Tab 2
  </button>
</div>

<div class="panel as-stack with-padding"
  role="tabpanel" 
  id="panel-1">
  Panel content
</div>
```

```javascript
// JavaScript uses semantic selectors
document.querySelectorAll('[role="tab"]').forEach(tab => {
  tab.addEventListener('click', handleTabClick);
});
```

### Common Role Patterns

| Role | Usage | JavaScript Hook |
|------|-------|-----------------|
| `button` | Interactive elements | Click handlers |
| `tab` | Tab navigation | Tab switching |
| `alert` | Important messages | Auto-dismiss |
| `dialog` | Modal windows | Focus management |
| `navigation` | Navigation areas | Menu toggles |
| `complementary` | Sidebar content | Collapsible |
| `search` | Search forms | Search handlers |

### data-fn for Edge Cases

Only when ARIA/role isn't sufficient:

```html
<div class="card as-stack with-animation" 
  role="region"
  data-fn="auto-refresh">
  Live updating content
</div>
```

## ID Usage Policy

### Strict Rule: IDs for Accessibility Only

In CRISP, CSS IDs are **exclusively reserved** for accessibility requirements. No exceptions.

### Permitted ID Usage

IDs are only used when required by HTML or ARIA specifications:

```html
<!-- 1. Form Label Association -->
<label for="user-email">Email</label>
<input id="user-email" type="email" required>

<!-- 2. ARIA Control Relationships -->
<button aria-controls="mobile-menu">Menu</button>
<nav id="mobile-menu" hidden>...</nav>

<!-- 3. ARIA Description Relationships -->
<input aria-describedby="password-help">
<p id="password-help">Must be 8+ characters</p>

<!-- 4. ARIA Labelling (when label element not possible) -->
<nav aria-labelledby="nav-heading">
  <h2 id="nav-heading">Site Navigation</h2>
</nav>
```

### Forbidden ID Usage

```css
/* ❌ Never use ID selectors in CSS */
#header { }
#navigation { }

/* ✅ Use classes instead */
.header { }
.nav { }
```

```javascript
/* ❌ Never use getElementById for functionality */
document.getElementById('submit-btn');

/* ✅ Use semantic selectors */
document.querySelector('[role="button"][type="submit"]');
document.querySelector('[data-fn="submit"]');
```

### Alternative Patterns

| Need | Don't Use | Use Instead |
|------|-----------|-------------|
| Style targeting | `#nav` | `.nav` |
| JS selection | `getElementById()` | `querySelector('[role="..."]')` |
| Unique components | `id="header"` | `[aria-label="Site header"]` |
| Test targeting | `#submit-btn` | `[data-testid="submit"]` |

**The CRISP ID Rule**: If you can't point to the specific WCAG guideline or HTML specification that requires an ID for accessibility, don't use one.

## Custom Properties System

### Component-Specific Properties

Each class type has its own custom properties:

```css
/* Component properties */
.card {
  background: var(--card-bg, white);
  padding: var(--card-padding, var(--space-1-5));
  border-radius: var(--card-radius, var(--radius-md));
}

/* Layout properties */
.as-stack {
  gap: var(--stack-gap, var(--space-1-0));
}

/* Property modifiers */
.with-shadow {
  --shadow-colour: var(--colour-neutral-20);
  --shadow-opacity: 0.15;
  --shadow-blur: 8px;
  --shadow-y: 4px;
}
```

### Inline Overrides

```html
<!-- Override default gaps -->
<section class="as-stack" style="--stack-gap: var(--space-2-0);">
  <h2>Larger gaps</h2>
  <p>Content with more breathing room</p>
</section>

<!-- Custom shadow properties -->
<article class="card with-shadow" 
  style="--shadow-colour: var(--colour-primary-50); --shadow-opacity: 0.3;">
  Coloured shadow
</article>
```

## Reading CRISP Code

CRISP HTML should read like a specification:

```html
<!-- This reads as: 
     "Form displayed as stack with border,
      handles user registration" -->
<form class="form as-stack with-border"
  role="form"
  aria-label="User registration"
  data-fn="validate-on-submit">
  
  <!-- This reads as:
       "Form group displayed as stack with margin" -->
  <fieldset class="form-group as-stack with-margin">
    <legend>Personal Information</legend>
    
    <!-- This reads as:
         "Text input with border,
          for email entry" -->
    <input class="input with-border"
      type="email"
      role="textbox"
      aria-label="Email address"
      required>
  </fieldset>
  
  <!-- This reads as:
       "Button with interaction effects and shadow,
        submits the form" -->
  <button class="button with-interaction with-shadow"
    role="submit"
    aria-label="Create account">
    Sign Up
  </button>
</form>
```

## Progressive Enhancement

Components work without JavaScript:

```html
<!-- Disclosure widget using details/summary -->
<details class="disclosure as-stack with-border with-padding"
  role="group">
  <summary class="summary with-interaction">
    Show more information
  </summary>
  <div class="content as-stack">
    <p>Additional content that can be toggled...</p>
  </div>
</details>
```

JavaScript enhances, not enables:

```javascript
// Enhance if JavaScript available
document.querySelectorAll('.disclosure').forEach(disclosure => {
  disclosure.addEventListener('toggle', (e) => {
    // Add animation
    if (e.target.open) {
      e.target.classList.add('with-animation');
    }
  });
});
```

## Next Steps

Learn about the [Design Tokens](./03-design-tokens.md) that power CRISP's consistent design system.