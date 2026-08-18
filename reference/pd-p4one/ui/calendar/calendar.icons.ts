/**
 * Single swap-point for Calendar icons.
 *
 * Raw inline SVG imported from `@material-symbols/svg-400` (Material
 * Symbols, Rounded style, outline = FILL 0) via the webpack `?raw` rule,
 * injected as real `<svg>` through `[innerHTML]` (sanitizer-trusted). Map to
 * Figma by MEANING, not glyph name — the Figma component keeps its own icon
 * set.
 *
 * - previous month → `chevron_left`  (registry IconPlaceholder ChevronLeft)
 * - next month     → `chevron_right` (registry IconPlaceholder ChevronRight)
 * - dropdown caret → `keyboard_arrow_down` (registry IconPlaceholder ChevronDown)
 *
 * To swap an icon, change the import here only.
 */
import chevronLeft from '@material-symbols/svg-400/rounded/chevron_left.svg?raw';
import chevronRight from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';
import chevronDown from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';

/** Leading glyph for "Previous month". */
export const CALENDAR_PREVIOUS_MONTH_SVG = chevronLeft;

/** Trailing glyph for "Next month". */
export const CALENDAR_NEXT_MONTH_SVG = chevronRight;

/** Caret for the month/year dropdown caption. */
export const CALENDAR_DROPDOWN_CARET_SVG = chevronDown;
