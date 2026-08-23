// Single swap-point for the Questionnaire icon.
//
// The only built-in glyph is the checkmark shown in a `multiple`
// (checkbox-style) item's choice indicator when checked. A radio-style
// indicator uses a plain filled dot (no icon). Raw inline SVG (Material
// Symbols Rounded check), injected as a real `<svg>` and coloured by
// `fill-current` — same glyph used by stepper/command for their own checked
// indicators, reused by MEANING, not by import.

/** Raw inline SVG for the checkbox-style choice indicator. */
export const QUESTIONNAIRE_CHOICE_CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m378-332 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399-267q-9 9-21 9t-21-9L175-449q-9-9-8.5-21.5T176-492q9-9 21.5-9t21.5 9l159 160Z"/></svg>`
