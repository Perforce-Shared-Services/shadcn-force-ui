export {
  abbreviateNumber,
  buildCsv,
  buildCustomColors,
  collectSeriesOrder,
  hasMissingRequiredFields,
  sortCategories,
  toNgxGroupedResults,
  toNgxSingleResults,
} from './chart.helpers';
export type { NgxGroupedResult } from './chart.helpers';
import { collectSeriesOrder } from './chart.helpers';
import type { ChartBarDatum, ChartBarVariant } from './chart-bar.types';

const OTHER_BUCKET = 'Other';

/**
 * Error-state triggers, per bar-chart.md's Data requirements table: mixed
 * category types, duplicate (category, series) pairs, and negative values in
 * a stacked variant. Returns a human-readable message or `null` if the data
 * is structurally valid.
 */
export function findChartBarDataError(data: ChartBarDatum[], variant: ChartBarVariant): string | null {
  if (data.some((d) => typeof d.category !== 'string')) {
    return 'Category values must all be the same type.';
  }

  const seen = new Set<string>();
  for (const d of data) {
    const key = `${d.category}::${d.series ?? ''}`;
    if (seen.has(key)) {
      return 'The data contains duplicate categories.';
    }
    seen.add(key);
  }

  const isStacked = variant === 'vertical-stacked' || variant === 'horizontal-stacked';
  if (isStacked && data.some((d) => d.value < 0)) {
    return 'Stacked bar charts cannot show negative values — use a line chart instead.';
  }

  return null;
}

/**
 * Caps the series count per bar-chart.md's Series count limit (4 grouped, 5
 * stacked), summing the excess into an "Other" bucket. No-op under the limit.
 */
export function capSeriesCount(data: ChartBarDatum[], limit: number): ChartBarDatum[] {
  const order = collectSeriesOrder(data);
  if (order.length <= limit) {
    return data;
  }

  const kept = new Set(order.slice(0, limit - 1));
  const merged = new Map<string, ChartBarDatum>();
  for (const d of data) {
    const series = d.series && kept.has(d.series) ? d.series : OTHER_BUCKET;
    const mapKey = `${d.category}::${series}`;
    const existing = merged.get(mapKey);
    if (existing) {
      existing.value += d.value;
    } else {
      merged.set(mapKey, { category: d.category, series, value: d.value });
    }
  }
  return Array.from(merged.values());
}

/**
 * Caps the category count per bar-chart.md's Maximum data points row,
 * grouping the tail (in as-provided order) into an "Other" category.
 */
export function capCategoryCount(
  data: ChartBarDatum[],
  limit: number,
): { data: ChartBarDatum[]; truncated: boolean } {
  const order: string[] = [];
  for (const d of data) {
    if (!order.includes(d.category)) {
      order.push(d.category);
    }
  }
  if (order.length <= limit) {
    return { data, truncated: false };
  }

  const kept = new Set(order.slice(0, limit - 1));
  const merged = new Map<string, ChartBarDatum>();
  for (const d of data) {
    const category = kept.has(d.category) ? d.category : OTHER_BUCKET;
    const mapKey = `${category}::${d.series ?? ''}`;
    const existing = merged.get(mapKey);
    if (existing) {
      existing.value += d.value;
    } else {
      merged.set(mapKey, { category, series: d.series, value: d.value });
    }
  }
  return { data: Array.from(merged.values()), truncated: true };
}

/** ARIA summary sentence for the chart container, per bar-chart.md's Screen reader pattern. */
export function buildAriaSummary(categoryOrder: string[], data: ChartBarDatum[]): string {
  if (!categoryOrder.length) {
    return 'No categories.';
  }
  const totals = new Map<string, number>();
  for (const d of data) {
    totals.set(d.category, (totals.get(d.category) ?? 0) + d.value);
  }
  let highestCategory = categoryOrder[0];
  let highestValue = totals.get(highestCategory) ?? 0;
  for (const category of categoryOrder) {
    const value = totals.get(category) ?? 0;
    if (value > highestValue) {
      highestValue = value;
      highestCategory = category;
    }
  }
  const count = categoryOrder.length;
  return `${count} ${count === 1 ? 'category' : 'categories'}. Highest: ${highestCategory} at ${highestValue.toLocaleString()}.`;
}

/**
 * `ui-chart-widget`-specific CSS override for ngx-charts' internal SVG,
 * applied as a second imperatively-injected `<style>` (same mechanism as
 * `ChartContainer`'s per-series color vars — see that component's doc
 * comment on why a literal `<style>` tag in an Angular template doesn't
 * work). The axis-tick-text-color fix lives in `chart.helpers.ts`'s
 * `buildChartStyleText` instead (every ngx-charts chart type needs it, not
 * just bar) — this one is genuinely bar-widget-specific:
 *
 * **Sibling-dim on hover/focus** (bar-chart.md's Behavior section: "sibling
 * bars dim to opacity-subtle (0.7)" when one is hovered/focused) — a P4
 * dashboard-widget requirement with no Figma/shadcn bar-card equivalent, so
 * it stays out of `ui-chart-bar`. ngx-charts has no built-in cross-sibling
 * dimming (its own CSS only styles the hovered element itself), and we
 * can't bind Angular classes onto SVG nodes ngx-charts renders internally —
 * so this is a pure-CSS `:has()` rule (Chromium/Electron-safe), no JS
 * hover-state tracking needed.
 */
export function buildChartBarStyleOverrides(id: string): string {
  return `
[data-chart="${id}"] .bar { transition: opacity 150ms ease; }
@media (prefers-reduced-motion: reduce) {
  [data-chart="${id}"] .bar { transition: none; }
}
[data-chart="${id}"]:has(.bar:hover, .bar:focus-visible) .bar:not(:hover):not(:focus-visible) {
  opacity: 0.7;
}`;
}
