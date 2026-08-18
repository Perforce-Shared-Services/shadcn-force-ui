import { NgFor } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Skeleton } from './';

const WIDTH_OPTIONS = ['w-full', 'w-3/4', 'w-1/2', 'w-48', 'w-32', 'w-24', 'w-12'];
const HEIGHT_OPTIONS = ['h-3', 'h-4', 'h-5', 'h-6', 'h-8', 'h-12', 'h-16', 'h-32', 'h-48'];
const ROUNDED_OPTIONS = ['', 'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-full'];

interface SkeletonStoryArgs {
  widthClass: string;
  heightClass: string;
  roundedClass: string;
}

/**
 * `[uiSkeleton]` is the Angular port of the Force UI skeleton placeholder.
 *
 * Skeletons stand in for content that has not yet loaded. Size and shape are
 * configured per instance via the `class` input — the component provides the
 * pulse animation and neutral fill; the caller provides dimensions and border
 * radius to match the shape being replaced.
 *
 * Accessibility notes:
 * - Each `[uiSkeleton]` is `aria-hidden="true"` — screen readers should NOT
 *   announce individual placeholders.
 * - Mark the loading CONTAINER with `aria-busy="true"` and remove it when
 *   content arrives.
 * - Use an `aria-live="polite"` visually-hidden region to announce loading
 *   and loaded states to assistive technology.
 * - All animations respect `prefers-reduced-motion` via
 *   `motion-reduce:animate-none`. This is a mandatory house rule for every
 *   ported component (maps to WCAG 2.3.3), not optional polish.
 */
const meta: Meta<SkeletonStoryArgs> = {
  title: 'UI/Skeleton',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Skeleton, NgFor] })],
  argTypes: {
    widthClass: {
      control: 'select',
      options: WIDTH_OPTIONS,
      description:
        'Tailwind width class applied to the skeleton. Match the expected width of the incoming content.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'w-48' } },
    },
    heightClass: {
      control: 'select',
      options: HEIGHT_OPTIONS,
      description:
        'Tailwind height class. `h-4` for text lines (≈1em), `h-5/h-6` for headings, `h-32/h-48` for blocks.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'h-4' } },
    },
    roundedClass: {
      control: 'select',
      options: ROUNDED_OPTIONS,
      description:
        'Border-radius override. Empty = component default (`rounded-md`). Use `rounded-sm` for text lines (spec `--force-radius-sm`), `rounded-full` for avatars/circles, `rounded-lg` for cards.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
    },
  },
  args: {
    widthClass: 'w-48',
    heightClass: 'h-4',
    roundedClass: '',
  },
  render: (args) => ({
    props: args,
    template: `<div uiSkeleton [class]="widthClass + ' ' + heightClass + ' ' + roundedClass"></div>`,
  }),
};

export default meta;
type Story = StoryObj<SkeletonStoryArgs>;

/** Full-control playground. Adjust width, height, and radius via the Controls panel. */
export const Playground: Story = {};

/** Circle for an avatar or round icon placeholder. Width and height must match. */
export const Circle: Story = {
  args: { widthClass: 'w-12', heightClass: 'h-12', roundedClass: 'rounded-full' },
};

/**
 * Card loading state — heading + paragraph + block media.
 *
 * Demonstrates the full a11y caller contract (WCAG 4.1.3 Status Messages):
 * - `aria-busy="true"` on the container — marks the region as updating.
 * - A visually-hidden `aria-live="polite"` region announces the loading and
 *   loaded states to screen readers. Update its text when data arrives
 *   (`"Version loaded"`) and clear it after ~1s so the announcement does not
 *   linger. The live region must be in the DOM before the state changes — do
 *   NOT insert it dynamically (the browser ignores late-injected regions).
 * - Individual `[uiSkeleton]` elements stay `aria-hidden` (set automatically).
 */
export const CardLoadingState: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <!-- aria-live region: in DOM from the start, updated when loading completes -->
      <span class="sr-only" aria-live="polite" aria-atomic="true">Loading version</span>
      <div class="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 w-72" aria-busy="true">
        <div uiSkeleton class="h-32 w-full rounded-lg"></div>
        <div class="flex flex-col gap-2">
          <div uiSkeleton class="h-6 w-1/2 rounded-sm"></div>
          <div uiSkeleton class="h-4 w-full rounded-sm"></div>
          <div uiSkeleton class="h-4 w-3/4 rounded-sm"></div>
        </div>
      </div>
    `,
  }),
};

/**
 * Table row loading state — 3–5 skeleton rows inside a table body.
 * The header stays visible so the reader knows what column each placeholder is for.
 */
export const TableLoadingState: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="w-full overflow-hidden rounded-lg border border-border">
        <table class="w-full text-sm text-left" aria-busy="true">
          <thead class="border-b border-border bg-muted/50">
            <tr>
              <th class="px-4 py-2 text-muted-foreground font-medium">Name</th>
              <th class="px-4 py-2 text-muted-foreground font-medium">Modified</th>
              <th class="px-4 py-2 text-muted-foreground font-medium">Size</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let i of [0,1,2,3,4]" class="border-b last:border-0 border-border">
              <td class="px-4 py-3"><div uiSkeleton class="h-4 w-40 rounded-sm"></div></td>
              <td class="px-4 py-3"><div uiSkeleton class="h-4 w-24 rounded-sm"></div></td>
              <td class="px-4 py-3"><div uiSkeleton class="h-4 w-16 rounded-sm"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
};

/**
 * Paragraph simulation — stack multiple text-line skeletons with `gap-2`.
 * The last line is shorter to mimic a natural paragraph ending.
 *
 * The container carries `aria-busy="true"`; in product also add the
 * visually-hidden `aria-live="polite"` region shown in CardLoadingState so the
 * loaded state is announced.
 */
export const Paragraph: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-2 w-64" aria-busy="true">
        <div uiSkeleton class="h-4 w-full rounded-sm"></div>
        <div uiSkeleton class="h-4 w-full rounded-sm"></div>
        <div uiSkeleton class="h-4 w-3/4 rounded-sm"></div>
      </div>
    `,
  }),
};

/** Gallery of all canonical shape presets side-by-side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">

        <div>
          <p class="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Text lines</p>
          <div class="flex flex-col gap-2 w-64">
            <div uiSkeleton class="h-4 w-full rounded-sm"></div>
            <div uiSkeleton class="h-4 w-3/4 rounded-sm"></div>
            <div uiSkeleton class="h-4 w-1/2 rounded-sm"></div>
          </div>
        </div>

        <div>
          <p class="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Heading</p>
          <div uiSkeleton class="h-6 w-48 rounded-sm"></div>
        </div>

        <div>
          <p class="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Block / media</p>
          <div uiSkeleton class="h-32 w-72 rounded-lg"></div>
        </div>

        <div>
          <p class="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Circles / avatars</p>
          <div class="flex items-center gap-3">
            <div uiSkeleton class="h-8 w-8 rounded-full"></div>
            <div uiSkeleton class="h-10 w-10 rounded-full"></div>
            <div uiSkeleton class="h-12 w-12 rounded-full"></div>
          </div>
        </div>

        <div>
          <p class="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Profile row</p>
          <div class="flex items-center gap-3">
            <div uiSkeleton class="h-10 w-10 rounded-full shrink-0"></div>
            <div class="flex flex-col gap-2 flex-1">
              <div uiSkeleton class="h-4 w-32 rounded-sm"></div>
              <div uiSkeleton class="h-3 w-24 rounded-sm"></div>
            </div>
          </div>
        </div>

      </div>
    `,
  }),
};
