# menubar — Migration Review

## Checklist

### 1. Examples match React base?

All 6 Angular demos correspond to the 6 React base files (`menubar-demo`, `menubar-checkbox`, `menubar-radio`, `menubar-submenu`, `menubar-icons`, `menubar-rtl`). File-by-file:

| Demo | Status | Notes |
|------|--------|-------|
| `menubar-demo.ts` | ✓ match | Identical menu structure (File/Edit/View/Profiles), same items, shortcuts, submenus, checkbox/radio items |
| `menubar-checkbox.ts` | ✓ match | Format menu uses `signal`+`[(checked)]` — correct Angular idiom for React controlled state |
| `menubar-radio.ts` | ✓ match | `[value]/(valueChange)` on radio group — Angular idiomatic; functionally equivalent to React `onValueChange` |
| `menubar-submenu.ts` | ✓ match | Same two-menu structure (File/Edit), identical nested items |
| `menubar-icons.ts` | ✓ match | Same six icons via inline Material Symbols SVGs (no external icon import needed in Angular) |
| `menubar-rtl.ts` | ✗ deviation | **Missing "View" menu.** React RTL example has 4 menus (File, Edit, View, Profiles); Angular has 3 (File, Edit, Profiles). The View menu's checkbox items are absent. The React version also supports English/Hebrew via a language selector; Angular uses hardcoded Arabic, which is an acceptable simplification, but the missing menu is a content gap. |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/menubar.mdx`:

- **Frontmatter** — ✓ `title`, `description`, `base: angular`, `component: true`, `links.doc`/`links.api`
- **Hero preview** — ✓ `<ComponentPreview framework="angular" name="menubar-demo" />` immediately after frontmatter
- **## Installation** — ✓ `<CodeTabs>` with `cli` and `manual` tabs; `manual` has `<Steps>`, `<ComponentSource>`, import note
- **## Usage** — ✓ import block + HTML snippet
- **## Composition** — ✓ ASCII tree present
- **Flat ## sections** — ✓ `## Checkbox`, `## Radio`, `## Submenu`, `## With Icons`, `## RTL`, `## API Reference` — no `## Examples` umbrella
- **Prose per section** — `## With Icons` has **no descriptive sentence** before the `<ComponentPreview>`. Every other section has one. Docs standard requires "exactly one sentence or two of prose; no prose-free previews."
- **## RTL** — ✓ second-to-last; pointer to `/docs/rtl`; `direction="rtl"` on preview
- **## API Reference** — ✓ last; links out to radix-ng primitive docs (correct for an upstream-wrapper component)

### 3. Available inside the registry?

**`_registry.ts`** (line 553–566): entry present with all 8 files on disk listed:
```
ui/menubar/menubar.component.ts        ✓
ui/menubar/menubar.component.html      ✓
ui/menubar/menubar-selectable.component.ts ✓
ui/menubar/menubar-sub.component.ts    ✓
ui/menubar/menubar-sub.component.html  ✓
ui/menubar/menubar.variants.ts         ✓
ui/menubar/menubar.icons.ts            ✓
ui/menubar/index.ts                    ✓
```
Dependencies: `["@radix-ng/primitives"]` ✓. No extra files on disk that are unlisted.

**`framework-components.ts`**: `"menubar"` in the angular Set at line 49 ✓ (also present in every other framework Set).

**`meta.json`** (`angular/meta.json`, line 37): `"menubar"` in `pages` array ✓.

**Preview resolution**: all 6 `menubar-*.ts` files exist flat in `apps/preview-angular/src/angular/` ✓. `validate:previews` should pass.

### 4. Style diff vs original p4one

