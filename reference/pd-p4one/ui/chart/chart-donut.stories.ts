import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ChartDonut } from './';
import type { ChartConfig, ChartValueDatum } from './chart.types';

// Canonical shadcn chart-example.tsx pie-chart data (registry/radix-force-ui/examples/chart-example.tsx).
const BROWSER_DATA: ChartValueDatum[] = [
  { category: 'chrome', value: 275 },
  { category: 'safari', value: 200 },
  { category: 'firefox', value: 287 },
  { category: 'edge', value: 173 },
  { category: 'other', value: 190 },
];

const CONFIG: ChartConfig = {
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
  other: { label: 'Other', color: 'var(--chart-5)' },
};

interface ChartDonutStoryArgs {
  donut: boolean;
  showCenter: boolean;
  showPercentage: boolean;
  legend: boolean;
  tooltip: boolean;
}

const TEMPLATE = `
  <div style="width: 320px">
    <ui-chart-donut
      [data]="data"
      [colorMapping]="colorMapping"
      [donut]="donut"
      [centerValue]="showCenter ? total : undefined"
      [centerLabel]="showCenter ? 'Visitors' : undefined"
      [showPercentage]="showPercentage"
      [legend]="legend"
      [tooltip]="tooltip"
      (markClick)="lastClicked = $event.category + ': ' + $event.value"
    ></ui-chart-donut>
    <p *ngIf="lastClicked" class="mt-2 text-xs text-muted-foreground">Last event: {{ lastClicked }}</p>
  </div>
`;

/**
 * `ui-chart-donut` is the Angular port of Figma's `Chart / Pie Chart / Donut`
 * and `/ Full` components (docs linked to `ui.shadcn.com/charts#pie-chart`)
 * — the cross-framework "chart type" building block. One flexible component
 * + flags (`donut`, `centerValue`/`centerLabel`, `showPercentage`), matching
 * how `ui-chart-bar` was built. No dashboard-widget layer yet (title/states/
 * action-menu) — see `ChartDonutComponent`'s doc comment for why, and
 * `.claude/branch-context.md` for the architecture this follows.
 */
const meta: Meta<ChartDonutStoryArgs> = {
  title: 'UI/Chart/Donut',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CommonModule, ChartDonut] })],
  argTypes: {
    donut: { control: 'boolean', description: 'false renders a solid pie instead of a ring' },
    showCenter: { control: 'boolean', description: 'donut only — value + label in the ring hole' },
    showPercentage: { control: 'boolean' },
    legend: { control: 'boolean' },
    tooltip: { control: 'boolean' },
  },
  args: {
    donut: true,
    showCenter: false,
    showPercentage: true,
    legend: true,
    tooltip: true,
  },
  render: (args) => {
    const total = BROWSER_DATA.reduce((sum, d) => sum + d.value, 0);
    return {
      props: { ...args, data: BROWSER_DATA, colorMapping: CONFIG, total: total.toLocaleString(), lastClicked: '' },
      template: TEMPLATE,
    };
  },
};

export default meta;
type Story = StoryObj<ChartDonutStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

/** Figma "Donut / Basic" with the centre value + label filled in. */
export const CenterKpi: Story = { args: { showCenter: true } };

/** Figma "Pie Chart / Full" — solid pie, no ring. */
export const SolidPie: Story = { args: { donut: false } };

export const NoLegend: Story = { args: { legend: false } };
export const NoPercentage: Story = { args: { showPercentage: false } };

/** Donut, solid pie, and centre-KPI side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const total = BROWSER_DATA.reduce((sum, d) => sum + d.value, 0);
    return {
      props: { data: BROWSER_DATA, colorMapping: CONFIG, total: total.toLocaleString() },
      template: `
        <div class="grid grid-cols-3 gap-6">
          <div><p class="mb-1 text-xs font-medium">Donut</p><ui-chart-donut [data]="data" [colorMapping]="colorMapping"></ui-chart-donut></div>
          <div><p class="mb-1 text-xs font-medium">Centre KPI</p><ui-chart-donut [data]="data" [colorMapping]="colorMapping" [centerValue]="total" centerLabel="Visitors"></ui-chart-donut></div>
          <div><p class="mb-1 text-xs font-medium">Solid pie</p><ui-chart-donut [data]="data" [colorMapping]="colorMapping" [donut]="false"></ui-chart-donut></div>
        </div>
      `,
    };
  },
};
