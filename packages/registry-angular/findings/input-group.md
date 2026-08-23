# input-group — Migration Review

## Checklist

### 1. Examples match React base?

Full count parity: all 25 React base files (`apps/v4/examples/base/input-group-*.tsx`) have
exact Angular counterparts (`apps/preview-angular/src/angular/input-group-*.ts`).

Material deviations found:

| Demo | Deviation | Status |
|---|---|---|
| `input-group-button.ts` | React opens a Radix Popover from the info button; Angular renders the button without a popup. | ✅ Documented with `<Callout>` in the MDX |
| `input-group-custom.ts` | React uses `react-textarea-autosize`; Angular uses CSS `field-sizing-content`. | ✅ Appropriate adaptation, comment in file |
| `input-group-label.ts` | React uses Tooltip for the help button; Angular uses a native `title` attribute. Comment says "documented in the MDX" but there is no `## Label` section in either React or Angular MDX. Stale — Tooltip is now ported. | ⚠ Minor stale comment |
| **`input-group-textarea.ts`** | `InputGroupText` imported at TS level, used as `uiInputGroupText` in the template, but **missing from `@Component.imports`**. Angular will not resolve the directive. | 🔴 Bug |

### 2. Docs follow the React/flat pattern?

Checked against `docs/component-docs-standard.md` and `apps/v4/content/docs/components/base/input-group.mdx`.

- Frontmatter: `title`, `description`, `base: angular`, `component: true` ✅
- Hero `<ComponentPreview name="input-group-demo">` immediately after frontmatter ✅
- `## Installation` with CLI + manual `<CodeTabs>` ✅
- `## Usage` → `## Composition` → flat `##` per behaviour → `## RTL` → `## API Reference` ✅
- `###` used only for alignment sub-variants and per-part API blocks ✅
- `## Button` `<Callout>` documents the popover deviation ✅
- `## Dropdown` is missing `previewClassName="h-56"` present in the React base. Minor visual drift.
- Nine demos (`input-group-basic`, `input-group-label`, `input-group-tooltip`, `input-group-in-card`,
  `input-group-with-*`, `input-group-button-group`, `input-group-textarea-examples`) exist on disk
  but have no corresponding `##` section — same gap exists in the React base MDX, not Angular-specific.

### 3. Available inside the registry?

- `_registry.ts` line 310: entry `name: "input-group"` present ✅
- Files list matches disk exactly — all 10 files listed:
  `input-group.variants.ts`, `input-group-addon.variants.ts`, `input-group-button.variants.ts`,
  `input-group.component.ts`, `input-group-addon.component.ts`, `input-group-button.component.ts`,
  `input-group-text.component.ts`, `input-group-input.component.ts`,
  `input-group-textarea.component.ts`, `index.ts` ✅
- `registryDependencies: ["button", "input", "textarea"]` ✅
- `framework-components.ts` angular Set line 43: `"input-group"` ✅
- `meta.json` pages array: `"input-group"` ✅
- All MDX-referenced previews use `framework="angular"` + matching `.ts` files on disk ✅

### 4. Style diff vs original p4one

`/opt/dev/pd-p4one/app/src/app/ui/input-group/` bakes all Tailwind utilities inline into
every `cva` base/variant string. The registry delegates to `cn-*` tokens in
`style-force-ui.css`. Concrete class differences:

| Item | p4one | Registry CSS | p4one-local? |
|---|---|---|---|
| `outline` resting border | `border-border hover:border-input` (inline) | same, in `cn-input-group-variant-outline` | Already in global theme |
| `filled` dark bg | absent | `dark:bg-muted` in `cn-input-group-variant-filled` | Already in global theme (minor improvement) |
| `ghost` dark bg | absent | `dark:bg-transparent` in `cn-input-group-variant-ghost` | Already in global theme (minor improvement) |
| Button `sm` size | `''` (empty string in cva) | `cn-input-group-button-size-sm` (no CSS rule → same no-op) | No action needed |
| Addon base utilities | all inline in cva | split to `cn-input-group-addon` token + minimal inline utilities | Already in global theme |

**Theme promotion candidates**

| Candidate | Verdict |
|---|---|
| `dark:bg-muted` on `filled` | Already promoted — lives in `cn-input-group-variant-filled` |
| `dark:bg-transparent` on `ghost` | Already promoted — lives in `cn-input-group-variant-ghost` |

No p4one-local styles remain unaccounted for in the global theme.

---

## Verdict

**PASS-with-notes** — one real bug (`input-group-textarea.ts` missing `InputGroupText` in `imports`)
and two minor notes. Registry wiring, example parity, and docs structure are solid.

## Issues

1. **[major]** `apps/preview-angular/src/angular/input-group-textarea.ts`: `InputGroupText`
   is imported in the TypeScript `import` statement and used as `uiInputGroupText` in the
   template, but is absent from the `@Component.imports: [...]` array. Angular's template
   compiler will either error or silently drop the directive, leaving the `<span>` unstyled.
   Fix: add `InputGroupText` to `imports: [InputGroup, InputGroupAddon, InputGroupButton,`
   `InputGroupText, InputGroupTextarea]`.

2. **[minor]** `apps/preview-angular/src/angular/input-group-label.ts`: comment reads
   "documented in the MDX" but neither the Angular nor the React base MDX has a `## Label`
   section. The note about Tooltip not being ported is also stale — Angular Tooltip is live.
   Remove or update the comment.

3. **[minor]** `apps/v4/content/docs/components/angular/input-group.mdx` `## Dropdown` section:
   `previewClassName="h-56"` present in the React base version is absent. Cosmetic height
   mismatch in the preview.

4. **[minor]** `apps/preview-angular/src/angular/input-group-custom.ts`: TypeScript `import`
   includes `InputGroupTextarea` but it is not used in the template and not in `@Component.imports`.
   Dead import; no functional impact.
```

---
