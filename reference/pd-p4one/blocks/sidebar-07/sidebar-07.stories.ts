import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar07Block } from './sidebar-07.component';

/**
 * `@force-ui/sidebar-07` — a sidebar that collapses to icons. Composed
 * entirely from `ui/sidebar` (`collapsible="icon"`), `ui/breadcrumb`,
 * `ui/separator`, `ui/collapsible`, `ui/dropdown-menu`, `ui/avatar`.
 */
const meta: Meta<Sidebar07Block> = {
  title: 'Blocks/sidebar/sidebar-07',
  component: Sidebar07Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar07Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-07></app-block-sidebar-07>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar07Block>;

export const Default: Story = {};
