# progress — Migration Review

## Checklist

### 1. Examples match React base?

React base has 4 examples: `progress-demo`, `progress-controlled`, `progress-label`, `progress-rtl`.
Angular has 5: adds `progress-indeterminate` (Angular-only extra; fine, parity check only flags missing demos).

**File-by-file comparison:**

| Demo | Verdict | Detail |
|---|---|---|
| `progress-demo` | ⚠ Deviation, undocumented | React: animated (starts 13 %, jumps to 66 % after 500 ms `setTimeout`). Angular: static `[value]="75"`. Transition animation—the component's headline feature—is not shown. No `<Callout>` in MDX documents this per the docs standard. |
| `progress-controlled` | ✓ Matches | React uses `useState`; Angular uses `signal + effect`. Functional parity. |
| `progress-label` | ✓ Deviation documented | React: `<ProgressLabel>/<ProgressValue>` parts. Angular: plain `<span>` header row. MDX `<Callout>` explains the deviation. |
| `progress-rtl` | ⚠ Deviation, partially documented | React: language-selector-driven (en/ar/he). Angular: static `dir="rtl"` with hardcoded Arabic. A code comment notes the deviation but there is no `<Callout>` in the MDX (unlike `progress-label`). |
| `progress-indeterminate` | ➕ Extra (Angular-only) | No React base counterpart. Allowable; DOCUMENTED_EXCEPTIONS needs no entry (extra, not missing). |

### 2. Docs follow the React/flat pattern?

File: `apps/v4/content/docs/components/angular/progress.mdx`

| Check | Status |
|---|---|
| Frontmatter: `title`, `description`, `base`, `component: true` | ✓ |
| Hero `<ComponentPreview framework="angular" name="progress-demo" />` before first heading | ✓ |
| `## Installation` with CLI + manual tabs | ✓ |
| `## Usage` with import snippet | ✓ |
| Flat `##` per example (no `## Examples` umbrella) | ✓ |
| Prose under each `##` section | ✓ |
| `## RTL` second to last, with `<ComponentPreview>` | ⚠ `direction="rtl"` **missing** — every other Angular RTL preview carries it (`badge.mdx`, `alert.mdx`, `label.mdx`, etc.) |
| `## API Reference` last, hand-written table (correct for non-upstream wrapper) | ✓ |
| `progress-demo` deviation documented with `<Callout>` | ✗ Missing |
| `progress-rtl` deviation documented with `<Callout>` | ✗ Missing (code comment only) |

### 3. Available inside the registry?

- **`_registry.ts`** (line 238): entry name `"progress"`, files list:
  - `ui/progress/progress.component.ts` ✓ on disk
  - `ui/progress/progress.component.html` ✓ on disk
  - `ui/progress/index.ts` ✓ on disk
  - No stale or missing paths.
- **`framework-components.ts`** angular `Set` (line ~424): `"progress"` ✓
- **`meta.json`** `apps/v4/content/docs/components/angular/`: `"progress"` in `pages` array ✓
- **Preview demos** in `apps/preview-angular/src/angular/`: all 5 files present
  (`progress-demo.ts`, `progress-controlled.ts`, `progress-indeterminate.ts`,
  `progress-label.ts`, `progress-rtl.ts`) ✓

### 4. Style diff vs original p4one

| Property | p4one (inline Tailwind) | Force UI Angular port | In `style-force-ui.css`? | Promote? |
|---|---|---|---|---|
| Track bg | `bg-primary/20` | `cn-progress` | ✓ `.cn-progress { @apply bg-primary/20 h-1 rounded-full; }` [FORCE-UI] | **Already done** |
| Track height | `h-1` | `cn-progress` | ✓ | Already done |
| Track radius | `rounded-full` | `cn-progress` | ✓ | Already done |
| Indicator fill | `bg-primary` | `cn-progress-indicator` | ✓ `.cn-progress-indicator { @apply bg-primary; }` | Already done |
| Label style | (via radix) | `cn-progress-label` | ✓ `text-sm font-medium` | Already done |
| Value style | (via radix) | `cn-progress-value` | ✓ `text-muted-foreground ml-auto text-sm tabular-nums` | Already done |
| Transition | `transition-all` (inline) | `transition-all` (inline) | — | N/A |
| Pulse | `animate-pulse` (inline) | `animate-pulse` (inline) | — | N/A |

**Architecture difference**: p4one wraps `@radix-ng/primitives/progress` via `hostDirectives`
and injects `RdxProgressRootDirective` for ARIA. The new port is pure Angular — ARIA attributes
(`role`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `data-state`) are bound directly in
the `host` metadata. This removes the radix-ng peer dependency and is the correct direction for
the registry port.

**Theme promotion candidates table**

| Token | Classes | Action |
|---|---|---|
| `.cn-progress` | `bg-primary/20 h-1 rounded-full` | ✅ Already promoted |
| `.cn-progress-indicator` | `bg-primary` | ✅ Already promoted |
| `.cn-progress-label` | `text-sm font-medium` | ✅ Already promoted |
| `.cn-progress-value` | `text-muted-foreground ml-auto text-sm tabular-nums` | ✅ Already promoted |

No further promotion candidates remain.

---

## Verdict

**PASS-with-notes** — Registry wiring, component implementation, token usage, and most of
the doc structure are correct. Three minor gaps need follow-up before the page is
fully at parity with the docs standard.

---

## Issues

1. **(minor)** `progress-demo.ts` shows a static value (`75`) where the React base demo
   is animated (`13 → 66` via `setTimeout`). The transition/animation—the component's
   headline feature—is never demonstrated. MDX has no `<Callout>` documenting this
   deviation. File: `apps/preview-angular/src/angular/progress-demo.ts` /
   `apps/v4/content/docs/components/angular/progress.mdx`.

2. **(minor)** `## RTL` `<ComponentPreview>` is missing `direction="rtl"`. All other
   Angular RTL docs pass this attribute (confirmed in `badge.mdx`, `alert.mdx`,
   `label.mdx`, `hover-card.mdx`, `tooltip.mdx`, etc.).
   File: `apps/v4/content/docs/components/angular/progress.mdx`, RTL section.

3. **(minor)** `valueLabel` input (drives `aria-valuetext` for human-readable labels
   such as "3 of 5 files") is present in p4one via the radix hostDirective but is
   absent from the new pure-Angular port and from the API Reference table. Users who
   need `aria-valuetext` have no hook.
   File: `packages/registry-angular/ui/progress/progress.component.ts`.
```

---
