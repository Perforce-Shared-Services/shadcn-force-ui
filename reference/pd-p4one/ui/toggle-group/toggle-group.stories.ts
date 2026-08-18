import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { type ToggleSize, type ToggleVariant } from '../toggle/toggle.variants';
import { ToggleGroup, ToggleGroupItem, type ToggleGroupOrientation } from './';

const VARIANTS: ToggleVariant[] = ['default', 'outline'];
const SIZES: ToggleSize[] = ['sm', 'default', 'lg'];
const TYPES = ['single', 'multiple'] as const;
const ORIENTATIONS: ToggleGroupOrientation[] = ['horizontal', 'vertical'];

// Material Symbols Rounded — raw inline SVG strings, interpolated into the
// static story templates with ${}. Decorative: each item carries its own
// aria-label for the accessible name.
const ALIGN_LEFT = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M150-120q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z"/></svg>`;
const ALIGN_CENTER = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M150-120q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm160-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h340q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H310ZM150-450q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm160-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h340q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H310ZM150-780q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z"/></svg>`;
const ALIGN_RIGHT = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M150-780q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm240 165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H390ZM150-450q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm240 165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h420q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H390ZM150-120q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z"/></svg>`;
const ALIGN_JUSTIFY = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M150-120q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Zm0-165q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h660q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H150Z"/></svg>`;
const BOLD = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M335-200q-25 0-42.5-17.5T275-260v-440q0-25 17.5-42.5T335-760h168q66 0 114.5 42T666-612q0 38-21 70t-56 49v6q43 14 69.5 50t26.5 81q0 68-52.5 112T510-200H335Zm26-76h144q38 0 66-25t28-63q0-37-28-62t-66-25H361v175Zm0-247h136q35 0 60.5-23t25.5-58q0-35-25.5-58.5T497-686H361v163Z"/></svg>`;
const ITALIC = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M264-199q-16.8 0-28.4-11.64-11.6-11.64-11.6-28.5t11.6-28.36Q247.2-279 264-279h94l139-409H378q-16.8 0-28.4-11.64-11.6-11.64-11.6-28.5t11.6-28.36Q361.2-768 378-768h300q16.8 0 28.4 11.64 11.6 11.64 11.6 28.5t-11.6 28.36Q694.8-688 678-688h-94L445-279h119q16.8 0 28.4 11.64 11.6 11.64 11.6 28.5t-11.6 28.36Q580.8-199 564-199H264Z"/></svg>`;
const UNDERLINE = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M230-140q-13 0-21.5-8.5T200-170q0-13 8.5-21.5T230-200h500q13 0 21.5 8.5T760-170q0 13-8.5 21.5T730-140H230Zm93.5-198.5Q267-397 267-497v-302q0-17 12.5-29t29.5-12q17 0 29 12t12 29v302q0 63 34 101t96 38q62 0 96-38t34-101v-302q0-17 12.5-29t29.5-12q17 0 29 12t12 29v302q0 100-56.5 158.5T480-280q-100 0-156.5-58.5Z"/></svg>`;

interface ToggleGroupStoryArgs {
  variant: ToggleVariant;
  size: ToggleSize;
  type: (typeof TYPES)[number];
  spacing: number;
  orientation: ToggleGroupOrientation;
  disabled: boolean;
}

/**
 * `[uiToggleGroup]` is the Angular port of the Force UI (radix-force-ui)
 * toggle group. It groups a set of `[uiToggleGroupItem]` buttons into a single
 * control with shared selection state, driven by the radix-ng
 * `RdxToggleGroupDirective` (roving-focus arrow-key navigation, forms support).
 *
 * The item look is REUSED from `ui/toggle` — the group sets `variant`/`size`
 * once and each item inherits it. Use `single` for mutually-exclusive choices
 * (text alignment) and `multiple` for independent flags (bold / italic /
 * underline). Set `spacing="0"` for a connected segmented control.
 *
 * Accessibility:
 * - Give the group an `aria-label` (or `aria-labelledby`).
 * - Icon-only items MUST carry their own `aria-label`.
 */
