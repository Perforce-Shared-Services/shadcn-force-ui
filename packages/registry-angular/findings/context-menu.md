# context-menu — Migration Review

## Checklist

### 1. Examples match React base?

All 11 Angular demo files are present and correspond 1-to-1 with `apps/v4/examples/base/context-menu-*.tsx`. No file is missing.

| Demo | Match verdict | Notes |
|---|---|---|
| `context-menu-demo.ts` | ✓ | Identical structure |
| `context-menu-basic.ts` | ✓ | Identical |
| `context-menu-checkboxes.ts` | ✓ | `[checked]="true"` vs React `defaultChecked` — appropriate Angular binding |
| `context-menu-radio.ts` | ✓ | Signals for state; same two groups (People + Theme) |
| `context-menu-submenu.ts` | ✓ | Identical |
| `context-menu-shortcuts.ts` | ✓ | Identical |
| `context-menu-groups.ts` | ✓ | Identical |
| `context-menu-icons.ts` | ✓ | Material Symbols SVGs inlined; same icon set |
| `context-menu-destructive.ts` | ✓ | Identical structure |
| `context-menu-sides.ts` | ✓ w/note | React passes `side="top/right/bottom/left"` to `ContextMenuContent`; Angular omits (documented inline — context menu always opens at cursor, `side` is not exposed). Four panels retained, labels kept. |
| `context-menu-rtl.ts` | ✓ w/note | React uses `useTranslation` (trilingual). Angular uses static Arabic per established Angular RTL demo convention. Consistent with other Angular RTL demos in the repo. |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/context-menu.mdx`:

- **Frontmatter**: `title`, `description`, `base: angular`, `component: true`, `links.doc`, `links.api` — all present ✓
- **Hero preview**: `<ComponentPreview framework="angular" name="context-menu-demo" />` immediately after frontmatter, before any heading ✓
- **`## Installation`**: CodeTabs with cli tab (`npx shadcn@latest add @force-ui-angular/context-menu`) and manual tab with Steps ✓
- **`## Usage`**: import block + HTML snippet ✓
- **`## Composition`**: ASCII tree present (multi-part component, appropriate) ✓
- **Flat `##` per example**: Basic, Submenu, Shortcuts, Groups, Icons, Checkboxes, Radio, Destructive, Sides, RTL — no `## Examples` umbrella ✓
- **`## RTL`**: link to `/docs/rtl` + `<ComponentPreview ... direction="rtl" />` ✓
- **`## API Reference`**: last section, links out to radix-ng upstream (correct pattern for wrapped primitive) ✓

Docs fully conform to the standard.

### 3. Available inside the registry?

**`_registry.ts`** (`packages/registry-angular/ui/_registry.ts`, lines 537–550):
- Entry `"context-menu"` present ✓
- `dependencies: ["@radix-ng/primitives"]` ✓
- Files list: 8 entries match the 8 files on disk exactly:
  `context-menu.component.ts`, `context-menu.component.html`, `context-menu-selectable.component.ts`, `context-menu-sub.component.ts`, `context-menu-sub.component.html`, `context-menu.variants.ts`, `context-menu.icons.ts`, `index.ts` ✓

**`framework-components.ts`**: slug `"context-menu"` present in the angular `Set` (line 290) ✓

**`meta.json`** (`apps/v4/content/docs/components/angular/meta.json`, line 22): `"context-menu"` present ✓

**`validate:previews`**: All 11 `context-menu-*.ts` files exist flat in `apps/preview-angular/src/angular/` ✓

### 4. Style diff vs original p4one

p4one sources: `/opt/dev/pd-p4one/app/src/app/ui/context-menu/` (uses a trigger+TemplateRef CDK API; new port uses root+content composition).

