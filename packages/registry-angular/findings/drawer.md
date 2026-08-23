# drawer — Migration Review

## Checklist

### 1. Examples match React base?

React base has **8** demo files; Angular demo directory has **8** matching names (`drawer-demo`, `drawer-dialog`, `drawer-nested`, `drawer-non-modal`, `drawer-rtl`, `drawer-sides`, `drawer-snap-points`, `drawer-swipe-handle`). File-for-file parity on names ✓.

**Material deviations:**

| Demo | Angular | React | Notes |
|---|---|---|---|
| `drawer-non-modal` | `direction="bottom"` (default) | `swipeDirection="right"` (side panel) | Behavioral mismatch — non-modal use case is a persistent side panel, not a bottom sheet |
| `drawer-snap-points` | Dead `group-data-[swipe-axis=x]/drawer-popup:` + `group-data-[swipe-axis=y]/drawer-popup:` classes on inner div | Same classes on inner div (active via Base UI) | Group name `drawer-popup` never matches host `group/drawer-content`; `data-swipe-axis` is never set by radix-ng — both conditions make the selectors permanently dead |
| `drawer-nested` | 3 nesting levels | 4 levels ("Open Fourth Drawer") | File comment explains why; MDX `## Nested` has no Callout documenting the reduction |
| `drawer-rtl` | 3 time slots in `TIMES` array | 5 slots (same 5 as `drawer-demo`) | Slots `6-00` and `6-30` are absent from the RTL variant |
| `drawer-demo` | Missing `scroll-fade` class on scrollable region | `class="flex-1 scroll-fade overflow-y-auto p-4"` | `scroll-fade` is available (used in `attachment`, `message-scroller` Angular ports) |
| `drawer-dialog` | Drawer-only (no Desktop Dialog) | Dialog on desktop / Drawer on mobile | Documented with a Callout in `## Responsive` ✓ |

### 2. Docs follow the React/flat pattern?

- **Frontmatter**: `title`, `description`, `base: angular`, `component: true` ✓  
- **Hero preview**: `<ComponentPreview framework="angular" name="drawer-demo" />` immediately after frontmatter, before any heading ✓  
- **`## Installation`**: CLI + Manual CodeTabs with `<Steps>`, `<ComponentSource>`, import-path step ✓  
- **`## Usage`**: import snippet + HTML snippet ✓  
- **`## Composition`**: ASCII tree present, appropriate for a multi-part component ✓  
- **Flat `##` per example** (no `## Examples` umbrella): ✓ — each section (`## Position`, `## Swipe Handle`, `## Nested`, `## Non Modal`, `## Snap Points`, `## Responsive`) is a flat heading  
- **One-sentence prose + one `<ComponentPreview>` per section**: ✓  
- **`## RTL`**: link to `/docs/rtl` present, preview with `direction="rtl"` ✓  
- **`## API Reference`** last: ✓ — hand-maintained per-part tables (acceptable for an Angular port wrapping radix-ng, whose API differs from Base UI)  
- **Callouts for deviations**: present under `## Swipe Handle`, `## Snap Points`, `## Responsive` ✓  
- **Missing**: `## Nested` has no Callout documenting the 4 → 3 level reduction (required by docs standard §"Documenting a deviation")

### 3. Available inside the registry?

- `packages/registry-angular/ui/_registry.ts` line 478: entry `name: "drawer"`, `type: "registry:ui"`, `dependencies: ["@radix-ng/primitives"]`; lists `ui/drawer/drawer.component.ts`, `ui/drawer/drawer.component.html`, `ui/drawer/index.ts` — all three files exist on disk ✓  
- `apps/v4/lib/framework-components.ts` angular `Set` line 406: `"drawer"` ✓  
- `apps/v4/content/docs/components/angular/meta.json` line 25: `"drawer"` ✓  
- `apps/v4/content/docs/components/angular/drawer.mdx` exists ✓  
- All 8 preview demos registered as `preview-drawer-*` selectors; `validate:previews` resolution: no unresolved `name=` references visible ✓

### 4. Style diff vs original p4one

| Feature | p4one (`/opt/dev/pd-p4one/…/drawer-content.component.ts`) | Angular port (`packages/registry-angular/ui/drawer/drawer.component.ts`) | Promote to `style-force-ui.css`? |
|---|---|---|---|
| Positioning data-attribute | `data-direction` (local rename) | `data-vaul-drawer-direction` (upstream name) | Moot — token already uses the correct attribute |
| Background + text colors | Explicit: `bg-popover text-popover-foreground text-sm` | Inside `cn-drawer-content` token | Already in token ✓ |
| Layout classes | Explicit: `flex h-auto flex-col` | Inside `cn-drawer-content` token | Already in token ✓ |
| Title classes | `cn-font-heading text-base font-medium text-foreground` | `cn-drawer-title cn-font-heading` (token carries `text-base font-medium text-foreground`) | Already in token ✓ |
| Header `md:text-left` | Explicit class | Inside `cn-drawer-header` token | Already in token ✓ |
| Open/close animation | `data-open:animate-in` / `data-closed:animate-out` (tw-animate-css, CDK data-state) | `data-starting-style:` / `data-ending-style:` (Tailwind v4 @starting-style, radix-ng) | No — primitive architecture differs |
| A11y dev-mode guard | `ngAfterContentInit` `console.warn` if no title projected | Not present | Not a CSS token concern |
| `aria-labelledby` wiring | Manual `contentChild` + host `[attr.aria-labelledby]` | Delegated to `RdxDialogTitle` (radix-ng auto-wires it) | No — different primitive contracts |

**Theme promotion candidates:** None. All structural classes present in p4one's inline strings are already absorbed into the `cn-drawer-*` tokens in `style-force-ui.css`. The only p4one-local item is the `data-direction` attribute name, which is intentionally p4one-local (the token uses the upstream `data-vaul-drawer-direction`).

## Verdict

**PASS-with-notes** — all 8 examples are present and correctly registered; two concrete code bugs (dead CSS selectors in `drawer-snap-points`, wrong default direction in `drawer-non-modal`) and one missing MDX Callout should be fixed before the component is marked fully at parity.

## Issues

1. **(major)** `drawer-non-modal.ts`: `direction="bottom"` is the Angular default but the React canonical uses `swipeDirection="right"` — the non-modal pattern demonstrates a persistent **side** panel; a bottom sheet with `[modal]="false"` is the wrong shape. Change to `direction="right"` to match intent.

2. **(major)** `drawer-snap-points.ts` inner div: `class="group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full rounded-2xl bg-muted"` — two dead conditions: `data-swipe-axis` is never set by radix-ng, and the group modifier name `drawer-popup` does not match the host's `group/drawer-content`. Classes are permanently inert; the div should use a static class (e.g. `class="h-80 w-full rounded-2xl bg-muted"`) with a comment noting the snap-physics gap.

3. **(minor)** `drawer-nested`: React has 4 levels; Angular stops at 3 (file comment explains why). The `## Nested` section in `drawer.mdx` has no `<Callout>` documenting this reduction — docs standard §"Documenting a deviation" requires one.

4. **(minor)** `drawer-rtl.ts`: `TIMES` array has 3 entries; both the React RTL and the Angular `drawer-demo` have 5 slots. Omits `6-00` and `6-30` PM without explanation.

5. **(minor)** `drawer-demo.ts`: scrollable region is `class="flex-1 overflow-y-auto p-4"`; React base adds `scroll-fade` (available in the Angular registry — used in `attachment` and `message-scroller`). Omitting it is a visual parity gap.
