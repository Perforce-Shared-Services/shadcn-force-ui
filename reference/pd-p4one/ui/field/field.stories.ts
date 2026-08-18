import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Input } from '../input';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  type FieldOrientation,
} from './';

const ORIENTATIONS: FieldOrientation[] = [
  'vertical',
  'horizontal',
  'responsive',
];

interface FieldStoryArgs {
  orientation: FieldOrientation;
  label: string;
  placeholder: string;
  description: string;
  showDescription: boolean;
  invalid: boolean;
  error: string;
  disabled: boolean;
}

const FIELD_IMPORTS = [
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
  Input,
  Checkbox,
  Button,
];

/**
 * `[uiField]` (and friends) is the Angular port of the Force UI
 * (radix-force-ui) Field — the layout wrapper that pairs a control with its
 * label, helper text and error. The pieces are attribute-selector components:
 *
 * - `[uiField]` — one field (label + control + description + error). `orientation`
 *   = `vertical` (default) / `horizontal` / `responsive`.
 * - `[uiFieldGroup]` — stacks multiple fields; owns the container query that
 *   `responsive` fields flip on.
 * - `[uiFieldSet]` / `[uiFieldLegend]` — native `<fieldset>`/`<legend>` grouping.
 * - `[uiFieldLabel]` — the `<label for>` for the control.
 * - `[uiFieldContent]` + `[uiFieldTitle]` — title/description block beside an
 *   inline control (checkbox/switch rows).
 * - `[uiFieldDescription]` — muted helper text (wire with `aria-describedby`).
 * - `[uiFieldError]` — `role="alert"` message (project text, or pass `[errors]`).
 * - `[uiFieldSeparator]` — a divider, optionally with a centered label.
 *
 * Copy follows the artist-language rule: version / experiment / share, never
 * changelist / depot. Labels are sentence case; errors say what to do next.
 */
