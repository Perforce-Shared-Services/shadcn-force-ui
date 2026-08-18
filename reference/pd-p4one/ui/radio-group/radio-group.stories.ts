import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { RadioGroup, RadioGroupItem } from './';

interface RadioGroupStoryArgs {
  value: string;
  disabled: boolean;
  invalid: boolean;
  orientation: 'vertical' | 'horizontal';
}

/**
 * `[uiRadioGroup]` + `[uiRadioGroupItem]` are the Angular port of the Force UI
 * (radix-force-ui) radio group. The group is an attribute selector on any
 * container (radix-ng `RdxRadioGroupDirective` → `role="radiogroup"`, single
 * selection, arrow-key roving focus, form `ControlValueAccessor`); each item is
 * an attribute selector on a native `<button>` (`role="radio"`, `aria-checked`,
 * `data-state`, native `disabled`).
 *
 * Use a radio group when the user picks EXACTLY ONE of a small, visible set of
 * mutually exclusive options. For on/off use a switch; for "pick any" use
 * checkboxes; for many options use a select.
 *
 * Labelling: the group needs an accessible name (`aria-label` or a heading via
 * `aria-labelledby` / a `<fieldset><legend>`). Each item needs its own label —
 * wrap it in a `<label>` (a `<button>` is labelable) or place adjacent text.
 * Write option labels in artist language, sentence case.
 */
const meta: Meta<RadioGroupStoryArgs> = {
  title: 'UI/RadioGroup',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CommonModule, RadioGroup, RadioGroupItem] })],
  argTypes: {
    value: {
      control: 'inline-radio',
      options: ['draft', 'preview', 'final'],
      description: 'Selected item value (two-way `[(value)]` in product).',
      table: { defaultValue: { summary: 'preview' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the whole group — dims it and drops it from the tab order.',
    },
    invalid: {
      control: 'boolean',
      description:
        'Sets `aria-invalid="true"` on each item: destructive border + halo. Pair with a FieldError message.',
    },
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
      description: 'Arrow-key navigation direction; also drives the layout in these stories.',
      table: { defaultValue: { summary: 'vertical' } },
    },
  },
  args: {
    value: 'preview',
    disabled: false,
    invalid: false,
    orientation: 'vertical',
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <fieldset
        uiRadioGroup
        [(value)]="value"
        [disabled]="disabled"
        [orientation]="orientation"
        aria-label="Export quality"
        [class]="orientation === 'horizontal' ? 'flex flex-row gap-5' : ''"
      >
        <label class="flex items-center gap-2.5 text-sm select-none">
          <button uiRadioGroupItem value="draft" [attr.aria-invalid]="invalid ? 'true' : null"></button>
          <span class="font-medium">Draft</span>
        </label>
        <label class="flex items-center gap-2.5 text-sm select-none">
          <button uiRadioGroupItem value="preview" [attr.aria-invalid]="invalid ? 'true' : null"></button>
          <span class="font-medium">Preview</span>
        </label>
        <label class="flex items-center gap-2.5 text-sm select-none">
          <button uiRadioGroupItem value="final" [attr.aria-invalid]="invalid ? 'true' : null"></button>
          <span class="font-medium">Final</span>
        </label>
      </fieldset>
    `,
  }),
};

export default meta;
type Story = StoryObj<RadioGroupStoryArgs>;

export const Playground: Story = {};

/**
 * Options with helper text — the canonical settings composition: label on top,
 * a muted description below, the control on the left.
 */
export const WithDescriptions: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <fieldset uiRadioGroup value="incremental" aria-label="Sync mode" class="grid gap-3 max-w-sm">
        <label class="flex items-start gap-2.5 text-sm select-none">
          <button uiRadioGroupItem value="incremental" class="mt-0.5"></button>
          <span class="flex flex-col gap-0.5">
            <span class="font-medium">Sync changed files only</span>
            <span class="text-xs text-muted-foreground">Faster - pulls just the files that differ from the server.</span>
          </span>
        </label>
        <label class="flex items-start gap-2.5 text-sm select-none">
          <button uiRadioGroupItem value="full" class="mt-0.5"></button>
          <span class="flex flex-col gap-0.5">
            <span class="font-medium">Sync the whole workspace</span>
            <span class="text-xs text-muted-foreground">Slower - re-checks every file. Use after a connection problem.</span>
          </span>
        </label>
      </fieldset>
    `,
  }),
};

/** Horizontal layout for two or three short options. */
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

/** A single disabled option alongside selectable ones. */
export const DisabledItem: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <fieldset uiRadioGroup value="local" aria-label="Where to save" class="grid gap-2">
        <label class="flex items-center gap-2.5 text-sm select-none">
          <button uiRadioGroupItem value="local"></button>
          <span class="font-medium">This computer</span>
        </label>
        <label class="flex items-center gap-2.5 text-sm select-none">
          <button uiRadioGroupItem value="server"></button>
          <span class="font-medium">Shared server</span>
        </label>
        <label class="flex items-center gap-2.5 text-sm text-muted-foreground select-none">
          <button uiRadioGroupItem value="cloud" disabled></button>
          <span class="font-medium">Cloud archive (not set up)</span>
        </label>
      </fieldset>
    `,
  }),
};

/**
 * Invalid state: `aria-invalid="true"` gives each item the destructive border +
 * halo. The error reason is wired via `aria-describedby` to a FieldError so it's
 * announced and not colour-alone (WCAG 3.3.1 / 1.4.1).
 */
export const Invalid: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-1.5 max-w-sm">
        <fieldset uiRadioGroup required aria-label="Export quality" class="grid gap-2">
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiRadioGroupItem value="draft" aria-invalid="true" aria-describedby="rg-quality-error"></button>
            <span class="font-medium">Draft</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiRadioGroupItem value="final" aria-invalid="true" aria-describedby="rg-quality-error"></button>
            <span class="font-medium">Final</span>
          </label>
        </fieldset>
        <p id="rg-quality-error" class="text-xs text-destructive">Choose an export quality before you continue.</p>
      </div>
    `,
  }),
};

/** Selected, unselected, disabled, and invalid items side by side for review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-5">
        <fieldset uiRadioGroup value="b" aria-label="States" class="flex flex-row flex-wrap gap-6">
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiRadioGroupItem value="a"></button><span class="font-medium">Unselected</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiRadioGroupItem value="b"></button><span class="font-medium">Selected</span>
          </label>
        </fieldset>
        <fieldset uiRadioGroup value="d" disabled aria-label="Disabled states" class="flex flex-row flex-wrap gap-6">
          <label class="flex items-center gap-2.5 text-sm text-muted-foreground select-none">
            <button uiRadioGroupItem value="c"></button><span class="font-medium">Disabled unselected</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm text-muted-foreground select-none">
            <button uiRadioGroupItem value="d"></button><span class="font-medium">Disabled selected</span>
          </label>
        </fieldset>
        <fieldset uiRadioGroup value="f" aria-label="Invalid states" class="flex flex-row flex-wrap gap-6">
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiRadioGroupItem value="e" aria-invalid="true"></button><span class="font-medium">Invalid unselected</span>
          </label>
          <label class="flex items-center gap-2.5 text-sm select-none">
            <button uiRadioGroupItem value="f" aria-invalid="true"></button><span class="font-medium">Invalid selected</span>
          </label>
        </fieldset>
      </div>
    `,
  }),
};
