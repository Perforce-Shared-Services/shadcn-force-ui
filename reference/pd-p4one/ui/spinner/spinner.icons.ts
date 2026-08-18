/**
 * Spinner icon — SINGLE SWAP POINT for the spinner glyph.
 *
 * Raw inline SVG from `@material-symbols/svg-400` (Material Symbols, Rounded
 * style) via the webpack `?raw` rule. `progress_activity` is the Material
 * Symbols arc-spinner — the same glyph the button's loading state uses, so the
 * two stay visually consistent. The component injects this string as a real
 * `<svg>` via `[innerHTML]`; the cva sizes it with `[&_svg]:size-full` and
 * colors it with `[&_svg]:fill-current`.
 *
 * Figma↔code mapping is by MEANING (a loading/progress indicator), not by asset
 * name — the Figma spinner keeps its own design-system glyph.
 */
import progressActivity from '@material-symbols/svg-400/rounded/progress_activity.svg?raw';

/** Raw inline SVG rendered (rotating, or pulsing under reduced motion). */
export const SPINNER_SVG = progressActivity;
