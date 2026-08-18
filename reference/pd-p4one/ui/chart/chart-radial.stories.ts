import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ChartRadial } from './';
import type { ChartConfig, ChartValueDatum } from './';

// Canonical shadcn chart-example.tsx browser-share dataset.
const MULTI_DATA: ChartValueDatum[] = [
  { category: 'chrome', value: 275 },
  { category: 'safari', value: 200 },
  { category: 'firefox', value: 187 },
  { category: 'edge', value: 173 },
  { category: 'other', value: 90 },
];

const SINGLE_DATA: ChartValueDatum[] = [{ category: 'visitors', value: 200 }];

const CONFIG: ChartConfig = {
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'var(--chart-5)' },
  visitors: { label: 'Visitors', color: 'var(--chart-2)' },
};

interface ChartRadialStoryArgs {
  single: boolean;
  showAxis: boolean;
  legend: boolean;
}

const TEMPLATE = `
  <div style="width: 280px">
    <ui-chart-radial
      [data]="single ? singleData : multiData"
      [colorMapping]="colorMapping"
      [showAxis]="showAxis"
      [legend]="legend"
    ></ui-chart-radial>
  </div>
`;

/**
 * `ui-chart-radial` is the Angular port of Figma's `Chart / Radial Chart`
 * component (docs linked to `ui.shadcn.com/charts#radial-chart`) — the
 * cross-framework "chart type" building block, built on `GaugeComponent`.
 * See `ChartRadialComponent`'s doc comment for the deferred Label/Grid/
 * Stacked variants.
 */
const meta: Meta<ChartRadialStoryArgs> = {
  title: 'UI/Chart/Radial',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CommonModule, ChartRadial] })],
  argTypes: {
    single: { control: 'boolean', description: 'one ring + centered value ("Text"/"Shape") vs multi-ring ("Basic")' },
    showAxis: { control: 'boolean' },
    legend: { control: 'boolean' },
  },
  args: { single: false, showAxis: false, legend: true },
  render: (args) => ({
    props: { ...args, singleData: SINGLE_DATA, multiData: MULTI_DATA, colorMapping: CONFIG },
    template: TEMPLATE,
  }),
};

export default meta;
type Story = StoryObj<ChartRadialStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

/** Figma "Basic" — one concentric ring per category. */
export const Basic: Story = {};

/** Figma "Text"/"Shape" — single ring, centered value + label. */
export const CenterKpi: Story = { args: { single: true } };

export const NoLegend: Story = { args: { legend: false } };

/** Basic and centre-KPI side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { singleData: SINGLE_DATA, multiData: MULTI_DATA, colorMapping: CONFIG },
    template: `
      <div class="grid grid-cols-2 gap-6">
        <div><p class="mb-1 text-xs font-medium">Basic</p><ui-chart-radial [data]="multiData" [colorMapping]="colorMapping"></ui-chart-radial></div>
        <div><p class="mb-1 text-xs font-medium">Text / Shape</p><ui-chart-radial [data]="singleData" [colorMapping]="colorMapping"></ui-chart-radial></div>
      </div>
    `,
  }),
};
