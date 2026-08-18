/**
 * Calendar 29 block — SINGLE SWAP POINT for the block's own decorative glyph.
 *
 * Same convention as `ui/calendar/calendar.icons.ts`: raw inline SVG from
 * `@material-symbols/svg-400` (Rounded, FILL 0) via the webpack `?raw` rule,
 * injected as trusted HTML by the component. The upstream registry uses
 * lucide-react's `CalendarIcon` on the icon-only popover trigger; mapped here
 * by MEANING to Material Symbols' `calendar_today`.
 */
import calendarToday from '@material-symbols/svg-400/rounded/calendar_today.svg?raw';

/** Icon-only trigger button that opens the date-picker popover. */
export const CALENDAR_29_CALENDAR_SVG = calendarToday;
