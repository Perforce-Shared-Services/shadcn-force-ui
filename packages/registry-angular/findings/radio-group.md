# radio-group — Migration Review

## Checklist

### 1. Examples match React base?

Angular ships 7 demos matching the 7 React base demos (`*-demo`, `*-description`,
`*-disabled`, `*-invalid`, `*-rtl`, `*-choice-card`, `*-fieldset`). No files are
missing, but three deviate materially:

| Demo | Deviation | Severity |
|------|-----------|----------|
| `radio-group-demo.ts` | `defaultValue="option-1"` and values `"option-1/2/3"` instead of React's `"comfortable"` / `"default"/"comfortable"/"compact"`; group has `class="gap-3"` but no `w-fit`; inner rows use `gap-2` vs React's `gap-3`. | minor |
| `radio-group-rtl.ts` | React uses `Field+FieldContent+FieldDescription` with a three-locale language selector (en/ar/he). Angular wraps in `<div dir="rtl">` with bare `<label uiLabel>` and no descriptions — wrong Field structure, content stripped. | major |
| `radio-group-fieldset.ts` | Different description ("You can change your plan at any time." vs React's "Yearly and lifetime plans offer significant savings.") and different items (free/pro/team vs monthly/yearly/lifetime with prices). | minor |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/radio-group.mdx`:
- Frontmatter has `title`, `description`, `base`, `component: true`, `links.doc/api` — ✓
- Hero preview `<ComponentPreview framework="angular" name="radio-group-demo" />` immediately after frontmatter — ✓
- Sections are flat `##` (Description, Choice Card, Fieldset, Disabled, Invalid, RTL, API Reference) — no `## Examples` umbrella — ✓
- `## RTL` is second-to-last; `## API Reference` last and links out to radix-ng docs — ✓
- **`<ComponentPreview framework="angular" name="radio-group-rtl" />` is missing `direction="rtl"`** — the React base page has `direction="rtl"` on the equivalent preview; the docs standard requires it.

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` lines 139–147:
```ts
{
  name: "radio-group",
  type: "registry:ui",
  dependencies: ["@radix-ng/primitives"],
  files: [
    { path: "ui/radio-group/radio-group.component.ts",       type: "registry:ui" },
    { path: "ui/radio-group/radio-group-item.component.html", type: "registry:ui" },
    { path: "ui/radio-group/index.ts",                        type: "registry:ui" },
  ],
  meta: { links: { docs: "…/angular/radio-group" } },
}
```
All three files exist on disk (confirmed via `ls`). `framework-components.ts` line 248
includes `"radio-group"` in the Angular Set. `meta.json` line 45 lists `"radio-group"`.
All 7 preview demos are in `apps/preview-angular/src/angular/` and will resolve for
`validate:previews`. **Registry is correct.**

### 4. Style diff vs original p4one

| Class / token | p4one | Registry `cn-radio-group-item` | Promote? |
|---|---|---|---|
| `group/radio-group-item` | ✓ (named group modifier) | absent | No — no child uses `group-*/radio-group-item:*` yet; add if needed |
| `after:absolute after:-inset-x-3 after:-inset-y-2` | ✓ (WCAG 2.5.5 touch target) | **absent** — not in inline classes or `cn-radio-group-item` CSS token | **Yes — candidate** |
| `bg-background` (explicit unchecked surface) | ✓ inline | ✓ in `cn-radio-group-item` `@apply` | already promoted |
| `enabled:cursor-pointer` | ✓ inline | ✓ in CSS token | already promoted |
| `aria-invalid:border-destructive` (full opacity, both themes) | ✓ inline | ✓ in CSS token | already promoted |
| Indicator animation (`data-unchecked:scale-0 data-checked:scale-100`) | ✓ inline | ✓ inline (correct — behavioral, not styling) | n/a |

**Theme promotion candidates:**

| Class string | Where to add | Rationale |
|---|---|---|
| `after:absolute after:-inset-x-3 after:-inset-y-2` | `cn-radio-group-item` in `style-force-ui.css` | WCAG 2.5.5 touch target; present in p4one but dropped in port |

---

## Verdict

**PASS-with-notes** — registry registration is complete and correct, 6 of 7 demos exist and render,
docs follow the flat-heading standard. Two notes hold it back from clean PASS: the RTL demo is
structurally underdone (major gap vs React), and the touch-target pseudo-element from p4one was
not promoted to the global CSS token.

## Issues

1. (major) `radio-group-rtl.ts`: Angular RTL demo uses bare `<label uiLabel>` with no `Field`/
   `FieldContent`/`FieldDescription` structure and no multi-locale language selector. React's
   `radio-group-rtl.tsx` uses full Field composition with three locales. Parity requires porting
   the Field+FieldContent+FieldDescription pattern (language selector is React-specific and can
   be omitted with a `<Callout>` per docs standard §"Documenting a deviation").

2. (minor) `radio-group.mdx` line with RTL preview: missing `direction="rtl"` on
   `<ComponentPreview framework="angular" name="radio-group-rtl" />`.

3. (minor) `radio-group-demo.ts`: `defaultValue` and item values differ from React canonical
   (`"option-1"/"option-2"/"option-3"` vs `"comfortable"`, `"default"/"comfortable"/"compact"`);
   group missing `w-fit`; inner row gap is `gap-2` not `gap-3`.

4. (minor) `radio-group-fieldset.ts`: description text and item values deviate from React
   (`free/pro/team` vs `monthly/yearly/lifetime` with prices).

5. (minor) `cn-radio-group-item` in `style-force-ui.css`: touch-target pseudo-element
   `after:absolute after:-inset-x-3 after:-inset-y-2` present in p4one is absent here.
   Candidate for promotion to the global token.
```

---
