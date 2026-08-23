# collapsible — Migration Review

## Checklist

### 1. Examples match React base?

Angular ships 5 demos matching the React file set (`collapsible-{demo,basic,file-tree,rtl,settings}.ts`). Deviations:

| Demo | Deviation |
|---|---|
| `collapsible-demo.ts` | Different business scenario: "@shadcn starred 3 repositories" vs React "Order #4189". Not a ported translation — a different example. Minor content drift; same structural pattern. |
| `collapsible-demo.ts` / `collapsible-rtl.ts` | **Invalid HTML**: `<button uiCollapsibleTrigger>` wraps `<button uiButton …>`. React's `render={<Button />}` merges trigger + button into one DOM node; Angular nests two `<button>` elements. Browsers auto-correct nested buttons, breaking event routing. |
| `collapsible-file-tree.ts` | Static hardcoded template (2 folders, 2 loose files) vs React's data-driven recursive `renderItem()` (5 folders, ~11 entries). First collapsible trigger uses an unrecognised SVG path (not ChevronRight); "lib" trigger uses the folder icon as its rotation indicator instead of a separate chevron. |
| `collapsible-settings.ts` | `defaultOpen` attribute used instead of `[open]="true"` (p4one pattern); static chevron trigger instead of React's `{isOpen ? <MinimizeIcon /> : <MaximizeIcon />}` swap. |
| `collapsible-rtl.ts` | Arabic-only static strings; React version uses `useTranslation` with en/ar/he. Acceptable framework difference, but it mirrors the "starred repos" layout rather than porting the RTL demo scenario. |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/collapsible.mdx`:
- ✓ Frontmatter: `title`, `description`, `base: angular`, `component: true`, `featured: true`, `links.doc/api`
- ✓ Hero `<ComponentPreview framework="angular" name="collapsible-demo" />` before any heading
- ✓ `## Installation` with `<CodeTabs>` (cli + manual Steps)
- ✓ `## Usage` → import + HTML snippet; `## Composition` → ASCII tree
- ✓ Flat `## Basic`, `## Settings Panel`, `## File Tree`, `## RTL`, `## API Reference` — no `## Examples` umbrella
- ✓ `## RTL` second-to-last; `## API Reference` last, links out to radix-ng (correct since `links.api` is set)
- ✗ Missing `## Controlled State` code-snippet section present in `base/collapsible.mdx`

### 3. Available inside the registry?

- `_registry.ts` entry: name `"collapsible"`, `type: "registry:ui"`, `dependencies: ["@radix-ng/primitives"]`, files `ui/collapsible/collapsible.component.ts` + `ui/collapsible/index.ts` — both files exist on disk ✓ (all three sub-components are in the single `.component.ts` file, so the two-file list is complete)
- `framework-components.ts` angular Set: `"collapsible"` present ✓
- `meta.json` pages: `"collapsible"` present ✓
- All 5 preview demos exist in `apps/preview-angular/src/angular/` ✓

**Risk**: `contentId` is not listed in the `hostDirectives` `inputs` array (`['open', 'disabled']` only). Without it, `RdxCollapsibleRootDirective` cannot set `aria-controls` on the trigger. p4one passes `contentId` in every Storybook story and documents it as a WCAG 4.1.2 requirement.

**Risk**: Registry uses `RdxCollapsiblePanelDirective` for the content part; p4one uses `RdxCollapsibleContentDirective`. The registry comment asserts this is the v1.x renamed API — if both packages resolve to the same library version, the p4one name would fail to compile (or vice-versa). Needs build verification.

### 4. Style diff vs original p4one

| Aspect | p4one | Registry | Promote? |
|---|---|---|---|
| File layout | 3 files (root / trigger / content) | 1 monolithic file | Architecture preference, not a token |
| `contentId` input | Forwarded (`['open','disabled','contentId']`) | **Absent** | N/A — not a style token |
| Primitive name | `RdxCollapsibleContentDirective` | `RdxCollapsiblePanelDirective` | N/A |
| Base classes | None (headless) | None (headless) | — |
| `cn-collapsible-*` tokens in `style-force-ui.css` | None | None | — |

**Theme promotion candidates:** None. The collapsible is a classless structural primitive; all visual styling lives in consuming utility classes. No `cn-collapsible-*` classes exist in either implementation.

---

## Verdict

**FAIL** — one confirmed HTML-validity blocker plus two structural gaps (missing `contentId` forwarding for accessibility, and a substantially reduced file-tree example) must be resolved before parity can be declared.

---

## Issues

1. **(blocker)** `collapsible-demo.ts:16-20` and `collapsible-rtl.ts:15-20` — nested `<button uiCollapsibleTrigger><button uiButton …>` produces invalid DOM. Apply both attribute selectors to the same element: `<button uiButton uiCollapsibleTrigger variant="ghost" size="icon-sm">`.
2. **(major)** `collapsible.component.ts:28` — `contentId` absent from `hostDirectives` inputs. Add `'contentId'` to the inputs list; p4one documents this as WCAG 4.1.2 (`aria-controls` → panel `id`).
3. **(major)** `collapsible-file-tree.ts` — 2 hardcoded folders vs React's 5-folder recursive renderer. Substantially below parity; needs a data-driven rewrite to match the React canonical form.
4. **(minor)** `collapsible.component.ts` uses `RdxCollapsiblePanelDirective`; p4one uses `RdxCollapsibleContentDirective`. Needs build confirmation that the v1.x name is correct and the import resolves.
5. **(minor)** `collapsible-settings.ts` and `collapsible-file-tree.ts` use `defaultOpen` attribute, which is not in the `hostDirectives` inputs list. p4one achieves initial-open state via `[open]="true"` binding. Replace `defaultOpen` with `[open]="true"` to match p4one's verified approach.
6. **(minor)** `collapsible-file-tree.ts` icon bugs — unrecognised SVG path on "components" trigger (should be ChevronRight); "lib" trigger rotates the folder icon instead of a separate chevron.
7. **(minor)** `collapsible-settings.ts` — static chevron trigger; React swaps `MinimizeIcon`/`MaximizeIcon` based on open state.
8. **(minor)** `angular/collapsible.mdx` — missing `## Controlled State` code-snippet section that appears in the base docs.
```

---
