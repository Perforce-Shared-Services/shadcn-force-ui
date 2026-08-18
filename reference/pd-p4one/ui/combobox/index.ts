// Angular port of @force-ui/combobox (radix-force-ui style).
//
// The registry component wraps the **@base-ui/react** Combobox primitive, for
// which there is NO Angular / radix-ng equivalent. So — like the `command` port
// (which reimplements cmdk) — the whole store is rebuilt from scratch:
// `combobox.filter.ts` is a faithful port of base-ui's collator "contains"
// filter (locale-aware substring, case/accent-insensitive — NOT fuzzy), and
// `ComboboxRootService` is the Angular equivalent of base-ui's store (selection
// single/multiple/none, input text, open state, filtered visibility, highlight).
//
// Exported names mirror the registry (Combobox, ComboboxInput, ComboboxContent,
// ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxCollection,
// ComboboxEmpty, ComboboxSeparator, ComboboxValue, ComboboxTrigger,
// ComboboxClear, ComboboxChips, ComboboxChip, ComboboxChipsInput). Selectors are
// the app's `[uiCombobox*]` attribute convention.
//
// Key differences from `command` (documented):
//  - Filter is collator substring "contains", not a fuzzy score → items keep
//    registration order (no re-sort).
//  - It owns SELECTION (value/defaultValue) separate from the input text, plus
//    the popup `open` state.
//  - The popup is an anchored NON-MODAL CDK overlay (`ComboboxContent`) that keeps
//    DOM focus in the input (aria-activedescendant listbox), unlike `ui/popover`
//    (radix, traps focus) and `ui/select` (radix, no free text).
//  - Highlight is NOT auto-anchored by default (base-ui `autoHighlight=false`).
//
// Reuse ([[feedback_reuse_existing_components_first]]): ComboboxInput composes
// ui/input-group (+ InputGroupButton chevron/clear); ComboboxSeparator reuses
// ui/separator; ComboboxChip's remove reuses ui/button. Hand-rolled parts are the
// base-ui primitives with no ui/* equivalent (Item/List/Group/Label/Empty/Chips).
//
// base-ui `Root` props the registry wrapper does not surface — `grid`,
// `virtualized`, `inline` — are intentionally not modelled (registry parity).
// `useComboboxAnchor` is realised by `ComboboxChips` publishing itself to the
// store's `anchorEl` (no separate hook needed).

export { ComboboxComponent as Combobox } from './combobox.component';
export { ComboboxInputComponent as ComboboxInput } from './combobox-input.component';
export {
  ComboboxContentDirective as ComboboxContent,
  ComboboxPopupComponent as ComboboxPopup,
} from './combobox-content.component';
export { ComboboxListComponent as ComboboxList } from './combobox-list.component';
export { ComboboxItemComponent as ComboboxItem } from './combobox-item.component';
export { ComboboxGroupComponent as ComboboxGroup } from './combobox-group.component';
export { ComboboxLabelComponent as ComboboxLabel } from './combobox-label.component';
export { ComboboxCollectionComponent as ComboboxCollection } from './combobox-collection.component';
export { ComboboxEmptyComponent as ComboboxEmpty } from './combobox-empty.component';
export { ComboboxSeparatorComponent as ComboboxSeparator } from './combobox-separator.component';
export { ComboboxValueComponent as ComboboxValue } from './combobox-value.component';
export { ComboboxTriggerComponent as ComboboxTrigger } from './combobox-trigger.component';
export { ComboboxClearComponent as ComboboxClear } from './combobox-clear.component';
export { ComboboxChipsComponent as ComboboxChips } from './combobox-chips.component';
export { ComboboxChipComponent as ComboboxChip } from './combobox-chip.component';
export { ComboboxChipsInputComponent as ComboboxChipsInput } from './combobox-chips-input.component';

// The collator filter, exported for callers passing a custom `filter` or matching
// elsewhere, and the store for advanced compositions.
export { getComboboxFilter, comboboxContains } from './combobox.filter';
export type { ComboboxContains, ComboboxFilter } from './combobox.filter';
export { ComboboxRootService } from './combobox-root.service';
export type {
  ComboboxItemState,
  ComboboxSelectionMode,
  ComboboxAutoHighlight,
} from './combobox-root.service';
