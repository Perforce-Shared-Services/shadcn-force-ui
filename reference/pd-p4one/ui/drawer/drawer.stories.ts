import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';

import { Button } from '../button';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  provideRdxDialogConfig,
  type DrawerDirection,
} from './';

const DRAWER_IMPORTS = [
  CommonModule,
  Button,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
];

interface DrawerStoryArgs {
  triggerLabel: string;
  direction: DrawerDirection;
  title: string;
  description: string;
  modal: boolean;
}

/**
 * `[rdxDrawerTrigger]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) drawer. Upstream wraps `vaul` (a React-only swipe/snap-point
 * gesture library) — since this app has no touch-drag requirement, the drawer
 * is built on the SAME `@radix-ng/primitives/dialog` (CDK Dialog) machinery
 * already backing `sheet`, instead of adding a new dependency. A drawer is a
 * sheet with rounded corners, a directional grab-handle bar (bottom direction
 * only), and its own `bottom` default direction. There is no declarative
 * `<Drawer>` root, `DrawerPortal`, or `DrawerOverlay` — CDK owns the portal,
 * scrim, focus trap, Escape-to-close, and focus return.
 *
 * Reach for a drawer over a sheet when the content reads naturally as a
 * bottom/top sheet (mobile-style quick actions, a compact detail peek) rather
 * than a tall side panel — both share the same edge-panel mechanics.
 *
 * `provideRdxDialogConfig()` wires CDK's DialogModule (shared with
 * dialog/sheet); add it to the app providers (here via `applicationConfig`).
 */
const meta: Meta<DrawerStoryArgs> = {
  title: 'UI/Drawer',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: DRAWER_IMPORTS }),
  ],
  argTypes: {
    triggerLabel: { control: 'text', description: 'Text on the trigger button.' },
    direction: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The edge the drawer slides in from.',
      table: { defaultValue: { summary: 'bottom' } },
    },
    title: { control: 'text', description: 'Drawer title (also the accessible name).' },
    description: { control: 'text', description: 'One line of supporting context.' },
    modal: {
      control: 'boolean',
      description:
        'Modal shows a backdrop and traps focus. Non-modal drops the backdrop and leaves the page interactive. Escape closes either way.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    triggerLabel: 'Open drawer',
    direction: 'bottom',
    title: 'Version details',
    description: 'Everything about this version, without leaving your timeline.',
    modal: true,
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <button uiButton variant="outline" [rdxDrawerTrigger]="drawer" [rdxDrawerConfig]="{ ariaLabel: title, modal: modal }">
        {{ triggerLabel }}
      </button>
      <ng-template #drawer>
        <div rdxDrawerContent [direction]="direction">
          <div rdxDrawerHeader>
            <h2 rdxDrawerTitle>{{ title }}</h2>
            <p rdxDrawerDescription>{{ description }}</p>
          </div>
          <div rdxDrawerFooter>
            <button uiButton rdxDialogClose>Save changes</button>
            <button uiButton variant="outline" rdxDialogClose>Cancel</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

export default meta;
type Story = StoryObj<DrawerStoryArgs>;

export const Playground: Story = {};

/** The default edge — a wide panel that slides up from the bottom, with the grab-handle bar. */
export const Bottom: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxDrawerTrigger]="d" [rdxDrawerConfig]="{ ariaLabel: 'Share version' }">
        Open on bottom
      </button>
      <ng-template #d>
        <div rdxDrawerContent direction="bottom">
          <div rdxDrawerHeader>
            <h2 rdxDrawerTitle>Share for feedback</h2>
            <p rdxDrawerDescription>Anyone with the link can view this version and leave comments.</p>
          </div>
          <div rdxDrawerFooter>
            <button uiButton rdxDialogClose>Copy link</button>
            <button uiButton variant="outline" rdxDialogClose>Cancel</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/** Drops down from the top. */
