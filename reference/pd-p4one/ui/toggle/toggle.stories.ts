import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Toggle, type ToggleSize, type ToggleVariant } from './';

const VARIANTS: ToggleVariant[] = ['default', 'outline'];
const SIZES: ToggleSize[] = ['sm', 'default', 'lg'];

// Material Symbols Rounded — raw inline SVG strings.
// Outline (FILL 0) = unsuffixed; filled (FILL 1) = `-fill` suffix.
// Used both as template-literal interpolations (static stories) and as
// `[iconSvg]`/`[iconSvgFilled]` inputs (auto-swap stories).
const STAR_SVG = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m323-245 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm157-24L294-157q-8 5-17 4.5t-16-5.5q-7-5-10.5-13t-1.5-18l49-212-164-143q-8-7-9.5-15.5t.5-16.5q2-8 9-13.5t17-6.5l217-19 84-200q4-9 12-13.5t16-4.5q8 0 16 4.5t12 13.5l84 200 217 19q10 1 17 6.5t9 13.5q2 8 .5 16.5T826-544L662-401l49 212q2 10-1.5 18T699-158q-7 5-16 5.5t-17-4.5L480-269Zm0-206Z"/></svg>`;
const STAR_FILL_SVG = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-269 294-157q-8 5-17 4.5t-16-5.5q-7-5-10.5-13t-1.5-18l49-212-164-143q-8-7-9.5-15.5t.5-16.5q2-8 9-13.5t17-6.5l217-19 84-200q4-9 12-13.5t16-4.5q8 0 16 4.5t12 13.5l84 200 217 19q10 1 17 6.5t9 13.5q2 8 .5 16.5T826-544L662-401l49 212q2 10-1.5 18T699-158q-7 5-16 5.5t-17-4.5L480-269Z"/></svg>`;

const BOLD_SVG = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M335-200q-25 0-42.5-17.5T275-260v-440q0-25 17.5-42.5T335-760h168q66 0 114.5 42T666-612q0 38-21 70t-56 49v6q43 14 69.5 50t26.5 81q0 68-52.5 112T510-200H335Zm26-76h144q38 0 66-25t28-63q0-37-28-62t-66-25H361v175Zm0-247h136q35 0 60.5-23t25.5-58q0-35-25.5-58.5T497-686H361v163Z"/></svg>`;

interface ToggleStoryArgs {
  variant: ToggleVariant;
  size: ToggleSize;
  label: string;
  showIcon: boolean;
  pressed: boolean;
  disabled: boolean;
}

/**
 * `[uiToggle]` is the Angular port of the Force UI (radix-force-ui) toggle.
 * It is an attribute selector; stories render a real `<button uiToggle>` and
 * bind the signal inputs. State is managed by the RdxToggleDirective
 * (radix-ng), which sets `data-state="on"/"off"` and `aria-pressed` on the host.
 *
 * Use toggles for two-state actions that persist — "pinned", "show only
 * changes", "mute", or formatting (bold/italic). Do not use toggles for
 * navigation or for actions that execute immediately (use a button instead).
 *
 * **Icon auto-swap** — pass `[iconSvg]` (outline) and `[iconSvgFilled]` (filled):
 * the component shows the outline icon at rest and the filled variant when pressed.
 * Use raw SVG strings from `@material-symbols/svg-400/rounded/` (`<name>.svg` /
 * `<name>-fill.svg`).
 *
 * Accessibility:
 * - Icon-only toggles must carry an `aria-label` on the host.
 * - The host should be `<button>` so screen readers surface `aria-pressed`.
 */
