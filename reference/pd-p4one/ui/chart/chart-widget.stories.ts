import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ChartWidget } from './';
import type {
  ChartBarReferenceLine,
  ChartBarVariant,
  ChartLoadState,
  ChartSeriesDatum,
  ChartSortBy,
  ChartWidgetDensity,
  ChartWidgetHeadlineMetric,
  ChartWidgetLegendMode,
  ChartWidgetType,
} from './';
import { ChartLoadState as LoadState } from './';
import type { ChartConfig } from './chart.types';

const CONFIG: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  tablet: { label: 'Tablet', color: 'var(--chart-3)' },
};

const CATEGORY_CONFIG: ChartConfig = {
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'var(--chart-5)' },
};

// Bar/line/area/radar share the same category-axis shape (month labels).
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const DESKTOP = [4200, 3100, 5400, 4800, 6100, 5200];
const MOBILE = [2400, 2800, 3200, 3600, 3000, 3400];

const SINGLE_DATA: ChartSeriesDatum[] = MONTHS.map((category, i) => ({ category, value: DESKTOP[i] }));
const GROUPED_DATA: ChartSeriesDatum[] = MONTHS.flatMap((category, i) => [
  { category, series: 'desktop', value: DESKTOP[i] },
  { category, series: 'mobile', value: MOBILE[i] },
]);

// Donut/radial: a flat category list, no series axis.
const CATEGORY_DATA: ChartSeriesDatum[] = [
  { category: 'chrome', value: 275 },
  { category: 'safari', value: 200 },
  { category: 'firefox', value: 187 },
  { category: 'edge', value: 173 },
  { category: 'other', value: 90 },
];

const CHART_TYPES: ChartWidgetType[] = ['bar', 'line', 'area', 'donut', 'radar', 'radial'];
const VARIANTS: ChartBarVariant[] = [
  'vertical-single',
  'vertical-grouped',
  'vertical-stacked',
  'horizontal-single',
  'horizontal-stacked',
  'mini',
];
const DENSITIES: ChartWidgetDensity[] = ['sm', 'md', 'lg'];
const SORT_OPTIONS: ChartSortBy[] = ['as-provided', 'value-desc', 'value-asc', 'category-asc'];
const LEGEND_OPTIONS: ChartWidgetLegendMode[] = ['auto', 'bottom', 'none'];
const LOAD_STATES: ChartLoadState[] = [LoadState.Idle, LoadState.Loading, LoadState.Error, LoadState.NoPermission];

function isMultiSeriesVariant(variant: ChartBarVariant): boolean {
  return variant === 'vertical-grouped' || variant === 'vertical-stacked' || variant === 'horizontal-stacked';
}

interface ChartWidgetStoryArgs {
  title: string;
  subtitle: string;
  chartType: ChartWidgetType;
  variant: ChartBarVariant;
  density: ChartWidgetDensity;
  sortBy: ChartSortBy;
  legend: ChartWidgetLegendMode;
  normalized: boolean;
  tooltip: boolean;
  exportable: boolean;
  loadState: ChartLoadState;
  errorMessage: string;
  partialDataMessage: string;
  showHeadlineMetric: boolean;
  showReferenceLine: boolean;
}

// Static template — Storybook-Angular re-binds props on arg changes but does
// not recompile this string (see chart.stories.ts's note on the same
// constraint), so `data` / `headlineMetric` / `referenceLines` are derived
// per-args inside `render()` rather than switched in the template itself.
const TEMPLATE = `
  <div style="width: 480px">
    <ui-chart-widget
      [title]="title"
      [subtitle]="subtitle || undefined"
      [data]="data"
      [chartType]="chartType"
      [variant]="variant"
      [colorMapping]="colorMapping"
      [density]="density"
      [sortBy]="sortBy"
      [legend]="legend"
      [normalized]="normalized"
      [tooltip]="tooltip"
      [exportable]="exportable"
      [loadState]="loadState"
      [errorMessage]="errorMessage || undefined"
      [partialDataMessage]="partialDataMessage || undefined"
      [headlineMetric]="headlineMetric"
      [referenceLines]="referenceLines"
      (markClick)="lastClicked = $event.category + (($event.series ? ' / ' + $event.series : '')) + ': ' + $event.value"
      (refresh)="lastClicked = 'refresh requested'"
    ></ui-chart-widget>
    <p *ngIf="lastClicked" class="mt-2 text-xs text-muted-foreground">Last event: {{ lastClicked }}</p>
  </div>
`;

