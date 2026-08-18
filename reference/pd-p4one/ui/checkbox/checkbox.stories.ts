import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Checkbox } from './';

type CheckedOption = 'unchecked' | 'checked' | 'indeterminate';

interface CheckboxStoryArgs {
  checked: CheckedOption;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  invalid: boolean;
  label: string;
}

/** Map the story's friendly enum to the radix `checked` value. */
const toCheckedValue = (c: CheckedOption): boolean | 'indeterminate' =>
  c === 'checked' ? true : c === 'indeterminate' ? 'indeterminate' : false;

/**
 * `[uiCheckbox]` is the Angular port of the Force UI (radix-force-ui) checkbox.
 * It's an attribute selector on a native `<button>`: the radix-ng host
 * directives turn it into an accessible checkbox (`role="checkbox"`,
 * `aria-checked`, Space to toggle), and the control renders its own
 * checkmark / dash glyph (inline Material Symbols Rounded `<svg>`).
 *
 * The control has no visual variants or sizes — every checkbox is the same
 * 16x16 square. The only behavioural dimensions are the checked state
 * (unchecked / checked / indeterminate), disabled, readonly, required, and the
 * error (`aria-invalid`) state.
 *
 * Labelling (read before copying into product):
 * - A `<button>` is a *labelable* element, so wrapping it in a `<label>` (as
 *   these stories do) makes the label text a click target that toggles the
 *   control — no `htmlFor` wiring needed.
 * - A checkbox with NO adjacent text (e.g. a "select all" table header) MUST
 *   carry an `aria-label` on the host, or it is unnamed to screen readers.
 * - The indeterminate state is announced as `aria-checked="mixed"` automatically
 *   and is programmatic only — a user click on it resolves to checked.
 *
 * Copy: write labels as positive statements describing what checking does
 * ("Keep local versions after submit", not "Don't discard…"), sentence case,
 * specific over generic.
 */
const meta: Meta<CheckboxStoryArgs> = {
  title: 'UI/Checkbox',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Checkbox] })],
  argTypes: {
    checked: {
      control: 'inline-radio',
      options: ['unchecked', 'checked', 'indeterminate'],
      description:
        'Checked state. `indeterminate` shows a dash (announced `aria-checked="mixed"`) — used for a "select all" header when only some rows are selected.',
      table: { defaultValue: { summary: 'unchecked' } },
    },
    disabled: {
      control: 'boolean',
      description:
        'Inactive state: sets native `disabled`, drops the control from the tab order, and dims control + label to 50%.',
    },
    readonly: {
      control: 'boolean',
      description: 'Shows the current state but blocks toggling (no value change on click/Space).',
    },
    required: {
      control: 'boolean',
      description: 'Marks the checkbox required (`aria-required`) — e.g. a terms-acceptance gate.',
    },
    invalid: {
      control: 'boolean',
      description:
        'Error state: sets `aria-invalid="true"` and switches the border to the destructive token. Pair with a FieldError message in product.',
    },
    label: {
      control: 'text',
      description: 'Label text. Positive statement, sentence case.',
    },
  },
  args: {
    checked: 'unchecked',
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    label: 'Keep local versions after submit',
  },
  render: (args) => ({
    props: {
      ...args,
      model: toCheckedValue(args.checked),
    },
    template: `
      <label class="flex items-start gap-2.5 text-sm leading-snug select-none">
        <button
          uiCheckbox
          class="mt-px"
          [checked]="model"
          (checkedChange)="model = $event"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [attr.aria-invalid]="invalid ? 'true' : null"
        ></button>
        <span class="font-medium">{{ label }}</span>
      </label>
    `,
  }),
};

export default meta;
type Story = StoryObj<CheckboxStoryArgs>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { checked: 'checked', label: 'Sync from server when the workspace opens' },
};

/**
 * Programmatic state for a "select all" header when only some rows are selected.
 * A user click resolves it to checked (selects the rest); it cannot be set by
 * the user directly.
 */
export const Indeterminate: Story = {
  args: { checked: 'indeterminate', label: 'Select all changed files' },
};

/** Disabled dims the control and its label and removes it from the tab order. */
export const Disabled: Story = {
  args: { checked: 'checked', disabled: true, label: 'Auto-detect file changes' },
};

