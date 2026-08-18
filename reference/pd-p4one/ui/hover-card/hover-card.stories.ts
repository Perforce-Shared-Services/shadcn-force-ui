import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import {
  HoverCard,
  HoverCardContent,
  HoverCardContentBox,
  HoverCardTrigger,
} from './';

const HOVER_CARD_IMPORTS = [
  CommonModule,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  ...HoverCardContentBox,
];

interface HoverCardStoryArgs {
  side: 'top' | 'right' | 'bottom' | 'left';
  align: 'start' | 'center' | 'end';
  sideOffset: number;
  openDelay: number;
  closeDelay: number;
  triggerLabel: string;
}

/**
 * `[rdxHoverCardRoot]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) hover card, built on `@radix-ng/primitives/hover-card` (CDK
 * overlay). A hover card is a non-modal overlay that reveals RICH preview content
 * on HOVER — a thumbnail, a version's details, an artist's profile. It is the
 * styled sibling of the popover (same panel surface) and the interaction sibling
 * of the tooltip (both open on hover), sitting between them: richer than a
 * tooltip's short text hint, lighter than a popover's click-summoned form.
 *
 * Composition: a `[rdxHoverCardRoot]` wraps a `[rdxHoverCardTrigger]` (a link or
 * avatar) and an `<ng-template rdxHoverCardContent>` holding the styled
 * `[rdxHoverCardContentAttributes]` box with freeform preview content. Matching
 * shadcn / the Figma component, there is no arrow.
 *
 * Opens when the pointer settles on the trigger (`openDelay`) or on keyboard
 * focus, and closes shortly after the pointer leaves both the trigger and the
 * card (`closeDelay`) — the card stays open while you move into it. It does not
 * move focus into the content, so it never steals focus from the page.
 *
 * `[cssAnimation]="true" [cssClosingAnimation]="true"` on the root turn on the
 * exit fade (the entrance fades/zooms in either way). Every story enables them so
 * the open AND close animations are visible.
 */
