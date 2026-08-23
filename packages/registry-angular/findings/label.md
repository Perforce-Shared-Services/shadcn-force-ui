# label — Migration Review

## Checklist

### 1. Examples match React base?

React base has exactly two examples: `label-demo.tsx` and `label-rtl.tsx`.
Angular has the matching `label-demo.ts` and `label-rtl.ts`. Set is complete.

**`label-demo.ts` deviations (material):**

| Item | React `label-demo.tsx` | Angular `label-demo.ts` |
|---|---|---|
| Control | `<Checkbox id="terms" />` (Checkbox component) | `<input id="terms" type="checkbox" class="size-4 rounded border" />` (raw HTML) |
| Container | `class="flex gap-2"` | `class="flex items-center space-x-2"` |

The raw `<input>` bypasses the `Checkbox` component. `label-rtl.ts` (same file family)
**does** import and use `Checkbox`, making the two demo files inconsistent with each other.

**`label-rtl.ts`:** Static Arabic text is an acceptable simplification (documented in a
comment); visual parity with the React RTL demo is maintained.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/label.mdx` structure:

- Frontmatter: `title`, `description`, `base: angular`, `component: true` — ✓
- Hero preview (`label-demo`) before any heading — ✓
- `## Installation` with CLI + manual tabs — ✓
- `## Usage` — present, **but** the import snippet reads
  `import { LabelComponent } from "@/components/ui/label"`. The actual exported name
  is `Label` (from `index.ts`: `export { LabelComponent as Label }`). Should be
  `import { Label } from "@/components/ui/label"`.
- `## Label in Field` — uses `name="label-demo"`, which is the **same** preview
  already rendered at the hero position. The base docs use a separate `field-demo`
  here. No distinct Angular field-label example exists. Section prose is retained
  but the preview is a duplicate render, not a new example.
- `## RTL` — present, `direction="rtl"`, correct `name="label-rtl"` — ✓
- `## API Reference` — present, last, table covers the single `class` input — ✓
- No `## Examples` umbrella heading — flat structure is correct — ✓

### 3. Available inside the registry?

| Check | Result |
|---|---|
| `_registry.ts` entry name `"label"` | ✓ line 77 |
| Files listed: `label.component.ts`, `label.component.html`, `index.ts` | ✓ all three on disk |
| `framework-components.ts` angular Set | ✓ line 305 |
| `meta.json` pages array | ✓ |
| `@/angular-ui/label` path alias resolves | ✓ `tsconfig.json:15` maps `@/angular-ui/*` → `packages/registry-angular/ui/*` |
| `validate:previews` — `label-demo` and `label-rtl` selectors exist in demo files | ✓ |

### 4. Style diff vs original p4one

p4one `label.component.ts` uses raw Tailwind only (no `cn-label` token):

```
flex items-center gap-2 text-sm leading-none font-medium select-none
group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50
peer-disabled:cursor-not-allowed peer-disabled:opacity-50
```

`cn-label` in `style-force-ui.css:874` currently absorbs:

```css
.cn-label {
  @apply gap-2 text-sm leading-none font-medium
         group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50;
}
```

Both the React base (`base/ui/label.tsx`) and the Angular port compose the token with
these additional host classes (not in the token):

| Class | p4one | Angular port | in `cn-label`? | Promote? |
|---|---|---|---|---|
| `flex items-center` | ✓ | ✓ | ✗ | Yes — universal layout |
| `select-none` | ✓ | ✓ | ✗ | Yes — always needed |
| `group-data-[disabled=true]:pointer-events-none` | ✓ | ✓ | ✗ | Yes — paired with the opacity already there |
| `peer-disabled:cursor-not-allowed` | ✓ | ✓ | ✗ | Yes — paired with `peer-disabled:opacity-50` |

**Theme promotion candidates:**

| Token addition | Reason |
|---|---|
| `flex items-center` | Both React and Angular always apply it; belongs with `gap-2` |
| `select-none` | Design-system standard for all labels |
| `group-data-[disabled=true]:pointer-events-none` | Logical pair with `group-data-[disabled=true]:opacity-50` already in token |
| `peer-disabled:cursor-not-allowed` | Logical pair with `peer-disabled:opacity-50` already in token |

Promoting these would shrink each component to just `cn-label` (plus any
consumer overrides), eliminating the split between token and component source.

## Verdict

**PASS-with-notes** — component implementation is correct and registry wiring is
complete; two minor demo inconsistencies and one doc inaccuracy need a follow-up pass.

## Issues

1. **(minor)** `apps/preview-angular/src/angular/label-demo.ts` — uses raw
   `<input type="checkbox">` instead of the `Checkbox` Angular component. Its sibling
   `label-rtl.ts` imports `Checkbox` correctly. Replace the raw input with
   `<button uiCheckbox id="terms"></button>` and remove `class="size-4 rounded border"`.

2. **(minor)** `apps/preview-angular/src/angular/label-demo.ts` — container uses
   `class="flex items-center space-x-2"` vs the React canonical `class="flex gap-2"`.
   Should be `flex gap-2` to match.

3. **(minor)** `apps/v4/content/docs/components/angular/label.mdx`, `## Label in Field`
   section — `name="label-demo"` duplicates the hero preview. Either add a distinct
   `label-field.ts` demo or replace the `<ComponentPreview>` with a prose note pointing
   at the `field` component page (matching the base docs `<Callout>` pattern).

4. **(minor)** `apps/v4/content/docs/components/angular/label.mdx`, `## Usage` block —
   import reads `{ LabelComponent }` but the public export is `{ Label }`. Change to
   `import { Label } from "@/components/ui/label"`.
```

---
