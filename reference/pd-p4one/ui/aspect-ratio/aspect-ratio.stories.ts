import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { AspectRatio } from './';

/**
 * Offline-safe demo image — inline SVG gradient data URI, so the story
 * renders in Storybook without a network fetch (deterministic build). Product
 * code points `src` at a real preview/thumbnail URL.
 */
const PREVIEW_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237c3aed'/%3E%3Cstop offset='1' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E";

const RATIO_OPTIONS: Record<string, number> = {
  '16 / 9': 16 / 9,
  '4 / 3': 4 / 3,
  '1 / 1': 1,
  '9 / 16': 9 / 16,
};

interface AspectRatioStoryArgs {
  ratioLabel: string;
}

/**
 * `[uiAspectRatio]` is the Angular port of the Force UI (radix-force-ui)
 * aspect-ratio — a leaf primitive that reserves a fixed-ratio box for its
 * content (e.g. a version thumbnail or texture preview) regardless of the
 * content's intrinsic size.
 *
 * No cva, no variants — `ratio` (a number, e.g. `16 / 9`) is the only input,
 * forwarded to `RdxAspectRatioDirective`. Content should fill the box with
 * `class="size-full object-cover"` (for an `<img>`) so it crops to the ratio
 * rather than stretching.
 *
 * Accessibility: this primitive controls layout only. The projected content
 * (typically an `<img>`) carries its own accessible name via `alt`.
 */
const meta: Meta<AspectRatioStoryArgs> = {
  title: 'UI/AspectRatio',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [AspectRatio] })],
  argTypes: {
    ratioLabel: {
      control: 'select',
      options: Object.keys(RATIO_OPTIONS),
      description:
        'Width-to-height ratio reserved for the box. `16 / 9` for widescreen previews, `1 / 1` for square thumbnails, `9 / 16` for portrait/mobile captures.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '1 / 1' } },
    },
  },
  args: {
    ratioLabel: '16 / 9',
  },
  render: (args) => ({
    props: { ...args, ratio: RATIO_OPTIONS[args.ratioLabel], image: PREVIEW_IMAGE },
    template: `
      <div class="w-72 overflow-hidden rounded-lg border border-border">
        <div uiAspectRatio [ratio]="ratio">
          <img class="size-full object-cover" [src]="image" alt="Version preview" />
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AspectRatioStoryArgs>;

/** Full control set — switch the ratio via the Controls panel. */
export const Playground: Story = {};

/** Widescreen — the default for version/experiment thumbnails. */
export const Widescreen: Story = {
  args: { ratioLabel: '16 / 9' },
};

/** Square — dense grid thumbnails. */
export const Square: Story = {
  args: { ratioLabel: '1 / 1' },
};

/** Portrait — mobile-captured reference images. */
export const Portrait: Story = {
  args: { ratioLabel: '9 / 16' },
};

/** All ratios side by side for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { image: PREVIEW_IMAGE },
    template: `
      <div class="flex flex-wrap items-start gap-4">
        <div class="w-48 overflow-hidden rounded-lg border border-border">
          <div uiAspectRatio [ratio]="16 / 9">
            <img class="size-full object-cover" [src]="image" alt="Version preview" />
          </div>
        </div>
        <div class="w-48 overflow-hidden rounded-lg border border-border">
          <div uiAspectRatio [ratio]="4 / 3">
            <img class="size-full object-cover" [src]="image" alt="Version preview" />
          </div>
        </div>
        <div class="w-48 overflow-hidden rounded-lg border border-border">
          <div uiAspectRatio [ratio]="1">
            <img class="size-full object-cover" [src]="image" alt="Version preview" />
          </div>
        </div>
        <div class="w-48 overflow-hidden rounded-lg border border-border">
          <div uiAspectRatio [ratio]="9 / 16">
            <img class="size-full object-cover" [src]="image" alt="Version preview" />
          </div>
        </div>
      </div>
    `,
  }),
};
