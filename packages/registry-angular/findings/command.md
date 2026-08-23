# command — Migration Review

## Checklist

### 1. Examples match React base?

All 7 Angular demos exist and match their React counterparts in content, structure, and behaviour:

| Angular demo | React base file | Match |
|---|---|---|
| `command-demo.ts` | `command-demo.tsx` | ✓ Inline palette, same groups/items/shortcuts/disabled state |
| `command-basic.ts` | `command-basic.tsx` | ✓ Button → `CommandDialog` with 3 plain items |
| `command-shortcuts.ts` | `command-shortcuts.tsx` | ✓ Settings group, 3 items with ⌘ shortcuts |
| `command-groups.ts` | `command-groups.tsx` | ✓ Suggestions + Settings groups, separator |
| `command-scrollable.ts` | `command-scrollable.tsx` | ✓ 5 groups, 22 items — but **not linked from docs** (see issue 2) |
| `command-dialog.ts` | `command-dialog.tsx` | ✓ ⌘J keyboard toggle, full groups — but mislabelled in docs as "Scrollable" |
| `command-rtl.ts` | `command-rtl.tsx` | ✓ Arabic labels, `dir="rtl"`, disabled item retained |

**Deviation:** `command-dialog.ts` covers the ⌘K/J dialog demo; `command-scrollable.ts` covers the long scrollable list demo. The docs `## Scrollable` section points to `command-dialog` instead of `command-scrollable`, so `command-scrollable` is a dead demo.

### 2. Docs follow the React/flat pattern?

- Frontmatter: `title`, `description`, `base: angular`, `component: true` — present. ✓
- Hero `<ComponentPreview framework="angular" name="command-demo" />` — immediately after frontmatter, before any heading. ✓
- No `## Examples` umbrella; each example is a flat `##`. ✓
- `## RTL` second-to-last; `## API Reference` last. ✓
- All `## <Name>` sections have prose. ✓
- **Structural gap:** `## Scrollable` references `command-dialog` (wrong name); `command-scrollable` has no docs section. Base page maps `## Scrollable → command-scrollable`. This is the only structural mismatch.

### 3. Available inside the registry?

- `_registry.ts:584–595` — entry exists; all 7 files on disk are listed. ✓
- `framework-components.ts:289` — `"command"` in Angular `Set`. ✓
- `content/docs/components/angular/meta.json:21` — `"command"` present. ✓
- `command-dialog.ts` file exists → `<ComponentPreview name="command-dialog" />` in docs resolves. ✓
- **BLOCKER:** No `registryDependencies` declared. `command.component.ts` imports
  `InputGroup / InputGroupAddon / InputGroupInput` (registry item `input-group`);
  `command-dialog.component.ts` imports `Dialog*` parts (registry item `dialog`).
  Missing: `registryDependencies: ["input-group", "dialog"]`. Without this, the CLI
  installation path (`npx shadcn@latest add @force-ui-angular/command`) silently omits
  both dependencies and the installed component cannot compile.

### 4. Style diff vs original p4one

| Aspect | p4one class string | registry `cn-*` token | Notes |
|---|---|---|---|
| Root background/radius | `bg-popover text-popover-foreground rounded-xl! p-1` (inline) | `cn-command` = same via `@apply` | Promoted ✓ |
| Input wrapper padding | `p-1 pb-0` (host `class:`) | `cn-command-input-wrapper` = `@apply p-1 pb-0` | Promoted ✓ |
| Input group sizing | `*:data-[slot=input-group-addon]:pl-2!` only | `cn-command-input-group` adds `h-8! rounded-lg! shadow-none!` | Registry adds explicit height/radius — a Force UI preference not in p4one |
| List scrollbar | `scrollbar-overlay` (override of upstream `no-scrollbar`) | `cn-command-list` = `scrollbar-overlay` | Promoted ✓ — p4one and registry aligned |
| Item cursor | `cursor-pointer` (deliberate override of upstream `cursor-default`) | `cn-command-item` = `cursor-pointer` | Promoted ✓ |
| Item highlight | `data-selected:bg-accent data-selected:text-accent-foreground` | `cn-command-item` = same | Promoted ✓ |
| Item width | `w-full` (explicit in p4one item classes) | absent from `cn-command-item` and inline additions | Covered by flex `align-items:stretch` in practice; no visible regression |
| Shortcut layout | `inline-flex items-center gap-1` | `cn-command-shortcut` = same | Promoted ✓ |

**Theme promotion candidates:**

| Token | Status | Candidate? |
|---|---|---|
| `cn-command-input-group` (`h-8! rounded-lg! shadow-none!`) | Already in `style-force-ui.css:418` | Already promoted |
| `scrollbar-overlay` on `cn-command-list` | Already in `style-force-ui.css:430` | Already promoted |
| `cursor-pointer` / `accent` highlight on `cn-command-item` | Already in `style-force-ui.css:446` | Already promoted |

No new promotion candidates; all Force UI divergences from upstream are already in the global token file.

## Verdict

**FAIL** — blocker: `_registry.ts` `command` entry is missing `registryDependencies: ["input-group", "dialog"]`; the documented CLI installation command will silently omit required dependencies and produce a non-compiling install. Also major: `command-scrollable.ts` demo is unreachable from docs because `## Scrollable` is mapped to `command-dialog` instead.

## Issues

1. **(blocker)** `packages/registry-angular/ui/_registry.ts:584` — `command` registry entry lacks
   `registryDependencies: ["input-group", "dialog"]`. Imports in `command.component.ts`
   (`InputGroup`, `InputGroupAddon`, `InputGroupInput`) and `command-dialog.component.ts`
   (`DialogRoot`, `DialogContent`, etc.) are from those two registry items. Compare: `combobox`
   entry at same file carries `registryDependencies: ["button", "input-group", "separator"]`.

2. **(major)** `apps/v4/content/docs/components/angular/command.mdx:## Scrollable` —
   `<ComponentPreview framework="angular" name="command-dialog" />` should be
   `name="command-scrollable"`. The `command-dialog` demo is the ⌘J keyboard-toggle example;
   `command-scrollable.ts` (290 lines, 5 groups) is the long-list scrollable demo but has
   no docs section. Both demos exist on disk; only the mapping is wrong.

3. **(minor)** `packages/registry-angular/ui/command/command.component.ts:CommandItemComponent`
   constructor — registers items with `initial.textContent?.trim()` read synchronously at
   construction time. For dynamically interpolated labels (`{{ item.label }}`), text may be
   empty at that point; the `effect` re-reads it but `textContent` is not a reactive signal, so
   a subsequent re-run only happens when `value()`, `keywords()`, or `disabled()` inputs change.
   p4one adds `afterNextRender` as a reliable second pass. Static-text items (all current demos)
   are unaffected.
```

---
