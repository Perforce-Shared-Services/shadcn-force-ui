// Inline Material Symbols SVGs — single swap point for the pagination glyphs.
// Bypassing DomSanitizer is safe: these are bundled static strings, not user input.
// (React's canonical pagination.tsx uses <IconPlaceholder>, which has no Angular
// equivalent — see DIVERGENCES.md § pagination.)
export const CHEVRON_LEFT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>`

export const CHEVRON_RIGHT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>`

export const MORE_HORIZ_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>`
