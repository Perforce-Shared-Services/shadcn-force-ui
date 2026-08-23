# toggle-group — Migration Review

## Checklist

### 1. Examples match React base?

React base (`apps/v4/examples/base/toggle-group-*.tsx`) has 8 files:
`demo`, `outline`, `sizes`, `spacing`, `vertical`, `font-weight-selector`, `disabled`, `rtl`.
Angular preview (`apps/preview-angular/src/angular/toggle-group-*.ts`) has the same 8 names. ✅ Count matches.

Material deviations per file:

| Demo | React base | Angular | Verdict |
|------|-----------|---------|---------|
| `toggle-group-demo` | Bold/Italic/Underline icons, `variant="outline"`, `multiple` (multi-select) | Alignment (left/center/right) icons, no explicit `variant`, `type="single"` | **Major** — different icons AND different selection mode (multiple → single) |
| `toggle-group-font-weight-selector` | 4 options: Light / Normal / **Medium** / Bold; includes `FieldDescription` reactive block | 3 options: Light / Normal / Bold; no `FieldDescription` | **Major** — "Medium" option missing, description strip absent |
| `toggle-group-rtl` | Language-selector widget with AR/HE/EN translations, `dir` prop on group | Static `dir="rtl"` wrapper `<div>`, no language picker | Minor — acceptable framework simplification; RTL rendering still exercised |
| `toggle-group-spacing` | `spacing={2}` prop | `class="gap-2"` workaround (no `spacing` prop exists on Angular component) | Major — masks that `spacing` is unimplemented |
| `toggle-group-outline`, `toggle-group-sizes`, `toggle-group-vertical`, `toggle-group-disabled` | — | Functionally equivalent content | ✅ |

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/toggle-group.mdx`

- ✅ Frontmatter: `title`, `description`, `base: angular`, `component: true`, `links.doc` + `links.api`
- ✅ Hero `<ComponentPreview framework="angular" name="toggle-group-demo" />` immediately after frontmatter
- ✅ `## Installation` with CLI + manual tabs; manual includes `<ComponentSource>` and install step
- ✅ `## Usage` with import + template snippet
- ✅ Flat `##` per example — no `## Examples` umbrella (new standard met)
- ✅ `## RTL` second-to-last with `<ComponentPreview>` of `toggle-group-rtl`
- ✅ `## API Reference` last, links out to radix-ng (correct for wrapped primitive)
- ⚠️ **Section order differs from base**: Angular page orders _Vertical → Font Weight Selector → Disabled_; base orders _Vertical → Disabled → Custom (font-weight-selector)_. Minor per-page deviation, not structural.
- ⚠️ Heading `## Font Weight Selector` vs base's `## Custom`. "Font Weight Selector" is technically more descriptive, but deviates from the cross-framework consistency target.
- ✅ No prose-free previews; each section has at least one describing sentence.

### 3. Available inside the registry?

**`_registry.ts`** (`packages/registry-angular/ui/_registry.ts`, lines 183–192):
```ts
{ name: "toggle-group", type: "registry:ui",
  dependencies: ["@radix-ng/primitives"],
  registryDependencies: ["toggle"],
  files: [
    { path: "ui/toggle-group/toggle-group.component.ts", type: "registry:ui" },
    { path: "ui/toggle-group/index.ts", type: "registry:ui" },
  ], … }
```
Both files on disk; both listed. ✅

**`framework-components.ts`**: `"toggle-group"` present in the `angular` Set (line 443). ✅

**`meta.json`** (`apps/v4/content/docs/components/angular/meta.json`, line 62): `"toggle-group"` present. ✅

**Generated JSON** (`apps/v4/public/r-angular/styles/angular-force-ui/toggle-group.json`): exists and content matches source. ✅

**`validate:previews` resolution**: all 8 `framework="angular" name="toggle-group-*"` references in the MDX resolve to files in `apps/preview-angular/src/angular/`. ✅ (No orphan previews found.)

### 4. Style diff vs original p4one

Reference: `reference/pd-p4one/ui/toggle-group/` vs Angular port + `style-force-ui.css` `cn-toggle-group*` rules.

**Group root class string** (`ToggleGroupComponent.classes()`):

| Feature | p4one (inline Tailwind) | Angular port | CSS token |
|---------|------------------------|--------------|-----------|
| `w-fit` | ✅ `w-fit` | ❌ missing | Not in `cn-toggle-group` |
| Gap/spacing | `gap-[--spacing(var(--gap))]` driven by CSS var from `[style.--gap]` | ❌ no gap; consumer adds `class="gap-2"` | Not in token |
| Rounded | `rounded-lg data-[size=sm]:rounded-[...]` inline | Delegated to `cn-toggle-group` → ✅ equivalent via CSS |
| Vertical layout | `data-vertical:flex-col data-vertical:items-stretch` (data-attr responsive) | TS ternary `flex-col / flex-row`; `items-stretch` ❌ missing | Not in token |
| `[attr.data-spacing]` | ✅ set from `spacing` input | ❌ not emitted (no `spacing` input) | Required by CSS |

