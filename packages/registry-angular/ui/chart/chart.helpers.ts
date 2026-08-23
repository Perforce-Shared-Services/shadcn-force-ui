import type {
  ChartBarDatum,
  ChartConfig,
  ChartConfigEntry,
  ChartTooltipPayloadItem,
  NgxSingleResult,
} from './chart.types';

/** CSS selector prefix per theme — the registry uses shadcn's `.dark` class. */
export const CHART_THEMES = { light: '', dark: '.dark' } as const;

/** Fallback color cycle when a config entry carries no explicit color. */
const FALLBACK_CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

/**
 * Resolves the `ChartConfig` entry describing a tooltip/legend item, matching
 * `key` against the item's own field first, then its nested `payload`, then
 * falling back to `key` itself. Port of the registry's
 * `getPayloadConfigFromPayload`.
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
 * registry's `ChartStyle`, rendered as CSS text for an imperatively created
 * host `<style>` element (a template-authored `<style>` is treated as a
 * static build-time stylesheet by Angular and strips runtime bindings).
 *
 * Always appends the axis-tick fix: ngx-charts tick `<text>` elements carry
 * no explicit `fill` and would otherwise render black in every theme.
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

/** Category order, deduplicated in first-appearance order. */
export function collectCategoryOrder(data: ChartBarDatum[]): string[] {
  const order: string[] = [];
  for (const d of data) {
    if (!order.includes(d.category)) {
      order.push(d.category);
    }
  }
  return order;
}

/** Series declared, in first-appearance order (empty for single-series data). */
export function collectSeriesOrder(data: ChartBarDatum[]): string[] {
  const order: string[] = [];
  for (const d of data) {
    if (d.series && !order.includes(d.series)) {
      order.push(d.series);
    }
  }
  return order;
}

export function toNgxSingleResults(data: ChartBarDatum[], categoryOrder: string[]): NgxSingleResult[] {
  const byCategory = new Map(data.map((d) => [d.category, d.value]));
  return categoryOrder.map((category) => ({ name: category, value: byCategory.get(category) ?? 0 }));
}

export interface NgxGroupedResult {
  name: string;
  series: NgxSingleResult[];
}

/**
 * Category-major grouped/stacked `results` shape for ngx-charts' `-2d` /
 * `-stacked` bar charts: one outer entry per CATEGORY holding all its
 * series' values.
 */
export function toNgxGroupedResults(
  data: ChartBarDatum[],
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
 * Color resolver honoring explicit `ChartConfig` colors with a token-based
 * fallback cycle.
 */
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
