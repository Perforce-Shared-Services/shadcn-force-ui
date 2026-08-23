# badge — Migration Review

## Checklist

### 1. Examples match React base?

React base has 9 example files (`badge-{demo,colors,icon,link,rtl,solid,spinner,status,variants}.tsx`). Angular has the same 9 files. File-for-file comparison:

| File | Match? | Deviation |
|---|---|---|
| badge-demo | ✗ minor | Angular wraps in `flex-col` + adds a second row with pill/count badges (8, 99, 20+) absent from React base |
| badge-colors | ✓ | Exact class parity |
| badge-icon | ✗ **major** | React: two badges — `variant="secondary"` + BadgeCheck + "Verified" AND `variant="outline"` + BookmarkIcon + "Bookmark". Angular: one badge only — `variant="success"` + circle-check + "Synced". Wrong variant, wrong text, missing second badge. |
| badge-link | ✓ (logic) / ✗ (rendering) | Attribute-selector idiom is correct; icon injected via `<span [innerHTML]="arrowSvg">` makes the SVG a grandchild of the host — see Issue #2 |
| badge-rtl | ✓ (structure) / ✗ (rendering) | Same `[innerHTML]` wrapping bug as badge-link; Arabic text and icon set match React intent |
| badge-solid | ✗ minor | React labels: "Success / Warning / Info / Error". Angular labels: "Deployed / Expiring / Beta / Failed" — domain-specific substitutions |
| badge-spinner | ✓ | Equivalent |
| badge-status | ✗ minor | React: success, info, warning (3 badges). Angular: success, warning, destructive ("Error"), info (4 badges, extra `destructive`) |
| badge-variants | ✗ minor | React: default, secondary, destructive, outline, ghost (5). Angular adds `link` (6) |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/badge.mdx` — comparison against `docs/component-docs-standard.md`:

- **Frontmatter** ✓ — `title`, `description`, `base: angular`, `component: true`
- **Hero preview** ✓ — `<ComponentPreview framework="angular" name="badge-demo" />` immediately after frontmatter, before any heading
- **`## Installation`** ✓ — CLI tab with `npx shadcn@latest add @force-ui-angular/badge`, manual tab with `<ComponentSource>` and steps
- **`## Usage`** ✗ minor — shows `import { BadgeComponent } from "@/components/ui/badge"` but `index.ts` exports the alias `Badge`, not `BadgeComponent`
- **Flat `##` per example** ✓ — no `## Examples` umbrella; each section is its own `##`
- **`### Status Variants`** under `## Variants` and **`### Solid Status Variants`** under `## Link` ✓ — both mirror the React base page exactly; `###` for sub-variants is permitted by the standard
- **`## RTL`** ✓ — present, second-to-last, with `direction="rtl"` on the preview
- **`## API Reference`** ✓ — last section; props table covers `variant`, `srLabel`, `class`; correct for a plain-element wrapper

### 3. Available inside the registry?

- **`_registry.ts`** ✓ — entry `"badge"` at line 22 lists all 4 files on disk: `badge.variants.ts`, `badge.component.ts`, `badge.component.html`, `index.ts`; no `dependencies` field (correct — no Radix primitive)
- **`framework-components.ts`** ✓ — `"badge"` present in the `angular` Set (line 391)
- **`meta.json`** ✓ — `"badge"` in `pages` array
- **`validate:previews`** — all 9 demo names referenced in the MDX (`badge-demo`, `badge-variants`, `badge-status`, `badge-icon`, `badge-spinner`, `badge-link`, `badge-solid`, `badge-colors`, `badge-rtl`) resolve to files on disk; no orphaned references

### 4. Style diff vs original p4one

p4one (`/opt/dev/pd-p4one/app/src/app/ui/badge/badge.variants.ts`) ships all Tailwind utility classes expanded inline in the cva. The registry splits them: structural layout delegated to the `cn-badge` token; per-variant color delegated to `cn-badge-variant-*` tokens in `style-force-ui.css`.

Concrete class/token differences:

| Feature | p4one class string | Registry `cn-badge-variant-*` | Notes |
|---|---|---|---|
| `warning-solid` text dark mode | `text-on-warning` (no dark:) | `text-on-warning dark:text-on-warning` | Extra explicit dark-mode override added in registry |
| Base layout | All inline in cva | Delegated to `.cn-badge` token | `h-5 gap-1 rounded-4xl px-2 py-0.5 …` |
| Per-variant color | Inline in cva | Delegated to `.cn-badge-variant-*` | Architecture only; output identical |

**Theme promotion candidates:**

| Token candidate | Currently in | Promote to global theme? |
|---|---|---|
| `dark:text-on-warning` on `warning-solid` | Registry `cn-badge-variant-warning-solid` only | Already promoted; p4one should adopt from registry |
| `[a]:hover:bg-primary-hover` on `default` | Both | Already in `style-force-ui.css` ✓ |
| `[a]:hover:bg-primary-subtle` on `secondary`/`outline` | Both | Already in `style-force-ui.css` ✓ |

No new promotions needed; all status tokens (`bg-{status}-subtle`, `text-{status}`, `bg-{status}-solid`, `text-on-{status}`) are already global. The only delta is `dark:text-on-warning`, already in the registry-side CSS — p4one is behind.

---

## Verdict

**PASS-with-notes** — registry wiring is complete and correct; docs structure follows the base-page pattern. Two demo files have a rendering bug with `[innerHTML]`-wrapped SVGs, and `badge-icon` deviates substantially from the React base reference (wrong variant, text, and missing second badge).

---

## Issues

1. **(major) `badge-icon.ts`** — `variant="success"` + text "Synced" + single badge only. React base (`badge-icon.tsx`) uses `variant="secondary"` + "Verified" (inline-start) AND `variant="outline"` + "Bookmark" (inline-end). Wrong variant and missing second badge break example parity.

2. **(major) `badge-link.ts` + `badge-rtl.ts`** — SVG icons are bound via `<span [innerHTML]="svgString">`, making the `<svg>` a grandchild of the badge host. The cva selectors `[&>svg]:size-3.5!` and `[&>svg]:fill-current` (which are `> svg` / direct-child combinators) do not reach the SVG. Icons will render at native viewBox size and default black fill, not 14 px / `currentColor`. Fix: inline the SVG in the template directly (as `badge-icon.ts` correctly does) so it is a direct child.

3. **(minor) `badge-demo.ts`** — Second row with count/pill badges (8, 99, 20+) has no counterpart in `badge-demo.tsx`. Adds non-standard content to the hero demo.

4. **(minor) `badge-solid.ts`** — Labels "Deployed / Expiring / Beta / Failed" vs React base "Success / Warning / Info / Error". Intent is the same but breaks literal parity.

5. **(minor) `badge-status.ts`** — Includes `destructive` ("Error") absent from React base's three-badge set (success, info, warning).

6. **(minor) `badge-variants.ts`** — Adds `link` variant not present in `badge-variants.tsx`.

7. **(minor) `badge.mdx` Usage block** — `import { BadgeComponent }` should be `import { Badge }` (the exported alias from `index.ts`).

---

## Acceptance Contract

Acceptance level: attested
