/**
 * Calendar 30 block — SINGLE SWAP POINT for the block's own decorative glyph.
 *
 * Same convention as `ui/calendar/calendar.icons.ts`: raw inline SVG from
 * `@material-symbols/svg-400` (Rounded, FILL 0) via the webpack `?raw` rule,
 * injected as trusted HTML by the component. The upstream registry uses
 * lucide-react's `ChevronDownIcon` on the date-range trigger button; mapped
 * here by MEANING to Material Symbols' `keyboard_arrow_down` — the same
 * glyph `ui/calendar` itself uses for its month/year dropdown caret.
 */
import chevronDown from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';

/** Trailing glyph on the "Select your stay" trigger button. */
export const CALENDAR_30_CHEVRON_DOWN_SVG = chevronDown;
