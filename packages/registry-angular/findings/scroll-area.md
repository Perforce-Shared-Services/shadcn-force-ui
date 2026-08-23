# scroll-area — Migration Review

## Checklist

### 1. Examples match React base?

React base has exactly three examples: `scroll-area-demo.tsx`, `scroll-area-horizontal-demo.tsx`, `scroll-area-rtl.tsx`.  
Angular has the same three files: `scroll-area-demo.ts`, `scroll-area-horizontal-demo.ts`, `scroll-area-rtl.ts`.

| Demo | Match? | Notes |
|---|---|---|
| `scroll-area-demo` | ✓ | Identical tags list (50 items), `h-72 w-48 rounded-md border`, Separator between items. |
| `scroll-area-horizontal-demo` | ✓ acceptable | Same 3 artworks, same Unsplash URLs, same layout classes. React renders `<ScrollBar orientation="horizontal" />` explicitly; Angular omits it (native scrollbar — divergence documented inline in the file and in `DIVERGENCES.md §scroll-area-1`). `<img>` used instead of Next.js `<Image>` — correct for Angular. |
| `scroll-area-rtl` | ✓ acceptable | React uses `useTranslation` with en/ar/he toggle; Angular uses static `dir="rtl"` + Arabic label `العلامات`. Behaviour shown is identical; the simplification avoids porting a React-only translation context and is noted in the demo file comment. |

No React demo is missing an Angular counterpart.

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/scroll-area.mdx`

| Check | Status |
|---|---|
| Frontmatter: `title`, `description`, `base: angular`, `component: true` | ✓ |
| Hero `<ComponentPreview>` before any heading | ✓ (`framework="angular" name="scroll-area-demo"`) |
| `## Installation` with CodeTabs / cli + manual tabs | ✓ |
| `## Usage` with import + snippet | ✓ (but see Issue 1) |
| Flat `## Horizontal` section (no `## Examples` umbrella) | ✓ |
| `## RTL` second-to-last with `direction="rtl"` | ✓ |
| `## API Reference` last | ✓ |

One structural minor: the standard (§ API reference) calls for `### PartName` sub-headings per exported part; the page puts the props table directly under `## API Reference`. Acceptable given there is only one exported part (`ScrollArea`) and other Angular pages do the same.

### 3. Available inside the registry?

- **`_registry.ts`** (line 417): entry `"scroll-area"` present, `files` lists all four disk files:  
  `scroll-area.component.ts`, `scroll-area.component.html`, `scroll-area.variants.ts`, `index.ts` — exact match with `ls`. No `dependencies` field — correct (no `@radix-ng/primitives` used; manual install deps are utilities only).
- **`framework-components.ts`** (line 428): `"scroll-area"` present in the angular `Set`.
- **`meta.json`** (`apps/v4/content/docs/components/angular/meta.json`): `"scroll-area"` present at correct alphabetical position.
- **Previews**: `scroll-area-demo.ts`, `scroll-area-horizontal-demo.ts`, `scroll-area-rtl.ts` all exist in `apps/preview-angular/src/angular/` — names match `name=` attributes in the MDX page. `validate:previews` should pass.

### 4. Style diff vs original p4one

