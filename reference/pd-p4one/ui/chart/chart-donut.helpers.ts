import type { ChartValueDatum } from './chart.types';

const OTHER_BUCKET = 'Other';

/**
 * Error-state triggers, per donut-chart.md's Data requirements table:
 * duplicate categories and negative values are both hard rejections for a
 * donut (unlike bar, which only rejects negatives for the stacked variant —
 * a donut's whole premise is "parts of a meaningful whole," so negatives
 * never make sense here).
 */
export function findChartDonutDataError(data: ChartValueDatum[]): string | null {
  if (data.some((d) => typeof d.category !== 'string')) {
    return 'Category values must all be the same type.';
  }

  const seen = new Set<string>();
  for (const d of data) {
    if (seen.has(d.category)) {
      return 'The data contains duplicate categories.';
    }
    seen.add(d.category);
  }

  if (data.some((d) => d.value < 0)) {
    return 'Donut charts cannot show negative values — use a bar chart instead.';
  }

  return null;
}

/**
 * Caps the segment count per donut-chart.md's Maximum data points row (5),
 * summing the excess into an "Other" bucket. No-op under the limit.
 */
export function capSegmentCount(
  data: ChartValueDatum[],
  limit: number,
): { data: ChartValueDatum[]; truncated: boolean } {
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
  const merged = new Map<string, ChartValueDatum>();
  for (const d of data) {
    const category = kept.has(d.category) ? d.category : OTHER_BUCKET;
    const existing = merged.get(category);
    if (existing) {
      existing.value += d.value;
    } else {
      merged.set(category, { category, value: d.value });
    }
  }
  return { data: Array.from(merged.values()), truncated: true };
}

/** Percentage of `total` that `value` represents, rounded to the nearest whole percent (donut-chart.md's legend/tooltip percentage column). */
export function percentageOf(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}
