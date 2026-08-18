import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Dashboard01Block } from './dashboard-01.component';

/**
 * `@force-ui/dashboard-01` — a full analytics-dashboard page (Figma node
 * `17455:139010`): an inset sidebar, a site header, 4 KPI cards, a "Total
 * Visitors" area chart with a 3-way range toggle, and a data table with
 * drag-to-reorder rows, a row-detail drawer, column visibility, and
 * pagination.
 *
 * `layout: 'fullscreen'` — same convention as `sidebar-08`: the root sizes
 * itself to `h-screen`, matching the real viewport, so Storybook's own
 * padding/centering wrapper (which would otherwise collapse a Block's
 * `w-full` root to near-zero — see the port-shadcn-block skill's documented
 * `centered`-layout gotcha) is removed entirely rather than swapped for a
 * fixed-height workaround.
 */
const meta: Meta<Dashboard01Block> = {
  title: 'Blocks/dashboard/dashboard-01',
  component: Dashboard01Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Dashboard01Block] }),
  ],
  render: () => ({
    template: `<app-block-dashboard-01></app-block-dashboard-01>`,
  }),
};

export default meta;
type Story = StoryObj<Dashboard01Block>;

export const Default: Story = {};