| Aspect | p4one (`scroll-area.component.ts`) | Force UI Angular port (`scroll-area.variants.ts`) | Gap type |
|---|---|---|---|
| **Host `block`** | `'relative block'` — needed because `<ui-scroll-area>` is a custom element (inline default). | `'relative'` only — attribute selector `[uiScrollArea]` is applied to existing elements (e.g. `<div>`), already block. | Not a gap; architecture difference. |
| **Viewport width** | `w-full` (not `size-full`), `h-full` gated per orientation via `ORIENTATION_OVERFLOW`. | `size-full` unconditionally (`rounded-[inherit]` base class from cva). In horizontal-only case `h-full` resolves to auto (no explicit parent height) — no practical clip, but subtle. | p4one-local concern; not a regression in practice. |
| **Scrollbar — Firefox** | `scrollbar-color: color-mix(in oklab, var(--muted-foreground) 35%, transparent) transparent` (subtle alpha). | `[scrollbar-color:var(--muted-foreground)_transparent]` — full-opacity token, no alpha reduction. | **Visual difference**: Firefox scrollbar thumb is notably more prominent in the port. |
| **Scrollbar — Webkit** | Full `&::-webkit-scrollbar-thumb` block: rounded pill (`border-radius: 9999px`), 3 px inset border, `background-clip: content-box`, hover state darkening. Defined as `@utility scrollbar-overlay` in `tailwind.css`. | None — no `&::-webkit-scrollbar` rules. Chrome/Safari shows the browser default slim scrollbar, unstyled. | p4one ships a polished overlay appearance; the port leaves Webkit styling to the browser default. |
| **Scroll-fade utilities** | `scroll-fade-y` / `scroll-fade-x` / `scroll-fade` mask-image animations per orientation. | None. | p4one enhancement not in the React registry. Not a parity gap vs React base, but a missing UX feature vs p4one. |
| **`motion-reduce:transition-none`** | Present (WCAG 2.3.3). | Absent. | Minor WCAG note; not a blocker. |

**Theme promotion candidates**

| Utility | Lives in | Candidate for `style-force-ui.css`? |
|---|---|---|
| `scrollbar-overlay` (`@utility`) | `pd-p4one/app/src/tailwind.css` | No — it's a Tailwind utility, not a `cn-*` component class. Belongs in `apps/v4`'s global utility layer (`globals.css` or a shared `@utility` block), not `style-force-ui.css`. High-value candidate for that layer: used across select, dropdown, command, and now scroll-area. |
| `scroll-fade / scroll-fade-y / scroll-fade-x` (`@utility`) | `pd-p4one/app/src/tailwind.css` | Same as above — Tailwind utilities, not component tokens. Promotion target is the global utility layer. A `scroll-fade` base example already exists in `apps/v4/examples/base/scroll-fade-*.tsx`; the Angular port lacks matching demos. |
| `cn-scroll-area-scrollbar`, `cn-scroll-area-thumb` | `apps/v4/registry/styles/style-force-ui.css` lines 1071–1077 | Already promoted for the React/radix scrollbar sub-components; irrelevant for the native-scroll Angular port. |

---

## Verdict

**PASS-with-notes** — all three demos present and correctly mapped, registry entry complete, docs structurally sound. Three minor issues that do not block use but should be cleaned up in a follow-up.

---

## Issues

1. **(minor)** `apps/v4/content/docs/components/angular/scroll-area.mdx` — `## Usage` import snippet reads `import { ScrollAreaComponent } from "@/components/ui/scroll-area"` but `packages/registry-angular/ui/scroll-area/index.ts` exports the alias `ScrollArea`, not `ScrollAreaComponent`. Callers following the docs will get a named-import mismatch. Fix: change snippet to `import { ScrollArea } from "@/components/ui/scroll-area"`.

2. **(minor)** `scroll-area.variants.ts` — `[scrollbar-color:var(--muted-foreground)_transparent]` uses the full-opacity token. p4one's `scrollbar-overlay` uses `color-mix(in oklab, var(--muted-foreground) 35%, transparent)` for a subtle alpha. On Firefox the port's thumb is visually heavier than intended by the design token. Fix: promote `scrollbar-overlay` to the v4 global utility layer and reference it here.

3. **(minor)** `scroll-area.variants.ts` — no `-webkit-scrollbar` styling. Chrome and Safari show the platform-default scrollbar (thin on macOS, fat on Windows). p4one's `scrollbar-overlay` renders a rounded pill with hover state. Fix: part of the same `scrollbar-overlay` promotion in issue 2.

---

## Acceptance Contract

Acceptance level: attested