const meta: Meta<HoverCardStoryArgs> = {
  title: 'UI/Hover Card',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: HOVER_CARD_IMPORTS }),
    // Hover cards portal to an overlay and grow on every side — pad generously
    // and centre the trigger so the panel is fully visible whichever `side` is
    // set.
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `<div class="flex min-h-72 items-center justify-center p-16">${story.template}</div>`,
      };
    },
  ],
  argTypes: {
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Preferred side the card opens against the trigger.',
      table: { defaultValue: { summary: 'bottom' } },
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the card along the trigger edge.',
      table: { defaultValue: { summary: 'center' } },
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 24, step: 1 },
      description: 'Gap in pixels between the trigger and the card.',
    },
    openDelay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Delay in ms before the card opens on hover.',
    },
    closeDelay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Delay in ms before the card closes after the pointer leaves.',
    },
    triggerLabel: { control: 'text', description: 'Visible text on the trigger.' },
  },
  args: {
    side: 'bottom',
    align: 'center',
    sideOffset: 6,
    openDelay: 300,
    closeDelay: 150,
    triggerLabel: '@lighting-artist',
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <div rdxHoverCardRoot [openDelay]="openDelay" [closeDelay]="closeDelay" [cssAnimation]="true" [cssClosingAnimation]="true">
        <a
          rdxHoverCardTrigger
          href="#"
          class="cursor-pointer font-medium text-primary underline underline-offset-4"
          (click)="$event.preventDefault()"
        >{{ triggerLabel }}</a>
        <ng-template rdxHoverCardContent [side]="side" [align]="align" [sideOffset]="sideOffset">
          <div rdxHoverCardContentAttributes aria-label="Lighting artist">
            <div class="flex gap-2.5">
              <div class="size-10 shrink-0 rounded-full bg-muted" aria-hidden="true"></div>
              <div class="flex flex-col gap-1">
                <div class="font-medium">Lighting artist</div>
                <p class="text-muted-foreground">Owns the lighting and look-dev passes. Last shared a version 2 hours ago.</p>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<HoverCardStoryArgs>;

export const Playground: Story = {};

/**
 * The common case: hovering a version name reveals its details — who edited it,
 * when, and whether it has been submitted — without leaving the timeline.
 */
export const VersionPreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxHoverCardRoot [cssAnimation]="true" [cssClosingAnimation]="true">
        <a rdxHoverCardTrigger href="#" class="cursor-pointer font-medium text-primary underline underline-offset-4" (click)="$event.preventDefault()">Lighting pass</a>
        <ng-template rdxHoverCardContent side="bottom" [sideOffset]="6">
          <div rdxHoverCardContentAttributes aria-label="Lighting pass">
            <div class="flex flex-col gap-1.5">
              <div class="font-medium">Lighting pass</div>
              <p class="text-muted-foreground">Edited 2 hours ago by you. Not yet submitted.</p>
              <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span class="size-2 rounded-full bg-primary" aria-hidden="true"></span>
                12 files changed
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/** All four `side` positions, so you can compare placement and slide direction. */
export const Sides: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center justify-center gap-4">
        <div rdxHoverCardRoot [cssAnimation]="true" [cssClosingAnimation]="true">
          <a rdxHoverCardTrigger href="#" class="cursor-pointer font-medium text-primary underline underline-offset-4" (click)="$event.preventDefault()">Top</a>
          <ng-template rdxHoverCardContent side="top" [sideOffset]="6">
            <div rdxHoverCardContentAttributes aria-label="Top placement">Opens above the trigger.</div>
          </ng-template>
        </div>
        <div rdxHoverCardRoot [cssAnimation]="true" [cssClosingAnimation]="true">
          <a rdxHoverCardTrigger href="#" class="cursor-pointer font-medium text-primary underline underline-offset-4" (click)="$event.preventDefault()">Right</a>
          <ng-template rdxHoverCardContent side="right" [sideOffset]="6">
            <div rdxHoverCardContentAttributes aria-label="Right placement">Opens to the right.</div>
          </ng-template>
        </div>
        <div rdxHoverCardRoot [cssAnimation]="true" [cssClosingAnimation]="true">
          <a rdxHoverCardTrigger href="#" class="cursor-pointer font-medium text-primary underline underline-offset-4" (click)="$event.preventDefault()">Bottom</a>
          <ng-template rdxHoverCardContent side="bottom" [sideOffset]="6">
            <div rdxHoverCardContentAttributes aria-label="Bottom placement">Opens below the trigger.</div>
          </ng-template>
        </div>
        <div rdxHoverCardRoot [cssAnimation]="true" [cssClosingAnimation]="true">
          <a rdxHoverCardTrigger href="#" class="cursor-pointer font-medium text-primary underline underline-offset-4" (click)="$event.preventDefault()">Left</a>
          <ng-template rdxHoverCardContent side="left" [sideOffset]="6">
            <div rdxHoverCardContentAttributes aria-label="Left placement">Opens to the left.</div>
          </ng-template>
        </div>
      </div>
    `,
  }),
};

/**
 * A short experiment preview — a creative sandbox summarised on hover, no heavy
 * chrome.
 */
export const ExperimentPreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxHoverCardRoot [cssAnimation]="true" [cssClosingAnimation]="true">
        <a rdxHoverCardTrigger href="#" class="cursor-pointer font-medium text-primary underline underline-offset-4" (click)="$event.preventDefault()">Warm grade</a>
        <ng-template rdxHoverCardContent side="bottom" [sideOffset]="6">
          <div rdxHoverCardContentAttributes aria-label="Warm grade">
            <div class="flex flex-col gap-1.5">
              <div class="font-medium">Warm grade</div>
              <p class="text-muted-foreground">A creative sandbox forked from the main line. 3 versions so far.</p>
            </div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/** Common hover cards reviewed side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-start justify-center gap-6">
        <div rdxHoverCardRoot [cssAnimation]="true" [cssClosingAnimation]="true">
          <a rdxHoverCardTrigger href="#" class="cursor-pointer font-medium text-primary underline underline-offset-4" (click)="$event.preventDefault()">@lighting-artist</a>
          <ng-template rdxHoverCardContent side="bottom" [sideOffset]="6">
            <div rdxHoverCardContentAttributes aria-label="Lighting artist">
              <div class="flex gap-2.5">
                <div class="size-10 shrink-0 rounded-full bg-muted" aria-hidden="true"></div>
                <div class="flex flex-col gap-1">
                  <div class="font-medium">Lighting artist</div>
                  <p class="text-muted-foreground">Owns the lighting passes. Shared a version 2 hours ago.</p>
                </div>
              </div>
            </div>
          </ng-template>
        </div>

        <div rdxHoverCardRoot [cssAnimation]="true" [cssClosingAnimation]="true">
          <a rdxHoverCardTrigger href="#" class="cursor-pointer font-medium text-primary underline underline-offset-4" (click)="$event.preventDefault()">Lighting pass</a>
          <ng-template rdxHoverCardContent side="bottom" [sideOffset]="6">
            <div rdxHoverCardContentAttributes aria-label="Lighting pass">
              <div class="flex flex-col gap-1.5">
                <div class="font-medium">Lighting pass</div>
                <p class="text-muted-foreground">Edited 2 hours ago by you. Not yet submitted.</p>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    `,
  }),
};
