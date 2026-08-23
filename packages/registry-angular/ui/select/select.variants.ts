// Shared class bases for select parts.
//
// The `cn-select-*` tokens in style-force-ui.css own the visual treatment
// (border tier, heights, colours, focus ring, selected-item highlight). These
// constants add the structural base the tokens deliberately do not carry, and
// the `[&_svg]:fill-current` Material Symbols fix (documented deviation — see
// DIVERGENCES.md §button-2).

/** Trigger base — combined with the `cn-select-trigger` token. */
export const SELECT_TRIGGER_BASE =
  "group/select-trigger flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current"

/** Content (popup) base — combined with the `cn-select-content` token. */
export const SELECT_CONTENT_BASE =
  "relative z-50 flex max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95"

/** Item base — combined with the `cn-select-item` token. */
export const SELECT_ITEM_BASE =
  "relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current"
