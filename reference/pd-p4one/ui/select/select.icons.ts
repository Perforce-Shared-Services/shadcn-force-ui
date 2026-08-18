/**
 * Single swap-point for Select icons.
 *
 * Both glyphs are raw inline SVG imported from `@material-symbols/svg-400`
 * (Material Symbols, Rounded style, outline = FILL 0) via the webpack `?raw`
 * rule, injected as real `<svg>` through `[innerHTML]` (sanitizer-trusted).
 * Map to Figma by MEANING, not glyph name — the Figma component keeps its own
 * icon set.
 *
 *  - trigger chevron — the registry's `ChevronDownIcon` (the down caret on the
 *    trigger). Material Symbols name: `keyboard_arrow_down`.
 *  - item check — the registry's `CheckIcon` shown in the selected item's
 *    indicator. Material Symbols name: `check`.
 *
 * To swap an icon, change the import here only.
 */
import chevronDown from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';
import check from '@material-symbols/svg-400/rounded/check.svg?raw';

/** Raw inline SVG for the trigger's down chevron. */
export const SELECT_TRIGGER_ICON_SVG = chevronDown;

/** Raw inline SVG for the selected-item check indicator. */
export const SELECT_ITEM_INDICATOR_SVG = check;
