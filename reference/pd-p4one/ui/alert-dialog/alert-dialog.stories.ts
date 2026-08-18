import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';

import { Button } from '../button';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  provideRdxDialogConfig,
} from './';

const ALERT_DIALOG_IMPORTS = [
  CommonModule,
  Button,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
];

/** Decorative warning glyph for the media tile — a real direct-child `<svg>`
 * (Material Symbols `warning`, Rounded) so the media's `*:[svg]:size-6` rule
 * applies. `fill-current` inherits the tile's text colour. */
const WARNING_SVG = `<svg viewBox="0 -960 960 960" fill="currentColor" class="fill-current"><path d="M109-120q-11 0-20-5.5T75-140q-5-9-5.5-19.5T75-180l370-640q6-10 15.5-15t19.5-5q10 0 19.5 5t15.5 15l370 640q6 10 5.5 20.5T885-140q-5 9-14 14.5t-20 5.5H109Zm371-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm0-120q17 0 28.5-11.5T520-400v-120q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v120q0 17 11.5 28.5T480-360Z"/></svg>`;

interface AlertDialogStoryArgs {
  triggerLabel: string;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  destructive: boolean;
  size: 'default' | 'sm';
  showMedia: boolean;
}

/**
 * `[rdxAlertDialogTrigger]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) alert dialog, built on `@radix-ng/primitives/dialog`
 * (CDK Dialog). An alert dialog interrupts the flow for a decision the user MUST
 * make: it has no ✕ close button and cannot be dismissed by clicking the backdrop
 * or pressing Escape — the only way out is a footer action. The container is
 * `role="alertdialog"`, so screen readers announce it immediately.
 *
 * Reach for it over a plain dialog when there is no safe default and the user has
 * to choose — destructive confirmations (delete a version, discard an
 * experiment), or an unsaved-changes prompt. Keep it short: a title phrased as a
 * question, one line stating the consequence, and a specific action verb beside
 * Cancel — never OK/Yes-No.
 *
 * `provideRdxDialogConfig()` wires CDK's DialogModule; add it to the app providers
 * (here via `applicationConfig`).
 */
