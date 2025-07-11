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

But it doesn't work. So, after many turns you try to focus more precisely:

```css
body.product-page .order-container .special-button {
  background: red !important;
}
```

Still fighting? Welcome to specificity hell. But what if I told you this problem can be solved with one simple statement?

## CSS @layer enters the stage

CSS layers are purely powerful. They are like transparent sheets stacked on top of each other.
**The Complete Truth**: There's actually a hierarchy:
1. Inline styles (style="...") - Always win
2. @layer overrides - Your customisations
3. @layer bridge - Migrations (place sublayers in there for every case you have to bridge)
4. @layer crisp - Framework blueprints
5. @layer kernel - Framework Foundation (hidden)

The top layer always wins and inherits everything from the layers below. It's true inheritance through the layers. No specificity calculation. No !important shit move. Just layers.

When you look down through the stack, you see the topmost definition for each property. But for daily work, CRISP keeps it simple - you only have to think about the three main layers:

## The CRISP Three-Layer System

CRISP uses exactly three open layers:

```css
@layer crisp, bridge, overrides;
```

That's it. One line that changes everything.

**The open Secret**: But what about the kernel layer, you ask? There's actually a fourth layer that sits beneath all others. You never touch it - it's the engine room that defines all the generic properties like `--bg`, `--color`, `--size`, `--padding` with their strict type definitions and defaults. Every blueprint uses these kernel properties. We'll reveal this secret fully when you're ready (Chapter 5).

### Layer 1: CRISP Framework

This is where all CRISP's blueprints live. It's the foundation - battle-tested, accessible, and responsive by default. Every blueprint here follows the two-step pattern: define properties, then apply them. This separation is what makes CRISP so flexible.

```css
@layer crisp {
  /* All CRISP blueprints live here */
  .button {
    /* Step 1: Define blueprint defaults */
    --bg: var(--color-neutral);
    --color: white;
    --padding: var(--space-0-75) var(--space-1-5);
    
    /* Step 2: Apply the properties */
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

The bridge layer is your transition space. Empty by default, it's where you handle the messy reality of web development. Think of it as your workshop where you can safely tinker without touching the framework or your final styles.

It's your space for:
- Migrating from other frameworks
- Adding project-specific patterns
- Integrating third-party code
- Temporary workarounds

Example sublayers for organization:

```css
@layer bridge {
  /* Organize migrations and temporary code into sublayers.
     As each migration completes, you can toggle off its sublayer
     without affecting the others - clean, controlled cleanup! */

  /* All Bootstrap compatibility mappings */
  @layer bridge.bootstrap {
    @import "bootstrap-compat.css";
  }
  
  /* Legacy code that needs gradual migration */
  @layer bridge.our-old-logic {
    @import "legacy-components.css";
  }
  
  /* Third-party libraries */
  @layer bridge.vendor {
    @import "datepicker.css";
    @import "charts.css";
  }
  
  /* New features being tested */
  @layer bridge.experiments {
    .card { --experimental-glow: 0 0 20px var(--color-primary); }
  }
}
```

### Layer 3: Overrides (Your Final Say)

This is your domain. The final word in the CSS layer system. Whatever you put here wins over @crisp and @bridge layers. It's where your brand lives, where you make CRISP truly yours. No specificity wars between stylesheets, no !important chains - just pure, predictable layer ordering. The only way to be more explicit is to use inline styles with CRISP kernel properties (e.g., `style="--bg: red;"`).

```css
@layer overrides {
  /* Your customisations win over all layers below. 
     The beauty: You only override what you need - all other 
     properties inherit through from the layers beneath. */
  .button {
    --bg: hotpink; /* This wins. */
  }
}
```

## The Magic in Action

Watch this:

```css
/* The layer order */
@layer crisp, bridge, overrides;

/* CRISP defines a button blueprint */
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

Or use inline styles for ultimate control:

```html 
<button class="button" style="--bg: green;">
  I'm green, no matter what!
</button>
```

**The "Aha!"**: Your `.button` override wins even though CRISP's selector is identical. No specificity fight. The override layer always wins (unless you use inline styles, which beat everything).

## Real-World Example: Migration

Let's say you're migrating from Bootstrap:

```css
@layer crisp, bridge, overrides;

@layer bridge {
  /* Use sublayers for organized migration */
  @layer bridge.bootstrap {
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
  
  @layer bridge.our-old-logic {
    /* Your legacy styles */
    .old-header {
      /* temporary compatibility styles */
    }
  }
}
```

Your Bootstrap HTML keeps working while you migrate. When ready, simply remove the `bridge.bootstrap` sublayer - the rest stays untouched. Clean, instant, no side effects.

You can even toggle sub-layers during development:

```css
/* All bridge features active */
@layer crisp, bridge, overrides;

/* Only Bootstrap mappings active */
@layer crisp, bridge.bootstrap, overrides;

/* Bridge off completely (migration complete!) */
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
3. **Override layer**: Your final say. Always wins as layer.

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
  
  /* Your blueprint tweaks */
  .card {
    --radius: 1rem;
  }
  
  .button {
    --weight: 600;
  }
}
```

### Pattern 2: Blueprint Variants

```css
@layer overrides {
  /* Add new variants without touching CRISP */
  .button[data-variant="cta"] {
    --bg: var(--color-accent);
    --size: 1.25rem;
    --padding: var(--space-1) var(--space-2);
  }
  
  /* Or target specific buttons */
  .button[data-key="hero-cta"] {
    --bg: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
  }
}
```

### Pattern 3: Emergency Fixes

```css
@layer overrides {
  /* Third-party component fix */
  .some-broken-widget {
    /* Your fix always wins */
    position: relative !important; /* Yes, you can still use !important, even though it remains a shit move */
  }
}
```

## The Beautiful Truth

With three layers:
- Your overrides always win
- No specificity calculations
- No source order juggling
- No !important wars (unless you really want the hassle)
- Clean separation of concerns

## Try It Yourself

```html
<style>
  /* Setup layers */
  @layer crisp, bridge, overrides;
  
  /* Framework styles */
  @layer crisp {
    .demo {
      --bg: blue;
      background: var(--bg);
      color: white;
      padding: 2rem;
    }
  }
  
  /* Your overrides */
  @layer overrides {
    .demo {
      --bg: hotpink; /* Override the property */
    }
  }
</style>

<div class="demo" data-key="layer-example-1">
  I'm hotpink (override layer wins)
</div>

<div class="demo" data-key="layer-example-2" style="--bg: green;">
  I'm green (inline style wins)
</div>
```

**The key insight**: Always override custom properties, not direct values. If you override with `background: hotpink` instead of `--bg: hotpink`, you break the variable chain and inline styles can't override anymore.

## The Complete Power

Layers solve problems you didn't know you had:

1. **Vendor styles under control**: Put them in bridge layer
2. **Team conflicts avoided**: Everyone works in overrides
3. **Refactoring simplified**: Move styles between layers
4. **Testing isolated**: Toggle layers on/off
5. **Performance improved**: Browser optimises layer rendering
6. **Blueprint customisation**: Override any blueprint property cleanly

## Your Escape Route

Currently fighting specificity? Here's your migration:

```css
/* Step 1: Add layers */
@layer crisp, bridge, overrides;

/* Step 2: Import old styles as bridge sublayer */
@layer bridge {
  @layer bridge.legacy {
    @import "your-mess.css";
  }
}

/* Step 3: Override specific CRISP blueprints as needed */
@layer overrides {
  /* Only your brand customizations */
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

→ Continue to [Chapter 5: Planting Patterns - Blueprint Classes](./CH05-blueprints.md)