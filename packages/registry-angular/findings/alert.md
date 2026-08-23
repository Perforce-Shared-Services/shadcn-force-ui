# alert — Migration Review

## Checklist

### 1. Examples match React base?

React base has 7 example files: `alert-demo`, `alert-basic`, `alert-colors`, `alert-destructive`,
`alert-action`, `alert-rtl`, `alert-status`. Angular has 8 (all 7 plus `alert-variants`).

**Material deviations:**

- **`alert-demo.ts` (hero)**: React shows two stacked alerts ("Payment successful" + "New feature
  available") with icon children, in a `gap-4` grid. Angular shows a single `<div uiAlert>` with
  "Default alert" / "Something you should know." and no icon attribute. Content, quantity, and icon
  usage all differ.
- **`alert-rtl.ts`**: React is dynamic (en/ar/he via `useTranslation`); Angular is static Arabic
  only. Arabic text matches the React `ar` locale exactly. Acceptable framework deviation — noted.
- **`alert-variants.ts`**: Angular-only extra; no React base counterpart. Referenced by the docs
  `## Variants` section that is also Angular-only.

### 2. Docs follow the React/flat pattern?

**Passes:** flat `##` per example; `## RTL` second-to-last; `## API Reference` last; hero preview
before first heading; CodeTabs installation block present.

**Gaps:**
- `## Composition` section absent (present in `base/alert.mdx`).
- Hero preview missing `previewClassName="h-auto sm:h-72 p-6"` (minor visual frame difference).
- API Reference has only `### AlertComponent`; missing `### AlertTitle`, `### AlertDescription`,
  `### AlertAction` sub-sections (each with a `class` prop row, as in base page).
- `live` input (`"auto"|"off"|"polite"|"assertive"`, default `"auto"`) is implemented in
  `alert.component.ts` lines 44 + 62–65 but absent from the API table.

### 3. Available inside the registry?

`_registry.ts` entry at line 194: 5 files listed (`alert.variants.ts`, `alert.icons.ts`,
`alert.component.ts`, `alert.component.html`, `index.ts`) — all match disk exactly ✓.
No `dependencies`/`registryDependencies` needed (cva is package-level; Angular is stdlib) ✓.
`framework-components.ts` line 386 ✓. `meta.json` line 5 ✓. All 8 demos on disk ✓.

### 4. Style diff vs original p4one

| Aspect | p4one (`alert.variants.ts`) | Global CSS (`cn-alert`, line 21) |
|---|---|---|
| Grid activation | `has-[>[data-slot=alert-icon]]:grid-cols-[auto_1fr]` | `has-[>svg]:grid-cols-[auto_1fr]` |
| Icon row-span | `[&>[data-slot=alert-icon]]:row-span-2` | `*:[svg]:row-span-2` |
| Column gap | `has-[>[data-slot=alert-icon]]:gap-x-2` | `has-[>svg]:gap-x-2` |
| Border color | `border border-border` (explicit) | `border` only |
| Link underline | `[&_a]:underline` on title + desc always | Only in status/destructive variant classes |

**Root cause of grid mismatch:** `alert.component.html` wraps the icon svg in
`<span data-slot="alert-icon">`. CSS `:has(> svg)` and `> svg` selectors require a *direct* svg
child of the alert host; they do not match the wrapper span. Result: `grid-cols-[auto_1fr]`,
`gap-x-2`, and icon `row-span-2` are never applied when an icon is shown.

**Partial mitigation:** `AlertTitle` and `AlertDescription` both append
`group-has-[>[data-slot=alert-icon]]/alert:col-start-2` (data-slot, correct). This forces title +
description to column 2 via implicit grid. But without `grid-cols-[auto_1fr]`, the content column
auto-sizes to text width rather than `1fr`, so it does not stretch to fill the alert.

**Theme promotion candidates**

| Token | Promote? | Rationale |
|---|---|---|
| `has-[>[data-slot=alert-icon]]:grid-cols-[auto_1fr]` | **Yes** — update `cn-alert` | Covers React direct-svg and Angular wrapped-span; `has-[>svg]` only covers React |
| `[&>[data-slot=alert-icon]]:row-span-2`, `:gap-x-2` | **Yes** — update `cn-alert` | Same root cause |
| `[&_a]:underline` on base (not variant-only) | Evaluate | WCAG 1.4.1: default-variant links are unstyled in registry |
| `border-border` explicit | No | p4one app-local CSS workaround; not relevant to registry |

## Verdict

**PASS-with-notes.** Registry entry complete; all demos exist; docs structure follows the flat-heading
standard. Two issues need resolution: the `alert-demo.ts` hero content deviates materially from the
React canonical, and the global `cn-alert` icon selectors don't match Angular's icon wrapper pattern.

## Issues

1. **(major)** `style-force-ui.css:21` — `cn-alert` icon-layout selectors use `:has(> svg)` /
   `> svg`, but `alert.component.html` wraps svg in `<span data-slot="alert-icon">`. Direct svg
   selectors never match: `grid-cols-[auto_1fr]`, `gap-x-2`, and icon `row-span-2` all silently
   no-op. Content column stays auto-sized, not `1fr`. Fix: replace `has-[>svg]` with
   `has-[>[data-slot=alert-icon]]` and `*:[svg]:row-span-2` with `[&>[data-slot=alert-icon]]:row-span-2`
   in `cn-alert` (or add both forms for dual-framework compat).

2. **(minor)** `alert-demo.ts` — Hero shows one generic "Default alert"; React canonical shows two
   annotated alerts (payment + feature) with icons. Align content and structure.

3. **(minor)** `alert.mdx` — Missing `## Composition` section; missing `### AlertTitle`,
   `### AlertDescription`, `### AlertAction` API sub-sections; `live` input absent from the table.

4. **(minor)** `alert.component.ts:85` — `AlertTitle` applies both `cn-alert-title`
   (`group-has-[>svg]/alert:col-start-2`, no-op for Angular) and the data-slot version explicitly.
   Harmless duplication, but reflects the upstream token mismatch in issue 1.
```

---
