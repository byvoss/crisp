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

### 4. ❓ Data Attribute Hierarchy
**Issue**: Unclear when to use which data attribute  
**Overlaps**: 
- `data-state` vs `data-variant` - When to use which?
- `data-context` vs `data-theme` vs `data-brand` - Different purposes?
**Decision needed**: Create clear usage matrix  
**Status**: ⏳ PENDING  

### 5. ❓ The "1+1+3" Rule Clarification
**Issue**: Do data attributes count toward the class limit?  
**Examples**: Some show many data attributes  
**Decision needed**: Clarify that data attributes don't count?  
**Status**: ⏳ PENDING  

### 6. ❓ Progressive Enhancement Details
**Issue**: What exactly changes between tiers?  
**Current info**: Only file sizes mentioned  
**Decision needed**: Document feature matrix for each tier  
**Status**: ⏳ PENDING  

### 7. ❓ Layout Token Naming Convention
**Issue**: Inconsistent layout token patterns  
**Examples**: `--gap` vs `--stack-gap` vs `--cluster-gap`  
**Rule**: Layout tokens should describe the pattern  
**Decision needed**: Standardize on pattern-specific tokens?  
**Status**: ⏳ PENDING  

## 🟠 Missing Documentation

### 8. ❓ Component Documentation
**Issue**: Only 3 of ~20 components documented  
**Missing**: card, navigation, form, alert, etc.  
**Decision needed**: Full docs or different structure?  
**Status**: ⏳ PENDING  

### 9. ❓ Theme System Implementation
**Issue**: 10KB theme system mentioned but not explained  
**Questions**: What's included? How does it work?  
**Decision needed**: Document or implement first?  
**Status**: ⏳ PENDING  

### 10. ❓ Web Components (Enterprise)
**Issue**: Mentioned but never demonstrated  
**Questions**: How do they enhance HTML? Examples?  
**Decision needed**: Create examples or remove mention?  
**Status**: ⏳ PENDING  

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

### 11. ❓ NPM Package Strategy
**Issue**: 3 packages mentioned but only one exists  
**Packages**: 
- `@byvoss/crisp` ✓ Exists
- `@byvoss/crisp-theme` ❌ Missing
- `@byvoss/crisp-enterprise` ❌ Missing
**Decision needed**: Single package with different builds?  
**Status**: ⏳ PENDING  

### 12. ❓ CDN Distribution
**Issue**: Examples show same CSS file for all editions  
**Question**: How to serve different tier files?  
**Decision needed**: Different filenames or same file?  
**Status**: ⏳ PENDING  

### 13. ❓ TypeScript Configuration
**Issue**: TODO mentions TypeScript not configured  
**Question**: Needed for v1.0 or later?  
**Decision needed**: Configure now or postpone?  
**Status**: ⏳ PENDING  

### 14. ❓ Stylelint Issues
**Issue**: Linting disabled due to failures  
**Location**: `TODO.md` mentions this  
**Decision needed**: Fix rules or adjust config?  
**Status**: ⏳ PENDING  

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