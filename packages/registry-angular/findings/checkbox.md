# checkbox — Migration Review

## Checklist

### 1. Examples match React base?

File set matches exactly (8 demos: basic, demo, description, disabled, group, invalid, rtl, table). Deviations:

**checkbox-demo.ts** — Major deviation. Angular shows 3 bare `<div>+<button>+<label>` rows with
`class="flex items-center gap-2 opacity-50"` on the disabled wrapper. React uses
`FieldGroup/Field/FieldContent/FieldDescription/FieldTitle` in a 4-row composition. Angular demo
does not use the Field system at all and applies disabled opacity as a manual class instead of
`data-disabled` on the Field.

**checkbox-rtl.ts** — Major deviation. Angular shows one unchecked checkbox with a single Arabic
string (`أوافق على الشروط والأحكام`). React shows a full 4-field FieldGroup with
`useTranslation` (ar/he/en switching), `FieldContent`, `FieldDescription`, and a disabled row.

**checkbox-table.ts** — Material deviation. `readonly selected = new Set(["1"])` is a plain
non-reactive `Set`; no `(checkedChange)` handler is wired. Clicking checkboxes changes nothing.
React has `useState` + `handleSelectAll`/`handleSelectRow`. The demo is entirely static and
misleading about the component's interactive capability.

checkbox-basic, checkbox-description, checkbox-disabled, checkbox-group, checkbox-invalid —
structurally match React equivalents. ✓

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/checkbox.mdx` — mostly correct:
- Frontmatter: title, description, base, component: true, links.doc + links.api → radix-ng ✓
- Hero `<ComponentPreview framework="angular" name="checkbox-demo" />` before first heading ✓
- `## Installation` (cli + manual tabs) ✓; `## Usage` ✓
- Flat `##` per example — Basic, Description, Disabled, Group, Table ✓
- `## RTL` second-to-last ✓; `## API Reference` last, links out ✓

**Gap**: No `## Invalid` section despite `checkbox-invalid.ts` existing as a demo. The React base
page has `## Invalid State` with a `<ComponentPreview>` for `checkbox-invalid`. The example is
unreachable from the Angular docs.

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` line 118:
```
name: "checkbox", dependency: "@radix-ng/primitives"
files: checkbox.component.ts, checkbox.component.html, index.ts
```
All 3 files exist on disk ✓. All 8 demo files exist under `apps/preview-angular/src/angular/` ✓.
`framework-components.ts` angular Set line 399: "checkbox" ✓. `meta.json` line 18: "checkbox" ✓.
`validate:previews` should resolve all 8 preview names.

### 4. Style diff vs original p4one

p4one builds a full Tailwind utility string (`CHECKBOX_BASE_CLASS`). The Angular registry port
delegates state styling to `.cn-checkbox` (in `style-force-ui.css`) and adds layout utilities
alongside. Concrete class differences:

| Class in p4one | In cn-checkbox token | Verdict |
|---|---|---|
| `after:absolute after:-inset-x-3 after:-inset-y-2` (44 px hit area) | ✗ | Promote — WCAG 2.5.5 |
| `relative` (required by `after:`) | ✗ | Promote with hit-area |
| `enabled:cursor-pointer` | ✗ | Promote — missing in token |
| `disabled:cursor-not-allowed` | ✗ | Promote — parity with other form controls |
| `shrink-0` | ✗ | Promote — prevents flex compression |
| `outline-none` | ✗ | Promote — suppresses browser default ring, needed alongside `focus-visible:ring` |
| `hover:bg-accent` (unchecked) | ✗ (token uses `bg-primary-subtle`) | p4one is stale; style-force-ui.css is correct |

**Theme promotion candidates**

| Token | Why |
|---|---|
| `relative` + `after:absolute after:-inset-x-3 after:-inset-y-2` | WCAG 2.5.5 minimum touch target |
| `enabled:cursor-pointer` + `disabled:cursor-not-allowed` | Cursor affordance, consistent with other form controls |
| `shrink-0` | Fixed-size box should not flex-shrink in default layouts |
| `outline-none` | Required alongside `focus-visible:ring-3` to suppress the UA default |

**p4one-local only** (not candidates): `peer` (CSS composition, consumer's responsibility),
`enabled:data-[state=unchecked]:hover:bg-accent` (stale — cn-checkbox already uses the updated
`bg-primary-subtle`).

**Bug absent from Angular registry** (present in p4one): `ngOnInit()` seeds the Radix CVA to
`false` when no `[checked]` binding is supplied, preventing a missing `aria-checked` attribute.
Without this, a bare `<button uiCheckbox>` (no `[checked]`) — as used in `checkbox-rtl.ts` and
two items in `checkbox-group.ts` — renders without `aria-checked`, violating WCAG 4.1.2
(axe `aria-required-attr`, severity: critical).

---

## Verdict

**FAIL** — missing `## Invalid` section in docs (demo file exists, unreachable from docs),
non-interactive table demo, checkbox-demo/rtl demos materially underpowered vs React, and a
WCAG 4.1.2 `aria-checked` bug in the registry component itself.

---

## Issues

1. **[blocker]** `checkbox.component.ts` — no `ngOnInit`/CVA seed: bare `<button uiCheckbox>` (no
   `[checked]` binding) omits `aria-checked` entirely, violating WCAG 4.1.2. Demonstrated by
   `checkbox-rtl.ts` (no `[checked]`) and two checkboxes in `checkbox-group.ts`.

2. **[major]** `apps/v4/content/docs/components/angular/checkbox.mdx` — no `## Invalid` section.
   `checkbox-invalid.ts` demo exists and is registered, but no MDX section renders it.

3. **[major]** `checkbox-demo.ts` — does not use the Field system; uses raw `<div>` with hardcoded
   `opacity-50` for disabled state instead of `data-disabled` on `<Field>`. Materially diverges
   from the React demo's `FieldGroup/Field/FieldContent/FieldDescription/FieldTitle` composition.

4. **[major]** `checkbox-table.ts` — `readonly selected = new Set(["1"])` is non-reactive; no
   `(checkedChange)` handlers. Clicking checkboxes does nothing. Demo is static/non-functional.

5. **[major]** `checkbox-rtl.ts` — single checkbox with one Arabic string. React has a 4-field
   multi-language (ar/he/en) FieldGroup. Material scope gap for an RTL parity demo.

6. **[minor]** `checkbox.component.ts` — `cn-checkbox` token does not include `outline-none`,
   `shrink-0`, `enabled:cursor-pointer`, `disabled:cursor-not-allowed`, or the expanded hit-area
   (`after:absolute after:-inset-x-3 after:-inset-y-2`). These are theme promotion candidates (see
   §4). The Angular port partially compensates with `cursor-pointer disabled:cursor-not-allowed`
   as ad-hoc Tailwind utilities, but `shrink-0`, `outline-none`, and the hit-area are absent.

7. **[minor]** `checkbox.component.ts` — only exposes `checked`, `value`, `disabled`, `required`,
   `name` from `RdxCheckboxRootDirective`. p4one also forwards `readonly` and `form`; neither is
   in the registry entry's `inputs` list.
```

---
