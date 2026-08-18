import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar06Block } from './sidebar-06.component';

/**
 * `@force-ui/sidebar-06` — a sidebar with submenus as dropdowns (Figma node
 * `5199:54352`): composed entirely from `ui/sidebar`, `ui/breadcrumb`,
 * `ui/separator`, `ui/card`, `ui/button`, `ui/dropdown-menu`.
 * `provideRdxDialogConfig()` is required here for the dropdown overlay
 * infrastructure (same as `sidebar-01`'s version-switcher dropdown).
 */
const meta: Meta<Sidebar06Block> = {
  title: 'Blocks/sidebar/sidebar-06',
  component: Sidebar06Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar06Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-06></app-block-sidebar-06>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar06Block>;

export const Default: Story = {};
