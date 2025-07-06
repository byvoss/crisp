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

## Content Containers

### Card - The Universal Container

*If containers were superheroes, Card would be Superman (boring but reliable)*

```html
<!-- Basic card -->
<article class="card">
  <h2>Simple Card</h2>
  <p>Just content in a box.</p>
</article>

<!-- Card with layout -->
<article class="card as-stack">
  <h2>Stacked Card</h2>
  <p>Content flows vertically.</p>
  <button class="button">Action</button>
</article>

<!-- Card with enhancements -->
<article class="card as-stack with-shadow" 
  style="--bg: var(--color-primary);">
  <h2>Enhanced Card</h2>
  <p>Shadow and custom background.</p>
</article>

<!-- Interactive card -->
<article class="card with-interaction" 
  role="button" 
  tabindex="0"
  onclick="handleCardClick()">
  <h3>Clickable Card</h3>
  <p>Entire card is interactive.</p>
</article>

<!-- Context-aware card -->
<article class="card" data-variant="premium">
  <h2>Premium Content</h2>
  <p>Automatically styled for premium context.</p>
</article>
```

CSS that powers it all:
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
    
    /* Contain the floats (yes, people still use floats) */
    overflow: hidden;
    
    /* Stacking context */
    isolation: isolate;
  }
  
  /* Hover states for interactive cards */
  .card.with-interaction {
    cursor: pointer;
    transition: all var(--transition-fast);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-elevated);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  /* Context wins */
  [data-variant="premium"] .card {
    --bg: oklch(50% 0.15 50); /* Gold-ish */
    --border: 2px solid oklch(60% 0.20 50);
  }
  
  /* Dark theme adjustments */
  [data-theme="dark"] .card {
    --bg: oklch(20% 0.01 250);
    --border: 1px solid oklch(30% 0.02 250);
  }
}
```

**Pro tip**: The browser validates your properties. `--padding: "lots"` won't fly!

### Container Rules That Rule

#### Rule 1: Containers Are Semantic

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

<!-- Even better with proper elements -->
<article class="card as-stack">
  <h2 class="heading">Article Title</h2>
  <p class="text">Article content that makes sense</p>
  <footer class="meta">Published today</footer>
</article>
```

**The "Aha!"**: The browser already knows what these elements are. Why fight it?

#### Rule 2: Containers Can BE Layouts

*Mix and match like LEGO blocks*

```html
<!-- ❌ Container trying to do too much -->
<div class="card card-grid-3-columns card-with-gap-20">
  <!-- Class soup alert! -->
</div>

<!-- ✅ Container + Layout in harmony -->
<article class="card as-stack">
  <h2>Title</h2>
  <p>Content</p>
  <button class="button">Action</button>
</article>

<!-- Or a bit more specific -->
<article class="card as-grid" style="--grid-columns: 3;" data-entries="3">
  <div>Clean</div>
  <div>Simple</div>
  <div>Direct</div>
</article>
```

**The "Aha!"**: Containers and layouts can live on the same element. No extra wrapper needed!

### Article - Semantic Content

*When your content is self-contained and ready to travel the web*

```html
<!-- Blog post -->
<article class="article as-stack">
  <header class="as-stack" style="--stack-gap: var(--space-0-5);">
    <h1 class="heading">Article Title</h1>
    <time class="text" style="--color: var(--color-neutral);">
      2025-01-04
    </time>
  </header>
  
  <div class="as-stack">
    <p>Article content goes here...</p>
    <p>Multiple paragraphs of engaging content.</p>
  </div>
  
  <footer class="as-cluster">
    <span class="tag">CSS</span>
    <span class="tag">Web Development</span>
  </footer>
</article>

<!-- News item (with actual news) -->
<article class="article card as-stack with-shadow">
  <img class="image" src="news.jpg" alt="CSS finally makes sense">
  <div class="as-stack" style="--stack-gap: var(--space-0-75);">
    <h2 class="heading">Breaking: Developer Actually Enjoys CSS</h2>
    <p class="text">Witnesses report seeing a smile. Investigation ongoing...</p>
    <a class="link" href="/full-story">Read more →</a>
  </div>
</article>

<!-- Featured article with data attribute -->
<article class="article card" data-featured="true">
  <h2>Featured Story</h2>
  <p>This article gets special treatment via data attribute.</p>
</article>
```

### Section - Thematic Grouping

*Like a chapter in a book, but for websites*

```html
<!-- Feature section -->
<section class="section as-stack" style="--stack-gap: var(--space-2-0);">
  <header class="as-center">
    <h2 class="heading" style="--size: var(--text-size-2-0);">
      Our Features
    </h2>
  </header>
  
  <div class="as-grid" style="--grid-columns: 3;">
    <article class="card as-stack">
      <h3>Feature 1</h3>
      <p>Description...</p>
    </article>
    <!-- More feature cards -->
  </div>
</section>

<!-- Testimonials section with context -->
<section class="section as-container" data-theme="light">
  <h2 class="heading as-center">What Our Users Say</h2>
  
  <div class="as-grid">
    <blockquote class="quote card">
      <p>"CRISP changed my life!"</p>
      <cite>- Happy Developer</cite>
    </blockquote>
  </div>
</section>
```