export const Top: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxDrawerTrigger]="d" [rdxDrawerConfig]="{ ariaLabel: 'What\\'s new' }">
        Open on top
      </button>
      <ng-template #d>
        <div rdxDrawerContent direction="top">
          <div rdxDrawerHeader>
            <h2 rdxDrawerTitle>What's new</h2>
            <p rdxDrawerDescription>A few improvements landed in this release.</p>
          </div>
          <div rdxDrawerFooter>
            <button uiButton rdxDialogClose>Got it</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/** Slides in from the right — a tall panel, e.g. a row-detail peek in a data table. */
export const Right: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="link" class="px-0" [rdxDrawerTrigger]="d" [rdxDrawerConfig]="{ ariaLabel: 'Row details' }">
        Cover Page
      </button>
      <ng-template #d>
        <div rdxDrawerContent direction="right">
          <div rdxDrawerHeader>
            <h2 rdxDrawerTitle>Cover Page</h2>
            <p rdxDrawerDescription>Showing total visitors for the last 6 months.</p>
          </div>
          <div rdxDrawerFooter>
            <button uiButton rdxDialogClose>Save</button>
            <button uiButton variant="outline" rdxDialogClose>Cancel</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/** Slides in from the left. */
export const Left: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxDrawerTrigger]="d" [rdxDrawerConfig]="{ ariaLabel: 'Filters' }">
        Open on left
      </button>
      <ng-template #d>
        <div rdxDrawerContent direction="left">
          <div rdxDrawerHeader>
            <h2 rdxDrawerTitle>Filters</h2>
            <p rdxDrawerDescription>Narrow the timeline to the versions you want to see.</p>
          </div>
          <div rdxDrawerFooter>
            <button uiButton rdxDialogClose>Apply</button>
            <button uiButton variant="outline" rdxDialogClose>Cancel</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/** One trigger per edge, for review side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-start gap-4">
        <button uiButton variant="outline" [rdxDrawerTrigger]="g1" [rdxDrawerConfig]="{ ariaLabel: 'Bottom drawer' }">Bottom</button>
        <ng-template #g1>
          <div rdxDrawerContent direction="bottom">
            <div rdxDrawerHeader><h2 rdxDrawerTitle>Bottom</h2><p rdxDrawerDescription>Slides up from the bottom.</p></div>
            <div rdxDrawerFooter><button uiButton rdxDialogClose>Close</button></div>
          </div>
        </ng-template>

        <button uiButton variant="outline" [rdxDrawerTrigger]="g2" [rdxDrawerConfig]="{ ariaLabel: 'Top drawer' }">Top</button>
        <ng-template #g2>
          <div rdxDrawerContent direction="top">
            <div rdxDrawerHeader><h2 rdxDrawerTitle>Top</h2><p rdxDrawerDescription>Drops down from the top.</p></div>
            <div rdxDrawerFooter><button uiButton rdxDialogClose>Close</button></div>
          </div>
        </ng-template>

        <button uiButton variant="outline" [rdxDrawerTrigger]="g3" [rdxDrawerConfig]="{ ariaLabel: 'Right drawer' }">Right</button>
        <ng-template #g3>
          <div rdxDrawerContent direction="right">
            <div rdxDrawerHeader><h2 rdxDrawerTitle>Right</h2><p rdxDrawerDescription>Slides in from the right.</p></div>
            <div rdxDrawerFooter><button uiButton rdxDialogClose>Close</button></div>
          </div>
        </ng-template>

        <button uiButton variant="outline" [rdxDrawerTrigger]="g4" [rdxDrawerConfig]="{ ariaLabel: 'Left drawer' }">Left</button>
        <ng-template #g4>
          <div rdxDrawerContent direction="left">
            <div rdxDrawerHeader><h2 rdxDrawerTitle>Left</h2><p rdxDrawerDescription>Slides in from the left.</p></div>
            <div rdxDrawerFooter><button uiButton rdxDialogClose>Close</button></div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};
