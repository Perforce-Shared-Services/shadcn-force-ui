# switch — Migration Review

## Checklist

### 1. Examples match React base?

Both sets contain the same 7 files (`switch-demo`, `switch-description`, `switch-choice-card`,
`switch-disabled`, `switch-invalid`, `switch-sizes`, `switch-rtl`). File-by-file:

| Demo | Status | Note |
|---|---|---|
| `switch-demo` | **Deviated** | Angular shows two labeled switches (`flex-col gap-3`): "Airplane mode" (`[checked]="false"`) + "Notifications enabled" (`[checked]="true"`). React base shows one switch: `<Switch id="airplane-mode" />` in `flex items-center space-x-2`. Content and layout differ materially. |
| `switch-description` | ✓ | Matches. |
| `switch-choice-card` | Minor | React uses `defaultChecked` (uncontrolled) on the second switch; Angular uses `[checked]="true"` (controlled). Behavioral difference for form reset. |
| `switch-disabled` | ✓ | Matches. |
| `switch-invalid` | ✓ | Matches. |
| `switch-sizes` | ✓ | Matches. |
| `switch-rtl` | Acceptable | React has an interactive `useTranslation` language picker (LTR / AR / HE); Angular hardcodes Arabic. Reasonable framework-port deviation; no `<Callout>` documents it. |

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/switch.mdx`

- **Frontmatter** — ✓ `title`, `description`, `base: angular`, `component: true`, `links.doc` / `links.api` both point at radix-ng switch.
- **Hero preview** — ✓ `<ComponentPreview framework="angular" name="switch-demo" />` immediately after frontmatter, no heading above it.
- **`## Installation`** — ✓ CodeTabs with `cli` and `manual` tabs, `<ComponentSource framework="angular" name="switch" />`, correct CLI command.
- **`## Usage`** — ✓ import line + minimal snippet.
- **Flat `##` per example** — ✓ Description → Choice Card → Disabled → Invalid → Size → RTL. No `## Examples` umbrella.
- **`## RTL`** — ✓ second-to-last, one-line pointer to `/docs/rtl`, `<ComponentPreview framework="angular" name="switch-rtl" />`. **Missing `direction="rtl"`** on that preview; base page has `direction="rtl"` at `base/switch.mdx:97`.
- **`## API Reference`** — ✓ last, links out to radix-ng (correct: component wraps upstream primitive).

### 3. Available inside the registry?

- **`_registry.ts`** (line 150): entry `name: "switch"` with `dependencies: ["@radix-ng/primitives"]`, files list `ui/switch/switch.component.ts`, `ui/switch/switch.component.html`, `ui/switch/index.ts` — all three exist on disk. ✓
- **`framework-components.ts`** angular `Set` (line ~438): `"switch"` present. ✓
- **`meta.json`** `pages` array: `"switch"` present. ✓
- `validate:previews` resolution: each `switch-*.ts` demo exports a default `Component` and uses only `framework="angular"` — resolution should pass (unverified at runtime; no CI tool available here).

### 4. Style diff vs original p4one

Comparing `pd-p4one/app/src/app/ui/switch/switch.variants.ts` against
`packages/registry-angular/ui/switch/switch.component.ts` + `style-force-ui.css .cn-switch`.

| Token / class | p4one `SWITCH_BASE_CLASS` | Registry inline `classes()` | `cn-switch` CSS | Gap verdict |
|---|---|---|---|---|
| Hit-target expander | `after:absolute after:-inset-x-3 after:-inset-y-2` | absent | absent | **p4one-local; candidate to promote to `cn-switch`** |
| Disabled cursor/opacity | `data-disabled:cursor-not-allowed data-disabled:opacity-50` | `disabled:cursor-not-allowed disabled:opacity-50` | absent | `disabled:` misses form-group-inherited `data-disabled` (no native `disabled` attr); **minor, p4one selector more robust** |
| `group/switch` on thumb | absent from `SWITCH_THUMB_CLASS` | present in `thumbClass` (`cn-switch-thumb group/switch …`) | n/a | Redundant; the button establishes the named group via `classes()`. Harmless but noisy. |
| Hover affordances | `enabled:data-unchecked:hover:border-input enabled:data-checked:hover:bg-primary-hover` | absent inline (delegated to CSS) | ✓ in `cn-switch` | Correctly promoted already. |
| `aria-checked` init fix | `ngOnInit` seeds CVA to `false` when `checked` is null | **absent** | n/a | Bug not promoted — see Issue 1. |
| `focus-visible:border-ring ring-ring/50` | inline | delegated to CSS | ✓ in `cn-switch` | Correctly promoted. |
| `data-[size=*]:h/w` dimensions | inline | delegated to CSS | ✓ in `cn-switch` | Correctly promoted. |
| `data-checked:bg-primary data-unchecked:bg-input` | inline | delegated to CSS | ✓ in `cn-switch` | Correctly promoted. |

