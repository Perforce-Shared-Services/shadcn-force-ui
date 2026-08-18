/**
 * Calendar 31 block — SINGLE SWAP POINT for the block's own decorative glyph.
 *
 * Same convention as `ui/calendar/calendar.icons.ts`: raw inline SVG from
 * `@material-symbols/svg-400` (Rounded, FILL 0) via the webpack `?raw` rule,
 * injected as trusted HTML by the component. The upstream registry uses
 * lucide-react's `PlusIcon` on the "Add Event" ghost icon button; mapped here
 * by MEANING to Material Symbols' `add`.
 */
import add from '@material-symbols/svg-400/rounded/add.svg?raw';

/** Glyph on the "Add Event" icon-only button. */
export const CALENDAR_31_PLUS_SVG = add;
