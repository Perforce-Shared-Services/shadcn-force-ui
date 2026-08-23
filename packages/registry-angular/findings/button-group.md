# button-group — Migration Review

## Checklist

### 1. Examples match React base?

Angular has 12 demos; React base has 12 demos — counts match. File names are identical.

| Demo | Deviation | Severity |
|---|---|---|
| `button-group-demo` | DropdownMenu popup fully omitted, replaced by static icon button. `TODO(port)` comment in the Angular file is sufficient internal tracking, but the MDX doc has no `<Callout>` explaining the gap to users. | minor |
| `button-group-rtl` | React version uses a three-language switcher (en/ar/he) with translated button labels and a dynamic `dir` toggle. Angular version is hardcoded English inside a static `dir="rtl"` wrapper — the multilingual behaviour is entirely absent and not flagged by any TODO or Callout. | minor |
| `button-group-nested` | Tooltip omitted (Wave 2 not ported); `TODO(port)` present. | minor |
| `button-group-input-group` | Same Tooltip gap; `TODO(port)` present. | minor |
| All others | Content and behaviour are equivalent. | — |

`button-group-dropdown` correctly uses the ported `DropdownMenuRoot`/`DropdownMenuTrigger` attribute API; the React `render={<Button />}` pattern is translated to `uiDropdownMenuTrigger` on the button directly — correct Angular idiom, not a deviation.

### 2. Docs follow the React/flat pattern?

- ✅ Frontmatter: `title`, `description`, `base: angular`, `component: true` — correct.
- ✅ Hero preview: `<ComponentPreview framework="angular" name="button-group-demo" />` immediately after frontmatter — correct.
- ✅ No `## Examples` umbrella; all examples are flat `##` headings — correct.
- ✅ `## RTL` is second-to-last; `## API Reference` is last — correct.
- ❌ Three example sections have no prose before `<ComponentPreview>`, violating the "no prose-free previews" rule (`docs/component-docs-standard.md §Example sections`):
  - `## Dropdown Menu` — no sentence.
  - `## Select` — no sentence.
  - `## Popover` — no sentence.
  The React base docs have one-line descriptions for each (e.g. "Create a split button group with a `DropdownMenu` component.").
- ℹ️ The React base docs carry two extra informational sections (`## Accessibility` and `## ButtonGroup vs ToggleGroup`) that the Angular page omits. The docs standard does not mandate copying them to ports, but they improve discoverability.

### 3. Available inside the registry?

**Files on disk vs `_registry.ts` entry** (`_registry.ts:340-351`):

| File in entry | On disk |
|---|---|
| `ui/button-group/button-group.component.ts` | ✅ |
| `ui/button-group/button-group-separator.component.html` | ✅ |
| `ui/button-group/button-group-text.component.html` | ✅ |
| `ui/button-group/button-group.component.html` | ✅ |
| `ui/button-group/button-group.variants.ts` | ✅ |
| `ui/button-group/index.ts` | ✅ |

All six files match. No file on disk is unlisted.

**Slug routing:**
- `framework-components.ts` angular `Set` (line 395): `"button-group"` ✅
- `apps/v4/content/docs/components/angular/meta.json`: `"button-group"` ✅
- All 12 `ComponentPreview name="button-group-*"` values map to files in `apps/preview-angular/src/angular/` ✅

**`registryDependencies` accuracy (`_registry.ts:342`):**
```
["button", "input", "textarea", "separator", "label"]
```
- `"button"` — used in every demo ✅
- `"input"` — used in `button-group-input`/`button-group-select` demos ✅
- `"textarea"` — used only in `button-group-popover` demo; the component itself has no textarea import (over-declared, harmless)
- `"separator"` — **not imported**. The Angular port reimplements separator logic inline in `ButtonGroupSeparatorComponent`; `ui/separator` is not imported anywhere in the package. The entry is a stale copy from the React registry where `<Separator>` is a real dependency.
- `"label"` — **not imported** anywhere in the component or variants files. No evidence of usage.

### 4. Style diff vs original p4one

