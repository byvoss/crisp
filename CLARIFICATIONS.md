# CRISP Clarifications & Open Questions

This document tracks open questions, inconsistencies, and decisions needed for CRISP development.

## Status Key

### Decision Status:
- ⏳ **PENDING** - Needs decision
- 🔄 **IN PROGRESS** - Being resolved
- ✅ **DECIDED** - Decision made (see Decision Log)
- ❌ **REJECTED** - Won't fix

### Implementation Progress (for ✅ DECIDED items):
- **Stage 1** → 📝 **DECIDED ONLY** - Decision made in CLARIFICATIONS.md, nothing else done
- **Stage 2** → 📄 **DOCUMENTED** - Added to documentation chapters, awaiting code implementation
- **Stage 3** → 🔨 **IMPLEMENTED** - Actually built into CSS/JS/TS files

### Clear Examples:
- Item decided but not in docs yet → **Status**: ✅ DECIDED | **Progress**: 📝 DECIDED ONLY
- Item fully documented but no code → **Status**: ✅ DECIDED | **Progress**: 📄 DOCUMENTED  
- Item built and working → **Status**: ✅ DECIDED | **Progress**: 🔨 IMPLEMENTED

## 🔴 Critical Issues (Block Release)

### 1. ✅ Color vs Colour Inconsistency
**Issue**: Mixed usage of US/UK English in property names  
**Found in**: `components/button.md` uses `--button-colour`  
**Conflict**: CLAUDE.md mandates US English for code  
**Decision needed**: Standardize all to `color`?  
**Status**: ✅ DECIDED - See Decision Log  

### 2. ✅ Custom Property Prefix Pattern
**Issue**: Documentation shows unprefixed tokens but examples vary  
**Examples**: `--bg` vs `--button-bg`  
**Rule**: Element tokens should have NO prefix per new patterns  
**Decision needed**: Update all examples to unprefixed pattern?  
**Status**: ✅ DECIDED - See Decision Log  

### 3. ✅ Missing adoption-guide.md
**Issue**: README links to non-existent file  
**Location**: `README.md` line 23  
**Decision needed**: Create guide or remove link?  
**Status**: ✅ DECIDED - See Decision Log  

## 🟡 Important Clarifications

### 4. ✅ Data Attribute Hierarchy
**Issue**: Unclear when to use which data attribute  
**Overlaps**: 
- `data-state` vs `data-variant` - When to use which?
- `data-context` vs `data-theme` vs `data-brand` - Different purposes?
**Decision needed**: Create clear usage matrix  
**Status**: ✅ DECIDED - See Decision Log  

### 5. ✅ The "1+1+3" Rule Clarification
**Issue**: Do data attributes count toward the class limit?  
**Examples**: Some show many data attributes  
**Decision needed**: Clarify that data attributes don't count?  
**Status**: ✅ DECIDED - See Decision Log  

### 6. ✅ Progressive Enhancement Details
**Issue**: What exactly changes between tiers?  
**Current info**: Only file sizes mentioned  
**Decision needed**: Document feature matrix for each tier  
**Status**: ✅ DECIDED - See Decision Log  

### 7. ✅ Layout Token Naming Convention
**Issue**: Inconsistent layout token patterns  
**Examples**: `--gap` vs `--stack-gap` vs `--cluster-gap`  
**Rule**: Layout tokens should describe the pattern  
**Decision needed**: Standardize on pattern-specific tokens?  
**Status**: ✅ DECIDED - See Decision Log  

## 🟠 Missing Documentation

### 8. ✅ Component Documentation
**Issue**: Only 3 of ~20 components documented  
**Missing**: card, navigation, form, alert, etc.  
**Decision needed**: Full docs or different structure?  
**Status**: ✅ DECIDED - See Decision Log  

### 9. ✅ Theme System Implementation
**Issue**: 10KB theme system mentioned but not explained  
**Questions**: What's included? How does it work?  
**Decision needed**: Document or implement first?  
**Status**: ✅ DECIDED - See Decision #6 (already covered in Progressive Enhancement)  

### 10. ✅ Web Components (Enterprise)
**Issue**: Mentioned but never demonstrated  
**Questions**: How do they enhance HTML? Examples?  
**Decision needed**: Create examples or remove mention?  
**Status**: ✅ DECIDED - See Decision Log  

### 19. ✅ Convert Color System to OKLCH
**Issue**: Current system uses HSL, should use OKLCH  
**Current**: HSL-based colors throughout all CSS files  
**Target**: OKLCH for perceptually uniform colors  
**Benefits**: 
- Perceptually uniform color space
- Better color interpolation
- Consistent perceived brightness
- Wider color gamut support
**Work needed**:
- Convert all color definitions in CSS files
- Update color token system
- Test browser support (Safari 15.4+, Chrome 111+, Firefox 113+)
**Decision needed**: Migration strategy and fallbacks?  
**Status**: ✅ DECIDED - See Decision Log  

