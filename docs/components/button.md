# Button Component

The fundamental interactive element.

## Implementation

```html
<!-- Standard button -->
<button class="button" type="button">
  Click me
</button>

<!-- With properties -->
<button class="button with-interaction with-shadow" style="--size: large;">
  Important Action
</button>
```

## Link vs Button Distinction

CRISP maintains semantic integrity - links navigate, buttons perform actions:

```html
<!-- Link remains a link -->
<a href="/about" class="link">
  Navigate to About
</a>

<!-- Link styled as button (for visual consistency) -->
<a href="/signup" class="link" role="button">
  Sign Up Now
</a>

<!-- Button remains a button -->
<button class="button" type="button" onclick="submitForm()">
  Submit Form
</button>
```

### CSS Implementation

```css
/* Button styles apply to both selectors */
.button,
[role="button"] {
  /* All button styling */
  padding: var(--padding, var(--space-1-0));
  background: var(--bg, var(--color-neutral-90));
  border-radius: var(--radius, var(--radius-sm));
  /* ... */
}

/* Links keep their semantic behaviour */
.link {
  color: var(--color, var(--color-primary-60));
  text-decoration: underline;
}

/* Override link styles when styled as button */
.link[role="button"] {
  text-decoration: none;
  display: inline-block;
}
```

## Custom Properties

- `--bg`: Background color
- `--color`: Text color  
- `--size`: Font size
- `--padding`: Internal spacing
- `--radius`: Corner radius

## States

- `:hover` - Hover state
- `:active` - Pressed state
- `:focus` - Keyboard focus
- `:disabled` - Disabled state

## Accessibility

- Always use `type="button"` to prevent form submission
- Use `role="button"` on non-button elements
- Ensure proper contrast ratios
- Visible focus indicators