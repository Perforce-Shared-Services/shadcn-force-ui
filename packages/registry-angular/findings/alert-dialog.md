# alert-dialog — Migration Review

## Checklist

### 1. Examples match React base?

Full count parity: Angular ships 7 demos matching `apps/v4/examples/base/alert-dialog-*.tsx` exactly
(`demo`, `basic`, `destructive`, `media`, `rtl`, `small`, `small-media`).

**Deviations:**

- **`alert-dialog-rtl.ts`** — Angular uses hardcoded Arabic text (static). React's
  `alert-dialog-rtl.tsx` uses a `useTranslation` hook with en/ar/he translations and
  a language-toggle widget. RTL layout (two dialogs, `size="sm"`, media element) is
  correctly demonstrated; language switching is absent. Acceptable framework-capability
  gap; should be added to the parity-check exceptions table in
  `apps/v4/scripts/check-example-parity.mts` if not already there.

- **Icon strategy** — React demos import named icon components
  (`CircleFadingPlusIcon`, `BluetoothIcon`, `Trash2Icon`) from
  `@/examples/material-symbols`. Angular demos inline the equivalent Material Symbols
  SVG paths. Visual output is identical; no action needed.

- **`cn-alert-dialog-action` / `cn-alert-dialog-cancel` classes absent** — React's
  `AlertDialogAction` applies `cn("cn-alert-dialog-action", className)` and
  `AlertDialogCancel` applies `cn("cn-alert-dialog-cancel", className)`. Angular's
  `AlertDialogAction` and `AlertDialogCancel` directives set only `data-slot`; neither
  token class is applied. No CSS rules define these tokens today (no visual effect),
  but the divergence is latent: if a `.cn-alert-dialog-action` rule is added to
  `style-force-ui.css`, Angular silently misses it.

### 2. Docs follow the React/flat pattern?

**Passes all structure checks:**

- Frontmatter: `title`, `description`, `base: angular`, `component: true`,
  `featured: true`, `links.doc` + `links.api` (radix-ng primitive). ✓
- Hero `<ComponentPreview framework="angular" name="alert-dialog-demo" …>` before
  any heading. ✓
- `## Installation` with `<CodeTabs>` (cli + manual), `<ComponentSource>`,
  "update import paths" step. ✓
- `## Usage` with import block + HTML snippet. ✓
- `## Composition` with ASCII tree (optional, present). ✓
- Flat `##` per example — no `## Examples` umbrella. All six examples each get
  their own heading: Basic, Small, Media, Small with Media, Destructive, RTL. ✓
- `## RTL` second-to-last with `direction="rtl"` on the preview. ✓
- `## API Reference` last; documents only the Force-UI-specific `size` input in a
  `### size` table; links to radix-ng for the rest. Matches the React base's
  API Reference pattern (link-out when wrapping a primitive). ✓

### 3. Available inside the registry?

- `_registry.ts` entry `"alert-dialog"` at line 453 — all 4 files on disk listed:
  `ui/alert-dialog/alert-dialog.component.ts`, `alert-dialog.component.html`,
  `alert-dialog.variants.ts`, `index.ts`. ✓
- Dependency `["@radix-ng/primitives"]` — covers all 8 radix-ng imports in the
  component file. ✓
- `framework-components.ts` angular Set: `"alert-dialog"` present. ✓
- `apps/v4/content/docs/components/angular/meta.json` pages: `"alert-dialog"` present. ✓
- All 7 demo files exist on disk in `apps/preview-angular/src/angular/`. ✓

### 4. Style diff vs original p4one

