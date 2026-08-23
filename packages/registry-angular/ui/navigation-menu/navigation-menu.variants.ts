// Shared class bases for navigation-menu parts.
//
// The `cn-navigation-menu-*` tokens in style-force-ui.css own the state/colour
// treatment (hover/focus fills, data-open animations, focus-visible ring, svg
// sizing on links). These constants add the structural base the tokens
// deliberately do not carry: layout primitives, group hooks, and the
// `[&_svg]:fill-current` Material Symbols fix (documented deviation — see
// DIVERGENCES.md).
//
// PARITY BRIDGE (matches the accordion/dropdown-menu/menubar content ports):
// radix-ng's trigger/content only emit `data-state="open"|"closed"` — no
// boolean `data-open` attribute — so the tokens' `data-open:` / `data-closed:`
// rules need the bridge attributes re-exposed from each part's own open signal
// (see navigation-menu.component.ts). `data-popup-open:` in the token is inert
// here (radix-ng has no distinct popup-open concept for this component) but
// kept token-side so React/Base stay untouched.

/** Root — combined with the `cn-navigation-menu` token. */
export const NAVIGATION_MENU_ROOT_CLASS =
  "cn-navigation-menu group/navigation-menu relative flex flex-1 items-center justify-center"

/** List — combined with the `cn-navigation-menu-list` token. */
export const NAVIGATION_MENU_LIST_CLASS =
  "cn-navigation-menu-list group flex flex-1 list-none items-center justify-center"

/** Item — the `cn-navigation-menu-item` token plus the structural `relative`. */
export const NAVIGATION_MENU_ITEM_CLASS = "cn-navigation-menu-item relative"

/**
 * Trigger base — combined with the `cn-navigation-menu-trigger` token.
 * Reused by both `[uiNavigationMenuTrigger]` and any plain link styled to
 * match via `navigationMenuTriggerStyle`.
 */
export const NAVIGATION_MENU_TRIGGER_BASE =
  "cn-navigation-menu-trigger group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none [&_svg]:fill-current"

/** Trigger chevron wrapper — token + the child-svg size/fill fix (Material Symbols carry their own width/height attrs, so sizing only the span leaves a ~24px icon to overflow the row). */
export const NAVIGATION_MENU_TRIGGER_ICON_CLASS =
  "cn-navigation-menu-trigger-icon inline-flex shrink-0 [&>svg]:size-3 [&>svg]:fill-current"

/**
 * Content panel — combined with the `cn-navigation-menu-content` token.
 *
 * Structural positioning from the registry string (`top-0 left-0 w-full`,
 * `md:absolute md:w-auto`). The token's `data-[motion=...]` slide rules are
 * dead under radix-ng (it puts the animation-driving attributes on an internal
 * viewport wrapper we can't style), so the fade+zoom entrance/exit is bridged
 * locally with `data-open:` / `data-closed:` — same cost as every sibling menu
 * port: no slide-direction cue.
 */
export const NAVIGATION_MENU_CONTENT_CLASS =
  "cn-navigation-menu-content top-0 left-0 w-full md:absolute md:w-auto data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"

/** Viewport outer positioning wrapper — plain layout, no token of its own. */
export const NAVIGATION_MENU_VIEWPORT_WRAPPER_CLASS =
  "absolute top-full left-0 isolate z-50 flex justify-center"

/** Viewport panel — combined with the `cn-navigation-menu-viewport` token. */
export const NAVIGATION_MENU_VIEWPORT_CLASS =
  "cn-navigation-menu-viewport origin-top-center relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden md:w-(--radix-navigation-menu-viewport-width)"

