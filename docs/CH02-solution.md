# Chapter 2: First Bloom - The 1+2+3 Formula

*Or: How to replace 47,000 lines of CSS with a napkin sketch*

## Five Minutes to "Aha!" (or Your Money Back)

Remember that grotesque button from Chapter 1? The one with more classes than a British public school? Let's perform an exorcism:

```html
<!-- The old way (your retinas, they weep) -->
<button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 
               active:bg-blue-700 focus:outline-none focus:ring-2 
               focus:ring-blue-500 focus:ring-offset-2 
               disabled:opacity-50 disabled:cursor-not-allowed 
               text-white font-medium rounded-md shadow-sm 
               transition-colors duration-200 
               dark:bg-blue-600 dark:hover:bg-blue-700 
               sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-4 
               lg:text-xl xl:px-10 xl:py-5 2xl:text-2xl">
  Click me
</button>

<!-- The CRISP way (angels sing) -->
<button class="button with-interaction" type="button">
  Click me
</button>
```

That's it. Two classes. Fully styled, accessible, responsive, themeable, with hover states, focus management, and probably makes you tea.

"But wait," you cry, clutching your utility-first security blanket, "where's the styling? The padding? The seventeen breakpoints?"

Sit down. Let me tell you about the napkin.

## The Sacred Formula: 1+2+3

Every CRISP element follows one rule - simple enough to sketch on a napkin after three pints:

```
1 blueprint + max 2 layouts + max 3 properties = ∞ possibilities
```

But what do these actually DO? Let me enlighten you:

### Blueprint Classes (no prefix) - The Identity

These define WHAT an element IS and come pre-loaded with everything:

```css
.button {
  /* Already includes: */
  - All typography (size, weight, font)
  - All spacing (padding, margins)
  - All colors (background, text, borders)
  - All states (hover, active, focus, disabled)
  - All transitions
  - Accessibility features
  - Dark mode support
}
```

One class. Everything included. Like a complete blueprint that you can extend and combine.

### Layout Classes (as- prefix) - The Arrangement

These control HOW elements arrange themselves or their children:

```css
.as-stack     /* Children stack vertically with consistent gaps */
.as-cluster   /* Children cluster horizontally, wrap when needed */
.as-grid      /* Children form a responsive grid */
.as-center    /* Content centers with max-width */
.as-split     /* Children push to opposite ends */
```

They ONLY do layout. Nothing else. That's their superpower.

### Property Classes (with- prefix) - The Enhancements

These add SPECIAL features that aren't always needed:

```css
.with-shadow      /* Adds elevation shadow */
.with-interaction /* Enhanced hover/active states */
.with-overlay     /* Adds a semi-transparent overlay */
.with-border      /* Adds a decorative border */
```

Think of them as opt-in superpowers. Not every button needs shadow. Not every card needs enhanced interaction.

## See It In Action

Now let's revisit that button with fresh eyes:

```html
<button class="button with-interaction" type="button" data-key="contact-form-submit-button">
    └───────────┘      └───────────┘                    └───────────────┘
           │                 │                                  │
           │                 │                                  └──────── "Test automation key"
           │                 └─────────────────────────────────────────── "Add enhanced hover effects"
           └───────────────────────────────────────────────────────────── "I am a button (with all button features)"
```

And here's the full formula unleashed:

```html
<section class="hero as-center with-overlay" data-key="frontpage-hero-main">
     └───────────┘    └──────┘    └─────────┘      └────────────┘
           │             │             │                  │
           │             │             │                  └──── "Test automation key"
           │             │             └─────────────────────── "Add a dark overlay"
           │             └───────────────────────────────────── "Center content with max-width"
           └─────────────────────────────────────────────────── "I am a hero section"
```

That's the maximum complexity. Often you need less:

```html
<button class="button" type="button">Just a button</button>
<nav class="navigation" aria-label="Main">Just navigation</nav>
<article class="card">Just a card</article>
```

Sometimes you need two layouts working together:

```html
<section class="hero as-center">
  <!-- Centered content with max-width -->
</section>

<div class="as-stack as-grid" data-entries="3">
  <!-- Stacks on mobile, grid on desktop -->
</div>
```

**The "Aha!"**: No modifiers. No variants. No suffixes. Just things being what they are.

## But How Does It Look Good? (The Magic Trick Revealed)

