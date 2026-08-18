/**
 * Checkbox icon set — SINGLE SWAP POINT for this component's glyphs.
 *
 * Icons are raw inline SVG imported from `@material-symbols/svg-400` (Material
 * Symbols, weight 300, Rounded style) via the webpack `?raw` rule. A component
 * injects the string as a real `<svg>` element with `[innerHTML]`; the indicator
 * sizes any `<svg>` to `size-3.5` and applies `fill-current` so the glyph
 * inherits the control's text colour (`text-primary-foreground` when filled).
 *
 * Two glyphs, picked by the radix `data-state`:
 * - `checked`        → checkmark
 * - `indeterminate`  → horizontal dash (the Force spec's "select all, some rows"
 *                      indicator; visually distinct from the checkmark)
 *
 * Map to Figma by MEANING, not glyph name — the Figma checkbox keeps its own
 * icon set.
 */
import check from '@material-symbols/svg-400/rounded/check.svg?raw';
import remove from '@material-symbols/svg-400/rounded/remove.svg?raw';

/** Raw inline SVG shown when the checkbox is checked. */
export const CHECKBOX_CHECK_SVG = check;

/** Raw inline SVG (horizontal dash) shown in the indeterminate state. */
export const CHECKBOX_INDETERMINATE_SVG = remove;