| Part | p4one class string | New port (token or variant constant) | Delta |
|---|---|---|---|
| Content | Inline: `bg-popover ring-foreground/10 min-w-36 rounded-lg p-1 shadow-md ring-1 scrollbar-overlay motion-reduce:animate-none overflow-x-hidden overflow-y-auto max-h-(--radix-…)` | `cn-context-menu-content` (has `scrollbar-overlay`, `motion-reduce:animate-none`, but **no `overflow-y-auto`** or `max-h` var) | `overflow-y-auto` absent; `max-h` var unused under new API — inert |
| Content | `cn-menu-target cn-menu-translucent` added | Absent | p4one-local Force UI utilities; design decision needed |
| Item | `transition-colors motion-reduce:transition-none` in `CONTEXT_MENU_ITEM_CLASS` | **Absent** from both `CONTEXT_MENU_ITEM_BASE` and `cn-context-menu-item` | p4one explicitly documented this addition |
| Selectable items | `transition-colors motion-reduce:transition-none` in `CONTEXT_MENU_SELECTABLE_ITEM_CLASS` | **Absent** from `CONTEXT_MENU_SELECTABLE_ITEM_BASE` and tokens | same |
| Label | `px-1.5 py-1 text-xs font-semibold text-muted-foreground data-inset:pl-7` | `cn-context-menu-label` (`@apply text-muted-foreground px-1.5 py-1 text-xs font-semibold data-inset:pl-7`) | Identical |
| Separator | `-mx-1 my-1 h-px bg-border` | `cn-context-menu-separator` (`@apply bg-border -mx-1 my-1 h-px`) | Identical |
| Shortcut | `ml-auto text-xs tracking-widest text-muted-foreground group-focus/context-menu-item:text-accent-foreground` | `cn-context-menu-shortcut` — same classes | Identical |

**Theme promotion candidates:**

| Candidate | p4one-local? | Recommendation |
|---|---|---|
| `transition-colors motion-reduce:transition-none` on items | p4one addition (documented) | Promote into `cn-context-menu-item`, `cn-context-menu-checkbox-item`, `cn-context-menu-radio-item` tokens |
| `overflow-y-auto overflow-x-hidden` on content | p4one addition | Promote into `cn-context-menu-content` if radix-ng v1.x menus can overflow viewport |
| `cn-menu-target cn-menu-translucent` | p4one Force UI utilities | Requires design decision; not auto-promoted |

**Dead token**: `cn-context-menu-subcontent` at `style-force-ui.css:499` (`@apply shadow-lg`) is never referenced in any Angular source. The registry uses `cn-context-menu-sub-content` (hyphenated). Should be removed.

---

## Verdict

**PASS-with-notes**

All 11 demos are present and correctly structured, the docs fully follow the flat `##`-per-example standard, and the registry entry is complete. One blocker bug is present: `ContextMenuRadioItemComponent` imports the wrong indicator directive, causing radio-item checked state to never control indicator visibility.

---

## Issues

1. **[blocker]** `packages/registry-angular/ui/context-menu/context-menu-selectable.component.ts:126` — `ContextMenuRadioItemComponent.imports` lists `RdxMenuCheckboxItemIndicator` instead of `RdxMenuRadioItemIndicator`. The component template (`RADIO_INDICATOR_TEMPLATE`) uses attribute `rdxMenuRadioItemIndicator`, which is the selector for the separate `RdxMenuRadioItemIndicator` class (both are exported from `@radix-ng/primitives/menu`). Because the imported class's selector is `[rdxMenuCheckboxItemIndicator]`, it never matches the template attribute; the directive is not applied; `style.display` toggling (show only when checked) does not fire. All radio items show their check indicator permanently.

2. **[minor]** `apps/v4/registry/styles/style-force-ui.css:499` — token `cn-context-menu-subcontent` (`@apply shadow-lg`) is dead: no Angular (or React) source references it. The port uses `cn-context-menu-sub-content` (hyphen-consistent with all other sub-content tokens). Remove the orphan class.

3. **[minor]** `packages/registry-angular/ui/context-menu/context-menu.variants.ts` — `CONTEXT_MENU_ITEM_BASE` and `CONTEXT_MENU_SELECTABLE_ITEM_BASE` lack `transition-colors motion-reduce:transition-none` that p4one intentionally added (WCAG 2.3.3 reduced-motion). Neither the base constants nor the `cn-context-menu-item` / `cn-context-menu-checkbox-item` / `cn-context-menu-radio-item` tokens carry it. Items have no focus/hover transition.
```

---
