import type {
  ChartConfig,
  ChartConfigEntry,
  ChartSeriesDatum,
  ChartSortBy,
  ChartTooltipPayloadItem,
  ChartValueDatum,
} from './chart.types';

/** CSS selector prefix per theme. Dark is `.dark-theme` in this app (not shadcn's `.dark`). */
const CHART_THEMES = { light: '', dark: '.dark-theme' } as const;

/**
 * Resolves the `ChartConfig` entry describing a tooltip/legend item, matching
 * `key` against the item's own field first, then its nested `payload`, then
 * falling back to `key` itself. Port of the registry's
 * `getPayloadConfigFromPayload`, retyped against `ChartTooltipPayloadItem`
 * instead of an untyped recharts payload entry.
 */
export function getConfigEntry(
  config: ChartConfig,
  item: ChartTooltipPayloadItem | undefined,
  key: string,
): ChartConfigEntry | undefined {
  if (!item) {
    return config[key];
  }

  let configKey = key;
  const direct = (item as unknown as Record<string, unknown>)[key];
  if (typeof direct === 'string') {
    configKey = direct;
  } else if (item.payload && typeof item.payload[key] === 'string') {
    configKey = item.payload[key] as string;
  }

  return config[configKey] ?? config[key];
}

/**
 * Builds the `--color-{key}` custom-property declarations for a chart
 * instance, scoped to `[data-chart="id"]` for light and dark. Port of the
 * registry's `ChartStyle` — same idea (config-driven per-series CSS vars),
 * rendered here as CSS text for a host `<style>` element instead of a JSX
 * `<style>` component.
 *
 * Always also includes a fix for ngx-charts' axis tick `<text>` elements,
 * which carry no explicit `fill` of their own and so resolve to the SVG
 * initial value (black) regardless of theme — confirmed via
 * `getComputedStyle` against the installed `@swimlane/ngx-charts@24.0.0` in
 * Storybook's dark ramp, not assumed. This lives here (not per chart-type)
 * so every ngx-charts-based chart type built on `ChartContainer` gets it for
 * free, not just bar charts. `.tick text` is ngx-charts' own d3-axis-derived
 * class, the equivalent of the recharts registry's
 * `.recharts-cartesian-axis-tick_text` override (which has no ngx-charts
 * equivalent — different library, different class names).
 */
export function buildChartStyleText(id: string, config: ChartConfig): string {
  const colorConfig = Object.entries(config).filter(([, entry]) => entry.theme ?? entry.color);

  const colorVars = colorConfig.length
    ? Object.entries(CHART_THEMES)
        .map(([theme, selector]) => {
          const vars = colorConfig
            .map(([key, entry]) => {
              const color = entry.theme?.[theme as keyof typeof entry.theme] ?? entry.color;
              return color ? `  --color-${key}: ${color};` : null;
            })
            .filter((line): line is string => line !== null)
            .join('\n');
          return `${selector} [data-chart="${id}"] {\n${vars}\n}`;
        })
        .join('\n')
    : '';

  return `${colorVars}\n[data-chart="${id}"] .tick text { fill: var(--muted-foreground); }`;
}

/**
 * Category/segment render order for any `{category, value}` chart type
 * (bar's categories, donut's segments). Shared here — not under a specific
 * chart type's helpers file — so sibling chart types don't depend on each
 * other to reuse it.
 */
export function sortCategories(data: ChartValueDatum[], sortBy: ChartSortBy): string[] {
  const totals = new Map<string, number>();
  const order: string[] = [];
  for (const d of data) {
    if (!totals.has(d.category)) {
      totals.set(d.category, 0);
      order.push(d.category);
    }
    totals.set(d.category, totals.get(d.category)! + d.value);
  }

  switch (sortBy) {
    case 'value-desc':
      return [...order].sort((a, b) => totals.get(b)! - totals.get(a)!);
    case 'value-asc':
      return [...order].sort((a, b) => totals.get(a)! - totals.get(b)!);
    case 'category-asc':
      return [...order].sort((a, b) => a.localeCompare(b));
    case 'as-provided':
    default:
      return order;
  }
}

/** Number abbreviation ("1.2k", "3.4M") for axis ticks, tooltips, and legends across chart types. */
export function abbreviateNumber(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) {
    return `${trimDecimal(value / 1_000_000_000)}B`;
  }
  if (abs >= 1_000_000) {
    return `${trimDecimal(value / 1_000_000)}M`;
  }
  if (abs >= 1_000) {
    return `${trimDecimal(value / 1_000)}k`;
  }
  return value.toLocaleString();
}

function trimDecimal(value: number): string {
  return (Math.round(value * 10) / 10).toString();
}

const FALLBACK_CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