| Area | p4one inline | Registry Angular | Token (`style-force-ui.css`) |
|------|-------------|-----------------|------------------------------|
| Overlay | CDK-owned (no class) | `fixed inset-0 z-50` | `data-open/closed` anim, blur |
| Overlay stacking | — | **`isolate` absent** | absent |
| Content positioning | `relative w-[calc(100vw-2rem)]` (CDK centers) | `fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2` | anim, bg, ring, size caps |
| Footer | `border-border` added (AM color fix) | `[&_svg]:fill-current` added | `-mx-4 -mb-4 border-t bg-muted/50 p-4 rounded-b-xl` |
| Title | `text-popover-foreground` added (AM heading fix) | `[&_svg]:fill-current` added | `text-base font-medium col-start-2 rule` |
| Header | inline Tailwind (verbatim token classes) | delegates to `cn-alert-dialog-header` | grid/rows/place-items rules |
| Media | inline Tailwind (verbatim token classes) | delegates to `cn-alert-dialog-media` | size-10 inline-flex rounded rules |
| Description | inline Tailwind (verbatim token classes) | delegates to `cn-alert-dialog-description` | text-sm balance link rules |

**p4one-local additions (do not promote):**
- `border-border` on footer — compensates for absent global `border-color` in the
  Angular Material app. Not needed in a clean Tailwind/Force UI setup.
- `text-popover-foreground` on title — compensates for Angular Material overriding
  heading element colour. App-specific.

**Theme promotion candidates:**

| Rule | Present in | Missing from | Action |
|------|-----------|-------------|--------|
| `isolate` on overlay | React base TSX | Angular variants.ts AND `cn-alert-dialog-overlay` token | Add `isolate` to `cn-alert-dialog-overlay` in `style-force-ui.css` so all frameworks inherit it |
| `[&_svg]:fill-current` on title | Angular only | React base, CSS token | Evaluate against React base; if intentional for Angular, remove or document. Do not promote without React parity |
| `[&_svg]:fill-current` on footer | Angular only | React base, CSS token | Same as above |

## Verdict

**PASS-with-notes** — All 7 demos present, docs fully flat-`##` and structurally
correct, registry entry complete. Three runtime risks require verification against the
installed `@radix-ng/primitives` version before the component can be considered
production-ready.

## Issues

1. **(major — risk)** `RdxAlertDialogPopup` may not emit `data-state` attribute —
   p4one explicitly rejected this primitive for that reason. If `data-state` is absent,
   the `data-open:` / `data-closed:` enter/exit animations in `cn-alert-dialog-content`
   and `cn-alert-dialog-overlay` silently fail. Verify against the installed
   `@radix-ng/primitives` version or add a manual `data-state` binding on the host.

2. **(major — risk)** `AlertDialogContent` sets no explicit `role="alertdialog"` and
   no `aria-labelledby` / `aria-describedby` — both delegated to `RdxAlertDialogPopup`
   and the title/description host directives. p4one found the primitive emitted
   `aria-labelledby="true"` (a broken literal). If the primitive has not been fixed,
   the panel is announced as a regular dialog (`role="dialog"`) rather than an alert
   dialog, and the accessible name/description bindings are missing (WCAG 1.3.1,
   4.1.2). Confirm primitive output or add explicit host bindings.

3. **(minor)** `isolate` missing from `alertDialogOverlayClass` in
   `packages/registry-angular/ui/alert-dialog/alert-dialog.variants.ts`. React overlay
   class is `"cn-alert-dialog-overlay fixed inset-0 isolate z-50"`. Angular is
   `"cn-alert-dialog-overlay fixed inset-0 z-50"`. The CSS token also lacks `isolate`.
   Promote `isolate` to the `cn-alert-dialog-overlay` token in `style-force-ui.css`.

4. **(minor)** `[&_svg]:fill-current` applied in Angular's `alertDialogTitleClass` and
   `AlertDialogFooter` but absent from the React base and the CSS tokens
   (`cn-alert-dialog-title`, `cn-alert-dialog-footer`). If intentional, promote to
   the tokens; if not, remove from the Angular port.

5. **(minor)** `cn-alert-dialog-action` and `cn-alert-dialog-cancel` classes not
   applied by Angular directives (React applies them via `cn()`). No CSS rules
   define these tokens today so there is no visual effect, but latent divergence.
```

---
