# field — Migration Review

## Checklist

### 1. Examples match React base?

13 Angular demos (`field-{demo,input,textarea,select,slider,fieldset,checkbox,radio,switch,choice-card,group,rtl,responsive}.ts`) match all 13 React base files (`apps/v4/examples/base/field-*.tsx`) in structure, variant set, and ID attributes. Two intentional fallbacks:

- **`field-select.ts`** — uses `<select class="border-input h-9 w-full rounded-md …">` instead of `uiSelect` (Select not yet ported; Wave 2). A `TODO(port)` comment is in the file. **No `<Callout>` exists under `## Select` in the MDX.** Per the docs standard (§ "Documenting a deviation"), a callout is required when the example deviates. Same applies to `field-demo.ts` and `field-rtl.ts` which also embed native `<select>` elements.
- **`field-slider.ts`** — uses two `<input type="range">` instead of a dual-thumb `uiSlider`. Documented with a `TODO(port)` comment. **No `<Callout>` under `## Slider` in the MDX.**

No other material deviations. ID namespacing, RTL Arabic strings, and orientation values all match the React originals.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/field.mdx`:

- **Frontmatter** ✅ — `title`, `description`, `base: angular`, `component: true`.
- **Hero preview** ✅ — `<ComponentPreview framework="angular" name="field-demo" …/>` is the first element.
- **Installation** ✅ — `<CodeTabs>` with `cli` (npx command) and `manual` (Steps with dependencies + `<ComponentSource>`).
- **Usage** ✅ — import block + HTML snippet.
- **Flat `##` per example** ✅ — no `## Examples` umbrella. Every example has its own `##` heading with one sentence of prose and one `<ComponentPreview>`.
- **`## RTL`** ✅ — second-to-last, `direction="rtl"`, links to `/docs/rtl`.
- **`## API Reference`** ✅ — last section, `### PartName` per export (Force-UI-original convention), props table per part.
- **Section order** ✅ — identical to base/field.mdx.
- **Minor gap**: React base Validation section uses bare `data-invalid` attribute (`<Field data-invalid>`). Angular docs correctly maps this to `[invalid]="true"` (Angular binding). Not a deviation — this is idiomatic Angular. ✅

### 3. Available inside the registry?

- **`_registry.ts` entry** (lines 296–308): `name: "field"`, `type: "registry:ui"`, `registryDependencies: ["separator"]`. Files listed: `field.component.ts`, `field.component.html`, `field-separator.component.html`, `field-error.component.html`, `field.variants.ts`, `index.ts` — all 6 on-disk files covered. ✅
- **`framework-components.ts`** angular Set: `"field"` present. ✅
- **`meta.json`** pages: `"field"` present. ✅
- **Demo resolution**: all 13 `field-*.ts` files exist in `apps/preview-angular/src/angular/`, matching the 13 `<ComponentPreview>` names in the MDX. `validate:previews` should pass.

### 4. Style diff vs original p4one

| Class / construct | p4one (`pd-p4one`) | Angular registry | Verdict |
|---|---|---|---|
| `data-[invalid=true]:text-destructive` on `FieldComponent` | In `fieldVariants` cva base string; also applied via conditional `text-destructive` class (Tailwind v4 can't emit arbitrary `data-[val]:` variants in that app) | Delegated to `cn-field` token in `style-force-ui.css` (`@apply data-[invalid=true]:text-destructive gap-2`) | Registry is cleaner; p4one workaround is p4one-local |
| `has-[>[data-slot=field]]:border` on `FieldLabel` | `has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-border` — explicit `border-border` because that app has no global border color reset | `cn-field-label` token has bare `has-[>[data-slot=field]]:border` (no `-border` color class) | **p4one-local** — Force UI's global CSS sets `--border` so bare `border` resolves correctly in the registry context |
| `[[data-variant=legend]+&]:-mt-1.5` on `FieldDescription` | Inlined in component | Delegated to `cn-field-description` CSS token | Registry is cleaner ✅ |
| `px-2 text-muted-foreground` on separator inner span | Inlined in component template | Delegated to `cn-field-separator-content` token | Registry is cleaner ✅ |
| `group-data-[disabled=true]:opacity-50` on `FieldLabel` | Unscoped, in label-primitive base string | Via `cn-label` token (`group-data-[disabled=true]:opacity-50`) + scoped `group-data-[disabled=true]/field:opacity-50` via `cn-field-label` — both present | Functionally equivalent ✅ |
| `FieldError` empty-alert guard (`[hidden]`) | `hasContent` signal | `hasAnyContent` signal (renamed) | Identical logic, local rename only ✅ |

**Theme promotion candidates**

| Candidate | Current location | Promote? |
|---|---|---|
| `data-[invalid=true]:text-destructive gap-2` | `cn-field` in `style-force-ui.css` | Already global ✅ |
| `group-data-[disabled=true]/field:opacity-50` | `cn-field-label` in `style-force-ui.css` | Already global ✅ |
| `has-data-checked:bg-primary/5 border-primary/30` | `cn-field-label` in `style-force-ui.css` | Already global ✅ |
| `[[data-variant=legend]+&]:-mt-1.5` | `cn-field-description` in `style-force-ui.css` | Already global ✅ |
| `has-[>[data-slot=field]]:border-border` (explicit color) | p4one inline only | **Do not promote** — p4one-local workaround; not needed with Force UI's global border reset |

No net new candidates require promotion; all structural tokens are already in `style-force-ui.css`.

---

## Verdict

**PASS-with-notes** — Implementation is complete, registry-correct, and structurally aligned with the React base. Two minor docs gaps (missing `<Callout>` for the native-select and native-range fallbacks in `## Select` and `## Slider`) prevent a clean PASS.

---

## Issues

1. **(minor)** `apps/v4/content/docs/components/angular/field.mdx` `## Select` section — native `<select>` fallback used in `field-select.ts` (and in `field-demo.ts`/`field-rtl.ts`) but no `<Callout>` documents the deviation as required by `docs/component-docs-standard.md § "Documenting a deviation"`.

2. **(minor)** `apps/v4/content/docs/components/angular/field.mdx` `## Slider` section — native `<input type="range">` fallback in `field-slider.ts` has no `<Callout>` explaining the deviation.

3. **(minor)** `apps/preview-angular/src/angular/field-error.component.html` (via `FieldErrorComponent`): `hasProjectedContent` is initialized to `false` and updated only in `ngAfterViewInit`. In SSR contexts, projected static content (`<div uiFieldError>message</div>`) will be hidden until client hydration. Same pattern as p4one; the component's JSDoc in p4one notes to "mount conditionally", but the Angular registry's public component carries no such note. Low risk for Angular non-SSR apps; worth a JSDoc note for SSR users.
```

---
