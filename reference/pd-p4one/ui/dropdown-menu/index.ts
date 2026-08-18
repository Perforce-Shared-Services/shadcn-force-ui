// Angular port of @force-ui/dropdown-menu (radix-force-ui style), built on
// @radix-ng/primitives/dropdown-menu (CDK Menu). Exported names mirror the
// registry source; selectors keep the native `[rdxDropdownMenu*]` names so the
// radix CdkMenu wiring + DI resolve.
//
// Parity gaps (no radix-ng equivalent — intentionally omitted): `DropdownMenu`
// (root) and `DropdownMenuPortal` — the trigger directive owns the CDK overlay,
// so no root/portal is needed; `DropdownMenuSub` / `DropdownMenuSubTrigger` /
// `DropdownMenuSubContent` — radix-ng ships no nested-submenu directives.
export { DropdownMenuTriggerDirective as DropdownMenuTrigger } from './dropdown-menu-trigger.directive';
export {
  DropdownMenuContentDirective as DropdownMenuContent,
  DropdownMenuGroupDirective as DropdownMenuGroup,
  DropdownMenuLabelDirective as DropdownMenuLabel,
  DropdownMenuSeparatorDirective as DropdownMenuSeparator,
  DropdownMenuShortcutDirective as DropdownMenuShortcut,
  DROPDOWN_MENU_CONTENT_CLASS,
} from './dropdown-menu-content.component';
export {
  DropdownMenuItemDirective as DropdownMenuItem,
  DROPDOWN_MENU_ITEM_CLASS,
  type DropdownMenuItemVariant,
} from './dropdown-menu-item.component';
export {
  DropdownMenuCheckboxItemComponent as DropdownMenuCheckboxItem,
  DropdownMenuRadioGroupDirective as DropdownMenuRadioGroup,
  DropdownMenuRadioItemComponent as DropdownMenuRadioItem,
  DROPDOWN_MENU_SELECTABLE_ITEM_CLASS,
} from './dropdown-menu-selectable.component';