```css
.section {
  /* 1. Define defaults */
  --bg: transparent;
  --padding: var(--space-4-0) var(--space-2-0);
  
  /* 2. Use the tokens */
  background: var(--bg);
  padding: var(--padding);
}

/* Theme context */
[data-theme="light"] {
  --bg: var(--color-neutral-light);
}
```

### Dialog - Modal Containers

*Because sometimes content needs to interrupt rudely*

```html
<!-- Native dialog (yes, it's built into HTML!) -->
<dialog class="modal" id="confirm-dialog">
  <article class="card as-stack">
    <header class="as-cluster" style="--cluster-align: space-between;">
      <h2 class="heading">Confirm Action</h2>
      <button class="button" type="button" onclick="this.closest('dialog').close()" aria-label="Close dialog">
        ×
      </button>
    </header>
    
    <p class="text">Are you absolutely, positively sure?</p>
    
    <footer class="as-cluster" style="--cluster-align: flex-end;" data-entries="2">
      <button class="button" type="button" onclick="this.closest('dialog').close()">
        Cancel
      </button>
      <button class="button" type="button" style="--bg: var(--color-error);">
        Yes, Delete Everything
      </button>
    </footer>
  </article>
</dialog>

<!-- Open it with showModal() -->
<button class="button" onclick="document.getElementById('confirm-dialog').showModal()">
  Open Modal
</button>

<!-- Full-screen dialog -->
<dialog class="dialog as-center" style="--width: 100vw; --center-height: 100vh;">
  <div class="card as-stack" style="--width: min(90vw, 600px);">
    <h1>Welcome</h1>
    <p>Full-screen modal content</p>
  </div>
</dialog>

<!-- Danger context dialog -->
<dialog class="dialog card" data-variant="danger">
  <h2>Destructive Action</h2>
  <p>This cannot be undone!</p>
</dialog>
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
    
    /* The backdrop (pure CSS magic!) */
    &::backdrop {
      background: oklch(0% 0 0 / 0.5);
      backdrop-filter: blur(4px);
    }
    
    /* Smooth entry with @starting-style */
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease-out;
    
    &[open] {
      opacity: 1;
      transform: translateY(0);
    }
    
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

JavaScript for modern dialog:
```javascript
// Open (it's this simple)
document.getElementById('confirm-dialog').showModal();

// Close (even simpler)
document.getElementById('confirm-dialog').close();

// No focus trap library needed. No backdrop div. No z-index wars.
// Just... working.
```

## Semantic Containers

### Figure - Media with Context

```html
<!-- Image with caption -->
<figure class="figure">
  <img class="image" src="chart.png" alt="Sales chart">
  <figcaption class="caption">
    Sales growth over the last quarter
  </figcaption>
</figure>

<!-- Code example -->
<figure class="figure">
  <pre class="code">
    <code>
      .card {
        /* 1. Define defaults */
        --bg: white;
        
        /* 2. Use the tokens */
        background: var(--bg);
      }
    </code>
  </pre>
  <figcaption class="caption">
    Basic card styling in CRISP
  </figcaption>
</figure>

<!-- Video figure -->
<figure class="figure as-stack">
  <video class="video" controls>
    <source src="demo.mp4" type="video/mp4">
  </video>
  <figcaption class="caption">
    Product demonstration video
  </figcaption>
</figure>
```

### Blockquote - Quoted Content

*For when you need to borrow someone else's wisdom*

```html
<!-- Simple quote -->
<blockquote class="quote">
  <p>"Simplicity is the ultimate sophistication."</p>
  <cite>- Leonardo da Vinci</cite>
</blockquote>

<!-- Testimonial quote -->
<blockquote class="quote card with-shadow">
  <p>"CRISP made our development 3x faster. No more class name debates!"</p>
  <footer>
    <cite class="text" style="--weight: var(--text-weight-semibold);">
      Jane Smith
    </cite>
    <small class="text" style="--color: var(--color-neutral);">
      CTO, TechCorp
    </small>
  </footer>
</blockquote>

<!-- Pull quote (for dramatic effect) -->
<blockquote class="quote" style="--size: var(--text-size-1-5); --color: var(--color-primary);">
  <p>"The best container is the one you don't have to think about."</p>
  <cite>- Ancient CSS Proverb</cite>
</blockquote>
```

```css
.quote {
  /* 1. Define defaults */
  --size: var(--text-size-base);
  --color: var(--text-color);
  --padding: var(--space-1-5);
  
  /* 2. Use the tokens */
  font-size: var(--size);
  color: var(--color);
  padding-left: var(--padding);
  border-left: 4px solid currentColor;
}
```

## Advanced Container Patterns

*When basic boxes aren't enough to impress your PM*

### Accordion - The Space Saver

*Details/Summary: The unsung heroes of semantic HTML*

```html
<!-- Single accordion (no JS required!) -->
<details class="accordion">
  <summary class="accordion-trigger">
    <h3 class="heading">What is CRISP?</h3>
  </summary>
  <div class="accordion-content">
    <p class="text">A CSS methodology that actually makes sense.</p>
  </div>
