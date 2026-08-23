# spinner — Migration Review

## Checklist

### 1. Examples match React base?

All 10 demo filenames match `apps/v4/examples/base/spinner-*.tsx` exactly. Material deviations:

**`spinner-demo.ts` (major):** Angular renders bare `<span uiSpinner></span>`. React base
wraps in `Item`/`ItemMedia`/`ItemContent`/`ItemTitle` with "Processing payment…  $100.00".
The hero preview shows nothing about contextual use.

**`spinner-colors.ts` (major):** Angular shows 3 colors (`default`, `primary`, `onPrimary`);
React shows 4 — the `inherit` variant is missing. Also: Angular adds `size="md"` on all
swatches (React uses default `sm`), uses `gap-4` (React: `gap-6`), `rounded-lg` (React:
`rounded-md`).

**`spinner-button.ts` (major):** React shows 3 `disabled size="sm"` buttons each with
`<Spinner data-icon="inline-start">` in `flex-col gap-4` — demonstrating spinner placement
via the data-icon slot. Angular shows 2 `[loading]="true"` buttons (Button's built-in
prop) + 1 ghost button with an explicit spinner in `flex-wrap gap-3`. The demo teaches
Button's loading API, not spinner placement.

**`spinner-sizes.ts` (minor):** Angular adds `color="primary"` on every size swatch;
React uses the default color. Better readability, but deviates from base.

**`spinner-custom.ts`:** Demo exists at
`apps/preview-angular/src/angular/spinner-custom.ts` (inline SVG, Angular-idiomatic) but
the Angular docs page has no `## Customization` section referencing it. The file is an
orphan from the docs perspective.

**`spinner-rtl.ts`:** Static Arabic label + `dir="rtl"` instead of the React
`useTranslation` switcher. This is correct Angular preview convention. ✅

**`spinner-badge.ts`, `spinner-input-group.ts`, `spinner-empty.ts`, `spinner-size.ts`:**
All faithful to the React base. ✅

---

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/spinner.mdx` mostly follows the standard:
- Frontmatter: `title`, `description`, `base: angular`, `component: true` ✅
- Hero `<ComponentPreview framework="angular" name="spinner-demo" />` immediately after
  frontmatter ✅
- `## Installation` with CLI + manual `<CodeTabs>` ✅
- `## Usage` with import snippet and `aria-hidden` / `animate-spinner` setup note ✅
- Flat `##` per example — no `## Examples` umbrella ✅
- `## RTL` + `## API Reference` closing pair ✅

**Gaps:**
- No `## Customization` section — `spinner-custom.ts` exists but is unreferenced in the
  docs. Per docs standard, every demo file needs a `##` section.
- `## Button` and `## Badge` sections have no prose. The React base page explains the
  `data-icon="inline-start"` placement for both. Docs standard: "No prose-free previews."
- `## API Reference` heading and `### SpinnerComponent` sub-heading differ from the React
  base (`## API` / `### Spinner`). Angular heading matches the written standard better;
  minor cosmetic inconsistency.

---

### 3. Available inside the registry?

| Check | Result |
|---|---|
| `_registry.ts` entry at line 268 | ✅ |
| Files listed: `spinner.variants.ts`, `spinner.component.ts`, `spinner.component.html`, `index.ts` | ✅ all on disk |
| `framework-components.ts` angular Set | ✅ `"spinner"` present |
| `meta.json` pages array | ✅ `"spinner"` at index 55 |
| `validate:previews` — all MDX `name=` values resolve to demo files | ✅ (docs does not reference `spinner-custom`, so no broken resolution) |

The orphan `spinner-custom.ts` is not broken — it simply never appears in the docs.
`example-parity:check` will report the count gap (9 docs-referenced demos vs 10 base files).

---

### 4. Style diff vs original p4one

p4one (`/opt/dev/pd-p4one/app/src/app/ui/spinner/spinner.variants.ts`) inlines Tailwind
utilities directly in the CVA map. The Angular registry delegates to `cn-*` tokens that
expand to identical values in `style-force-ui.css`:

| Axis | p4one class | Registry token | `style-force-ui.css` expansion |
|---|---|---|---|
| color default | `text-muted-foreground` | `cn-spinner-color-default` | `@apply text-muted-foreground` |
| color primary | `text-primary` | `cn-spinner-color-primary` | `@apply text-primary` |
| color onPrimary | `text-primary-foreground` | `cn-spinner-color-onPrimary` | `@apply text-primary-foreground` |
| color inherit | `text-current` | `cn-spinner-color-inherit` | `@apply text-current` |
| size xs | `size-3` | `cn-spinner-size-xs` | `@apply size-3` |
| size sm | `size-4` | `cn-spinner-size-sm` | `@apply size-4` |
| size md | `size-6` | `cn-spinner-size-md` | `@apply size-6` |
| size lg | `size-10` | `cn-spinner-size-lg` | `@apply size-10` |

Other structural differences (not style):
- p4one uses a separate `spinner.icons.ts` with `import svg from '…svg?raw'`; Angular
  registry inlines the SVG string in `spinner.component.ts`. Same glyph, different import
  mechanism — the `?raw` webpack rule is an app concern the registry cannot assume.
- p4one uses an inline component template; Angular registry extracts to
  `spinner.component.html`. No behavioral difference.

**Theme promotion candidates:** None. All `cn-spinner-*` classes already exist in
`style-force-ui.css` (lines 841–869). The one open upstream item is adding
`--animate-spinner: spin 500ms linear infinite` to `style-force-ui.css` `@theme` (currently
only in `apps/preview-shared/styles.css:444` and p4one's local `tailwind.css`). Tracked in
DIVERGENCES.md §spinner-2.

---

## Verdict

**PASS-with-notes** — registry wiring, component implementation, and variant/token coverage
are all correct. Three demos deviate materially from the React base (bare hero, missing
`inherit` color swatch, button demo teaches Button[loading] not spinner placement), and
`spinner-custom.ts` is an undocumented orphan.

## Issues

1. **(major) `spinner-demo.ts`** — hero preview is a bare `<span uiSpinner></span>` with no
   contextual composition. React base: Item + ItemMedia + "Processing payment…" / $100.00.
2. **(major) `spinner-colors.ts`** — `color="inherit"` swatch missing; 3 of 4 documented
   colors shown. React shows all 4.
3. **(major) `spinner-button.ts`** — demonstrates `Button[loading]="true"` (2 buttons) rather
   than the React pattern of 3 `disabled size="sm"` buttons each with an explicit
   `<Spinner data-icon="inline-start">`. Wrong teaching target for a Spinner docs page.
4. **(minor) `spinner-custom.ts` orphan** — demo file exists at
   `apps/preview-angular/src/angular/spinner-custom.ts` but `spinner.mdx` has no
   `## Customization` section. `example-parity:check` will report the gap.
5. **(minor) Prose missing** — `## Button` and `## Badge` sections in `spinner.mdx` have no
   descriptive sentence. React base explains `data-icon="inline-start"` placement for both.
```

---
