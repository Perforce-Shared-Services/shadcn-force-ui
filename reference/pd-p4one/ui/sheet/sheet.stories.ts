import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';

import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  provideRdxDialogConfig,
  type SheetSide,
} from './';

const SHEET_IMPORTS = [
  CommonModule,
  Button,
  Input,
  Label,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
];

interface SheetStoryArgs {
  triggerLabel: string;
  side: SheetSide;
  title: string;
  description: string;
  showCloseButton: boolean;
  modal: boolean;
}

/**
 * `[rdxSheetTrigger]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) sheet — the radix Dialog primitive pinned to a screen edge (a
 * drawer). It's built on `@radix-ng/primitives/dialog` (CDK Dialog): the trigger
 * is any `[uiButton]` carrying `[rdxSheetTrigger]="tpl"`, the sheet body lives in
 * the referenced `<ng-template>`, and CDK owns the portal, scrim, focus trap,
 * Escape-to-close, and focus return. There is no declarative `<Sheet>` root,
 * `SheetPortal`, or `SheetOverlay`.
 *
 * Reach for a sheet when a task needs more room than a dialog but shouldn't take
 * over the whole screen — version details, a filter panel, a longer form — and
 * the surrounding context is worth keeping in view. Set the edge with `side`
 * (default `right`); `left`/`right` slide in a tall panel, `top`/`bottom` a wide
 * one. Give it a clear title and a specific action beside a close.
 *
 * `provideRdxDialogConfig()` wires CDK's DialogModule (shared with dialog); add
 * it to the app providers (here via `applicationConfig`).
 */
const meta: Meta<SheetStoryArgs> = {
  title: 'UI/Sheet',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: SHEET_IMPORTS }),
  ],
  argTypes: {
    triggerLabel: { control: 'text', description: 'Text on the trigger button.' },
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The edge the sheet slides in from.',
      table: { defaultValue: { summary: 'right' } },
    },
    title: { control: 'text', description: 'Sheet title (also the accessible name).' },
    description: { control: 'text', description: 'One line of supporting context.' },
    showCloseButton: {
      control: 'boolean',
      description: 'Show the ✕ close button in the top-right corner.',
    },
    modal: {
      control: 'boolean',
      description:
        'Modal shows a backdrop and traps focus. Non-modal drops the backdrop and leaves the page interactive. Escape closes either way.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    triggerLabel: 'Open details',
    side: 'right',
    title: 'Version details',
    description: 'Everything about this version, without leaving your timeline.',
    showCloseButton: true,
    modal: true,
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <button uiButton variant="outline" [rdxSheetTrigger]="sheet" [rdxSheetConfig]="{ ariaLabel: title, modal: modal }">
        {{ triggerLabel }}
      </button>
      <ng-template #sheet>
        <div rdxSheetContent [side]="side" [showCloseButton]="showCloseButton">
          <div rdxSheetHeader>
            <h2 rdxSheetTitle>{{ title }}</h2>
            <p rdxSheetDescription>{{ description }}</p>
          </div>
          <div class="flex flex-1 flex-col gap-1.5 px-4">
            <label uiLabel for="sheet-version-name">Version name</label>
            <input uiInput id="sheet-version-name" value="Blockout pass" />
          </div>
          <div rdxSheetFooter>
            <button uiButton variant="outline" rdxDialogClose>Cancel</button>
            <button uiButton rdxDialogClose>Save changes</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

export default meta;
type Story = StoryObj<SheetStoryArgs>;

export const Playground: Story = {};

/** The default edge — a tall panel that slides in from the right. */
export const Right: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxSheetTrigger]="s" [rdxSheetConfig]="{ ariaLabel: 'Version details' }">
        Open on right
      </button>
      <ng-template #s>
        <div rdxSheetContent side="right">
          <div rdxSheetHeader>
            <h2 rdxSheetTitle>Version details</h2>
            <p rdxSheetDescription>Everything about this version, without leaving your timeline.</p>
          </div>
          <div rdxSheetFooter>
            <button uiButton rdxDialogClose>Close</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/** Slides in from the left — the common spot for navigation or a filter panel. */
export const Left: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxSheetTrigger]="s" [rdxSheetConfig]="{ ariaLabel: 'Filters' }">
        Open on left
      </button>
      <ng-template #s>
        <div rdxSheetContent side="left">
          <div rdxSheetHeader>
            <h2 rdxSheetTitle>Filters</h2>
            <p rdxSheetDescription>Narrow the timeline to the versions you want to see.</p>
          </div>
          <div rdxSheetFooter>
            <button uiButton variant="outline" rdxDialogClose>Reset</button>
            <button uiButton rdxDialogClose>Apply</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/** Slides up from the bottom — a wide panel for a quick action on smaller screens. */
