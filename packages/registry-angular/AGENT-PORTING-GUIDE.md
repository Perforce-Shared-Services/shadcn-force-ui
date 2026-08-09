# Angular Registry — Agent Porting Guide

This document tells an AI agent exactly what to do to continue porting Angular
components into `packages/registry-angular/`. Read it fully before touching any
file.

---

## Repo context

| Path | Purpose |
|---|---|
| `packages/registry-angular/ui/` | **Registry source** — what users install. Separate `.html` template files required. |
| `apps/preview-angular/src/angular-ui/` | **Preview copies** — copied from registry, but `templateUrl` replaced with inline `template` (see §Preview app). |
| `apps/preview-angular/src/examples.ts` | **Single file** containing ALL preview example components + `EXAMPLES` map. |
| `apps/v4/content/docs/components/angular/` | **MDX docs** per component. |
| `/opt/dev/pd-p4one/app/src/app/ui/` | **Reference implementation** in Angular 20 using `@radix-ng/primitives` v0.50.0. |
| `packages/registry-angular/DIVERGENCES.md` | **Upstream fix tracker** — document any new divergences here. |

---

## What is already ported (24 components)

Phase 1 (pure, no radix-ng):
`badge`, `button`, `card`, `kbd`, `label`, `separator`, `skeleton`, `spinner`

Phase 2a (pure, no radix-ng):
`alert`, `aspect-ratio`, `avatar`, `empty`, `input`, `progress`, `textarea`

Phase 2b (uses `@radix-ng/primitives`):
`accordion`, `checkbox`, `collapsible`, `radio-group`, `switch`, `tabs`, `toggle`, `toggle-group`

---

## What is NOT yet ported (33 components)

### Group A — Pure Angular, no CDK/overlay (port first)

| Component | Notes |
|---|---|
| `breadcrumb` | Pure structural divs + links. |
| `button-group` | Wraps button children with a separator slot. |
| `field` | Form field wrapper with label, description, error slots. |
| `input-group` | Input with prefix/suffix addons. |
| `input-otp` | OTP input (6 cells). Uses `@radix-ng/primitives/input-otp` in p4one. |
| `item` | List row primitive (icon + label + aside). CVA variants. |
| `native-select` | Styled `<select>` wrapper. |
| `pagination` | Pure structural; p4one uses Angular CDK for link handling only. |
| `resizable` | Split-pane. p4one is pure (no CDK). |
| `scroll-area` | Custom scrollbar. Pure Angular. |
| `slider` | p4one uses `@radix-ng/primitives/slider`. |
| `stepper` | Pure Angular stateful wizard. |
| `table` | Styled table primitives (no TanStack in registry). |

### Group B — CDK overlay / radix-ng overlay (port second)

| Component | Primitive used in p4one |
|---|---|
| `alert-dialog` | `@angular/cdk/dialog` (CdkDialog) |
| `dialog` | `@angular/cdk/dialog` (CdkDialog) |
| `sheet` | `@angular/cdk/dialog` (CdkDialog) |
| `drawer` | `@angular/cdk/dialog` (CdkDialog) |
| `popover` | `@radix-ng/primitives/popover` (CdkConnectedOverlay) |
| `tooltip` | `@radix-ng/primitives/tooltip` (CdkConnectedOverlay) |
| `hover-card` | `@radix-ng/primitives/hover-card` (CdkConnectedOverlay) |
| `dropdown-menu` | `@radix-ng/primitives/dropdown-menu` |
| `select` | `@angular/cdk` (custom overlay) |
| `context-menu` | `@radix-ng/primitives/context-menu` |
| `menubar` | `@radix-ng/primitives/menubar` |

### Group C — Complex / lower priority