Here's where your mind gets blown. CRISP uses CSS Custom Properties - you know, that feature that's been in browsers since your startup's "pivot to blockchain" phase:

```css
/* Inside CRISP's brain */
.button {
  /* Type-safe property definitions */
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
  
  /* Use them like a civilised person */
  background: var(--bg);
  font-size: var(--size);
  
  /* Hover states? Already sorted, mate */
  &:hover {
    --bg: oklch(from var(--bg) calc(l + 0.05) c h);
  }
}
```

Want to customise? Just whisper sweet properties to it:

```html
<!-- Primary button (no --primary suffix needed) -->
<button class="button" style="--bg: var(--color-primary);">
  Primary
</button>

<!-- Why it works: the blueprint .button defines --bg: var(--color-neutral) then uses background: var(--bg) -->
```

```html
<!-- Chunky button -->
<button class="button" style="--size: 1.5rem; --padding: var(--space-1) var(--space-2);">
  Absolute Unit
</button>

<!-- Why it works: --size and --padding are standard button blueprint properties, ready to override -->
```

```html
<!-- Friday afternoon button -->
<button class="button" style="--bg: hotpink; --color: lime; --size: 3rem;">
  Party Like It's 1999
</button>

<!-- Why it works: inline styles override the blueprint's default custom properties -->
```

**The "Aha!"**: No modifier classes. No .button--primary, .button--large, .button--hotpink-lime-3xl-party-mode. Just properties. Like CSS intended before we lost our way.

**Alternative approach** - Use the overrides layer for site-wide customisations:

```css
@layer overrides {
  /* These beat ALL framework styles automatically */
  .button[data-variant="primary"] {
    --bg: var(--color-primary);
  }
  
  .button[data-variant="large"] {
    --size: 1.5rem;
    --padding: var(--space-1) var(--space-2);
  }
}
```

```html
<!-- Even with overrides layer, inline styles still win due to CSS specificity -->
<button class="button" data-variant="primary" style="--bg: hotpink;">
  Emergency Override
</button>

<!-- Why it works: inline style (specificity 1000) beats @layer overrides (specificity ~100) -->
```

**The power of predictability**: No more `!important` wars. No specificity battles. No 47-selector chains to override a colour. Just three clear levels: blueprint defaults → layer overrides → inline properties. Your CSS stays clean, your team stays sane, and your buttons? They just work. Every time. Without surprises.

This is what CSS was meant to be.

## Real Blueprints, Real Power (Not Framework Karaoke)

Let's build something more complex - a card. Watch the transformation from div soup to semantic haiku:

```html
<!-- Old way: The div soup kitchen special -->
<div class="max-w-sm rounded overflow-hidden shadow-lg 
            bg-white hover:shadow-xl transition-shadow 
            duration-300 cursor-pointer dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 
            transform hover:scale-105 relative group">
  <img class="w-full h-48 object-cover group-hover:opacity-90 
              transition-opacity duration-200" src="..." alt="...">
  <div class="px-6 py-4 space-y-2">
    <div class="font-bold text-xl mb-2 text-gray-900 
                dark:text-white line-clamp-2">
      Card Title That Might Be Long
    </div>
    <p class="text-gray-700 text-base dark:text-gray-300 
              line-clamp-3">
      Description with more classes than words
    </p>
  </div>
</div>

<!-- CRISP way: Semantic poetry -->
<article class="card with-shadow">
  <img class="media" src="..." alt="..." loading="lazy">
  <div class="content as-stack">
    <h3 class="heading">Card Title That Might Be Long</h3>
    <p class="text">Description with more words than classes</p>
  </div>
</article>
```

Count the improvements:
- Semantic HTML (article, not div - revolutionary!)
- 3 understandable classes vs 20+ utility hieroglyphs
- Readable without a PhD in Tailwind
- Dark mode automatic (no dark: prefix plague)
- Hover states built-in (no group-hover: gymnastics)

## The Three Musketeers (Types of Classes)

CRISP has exactly three types of classes, identified by their prefix like well-behaved British queues:

### 1. Blueprints (no prefix - the Foundation)
What the element IS:
```html
<button class="button">I'm a button</button>
<article class="card">I'm a card</article>
<nav class="navigation" aria-label="Main">I'm navigation</nav>
```

