import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar02Block } from './sidebar-02.component';

/**
 * `@force-ui/sidebar-02` — a sidebar with collapsible nav sections, a
 * version-switcher dropdown, and a search field (Figma node `5199:54247`).
 * Composed entirely from `ui/sidebar`, `ui/collapsible`, `ui/breadcrumb`,
 * `ui/separator`, `ui/label`, `ui/dropdown-menu`.
 */
const meta: Meta<Sidebar02Block> = {
  title: 'Blocks/sidebar/sidebar-02',
  component: Sidebar02Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar02Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-02></app-block-sidebar-02>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar02Block>;

export const Default: Story = {};
