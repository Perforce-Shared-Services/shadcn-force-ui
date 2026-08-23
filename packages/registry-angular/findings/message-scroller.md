# message-scroller — Migration Review

## Checklist

### 1. Examples match React base?

React base: 12 demos. Angular: 12 demos — exact 1:1 by filename. No
`message-scroller-rtl` in either base or Angular (consistent; the component
uses CSS logical properties, no RTL demo exists for the React base either).

**Deviations (file-by-file):**

| Demo | Deviation | Verdict |
|---|---|---|
| `message-scroller-anchoring.ts` | **Does not use `uiMessageScrollerItem` or `[scrollAnchor]`**. The `@for` loop renders bare `div uiMessage` rows — the feature the section documents is never wired up. | ❌ Blocker — see Issue 1 |
| `message-scroller-demo.ts` | Pre-seeds 4 scripted turns; React uses `@ai-sdk/react` streaming. Rows rendered without `uiMessageScrollerItem`, so no `scrollAnchor` or `data-message-id` in the hero. | Minor — hero is a full-UI showcase, not an anchoring demo |
| `message-scroller-streaming.ts` | Simulates streaming with `setInterval`/24-char chunks. Documented with `<Callout>` in MDX. | Acceptable deviation, correctly documented |
| `message-scroller-animation.ts` | Animation preset `Select` is in `CardAction` (header); React places it in `CardFooter`. Also missing the `MessageScrollerProvider` in the outer shell (it's inside the `@else` block in Angular; React wraps the outer `Card`). | Minor layout deviation |
| All others | Content and behavior match React counterparts | ✓ |

### 2. Docs follow the React/flat pattern?

Checked against `docs/component-docs-standard.md`:

- **Frontmatter**: `title`, `description`, `base: angular`, `component: true` ✓
- **Hero preview**: `<ComponentPreview framework="angular" name="message-scroller-demo" />` immediately after frontmatter, before any `##` ✓
- **Flat `##` per example**: No `## Examples` umbrella — correct ✓
- **`## Demo` section (line 158)**: Redundant — repeats the hero preview with the same `name="message-scroller-demo"`. Per the standard, `{slug}-demo` is reserved for the hero preview; it must not also appear as a named section. — see Issue 2
- **`## RTL` (line 162)**: Present; no `<ComponentPreview>` (no `{slug}-rtl` file exists for Angular or base). Text note is adequate. ✓
- **`## Accessibility` (line 166)**: Appears *after* `## RTL` and *before* `## API Reference`, violating the required order (RTL second to last, API Reference last). — see Issue 3
- **`## API Reference` (line 172)**: Last section ✓; uses hand-maintained props table (correct for a Force UI original with no upstream primitive port). Missing `### MessageScrollerViewport` table — see Issue 4.

### 3. Available inside the registry?

- `_registry.ts` lines 740–759: entry `"message-scroller"`, type `"registry:ui"`,
  `registryDependencies: ["button", "message"]`, 14 files listed.
- Disk vs registry file list: all 14 files present (`index.ts`, `message-scroller-button.component.html/ts`, `message-scroller-content.component.html/ts`, `message-scroller-item.component.html/ts`, `message-scroller-provider.component.ts`, `message-scroller-viewport.component.html/ts`, `message-scroller.component.html/ts`, `message-scroller.icons.ts`, `message-scroller.variants.ts`) ✓
- `framework-components.ts` angular Set: contains `"message-scroller"` ✓
- `meta.json` pages array: contains `"message-scroller"` ✓
- `validate:previews` resolution: all 12 `name="message-scroller-*"` in the MDX resolve to files in `apps/preview-angular/src/angular/` ✓

### 4. Style diff vs original p4one

| Part | p4one class string | Registry addition | In style-force-ui.css? |
|---|---|---|---|
| Root | `group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden` | `cn-message-scroller` prefix class | No rule (marker only) |
| Viewport | `size-full min-h-0 min-w-0 scroll-fade-b scrollbar-overlay [scrollbar-gutter:stable] overflow-y-auto overscroll-contain contain-content ...` | `cn-message-scroller-viewport` prefix class | No rule (marker only) |
| Content | `flex h-max min-h-full flex-col gap-6` (inline) | `cn-message-scroller-content flex h-max min-h-full flex-col` (gap from token) | ✅ `.cn-message-scroller-content { @apply gap-6; }` (line 1672) |
| Item | `min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]` | `cn-message-scroller-item` prefix class | No rule (marker only) |
| Button | `... shadow-sm ...` | adds `[&_svg]:fill-current` before the rest | No rule; `shadow-sm` documented deviation (DIVERGENCES.md §button-2) |

**Theme promotion candidates:**

| Token | Current state | Promote? |
|---|---|---|
| `.cn-message-scroller-content { gap-6 }` | Already in style-force-ui.css line 1672 | Done |
| `.cn-message-scroller-button { shadow-sm }` | Inline only | Weak candidate — would allow theming the button elevation; currently documented as approved deviation |
| `[contain-intrinsic-size:auto_10rem]` on item | Inline arbitrary | Not a candidate — scroller-specific |
| `[&_svg]:fill-current` on button | Inline | Not a candidate — icon-system-specific convention (DIVERGENCES.md) |

## Verdict

**FAIL** — Issue 1 (blocker): the `message-scroller-anchoring` demo never uses
`uiMessageScrollerItem` or `[scrollAnchor]`, so the feature the `## Anchoring`
section documents is undemonstrated. Issues 2–4 are minors that should be
resolved before the next docs release but do not block a registry publish.

## Issues

1. **[blocker]** `apps/preview-angular/src/angular/message-scroller-anchoring.ts` —
   `@for` loop renders `div uiMessage` rows without `uiMessageScrollerItem`
   wrapping or `[scrollAnchor]`. The `anchorRole` signal exists but is never
   used as an input. Fix: add `<div uiMessageScrollerItem [messageId]="m.id" [scrollAnchor]="m.role === anchorRole()">…</div>` around each `div uiMessage`.

2. **[minor]** `apps/v4/content/docs/components/angular/message-scroller.mdx:158` —
   `## Demo` section duplicates the page-top hero preview (`name="message-scroller-demo"` appears twice). Remove the `## Demo` section; the standard reserves `{slug}-demo` for the hero only.

3. **[minor]** `message-scroller.mdx:162–172` — `## Accessibility` sits between
   `## RTL` and `## API Reference`, violating the required order. Move
   `## Accessibility` prose above `## RTL`.

4. **[minor]** `message-scroller.mdx:172` — `## API Reference` is missing a
   `### MessageScrollerViewport` table. The `ariaLabel` input is used in every
   demo (`ariaLabel="Transcript"`) but is undocumented. Add the table entry.
```

---
