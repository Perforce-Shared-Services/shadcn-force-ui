/**
 * Single swap-point for Menubar icons.
 *
 * The only built-in glyph the component owns is the check shown in a selected
 * checkbox / radio item's indicator (the registry's `IconPlaceholder` →
 * `CheckIcon`). It is raw inline SVG imported from `@material-symbols/svg-400`
 * (Material Symbols, Rounded style, outline = FILL 0) via the webpack `?raw`
 * rule, injected as a real `<svg>` through `[innerHTML]` (sanitizer-trusted),
 * coloured by `fill-current`.
 *
 * Leading action icons on plain items are projected as content by the caller
 * (parity with the children-based registry) — there is no per-item icon input.
 *
 * The registry's `MenubarSubTrigger` chevron is NOT mapped here — submenus
 * have no radix-ng equivalent and are an intentional parity gap (see index.ts).
 *
 * Map to Figma by MEANING, not glyph name — the Figma component keeps its own
 * icon set. To swap the check, change the import here only.
 */
import check from '@material-symbols/svg-400/rounded/check.svg?raw';

/** Raw inline SVG for the checkbox / radio item's checked indicator. */
export const MENUBAR_INDICATOR_SVG = check;
