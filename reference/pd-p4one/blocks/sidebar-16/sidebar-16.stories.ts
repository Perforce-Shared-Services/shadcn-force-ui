import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar16Block } from './sidebar-16.component';

/**
 * `@force-ui/sidebar-16` — a sidebar with a sticky site header. Composed
 * entirely from `ui/sidebar`, `ui/breadcrumb`, `ui/separator`,
 * `ui/collapsible`, `ui/dropdown-menu`, `ui/avatar`, `ui/label`. The header
 * lives above the sidebar+inset row (not inside the inset) and stays
 * `sticky top-0` within the story's scroll container.
 */
const meta: Meta<Sidebar16Block> = {
  title: 'Blocks/sidebar/sidebar-16',
  component: Sidebar16Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar16Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-16></app-block-sidebar-16>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar16Block>;

export const Default: Story = {};
