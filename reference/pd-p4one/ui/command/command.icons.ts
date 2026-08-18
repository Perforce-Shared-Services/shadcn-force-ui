/**
 * Single swap-point for Command icons (skill §9).
 *
 * The registry's `command` uses two built-in `IconPlaceholder` glyphs:
 *  - the search icon in `CommandInput`'s addon (`SearchIcon`)
 *  - the trailing check on a selected `CommandItem` (`CheckIcon`)
 *
 * Both are raw inline Material Symbols SVGs (Rounded, outline = FILL 0) pulled
 * through the webpack `?raw` rule, injected as real `<svg>` via a
 * sanitizer-trusted `[innerHTML]`, and coloured by `fill-current` (the Material
 * Symbols SVGs carry no `fill` attribute). Map to Figma by MEANING — to swap a
 * glyph, change the import here only.
 */
import check from '@material-symbols/svg-400/rounded/check.svg?raw';
import search from '@material-symbols/svg-400/rounded/search.svg?raw';

/** Search glyph for the input addon. */
export const COMMAND_SEARCH_SVG = search;

/** Check glyph for a selected (`checked`) item. */
export const COMMAND_CHECK_SVG = check;