## 🔵 Technical Questions

### 11. ✅ NPM Package Strategy
**Issue**: 3 packages mentioned but only one exists  
**Packages**: 
- `@byvoss/crisp` ✓ Exists
- `@byvoss/crisp-theme` ❌ Missing
- `@byvoss/crisp-enterprise` ❌ Missing
**Decision needed**: Single package with different builds?  
**Status**: ✅ DECIDED - See Decision Log  

### 12. ✅ CDN Distribution
**Issue**: Examples show same CSS file for all editions  
**Question**: How to serve different tier files?  
**Decision needed**: Different filenames or same file?  
**Status**: ✅ DECIDED - See Decision Log  

### 13. ✅ TypeScript Configuration
**Issue**: TODO mentions TypeScript not configured  
**Question**: Needed for v1.0 or later?  
**Decision needed**: Configure now or postpone?  
**Status**: ✅ DECIDED - See Decision Log  

### 14. ✅ Stylelint Issues
**Issue**: Linting disabled due to failures  
**Location**: `TODO.md` mentions this  
**Decision needed**: Fix rules or adjust config?  
**Status**: ✅ DECIDED - See Decision Log  

## 🟢 Enhancement Questions

### 15. ✅ Testing Strategy
**Issue**: No testing approach documented  
**Options**: Cypress, Jest, Playwright, none?  
**Decision needed**: Testing framework or manual for v1?  
**Status**: ✅ DECIDED - See Decision Log  

### 16. ✅ Browser Fallbacks
**Issue**: Browser support defined but no fallback strategy  
**Question**: Progressive enhancement examples?  
**Decision needed**: Document fallbacks or not?  
**Status**: ✅ DECIDED - See Decision Log  

### 17. ✅ ARIA Requirements
**Issue**: Inconsistent ARIA usage in examples  
**Question**: Minimum ARIA per component?  
**Decision needed**: Create ARIA guidelines?  
**Status**: ✅ DECIDED - See Decision Log  

### 18. ✅ ID Usage Guidelines
**Issue**: "IDs only for accessibility" but when required?  
**Examples**: Rarely show IDs even when needed  
**Decision needed**: Document required ID patterns?  
**Status**: ✅ DECIDED - See Decision Log  

### 20. ✅ CSS Layers for Framework Isolation
**Issue**: How to ensure CRISP never conflicts with user styles?  
**Question**: Should we use CSS @layer for isolation?  
**Benefits**:
- Complete isolation from user styles
- No specificity wars
- Clean override pattern
- Framework coexistence
**Decision needed**: Implement @layer strategy?  
**Status**: ✅ DECIDED - See Decision Log

### 21. ✅ Relative Color Syntax for Automatic Variations
**Issue**: How to generate consistent color variations?  
**Question**: Use CSS relative colors for hover/active/border states?  
**Benefits**:
- Automatic color harmony
- Less tokens to maintain
- Dynamic relationships
- Still overrideable
**Decision needed**: Use oklch(from var(--bg) ...) pattern?  
**Status**: ✅ DECIDED - See Decision Log

### 22. ✅ CSS :has() for Smart Components
**Issue**: How to make components context-aware without JavaScript?  
**Question**: Use :has() selector for dynamic styling?  
**Benefits**:
- Pure CSS interactivity
- Container awareness
- Form validation styling
- Dynamic layouts
**Decision needed**: Embrace :has() for CSS-only solutions?  
**Status**: ✅ DECIDED - See Decision Log

### 23. ✅ @property for Type-Safe Custom Properties
**Issue**: How to make custom properties robust and animatable?  
**Question**: Use @property rule for all custom properties?  
**Benefits**:
- Type validation
- Smooth animations
- Real default values
- Inheritance control
**Decision needed**: Implement @property for all tokens?  
**Status**: ✅ DECIDED - See Decision Log

### 24. ✅ CSS Subgrid for Advanced Layouts
**Issue**: How to create perfectly aligned multi-level grids?  
**Question**: Implement subgrid support with flexible column systems?  
**Benefits**:
- Perfect alignment across nested elements
- Stripe-style layouts
- No wrapper divs needed
- Responsive by default
**Grid systems needed**: 1/2, 1/3, 1/4, 1/6, 1/8, 1/10 with auto-gap
**Decision needed**: Full subgrid implementation?  
**Status**: ✅ DECIDED - See Decision Log

### 25. 📝 Framework Integration Patterns
**Issue**: How to integrate CRISP with component frameworks that force wrappers?  
**Note**: `display: contents` can help React/Vue/etc components work with CRISP grids  
**Category**: Integration guide, not core CRISP feature  
**Example**:
```jsx
// React component that doesn't break the grid
<div style={{ display: 'contents' }}>
  <nav data-position="1-3">Nav</nav>
  <main data-position="4-12">Main</main>
</div>
```
**Action**: Document in integration/migration guide  
**Status**: 📝 NOTED for documentation

