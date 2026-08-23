# empty — Migration Review

## Checklist

### 1. Examples match React base?

Demo set is 1-for-1 with `apps/v4/examples/base/empty-*.tsx` (8 files each). Per-file findings:

| Demo | Verdict | Notes |
|------|---------|-------|
| `empty-demo` | **Deviates** | React: "No Projects Yet", two buttons (Create/Import) + external learn-more link as `Empty` sibling. Angular: "No files yet", single "Upload file" button, `class="border"` added to root. Structural composition (two actions + sibling link) is not demonstrated; hero looks like outline variant. |
| `empty-outline` | ✓ | Both use `class="border border-dashed"`. |
| `empty-background` | ✓ | Content matches; `bg-muted/30`, bell icon, Refresh button. |
| `empty-avatar` | ✓ | React uses explicit `variant="default"`; Angular omits it (same default). Equivalent. |
| `empty-avatar-group` | ✓ | Inline SVG substituted for `PlusIcon` import. Equivalent. |
| `empty-card` | ✓ | Folder icon, two buttons + learn-more link inside `EmptyContent`. |
| `empty-input-group` | ✓ | No `EmptyMedia`; structure matches React. |
| `empty-rtl` | ✓ | Static Arabic text + `dir="rtl"` — documented Angular RTL convention. |

### 2. Docs follow the React/flat pattern?

Angular `empty.mdx` passes most checks:
- ✓ Frontmatter: `title`, `description`, `base: angular`, `component: true`.
- ✓ Hero `<ComponentPreview framework="angular" name="empty-demo" />` before any heading.
- ✓ `## Installation` with CLI/manual tabs and `<ComponentSource>`.
- ✓ Flat `##` per example (no `## Examples` umbrella).
- ✓ `## RTL` second-to-last; `## API Reference` last.
- ⚠ `## Input Group` (space) vs base `## InputGroup` (no space) — minor heading-text drift.
- ✓ No `## Card` section — correct; base docs also omit it.
- ✓ API Reference uses a hand-maintained props table (correct for a Force UI original).

### 3. Available inside the registry?

- ✓ `_registry.ts` entry at line 258: all 3 on-disk files listed (`empty.variants.ts`, `empty.component.ts`, `index.ts`). No external `dependencies` needed.
- ✓ `framework-components.ts` angular Set includes `"empty"` (line 39).
- ✓ `apps/v4/content/docs/components/angular/meta.json` includes `"empty"` (line 27).
- ✓ All 8 demo files exist under `apps/preview-angular/src/angular/`; each is referenced by a `<ComponentPreview framework="angular" ...>` in the MDX. `validate:previews` should pass.

### 4. Style diff vs original p4one

| Aspect | p4one inline class | Angular registry | Already in `.cn-empty-*` CSS | Promote? |
|--------|--------------------|-----------------|------------------------------|----------|
| Root: `gap-4 rounded-xl p-6` | inline | delegated via `cn-empty` | ✓ `.cn-empty { @apply gap-4 rounded-xl border-dashed p-6; }` | Already global |
| Header: `gap-2` | inline | delegated via `cn-empty-header` | ✓ | Already global |
| Media-default: `bg-transparent` | inline | `cn-empty-media-default` | ✓ | Already global |
| Media-icon: tile + `fill-current` | inline (full string) | `cn-empty-media-icon` | ✓ `[FORCE-UI]` comment preserved | Already global |
| Title: `text-foreground` | inline (app-compat for @vex) | absent | Not in CSS | **No** — p4one-local (@vex override) |
| Description: `text-muted-foreground` | inline | **absent** | Not in CSS | **Yes — missing from `.cn-empty-description`** |
| Content: `gap-2.5 text-sm` | inline | delegated via `cn-empty-content` | ✓ | Already global |
| `mb-2` on media | inline only | inline AND in `.cn-empty-media` | ✓ | Harmless redundancy, not a promotion gap |

**Theme promotion candidates:**

| Token | Add to CSS rule | Rationale |
|-------|----------------|-----------|
| `text-muted-foreground` | `.cn-empty-description` | React base `empty.tsx` applies it inline alongside `cn-empty-description`; omitting it causes description to render as foreground color (visual regression in all consumers of the Angular port). |

---

## Verdict

**PASS-with-notes** — registry registration and docs structure are correct; one visual bug and one demo deviation need resolution.

## Issues

1. **(Major)** `EmptyDescriptionComponent` class string is `"cn-empty-description [&>a]:underline..."` — missing `text-muted-foreground`. React base (`apps/v4/registry/bases/base/ui/empty.tsx` line ~65) applies it inline. CSS `.cn-empty-description` only applies `text-sm/relaxed`. Description text renders as foreground, not muted. Fix: add `text-muted-foreground` to the class string in `packages/registry-angular/ui/empty/empty.component.ts` (EmptyDescriptionComponent `classes()`) and promote it to `.cn-empty-description` in `style-force-ui.css`.
2. **(Minor)** `empty-demo.ts` uses a single-button "upload file" scenario with `class="border"` on root; React hero demo shows a two-button (Create/Import) + sibling-link composition without explicit border. The Angular hero demo doesn't showcase that composition pattern, making `empty-card.ts` partially redundant.
3. **(Minor)** `data-slot="empty-media"` in the Angular port vs `data-slot="empty-icon"` in the React base component (`empty.tsx` line ~55). No CSS selector currently targets either value, so there is no visual impact, but it is a cross-framework data-slot parity gap.
4. **(Minor)** `## Input Group` heading in `angular/empty.mdx` should be `## InputGroup` (no space) to match the base docs heading.
```

---

## Review

- **Correct:** Registry entry is complete (`_registry.ts`, `framework-components.ts`, `meta.json`). All 8 demos exist. Docs structure follows the flat-`##` pattern with correct RTL and API Reference placement. `cn-empty` CSS tokens are used consistently; gap/padding/icon-tile styles are properly delegated to `style-force-ui.css`. `data-slot="empty-media"` is semantically better than the p4one `"empty-icon"` value (but diverges from the React base). Angular RTL deviation (static Arabic + `dir="rtl"`) is the established convention and acceptable.

- **Blocker:** None.

- **Note:** The `text-muted-foreground` gap is the single most actionable fix — it requires a one-line edit to both `empty.component.ts` and `style-force-ui.css` (or just the component file). The demo content deviation is cosmetic; the docs-standard permits different wording as long as the structural composition pattern is represented.
