# Angular Registry — Divergences from Registry Source

Comparison of the p4one Angular implementation (`/opt/dev/pd-p4one/app/src/app/ui/`)
against the canonical registry source (`apps/v4/registry/bases/radix/ui/` + `style-force-ui.css`).

Each entry records: **what differs**, **which side is the source of truth**, and the
**action for the Angular registry package** (`packages/registry-angular/`).

---

## button

### 1. Disabled state tokens

| | Class string |
|---|---|
| Registry CVA base | `disabled:pointer-events-none disabled:opacity-50` |
| `cn-button` CSS | `disabled:opacity-100! disabled:bg-muted disabled:text-muted-foreground` |
| p4one `button.variants.ts` | `disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground` (no `opacity-50`) |

**Why it diverges:** `disabled:opacity-50` in the React CVA base is overridden by
`disabled:opacity-100!` in the `cn-button` CSS class. The override exists because
a 50% opacity multiplier compounded with the muted token colours renders the button
nearly invisible in dark mode. The CSS class is authoritative; the CVA base entry
is vestigial.

**Angular registry action:** Omit `disabled:opacity-50` from the CVA base. Use
`cn-button` CSS token + keep `disabled:pointer-events-none` in the CVA base (the
CSS class does not block pointer events).

**Upstream fix needed:** Remove `disabled:opacity-50` from the React/Vue CVA bases —
it is dead code that the CSS `!important` override silences.

---

### 2. SVG fill — `[&_svg]:fill-current`

| | Has `fill-current` |
|---|---|
| Registry React/Vue CVA | ✗ |
| `cn-button` CSS | ✗ |
| p4one `button.variants.ts` | ✓ (`[&_svg]:fill-current`) |

**Why it diverges:** The registry was authored against Lucide icons (stroke-based SVGs
that inherit color without `fill`). p4one uses Material Symbols (fill-based SVGs that
paint black without an explicit `fill: currentColor`).

**Angular registry action:** Include `[&_svg]:fill-current` in the CVA base.

**Upstream fix needed:** Add `[&_svg]:fill-current` to `cn-button` in `style-force-ui.css`
so all frameworks benefit. The registry already ships `@material-symbols/svg-400` as a
dependency, so the fix is a no-op for Lucide users (no `fill` attribute to override) and
correct for Material Symbols users.

---

### 3. Disabled semantics on `<a>` hosts

| | Mechanism |
|---|---|
| Registry (React) | `asChild` + click guard; `disabled` prop silently ignored on `<a>` |
| p4one | `isAnchor` flag; applies `aria-disabled` + `tabindex="-1"` + click guard for anchors |

**Why it diverges:** React's `asChild` slot pattern does not map to Angular. Angular's
attribute-selector idiom requires explicit host-tag detection. p4one's approach is more
correct for accessibility (WCAG 2.1.1 / 4.1.2).

**Angular registry action:** Keep `isAnchor` + dual-mechanism disabled from p4one.
This is an Angular-specific behavioral requirement, not a style divergence.

---

### 4. Loading spinner implementation

| | Approach |
|---|---|
| Registry (React) | `<IconPlaceholder>` — multi-library icon abstraction |
| p4one | Inline SVG imported from `@material-symbols/svg-400` via `?raw`; injected with `DomSanitizer.bypassSecurityTrustHtml` |

**Why it diverges:** `IconPlaceholder` is a React-only component that resolves the
correct icon library at build time. Angular has no equivalent abstraction; inline
SVG is the idiomatic substitute.

**Angular registry action:** Use the p4one approach (raw SVG import + sanitizer bypass).
Document the single swap point in `button.icons.ts`. The `?raw` webpack rule is an
app concern; the registry ships the raw SVG string directly.

---

### 5. Spinner aria role

| | Aria on spinner |
|---|---|
| Registry (React) | `role="status" aria-label="Loading"` on the `<svg>` |
| p4one | `aria-hidden="true"` on the host span (container owns `aria-busy`) |

**Why it diverges:** p4one argues (correctly) that a lone `role="status"` on the icon
double-announces without additional context. The container's `aria-busy` + an
`aria-live` region is the semantically complete pattern (WCAG 4.1.3).

