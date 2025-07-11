# Chapter 5: Planting Patterns - Blueprint Classes

*Or: Everything you need, nothing you don't*

## The Secret Fourth Layer

Remember in Chapter 4 when we mentioned a secret kernel layer? Here it is:

```css
/* The complete layer architecture */
@layer kernel, crisp, bridge, overrides;
```

**The "Aha!"**: There's a `kernel` layer that contains all the type-safe @property definitions. It's like the engine room of a ship - you never go there, but it powers everything:

```css
/* In kernel layer (you never edit this) */
@layer kernel {
  * {
    @property --bg {
      syntax: "<color>";            /* Type-safe: only valid colors */
      inherits: false;              /* Doesn't inherit from parent */
      initial-value: transparent;   /* Fallback if not set */
    }
    
    @property --size {
      syntax: "<length>";
      inherits: false;
      initial-value: 1rem;
    }
    
    /* ... all standard properties defined once ... */
  }
}

/* In your blueprints (the element what you write) */
@layer crisp {
  .button {
    --bg: var(--color-neutral);    /* Just set values */
    --size: 1rem;                  /* Kernel handles the rest */
    
    background: var(--bg);         /* Already type-safe! */
    font-size: var(--size);        /* No @property needed */
  }
}
```

**Important**: Never modify the kernel layer! It's infrastructure. If you break the kernel, everything breaks. Now let's use what it provides...

## The Blueprint Philosophy

Remember building components with 47 modifier classes? CRISP has a more natural idea:

**One blueprint class. Infinite variations. Zero complexity.**

Let's explore the essential elements that power 90% of the web.

## Interactive Elements

### The Button

The workhorse of the web:

```html
<!-- Just a button -->
<button class="button" type="button">Click me</button>

<!-- With interaction feedback -->
<button class="button with-interaction" type="button" data-key="cta-hover">Hover me</button>

<!-- Customised -->
<button class="button" type="button" 
        style="--bg: var(--color-primary); --size: 1.25rem;"
        data-key="primary-action">
  Primary Action
</button>
```

**The Magic**: Every button has hover states, active states, and focus styles built in. No extra classes needed. This makes defining reusable blueprints effortless.

```css
/* Let's take a look at our button blueprint */
.button {
  /* Inside CRISP (kernel already defined these properties with defaults) */
  /* Override kernel defaults for button-specific values */
  --bg: var(--color-neutral);
  --color: white;
  
  /* Use the properties (kernel or overridden values) */
  background: var(--bg);
  color: var(--color);
  font-size: var(--size);      /* Uses kernel default */
  font-weight: var(--weight);  /* Uses kernel default */
  padding: var(--padding);     /* Uses kernel default */
  border-radius: var(--radius);/* Uses kernel default */
  
  /* Behaviour */
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-0-5);
  
  /* States included */
  &:hover {
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translateY(1px);
  }
}
```

### The Link

Links that adapt to context and state:

```html
<!-- Basic link with automatic hover/focus styles -->
<a class="link" href="/about">About us</a>

<!-- Current page - styled differently via ARIA -->
<a class="link" href="/" aria-current="page">Home</a>

<!-- Custom styled link -->
<a class="link" href="/cta" style="--color: var(--color-primary); --weight: 600;">
  Important Action
</a>
```

```css
/* What the CRISP link blueprint provides */
.link {
  --color: var(--color-primary);
  --underline: 1px;
  
  color: var(--color);
  text-decoration-thickness: var(--underline);
  
  /* Automatic states */
  &:hover {
    --underline: 2px;
  }
  
  /* Current page styling */
  &[aria-current="page"] {
    --color: var(--color-text);
    --weight: 600;
    cursor: default;
  }
}
```

**The "Aha!"**: `aria-current="page"` comes from YOUR SERVER. Not JavaScript. The days of client-side route highlighting are over.

