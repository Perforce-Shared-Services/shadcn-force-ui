import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar08Block } from './sidebar-08.component';

/**
 * `@force-ui/sidebar-08` — an inset sidebar (`variant="inset"`) with a
 * collapsible primary nav, a project list with per-row overflow menus, a
 * secondary/support nav pinned to the bottom, and a user-profile footer with
 * an avatar dropdown (Figma node `5199:54404`). Composed entirely from
 * `ui/sidebar`, `ui/collapsible`, `ui/dropdown-menu`, `ui/avatar`,
 * `ui/breadcrumb`, `ui/separator`.
 */
const meta: Meta<Sidebar08Block> = {
  title: 'Blocks/sidebar/sidebar-08',
  component: Sidebar08Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar08Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-08></app-block-sidebar-08>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar08Block>;

export const Default: Story = {};