const meta: Meta<AlertDialogStoryArgs> = {
  title: 'UI/Alert Dialog',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideRdxDialogConfig()] }),
    moduleMetadata({ imports: ALERT_DIALOG_IMPORTS }),
  ],
  argTypes: {
    triggerLabel: { control: 'text', description: 'Text on the trigger button.' },
    title: { control: 'text', description: 'Alert title (also the accessible name). Phrase as a question for confirmations.' },
    description: { control: 'text', description: 'One line stating the consequence of the action.' },
    confirmLabel: { control: 'text', description: 'Label of the primary action — a specific verb, not OK/Yes.' },
    cancelLabel: { control: 'text', description: 'Label of the dismiss action.' },
    destructive: {
      control: 'boolean',
      description: 'Style the primary action as destructive (irreversible action).',
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'sm'],
      description: 'Panel size. `default` left-aligns the header (title beside the media tile) on `sm+` screens; `sm` keeps the header centered and lays the two footer actions out as an equal 2-column grid.',
      table: { defaultValue: { summary: 'default' } },
    },
    showMedia: {
      control: 'boolean',
      description: 'Show the icon tile above the title (e.g. a warning glyph).',
    },
  },
  args: {
    triggerLabel: 'Delete version',
    title: 'Delete this version?',
    description: "This permanently removes the version from your timeline. You can't undo this.",
    confirmLabel: 'Delete version',
    cancelLabel: 'Cancel',
    destructive: true,
    size: 'default',
    showMedia: true,
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <button uiButton [variant]="destructive ? 'destructive' : 'default'" [rdxAlertDialogTrigger]="dlg" [rdxAlertDialogConfig]="{ ariaLabel: title }">
        {{ triggerLabel }}
      </button>
      <ng-template #dlg>
        <div rdxAlertDialogContent [size]="size">
          <div rdxAlertDialogHeader>
            <div *ngIf="showMedia" rdxAlertDialogMedia class="text-destructive" aria-hidden="true">${WARNING_SVG}</div>
            <h2 rdxAlertDialogTitle>{{ title }}</h2>
            <p rdxAlertDialogDescription>{{ description }}</p>
          </div>
          <div rdxAlertDialogFooter>
            <button uiButton variant="outline" rdxAlertDialogCancel>{{ cancelLabel }}</button>
            <button uiButton [variant]="destructive ? 'destructive' : 'default'" rdxAlertDialogAction>{{ confirmLabel }}</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

export default meta;
type Story = StoryObj<AlertDialogStoryArgs>;

export const Playground: Story = {};

/**
 * The destructive-confirmation pattern. Title is a question, the description
 * states the consequence, the primary button is the specific verb in the
 * destructive variant beside Cancel. No close button, no backdrop dismiss — the
 * user must choose.
 */
export const ConfirmDestructive: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="destructive" [rdxAlertDialogTrigger]="dlg" [rdxAlertDialogConfig]="{ ariaLabel: 'Delete this version' }">
        Delete version
      </button>
      <ng-template #dlg>
        <div rdxAlertDialogContent>
          <div rdxAlertDialogHeader>
            <div rdxAlertDialogMedia class="text-destructive" aria-hidden="true">${WARNING_SVG}</div>
            <h2 rdxAlertDialogTitle>Delete this version?</h2>
            <p rdxAlertDialogDescription>This permanently removes the version from your timeline. You can't undo this.</p>
          </div>
          <div rdxAlertDialogFooter>
            <button uiButton variant="outline" rdxAlertDialogCancel>Cancel</button>
            <button uiButton variant="destructive" rdxAlertDialogAction>Delete version</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * The `sm` size. The footer becomes an equal 2-column grid, and the header stays
 * centered (the `default` size left-aligns on `sm+`). Use it for the tightest
 * confirmations.
 */
export const Small: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton variant="destructive" [rdxAlertDialogTrigger]="dlg" [rdxAlertDialogConfig]="{ ariaLabel: 'Discard experiment' }">
        Discard experiment
      </button>
      <ng-template #dlg>
        <div rdxAlertDialogContent size="sm">
          <div rdxAlertDialogHeader>
            <h2 rdxAlertDialogTitle>Discard this experiment?</h2>
            <p rdxAlertDialogDescription>The experiment and its versions are removed for good.</p>
          </div>
          <div rdxAlertDialogFooter>
            <button uiButton variant="outline" rdxAlertDialogCancel>Keep</button>
            <button uiButton variant="destructive" rdxAlertDialogAction>Discard</button>
          </div>
        </div>
      </ng-template>
    `,
  }),
};

/**
 * A non-destructive deliberate choice — an unsaved-changes prompt. The primary
 * action saves; the cancel discards. Both close the alert; there is no other exit.
 */
export const UnsavedChanges: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiButton [rdxAlertDialogTrigger]="dlg" [rdxAlertDialogConfig]="{ ariaLabel: 'Unsaved changes' }">
        Leave page
      </button>
      <ng-template #dlg>
        <div rdxAlertDialogContent>
          <div rdxAlertDialogHeader>
            <h2 rdxAlertDialogTitle>Save changes before leaving?</h2>
            <p rdxAlertDialogDescription>Your version has edits that aren't saved yet.</p>
          </div>
          <div rdxAlertDialogFooter>
            <button uiButton variant="outline" rdxAlertDialogCancel>Discard changes</button>
            <button uiButton rdxAlertDialogAction>Save changes</button>
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
        <button uiButton variant="destructive" [rdxAlertDialogTrigger]="d1" [rdxAlertDialogConfig]="{ ariaLabel: 'Delete this version' }">Delete version</button>
        <ng-template #d1>
          <div rdxAlertDialogContent>
            <div rdxAlertDialogHeader>
              <div rdxAlertDialogMedia class="text-destructive" aria-hidden="true">${WARNING_SVG}</div>
              <h2 rdxAlertDialogTitle>Delete this version?</h2>
              <p rdxAlertDialogDescription>This permanently removes the version from your timeline. You can't undo this.</p>
            </div>
            <div rdxAlertDialogFooter>
              <button uiButton variant="outline" rdxAlertDialogCancel>Cancel</button>
              <button uiButton variant="destructive" rdxAlertDialogAction>Delete version</button>
            </div>
          </div>
        </ng-template>

        <button uiButton [rdxAlertDialogTrigger]="d2" [rdxAlertDialogConfig]="{ ariaLabel: 'Unsaved changes' }">Leave page</button>
        <ng-template #d2>
          <div rdxAlertDialogContent size="sm">
            <div rdxAlertDialogHeader>
              <h2 rdxAlertDialogTitle>Save changes before leaving?</h2>
              <p rdxAlertDialogDescription>Your version has edits that aren't saved yet.</p>
            </div>
            <div rdxAlertDialogFooter>
              <button uiButton variant="outline" rdxAlertDialogCancel>Discard changes</button>
              <button uiButton rdxAlertDialogAction>Save changes</button>
            </div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};
