# card — Migration Review

## Checklist

### 1. Examples match React base?

Six React examples exist (`card-demo`, `card-edge-to-edge`, `card-image`, `card-rtl`, `card-small`, `card-spacing`); all six Angular counterparts exist.

**`card-demo.ts` — major parity gap (hero preview).**
React `card-demo.tsx` shows a full two-field login form: email + password + "Forgot your password?" link, `Label`/`Input` branded components, `required` attributes.
Angular `apps/preview-angular/src/angular/card-demo.ts` shows **only the email field**, using a bare `<label class="text-sm font-medium">` and a raw `<input>` with hand-crafted classes instead of `uiLabel`/`uiInput`. The password section and "Forgot your password?" link are absent, and `required` is missing. This is the hero preview that appears first on the doc page.

**`card-spacing.ts` — minor divergence.**
React sets the CSS variable via Tailwind arbitrary classes: `[--card-spacing:--spacing(4)]` (rem-based, scales with root font size).
Angular uses `[style.--card-spacing.px]="cardSpacingPx()"` where `cardSpacingPx = signal(16)` and increments by `Number(value) * 4`. This emits `16px`/`20px`/`24px`/`32px` — numerically correct at 16 px root, but breaks at non-default root font sizes (common in accessibility contexts).

**`card-small.ts`** — uses an inline `<svg fill-current>` chevron instead of `ChevronRightIcon` from `@/examples/material-symbols`. Acceptable Angular adaptation; visual output is equivalent.

**`card-rtl.ts`** — uses static Arabic strings instead of the React `useTranslation` language-selector. Acceptable; interactive language switching is React-specific.

**`card-edge-to-edge.ts`, `card-image.ts`** — match React content and classes exactly. ✓

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/card.mdx`

- Frontmatter (`title`, `description`, `base: angular`, `component: true`) ✓
- Hero `<ComponentPreview framework="angular" name="card-demo" …>` before first heading ✓
- `## Installation` with CLI + manual tabs ✓
- `## Usage` ✓  
- `## Composition` ✓  
- Flat `## Size`, `## Spacing`, `## Image` (no `## Examples` umbrella) ✓
- `## RTL` second-to-last with `direction="rtl"` ✓
- `## API Reference` last ✓

**Minor deviation — API Reference format.**
Base page (`apps/v4/content/docs/components/base/card.mdx`) has a separate `### CardXxx` subsection with a one-sentence description for each of the seven exported parts. The Angular page uses two tables: one for `CardComponent` and one catchall row for the remaining six, with no per-part descriptions. The docs standard requires "a `### PartName` per exported part" with a describing sentence.

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` entry at line 35:
```ts
{ name: "card", type: "registry:ui", files: [
  { path: "ui/card/card.component.ts", type: "registry:ui" },
  { path: "ui/card/card.component.html", type: "registry:ui" },
  { path: "ui/card/index.ts", type: "registry:ui" },
] }
```
All three files exist on disk. ✓

`apps/v4/lib/framework-components.ts` angular Set includes `"card"` (line 397). ✓

`apps/v4/content/docs/components/angular/meta.json` lists `"card"` in `pages`. ✓

All six demo selectors (`preview-card-demo`, `preview-card-edge-to-edge`, `preview-card-image`, `preview-card-rtl`, `preview-card-small`, `preview-card-spacing`) are declared in the preview-angular glob-discoverable flat files. ✓

### 4. Style diff vs original p4one

| Feature | p4one (`/opt/dev/pd-p4one`) | Registry (`cn-*` tokens) | p4one-local? |
|---|---|---|---|
| Card gap/padding | Hard-coded `gap-4 py-4`, `data-[size=sm]:gap-3 data-[size=sm]:py-3` | `gap-(--card-spacing) py-(--card-spacing)` via `cn-card` | No — registry supersedes with variable |
| Header padding | `px-4 group-data-[size=sm]/card:px-3`, `[.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3` | `px-(--card-spacing) [.border-b]:pb-(--card-spacing)` via `cn-card-header` | No — registry supersedes |
| Content padding | `px-4 group-data-[size=sm]/card:px-3` | `px-(--card-spacing)` via `cn-card-content` | No — registry supersedes |
| Footer padding | `p-4 group-data-[size=sm]/card:p-3` | `p-(--card-spacing)` via `cn-card-footer` | No — registry supersedes |
| CardTitle `text-card-foreground` | Explicit (counters `@vex` global heading color override) | Not in token; relies on inherited color from `cn-card` | **Yes — p4one-local** |
| CardFooter `border-border` | Explicit in class string | Explicit in component `classes()` computed (not in `cn-card-footer` CSS) | No — but see note below |

**Theme promotion candidates**

| Candidate | Status | Recommendation |
|---|---|---|
| `border-border` on `cn-card-footer` | Already in registry component's `classes()` computed; absent from `cn-card-footer` CSS rule | Minor: fold into `cn-card-footer { @apply ... border-border; }` so the fix is automatic in all framework ports without per-port `classes()` additions |
| `text-card-foreground` on CardTitle | p4one-local; caused by `@vex` heading typography override | Do not promote — it is an app-level concern, not a global theme concern |

---

## Verdict

**PASS-with-notes** — registry wiring, docs structure, and styling tokens are correct. Two demos need attention before the page is fully reliable: the hero preview (`card-demo`) is materially incomplete versus the React canonical, and the spacing demo uses px units where the React version uses rem.

## Issues

1. **(major)** `apps/preview-angular/src/angular/card-demo.ts` — hero demo is missing the entire password field, "Forgot your password?" link, `uiInput`/`uiLabel` components, and `required` attributes. The React `card-demo.tsx` shows a two-field login form; the Angular demo shows only one field with hand-crafted `<label>`/`<input>` markup. Fix: port the full form from `card-demo.tsx` using `uiInput` and `uiLabel`.

2. **(minor)** `apps/preview-angular/src/angular/card-spacing.ts` — `[style.--card-spacing.px]="cardSpacingPx()"` emits `16px`/`20px`/`24px`/`32px` (px-absolute). React uses `[--card-spacing:--spacing(n)]` (rem-relative). Breaks proportionally at non-16px root font sizes. Fix: set the variable as a rem string or mirror the Tailwind spacing math with `rem` units.

3. **(minor)** `apps/v4/content/docs/components/angular/card.mdx` — API Reference collapses CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter into one combined table. Docs standard requires individual `### PartName` subsections with a one-sentence description each, matching the base page.

4. **(note)** `cn-card-footer` CSS rule in `style-force-ui.css` is missing `border-border`; it is patched in Angular's component `classes()` computed. Consider promoting to the CSS token so other framework ports inherit it automatically.
```

---
