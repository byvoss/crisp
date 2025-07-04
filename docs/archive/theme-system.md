# CRISP Theme System

CRISP includes a complete light/dark theme system that automatically adapts to user preferences.

## How It Works

The theme is controlled via the `data-theme` attribute on the `<body>` element:

```html
<!-- Light theme -->
<body data-theme="light">

<!-- Dark theme -->
<body data-theme="dark">

<!-- System preference (default) -->
<body>
```

## Theme Structure

### Semantic Colour Tokens

Instead of hard-coding colours, CRISP uses semantic tokens that adapt:

```css
/* These change based on theme */
--colour-background      /* Page background */
--colour-surface         /* Card/component background */
--colour-on-background   /* Text on background */
--colour-on-surface      /* Text on surface */

/* Example usage */
.card {
  background: var(--colour-surface);
  color: var(--colour-on-surface);
}
```

### Colour Mapping

| Token | Light Theme | Dark Theme |
|-------|-------------|------------|
| `--colour-background` | `neutral-98` | `neutral-10` |
| `--colour-surface` | `neutral-100` | `neutral-15` |
| `--colour-primary` | `primary-50` | `primary-60` |
| `--colour-on-primary` | `neutral-100` | `primary-10` |

## Implementation

### Basic Theme Toggle

```html
<!-- HTML -->
<button onclick="toggleTheme()" aria-label="Toggle theme">
  <span class="light-icon">☀️</span>
  <span class="dark-icon">🌙</span>
</button>

<script>
function toggleTheme() {
  const body = document.body;
  const current = body.getAttribute('data-theme');
  
  if (current === 'dark') {
    body.setAttribute('data-theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
  }
  
  // Save preference
  localStorage.setItem('theme', body.getAttribute('data-theme'));
}

// Load saved preference
const saved = localStorage.getItem('theme');
if (saved) {
  document.body.setAttribute('data-theme', saved);
}
</script>
```

### Advanced Theme Manager

```javascript
class CrispTheme {
  constructor() {
    this.body = document.body;
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.init();
  }
  
  init() {
    // Check for saved preference
    const saved = localStorage.getItem('crisp-theme');
    
    if (saved) {
      this.setTheme(saved);
    } else {
      // Use system preference
      this.setTheme('system');
    }
    
    // Listen for system changes
    this.mediaQuery.addEventListener('change', (e) => {
      if (!this.body.hasAttribute('data-theme')) {
        // Only update if using system preference
        this.updateSystemTheme();
      }
    });
  }
  
  setTheme(theme) {
    if (theme === 'system') {
      // Remove attribute to use system preference
      this.body.removeAttribute('data-theme');
      localStorage.removeItem('crisp-theme');
    } else {
      this.body.setAttribute('data-theme', theme);
      localStorage.setItem('crisp-theme', theme);
    }
  }
  
  getCurrentTheme() {
    const attribute = this.body.getAttribute('data-theme');
    if (attribute) return attribute;
    
    // Check system preference
    return this.mediaQuery.matches ? 'dark' : 'light';
  }
}

// Initialize
const theme = new CrispTheme();
```

## Smooth Transitions

CRISP includes smooth theme transitions by default:

```css
/* In crisp-themes.css */
* {
  transition: 
    background-color 250ms ease,
    border-color 250ms ease,
    color 250ms ease;
}
```

To disable during theme switch:

```javascript
function setThemeWithoutTransition(theme) {
  document.body.classList.add('theme-transitioning');
  document.body.setAttribute('data-theme', theme);
  
  // Force reflow
  document.body.offsetHeight;
  
  setTimeout(() => {
    document.body.classList.remove('theme-transitioning');
  }, 50);
}
```

## Custom Themes

Create your own theme by overriding the semantic tokens:

```css
/* Purple theme */
[data-theme="purple"] {
  --colour-primary-50: hsla(280, 70%, 50%, 1);
  --colour-primary-60: hsla(280, 70%, 60%, 1);
  
  --colour-background: hsla(280, 20%, 10%, 1);
  --colour-surface: hsla(280, 15%, 15%, 1);
  --colour-on-background: hsla(280, 10%, 90%, 1);
}

/* High contrast theme */
[data-theme="high-contrast"] {
  --colour-background: black;
  --colour-surface: black;
  --colour-on-background: white;
  --colour-border: white;
  --colour-primary: yellow;
  --colour-on-primary: black;
}
```

## Accessibility Considerations

1. **Respect User Preference**: Always default to system preference
2. **Sufficient Contrast**: All colour combinations meet WCAG AA
3. **Focus Indicators**: Visible in both themes
4. **No Flashing**: Smooth transitions prevent flashing

## Component Theming

Components automatically adapt to the theme:

```css
.button {
  /* Uses theme-aware tokens */
  background: var(--colour-primary);
  color: var(--colour-on-primary);
}

.card {
  background: var(--colour-surface);
  color: var(--colour-on-surface);
  border-color: var(--colour-border);
}
```

## Best Practices

1. **Use Semantic Tokens**: Never hard-code colours in components
2. **Test Both Themes**: Ensure readability in both light and dark
3. **Consider Media**: Images/videos might need filters in dark mode
4. **Progressive Enhancement**: Theme works without JavaScript

## CSS-Only Theme Toggle

For a no-JavaScript solution:

```css
/* Radio button theme toggle */
input[name="theme"][value="light"]:checked ~ body {
  --colour-background: var(--colour-neutral-98);
  /* ... other light theme values */
}

input[name="theme"][value="dark"]:checked ~ body {
  --colour-background: var(--colour-neutral-10);
  /* ... other dark theme values */
}
```

Note: This requires specific HTML structure and has limitations.