import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { Input, type InputVariant } from './';
import { Label } from '../label';

const VARIANTS: InputVariant[] = ['outline', 'filled', 'underline', 'ghost'];

// Inline Material Symbols `draft` glyph (from @material-symbols/svg-400), spliced
// into the GhostInContext demo below. Standalone (not an input slot), so it
// carries its own size + colour classes; `fill-current` makes it inherit the
// muted text colour (the Material Symbols SVGs have no `fill` attribute).
const ICON_DRAFT = '<svg aria-hidden="true" class="size-5 shrink-0 fill-current text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M237.69-100q-23.53 0-40.61-17.08T180-157.69v-644.62q0-23.53 17.08-40.61T237.69-860h323.7q12.05 0 22.76 4.81 10.7 4.81 18.7 12.42l159.92 159.92q7.61 8 12.42 18.7 4.81 10.71 4.81 22.76v483.7q0 23.53-17.08 40.61T722.31-100H237.69Zm324.85-573.62v-140.99H237.69q-4.61 0-8.46 3.84-3.84 3.85-3.84 8.46v644.62q0 4.61 3.84 8.46 3.85 3.84 8.46 3.84h484.62q4.61 0 8.46-3.84 3.84-3.85 3.84-8.46v-487.08H591.39q-11.99 0-20.42-8.43-8.43-8.44-8.43-20.42ZM225.39-814.61v169.84-169.84 669.22-669.22Z"/></svg>';

type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'
  | 'file';

const TYPES: InputType[] = [
  'text',
  'email',
  'password',
  'number',
  'search',
  'tel',
  'url',
  'file',
];

interface InputStoryArgs {
  variant: InputVariant;
  type: InputType;
  placeholder: string;
  value: string;
  disabled: boolean;
  invalid: boolean;
  readonly: boolean;
}

/**
 * `input[uiInput]` — Angular port of the Force UI (radix-force-ui) input. An
 * attribute selector on a native `<input>`, so the element keeps its native
 * `type`, `value`, `disabled`, `readonly` and a11y semantics; the component
 * layers the Force UI class string + `data-slot` / `data-variant`.
 *
 * **variant** (P4 One extension — the registry ships one style): `outline`
 * (default, verbatim registry) / `filled` (solid muted) / `underline` (bottom
 * rule) / `ghost` (borderless, for inline rename + table cells). Token-only.
 *
 * **Error state** is native `aria-invalid` (red border/ring). Always pair it
 * with visible message text wired via `aria-describedby` — colour alone is not
 * a sufficient signal (WCAG 1.4.1). See **Form patterns**.
 *
 * **Icons / addons** (chevron, search glyph, password reveal, prefix text) are
 * NOT done on the bare input — a native `<input>` can't hold children. Use the
 * forthcoming **input-group** component for that.
 *
 * **Story map:** Playground (all controls) · Variants (fill × state matrix) ·
 * Input types · States · Form patterns (label + error, copy these).
 */