/** ngx-charts `customColors` function: resolves `ChartConfig` colors first, falling back to the `--chart-N` ramp in domain-key order. */
export function buildCustomColors(config: ChartConfig | undefined, keyOrder: string[]): (name: string) => string {
  return (name: string) => {
    const configured = config?.[name]?.color;
    if (configured) {
      return configured;
    }
    const index = keyOrder.indexOf(name);
    return FALLBACK_CHART_COLORS[index % FALLBACK_CHART_COLORS.length] ?? FALLBACK_CHART_COLORS[0];
  };
}

/** CSV export — native Blob download, no charting-library or extra dependency involved. Shared across chart types; `series` is omitted from the header/rows when no datum declares one. */
export function buildCsv(data: (ChartValueDatum & { series?: string })[]): string {
  const hasSeries = data.some((d) => d.series);
  const header = hasSeries ? 'category,series,value' : 'category,value';
  const rows = data.map((d) =>
    hasSeries
      ? `${csvField(d.category)},${csvField(d.series ?? '')},${d.value}`
      : `${csvField(d.category)},${d.value}`,
  );
  return [header, ...rows].join('\n');
}

function csvField(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** Empty-state trigger shared by every chart type: a missing/invalid category or value means there's nothing valid to render. */
export function hasMissingRequiredFields(data: ChartValueDatum[]): boolean {
  return data.some(
    (d) => d.category == null || d.category === '' || d.value == null || Number.isNaN(d.value),
  );
}

export interface NgxSingleResult {
  name: string;
  value: number;
}

/** `{category, value}[]` → ngx-charts' single-series `results` shape, in `categoryOrder`. Missing values become an explicit 0 (never a dropped category). */
export function toNgxSingleResults(data: ChartValueDatum[], categoryOrder: string[]): NgxSingleResult[] {
  const byCategory = new Map(data.map((d) => [d.category, d.value]));
  return categoryOrder.map((category) => ({ name: category, value: byCategory.get(category) ?? 0 }));
}

/** Series declared, in first-appearance order (empty for single-series data). Shared by every multi-series chart type (bar, line, area, radar). */
export function collectSeriesOrder(data: ChartSeriesDatum[]): string[] {
  const order: string[] = [];
  for (const d of data) {
    if (d.series && !order.includes(d.series)) {
      order.push(d.series);
    }
  }
  return order;
}

export interface NgxGroupedResult {
  name: string;
  series: NgxSingleResult[];
}

/**
 * `ChartSeriesDatum[]` → ngx-charts' grouped/stacked `results` shape, outer
 * array = one entry per CATEGORY (each holding all its series' values) —
 * this is what `ngx-charts-bar-vertical-2d`/`-stacked` (and horizontal
 * equivalents) iterate as `*ngFor="let group of results"`, one bar-group per
 * category. Bar-only; see `toNgxSeriesMajorResults` for line/area/radar's
 * opposite orientation.
 */
export function toNgxGroupedResults(
  data: ChartSeriesDatum[],
  categoryOrder: string[],
  seriesOrder: string[],
): NgxGroupedResult[] {
  const byCategoryAndSeries = new Map<string, number>();
  for (const d of data) {
    byCategoryAndSeries.set(`${d.category}::${d.series ?? ''}`, d.value);
  }
  return categoryOrder.map((category) => ({
    name: category,
    series: seriesOrder.map((series) => ({
      name: series,
      value: byCategoryAndSeries.get(`${category}::${series}`) ?? 0,
    })),
  }));
}

/**
 * `ChartSeriesDatum[]` → ngx-charts' multi-series `results` shape, outer
 * array = one entry per SERIES (each holding its own category-ordered
 * points) — the orientation `ngx-charts-line-chart`/`-area-chart`/
 * `-polar-chart` all expect (`*ngFor="let series of results"`, one
 * line/area/polygon per series, `[data]="series"` passed straight into the
 * per-series child component). The OPPOSITE nesting from `toNgxGroupedResults`
 * (bar's category-major grouping) — passing bar's shape here would render one
 * line per CATEGORY instead of one per series, which is wrong.
 */
export function toNgxSeriesMajorResults(
  data: ChartSeriesDatum[],
  seriesOrder: string[],
  categoryOrder: string[],
): NgxGroupedResult[] {
  const byCategoryAndSeries = new Map<string, number>();
  for (const d of data) {
    byCategoryAndSeries.set(`${d.category}::${d.series ?? ''}`, d.value);
  }
  return seriesOrder.map((series) => ({
    name: series,
    series: categoryOrder.map((category) => ({
      name: category,
      value: byCategoryAndSeries.get(`${category}::${series}`) ?? 0,
    })),
  }));
}
