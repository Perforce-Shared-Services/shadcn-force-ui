/**
 * Single swap-point for NavigationMenu icons.
 *
 * The only built-in glyph is the trigger's chevron (the registry's
 * `IconPlaceholder` → `ChevronDownIcon` / `keyboard_arrow_down`), raw inline
 * SVG from `@material-symbols/svg-400` (Rounded, FILL 0) via the webpack
 * `?raw` rule, injected through `[innerHTML]` (sanitizer-trusted), coloured by
 * `fill-current`, rotated 180deg while its item is open.
 *
 * Map to Figma by MEANING, not glyph name — the Figma component keeps its own
 * icon set. To swap the chevron, change the import here only.
 */
import chevronDown from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';

/** Raw inline SVG for the trigger's chevron. */
export const NAVIGATION_MENU_TRIGGER_CHEVRON_SVG = chevronDown;
