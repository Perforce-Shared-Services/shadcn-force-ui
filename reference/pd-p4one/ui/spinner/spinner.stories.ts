import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '../button';
import { Spinner, type SpinnerColor, type SpinnerSize } from './';

const COLORS: SpinnerColor[] = ['default', 'primary', 'onPrimary', 'inherit'];
const SIZES: SpinnerSize[] = ['xs', 'sm', 'md', 'lg'];

interface SpinnerStoryArgs {
  color: SpinnerColor;
  size: SpinnerSize;
}

/**
 * `[uiSpinner]` is the Angular port of the Force UI spinner, reconciled to the
 * Force design spec (`spinner.md`). The registry source is a one-line svg with
 * no variants; the spec defines `color` and `size` axes, which the port follows.
 *
 * A Spinner communicates that something is happening, not how much remains. Use
 * it for short operations of unknown duration (under ~5s), inside a control
 * (button, input) or a region whose incoming shape is unknown. Prefer a Skeleton
 * when the shape is known, and a determinate Progress Bar for measurable tasks.
 *
 * Accessibility (baked in): the Spinner is `aria-hidden` and carries no `role`
 * or `aria-label` of its own. The container owns the semantic state: set
 * `aria-busy="true"` on the button/input/region for the duration of the wait and
 * announce start/end in text via an `aria-live="polite"` region. Remove the
 * Spinner from the DOM on completion (do not just hide it) so assistive tech can
 * announce the end of the wait. Under `prefers-reduced-motion` the rotation
 * stops (the arc holds static at full opacity) and the live text carries the
 * meaning (WCAG 2.3.3). Toggle reduced motion in your OS settings to verify.
 */
const meta: Meta<SpinnerStoryArgs> = {
  title: 'UI/Spinner',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Spinner, Button] })],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
      description:
        'Arc color. `default` = de-emphasized neutral (inline validation); `primary` = indigo, when the spinner is the sole progress affordance; `onPrimary` = legible on a solid primary surface; `inherit` = picks up the container text color (e.g. inside a ghost button).',
      table: { type: { summary: COLORS.join(' | ') }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: SIZES,
      description:
        'Diameter, matched to the container: `xs` 12px (inputs, sm buttons); `sm` 16px (md buttons, inline text, alerts); `md` 24px (lg buttons, small regions); `lg` 40px (full-region loads only).',
      table: { type: { summary: SIZES.join(' | ') }, defaultValue: { summary: 'sm' } },
    },
  },
  args: {
    color: 'default',
    size: 'sm',
  },
  // `onPrimary` is only legible on a solid brand surface, so the Playground host
  // sits on `bg-primary` when that color is selected.
  render: (args) => ({
    props: args,
    template: `
      <div [class.bg-primary]="color === 'onPrimary'"
           [class.text-link]="color === 'inherit'"
           class="inline-flex items-center justify-center rounded-lg p-6">
        <span uiSpinner [color]="color" [size]="size"></span>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<SpinnerStoryArgs>;

export const Playground: Story = {};

/** Neutral, de-emphasized: for inline validation and secondary affordances. */
export const Default: Story = { args: { color: 'default', size: 'md' } };

/** Indigo brand color: when the spinner is the only progress affordance. */
export const Primary: Story = { args: { color: 'primary', size: 'md' } };

/** White-on-brand: sits on a solid primary surface (rendered on `bg-primary`). */
export const OnPrimary: Story = { args: { color: 'onPrimary', size: 'md' } };

/** Picks up `currentColor` from its container's text color. */
export const Inherit: Story = { args: { color: 'inherit', size: 'md' } };

/**
 * Composition: a Spinner inside a control. The container owns the semantics
 * (`aria-busy="true"` plus an `aria-live` region announcing the wait) while the
 * Spinner stays decorative (`aria-hidden`). The button keeps its resting width
 * to avoid layout shift, so it uses the real `[uiButton]` here rather than a
 * hand-rolled control.
 */
export const InContext: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <!-- real button, loading: onPrimary spinner replacing the leading icon -->
        <button uiButton aria-label="Submitting changes…" aria-busy="true" disabled>
          <span uiSpinner color="onPrimary" size="xs"></span>
          Submitting…
        </button>

        <!-- inline input validation: neutral xs spinner + polite live status -->
        <div class="flex w-72 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm">
          <span class="text-muted-foreground">artist-textures</span>
          <span uiSpinner color="default" size="xs" class="ml-auto"></span>
        </div>
        <p aria-live="polite" class="text-xs text-muted-foreground">Checking name availability…</p>

        <!-- region-level load: primary lg spinner + its own live status -->
        <div class="flex h-40 w-72 flex-col items-center justify-center gap-3 rounded-lg border border-border"
             aria-busy="true">
          <span uiSpinner color="primary" size="lg"></span>
          <p aria-live="polite" class="text-xs text-muted-foreground">Loading version…</p>
        </div>
      </div>
    `,
  }),
};

/** Every color and size: for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-6">
          <span uiSpinner color="default" size="xs"></span>
          <span uiSpinner color="default" size="sm"></span>
          <span uiSpinner color="default" size="md"></span>
          <span uiSpinner color="default" size="lg"></span>
        </div>
        <div class="flex items-center gap-6">
          <span uiSpinner color="primary" size="xs"></span>
          <span uiSpinner color="primary" size="sm"></span>
          <span uiSpinner color="primary" size="md"></span>
          <span uiSpinner color="primary" size="lg"></span>
        </div>
        <div class="flex items-center gap-6 rounded-lg bg-primary p-6">
          <span uiSpinner color="onPrimary" size="xs"></span>
          <span uiSpinner color="onPrimary" size="sm"></span>
          <span uiSpinner color="onPrimary" size="md"></span>
          <span uiSpinner color="onPrimary" size="lg"></span>
        </div>
      </div>
    `,
  }),
};