| Component | Notes |
|---|---|
| `calendar` | Date picker. No direct p4one equivalent. |
| `chart` | Unovis charts. No Angular port needed (use charting lib directly). |
| `combobox` | Command + popover composite. |
| `command` | Search/command palette. |
| `navigation-menu` | Multi-level nav. `@radix-ng/primitives/navigation-menu`. |
| `sidebar` | Complex stateful layout component. |
| `sonner` | Toast notifications. `@angular/cdk/overlay`. |
| `number-field` | Not in p4one (Vue-only). |
| `range-calendar` | Not in p4one. |
| `tags-input` | Not in p4one. |
| `pin-input` | Not in p4one. |

---

## How to port a component — step-by-step

### 1. Read the reference

```bash
ls /opt/dev/pd-p4one/app/src/app/ui/<component>/
cat /opt/dev/pd-p4one/app/src/app/ui/<component>/*.ts  # skip *.stories.ts
```

Also read the registry React source (the canonical class-name source of truth):
```bash
cat /opt/dev/shadcn-force-ui/apps/v4/registry/bases/radix/ui/<component>.tsx
```

And the CSS tokens:
```bash
grep -n "cn-<component>" /opt/dev/shadcn-force-ui/apps/v4/registry/styles/style-force-ui.css
```

### 2. Create registry source files

Location: `packages/registry-angular/ui/<component>/`

**Required files:**
- `<component>.component.ts` — Angular standalone component, **attribute selector**, signal inputs
- `<component>.component.html` — Separate template file (even if empty for self-closing elements)
- `<component>.variants.ts` — CVA definition if component has variants (use `cn-*` tokens, NOT expanded Tailwind classes)
- `index.ts` — re-exports using public names (`Button`, not `ButtonComponent`)

**Rules:**
- Always use `standalone: true`, `ChangeDetectionStrategy.OnPush`
- Signal inputs: `readonly foo = input<Type>(default)` and `readonly className = input<string | undefined>(undefined, { alias: 'class' })`
- Use `cn-<component>-variant-*` and `cn-<component>-size-*` CSS tokens, never hardcoded Tailwind classes, for styles that are in `style-force-ui.css`. For styles NOT covered by CSS tokens, inline them in the CVA base string.
- `[&_svg]:fill-current` must be added to any CVA base that accepts SVG icons — Material Symbols are fill-based (see DIVERGENCES.md §button-2)
- Export public names: `ButtonComponent as Button`, NOT `ButtonComponent`
- For multi-part components (Card, Alert, Accordion etc.) put all sub-components in ONE `.component.ts` file with ONE shared `.component.html` (`<ng-content />` for simple cases) OR separate HTML files per sub-component when templates differ meaningfully

### 3. @radix-ng/primitives API — IMPORTANT: use v1.x, NOT p4one's v0.50.0

The p4one reference uses `@radix-ng/primitives` v0.50.0. The registry uses v1.1.2.
**The API changed significantly.** Key differences:

| v0.50.0 (p4one) | v1.1.2 (registry) |
|---|---|
| `RdxSwitchRootDirective` | `RdxSwitchRoot` |
| `RdxSwitchThumbDirective` | `RdxSwitchThumb` |
| `RdxTabsRootDirective` | `RdxTabsRoot` |
| `RdxTabsListDirective` | `RdxTabsList` |
| `RdxTabsTriggerDirective` | `RdxTabsTab` |
| `RdxTabsContentDirective` | `RdxTabsPanel` |
| `RdxToggleDirective` | `RdxToggle` |
| `RdxToggleGroupDirective` | `RdxToggleGroup` |
| `RdxToggleGroupItemDirective` | Use `RdxToggle` with `value` input |
| `RdxAccordionContentDirective` | `RdxAccordionPanelDirective` |
| `RdxCollapsibleContentDirective` | `RdxCollapsiblePanelDirective` |
| `type="single"\|"multiple"` + `collapsible` (accordion) | `[multiple]` boolean |
| `tabs.getBaseId()` (bug workaround) | Not needed — removed in v1.x |

