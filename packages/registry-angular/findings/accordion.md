# accordion — Migration Review

## Checklist

### 1. Examples match React base?

All 7 demo file names are present in `apps/preview-angular/src/angular/` (`accordion-{demo,basic,borders,card,disabled,multiple,rtl}.ts`), matching the React base set exactly.

**File-by-file deviations:**

| Demo | React base | Angular port | Deviation |
|---|---|---|---|
| `accordion-demo` | e-commerce FAQ (shipping/returns/support), `defaultValue={["shipping"]}`, no `type`/`collapsible` | Meta-questions (accessible?/styled?/animated?), `type="single"` `collapsible` (plain attrs), `class="w-full max-w-sm"`, no `defaultValue` | Content AND structure differ; uses dead v0.x API (see §Issues #1) |
| `accordion-basic` | Password/subscription/payment items, `defaultValue={["item-1"]}`, `className="max-w-lg"` | Same content, `[defaultValue]="['item-1']"`, `class="w-full max-w-lg"` | Extra `w-full` — cosmetic only |
| `accordion-borders` | Content identical | Content identical | ✓ |
| `accordion-card` | Content identical | Content identical | ✓ |
| `accordion-disabled` | `disabled` boolean attr | `[disabled]="true"` binding | Equivalent behavior ✓ |
| `accordion-multiple` | Notification/privacy/billing items, `multiple` bool attr, `defaultValue={["notifications"]}` | Product/shipping/returns items, `[multiple]="true"`, no `defaultValue` | Content cosmetically different; no `defaultValue` (minor) |
| `accordion-rtl` | `useTranslation` hook, 3 languages (en/ar/he), 3 items | `dir="rtl"` wrapper, hardcoded Arabic, 2 items, `type="single"` `collapsible` (dead attrs) | Reasonable framework simplification for content; dead API still present |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/accordion.mdx` is the best-structured Angular doc page in the repo:
- Frontmatter: `title`, `description`, `base: angular`, `component: true`, `links.doc` + `links.api` ✓
- Hero `<ComponentPreview framework="angular" name="accordion-demo" />` before first heading ✓
- `## Installation` → `## Usage` → `## Composition` → flat `## Basic`, `## Multiple`, `## Disabled`, `## Borders`, `## Card`, `## RTL`, `## API Reference` ✓ (no `## Examples` umbrella)
- `## API Reference` last, links out to radix-ng (correct for a primitive wrapper) ✓
- **Missing**: `direction="rtl"` attribute on the RTL `<ComponentPreview>`. Base page uses `direction="rtl"` on its RTL preview; Angular page omits it.

### 3. Available inside the registry?

- `_registry.ts` entry at line 106: `name: "accordion"`, `dependencies: ["@radix-ng/primitives"]` ✓
- Files listed: `accordion.component.ts`, `accordion-trigger.component.html`, `accordion-content.component.html`, `index.ts` — all four exist on disk ✓
- `"accordion"` in `framework-components.ts` Angular `Set` (line ~385) ✓
- `"accordion"` in `apps/v4/content/docs/components/angular/meta.json` pages ✓
- All 7 demo files exist and are top-level in `apps/preview-angular/src/angular/` — resolvable by `validate:previews` ✓

**Residual risk**: `_registry.ts` lists only the `.html` templates; Angular projects that use the CLI add would need to consume both the `.ts` and `.html` files in the correct relative layout. The pairing is implicit (template paths must match what the `.ts` references) — this works only if the consuming project keeps the same directory structure. No evidence of breakage, but worth confirming with a real CLI smoke-test.

### 4. Style diff vs original p4one

**AccordionComponent (root)**

| Input | Registry | p4one | Note |
|---|---|---|---|
| `multiple` | ✓ forwarded | — | v1.x API |
| `type` | ✗ not forwarded | ✓ forwarded | v0.x API; removed intentionally |
| `collapsible` | ✗ not forwarded | ✓ forwarded | v0.x API; removed intentionally |
| `dir` | ✗ not forwarded | ✓ forwarded | RTL done via wrapper `div` in demos instead |
| `id` | ✗ | ✓ | Low impact |

**AccordionItemComponent classes**

| Feature | Registry | p4one |
|---|---|---|
| Item divider | `cn-accordion-item` → CSS `@apply not-last:border-b` | Inline `not-last:border-b` |
| `border-border` | ✓ explicit | ✓ explicit |
| Animation class | via `cn-accordion-content` in CSS | Manual `data-open/closed` bridge via `injectAccordionItemContext` |

**AccordionTriggerComponent**

| Feature | Registry | p4one |
|---|---|---|
| Vertical alignment | `items-center` | `items-start` |
| Trigger group class | `cn-accordion-trigger` (CSS-side) | Long inline class with group/accordion-trigger |
| Focus-visible ring | in `cn-accordion-trigger` CSS | Inline |
| Chevron source | `CHEVRON_DOWN_SVG` inlined in `.ts` | `ACCORDION_TRIGGER_SVG` in separate `accordion.icons.ts` |

`items-center` vs `items-start` is a **visual difference for multi-line trigger text**; p4one's `items-start` keeps the label flush-top while registry's `items-center` vertically centres it against the chevron.

**AccordionContentComponent**

| Feature | Registry | p4one |
|---|---|---|
| Radix-ng directive | `RdxAccordionPanelDirective` | `RdxAccordionContentDirective` |
| Link hover colour | (none beyond `[&_a]:underline`) | `[&_a]:hover:text-foreground` |
| Paragraph spacing | (none) | `[&_p:not(:last-child)]:mb-4` |

`RdxAccordionPanelDirective` (registry) is the v1.x rename of `RdxAccordionContentDirective` (p4one/v0.x). p4one also works around `data-state` → `data-open/closed` via `injectAccordionItemContext`; the registry doesn't need this bridge on v1.x.

**Theme promotion candidates**

| p4one style | Location | Promote? |
|---|---|---|
| `[&_a]:hover:text-foreground` | content inner div | Candidate — consistent with Force UI link hover convention |
| `[&_p:not(:last-child)]:mb-4` | content inner div | Candidate — generic prose spacing, useful globally |
| `items-start` on trigger | AccordionTrigger classes | Candidate — better for multi-line FAQ-style triggers |

---

## Verdict

**PASS-with-notes** — Registry entry, docs page structure, and demo file set are all present and correctly wired. Two demos (`accordion-demo.ts`, `accordion-rtl.ts`) contain dead v0.x API attributes (`type="single"` and `collapsible`) that the v1.x `AccordionComponent` does not forward, producing misleading demo code without a runtime crash. The hero demo content also diverges structurally from the React canonical.

---

## Issues

1. **[major]** `accordion-demo.ts` and `accordion-rtl.ts` use `type="single"` and `collapsible` as plain HTML attributes. The registry `AccordionComponent` explicitly documents v1.x API where `[multiple]` replaces `type`+`collapsible`, and neither `type` nor `collapsible` appears in the `hostDirectives.inputs` array (`accordion.component.ts:43`). These attributes are silently ignored at runtime; the demos do not demonstrate the documented API. Fix: remove `type="single"` `collapsible` from both demos (the accordion already defaults to single-open); add `[multiple]="false"` or an explanatory comment if collapsible behaviour is intended.

2. **[major]** `accordion-demo.ts` hero content (accessibility/styling/animation meta-questions) diverges structurally from the React base (`accordion-demo.tsx`: shipping/returns/support FAQ, `defaultValue={["shipping"]}`). The Angular demo has no `defaultValue`, so no item opens initially — different behavior from the base canonical. Align content and add `[defaultValue]="['shipping']"` (or equivalent) to match React.

3. **[minor]** `apps/v4/content/docs/components/angular/accordion.mdx` RTL `<ComponentPreview>` is missing `direction="rtl"`. Base page (`base/accordion.mdx`) passes it. Add `direction="rtl"` to the Angular RTL preview tag.

4. **[minor]** `accordion-trigger.component.html` uses `items-center`; p4one uses `items-start`. Multi-line trigger text will be vertically centred against the chevron in the registry version rather than top-aligned. Consider promoting `items-start` to `cn-accordion-trigger` in `style-force-ui.css`.

5. **[minor]** `accordion-content.component.html` inner div lacks `[&_a]:hover:text-foreground` and `[&_p:not(:last-child)]:mb-4` present in p4one's content div. These are candidates for `cn-accordion-content-inner` in `style-force-ui.css`.