/**
 * `ui-chart-widget` is the P4 One dashboard-widget layer — title/subtitle/
 * headline metric/action menu, six render states, an ARIA "view as table"
 * fallback — per the Force UI `bar-chart` pattern (`the-force-design-spec`
 * MCP, `patterns/components/bar-chart.md`). `chartType` picks which
 * `ui-chart-*` card (bar/line/area/donut/radar/radial) renders in the plot
 * area; the surrounding chrome stays identical across all of them. Generalized
 * from the original bar-only `ui-chart-bar-widget`, 2026-07-03 (second pass).
 *
 * Bar-only controls: `variant` (orientation/grouped/stacked/mini) drives bar's
 * plot AND (via its "stacked" half) area's `stacked` flag — see
 * `ChartWidgetComponent`'s doc comment. `referenceLines`/keyboard nav over
 * individual marks are bar-only for this pass.
 *
 * Try: for `bar`, Tab into the chart then Arrow keys to move between bars
 * (Up/Down moves between series in grouped/stacked); the tooltip follows
 * focus. The three-dot menu exports the visible data as CSV. See
 * `ChartWidgetComponent`'s doc comment for every documented spec deviation.
 */
const meta: Meta<ChartWidgetStoryArgs> = {
  title: 'UI/Chart/Widget',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CommonModule, ChartWidget] })],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    chartType: { control: 'select', options: CHART_TYPES },
    variant: { control: 'select', options: VARIANTS, description: 'bar-only (also drives area\'s stacked flag)' },
    density: { control: 'select', options: DENSITIES },
    sortBy: { control: 'select', options: SORT_OPTIONS },
    legend: { control: 'select', options: LEGEND_OPTIONS },
    normalized: { control: 'boolean', description: 'bar horizontal-stacked only' },
    tooltip: { control: 'boolean' },
    exportable: { control: 'boolean' },
    loadState: { control: 'select', options: LOAD_STATES },
    errorMessage: { control: 'text' },
    partialDataMessage: { control: 'text' },
    showHeadlineMetric: { control: 'boolean' },
    showReferenceLine: { control: 'boolean', description: 'bar vertical-single / horizontal-single only' },
  },
  args: {
    title: 'Build outcomes',
    subtitle: 'Last 6 months',
    chartType: 'bar',
    variant: 'vertical-single',
    density: 'md',
    sortBy: 'as-provided',
    legend: 'auto',
    normalized: false,
    tooltip: true,
    exportable: true,
    loadState: LoadState.Idle,
    errorMessage: '',
    partialDataMessage: '',
    showHeadlineMetric: false,
    showReferenceLine: false,
  },
  render: (args) => {
    const isCategorical = args.chartType === 'donut' || args.chartType === 'radial';
    const multiSeries = !isCategorical && isMultiSeriesVariant(args.variant);
    const data = isCategorical ? CATEGORY_DATA : multiSeries ? GROUPED_DATA : SINGLE_DATA;
    const colorMapping = isCategorical ? CATEGORY_CONFIG : CONFIG;
    const headlineMetric: ChartWidgetHeadlineMetric | undefined = args.showHeadlineMetric
      ? { value: '28,400', label: 'Total', delta: { value: '+12%', direction: 'up' } }
      : undefined;
    const referenceLines: ChartBarReferenceLine[] =
      args.chartType === 'bar' &&
      args.showReferenceLine &&
      (args.variant === 'vertical-single' || args.variant === 'horizontal-single')
        ? [{ value: 5000, name: 'Target' }]
        : [];
    return {
      props: {
        ...args,
        data,
        colorMapping,
        headlineMetric,
        referenceLines,
        lastClicked: '',
      },
      template: TEMPLATE,
    };
  },
};

export default meta;
type Story = StoryObj<ChartWidgetStoryArgs>;

/** Interactive playground — every control available, including `chartType`. */
export const Playground: Story = {};

export const VerticalSingle: Story = { args: { variant: 'vertical-single' } };
export const VerticalGrouped: Story = { args: { variant: 'vertical-grouped', title: 'Traffic by device' } };
export const VerticalStacked: Story = { args: { variant: 'vertical-stacked', title: 'Traffic by device' } };
export const HorizontalSingle: Story = {
  args: { variant: 'horizontal-single', title: 'Failed builds by stage' },
};
export const HorizontalStacked: Story = {
  args: { variant: 'horizontal-stacked', title: 'Traffic by device' },
};
export const Normalized: Story = {
  args: { variant: 'horizontal-stacked', normalized: true, title: 'Traffic share by device' },
};
export const Mini: Story = { args: { variant: 'mini', title: 'Inline sparkbar' } };

