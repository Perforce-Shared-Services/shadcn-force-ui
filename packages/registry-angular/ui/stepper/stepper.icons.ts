// Single swap-point for Stepper icons.
//
// The only built-in glyph is the completed-step checkmark, replacing the step
// number once `[uiStepperItem]` reaches `data-state="completed"`. Raw inline
// SVG (Material Symbols Rounded, `@material-symbols/svg-400` outline glyph),
// injected as a real `<svg>` and coloured by `fill-current` — same glyph used
// by command/select/menubar for their own "checked" indicators, reused by
// MEANING, not by import. To swap the icon, change this file only.

/** Raw inline SVG for the completed-step indicator. */
export const STEPPER_COMPLETED_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m378-332 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399-267q-9 9-21 9t-21-9L175-449q-9-9-8.5-21.5T176-492q9-9 21.5-9t21.5 9l159 160Z"/></svg>`
