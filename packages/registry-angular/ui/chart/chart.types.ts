/**
 * Angular port of the registry `ChartConfig` (`apps/v4/registry/bases/radix/ui/chart.tsx`).
 *
 * `label` is plain text (not React.ReactNode) and `icon` is a raw inline SVG
 * string — matching the icon strategy used across `ui/*`.
 */
export type ChartConfigEntry = {
  label?: string;
  icon?: string;
} & (
  | { color?: string; theme?: never }
  | { color?: never; theme: { light: string; dark: string } }
);

export type ChartConfig = Record<string, ChartConfigEntry>;

/** Tooltip indicator shapes, mirroring the registry `ChartTooltipContent`. */
export type ChartIndicator = 'line' | 'dot' | 'dashed';

/**
 * One hovered data point. ngx-charts reports one item per hovered element
 * (reports a single item, not recharts' shared-axis payload array), so chart
 * content components work off a single payload item.
 */
export interface ChartTooltipPayloadItem {
  dataKey?: string;
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
}

/**
 * `{category, value}` plus optional `series` — the shape the bar chart type
 * accepts; `series` is looked up in `ChartConfig` for color + label.
 */
export interface ChartBarDatum {
  category: string;
  value: number;
  series?: string;
}

export interface NgxSingleResult {
  name: string;
  value: number;
}
