// Inline Material Symbols Rounded SVGs — single swap point for menubar icons.
// Bypassing DomSanitizer is safe: these are bundled static strings, not user input.
//
// - check         → checkbox / radio item's checked indicator (registry IconPlaceholder Check)
// - chevron_right → sub-trigger's trailing expand glyph (registry ChevronRight, `cn-rtl-flip`)

/** Raw inline SVG for the checkbox / radio item's checked indicator. */
export const MENUBAR_CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m378-332 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399-267q-9 9-21 9t-21-9L175-449q-9-9-8.5-21.5T176-492q9-9 21.5-9t21.5 9l159 160Z"/></svg>`

/** Raw inline SVG for the sub-trigger's trailing chevron (flipped in RTL via cn-rtl-flip). */
export const MENUBAR_CHEVRON_RIGHT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M530-481 353-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l198 198q5 5 7 10t2 11q0 6-2 11t-7 10L396-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l176-176Z"/></svg>`
