# dialog — Migration Review

## Checklist

### 1. Examples match React base?

Both sets have the same six files: `dialog-demo`, `dialog-close-button`,
`dialog-no-close-button`, `dialog-scrollable-content`, `dialog-sticky-footer`,
`dialog-rtl`. Count parity is 6/6. File-by-file:

| Demo | Angular deviation from React base |
|---|---|
| `dialog-demo` | None — same title, fields, footer structure. ✅ |
| `dialog-close-button` | The React `DialogClose` in the footer uses no explicit `variant`; Angular uses plain `type="button"` without a variant. Visually matches. ✅ |
| `dialog-no-close-button` | Parity. `[showCloseButton]="false"` mirrors React's `showCloseButton={false}`. ✅ |
| `dialog-scrollable-content` | Parity. `@for` replaces `.map()`. Functional equivalent. ✅ |
| `dialog-sticky-footer` | Parity. ✅ |
| `dialog-rtl` | React drives `dir` + `data-lang` from a `useTranslation` hook (en/ar/he). Angular sets `dir="rtl"` statically and omits `data-lang`. RTL layout is correct; `data-lang` for font/locale hooks is absent. Minor fidelity gap. |

All 6 demos are **missing `DialogOverlay` in their `imports` array** while using
`<div uiDialogOverlay></div>` in their templates — confirmed by comparing with the
established pattern in `alert-dialog-demo.ts` which explicitly imports
`AlertDialogOverlay`. The overlay/backdrop will not be applied at runtime. This
affects every demo (blocker; see Issues #1).

All 6 demos also use `<button uiButton ...>` on trigger and footer buttons without
importing `Button` from `@/angular-ui/button`. Compare with `alert-dialog-demo.ts`
which imports `Button`. Buttons render unstyled (see Issues #2).

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/dialog.mdx`

| Check | Result |
|---|---|
| Frontmatter: `title`, `description`, `base`, `component: true`, `links.doc`/`links.api` | ✅ All present |
| Hero `<ComponentPreview framework="angular" name="dialog-demo" />` immediately after frontmatter, before first heading | ✅ |
| `## Installation` with cli + manual CodeTabs | ✅ |
| `## Usage` import block + template snippet | ✅ |
| `## Composition` ASCII tree | ✅ |
| Flat `##` per example, no `## Examples` umbrella | ✅ — but `dialog-demo` preview appears **twice**: once as the hero and again under `## Edit profile`. React base shows it only as the hero. The `## Edit profile` section should be dropped. (minor) |
| Section heading casing | ⚠ Angular uses sentence case ("Close button", "No close button") where the standard requires Title Case ("Custom Close Button", "No Close Button"). |
| `## RTL` second-to-last with `direction="rtl"` | ✅ |
| `## API Reference` last, links out to radix-ng (correct for wrapped primitive) | ✅ |

### 3. Available inside the registry?

**`_registry.ts`** (line 441–451):
```
name: "dialog"
type: "registry:ui"
dependencies: ["@radix-ng/primitives"]
files: dialog.component.ts, dialog.component.html, dialog.icons.ts, index.ts
```
All four files on disk are listed. ✅

**Missing**: `registryDependencies: ["button"]`. `dialog.component.html` uses
`uiButton` on the built-in close button, so installing `dialog` without `button`
leaves the close button unstyled. (blocker; see Issues #3)

**`framework-components.ts`**: `"dialog"` present in the angular Set (line 227). ✅

**`meta.json`**: `"dialog"` in `pages` array. ✅

**`validate:previews`**: All six demo files exist at the correct path
(`apps/preview-angular/src/angular/dialog-*.ts`). Resolution should pass, though
the missing `DialogOverlay` import will cause runtime rendering failures.

### 4. Style diff vs original p4one

`/opt/dev/pd-p4one/app/src/app/ui/dialog/dialog-content.component.ts` vs
`packages/registry-angular/ui/dialog/dialog.component.ts`

| Area | p4one class/approach | Registry class/approach | Classification |
|---|---|---|---|
| Content positioning | `relative` (CDK GlobalPositionStrategy owns centering) | `fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2` (RdxDialogPopup owns centering) | Intentional — different primitives; not a mismatch |
| Content width | `w-[calc(100vw-2rem)] max-w-sm` explicit | `w-full max-w-[calc(100%-2rem)] sm:max-w-sm` via `cn-dialog-content` token | Effectively same visual result |
| Footer `border-border` | present (`border-t border-border`) | absent (bare `border-t` in `cn-dialog-footer` token) | **p4one-local**: Angular Material resolves `border-t` with a near-white global color; Tailwind/Force UI CSS vars make bare `border-t` correct in the registry context. Not a promotion candidate. |
| Title `text-popover-foreground` | explicit (prevents AM heading token override) | absent — inherits from content's `text-popover-foreground` | **p4one-local**: Angular Material `<h2>` picks up a global heading color token. Standard Tailwind inheritance works in the registry. Not a promotion candidate. |
| Close button layout | `absolute top-2 right-2` inline classes | `cn-dialog-close` token (`@apply absolute top-2 right-2`) | Equivalent; registry tokenised correctly. |
| Close button a11y | No `<span class="sr-only">Close</span>` | Has `<span class="sr-only">Close</span>` | Registry improves on p4one. ✅ |
| Close SVG binding | `DomSanitizer.bypassSecurityTrustHtml(DIALOG_CLOSE_SVG)` | Plain string `[innerHTML]` | p4one more explicit; Angular's default sanitizer preserves this SVG in practice. Minor. |
| aria-labelledby/describedby | Content queries title/description directives and binds ids | Claims RdxDialogPopup wires these automatically | Unverifiable without runtime, but stated in JSDoc. No action needed until tested. |

**Theme promotion candidates**

| Class | Present in `style-force-ui.css` token? | Promote? |
|---|---|---|
| `border-border` (footer) | No | No — p4one-local workaround, not needed in registry context |
| `text-popover-foreground` (title) | No | No — p4one-local Angular Material fix, inherited correctly in registry |

No new promotion candidates. All Force UI-specific styling is already in
`cn-dialog-*` tokens (lines 504–530 of `style-force-ui.css`).

---

## Verdict

**FAIL** — two blockers prevent functional rendering: the overlay directive is
missing from all six demo imports, and the built-in close button has no button
styling because `Button` is absent from both the component and registry entry.

---

## Issues

1. **[blocker]** `DialogOverlay` missing from all 6 demo imports
   (`apps/preview-angular/src/angular/dialog-*.ts`). `<div uiDialogOverlay></div>`
   appears in every demo template but `DialogOverlay` is not in any demo's
   `imports` array. No backdrop renders. Pattern established by
   `alert-dialog-demo.ts` (imports `AlertDialogOverlay`). Fix: add
   `import { DialogOverlay } from "@/angular-ui/dialog"` and `DialogOverlay` to
   each `imports` array in all six demo files.

2. **[blocker]** `Button` missing from `DialogContentComponent` imports
   (`packages/registry-angular/ui/dialog/dialog.component.ts` / `dialog.component.html:4`).
   The built-in ghost close button uses `uiButton variant="ghost" size="icon-sm"` in
   the template, but `Button` is not in the component's `imports: [DialogCloseDirective]`
   array. The close button renders as an unstyled native `<button>`. Fix: add
   `Button` to the component's `imports` array. p4one solved this correctly with
   `imports: [Button, RdxDialogCloseDirective]`.

3. **[blocker]** `registryDependencies: ["button"]` absent from the `dialog` entry
   in `packages/registry-angular/ui/_registry.ts` (line 441). Because the component
   template hard-uses `uiButton`, installing `dialog` without `button` is broken.
   Fix: add `registryDependencies: ["button"]` alongside `dependencies`.

4. **[major]** All 6 demo files use `<button uiButton variant="outline" ...>` for
   trigger and footer buttons without importing `Button`. Buttons render unstyled.
   Fix: add `import { Button } from "@/angular-ui/button"` and `Button` to each
   demo's `imports` array (mirrors `alert-dialog-demo.ts` / `sheet-demo.ts`).

5. **[major]** `dialog.component.html:7` applies both `uiDialogClose` and
   `rdxDialogClose` on the built-in close button. `RdxDialogClose` is not in
   the component's `imports`, so `rdxDialogClose` is silently treated as a plain
   HTML attribute. The close behavior works (via `uiDialogClose`'s host directive),
   but the stray attribute is dead code and misleads readers. Fix: remove
   `rdxDialogClose` from the template.

6. **[minor]** MDX `dialog.mdx`: `dialog-demo` is previewed twice — as the hero
   `<ComponentPreview>` and again under `## Edit profile`. React base page uses
   it only as the hero. Fix: drop `## Edit profile` section.

7. **[minor]** MDX section headings use sentence case ("Close button", "No close
   button") where the docs standard requires Title Case. Fix: rename to
   "Close Button", "No Close Button", "Scrollable Content", "Sticky Footer".

8. **[minor]** `dialog-rtl.ts` omits the `data-lang` attribute that React passes
   (`data-lang={dir === "rtl" ? language : undefined}`). RTL layout is correct;
   any `data-lang`-keyed font rules would not apply. Low-priority.
```

---
