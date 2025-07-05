# Chapter 8: Boxes That Contain Things

*Or: How to contain content without containing your rage*

## The Container Conundrum

Remember this nightmare?

```css
/* The old way: Special class for every container variant */
.card { }
.card-white { }
.card-gray { }
.card-bordered { }
.card-shadow { }
.card-rounded { }
.card-flat { }
.card-interactive { }
.card-clickable { }
.card-compact { }
.card-spacious { }
.card-horizontal { }
.card-vertical { }
.card-featured { }
.card-minimal { }
/* 50 more variants... */

/* And then the combinations */
.card-white-bordered-shadow-rounded-interactive-compact { }
/* Just kidding. But you wanted to, didn't you? */
```

## The CRISP Container Philosophy

One container class. Custom properties for variations. Your sanity intact.

## Content Containers

### Card - The Universal Container

The card is CRISP's Swiss Army knife. It contains things. That's it.

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
  style="--card-bg: var(--color-primary-5);">
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
```

CSS that powers it all:
```css
.card {
  background: var(--card-bg, var(--color-background));
  padding: var(--card-padding, var(--space-1-5));
  border-radius: var(--card-radius, var(--radius-lg));
  border: var(--card-border, none);
}

.card.with-interaction {
  cursor: pointer;
  transition: all var(--transition-fast);
}

.card.with-interaction:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-elevated);
}
```

### Article - Semantic Content

When your content is self-contained and distributable:

```html
<!-- Blog post -->
<article class="article as-stack">
  <header class="as-stack" style="--stack-gap: var(--space-0-5);">
    <h1 class="heading">Article Title</h1>
    <time class="text" style="--text-color: var(--color-neutral-60);">
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

<!-- News item -->
<article class="article card as-stack with-shadow">
  <img class="image" src="news.jpg" alt="News image">
  <div class="as-stack" style="--stack-gap: var(--space-0-75);">
    <h2 class="heading">Breaking News</h2>
    <p class="text">Something important happened...</p>
    <a class="link" href="/full-story">Read more →</a>
  </div>
</article>
```

### Section - Thematic Grouping

For grouping related content:

```html
<!-- Feature section -->
<section class="section as-stack" style="--stack-gap: var(--space-2-0);">
  <header class="as-center">
    <h2 class="heading" style="--heading-size: var(--text-size-2-0);">
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

<!-- Testimonials section -->
<section class="section as-container" 
  style="--section-bg: var(--color-neutral-5);">
  <h2 class="heading as-center">What Our Users Say</h2>
  
  <div class="as-grid">
    <blockquote class="quote card">
      <p>"CRISP changed my life!"</p>
      <cite>- Happy Developer</cite>
    </blockquote>
  </div>
</section>
```

### Dialog - Modal Containers

For overlays and modals:

```html
<!-- Native dialog -->
<dialog class="dialog card as-stack" id="confirm-dialog">
  <h2 class="heading">Confirm Action</h2>
  <p class="text">Are you sure you want to proceed?</p>
  
  <div class="as-cluster" style="--cluster-align: flex-end;">
    <button class="button" type="button" onclick="closeDialog()">
      Cancel
    </button>
    <button class="button" type="button" 
      style="--button-bg: var(--color-danger-50);"
      onclick="confirmAction()">
      Delete
    </button>
  </div>
</dialog>

<!-- Full-screen dialog -->
<dialog class="dialog as-center" style="--dialog-width: 100vw; --dialog-height: 100vh;">
  <div class="card as-stack" style="--card-width: min(90vw, 600px);">
    <h1>Welcome</h1>
    <p>Full-screen modal content</p>
  </div>
</dialog>
```

JavaScript for modern dialog:
```javascript
// Open
document.getElementById('confirm-dialog').showModal();

// Close
document.getElementById('confirm-dialog').close();
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
        background: var(--card-bg, white);
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
    <cite class="text" style="--text-weight: var(--text-weight-semibold);">
      Jane Smith
    </cite>
    <small class="text" style="--text-color: var(--color-neutral-60);">
      CTO, TechCorp
    </small>
  </footer>
</blockquote>

<!-- Pull quote -->
<blockquote class="quote" style="--quote-size: var(--text-size-1-5); --quote-color: var(--color-primary-60);">
  <p>"The best container is the one you don't have to think about."</p>
</blockquote>
```

## Container Patterns

### Feature Card
```html
<article class="card as-stack with-shadow with-interaction" 
  style="--card-padding: var(--space-2-0);">
  <div class="icon" style="--icon-size: 3rem;">
    <svg><!-- Icon --></svg>
  </div>
  <h3 class="heading">Feature Title</h3>
  <p class="text">Feature description that explains the benefit.</p>
  <a class="link" href="/learn-more" role="button">
    Learn more →
  </a>
</article>
```

### Pricing Card
```html
<article class="card as-stack with-border" 
  style="--stack-gap: var(--space-1-5); --card-border: 2px solid var(--color-primary-30);">
  <header class="as-stack" style="--stack-gap: var(--space-0-5);">
    <h3 class="heading">Professional</h3>
    <p class="text" style="--text-color: var(--color-neutral-60);">
      Perfect for growing teams
    </p>
  </header>
  
  <div class="price as-cluster" style="--cluster-align: baseline;">
    <span class="text" style="--text-size: var(--text-size-2-0); --text-weight: var(--text-weight-bold);">
      £49
    </span>
    <span class="text" style="--text-color: var(--color-neutral-60);">
      /month
    </span>
  </div>
  
  <ul class="list as-stack">
    <li>Unlimited projects</li>
    <li>Priority support</li>
    <li>Advanced analytics</li>
  </ul>
  
  <button class="button with-interaction" 
    style="--button-bg: var(--color-primary-50); --button-size: var(--text-size-1-25);">
    Start Free Trial
  </button>
</article>
```

### Content Card Grid
```html
<section class="as-grid" style="--grid-min: 300px; --grid-gap: var(--space-2-0);">
  <!-- Blog post card -->
  <article class="card as-stack">
    <img class="image" src="post1.jpg" alt="">
    <div class="as-stack" style="--stack-gap: var(--space-0-75);">
      <h3 class="heading">Blog Post Title</h3>
      <p class="text">Preview text that entices readers...</p>
      <div class="as-cluster" style="--cluster-align: space-between;">
        <time class="text" style="--text-size: var(--text-size-0-875);">
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
```html
<!-- ❌ Old way: Class variants -->
<article class="card card-dark card-large card-rounded">

<!-- ✅ CRISP way: Custom properties -->
<article class="card" 
  style="--card-bg: var(--color-neutral-90); 
         --card-padding: var(--space-2-0); 
         --card-radius: var(--radius-xl);">
```

## The Container Liberation

With CRISP containers:
- One class per container type
- Infinite variations via properties
- Semantic HTML preserved
- Consistent spacing with layouts
- No variant explosion

Your content has a home. Your code stays clean. Your future self thanks you.

→ Continue to [Chapter 9: Finding Your Way](./C09-navigation.md)