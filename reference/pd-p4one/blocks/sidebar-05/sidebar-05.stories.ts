import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar05Block } from './sidebar-05.component';

/**
 * `@force-ui/sidebar-05` — a sidebar with collapsible submenus (Figma node
 * `5199:54326`): composed entirely from `ui/sidebar`, `ui/breadcrumb`,
 * `ui/separator`, `ui/label`, `ui/collapsible`.
 */
const meta: Meta<Sidebar05Block> = {
  title: 'Blocks/sidebar/sidebar-05',
  component: Sidebar05Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar05Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-05></app-block-sidebar-05>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar05Block>;

export const Default: Story = {};