### 2. Layouts (as- prefix - the Arrangers)
HOW elements arrange themselves:
```html
<div class="as-stack">
  <p>We're</p>
  <p>Vertically</p>
  <p>Stacked</p>
</div>

<div class="as-cluster">
  <span>We're</span>
  <span>side</span>
  <span>by</span>
  <span>side</span>
</div>

<main class="as-center">
  <h1>I'm centred without margin: 0 auto</h1>
</main>
```

### 3. Properties (with- prefix - the Special Effects)
SPECIAL features that enhance:
```html
<article class="card with-shadow">I cast shadows</article>
<section class="hero with-overlay">I'm dramatic</section>
<button class="button with-interaction">I'm extra responsive</button>
```

## Data Attributes: Your Escape Hatch (Not Another Class System)

Need variants? Don't breed modifier classes like rabbits. Use data attributes like a grown-up:

```html
<!-- States via ARIA (not class="active") - Most powerful, affects behavior -->
<button class="button" aria-pressed="true">I'm pressed</button>
<nav class="tabs" role="tablist">
  <button role="tab" aria-selected="true">Current Tab</button>
  <button role="tab" aria-selected="false">Other Tab</button>
</nav>

<!-- Visual variants (not class="button button--danger") -->
<button class="button" data-variant="danger">Delete Everything</button>
<button class="button" data-variant="success">Save the World</button>

<!-- Programmatic anchors (not id="submit-btn-2") -->
<button class="button" data-key="contact-form-submit">Submit</button>
<nav class="navigation" data-key="main-nav" aria-label="Main">Navigation</nav>

<!-- Context via data (not class="card--product") -->
<article class="card" data-type="product">Product Card</article>
<article class="card" data-type="blog">Blog Card</article>
```

**The "Aha!"**: Your CSS stays simple. Your HTML stays semantic. Your future self actually smiles at code reviews.

### The data-key Pattern (Your Programmatic Anchor)

Need to target specific elements from JavaScript, test automation, or analytics? Use `data-key`:

```html
<!-- Specific elements for automation/tracking -->
<button class="button" data-key="newsletter-signup-submit">Subscribe</button>
<section class="hero" data-key="homepage-hero-winter-sale">Winter Sale</section>
<form class="form" data-key="checkout-payment-form">Payment Details</form>
```

**Why data-key?**
- Not just for testing - for ANY programmatic access
- Descriptive names that won't change with styling
- Decoupled from CSS classes (change styles without breaking tests)
- Clear intent: "This element has special significance"

**Common uses:**
- Test automation (Cypress, Playwright, Selenium)
- Analytics tracking (Google Analytics, Mixpanel)
- JavaScript hooks (without coupling to CSS)
- A/B testing targets
- Error tracking and monitoring

## The Complete Symphony (Everything Together)

Let's build a hero section to see the full orchestra:

```html
<section class="hero as-center with-overlay" data-key="homepage-hero-intro">
  <div class="as-stack" style="--stack-gap: var(--space-2);">
    <h1 class="heading" style="--size: clamp(2rem, 5vw, 4rem);">
      CSS That Doesn't Make You Question Your Career Choices
    </h1>
    <p class="text" style="--size: 1.25rem; --color: var(--color-muted);">
      Build faster. Ship smaller. Sleep without nightmares of specificity wars.
    </p>
    <div class="as-cluster">
      <button class="button with-interaction" 
              style="--bg: var(--color-primary); --size: 1.125rem;"
              data-variant="primary"
              data-key="hero-cta-start">
        Start Your Recovery
      </button>
      <a class="link" href="/docs" data-key="hero-link-docs">
        Read the Manifesto →
      </a>
    </div>
  </div>
</section>
```

That's a complete hero section. Count the classes. Count the inline styles. Now count your blessings.

## Dark Mode? One Property Flip.

Remember that three-week dark mode sprint? Here's CRISP's version:

```css
/* The entire dark mode implementation */
[data-theme="dark"] {
  --color-scheme: dark;
  /* The 10 base colours swap to dark values here */
}
```

**Why this works**: CRISP defines exactly 10 base colours (3 brand + 4 semantic + 3 neutrals). In dark mode, only these 10 values swap. Everything else - hover states, disabled states, borders, shadows - is mathematically derived using OKLCH relative colour syntax. 

Look how hover states work in both themes without any changes:

