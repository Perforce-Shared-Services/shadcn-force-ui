import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { Textarea, type TextareaVariant } from './';
import { Label } from '../label';

const VARIANTS: TextareaVariant[] = ['outline', 'filled', 'underline', 'ghost'];

interface TextareaStoryArgs {
  variant: TextareaVariant;
  placeholder: string;
  value: string;
  rows: number;
  resizable: boolean;
  disabled: boolean;
  invalid: boolean;
  readonly: boolean;
}

/**
 * `textarea[uiTextarea]` — Angular port of the Force UI textarea. Attribute
 * selector on a native `<textarea>`; auto-grows (`field-sizing-content`) from a
 * `min-h-16` floor. Same field treatment as `input`: light resting border that
 * reinforces on hover, readable value text, muted read-only surface, native
 * `aria-invalid` error.
 */
const meta: Meta<TextareaStoryArgs> = {
  title: 'UI/Textarea',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Textarea, Label, CommonModule] })],
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'Fill treatment (mirrors input): outline/filled/underline/ghost.' },
    placeholder: { control: 'text', description: 'Placeholder hint; never a substitute for a <label>.' },
    value: { control: 'text', description: 'Initial value (full-contrast, readable).' },
    rows: { control: { type: 'number', min: 2, max: 12 }, description: 'Initial visible rows (it still auto-grows with content).' },
    resizable: { control: 'boolean', description: 'Show the drag-to-resize handle (vertical only). Off = resize-none, rely on auto-grow.' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean', description: 'aria-invalid="true" — red border/ring. Pair with aria-describedby error text.' },
    readonly: { control: 'boolean', description: 'Muted surface; value stays readable + selectable + copyable (not disabled).' },
  },
  args: {
    variant: 'outline',
    placeholder: 'Describe this version',
    value: '',
    rows: 3,
    resizable: true,
    disabled: false,
    invalid: false,
    readonly: false,
  },
  render: ({ variant, placeholder, value, rows, resizable, disabled, invalid, readonly }) => ({
    props: { variant, placeholder, value, rows, resizable, disabled, invalid, readonly },
    template: `
      <div class="w-80">
        <textarea
          uiTextarea
          [variant]="variant"
          [placeholder]="placeholder"
          [rows]="rows"
          [resizable]="resizable"
          [disabled]="disabled"
          [readOnly]="readonly"
          [attr.aria-invalid]="invalid ? 'true' : null">{{ value }}</textarea>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<TextareaStoryArgs>;

export const Playground: Story = {};
export const WithValue: Story = { args: { value: 'Blockout pass 2. Fixed the spec lighting and re-exported the master.' } };

/** Every fill variant (with value). Toggle dark-theme to check both ramps. */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="grid grid-cols-[88px_1fr] items-start gap-x-4 gap-y-3 w-[460px]">
        <span class="text-sm font-medium text-foreground pt-2">outline</span>
        <textarea uiTextarea variant="outline" rows="2" aria-label="outline variant">Blockout pass 2</textarea>
        <span class="text-sm font-medium text-foreground pt-2">filled</span>
        <textarea uiTextarea variant="filled" rows="2" aria-label="filled variant">Blockout pass 2</textarea>
        <span class="text-sm font-medium text-foreground pt-2">underline</span>
        <textarea uiTextarea variant="underline" rows="2" aria-label="underline variant">Blockout pass 2</textarea>
        <span class="text-sm font-medium text-foreground pt-2">ghost</span>
        <textarea uiTextarea variant="ghost" rows="2" aria-label="ghost variant">Blockout pass 2</textarea>
      </div>
    `,
  }),
};
export const Disabled: Story = { args: { disabled: true, value: 'locked' } };
export const ReadOnly: Story = { args: { readonly: true, value: 'p4://main/scene.uasset' } };
export const Invalid: Story = { args: { invalid: true, value: 'too short' } };

/** A labelled field with an aria-describedby error — the correct-by-default form pattern. */
export const FormPattern: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="w-80 flex flex-col gap-1.5">
        <label uiLabel for="ver-msg">Version message</label>
        <textarea uiTextarea id="ver-msg" rows="3" placeholder="What changed in this version?"></textarea>
        <p class="text-sm text-muted-foreground">Shown in the version history.</p>
      </div>
    `,
  }),
};

/** Gallery of states — toggle dark-theme in DevTools to check both ramps. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 w-80">
        <textarea uiTextarea rows="2" placeholder="Default" aria-label="default"></textarea>
        <textarea uiTextarea rows="2" aria-label="with value">Blockout pass 2</textarea>
        <textarea uiTextarea rows="2" readonly aria-label="read-only">p4://main/scene.uasset</textarea>
        <textarea uiTextarea rows="2" disabled aria-label="disabled">locked</textarea>
        <textarea uiTextarea rows="2" aria-invalid="true" aria-label="invalid">too short</textarea>
      </div>
    `,
  }),
};
