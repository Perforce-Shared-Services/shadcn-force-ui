# skeleton — Migration Review

## Checklist

### 1. Examples match React base?

React base files: `skeleton-{demo,avatar,card,form,text,table,rtl}.tsx` — 7 files.
Angular files: `skeleton-{demo,avatar,card,form,text,table,rtl}.ts` — 7 files. ✓ count matches.

| Demo | Verdict | Deviation |
|------|---------|-----------|
| `skeleton-demo` | ⚠ minor | Angular uses `space-x-4` (margin-based); React uses `gap-4` (flex gap). Both render visually the same. Angular also uses `size-12` vs React's `h-12 w-12` — equivalent Tailwind shorthand, not a deviation. |
| `skeleton-avatar` | ✓ | Identical layout and class strings. |
| `skeleton-card` | ⚠ minor | Angular adds `block` class on each `div uiSkeleton` inside `uiCardHeader`/`uiCardContent` (`class="block h-4 w-2/3"`). React `Skeleton` renders a `<div>` which is already block; the explicit `block` is redundant but harmless. |
| `skeleton-form` | ✓ | Layout and class strings identical. |
| `skeleton-text` | ✓ | Identical. |
| `skeleton-table` | ✓ | Angular writes 5 rows explicitly; React uses `Array.from({length:5}).map(...)`. Visual output identical; explicit rows are acceptable for a static template. |
| `skeleton-rtl` | ✓ | Angular uses static `dir="rtl"` (correct for preview component). React uses dynamic `useTranslation` language selector (React-specific infra). Content and classes match. |

### 2. Docs follow the React/flat pattern?

Reference: `docs/component-docs-standard.md`, base page `apps/v4/content/docs/components/base/skeleton.mdx`.

| Check | Status |
|-------|--------|
| Frontmatter: `title`, `description`, `base: angular`, `component: true` | ✓ |
| Hero preview `name="skeleton-demo"` before any heading | ✓ |
| `## Installation` with CLI + manual `<Steps>` | ✓ |
| `## Usage` with import + snippet + aria note | ✓ |
| Flat `##` per example — no `## Examples` umbrella | ✓ |
| `## RTL` second-to-last with `direction="rtl"` | ✓ |
| `## API Reference` last | ✓ (Angular adds this; the base page omits it — Angular is more conformant than base here) |
| Prose description under each `##` example heading | ⚠ missing — but the base `skeleton.mdx` also has no prose under any example heading, so Angular matches the reference pattern rather than the standard's general prose rule. |

### 3. Available inside the registry?

- **`_registry.ts`** (line 63): entry `name: "skeleton"`, type `"registry:ui"`, lists all three files:
  - `ui/skeleton/skeleton.component.ts` ✓ exists
  - `ui/skeleton/skeleton.component.html` ✓ exists (empty file; `templateUrl` reference)
  - `ui/skeleton/index.ts` ✓ exists
  - No npm `dependencies` declared — correct, component has none.
- **`framework-components.ts`** (line 433): `"skeleton"` present in the `angular` Set. ✓
- **`meta.json`** (`apps/v4/content/docs/components/angular/meta.json`): `"skeleton"` in `pages` array. ✓

`validate:previews` resolution: all seven Angular demo files exist at the expected path `apps/preview-angular/src/angular/skeleton-*.ts` and export a default component. No missing resolution target.

### 4. Style diff vs original p4one

| Aspect | p4one (`/opt/dev/pd-p4one/…/skeleton.component.ts`) | Angular port |
|--------|-----------------------------------------------------|--------------|
| Applied classes | `cn('animate-pulse rounded-md bg-muted motion-reduce:animate-none', className)` inline | `cn("cn-skeleton", className)` — token only |
| Token | None; raw utilities | `.cn-skeleton { @apply animate-pulse rounded-md bg-muted motion-reduce:animate-none; }` in `style-force-ui.css:1295` |
| `[FORCE-UI]` marker on CSS rule | n/a | ✓ present: `/* [FORCE-UI] animation was entirely absent */` |
| Template | `template: ''` inline | `templateUrl: './skeleton.component.html'` → empty file |
| JSDoc radius hints | Documents `rounded-sm` / `rounded-full` / `rounded-lg` variants | Comment omitted in port |

All four utility classes (`animate-pulse`, `rounded-md`, `bg-muted`, `motion-reduce:animate-none`) are already in `cn-skeleton`. No p4one-local classes remain unpromotted.

**Theme promotion candidates**

| Class / token | In `style-force-ui.css`? | Action |
|---------------|--------------------------|--------|
| `animate-pulse` | ✓ via `cn-skeleton` | Already promoted |
| `rounded-md` | ✓ via `cn-skeleton` | Already promoted |
| `bg-muted` | ✓ via `cn-skeleton` | Already promoted |
| `motion-reduce:animate-none` | ✓ via `cn-skeleton` | Already promoted |

Nothing left to promote.

---

## Verdict

**PASS-with-notes** — Implementation is functionally correct and registry registration is complete. Two minor cosmetic notes; no blockers.

## Issues

1. **(minor)** `apps/preview-angular/src/angular/skeleton-demo.ts:10` — wrapper uses `space-x-4` (negative-margin horizontal spacing); the React canonical uses `gap-4`. Swap to `gap-4` for strict parity.
2. **(minor)** `packages/registry-angular/ui/skeleton/skeleton.component.html` — empty file distributed to consumers via `templateUrl`. The p4one original uses `template: ''` inline, avoiding the extra file. Either consolidate to inline template or document the empty file as intentional for registry consistency with other components.
3. **(minor)** `skeleton-card.ts` — redundant `block` class on `div uiSkeleton` elements inside card headers/content. `div` is already `display:block`; no React equivalent. Harmless but diverges from canonical markup.
```

---
