import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup, type ResizableDirection } from './';

const DIRECTIONS: ResizableDirection[] = ['horizontal', 'vertical'];

interface ResizableStoryArgs {
  direction: ResizableDirection;
  withHandle: boolean;
}

/**
 * `[uiResizablePanelGroup]` / `[uiResizablePanel]` / `[uiResizableHandle]` are
 * the Angular port of the Force UI (radix-force-ui) resizable panels.
 *
 * No `@radix-ng/primitives` or Angular CDK primitive exists for this role —
 * the registry wraps `react-resizable-panels` (a non-Radix library with no
 * Angular port), so drag/keyboard resize is hand-rolled on the handle
 * (documented parity gap). Drag a handle, or focus it (Tab) and use the
 * arrow keys / Home / End, to resize the adjacent panels.
 */
const meta: Meta<ResizableStoryArgs> = {
  title: 'UI/Resizable',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [ResizablePanelGroup, ResizablePanel, ResizableHandle] }),
  ],
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: DIRECTIONS,
      description:
        '`horizontal` (default) lays panels side by side, divided by a vertical handle. `vertical` stacks panels, divided by a horizontal handle.',
      table: {
        type: { summary: DIRECTIONS.join(' | ') },
        defaultValue: { summary: 'horizontal' },
      },
    },
    withHandle: {
      control: 'boolean',
      description: 'Shows the small grip pill inside the handle.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    direction: 'horizontal',
    withHandle: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div uiResizablePanelGroup [direction]="direction" class="h-64 w-full max-w-2xl rounded-lg ring-1 ring-border">
        <div uiResizablePanel [defaultSize]="50" [minSize]="20" class="flex items-center justify-center p-4 text-sm text-foreground">
          <span>One</span>
        </div>
        <div uiResizableHandle [withHandle]="withHandle"></div>
        <div uiResizablePanel [defaultSize]="50" [minSize]="20" class="flex items-center justify-center p-4 text-sm text-foreground">
          <span>Two</span>
        </div>
      </div>`,
  }),
};

export default meta;
type Story = StoryObj<ResizableStoryArgs>;

/** Full control set — flip direction and toggle the grip handle. */
export const Playground: Story = {};

/** Panels side by side, divided by a vertical draggable handle. */
export const Horizontal: Story = {
  args: { direction: 'horizontal' },
};

/** Panels stacked top to bottom, divided by a horizontal draggable handle. */
export const Vertical: Story = {
  args: { direction: 'vertical' },
};

/** Three panels in a row — dragging the middle handle resizes only its two neighbors. */
export const ThreePanels: Story = {
  args: { direction: 'horizontal' },
  render: (args) => ({
    props: args,
    template: `
      <div uiResizablePanelGroup [direction]="direction" class="h-64 w-full max-w-2xl rounded-lg ring-1 ring-border">
        <div uiResizablePanel [defaultSize]="25" [minSize]="10" class="flex items-center justify-center p-4 text-sm text-foreground">
          <span>Sidebar</span>
        </div>
        <div uiResizableHandle [withHandle]="withHandle"></div>
        <div uiResizablePanel [defaultSize]="50" [minSize]="20" class="flex items-center justify-center p-4 text-sm text-foreground">
          <span>Main</span>
        </div>
        <div uiResizableHandle [withHandle]="withHandle"></div>
        <div uiResizablePanel [defaultSize]="25" [minSize]="10" class="flex items-center justify-center p-4 text-sm text-foreground">
          <span>Details</span>
        </div>
      </div>`,
  }),
};

/** Both orientations side by side. */
export const Gallery: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <div>
          <p class="mb-2 text-sm font-medium text-foreground">Horizontal</p>
          <div uiResizablePanelGroup direction="horizontal" class="h-48 w-full max-w-2xl rounded-lg ring-1 ring-border">
            <div uiResizablePanel [defaultSize]="50" class="flex items-center justify-center p-4 text-sm text-foreground">One</div>
            <div uiResizableHandle [withHandle]="true"></div>
            <div uiResizablePanel [defaultSize]="50" class="flex items-center justify-center p-4 text-sm text-foreground">Two</div>
          </div>
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-foreground">Vertical</p>
          <div uiResizablePanelGroup direction="vertical" class="h-64 w-full max-w-2xl rounded-lg ring-1 ring-border">
            <div uiResizablePanel [defaultSize]="50" class="flex items-center justify-center p-4 text-sm text-foreground">One</div>
            <div uiResizableHandle [withHandle]="true"></div>
            <div uiResizablePanel [defaultSize]="50" class="flex items-center justify-center p-4 text-sm text-foreground">Two</div>
          </div>
        </div>
      </div>`,
  }),
};
