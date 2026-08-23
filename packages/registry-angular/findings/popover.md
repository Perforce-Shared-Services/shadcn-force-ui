# popover — Migration Review

## Checklist

### 1. Examples match React base?

React base has 5 example files; Angular has all 5. File-by-file:

| Demo | Present | Deviation |
|---|---|---|
| `popover-demo` | ✅ | `Button` not imported; `uiButton` attribute is silently dead — trigger renders as unstyled native `<button>`. Same defect in all 5 demos. |
| `popover-basic` | ✅ | Same missing `Button` import. |
| `popover-alignments` | ✅ | Same missing `Button` import. |
| `popover-form` | ✅ | Same missing `Button` import. |
| `popover-rtl` | ✅ | Static Arabic strings + hardcoded `dir="rtl"` instead of `useTranslation` hook — acceptable Angular simplification; visual output matches React's Arabic/RTL state. |

Evidence: `popover-demo.ts` imports array `[Popover, PopoverTrigger, PopoverPortal, PopoverPositioner, PopoverContent, Label, Input]` — no `Button`. Contrast `tooltip-demo.ts` and `dropdown-menu-demo.ts` which both correctly import `Button`.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/popover.mdx`:

- **Frontmatter** ✅ — `title`, `description`, `base: angular`, `component: true`, `links.doc`, `links.api` all present.
- **Hero preview** ✅ — `<ComponentPreview framework="angular" name="popover-demo" />` immediately after frontmatter.
- **`## Installation`** ✅ — CodeTabs with CLI + manual steps, ComponentSource, update-paths step.
- **`## Usage`** ✅ — import snippet + template snippet.
- **`## Composition`** ✅ — ASCII part tree (optional; present and correct).
- **Flat `##` per example** ✅ — `## Basic`, `## Align`, `## With Form` — no `## Examples` umbrella.
- **`## RTL`** ✅ — one-line guide pointer + `<ComponentPreview ... direction="rtl" />`.
- **`## API Reference`** ✅ — last; links out to radix-ng docs (correct for upstream-wrapping component).