const meta: Meta<ToggleGroupStoryArgs> = {
  title: 'UI/Toggle Group',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ToggleGroup, ToggleGroupItem] })],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Item look, applied to the whole group. Reused from `ui/toggle`.',
      table: { type: { summary: VARIANTS.join(' | ') }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: SIZES,
      description: 'Item height + padding, applied to the whole group.',
      table: { type: { summary: SIZES.join(' | ') }, defaultValue: { summary: 'default' } },
    },
    type: {
      control: 'inline-radio',
      options: TYPES,
      description: '`single` = one selection (radio-like); `multiple` = independent flags.',
      table: { type: { summary: TYPES.join(' | ') }, defaultValue: { summary: 'single' } },
    },
    spacing: {
      control: { type: 'radio' },
      options: [0, 2],
      description: '`2` = separated pills (default); `0` = connected segmented control.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '2' } },
    },
    orientation: {
      control: 'inline-radio',
      options: ORIENTATIONS,
      description:
        'Layout direction. Arrow keys follow it: left/right for horizontal, up/down for vertical.',
      table: {
        type: { summary: ORIENTATIONS.join(' | ') },
        defaultValue: { summary: 'horizontal' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the whole group.',
    },
  },
  args: {
    variant: 'outline',
    size: 'default',
    type: 'single',
    spacing: 2,
    orientation: 'horizontal',
    disabled: false,
  },
  render: (args) => ({
    props: { ...args, ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT, ALIGN_JUSTIFY },
    template: `
      <div uiToggleGroup
        [variant]="variant"
        [size]="size"
        [type]="type"
        [spacing]="spacing"
        [orientation]="orientation"
        [disabled]="disabled"
        [value]="type === 'single' ? 'center' : ['center']"
        aria-label="Text alignment"
      >
        <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
        <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
        <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
        <button uiToggleGroupItem value="justify" aria-label="Justify">${ALIGN_JUSTIFY}</button>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ToggleGroupStoryArgs>;

export const Playground: Story = {};

/** Single selection — mutually exclusive, like a radio group. */
export const Single: Story = {
  args: { type: 'single' },
};

/** Multiple selection — independent flags that toggle on their own. */
export const Multiple: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { BOLD, ITALIC, UNDERLINE },
    template: `
      <div uiToggleGroup type="multiple" variant="outline" [value]="['bold']" aria-label="Text formatting">
        <button uiToggleGroupItem value="bold" aria-label="Bold">${BOLD}</button>
        <button uiToggleGroupItem value="italic" aria-label="Italic">${ITALIC}</button>
        <button uiToggleGroupItem value="underline" aria-label="Underline">${UNDERLINE}</button>
      </div>
    `,
  }),
};

/** Connected segmented control — `spacing="0"` collapses the gaps and shares borders. */
export const Connected: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT, ALIGN_JUSTIFY },
    template: `
      <div uiToggleGroup type="single" variant="outline" [spacing]="0" [value]="'center'" aria-label="Text alignment">
        <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
        <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
        <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
        <button uiToggleGroupItem value="justify" aria-label="Justify">${ALIGN_JUSTIFY}</button>
      </div>
    `,
  }),
};

/** Text labels instead of icons. */
export const WithText: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiToggleGroup type="single" variant="outline" [value]="'day'" aria-label="Timeline range">
        <button uiToggleGroupItem value="day">Day</button>
        <button uiToggleGroupItem value="week">Week</button>
        <button uiToggleGroupItem value="month">Month</button>
      </div>
    `,
  }),
};

/** Vertical layout. Up and down arrow keys move focus between items. */
export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT },
    template: `
      <div uiToggleGroup type="single" variant="outline" orientation="vertical" [value]="'center'" aria-label="Text alignment">
        <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
        <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
        <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
      </div>
    `,
  }),
};

/** Disabled group — no item can be toggled. */
export const Disabled: Story = {
  args: { disabled: true },
};

/** Gallery of variants, sizes, spacings, and orientations. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT, BOLD, ITALIC, UNDERLINE },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex flex-wrap items-center gap-6">
          <div uiToggleGroup type="single" variant="default" [value]="'center'" aria-label="Align (default)">
            <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
            <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
            <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
          </div>
          <div uiToggleGroup type="single" variant="outline" [value]="'center'" aria-label="Align (outline)">
            <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
            <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
            <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-6">
          <div uiToggleGroup type="single" variant="outline" size="sm" [value]="'center'" aria-label="Align (sm)">
            <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
            <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
            <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
          </div>
          <div uiToggleGroup type="single" variant="outline" size="lg" [value]="'center'" aria-label="Align (lg)">
            <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
            <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
            <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-6">
          <div uiToggleGroup type="single" variant="outline" [spacing]="0" [value]="'center'" aria-label="Align (connected)">
            <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
            <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
            <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
          </div>
          <div uiToggleGroup type="multiple" variant="outline" [value]="['bold']" aria-label="Formatting">
            <button uiToggleGroupItem value="bold" aria-label="Bold">${BOLD}</button>
            <button uiToggleGroupItem value="italic" aria-label="Italic">${ITALIC}</button>
            <button uiToggleGroupItem value="underline" aria-label="Underline">${UNDERLINE}</button>
          </div>
        </div>
        <div class="flex flex-wrap items-start gap-6">
          <div uiToggleGroup type="single" variant="outline" orientation="vertical" [value]="'center'" aria-label="Align (vertical)">
            <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
            <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
            <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
          </div>
          <div uiToggleGroup type="single" variant="outline" disabled [value]="'center'" aria-label="Align (disabled)">
            <button uiToggleGroupItem value="left" aria-label="Align left">${ALIGN_LEFT}</button>
            <button uiToggleGroupItem value="center" aria-label="Align center">${ALIGN_CENTER}</button>
            <button uiToggleGroupItem value="right" aria-label="Align right">${ALIGN_RIGHT}</button>
          </div>
        </div>
      </div>
    `,
  }),
};
