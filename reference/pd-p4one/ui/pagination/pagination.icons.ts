/**
 * Single swap-point for pagination icons.
 *
 * Raw inline SVG imported from `@material-symbols/svg-400` (Material Symbols,
 * weight 300 = the company convention, Rounded style, outline = FILL 0) via
 * the webpack `?raw` rule, injected as real `<svg>` via `[innerHTML]`
 * (sanitizer-trusted). Map to Figma by MEANING, not glyph name — Figma keeps
 * its own icon set.
 *
 * - previous → `chevron_left`  (registry IconPlaceholder ChevronLeft)
 * - next     → `chevron_right` (registry IconPlaceholder ChevronRight)
 * - ellipsis → `more_horiz`    (registry IconPlaceholder MoreHorizontal)
 *
 * To swap an icon, change the import here only.
 */
import chevronLeft from '@material-symbols/svg-400/rounded/chevron_left.svg?raw';
import chevronRight from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import moreHoriz from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';

/** Leading glyph for "Previous". */
export const PAGINATION_PREVIOUS_SVG = chevronLeft;

/** Trailing glyph for "Next". */
export const PAGINATION_NEXT_SVG = chevronRight;

/** Collapsed-pages ellipsis glyph. */
export const PAGINATION_ELLIPSIS_SVG = moreHoriz;
