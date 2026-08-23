# select — Migration Review

## Checklist

### 1. Examples match React base?

Seven React base examples exist; seven Angular demos exist (same file-stem names). Content-level:

- **select-demo / select-disabled / select-groups / select-scrollable / select-invalid**: items, props, and structure match the React originals. Minor idiomatic differences (static items instead of the React `items` array prop, Angular `placeholder` attribute instead of a null-value sentinel item) are expected API differences and are not material.

- **select-align-item** — **material deviation**: The React version (`select-align-item.tsx`) shows a live `Switch` toggle for `alignItemWithTrigger` plus the full `FieldGroup` / `FieldContent` / `FieldDescription` / `Label` / `Switch` composite UI. The Angular demo drops all of that and shows only a static default-value select. The `<Callout>` in the MDX correctly documents the parity shift (radix-ng v1 always item-aligns on pointer input). Per the docs standard §"Documenting a deviation" this is acceptable, but reviewers should note the demo is noticeably sparser than the React interactive version.

- **select-rtl** — **minor deviation**: React uses a live language switcher (`useTranslation`, en/ar/he). Angular uses static Arabic labels. Inline comment cites the established port convention. The RTL behavior itself is demonstrated; the switcher omission is documented by convention.

- **Blocker across all 7 demos** — see Issues §1.

### 2. Docs follow the React/flat pattern?

Angular MDX (`apps/v4/content/docs/components/angular/select.mdx`) matches the React base page section-for-section:

| Criterion | Status |
|---|---|
| Frontmatter: title, description, base, component, featured, links.doc/api | ✅ |
| Hero preview `<ComponentPreview framework="angular" name="select-demo" />` before any heading | ✅ |
| `## Installation` with CLI tab + Manual Steps (deps → ComponentSource → path note) | ✅ |
| `## Usage` import block + minimal snippet | ✅ |
| `## Composition` ASCII tree | ✅ |
| Flat `##` per example — no `## Examples` umbrella | ✅ |
| Section order matches base: Align Item → Groups → Scrollable → Disabled → Invalid → RTL → API | ✅ |
| `## RTL` second-to-last, with `direction="rtl"` on preview | ✅ |
| `## API Reference` last, links out to radix-ng (correct for primitive-wrapping component) | ✅ |
| Deviation (align-item) documented with `<Callout>` under its `##` heading | ✅ |

One minor docs note: the code snippet inside `## Invalid` shows a truncated template (`uiField` → `uiFieldLabel` → `uiSelectTrigger`) with no `uiSelect` root, portal, or positioner. The intent (showing `data-invalid` + `aria-invalid` attributes) is clear, but copying the snippet verbatim will not compile.

### 3. Available inside the registry?

| Check | Result |
|---|---|
| `_registry.ts` entry `"select"` at line 569 | ✅ |
| Files list (7 files): `select.component.ts`, `select.component.html`, `select-trigger.component.html`, `select-item.component.html`, `select.variants.ts`, `select.icons.ts`, `index.ts` — all present on disk | ✅ |
| `dependencies: ["@radix-ng/primitives"]` | ✅ |
| `"select"` in `framework-components.ts` angular Set | ✅ |
| `"select"` in `meta.json` pages array | ✅ |
| `validate:previews` — **would fail**: all 7 demos missing `SelectPortal`/`SelectPositioner` in `imports` | ❌ |

### 4. Style diff vs original p4one

The registry uses radix-ng **v1.x** (portal/positioner API) vs p4one's **v0.x** (CDK overlay). API-level differences are therefore expected and documented. Visual/semantic differences:

| Class / feature | p4one | Angular registry | Notes |
|---|---|---|---|
| `cn-menu-target` on SelectContent | ✅ | ❌ missing | JS dark-mode inversion marker; not in CSS; defined by design-system-provider. Combobox + menubar Angular ports apply it. |
| `cn-menu-translucent` on SelectContent | ✅ | ❌ missing | In `style-force-ui.css:1704`; gives `bg-popover/70` + `backdrop-blur-2xl`. React base `select.tsx` line 95 applies it. Missing = solid popover instead of frosted glass. |
| `cn-select-content-logical` on SelectContent | N/A (p4one v0 had no logical slide-ins) | ❌ missing | In `style-force-ui.css:1096`; RTL-aware slide-in directions. React base applies it. |
| `max-h` | `max-h-[18rem]` (hardcoded, v0 lacked the var) | `max-h-(--radix-select-content-available-height)` (v1 var) | v1 var is correct ✅ |
| `cursor-*` on items | `cursor-pointer` | `cursor-default` | Registry matches React base ✅ |
| Keyboard highlight | `data-highlighted:bg-accent` | `focus:bg-accent` (in `cn-select-item` token) | React base-ui uses `focus:`, radix-ng v1 aligns with that. Token-level, not a registry-angular-only divergence. |
| `aria-labelledby` on SelectGroup → SelectLabel id | ✅ (p4one explicitly wires it; WCAG 4.1.2) | ❌ missing | No id on `SelectLabelDirective`, no binding on `SelectGroupDirective` |
| `aria-hidden` on SelectSeparator | ✅ (`'aria-hidden': 'true'` host binding) | ❌ missing | Decorative separator exposed to a11y tree |

**Theme promotion candidates:**

| Class / behavior | In `style-force-ui.css`? | Promote to global? |
|---|---|---|
| `cn-menu-target` marker | No (JS, not CSS) | Yes — add to `SelectContent` classes; already used in combobox/menubar Angular ports |
| `cn-menu-translucent` | Yes (line 1704) | Yes — add to `SelectContent` classes; matches React base |
| `cn-select-content-logical` | Yes (line 1096) | Yes — add to `SelectContent` classes; matches React base |
| `aria-labelledby` wiring + label `id` | No (logic) | Yes — add to `SelectGroupDirective` + `SelectLabelDirective`; WCAG 4.1.2 fix p4one already had |
| `aria-hidden` on separator | No (attribute) | Yes — add `'aria-hidden': 'true'` host binding to `SelectSeparatorDirective` |

---

## Verdict

**FAIL** — all 7 demo files are missing `SelectPortal` and `SelectPositioner` from their Angular `imports` arrays (compile-time error); `SelectContent` is also missing `cn-menu-translucent` (wrong visual treatment — solid instead of frosted glass) and `cn-menu-target` (design-system dark-mode marker).

## Issues

1. **[blocker]** `SelectPortal` and `SelectPositioner` missing from `imports` in all 7 demo files: `select-demo.ts`, `select-disabled.ts`, `select-groups.ts`, `select-invalid.ts`, `select-rtl.ts`, `select-scrollable.ts`, `select-align-item.ts`. Both directives appear in every template (`uiSelectPortal`, `uiSelectPositioner`) but are not listed in the component's `imports` array. Angular standalone component compilation fails with an "unknown element/directive" error.

2. **[major]** `SelectContentComponent.classes()` (`select.component.ts`) is missing `cn-menu-target`, `cn-menu-translucent`, and `cn-select-content-logical`. The React base `select.tsx` (line 95) applies all three. `cn-menu-translucent` gives the standard translucent frosted-glass popup look (`bg-popover/70` + `backdrop-blur-2xl`); `cn-menu-target` is required by the design-system-provider's dark-mode color-inversion logic. Other Angular registry components (combobox `combobox-content.component.ts:64`, menubar `menubar.component.ts:160`) correctly apply both already.

3. **[major]** `SelectGroupDirective` has no `[attr.aria-labelledby]` host binding and `SelectLabelDirective` has no generated `id`. p4one wired this explicitly to satisfy WCAG 4.1.2 (the group's `role="group"` has no accessible name without it).

4. **[minor]** `SelectSeparatorDirective` is missing `'aria-hidden': 'true'` host binding. The separator is decorative; p4one explicitly marks it hidden. Without it the separator is exposed to the a11y tree with no role or label.

5. **[minor]** `## Invalid` code snippet in `select.mdx` is truncated (no `uiSelect` root, no portal/positioner) — copying it verbatim won't compile. Could mislead users.

---