```css
/* Built into every button */
.button {
  /* Automatic brightness on hover */
  &:hover {
    --bg: oklch(from var(--bg) calc(l + 0.05) c h);
  }
  
  /* Satisfying click feedback */
  &:active {
    transform: translateY(1px);
  }
}

/* The with-interaction enhancement */
.with-interaction {
  /* Smooth operator */
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px oklch(0% 0 0 / 0.15);
  }
}
```

No JavaScript. No hover: utilities. Just CSS doing what CSS does best.

Every blueprint adapts automatically. No .dark: prefix on 47,000 classes. No duplicate stylesheets. No JavaScript theme managers. Just one property flip and Bob's your uncle.

## The Philosophy (Without 2 Years in Oxford)

CRISP is about code that doesn't overload your brain. Yes, it's usually 90% less code, but that's the side effect, not the goal. The goal is KISS - code so simple your brain can focus on solving problems, not decoding class hierarchies:

1. **Semantic HTML First** - Elements that explain themselves
2. **Single Purpose Classes** - Each class does ONE thing brilliantly
3. **Composition Over Configuration** - Like LEGO, not like IKEA
4. **Properties Over Modifiers** - Customise, don't multiply
5. **Platform Over Abstractions** - Use what browsers give you for free

## Your First CRISP Blueprint (Do It Now!)

Stop reading. Try this. Right now. In your browser console:

**Pro tip**: All available properties are defined in the `@layer kernel`:
- Blueprint properties (unprefixed like `--bg`, `--size`, `--color`)
- Layout properties (prefixed like `--stack-gap`, `--grid-columns`)
- Global tokens (`--color-primary`, `--space-1`, `--radius-md`)

That's your property catalogue. Every CSS scenario has a property ready to use.

```html
<style>
  .announcement {
    /* Only define what's unique to announcements */
    --icon-size: 1.5rem;  /* New property specific to this blueprint */
    
    /* Everything else uses kernel properties like --bg or --color directly */
    background: var(--bg, var(--color-info));
    color: var(--color, var(--color-on-info));
    padding: var(--padding, var(--space-1) var(--space-1-5));
    border-radius: var(--radius, var(--radius-md));
  }
  
  .as-cluster {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  /* Dark mode? One line */
  @media (prefers-color-scheme: dark) {
    .announcement {
      --bg: oklch(from var(--bg) calc(l - 0.3) c h);
    }
  }
</style>

<div class="announcement as-cluster" role="alert">
  <span>📢</span>
  <p>You just wrote your first CRISP blueprint!</p>
</div>
```

Now make it yours - all kernel properties can be overridden inline:

```html
<!-- Override any property inline, including kernel properties -->
<div class="announcement as-cluster" role="alert" 
     style="--bg: linear-gradient(45deg, hotpink, orange); --radius: 2rem; --icon-size: 3rem;">
  <span style="font-size: var(--icon-size);">🎉</span>
  <p>Look ma, no build step!</p>
</div>

<!-- Even override spacing and colors -->
<div class="announcement as-cluster" role="alert"
     style="--padding: var(--space-2); --color: navy; --bg: gold;">
  <span>⚡</span>
  <p>Total control without new classes!</p>
</div>
```

## The Napkin Test

Can you explain your blueprint system on a napkin? Let's see:

**Old way**: 
```
Button = base + size-modifier + color-modifier + state-modifier 
         + responsive-modifier + dark-modifier + hover-modifier 
         + focus-modifier + disabled-modifier + loading-modifier
         + 37 more modifiers...
         
[Napkin explodes]
```

**CRISP way**:
```
Element = 1 blueprint + (0-2 layouts) + (0-3 properties) + inline overrides

Example: button with-interaction + style="--bg: hotpink;"

[Napkin has room for your phone number]
```

## The Bottom Line

- **Old way**: 47 classes, 15 modifiers, 3 build steps, 2 therapists
- **CRISP way**: 1 blueprint + 2 layouts + properties = sanity

The tools we've been given made simple tasks complex. It's like being handed a Swiss Army knife to butter toast - impressive engineering, but you just needed a knife.

Blueprints aren't collections of utility classes held together by prayer and npm. They're semantic elements with customisable properties. Like nature intended. Like Tim Berners-Lee dreamed. Like your CSS could have been all along.

Ready to see how deep this rabbit hole of simplicity goes?

→ Continue to [Chapter 3: Seeds to Sprouts - Your First CRISP Page](./CH03-quickstart.md)