**Always verify exports** before writing code:
```bash
grep "^export {" /opt/dev/shadcn-force-ui/apps/preview-angular/node_modules/@radix-ng/primitives/fesm2022/radix-ng-primitives-<module>.mjs
```

### 4. Register in `ui/_registry.ts`

Add an entry to `packages/registry-angular/ui/_registry.ts`:
```ts
{
  name: "my-component",
  type: "registry:ui",
  dependencies: ["@radix-ng/primitives"],  // only if component uses radix-ng
  files: [
    { path: "ui/my-component/my-component.component.ts", type: "registry:ui" },
    { path: "ui/my-component/my-component.component.html", type: "registry:ui" },
    { path: "ui/my-component/index.ts", type: "registry:ui" },
  ],
  meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/my-component" } },
},
```

### 5. Add preview examples

**All examples live in ONE file**: `apps/preview-angular/src/examples.ts`

Add to the file:
1. Import the new components from `@/angular-ui/<component>`
2. Add one or more `@Component` classes (use inline `template`, NOT `templateUrl`)
3. Add entries to the `EXAMPLES` map at the bottom

**Naming rule**: every example class name must be globally unique in the file. Use pattern `<ComponentName><VariantOrType>Component`, e.g. `TabsDemoComponent`, `AccordionDemoComponent`.

**Copy angular-ui files to preview**: After writing registry files, copy them to the preview:
```bash
mkdir -p apps/preview-angular/src/angular-ui/<component>
cp packages/registry-angular/ui/<component>/* apps/preview-angular/src/angular-ui/<component>/
```

**Then inline `templateUrl` references** in the preview copies (the preview app uses inline templates):
```python
import re
with open("apps/preview-angular/src/angular-ui/<comp>/<comp>.component.ts") as f:
    src = f.read()
with open("apps/preview-angular/src/angular-ui/<comp>/<comp>.component.html") as f:
    html = f.read().strip()
escaped = html.replace('\\', '\\\\').replace('`', '\\`')
src = re.sub(r"templateUrl:\s*['\"][^'\"]+['\"],?", f"template: `{escaped}`,", src)
with open("apps/preview-angular/src/angular-ui/<comp>/<comp>.component.ts", 'w') as f:
    f.write(src)
```

### 6. Verify the build passes

```bash
cd apps/preview-angular && pnpm run preview:build
```

Expected output: `✓ N modules transformed. ✓ built in Xs`

If it fails with **"Identifier already declared"** from Rollup: Angular ivy is inlining a class from a dependency. The fix is always the same — all examples must be in the single `examples.ts` file (not separate files). Do NOT split examples into multiple `.ts` files.

If it fails with **"not exported by … .mjs"**: the radix-ng v1.x API name is different. Check with:
```bash
grep "^export {" node_modules/@radix-ng/primitives/fesm2022/radix-ng-primitives-<module>.mjs
```

### 7. Add MDX docs

Create `apps/v4/content/docs/components/angular/<component>.mdx`.

**Copy from an existing Angular doc** (e.g. `apps/v4/content/docs/components/angular/tabs.mdx`) and adapt. Use `framework="angular"` in `ComponentPreview`.

**MDX structure** (copy exactly — `</TabsList>` closes before `<TabsContent>`, NOT `</CodeTabs>`):
```mdx
<CodeTabs>
<TabsList>
  <TabsTrigger value="cli">Command</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">
...
</TabsContent>
<TabsContent value="manual">
...
</TabsContent>
</CodeTabs>
```

**Critical**: `</TabsList>` must close BEFORE `</CodeTabs>`. A `</CodeTabs>` in place of `</TabsList>` causes a fumadocs MDX parse error that breaks the entire v4 build.

Add the component slug to `apps/v4/content/docs/components/angular/meta.json` `pages` array (keep alphabetical).

Also add to `apps/v4/lib/framework-components.ts` in the `angular` Set.

### 8. Commit atomically

