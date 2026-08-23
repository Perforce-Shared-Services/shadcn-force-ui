# attachment — Migration Review

## Checklist

### 1. Examples match React base?

React base has 6 example files: `attachment-demo.tsx`, `attachment-group.tsx`, `attachment-image.tsx`, `attachment-sizes.tsx`, `attachment-states.tsx`, `attachment-trigger.tsx`. All 6 are ported. Angular adds `attachment-rtl.ts` (no React base counterpart; documented in the MDX with a Callout).

Material deviations per file:

| Demo | React | Angular | Verdict |
|------|-------|---------|---------|
| `attachment-demo` | Vertical-group cards have no `AttachmentActions` | Same | ✓ |
| `attachment-group` | 4-card horizontal group, icon + image mix | Same data, same layout | ✓ |
| `attachment-image` | Vertical cards, each with `AttachmentActions` + `AttachmentTrigger` (`<a>`) | Same; trigger as `<a uiAttachmentTrigger>` | ✓ |
| `attachment-sizes` | 3 sizes, no actions | Same; but TS import block dead-imports `AttachmentAction`, `AttachmentActions`, `AttachmentGroup` — not in Angular `imports[]` or template | minor |
| `attachment-states` | All 5 states | Same; TS block dead-imports `AttachmentGroup` | minor |
| `attachment-trigger` | `<Dialog>` wrapper | `uiDialogRoot` on outer `<div>` + `ng-template uiDialogPortal` — expected Angular Dialog pattern | ✓ |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/attachment.mdx`:

- **Frontmatter** `title`, `description`, `base: angular`, `component: true` — ✓
- **Hero preview** `<ComponentPreview framework="angular" name="attachment-demo" …/>` immediately after frontmatter — ✓
- `## Installation` CodeTabs with `cli` and `manual` tabs — ✓
- `## Usage` with import block + HTML snippet — ✓
- `## Composition` ASCII tree — ✓ (optional, present and accurate)
- **Flat `##` per example** — States, Sizes, Group, Image media, Trigger — ✓ (no `## Examples` umbrella)
- `## RTL` second-to-last with Callout — ✓
- `## API Reference` last, with `### Part` tables — ✓

One ordering note: React base goes Image → States → Sizes → Group → Trigger; Angular goes States → Sizes → Group → Image media → Trigger. The standard allows re-ordering by importance; this is acceptable.

`## API Reference` uses hand-written per-input tables (not a link-out), which is correct since `attachment` is a Force UI original with no upstream primitive to link to.

### 3. Available inside the registry?

```
_registry.ts:692  name: "attachment"
  files: attachment.component.html ✓ (disk)
         attachment.component.ts   ✓
         attachment.variants.ts    ✓
         index.ts                  ✓
  meta.links.docs: …/angular/attachment ✓
```

`framework-components.ts` angular Set line 389: `"attachment"` — ✓  
`meta.json` pages: `"attachment"` at line 8 — ✓

**Gap:** `_registry.ts` entry has no `registryDependencies` field. `attachment.component.ts` imports `buttonVariants, ButtonSize, ButtonVariant` from `@/angular-ui/button`. Without `registryDependencies: ["button"]`, a `npx shadcn@latest add @force-ui-angular/attachment` will install the attachment files but not the button component, causing a broken import on a clean project. Every other Angular component that imports button (e.g. `input-group`, `combobox`) declares this dependency.

### 4. Style diff vs original p4one