export const LineType: Story = { args: { chartType: 'line', title: 'Desktop sessions' } };
export const AreaType: Story = { args: { chartType: 'area', title: 'Desktop sessions' } };
export const AreaStackedType: Story = {
  args: { chartType: 'area', variant: 'vertical-stacked', title: 'Traffic by device' },
};
export const DonutType: Story = { args: { chartType: 'donut', title: 'Browser share' } };
export const RadarType: Story = { args: { chartType: 'radar', title: 'Desktop sessions' } };
export const RadialType: Story = { args: { chartType: 'radial', title: 'Browser share' } };

export const WithHeadlineMetric: Story = { args: { showHeadlineMetric: true } };
export const WithReferenceLine: Story = { args: { showReferenceLine: true } };

export const SmallDensity: Story = { args: { density: 'sm' } };
export const LargeDensity: Story = { args: { density: 'lg' } };

export const SortedByValue: Story = { args: { sortBy: 'value-desc' } };

export const Loading: Story = { args: { loadState: LoadState.Loading } };
export const ErrorState: Story = {
  args: { loadState: LoadState.Error, errorMessage: 'The build metrics service is unavailable.' },
};
export const NoPermission: Story = { args: { loadState: LoadState.NoPermission } };
export const EmptyState: Story = {
  render: (args) => ({
    props: { ...args, data: [], colorMapping: CONFIG, headlineMetric: undefined, referenceLines: [], lastClicked: '' },
    template: TEMPLATE,
  }),
};
export const SinglePoint: Story = {
  render: (args) => ({
    props: {
      ...args,
      data: [{ category: 'This week', value: 1240 }],
      colorMapping: CONFIG,
      headlineMetric: undefined,
      referenceLines: [],
      lastClicked: '',
    },
    template: TEMPLATE,
  }),
};
export const PartialData: Story = {
  args: { partialDataMessage: 'Cache and Network stages missing for this period.' },
};

/** Every bar variant side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      single: SINGLE_DATA,
      grouped: GROUPED_DATA,
      colorMapping: CONFIG,
    },
    template: `
      <div class="grid grid-cols-2 gap-6">
        <div style="width: 420px"><ui-chart-widget title="Vertical single" [data]="single" variant="vertical-single"></ui-chart-widget></div>
        <div style="width: 420px"><ui-chart-widget title="Vertical grouped" [data]="grouped" variant="vertical-grouped" [colorMapping]="colorMapping"></ui-chart-widget></div>
        <div style="width: 420px"><ui-chart-widget title="Vertical stacked" [data]="grouped" variant="vertical-stacked" [colorMapping]="colorMapping"></ui-chart-widget></div>
        <div style="width: 420px"><ui-chart-widget title="Horizontal single" [data]="single" variant="horizontal-single"></ui-chart-widget></div>
        <div style="width: 420px"><ui-chart-widget title="Horizontal stacked" [data]="grouped" variant="horizontal-stacked" [colorMapping]="colorMapping"></ui-chart-widget></div>
        <div style="width: 420px" class="flex flex-col justify-center"><ui-chart-widget title="Mini" [data]="single" variant="mini"></ui-chart-widget></div>
      </div>
    `,
  }),
};

/** Every chart type side by side, same widget chrome. */
export const ChartTypeGallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      single: SINGLE_DATA,
      category: CATEGORY_DATA,
      colorMapping: CONFIG,
      categoryMapping: CATEGORY_CONFIG,
    },
    template: `
      <div class="grid grid-cols-3 gap-6">
        <div style="width: 320px"><ui-chart-widget title="Bar" [data]="single" chartType="bar" [colorMapping]="colorMapping"></ui-chart-widget></div>
        <div style="width: 320px"><ui-chart-widget title="Line" [data]="single" chartType="line" [colorMapping]="colorMapping"></ui-chart-widget></div>
        <div style="width: 320px"><ui-chart-widget title="Area" [data]="single" chartType="area" [colorMapping]="colorMapping"></ui-chart-widget></div>
        <div style="width: 320px"><ui-chart-widget title="Donut" [data]="category" chartType="donut" [colorMapping]="categoryMapping"></ui-chart-widget></div>
        <div style="width: 320px"><ui-chart-widget title="Radar" [data]="single" chartType="radar" [colorMapping]="colorMapping"></ui-chart-widget></div>
        <div style="width: 320px"><ui-chart-widget title="Radial" [data]="category" chartType="radial" [colorMapping]="categoryMapping"></ui-chart-widget></div>
      </div>
    `,
  }),
};
