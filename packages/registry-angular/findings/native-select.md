# native-select — Migration Review

## Checklist

### 1. Examples match React base?

React base has 5 examples: `native-select-demo`, `native-select-disabled`,
`native-select-groups`, `native-select-invalid`, `native-select-rtl`. Angular
has the same 5 files in `apps/preview-angular/src/angular/`.

| Example | Match? | Notes |
|---|---|---|
| `native-select-demo` | ✅ | Same options: `Select status / Todo / In Progress / Done / Cancelled` |
| `native-select-disabled` | ✅ | Native `disabled` attr; same option set |
| `native-select-groups` | ✅ | Engineering / Sales / Operations groups; same option values/labels |
| `native-select-invalid` | ✅ | `aria-invalid="true"` on select; same option set |
| `native-select-rtl` | ⚠️ | React uses `useTranslation` with a live EN/AR/HE language selector. Angular uses static Arabic labels + `dir="rtl"` on both wrapper and select. Visual RTL state is equivalent; a comment in `native-select-rtl.ts` explains the choice, but the MDX has no `<Callout>` documenting the deviation per the docs standard. |

### 2. Docs follow the React/flat pattern?

Checked against `docs/component-docs-standard.md` and `apps/v4/content/docs/components/base/native-select.mdx`.

| Check | Status |
|---|---|
| Frontmatter: `title`, `description`, `base: angular`, `component: true` | ✅ |
| Hero `<ComponentPreview framework="angular" name="native-select-demo" />` before any heading | ✅ |
| `## Installation` — CodeTabs with `cli` + `manual` tabs | ✅ |
| `## Usage` — import block + html snippet | ✅ |
| `## Composition` — ASCII trees for simple and group cases | ✅ |
| Flat `##` per example (Groups, Disabled, Invalid) — no `## Examples` umbrella | ✅ |
| Each example section has one sentence of prose + one `<ComponentPreview>` | ✅ |
| `## RTL` second-to-last with `direction="rtl"` on its preview | ✅ |
| `## API Reference` last; plain-element-wrapper format (`### PartName` + prop tables) | ✅ |
| RTL deviation documented with `<Callout>` per docs standard §"Documenting a deviation" | ❌ (minor, see Issues #1) |

### 3. Available inside the registry?

- **`_registry.ts`** (line 428): entry `"native-select"` lists 6 files:
  `native-select.component.ts`, `native-select-wrapper.component.html`,
  `native-select.component.html`, `native-select.variants.ts`,
  `native-select.icons.ts`, `index.ts` — all exist on disk. ✅
- No `dependencies` key — correct; no `@radix-ng/primitives` needed for a native element wrapper. ✅
- **`framework-components.ts`** angular `Set`: `"native-select"` present (line 421). ✅
- **`meta.json`**: `"native-select"` at line 40. ✅
- **`index.ts`** exports all four classes from `"./native-select.component"` — correct since all four (`NativeSelectWrapperComponent`, `NativeSelectComponent`, `NativeSelectOptionComponent`, `NativeSelectOptGroupComponent`) are defined in that single consolidated file. ✅

### 4. Style diff vs original p4one

**Architecture**: p4one splits into four files (`native-select.component.ts`,
`native-select-wrapper.component.ts`, `native-select-option.component.ts`,
`native-select-optgroup.component.ts`); the registry consolidates all four into
`native-select.component.ts`. Fewer files, valid registry choice.

**Icon source**: p4one imports from
`@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw`; registry uses
an inline SVG string constant in `native-select.icons.ts`, removing the
`@material-symbols` dependency from the install. ✅

**Field classes**: p4one `nativeSelectVariants` base is a full Tailwind string
(`border-border hover:border-input focus-visible:border-ring focus-visible:ring-3
focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3
aria-invalid:ring-destructive/20 dark:bg-input/30 dark:hover:bg-input/50 ...`).
The registry base is `cn-native-select outline-none disabled:pointer-events-none
disabled:cursor-not-allowed` — all visual styling is in the `cn-native-select`
CSS token in `style-force-ui.css:981`. ✅

**Size variant**: p4one emits `h-7 rounded-[min(var(--radius-md),10px)] py-0.5`
as CVA class strings. Registry `sm` variant string is empty (`""`); the compact
size is driven by `data-[size=sm]:h-7 data-[size=sm]:rounded-...` inside the
CSS token instead. Both emit `data-size` on the host. ✅

**Chevron icon span**:
- p4one template: `class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none [&>svg]:size-4 [&>svg]:fill-current"`
- Registry template (`native-select-wrapper.component.html`): `class="cn-native-select-icon pointer-events-none absolute select-none [&>svg]:fill-current"` where `cn-native-select-icon` expands to `text-muted-foreground top-1/2 right-2.5 size-4 -translate-y-1/2`.
- `absolute` and `pointer-events-none` intentionally stay in the template alongside the token (the CSS token alone does not position the icon). Functional.
- `[&>svg]:size-4` from p4one is absent from both the token and registry template. SVG fills the container `size-4` naturally. Minor missing constraint (see Issues #3).

**Wrapper host**: p4one: `group/native-select relative w-fit has-[select:disabled]:opacity-50`. Registry adds `[&_svg]:fill-current` to the host class. The `[&_svg]` selector (all-descendants) is broader than p4one's `[&>svg]:fill-current` on just the icon span (see Issues #2).

#### Theme promotion candidates

| Class group | In p4one | Promoted to `style-force-ui.css`? |
|---|---|---|
| Tiered border (`border-border` → hover `border-input` → focus `border-ring`) | Inline in variants | ✅ `cn-native-select` token |
| Focus ring (`focus-visible:ring-3 focus-visible:ring-ring/50`) | Inline in variants | ✅ `cn-native-select` token |
| Invalid ring/border (`aria-invalid:border-destructive aria-invalid:ring-3 ...`) | Inline in variants | ✅ `cn-native-select` token |
| Dark mode (`dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:*`) | Inline in variants | ✅ `cn-native-select` token |
| sm size classes (`data-[size=sm]:h-7 ...`) | CVA variant string | ✅ `cn-native-select` token |
| Icon span `absolute` + `pointer-events-none` | Inline in template | ❌ Remain in wrapper template |
| `[&>svg]:size-4` on icon span | Inline in template | ❌ Not in token or template |

---

## Verdict

**PASS-with-notes** — Full example parity with React base (5/5 demos), correct
registry registration, docs follow the flat-`##` standard. Two cosmetic gaps and
one undocumented deviation.

---

## Issues

1. **(minor)** `apps/v4/content/docs/components/angular/native-select.mdx` — `## RTL`
   section deviates from the React example (static Arabic vs live language selector) but
   lacks a `<Callout>` noting the deviation, as required by docs standard
   §"Documenting a deviation".

2. **(minor)** `packages/registry-angular/ui/native-select/native-select.component.ts`
   `NativeSelectWrapperComponent` host class includes `[&_svg]:fill-current` (all SVG
   descendants). The p4one equivalent targeted only `[&>svg]:fill-current` on the icon
   span itself. Any SVG inside option text would also receive `fill: currentColor`.

3. **(minor)** `apps/v4/registry/styles/style-force-ui.css` `cn-native-select-icon`
   token and `native-select-wrapper.component.html` both lack `[&>svg]:size-4` — present
   in the p4one wrapper to explicitly constrain the inner SVG size.
```

---
