# resizable — Migration Review

## Checklist

### 1. Examples match React base?

Four React base examples exist (`resizable-demo`, `resizable-handle`, `resizable-vertical`,
`resizable-rtl`); four Angular demos exist under the same names. Comparison:

| Demo | Match | Deviation |
|---|---|---|
| `resizable-demo` | ✓ | React `orientation="horizontal"` → Angular `direction="horizontal"` (API difference, not a bug) |
| `resizable-handle` | ✓ | None |
| `resizable-vertical` | ✓ | None |
| `resizable-rtl` | Partial | React uses `useTranslation` selector supporting ar/he/en; Angular uses static Arabic labels only. Same visual state; Hebrew omitted. |

All three clean demos replicate content, panel-size ratios, `withHandle` placement, and
surrounding container classes (`max-w-sm rounded-lg border`, `min-h-[200px]`) exactly.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/resizable.mdx` structure:

- Frontmatter: `title`, `description`, `base: angular`, `component: true` ✓
- Hero `<ComponentPreview framework="angular" name="resizable-demo" previewClassName="h-80" />`
  before any heading ✓
- `## Installation` (cli + manual tabs) ✓
- `## Usage` ✓
- `## Composition` (optional, present) ✓
- Flat `## Vertical` → `## Handle` → `## RTL` → `## API Reference` ✓ (no `## Examples` umbrella)
- `## RTL` second-to-last ✓; `## API Reference` last ✓
- **Gap**: `## RTL` has no `<Callout>` documenting the Hebrew/language-selector deviation; the
  docs standard requires an inline note for any behavioral deviation from the React example.

### 3. Available inside the registry?

- `packages/registry-angular/ui/_registry.ts:406–414`: entry present, `name: "resizable"`,
  `type: "registry:ui"`, files list contains all four on-disk files.
- All four files verified on disk:
  `ui/resizable/resizable.component.ts`, `resizable.component.html`,
  `resizable.variants.ts`, `index.ts`.
- `apps/v4/lib/framework-components.ts:427`: `"resizable"` in Angular set ✓
- `apps/v4/content/docs/components/angular/meta.json`: `"resizable"` in pages array ✓
- All four demo files present in `apps/preview-angular/src/angular/` ✓;
  `validate:previews` will resolve them.

### 4. Style diff vs original p4one

| Item | p4one | Registry port | Delta |
|---|---|---|---|
| Group base class | `flex h-full w-full data-[panel-group-direction=vertical]:flex-col` (literal string) | `cn-resizable-panel-group flex h-full w-full data-[panel-group-direction=vertical]:flex-col` (cva) | Token prefix added; functionally identical |
| Group host attribute | `'data-panel-group': ''` present | **absent** | Registry omits `data-panel-group=""`; upstream React sets it |
| Handle base class | `RESIZABLE_HANDLE_CLASS` literal (no token prefix) | `cn-resizable-handle …` (cva) | Token prefix added; utilities identical |
| Focus ring | `focus-visible:ring-3 focus-visible:ring-ring/50` | same | ✓ |
| Cursor | `cursor-col-resize touch-none` / `aria-[orientation=horizontal]:cursor-row-resize` | same | ✓ |
| Handle icon | inline `z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border` | cva `cn-resizable-handle-icon z-10 flex shrink-0` + css `@apply bg-border h-6 w-1 rounded-lg` | Correctly tokenised |

**Theme promotion candidates**

| Token | Currently in style-force-ui.css | Candidate |
|---|---|---|
| `cn-resizable-handle-icon` | **Yes** — `@apply bg-border h-6 w-1 rounded-lg` | Already promoted |
| `cn-resizable-handle` | No — all styling inline as utilities | Promote if per-theme handle colour/width override is needed |
| `cn-resizable-panel-group` | No — no isolatable style properties | Not a candidate |

## Verdict

**PASS-with-notes** — implementation is behaviorally correct, fully registered, and docs follow
the flat-`##` structure. Two minor gaps need follow-up.

## Issues

1. **(minor)** `data-panel-group=""` attribute missing from `[uiResizablePanelGroup]` host
   (`resizable.component.ts` host block). p4one sets `'data-panel-group': ''`; the registry
   port omits it. External CSS or test selectors targeting `[data-panel-group]` will fail.

2. **(minor)** RTL example deviation not disclosed with a `<Callout>` in
   `apps/v4/content/docs/components/angular/resizable.mdx` `## RTL` section.
   React supports ar/he/en via language-selector; Angular demo is static Arabic only.
   Per `docs/component-docs-standard.md`, deviations require an inline note.

3. **(note)** `cn-resizable-panel-group` and `cn-resizable-handle` are emitted as class
   names by cva (`resizable.variants.ts`) but have no rules in `style-force-ui.css`.
   Intentional and documented via comment in `resizable.variants.ts`; no visual impact.
   Theme-level customisation of the handle is not possible via the CSS token layer today.
```

---
