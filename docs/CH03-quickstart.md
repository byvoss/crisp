# Chapter 3: Seeds to Sprouts - Your First CRISP Page

*Or: Building a complete website in less code than your current navigation component*

## Let's Build Something Real

Enough theory. You've seen the problem. You've glimpsed the solution. Now let's build an actual page.

In the next 10 minutes, you'll create:
- A responsive navigation
- A hero section
- A features grid
- A contact form
- A footer

Total CSS classes needed? About 20. Let's go.

## Step 1: The HTML Shell

Start with proper, semantic HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First CRISP Page</title>
  <link rel="stylesheet" href="https://unpkg.com/@crisp/css@latest/crisp.css">
</head>
<body>
  <!-- We'll build here -->
</body>
</html>
```

That's it. No build process. No npm install. Just one CSS file.

## Step 2: Navigation That Just Works

```html
<header class="header as-container">
  <nav class="navigation as-cluster" data-entries="4" aria-label="Main navigation">
    <a class="link" href="/" aria-current="page">Home</a>
    <a class="link" href="/about">About</a>
    <a class="link" href="/features">Features</a>
    <a class="link" href="/contact">Contact</a>
  </nav>
</header>
```

**The "Aha!"**: 
- `as-container` gives you responsive padding
- `as-cluster` arranges links horizontally with proper spacing
- `data-entries="4"` tells CSS there are 4 items (for responsive decisions)
- Proper ARIA labels for accessibility

Mobile responsive? Already handled. Dark mode? Automatic.

## Step 3: A Hero That Heroes

```html
<section class="hero as-center">
  <div class="as-stack">
    <h1 class="heading" style="--size: clamp(2rem, 5vw, 3rem);">
      Welcome to Simple
    </h1>
    <p class="text" style="--size: var(--text-large);">
      Building the web doesn't have to hurt
    </p>
    <div class="as-cluster">
      <button class="button with-interaction" 
              style="--bg: var(--color-primary);" 
              type="button">
        Get Started
      </button>
      <a class="button" href="#features">Learn More</a>
    </div>
  </div>
</section>
```

No utility classes. No breakpoints. Just semantic HTML with layout helpers.

## Step 4: Features Grid

```html
<section class="section as-container" id="features">
  <h2 class="heading as-center">Why CRISP?</h2>
  
  <div class="as-grid" data-entries="3" style="--grid-gap: var(--space-2);">
    <article class="card as-stack">
      <h3 class="heading">Simple</h3>
      <p class="text">
        No more utility soup. Just semantic HTML with sensible defaults.
      </p>
    </article>
    
    <article class="card as-stack">
      <h3 class="heading">Responsive</h3>
      <p class="text">
        Mobile-first, container queries, and modern CSS. It just works.
      </p>
    </article>
    
    <article class="card as-stack">
      <h3 class="heading">Accessible</h3>
      <p class="text">
        WCAG 2.2 AA compliant out of the box. No ARIA gymnastics.
      </p>
    </article>
  </div>
</section>
```

**The Magic**: 
- `as-grid` creates a responsive grid
- `data-entries="3"` helps with responsive decisions
- Cards automatically stack on mobile

## Step 5: A Form That Forms

```html
<section class="section as-container" id="contact">
  <div class="as-center" style="--max-width: 40rem;">
    <h2 class="heading">Get in Touch</h2>
    
    <form class="form as-stack">
      <div class="field">
        <label class="label" for="name">Name</label>
        <input class="input" type="text" id="name" name="name" required>
      </div>
      
      <div class="field">
        <label class="label" for="email">Email</label>
        <input class="input" type="email" id="email" name="email" required>
      </div>
      
      <div class="field">
        <label class="label" for="message">Message</label>
        <textarea class="textarea" id="message" name="message" rows="4" required></textarea>
      </div>
      
      <button class="button with-interaction" 
              style="--bg: var(--color-primary);" 
              type="submit">
        Send Message
      </button>
    </form>
  </div>
</section>
```

Native HTML validation. Accessible by default. Styled without fighting.

## Step 6: Footer Finale

```html
<footer class="footer as-container">
  <div class="as-split">
    <p class="text">&copy; 2025 Simple Site. All rights reserved.</p>
    <nav class="navigation as-cluster" data-entries="3" aria-label="Footer navigation">
      <a class="link" href="/privacy">Privacy</a>
      <a class="link" href="/terms">Terms</a>
      <a class="link" href="/cookies">Cookies</a>
    </nav>
  </div>
