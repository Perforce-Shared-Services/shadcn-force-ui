/**
 * Single swap-point for Stepper icons.
 *
 * The only built-in glyph is the completed-step checkmark, replacing the
 * step number once `[uiStepperItem]` reaches `data-state="completed"`. Raw
 * inline SVG from `@material-symbols/svg-400` (Material Symbols, Rounded
 * style, outline = FILL 0) via the webpack `?raw` rule, injected as a real
 * `<svg>` through `[innerHTML]` (sanitizer-trusted), coloured by
 * `fill-current`. Same glyph used by `command`/`select`/`menubar` for their
 * own "checked" indicators — reused by MEANING, not by import.
 *
 * To swap the icon, change the import here only.
 */
import check from '@material-symbols/svg-400/rounded/check.svg?raw';

/** Raw inline SVG for the completed-step indicator. */
export const STEPPER_COMPLETED_SVG = check;
