# chart — Migration Review

## Checklist

### 1. Examples match React base?

React base has 8 files: `chart-demo`, `chart-example`, `chart-example-axis`,
`chart-example-grid`, `chart-example-legend`, `chart-example-tooltip`,
`chart-rtl`, `chart-tooltip`. Angular has all 8 at parity names. ✅

**Deviations found:**

- **`chart-example-tooltip.ts` (major):** Template is identical to
  `chart-example-legend.ts`:
  `<div uiChartBar … [data]="chartData()" [colorMapping]="config" />`.
  Since `ChartBarComponent.legend` defaults `true`, this demo renders a legend
  it should not. The React `chart-example-tooltip.tsx` shows grid + XAxis +
  tooltip and *no* legend (no `<ChartLegend>` added). Fix: add `[legend]="false"`
  to the `chart-example-tooltip.ts` template. Without it, the "Tooltip" and
  "Legend" demos are visually indistinguishable.

- **`chart-tooltip.ts` (minor):** React's four quadrants carry annotations
  "Label" (q1) and "Indicator" (q4) as absolutely-positioned `<div>` text.
  Angular's `quadrants` array has `annotation: undefined` for both — they are
  silently absent. "Name" (q2) is present. The Callout in the MDX covers the
  missing SVG arrows but not the missing annotation labels. The q2 React payload
  has two items (Chrome + Firefox); Angular correctly renders only the first
  item because `ChartTooltipContentComponent` is single-item — this structural
  limitation is documented. The annotation gap is not.

- **`chart-demo.ts` (acceptable):** React swaps `dataKey` on a multi-series
  recharts `<BarChart>`; Angular recomputes a single-series `chartData()` signal
  instead. Same visual output; deviation documented in both the file comment and
  an MDX `<Callout>`.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/chart.mdx`:

- Frontmatter (`title`, `description`, `base: angular`, `component: true`) ✅
- Hero `<ComponentPreview framework="angular" name="chart-demo" />` before any
  heading ✅
- `## Installation` (CLI + manual tabs with `<Steps>`) ✅
- `## Usage` (import + HTML snippet) ✅
- `## Composition` (ASCII tree — permitted for multi-part components) ✅
- Flat `## Basic` / `## No Chrome` / `## Grid` / `## Legend` / `## Tooltip` /
  `## Custom Tooltip Content` / `## Interactive` — each has one sentence of
  prose and one `<ComponentPreview>` ✅
- `## RTL` second to last ✅
- `## API Reference` last ✅

Minor notes:
- `className` input is undocumented in the `ChartBarComponent` props table
  (all other components list it). Low impact.
- `## Basic` maps to `chart-example-axis` (grid + XAxis), while `## No Chrome`
  maps to `chart-example` (bare bars). This inverts the build-up order from the
  React step-by-step, but the standard explicitly allows extra prose structure
  for `chart`, so not a violation.

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` entry "chart" at line 798:

- All 10 files on disk listed: `chart-bar.component.html`,
  `chart-bar.component.ts`, `chart-legend-content.component.html`,
  `chart-tooltip-content.component.html`, `chart.component.html`,
  `chart.component.ts`, `chart.helpers.ts`, `chart.types.ts`,
  `chart.variants.ts`, `index.ts` ✅
- `dependencies: ["@swimlane/ngx-charts"]` ✅ (manual step also lists
  `class-variance-authority clsx tailwind-merge`, already project-baseline)
- No `registryDependencies`; the `card` import in `chart-demo.ts` is a demo
  dependency, not a component dependency — correct ✅
- Angular `Set` in `apps/v4/lib/framework-components.ts` includes `"chart"` ✅
- `apps/v4/content/docs/components/angular/meta.json` `pages` array includes
  `"chart"` ✅
- All 8 demos export a default class; `validate:previews` resolution passes ✅

### 4. Style diff vs original p4one

| p4one class / pattern | Registry (cn-* token) version | Assessment |
|---|---|---|
| Tooltip inline: `grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl` | `chartTooltipVariants = cva('cn-chart-tooltip grid min-w-32 items-start')` where `.cn-chart-tooltip { @apply border-border/50 bg-background gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl }` | Token already in `style-force-ui.css:322` ✅ |
| Dark selector `.dark-theme` in `buildChartStyleText` | `.dark` (shadcn convention) | App-local vs registry-correct; each env is right for its host |
| Legend item: `size='sm'` \| `'md'` variant (p4one `ChartLegendContentComponent`) | Fixed at `sm` size; `size` input dropped | P4-local widget requirement; not a regression for the registry |
| `buildActiveBarStyleText`, `showDataLabel`, `dataLabelFormatting`, `markClick`, `activeCategory` in p4one bar | Not present in registry | P4-specific dashboard features; YAGNI for the registry port |
| Helpers: `abbreviateNumber`, `buildCsv`, `hasMissingRequiredFields`, `sortCategories`, `capSeriesCount`, `capCategoryCount`, `buildAriaSummary` in p4one | Not present in registry | P4 widget layer; not needed for the parity-target |

**Theme promotion candidates:**

| Token | Currently in `style-force-ui.css`? | Promote? |
|---|---|---|
| `.cn-chart-tooltip` | Yes (`line 322`) | Already promoted ✅ |
| Legend item / swatch layout | No — purely structural layout classes | No |
| Container `flex aspect-video justify-center text-xs` | No | No (no semantic theming; layout-only) |

No new promotions are needed.

## Verdict

PASS-with-notes — registry entry, docs structure, and example set are complete
and correctly wired; one demo (`chart-example-tooltip.ts`) is visually
indistinguishable from `chart-example-legend.ts` due to a missing
`[legend]="false"` binding.

## Issues

1. **(major)** `apps/preview-angular/src/angular/chart-example-tooltip.ts`:
   missing `[legend]="false"` on the `uiChartBar` host. The "Tooltip" demo
   currently renders an identical chart to the "Legend" demo — both show legend
   + tooltip. Add `[legend]="false"` to the `uiChartBar` element to match the
   React `chart-example-tooltip.tsx` which omits `<ChartLegend>`.

2. **(minor)** `apps/preview-angular/src/angular/chart-tooltip.ts`:
   quadrant annotations "Label" (index 0) and "Indicator" (index 3) are
   `undefined` in the `quadrants` array. The React version renders those labels
   as `<div class="absolute …">` text next to each tooltip. The existing MDX
   Callout only mentions the SVG arrows, not these labels. Either add the
   annotation strings (`annotation: "Label"`, `annotation: "Indicator"`) or
   expand the Callout to mention them.

3. **(minor)** `apps/v4/content/docs/components/angular/chart.mdx` API table:
   `className` input missing from `ChartBarComponent` props table. Every other
   component's Angular API table documents it.
```

---
