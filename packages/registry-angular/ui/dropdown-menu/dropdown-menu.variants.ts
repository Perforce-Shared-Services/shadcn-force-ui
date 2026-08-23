// Shared class bases for dropdown-menu parts.
//
// The `cn-dropdown-menu-*` tokens in style-force-ui.css own the state/colour
// treatment (focus, destructive, data-inset, svg sizing). These constants add
// the structural base the tokens deliberately do not carry: layout primitives,
// the `group/dropdown-menu-item` hook used by `cn-dropdown-menu-shortcut`, and
// the `[&_svg]:fill-current` Material Symbols fix (documented deviation — see
// DIVERGENCES.md). p4one-local additions (`w-full`, transition guard) stay
// here at component level rather than in the global theme.

/** Plain menu item base — combined with the `cn-dropdown-menu-item` token. */
export const DROPDOWN_MENU_ITEM_BASE =
  "group/dropdown-menu-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current"

/** Checkbox / radio item base — combined with the checkbox/radio item tokens. */
export const DROPDOWN_MENU_SELECTABLE_ITEM_BASE =
  "relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current"
