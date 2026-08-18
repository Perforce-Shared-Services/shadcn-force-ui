import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';

import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  provideRdxDialogConfig,
} from './';

const DIALOG_IMPORTS = [
  CommonModule,
  Button,
  Input,
  Label,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
];

interface DialogStoryArgs {
  triggerLabel: string;
  title: string;
  description: string;
  confirmLabel: string;
  destructive: boolean;
  showCloseButton: boolean;
  modal: boolean;
}

/**
 * `[rdxDialogTrigger]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) dialog, built on `@radix-ng/primitives/dialog` (CDK Dialog).
 * The trigger is any `[uiButton]` carrying `[rdxDialogTrigger]="tpl"`; the dialog
 * body lives in the referenced `<ng-template>` and is portaled into a focus-
 * trapped, backdropped overlay. There is no declarative `<Dialog>` root,
 * `DialogPortal`, or `DialogOverlay` — CDK owns the portal, scrim, focus trap,
 * Escape-to-close, and focus return.
 *
 * Reach for a dialog to interrupt the flow for a focused task or a decision that
 * needs confirmation — especially a destructive one (delete a version, discard
 * changes). Keep it short: a clear title (as a question for confirmations), one
 * line of context, and a specific action verb beside Cancel — never OK/Yes-No.
 *
 * `provideRdxDialogConfig()` wires CDK's DialogModule; add it to the app
 * providers (here via `applicationConfig`).
 */
const meta: Meta<DialogStoryArgs> = {
  title: 'UI/Dialog',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: DIALOG_IMPORTS }),
  ],
  argTypes: {
    triggerLabel: { control: 'text', description: 'Text on the trigger button.' },
    title: { control: 'text', description: 'Dialog title (also the accessible name).' },
    description: { control: 'text', description: 'One line of supporting context.' },
    confirmLabel: { control: 'text', description: 'Label of the primary action button.' },
    destructive: {
      control: 'boolean',
      description: 'Style the primary action as destructive (irreversible action).',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show the ✕ close button in the top-right corner.',
    },
    modal: {
      control: 'boolean',
      description: 'Modal shows a backdrop and traps focus. Non-modal drops the backdrop and leaves the page interactive. Escape closes either way.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    triggerLabel: 'Delete version',
    title: 'Delete this version?',
    description: "This permanently removes the version from your timeline. You can't undo this.",
    confirmLabel: 'Delete',
    destructive: true,
    showCloseButton: true,
    modal: true,
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <button uiButton [variant]="destructive ? 'outline' : 'default'" [rdxDialogTrigger]="dlg" [rdxDialogConfig]="{ ariaLabel: title, modal: modal }">
        {{ triggerLabel }}
      </button>
      <ng-template #dlg>
        <div rdxDialogContent [showCloseButton]="showCloseButton">
          <div rdxDialogHeader>
            <h2 rdxDialogTitle>{{ title }}</h2>
            <p rdxDialogDescription>{{ description }}</p>
          </div>
          <div rdxDialogFooter>
            <button uiButton variant="outline" rdxDialogClose>Cancel</button>
            <button uiButton [variant]="destructive ? 'destructive' : 'default'" rdxDialogClose>{{ confirmLabel }}</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

export default meta;
type Story = StoryObj<DialogStoryArgs>;

export const Playground: Story = {};

/**
 * The destructive-confirmation pattern a dropdown-menu's "Delete" item opens.
 * Title is a question, the description states the consequence, the primary button
 * is the specific verb in the destructive variant beside Cancel.
 */
export const ConfirmDestructive: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="outline" [rdxDialogTrigger]="dlg" [rdxDialogConfig]="{ ariaLabel: 'Delete this version' }">
        Delete version
      </button>
      <ng-template #dlg>
        <div rdxDialogContent>
          <div rdxDialogHeader>
            <h2 rdxDialogTitle>Delete this version?</h2>
            <p rdxDialogDescription>This permanently removes the version from your timeline. You can't undo this.</p>
          </div>
          <div rdxDialogFooter>
            <button uiButton variant="outline" rdxDialogClose>Cancel</button>
            <button uiButton variant="destructive" rdxDialogClose>Delete</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * A short form in a dialog — collect a small amount of input without leaving the
 * page. Each field has a visible label tied to its input.
 */
export const FormDialog: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton [rdxDialogTrigger]="dlg" [rdxDialogConfig]="{ ariaLabel: 'Rename version', autoFocus: 'first-input' }">
        Rename version
      </button>
      <ng-template #dlg>
        <div rdxDialogContent>
          <div rdxDialogHeader>
            <h2 rdxDialogTitle>Rename version</h2>
            <p rdxDialogDescription>Give this version a clear name.</p>
          </div>
          <div class="flex flex-col gap-1.5">
            <label uiLabel for="dlg-version-name">Version name</label>
            <input uiInput id="dlg-version-name" value="Blockout pass" />
          </div>
          <div rdxDialogFooter>
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
 * (a deliberate decision the user must make).
 */
export const NoCloseButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton [rdxDialogTrigger]="dlg" [rdxDialogConfig]="{ ariaLabel: 'Unsaved changes' }">
        Leave page
      </button>
      <ng-template #dlg>
        <div rdxDialogContent [showCloseButton]="false">
          <div rdxDialogHeader>
            <h2 rdxDialogTitle>Save changes before leaving?</h2>
            <p rdxDialogDescription>Your version has edits that aren't saved yet.</p>
          </div>
          <div rdxDialogFooter>
            <button uiButton variant="outline" rdxDialogClose>Discard</button>
            <button uiButton rdxDialogClose>Save changes</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/** Triggers for review side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-start gap-4">
        <button uiButton variant="outline" [rdxDialogTrigger]="d1" [rdxDialogConfig]="{ ariaLabel: 'Share for feedback' }">Share</button>
        <ng-template #d1>
          <div rdxDialogContent>
            <div rdxDialogHeader>
              <h2 rdxDialogTitle>Share for feedback</h2>
              <p rdxDialogDescription>Anyone with the link can view this version and leave comments.</p>
            </div>
            <div rdxDialogFooter>
              <button uiButton variant="outline" rdxDialogClose>Cancel</button>
              <button uiButton rdxDialogClose>Copy link</button>
            </div>
          </div>
        </ng-template>

        <button uiButton variant="destructive" [rdxDialogTrigger]="d2" [rdxDialogConfig]="{ ariaLabel: 'Discard experiment' }">Discard experiment</button>
        <ng-template #d2>
          <div rdxDialogContent>
            <div rdxDialogHeader>
              <h2 rdxDialogTitle>Discard this experiment?</h2>
              <p rdxDialogDescription>The experiment and its versions are removed for good.</p>
            </div>
            <div rdxDialogFooter>
              <button uiButton variant="outline" rdxDialogClose>Keep</button>
              <button uiButton variant="destructive" rdxDialogClose>Discard</button>
            </div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};
