# slider — Migration Review

## Checklist

### 1. Examples match React base?

7 React base examples; 7 Angular demos — full parity by file name.

| Demo | Verdict | Notes |
|---|---|---|
| `slider-demo` | ✅ | `defaultValue=[75]` / `max=100` / `step=1` / wrapper class identical. Angular adds `aria-label` for WCAG 4.1.2 — React omits it; Angular is more correct. |
| `slider-range` | ✅ | `defaultValue=[25,50]`, `step=5`. Identical. |
| `slider-multiple` | ✅ | `defaultValue=[10,20,70]`, `step=10`. Identical. |
| `slider-vertical` | ✅ | Two sliders, `defaultValue=[50]`/`[25]`, `class="h-40"`. Identical. |
| `slider-controlled` | ✅ | `signal([0.3, 0.7])` + `[(value)]` mirrors React `useState + onValueChange`. Label + value display matches. |
| `slider-disabled` | ✅ | `defaultValue=[50]`, `disabled`. Identical. |
| `slider-rtl` | ✅ | Static `dir="rtl"` replaces React's `useTranslation` dynamic dir. Comment in file explains this. |

**Bonus note**: `apps/preview-angular/src/angular/field-slider.ts` still uses native `<input type="range">` with a `TODO(port)` comment to swap to `uiSlider` now that this port exists. Not a blocker for the slider review, but is a follow-up task for the `field` component.

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/slider.mdx`

- Frontmatter: `title`, `description`, `base: angular`, `component: true` ✅
- Hero preview: `<ComponentPreview framework="angular" name="slider-demo" />` immediately after frontmatter ✅
- `## Installation` with CLI + manual tabs, `<ComponentSource framework="angular" name="slider" />` ✅
- `## Usage` with import and snippet ✅
- Flat `## Range`, `## Multiple Thumbs`, `## Vertical`, `## Controlled`, `## Disabled` — each has a prose sentence and a `<ComponentPreview>` ✅; no `## Examples` umbrella ✅
- `## RTL` second to last, with `direction="rtl"` ✅
- `## API Reference` last, links to radix-ng docs ✅

**Minor gap**: frontmatter has no `links.doc`/`links.api`. Docs standard says framework ports should link to their framework's primitive docs (radix-ng equivalent of the base page's `links.api: https://base-ui.com/...`). The inline API Reference body does link to `https://www.radix-ng.com/primitives/slider`, so it is reachable, but the frontmatter entry is absent.

### 3. Available inside the registry?

- `_registry.ts` entry at line 371 — name `"slider"`, `type: "registry:ui"`, `dependencies: ["@radix-ng/primitives"]`. ✅
- Files list: `ui/slider/slider.component.ts`, `ui/slider/slider.component.html`, `ui/slider/index.ts` — all three exist on disk. ✅
- `framework-components.ts` angular Set includes `"slider"` at line 321. ✅
- `meta.json` includes `"slider"` at line 53. ✅
- All 7 demo files resolve (named `slider-{variant}.ts`, flat in `apps/preview-angular/src/angular/`). ✅

### 4. Style diff vs original p4one

p4one used `slider.variants.ts` class strings; the registry port uses global `cn-slider*` tokens + inline template layout classes.

| Slot | p4one class | Global token (`cn-slider*`) | Template inline | Classification |
|---|---|---|---|---|
| Range | `absolute` | ❌ absent | ❌ absent | **p4one-local** — not needed; `RdxSliderIndicator.indicatorStyle()` injects `position` via inline style. |
| Range | `data-horizontal:h-full data-vertical:w-full` | ❌ absent | ❌ absent | **p4one-local** — not needed; v1.x directive sets `height/width: inherit` via inline style. |
| Range | `select-none` | ❌ absent | ❌ absent | Promotion candidate — omitted from both. |
| Track | `relative grow overflow-hidden` | ❌ absent | ✅ inline | Layout only — correctly kept out of token. |
| Wrapper | `data-disabled:opacity-50` | ❌ absent | ❌ absent | **Bug** — p4one compensated via TS `class.opacity-50`; v1.x `RdxSliderControl` sets `data-disabled=""` (confirmed in bundle), so `data-disabled:opacity-50` on `controlClasses()` would work, but it is missing entirely. |
| Thumb | `motion-reduce:transition-none` | ✅ `cn-slider-thumb` `[FORCE-UI]` | ✅ | Already promoted. |
| Thumb | `disabled:pointer-events-none disabled:opacity-50` | ❌ in token | ✅ inline | **Dead code on div** — `:disabled` CSS pseudo-class never matches `<div>`. `RdxSliderThumb` sets `data-disabled`, not `disabled`. |

**Theme promotion candidates**

| Class | Slot | Promote to `cn-slider-range`? | Reason |
|---|---|---|---|
| `select-none` | range | Yes | Consistent with thumb/track; prevents accidental text selection during drag |
| `data-disabled:opacity-50` | control wrapper | No (template, not token) | Add to `controlClasses()` in `slider.component.ts`; `RdxSliderControl` owns `data-disabled` |

---

## Verdict

**PASS-with-notes** — Full example parity and correct registry registration. Two real bugs: disabled state is not visually reflected (major) and `disabled:` Tailwind variants on the thumb div are dead code (minor). Docs are structurally sound with one minor frontmatter gap.

---

## Issues

1. **(Major)** `controlClasses()` in `slider.component.ts` is missing `data-disabled:opacity-50`. `RdxSliderControl` (confirmed at `radix-ng-primitives-slider.mjs:594`) sets `[attr.data-disabled]="root.isDisabled() ? '' : undefined"` on its host, so the Tailwind variant would work. The React base source (`slider.tsx`) puts `data-disabled:opacity-50` on `SliderPrimitive.Control`. Without it, a disabled Angular slider is visually indistinguishable from an enabled one — a WCAG 1.4.3-adjacent UX failure.

2. **(Minor)** `slider.component.html` thumb classes `disabled:pointer-events-none disabled:opacity-50` on `<div rdxSliderThumb>` are dead code. The CSS `:disabled` pseudo-class does not match `<div>` elements. `RdxSliderThumb` sets `data-disabled=""`, not a `disabled` attribute. Pointer-event blocking is already handled by `RdxSliderControl.onPointerDown` checking `isDisabled()` (verified in bundle). Replace with `data-disabled:opacity-50` or drop and rely on the control-level fix above.

3. **(Minor)** `apps/v4/content/docs/components/angular/slider.mdx` frontmatter is missing `links.doc`/`links.api`. Docs standard (section "Page structure") requires framework ports to link to their primitive's docs when the base page does. Add `links: { doc: "https://www.radix-ng.com/primitives/slider" }` to the frontmatter.

---
