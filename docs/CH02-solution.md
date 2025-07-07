# Chapter 2: First Bloom - The 1+1+3 Formula

*Or: How to replace 47,000 lines of CSS with a napkin sketch*

## Five Minutes to "Aha!"

Remember that grotesque button from Chapter 1? The one with 23 utility classes? Let's fix it:

```html
<!-- The old way (your eyes, they bleed) -->
<button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 
               active:bg-blue-700 focus:outline-none focus:ring-2 
               focus:ring-blue-500 focus:ring-offset-2 
               disabled:opacity-50 disabled:cursor-not-allowed 
               text-white font-medium rounded-md shadow-sm 
               transition-colors duration-200 
               dark:bg-blue-600 dark:hover:bg-blue-700 
               sm:px-6 sm:py-3 sm:text-lg">
  Click me
</button>

<!-- The CRISP way -->
<button class="button with-interaction" type="button">
  Click me
</button>
```

That's it. Two classes. Fully styled, accessible, responsive, themeable, and it has hover states.

"But wait," you cry, "where's the styling? The padding? The colours?"

## The Sacred Formula: 1+1+3

Every CRISP element follows one rule:

```
1 component + 1 layout + max 3 properties = ∞ possibilities
```

Let's dissect that button:

```html
<button class="button with-interaction" type="button">
  └─────┘       └──────────────────┘
     │                    │
     │                    └── Property class (optional enhancement)
     └────────────────────── Component class (what it IS)
```

That's the maximum complexity. Often you need less:

```html
<button class="button" type="button">Simple button</button>
<nav class="navigation" aria-label="Main">Just navigation</nav>
<article class="card">Just a card</article>
```

## But How Does It Look Good?

Here's where the magic happens. CRISP uses CSS Custom Properties (you know, that feature that's been in browsers since 2017):

```css
/* Inside CRISP */
.button {
  /* Define defaults */
  --bg: var(--color-neutral);
  --color: white;
  --size: 1rem;
  --padding: var(--space-0-75) var(--space-1-5);
  
  /* Use them */
  background: var(--bg);
  color: var(--color);
  font-size: var(--size);
  padding: var(--padding);
  
  /* Already has hover states */
  &:hover {
    filter: brightness(1.1);
  }
}
```

Want to customise? Just change the properties:

```html
<!-- Blue button -->
<button class="button" style="--bg: var(--color-primary);">
  Primary
</button>

<!-- Large button -->
<button class="button" style="--size: 1.25rem;">
  Bigger
</button>

<!-- Custom everything -->
<button class="button" style="--bg: hotpink; --color: black; --size: 2rem;">
  Party Mode
</button>
```

**The "Aha!"**: No modifier classes. No .button--primary, .button--large, .button--hotpink-black-2xl. Just properties.

## Real Components, Real Power

Let's build something more complex - a card:

```html
<!-- Old way: The div soup special -->
<div class="max-w-sm rounded overflow-hidden shadow-lg 
            bg-white hover:shadow-xl transition-shadow 
            duration-300 cursor-pointer dark:bg-gray-800">
  <img class="w-full h-48 object-cover" src="..." alt="...">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2 text-gray-900 
                dark:text-white">
      Card Title
    </div>
    <p class="text-gray-700 text-base dark:text-gray-300">
      Description
    </p>
  </div>
</div>

<!-- CRISP way: Semantic bliss -->
<article class="card as-stack with-shadow">
  <img class="media" src="..." alt="..." loading="lazy">
  <div class="content">
    <h3 class="heading">Card Title</h3>
    <p class="text">Description</p>
  </div>
</article>
```

Count the improvements:
- Semantic HTML (article, not div)
- 3 layout classes vs 15+ utilities
- Readable without documentation
- Dark mode automatic (no dark: prefixes)

## The Three Types of Classes

CRISP has exactly three types of classes, identified by their prefix:

### 1. Components (no prefix)
What the element IS:
```html
<button class="button">Click</button>
<article class="card">Content</article>
<nav class="navigation" aria-label="Main">Links</nav>
```

