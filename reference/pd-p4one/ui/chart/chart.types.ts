/**
 * Angular port of @force-ui/chart's `ChartConfig` (radix-force-ui style).
 *
 * `label` is plain text (not `React.ReactNode`) and `icon` is a raw inline
 * SVG string (per the icon strategy used across `ui/*`) rather than a
 * component reference. No current consumer needs rich label content or a
 * component-typed icon — extend if one does.
 */
export type ChartConfigEntry = {
  label?: string;
  icon?: string;
} & (
  | { color?: string; theme?: never }
  | { color?: never; theme: { light: string; dark: string } }
);

export type ChartConfig = Record<string, ChartConfigEntry>;

export type ChartIndicator = 'line' | 'dot' | 'dashed';

/**
 * One hovered/rendered data point, in whatever shape a chart-type component
 * normalizes its underlying charting library's model into. Unlike recharts'
 * `payload` array (all series sharing an X position), ngx-charts reports one
 * item per hovered element — so chart content components here work off a
 * single `ChartTooltipPayloadItem`, not an array. See chart.helpers.ts and
 * the chart component docs for the rest of that parity gap.
 */
export interface ChartTooltipPayloadItem {
  dataKey?: string;
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
}

/**
 * The minimal `{category, value}` shape every ngx-charts-based chart type
 * shares (bar adds an optional `series`, donut stays exactly this). Chart
 * types are structurally compatible with this on purpose — helpers in
 * `chart.helpers.ts` that only need category/value (sorting, color
 * resolution, number formatting, CSV export) take this instead of any one
 * chart type's own datum type, so donut doesn't have to import from bar's
 * files (or vice versa) to reuse them.
 */
export interface ChartValueDatum {
  category: string;
  value: number;
}

/** Category/segment render order — shared across every chart type that sorts by value or name. */
export type ChartSortBy = 'value-desc' | 'value-asc' | 'category-asc' | 'as-provided';

/**
 * `ChartValueDatum` plus an optional `series` key — the shape every
 * multi-series-capable chart type shares (bar, line, area, radar all accept
 * this; donut/radial/gauge stay single-series and use `ChartValueDatum`
 * directly). `series` is looked up in `ChartConfig` for color + label, same
 * as `category` is for single-series charts.
 */
export interface ChartSeriesDatum extends ChartValueDatum {
  series?: string;
}

/**
 * Caller-controlled load state for a `ui-chart-widget` instance (as opposed
 * to Empty/Partial/SinglePoint, which the widget derives from `data` itself).
 * A behavioral mode rather than a visual variant, so — unlike the plain
 * string-union design-variant types elsewhere in this file — this is a TS
 * enum per the "3+ named alternatives" rule. Generic across every chart type
 * the widget can render, not bar-specific despite originating there.
 */
export enum ChartLoadState {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  NoPermission = 'no-permission',
}

export interface ChartWidgetDelta {
  value: string;
  direction: 'up' | 'down' | 'flat';
}

export interface ChartWidgetHeadlineMetric {
  value: string | number;
  label: string;
  delta?: ChartWidgetDelta;
}

export type ChartWidgetDensity = 'sm' | 'md' | 'lg';

export type ChartWidgetLegendMode = 'bottom' | 'none' | 'auto';

/** Which `ui-chart-*` card `ui-chart-widget` composes for its plot area. Gauge and sparkline aren't included — gauge's single-value/min/max shape and sparkline's deliberately chrome-stripped nature don't fit this widget's title/subtitle/headline-metric/legend/table-fallback chrome. */
export type ChartWidgetType = 'bar' | 'line' | 'area' | 'donut' | 'radar' | 'radial';
