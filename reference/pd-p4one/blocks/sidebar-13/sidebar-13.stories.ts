import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRdxDialogConfig } from '@radix-ng/primitives/dialog';

import { Sidebar13Block } from './sidebar-13.component';

/**
 * `@force-ui/sidebar-13` — "A sidebar in a dialog". Unlike the other
 * sidebar-* blocks this isn't a page shell: it's a trigger button that opens
 * a `ui/dialog` whose content is a settings panel with its own left-hand
 * `ui/sidebar` (`collapsible="none"`) section list. See the component's doc
 * comment for why it skips the page-level a11y baseline (skip-link, main
 * landmark) the full-page sidebar blocks carry.
 */
const meta: Meta<Sidebar13Block> = {
  title: 'Blocks/sidebar/sidebar-13',
  component: Sidebar13Block,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: [Sidebar13Block] }),
  ],
  render: () => ({
    template: `
      <div class="flex h-[600px] items-center justify-center rounded-lg border border-border">
        <app-block-sidebar-13></app-block-sidebar-13>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Sidebar13Block>;

export const Default: Story = {};
