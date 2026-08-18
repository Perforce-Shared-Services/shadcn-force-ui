/**
 * Calendar 23 block — SINGLE SWAP POINT for the block's own decorative glyph.
 *
 * Same convention as `ui/calendar/calendar.icons.ts` / `calendar-26.icons.ts`:
 * raw inline SVG from `@material-symbols/svg-400` (Rounded, FILL 0) via the
 * webpack `?raw` rule, injected as trusted HTML by the component. The
 * upstream registry uses lucide-react's `ChevronDownIcon` on the date-range
 * trigger button; mapped here by MEANING to Material Symbols'
 * `keyboard_arrow_down` — the same glyph `ui/calendar` itself uses for its
 * month/year dropdown caret. Sizing/colour come for free from the host
 * `[uiButton]`'s own `[&_svg:not([class*='size-'])]:size-4` + `fill-current`
 * cva rules — no extra classes needed on the icon span.
 */
import chevronDown from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';

/** Trailing glyph on the date-range trigger button. */
export const CALENDAR_23_CHEVRON_DOWN_SVG = chevronDown;