### 26. ✅ Native ::backdrop Instead of Wrapper Divs
**Issue**: How to handle modal/dialog backdrops without extra DOM?  
**Question**: Use ::backdrop pseudo-element for overlays?  
**Benefits**:
- No wrapper divs
- Native browser feature
- Automatic positioning
- ESC key handling
**Decision needed**: Standardize on ::backdrop?  
**Status**: ✅ DECIDED - See Decision Log

### 27. ✅ @starting-style for JavaScript-Free Animations
**Issue**: How to animate element appearance without JavaScript?  
**Question**: Use @starting-style for entry animations?  
**Benefits**:
- Pure CSS animations
- No JavaScript needed
- Works with display changes
- Smooth transitions
**Decision needed**: Implement @starting-style patterns?  
**Status**: ✅ DECIDED - See Decision Log

### 28. ✅ field-sizing: content for Auto-Growing Forms
**Issue**: How to make form fields grow with content without JavaScript?  
**Question**: Use field-sizing: content as progressive enhancement?  
**Benefits**:
- No JavaScript needed
- Native browser behavior
- Doesn't break in older browsers
- Better UX
**Decision needed**: Add as progressive enhancement?  
**Status**: ✅ DECIDED - See Decision Log

## 📝 Decision Log

### ✅ Decided Items

### ✅ [2025-01-06] Color vs Colour (#1)
**Decision**: Use US English "color" in all code  
**Rationale**: Consistency with CSS specifications and CLAUDE.md rules  
**Action**: Updated all instances of "colour" to "color" in:
- Component documentation (button.md, link.md)
- All CSS files (260+ instances fixed)
- HTML examples
**Note**: British English remains in prose/documentation text

### ✅ [2025-01-06] Custom Property Prefix Pattern (#2)
**Decision**: Apply unprefixed pattern for element tokens  
**Rationale**: CLAUDE.md Rule 6 clearly states element tokens have NO prefix  
**Action**: Updated all component documentation:
- button.md: Changed `--button-*` to unprefixed (`--bg`, `--color`, etc.)
- link.md: Changed `--link-*` to unprefixed (`--color`, `--weight`, etc.)
- carousel.md: Already correct
**Rule**: Element tokens unprefixed, only property classes have prefixes

### ✅ [2025-01-06] Missing adoption-guide.md (#3)
**Decision**: Remove broken link, keep simple text  
**Rationale**: No need for separate adoption guide at this stage  
**Action**: Changed link to plain text: "Apply CRISP principles to any framework"  
**Future**: Can create guide later if demand exists

### ✅ [2025-01-06] Data Attribute Simplification (#4)
**Decision**: Use only `data-variant` for all variations/states/contexts  
**Rationale**: Simpler is better - one attribute for all variations reduces cognitive load  
**Changes**:
- Merge `data-state` → `data-variant` (loading, error, expanded, etc.)
- Merge `data-context` → `data-variant` (admin, danger, premium, etc.)
- Keep `data-variant` as is (primary, compact, horizontal, etc.)
- Keep separate: `data-theme` (color schemes), semantic info, JS hooks
**Action**: Update CLAUDE.md Rule 9 to reflect this simplification

### ✅ [2025-01-06] The "1+1+3" Rule and Data Attributes (#5)
**Decision**: Data attributes do NOT count toward the class limit  
**Rationale**:  
- Data attributes are data carriers for logic (if statements, functions)
- Classes are pure layout control elements
- The rule applies only to CSS classes, not HTML attributes
**Clarification**: You can have multiple data attributes alongside the 1+1+3 classes
**Example**:
```html
<!-- ✅ Correct: 1 component + 1 layout + 2 properties + unlimited data -->
<article class="card as-stack with-shadow with-border" 
  data-variant="featured"
  data-entries="5"
  data-level="2"
  data-id="post-123">
```

### ✅ [2025-01-06] Progressive Enhancement Tiers (#6)
**Decision**: Three tiers with clear feature separation  
**Tier 1 - CRISP (~50KB)**: Pure CSS
- All components and layouts
- Complete design system
- Zero JavaScript
- Works everywhere

**Tier 2 - CRISP Theme (~60KB)**: CSS + Theme System
- Everything from Tier 1
- 10KB JavaScript for theme switching
- Dark/light/auto modes
- Smooth transitions
- LocalStorage persistence

**Tier 3 - CRISP Enterprise (~150KB)**: Full Platform
- Everything from Tier 2
- TypeScript Web Components
- i18n system for internationalization
- Type-safe development
- Enhanced interactivity

**Key Principle**: Same HTML works across all tiers