const meta: Meta<FieldStoryArgs> = {
  title: 'UI/Field',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: FIELD_IMPORTS })],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ORIENTATIONS,
      description:
        '`vertical` stacks label over control; `horizontal` puts them on one row (checkbox/switch rows); `responsive` is vertical then horizontal past the `FieldGroup` container width.',
      table: {
        type: { summary: ORIENTATIONS.join(' | ') },
        defaultValue: { summary: 'vertical' },
      },
    },
    label: { control: 'text', description: 'Field label (sentence case).' },
    placeholder: { control: 'text', description: 'Input placeholder.' },
    description: { control: 'text', description: 'Muted helper text.' },
    showDescription: {
      control: 'boolean',
      description: 'Show the helper text under the control.',
    },
    invalid: {
      control: 'boolean',
      description:
        'Mark the field invalid — turns the label text `text-destructive`, sets the input `aria-invalid`, and reveals the error.',
    },
    error: {
      control: 'text',
      description:
        'Error message shown when invalid. Say what to do next, not just "Invalid".',
    },
    disabled: { control: 'boolean', description: 'Disable the control.' },
  },
  args: {
    orientation: 'vertical',
    label: 'Version name',
    placeholder: 'Untitled version',
    description: 'Shown in the timeline so you can find this version later.',
    showDescription: true,
    invalid: false,
    error: 'Enter a name to save this version.',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-80" [class.group]="disabled" [attr.data-disabled]="disabled ? true : null">
        <div uiField [orientation]="orientation" [invalid]="invalid">
          <label uiFieldLabel for="story-field">{{ label }}</label>
          <input
            uiInput
            id="story-field"
            [placeholder]="placeholder"
            [disabled]="disabled"
            [attr.aria-invalid]="invalid ? true : null"
            [attr.aria-describedby]="invalid ? 'story-field-err' : (showDescription ? 'story-field-desc' : null)"
          />
          @if (showDescription && !invalid) {
            <p uiFieldDescription id="story-field-desc">{{ description }}</p>
          }
          @if (invalid) {
            <div uiFieldError id="story-field-err">{{ error }}</div>
          }
        </div>
      </div>`,
  }),
};

export default meta;
type Story = StoryObj<FieldStoryArgs>;

/** Full control set — orientation, helper text, invalid/error, disabled. */
export const Playground: Story = {};

/** Vertical (default): label stacked above the control with helper text. */
export const Vertical: Story = {
  render: () => ({
    template: `
      <div uiField class="w-80">
        <label uiFieldLabel for="v-name">Version name</label>
        <input uiInput id="v-name" placeholder="Untitled version" aria-describedby="v-name-desc" />
        <p uiFieldDescription id="v-name-desc">Shown in the timeline so you can find this version later.</p>
      </div>`,
  }),
};

/**
 * Horizontal: an inline control (checkbox) beside a title + description block.
 * `FieldContent` wraps the text so the row top-aligns.
 */
export const Horizontal: Story = {
  render: () => ({
    template: `
      <div uiField orientation="horizontal" class="w-96 rounded-lg border border-border p-4">
        <button uiCheckbox id="h-sync" [checked]="false" aria-describedby="h-sync-desc"></button>
        <div uiFieldContent>
          <label uiFieldLabel for="h-sync">Sync on open</label>
          <p uiFieldDescription id="h-sync-desc">Pull the latest from the server whenever you open this workspace.</p>
        </div>
      </div>`,
  }),
};

/**
 * A `FieldSet` groups related fields under one `FieldLegend`, laid out in a
 * `FieldGroup`.
 */
export const FieldSetGroup: Story = {
  render: () => ({
    template: `
      <fieldset uiFieldSet class="w-96">
        <legend uiFieldLegend>Share settings</legend>
        <div uiFieldGroup>
          <div uiField>
            <label uiFieldLabel for="s-name">Share name</label>
            <input uiInput id="s-name" placeholder="Hero scene - feedback" />
          </div>
          <div uiField>
            <label uiFieldLabel for="s-note">Note for reviewers</label>
            <input uiInput id="s-note" placeholder="What should they look at?" />
          </div>
        </div>
      </fieldset>`,
  }),
};

/** A divider between groups of fields, with an optional centered label. */
export const Separator: Story = {
  render: () => ({
    template: `
      <div uiFieldGroup class="w-80">
        <div uiField>
          <label uiFieldLabel for="sep-name">Version name</label>
          <input uiInput id="sep-name" placeholder="Untitled version" />
        </div>
        <div uiFieldSeparator>or</div>
        <div uiField>
          <label uiFieldLabel for="sep-exp">Experiment name</label>
          <input uiInput id="sep-exp" placeholder="Try a new look" />
        </div>
      </div>`,
  }),
};

/**
 * Invalid field: the label turns `text-destructive`, the input is
 * `aria-invalid`, and `FieldError` (role `alert`) announces the message.
 */
export const WithError: Story = {
  render: () => ({
    template: `
      <div uiField invalid class="w-80">
        <label uiFieldLabel for="e-name">Version name</label>
        <input uiInput id="e-name" aria-invalid="true" aria-describedby="e-name-err" />
        <div uiFieldError id="e-name-err">Enter a name so you can find this version later.</div>
      </div>`,
  }),
};

/**
 * `FieldError` with a list of `[errors]` — duplicate messages collapse, and
 * more than one renders as a bulleted list.
 */
export const MultipleErrors: Story = {
  render: () => ({
    props: {
      errors: [
        { message: 'Enter a name so you can find this version later.' },
        { message: 'Use letters, numbers, spaces or dashes only.' },
      ],
    },
    template: `
      <div uiField invalid class="w-80">
        <label uiFieldLabel for="m-name">Version name</label>
        <input uiInput id="m-name" aria-invalid="true" aria-describedby="m-name-err" />
        <div uiFieldError id="m-name-err" [errors]="errors"></div>
      </div>`,
  }),
};

/**
 * Field of actions (Figma `Field / Buttons`): a horizontal `Field` holding the
 * form's submit/secondary buttons, plus a footer description with an inline
 * link. The buttons stretch to fill the field when it's full-width.
 */
export const WithButtons: Story = {
  render: () => ({
    template: `
      <div class="flex w-80 flex-col gap-6">
        <div uiField orientation="horizontal">
          <button uiButton variant="default">Submit</button>
          <button uiButton variant="outline">Save draft</button>
        </div>

        <div uiField>
          <button uiButton variant="default" class="w-full">Submit</button>
          <button uiButton variant="outline" class="w-full">Save draft</button>
          <p uiFieldDescription class="text-center">
            Already have a workspace? <a href="#">Open it</a>
          </p>
        </div>
      </div>`,
  }),
};

/**
 * A full form (Figma `Form examples`): a `FieldSet` titled with a `FieldLegend`,
 * a `FieldGroup` of fields, and a submit `Field` — the assembled recipe these
 * primitives are built for. Copy stays in artist language.
 *
 * In the app a form like this usually lives inside a Modal; the static bordered
 * card here is just the layout reference. Structure is a `border` (in-flow
 * content), not a shadow — shadows signal floating elevation only.
 */
export const FormExample: Story = {
  render: () => ({
    template: `
      <form class="w-96 rounded-xl border border-border bg-card p-6">
        <fieldset uiFieldSet>
          <legend uiFieldLegend>Share this version</legend>
          <p uiFieldDescription>Send a snapshot to a reviewer without submitting to the server.</p>

          <div uiFieldGroup>
            <div uiField>
              <label uiFieldLabel for="fe-name">Share name</label>
              <input uiInput id="fe-name" placeholder="Hero scene - feedback" aria-describedby="fe-name-desc" />
              <p uiFieldDescription id="fe-name-desc">How reviewers will see it.</p>
            </div>

            <div uiField>
              <label uiFieldLabel for="fe-note">Note for reviewers</label>
              <input uiInput id="fe-note" placeholder="What should they look at?" />
            </div>

            <div uiField orientation="horizontal">
              <button uiCheckbox id="fe-notify" [checked]="false" aria-describedby="fe-notify-desc"></button>
              <div uiFieldContent>
                <label uiFieldLabel for="fe-notify">Notify me on reply</label>
                <p uiFieldDescription id="fe-notify-desc">Get a message when a reviewer comments.</p>
              </div>
            </div>

            <div uiField>
              <button uiButton variant="default" class="w-full">Share version</button>
            </div>
          </div>
        </fieldset>
      </form>`,
  }),
};

/** Every layout + state together. */
export const Gallery: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <div uiField class="w-80">
          <label uiFieldLabel for="g-name">Version name</label>
          <input uiInput id="g-name" placeholder="Untitled version" aria-describedby="g-name-desc" />
          <p uiFieldDescription id="g-name-desc">Shown in the timeline.</p>
        </div>

        <div uiField orientation="horizontal" class="w-96 rounded-lg border border-border p-4">
          <button uiCheckbox id="g-sync" [checked]="false" aria-describedby="g-sync-desc"></button>
          <div uiFieldContent>
            <label uiFieldLabel for="g-sync">Sync on open</label>
            <p uiFieldDescription id="g-sync-desc">Pull the latest from the server.</p>
          </div>
        </div>

        <div uiField invalid class="w-80">
          <label uiFieldLabel for="g-err">Experiment name</label>
          <input uiInput id="g-err" aria-invalid="true" aria-describedby="g-err-msg" />
          <div uiFieldError id="g-err-msg">Enter a name so you can find this experiment later.</div>
        </div>
      </div>`,
  }),
};
