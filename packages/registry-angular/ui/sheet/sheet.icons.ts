/**
 * Single swap-point for Sheet icons.
 *
 * The only built-in glyph is the close (✕) in the content's top-right corner —
 * the registry's `IconPlaceholder` → XIcon. Raw inline SVG (Material Symbols,
 * Rounded style, FILL 0 — matches `@material-symbols/svg-400/rounded/close.svg`),
 * injected as a real `<svg>` through `[innerHTML]` (sanitizer-trusted),
 * coloured by `fill-current`. Inlined as a string constant because this
 * package must stay Vite-portable (no `?raw` loader rule). To swap the icon,
 * change this file only.
 */
export const SHEET_CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>`