### ✅ [2025-01-06] Layout Token Naming Convention (#7)
**Decision**: Layout tokens MUST have type prefix to avoid confusion  
**Rationale**: Only element tokens are unprefixed - ALL others need type identification  
**Examples**:
- `as-stack` uses `--stack-gap`
- `as-cluster` uses `--cluster-gap` and `--cluster-align`
- `as-grid` uses `--grid-columns`, `--grid-gap`, `--grid-min`
- `as-split` uses `--split-ratio` and `--split-gap`
- `as-center` uses `--center-height`
- `as-container` uses `--container-max` and `--container-padding`
**Rule**: Element tokens unprefixed, everything else shows its type

### ✅ [2025-01-06] Component Documentation Strategy (#8)
**Decision**: Defer individual component docs until after MVP  
**Rationale**:  
- Each element deserves detailed documentation of its scoped tokens
- But not now - too many files to maintain during rule changes
- C15-component-reference.md serves as complete reference for now
- The 3 existing docs (button, carousel, link) were experiments
**Action**: Keep only C15 as central reference until documentation stabilizes
**Future**: Create individual component docs showing:
- All scoped CSS variables
- Token inheritance patterns
- Advanced customization examples
- Accessibility deep-dives

### ✅ [2025-01-06] Web Components Strategy (#10)
**Decision**: WCs as intelligent containers that generate CRISP HTML  
**Philosophy**: Web Components are CRISP Pattern Generators  
**Key Principle**: WC is only the container - content is 100% pure CRISP HTML  

**Concept**:
```html
<!-- Web Component = Container only -->
<crisp-search-box 
  placeholder="Search..." 
  api-endpoint="/api/search">
  <!-- Generates 100% CRISP HTML inside -->
</crisp-search-box>

<!-- Renders to: -->
<div class="search-box as-cluster">
  <input class="input" type="search" placeholder="Search...">
  <button class="button" data-variant="primary">Search</button>
  <div class="dropdown" data-variant="loading">...</div>
</div>
```

**Benefits**:
- Free with Tier 3 - everyone can use from start
- Pre-built patterns save typing
- Output is always pure CRISP HTML
- Type-safe attributes
- Handles complex interactions
- But philosophy stays intact

**Examples**:
- `<crisp-search-box>` - Search with suggestions
- `<crisp-product-card>` - Complete product display
- `<crisp-media-object>` - Text with image patterns
- `<crisp-data-table>` - Sortable, filterable tables

### ✅ [2025-01-06] NPM Package Strategy (#11)
**Decision**: Three separate packages, not one monolith  
**Rationale**: Pay only for what you use - avoid Bootstrap bloat  
**Structure**:
1. **@byvoss/crisp** (~50KB)
   - Pure CSS only
   - Zero dependencies
   
2. **@byvoss/crisp-theme** (~10KB)
   - Theme switching JS only
   - Dependency: @byvoss/crisp
   
3. **@byvoss/crisp-enterprise** (~90KB)
   - Web Components only
   - Dependencies: @byvoss/crisp, @byvoss/crisp-theme

**Usage**:
```bash
# Tier 1: CSS only
npm install @byvoss/crisp

# Tier 2: + Themes
npm install @byvoss/crisp @byvoss/crisp-theme

# Tier 3: + Web Components
npm install @byvoss/crisp @byvoss/crisp-theme @byvoss/crisp-enterprise
```

**Build**: Three separate build processes for three packages

### ✅ [2025-01-06] Testing Strategy (#15)
**Decision**: Vitest + Playwright for modern testing  
**Rationale**: Based on 2024/2025 developer satisfaction data  
**Testing Stack**:
1. **Unit/Integration Testing**: Vitest
   - Fastest test runner in 2024 benchmarks
   - Native ESM support
   - Compatible with Jest API
   - Built-in TypeScript support
   - Excellent DX with instant feedback

2. **E2E/Visual Testing**: Playwright
   - Cross-browser testing (Chrome, Firefox, Safari, Edge)
   - Visual regression testing
   - Accessibility testing built-in
   - Component testing for Web Components
   - Parallel execution

**Test Structure**:
```
tests/
├── unit/          # Vitest unit tests
│   ├── tokens/    # Design token validation
│   ├── utils/     # Utility function tests
│   └── build/     # Build process tests
├── integration/   # Vitest integration tests
│   ├── css/       # CSS compilation tests
│   ├── themes/    # Theme switching tests
│   └── components/# Component integration
└── e2e/          # Playwright tests
    ├── visual/    # Visual regression
    ├── a11y/      # Accessibility
    ├── browser/   # Cross-browser
    └── components/# Web Component behavior
```

**Why this stack**:
- Both tools consistently top developer satisfaction surveys
- Fast execution and great debugging experience
- Modern ESM-first approach
- Strong TypeScript support
- Active development and community

**Action**: Configure Vitest and Playwright for comprehensive testing
**Progress**: 📝 DECIDED ONLY

