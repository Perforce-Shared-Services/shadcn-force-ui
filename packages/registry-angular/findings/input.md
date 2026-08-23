# input — Migration Review

## Checklist

### 1. Examples match React base?

React base has 16 input-specific demo files (excluding `input-group-*` and `input-otp-*`, which belong to their own component pages). The Angular port has matching files for all 16. Coverage is 1:1.

**Material deviations:**

| Demo | React (`apps/v4/examples/base/`) | Angular (`apps/preview-angular/src/angular/`) | Verdict |
|------|-----------------------------------|-----------------------------------------------|---------|
| `input-demo` | `type="password"`, label "API Key", placeholder "sk-...", with `<FieldDescription>` | `type="email"`, label "Email", placeholder "m@example.com", **no FieldDescription** | ❌ Different use-case; hero demo diverges materially |
| `input-variants` | container: `flex w-full flex-col gap-4` | container: `flex w-full max-w-sm flex-col gap-3` — adds `max-w-sm`, shrinks gap | ⚠️ Minor layout difference |
| `input-rtl` | uses `useTranslation` hook (toggleable ar/he/en) | static Arabic labels, documented with `// [FORCE-UI]` comment | ✅ Acceptable Angular deviation |
| `input-input-group` | uses `<InfoIcon />` from `@/examples/material-symbols` | inline SVG for same info-circle icon | ✅ Functional parity |
| `input-disabled` | `<Field data-disabled>` | `<div uiField attr.data-disabled="true">` | ✅ Angular attribute-binding equivalent |

### 2. Docs follow the React/flat pattern?

Angular `apps/v4/content/docs/components/angular/input.mdx`:

- ✅ Frontmatter: `title`, `description`, `base: angular`, `component: true`
- ✅ Hero preview: `<ComponentPreview framework="angular" name="input-demo" />` immediately after frontmatter
- ⚠️ Hero is missing `previewClassName="*:max-w-xs"` present on the React base page
- ✅ `## Installation` with cli/manual `<CodeTabs>` block; `<ComponentSource framework="angular" name="input" />`
- ✅ `## Usage` with import and `<input uiInput …>` snippet
- ✅ Flat `##` per example — no `## Examples` umbrella, no `###` for top-level examples
- ✅ Section order matches React base exactly (Variants → Basic → Field → Field Group → Disabled → Invalid → File → Inline → Grid → Required → Badge → Input Group → Button Group → Form → RTL → API Reference)
- ✅ `## RTL` is second to last with `direction="rtl"`
- ✅ `## API Reference` is last, with an Angular-flavored `| Input | Type | Default |` table
- ✅ All `<ComponentPreview>` blocks use `framework="angular"`, not a `styleName`

### 3. Available inside the registry?

| Check | Result |
|-------|--------|
| `_registry.ts` entry name `"input"` at line 216 | ✅ |
| Files listed: `input.variants.ts`, `input.component.ts`, `input.component.html`, `index.ts` | ✅ All 4 exist on disk |
| No `registryDependencies` — leaf component with no peer deps | ✅ Correct (input has no component dependencies) |
| No `dependencies` — no npm package needed | ✅ Correct |
| `"input"` in `framework-components.ts` angular Set | ✅ |
| `"input"` in `apps/v4/content/docs/components/angular/meta.json` pages array | ✅ |
| `input.component.html` listed in registry but component uses `template: ""` inline (not `templateUrl`) | ⚠️ Empty HTML file — consistent with `textarea` convention, registry convention not a bug |

The `validate:previews` check should resolve all 16 `preview-input-*.ts` files; the selectors follow the `preview-input-{variant}` pattern used by the preview app's glob.

### 4. Style diff vs original p4one

**Structural approach:**

| Axis | p4one (`pd-p4one/app/src/app/ui/input/input.variants.ts`) | Angular registry (`packages/registry-angular/ui/input/input.variants.ts`) |
|------|----|----|
| Base | All raw Tailwind utilities (no `cn-*` class) | `cn-input` CSS class + supplementary raw utilities |
| Variants | Raw utilities per variant (e.g. `rounded-lg border border-border hover:border-input bg-transparent disabled:bg-muted`) | `cn-input-variant-{name}` CSS classes (delegates to `style-force-ui.css`) |

