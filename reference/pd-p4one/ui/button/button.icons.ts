/**
 * Button icon set — SINGLE SWAP POINT for the icon system.
 *
 * Icons are raw inline SVG, imported from `@material-symbols/svg-400` (Material
 * Symbols, weight 300 = the company convention) via the webpack `?raw` rule.
 * The `rounded/` folder is the Rounded style; an unsuffixed file is the outline
 * (FILL 0) cut, a `-fill` suffix is the filled (FILL 1) cut. A component injects
 * the string as a real `<svg>` element with `[innerHTML]`; the cva sizes any
 * `<svg>` to `size-4` (scaled per size) and applies `fill-current` so the glyph
 * inherits the button's text colour.
 *
 * The button itself only owns ONE built-in glyph: the `loading` spinner. Caller
 * icons (leading/trailing) are projected as content tagged
 * `data-icon="inline-start"` / `"inline-end"`, exactly like the badge — there's
 * no per-variant icon input (parity with the children-based registry).
 *
 * To swap the spinner, change `BUTTON_SPINNER_SVG` only. Map to Figma by
 * MEANING, not glyph name — the Figma button keeps its own icon set.
 */
import progressActivity from '@material-symbols/svg-400/rounded/progress_activity.svg?raw';

/** Raw inline SVG shown (spinning) while `loading` is set. */
export const BUTTON_SPINNER_SVG = progressActivity;
