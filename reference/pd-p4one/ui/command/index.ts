// Angular port of @force-ui/command (radix-force-ui style).
//
// The registry component is built on **cmdk** (https://github.com/pacocoursey/cmdk),
// for which there is NO radix-ng or Angular CDK primitive. So — unlike every
// other compound port in this folder (select/dialog/dropdown-menu wrap a
// radix-ng primitive) — the command palette's behaviour is reimplemented from
// scratch: `command.score.ts` is a faithful port of cmdk's `command-score`
// fuzzy filter, and `CommandRootService` is the Angular equivalent of cmdk's
// store (search text, item registry, per-item scores, score-ordered visibility,
// group hiding, highlight navigation, Enter/click activation).
//
// Exported names mirror the registry (Command, CommandInput, CommandList,
// CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator,
// CommandDialog). Selectors are the app's `[uiCommand*]` attribute convention
// (element `ui-command-dialog` for the overlay).
//
// Behavioural parity with cmdk (documented):
//  - Fuzzy filter is byte-for-byte cmdk's scorer; items sort by descending score
//    while searching, matching cmdk's re-sort. Items are NOT physically
//    re-ordered in the DOM (cmdk mutates DOM nodes); we drive visibility +
//    highlight order from the score, which yields the same visible ordering via
//    per-item `[hidden]`. Set `shouldFilter=false` to filter externally.
//  - Keyboard: ArrowUp/Down (wrap), Home/End, Enter — owned by the root so they
//    work from the input or the list. Pointer-move highlights (cmdk).
//  - `CommandEmpty` shows only when a non-empty search yields no items.
//  - `CommandSeparator` hides while searching (cmdk).
//
// CommandDialog divergence: the app's dialog is CDK-Dialog/service based, so
// CommandDialog is a controlled element opening its projected content via
// `RdxDialogService` (needs `provideRdxDialogConfig()` in app providers). See
// its JSDoc.

export { CommandComponent as Command } from './command.component';
export { CommandInputComponent as CommandInput } from './command-input.component';
export { CommandListComponent as CommandList } from './command-list.component';
export { CommandEmptyComponent as CommandEmpty } from './command-empty.component';
export { CommandGroupComponent as CommandGroup } from './command-group.component';
export { CommandItemComponent as CommandItem } from './command-item.component';
export { CommandShortcutComponent as CommandShortcut } from './command-shortcut.component';
export { CommandSeparatorComponent as CommandSeparator } from './command-separator.component';
export { CommandDialogComponent as CommandDialog } from './command-dialog.component';

// The cmdk-parity fuzzy scorer, exported for callers passing a custom `filter`
// or reusing the match ranking elsewhere.
export { commandScore } from './command.score';
export { CommandRootService } from './command-root.service';
export type { CommandItemState } from './command-root.service';