| Element | p4one class / approach | cn-* token / registry class | Delta | Promotion candidate? |
|---------|----------------------|----------------------------|-------|---------------------|
| Root bar | `flex h-8 items-center gap-1 rounded-md border border-border bg-background p-1` (inline constant) | `cn-menubar`: `h-8 gap-1 rounded-md border border-border bg-background p-1` + directive adds `flex items-center` | Split between token and directive; semantically identical | No — split is intentional |
| Trigger | `transition-colors motion-reduce:transition-none hover:bg-muted aria-expanded:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50` | Same in `cn-menubar-trigger` token | Equivalent | No |
| Item | **includes** `transition-colors motion-reduce:transition-none` | `cn-menubar-item` token: **absent**; `MENUBAR_ITEM_BASE`: **absent** | Items lack transition in registry | **Yes** — add `transition-colors motion-reduce:transition-none` to `cn-menubar-item` |
| Checkbox/Radio item | **includes** `transition-colors motion-reduce:transition-none` | `cn-menubar-checkbox-item`/`cn-menubar-radio-item` tokens: **absent**; `MENUBAR_SELECTABLE_ITEM_BASE`: **absent** | Same gap | **Yes** — add to both selectable-item tokens |
| Separator | inline `-mx-1 my-1 h-px bg-border` | `cn-menubar-separator`: `bg-border`; directive adds `-mx-1 my-1 h-px` | Equivalent | No |
| RadioGroup | `RdxMenubarRadioGroupDirective` — no `value`/`valueChange` (documented p4one gap) | `RdxMenuRadioGroup` — exposes `value`, `valueChange`, `onValueChange` | Registry is **better** | N/A — not a token |
| Sub support | **None** (`MenubarSub`/`MenubarSubTrigger`/`MenubarSubContent` absent, documented gap) | Full sub implementation via generic `RdxMenuRoot` + `RdxMenuPositioner` + `RdxMenuPopup` | Registry **adds capability** | N/A |
| Checkbox indicator | DomSanitizer workaround for `onCheckedChange` void payload; own `checkedChange` output | Direct `hostDirectives.outputs: ["checkedChange"]` from `RdxMenuCheckboxItem` | Different primitive import; void-payload risk unresolved (see Issues #5) | N/A |

**Theme promotion candidates:**

| Token | Missing class | Reason |
|-------|--------------|--------|
| `cn-menubar-item` | `transition-colors motion-reduce:transition-none` | p4one has it; peers (dropdown-menu-item, context-menu-item) have it; WCAG 2.3.3 guard |
| `cn-menubar-checkbox-item` | `transition-colors motion-reduce:transition-none` | Same rationale |
| `cn-menubar-radio-item` | `transition-colors motion-reduce:transition-none` | Same rationale |

---

## Verdict

**PASS-with-notes** — Registry entry is complete, docs structure is sound, 5 of 6 demos match exactly. Two issues need follow-up before closing: the RTL demo is missing the "View" menu (content gap vs base), and the checkbox `[(checked)]` two-way binding depends on `RdxMenuCheckboxItem.checkedChange` emitting a boolean (not void) — this must be smoke-tested since the analogous p4one primitive had a void-payload bug requiring a manual workaround.

---

## Issues

1. **[minor] `menubar-rtl.ts` missing "View" menu** — Angular RTL demo (`apps/preview-angular/src/angular/menubar-rtl.ts`) has 3 menus; React base (`apps/v4/examples/base/menubar-rtl.tsx`) has 4. The "View" menu (with `MenubarCheckboxItem` rows for Bookmarks Bar / Full URLs and `MenubarItem inset` rows for Reload / Force Reload / Toggle Fullscreen / Hide Sidebar) is absent. The docs standard does not allow silently dropping content; the missing menu should be added or documented as a deviation via `<Callout>`.

2. **[minor] `## With Icons` section has no prose** — `apps/v4/content/docs/components/angular/menubar.mdx` line immediately after `## With Icons` is `<ComponentPreview ...>` with no intervening sentence. Docs standard: "No prose-free previews." Fix: add one sentence (e.g. `Use icons inside \`MenubarItem\` to provide visual context for actions.`).

3. **[minor] Sub-trigger chevron: outer `<svg>` receives no explicit `size-4`** — `menubar-sub.component.ts` template: `<svg class="cn-rtl-flip ml-auto [&_svg]:size-4 [&_svg]:fill-current" [innerHTML]="chevron">`. The outer `<svg>` class contains the substring `size-` (from `[&_svg]:size-4`), so the token's `[&_svg:not([class*='size-'])]:size-4` selector skips it. The outer SVG has no explicit width/height; browser intrinsic default is 300×150 px. For item icons (`menubar-icons.ts`) the outer `<svg>` has no class, the token targets it directly, and it works. The sub-trigger's outer wrapper should use `size-4` directly (not `[&_svg]:size-4`) or be replaced with a `<span>` container as in the checkbox indicator pattern.

4. **[minor] `transition-colors` absent from item tokens** — `cn-menubar-item`, `cn-menubar-checkbox-item`, `cn-menubar-radio-item` in `style-force-ui.css` and `MENUBAR_ITEM_BASE`/`MENUBAR_SELECTABLE_ITEM_BASE` in `menubar.variants.ts` all lack `transition-colors motion-reduce:transition-none`. P4one includes it on all three. Peer tokens (`cn-dropdown-menu-item`, `cn-context-menu-item`) include it. The absence means focus/hover colour transitions on menu items are instantaneous rather than the standard 150 ms fade. Add to all three tokens in `style-force-ui.css`.

5. **[major] `[(checked)]` on `MenubarCheckboxItem` — runtime payload unverified** — `menubar-selectable.component.ts` exposes `checkedChange` directly from `RdxMenuCheckboxItem` via `hostDirectives.outputs`. P4one found that the analogous `RdxMenuItemCheckboxDirective.onCheckedChange` emits `void` (not the new `boolean`) because it is `outputFromObservable(cdkItemCheckbox.triggered)` — causing two-way binding to always set the model to `undefined`. The registry imports `RdxMenuCheckboxItem` (different export name); whether its `checkedChange` correctly emits the toggled boolean is not verifiable from a read-only review. The `[(checked)]` binding in `menubar-checkbox.ts` (`[(checked)]="strikethrough"`) will appear to un-check items correctly (undefined is falsy) but will silently fail to check them if the payload is void. A single smoke test ("click an unchecked item, observe signal becomes `true`") resolves this. If broken, adopt p4one's workaround (subscribe in constructor, emit `!checked()` manually).
```

---
