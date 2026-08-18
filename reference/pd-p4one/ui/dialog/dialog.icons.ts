/**
 * Single swap-point for Dialog icons.
 *
 * The only built-in glyph is the close (X) in the content's top-right corner —
 * the registry's `IconPlaceholder` → `XIcon`. Raw inline SVG from
 * `@material-symbols/svg-400` (Material Symbols, Rounded, outline = FILL 0) via
 * the webpack `?raw` rule, injected as a real `<svg>` through `[innerHTML]`
 * (sanitizer-trusted), coloured by `fill-current`.
 *
 * Map to Figma by MEANING, not glyph name. To swap the close icon, change the
 * import here only.
 */
import close from '@material-symbols/svg-400/rounded/close.svg?raw';

/** Raw inline SVG for the content's close (dismiss) button. */
export const DIALOG_CLOSE_SVG = close;
