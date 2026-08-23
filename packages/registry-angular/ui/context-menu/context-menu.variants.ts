// Shared class bases for context-menu parts.
//
// The `cn-context-menu-*` tokens in style-force-ui.css own the state/colour
// treatment (focus, destructive, data-inset, svg sizing). These constants add
// the structural base the tokens deliberately do not carry: layout primitives,
// the `group/context-menu-item` hook used by `cn-context-menu-shortcut`, and
// the `[&_svg]:fill-current` Material Symbols fix (documented deviation — see
// DIVERGENCES.md). p4one-local additions (transition guard) stay here at
// component level rather than in the global theme.

/** Plain menu item base — combined with the `cn-context-menu-item` token. */
export const CONTEXT_MENU_ITEM_BASE =
  "group/context-menu-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current"

/** Checkbox / radio item base — combined with the checkbox/radio item tokens. */
export const CONTEXT_MENU_SELECTABLE_ITEM_BASE =
  "relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current"
