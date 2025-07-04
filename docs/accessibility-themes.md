# Accessibility Themes in CRISP

CRISP provides specialized themes for various accessibility needs through the `data-theme` attribute.

## Why data-theme, not ARIA?

ARIA attributes are **exclusively for conveying information to assistive technologies**. Using ARIA for visual themes would:
- Confuse screen readers
- Violate ARIA specifications
- Create accessibility barriers

Instead, `data-theme` provides a semantic way to handle visual preferences while keeping ARIA for its intended purpose.

## Available Accessibility Themes

### High Contrast Theme

For users who need maximum contrast:

```html
<body data-theme="high-contrast">
```

Features:
- Pure black background
- White text and borders
- Yellow for interactive elements
- 2px borders for better visibility

### Large Print Theme

For users who need larger text:

```html
<body data-theme="large-print">
```

Features:
- All font sizes increased by 25%
- Increased line height for readability
- Maintains proportional scaling

### Reduced Motion Theme

For users sensitive to motion:

```html
<body data-theme="reduced-motion">
```

Features:
- All transitions set to 0ms
- No animations
- Instant state changes

## Combining Themes

You can combine themes using JavaScript:

```javascript
class AccessibilityThemes {
  constructor() {
    this.body = document.body;
    this.themes = new Set();
  }
  
  addTheme(theme) {
    this.themes.add(theme);
    this.updateThemes();
  }
  
  removeTheme(theme) {
    this.themes.delete(theme);
    this.updateThemes();
  }
  
  updateThemes() {
    // Join multiple themes with space
    const themeString = Array.from(this.themes).join(' ');
    this.body.setAttribute('data-theme', themeString);
  }
}

// Usage
const a11y = new AccessibilityThemes();
a11y.addTheme('dark');
a11y.addTheme('large-print');
// Results in: data-theme="dark large-print"
```

## CSS for Multiple Themes

Support multiple themes with CSS:

```css
/* Dark + High Contrast */
[data-theme~="dark"][data-theme~="high-contrast"] {
  --colour-background: black;
  --colour-primary: cyan;
  --colour-on-primary: black;
}

/* Light + Large Print */
[data-theme~="light"][data-theme~="large-print"] {
  --text-size-1-0: 1.375rem;
  --space-1-0: 1.25rem;
}
```

## System Preference Detection

CRISP automatically detects system preferences:

```javascript
// Detect all preferences
function detectSystemPreferences() {
  const preferences = [];
  
  // Color scheme
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    preferences.push('dark');
  }
  
  // Contrast
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    preferences.push('high-contrast');
  }
  
  // Motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    preferences.push('reduced-motion');
  }
  
  // Transparency (Safari)
  if (window.matchMedia('(prefers-reduced-transparency: reduce)').matches) {
    preferences.push('reduced-transparency');
  }
  
  return preferences;
}
```

## Theme Switcher Component

Complete theme switcher with accessibility options:

```html
<fieldset class="theme-switcher as-stack" role="group">
  <legend>Visual Preferences</legend>
  
  <!-- Color scheme -->
  <div class="field as-cluster">
    <label>Colour Scheme:</label>
    <input type="radio" name="color" value="light" id="theme-light">
    <label for="theme-light">Light</label>
    <input type="radio" name="color" value="dark" id="theme-dark">
    <label for="theme-dark">Dark</label>
    <input type="radio" name="color" value="system" id="theme-system" checked>
    <label for="theme-system">System</label>
  </div>
  
  <!-- Accessibility options -->
  <div class="field as-stack">
    <label>Accessibility:</label>
    <label class="checkbox">
      <input type="checkbox" name="a11y" value="high-contrast">
      High Contrast
    </label>
    <label class="checkbox">
      <input type="checkbox" name="a11y" value="large-print">
      Large Print
    </label>
    <label class="checkbox">
      <input type="checkbox" name="a11y" value="reduced-motion">
      Reduced Motion
    </label>
  </div>
</fieldset>
```

## Best Practices

1. **Always provide theme controls** - Don't rely only on system detection
2. **Test all combinations** - Ensure dark + high-contrast works, etc.
3. **Remember the cascade** - Order matters when combining themes
4. **Persist preferences** - Save to localStorage
5. **Provide reset option** - Let users return to defaults

## ARIA Usage with Themes

While themes use `data-theme`, ARIA is still important for the controls:

```html
<!-- Theme toggle button -->
<button 
  aria-label="Toggle theme"
  aria-pressed="false"
  aria-describedby="theme-desc">
  <span class="sr-only">Toggle dark mode</span>
  🌙
</button>
<span id="theme-desc" class="sr-only">
  Currently using light theme
</span>

<!-- Theme selector -->
<select 
  aria-label="Choose visual theme"
  onchange="setTheme(this.value)">
  <option value="system">System preference</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="high-contrast">High contrast</option>
</select>
```

## Testing Accessibility Themes

1. **Colour Contrast**: Use tools like WebAIM or axe
2. **Keyboard Navigation**: Ensure all controls are reachable
3. **Screen Reader**: Test theme announcements
4. **Real Users**: Get feedback from users with disabilities