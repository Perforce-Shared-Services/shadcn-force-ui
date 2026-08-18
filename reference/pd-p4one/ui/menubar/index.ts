// Angular port of @force-ui/menubar (radix-force-ui style), built on
// @radix-ng/primitives/menubar (CDK MenuBar). Exported names mirror the
// registry source; selectors follow this app's `[rdx<Name>]` menu-family
// convention (dropdown-menu, context-menu) rather than radix-ng's own
// PascalCase selectors on the underlying primitives (`[RdxMenuBarRoot]`, …),
// which are only ever referenced via `hostDirectives`, never written in a
// consuming template.
//
// Parity gaps (no radix-ng equivalent — intentionally omitted): `MenubarMenu`
// / `MenubarPortal` — the trigger directive owns the CDK overlay and the bar
// itself arbitrates which panel is open, so no per-menu root/portal wrapper is
// needed; `MenubarSub` / `MenubarSubTrigger` / `MenubarSubContent` — radix-ng
// ships no nested-submenu directives (same gap as dropdown-menu/context-menu).
//
// Documented (not patched) radix-ng upstream gaps — see the source comments:
// `MenubarCheckboxItem` / `MenubarRadioItem` are composed against the GENERIC
// `@radix-ng/primitives/menu` directives instead of the menubar package's own
// wrappers, which drop the `onCheckedChange` / `onValueChange` outputs;
// `MenubarRadioGroup` has no `value`/`(valueChange)` aggregation (bare
// `CdkMenuGroup` semantics only) — consumers track selection per item.
export { MenubarRootDirective as Menubar, MENUBAR_ROOT_CLASS } from './menubar-root.directive';
export { MenubarTriggerDirective as MenubarTrigger, MENUBAR_TRIGGER_CLASS } from './menubar-trigger.directive';
export {
  MenubarContentDirective as MenubarContent,
  MenubarGroupDirective as MenubarGroup,
  MenubarLabelDirective as MenubarLabel,
  MenubarSeparatorDirective as MenubarSeparator,
  MenubarShortcutDirective as MenubarShortcut,
  MENUBAR_CONTENT_CLASS,
} from './menubar-content.component';
export {
  MenubarItemDirective as MenubarItem,
  MENUBAR_ITEM_CLASS,
  type MenubarItemVariant,
} from './menubar-item.component';
export {
  MenubarCheckboxItemComponent as MenubarCheckboxItem,
  MenubarRadioGroupDirective as MenubarRadioGroup,
  MenubarRadioItemComponent as MenubarRadioItem,
  MENUBAR_SELECTABLE_ITEM_CLASS,
} from './menubar-selectable.component';