const meta: Meta<ToggleStoryArgs> = {
  title: 'UI/Toggle',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Toggle] })],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description: 'Visual style. `default` = chromeless; `outline` = bordered.',
      table: { type: { summary: VARIANTS.join(' | ') }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: SIZES,
      description: 'Height + padding token.',
      table: { type: { summary: SIZES.join(' | ') }, defaultValue: { summary: 'default' } },
    },
    label: {
      control: 'text',
      description: 'Label text projected as content. Use sentence case.',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show a leading icon (`star` outline → `star-fill` when pressed).',
    },
    pressed: {
      control: 'boolean',
      description: 'Initial pressed state (`defaultPressed`).',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction. Does not communicate a reason — use sparingly.',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    label: 'Pin file',
    showIcon: false,
    pressed: false,
    disabled: false,
  },
  render: (args) => ({
    props: { ...args, STAR_SVG, STAR_FILL_SVG },
    template: `
      <button uiToggle
        [variant]="variant"
        [size]="size"
        [defaultPressed]="pressed"
        [disabled]="disabled"
        [iconSvg]="showIcon ? STAR_SVG : undefined"
        [iconSvgFilled]="showIcon ? STAR_FILL_SVG : undefined"
      >
        @if (label) { {{ label }} }
      </button>
    `,
  }),
};

export default meta;
type Story = StoryObj<ToggleStoryArgs>;

export const Playground: Story = {};

export const Outline: Story = {
  args: { variant: 'outline', label: 'Show changes' },
};

/** Pre-pressed initial state — `data-state="on"` and `aria-pressed="true"` apply. */
export const InitiallyPressed: Story = {
  args: { pressed: true, label: 'Pin file' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Pin file' },
};

export const SmallSize: Story = {
  args: { size: 'sm', label: 'Show untracked' },
};

export const LargeSize: Story = {
  args: { size: 'lg', label: 'Pin file' },
};

/**
 * Icon auto-swap: outline at rest → filled when pressed.
 * Pass `[iconSvg]` (outline) and `[iconSvgFilled]` (filled) — the component
 * handles the swap automatically via the `pressed` signal.
 * Use label OR `aria-label` (icon-only) to name the toggle for screen readers.
 */
export const IconSwap: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { STAR_SVG, STAR_FILL_SVG, BOLD_SVG },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button uiToggle [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
        <button uiToggle variant="outline" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
        <button uiToggle [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG">Pin file</button>
        <button uiToggle variant="outline" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG">Pin file</button>
      </div>
    `,
  }),
};

/**
 * Icon + label via projection. The icon is decorative; the label provides the accessible name.
 */
export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button uiToggle>${BOLD_SVG} Bold</button>
        <button uiToggle variant="outline">${BOLD_SVG} Bold</button>
        <button uiToggle defaultPressed="true">${BOLD_SVG} Bold</button>
      </div>
    `,
  }),
};

/**
 * Icon-only toggles omit the label. The host MUST carry an `aria-label` so
 * screen readers can announce the toggle's purpose.
 */
export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { STAR_SVG, STAR_FILL_SVG },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button uiToggle size="sm" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
        <button uiToggle size="default" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
        <button uiToggle size="lg" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
        <button uiToggle variant="outline" size="default" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
        <button uiToggle variant="outline" size="default" defaultPressed="true" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
      </div>
    `,
  }),
};

/** Gallery of all variants, sizes, and states. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { STAR_SVG, STAR_FILL_SVG },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex flex-wrap items-center gap-3">
          <button uiToggle variant="default">Pin file</button>
          <button uiToggle variant="outline">Show changes</button>
          <button uiToggle variant="default" defaultPressed="true">Pin file</button>
          <button uiToggle variant="outline" defaultPressed="true">Show changes</button>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button uiToggle size="sm">Show untracked</button>
          <button uiToggle size="default">Pin file</button>
          <button uiToggle size="lg">Pin file</button>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button uiToggle disabled>Pin file</button>
          <button uiToggle variant="outline" disabled>Show changes</button>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button uiToggle size="sm" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
          <button uiToggle size="default" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
          <button uiToggle size="lg" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
          <button uiToggle size="default" defaultPressed="true" [iconSvg]="STAR_SVG" [iconSvgFilled]="STAR_FILL_SVG" aria-label="Pin file"></button>
        </div>
      </div>
    `,
  }),
};
