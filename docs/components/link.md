# Link Component

Styled navigation elements that maintain semantic integrity.

## Implementation

```html
<!-- Standard link -->
<a href="/about" class="link">
  About Us
</a>

<!-- External link -->
<a href="https://example.com" class="link" target="_blank" rel="noopener noreferrer">
  External Resource
</a>

<!-- Link with properties -->
<a href="/contact" class="link with-interaction" style="--weight: bold;">
  Contact Us
</a>

<!-- Link styled as button (visual only) -->
<a href="/signup" class="link" role="button">
  Sign Up Now
</a>
```

## Custom Properties

- `--color`: Text color (default: primary-60)
- `--decoration`: Text decoration style
- `--weight`: Font weight
- `--opacity`: Hover/focus opacity

## States

- `:hover` - Hover state (opacity change)
- `:focus` - Keyboard focus (outline)
- `:visited` - Visited links (color shift)
- `:active` - Active/pressed state

## Accessibility

- Always use descriptive link text (not "click here")
- Add `aria-label` for links with generic text
- Use `rel="noopener noreferrer"` for external links
- Consider `aria-current="page"` for current page links

## Semantic Guidelines

Links are for navigation:
- Use `<a>` for navigation between pages/sections
- Use `<button>` for actions (submit, toggle, etc.)
- Can style links as buttons with `role="button"` for visual consistency
- Never use JavaScript `onclick` for navigation - use proper `href`

```html
<!-- ✅ Correct: Link for navigation -->
<a href="/products" class="link">View Products</a>

<!-- ✅ Correct: Button for action -->
<button class="button" onclick="addToCart()">Add to Cart</button>

<!-- ✅ Correct: Link styled as button -->
<a href="/register" class="link" role="button">Register Now</a>

<!-- ❌ Wrong: Button for navigation -->
<button onclick="location.href='/products'">View Products</button>

<!-- ❌ Wrong: Link without href -->
<a class="link" onclick="doSomething()">Click Me</a>
```