const meta: Meta<InputStoryArgs> = {
  title: 'UI/Input',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Input, Label, CommonModule] })],
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'Fill treatment (P4 One extension). outline=bordered (default) / filled=solid muted / underline=bottom rule / ghost=borderless for inline edit.' },
    type: { control: 'select', options: TYPES, description: 'Native input type — drives the browser chrome (password dots, file picker, number spinners).' },
    placeholder: { control: 'text', description: 'Placeholder hint. Describes the expected content; never a substitute for a <label>.' },
    value: { control: 'text', description: 'Initial value (renders in text-foreground, fully readable).' },
    disabled: { control: 'boolean', description: 'Native disabled — non-interactive, dims to opacity-50 + muted bg, blocks keyboard + pointer.' },
    invalid: { control: 'boolean', description: 'Sets aria-invalid="true" — red border + ring. Pair with visible error text via aria-describedby (see Form patterns).' },
    readonly: { control: 'boolean', description: 'Native readonly — muted surface (not editable) but value stays full-contrast, focusable, selectable + copyable, and announced. NOT disabled: read-only = a real value you can read/copy but not change here.' },
  },
  args: {
    variant: 'outline',
    type: 'text',
    placeholder: 'Search files and versions',
    value: '',
    disabled: false,
    invalid: false,
    readonly: false,
  },
  render: ({ variant, type, placeholder, value, disabled, invalid, readonly }) => ({
    props: { variant, type, placeholder, value, disabled, invalid, readonly },
    template: `
      <div class="w-72">
        <input
          uiInput
          [variant]="variant"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readOnly]="readonly"
          [attr.aria-invalid]="invalid ? 'true' : null" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<InputStoryArgs>;

/** Full control set — exercise variant, type, and every state from one panel. */
export const Playground: Story = {};

/**
 * Every fill variant × its key states. Each row is a treatment; columns are
 * resting / with-value / invalid / disabled. Toggle `dark-theme` in DevTools to
 * check both ramps. This is the at-a-glance reference.
 */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="grid grid-cols-[88px_repeat(4,1fr)] items-center gap-x-4 gap-y-3 w-[640px]">
        <span class="text-sm text-muted-foreground"></span>
        <span class="text-sm text-muted-foreground">Resting</span>
        <span class="text-sm text-muted-foreground">Value</span>
        <span class="text-sm text-muted-foreground">Invalid</span>
        <span class="text-sm text-muted-foreground">Disabled</span>

        <span class="text-sm font-medium text-foreground">outline</span>
        <input uiInput variant="outline" placeholder="Placeholder" aria-label="outline, resting" />
        <input uiInput variant="outline" value="Blockout pass 2" aria-label="outline, with value" />
        <input uiInput variant="outline" value="lighting test" aria-invalid="true" aria-label="outline, invalid" />
        <input uiInput variant="outline" value="locked" disabled aria-label="outline, disabled" />

        <span class="text-sm font-medium text-foreground">filled</span>
        <input uiInput variant="filled" placeholder="Placeholder" aria-label="filled, resting" />
        <input uiInput variant="filled" value="Blockout pass 2" aria-label="filled, with value" />
        <input uiInput variant="filled" value="lighting test" aria-invalid="true" aria-label="filled, invalid" />
        <input uiInput variant="filled" value="locked" disabled aria-label="filled, disabled" />

        <span class="text-sm font-medium text-foreground">underline</span>
        <input uiInput variant="underline" placeholder="Placeholder" aria-label="underline, resting" />
        <input uiInput variant="underline" value="Blockout pass 2" aria-label="underline, with value" />
        <input uiInput variant="underline" value="lighting test" aria-invalid="true" aria-label="underline, invalid" />
        <input uiInput variant="underline" value="locked" disabled aria-label="underline, disabled" />

        <span class="text-sm font-medium text-foreground">ghost</span>
        <input uiInput variant="ghost" placeholder="Placeholder" aria-label="ghost, resting" />
        <input uiInput variant="ghost" value="Blockout pass 2" aria-label="ghost, with value" />
        <input uiInput variant="ghost" value="lighting test" aria-invalid="true" aria-label="ghost, invalid" />
        <input uiInput variant="ghost" value="locked" disabled aria-label="ghost, disabled" />
      </div>
    `,
  }),
};

/**
 * Native input types. The `type` selects the browser chrome — password dots,
 * the file picker button (uses `file:*` classes), number spinners, search.
 */