#### `buttonGroupVariants` base string

| Class/token | p4one | Registry Angular | Note |
|---|---|---|---|
| Gap between nested groups | `has-[>[data-slot=button-group]]:gap-2` inline | moved into `cn-button-group` token | equivalent |
| Last child select rounding | `…rounded-r-md` | `…rounded-r-lg` (in `cn-button-group` token) | visual change: larger radius in registry |
| Focus-visible stacking | `[&>*]:focus-visible:relative [&>*]:focus-visible:z-10` | `*:focus-visible:relative *:focus-visible:z-10` | Tailwind v4 shorthand, equivalent |
| Named group | absent | `group/button-group` | enables token targeting |
| Last-child radius fix | absent | `cn-button-group-orientation-{h\|v}` token: `[&>[data-slot]:not(:has(~[data-slot]))]:rounded-{r\|b}-lg!` | feature: correct rounding of last nested group |

#### `ButtonGroupSeparator` classes

| Class | p4one | Registry Angular | Candidate to promote? |
|---|---|---|---|
| Background | `bg-border` (deliberate — see p4one comment) | `bg-input` via `cn-button-group-separator` token | Already in `style-force-ui.css` |
| Vertical sizing | `data-[orientation=vertical]:h-full` | `data-[orientation=vertical]:h-auto` | — |
| Inset margin | absent | `mx-px` / `my-px` | — |

The registry reverses p4one's documented decision to keep `bg-border`. The `cn-button-group-separator { @apply bg-input; }` token is already in `style-force-ui.css:270`.

#### `ButtonGroupText` classes

| Property | p4one | Registry Angular | Candidate to promote? |
|---|---|---|---|
| Radius | `rounded-md` | `rounded-lg` (in `cn-button-group-text`) | Already in `style-force-ui.css` |
| Padding | `px-4` | `px-2.5` | Already in `style-force-ui.css` |
| Shadow | `shadow-xs` | absent | Not in token — possible gap |
| Border colour | `border border-border` explicit | `border` (v4 default resolves to `--color-border`) | Functionally same |

#### Theme promotion candidates

All relevant class clusters are already promoted. No new candidates.

| Token | In `style-force-ui.css`? |
|---|---|
| `cn-button-group` | ✅ line 254 |
| `cn-button-group-orientation-horizontal` | ✅ line 258 |
| `cn-button-group-orientation-vertical` | ✅ line 262 |
| `cn-button-group-text` | ✅ line 266 |
| `cn-button-group-separator` | ✅ line 270 |

---

## Verdict

**PASS-with-notes** — Implementation is structurally sound, fully registered, and template-faithful; the only substantive gaps are three prose-free MDX sections and a stale `registryDependencies` list.

---

## Issues

1. (minor) `_registry.ts:342` — `"separator"` and `"label"` in `registryDependencies` are not imported by the angular button-group source. `"textarea"` is only a demo dependency. The shadcn CLI will install two unnecessary packages for users.

2. (minor) `apps/v4/content/docs/components/angular/button-group.mdx` — `## Dropdown Menu`, `## Select`, `## Popover` sections lack required one-sentence prose before the `<ComponentPreview>` (`docs/component-docs-standard.md §Example sections`).

3. (minor) `apps/preview-angular/src/angular/button-group-rtl.ts` — Language switcher (en/ar/he) and translated button labels present in the React base are absent. Angular RTL demo uses hardcoded English. The deviation is undocumented in the MDX page and has no `<Callout>` explaining why.

4. (minor) `apps/preview-angular/src/angular/button-group-demo.ts` — The DropdownMenu popup is omitted (documented via `TODO(port)`), but `apps/v4/content/docs/components/angular/button-group.mdx` has no corresponding `<Callout>` to inform doc readers about the gap.

5. (note) `ButtonGroupSeparatorComponent` — Registry uses `bg-input` (via `cn-button-group-separator`) while p4one deliberately chose `bg-border`. If either was a mistake, now is the time to align. No blocker — both are valid design choices, but they should be consistent.
```

---
