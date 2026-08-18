import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar01Block } from './sidebar-01.component';

/**
 * `@force-ui/sidebar-01` — a simple sidebar with a version-switcher dropdown,
 * a search field, and navigation grouped by section. Pilot block for the
 * `sidebar-*` category (Figma node `5199:54221`): composed entirely from
 * `ui/sidebar`, `ui/breadcrumb`, `ui/separator`, `ui/label`, `ui/dropdown-menu`.
 */
const meta: Meta<Sidebar01Block> = {
  title: 'Blocks/sidebar/sidebar-01',
  component: Sidebar01Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar01Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-01></app-block-sidebar-01>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar01Block>;

export const Default: Story = {};
