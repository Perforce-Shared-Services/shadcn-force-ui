import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar09Block } from './sidebar-09.component';

/**
 * `@force-ui/sidebar-09` — "Collapsible nested sidebars", a Gmail-style
 * two-pane shell: a narrow icon-rail sidebar (mail folders) sits beside a
 * second, wider sidebar (the selected folder's mail list), both nested
 * inside one `ui/sidebar` icon-collapsible shell next to the usual
 * `SidebarInset` reading pane. Composed entirely from `ui/sidebar`,
 * `ui/breadcrumb`, `ui/separator`, `ui/dropdown-menu`, `ui/avatar`,
 * `ui/switch`, `ui/label`, `ui/tooltip`.
 */
const meta: Meta<Sidebar09Block> = {
  title: 'Blocks/sidebar/sidebar-09',
  component: Sidebar09Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar09Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-09></app-block-sidebar-09>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar09Block>;

export const Default: Story = {};