### ✅ [2025-01-06] CDN Distribution Strategy (#12)
**Decision**: State-of-the-art CDN setup with all modern features  
**Implementation**:
```html
<!-- Tier 1: CSS only -->
<link rel="preload" as="style" 
  href="https://unpkg.com/@byvoss/crisp@1.0.0/dist/crisp.min.css">
<link rel="stylesheet" 
  href="https://unpkg.com/@byvoss/crisp@1.0.0/dist/crisp.min.css"
  integrity="sha384-..." 
  crossorigin="anonymous">

<!-- Tier 2: + Theme (zusätzlich zu Tier 1) -->
<script type="module" 
  src="https://unpkg.com/@byvoss/crisp-theme@1.0.0/dist/theme.esm.js"
  integrity="sha384-..." 
  crossorigin="anonymous"></script>
<!-- Fallback für ältere Browser -->
<script nomodule 
  src="https://unpkg.com/@byvoss/crisp-theme@1.0.0/dist/theme.min.js"
  integrity="sha384-..." 
  crossorigin="anonymous"></script>

<!-- Tier 3: + Components (zusätzlich zu Tier 1 & 2) -->
<script type="module" 
  src="https://unpkg.com/@byvoss/crisp-enterprise@1.0.0/dist/components.esm.js"
  integrity="sha384-..." 
  crossorigin="anonymous"></script>
```

**Features**:
- Separate packages via unpkg
- ESM modules for modern browsers
- Fallback for legacy (nomodule)
- SRI for security (integrity)
- Preload for performance
- Proper versioning