**A note on servers**: When we say "YOUR SERVER", we're dreaming of Rust with Tera as template engine - where memory safety meets blazing speed and your server laughs at the mere concept of null pointer exceptions. But we're not zealots. PHP has been templating since before some of you were born, and it does the job admirably (when it's not accidentally exposing your database credentials). Node.js? Sure, if you enjoy the thrill of your event loop blocking on a particularly chonky regex. The point is: ANY server is better than making your poor user's phone calculate which link should look active whilst burning through their battery. Even a PHP server running on a Raspberry Pi is faster than client-side route detection. Choose your weapon wisely, but for heaven's sake, choose a server-side weapon.

**How to implement it:**

```html
<!-- Rust/Tera --> 
<a class="link" href="/about" {{ current_path == "/about" ? 'aria-current="page"' : '' }}>About</a>

<!-- PHP/Twig -->
<a class="link" href="/about" {{ current_path == '/about' ? 'aria-current="page"' : '' }}>About</a>

<!-- Python/Jinja2 -->
<a class="link" href="/about" {{ 'aria-current="page"' if current_path == '/about' else '' }}>About</a>

<!-- Node.js/EJS -->
<a class="link" href="/about" <%= path === '/about' ? 'aria-current="page"' : '' %>>About</a>
```

As you can see, Tera and Twig syntax are nearly identical (Tera and Twig were inspired by Jinja2 from Python, after all). From here on, we'll use Rust/Tera syntax in our examples. For those using Twig, the minor differences are well documented at [twig.symfony.com](https://twig.symfony.com/doc/)

Your server already knows which page it's serving. Use that intelligence instead of making the browser figure it out again.

**Why client-side route detection hurts**: When JavaScript highlights your "current" link, here's what happens:
1. Page loads with all links looking identical
2. Browser downloads your JavaScript (more bandwidth)
3. JavaScript parses and executes (CPU cycles, battery drain)
4. Script checks `window.location` against each link (more CPU, more battery)
5. Finally applies the "active" class (causes repaint)
6. User sees a flash as the link changes style (FOUC)
7. Mobile users cry as their battery percentage drops

Meanwhile, your server ALREADY KNEW which page it was serving. It's like shipping a parcel without an address label, then making the recipient figure out their own address. Madness.

With server-side `aria-current`, the link arrives already styled. No flash. No JavaScript. No battery drain. Just instant, correct rendering. The way Tim Berners-Lee intended.

### Form Inputs

Every input type, properly styled:

```html
<!-- Text input -->
<div class="field">
  <label class="label" for="name">Name</label>
  <input class="input" type="text" id="name" name="name" required>
</div>

<!-- Email with description -->
<div class="field">
  <label class="label" for="email">Email</label>
  <input class="input" type="email" id="email" name="email" 
         aria-describedby="email-help" required>
  <small class="helper" id="email-help">We'll never share your email</small>
</div>

<!-- Select dropdown -->
<div class="field">
  <label class="label" for="country">Country</label>
  <select class="select" id="country" name="country">
    <option value="">Choose...</option>
    <option value="uk">United Kingdom</option>
    <option value="us">United States</option>
  </select>
</div>

<!-- Textarea -->
<div class="field">
  <label class="label" for="message">Message</label>
  <textarea class="textarea" id="message" name="message" rows="4"></textarea>
</div>
```

**How to implement it:**

```html
<!-- Real-world Rust/Tera example: Country preselected from user profile -->
<select class="select" id="country" name="country">
  <option value="">Choose...</option>
  <option value="uk" {{ user.country == "uk" ? "selected" : "" }}>United Kingdom</option>
  <option value="us" {{ user.country == "us" ? "selected" : "" }}>United States</option>
</select>
```

**The "Aha!"**: Every field includes:
- Consistent spacing
- Focus states
- Error states (automatic with `:invalid`)
- Helper text support
- Full accessibility
- Server-side intelligence (your Rust backend already knows the user's country)

### Checkboxes & Radios

Properly styled, properly semantic:

```html
<!-- Checkbox -->
<label class="checkbox">
  <input type="checkbox" name="terms" required>
  <span>I agree to the terms</span>
</label>

<!-- Radio group -->
<fieldset class="fieldset">
  <legend class="legend">Preferred contact</legend>
  
  <label class="radio">
    <input type="radio" name="contact" value="email" checked>
    <span>Email</span>
  </label>
  
  <label class="radio">
    <input type="radio" name="contact" value="phone">
    <span>Phone</span>
  </label>
</fieldset>
```

**How to implement it:**

Real server-side templating isn't just about injecting values - it's about writing maintainable code. Use macros, partials, or components to keep your templates DRY. Repeating HTML structures (as in the form example above) leads inevitably to maintenance nightmares, inconsistent updates, and actual human tears. Here's how professionals do it:

```tera
{# Rust/Tera: Define reusable radio button macro #}
{% macro render_radio(radioRecord) %}
<label class="radio">
  <input type="radio" 
         name="{{ radioRecord.name }}" 
         value="{{ radioRecord.value }}" 
         {{ radioRecord.current == radioRecord.value ? "checked" : "" }}>
  <span>{{ radioRecord.label }}</span>
</label>
{% endmacro %}
```

And then use it with the merge pattern for clean markup:

```tera
{# Usage: Contact preference with shared base record #}
<fieldset class="fieldset">
  <legend class="legend">Preferred contact</legend>
  {% set radioRecord = { name: "contact", current: user.contact_preference } %}
  {{ render_radio(radioRecord | merge({value: "email", label: "Email"})) }}
  {{ render_radio(radioRecord | merge({value: "phone", label: "Phone"})) }}
  {{ render_radio(radioRecord | merge({value: "sms", label: "SMS"})) }}
</fieldset>
```

### The Switch

A modern toggle:

```html
<!-- Basic switch -->
<label class="switch" data-key="notifications-toggle">
  <input type="checkbox" role="switch" aria-checked="false">
  <span>Enable notifications</span>
</label>

<!-- Checked state -->
<label class="switch" data-key="theme-toggle">
  <input type="checkbox" role="switch" aria-checked="true" checked>
  <span>Dark mode</span>
</label>
```

**How to implement it:**

Following the pattern established with radio buttons, use records for maintainable switches:

```tera
{# Rust/Tera: Define reusable switch macro #}
{% macro render_switch(switchRecord) %}
<label class="switch" data-key="{{ switchRecord.key }}">
  <input type="checkbox" role="switch" 
         aria-checked="{{ switchRecord.enabled ? 'true' : 'false' }}"
         {{ switchRecord.enabled ? "checked" : "" }}
         name="{{ switchRecord.name }}">
  <span>{{ switchRecord.label }}</span>
</label>
{% endmacro %}
```

Usage in your templates:

```tera
{# Usage: Render notification toggle with user preferences #}
{{ render_switch({
  key: "notifications-toggle",
  name: "notifications",
  label: "Enable notifications",
  enabled: user.notifications_enabled
}) }}
```

## Container Blueprints

### The Card

Your content container:

```html
<!-- Basic card -->
<article class="card" data-key="simple-card">
  <h3 class="heading">Simple Card</h3>
  <p class="text">Just content in a box.</p>
</article>

<!-- Card with image -->
<article class="card" data-key="media-card">
  <img class="media" src="..." alt="..." loading="lazy">
  <div class="content">
    <h3 class="heading">Media Card</h3>
    <p class="text">Image + content, no extra markup.</p>
  </div>
</article>

<!-- Linked card -->
<article class="card" data-key="clickable-card">
  <h3 class="heading">
    <a class="link" href="/details">Clickable Card</a>
  </h3>
  <p class="text">The heading link extends to the whole card.</p>
</article>
```

**How to implement it:**

Cards benefit from the record pattern when rendering collections:

```tera
{# Rust/Tera: Define the macro for reusable product cards #}
{% macro render_product_card(cardRecord) %}
<article class="card" data-key="product-{{ cardRecord.id }}">
  {% if cardRecord.image %}
  <img class="media" src="{{ cardRecord.image }}" alt="{{ cardRecord.name }}" loading="lazy">
  {% endif %}
  <div class="content">
    <h3 class="heading">{{ cardRecord.name }}</h3>
    <p class="text">{{ cardRecord.description | truncate(length=cardRecord.excerpt_length | default(value=100)) }}</p>
    {% if cardRecord.price %}
    <span class="price">{{ cardRecord.price | currency }}</span>
    {% endif %}
  </div>
</article>
{% endmacro %}
```

And then use it in your templates:

```tera
{# Usage: Loop through products with consistent formatting #}
{% for product in products %}
  {{ render_product_card({
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.image_url,
    price: product.price,
    excerpt_length: 80
  }) }}
{% endfor %}
```

### The Article

Semantic content container:

```html
<article class="article" role="article" data-key="blog-article">
  <header>
    <h1 class="heading">Article Title</h1>
    <p class="meta">Published <time datetime="2025-01-15">15 January 2025</time></p>
  </header>
  
  <p class="text">Article content goes here...</p>
  
  <footer>
    <p class="meta">Tagged: <a class="link" href="/tags/css">CSS</a></p>
  </footer>
</article>
```

**How to implement it:**

```html
<!-- Rust/Tera: Blog article with metadata -->
<article class="article" role="article" data-key="blog-{{ article.slug }}">
  <header>
    <h1 class="heading">{{ article.title }}</h1>
    <p class="meta">
      Published <time datetime="{{ article.published_at | date(format='%Y-%m-%d') }}">
        {{ article.published_at | date(format='%d %B %Y') }}
      </time>
      by {{ article.author.name }}
    </p>
  </header>
  
  <div class="content">
    {{ article.content | safe }}
  </div>
  
  <footer>
    <p class="meta">
      Tagged: 
      {% for tag in article.tags %}
        <a class="link" href="/tags/{{ tag.slug }}">{{ tag.name }}</a>
        {%- if not loop.last %}, {% endif %}
      {% endfor %}
    </p>
  </footer>
</article>
```

### The Section

Page sections made simple:

```html
<section class="section" aria-labelledby="features-title" data-key="features-section">
  <h2 class="heading" id="features-title">Features</h2>
  <p class="text">What makes us different.</p>
  <!-- Section content -->
</section>
```

### The Dialog

Native, accessible modals:

```html
<dialog class="dialog" id="confirm-dialog" data-key="confirm-modal">
  <form method="dialog" class="as-stack">
    <h2 class="heading">Confirm Action</h2>
    <p class="text">Are you sure you want to continue?</p>
    <div class="as-cluster">
      <button class="button" type="submit" value="cancel">Cancel</button>
      <button class="button with-interaction" type="submit" value="confirm"
              style="--bg: var(--color-primary);">
        Confirm
      </button>
    </div>
  </form>
</dialog>

<!-- Open with JavaScript -->
<script>
  document.getElementById('confirm-dialog').showModal();
</script>
```

**The "Aha!"**: Native `<dialog>` means:
- Built-in focus trap
- Escape key handling
- Backdrop included
- Form integration
- Zero libraries needed

**How to implement it:**

```html
<!-- Rust/Tera: Dynamic confirmation dialog -->
<dialog class="dialog" id="delete-{{ item.id }}" data-key="delete-modal-{{ item.id }}">
  <form method="dialog" class="as-stack">
    <h2 class="heading">Delete {{ item.name }}?</h2>
    <p class="text">This action cannot be undone. {{ item.dependent_count }} related items will also be deleted.</p>
    <div class="as-cluster">
      <button class="button" type="submit" value="cancel">Cancel</button>
      <button class="button with-interaction" type="submit" value="confirm"
              style="--bg: var(--color-danger);"
              formaction="/items/{{ item.id }}/delete"
              formmethod="post">
        Delete Permanently
      </button>
    </div>
  </form>
</dialog>
```

### The Figure

Semantic media container:

```html
<figure class="figure" data-key="sales-chart">
  <img class="media" src="chart.png" alt="Sales data for 2024">
  <figcaption class="caption">
    Sales increased by 23% year-over-year
  </figcaption>
</figure>
```

**How to implement it:**

```html
<!-- Rust/Tera: Dynamic chart with calculated data -->
<figure class="figure" data-key="analytics-{{ chart.type }}">
  <img class="media" 
       src="/api/charts/{{ chart.id }}" 
       alt="{{ chart.title }}: {{ chart.summary }}">
  <figcaption class="caption">
    {{ chart.caption }} 
    <small>(Last updated: {{ chart.updated_at | date(format='%d %B %Y') }})</small>
  </figcaption>
</figure>
```

### The Blockquote

Quotes done right:

```html
<blockquote class="blockquote" cite="https://example.com/article" data-key="alan-kay-quote">
  <p class="text">
    "The best way to predict the future is to invent it."
  </p>
  <footer>
    <cite class="cite">Alan Kay</cite>
  </footer>
</blockquote>
```

**How to implement it:**

```html
<!-- Rust/Tera: Testimonials from your database -->
<blockquote class="blockquote" 
            cite="{{ testimonial.source_url }}" 
            data-key="testimonial-{{ testimonial.id }}">
  <p class="text">
    "{{ testimonial.quote }}"
  </p>
  <footer>
    <cite class="cite">{{ testimonial.author }}</cite>
    {% if testimonial.company %}
      <span class="meta">, {{ testimonial.role }} at {{ testimonial.company }}</span>
    {% endif %}
  </footer>
</blockquote>
```

## Composition Patterns

The power comes from combining:

```html
<!-- Card grid -->
<div class="as-grid" data-entries="3" data-key="card-grid">
  <article class="card as-stack" data-key="card-1">
    <h3 class="heading">Card 1</h3>
    <p class="text">Content</p>
    <button class="button">Action</button>
  </article>
  
  <article class="card as-stack" data-key="card-2">
    <h3 class="heading">Card 2</h3>
    <p class="text">Content</p>
    <button class="button">Action</button>
  </article>
  
  <article class="card as-stack" data-key="card-3">
    <h3 class="heading">Card 3</h3>
    <p class="text">Content</p>
    <button class="button">Action</button>
  </article>
</div>
```

**How to implement it:**

```html
<!-- Rust/Tera: Dynamic grid from your content -->
<div class="as-grid" data-entries="{{ products | length }}" data-key="products-grid">
  {% for product in products %}
  <article class="card as-stack" data-key="product-{{ product.slug }}">
    <img class="media" src="{{ product.image }}" alt="{{ product.name }}" loading="lazy">
    <h3 class="heading">{{ product.name }}</h3>
    <p class="text">{{ product.description | truncate(length=80) }}</p>
    <div class="as-cluster">
      <span class="price">{{ product.price | currency }}</span>
      <button class="button with-interaction" 
              data-key="add-{{ product.id }}"
              data-product-id="{{ product.id }}">
        Add to Cart
      </button>
    </div>
  </article>
  {% endfor %}
</div>
```

## State Management

Use data attributes and ARIA, not classes:

```html
<!-- Visual variants -->
<button class="button" data-variant="danger" data-key="delete-button">Delete</button>
<div class="alert" data-variant="success" data-key="success-alert">Saved!</div>

<!-- Actual states -->
<button class="button" aria-pressed="true" data-key="toggle-button">Active</button>
<details class="disclosure" open data-key="expandable-details">
  <summary>Expanded content</summary>
  <p>Details here</p>
</details>
```

## The Blueprint Promise

Every CRISP blueprint:
- Works without JavaScript
- Responds without media queries
- Themes without modifications
- Validates without libraries
- Animates without frameworks

## Your Toolkit

You now have:
- **Buttons & Links**: For actions and navigation
- **Form Controls**: For user input
- **Cards & Articles**: For content
- **Dialogs & Figures**: For special content
- **State patterns**: For dynamic UI

With these ~15 blueprints, you can build almost anything.

**The "Aha!"**: You don't need 200 blueprints. You need 15 good ones that compose well.

Ready to arrange them beautifully?

→ Continue to [Chapter 6: Garden Layouts - Arrangement Without Tears](./CH06-layouts.md)