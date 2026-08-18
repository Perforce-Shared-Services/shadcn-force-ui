import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Switch } from './';
import type { SwitchSize } from './switch.variants';

interface SwitchStoryArgs {
  checked: boolean;
  size: SwitchSize;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  label: string;
}

/**
 * `[uiSwitch]` is the Angular port of the Force UI (radix-force-ui) switch.
 * It's an attribute selector on a native `<button>`: the radix-ng host
 * directive turns it into an accessible switch (`role="switch"`, `aria-checked`,
 * Space to toggle), with a track and a sliding thumb.
 *
 * A switch means IMMEDIATE effect — the change commits the moment you flip it,
 * with no Save button. For a value that's submitted later, use a checkbox
 * instead (see the `toggle-switch` Force spec pattern).
 *
 * Dimensions:
 * - `size` — `sm` (dense lists, table rows) or `default`.
 * - The switch is single-colour. A destructive/invalid affordance is shown via
 *   `aria-invalid="true"` (destructive border), matching Figma `State=Invalid` —
 *   there is no separate red-fill "danger" colour.
 *
 * Labelling (read before copying into product):
 * - A `<button>` is a *labelable* element, so wrapping it in a `<label>` (as
 *   these stories do) makes the label text a click target that toggles the
 *   switch — no `htmlFor` wiring needed.
 * - A switch with NO adjacent text MUST carry an `aria-label` on the host, or
 *   it is unnamed to screen readers.
 * - Write the label in POSITIVE terms describing what ON does ("Email
 *   notifications", not "Disable notifications") — ambiguous otherwise.
 */
const meta: Meta<SwitchStoryArgs> = {
  title: 'UI/Switch',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Switch] })],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'On (`aria-checked="true"`) / off. Two-way via `[(checked)]` in product.',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'default'],
      description: 'Track size. `sm` for dense lists and table rows.',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description:
        'Inactive: sets native `disabled`, drops the switch from the tab order, dims switch + label to 50%.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the switch required (`aria-required`).',
    },
    invalid: {
      control: 'boolean',
      description:
        'Error state: sets `aria-invalid="true"` and switches the border/ring to the destructive token.',
    },
    label: {
      control: 'text',
      description: 'Label text. Positive statement, sentence case.',
    },
  },
  args: {
    checked: true,
    size: 'default',
    disabled: false,
    required: false,
    invalid: false,
    label: 'Sync versions automatically on save',
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <label class="flex items-center justify-between gap-4 text-sm select-none max-w-xs">
        <span class="font-medium">{{ label }}</span>
        <button
          uiSwitch
          [size]="size"
          [checked]="checked"
          (checkedChange)="checked = $event"
          [disabled]="disabled"
          [required]="required"
          [attr.aria-invalid]="invalid ? 'true' : null"
        ></button>
      </label>
    `,
  }),
};

export default meta;
type Story = StoryObj<SwitchStoryArgs>;

export const Playground: Story = {};

/** Off (resting) state — muted track, thumb at the left edge. */
export const Off: Story = {
  args: { checked: false, label: 'Sync versions automatically on save' },
};

/** On (resting) state — brand-filled track, thumb at the right edge. */
export const On: Story = {
  args: { checked: true, label: 'Sync versions automatically on save' },
};

/** `sm` for dense settings lists and table rows. */
export const Small: Story = {
  args: { size: 'sm', label: 'Show file thumbnails' },
};

/**
 * Invalid state: `aria-invalid="true"` switches the track border to the
 * destructive token (matches Figma `State=Invalid`). The error reason is wired
 * via `aria-describedby` to a FieldError message so screen readers announce it
 * with the control — colour is never the only error signal (WCAG 1.4.1 / 3.3.1).
 * `aria-describedby` is a native attribute on the `<button>`, so it passes
 * straight through — no component input needed.
 *
 * Note the Force spec prefers surfacing a failed switch via a revert + Toast
 * over a persistent error border — use this for form-validation contexts only.
 */
export const Invalid: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-1.5 max-w-xs">
        <label class="flex items-center justify-between gap-4 text-sm select-none">
          <span class="font-medium">Allow anyone to edit this workspace</span>
          <button uiSwitch required aria-invalid="true" aria-describedby="sw-edit-error"></button>
        </label>
        <p id="sw-edit-error" class="text-xs text-destructive">Turn this on only after the workspace owner approves shared editing.</p>
      </div>
    `,
  }),
};

/** Disabled dims the switch and its label and removes it from the tab order. */
export const Disabled: Story = {
  args: { disabled: true, label: 'Auto-detect file changes' },
};

/**
 * A switch with no adjacent label (e.g. inline in a table row) MUST carry an
 * explicit `aria-label`. Make it specific — name what the toggle controls.
 */
export const NoVisibleLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiSwitch size="sm" [checked]="true" aria-label="Sync versions on save"></button>
    `,
  }),
};

/**
 * Settings list: a vertical stack of switches, each label left, switch
 * right-aligned (`justify-between`), with optional helper text below the label.
 * This is the canonical Toggle Switch composition — see the Force spec
 * `settings-page` pattern.
 */
export const SettingsList: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-80 flex-col divide-y divide-border">
        <label class="flex items-center justify-between gap-4 py-3 text-sm select-none">
          <span class="flex flex-col gap-0.5">
            <span class="font-medium">Sync versions on save</span>
            <span class="text-xs text-muted-foreground">Push each saved version to the server automatically.</span>
          </span>
          <button uiSwitch [checked]="true" aria-label="Sync versions on save"></button>
        </label>
        <label class="flex items-center justify-between gap-4 py-3 text-sm select-none">
          <span class="flex flex-col gap-0.5">
            <span class="font-medium">Notify on new comments</span>
            <span class="text-xs text-muted-foreground">Get a notification when someone comments on your work.</span>
          </span>
          <button uiSwitch aria-label="Notify on new comments"></button>
        </label>
        <label class="flex items-center justify-between gap-4 py-3 text-sm select-none">
          <span class="flex flex-col gap-0.5">
            <span class="font-medium">Show file thumbnails</span>
            <span class="text-xs text-muted-foreground">Render previews in the file list.</span>
          </span>
          <button uiSwitch [checked]="true" aria-label="Show file thumbnails"></button>
        </label>
      </div>
    `,
  }),
};

/**
 * Every state and size side by side — for VISUAL REVIEW only. The "Off"/"On"
 * labels here describe states, not settings; don't copy this story as a product
 * template. In product, a switch's label names the setting it toggles (see
 * SettingsList / Playground) or carries an `aria-label` (see NoVisibleLabel).
 */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-5">
        <div class="flex flex-wrap items-center gap-6">
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiSwitch></button><span class="font-medium">Off</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiSwitch [checked]="true"></button><span class="font-medium">On</span>
          </label>
        </div>
        <div class="flex flex-wrap items-center gap-6">
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiSwitch size="sm"></button><span class="font-medium">Small off</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiSwitch size="sm" [checked]="true"></button><span class="font-medium">Small on</span>
          </label>
        </div>
        <div class="flex flex-wrap items-center gap-6">
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiSwitch disabled></button><span class="font-medium text-muted-foreground">Disabled off</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiSwitch disabled [checked]="true"></button><span class="font-medium text-muted-foreground">Disabled on</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiSwitch aria-invalid="true"></button><span class="font-medium">Invalid off</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiSwitch [checked]="true" aria-invalid="true"></button><span class="font-medium">Invalid on</span>
          </label>
        </div>
      </div>
    `,
  }),
};
