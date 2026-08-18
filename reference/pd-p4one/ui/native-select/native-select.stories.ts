import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import {
  NativeSelectWrapper,
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
  type NativeSelectSize,
} from './';
import { Label } from '../label';

const SIZES: NativeSelectSize[] = ['default', 'sm'];

interface NSArgs {
  size: NativeSelectSize;
  disabled: boolean;
  invalid: boolean;
}

/**
 * `[uiNativeSelectWrapper]` + `select[uiNativeSelect]` port the registry's
 * `NativeSelect` — a plain `<select>` styled to match Force UI, for cases
 * that don't need the custom listbox from `ui/select` (a native OS picker,
 * lighter weight, works inside `<form>` without JS). Split into two
 * directives (a P4 One / Angular extension, see native-select-wrapper.
 * component.ts) so `<select uiNativeSelect>` stays a genuine native control —
 * ngModel / formControlName / (change) / [disabled] all bind directly.
 *
 * `size`: default (h-8) / sm (h-7, compact toolbars and dense forms).
 */
const meta: Meta<NSArgs> = {
  title: 'UI/NativeSelect',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NativeSelectWrapper, NativeSelect, NativeSelectOption, NativeSelectOptGroup, Label],
    }),
  ],
  argTypes: {
    size: { control: 'select', options: SIZES, description: 'default (h-8) / sm (h-7, compact).' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean', description: 'aria-invalid on the select — drives the red border/ring.' },
  },
  args: {
    size: 'default',
    disabled: false,
    invalid: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div uiNativeSelectWrapper [size]="size">
        <select uiNativeSelect [size]="size" [disabled]="disabled" [attr.aria-invalid]="invalid ? 'true' : null" aria-label="Native select demo field">
          <option uiNativeSelectOption value="main">main</option>
          <option uiNativeSelectOption value="lighting-pass">lighting-pass</option>
          <option uiNativeSelectOption value="blockout-2">blockout-2</option>
        </select>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<NSArgs>;

/** Full control set — size, disabled, invalid. */
export const Playground: Story = {};

/** default (h-8) vs sm (h-7, compact toolbars / dense forms). */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <div uiNativeSelectWrapper>
          <select uiNativeSelect aria-label="default size">
            <option uiNativeSelectOption value="main">main</option>
            <option uiNativeSelectOption value="lighting-pass">lighting-pass</option>
          </select>
        </div>
        <div uiNativeSelectWrapper size="sm">
          <select uiNativeSelect size="sm" aria-label="sm size">
            <option uiNativeSelectOption value="main">main</option>
            <option uiNativeSelectOption value="lighting-pass">lighting-pass</option>
          </select>
        </div>
      </div>
    `,
  }),
};

/** Grouped options via `optgroup[uiNativeSelectOptGroup]`. */
export const OptionGroups: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiNativeSelectWrapper>
        <select uiNativeSelect aria-label="Choose an experiment">
          <optgroup uiNativeSelectOptGroup label="Experiments">
            <option uiNativeSelectOption value="lighting-pass">lighting-pass</option>
            <option uiNativeSelectOption value="blockout-2">blockout-2</option>
          </optgroup>
          <optgroup uiNativeSelectOptGroup label="Main">
            <option uiNativeSelectOption value="main">main</option>
          </optgroup>
        </select>
      </div>
    `,
  }),
};

/**
 * Correct-by-default labelling — copy this. The wrapper isn't a labelable
 * element, so the `<label for>` points at the inner `<select>`'s id. The
 * error field links its message via `aria-describedby` (non-colour signal,
 * announced) alongside `aria-invalid` (WCAG 1.3.1 / 1.4.1 / 3.3.1 / 4.1.2).
 */
export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6 w-64">
        <div class="flex flex-col gap-1.5">
          <label uiLabel for="ns-branch">Branch</label>
          <div uiNativeSelectWrapper class="w-full">
            <select uiNativeSelect id="ns-branch" class="w-full">
              <option uiNativeSelectOption value="main">main</option>
              <option uiNativeSelectOption value="lighting-pass">lighting-pass</option>
            </select>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label uiLabel for="ns-region">Region</label>
          <div uiNativeSelectWrapper class="w-full">
            <select uiNativeSelect id="ns-region" class="w-full" aria-invalid="true" aria-describedby="ns-region-err">
              <option uiNativeSelectOption value="">Choose a region</option>
              <option uiNativeSelectOption value="us">US</option>
            </select>
          </div>
          <p id="ns-region-err" class="text-sm text-destructive">Region is required to sync assets from the nearest server.</p>
        </div>
      </div>
    `,
  }),
};

/** Disabled + invalid, side by side with the resting state. */
export const StatesGallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <div uiNativeSelectWrapper>
          <select uiNativeSelect aria-label="resting">
            <option uiNativeSelectOption value="main">main</option>
          </select>
        </div>
        <div uiNativeSelectWrapper>
          <select uiNativeSelect disabled aria-label="disabled">
            <option uiNativeSelectOption value="main">main</option>
          </select>
        </div>
        <div uiNativeSelectWrapper>
          <select uiNativeSelect aria-invalid="true" aria-label="invalid">
            <option uiNativeSelectOption value="main">main</option>
          </select>
        </div>
      </div>
    `,
  }),
};
