# sheet — Migration Review

## Checklist

### 1. Examples match React base?

All four React base examples (`sheet-demo`, `sheet-side`, `sheet-no-close-button`, `sheet-rtl`) have Angular counterparts. Content and variant coverage match. Specific comparisons:

- **sheet-demo.ts** — structure, field IDs, button order, and label text mirror React identically. ✓
- **sheet-side.ts** — same four sides, same `data-[side=bottom]:max-h-[50vh]` / `data-[side=top]:max-h-[50vh]` via `class` input, same lorem text and 10-paragraph loop. ✓
- **sheet-no-close-button.ts** — `[showCloseButton]="false"` maps correctly; content matches. ✓
- **sheet-rtl.ts** — hardcodes Arabic text with `dir="rtl" side="left"` rather than using a language-switcher hook (the React version supports en/ar/he via `useTranslation`). Visually equivalent for the previewed RTL state; comment in the file documents the simplification. Acceptable deviation; mention in docs would strengthen it.

### 2. Docs follow the React/flat pattern?

- Frontmatter: `title`, `description`, `base: angular`, `component: true`, `links.doc`/`links.api` all present. ✓
- Hero preview `<ComponentPreview framework="angular" name="sheet-demo" />` before any heading. ✓
- `## Installation`, `## Usage`, `## Composition`, `## Side`, `## No Close Button`, `## RTL`, `## API Reference` — all flat `##` sections, no `## Examples` umbrella. ✓
- Each example section has one or two prose sentences, then one `<ComponentPreview>`. ✓
- `## RTL` second to last, `## API Reference` last. ✓
- **Minor**: `## API Reference` contains two paragraphs (link sentence + "Force UI adds these parts…" enumeration). The docs standard says "one sentence linking out." The extra sentence is useful Angular context but technically exceeds the pattern.

### 3. Available inside the registry?

- `_registry.ts` entry at line 465: `name: "sheet"`, `dependencies: ["@radix-ng/primitives"]`, all five files on disk listed (`sheet.component.ts`, `sheet.component.html`, `sheet.variants.ts`, `sheet.icons.ts`, `index.ts`). ✓
- Slug `"sheet"` in `framework-components.ts` angular Set (line 431). ✓
- `meta.json` page list (line 50). ✓
- **Major**: No `registryDependencies: ["button"]` in the registry entry, but `SheetContentComponent` imports `Button` from `@/angular-ui/button`. CLI install will not pull the button component; consumers get a broken build without it.

### 4. Style diff vs original p4one

| Feature | p4one | Angular registry port | Status |
|---|---|---|---|
| Architecture | CDK Dialog service / trigger template | radix-ng declarative root + portal | Intentional redesign |
| Overlay | CDK scrim (`cdk-overlay-dark-backdrop`) | `[uiSheetOverlay]` + `cn-sheet-overlay` token | Promoted; correct |
| Panel positioning | Inline `SHEET_CONTENT_CLASS` string (`fixed`, `data-[side]:*`) | `cn-sheet-content` CSS token | **Missing from host class — bug** |
| `border-border` | Inline in SHEET_CONTENT_CLASS (FORCE-UI comment) | `cn-sheet-content` token | Token present; not applied |
| `motion-reduce:*` | Inline in SHEET_CONTENT_CLASS (WCAG 2.3.3 note) | `cn-sheet-content` token | Token present; not applied |
| Header classes | Inline `flex flex-col gap-0.5 p-4` | `cn-sheet-header` token | Promoted ✓ |
| Footer classes | Inline `mt-auto flex flex-col gap-2 p-4` | `cn-sheet-footer` token | Promoted ✓ |
| Title classes | Inline `cn-font-heading text-base font-medium text-foreground` | `cn-sheet-title` + `cn-font-heading` | Promoted ✓ |
| Description | Inline `text-sm text-muted-foreground` | `cn-sheet-description` token | Promoted ✓ |
| Close btn position | Inline `absolute top-3 right-3` | `cn-sheet-close` token | Promoted ✓ |

**Theme promotion candidates:** All p4one-local classes have been promoted to `style-force-ui.css` tokens. No remaining raw-class candidates need promotion — the only gap is that `cn-sheet-content` is not applied to the host element.

## Verdict

**FAIL** — two blockers prevent the component from functioning: the sheet panel is unstyled and unpositioned, and all four demos will not compile.

## Issues

1. **Blocker** — `cn-sheet-content` class is never applied to the `[uiSheetContent]` host. `SheetContentComponent.classes()` = `cn(sheetVariants(), className)`; `sheetVariants()` (`sheet.variants.ts`) emits only animation classes. The CSS token `.cn-sheet-content` (containing `fixed`, all `data-[side]:*` edge-pinning, `bg-popover`, `z-50`, `border-border`, `shadow-lg`, `motion-reduce:*`) never fires. Compare `dialog.component.ts:185`: `cn("cn-dialog-content fixed …", className)` — dialog correctly prefixes its token class. Fix: change `sheetVariants()` base to include `"cn-sheet-content"`, or compute `cn("cn-sheet-content", sheetVariants(), className)`.

2. **Blocker** — All four demo components (`sheet-demo.ts`, `sheet-side.ts`, `sheet-no-close-button.ts`, `sheet-rtl.ts`) use `uiSheetPortal` (`ng-template[uiSheetPortal]`) and `uiSheetOverlay` (`div[uiSheetOverlay]`) in their templates but none import `SheetPortal` or `SheetOverlay` in their `imports: [...]` array. Angular standalone compilation will fail for all four with an unknown-directive error. Both names are exported from `index.ts` and need to be added to every demo's `imports` array.

3. **Major** — `_registry.ts` sheet entry (line 465) has no `registryDependencies`. `SheetContentComponent` depends on `Button` from `@/angular-ui/button`. Without `registryDependencies: ["button"]`, `npx shadcn add @force-ui-angular/sheet` leaves the button component absent and the install broken.

4. **Minor** — `sheet-rtl.ts` comment documents the static-Arabic simplification, but the MDX page has no `<Callout>` noting the deviation from the React multi-language version. The docs standard requires an inline note when an example deviates.

5. **Minor** — `## API Reference` contains two paragraphs; the docs standard specifies one link-out sentence for primitive-wrapping components.

---