One commit per component, in this order:
```bash
git add packages/registry-angular/ui/<comp>/
git commit -m "feat(angular): add <comp> component"

# After preview examples + docs:
git add apps/preview-angular/src/angular-ui/<comp>/
# (examples.ts changes go in a batch commit per phase)
git add apps/v4/content/docs/components/angular/<comp>.mdx
git commit -m "docs(angular): add <comp> docs and preview"
```

Run `pnpm install` + commit lockfile if new dependencies were added.

---

## Architecture decisions (do not change)

### Registry components use separate `.html` files
`templateUrl` for registry, inline `template` for preview copies. The preview inlining step is a one-time Python script (see §5).

### All preview examples in ONE file
`apps/preview-angular/src/examples.ts` must remain a single file. Multiple files cause Angular ivy to inline dependency classes, creating Rollup "Identifier already declared" errors.

### Use `cn-*` CSS tokens, not expanded Tailwind
The `style-force-ui.css` defines `cn-button`, `cn-button-variant-default`, etc. Use these token class names in CVA. The build pipeline expands them. Do NOT copy expanded Tailwind strings from p4one's `*.variants.ts` — those are already expanded (the app bypasses the token system).

### `[&_svg]:fill-current` is always needed
Material Symbols SVGs are fill-based. Add `[&_svg]:fill-current` to any CVA base that handles icons.

### Attribute selectors, not custom element selectors
Use `selector: "button[uiButton]"` / `selector: "[uiAlert]"`, not `selector: "cn-button"`. This preserves native element semantics (WCAG 4.1.2) and is Angular's idiomatic equivalent of React's `asChild`.

### Disabled on `<a>` elements
For components with a `disabled` input on an anchor host, use the `isAnchor` pattern from `button.component.ts`: detect the host tag, apply `aria-disabled` + `tabindex="-1"` + a click guard instead of native `disabled`.

---

## Key files to read before starting

```
packages/registry-angular/DIVERGENCES.md          — upstream divergences + fixes needed
packages/registry-angular/ui/button/              — best reference for Phase 1 pattern
packages/registry-angular/ui/tabs/tabs.component.ts — best reference for radix-ng v1.x pattern
packages/registry-angular/ui/_registry.ts         — all registered items
apps/preview-angular/src/examples.ts              — all preview examples (single file)
apps/v4/content/docs/components/angular/button.mdx — doc template to copy
apps/v4/registry/styles/style-force-ui.css         — CSS token definitions
```

---

## Environment

- Angular: 20.x (standalone default, signals API)
- `@radix-ng/primitives`: **v1.1.2** (NOT v0.50.0 used by p4one)
- `@angular/cdk`: 20.x (for overlay-based components in Group B)
- Vite: 6.x with `@analogjs/vite-plugin-angular` 2.6.4
- All Angular components use `ChangeDetectionStrategy.OnPush` + `standalone: true`
- Signal inputs: `input<T>(default)`, computed: `computed(() => ...)`
- Template bindings: `[class]="..."`, `[attr.data-slot]="..."`, host object in `@Component`

---

## What to do right now (suggested order)

1. **`breadcrumb`** — pure, small, good warmup
2. **`field`** — important for form UX
3. **`button-group`** — builds on existing `button`
4. **`item`** — list row primitive, many variants
5. **`input-group`** — input with addons
6. **`native-select`** — simple styled select
7. **`pagination`** — structural, no CDK needed
8. **`table`** — styled table primitives (no TanStack)
9. **`stepper`** — stateful wizard
10. **`slider`** — `@radix-ng/primitives/slider` (check v1.x API)
11. **`scroll-area`** — custom scrollbar
12. **`input-otp`** — OTP input (check radix-ng v1.x)
13. **`tooltip`** / **`popover`** — CDK overlay (Group B)
14. **`dialog`** / **`sheet`** / **`alert-dialog`** — CdkDialog (Group B)
15. **`dropdown-menu`** — radix-ng (Group B)

After each batch, run `pnpm run preview:build` from `apps/preview-angular/` to verify.
