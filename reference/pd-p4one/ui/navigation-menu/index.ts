// Angular port of @force-ui/navigation-menu (radix-force-ui style), built on
// @radix-ng/primitives/navigation-menu. Exported names mirror the registry
// source; selectors follow this app's `[ui<Name>]` convention (accordion,
// tabs) since this primitive is its own package (not the shared CDK-menu
// family dropdown-menu/context-menu/menubar compose).
//
// PARITY GAPS (documented, not patched — see source comments for detail):
//  - `viewport=false` (rendering `NavigationMenuContent` inline under its
//    trigger instead of portalling into a shared viewport) has no code path
//    in `@radix-ng/primitives`: `RdxNavigationMenuContentDirective` only ever
//    registers its `TemplateRef` with the root's viewport callback. A
//    `[uiNavigationMenuViewport]` is effectively required.
//  - Entrance/exit slide motion (`data-[motion=...]`) has no element to
//    attach to — radix-ng's viewport puts `data-motion`/`data-state` on an
//    internal wrapper `<div>` it creates via `Renderer2`, architecturally
//    separate from the styled content `<div>` this port exposes. A working
//    fade+zoom (`data-open`/`data-closed`, the same bridge used by
//    dropdown-menu/menubar/select) replaces it — see
//    `navigation-menu-content.component.ts`.
//  - `NavigationMenuSub` (nested/vertical sub-menus) — `RdxNavigationMenuSubDirective`
//    exists upstream but is unported here; no current P4 One surface needs a
//    nested navigation menu. Add a `[uiNavigationMenuSub]` wrapper the same
//    way as this root if that changes.
//  - The active-trigger indicator never slides — confirmed live, see
//    `navigation-menu-indicator.component.ts`: radix-ng computes its position
//    from raw `offsetLeft`, which resolves to `0` for every trigger once an
//    intervening ancestor (the registry's own `[uiNavigationMenuItem]`,
//    `position: relative`) becomes its `offsetParent`.
//  - `RdxNavigationMenuIndicatorDirective`/`RdxNavigationMenuTriggerDirective`
//    locate each other via raw `querySelectorAll('[rdxNavigationMenuTrigger]')`
//    / `closest('[rdxNavigationMenuItem]')` DOM queries against radix-ng's own
//    un-renamed selectors — `navigation-menu-trigger.component.ts` and
//    `navigation-menu-item.directive.ts` each add an inert static host
//    attribute purely so those lookups still find our elements.
//  - The trigger's `aria-controls` (a `RdxNavigationMenuTriggerDirective` host
//    binding, not ours) points at a panel id that doesn't exist in the DOM
//    until that panel has been opened once (content mounts lazily into the
//    shared viewport) — flagged by the Storybook a11y addon as `aria-valid-
//    attr-value` "Inconclusive" (not a Violation) before first open. See
//    `navigation-menu-trigger.component.ts` for why this isn't patched.
export {
  NavigationMenuRootDirective as NavigationMenu,
  NAVIGATION_MENU_ROOT_CLASS,
} from './navigation-menu-root.directive';
export {
  NavigationMenuListDirective as NavigationMenuList,
  NAVIGATION_MENU_LIST_CLASS,
} from './navigation-menu-list.directive';
export {
  NavigationMenuItemDirective as NavigationMenuItem,
  NAVIGATION_MENU_ITEM_CLASS,
} from './navigation-menu-item.directive';
export {
  NavigationMenuTriggerComponent as NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu-trigger.component';
export {
  NavigationMenuContentAnchorDirective as NavigationMenuContentAnchor,
  NavigationMenuContentComponent as NavigationMenuContent,
  NAVIGATION_MENU_CONTENT_CLASS,
} from './navigation-menu-content.component';
export {
  NavigationMenuLinkDirective as NavigationMenuLink,
  NAVIGATION_MENU_LINK_CLASS,
} from './navigation-menu-link.directive';
export {
  NavigationMenuIndicatorComponent as NavigationMenuIndicator,
  NAVIGATION_MENU_INDICATOR_CLASS,
} from './navigation-menu-indicator.component';
export {
  NavigationMenuViewportComponent as NavigationMenuViewport,
  NAVIGATION_MENU_VIEWPORT_CLASS,
} from './navigation-menu-viewport.component';