**Angular registry action:** Use `aria-hidden="true"` (p4one approach).

**Upstream fix needed:** Remove `role="status" aria-label="Loading"` from the React
spinner SVG; rely on the button's `aria-busy` + container `aria-live`.

---

## badge

### 1. Per-variant focus-ring overrides removed

| | Has per-variant `focus-visible:ring-{status}/20` |
|---|---|
| Registry React CVA | ✓ (e.g. `focus-visible:ring-destructive/20`) |
| p4one `badge.variants.ts` | ✗ (audit 2026-06-07, WCAG 1.4.11) |

**Why it diverges:** At `/20` opacity over white the rings reach ~1.3:1 contrast (below
the WCAG 1.4.11 non-text 3:1 threshold). p4one removed them; the base
`focus-visible:ring-ring/50` remains.

**Angular registry action:** Omit per-variant focus ring overrides (p4one approach).

**Upstream fix needed:** Remove per-variant `focus-visible:ring-*` overrides from
the React/Vue badge variants in the registry.

---

### 2. SVG fill — `[&>svg]:fill-current`

Same root cause as button §2.

**Angular registry action:** Include `[&>svg]:fill-current` in the badge CVA base.

**Upstream fix needed:** Add `[&>svg]:fill-current` to `cn-badge` in `style-force-ui.css`.

---

## card

### 1. CSS custom property vs hardcoded spacing

| | Card spacing approach |
|---|---|
| `cn-card` CSS | `gap-(--card-spacing) py-(--card-spacing) [--card-spacing:--spacing(4)]` |
| p4one (expanded) | `gap-4 py-4 data-[size=sm]:gap-3 data-[size=sm]:py-3` |

**Why it diverges:** p4one expanded the classes before the CSS was updated to use the
`--card-spacing` custom property shorthand. The CSS class is authoritative.

**Angular registry action:** Use `cn-card` (and the other `cn-card-*` tokens) in the
CVA/component class strings. Do not reproduce the hardcoded pixel values.

---

### 2. CardTitle `text-card-foreground` (app-compat addition)

| | Has `text-card-foreground` |
|---|---|
| Registry (React) | ✗ (inherits from `cn-card`) |
| p4one | ✓ (app has a global vex heading style that overrides color on `<h3>/<h4>`) |

**Why it diverges:** The vex UI framework used in p4one applies a typography reset
that colors bare heading elements differently. Registry assumes no such reset.

**Angular registry action:** Do **not** add `text-card-foreground` to CardTitle. This is
a p4one app-compat patch, not a registry concern. Callers who need it can pass `class`.

---

### 3. CardFooter `border-border` (app-compat addition)

| | Separator color on `border-t` |
|---|---|
| Registry (React) | `border-t` (inherits from `cn-card-footer`; falls back to `currentColor` in Tailwind v4) |
| `cn-card-footer` CSS | `border-t` (same, no explicit color) |
| p4one | `border-t border-border` (explicit token because app has no global border-color reset) |

**Why it diverges:** Tailwind v4 removed the global `* { border-color: theme(colors.border) }`
reset. Without it, a bare `border-t` resolves to `currentColor`. The registry's `cn-card-footer`
CSS class should explicitly set `border-border` but currently doesn't.

**Angular registry action:** Include `border-border` alongside `border-t` in CardFooter.

**Upstream fix needed:** Add `border-border` to `.cn-card-footer` in `style-force-ui.css`.

---

### 4. `cn-card-action` — no CSS token defined

`CardAction` uses purely structural Tailwind classes (`col-start-2 row-span-2 row-start-1
self-start justify-self-end`). There is no `cn-card-action` class in `style-force-ui.css`.

**Angular registry action:** Inline the structural classes directly (no token to reference).

---

## separator

### 1. `cn-separator*` CSS tokens unused by all frameworks

| | Uses `cn-separator*` tokens |
|---|---|
| Registry React | ✗ (uses `data-horizontal:h-px data-horizontal:w-full` directly) |
| p4one | ✗ (identical inline class string) |
| `style-force-ui.css` | Defines `.cn-separator`, `.cn-separator-horizontal`, `.cn-separator-vertical` |

