import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  type AlertVariant,
} from './';

const VARIANTS: AlertVariant[] = [
  'default',
  'destructive',
  'warning',
  'success',
  'info',
];

// Icon control values: 'auto' (per-variant default), 'none', or an explicit
// name. Icons are built into [uiAlert] (decorative, aria-hidden) and resolved
// from a single swap point — see alert.icons.ts.
const ICON_OPTIONS = ['auto', 'none', 'info', 'warning', 'success', 'error', 'bell'] as const;

interface AlertStoryArgs {
  variant: AlertVariant;
  icon: (typeof ICON_OPTIONS)[number];
  title: string;
  description: string;
  showTitle: boolean;
  showDescription: boolean;
  showButton: boolean;
}

// Static template — visibility driven by *ngIf on props (Storybook-Angular only
// re-binds props between arg changes, it does not recompile the template
// string). The leading icon comes from the component's own `icon` input.
const TEMPLATE = `
  <div uiAlert [variant]="variant" [icon]="icon" class="max-w-md">
    <div uiAlertTitle *ngIf="showTitle">{{ title }}</div>
    <div uiAlertDescription *ngIf="showDescription">{{ description }}</div>
    <div uiAlertAction *ngIf="showButton">
      <button uiButton variant="outline" size="xs">Undo</button>
    </div>
  </div>`;

/**
 * `[uiAlert]` is the Angular port of the Force UI (radix-force-ui) alert.
 * The toolbar controls mirror the Figma component's properties — switch the
 * **variant**, swap the **icon** (or set `auto` / `none`), and toggle the
 * title / description / action **button** on and off.
 *
 * `default` + `destructive` come from the Force UI registry; `warning` /
 * `success` / `info` are P4 One status extensions. The leading icon is built
 * in (decorative, `aria-hidden`) and resolves per variant; `role` / `aria-live`
 * are derived from the variant (assertive for destructive/warning).
 */
const meta: Meta<AlertStoryArgs> = {
  title: 'UI/Alert',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, Alert, AlertTitle, AlertDescription, AlertAction, Button],
    }),
  ],
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'Visual style' },
    icon: { control: 'select', options: ICON_OPTIONS, description: 'Leading icon (auto = per variant)' },
    title: { control: 'text', description: 'Alert title text' },
    description: { control: 'text', description: 'Alert description text' },
    showTitle: { control: 'boolean', description: 'Title (Figma: Title)' },
    showDescription: { control: 'boolean', description: 'Description (Figma: Description)' },
    showButton: { control: 'boolean', description: 'Trailing action button (Figma: Button)' },
  },
  args: {
    variant: 'default',
    icon: 'auto',
    title: 'Connected to Main',
    description: 'You are working in the Main workspace.',
    showTitle: true,
    showDescription: true,
    showButton: false,
  },
  render: (args) => ({ props: args, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<AlertStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

export const Default: Story = { args: { variant: 'default' } };
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Submit failed',
    description: 'Two files changed on the server since your last sync. Sync, then submit again.',
  },
};
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Unsynced local versions',
    description: 'You have local versions that have not been submitted yet.',
  },
};
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Version submitted',
    description: 'Your version is now available to the team.',
  },
};
export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Newer version available',
    description: 'A teammate submitted a newer version. Sync to get it.',
  },
};

/** Trailing action button enabled (Figma's optional Button slot). */
export const WithAction: Story = {
  args: {
    variant: 'info',
    title: 'Newer version available',
    description: 'A teammate submitted a newer version. Sync to get it.',
    showButton: true,
  },
};

/** Title only — description and button off. */
export const TitleOnly: Story = { args: { variant: 'success', showDescription: false, title: 'Version submitted' } };

/** No icon — icon set to none. */
export const NoIcon: Story = { args: { icon: 'none' } };

/** Gallery of every variant — built-in per-variant icons. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 max-w-md">
        <div uiAlert variant="default">
          <div uiAlertTitle>Connected to Main</div>
          <div uiAlertDescription>You are working in the Main workspace.</div>
        </div>
        <div uiAlert variant="destructive">
          <div uiAlertTitle>Submit failed</div>
          <div uiAlertDescription>Two files changed on the server. Sync, then submit again.</div>
        </div>
        <div uiAlert variant="warning">
          <div uiAlertTitle>Unsynced local versions</div>
          <div uiAlertDescription>You have local versions that have not been submitted yet.</div>
        </div>
        <div uiAlert variant="success">
          <div uiAlertTitle>Version submitted</div>
          <div uiAlertDescription>Your version is now available to the team.</div>
        </div>
        <div uiAlert variant="info">
          <div uiAlertTitle>Newer version available</div>
          <div uiAlertDescription>A teammate submitted a newer version. Sync to get it.</div>
          <div uiAlertAction>
            <button uiButton variant="outline" size="xs">Sync</button>
          </div>
        </div>
      </div>
    `,
  }),
};
