import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ChartLine } from './';
import type { ChartConfig, ChartLineCurve, ChartSeriesDatum } from './';

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

interface ChartLineStoryArgs {
  curve: ChartLineCurve;
  multi: boolean;
  showGrid: boolean;
  legend: boolean;
  tooltip: boolean;
}

const TEMPLATE = `
  <div style="width: 480px">
    <ui-chart-line [data]="multi ? multiData : singleData" [colorMapping]="colorMapping" [curve]="curve" [showGrid]="showGrid" [legend]="legend" [tooltip]="tooltip"></ui-chart-line>
  </div>
`;

/**
 * `ui-chart-line` is the Angular port of Figma's `Chart / Line Chart`
 * component (docs linked to `ui.shadcn.com/charts#line-chart`) — the
 * cross-framework "chart type" building block. `curve` covers Basic/Linear/
 * Step, multi-series `data` covers Multiple. Dots/Dots Colors/Label variants
 * are deliberately not implemented — see `ChartLineComponent`'s doc comment.
 */
const meta: Meta<ChartLineStoryArgs> = {
  title: 'UI/Chart/Line',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CommonModule, ChartLine] })],
  argTypes: {
    curve: { control: 'select', options: ['smooth', 'linear', 'step'] },
    multi: { control: 'boolean', description: 'renders two series ("Multiple")' },
    showGrid: { control: 'boolean' },
    legend: { control: 'boolean' },
    tooltip: { control: 'boolean' },
  },
  args: { curve: 'smooth', multi: false, showGrid: true, legend: true, tooltip: true },
  render: (args) => ({
    props: { ...args, singleData: SINGLE_DATA, multiData: MULTI_DATA, colorMapping: CONFIG },
    template: TEMPLATE,
  }),
};

export default meta;
type Story = StoryObj<ChartLineStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

/** Figma "Basic" — smooth curve, single series. */
export const Basic: Story = { args: { curve: 'smooth' } };

/** Figma "Linear" — straight segments. */
export const Linear: Story = { args: { curve: 'linear' } };

/** Figma "Step" — staircase curve. */
export const Step: Story = { args: { curve: 'step' } };

/** Figma "Multiple" — two overlaid series with a legend. */
export const Multiple: Story = { args: { multi: true } };

export const NoGrid: Story = { args: { showGrid: false } };
export const NoLegend: Story = { args: { legend: false } };

/** Basic, Linear, Step, and Multiple side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { singleData: SINGLE_DATA, multiData: MULTI_DATA, colorMapping: CONFIG },
    template: `
      <div class="grid grid-cols-2 gap-6">
        <div><p class="mb-1 text-xs font-medium">Basic (smooth)</p><ui-chart-line [data]="singleData" [colorMapping]="colorMapping" curve="smooth"></ui-chart-line></div>
        <div><p class="mb-1 text-xs font-medium">Linear</p><ui-chart-line [data]="singleData" [colorMapping]="colorMapping" curve="linear"></ui-chart-line></div>
        <div><p class="mb-1 text-xs font-medium">Step</p><ui-chart-line [data]="singleData" [colorMapping]="colorMapping" curve="step"></ui-chart-line></div>
        <div><p class="mb-1 text-xs font-medium">Multiple</p><ui-chart-line [data]="multiData" [colorMapping]="colorMapping"></ui-chart-line></div>
      </div>
    `,
  }),
};