**Concrete class differences (p4one raw → registry treatment):**

| Class(es) in p4one | Exists in `cn-input` CSS | In Angular port base string | Notes |
|--------------------|--------------------------|----------------------------|-------|
| `text-foreground` | ✗ | ✗ | p4one-local; explicit text color absent from port and cn-input |
| `outline-none` | ✗ | ✓ | Supplementary in port; not promoted |
| `placeholder:text-muted-foreground` | ✗ | ✓ | Supplementary in port; not promoted |
| `file:inline-flex file:border-0 file:bg-transparent` | partial (h-6, text-sm, font-medium in cn-input) | ✓ | Supplementary in port; file pseudo-element reset split between CSS and TS |
| `file:text-foreground` | ✗ | ✓ | Supplementary in port; not promoted |
| `disabled:pointer-events-none disabled:cursor-not-allowed` | ✗ | ✓ | Supplementary in port; not promoted |
| `transition-colors` | ✓ (in cn-input) | ✓ (also in supplementary) | Harmless duplicate |
| **Border tier** (border-border at rest, border-input on hover, border-ring on focus) | p4one-local variant design | promoted to `cn-input-variant-*` CSS | ✅ Correctly promoted |
| `[&[readonly]]` muted treatment | ✓ in p4one | ✓ in cn-input (`[&[readonly]]:bg-muted [&[readonly]]:border-border`) | ✅ Correctly promoted |

**Theme promotion candidates** (classes present in both p4one and Angular port supplementary but absent from `cn-input`):

| Candidate | Reason to promote | Risk |
|-----------|------------------|------|
| `text-foreground` | Ensures input text color is explicit on all surfaces, not relying on cascade | None — `foreground` is the expected input color everywhere |
| `outline-none` | Removes the browser 2 px outline; already in both p4one and the port | None — focus ring supplied by `focus-visible:ring-3` |
| `placeholder:text-muted-foreground` | Consistent placeholder color across all consumers | None |
| `file:inline-flex file:border-0 file:bg-transparent file:text-foreground` | Completes the file pseudo-element reset; cn-input only covers `file:h-6 file:text-sm file:font-medium` | None |
| `disabled:pointer-events-none disabled:cursor-not-allowed` | Cursor/pointer feedback for disabled inputs; cn-input only covers the background (`disabled:bg-input/50`) | None |

---

## Verdict

**PASS-with-notes** — Registry wiring is complete and correct (all 16 base examples present, `_registry.ts` files list matches disk, slug in `framework-components.ts` and `meta.json`, docs follow the flat `##` pattern with RTL before API Reference). Two minor content deviations from the React base require follow-up.

---

## Issues

1. **(minor)** `input-demo.ts` shows "Email / type=email / no FieldDescription" while `input-demo.tsx` shows "API Key / type=password / FieldDescription". The hero demo is the most visible example — it should match React content or document the deviation per `docs/component-docs-standard.md §Documenting a deviation`.

2. **(minor)** `input-variants.ts` container adds `max-w-sm` and uses `gap-3` vs React's unconstrained `gap-4`. No functional impact but reduces visual fidelity of the preview.

3. **(minor)** Hero `<ComponentPreview>` in `angular/input.mdx` is missing `previewClassName="*:max-w-xs"` that the React base page carries; the preview likely renders full-width.

4. **(minor)** `packages/registry-angular/DIVERGENCES.md` has no `## input` section despite the tiered border pattern, the supplementary-utility approach, and the `text-foreground` omission being worth recording. Other ported components (e.g. `button`) document their divergences there.

5. **(note)** `text-foreground` is absent from both `cn-input` and the Angular port's supplementary base classes. p4one sets it explicitly. Promotion to `cn-input` would make input text color explicit across all framework ports.

6. **(note)** `transition-colors` appears in both the `cn-input` CSS class and the Angular port's CVA base string — harmless duplicate, same as the button pattern.

---
