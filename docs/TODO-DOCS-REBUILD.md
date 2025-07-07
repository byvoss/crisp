# CRISP Documentation Rebuild Guide

## 🎯 Core Mission
Transform complex CSS documentation into "Show first, explain later" learning path.

## ⚠️ CRITICAL RULE
**DO NOT INVENT TECHNICAL SOLUTIONS!**
- Use ONLY patterns documented in archive files
- If a technical solution is needed but not documented: ASK THE USER
- The user makes ALL design decisions
- Your job: Restructure content didactically, not create new features

## 📖 Didactic Principles
1. **Linear Discovery Journey** - Each chapter builds on the previous
2. **Natural Learning Flow** - From problem → solution → practice → mastery  
3. **British Wit** - Keep readers entertained and curious
4. **Progressive Complexity** - Simple first, technical details later
5. **"Aha!" Moments** - Strategic revelations that make concepts click

## 📚 NEW STRUCTURE

### Part 1: The Discovery (Ch 01-04)
**Goal**: Instant "Holy shit!" moment - show CRISP's power in 10 minutes

- **CH01-discovery.md**: "Winter's End" - Current CSS hell (keep from archive/C01)
- **CH02-solution.md**: "The 1+1+3 Formula" - Show the revolution
  - Open with side-by-side: 47 classes vs 3 classes
  - Introduce 10-Color System with calc() magic
  - Show dark mode in 2 lines
- **CH03-quickstart.md**: "Your First Page" - Build complete UI with basics
  - Hero, cards, nav, form - all in 50 lines
  - Zero build process
- **CH04-layers.md**: "Three Layers" - End specificity wars
  - `@layer crisp, bridge, overrides;`
  - Your overrides ALWAYS win

### Part 2: The Toolkit (Ch 05-08)
**Goal**: Master daily development patterns

- **CH05-components.md**: Basic patterns (merge archive/C07-C08)
- **CH06-layouts.md**: Layout without tears (adapt archive/C06)
- **CH07-progressive.md**: Three tiers (move from archive/C12)
- **CH08-accessibility.md**: WCAG built-in (extract from various)

### Part 3: The Deep Dive (Ch 09-12)
**Goal**: Understand the engineering

- **CH09-tokens.md**: Design tokens + 10-Color System deep dive
- **CH10-modern-css.md**: :has(), @starting-style, subgrid (consolidate)
- **CH11-migration.md**: Escape legacy (adapt archive/C14)
- **CH12-reference.md**: Complete component library

### Part 4: The Mastery (Ch 13-16)
**Goal**: Expert patterns and optimization

- **CH13-advanced.md**: Complex patterns
- **CH14-enterprise.md**: Web Components, i18n
- **CH15-practices.md**: Team workflows
- **CH16-cheatsheet.md**: Everything on one page

## 🔑 CRITICAL CONTENT TO PRESERVE

### The 10-Color System (NEW - Must showcase prominently)
```css
/* 10 base colors → 100+ computed variations */
:root {
  /* Brand (3) */
  --color-primary: oklch(60% 0.20 250);
  --color-secondary: oklch(55% 0.15 280);
  --color-accent: oklch(65% 0.25 200);
  
  /* Semantic (4) */
  --color-error: oklch(60% 0.22 25);
  --color-warning: oklch(75% 0.20 90);
  --color-success: oklch(65% 0.20 145);
  --color-info: oklch(60% 0.15 220);
  
  /* Neutral (3) */
  --color-neutral: oklch(50% 0.01 250);
  --color-surface: oklch(98% 0.00 0);
  --color-ink: oklch(10% 0.01 250);
}

/* Automatic variations */
.button:hover {
  background: oklch(from var(--bg) calc(l + 0.1) c h);
}
```

### The 1+1+3 Formula (from CLAUDE-RULES.md Rule 1)
- 1 component + 1 layout + max 3 properties
- Data attributes don't count
- Example: `<article class="card as-stack with-shadow">`

### Three-Layer Architecture (from CLAUDE-RULES.md Rule 3)
- Always: `@layer crisp, bridge, overrides;`
- Bridge = project-specific toggleable features
- Can toggle sub-layers: `@layer crisp, bridge.old-bootstrap, overrides;`

### Key Examples to Recreate

1. **Bootstrap Card vs CRISP Card** (11 lines → 5 lines)
2. **Dark Mode Switch** (2 CSS lines, no classes)
3. **Complete Form** (shows validation without JS)
4. **Navigation Patterns** (with data-entries)
5. **Color Calculations** (hover, active, disabled - all automatic)

### Rules to Emphasize
- Rule 1: Sacred 1+1+3 Formula
- Rule 3: Layer Architecture
- Rule 13: OKLCH only
- Rule 14: Relative colors
- Rule 27: Example paradigm (realistic legacy vs clean CRISP)

### Voice & Tone
- British humour (from archive/C01-C16)
- "The 'Aha!'" moments
- Respectful to past attempts
- Show psychological impact: "Wait, that's it?"

### Progressive Enhancement Tiers
1. CRISP (~50KB) - Pure CSS
2. CRISP Theme (~60KB) - + Theme switching
3. CRISP Enterprise (~150KB) - + Web Components

### ARIA Patterns (Rule 10)
- Every `<nav>` needs descriptive aria-label
- States via ARIA, not data-variant
- Built-in WCAG 2.2 AA compliance

## 📝 MIGRATION CHECKLIST

From archive/ to new structure:
- [ ] C01 → CH01 (mostly keep)
- [ ] C02 → Discard (outdated approach)
- [ ] C03 → Extract principles → CH02
- [ ] C04 → Component examples → CH05
- [ ] C05 → Token system → CH09 (but add 10-Color System)
- [ ] C06 → CH06 (adapt layouts)
- [ ] C07-C08 → Merge into CH05
- [ ] C09-C11 → Extract patterns → various
- [ ] C12 → Move tiers → CH07
- [ ] C13 → Security → CH15
- [ ] C14 → Migration → CH11
- [ ] C15 → Reference → CH12
- [ ] C16 → Cheatsheet → CH16

## 🚀 IMPLEMENTATION ORDER

1. Start with CH02 - Must nail the "wow" factor
2. Then CH03 - Prove it works immediately  
3. Then CH01 - Context of the problem
4. Then CH04 - Technical foundation
5. Continue sequentially

Remember: **Show simplicity IMMEDIATELY, explain tech LATER!**