export const InputTypes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="grid grid-cols-[96px_1fr] items-center gap-x-4 gap-y-3 w-96">
        <span class="text-sm text-muted-foreground">text</span>
        <input uiInput type="text" placeholder="Asset name" aria-label="text input" />
        <span class="text-sm text-muted-foreground">email</span>
        <input uiInput type="email" placeholder="teammate@studio.com" aria-label="email input" />
        <span class="text-sm text-muted-foreground">password</span>
        <input uiInput type="password" value="my-password" aria-label="password input" />
        <span class="text-sm text-muted-foreground">search</span>
        <input uiInput type="search" placeholder="Search files and versions" aria-label="search input" />
        <span class="text-sm text-muted-foreground">number</span>
        <input uiInput type="number" value="42" aria-label="number input" />
        <span class="text-sm text-muted-foreground">file</span>
        <input uiInput type="file" aria-label="file input" />
      </div>
    `,
  }),
};

/**
 * The interactive + attribute states. Focus is keyboard-only — tab into the
 * first field to see the indigo ring; the rest are attribute-driven.
 *
 * Note the difference between the last two rows: `disabled` is dimmed and
 * inert (out of tab order, not copyable — "not available"), while `read-only`
 * keeps a full-contrast value on a muted surface and stays focusable +
 * selectable + copyable + announced ("a real value you can read but not edit
 * here", e.g. a generated id or workspace path).
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="grid grid-cols-[96px_1fr] items-center gap-x-4 gap-y-3 w-96">
        <span class="text-sm text-muted-foreground">default</span>
        <input uiInput placeholder="Asset name" aria-label="default" />
        <span class="text-sm text-muted-foreground">with value</span>
        <input uiInput value="Blockout pass 2" aria-label="with value" />
        <span class="text-sm text-muted-foreground">invalid</span>
        <input uiInput value="lighting test" aria-invalid="true" aria-label="invalid" />
        <span class="text-sm text-muted-foreground">disabled</span>
        <input uiInput value="locked" disabled aria-label="disabled" />
        <span class="text-sm text-muted-foreground">read-only</span>
        <input uiInput value="main workspace" readonly aria-label="read-only" />
      </div>
    `,
  }),
};

/**
 * Correct-by-default form composition — copy these. A programmatic `<label for>`
 * (WCAG 1.3.1 / 4.1.2), helper text, and an error field whose message is linked
 * via `aria-describedby` (WCAG 1.4.1 non-colour signal + 3.3.1 announced).
 */
export const FormPatterns: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6 w-72">
        <div class="flex flex-col gap-1.5">
          <label uiLabel for="exp-name">Experiment name</label>
          <input uiInput id="exp-name" type="text" placeholder="lighting-test" />
          <p class="text-sm text-muted-foreground">Lowercase, no spaces. You can rename it later.</p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label uiLabel for="exp-name-err">Experiment name</label>
          <input
            uiInput
            id="exp-name-err"
            type="text"
            value="lighting test"
            aria-invalid="true"
            aria-describedby="exp-name-err-msg" />
          <p id="exp-name-err-msg" class="text-sm text-destructive">Spaces are not allowed. Try lighting-test instead.</p>
        </div>
      </div>
    `,
  }),
};

/**
 * The `ghost` variant has no resting boundary by design — only use it where the
 * surrounding context already signals "editable" (a hovered/selected table row,
 * an inline-rename target). It is NOT a standalone form field. Here it sits in a
 * row that tints + reveals the field on hover, the same affordance a file list
 * gives. Hover a row to see the field surface.
 */
export const GhostInContext: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="w-80 rounded-lg border border-border divide-y divide-border">
        <div class="flex items-center gap-2 px-2 py-1 hover:bg-muted/50">
          ${ICON_DRAFT}
          <input uiInput variant="ghost" value="character_base" aria-label="Rename file" />
        </div>
        <div class="flex items-center gap-2 px-2 py-1 hover:bg-muted/50">
          ${ICON_DRAFT}
          <input uiInput variant="ghost" value="lighting_test" aria-label="Rename file" />
        </div>
        <div class="flex items-center gap-2 px-2 py-1 hover:bg-muted/50">
          ${ICON_DRAFT}
          <input uiInput variant="ghost" value="blockout_pass_2" aria-label="Rename file" />
        </div>
      </div>
    `,
  }),
};
