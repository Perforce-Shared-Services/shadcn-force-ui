import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Sidebar03Block } from './sidebar-03.component';

/**
 * `@force-ui/sidebar-03` — a sidebar with submenus. Composed entirely from
 * `ui/sidebar`, `ui/breadcrumb`, `ui/separator` (Figma node `5199:54273`).
 */
const meta: Meta<Sidebar03Block> = {
  title: 'Blocks/sidebar/sidebar-03',
  component: Sidebar03Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [moduleMetadata({ imports: [Sidebar03Block] })],
  render: () => ({
    template: `<app-block-sidebar-03></app-block-sidebar-03>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar03Block>;

export const Default: Story = {};
