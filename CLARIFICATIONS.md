# CRISP Clarifications & Open Questions

This document tracks open questions, inconsistencies, and decisions needed for CRISP development.

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

### 19. ❓ Convert Color System to OKLCH
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
**Status**: ⏳ PENDING  

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

### 15. ❓ Testing Strategy
**Issue**: No testing approach documented  
**Options**: Cypress, Jest, Playwright, none?  
**Decision needed**: Testing framework or manual for v1?  
**Status**: ⏳ PENDING  

### 16. ❓ Browser Fallbacks
**Issue**: Browser support defined but no fallback strategy  
**Question**: Progressive enhancement examples?  
**Decision needed**: Document fallbacks or not?  
**Status**: ⏳ PENDING  

### 17. ❓ ARIA Requirements
**Issue**: Inconsistent ARIA usage in examples  
**Question**: Minimum ARIA per component?  
**Decision needed**: Create ARIA guidelines?  
**Status**: ⏳ PENDING  

### 18. ❓ ID Usage Guidelines
**Issue**: "IDs only for accessibility" but when required?  
**Examples**: Rarely show IDs even when needed  
**Decision needed**: Document required ID patterns?  
**Status**: ⏳ PENDING  

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
**Status**: ⚠️ NOT IMPLEMENTED YET

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
**Status**: ⚠️ NOT IMPLEMENTED YET

---

## How to Use This Document

1. **Review** open questions before making changes
2. **Update** status when working on an issue
3. **Move** to Decision Log when resolved
4. **Add** new questions as discovered

## Status Key
- ⏳ PENDING - Needs decision
- 🔄 IN PROGRESS - Being resolved
- ✅ DECIDED - See Decision Log
- ❌ REJECTED - Won't fix

---

*Last updated: 2025-01-06*