**Why it diverges:** The CSS classes were defined but the framework ports never adopted
them. All ports use the Tailwind v4 `data-horizontal:` / `data-vertical:` custom variants
instead (defined in the project's `tailwind.css`).

**Angular registry action:** Follow the existing pattern — use inline classes with
`data-[orientation=horizontal]:` / `data-[orientation=vertical]:` (Tailwind v4 data
attribute variants). Do not use `cn-separator*` tokens.

**Upstream consideration:** Either remove `cn-separator*` from `style-force-ui.css`
(dead code) or migrate all framework ports to use them.

---

## skeleton

### 1. `motion-reduce:animate-none`

| | Has `motion-reduce:animate-none` |
|---|---|
| Registry React CVA base | ✗ (relies on `cn-skeleton` CSS class for it) |
| `cn-skeleton` CSS | ✓ |
| p4one | ✓ (also in component; effectively redundant but harmless) |

**Angular registry action:** `cn-skeleton` CSS class already includes
`motion-reduce:animate-none`. Using the `cn-skeleton` token is sufficient; no need
to duplicate it in the CVA base.

---

## label

### 1. `peer-disabled:cursor-not-allowed` not in CSS token

| | Has `peer-disabled:cursor-not-allowed` |
|---|---|
| Registry React CVA base | ✓ |
| `cn-label` CSS | ✗ (only has `peer-disabled:opacity-50`) |
| p4one | ✓ |

**Angular registry action:** Keep `peer-disabled:cursor-not-allowed` in the component
class string (not covered by the CSS token).

**Upstream fix needed:** Add `peer-disabled:cursor-not-allowed` to `.cn-label` in
`style-force-ui.css`.

---

## spinner

### 1. `cn-spinner` base CSS class missing

| | Defines `.cn-spinner {}` |
|---|---|
| `style-force-ui.css` | ✗ (only `cn-spinner-color-*` and `cn-spinner-size-*`) |
| Registry React CVA base | Uses `"cn-spinner animate-spin"` — `cn-spinner` is a no-op class |

**Angular registry action:** Do not rely on `cn-spinner` as a style token. Include
structural classes (`inline-flex shrink-0 items-center justify-center`) directly in the
CVA base.

**Upstream fix needed:** Either add `.cn-spinner {}` to `style-force-ui.css` with the
structural styles, or remove `cn-spinner` from all CVA bases.

---

### 2. `animate-spinner` vs `animate-spin`

| | Animation |
|---|---|
| Registry React | `animate-spin` (Tailwind default: 1s linear infinite) |
| p4one | `animate-spinner` (`--animate-spinner: spin 500ms linear infinite` per Force spec `spinner.md`) |

**Why it diverges:** The Force design spec mandates 500ms; Tailwind's `animate-spin` is
1s. p4one defines `--animate-spinner` in its local `tailwind.css`.

**Angular registry action:** Use `animate-spinner`. The registry's `tailwind.css` (or the
consuming app) must define `--animate-spinner: spin 500ms linear infinite`. Add a note
in the registry item's README.

**Upstream fix needed:** Add `--animate-spinner: spin 500ms linear infinite` to the
`style-force-ui.css` `@theme` block (or a shared tailwind config) so all frameworks
get the spec-correct speed.

---

### 3. `motion-reduce:animate-none`

Same pattern as skeleton. `cn-spinner` has no base CSS class, so this must be in
the Angular component explicitly.

**Angular registry action:** Include `motion-reduce:animate-none` in the CVA base.

---

### 4. SVG fill — `[&_svg]:fill-current`

Same root cause as button §2 and badge §2.

**Angular registry action:** Include `[&_svg]:fill-current` in the spinner CVA base.

---

### 5. Spinner role / aria

Same as button §5.

**Angular registry action:** `aria-hidden="true"` on the host (p4one approach).

---

## kbd

### 1. SVG fill — `[&_svg]:fill-current`

Same root cause as button §2.

**Angular registry action:** Include `[&_svg]:fill-current` in the `kbdVariants` base.

---

### 2. KbdGroup host element

| | Element |
|---|---|
| Registry React | `<kbd>` (using `ComponentProps<"div">` but rendering `<kbd>`) |
| p4one | Attribute selector — host is whatever the caller writes |

