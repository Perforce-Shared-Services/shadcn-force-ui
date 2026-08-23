# message — Migration Review

## Checklist

### 1. Examples match React base?

React base has 7 `message-*` examples (excluding message-scroller):
`message-demo`, `message-avatar`, `message-group`, `message-header-footer`,
`message-actions`, `message-attachment`, `message-markdown`.

Angular has matching `.ts` files for all 7. File-by-file comparison:

| Demo | Angular file exists | Deviations |
|---|---|---|
| message-demo | ✓ | None material |
| message-avatar | ✓ | Uses Unsplash URLs instead of `/avatars/` paths — intentional for preview-app portability |
| message-group | ✓ | Same `role="log" aria-live="polite"` added on `uiMessageGroup`; matches intent |
| message-header-footer | ✓ | None |
| message-actions | ✓ | Lucide icons swapped for inline Material Symbols SVGs — documented deviation; content identical |
| message-attachment | ✓ | Same swap; FileTextIcon → inline SVG path passed via `[innerHTML]` |
| message-markdown | ✓ | No Angular markdown renderer: deviation documented with comment and Callout in docs |

All demos are structurally faithful to React base.

### 2. Docs follow the React/flat pattern?

- Frontmatter: `title`, `description`, `base: angular`, `component: true` ✓
- Hero preview: `<ComponentPreview framework="angular" name="message-demo" />` immediately after frontmatter ✓
- `## Installation` with CodeTabs (cli + manual) ✓
- `## Usage` ✓
- `## Composition` ✓
- `## Avatar` → `name="message-avatar"` ✓
- `## Group` → `name="message-group"` ✓
- `## Header and Footer` → `name="message-header-footer"` ✓
- `## Actions` → **`name="message-attachment"`** ✗ (should be `name="message-actions"`)
- `## Attachment` → **MISSING** ✗ (exists in React base; `message-attachment.ts` has no docs section)
- `## Markdown` → `name="message-markdown"` with deviation Callout ✓
- `## RTL` → absent; no `message-rtl.tsx` in React base either — consistent gap, not Angular-specific
- `## API Reference` (last) ✓ — but `MessageFooter.variant` input is absent from the table ✗

### 3. Available inside the registry?

`_registry.ts` entry `"message"`:
- `type: "registry:ui"` ✓
- `registryDependencies: ["avatar", "bubble"]` ✓
- Files: `ui/message/index.ts`, `ui/message/message.component.html`,
  `ui/message/message.component.ts`, `ui/message/message.variants.ts` — all 4 present on disk ✓
- `framework-components.ts` angular Set: `"message"` present ✓
- `meta.json` pages: `"message"` present ✓
- Demo files resolve for `validate:previews`: all 7 `.ts` files exist at the
  correct top-level path in `apps/preview-angular/src/angular/` ✓

### 4. Style diff vs original p4one

| Feature | p4one (`message.component.ts`) | Registry port (`message.variants.ts` + `style-force-ui.css`) | Assessment |
|---|---|---|---|
| Avatar translate — text footer | `group-has-[[data-slot=message-footer][data-variant=text]]/message:-translate-y-[1.625rem]` | `.cn-message-avatar { @apply … -translate-y-8 }` (fixed 32 px) | p4one-identified bug retained in registry |
| Avatar translate — action footer | `group-has-[[data-slot=message-footer][data-variant=action]]/message:-translate-y-[2.625rem]` | Same fixed `-translate-y-8` | p4one fix not promoted |
| Avatar `min-w-8` | Inline | CSS token `@apply min-w-8` | Already promoted ✓ |
| `gap-2 text-sm` on Message | Inline | CSS token `.cn-message { @apply text-sm gap-2 }` | Already promoted ✓ |
| Footer `px-3 text-xs font-medium text-muted-foreground` | Inline | CSS token `.cn-message-footer { @apply … }` | Already promoted ✓ |
| `MessageFooter.variant` input | Present, drives per-variant CSS selectors | Present, writes `data-variant` but no CSS consumes it | Orphaned — incomplete promotion |

**Theme promotion candidates**

| Selector | Action needed |
|---|---|
| `group-has-[[data-slot=message-footer][data-variant=text]]/message:-translate-y-[1.625rem]` | Add to `.cn-message-avatar` in `style-force-ui.css`; remove monolithic `-translate-y-8` |
| `group-has-[[data-slot=message-footer][data-variant=action]]/message:-translate-y-[2.625rem]` | Add to `.cn-message-avatar` in `style-force-ui.css` |

Both selectors are Force UI originals (p4one-sourced), not present in any upstream base.
They are direct candidates to replace the existing monolithic rule.
The Angular component already emits the required `data-variant` attribute.

## Verdict

**FAIL** — Angular docs `## Actions` section renders the wrong demo (`message-attachment`
instead of `message-actions`); `## Attachment` section is missing; `MessageFooter.variant`
is a public undocumented input with no CSS effect.

## Issues

1. `apps/v4/content/docs/components/angular/message.mdx` `## Actions` uses
   `name="message-attachment"` — should be `name="message-actions"`. The actions
   demo (`message-actions.ts`) is never surfaced in the docs. **blocker**

2. `apps/v4/content/docs/components/angular/message.mdx` missing `## Attachment`
   section. React base page has it; `message-attachment.ts` exists but has no docs
   section. **major**

3. `style-force-ui.css` `.cn-message-avatar` uses monolithic
   `group-has-data-[slot=message-footer]/message:-translate-y-8` (32 px fixed).
   p4one identifies this as incorrect for action footers and implements per-variant
   selectors; the registry port reverts to the broken approach, making
   `MessageFooter.variant` / `data-variant` dead code. **major**

4. `apps/v4/content/docs/components/angular/message.mdx` `### MessageFooter` API
   table omits the `variant` input (`"text" | "action"`, default `"text"`). **minor**
```

---