No deviations from the `docs/component-docs-standard.md` pattern.

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` (lines 489–497):
- `name: "popover"` ✅
- `type: "registry:ui"` ✅
- `dependencies: ["@radix-ng/primitives"]` ✅
- Files listed: `popover.component.ts`, `popover.component.html`, `index.ts` — all 3 exist on disk ✅

`apps/v4/lib/framework-components.ts` angular Set (line 423): `"popover"` ✅

`apps/v4/content/docs/components/angular/meta.json`: `"popover"` present ✅

All 5 demo files exist in `apps/preview-angular/src/angular/` and resolve for `validate:previews` ✅

### 4. Style diff vs p4one

`/opt/dev/pd-p4one/app/src/app/ui/popover/popover-content.component.ts` vs new port:

| Element | p4one | New Angular port | Assessment |
|---|---|---|---|
| Content class | Inline `POPOVER_CONTENT_CLASS` string (verbatim expand of `cn-popover-content`) | `cn-popover-content` token | **Token promotion done** ✅ |
| Logical-side slide | Absent (pre-token) | **`cn-popover-content-logical` missing** | **Gap vs React base** ❌ |
| Header class | `"flex flex-col gap-0.5 text-sm"` inline | `cn-popover-header` token | Promoted ✅ |
| Title class | `"cn-font-heading font-medium"` | `cn-popover-title` (`font-medium`) | p4one-local `cn-font-heading` dropped correctly — React base doesn't use it ✅ |
| Description class | `"text-muted-foreground"` | `cn-popover-description` token | Promoted ✅ |
| aria wiring | Manual `contentChild` → `aria-labelledby`/`aria-describedby` | Claimed via `RdxPopoverTitle`/`RdxPopoverDescription` v1.x host directives | **Unverified** ⚠️ |
| Focus return on close | `effect()` restores focus to trigger on `open → false` (WCAG 2.4.3) | Absent — claimed handled by v1.x primitive | **Unverified** ⚠️ |
| `aria-controls` guard | Emits `null` when closed (avoids dangling IDREF) | Absent — claimed handled by v1.x primitive | **Unverified** ⚠️ |

#### Theme promotion candidates

| p4one divergence | Candidate for `style-force-ui.css`? |
|---|---|
| `cn-font-heading` on `PopoverTitle` | No — p4one-local; React base intentionally omits it |
| All other inline content/header/title/description strings | Already promoted to `cn-popover-*` tokens |

---

## Verdict

**FAIL** — two confirmed major defects (missing `Button` import in all demos; `cn-popover-content-logical` absent from `PopoverContentComponent`), plus three unverified a11y claims that differ from the p4one implementation.

---

## Issues

1. **[major]** `Button` not imported in any of the 5 demo files (`popover-demo.ts`, `popover-basic.ts`, `popover-alignments.ts`, `popover-form.ts`, `popover-rtl.ts`). The `uiButton` attribute selector has no effect; trigger buttons render as plain unstyled `<button>` elements. Add `import { Button } from "@/angular-ui/button"` and include `Button` in each `imports` array.

2. **[major]** `PopoverContentComponent` (`popover.component.ts` `classes()` computed) applies `cn-popover-content` but omits `cn-popover-content-logical`. React base (`apps/v4/registry/bases/base/ui/popover.tsx`) uses both. Without `cn-popover-content-logical`, `data-[side=inline-start]:slide-in-from-right-2` and `data-[side=inline-end]:slide-in-from-left-2` never fire — the RTL demo (`popover-rtl.ts`) explicitly exercises these sides, so the directional slide animation is broken. Fix: add `"cn-popover-content-logical"` to the computed class string.

3. **[major, unverified]** `PopoverTriggerDirective` has no focus-return-on-close logic. p4one explicitly implemented this to cover CDK's gap (WCAG 2.4.3). The component comment claims radix-ng v1.x handles it natively. If the v1.x `RdxPopoverTrigger` still uses CDK internally, keyboard users will be stranded on `document.body` after closing with Escape or an outside-click. Requires runtime verification.

4. **[minor, unverified]** `aria-labelledby`/`aria-describedby` wiring for the popup box is claimed to come from `RdxPopoverTitle`/`RdxPopoverDescription` v1.x host directives. p4one wired this manually because v0.x didn't. If v1.x doesn't provide it either, the popover panel will announce as `"dialog"` with no accessible name (WCAG 1.3.1 / 4.1.2). Requires runtime verification with a screen reader.

5. **[minor]** `PopoverTriggerDirective` re-exposes `inputs: ["handle", "payload", "id", "disabled"]` from `RdxPopoverTrigger`. The inputs `handle` and `payload` are non-standard names not found in the React API — verify these are valid v1.x inputs and not phantom names that silently no-op.
```

---

## Review

- **Correct:** Registry entry (`_registry.ts`) is complete with all 3 disk files, correct dependency, correct slug. Both `framework-components.ts` angular Set and `meta.json` include `"popover"`. All 5 demo files exist. Docs follow the flat `##`-per-example structure with all required sections in order; API Reference links out correctly. All p4one inline class strings are properly promoted to `cn-popover-*` tokens.

- **Blocker:** `cn-popover-content-logical` is missing from `PopoverContentComponent.classes()` — logical-side RTL slide animations (`inline-start`/`inline-end`) are broken. The RTL demo explicitly uses these sides.

- **Blocker:** All 5 demo files use `uiButton` on a `<button>` element without importing `Button` from `@/angular-ui/button`. The attribute is silently dead; trigger buttons are unstyled in the previews.

- **Note:** Focus-return-on-close and `aria-controls` guarding absent from `PopoverTriggerDirective`; new port claims v1.x handles both natively. Requires a11y runtime verification before the component can be considered fully compliant with WCAG 2.4.3 / 4.1.2.

- **Note:** `aria-labelledby`/`aria-describedby` wiring claimed via `RdxPopoverTitle`/`RdxPopoverDescription` host directives — unverified; was a manual gap-fill in p4one.