**Item class string** (`ToggleGroupItemComponent.classes()`):

| Feature | p4one | Angular port | CSS token |
|---------|-------|--------------|-----------|
| Connected-segment base | inline in `TOGGLE_GROUP_ITEM_CLASS` | in `cn-toggle-group-item` CSS | ✅ equivalent |
| Border-sharing (outline + spacing=0) | 4 extra classes: `group-data-horizontal/…:data-[variant=outline]:border-l-0`, `:border-t-0`, `:first:border-l`, `:first:border-t` | ❌ not in `cn-toggle-group-item` CSS | **Missing from global theme** |
| `[attr.data-spacing]` on item | ✅ from group's `spacing()` | ❌ not emitted | Required for CSS selectors to fire |

**Theme promotion candidates:**

| Class / pattern | Currently in `style-force-ui.css`? | Promote? |
|-----------------|------------------------------------|----------|
| `w-fit` on group | No | Yes — global spacing default |
| Border-sharing (`border-l-0 / border-t-0 / first:border-l / first:border-t`) for `spacing=0` + outline | No | Yes — without them, connected outline groups have doubled inner borders |
| `items-stretch` for vertical orientation | No | Yes — vertical items should stretch to full width |
| `gap-[--spacing(var(--gap))]` via CSS custom property | No | Yes (if `spacing` prop is implemented) |

---

## Verdict

**FAIL**

Two behavioral blockers: (1) `ToggleGroupItemComponent` uses `RdxToggle` (standalone) instead of a group-item directive — items do not participate in group selection state, roving-focus keyboard nav, or group-level `disabled` propagation; (2) the `type` input (`"single" | "multiple"`) is not forwarded through `hostDirectives`, so the radix-ng directive cannot receive it as an Angular binding.

---

## Issues

1. **[blocker]** `toggle-group.component.ts:69` — `ToggleGroupItemComponent.hostDirectives` uses `RdxToggle` (from `@radix-ng/primitives/toggle`) instead of a toggle-group-item directive. `RdxToggle` is the standalone toggle; it does not inject `RdxToggleGroup` context, so the group's `value` won't drive visual selection, `valueChange`/`onValueChange` won't fire on click, and roving-focus arrow-key navigation won't apply. The inline comment acknowledges this as a v1.x limitation but the behavioral impact is full group non-function. Requires either (a) upgrading to a version of `@radix-ng/primitives` that exports a dedicated group-item API, or (b) implementing group context via Angular DI manually.

2. **[blocker]** `toggle-group.component.ts:34` — `hostDirectives` for `ToggleGroupComponent` only forwards `["value", "disabled"]` from `RdxToggleGroup`. The `type` input (`"single" | "multiple"`) is not forwarded. Consumers (and all 8 demos) use `type="single"` as a static HTML attribute on `<div>`, which sets a DOM attribute but does not bind the Angular input on `RdxToggleGroup`. Whether `RdxToggleGroup` reads this attribute at runtime is an undocumented implementation detail; the current contract is fragile. Fix: add `"type"` to the `inputs` array.

3. **[major]** `toggle-group.component.ts` — `ToggleGroupComponent` has no `spacing` input and emits no `[attr.data-spacing]`. The entire connected-segment CSS in `style-force-ui.css` (`cn-toggle-group-item`: `group-data-[spacing=0]/toggle-group:rounded-none`, corner rounding, etc.) requires `data-spacing="0"` on the group ancestor to activate. Without it, these rules are permanently dead. The spacing demo hides this gap with `class="gap-2"`.

4. **[major]** `apps/preview-angular/src/angular/toggle-group-font-weight-selector.ts` — Angular demo has 3 font-weight options (Light/Normal/Bold); React base has 4 (Light/Normal/Medium/Bold). "Medium" is absent. `FieldDescription` reactive block is also absent. Per standard, the demo should match content unless deviation is documented.

5. **[major]** `apps/preview-angular/src/angular/toggle-group-demo.ts` — React base hero uses Bold/Italic/Underline icons with `multiple` (no initial selection). Angular hero uses alignment icons with `type="single"` and a pre-selected value. Different selection model is a behavioral deviation, not a cosmetic one.

6. **[major]** `style-force-ui.css` lines 1437–1439 — `cn-toggle-group-item` is missing the four border-sharing Tailwind classes from p4one's `TOGGLE_GROUP_ITEM_CLASS` (`border-l-0`, `border-t-0`, `first:border-l`, `first:border-t` for `spacing=0` + `variant=outline`). Even if `spacing` were implemented, connected outline groups would render with doubled inner borders.

7. **[minor]** `toggle-group.component.ts` — `ToggleGroupComponent.classes()` is missing `w-fit` and `items-stretch` (for vertical orientation) that p4one includes. Without `w-fit`, the group div expands to full container width by default; without `items-stretch`, vertical-orientation items don't stretch to group width.

8. **[minor]** `apps/v4/content/docs/components/angular/toggle-group.mdx` — Section order: Angular lists _Font Weight Selector_ before _Disabled_; base orders _Disabled_ before _Custom_. Not a structural fault but breaks cross-framework order consistency.
```

---
