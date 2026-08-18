import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './';

interface CarouselStoryArgs {
  orientation: 'horizontal' | 'vertical';
  loop: boolean;
}

const SLIDES = [1, 2, 3, 4, 5];

/**
 * `[uiCarousel]` is the Angular port of the Force UI (radix-force-ui)
 * carousel. There is no radix/base-ui primitive underneath the registry
 * component either — it hand-rolls on `embla-carousel-react`, so this port
 * drives the vanilla `embla-carousel` core the same way. Stories render the
 * real compound markup (`uiCarousel` / `ui-carousel-content` / `uiCarouselItem`
 * / `uiCarouselPrevious` / `uiCarouselNext`).
 */
const meta: Meta<CarouselStoryArgs> = {
  title: 'UI/Carousel',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext],
    }),
  ],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Scroll axis (also the arrow layout for Previous/Next)',
    },
    loop: { control: 'boolean', description: 'Wrap around at the ends (embla `loop` option)' },
  },
  args: {
    orientation: 'horizontal',
    loop: false,
  },
};

export default meta;
type Story = StoryObj<CarouselStoryArgs>;

/** Args-driven playground — flip `orientation` and `loop` in the Controls panel. */
export const Playground: Story = {
  render: (args) => ({
    props: { ...args, slides: SLIDES },
    template: `
      <div
        uiCarousel
        aria-label="Featured screenshots"
        [orientation]="orientation"
        [opts]="{ loop: loop }"
        [class]="orientation === 'vertical' ? 'h-[300px] w-full max-w-xs' : 'w-full max-w-xs'"
      >
        <ui-carousel-content [class]="orientation === 'vertical' ? 'h-[300px]' : ''">
          <div uiCarouselItem *ngFor="let n of slides" [class]="orientation === 'vertical' ? 'basis-1/3' : ''">
            <div class="flex aspect-square items-center justify-center rounded-lg border border-border p-6">
              <span class="text-4xl font-semibold">{{ n }}</span>
            </div>
          </div>
        </ui-carousel-content>
        <button uiCarouselPrevious></button>
        <button uiCarouselNext></button>
      </div>
    `,
  }),
  args: { orientation: 'horizontal', loop: false },
};

/** Canonical horizontal carousel, one slide visible at a time. */
export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { slides: SLIDES },
    template: `
      <div uiCarousel aria-label="Featured screenshots" class="w-full max-w-xs">
        <ui-carousel-content>
          <div uiCarouselItem *ngFor="let n of slides">
            <div class="flex aspect-square items-center justify-center rounded-lg border border-border p-6">
              <span class="text-4xl font-semibold">{{ n }}</span>
            </div>
          </div>
        </ui-carousel-content>
        <button uiCarouselPrevious></button>
        <button uiCarouselNext></button>
      </div>
    `,
  }),
};

/** Vertical axis — arrows sit above/below instead of left/right. */
export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { slides: SLIDES },
    template: `
      <div uiCarousel aria-label="Featured screenshots" orientation="vertical" class="h-[300px] w-full max-w-xs">
        <!-- vertical needs an explicit height here (not h-full): the embla
             viewport div wrapping this one is auto-height, so a percentage
             height has nothing definite to resolve against. -->
        <ui-carousel-content class="h-[300px]">
          <div uiCarouselItem *ngFor="let n of slides" class="basis-1/3">
            <div class="flex items-center justify-center rounded-lg border border-border p-6">
              <span class="text-4xl font-semibold">{{ n }}</span>
            </div>
          </div>
        </ui-carousel-content>
        <button uiCarouselPrevious></button>
        <button uiCarouselNext></button>
      </div>
    `,
  }),
};

/** `opts.loop` wraps scrolling past the last slide back to the first. */
export const Looping: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { slides: SLIDES },
    template: `
      <div uiCarousel aria-label="Featured screenshots" [opts]="{ loop: true }" class="w-full max-w-xs">
        <ui-carousel-content>
          <div uiCarouselItem *ngFor="let n of slides">
            <div class="flex aspect-square items-center justify-center rounded-lg border border-border p-6">
              <span class="text-4xl font-semibold">{{ n }}</span>
            </div>
          </div>
        </ui-carousel-content>
        <button uiCarouselPrevious></button>
        <button uiCarouselNext></button>
      </div>
    `,
  }),
};

/** Side-by-side gallery of the orientations. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { slides: SLIDES },
    template: `
      <div class="flex flex-wrap items-start gap-12">
        <div class="flex flex-col gap-2">
          <span class="text-sm text-muted-foreground">Horizontal</span>
          <div uiCarousel aria-label="Horizontal example" class="w-64">
            <ui-carousel-content>
              <div uiCarouselItem *ngFor="let n of slides">
                <div class="flex aspect-square items-center justify-center rounded-lg border border-border p-6">
                  <span class="text-3xl font-semibold">{{ n }}</span>
                </div>
              </div>
            </ui-carousel-content>
            <button uiCarouselPrevious></button>
            <button uiCarouselNext></button>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sm text-muted-foreground">Vertical</span>
          <div uiCarousel aria-label="Vertical example" orientation="vertical" class="h-64 w-64">
            <ui-carousel-content class="h-64">
              <div uiCarouselItem *ngFor="let n of slides" class="basis-1/3">
                <div class="flex items-center justify-center rounded-lg border border-border p-6">
                  <span class="text-3xl font-semibold">{{ n }}</span>
                </div>
              </div>
            </ui-carousel-content>
            <button uiCarouselPrevious></button>
            <button uiCarouselNext></button>
          </div>
        </div>
      </div>
    `,
  }),
};
