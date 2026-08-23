# table — Migration Review

## Checklist

### 1. Examples match React base?

React base has 4 demos: `table-demo`, `table-footer`, `table-actions`, `table-rtl`. Angular has the same 4 ✅.

| Demo | Match | Notes |
|---|---|---|
| `table-demo` | ✅ | Data, columns, footer row identical to React |
| `table-footer` | ✅ | Correct 3-row slice (`visible = invoices.slice(0,3)`) |
| `table-actions` | ✅ documented deviation | DropdownMenu replaced with static ghost button; Callout present in MDX |
| `table-rtl` | ✅ | Static Arabic labels + `dir="rtl"` on `<table>`; acceptable without language-selector hook |

**Cross-cutting blocker across all four demo files:** `table-demo.ts`, `table-footer.ts`, `table-actions.ts`, and `table-rtl.ts` all use `<div uiTableContainer>` in their templates but none includes `TableContainer` in their `imports` array. In Angular standalone components, a directive is not applied unless it is in scope; the `TableContainerComponent` selector `[uiTableContainer]` is silently ignored, so `cn-table-container` class and `data-slot="table-container"` are never emitted in any demo.

### 2. Docs follow the React/flat pattern?

| Check | Status |
|---|---|
| Frontmatter: `title`, `description`, `base: angular`, `component: true` | ✅ |
| Hero preview `name="table-demo"` before any heading | ✅ |
| `## Installation` with CLI + manual tabs | ✅ |
| `## Usage` import block | ❌ `TableContainer` absent while HTML snippet shows `[uiTableContainer]` |
| `## Composition` ASCII tree | ✅ |
| Flat `##` per example (no `## Examples` umbrella) | ✅ |
| `## Demo` section | ❌ duplicates the hero preview (`name="table-demo"` appears twice); violates standard |
| Example order (Footer before Actions per React base) | ❌ Angular has Actions → Footer; React base has Footer → Actions |
| `## RTL` with direction="rtl" | ✅ |
| `## API Reference` last | ✅ (correct for multi-part element-wrapper) |

### 3. Available inside the registry?

`_registry.ts` entry (line 395):
```ts
name: "table",
files: [
  { path: "ui/table/table.component.ts", type: "registry:ui" },
  { path: "ui/table/table.component.html", type: "registry:ui" },
  { path: "ui/table/table.variants.ts", type: "registry:ui" },
  { path: "ui/table/index.ts", type: "registry:ui" },
]
```
All four files exist on disk ✅. `framework-components.ts` angular Set contains `"table"` ✅. `meta.json` pages array contains `"table"` ✅. Demo files are present and top-level for `validate:previews` ✅. Correctness of demo rendering is blocked by issue #2.

### 4. Style diff vs original p4one

Every p4one inline class string is now promoted into a `cn-table-*` token in `style-force-ui.css`. No p4one-local styling remains.

| Part | p4one delta vs upstream registry | Disposition in force-ui |
|---|---|---|
| `cn-table-container` | Added `rounded-md border border-border` (framed card container) | ✅ Promoted |
| `cn-table-header` | Added `bg-muted`, explicit `border-border` | ✅ Promoted |
| `cn-table-row` | Added `border-border`, `data-[state=selected]:bg-primary-subtle`, `motion-reduce:transition-none` | ✅ Promoted |
| `cn-table-head` | Replaced 14px/foreground with `text-xs uppercase tracking-wide whitespace-nowrap text-tertiary` | ✅ Promoted |
| `cn-table-cell` | Added `whitespace-nowrap` | ✅ Promoted |
| `cn-table-footer` | Added explicit `border-border` | ✅ Promoted |
| `cn-table-caption` | Added `pb-3` | ✅ Promoted |

**Theme promotion candidates:** None — all deltas already in `style-force-ui.css`.

One discrepancy: `table.variants.ts` `tableRowVariants` is `cva("has-aria-expanded:bg-muted/50")` — it omits `cn-table-row`. The React canonical (`apps/v4/registry/bases/base/ui/table.tsx:53`) uses `cn("cn-table-row has-aria-expanded:bg-muted/50", className)`. The p4one implementation carries the full class string (now condensed to `cn-table-row`). The Angular variants file has the extra Tailwind class but not the token — the two must be combined.

## Verdict

**FAIL** — two blockers: `tableRowVariants` drops `cn-table-row` (all row styling missing), and `TableContainer` is not imported in any of the four demo files (container directive never applied).

## Issues

1. **Blocker** — `packages/registry-angular/ui/table/table.variants.ts:7`: `tableRowVariants = cva("has-aria-expanded:bg-muted/50")` is missing the `cn-table-row` base class. React canonical is `"cn-table-row has-aria-expanded:bg-muted/50"`. Every `<tr uiTableRow>` loses all border, hover, and selection styling. Fix: `cva("cn-table-row has-aria-expanded:bg-muted/50")`.

2. **Blocker** — `apps/preview-angular/src/angular/table-demo.ts`, `table-footer.ts`, `table-actions.ts`, `table-rtl.ts`: `TableContainer` is not in any component's `imports` array despite `<div uiTableContainer>` in each template. Angular silently ignores the directive; `cn-table-container` class and `data-slot` attribute are never emitted. Add `TableContainer` to `imports` in all four files.

3. **Major** — `apps/v4/content/docs/components/angular/table.mdx` `## Usage` TypeScript import block omits `TableContainer`, yet the HTML snippet beneath it shows `<div uiTableContainer>`. Users who copy the snippet cannot compile without adding it manually.

4. **Major** — `apps/v4/content/docs/components/angular/table.mdx`: `## Demo` section (line ~76) re-uses `name="table-demo"` after the hero preview, rendering the same preview twice. Remove `## Demo`; the hero preview before `## Installation` already fulfils this role.

5. **Minor** — `apps/v4/content/docs/components/angular/table.mdx`: `## Actions` precedes `## Footer`, the reverse of React base page order. Reorder to Footer → Actions.

6. **Minor** — `packages/registry-angular/ui/table/table.component.ts:62`: `TableComponent.classes()` wraps `tableVariants()` in an outer `cn()` call (`cn(tableVariants({class: this.className()}))`); all sibling parts call their variant function directly. Harmless but inconsistent — remove the outer `cn()`.
```

---
