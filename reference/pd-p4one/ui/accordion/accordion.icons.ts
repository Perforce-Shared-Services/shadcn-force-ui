/**
 * Single swap-point for accordion icons.
 *
 * The trigger chevron is raw inline SVG, imported from `@material-symbols/svg-400`
 * (Material Symbols, weight 300, Rounded style, outline = FILL 0) via the webpack
 * `?raw` rule. The component injects it as a real `<svg>` via `[innerHTML]`
 * (sanitizer-trusted); it points down when closed and rotates 180deg when open.
 * Map to Figma by MEANING, not by glyph name — the Figma component keeps its own
 * icon set. (`keyboard_arrow_down` is the Material Symbols name for the
 * chevron-down the registry calls `expand_more`/ChevronDown.)
 *
 * To swap the icon, change the import here only.
 */
import chevronDown from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';

/** Raw inline SVG for the trigger chevron. */
export const ACCORDION_TRIGGER_SVG = chevronDown;
