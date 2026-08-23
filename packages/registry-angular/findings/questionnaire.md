# questionnaire — Migration Review

## Checklist

### 1. Examples match React base?

No React base questionnaire exists: `apps/v4/examples/base/questionnaire-*.tsx` returns zero
files and `apps/v4/content/docs/components/base/questionnaire.mdx` does not exist. The docs
Callout on the Angular page correctly states this is a Force UI original ported from p4one
(same situation as `ui/stepper`). Parity check against React base is **N/A**.

The 8 Angular demos all trace to documented p4one stories:

| Angular demo file | p4one story | Material deviation |
|---|---|---|
| `questionnaire-demo.ts` | `Playground` | None — content, structure, freeform input all present |
| `questionnaire-gallery.ts` | `Gallery` | Condensed to 2 forms (first + last step); intentional |
| `questionnaire-multiple-choice.ts` | `MultipleChoice` | None |
| `questionnaire-number-shortcuts.ts` | `NumberShortcuts` | None |
| `questionnaire-required-validation.ts` | `RequiredValidation` | None |
| `questionnaire-rtl.ts` | (RTL variant) | None |
| `questionnaire-single-question.ts` | `SingleQuestion` | None |
| `questionnaire-steps-progress.ts` | `StepsProgress` | None |

### 2. Docs follow the flat pattern?

Page: `apps/v4/content/docs/components/angular/questionnaire.mdx`

- **Frontmatter**: `title`, `description`, `base: angular`, `component: true` ✓  
- **Hero preview**: `<ComponentPreview framework="angular" name="questionnaire-demo" />` immediately after frontmatter, before any heading ✓  
- `## Installation` (CLI + manual tabs) ✓  
- `## Usage` (import snippet + minimal HTML snippet) ✓  
- `## Composition` (ASCII tree of all parts) ✓  
- **Flat `##` per example** — Multiple, Required Validation, Single Question, Number Shortcuts, Steps Progress, Step States — no `## Examples` umbrella ✓  
- Each section has prose and exactly one `<ComponentPreview>` ✓  
- `## RTL` second to last ✓  
- `## API Reference` last, per-part `### PartName` + prop tables (Force UI original pattern, correct choice) ✓  
- `## Usage` import block omits `QuestionnaireDescription`, `QuestionnaireChoiceDescription`, `QuestionnaireInput` (all used in the hero demo and documented in API Reference) — minor docs gap, not structural.

### 3. Available inside the registry?

- `_registry.ts` entry at line 762, `name: "questionnaire"` ✓  
- Files list: all 9 disk files listed (`index.ts`, both `choice.*`, both `progress.*`, `questionnaire.component.*`, `questionnaire.icons.ts`, `questionnaire.variants.ts`) ✓  
- **`registryDependencies` is WRONG** (see Issues #1 below)  
- `framework-components.ts` `angular` Set contains `"questionnaire"` ✓  
- `meta.json` `pages` array contains `"questionnaire"` ✓  
- All 8 `name=` values in MDX resolve to existing `.ts` files in `apps/preview-angular/src/angular/` — `validate:previews` should pass ✓

### 4. Style diff vs p4one

Source: `pd-p4one/app/src/app/ui/questionnaire/` vs `packages/registry-angular/ui/questionnaire/`.

| Slot | p4one class / token | Registry class / token | p4one-local or promotion candidate |
|---|---|---|---|
| **Title font size** | `text-[1rem] leading-[1.375]` (16 px, Figma-verified) | `text-sm leading-snug` (14 px) | p4one-local (`cn-font-heading` + exact Figma size). Registry intentionally uses force-ui heading convention — documented in `questionnaire.variants.ts`. Smaller than spec. |
| **Title legend fix** | `[-webkit-text-fill-color:var(--foreground)]` | absent | p4one-local. The p4one JSDoc says bare `<legend>` renders near-white without this fix in the app's cascade. Omitting may silently regress host apps with a similar cascade. |
| **Choice checked border** | `data-checked:border-primary` (solid, Figma-verified) | `data-checked:border-primary/30 dark:data-checked:border-primary/20` | Deliberate softening. Candidate for a `--questionnaire-choice-checked-border` token if the softer tint becomes the canonical force-ui choice. Currently diverges from Figma spec. |
| **Choice checked bg** | `data-checked:bg-control-primary-wash` (private: primary @ 5 %/10 %) | `data-checked:bg-primary/5 dark:data-checked:bg-primary/10` | **Promotion candidate**: `bg-control-primary-wash` is app-private; the registry expansion (`primary/5`/`primary/10`) is the correct portable equivalent. If this pair is used by other components, extract to a `cn-primary-wash` token in `style-force-ui.css`. |
| **Invalid ring** | `ring-destructive/20 dark:ring-destructive/40` | same | ✓ No diff |
| **Progress steps host classes** | TS-conditional (`steps ? 'flex w-full …' : 'text-xs …'`) | Single cva string with `data-[steps]:*` overrides | Functionally equivalent. Registry approach is more idiomatic for CSS; `data-[steps]:min-w-0` correctly resets `min-w-[14ch]` in steps mode. |
| **cn-font-heading on title** | `cn-font-heading` utility | absent | p4one-local (not in force-ui token set). Documented. |

**Theme promotion candidates table:**

| Token pattern | Appears in | Recommendation |
|---|---|---|
| `bg-primary/5 dark:bg-primary/10` (primary wash bg) | choice `data-checked`, `cn-field-label` (noted in comment) | Extract to `cn-questionnaire-choice-checked-bg` or shared `cn-primary-wash` in `style-force-ui.css` |
| `border-primary/30 dark:border-primary/20` (soft primary border) | choice `data-checked` only | Hold — verify against final Figma before promoting |

## Verdict

**PASS-with-notes** — component is functionally complete, docs follow the flat structure, all demo files exist and resolve for `validate:previews`. One blocker: wrong `registryDependencies` in `_registry.ts` will cause `kbd` to be absent when installed via the shadcn CLI.

## Issues

1. **[blocker]** `_registry.ts` line 763: `registryDependencies: ["button", "input", "radio-group", "field"]` is wrong. `questionnaire-choice.component.ts` imports `Kbd` from `@/angular-ui/kbd`; `kbd` is missing. `radio-group` and `field` are not imported anywhere in the questionnaire package. Correct value: `["button", "input", "kbd"]`.

2. **[minor]** Title font size: registry uses `text-sm` (14 px) while p4one used `text-[1rem]` (16 px, Figma-verified per p4one JSDoc). Comment in `questionnaire.variants.ts` calls this intentional ("force-ui heading convention"), but it diverges from the Figma spec. Confirm with design before shipping.

3. **[minor]** `[-webkit-text-fill-color:var(--foreground)]` is absent from the title legend. P4one added it to prevent near-white legend text under its CSS cascade. Risk is environment-dependent; low in a fresh host app, high if the host's cascade has a similar issue.

4. **[minor]** `## Usage` import block omits `QuestionnaireDescription`, `QuestionnaireChoiceDescription`, and `QuestionnaireInput` — all shown in the hero demo and in the Composition tree. Readers copying the import block will get a runtime error the first time they use those parts.

5. **[minor]** Choice `data-checked:border-primary/30` deviates from p4one's Figma-verified `data-checked:border-primary` (solid). Document as intentional in `DIVERGENCES.md` or reconcile with design.
```

---
