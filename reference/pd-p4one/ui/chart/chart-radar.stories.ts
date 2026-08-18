import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ChartRadar } from './';
import type { ChartConfig, ChartSeriesDatum } from './';

// Canonical shadcn chart-example.tsx "desktop"/"mobile" monthly dataset, flattened to ChartSeriesDatum[].
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June'];
const DESKTOP = [186, 305, 237, 73, 209, 214];
const MOBILE = [80, 200, 120, 190, 130, 140];

const SINGLE_DATA: ChartSeriesDatum[] = MONTHS.map((category, i) => ({ category, value: DESKTOP[i] }));

const MULTI_DATA: ChartSeriesDatum[] = MONTHS.flatMap((category, i) => [
  { category, value: DESKTOP[i], series: 'Desktop' },
  { category, value: MOBILE[i], series: 'Mobile' },
]);

const CONFIG: ChartConfig = {
  Value: { label: 'Desktop', color: 'var(--chart-1)' },
  Desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  Mobile: { label: 'Mobile', color: 'var(--chart-2)' },
};

interface ChartRadarStoryArgs {
  multi: boolean;
  filled: boolean;
  showAxis: boolean;
  showGrid: boolean;
  legend: boolean;
}

const TEMPLATE = `
  <div style="width: 320px">
    <ui-chart-radar
      [data]="multi ? multiData : singleData"
      [colorMapping]="colorMapping"
      [filled]="filled"
      [showAxis]="showAxis"
      [showGrid]="showGrid"
      [legend]="legend"
    ></ui-chart-radar>
  </div>
`;

/**
 * `ui-chart-radar` is the Angular port of Figma's `Chart / Radar Chart`
 * component (docs linked to `ui.shadcn.com/charts#radar-chart`) — the
 * cross-framework "chart type" building block. See `ChartRadarComponent`'s
 * doc comment for the grid-shape and always-on-dots deviations from Figma
 * (native `PolarChartComponent` limits, not oversights).
 */
const meta: Meta<ChartRadarStoryArgs> = {
  title: 'UI/Chart/Radar',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CommonModule, ChartRadar] })],
  argTypes: {
    multi: { control: 'boolean', description: 'renders two overlaid series ("Multiple")' },
    filled: { control: 'boolean', description: 'false = outline-only ("Dots"/"Lines Only")' },
    showAxis: { control: 'boolean' },
    showGrid: { control: 'boolean' },
    legend: { control: 'boolean' },
  },
  args: { multi: false, filled: true, showAxis: true, showGrid: true, legend: true },
  render: (args) => ({
    props: { ...args, singleData: SINGLE_DATA, multiData: MULTI_DATA, colorMapping: CONFIG },
    template: TEMPLATE,
  }),
};

export default meta;
type Story = StoryObj<ChartRadarStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

/** Figma "Basic" — single series, filled polygon. */
export const Basic: Story = {};

/** Figma "Lines Only" — outline, no fill. */
export const LinesOnly: Story = { args: { filled: false } };

/** Figma "Multiple" — two overlaid series with a legend. */
export const Multiple: Story = { args: { multi: true } };

export const NoGrid: Story = { args: { showGrid: false } };
export const NoLegend: Story = { args: { legend: false } };

/** Basic, Lines Only, and Multiple side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { singleData: SINGLE_DATA, multiData: MULTI_DATA, colorMapping: CONFIG },
    template: `
      <div class="grid grid-cols-3 gap-6">
        <div><p class="mb-1 text-xs font-medium">Basic</p><ui-chart-radar [data]="singleData" [colorMapping]="colorMapping"></ui-chart-radar></div>
        <div><p class="mb-1 text-xs font-medium">Lines Only</p><ui-chart-radar [data]="singleData" [colorMapping]="colorMapping" [filled]="false"></ui-chart-radar></div>
        <div><p class="mb-1 text-xs font-medium">Multiple</p><ui-chart-radar [data]="multiData" [colorMapping]="colorMapping"></ui-chart-radar></div>
      </div>
    `,
  }),
};
