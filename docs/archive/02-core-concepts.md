# Core Concepts

## The CRISP Formula

Every CRISP element follows this pattern:

```html
<element class="[component] [as-layout] [with-property]" 
  id="[accessibility-only]"
  role="[function]"
  aria-label="[description]"
  style="--property: value;">
  Content
</element>
```

### Attribute Order Convention

CRISP enforces a consistent attribute order for readability and maintainability:

1. `class` - Always first after the HTML tag (descriptive component names)
2. `id` - Only when required for accessibility
3. `type` - For form elements (input, button)
4. `name` - For form elements
5. `href` - For links
6. `src` - For media elements
7. `role` - ARIA role
8. `aria-*` - ARIA attributes
9. `data-*` - Data attributes
10. `style` - Inline custom properties
11. Event handlers - onclick, etc. (if needed)

```html
<!-- ✅ Correct attribute order -->
<button class="button with-interaction" 
  type="submit"
  role="button"
  aria-label="Submit form"
  style="--button-size: large;">
  Submit
</button>

<a class="link" 
  href="/about"
  role="link"
  aria-current="page">
  About
</a>

<input class="input" 
  id="user-email"
  type="email"
  name="email"
  aria-required="true"
  style="--input-width: 100%;">

<!-- ❌ Wrong: Inconsistent order -->
<button type="submit" class="button" style="--button-size: large;" role="button">
  Submit
</button>
```

## Class System

### Semantic Class Prefixes

CRISP uses semantic prefixes to clearly identify the purpose of each class:

1. **No prefix** - Core components (`card`, `button`, `nav`)
2. **`as-`** - Layout modes (`as-stack`, `as-grid`, `as-cluster`)
3. **`with-`** - Additional properties (`with-shadow`, `with-border`)

This creates self-documenting HTML that reads like natural language.

**Why class comes first:** Since CRISP classes are descriptive component names (not cryptic abbreviations like `btn-2xl-primary`), placing them first immediately tells you what element you're looking at. You see `<article class="card"` and instantly know it's a card component, or `<nav class="breadcrumb"` for navigation breadcrumbs - the most important information comes first.

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

### Class Formula Rule

Each element follows the formula: 1 component + 1 layout + up to 3 properties:

```html
<!-- Component + Layout + Property (max 3) -->
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

**Interactive Elements:**
- `button` - Interactive button ([docs](./components/button.md))
- `link` - Styled anchor ([docs](./components/link.md))
- `tab` - Tab navigation item (radio + :checked)
- `accordion` - Collapsible sections (details/summary)
- `carousel` - Content slider (radio + :checked + scroll) ([docs](./components/carousel.md))

**Content Containers:**
- `card` - Content container
- `article` - Article container
- `section` - Section wrapper
- `dialog` - Modal/dialog (dialog element)

**Navigation:**
- `nav` - Navigation container
- `path` - Navigation path/breadcrumb
- `pagination` - Page navigation (nav + aria-label)

**Forms:**
- `form` - Form container
- `field` - Form field wrapper
- `input` - Text input
- `select` - Dropdown select
- `textarea` - Multi-line input
- `checkbox` - Checkbox input
- `radio` - Radio button
- `switch` - Toggle switch (radio + :checked)
- `slider` - Value slider (input range + custom styling)

**Data Display:**
- `table` - Data table
- `list` - List container
- `definition` - Definition list

**Media:**
- `image` - Single image (img + object-fit)
- `figure` - Figure with caption (figure + figcaption)
- `picture` - Responsive image (picture element)
- `video` - Video container (video element)
- `audio` - Audio player (audio element)
- `embed` - Embedded content (object/embed)
- `iframe` - Iframe wrapper (iframe + aspect-ratio)

**Text:**
- `text` - Text content
- `heading` - Headings
- `code` - Code blocks
- `quote` - Blockquotes

**Feedback:**
- `alert` - Alert messages
- `toast` - Toast notifications (animation + aria-live)
- `badge` - Status badges (span + aria-label)
- `tag` - Content tags (span + aria-label)
- `progress` - Progress indicators (progress element)

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