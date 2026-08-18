import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar10Block } from './sidebar-10.component';

/**
 * `@force-ui/sidebar-10` — "A sidebar in a popover". A Notion-style workspace
 * shell: team switcher, primary nav, favorites, collapsible workspace groups
 * with sub-pages, secondary utility nav, and a header overflow menu whose
 * content is a small `ui/sidebar` instance rendered inside a `ui/popover`
 * (the block's actual "in a popover" part — see the component's doc comment
 * for why the popover is scoped to that one menu, not the whole sidebar).
 */
const meta: Meta<Sidebar10Block> = {
  title: 'Blocks/sidebar/sidebar-10',
  component: Sidebar10Block,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar10Block] }),
  ],
  render: () => ({
    template: `<app-block-sidebar-10></app-block-sidebar-10>`,
  }),
};

export default meta;
type Story = StoryObj<Sidebar10Block>;

export const Default: Story = {};
