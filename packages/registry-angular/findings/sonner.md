# sonner — Migration Review

## Checklist

### 1. Examples match React base?

The canonical React reference is `apps/v4/examples/radix/sonner-{demo,types,description,position}.tsx` (no `base/sonner-*.tsx` exists; `base` Set in `framework-components.ts` does not include sonner).

**Missing Angular demos (vs radix reference):**
- `sonner-description` — `radix/sonner-description.tsx` exists; no Angular port in `apps/preview-angular/src/angular/` and no `## Description` section in the MDX.
- `sonner-position` — `radix/sonner-position.tsx` exists; no Angular port and no `## Position` section.

**Material deviations in shared demos:**

| Demo | React radix | Angular |
|---|---|---|
| `sonner-demo` | `toast("Event has been created", { description, action: { label: "Undo" } })` — includes inline Undo action | `toast("Version saved", { description })` — Force-specific copy, no action; action moved to its own `sonner-action.ts` file |
| `sonner-types` | 6 separate buttons (Default / Success / Info / Warning / Error / Promise) | 1 button that fires all types in sequence; toaster mounted with `expand` | 

The `sonner-demo` deviation is an intentional Force adaptation (action promoted to its own example). The `sonner-types` structural change is not documented in the MDX or in `DOCUMENTED_EXCEPTIONS` in the parity-check script.

**Angular extras not in radix:** `sonner-action`, `sonner-cancel`, `sonner-success`, `sonner-error`, `sonner-promise`, `sonner-rtl` — all Force-specific and well-matched to what their component comment files describe.

---

### 2. Docs follow the React/flat pattern?

Checking `apps/v4/content/docs/components/angular/sonner.mdx` against `docs/component-docs-standard.md`:

| Rule | Status |
|---|---|
| Frontmatter: `title`, `description`, `base`, `component: true` | ✓ |
| Frontmatter `links.doc` | ✗ Missing — radix/aria pages carry `links.doc: https://sonner.emilkowal.ski` |
| Hero `<ComponentPreview framework="angular" name="sonner-demo" />` before any heading | ✓ |
| `## Installation` with CLI + manual tabs | ✓ |
| `## Usage` with import and template snippets | ✓ |
| Flat `##` per example (no `## Examples` umbrella) | ✓ — `## Success`, `## Error`, `## With Action`, `## With Cancel`, `## Promise`, `## Types` |
| Each `##` section has prose | ✓ |
| `## RTL` second-to-last, links to `/docs/rtl`, previews `sonner-rtl` | ✓ |
| `## API Reference` last | ✓ |
| API Reference form: link-out because radix page links out | ✗ — Angular page has a hand-written `\| Prop \| Type \| Default \|` table instead of linking to ngx-sonner docs. Per the standard: "if the React page links out, the Angular page links out to that framework's own primitive docs rather than growing a hand-written props table." |

---

### 3. Available inside the registry?

**`packages/registry-angular/ui/_registry.ts` (lines 656–668):**
```
name: "sonner", type: "registry:ui", dependencies: ["ngx-sonner"],
files: [
  "ui/sonner/index.ts",
  "ui/sonner/sonner.component.html",
  "ui/sonner/sonner.component.ts",
  "ui/sonner/sonner.icons.ts",
  "ui/sonner/sonner.variants.ts",
]
```
All 5 files confirmed on disk. ✓

**`apps/v4/lib/framework-components.ts`:** `"sonner"` present in the `angular` Set. ✓

**`apps/v4/content/docs/components/angular/meta.json`:** `"sonner"` present at line 54. ✓

**Preview demo files:** All 8 `sonner-*.ts` files in `apps/preview-angular/src/angular/` are valid Angular standalone components with a `default` export — they will resolve for `validate:previews`. ✓

---

### 4. Style diff vs original p4one

Source: `/opt/dev/pd-p4one/app/src/app/ui/sonner/sonner.component.ts`

| Aspect | p4one | Registry | Functional delta |
|---|---|---|---|
| `--normal-bg` | `var(--surface)` | `var(--surface)` | None |
| `--normal-text` | `var(--surface-foreground)` | `var(--surface-foreground)` | None |
| `--normal-border` | `var(--border)` | `var(--border)` | None |
| `--border-radius` | `var(--radius)` | `var(--radius)` | None |
| `--width` | `312px` | `312px` | None |
| Rich color vars (all 24 `--ngx-sonner-toast-*`) | Present, in a separate `RICH_COLOR_STYLE` const | Present, inlined into `DEFAULT_STYLE` | None — functionally identical |
| `toast` class | `cn-toast !items-start` | `cn-toast !items-start` | None |
| `actionButton` | `!bg-primary !text-primary-foreground` | Same | None |
| `cancelButton` | `!bg-secondary !text-secondary-foreground` | Same | None |
| `closeButton` default | `true` | `true` | None |
| `hostClass` | `cn('toaster group', className())` | `cn(sonnerVariants(), className())` where `sonnerVariants()` returns `"toaster group"` | None |
| Icon source | `@material-symbols/svg-400` via webpack `?raw` | Inline SVG strings in `sonner.icons.ts` | Same paths/icons — registry adapts for no-webpack context |
| Template | Inline | External `sonner.component.html` | Structural only |

**Theme promotion candidates:**

| Item | p4one-local? | Candidate? | Notes |
|---|---|---|---|
| `cn-toast { @apply rounded-2xl }` | No (same in registry) | Already promoted | Present in `style-force-ui.css` line 1317 |
| `--normal-bg/text/border` token mapping | No (same) | No | ngx-sonner-internal hooks; component-level only |
| `--width: 312px` | No (same) | No | ngx-sonner prop; Force spec value; component-level |
| Rich color vars | No (same) | No | ngx-sonner override hooks; no global CSS utility needed |

No new promotions needed. The one relevant global token (`cn-toast`) is already in `style-force-ui.css`.

---

## Verdict

**PASS-with-notes** — implementation is correct, registry wiring is complete, and the docs follow the flat-`##` pattern. Two parity gaps (`sonner-description`, `sonner-position`) and two docs-standard deviations (hand-written API table, missing `links.doc`) need follow-up but don't block usage.

---

## Issues

1. **[minor]** `sonner-description` demo missing — `radix/sonner-description.tsx` has no Angular equivalent in `apps/preview-angular/src/angular/` and no `## Description` section in `angular/sonner.mdx`.

2. **[minor]** `sonner-position` demo missing — same gap as above; `radix/sonner-position.tsx` unported.

3. **[minor]** `sonner-types` behavioral deviation undocumented — Angular fires all types in one click (with `expand`); radix has 6 individual buttons. Neither the `angular/sonner.mdx` `## Types` prose nor `DOCUMENTED_EXCEPTIONS` in the parity script records this. Per the standard, a deviation must be noted inline or registered in the script.

4. **[minor]** `## API Reference` is a hand-written `| Prop | Type | Default |` table. Per `docs/component-docs-standard.md` §API reference, since `radix/sonner.mdx` links out (`See the Sonner API Reference...`), the Angular page should link out to ngx-sonner docs instead. The table will drift silently as ngx-sonner evolves.

5. **[minor]** Frontmatter missing `links.doc` — both `radix/sonner.mdx` and `aria/sonner.mdx` carry `links.doc: https://sonner.emilkowal.ski`; `angular/sonner.mdx` omits it. Causes the doc-link affordance to be absent from the Angular page header.

---
