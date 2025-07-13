# Chapter 17: CRISP Studio - Your Build Pipeline

*Or: How to extend CRISP without breaking it*

## The Extension Philosophy

CRISP gives you everything you need. But your project is unique. Your brand has its own voice. Your team has its own patterns. CRISP Studio lets you extend the framework while keeping the core untouched.

**The Sacred Rule**: Core blueprints are CRISP's. Override blueprints are yours.

## The Studio Tiers

While CRISP itself has three tiers (Pure, Interactive, Crown), CRISP Studio adds a fourth dimension - the ability to build your own extensions:

### Community Edition (Free)
Write your overrides manually:
```css
/* overrides/special-button.css */
@layer overrides {
  .special-button {
    --bg: var(--color-brand);
    --size: 1.25rem;
  }
}
```

Include after CRISP:
```html
<link rel="stylesheet" href="crisp.min.css">
<link rel="stylesheet" href="overrides.css">
```

That's it. Free forever. No tools needed.

### Team Edition (€299/year)
Professional tools for professional teams:

```bash
# Install CRISP Studio
curl -sSf https://studio.crisp.style/install.sh | sh

# Activate your license
crisp activate TEAM-XXXX-XXXX-XXXX

# Create new blueprints with CLI
crisp blueprint new alert-banner

# Build everything
crisp build
```

**What you get:**
- Blueprint generator CLI
- Automated build pipeline
- Hot reload development
- 5 developer seats
- Email support

### Enterprise Edition (€999/year)
Everything in Team plus:

```bash
# Full TypeScript/Tera support
crisp blueprint new data-grid --full

# Private registry publishing
crisp publish --registry=https://npm.company.com

# CI/CD integration
crisp build --production --stats
```

**Additional features:**
- Unlimited developer seats
- TypeScript components
- Tera templates
- Private registry support
- Priority support
- Source code access (with NDA)

## Blueprint Architecture

### Core Blueprints (CRISP's Domain)
```
blueprints/
├── button/
│   ├── button.css      # Sorted into @layer crisp.elements
│   ├── button.ts       # Compiled into crown.js
│   └── button.tera     # Aggregated into base.tera
└── ... (50+ blueprints)
```

You never touch these. They're updated via `npm update`.

### Override Blueprints (Your Domain)
```
overrides/
├── special-button/
│   ├── special-button.css    # Always @layer overrides
│   ├── special-button.ts     # Your components.js
│   └── special-button.tera   # Your templates.tera
└── ... (your patterns)
```

These are yours forever. CRISP updates never touch them.

## Creating Blueprints

### With Community Edition
Create files manually:

```css
/* overrides/alert-banner/alert-banner.css */
@layer overrides {
  .alert-banner {
    --bg: var(--color-warning);
    --color: var(--color-warning-text);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-large);
    
    /* Your styles */
  }
}
```

### With Studio CLI
Let the tool do the work:

```bash
$ crisp blueprint new alert-banner
✓ Creating blueprint: overrides/alert-banner/
✓ Generated alert-banner.css with boilerplate
✓ Generated alert-banner.ts (empty)
✓ Generated alert-banner.tera (empty)

$ crisp build
✓ Building CSS... 
  → Found 3 override blueprints
  → Combined with CRISP core
  → Output: dist/crisp-extended.css (52KB)
✓ Building components...
  → Compiled 1 TypeScript component
  → Output: dist/components.js (2KB)
✓ Done in 247ms
```

## The Build Process

CRISP Studio's build tool (written in Rust for blazing speed):

1. **Validates license** - Online check with 30-day offline grace
2. **Builds core** - Compiles CRISP blueprints into layers
3. **Builds overrides** - Adds your extensions in `@layer overrides`
4. **Optimizes output** - Minifies, tree-shakes, removes unused
5. **Generates stats** - Bundle size, selector count, performance metrics

```bash
$ crisp build --watch
◆ CRISP Studio v1.0.0 (Team Edition)
◆ License valid until 2026-01-13
◆ Watching for changes...

[12:34:56] Changed: overrides/alert-banner/alert-banner.css
[12:34:56] Rebuilding...
[12:34:57] ✓ Built in 89ms → dist/crisp-extended.css (52.3KB)
```

## Integration Examples

### Next.js Project
```json
{
  "scripts": {
    "dev": "crisp build --watch & next dev",
    "build": "crisp build --production && next build"
  }
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/build.yml
- name: Build CRISP
  env:
    CRISP_LICENSE: ${{ secrets.CRISP_LICENSE }}
  run: |
    crisp build --production --stats
    crisp verify dist/crisp-extended.css
```

### Docker Setup
```dockerfile
FROM rust:alpine as builder
RUN curl -sSf https://studio.crisp.style/install.sh | sh
COPY . .
RUN crisp build --production

FROM nginx:alpine
COPY --from=builder /dist /usr/share/nginx/html
```

## License Protection

The Rust binary includes sophisticated license validation:

- **Hardware fingerprinting** for team seats
- **Online validation** with offline grace period  
- **Build watermarking** in development mode
- **Clean output** in production builds

No phone-home in production builds. Your customers never know you use CRISP Studio.

## Pricing Philosophy

**Why paid tools?**

1. **Sustainable development** - CRISP needs funding to stay active
2. **Professional support** - Real humans answer your questions
3. **Enterprise features** - Complex needs require complex tools
4. **Fair exchange** - You make money with CRISP, CRISP makes money with you

**Why keep community free?**

1. **Accessibility** - Everyone should be able to use good tools
2. **Adoption** - Free tier drives widespread usage
3. **Philosophy** - The web should be open
4. **Marketing** - Happy free users become paying customers

## Migration Path

Starting with manual overrides? No problem:

```bash
# Your existing overrides still work
$ ls overrides/
special-button.css   company-card.css   brand-alert.css

# Install Studio when ready
$ curl -sSf https://studio.crisp.style/install.sh | sh

# Studio recognizes existing structure
$ crisp init
✓ Found existing overrides/ directory
✓ Created crisp.config.json
✓ Ready to build!

$ crisp build
✓ Imported 3 existing override blueprints
✓ Built dist/crisp-extended.css
```

## The Studio Promise

1. **Your overrides are yours** - Forever, no lock-in
2. **Updates never break** - Core and overrides stay separate
3. **Pay for tools, not CSS** - Cancel anytime, keep your code
4. **Speed matters** - Rust builds are 50x faster than Node
5. **Support included** - Real answers from real developers

## FAQs

**Q: What happens if I stop paying?**
A: Your existing CSS continues working. You lose access to CLI tools and updates.

**Q: Can I use the CLI in CI/CD?**
A: Yes, the license includes CI/CD usage.

**Q: Is the source code available?**
A: With Enterprise + NDA. Most don't need it.

**Q: Why Rust instead of Node.js?**
A: Speed, binary distribution, and license protection.

**Q: Can I extend core blueprints?**
A: No. Use overrides. This keeps updates safe.

## Start Building

**Community**: Just write CSS in `overrides/`

**Team/Enterprise**: 
```bash
curl -sSf https://studio.crisp.style/install.sh | sh
```

Ready to see how it all comes together?

→ Continue to [Chapter 18: Distribution & Architecture](./CH18-distribution.md)