// Single swap-point for Calendar icons.
//
// Raw inline SVGs (Material Symbols Rounded, outline = FILL 0), inlined
// verbatim so the package stays Vite-portable (no `?raw` loader rule) —
// same convention as `dialog.icons.ts`. Coloured via `fill-current` on the
// consuming spans. Map to Figma by MEANING, not glyph name:
//
// - previous month → chevron_left  (registry IconPlaceholder ChevronLeft)
// - next month     → chevron_right (registry IconPlaceholder ChevronRight)
// - dropdown caret → keyboard_arrow_down (registry IconPlaceholder ChevronDown)
//
// To swap an icon, change the constant here only.

/** Leading glyph for "Previous month". */
export const CALENDAR_PREVIOUS_MONTH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m406-481 177 177q9 9 8.5 21t-9.5 21q-9 9-21.5 9t-21.5-9L341-460q-5-5-7-10t-2-11q0-6 2-11t7-10l199-199q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L406-481Z"/></svg>`

/** Trailing glyph for "Next month". */
export const CALENDAR_NEXT_MONTH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M530-481 353-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l198 198q5 5 7 10t2 11q0 6-2 11t-7 10L396-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l176-176Z"/></svg>`

/** Caret for the month/year dropdown caption. */
export const CALENDAR_DROPDOWN_CARET_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M469-358q-5-2-10-7L261-563q-9-9-8.5-21.5T262-606q9-9 21.5-9t21.5 9l175 176 176-176q9-9 21-8.5t21 9.5q9 9 9 21.5t-9 21.5L501-365q-5 5-10 7t-11 2q-6 0-11-2Z"/></svg>`
