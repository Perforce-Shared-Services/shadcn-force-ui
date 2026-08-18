/**
 * Single swap-point for Combobox icons (skill §9).
 *
 * The registry `combobox` uses three built-in `IconPlaceholder` glyphs:
 *  - the chevron on `ComboboxTrigger` (`keyboard_arrow_down`)
 *  - the trailing check on a selected `ComboboxItem` (`check`)
 *  - the `close` glyph on `ComboboxClear` / `ComboboxChipRemove`
 *
 * All are raw inline Material Symbols SVGs (Rounded, outline = FILL 0) pulled
 * through the webpack `?raw` rule, injected as real `<svg>` via a
 * sanitizer-trusted `[innerHTML]`, and coloured by `fill-current` (the Material
 * Symbols SVGs carry no `fill` attribute). Map to Figma by MEANING — to swap a
 * glyph, change the import here only. Note `expand_more` does not exist in the
 * package; chevron-down is `keyboard_arrow_down`.
 */
import check from '@material-symbols/svg-400/rounded/check.svg?raw';
import chevronDown from '@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw';
import close from '@material-symbols/svg-400/rounded/close.svg?raw';

/** Chevron for the trigger's open indicator. */
export const COMBOBOX_CHEVRON_SVG = chevronDown;

/** Check glyph for a selected item's indicator. */
export const COMBOBOX_CHECK_SVG = check;

/** Close glyph for clear / chip-remove buttons. */
export const COMBOBOX_CLOSE_SVG = close;
