import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ChartArea } from './';
import type { ChartConfig, ChartLineCurve, ChartSeriesDatum } from './';

// Canonical shadcn chart-example.tsx "desktop"/"mobile" monthly dataset, flattened to ChartSeriesDatum[].
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June'];
const DESKTOP = [186, 305, 237, 73, 209, 214];
const MOBILE = [80, 200, 120, 190, 130, 140];
const TABLET = [120, 90, 60, 150, 100, 80];

const SINGLE_DATA: ChartSeriesDatum[] = MONTHS.map((category, i) => ({ category, value: DESKTOP[i] }));

const STACKED_DATA: ChartSeriesDatum[] = MONTHS.flatMap((category, i) => [
  { category, value: DESKTOP[i], series: 'Desktop' },
  { category, value: MOBILE[i], series: 'Mobile' },
]);

const EXPANDED_DATA: ChartSeriesDatum[] = MONTHS.flatMap((category, i) => [
  { category, value: DESKTOP[i], series: 'Desktop' },
  { category, value: MOBILE[i], series: 'Mobile' },
  { category, value: TABLET[i], series: 'Tablet' },
]);

const CONFIG: ChartConfig = {
  Value: { label: 'Desktop', color: 'var(--chart-1)' },
  Desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  Mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  Tablet: { label: 'Tablet', color: 'var(--chart-3)' },
};

interface ChartAreaStoryArgs {
  curve: ChartLineCurve;
  stacked: boolean;
  normalized: boolean;
  gradient: boolean;
  legend: boolean;
}

const TEMPLATE = `
  <div style="width: 480px">
    <ui-chart-area
      [data]="normalized ? expandedData : stacked ? stackedData : singleData"
      [colorMapping]="colorMapping"
      [curve]="curve"
      [stacked]="stacked || normalized"
      [normalized]="normalized"
      [gradient]="gradient"
      [legend]="legend"
    ></ui-chart-area>
  </div>
`;

/**
 * `ui-chart-area` is the Angular port of Figma's `Chart / Area Chart`
 * component (docs linked to `ui.shadcn.com/charts#area-chart`) — the
 * cross-framework "chart type" building block. `curve` covers Basic/Linear/
 * Step, `stacked`/`normalized` cover Stacked/Stacked Expanded, `gradient` is
 * the independent Figma `Gradient=Yes/No` axis.
 */
const meta: Meta<ChartAreaStoryArgs> = {
  title: 'UI/Chart/Area',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CommonModule, ChartArea] })],
  argTypes: {
    curve: { control: 'select', options: ['smooth', 'linear', 'step'] },
    stacked: { control: 'boolean' },
    normalized: { control: 'boolean', description: '100%-stacked ("Stacked Expanded") — implies stacked' },
    gradient: { control: 'boolean' },
    legend: { control: 'boolean' },
  },
  args: { curve: 'smooth', stacked: false, normalized: false, gradient: false, legend: true },
  render: (args) => ({
    props: { ...args, singleData: SINGLE_DATA, stackedData: STACKED_DATA, expandedData: EXPANDED_DATA, colorMapping: CONFIG },
    template: TEMPLATE,
  }),
};

export default meta;
type Story = StoryObj<ChartAreaStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

/** Figma "Basic" — smooth curve, single series. */
export const Basic: Story = { args: { curve: 'smooth' } };

/** Figma "Linear" — straight segments. */
export const Linear: Story = { args: { curve: 'linear' } };

/** Figma "Step" — staircase curve. */
export const Step: Story = { args: { curve: 'step' } };

/** Figma "Stacked" — two series stacked. */
export const Stacked: Story = { args: { stacked: true } };

/** Figma "Stacked Expanded" — three series, 100%-normalized. */
export const StackedExpanded: Story = { args: { stacked: true, normalized: true } };

/** Figma `Gradient=Yes` — fading fill from top to baseline. */
export const Gradient: Story = { args: { gradient: true } };

export const NoLegend: Story = { args: { legend: false } };

/** Basic, Stacked, Stacked Expanded, and Gradient side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { singleData: SINGLE_DATA, stackedData: STACKED_DATA, expandedData: EXPANDED_DATA, colorMapping: CONFIG },
    template: `
      <div class="grid grid-cols-2 gap-6">
        <div><p class="mb-1 text-xs font-medium">Basic</p><ui-chart-area [data]="singleData" [colorMapping]="colorMapping"></ui-chart-area></div>
        <div><p class="mb-1 text-xs font-medium">Stacked</p><ui-chart-area [data]="stackedData" [colorMapping]="colorMapping" [stacked]="true"></ui-chart-area></div>
        <div><p class="mb-1 text-xs font-medium">Stacked Expanded</p><ui-chart-area [data]="expandedData" [colorMapping]="colorMapping" [stacked]="true" [normalized]="true"></ui-chart-area></div>
        <div><p class="mb-1 text-xs font-medium">Gradient</p><ui-chart-area [data]="singleData" [colorMapping]="colorMapping" [gradient]="true"></ui-chart-area></div>
      </div>
    `,
  }),
};
