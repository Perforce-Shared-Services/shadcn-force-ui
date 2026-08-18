import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ChartGauge } from './';

interface ChartGaugeStoryArgs {
  value: number;
  min: number;
  max: number;
  unitLabel: string;
  useThresholds: boolean;
  warning: number;
  critical: number;
  color: string;
  showAxis: boolean;
}

const TEMPLATE = `
  <div style="width: 240px">
    <ui-chart-gauge
      [value]="value"
      [min]="min"
      [max]="max"
      [unitLabel]="unitLabel"
      [color]="color"
      [thresholds]="useThresholds ? { warning: warning, critical: critical } : undefined"
      [showAxis]="showAxis"
    ></ui-chart-gauge>
  </div>
`;

/**
 * `ui-chart-gauge` is built from `the-force-design-spec` MCP's
 * `gauge-chart.md` pattern — no Figma or shadcn source exists for a gauge
 * chart type (confirmed against Figma's `Chart / <Type>` component set,
 * which has 7 types and no gauge). See `ChartGaugeComponent`'s doc comment
 * for why the spec is used directly here, the one exception in this chart
 * set. First pass: `standard` (flat color) and `threshold-zones` (color by
 * safe/warning/critical). `with-target`/`mini`/`kpi-with-delta`/
 * `target-zone` are deferred.
 */
const meta: Meta<ChartGaugeStoryArgs> = {
  title: 'UI/Chart/Gauge',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChartGauge] })],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    min: { control: 'number' },
    max: { control: 'number' },
    unitLabel: { control: 'text' },
    useThresholds: { control: 'boolean', description: 'colors the arc by safe/warning/critical zone instead of a flat color' },
    warning: { control: 'number' },
    critical: { control: 'number' },
    color: { control: 'color' },
    showAxis: { control: 'boolean' },
  },
  args: {
    value: 62,
    min: 0,
    max: 100,
    unitLabel: 'CPU',
    useThresholds: false,
    warning: 60,
    critical: 85,
    color: 'var(--chart-1)',
    showAxis: true,
  },
  render: (args) => ({ props: { ...args }, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<ChartGaugeStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

/** `standard` — flat color, no zone thresholds. */
export const Standard: Story = {};

/** `threshold-zones` — arc colored safe/warning/critical by value. */
export const ThresholdZones: Story = { args: { useThresholds: true, value: 72 } };

/** `threshold-zones` at a critical value. */
export const ThresholdZonesCritical: Story = { args: { useThresholds: true, value: 92 } };

export const NoAxis: Story = { args: { showAxis: false } };

/** Standard, warning-zone, and critical-zone side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-6">
        <div><p class="mb-1 text-xs font-medium">Standard</p><ui-chart-gauge [value]="62" [unitLabel]="'CPU'" color="var(--chart-1)"></ui-chart-gauge></div>
        <div><p class="mb-1 text-xs font-medium">Warning zone</p><ui-chart-gauge [value]="72" [unitLabel]="'CPU'" [thresholds]="{ warning: 60, critical: 85 }"></ui-chart-gauge></div>
        <div><p class="mb-1 text-xs font-medium">Critical zone</p><ui-chart-gauge [value]="92" [unitLabel]="'CPU'" [thresholds]="{ warning: 60, critical: 85 }"></ui-chart-gauge></div>
      </div>
    `,
  }),
};
