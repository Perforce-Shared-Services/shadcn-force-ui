# separator — Migration Review

## Checklist

### 1. Examples match React base?

Five Angular demos exist (`separator-demo`, `separator-vertical`, `separator-list`,
`separator-menu`, `separator-rtl`) matching the five React base files exactly by slug. Content
deviations:

- **`separator-demo.ts` (major)** — Uses stale "Radix Primitives" copy (`<h4>Radix Primitives</h4>`,
  "An open-source UI component library.") and embeds the Blog|Docs|Source vertical-separator row
  inline. React base `separator-demo.tsx` shows `"shadcn/ui"` heading, `"The Foundation for your
  Design System"` subtitle, horizontal rule, and a prose paragraph. The Angular demo content predates
  the current base and bundles the vertical example inside it.

- **`separator-vertical.ts` (minor)** — Container uses `space-x-4` instead of `gap-4` (React base
  `separator-vertical.tsx:3`). Visually equivalent but diverges from base.

- **`separator-menu.ts` (minor)** — Both vertical separators have `class="h-full"` added (Angular)
  vs no explicit height in React base `separator-menu.tsx`. Redundant with `self-stretch` in a flex
  row; not a breaking difference.

- **`separator-rtl.ts`** — Hardcoded Arabic text + `dir="rtl"` instead of the React multi-language
  selector (`useTranslation`). Acceptable Angular-framework deviation; renders the same visual state
  as the `ar` locale. Comment in the file documents the reason.

- **`separator-list.ts`** — Matches React base exactly. ✓

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/separator.mdx`

- Frontmatter `title`, `description`, `base: angular`, `component: true` — ✓
- Hero `<ComponentPreview framework="angular" name="separator-demo" />` before first heading — ✓
- `## Installation` CodeTabs with CLI + manual — ✓
- `## Usage` present — but **import is wrong** (see Issues #2).
- Flat `## Vertical / ## Menu / ## List / ## RTL / ## API Reference` — no `## Examples` umbrella — ✓
- Section order matches React base exactly — ✓
- `## Vertical` **missing required one-sentence prose** ("Use `orientation="vertical"` for a vertical
  separator."). Every other section has description prose; Vertical is prose-free, violating the docs
  standard.
- `## RTL` present and second-to-last — ✓; `direction="rtl"` prop absent from `<ComponentPreview>`,
  but template hardcodes `dir="rtl"` so the preview renders correctly.
- `## API Reference` last, hand-written props table (`SeparatorComponent` is Force-UI-original, no
  upstream API to link) — correct choice per docs standard; however the table heading `### SeparatorComponent`
  uses the internal class name, not the exported alias `Separator`.

### 3. Available inside the registry?

- `_registry.ts` entry at line 49: name `"separator"`, files list:
  `ui/separator/separator.component.ts`, `ui/separator/separator.component.html`,
  `ui/separator/index.ts` — all three files exist on disk. ✓
- No `registryDependencies` declared (correct: zero runtime deps). ✓
- `apps/v4/lib/framework-components.ts` angular Set contains `"separator"` (line 430). ✓
- `apps/v4/content/docs/components/angular/meta.json` pages array contains `"separator"`. ✓
- All five demos (`separator-{demo,vertical,list,menu,rtl}.ts`) exist in
  `apps/preview-angular/src/angular/`. ✓ `validate:previews` should resolve cleanly.

### 4. Style diff vs original p4one

| Aspect | p4one (`/opt/dev/pd-p4one/…/separator.component.ts`) | Registry (`packages/registry-angular/…`) |
|---|---|---|
| Tailwind data variants | `data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch` (custom shorthand variants from local Tailwind config) | `data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch` (standard JIT, no custom config needed) |
| Template | `template: ''` (inline empty string) | `templateUrl: './separator.component.html'` (empty file) |
| `SEPARATOR_BASE_CLASS` export | Exported constant reused by p4one `button-group` | Not exported; registry `button-group` inlines its own class string — correct, no dependency needed |
| `data-slot` | ✓ present | ✓ present |
| Accessibility logic | Identical (role/aria-orientation/data-orientation) | Identical |

**CSS tokens in `style-force-ui.css`** (lines 1133–1142):

| Token | CSS value | Component value | Match? |
|---|---|---|---|
| `.cn-separator` | `bg-border shrink-0` | `bg-border shrink-0` | ✓ values match |
| `.cn-separator-horizontal` | `h-px w-full` | `h-px w-full` | ✓ values match |
| `.cn-separator-vertical` | `h-full w-px` | `self-stretch w-px` | ✗ `h-full` vs `self-stretch` |

Neither p4one nor the registry component uses these CSS token classes — both apply Tailwind
utilities directly. The `h-full`/`self-stretch` discrepancy in the token is harmless today but
could mislead if the tokens are ever activated.

**Theme promotion candidates**

| Token | Values | Promote? |
|---|---|---|
| `.cn-separator` | `bg-border shrink-0` — standard tokens only | No — pure Tailwind, nothing custom |
| `.cn-separator-horizontal` | `h-px w-full` — standard | No |
| `.cn-separator-vertical` | `h-full w-px` — `h-full` differs from component; correct value should be `self-stretch w-px` | Fix token value; still no promotion needed |

---

## Verdict

**PASS-with-notes** — Registry plumbing is complete and correct; the component implementation is
solid. Two content/docs issues need fixing before the page is user-accurate.

---

## Issues

1. **(major)** `apps/preview-angular/src/angular/separator-demo.ts` — demo content is the old Radix
   "Radix Primitives / An open-source UI component library" copy, not the current React base "shadcn/ui /
   The Foundation for your Design System" content. Also embeds the Blog|Docs|Source vertical row that
   belongs only in `separator-vertical`. Should mirror `apps/v4/examples/base/separator-demo.tsx` exactly.

2. **(major)** `apps/v4/content/docs/components/angular/separator.mdx` line 45 — `## Usage` import
   reads `import { SeparatorComponent } from "@/components/ui/separator"` but
   `packages/registry-angular/ui/separator/index.ts` exports the alias `Separator`, not
   `SeparatorComponent`. The import as written will fail. Fix: `import { Separator } from
   "@/components/ui/separator"`.

3. **(minor)** `apps/preview-angular/src/angular/separator-vertical.ts` — container flex class is
   `space-x-4`; React base uses `gap-4`. Update to match.

4. **(minor)** `apps/v4/content/docs/components/angular/separator.mdx` `## Vertical` section has no
   prose description (docs standard requires at least one sentence). Add: "Use `orientation=\"vertical\"`
   for a vertical separator."

5. **(minor)** `apps/v4/registry/styles/style-force-ui.css` line 1141 — `.cn-separator-vertical`
   defines `h-full w-px` but the component uses `self-stretch w-px`. Correct the token to
   `self-stretch w-px` for consistency (no impact today; purely defensive).
```

---
