# bubble — Migration Review

## Checklist

### 1. Examples match React base?

React base has 10 examples (`bubble-{alignment,collapsible,demo,group-demo,link-button,markdown,popover,reactions,tooltip,variants}.tsx`). Angular provides all 10 plus `bubble-rtl.ts` (required by the docs standard but absent from React base). Content, variant coverage, and structure are faithful. Documented prose deviations (markdown as pre-formatted text, `render` prop replaced by attribute-selector on native elements) are correctly annotated with inline comments.

**Material deviation — `bubble-collapsible.ts`** (major bug, see Issues):

The component class declares `protected readonly open = signal(false)`, and the template drives display with `{{ open() || !isLong ? text : preview }}` and `{{ open() ? 'Show less' : 'Show more' }}`. However, `<div uiCollapsible>` in the template has no `[open]="open()"` or `(openChange)="open.set($event)"` bindings. `uiCollapsibleTrigger` toggles Radix-ng's internal collapsible state only; the component's `open` signal is never written. Result: `open()` is permanently `false`, the full text never shows, the button label never changes. The fix is `<div uiCollapsible [open]="open()" (openChange)="open.set($event)">`.

Secondary: the chevron class is `group-data-panel-open/uiCollapsible:rotate-180`. No ancestor ever receives a `group/uiCollapsible` Tailwind group name; the collapsible-basic canonical demo uses the unnamed form `group-data-panel-open:rotate-180`. The rotation will never fire even after the binding is fixed.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/bubble.mdx`:

- Frontmatter (`title`, `description`, `base: angular`, `component: true`) ✅
- Hero preview `<ComponentPreview framework="angular" name="bubble-demo" />` immediately after frontmatter ✅
- `## Installation` with CLI + manual `<CodeTabs>` ✅
- `## Usage` with import and snippet ✅
- `## Composition` ASCII tree ✅
- Flat `##` per example — no `## Examples` umbrella ✅
- `## RTL` second-to-last with prose pointer + preview ✅
- `## API Reference` last; Force UI original → per-part `| Prop | Type | Default |` tables (correct choice) ✅

**Violation (minor):** `## With Tooltip` and `## With Popover` contain only `<ComponentPreview>`, no prose sentence. Docs standard: "No prose-free previews."

**Heading drift (minor, not structural):** `## Grouping` vs React's `## Bubble Group`; `## Collapsible` vs `## Show More / Collapsible`; `## With Buttons & Links` vs `## Links and Buttons`. All name the correct behaviour; no umbrella nesting introduced.

**Note:** `## Accessibility` from the React base page has no Angular counterpart. Not required by the standard template, but notable omission for a stateful-aria component.

### 3. Available inside the registry?

`_registry.ts` lines 703–714:

```ts
{ name: "bubble", type: "registry:ui",
  files: [
    "ui/bubble/bubble-content.component.html",   // ✅ on disk
    "ui/bubble/bubble-group.component.html",      // ✅
    "ui/bubble/bubble-reactions.component.html",  // ✅
    "ui/bubble/bubble.component.html",            // ✅
    "ui/bubble/bubble.component.ts",              // ✅
    "ui/bubble/bubble.variants.ts",               // ✅
    "ui/bubble/index.ts",                         // ✅
  ],
  meta: { links: { docs: "…/angular/bubble" } }
}
```

All 7 files on disk are listed; no extra disk files are omitted. No `registryDependencies` needed (bubble depends on no other registry items). ✅

`framework-components.ts` angular Set: `"bubble"` at line 393. ✅  
`meta.json` pages: `"bubble"` present. ✅  
`validate:previews`: All 11 demo names referenced in the MDX resolve to `.ts` files in `apps/preview-angular/src/angular/`. ✅

### 4. Style diff vs original p4one

**Structural approach:**

| Concern | p4one | Angular registry |
|---|---|---|
| `Bubble` base classes | Inlined Tailwind (`relative flex w-fit max-w-[80%] …`) | `cn-bubble` token (CSS expands same set) |
| `BubbleContent` base | Fully inlined (all focus-ring / padding / text-size classes) | `cn-bubble-content` token + delta inline |
| `BubbleReactions` base | Fully inlined (`rounded-full ring-3 ring-card …`) | `cn-bubble-reactions` token + delta |
| SVG fill correction | Not present (p4one uses Lucide/stroked icons) | `[&_svg]:fill-current` added (Material Symbols, per `DIVERGENCES.md §button-2`) |

**Variant token differences** (p4one deviates from the registry CSS for WCAG reasons, documented in p4one's own `bubble.variants.ts`):

| Slot | cn-token (registry/style-force-ui.css) | p4one override | p4one-local? |
|---|---|---|---|
| `default` hover | `[…]:hover:bg-primary/80` | `bg-primary-hover` | yes — p4one DS token |
| `tinted` resting | `oklch(from var(--primary) 0.93 calc(c*0.4) h)` | `bg-primary-subtle` | yes — p4one DS token |
| `secondary`/`muted` hover | `color-mix(in oklch, …, …)` | `bg-primary-subtle` | yes |
| `destructive` resting | `bg-destructive/10 text-destructive` | `bg-error-subtle text-error` | yes — WCAG AA fix |
| `destructive` hover | `[…]:hover:bg-destructive/20` | `[…]:hover:border-destructive` | yes |

**BubbleContent delta classes** present in both p4one and the Angular registry but absent from `cn-bubble-content` CSS token:

`w-fit max-w-full min-w-0 overflow-hidden`, `wrap-break-word`, `[button]:text-left`, `[button,a]:transition-colors motion-reduce:transition-none`

These are applied component-side in both impls, making `cn-bubble-content` incomplete.

**Theme promotion candidates:**

| Class / token | Where today | Promote to |
|---|---|---|
| `bg-primary-hover` (default hover) | p4one only | `cn-bubble-variant-default` in `style-force-ui.css` |
| `bg-primary-subtle` (tinted / secondary / muted hover) | p4one only | `cn-bubble-variant-tinted / -secondary / -muted` |
| `bg-error-subtle text-error` (destructive) | p4one only | `cn-bubble-variant-destructive` |
| `w-fit max-w-full min-w-0 overflow-hidden wrap-break-word` | both impls | `cn-bubble-content` token |
| `[button]:text-left` | both impls | `cn-bubble-content` token |
| `[button,a]:transition-colors motion-reduce:transition-none` | both impls | `cn-bubble-content` token |

---

## Verdict

**PASS-with-notes** — The component and registry wiring are correct; parity across all 10 React base examples is achieved. One broken demo (`bubble-collapsible.ts`) and two prose-free preview sections need fixing before the page is shippable.

## Issues

1. **(major)** `apps/preview-angular/src/angular/bubble-collapsible.ts` line 26 — `<div uiCollapsible>` missing `[open]="open()" (openChange)="open.set($event)"`. The `open` signal is never written by the trigger; show-more/show-less is permanently stuck showing the preview text and "Show more" label.

2. **(minor)** `apps/preview-angular/src/angular/bubble-collapsible.ts` line 31 — chevron class `group-data-panel-open/uiCollapsible:rotate-180` references a Tailwind group named `uiCollapsible` that no ancestor supplies. Should be `group-data-panel-open:rotate-180` (unnamed, matching `collapsible-basic.ts` canonical form).

3. **(minor)** `apps/v4/content/docs/components/angular/bubble.mdx` — `## With Tooltip` and `## With Popover` sections are prose-free; each needs one sentence per the docs standard ("No prose-free previews").
```

---
