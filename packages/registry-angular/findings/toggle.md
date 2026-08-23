# toggle — Migration Review

## Checklist

### 1. Examples match React base?

React base (`apps/v4/examples/base/toggle-*.tsx`): 6 files — `toggle-demo`, `toggle-disabled`, `toggle-outline`, `toggle-rtl`, `toggle-sizes`, `toggle-text`. Angular (`apps/preview-angular/src/angular/toggle-*.ts`): same 6 files present. ✅ Count matches.

**Deviations:**

- **`toggle-demo.ts` — material:** React shows one `<Toggle aria-label="Toggle bookmark" size="sm" variant="outline">` with `<BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />` + "Bookmark" text, demonstrating icon fill-swap on press. Angular shows two icon-only toggles (Bold `default` + Italic `outline`), with no pressed-state behaviour at all. Content, variant, size, and interaction pattern all differ.

- **`toggle-demo.ts` — corrupt SVG:** The Bold `<path>` reads `q0 38-21 070t-56 49` (leading zero, wrong coords); the identical icon in `toggle-outline.ts` reads `q0 38-21 62t-56 37`. The demo path renders a distorted glyph.

- **`toggle-rtl.ts` — intentional simplification:** React uses a `useTranslation` hook cycling Arabic/Hebrew/English with a dynamic `dir` prop. Angular uses a static `dir="rtl"` wrapper `<div>` with Arabic `aria-label`s. RTL layout intent is correct; the language-switcher is React-specific. Acceptable as a documented deviation.

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/toggle.mdx`

✅ Frontmatter: `title`, `description`, `base: angular`, `component: true`, `links.doc`, `links.api` all present.  
✅ Hero `<ComponentPreview framework="angular" name="toggle-demo" />` immediately after frontmatter.  
✅ `## Installation` with `cli` + `manual` tabs; correct `npx shadcn@latest add @force-ui-angular/toggle`.  
✅ `## Usage` with import and template snippet.  
✅ Flat `##` per example — no `## Examples` umbrella. Sections: Outline, With Text, Size, Disabled, RTL, API Reference.  
✅ Every example section has at least one prose sentence.  
✅ `## RTL` second-to-last; `## API Reference` last; links out to radix-ng (correct for a primitive wrapper).

❌ `## RTL` preview missing `direction="rtl"`: `<ComponentPreview framework="angular" name="toggle-rtl" />` — the React base page passes `direction="rtl"`, Angular page omits it.

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` entry `"toggle"`:

✅ `type: "registry:ui"`, `dependencies: ["@radix-ng/primitives"]`.  
✅ Files list — `ui/toggle/toggle.variants.ts`, `ui/toggle/toggle.component.ts`, `ui/toggle/index.ts` — matches disk exactly.  
✅ `"toggle"` in `angular` Set in `apps/v4/lib/framework-components.ts`.  
✅ `"toggle"` in `pages` array of `apps/v4/content/docs/components/angular/meta.json`.  
✅ All 6 demo names resolve to files in `apps/preview-angular/src/angular/` — `validate:previews` should pass.

### 4. Style diff vs original p4one

Sources: `/opt/dev/pd-p4one/app/src/app/ui/toggle/toggle.variants.ts` (p4one), `apps/v4/registry/styles/style-force-ui.css` (registry), `apps/v4/registry/bases/base/ui/toggle.tsx` (React base — used to confirm intent).

| Class | p4one CVA base | React base CVA | Registry `.cn-toggle` CSS |
|---|---|---|---|
| `hover:bg-muted` | ✅ (both variants) | ✅ (both variants) | ❌ only in `.cn-toggle-variant-outline` |
| `[&_svg]:pointer-events-none` | ✅ | ✅ | ❌ absent |
| `[&_svg]:shrink-0` | ✅ | ✅ | ❌ absent |
| `gap-1` | ✅ | via CSS token | ✅ `.cn-toggle` |
| `[&_svg]:fill-current` | ✅ | via CSS token | ✅ `.cn-toggle` |
| `iconSvg` / `iconSvgFilled` inputs | ✅ p4one-local | n/a | ❌ not in registry |

The `iconSvg`/`iconSvgFilled` inputs use `DomSanitizer` for inline Material Symbols SVGs — p4one-local, not a promotion candidate.

**Theme promotion candidates:**

| Class | Promote to |
|---|---|
| `hover:bg-muted` (default variant) | `.cn-toggle` in `style-force-ui.css` |
| `[&_svg]:pointer-events-none` | `.cn-toggle` in `style-force-ui.css` |
| `[&_svg]:shrink-0` | `.cn-toggle` in `style-force-ui.css` |

---

## Verdict

**PASS-with-notes** — registry wiring is complete and docs structure is correct. Three issues need resolution: the hero demo deviates materially from the React base; the RTL preview is missing `direction="rtl"`; three utility classes are absent from the `.cn-toggle` CSS token (confirmed against both React base and p4one).

## Issues

1. **(major)** `apps/preview-angular/src/angular/toggle-demo.ts`: content deviates from React base. React: single `size="sm" variant="outline"` bookmark toggle with icon fill-swap on press. Angular: two icon-only toggles, no press-state demo. Realign to match the React intent.

2. **(minor)** `apps/preview-angular/src/angular/toggle-demo.ts`: Bold `<path>` has corrupt segment `q0 38-21 070t-56 49`; `toggle-outline.ts` has correct `q0 38-21 62t-56 37`. Copy the correct path.

3. **(minor)** `apps/v4/content/docs/components/angular/toggle.mdx` `## RTL`: `<ComponentPreview framework="angular" name="toggle-rtl" />` is missing `direction="rtl"`.

4. **(minor)** `apps/v4/registry/styles/style-force-ui.css` `.cn-toggle`: missing `hover:bg-muted` (default variant), `[&_svg]:pointer-events-none`, `[&_svg]:shrink-0` — all present in the React base CVA and p4one. Three theme promotion candidates.

---