**Theme promotion candidates**

| Class string | Currently in | Promote to |
|---|---|---|
| `after:absolute after:-inset-x-3 after:-inset-y-2` | p4one only | `cn-switch` in `style-force-ui.css` (matches checkbox/toggle hit-target pattern) |
| `data-disabled:cursor-not-allowed data-disabled:opacity-50` | p4one only | Replace `disabled:` in `cn-switch` (more robust with radix-ng form-group disabling) |

## Verdict

**FAIL** — one accessibility blocker (missing `aria-checked` init), one demo parity failure
(`switch-demo` content), and two minor style gaps.

## Issues

1. **(blocker)** `packages/registry-angular/ui/switch/switch.component.ts` — missing `ngOnInit`
   aria-checked fix. p4one documents: "a bare `<button uiSwitch>` (no `[checked]` binding)
   renders with NO `aria-checked` at all — axe `aria-required-attr`, critical, WCAG 4.1.2."
   Six of seven demos (`switch-description`, `switch-disabled`, `switch-invalid`, `switch-sizes`,
   `switch-rtl`, first switch in `switch-choice-card`) omit a `[checked]` binding and would
   fail this check. Fix: port `ngOnInit`/`injectSwitchRootContext()`/`inject(RdxControlValueAccessor)`
   from `pd-p4one/app/src/app/ui/switch/switch.component.ts`.

2. **(major)** `apps/preview-angular/src/angular/switch-demo.ts` — hero demo shows two
   switches (`flex-col gap-3`, "Airplane mode" + "Notifications enabled") vs React base's single
   switch (`flex items-center space-x-2`, "Airplane Mode" only). Parity standard requires the
   Angular hero to match the React hero's content and layout.

3. **(minor)** `apps/v4/content/docs/components/angular/switch.mdx` line for RTL preview —
   missing `direction="rtl"` attribute. Base page: `name="switch-rtl" direction="rtl"`.

4. **(minor)** `switch.component.ts:44` — `thumbClass` is `computed()` over a fully static
   string (no signal reads). Use a plain `readonly` property. Also carries a redundant
   `group/switch` (the host button already establishes the named group via `classes()`).

5. **(minor)** `switch.component.ts:49` / `cn-switch` CSS — disabled styling uses
   `disabled:cursor-not-allowed disabled:opacity-50` (native selector); p4one uses
   `data-disabled:` which also fires when radix-ng sets `data-disabled` via form-group
   propagation without setting the native `disabled` attribute. Align to `data-disabled:`.

6. **(minor)** Hit-target expander (`after:absolute after:-inset-x-3 after:-inset-y-2`) present
   in p4one, absent from both the registry component's inline classes and `cn-switch` in
   `style-force-ui.css`. Candidate for promotion (see table above).
```

---

## Review

- **Correct:** Registry entry (`_registry.ts` lines 150–158) lists all three on-disk files; `framework-components.ts` angular Set and `meta.json` pages both include `"switch"`. MDX structure is fully flat `##`-per-example with no `## Examples` umbrella; `## RTL` is second-to-last; `## API Reference` correctly links out. Five of seven demos match their React base counterparts exactly. The `cn-switch` CSS class (`style-force-ui.css:1322`) correctly absorbs dimension, colour, hover, focus, and invalid tokens so the registry component delegates cleanly.

- **Blocker:** `switch.component.ts` — no `ngOnInit` to seed `aria-checked` when `[checked]` is omitted. p4one proved this causes axe `aria-required-attr` (WCAG 4.1.2 critical) on any bare `<button uiSwitch>`. Six of the seven Angular demos expose this pattern.

- **Note:** `switch-demo` hero shows two switches vs. React's one — major parity gap. `thumbClass` is `computed()` on a static string with redundant `group/switch`. Hit-target pseudo-element and `data-disabled:` selector are p4one improvements not yet promoted to `style-force-ui.css`. `direction="rtl"` absent from the angular MDX RTL ComponentPreview.
