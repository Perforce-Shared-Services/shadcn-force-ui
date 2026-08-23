# calendar — Migration Review

## Checklist

### 1. Examples match React base?

React base: 12 demos (`calendar-basic`, `calendar-booked-dates`, `calendar-caption`,
`calendar-custom-days`, `calendar-demo`, `calendar-hijri`, `calendar-multiple`,
`calendar-presets`, `calendar-range`, `calendar-rtl`, `calendar-time`,
`calendar-week-numbers`). Angular: same 12 files. Count parity ✅.

| Demo | Deviation | Documented? |
|------|-----------|-------------|
| `calendar-booked-dates.ts` | Only disables booked dates; React also applies `line-through` via `modifiersClassNames` (no modifier API in Angular build) | MDX Callout ✅ + demo comment ✅ |
| `calendar-custom-days.ts` | Shows range+dropdown, omits per-day price labels (`components.DayButton` hook absent) | MDX Callout ✅ + demo comment ✅ |
| `calendar-hijri.ts` | Renders Gregorian grid with Vazirmatn font only; React uses `react-day-picker/persian` for actual Hijri | MDX Callout ✅ + demo comment ✅ |
| `calendar-rtl.ts` | Static `dir="rtl"`; React drives `locale` from a language-selector hook | Consistent with other Angular RTL demos ✅ |
| `calendar-presets.ts` | React passes `fixedWeeks` (always 6 rows); Angular has no `fixedWeeks` input, so months with 4–5 weeks cause layout jitter | **Not documented** in MDX or demo comment ⚠️ |

All documented deviations are clearly called out with inline comments and MDX Callouts.
`calendar-presets` `fixedWeeks` gap is undocumented.

### 2. Docs follow the React/flat pattern?

Verified against `docs/component-docs-standard.md`:

- Frontmatter: `title`, `description`, `base: angular`, `component: true` — no spurious `links.doc` (correct: Force UI original) ✅
- Hero preview `<ComponentPreview framework="angular" name="calendar-demo" />` before first heading ✅
- `## Installation` with `cli` + `manual` tabs, `<ComponentSource>`, import-path step ✅
- `## Usage` with import + template snippet ✅
- `## Composition` ASCII tree ✅ (optional, used appropriately)
- Flat `##` per example (no `## Examples` umbrella, no `###` example children) ✅
- `## RTL` second to last with `direction="rtl"` preview ✅
- `## API Reference` last ✅

Gap: `## API Reference` lists inputs in prose only. The standard requires a
`### PartName` + `| Prop | Type | Default |` table for Force UI originals. Inputs
`mode`, `selected`, `month`, `numberOfMonths`, `showOutsideDays`, `showWeekNumber`,
`weekStartsOn`, `disabled`, `fromDate`, `toDate`, `captionLayout`, `buttonVariant`
are all undocumented in tabular form. (This gap is an existing known exception,
not unique to calendar.)

### 3. Available inside the registry?

- `_registry.ts` entry at line 670: exists; all 5 on-disk files listed (`calendar.component.html`,
  `calendar.component.ts`, `calendar.icons.ts`, `calendar.utils.ts`, `index.ts`) ✅
- `framework-components.ts` angular Set: `"calendar"` present (line 396) ✅
- `meta.json` pages: `"calendar"` present ✅
- Demo files at `apps/preview-angular/src/angular/calendar-*.ts`: all 12 present, each
  `export default` a standalone component, discoverable by top-level glob ✅

**Blocker:** `_registry.ts` calendar entry has no `registryDependencies` field.
`calendar.component.ts` imports `Button as ButtonDirective, buttonVariants, ButtonVariant`
from `@/angular-ui/button` — the `uiButton` directive is used on all four nav buttons in
`calendar.component.html`. A CLI install of `@force-ui-angular/calendar` will not pull in
`button`, causing compile failure for any consumer who doesn't have it already. Other entries
that depend on button (e.g. `combobox`, `command`, `questionnaire`) list
`registryDependencies: ["button"]`. Calendar must do the same.

### 4. Style diff vs original p4one

| Diff | p4one | Registry | Type | Promote to theme? |
|------|-------|----------|------|-------------------|
| Calendar root spacing/tokens | Inline in `rootClasses()`: `p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)]` | Moved to `.cn-calendar` in `style-force-ui.css` | Refactor | **Already promoted** ✅ |
| `.cn-calendar-dropdown-root` border | No border in normal state; only ring on `has-[:focus-visible]` | `border border-input` always present + `has-focus:` ring | Visual delta | **Already promoted** (intentional registry choice) |
| `.cn-calendar-caption-label` | Not referenced in template | `@apply h-6 pr-1 pl-1.5;` defined in CSS but zero elements in the template use it | Dead rule | Candidate to **remove** |
| RTL icon flip class | `cn-rtl-flip` (internal marker) | `rtl:rotate-180 [&_svg]:fill-current` (pre-transformed) | Consistency | No — other Angular registry components keep `cn-rtl-flip` |
| Icon source | `@material-symbols/svg-400?raw` (Vite `?raw` loader) | Inline SVG strings in `calendar.icons.ts` | Portability | No — registry-only improvement, no p4one impact |
| Range start/end rounding | `rounded-l-(--cell-radius)` / `rounded-r-(--cell-radius)` (physical) | Same physical classes | RTL bug | Should migrate to `rounded-s`/`rounded-e` (logical) — **not promoted yet** |

**Theme promotion candidates:**

| Candidate | Current state | Action |
|-----------|--------------|--------|
| `p-2 [--cell-radius] [--cell-size]` on `.cn-calendar` | In `style-force-ui.css` ✅ | None |
| `.cn-calendar-dropdown-root` focus ring | In `style-force-ui.css` ✅ | None |
| `.cn-calendar-caption-label` dead class | In `style-force-ui.css`, unused | Remove from CSS |

## Verdict

**PASS-with-notes** — All 12 demos present, docs structure correct, registry files complete. One blocker (missing `registryDependencies: ["button"]`) must be fixed before publish; two minor gaps (undocumented `fixedWeeks` deviation, physical RTL range-rounding classes) need follow-up.

## Issues

1. **[blocker]** `packages/registry-angular/ui/_registry.ts` calendar entry (line 670): missing `registryDependencies: ["button"]`. The component imports and uses `Button as ButtonDirective` from `@/angular-ui/button` in both `calendar.component.ts` and `calendar.component.html`. CLI install will not pull `button` as a peer, causing compile error.

2. **[major]** `packages/registry-angular/ui/calendar/calendar.component.ts` `dayButtonClasses()`: range start uses `"rounded-(--cell-radius) rounded-l-(--cell-radius)"` and range end uses `"rounded-(--cell-radius) rounded-r-(--cell-radius)"` — physical properties. In `dir="rtl"` range mode the rounded corners appear on the wrong side. React base calendar changelog explicitly migrated to `rounded-s-(--cell-radius)` / `rounded-e-(--cell-radius)` (logical) for RTL parity. Angular port has not applied this migration.

3. **[minor]** `apps/preview-angular/src/angular/calendar-presets.ts`: React's `calendar-presets.tsx` uses `fixedWeeks` prop (always 6 rows). Angular `CalendarComponent` has no `fixedWeeks` input; months with 4–5 weeks collapse the card height causing layout jitter. Gap is undocumented in `calendar-presets.ts` and the MDX `## With Presets` section.

4. **[minor]** `apps/v4/registry/styles/style-force-ui.css` line 283: `.cn-calendar-caption-label { @apply h-6 pr-1 pl-1.5; }` — dead rule; no element in `calendar.component.html` or `calendar.component.ts` applies this class.
```

---
