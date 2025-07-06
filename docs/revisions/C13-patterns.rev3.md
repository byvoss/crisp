# Revision 3 - Layout Token Prefixes Update

## Changes Made

Updated all layout tokens to use correct prefixed naming according to the new rule:
- Element tokens: NO prefix (--bg, --color, --size)
- Layout tokens: WITH prefix (--stack-gap, --grid-columns)
- Property tokens: WITH prefix (--shadow-blur, --border-width)

### Specific Updates:

1. **Stack Layout**:
   - `--gap` → `--stack-gap`

2. **Cluster Layout**:
   - `--gap` → `--cluster-gap`
   - `--align` → `--cluster-align`

3. **Grid Layout**:
   - `--columns` → `--grid-columns`

4. **Center Layout**:
   - `--height` → `--center-height`

5. **Split Layout**:
   - `--split` → `--split-ratio`
   - `--gap` → `--split-gap`
   - `--align` → `--split-align`

6. **Component-specific tokens**:
   - Card gap: `--gap` → `--card-gap`
   - Stat alignment: `--align` → `--stat-align`

All HTML examples and CSS definitions have been updated to reflect these changes, ensuring consistency with the framework's fundamental rule that layout tokens must have prefixes.