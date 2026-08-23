# hover-card — Migration Review

## Checklist

### 1. Examples match React base?

Three React examples exist (`hover-card-demo.tsx`, `hover-card-sides.tsx`,
`hover-card-rtl.tsx`); three Angular demos match by name.

| Example | Match? | Notes |
|---|---|---|
| `hover-card-demo` | ✅ content | React `hover-card-demo.tsx` imports `Avatar*` but never uses them in JSX; the actual rendered content (`@nextjs`, description, "Joined December 2021") matches the Angular template exactly. |
| `hover-card-sides` | ✅ | Four physical sides, same labels and structure. |
| `hover-card-rtl` | ⚠️ acceptable | React uses `useTranslation` with ar/he/en selector. Angular renders Arabic statically (`dir="rtl"`). This follows the established project convention for RTL demos (comment in file confirms intent; same treatment as `dialog-rtl`, `breadcrumb-rtl`). |

**Material deviation (not about content):** All three Angular demos use
`uiButton` and `variant="..."` on `<button>` elements but **never import
`Button` from `@/angular-ui/button`**. The directive is not in any component's
`imports` array. In Angular's standalone template scope the attribute is
unresolved; no button styling is applied. Compare `tooltip-sides.ts` (correct:
`import { Button } from "@/angular-ui/button"` + `imports: [Button, …]`) and
`tooltip-demo.ts` (same correct pattern). `popover-demo.ts` has the same
defect as hover-card — not a cover for this port.

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/hover-card.mdx`

| Check | Status |
|---|---|
| Frontmatter (`title`, `description`, `base: angular`, `component: true`, `links.doc/.api`) | ✅ |
| Hero preview `name="hover-card-demo"` before any heading | ✅ |
| `## Installation` (cli + manual tabs) | ✅ |
| `## Usage` import snippet + template snippet | ✅ |
| `## Composition` (ASCII tree — optional, present) | ✅ |
| Flat `##` per example, no `## Examples` umbrella | ✅ |
| `## Basic` — prose before ComponentPreview | ❌ — no prose sentence; standard requires "Exactly one sentence or two of prose" |
| `## Sides` — one sentence before preview | ✅ |
| `## RTL` second-to-last with `direction="rtl"` | ✅ |
| `## API Reference` last, links out to upstream | ✅ |

The `## Trigger Delays` and `## Positioning` code-snippet-only sections are
acceptable how-to documentation, not example-preview sections.

### 3. Available inside the registry?

- **`_registry.ts`** (line 511–519): entry `"hover-card"` with
  `type: "registry:ui"`, `dependencies: ["@radix-ng/primitives"]`, files:
  `ui/hover-card/hover-card.component.ts` + `ui/hover-card/index.ts`.
  Both files exist on disk. ✅
- **`apps/v4/lib/framework-components.ts`** angular Set (line 409):
  `"hover-card"` present. ✅
- **`apps/v4/content/docs/components/angular/meta.json`** (line 29):
  `"hover-card"` present. ✅
- **`validate:previews`**: three demo files
  (`hover-card-demo.ts`, `hover-card-sides.ts`, `hover-card-rtl.ts`) sit in
  the flat `apps/preview-angular/src/angular/` directory and export a default
  component. Glob resolution should succeed. ✅ (no code change to verify at
  runtime, but structure matches the pattern.)

### 4. Style diff vs original p4one

p4one (`/opt/dev/pd-p4one/app/src/app/ui/hover-card/`) inlines the full class
string in a `HOVER_CARD_CONTENT_CLASS` constant and applies it via a
`[rdxHoverCardContentAttributes]` directive. The new port uses the
`cn-hover-card-content` CSS token from `style-force-ui.css` and adds the
non-surface classes inline at the component level.

| Class / token | p4one | New port | Candidate to promote? |
|---|---|---|---|
| `bg-popover text-popover-foreground rounded-lg p-2.5 text-sm shadow-md ring-1 ring-foreground/10 w-64` | inline string | `cn-hover-card-content` token | Already in `style-force-ui.css` ✅ |
| `duration-100 motion-reduce:duration-0` | inline string | `cn-hover-card-content` token | Already in `style-force-ui.css` ✅ |
| Physical-side slide-ins (`data-[side=*]:slide-in-from-*`) | inline string | `cn-hover-card-content` token | Already promoted ✅ |
| Logical-side slide-ins (`data-[side=inline-start/end]:slide-in-from-*`) | **absent** | `cn-hover-card-content-logical` token exists in CSS but **not applied** by the Angular component | Already promoted (`cn-hover-card-content-logical` in `style-force-ui.css`), but unapplied — apply always alongside `cn-hover-card-content` |
| `z-50 outline-hidden origin-(--radix-hover-card-content-transform-origin)` | inline on content | inline in `HoverCardContentComponent.classes()` | p4one-local; correct to keep inline in component |

**Theme promotion candidates:**

| Token | Already in `style-force-ui.css`? | Action |
|---|---|---|
| `cn-hover-card-content` | ✅ yes | No change needed |
| `cn-hover-card-content-logical` | ✅ yes | Apply in `HoverCardContentComponent` alongside `cn-hover-card-content` |

No new tokens need promoting; `cn-hover-card-content-logical` is already
global — it just must be added to the component's class string.

## Verdict

**FAIL** — two runtime bugs (missing `Button` import in all demos; logical-side
animations silently broken) block the port from functioning as shown.

## Issues

1. **[blocker]** `Button` directive not imported in `hover-card-demo.ts`,
   `hover-card-sides.ts`, `hover-card-rtl.ts`. Each uses `uiButton`
   and `variant="link"/"outline"` in its template but omits
   `Button` from the component's `imports` array. Angular's standalone
   template scope has no `uiButton` directive → buttons render unstyled.
   Fix: `import { Button } from "@/angular-ui/button"` + add to `imports`
   in all three files (pattern: `tooltip-sides.ts`).

2. **[major]** `cn-hover-card-content-logical` never applied.
   `HoverCardContentComponent.classes()` (line ~148 of
   `hover-card.component.ts`) only emits `cn-hover-card-content`. The token
   `cn-hover-card-content-logical` adds `data-[side=inline-start]:slide-in-from-right-2`
   and `data-[side=inline-end]:slide-in-from-left-2`; without it the RTL demo's
   logical-side slide animations are silent. Fix: extend the base class string
   to `"cn-hover-card-content cn-hover-card-content-logical z-50 …"`.

3. **[major]** `HoverCardPositionerDirective.align` local input (line 130) is
   dead code. `hostDirectives` already exposes `RdxPreviewCardPositioner`'s own
   `align` input directly to the template; the local `input<…>("center")` signal
   is a second, unread signal that never reaches the primitive. The intended
   default `"center"` is not applied to positioning. Fix: remove the local
   `align` field; if `RdxPreviewCardPositioner` does not default to `"center"`,
   set `[align]="'center'"` in demos or find the supported API to set a default.

4. **[minor]** `## Basic` section in `hover-card.mdx` has no prose sentence
   before the `<ComponentPreview>` (docs standard: "Exactly one sentence or two
   of prose, describing what the example shows").
```

---
