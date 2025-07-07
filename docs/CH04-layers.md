# Chapter 4: Garden Beds - The Three-Layer Architecture

*Or: How to end specificity wars with one line of CSS*

## The Problem We've All Faced

You've written this CSS:

```css
.button {
  background: blue;
}
```

Later, you need to override it:

```css
.special-button {
  background: red;
}
```

But it doesn't work. So you try:

```css
.container .special-button {
  background: red !important;
}
```

Still fighting? Welcome to specificity hell. But what if I told you this problem was solved in 2022?

## Enter CSS @layer

CSS layers are like... well, layers. Imagine a cake:
- Bottom layer: Framework styles
- Middle layer: Your customisations
- Top layer: Emergency overrides

The top always wins. No specificity calculation. No !important. Just layers.

## The CRISP Three-Layer System

CRISP uses exactly three layers (that you see):

```css
@layer crisp, bridge, overrides;
```

That's it. One line that changes everything.

**The Secret**: There's actually a fourth layer called `kernel` that comes before everything. But you never touch it - it's the engine room that makes everything work. We'll reveal this secret when you're ready (Chapter 5).

### Layer 1: CRISP Framework

```css
@layer crisp {
  /* All CRISP styles live here */
  .button {
    --bg: var(--color-neutral);
    --color: white;
    --padding: var(--space-0-75) var(--space-1-5);
    
    background: var(--bg);
    color: var(--color);
    padding: var(--padding);
  }
  
  .card {
    --bg: var(--color-surface);
    --padding: var(--space-1-5);
    
    background: var(--bg);
    padding: var(--padding);
  }
}
```

### Layer 2: Bridge (Your Playground)

```css
@layer bridge {
  /* Your project-specific code */
  /* Migration helpers */
  /* Temporary fixes */
  /* Third-party integrations */
}
```

The bridge layer is empty by default. It's your space for:
- Migrating from other frameworks
- Adding project-specific patterns
- Integrating third-party code
- Temporary workarounds

### Layer 3: Overrides (Always Win)

```css
@layer overrides {
  /* Your customisations always win */
  .button {
    --bg: hotpink; /* This wins. Always. */
  }
}
```

## The Magic in Action

Watch this:

```css
/* The layer order */
@layer crisp, bridge, overrides;

/* CRISP defines a button */
@layer crisp {
  .button {
    background: blue;
    padding: 1rem 2rem;
  }
}

/* You override it */
@layer overrides {
  .button {
    background: red; /* This wins! */
  }
}
```

**The "Aha!"**: Your `.button` override wins even though CRISP's selector is identical. No specificity fight. The override layer always wins.

## Real-World Example: Migration

Let's say you're migrating from Bootstrap:

```css
@layer crisp, bridge, overrides;

@layer bridge {
  /* Map Bootstrap classes to CRISP */
  .btn {
    @extend .button;
  }
  
  .btn-primary {
    --bg: var(--color-primary);
  }
  
  .container {
    @extend .as-container;
  }
  
  .row {
    @extend .as-grid;
  }
}
```

Your Bootstrap HTML keeps working while you migrate. When ready, remove the bridge mappings.

## Advanced Bridge Patterns

The bridge layer can have sub-layers:

```css
@layer crisp, bridge, overrides;

@layer bridge {
  /* Define sub-layers for organisation */
  @layer migrations, vendor, experiments;
  
  @layer migrations {
    /* Bootstrap mappings */
    .btn { @extend .button; }
  }
  
  @layer vendor {
    /* Third-party styles */
    @import "some-datepicker.css";
  }
  
  @layer experiments {
    /* Try new ideas safely */
    .card {
      --experimental-shadow: 0 0 20px rainbow;
    }
  }
}
```

You can even toggle sub-layers:

```css
/* All bridge features active */
@layer crisp, bridge, overrides;

/* Only migrations active */
@layer crisp, bridge.migrations, overrides;

/* Bridge off completely */
@layer crisp, overrides;
```

## No More Specificity Wars

Before layers:
```css
/* Specificity: 0,1,1 */
.header .button { background: blue; }

/* Specificity: 0,1,0 - LOSES! */
.special-button { background: red; }

/* Nuclear option needed */
.special-button { background: red !important; }
```

With layers:
```css
@layer crisp {
  /* Any specificity */
  #header .button[type="submit"]:hover { 
    background: blue; 
  }
}

@layer overrides {
  /* Still wins with simple selector */
  .button { 
    background: red; 
  }
}
```

**The "Aha!"**: Specificity only matters WITHIN a layer. Between layers, order rules.

## The Mental Model

Think of it like this:

1. **CRISP layer**: The foundation. Well-tested, reliable defaults.
2. **Bridge layer**: Your workspace. Experiment, migrate, integrate.
3. **Override layer**: Your final say. Always wins.

```css
/* Your entire cascade control */
@layer crisp, bridge, overrides;

/* That's it. You're done. */
```

## Common Patterns

### Pattern 1: Project Customisation

```css
@layer overrides {
  /* Your brand colors */
  :root {
    --color-primary: oklch(45% 0.25 270);
    --color-secondary: oklch(60% 0.20 150);
  }
  
  /* Your component tweaks */
  .card {
    --radius: 1rem;
  }
  
  .button {
    --weight: 600;
  }
}
```

### Pattern 2: Component Variants

```css
@layer overrides {
  /* Add new variants without touching CRISP */
  [data-variant="cta"] .button {
    --bg: var(--color-accent);
    --size: 1.25rem;
    --padding: var(--space-1) var(--space-2);
  }
}
```

### Pattern 3: Emergency Fixes

```css
@layer overrides {
  /* Third-party component fix */
  .some-broken-widget {
    /* Your fix always wins */
    position: relative !important; /* Yes, you can still use !important */
  }
}
```

## The Beautiful Truth

With three layers:
- Your overrides always win
- No specificity calculations
- No source order juggling
- No !important wars (unless you want them)
- Clean separation of concerns

## Try It Yourself

```html
<style>
  /* Setup layers */
  @layer framework, overrides;
  
  /* Framework styles */
  @layer framework {
    .demo {
      background: blue;
      color: white;
      padding: 2rem;
    }
  }
  
  /* Your overrides */
  @layer overrides {
    .demo {
      background: hotpink; /* Winner! */
    }
  }
</style>

<div class="demo">
  I'm hotpink, not blue!
</div>
```

## The Complete Power

Layers solve problems you didn't know you had:

1. **Vendor styles under control**: Put them in bridge layer
2. **Team conflicts avoided**: Everyone works in overrides
3. **Refactoring simplified**: Move styles between layers
4. **Testing isolated**: Toggle layers on/off
5. **Performance improved**: Browser optimises layer rendering

## Your Escape Route

Currently fighting specificity? Here's your migration:

```css
/* Step 1: Add layers */
@layer old-styles, crisp, overrides;

/* Step 2: Import everything */
@layer old-styles {
  @import "your-mess.css";
}

/* Step 3: Start fresh in overrides */
@layer overrides {
  /* Your new styles always win */
}

/* Step 4: Migrate gradually */
/* Move from old-styles to crisp patterns */
```

## The Promise

Three layers. Total control. No more:
- Specificity calculators
- !important chains
- Source order shuffling
- Selector hacking
- CSS anxiety

Just predictable, manageable styles.

Ready to see what you can build with this foundation?

→ Continue to [Chapter 5: Planting Patterns - Basic Components](./CH05-components.md)