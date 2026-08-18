import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { toast } from 'ngx-sonner';

import { Button } from '../button';
import { Toaster } from './';

type Theme = 'light' | 'dark' | 'system';
type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

const THEMES: Theme[] = ['light', 'dark', 'system'];
const POSITIONS: Position[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

interface SonnerStoryArgs {
  theme: Theme;
  position: Position;
  richColors: boolean;
  closeButton: boolean;
  expand: boolean;
}

/**
 * `ui-sonner-toaster` is the Angular port of the Force UI (radix-force-ui)
 * `sonner` toaster. Mount it once (this story mounts it per-canvas) and call
 * `toast()` — re-exported unchanged from `ngx-sonner` — from anywhere to
 * queue a toast.
 *
 * The Toaster itself renders nothing until a toast is queued — click a
 * trigger button below to see one appear (default position: bottom-right).
 *
 * Accessibility, when copying these snippets into product:
 * - Toast text is announced via ngx-sonner's built-in live region — no extra
 *   ARIA wiring needed in product code.
 * - Prefer a specific outcome + next step over a bare status ("Version saved
 *   — undo" beats "Success"). Never "successfully".
 * - `richColors` raises contrast for success/error — keep it on for anything
 *   error-adjacent.
 * - A Toast is the wrong surface for an **irreversible** confirmation (it
 *   auto-dismisses and can be pushed off-screen by newer toasts) — use a
 *   Dialog for "are you sure you want to delete/discard" prompts. The
 *   `WithCancel` story below demonstrates the cancel/action button pair with
 *   a reversible choice instead.
 */
const meta: Meta<SonnerStoryArgs> = {
  title: 'UI/Sonner',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Toaster, Button] })],
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: THEMES,
      description:
        "ngx-sonner's own neutral palette (used for the default border/close/action-button colors). Defaults to `'light'` — this app has no runtime theme service yet; the Force UI `--normal-*` vars (background/text/border) track `.dark-theme` on `<body>` automatically regardless of this input.",
      table: { type: { summary: THEMES.join(' | ') }, defaultValue: { summary: 'light' } },
    },
    position: {
      control: 'select',
      options: POSITIONS,
      description: 'Where toasts stack on screen.',
      table: { type: { summary: POSITIONS.join(' | ') }, defaultValue: { summary: 'bottom-right' } },
    },
    richColors: {
      control: 'boolean',
      description: 'Higher-contrast tinted backgrounds for success/warning/error/info toasts.',
    },
    closeButton: {
      control: 'boolean',
      description: 'Show a dismiss (×) button, in addition to swipe-to-dismiss and auto-close.',
      table: { defaultValue: { summary: 'true' } },
    },
    expand: {
      control: 'boolean',
      description: 'Stack toasts expanded by default instead of collapsing behind the front toast.',
    },
  },
  args: {
    theme: 'light',
    position: 'bottom-right',
    richColors: false,
    closeButton: true,
    expand: false,
  },
  render: (args) => ({
    props: {
      ...args,
      fireDefault: () => toast('Version saved', { description: 'Monday, January 3rd at 6:00pm' }),
      fireSuccess: () => toast.success('Version saved'),
      fireInfo: () => toast.info('A new version is available from the server'),
      fireWarning: () => toast.warning('This experiment has unsynced changes'),
      fireError: () =>
        toast.error('Submit failed', {
          description: 'The server rejected the version. Check your connection and try again.',
        }),
      fireAction: () =>
        toast('File removed from this version', {
          action: { label: 'Undo', onClick: () => toast('Restored') },
        }),
      fireCancel: () =>
        toast('A teammate published a new version', {
          description: 'Version 12 is available from the server.',
          cancel: { label: 'Not now' },
          action: { label: 'Sync now', onClick: () => toast.success('Synced version 12') },
        }),
      firePromise: () =>
        toast.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
          loading: 'Submitting version…',
          success: 'Version submitted',
          error: 'Submit failed — try again',
        }),
      fireLoading: () => toast.loading('Syncing from server…'),
    },
    template: `
      <ui-sonner-toaster [theme]="theme" [position]="position" [richColors]="richColors" [closeButton]="closeButton" [expand]="expand" />
      <div class="flex flex-wrap items-center gap-3">
        <button uiButton variant="outline" size="sm" (click)="fireDefault()">Save version</button>
        <button uiButton variant="outline" size="sm" (click)="fireSuccess()">Success</button>
        <button uiButton variant="outline" size="sm" (click)="fireInfo()">Info</button>
        <button uiButton variant="outline" size="sm" (click)="fireWarning()">Warning</button>
        <button uiButton variant="outline" size="sm" (click)="fireError()">Error</button>
        <button uiButton variant="outline" size="sm" (click)="fireAction()">With action</button>
        <button uiButton variant="outline" size="sm" (click)="fireCancel()">With cancel</button>
        <button uiButton variant="outline" size="sm" (click)="firePromise()">Promise</button>
        <button uiButton variant="outline" size="sm" (click)="fireLoading()">Loading</button>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<SonnerStoryArgs>;

export const Playground: Story = {};

/** Renders a checkmark icon in front of the message. */
export const Success: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { fire: () => toast.success('Version saved') },
    template: `
      <ui-sonner-toaster />
      <button uiButton variant="outline" size="sm" (click)="fire()">Save version</button>
    `,
  }),
};

/** Renders an alert icon in front of the message. A 3-part error: what happened, why, what to do next. */
export const ErrorToast: Story = {
  name: 'Error',
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      fire: () =>
        toast.error('Submit failed', {
          description: 'The server rejected the version. Check your connection and try again.',
        }),
    },
    template: `
      <ui-sonner-toaster richColors />
      <button uiButton variant="outline" size="sm" (click)="fire()">Submit version</button>
    `,
  }),
};

/** A primary action button; clicking it closes the toast and runs the callback. */
export const WithAction: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      fire: () =>
        toast('File removed from this version', {
          action: { label: 'Undo', onClick: () => toast('Restored') },
        }),
    },
    template: `
      <ui-sonner-toaster />
      <button uiButton variant="outline" size="sm" (click)="fire()">Remove file</button>
    `,
  }),
};

/**
 * Both a cancel (secondary) and action (primary) button. Toasts auto-dismiss
 * and can be pushed off-screen by newer ones, so keep the choice reversible —
 * this is the wrong surface for "are you sure you want to delete/discard"
 * (use a Dialog for that instead).
 */
export const WithCancel: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      fire: () =>
        toast('A teammate published a new version', {
          description: 'Version 12 is available from the server.',
          cancel: { label: 'Not now' },
          action: { label: 'Sync now', onClick: () => toast.success('Synced version 12') },
        }),
    },
    template: `
      <ui-sonner-toaster />
      <button uiButton variant="outline" size="sm" (click)="fire()">Check for updates</button>
    `,
  }),
};

/** Starts in a loading state and updates automatically once the promise settles. */
export const Promise_: Story = {
  name: 'Promise',
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      fire: () =>
        toast.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
          loading: 'Submitting version…',
          success: 'Version submitted',
          error: 'Submit failed — try again',
        }),
    },
    template: `
      <ui-sonner-toaster />
      <button uiButton variant="outline" size="sm" (click)="fire()">Submit version</button>
    `,
  }),
};

/** Gallery of every toast type, fired in sequence for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      fireAll: () => {
        toast('Version saved', { description: 'Monday, January 3rd at 6:00pm' });
        toast.success('Version submitted');
        toast.info('A new version is available from the server');
        toast.warning('This experiment has unsynced changes');
        toast.error('Submit failed', {
          description: 'The server rejected the version. Check your connection and try again.',
        });
      },
    },
    template: `
      <ui-sonner-toaster expand />
      <button uiButton variant="outline" size="sm" (click)="fireAll()">Fire one of each</button>
    `,
  }),
};
