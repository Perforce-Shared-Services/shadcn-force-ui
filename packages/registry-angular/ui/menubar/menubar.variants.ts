// Shared class bases for menubar parts.
//
// The `cn-menubar-*` tokens in style-force-ui.css own the state/colour
// treatment (focus, destructive, data-inset, svg sizing). These constants add
// the structural base the tokens deliberately do not carry: layout primitives,
// the `group/menubar-item` hook used by `cn-menubar-shortcut`, and the
// `[&_svg]:fill-current` Material Symbols fix (documented deviation — see
// DIVERGENCES.md).

/** Plain menu item base — combined with the `cn-menubar-item` token. */
export const MENUBAR_ITEM_BASE =
  "group/menubar-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current"

/** Checkbox / radio item base — combined with the checkbox/radio item tokens. */
export const MENUBAR_SELECTABLE_ITEM_BASE =
  "relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current"
