import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar11Block } from './sidebar-11.component';

/**
 * `@force-ui/sidebar-11` — an uncommitted-changes list plus a collapsible
 * file tree. Figma node `TBD` (not yet mapped in `figma-blocks-map.json`
 * beyond the description). Composed entirely from `ui/sidebar` +
 * `ui/collapsible`; the recursive tree uses a self-referencing
 * `<ng-template>` + `ngTemplateOutlet` (see the component's doc comment).
 */
const meta: Meta<Sidebar11Block> = {
  title: 'Blocks/sidebar/sidebar-11',
  component: Sidebar11Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar11Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-11></app-block-sidebar-11>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar11Block>;

export const Default: Story = {};
