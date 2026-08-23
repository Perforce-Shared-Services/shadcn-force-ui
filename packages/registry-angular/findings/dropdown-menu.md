# dropdown-menu — Migration Review

## Checklist

### 1. Examples match React base?

React base has 13 examples; Angular has exactly 13 matching files under `apps/preview-angular/src/angular/dropdown-menu-*.ts`. Names are identical.

File-by-file assessment:

| Demo | Match | Notes |
|------|-------|-------|
| `dropdown-menu-demo` | ✓ | `DropdownMenuPortal` omitted (no Angular equivalent — documented) |
| `dropdown-menu-basic` | ✓ | |
| `dropdown-menu-submenu` | ✓ | |
| `dropdown-menu-shortcuts` | ✓ | |
| `dropdown-menu-icons` | ✓ | |
| `dropdown-menu-checkboxes` | ✓ | |
| `dropdown-menu-checkboxes-icons` | ✓ | |
| `dropdown-menu-radio-group` | ✓ | |
| `dropdown-menu-radio-icons` | ✓ | |
| `dropdown-menu-destructive` | ✓ | |
| `dropdown-menu-avatar` | ✓ | `align="end"` omitted — no per-use input in radix-ng v1.x (documented parity shift in component JSDoc) |
| `dropdown-menu-complex` | ✓ | State signals replace React `useState`; content identical |
| `dropdown-menu-rtl` | ✓ | Static Arabic labels + `dir="rtl"` hardcoded instead of React's `useTranslation` switcher (Angular adaptation, same visual state) |

One linter-level deviation: `dropdown-menu-demo.ts` imports `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem` in the TypeScript `import` statement but uses none of them in the component `imports` array or template.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/dropdown-menu.mdx` is fully compliant:

- Frontmatter: `title`, `description`, `base: angular`, `component: true`, `links.doc` + `links.api` → radix-ng/primitives/menu ✓
- Hero: `<ComponentPreview framework="angular" name="dropdown-menu-demo" />` immediately after frontmatter ✓
- `## Installation` → `## Usage` → `## Composition` → 13 flat `## <Name>` sections ✓ (no `## Examples` umbrella)
- `## RTL` second-to-last ✓
- `## API Reference` last, links to radix-ng docs (correct for an upstream-primitive wrapper) ✓

The RTL demo deviation (static labels vs React language-selector) is not called out with a `<Callout>`. The standard requires a Callout only when "the example cannot exist at all"; since the demo does exist, the omission is acceptable but adding a one-line note would be cleaner.

### 3. Available inside the registry?

- **`_registry.ts`** (`packages/registry-angular/ui/_registry.ts:521`): entry `name: "dropdown-menu"`, `type: "registry:ui"`, `dependencies: ["@radix-ng/primitives"]`; 8 files listed — all 8 present on disk ✓
- **`framework-components.ts`** (`apps/v4/lib/framework-components.ts:406`): `"dropdown-menu"` in the `angular` Set ✓
- **`meta.json`** (`apps/v4/content/docs/components/angular/meta.json:26`): `"dropdown-menu"` in `pages` ✓
- All 13 demo selectors follow `preview-dropdown-menu-*` pattern; files are flat in the glob target; `validate:previews` resolution expected to pass ✓

### 4. Style diff vs original p4one

p4one uses `@radix-ng/primitives/dropdown-menu` (CDK-overlay v0.50). The registry uses `@radix-ng/primitives/menu` (v1.x generic menu primitive). This architecture difference is documented in the component JSDoc.

| p4one class | registry | Category | Promote? |
|-------------|----------|----------|----------|
| `cn-menu-target` | absent | p4one CdkOverlay hook | No — CDK-specific |
| `cn-menu-translucent` | absent | p4one backdrop blur | No — CDK-specific |
| `overflow-x-hidden overflow-y-auto scrollbar-overlay` | absent | CDK panel overflow | No — handled by positioner in v1.x |
| `max-h-(--radix-…)` `w-(--radix-…)` `origin-(--radix-…)` | absent | Radix CSS vars (inert in CDK) | No — CDK artifact |
| `[&_svg]:fill-current` | ✓ (in `DROPDOWN_MENU_ITEM_BASE`) | Material Symbols fix | Already in registry variants.ts; should also be in `cn-dropdown-menu-item` CSS token upstream |
| `transition-colors motion-reduce:transition-none` | ✓ (via CSS token) | WCAG 2.3.3 guard | Already promoted to CSS token ✓ |

**Theme promotion candidates:**

| Candidate | Action |
|-----------|--------|
| `[&_svg]:fill-current` on items | Add to `cn-dropdown-menu-item`, `cn-dropdown-menu-checkbox-item`, `cn-dropdown-menu-radio-item` in `style-force-ui.css` (currently inline in `DROPDOWN_MENU_ITEM_BASE` only; CSS token lacks it) |

No p4one-local overlay utilities (`cn-menu-target`, `cn-menu-translucent`, `scrollbar-overlay`) are candidates — they are CDK infrastructure, superseded by the positioner model.

---

## Verdict

**PASS-with-notes** — implementation is structurally correct, all 13 demos present, registry wiring complete, docs compliant. One unverifiable risk (radio indicator directive mismatch) needs runtime confirmation.

## Issues

1. **(major)** `packages/registry-angular/ui/dropdown-menu/dropdown-menu-selectable.component.ts:126` — `DropdownMenuRadioItemComponent` declares `imports: [RdxMenuCheckboxItemIndicator]` but its template uses `rdxMenuRadioItemIndicator`. If these are distinct directive selectors in radix-ng v1.x the check-mark indicator will never appear on radio items. Same pattern in `context-menu-selectable.component.ts:126` and `menubar-selectable.component.ts:131`. Cannot confirm without installed node_modules — **must be smoke-tested** by opening `dropdown-menu-radio-group` and `dropdown-menu-radio-icons` demos and verifying a check mark appears on the selected item.

2. **(minor)** `apps/preview-angular/src/angular/dropdown-menu-demo.ts` — TypeScript `import` statement includes `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem` which are absent from the component's `imports` array and template. TypeScript strict mode / `@angular-eslint` will flag these as unused.

3. **(minor)** `packages/registry-angular/ui/dropdown-menu/index.ts:21` — `DROPDOWN_MENU_CHECK_SVG` is exported as part of the public barrel. It is an internal implementation detail (raw SVG string used only by `dropdown-menu-selectable.component.ts`). Leaking it as a named export clutters the API surface.

4. **(minor)** `packages/registry-angular/ui/dropdown-menu/dropdown-menu-sub.component.ts` (template) — `[innerHTML]="chevron"` is bound with a plain `string`, not a `SafeHtml`. The sibling components (checkbox/radio indicator) explicitly call `DomSanitizer.bypassSecurityTrustHtml`. Angular's sanitizer passes the simple `<svg><path>` structure correctly, but the inconsistency in approach across the same component family should be resolved for clarity.

---
