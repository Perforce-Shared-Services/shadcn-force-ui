import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Sidebar14Block } from './sidebar-14.component';

/**
 * `@force-ui/sidebar-14` — a sidebar docked on the right with a two-level
 * table of contents (Figma node `5199:54540`). Composed entirely from
 * `ui/sidebar` + `ui/breadcrumb`.
 */
const meta: Meta<Sidebar14Block> = {
  title: 'Blocks/sidebar/sidebar-14',
  component: Sidebar14Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [moduleMetadata({ imports: [Sidebar14Block] })],
  render: () => ({
    template: `<app-block-sidebar-14></app-block-sidebar-14>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar14Block>;

export const Default: Story = {};
