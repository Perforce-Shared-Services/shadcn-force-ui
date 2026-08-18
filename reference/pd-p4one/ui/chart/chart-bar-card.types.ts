/**
 * Public API for `ChartBarComponent` (`ui-chart-bar`) — the small,
 * cross-framework "chart type" card matching Figma's `Chart / Bar Chart`
 * component set and shadcn's public bar-chart examples (`ui.shadcn.com/charts#bar-chart`,
 * linked directly from that Figma component's documentation). One flexible
 * component + flags, not nine hardcoded variants — matches how the real
 * shadcn examples are structured (nine demo files composing the same
 * `<BarChart>`/`<Bar>` primitives with different prop combinations).
 */
export type ChartBarOrientation = 'vertical' | 'horizontal';

/** A single pill/legend entry used when forcing one uniform color across every bar ("Basic" — see `ChartBarComponent.color`). */
export const CHART_BAR_SINGLE_SERIES_KEY = '__single__';
