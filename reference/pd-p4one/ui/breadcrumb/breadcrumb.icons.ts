/**
 * Single swap-point for breadcrumb icons.
 *
 * Both are raw inline SVG imported from `@material-symbols/svg-400` (Material
 * Symbols, weight 400, Rounded style, outline = FILL 0) via the webpack `?raw`
 * rule, injected as real `<svg>` via `[innerHTML]` (sanitizer-trusted). Map to
 * Figma by MEANING, not glyph name — the Figma component keeps its own icon set.
 *
 * - separator → `chevron_right` (registry IconPlaceholder ChevronRight)
 * - ellipsis  → `more_horiz`   (registry IconPlaceholder MoreHorizontal)
 *
 * To swap an icon, change the import here only.
 */
import chevronRight from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import moreHoriz from '@material-symbols/svg-400/rounded/more_horiz.svg?raw';

/** Default separator glyph (chevron pointing to the next crumb). */
export const BREADCRUMB_SEPARATOR_SVG = chevronRight;

/** Collapsed-crumbs ellipsis glyph. */
export const BREADCRUMB_ELLIPSIS_SVG = moreHoriz;