</details>

<!-- Accordion group -->
<div class="as-stack" data-entries="3" role="region" aria-label="FAQ">
  <details class="accordion">
    <summary>Why no JavaScript?</summary>
    <div class="as-stack">
      <p>Because browsers are smarter than we give them credit for.</p>
    </div>
  </details>
  
  <details class="accordion">
    <summary>Is this magic?</summary>
    <div class="as-stack">
      <p>No, just semantic HTML doing its job.</p>
    </div>
  </details>
  
  <details class="accordion" open>
    <summary>Can I style it?</summary>
    <div class="as-stack">
      <p>Of course! Check the CSS below.</p>
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

### Feature Card
```html
<article class="card as-stack with-shadow with-interaction" 
  style="--padding: var(--space-2-0);">
  <div class="icon" style="--size: 3rem;">
    🚀
  </div>
  <h3 class="heading">Lightning Fast</h3>
  <p class="text">Because CSS is faster than your JavaScript framework.</p>
  <a class="link" href="/learn-more">
    Learn more →
  </a>
</article>
```

### Pricing Card

*Where dreams meet credit card limits*
```html
<article class="card as-stack with-border" 
  data-plan="professional"
  style="--stack-gap: var(--space-1-5); --border: 2px solid var(--color-primary);">
  <header class="as-stack" style="--stack-gap: var(--space-0-5);">
    <h3 class="heading">Professional</h3>
    <p class="text" style="--color: var(--color-neutral);">
      Perfect for growing teams
    </p>
  </header>
  
  <div class="price as-cluster" style="--cluster-align: baseline;">
    <span class="text" style="--size: var(--text-size-2-0); --weight: var(--text-weight-bold);">
      £49
    </span>
    <span class="text" style="--color: var(--color-neutral);">
      /month
    </span>
  </div>
  
  <ul class="list as-stack">
    <li>Unlimited projects</li>
    <li>Priority support</li>
    <li>Advanced analytics</li>
  </ul>
  
  <button class="button" type="button"
    style="--bg: var(--color-primary); --size: 1.125rem;">
    Start Free Trial
  </button>
</article>
```

```css
/* Plan-specific styling via data attribute */
[data-plan="professional"] {
  --border: 2px solid var(--color-primary);
}

[data-plan="enterprise"] {
  --border: 2px solid var(--color-gold);
  --bg: var(--color-neutral-dark);
}
```

### Content Card Grid
```html
<section class="as-grid" style="--grid-min: 300px; --grid-gap: var(--space-2-0);">
  <!-- Blog post card -->
  <article class="card as-stack" data-type="blog-post">
    <img class="image" src="post1.jpg" alt="">
    <div class="as-stack" style="--stack-gap: var(--space-0-75);">
      <h3 class="heading">Blog Post Title</h3>
      <p class="text">Preview text that entices readers...</p>
      <div class="as-cluster" style="--cluster-align: space-between;">
        <time class="text" style="--size: var(--text-size-0-875);">
          Jan 4, 2025
        </time>
        <a class="link" href="/post/1">Read more →</a>
      </div>
    </div>
  </article>
  
  <!-- More cards... -->
</section>
```

## Container Composition Rules

*The commandments of container contentment*

### 1. Semantic First
```html
<!-- ❌ Wrong: Generic container -->
<div class="card">
  <div>Title</div>
  <div>Content</div>
</div>

<!-- ✅ Right: Semantic container -->
<article class="card">
  <h2>Title</h2>
  <p>Content</p>
</article>
```

### 2. Layout as Enhancement
```html
<!-- Start simple -->
<article class="card">
  Content
</article>

<!-- Add layout when needed -->
<article class="card as-stack">
  <h2>Title</h2>
  <p>Content</p>
</article>

<!-- Enhance carefully -->
<article class="card as-stack with-shadow">
  <h2>Title</h2>
  <p>Content</p>
</article>
```

### 3. Properties Over Variants

*Because `.card-dark-large-rounded-shadow-interactive` is not a class name, it's a cry for help*
```html
<!-- ❌ Old way: Class variants -->
<article class="card card-dark card-large card-rounded">

<!-- ✅ CRISP way: Custom properties -->
<article class="card" 
  style="--bg: var(--color-neutral-dark); 
         --padding: var(--space-2-0); 
         --radius: var(--radius-xl);">
```

### 4. Context via Data Attributes
```html
<!-- ✅ Context defines appearance -->
<article class="card" data-variant="featured">
  Featured content gets special styling
</article>

<section data-theme="dark">
  <article class="card">
    Inherits dark theme styling
  </article>
</section>

<!-- ❌ Avoid context classes -->
<article class="card card--featured">
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

And when the PM asks for "premium cards with a golden glow and a subtle pulse animation"? You add `data-variant="premium"` and write 3 lines of CSS. Not 30. Not 300. Just 3.

Welcome to containers that contain joy, not complexity.

→ Continue to [Chapter 9: Finding Your Way](./C09-navigation.md)