/**
 * Error state: destructive border + `aria-invalid="true"`, with the FieldError
 * message wired via `aria-describedby` so screen readers announce it with the
 * control. Color is never the only error signal — the message text carries it
 * too. (In product this composition lives in a Field wrapper.)
 */
export const Error: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-1.5">
        <label class="flex items-start gap-2.5 text-sm select-none">
          <button uiCheckbox class="mt-px" required aria-invalid="true" aria-describedby="cb-terms-error"></button>
          <span class="font-medium">Accept the sharing terms</span>
        </label>
        <p id="cb-terms-error" class="text-xs text-destructive">Accept the terms before you share this version.</p>
      </div>
    `,
  }),
};

/**
 * A "select all" header carries no adjacent label, so it MUST have an explicit
 * `aria-label`. The glyph alone is not an accessible name. Make the label
 * context-specific — name what is selected ("files", "versions", "experiments"),
 * not a generic "rows".
 */
export const NoVisibleLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <button uiCheckbox checked="indeterminate" aria-label="Select all files"></button>
    `,
  }),
};

/**
 * A checkbox group: a `<fieldset>` with a `<legend>` names the set, each
 * checkbox keeps its own label. Tab moves through them individually (arrow keys
 * are for radios, not checkboxes).
 */
export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <fieldset class="flex flex-col gap-3">
        <legend class="mb-2 text-sm font-medium text-foreground">Include in this version</legend>
        <label class="flex items-center gap-2.5 text-sm select-none">
          <button uiCheckbox [checked]="true"></button>
          <span class="font-medium">Source files</span>
        </label>
        <label class="flex items-center gap-2.5 text-sm select-none">
          <button uiCheckbox [checked]="true"></button>
          <span class="font-medium">Textures and materials</span>
        </label>
        <label class="flex items-center gap-2.5 text-sm select-none">
          <button uiCheckbox></button>
          <span class="font-medium">Render output</span>
        </label>
      </fieldset>
    `,
  }),
};

/**
 * Box / selectable-card composition (Figma `Type=Box`). This is NOT a checkbox
 * variant — the atomic `[uiCheckbox]` stays the 16x16 control. The card is built
 * by composing tokens around it, so product code drops a card in only where it's
 * needed. The whole card is the click target (`<label>` wrapping the control),
 * and the selected card highlights via `has-[[data-state=checked]]` →
 * `border-primary` + `bg-primary-subtle`. Copy this pattern; don't push it into
 * the component. (If it becomes common, promote it to a dedicated CheckboxCard.)
 */
export const BoxCard: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex max-w-sm flex-col gap-3">
        <label class="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm select-none cursor-pointer transition-colors hover:border-input has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle">
          <button uiCheckbox class="mt-0.5" [checked]="true"></button>
          <span class="flex flex-col gap-0.5">
            <span class="font-medium">Include textures and materials</span>
            <span class="text-xs text-muted-foreground">Adds linked texture maps to this version so teammates get the full look.</span>
          </span>
        </label>
        <label class="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm select-none cursor-pointer transition-colors hover:border-input has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle">
          <button uiCheckbox class="mt-0.5"></button>
          <span class="flex flex-col gap-0.5">
            <span class="font-medium">Include render output</span>
            <span class="text-xs text-muted-foreground">Adds rendered frames. Increases upload size noticeably.</span>
          </span>
        </label>
      </div>
    `,
  }),
};

/** Every state side by side — for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-5">
        <div class="flex flex-wrap items-center gap-6">
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiCheckbox></button><span class="font-medium">Unchecked</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiCheckbox [checked]="true"></button><span class="font-medium">Checked</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiCheckbox checked="indeterminate"></button><span class="font-medium">Indeterminate</span>
          </label>
        </div>
        <div class="flex flex-wrap items-center gap-6">
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiCheckbox disabled></button><span class="font-medium text-muted-foreground">Disabled</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiCheckbox disabled [checked]="true"></button><span class="font-medium text-muted-foreground">Disabled checked</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiCheckbox aria-invalid="true"></button><span class="font-medium">Error</span>
          </label>
        </div>
      </div>
    `,
  }),
};
