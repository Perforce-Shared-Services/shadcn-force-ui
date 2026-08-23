# kbd — Migration Review

## Checklist

### 1. Examples match React base?

File-by-file comparison of `apps/preview-angular/src/angular/kbd-*.ts` vs `apps/v4/examples/base/kbd-*.tsx`:

| Demo | Matches? | Deviation |
|---|---|---|
| `kbd-demo` | ❌ | React: two `KbdGroup` rows (⌘⇧⌥⌃ and Ctrl+B). Angular: three standalone kbds (Ctrl, ⌘K, Ctrl+B) in a flex row. No `KbdGroup` shown. |
| `kbd-primary` | ❌ | React: single primary kbd inside a `div.bg-primary` container. Angular: full button + `KbdGroup` of two primary kbds — demonstrates `kbd-button` concept instead. |
| `kbd-group` | ❌ | React: inline prose "Use `Ctrl+B` `Ctrl+K` to open palette." Angular: bare `KbdGroup` (Ctrl+Shift+P), no prose. Different keys, absent context. |
| `kbd-button` | ❌ (blocker) | Angular wraps `<span uiKbd …><kbd uiKbd>⏎</kbd></span>` — nested `uiKbd` produces two `KbdComponent` instances. React uses a single `<Kbd>` directly inside `<Button>`. |
| `kbd-tooltip` | ✅ | Functionally equivalent; ButtonGroup + Save/Print tooltips with single and grouped kbds. |
| `kbd-input-group` | ✅ | Same structure; inline SVG replaces `SearchIcon` import — acceptable. |
| `kbd-rtl` | ✅ | Hardcoded `dir="rtl"` instead of language-selector; comment documents the deviation. |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/kbd.mdx` checked against `docs/component-docs-standard.md`:

- **Frontmatter**: `title`, `description`, `base: angular`, `component: true` — ✅
- **Hero preview**: `<ComponentPreview framework="angular" name="kbd-demo" />` before any heading — ✅
- **`## Installation`** with cli/manual tabs — ✅
- **`## Usage`**: import statement shows `{ KbdComponent, KbdGroupComponent }` — **❌ wrong names**. `index.ts` exports `Kbd` and `KbdGroup`; users copying this snippet get a compile error.
- **Flat `##` per example** (no `## Examples` umbrella) — ✅
- **`### Primary` nests under `## Input Group`**: both base and angular pages share this structure, so the angular page is consistent with its reference, though `### Primary` is technically a top-level variant, not a sub-variant of Input Group.
- **`## RTL`** second-to-last — ✅
- **`## API Reference`** last, hand-maintained table — ✅ (appropriate: kbd is a Force UI original, not an upstream primitive wrapper)

### 3. Available inside the registry?

- `_registry.ts:91–101`: entry `name: "kbd"`, all four on-disk files listed correctly:
  `kbd.variants.ts`, `kbd.component.ts`, `kbd.component.html`, `index.ts` — ✅
- `framework-components.ts:238`: `"kbd"` in the angular `Set` — ✅
- `meta.json:34`: `"kbd"` in `pages` array — ✅
- `validate:previews` resolution: all seven demo selectors (`preview-kbd-demo`, `preview-kbd-primary`, `preview-kbd-button`, `preview-kbd-group`, `preview-kbd-tooltip`, `preview-kbd-rtl`, `preview-kbd-input-group`) are defined in corresponding `.ts` files — ✅ (no orphaned `name` references in MDX).

### 4. Style diff vs original p4one

p4one (`/opt/dev/pd-p4one/app/src/app/ui/kbd/kbd.variants.ts`) uses raw Tailwind classes.
Registry (`packages/registry-angular/ui/kbd/kbd.variants.ts`) maps to `cn-*` token classes backed by `style-force-ui.css`.

| p4one class(es) | Registry form | CSS token (`style-force-ui.css`)? | Candidate? |
|---|---|---|---|
| `h-5 w-fit min-w-5 gap-1 rounded-sm px-1 font-sans text-xs font-medium` | `cn-kbd` | ✅ `:822` | Done |
| `in-data-[slot=tooltip-content]:bg-background/20 …` | `cn-kbd` | ✅ `:822` | Done |
| `bg-muted text-muted-foreground` | `cn-kbd-variant-default` | ✅ `:831` | Done — also redundant in `cn-kbd` base (see Issues #6) |
| `bg-background/20 text-background dark:bg-background/10` | `cn-kbd-variant-primary` | ✅ `:835` | Done |
| `[&_svg:not([class*='size-'])]:size-3` | `cn-kbd` | ✅ `:822` | Done — duplicate in cva string (see Issues #7) |
| `[&_svg]:fill-current` | inline cva base only | ❌ | **Promote candidate**: add to `.cn-kbd` in `style-force-ui.css` |
| KbdGroup `inline-flex items-center gap-1` | `cn-kbd-group` + inline | Partial (`gap-1` only) | Acceptable — `inline-flex items-center` inline is fine |

**Theme promotion candidates summary**: Only `[&_svg]:fill-current` is absent from the CSS token layer; all sizing, spacing, typography, and color tokens are promoted. The `.cn-kbd` base class carries `bg-muted text-muted-foreground` (a color that belongs solely in `.cn-kbd-variant-default`), creating a fragile override dependency for `variant="primary"`.

## Verdict

**FAIL** — one blocker (nested `uiKbd` in `kbd-button.ts`), three major demo deviations, one major docs error (wrong import names).

## Issues

1. **(blocker)** `apps/preview-angular/src/angular/kbd-button.ts`: `<span uiKbd …><kbd uiKbd>⏎</kbd></span>` instantiates two `KbdComponent`s with doubled styling. Fix: `<kbd uiKbd data-icon="inline-end" class="translate-x-0.5">⏎</kbd>` directly inside the button — no wrapping span.
2. **(major)** `apps/preview-angular/src/angular/kbd-demo.ts`: must show two `KbdGroup` rows (⌘⇧⌥⌃ and Ctrl+B), matching `kbd-demo.tsx`. Current version shows standalone kbds only.
3. **(major)** `apps/preview-angular/src/angular/kbd-primary.ts`: must show a single `<kbd uiKbd variant="primary">⌘K</kbd>` inside a `div.bg-primary` container, matching `kbd-primary.tsx`. Current version shows a button+group.
4. **(major)** `apps/v4/content/docs/components/angular/kbd.mdx` `## Usage`: import names `KbdComponent, KbdGroupComponent` do not exist as public exports; must be `Kbd, KbdGroup` (the aliases in `index.ts`).
5. **(major)** `apps/preview-angular/src/angular/kbd-group.ts`: align keys and add prose context to match React's inline paragraph pattern.
6. **(minor)** `apps/v4/registry/styles/style-force-ui.css:.cn-kbd`: remove `bg-muted text-muted-foreground` from the base class — those tokens belong exclusively in `.cn-kbd-variant-default`.
7. **(minor)** `packages/registry-angular/ui/kbd/kbd.variants.ts` cva base string: remove `[&_svg:not([class*='size-'])]:size-3` (already in `.cn-kbd` CSS class).
```

---
