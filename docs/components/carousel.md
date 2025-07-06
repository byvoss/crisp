# ⚠️ DRAFT - Not Final - IGNORE FOR MODIFICATIONS

This component documentation is experimental and will be replaced after MVP.
See C15-component-reference.md for current documentation.

---

# Carousel Component

CSS-only content slider following CRISP patterns.

## Implementation Concept

```html
<!-- Always use section - KISS principle -->
<section class="carousel as-reel with-snap" role="region" aria-label="Content carousel">
  <!-- Radio buttons for navigation (hidden) -->
  <input class="radio" id="slide-1" type="radio" name="carousel-1" checked>
  <input class="radio" id="slide-2" type="radio" name="carousel-1">
  <input class="radio" id="slide-3" type="radio" name="carousel-1">
  
  <!-- Any content: images, cards, articles, etc. -->
  <img class="image" src="photo-1.jpg" alt="Photo 1">
  <img class="image" src="photo-2.jpg" alt="Photo 2">
  <img class="image" src="photo-3.jpg" alt="Photo 3">
  
  <!-- Navigation -->
  <nav class="nav as-cluster" role="navigation" aria-label="Carousel navigation">
    <label class="button" for="slide-1" aria-label="Go to slide 1"></label>
    <label class="button" for="slide-2" aria-label="Go to slide 2"></label>
    <label class="button" for="slide-3" aria-label="Go to slide 3"></label>
  </nav>
</section>
```

## CRISP Approach

- `carousel` - The component class
- `as-reel` - Layout mode for horizontal scrolling
- `with-snap` - Property for scroll-snap behaviour
- Content items use existing CRISP components (card, article, etc.)
- Navigation uses standard CRISP nav and button

## CSS Magic

```css
.carousel {
  /* Component base */
  position: relative;
}

.carousel input[type="radio"] {
  /* Hide radio buttons */
  position: absolute;
  opacity: 0;
}

/* Use :checked + sibling selectors for movement */
#slide-1:checked ~ .card:nth-of-type(1) { /* visible */ }
#slide-2:checked ~ .card:nth-of-type(2) { /* visible */ }
```

## Key Principles

- No custom sub-classes
- Reuse existing CRISP components
- Maximum 3 classes per element
- Semantic HTML with ARIA
- Progressive enhancement ready