**Angular registry action:** Use attribute selector `[uiKbdGroup]` (p4one approach).
The attribute selector keeps the host element caller-controlled, which is correct
Angular idiom and avoids double-kbd nesting.

---

## item

### 1. `ItemSeparator` cannot compose `Separator`

| | Mechanism |
|---|---|
| Registry React (`ui/item.tsx`) | `ItemSeparator` renders `<Separator data-slot="item-separator" orientation="horizontal" class="cn-item-separator" />` |
| Angular registry | `ItemSeparatorComponent` is self-contained: it repeats `SeparatorComponent`'s base class string plus `cn-item-separator`, and hardcodes `role="none"` + `data-orientation="horizontal"` |

**Why it diverges:** Angular's `Separator` port is a `@Component` with an attribute
selector (`[uiSeparator]`), not a wrapping element, and Angular refuses to instantiate
two components on the same host element (NG0300). `<div uiSeparator uiItemSeparator>` is
therefore not a legal translation of React's nested render, and Angular has no
`asChild`/`Slot` equivalent to wrap with. Duplicating the (small, stable) separator base
class string keeps the rendered DOM identical to React's while leaving
`<div uiItemSeparator>` a one-attribute API.

**Angular registry action:** Keep `ItemSeparatorComponent` self-contained and keep its
base class string in sync with `ui/separator/separator.component.ts` (called out in a
comment on the class). No `registryDependencies` entry for `separator`, since nothing is
imported.

**Upstream fix needed:** None — this is an Angular framework constraint, not a registry
source problem.

---

### 2. SVG fill — `[&_svg]:fill-current`

| | Has `fill-current` |
|---|---|
| Registry React/Vue CVA base | ✗ |
| `cn-item` CSS | ✗ |
| `cn-item-media-variant-icon` CSS | ✓ (already patched for Force UI) |

**Why it diverges:** Same root cause as §button-2 — Material Symbols are fill-based, so
an SVG with no `fill` paints black. `.cn-item-media-variant-icon` covers icons inside
`<div uiItemMedia variant="icon">`, but the examples also place icons in `ItemActions`
and in `ItemMedia`'s `default` variant (see `item-demo`, `item-link`, `item-rtl`), which
that token does not reach.

**Angular registry action:** Include `[&_svg]:fill-current` in the root `itemVariants`
base, per the porting guide's "add it to any CVA base that accepts SVG icons" rule. It is
a no-op for stroke-based icon sets.

**Upstream fix needed:** Add `[&_svg]:fill-current` to `.cn-item` in
`style-force-ui.css` so all frameworks get it.

---

## Upstream fixes summary

Issues that should be fixed in the registry source (not Angular-specific):

| # | File | Fix |
|---|---|---|
| 1 | `bases/radix/ui/button.tsx` + Vue/Svelte equivalents | Remove `disabled:opacity-50` from CVA base (dead, overridden by `cn-button` CSS) |
| 2 | `style-force-ui.css` `.cn-button` | Add `[&_svg]:fill-current` |
| 3 | `style-force-ui.css` `.cn-badge` | Add `[&>svg]:fill-current` |
| 4 | `bases/radix/ui/badge.tsx` + Vue/Svelte | Remove per-variant `focus-visible:ring-{status}/20` (WCAG 1.4.11) |
| 5 | `style-force-ui.css` `.cn-card-footer` | Add `border-border` |
| 6 | `style-force-ui.css` `.cn-label` | Add `peer-disabled:cursor-not-allowed` |
| 7 | `style-force-ui.css` | Add `.cn-spinner {}` with structural base classes, or remove `cn-spinner` from all CVA bases |
| 8 | `style-force-ui.css` `@theme` | Add `--animate-spinner: spin 500ms linear infinite` |
| 9 | `bases/radix/ui/spinner.tsx` + Vue/Svelte | Remove `role="status" aria-label="Loading"` from spinner SVG |
| 10 | `style-force-ui.css` `.cn-item` | Add `[&_svg]:fill-current` |
| 11 | `style-force-ui.css` | Remove `.cn-separator`, `.cn-separator-horizontal`, `.cn-separator-vertical` (dead code), or migrate all framework ports to use them |
