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
1 component + max 2 layouts + max 3 properties = ∞ possibilities
```

Let's perform the autopsy on that button:

```html
<section class="hero as-center as-container with-overlay with-shadow">
         └───────┘    └──────────────┘       └─────────────┘
           │              │                     │
           │              │                     └──── Property class (special effects)
           │              └────────────────────────── Layout classes (how it arranges)
           └───────────────────────────────────────── Component class (what it IS)
```

That's the maximum complexity. Often you need less:

```html
<button class="button" type="button">Just a button</button>
<nav class="navigation" aria-label="Main">Just navigation</nav>
<article class="card">Just a card</article>
```

Sometimes you need two layouts working together:

```html
<section class="hero as-center as-container">
  <!-- Centered content WITH responsive padding -->
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

<!-- Chunky button -->
<button class="button" style="--size: 1.5rem; --padding: var(--space-1) var(--space-2);">
  Absolute Unit
</button>

<!-- Friday afternoon button -->
<button class="button" style="--bg: hotpink; --color: lime; --size: 3rem;">
  Party Like It's 1999
</button>
```

**The "Aha!"**: No modifier classes. No .button--primary, .button--large, .button--hotpink-lime-3xl-party-mode. Just properties. Like CSS intended before we lost our way.

## Real Components, Real Power (Not Framework Karaoke)

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
<article class="card as-stack with-shadow">
  <img class="media" src="..." alt="..." loading="lazy">
  <div class="content">
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

### 1. Components (no prefix - the VIPs)
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
<!-- Visual variants (not class="button button--danger") -->
<button class="button" data-variant="danger">Delete Everything</button>
<button class="button" data-variant="success">Save the World</button>

<!-- States via ARIA (not class="active") -->
<button class="button" aria-pressed="true">I'm pressed</button>
<nav class="tabs" role="tablist">
  <button role="tab" aria-selected="true">Current Tab</button>
  <button role="tab" aria-selected="false">Other Tab</button>
</nav>

<!-- Context via data (not class="card--product") -->
<article class="card" data-type="product">Product Card</article>
<article class="card" data-type="blog">Blog Card</article>
```

**The "Aha!"**: Your CSS stays simple. Your HTML stays semantic. Your future self sends thank-you notes.

## The Complete Symphony (Everything Together)

Let's build a hero section to see the full orchestra:

```html
<section class="hero as-center with-overlay">
  <div class="as-stack" style="--stack-gap: var(--space-2);">
    <h1 class="heading" style="--size: clamp(2rem, 5vw, 4rem);">
      CSS That Doesn't Make You Question Your Career Choices
    </h1>
    <p class="text" style="--size: 1.25rem; --color: var(--color-muted);">
      Build faster. Ship smaller. Sleep without nightmares of specificity wars.
    </p>
    <div class="as-cluster">
      <button class="button with-interaction" 
              style="--bg: var(--color-primary); --size: 1.125rem;">
        Start Your Recovery
      </button>
      <a class="link" href="/docs">
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
}
```

Every component adapts automatically. No .dark: prefix on 47,000 classes. No duplicate stylesheets. No JavaScript theme managers. Just one property flip and Bob's your uncle.

## But What About My Precious Hover States?

Already there, love. Every interactive element comes pre-hoverfied:

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

## The Philosophy (Without the PhD)

CRISP isn't about writing less code. It's about writing code that doesn't make you sad:

1. **Semantic HTML First** - Elements that explain themselves
2. **Single Purpose Classes** - Each class does ONE thing brilliantly
3. **Composition Over Configuration** - Like LEGO, not like IKEA
4. **Properties Over Modifiers** - Customise, don't multiply
5. **Platform Over Abstractions** - Use what browsers give you for free

## Your First CRISP Component (Do It Now!)

Stop reading. Try this. Right now. In your browser console:

```html
<style>
  .announcement {
    --bg: var(--color-info, dodgerblue);
    --color: var(--color-on-info, white);
    --padding: 1rem 1.5rem;
    --radius: 0.5rem;
    
    background: var(--bg);
    color: var(--color);
    padding: var(--padding);
    border-radius: var(--radius);
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
  <p>You just wrote your first CRISP component!</p>
</div>
```

Now make it yours:

```html
<div class="announcement as-cluster" role="alert" 
     style="--bg: linear-gradient(45deg, hotpink, orange); --radius: 2rem;">
  <span>🎉</span>
  <p>Look ma, no build step!</p>
</div>
```

## The Napkin Test

Can you explain your component system on a napkin? Let's see:

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
Button = button class + properties

[Napkin has room for your phone number]
```

## The Bottom Line

- **Old way**: 47 classes, 15 modifiers, 3 build steps, 2 therapists
- **CRISP way**: 1 component + 2 layouts + properties = sanity

You've been writing CSS wearing boxing gloves. You've been painting with a mop. You've been performing surgery with a sledgehammer.

Components aren't collections of utility classes held together by prayer and npm. They're semantic elements with customisable properties. Like nature intended. Like Tim Berners-Lee dreamed. Like your CSS could have been all along.

Ready to see how deep this rabbit hole of simplicity goes?

→ Continue to [Chapter 3: Seeds to Sprouts - Your First CRISP Page](./CH03-quickstart.md)