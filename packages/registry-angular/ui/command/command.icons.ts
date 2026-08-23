// Single swap-point for Command icons.
//
// The registry's `command` uses two glyphs:
//  - the search icon in `CommandInput`'s addon (`search`)
//  - the trailing check on a selected `CommandItem` (`check`)
//
// Both are raw inline Material Symbols SVGs (Rounded, outline = FILL 0),
// injected as real `<svg>` via a sanitizer-trusted `[innerHTML]`, and coloured
// by `fill-current` (the Material Symbols SVGs carry no `fill` attribute).
// To swap a glyph, change the constant here only.

/** Search glyph for the input addon. */
export const COMMAND_SEARCH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l242 240q9 8.56 9 21.78T818-143q-9 9-22.22 9-13.22 0-21.78-9L533-384q-30 26-69.96 40.5Q423.08-329 378-329Zm-1-60q81.25 0 138.13-57.5Q572-504 572-585t-56.87-138.5Q458.25-781 377-781q-82.08 0-139.54 57.5Q180-666 180-585t57.46 138.5Q294.92-389 377-389Z"/></svg>`

/** Check glyph for a selected (`checked`) item. */
export const COMMAND_CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m378-332 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399-267q-9 9-21 9t-21-9L175-449q-9-9-8.5-21.5T176-492q9-9 21.5-9t21.5 9l159 160Z"/></svg>`
