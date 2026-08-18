import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar12Block } from './sidebar-12.component';

/**
 * `@force-ui/sidebar-12` — "A sidebar with a calendar". A `nav-user`
 * avatar-dropdown header, a `ui/calendar` date picker, three collapsible
 * calendar-list groups, and a footer "New Calendar" action. Structurally
 * close to `sidebar-01`'s shell.
 */
const meta: Meta<Sidebar12Block> = {
  title: 'Blocks/sidebar/sidebar-12',
  component: Sidebar12Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar12Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-12></app-block-sidebar-12>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar12Block>;

export const Default: Story = {};