</footer>
```

`as-split` pushes content to opposite ends. Responsive without media queries.

## The Complete Page

Put it all together:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First CRISP Page</title>
  <link rel="stylesheet" href="https://unpkg.com/@crisp/css@latest/crisp.css">
  <style>
    /* Your customisations (if any) */
    :root {
      --color-primary: oklch(60% 0.15 250);
    }
  </style>
</head>
<body>
  <header class="header as-container">
    <nav class="navigation as-cluster" data-entries="4" aria-label="Main navigation">
      <a class="link" href="/" aria-current="page">Home</a>
      <a class="link" href="/about">About</a>
      <a class="link" href="/features">Features</a>
      <a class="link" href="/contact">Contact</a>
    </nav>
  </header>

  <main>
    <section class="hero as-center">
      <div class="as-stack">
        <h1 class="heading" style="--size: clamp(2rem, 5vw, 3rem);">
          Welcome to Simple
        </h1>
        <p class="text" style="--size: var(--text-large);">
          Building the web doesn't have to hurt
        </p>
        <div class="as-cluster">
          <button class="button with-interaction" 
                  style="--bg: var(--color-primary);" 
                  type="button">
            Get Started
          </button>
          <a class="button" href="#features">Learn More</a>
        </div>
      </div>
    </section>

    <section class="section as-container" id="features">
      <h2 class="heading as-center">Why CRISP?</h2>
      
      <div class="as-grid" data-entries="3" style="--grid-gap: var(--space-2);">
        <article class="card as-stack">
          <h3 class="heading">Simple</h3>
          <p class="text">
            No more utility soup. Just semantic HTML with sensible defaults.
          </p>
        </article>
        
        <article class="card as-stack">
          <h3 class="heading">Responsive</h3>
          <p class="text">
            Mobile-first, container queries, and modern CSS. It just works.
          </p>
        </article>
        
        <article class="card as-stack">
          <h3 class="heading">Accessible</h3>
          <p class="text">
            WCAG 2.2 AA compliant out of the box. No ARIA gymnastics.
          </p>
        </article>
      </div>
    </section>

    <section class="section as-container" id="contact">
      <div class="as-center" style="--max-width: 40rem;">
        <h2 class="heading">Get in Touch</h2>
        
        <form class="form as-stack">
          <div class="field">
            <label class="label" for="name">Name</label>
            <input class="input" type="text" id="name" name="name" required>
          </div>
          
          <div class="field">
            <label class="label" for="email">Email</label>
            <input class="input" type="email" id="email" name="email" required>
          </div>
          
          <div class="field">
            <label class="label" for="message">Message</label>
            <textarea class="textarea" id="message" name="message" rows="4" required></textarea>
          </div>
          
          <button class="button with-interaction" 
                  style="--bg: var(--color-primary);" 
                  type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  </main>

  <footer class="footer as-container">
    <div class="as-split">
      <p class="text">&copy; 2025 Simple Site. All rights reserved.</p>
      <nav class="navigation as-cluster" data-entries="3" aria-label="Footer navigation">
        <a class="link" href="/privacy">Privacy</a>
        <a class="link" href="/terms">Terms</a>
        <a class="link" href="/cookies">Cookies</a>
      </nav>
    </div>
  </footer>
</body>
</html>
```

## Count What Matters

Let's tally what you just built:

**Components Used:**
- `header`, `navigation`, `link`
- `hero`, `section`, `heading`, `text`
- `card`, `button`
- `form`, `field`, `label`, `input`, `textarea`
- `footer`

**Layout Helpers:**
- `as-container`, `as-center`, `as-stack`
- `as-cluster`, `as-grid`, `as-split`

**Property Classes:**
- `with-interaction` (just one!)

**Total Unique Classes:** ~20

**Lines of Custom CSS:** 3

## What You Didn't Write

- Media queries (0)
- Breakpoint utilities (0)
- Dark mode classes (0)
- Hover state declarations (0)
- Focus state styles (0)
- Grid system classes (0)
- Spacing utilities (0)
- Typography scales (0)
- Color modifiers (0)

It's all built in. Waiting. Working.

## Try These Variations

Want a dark theme? Add one attribute:

```html
<body data-theme="dark">
```

Want wider spacing? One custom property:

```html
<body style="--space-1: 1.25rem;">
```

Want a different primary color? You know the drill:

```html
<style>
  :root {
    --color-primary: oklch(70% 0.25 150); /* Green */
  }
</style>
```

## The Revelation

You just built a complete, responsive, accessible website with:
- No build process
- No framework
- No utility classes
- No custom CSS (almost)
- No JavaScript
- No tears

This is CRISP. This is what CSS was supposed to be.

## Your Homework

Take this page. Make it yours:
1. Change the colors
2. Adjust the spacing
3. Add more sections
4. Try different layouts

Notice what you DON'T have to do:
- Fight specificity
- Write media queries
- Add modifier classes
- Duplicate styles
- Cry

Ready to understand the magic behind the curtain?

→ Continue to [Chapter 4: Garden Beds - The Three-Layer Architecture](./CH04-layers.md)