| Dimension | p4one class | Angular port (registry) | Is it p4one-local? |
|-----------|-------------|-------------------------|--------------------|
| Card error border | `data-[state=error]:border-error` (full-opacity semantic) | `data-[state=error]:border-destructive/30` | p4one app-local; registry uses alpha-tinted destructive — **promotion candidate** |
| Card motion guard | `motion-reduce:transition-none` on card hover | absent from `.cn-attachment` token and `attachmentVariants` base string | p4one app-compat (WCAG 2.3.3) — **promotion candidate** |
| Media error bg | `group-data-[state=error]/attachment:bg-error-subtle` | `group-data-[state=error]/attachment:bg-destructive/10` | p4one semantic token vs registry alpha hack — **promotion candidate** |
| Media error text | `group-data-[state=error]/attachment:text-error` | `group-data-[state=error]/attachment:text-destructive` | p4one semantic token — **promotion candidate** |
| sm icon step-down | `group-data-[size=sm]/attachment:[&_svg:not(...)]:size-3.5` | absent from `cn-attachment-media` CSS | p4one audit fix (16px icon at 12px type on `sm`) — **promotion candidate** |
| Description error text | `text-error` | `text-destructive/80` | p4one semantic token — **promotion candidate** |
| `border-border` on card | present (no global border-color reset in p4one) | absent (registry relies on global reset) | p4one-local only — not a candidate |
| `cn-attachment-action` class | absent (action uses `buttonVariants` only) | present in component string | Angular port adds styling hook; **no `.cn-attachment-action` CSS rule exists** in `style-force-ui.css` — orphaned class |
| Inline/CSS duplication | clean | `cn-attachment-content`, `cn-attachment-title`, `cn-attachment-actions` strings repeat classes already in their `@apply` blocks | registry pattern issue, not p4one-specific |

**Theme promotion candidates table:**

| Token / class | Where | Priority |
|---|---|---|
| `border-error` (full-opacity) for error state card border | `.cn-attachment` | medium |
| `motion-reduce:transition-none` for card transitions | `.cn-attachment` | medium (WCAG 2.3.3) |
| `bg-error-subtle / text-error` for media error state | `.cn-attachment-media` | medium |
| `text-error` for description error state | `.cn-attachment-description` | medium |
| `group-data-[size=sm]/attachment:[&_svg:not([class*='size-'])]:size-3.5` | `.cn-attachment-media` | low (visual refinement) |

---

## Verdict

**PASS-with-notes** — demo parity is complete, docs structure is correct, all files are registered. One major gap (missing `registryDependencies: ["button"]`) breaks clean installs; remaining items are minor cleanup.

---

## Issues

1. **[major]** `packages/registry-angular/ui/_registry.ts` line 692 — `attachment` entry has no `registryDependencies: ["button"]`. `attachment.component.ts` hard-imports `buttonVariants`, `ButtonSize`, `ButtonVariant` from `@/angular-ui/button`. CLI installs will produce a broken import on any project that does not already have the `button` component. Fix: add `registryDependencies: ["button"]` to the entry.

2. **[minor]** `apps/preview-angular/src/angular/attachment-sizes.ts` — TypeScript import block includes `AttachmentAction`, `AttachmentActions`, `AttachmentGroup` (line 4–7); none appear in the Angular component `imports[]` array or template. Same issue in `attachment-states.ts` for `AttachmentGroup`. Dead imports should be removed.

3. **[minor]** `packages/registry-angular/ui/attachment/attachment.component.ts` — `AttachmentActionComponent.classes()` appends the string `"cn-attachment-action"`, but no `.cn-attachment-action` rule exists in `apps/v4/registry/styles/style-force-ui.css`. Either add an empty/placeholder rule (to make the hook intentional) or remove the class. Currently it is an orphaned class name.

4. **[minor]** `attachment.component.ts` — `AttachmentActionsComponent`, `AttachmentContentComponent`, and `AttachmentTitleComponent` each hardcode inline class strings that duplicate classes already applied by their `cn-attachment-*` CSS tokens (e.g. `AttachmentActionsComponent` lists `group-data-[orientation=vertical]/attachment:absolute top-3 right-3 relative z-20` verbatim, while `.cn-attachment-actions { @apply … }` contains the same). Functionally harmless, but creates maintenance drift when either side is updated. Audit inline strings against CSS tokens and remove duplicates.

5. **[minor / promotion]** `motion-reduce:transition-none` is absent from `attachmentVariants`' base string and from `.cn-attachment` in `style-force-ui.css` (p4one added it as a WCAG 2.3.3 guard). The card's `transition-colors` on hover/focus-within will animate even when the user requests reduced motion. Promote to `style-force-ui.css`.

---
