// Single swap-point for Dialog icons.
//
// The only built-in glyph is the close (X) in the content's top-right corner —
// the registry IconPlaceholder's `close` / XIcon mapped to Material Symbols
// Rounded (outline = FILL 0), inlined verbatim from
// `@material-symbols/svg-400/rounded/close.svg`. Coloured via `fill-current`.
// To swap the close icon, change this constant only.

/** Raw inline SVG for the content's close (dismiss) button. */
export const DIALOG_CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>`