export const Bottom: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxSheetTrigger]="s" [rdxSheetConfig]="{ ariaLabel: 'Share version' }">
        Open on bottom
      </button>
      <ng-template #s>
        <div rdxSheetContent side="bottom">
          <div rdxSheetHeader>
            <h2 rdxSheetTitle>Share for feedback</h2>
            <p rdxSheetDescription>Anyone with the link can view this version and leave comments.</p>
          </div>
          <div rdxSheetFooter class="sm:flex-row sm:justify-end">
            <button uiButton variant="outline" rdxDialogClose>Cancel</button>
            <button uiButton rdxDialogClose>Copy link</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/** Drops down from the top — for a wide banner-style panel. */
export const Top: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxSheetTrigger]="s" [rdxSheetConfig]="{ ariaLabel: 'What\\'s new' }">
        Open on top
      </button>
      <ng-template #s>
        <div rdxSheetContent side="top">
          <div rdxSheetHeader>
            <h2 rdxSheetTitle>What's new</h2>
            <p rdxSheetDescription>A few improvements landed in this release.</p>
          </div>
          <div rdxSheetFooter class="sm:flex-row sm:justify-end">
            <button uiButton rdxDialogClose>Got it</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * A longer form in a right sheet — the body scrolls while the header stays put
 * and the footer sticks to the bottom (`mt-auto`). Each field has a visible label
 * tied to its input.
 */
export const ScrollableForm: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton [rdxSheetTrigger]="s" [rdxSheetConfig]="{ ariaLabel: 'Version settings', autoFocus: 'first-input' }">
        Edit settings
      </button>
      <ng-template #s>
        <div rdxSheetContent side="right">
          <div rdxSheetHeader>
            <h2 rdxSheetTitle>Version settings</h2>
            <p rdxSheetDescription>Update the details for this version.</p>
          </div>
          <div class="flex flex-1 flex-col gap-4 overflow-y-auto scrollbar-overlay px-4">
            <div class="flex flex-col gap-1.5">
              <label uiLabel for="sheet-name">Name</label>
              <input uiInput id="sheet-name" value="Blockout pass" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label uiLabel for="sheet-note">Note</label>
              <input uiInput id="sheet-note" value="First lighting test" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label uiLabel for="sheet-tag">Tag</label>
              <input uiInput id="sheet-tag" placeholder="Add a tag" />
            </div>
          </div>
          <div rdxSheetFooter>
            <button uiButton variant="outline" rdxDialogClose>Cancel</button>
            <button uiButton rdxDialogClose>Save changes</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * Without the corner close button — when the footer actions are the only way out
 * (a deliberate choice the user must make).
 */
export const NoCloseButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxSheetTrigger]="s" [rdxSheetConfig]="{ ariaLabel: 'Unsaved changes' }">
        Leave page
      </button>
      <ng-template #s>
        <div rdxSheetContent side="right" [showCloseButton]="false">
          <div rdxSheetHeader>
            <h2 rdxSheetTitle>Save changes before leaving?</h2>
            <p rdxSheetDescription>Your version has edits that aren't saved yet.</p>
          </div>
          <div rdxSheetFooter>
            <button uiButton variant="outline" rdxDialogClose>Discard</button>
            <button uiButton rdxDialogClose>Save changes</button>
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
        <button uiButton variant="outline" [rdxSheetTrigger]="g1" [rdxSheetConfig]="{ ariaLabel: 'Right sheet' }">Right</button>
        <ng-template #g1>
          <div rdxSheetContent side="right">
            <div rdxSheetHeader><h2 rdxSheetTitle>Right</h2><p rdxSheetDescription>Slides in from the right.</p></div>
            <div rdxSheetFooter><button uiButton rdxDialogClose>Close</button></div>
          </div>
        </ng-template>

        <button uiButton variant="outline" [rdxSheetTrigger]="g2" [rdxSheetConfig]="{ ariaLabel: 'Left sheet' }">Left</button>
        <ng-template #g2>
          <div rdxSheetContent side="left">
            <div rdxSheetHeader><h2 rdxSheetTitle>Left</h2><p rdxSheetDescription>Slides in from the left.</p></div>
            <div rdxSheetFooter><button uiButton rdxDialogClose>Close</button></div>
          </div>
        </ng-template>

        <button uiButton variant="outline" [rdxSheetTrigger]="g3" [rdxSheetConfig]="{ ariaLabel: 'Top sheet' }">Top</button>
        <ng-template #g3>
          <div rdxSheetContent side="top">
            <div rdxSheetHeader><h2 rdxSheetTitle>Top</h2><p rdxSheetDescription>Drops down from the top.</p></div>
            <div rdxSheetFooter class="sm:flex-row sm:justify-end"><button uiButton rdxDialogClose>Close</button></div>
          </div>
        </ng-template>

        <button uiButton variant="outline" [rdxSheetTrigger]="g4" [rdxSheetConfig]="{ ariaLabel: 'Bottom sheet' }">Bottom</button>
        <ng-template #g4>
          <div rdxSheetContent side="bottom">
            <div rdxSheetHeader><h2 rdxSheetTitle>Bottom</h2><p rdxSheetDescription>Slides up from the bottom.</p></div>
            <div rdxSheetFooter class="sm:flex-row sm:justify-end"><button uiButton rdxDialogClose>Close</button></div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};
