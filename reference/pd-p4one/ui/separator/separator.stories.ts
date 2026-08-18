import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Separator, type SeparatorOrientation } from './';

const ORIENTATIONS: SeparatorOrientation[] = ['horizontal', 'vertical'];

interface SeparatorStoryArgs {
  orientation: SeparatorOrientation;
  decorative: boolean;
}

/**
 * `[uiSeparator]` is the Angular port of the Force UI (radix-force-ui)
 * separator — a thin `base/border` divider. Attribute selector on a `<div>`, so
 * stories render a real `<div uiSeparator>` and bind the `orientation` /
 * `decorative` signal inputs.
 *
 * Accessibility: it defaults to `decorative` (role `none`, out of the a11y
 * tree) like the Force UI registry, because most dividers are purely visual.
 * Set `[decorative]="false"` only when the line genuinely separates two
 * meaningful regions you want announced — then it gets role `separator` (and
 * `aria-orientation="vertical"` when vertical).
 */
const meta: Meta<SeparatorStoryArgs> = {
  title: 'UI/Separator',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Separator] })],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ORIENTATIONS,
      description:
        '`horizontal` (default) spans full width at 1px tall; `vertical` is 1px wide and stretches to its container height.',
      table: {
        type: { summary: ORIENTATIONS.join(' | ') },
        defaultValue: { summary: 'horizontal' },
      },
    },
    decorative: {
      control: 'boolean',
      description:
        'When true (default) the divider is purely visual: role `none`, removed from the accessibility tree. Set false for a semantic separator (role `separator`).',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => ({
    props: args,
    template:
      args.orientation === 'vertical'
        ? `
      <div class="flex h-12 items-center gap-3 text-sm text-foreground">
        <span>Main</span>
        <div uiSeparator [orientation]="orientation" [decorative]="decorative"></div>
        <span>Experiment</span>
        <div uiSeparator [orientation]="orientation" [decorative]="decorative"></div>
        <span>Shelves</span>
      </div>`
        : `
      <div class="w-72 text-sm text-foreground">
        <p>Latest from server</p>
        <div uiSeparator class="my-3" [orientation]="orientation" [decorative]="decorative"></div>
        <p>Local versions</p>
      </div>`,
  }),
};

export default meta;
type Story = StoryObj<SeparatorStoryArgs>;

/** Full control set — flip orientation and the decorative flag. */
export const Playground: Story = {};

/** Default: a full-width 1px rule between stacked content. */
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

/** A 1px vertical rule between inline items; stretches to the row height. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

/** Both orientations side by side. */
export const Gallery: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <div class="w-72 text-sm text-foreground">
          <p class="font-medium">Horizontal</p>
          <p class="mt-2 text-muted-foreground">Latest from server</p>
          <div uiSeparator class="my-3"></div>
          <p class="text-muted-foreground">Local versions</p>
        </div>

        <div class="text-sm text-foreground">
          <p class="mb-2 font-medium">Vertical</p>
          <div class="flex h-12 items-center gap-3">
            <span>Main</span>
            <div uiSeparator orientation="vertical"></div>
            <span>Experiment</span>
            <div uiSeparator orientation="vertical"></div>
            <span>Shelves</span>
          </div>
        </div>
      </div>`,
  }),
};
