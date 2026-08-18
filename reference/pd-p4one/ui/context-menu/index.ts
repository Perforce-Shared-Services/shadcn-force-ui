// Angular port of @force-ui/context-menu (radix-force-ui style), built on
// @radix-ng/primitives/context-menu (CDK Menu). Exported names mirror the
// registry source; selectors keep the native `[rdxContextMenu*]` names so the
// radix CdkMenu wiring + DI resolve. Sibling of dropdown-menu — same parts,
// triggered by right-click (`(contextmenu)`) instead of a button activation.
//
// Parity gaps (no radix-ng equivalent — intentionally omitted): `ContextMenu`
// (root) and `ContextMenuPortal` — the trigger directive owns the CDK overlay,
// so no root/portal is needed; `ContextMenuSub` / `ContextMenuSubTrigger` /
// `ContextMenuSubContent` — radix-ng ships no nested-submenu directives.
export { ContextMenuTriggerDirective as ContextMenuTrigger } from './context-menu-trigger.directive';
export {
  ContextMenuContentDirective as ContextMenuContent,
  ContextMenuGroupDirective as ContextMenuGroup,
  ContextMenuLabelDirective as ContextMenuLabel,
  ContextMenuSeparatorDirective as ContextMenuSeparator,
  ContextMenuShortcutDirective as ContextMenuShortcut,
  CONTEXT_MENU_CONTENT_CLASS,
} from './context-menu-content.component';
export {
  ContextMenuItemDirective as ContextMenuItem,
  CONTEXT_MENU_ITEM_CLASS,
  type ContextMenuItemVariant,
} from './context-menu-item.component';
export {
  ContextMenuCheckboxItemComponent as ContextMenuCheckboxItem,
  ContextMenuRadioGroupDirective as ContextMenuRadioGroup,
  ContextMenuRadioItemComponent as ContextMenuRadioItem,
  CONTEXT_MENU_SELECTABLE_ITEM_CLASS,
} from './context-menu-selectable.component';
