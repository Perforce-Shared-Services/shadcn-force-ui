import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ScrollArea, ScrollAreaOrientation } from './';

const ORIENTATIONS: ScrollAreaOrientation[] = [
  ScrollAreaOrientation.Vertical,
  ScrollAreaOrientation.Horizontal,
  ScrollAreaOrientation.Both,
];

// Demo content — artist-facing file/version names, never P4 jargon.
const FILES: string[] = [
  'hero_character.blend',
  'environment_forest.blend',
  'props_crate_01.fbx',
  'props_crate_02.fbx',
  'texture_bark_4k.png',
  'texture_leaves_4k.png',
  'rig_hero_v3.blend',
  'anim_idle.fbx',
  'anim_run.fbx',
  'shader_water.uasset',
  'lighting_dusk.uasset',
  'lookdev_turntable.blend',
  'cleanup_notes.txt',
  'review_pass_02.png',
  'final_render.exr',
];

interface ScrollAreaStoryArgs {
  orientation: ScrollAreaOrientation;
  ariaLabel: string;
}

/**
 * `<ui-scroll-area>` is the Angular port of the Force UI (radix-force-ui)
 * scroll-area. The host must be sized (e.g. `h-72 w-64`); the inner viewport
 * fills it and scrolls.
 *
 * Parity note: the registry component wraps `radix-ui`'s ScrollArea primitive
 * (a JS-driven custom overlay scrollbar). `@radix-ng/primitives` ships no
 * equivalent, so this port scrolls natively and styles the scrollbar with the
 * shared `scrollbar-overlay` token utility — the same thin overlay bar the
 * select / dropdown / command panels use. The thumb colour is the
 * `--muted-foreground` token, so it re-resolves light↔dark on its own (toggle
 * `document.body.classList.toggle('dark-theme')` in DevTools to check).
 *
 * Accessibility: the viewport is keyboard-focusable so the region can be
 * scrolled with the arrow keys (WCAG 2.1.1). Pass `ariaLabel` when the area is a
 * meaningful landmark (it becomes a named `role="region"`); omit it for purely
 * visual overflow.
 */
const meta: Meta<ScrollAreaStoryArgs> = {
  title: 'UI/ScrollArea',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ScrollArea] })],
  argTypes: {
    orientation: {
      control: 'select',
      options: ORIENTATIONS,
      description:
        'Which axis scrolls. `vertical` (default) caps height; `horizontal` caps width; `both` scrolls on both axes. Mirrors the registry `ScrollBar` orientation prop.',
      table: {
        type: { summary: ORIENTATIONS.join(' | ') },
        defaultValue: { summary: ScrollAreaOrientation.Vertical },
      },
    },
    ariaLabel: {
      control: 'text',
      description:
        'Accessible name, bound as `aria-label` on the viewport. Set it to make the area a named `role="region"`; leave it empty for purely decorative overflow and the viewport falls back to a generic "Scrollable region" name.',
    },
  },
  args: {
    orientation: ScrollAreaOrientation.Vertical,
    ariaLabel: 'Workspace files',
  },
  render: (args) => ({
    props: { ...args, files: FILES },
    template: `
      @switch (orientation) {
        @case ('horizontal') {
          <ui-scroll-area
            [orientation]="orientation"
            [ariaLabel]="ariaLabel"
            class="w-96 rounded-md border border-border">
            <div class="flex w-max gap-3 p-4">
              @for (f of files; track f) {
                <figure class="w-36 shrink-0">
                  <div class="flex aspect-[3/4] items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">{{ f }}</div>
                </figure>
              }
            </div>
          </ui-scroll-area>
        }
        @case ('both') {
          <ui-scroll-area
            [orientation]="orientation"
            [ariaLabel]="ariaLabel"
            class="h-72 w-96 rounded-md border border-border">
            <div class="w-max p-4">
              @for (row of files; track row) {
                <div class="flex gap-3">
                  @for (f of files; track f) {
                    <div class="my-1 flex h-10 w-36 shrink-0 items-center rounded-md bg-muted px-3 text-xs text-muted-foreground">{{ f }}</div>
                  }
                </div>
              }
            </div>
          </ui-scroll-area>
        }
        @default {
          <ui-scroll-area
            [orientation]="orientation"
            [ariaLabel]="ariaLabel"
            class="h-72 w-64 rounded-md border border-border">
            <div class="p-4">
              <p class="mb-3 text-sm font-semibold leading-none">Workspace files</p>
              @for (f of files; track f) {
                <div class="border-b border-border py-2 text-sm last:border-b-0">{{ f }}</div>
              }
            </div>
          </ui-scroll-area>
        }
      }
    `,
  }),
};

export default meta;
type Story = StoryObj<ScrollAreaStoryArgs>;

export const Playground: Story = {};

/** Default: a vertically scrolling list capped at a fixed height. */
export const Vertical: Story = { args: { orientation: ScrollAreaOrientation.Vertical } };

/** A horizontally scrolling row of thumbnails. */
export const Horizontal: Story = { args: { orientation: ScrollAreaOrientation.Horizontal } };

/** Content that overflows on both axes. */
export const Both: Story = { args: { orientation: ScrollAreaOrientation.Both } };

/** Side-by-side overview of all three orientations. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { files: FILES },
    template: `
      <div class="flex flex-wrap items-start gap-8">
        <div>
          <p class="mb-2 text-xs font-semibold text-muted-foreground">Vertical</p>
          <ui-scroll-area ariaLabel="Workspace files" class="h-60 w-56 rounded-md border border-border">
            <div class="p-4">
              @for (f of files; track f) {
                <div class="border-b border-border py-2 text-sm last:border-b-0">{{ f }}</div>
              }
            </div>
          </ui-scroll-area>
        </div>
        <div>
          <p class="mb-2 text-xs font-semibold text-muted-foreground">Horizontal</p>
          <ui-scroll-area orientation="horizontal" ariaLabel="Recent renders" class="w-80 rounded-md border border-border">
            <div class="flex w-max gap-3 p-4">
              @for (f of files; track f) {
                <div class="flex aspect-[3/4] w-28 shrink-0 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">{{ f }}</div>
              }
            </div>
          </ui-scroll-area>
        </div>
      </div>
    `,
  }),
};