### ✅ [2025-01-06] TypeScript Configuration (#13)
**Decision**: Configure TypeScript now - all tiers are MVP  
**Rationale**: If all 3 tiers belong to MVP, we need TS for Web Components  
**Required**:
- tsconfig.json for Web Component development
- Build pipeline for @byvoss/crisp-enterprise
- Type definitions for component APIs
- Proper ESM module output
**Action**: Set up TypeScript configuration for Enterprise tier
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] Stylelint Configuration (#14)
**Decision**: Configure rules to enforce CRISP conformity  
**Principle**: Linting should enforce CRISP patterns  
**Approach**:
- Fix accessibility issues (focus states, reduced motion) - these are important
- Allow modern color syntax for future OKLCH migration
- Clean up duplicate selectors
- Configure rules that enforce:
  - Token naming conventions
  - Proper use of custom properties
  - No deep nesting
  - Semantic class patterns
**Action**: Create CRISP-specific stylelint config and fix issues
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] Browser Fallbacks (#16)
**Decision**: No fallbacks needed - target modern browsers only  
**Rationale**: 
- CSS Grid & Custom Properties: Supported since 2017 in all modern browsers
- OKLCH: Supported since 2023 in all modern browsers
- Modern browsers auto-update - users on 2+ year old browsers are edge cases
- CRISP philosophy: Simplicity over backwards compatibility
**Browser Requirements**:
- Chrome 57+ (March 2017)
- Firefox 52+ (March 2017)
- Safari 10.1+ (March 2017)
- Edge 16+ (October 2017)
- No Internet Explorer support
**Action**: Document minimum browser requirements, no fallback code needed
**Note**: If someone really needs OKLCH fallbacks, they can add them project-specific

### ✅ [2025-01-06] Convert Color System to OKLCH (#19)
**Decision**: Manual conversion for perceptual uniformity control  
**Rationale**: 
- OKLCH provides perceptually uniform color space
- Better gradients and color mixing
- Wider gamut support (P3, Rec2020)
- Manual conversion ensures optimal perceptual results
**Conversion Requirements**:
1. **All 59 base colors** must be converted:
   - Primary (10 shades): hsla(220, 70%, L%, 1) → oklch(L% C% 250)
   - Neutral (14 shades): hsla(220, 10%, L%, 1) → oklch(L% C% 250)
   - Secondary (10 shades): hsla(280, 60%, L%, 1) → oklch(L% C% 320)
   - Error (5 shades): hsla(0, 85%, L%, 1) → oklch(L% C% 25)
   - Warning (5 shades): hsla(45, 90%, L%, 1) → oklch(L% C% 90)
   - Success (5 shades): hsla(120, 70%, L%, 1) → oklch(L% C% 145)
   - Info (5 shades): hsla(210, 70%, L%, 1) → oklch(L% C% 230)
2. **Shadows with alpha**: Convert to oklch() with / alpha syntax
3. **Documentation examples**: Update all color examples in chapters
4. **NO FALLBACKS**: As decided in #16, modern browsers only
**Conversion Process**:
- Use online OKLCH tools for initial conversion
- Manually adjust for perceptual uniformity
- Test gradients between shades
- Ensure consistent perceived brightness across scales
**Action**: Convert entire color system to OKLCH
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] ID Usage Guidelines (#18)
**Decision**: IDs are purely functional - NEVER for styling  
**Rationale**: Clean separation of concerns - IDs for functionality, classes for components, data-variant for styling  
**Rules**:
1. **IDs are ONLY for**:
   - Form label associations: `<label for="email-input">`
   - Anchor targets: `<section class="section" id="features">`
   - ARIA relationships: `aria-labelledby`, `aria-describedby`, `aria-controls`
   - Skip links: `<main class="main" id="main-content">`
2. **NEVER use IDs in CSS**: No `#header { }` selectors ever
3. **Attribute order**: `class` ALWAYS before `id`
   - ✅ `<section class="section" id="features" data-variant="highlight">`
   - ❌ `<section id="features" class="section" data-variant="highlight">`
4. **Naming**: Kebab-case, descriptive, suffix with element type when helpful
   - Form fields: `email-input`, `password-field`
   - Sections: `features`, `pricing`, `testimonials`
   - ARIA: `modal-title`, `help-text-password`
**Action**: Update all examples to show proper ID usage

### ✅ [2025-01-06] CSS Layers for Framework Isolation (#20)
**Decision**: Implement CSS @layer for complete framework isolation  
**Rationale**: THE killer feature - users can override ANYTHING without specificity wars  
**Implementation**:
```css
/* CRISP defines layer order */
@layer crisp, overrides;

/* All CRISP styles in isolated layer */
@layer crisp {
  @layer tokens, base, layouts, elements, properties, states, themes;
  /* All CRISP CSS goes here */
}

/* Users have ONE clear override point */
@layer overrides {
  /* User styles ALWAYS win - no !important needed */
  .button { background: hotpink; }
}
```
**Benefits**:
1. **Zero conflicts**: CRISP never breaks existing styles
2. **No !important needed**: Layer order handles precedence
3. **Framework friendly**: Works alongside Bootstrap, Tailwind, etc.
4. **Migration path**: Drop CRISP into any project safely
5. **Predictable**: CRISP always behaves the same
**Browser Support**: All modern browsers (2022+) support @layer
**Action**: Restructure all CSS to use @layer architecture
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] Relative Color Syntax for Automatic Variations (#21)
**Decision**: Use CSS relative colors for automatic state variations  
**Rationale**: Modern browsers (2023+) support it, creates elegant maintainable code  
**Pattern**:
```css
.button {
  /* Define base AND calculated variations */
  --bg: var(--color-primary);
  --bg-hover: oklch(from var(--bg) calc(l + 0.1) c h);
  --bg-active: oklch(from var(--bg) calc(l - 0.1) c h);
  --border-color: oklch(from var(--bg) calc(l - 0.15) c h);
  
  /* Use tokens as normal */
  background: var(--bg);
  border: 1px solid var(--border-color);
}
```
**Benefits**:
- Automatic color harmony across states
- Single source of truth (base color)
- Still fully overrideable by users
- Less color tokens to maintain
**Guidelines**:
- Use for: hover, active, focus, borders, shadows
- Always define as custom property first
- Lightness adjustments: ±0.1 for states, -0.15 for borders
- Keep calculations simple and predictable
**Browser Support**: All desktop browsers since 2023
**Philosophy**: "Modern patterns for modern browsers - legacy users shop elsewhere"
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] CSS :has() for Smart Components (#22)
**Decision**: Maximize CSS-only interactivity with :has() selector  
**Rationale**: CRISP is CSS-first - JavaScript only in Theme/Enterprise tiers  
**Pattern Examples**:
```css
/* Form validation without JS */
.form:has(.input:invalid:not(:placeholder-shown)) {
  --border-color: var(--color-error);
}

/* Card adapts to content */
.card:has(.image) {
  --grid-template: "image content" / 1fr 2fr;
}

/* Navigation knows active state */
.navigation:has([aria-current="page"]) {
  --indicator-opacity: 1;
}

/* Accordion auto-closes others */
.accordion:has(.panel:target) .panel:not(:target) {
  --height: 0;
}

/* Grid responds to item count */
.as-grid:has(> :nth-child(8)) {
  --grid-columns: 4;
}
```
**Use Cases**:
1. **Form States**: Invalid fields, empty forms, completed sections
2. **Layout Adaptation**: Content-aware layouts
3. **Navigation**: Active states, submenu detection
4. **Interactive Components**: Tabs, accordions, toggles
5. **Smart Containers**: Item counting, empty states
**Guidelines**:
- Use for progressive enhancement
- Always provide base styles (works without :has)
- Keep selectors readable
- Document the "magic" for users
**Browser Support**: All modern browsers (2023+)
**Philosophy**: "Maximum CSS, minimum JavaScript"
**Battery Impact**: CSS-only = Zero JavaScript parsing, no re-renders, GPU-accelerated
**Business Value**: 
- Mobile apps with 30%+ better battery life
- Perfect for WebView/PWA applications
- Reduced server costs (less hydration)
- Green tech: Lower carbon footprint
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] @property for Type-Safe Custom Properties (#23)
**Decision**: Use @property for ALL custom properties - it's a game-changer!  
**Rationale**: Type safety, animations, and real defaults make CSS robust  
**Implementation Pattern**:
```css
/* Color properties */
@property --bg {
  syntax: "<color>";
  inherits: false;
  initial-value: transparent;
}

/* Numeric properties */
@property --columns {
  syntax: "<integer>";
  inherits: false;
  initial-value: 1;
}

/* Length properties */
@property --size {
  syntax: "<length>";
  inherits: false;
  initial-value: 1rem;
}

/* Percentage properties */
@property --width {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}

/* Complex properties */
@property --shadow-blur {
  syntax: "<length>";
  inherits: false;
  initial-value: 0.5rem;
}
```
**Benefits**:
1. **Type Safety**: Browser validates values (no more "red" in --columns)
2. **Smooth Animations**: Custom properties become animatable
3. **Real Defaults**: initial-value works even without fallbacks
4. **Better DevTools**: Browser shows property types
5. **Performance**: Browser can optimize typed properties
**Guidelines**:
- Define @property BEFORE using the custom property
- Group by type (colors, lengths, numbers)
- Use semantic initial-values
- Keep syntax as specific as possible
- Document complex syntax patterns
**Browser Support**: All modern browsers (Firefox 128+, July 2024)
**Impact**: Makes CRISP the most robust CSS framework available
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] CSS Subgrid for Advanced Layouts (#24)
**Decision**: Implement comprehensive subgrid system with flexible columns  
**Rationale**: Essential for modern layouts, perfect alignment without complexity  
**Grid Systems**:
```css
/* Base grid utilities */
.as-grid-2 { grid-template-columns: repeat(2, 1fr); }
.as-grid-3 { grid-template-columns: repeat(3, 1fr); }
.as-grid-4 { grid-template-columns: repeat(4, 1fr); }
.as-grid-6 { grid-template-columns: repeat(6, 1fr); }
.as-grid-8 { grid-template-columns: repeat(8, 1fr); }
.as-grid-10 { grid-template-columns: repeat(10, 1fr); }
.as-grid-12 { grid-template-columns: repeat(12, 1fr); }

/* Auto-gap system */
.as-grid {
  --grid-gap: clamp(1rem, 2vw, 2rem);
  gap: var(--grid-gap);
}

/* Subgrid magic */
.with-subgrid {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1; /* Span all columns */
}
```
**Use Cases**:
1. **Product Cards**: Price, title, description perfectly aligned
2. **Feature Lists**: Icons and text in perfect columns
3. **Form Sections**: Labels align across fieldsets
4. **Dashboards**: Complex layouts stay organized
5. **Stripe-style**: Marketing pages with perfect alignment
**Pattern Example**:
```html
<div class="as-grid-3">
  <article class="card with-subgrid">
    <img class="icon" src="...">
    <h3 class="title">Feature</h3>
    <p class="text">Description</p>
  </article>
  <!-- All cards align perfectly -->
</div>
```

**Global Grid System (Alternative Pattern)**:
```html
<!-- Define grid on container -->
<body data-raster="12">
  <header data-position="1-12">Full width header</header>
  <nav data-position="1-3">Sidebar navigation</nav>
  <main data-position="4-9">Main content</main>
  <aside data-position="10-12">Widget area</aside>
  <footer data-position="1-12">Full width footer</footer>
</body>
```
```css
/* CSS implementation */
[data-raster] {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--grid-gap);
}
[data-raster="6"] { --columns: 6; }
[data-raster="8"] { --columns: 8; }
[data-raster="10"] { --columns: 10; }
[data-raster="12"] { --columns: 12; }

/* Position mapping */
[data-position="1-3"] { grid-column: 1 / 4; }
[data-position="1-6"] { grid-column: 1 / 7; }
[data-position="1-12"] { grid-column: 1 / 13; }
/* Generate all needed combinations */
```
**Benefits**:
- No wrapper divs
- Automatic alignment
- Responsive by design
- Works with any column count
- Global page grid without extra containers
**Browser Support**: Firefox (2019), Safari (2022), Chrome (2023)
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] Native ::backdrop Instead of Wrapper Divs (#26)
**Decision**: Always use ::backdrop pseudo-element for overlays  
**Rationale**: Native browser features over custom DOM elements  
**Implementation**:
```css
/* Dialog backdrop */
dialog::backdrop {
  background: oklch(from var(--color-neutral) l c h / 0.8);
  backdrop-filter: blur(4px);
}

/* Fullscreen backdrop */
.video:fullscreen::backdrop,
.image:fullscreen::backdrop {
  background: var(--color-black);
}

/* Popover backdrop (future) */
[popover]::backdrop {
  background: oklch(from var(--color-neutral) l c h / 0.5);
}
```
**Benefits**:
1. **No extra DOM**: Browser handles the backdrop
2. **Proper stacking**: Always in correct z-index
3. **Accessibility**: ESC key handling built-in
4. **Performance**: No reflows from adding/removing elements
5. **Simplicity**: Just CSS, no JavaScript needed
**Use Cases**:
- `<dialog>` modals
- Fullscreen API elements
- Future: Popover API
**Browser Support**: All modern browsers (2022+)
**Philosophy**: "Use the platform, not the framework"
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] @starting-style for JavaScript-Free Animations (#27)
**Decision**: Use @starting-style for all entry animations  
**Rationale**: Reduce JavaScript dependency, smooth native animations  
**Implementation Pattern**:
```css
/* Dialog entry animation */
dialog {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: all 0.3s ease-out;
  
  @starting-style {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
}

/* Dropdown animation */
.dropdown[open] {
  height: auto;
  opacity: 1;
  transition: all 0.2s ease;
  
  @starting-style {
    height: 0;
    opacity: 0;
  }
}

/* Toast notification */
.toast {
  transform: translateX(0);
  transition: transform 0.3s ease;
  
  @starting-style {
    transform: translateX(100%);
  }
}
```
**Use Cases**:
1. **Modals/Dialogs**: Smooth fade and scale in
2. **Dropdowns**: Height and opacity transitions
3. **Tooltips**: Fade in from direction
4. **Notifications**: Slide in animations
5. **Tab panels**: Content transitions
**Benefits**:
- Zero JavaScript for animations
- Works with display: none → block
- Reduces bundle size
- Better performance (CSS animations)
- Accessibility-friendly (respects prefers-reduced-motion)
**Browser Support**: Chrome 117+, Safari 17.5+, Firefox 129+ (2023/2024)
**Philosophy**: "CSS does animations better than JavaScript"
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] field-sizing: content for Auto-Growing Forms (#28)
**Decision**: Add field-sizing: content as progressive enhancement  
**Rationale**: Zero-cost enhancement that improves UX when available  
**Implementation**:
```css
/* Textarea that grows with content */
.textarea {
  /* Base styles - work everywhere */
  min-height: 3rem;
  max-height: 20rem;
  resize: vertical;
  
  /* Progressive enhancement - ignored by old browsers */
  field-sizing: content;
}

/* Input that adapts to content */
.input[type="text"],
.input[type="email"],
.input[type="url"] {
  /* Base styles */
  width: 100%;
  
  /* Progressive enhancement */
  field-sizing: content;
  min-width: 20ch;
  max-width: 50ch;
}

/* Perfect for */
.comment-box {
  field-sizing: content;
  min-height: 2lh;    /* 2 lines minimum */
  max-height: 10lh;   /* 10 lines maximum */
}
```
**Benefits**:
1. **No JavaScript**: Native auto-resize
2. **No breakage**: Ignored by browsers that don't support it
3. **Better UX**: Users see all their content
4. **Performance**: No resize observers or JS calculations
5. **Future-proof**: Add now, benefit later
**Use Cases**:
- Comment boxes
- Chat inputs  
- Address fields
- Any dynamic content input
**Browser Support**: Chrome 123+ (2024), Others coming
**Philosophy**: "Progressive enhancement that costs nothing"
**Note**: This is a true progressive enhancement - add it everywhere!
**Progress**: 📄 DOCUMENTED

### ✅ [2025-01-06] ARIA Requirements (#17)
**Decision**: Full WCAG 2.2 AA conformance required  
**Rationale**: CRISP is accessibility-first, not accessibility-maybe  
**Requirements**:
1. **Semantic HTML first**: Use proper elements (<nav>, <main>, <button>, etc.)
2. **ARIA only when needed**: To enhance, not replace semantics
3. **Required ARIA patterns**:
   - Navigation: aria-label or aria-labelledby for all <nav>
   - Forms: Labels for ALL inputs (visible or aria-label)
   - Buttons: Descriptive text or aria-label
   - Images: alt text (empty for decorative)
   - Dynamic content: aria-live regions
   - States: aria-expanded, aria-selected, aria-current
   - Modals: Full ARIA pattern (role, aria-modal, focus trap)
4. **Testing**: Every component must pass:
   - Keyboard navigation
   - Screen reader announcement
   - WCAG 2.2 AA automated tests
**Action**: Create ARIA patterns documentation with required attributes per component
**Progress**: 📄 DOCUMENTED

---

## How to Use This Document

1. **Review** open questions before making changes
2. **Update** status when working on an issue
3. **Move** to Decision Log when resolved
4. **Add** new questions as discovered


---

*Last updated: 2025-01-06*