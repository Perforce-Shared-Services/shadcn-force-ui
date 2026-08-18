import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Sidebar04Block } from './sidebar-04.component';

/**
 * `@force-ui/sidebar-04` — a floating sidebar with submenus. Composed
 * entirely from `ui/sidebar`, `ui/breadcrumb`, `ui/separator` (Figma node
 * `5199:54299`).
 */
const meta: Meta<Sidebar04Block> = {
  title: 'Blocks/sidebar/sidebar-04',
  component: Sidebar04Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [moduleMetadata({ imports: [Sidebar04Block] })],
  render: () => ({
    template: `<app-block-sidebar-04></app-block-sidebar-04>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar04Block>;

export const Default: Story = {};
