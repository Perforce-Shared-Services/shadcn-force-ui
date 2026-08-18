import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar15Block } from './sidebar-15.component';

/**
 * `@force-ui/sidebar-15` — "A left and right sidebar", the richest block in
 * the `sidebar-*` category (Figma node `5199:54560`). A left app-nav sidebar
 * (team switcher, main nav, favorites, workspaces, secondary nav, user
 * footer moved to the right panel's header) plus a right reference sidebar
 * (nav-user, a mini date-picker calendar, a togglable calendars list).
 * Composed entirely from `ui/sidebar`, `ui/breadcrumb`, `ui/separator`,
 * `ui/collapsible`, `ui/dropdown-menu`, `ui/calendar`, `ui/avatar`.
 */
const meta: Meta<Sidebar15Block> = {
  title: 'Blocks/sidebar/sidebar-15',
  component: Sidebar15Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar15Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-15></app-block-sidebar-15>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar15Block>;

export const Default: Story = {};
