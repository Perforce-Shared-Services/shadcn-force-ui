# combobox — Migration Review

## Checklist

### 1. Examples match React base?

All 12 base demos have Angular counterparts. Deviations are framework-idiomatic and
acceptable except where noted.

| Demo | Deviation | Severity |
|---|---|---|
| `combobox-multiple` | Angular omits `ComboboxValue` render-prop wrapper; `@for` inside `ComboboxChips` replaces it. Also adds `placeholder="Add framework"` on ChipsInput absent from React. Both are Angular-idiomatic. | info |
| `combobox-rtl` | React uses a live language-switcher (`useTranslation`, en/ar/he). Angular uses static Arabic. Valid framework adaptation; behaviour of RTL layout is identical. | info |
| `combobox-popup` | React countries list includes an empty `{label:"Select country"}` placeholder at index 0 used as `defaultValue`. Angular omits it and initialises `value = signal<Country \| null>(countries[0])` where `countries[0]` is `argentina`, giving a different initial display value. | minor |
| `combobox-input-group` | React `ComboboxContent` receives `alignOffset={-28}` to shift popup right of the globe addon. Angular's `ComboboxContent` has no `alignOffset` prop; popup aligns with the full input width. | minor |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/combobox.mdx` is structurally sound:
flat `##` per example, no `## Examples` umbrella, prose under every section,
`## RTL` second-to-last, `## API Reference` last.

**One issue**: The `## RTL` `<ComponentPreview>` omits the `direction="rtl"` and
`align="start"` attributes present on the base page:

```mdx
# base page (correct)
<ComponentPreview
  styleName="base-force-ui"
  name="combobox-rtl"
  direction="rtl"
  align="start"
/>

# angular page (current — missing attributes)
<ComponentPreview
  framework="angular"
  name="combobox-rtl"
/>
```

`direction="rtl"` is what tells the preview shell to render the demo
right-to-left. Without it the Angular RTL demo will display LTR in the docs
preview even though the template hard-codes `dir="rtl"`.

### 3. Available inside the registry?

- `_registry.ts` entry `name: "combobox"` (line 598–641): ✓
- 37 files listed; 37 files on disk — exact match ✓
- `dependencies: ["@angular/cdk"]` ✓
- `registryDependencies: ["button", "input-group", "separator"]` ✓
- `framework-components.ts` angular `Set` contains `"combobox"` ✓
- `apps/v4/content/docs/components/angular/meta.json` pages array contains
  `"combobox"` ✓
- `validate:previews` resolution: all 12 demo files are top-level in
  `apps/preview-angular/src/angular/` and export `default` — resolves cleanly ✓

### 4. Style diff vs original p4one

| Part | p4one class string | registry class string | `cn-*` token used |
|---|---|---|---|
| `ComboboxChips` | inline: `border-border hover:border-input focus-within:border-ring …` | `cn-combobox-chips` | ✓ promoted |
| `ComboboxChip` | inline: `h-[1.3125rem] bg-muted text-foreground …` | `cn-combobox-chip` | ✓ promoted |
| `ComboboxList` | inline: `scrollbar-overlay max-h-[calc(24rem-2.25rem)] …` | `cn-combobox-list` + `overscroll-contain outline-none` | ✓ promoted |
| `ComboboxEmpty` | inline (hidden/flex via group-data) | `cn-combobox-empty` | ✓ promoted |
| `ComboboxItem` | inline (full string) | identical inline string | ✗ token incomplete |
| `ComboboxPopup` | inline (CDK component) | identical inline (CDK) | ✗ CSS vars not CDK-compatible |

**Notable diffs between p4one inline and registry token**:
- `cn-combobox-chips` adds `dark:bg-input/30` (p4one had `bg-transparent` only).
- `cn-combobox-list` max-height uses `min(calc(--spacing(72)--…), calc(var(--available-height)--…))`
  vs p4one's hard-coded `max-h-[calc(24rem-2.25rem)]`; the CSS-var form is future-safe
  for anchored overlays.
- `cn-combobox-chip` height `h-[calc(--spacing(5.25))]` = `h-[1.3125rem]` = 21 px — numerically
  equivalent, just expressed via spacing scale.
- `ComboboxItem` and `ComboboxPopup`: unchanged from p4one. Both remain inline because the CSS
  tokens are incomplete — `cn-combobox-item` lacks `group/combobox-item relative flex w-full
  items-center outline-hidden select-none data-disabled:*` and `cn-combobox-content` uses
  `var(--available-height)` which CDK's `ComponentPortal` does not inject.

**Theme promotion candidates**

| Token | Gap | Recommendation |
|---|---|---|
| `cn-combobox-item` | Missing structural classes; Angular item can't adopt it yet | Extend token with `relative flex w-full items-center select-none outline-hidden` + `data-disabled:pointer-events-none data-disabled:opacity-50`, then both React and Angular items can adopt it |
| `cn-combobox-content` | CDK popup can't receive `var(--available-height)` | No promotion possible for Angular until CDK sets that var; React already uses the token |

## Verdict

**PASS-with-notes** — all 12 demos present and structurally faithful, registry
wired correctly (37 files, correct deps, slug in angular Set and meta.json), docs
follow the flat-`##` standard with a complete hand-written API table; two minor
issues do not block merge.

## Issues

1. **[minor]** `apps/v4/content/docs/components/angular/combobox.mdx` — `## RTL`
   `<ComponentPreview>` is missing `direction="rtl"` and `align="start"`. The base
   page passes both; without `direction="rtl"` the preview shell renders the demo
   LTR regardless of the template's `dir="rtl"`.

2. **[minor]** `apps/preview-angular/src/angular/combobox-popup.ts` — Angular
   `countries[0]` is `{code:"ar",label:"Argentina"}` (first real country), so the
   popup opens showing "Argentina". React uses a `{label:"Select country"}` sentinel
   as `defaultValue`, so it opens with the placeholder text. Content intent differs;
   worth aligning for screenshot/doc consistency.
```

---