### 2. Layouts (as- prefix)
HOW elements arrange:
```html
<div class="as-stack">
  <p>Stacked</p>
  <p>Vertically</p>
</div>

<div class="as-cluster">
  <span>Side</span>
  <span>by</span>
  <span>side</span>
</div>

<main class="as-center">
  <h1>Centred content</h1>
</main>
```

### 3. Properties (with- prefix)
SPECIAL features:
```html
<article class="card with-shadow">Elevated</article>
<section class="hero with-overlay">Dramatic</section>
<button class="button with-interaction">Responsive</button>
```

## Data Attributes: Your Context Layer

Need variants? Don't create modifier classes. Use data attributes:

```html
<!-- Visual variants -->
<button class="button" data-variant="danger">Delete</button>
<article class="card" data-variant="featured">Special</article>

<!-- States via ARIA (not classes!) -->
<button class="button" aria-pressed="true">Active</button>
<nav class="tabs" role="tablist">
  <button role="tab" aria-selected="true">Current Tab</button>
  <button role="tab" aria-selected="false">Other Tab</button>
</nav>
```

**The "Aha!"**: Your CSS stays simple. Your HTML stays semantic. No class pollution.

## The Complete Example

Let's build a hero section to see it all together:

```html
<section class="hero as-center with-overlay">
  <div class="as-stack">
    <h1 class="heading" style="--size: var(--text-hero);">
      CSS That Doesn't Make You Cry
    </h1>
    <p class="text" style="--size: var(--text-large);">
      Build faster. Ship smaller. Sleep better.
    </p>
    <div class="as-cluster">
      <button class="button with-interaction" 
              style="--bg: var(--color-primary);">
        Get Started
      </button>
      <a class="button" href="/docs">
        Learn More
      </a>
    </div>
  </div>
</section>
```

That's a complete hero section. Count the classes. Count the complexity. Now smile.

## Dark Mode? Two Lines.

Remember spending weeks implementing dark mode? Here's CRISP:

```css
/* Light mode (default) */
:root {
  --color-bg: white;
  --color-text: black;
}

/* Dark mode */
[data-theme="dark"] {
  --color-bg: black;
  --color-text: white;
}
```

Every component adapts automatically. No .dark: prefix madness. No duplicate styles.

## But What About Hover States?

Already included. Every interactive element has them:

```css
.button {
  /* Automatic hover */
  &:hover {
    filter: brightness(1.1);
  }
  
  /* Automatic active */
  &:active {
    transform: translateY(1px);
  }
}

.with-interaction {
  /* Even more responsive */
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px oklch(0% 0 0 / 0.1);
  }
}
```

## The Philosophy in Practice

CRISP isn't about writing less code. It's about writing the RIGHT code:

1. **Semantic HTML First** - The element describes itself
2. **Single Purpose Classes** - Each class does ONE thing well
3. **Composition Over Configuration** - Combine simple pieces
4. **Properties Over Modifiers** - Customise, don't multiply
5. **Platform Over Abstractions** - Use what browsers give you

## Your First CRISP Component

Try this. Right now. In your browser console:

```html
<style>
  .notification {
    --bg: var(--color-info, lightblue);
    --color: var(--color-on-info, black);
    --padding: 1rem;
    
    background: var(--bg);
    color: var(--color);
    padding: var(--padding);
    border-radius: 0.5rem;
  }
  
  .as-cluster {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
</style>

<div class="notification as-cluster" role="alert">
  <span>✨</span>
  <p>You just wrote your first CRISP component!</p>
</div>
```

Now customise it:

```html
<div class="notification as-cluster" role="alert" 
     style="--bg: hotpink; --color: white;">
  <span>🎉</span>
  <p>Look ma, no modifier classes!</p>
</div>
```

## The Bottom Line

- **Old way**: 47 classes, 15 modifiers, 3 build steps, 1 migraine
- **CRISP way**: 1 component + 1 layout + properties = done

You've been writing CSS upside down. Components aren't collections of utility classes. They're semantic elements with customisable properties.

Ready to see how deep this rabbit hole goes?

→ Continue to [Chapter 3: Seeds to Sprouts - Your First CRISP Page](./CH03-quickstart.md)