# CRISP Source Structure

This directory contains the complete CRISP CSS framework, organized in a clear four-layer architecture.

## Directory Structure

```
src/
├── kernel/                 # Layer 0: Core infrastructure (don't modify!)
│   ├── properties.css      # All @property definitions for type safety
│   ├── reset.css          # Minimal CSS reset (if needed)
│   └── kernel.css         # Imports all kernel modules
│
├── crisp/                 # Layer 1: The CRISP framework
│   ├── tokens/            # Design tokens (the foundation)
│   │   ├── colors.css     # The 10-Color System
│   │   ├── spacing.css    # Space scale (0.25rem to 4rem)
│   │   ├── typography.css # Font families, sizes, weights
│   │   └── effects.css    # Shadows, radii, transitions
│   │
│   ├── layouts/           # Layout patterns (as-* prefix)
│   │   ├── stack.css      # Vertical rhythm
│   │   ├── cluster.css    # Horizontal grouping with wrap
│   │   ├── grid.css       # Smart grid system
│   │   ├── center.css     # Centered content with max-width
│   │   ├── split.css      # Push items apart
│   │   ├── sidebar.css    # Two-column with collapse
│   │   └── container.css  # Responsive padding
│   │
│   ├── components/        # UI components (semantic names)
│   │   ├── button.css     # Interactive elements
│   │   ├── link.css
│   │   ├── input.css
│   │   ├── textarea.css
│   │   ├── select.css
│   │   ├── checkbox.css
│   │   ├── radio.css
│   │   ├── switch.css
│   │   ├── card.css       # Container elements
│   │   ├── article.css
│   │   ├── section.css
│   │   ├── dialog.css
│   │   ├── alert.css      # Feedback elements
│   │   ├── badge.css
│   │   ├── progress.css
│   │   └── ...
│   │
│   ├── utilities/         # Enhancement classes (with-* prefix)
│   │   ├── with-shadow.css
│   │   ├── with-interaction.css
│   │   └── with-border.css
│   │
│   └── crisp.css          # Imports all CRISP modules
│
├── bridge/                # Layer 2: Migration & compatibility (user-filled)
│   └── bridge.css         # Empty - for legacy code during migration
│
├── overrides/             # Layer 3: Custom overrides (user-filled)
│   └── overrides.css      # Empty - for project customizations
│
└── index.css              # Main entry point - defines layers & imports
```

## Layer Architecture

```css
/* index.css - The main entry point */
@layer kernel, crisp, bridge, overrides;

@import "kernel/kernel.css" layer(kernel);
@import "crisp/crisp.css" layer(crisp);
@import "bridge/bridge.css" layer(bridge);
@import "overrides/overrides.css" layer(overrides);
```

### Layer Purposes

1. **kernel** - Infrastructure layer (hidden from users)
   - Contains all @property definitions
   - Never modified by users
   - Makes everything type-safe

2. **crisp** - The framework layer
   - All components, layouts, and utilities
   - The main CRISP implementation

3. **bridge** - Migration layer (user-controlled)
   - For legacy code during migration
   - Temporary compatibility fixes
   - Gradually empty as migration completes

4. **overrides** - Customization layer (user-controlled)
   - Project-specific adjustments
   - Always wins due to cascade order
   - Keeps customizations separate

## The Kernel Secret

The `kernel` layer is why CRISP "just works":

```css
/* In kernel/properties.css */
@property --bg {
  syntax: "<color>";
  inherits: false;
  initial-value: transparent;
}

/* In components/button.css */
.button {
  background: var(--bg);  /* Already type-safe! */
}
```

Users never see or edit the kernel, but it powers everything with type safety and proper defaults.

## Import Order Matters

The layer order ensures proper cascade:
1. `kernel` - Base definitions (lowest priority)
2. `crisp` - Framework styles
3. `bridge` - Migration helpers
4. `overrides` - User customizations (highest priority)

This architecture ensures that user customizations always win, while keeping the framework intact and maintainable.