/**
 * One category's value, per the `bar-chart` Force UI pattern's "Data
 * requirements" table (`category` + `value` required, `series` optional for
 * grouped/stacked). `series` is the key looked up in `ChartConfig` (color +
 * label) — matching `ui/chart`'s wrapper pieces. Structurally identical to
 * `ChartSeriesDatum` (shared with line/area/radar) — kept as its own name
 * here since it predates the shared type and every call site already spells
 * `ChartBarDatum`.
 */
export type { ChartSeriesDatum as ChartBarDatum } from './chart.types';

/** ngx-charts' reference-line shape is `{ value, name }` — kept 1:1 here. */
export interface ChartBarReferenceLine {
  value: number;
  name: string;
}

export type ChartBarVariant =
  | 'vertical-single'
  | 'vertical-grouped'
  | 'vertical-stacked'
  | 'horizontal-single'
  | 'horizontal-stacked'
  | 'mini';
