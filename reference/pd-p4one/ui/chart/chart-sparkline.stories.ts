import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ChartSparkline } from './';
import type { ChartValueDatum } from './';

const DATA: ChartValueDatum[] = [4, 6, 5, 9, 7, 11, 8, 13, 10, 15].map((value, i) => ({
  category: `p${i}`,
  value,
}));

interface ChartSparklineStoryArgs {
  variant: 'line' | 'area' | 'bar';
  color: string;
  tooltip: boolean;
}

const TEMPLATE = `
  <ui-chart-sparkline [data]="data" [variant]="variant" [color]="color" [tooltip]="tooltip"></ui-chart-sparkline>
`;

/**
 * `ui-chart-sparkline` is the Angular port of `the-force-design-spec` MCP's
 * `sparkline.md` pattern — chrome-stripped Line/Area/Bar for embedding in a
 * KPI tile or table row. Not a distinct Figma/shadcn chart type — see
 * `ChartSparklineComponent`'s doc comment.
 */
const meta: Meta<ChartSparklineStoryArgs> = {
  title: 'UI/Chart/Sparkline',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChartSparkline] })],
  argTypes: {
    variant: { control: 'select', options: ['line', 'area', 'bar'] },
    color: { control: 'color' },
    tooltip: { control: 'boolean' },
  },
  args: { variant: 'line', color: 'var(--chart-1)', tooltip: false },
  render: (args) => ({ props: { ...args, data: DATA }, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<ChartSparklineStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

export const Line: Story = { args: { variant: 'line' } };
export const Area: Story = { args: { variant: 'area' } };
export const Bar: Story = { args: { variant: 'bar' } };

/** `in-kpi-tile` composition — sparkline next to a headline number, per sparkline.md. */
export const InKpiTile: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { data: DATA },
    template: `
      <div class="flex items-center gap-3 rounded-lg border border-border p-3">
        <div>
          <div class="text-2xl font-bold text-foreground">1,284</div>
          <div class="text-xs text-muted-foreground">Active sessions</div>
        </div>
        <ui-chart-sparkline [data]="data" variant="area" color="var(--chart-2)"></ui-chart-sparkline>
      </div>
    `,
  }),
};

/** Line, area, and bar side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { data: DATA },
    template: `
      <div class="flex items-center gap-6">
        <div><p class="mb-1 text-xs font-medium">Line</p><ui-chart-sparkline [data]="data" variant="line"></ui-chart-sparkline></div>
        <div><p class="mb-1 text-xs font-medium">Area</p><ui-chart-sparkline [data]="data" variant="area"></ui-chart-sparkline></div>
        <div><p class="mb-1 text-xs font-medium">Bar</p><ui-chart-sparkline [data]="data" variant="bar"></ui-chart-sparkline></div>
      </div>
    `,
  }),
};
