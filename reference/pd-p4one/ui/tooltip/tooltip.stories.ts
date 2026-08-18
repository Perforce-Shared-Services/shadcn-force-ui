import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import syncIcon from '@material-symbols/svg-400/rounded/sync.svg?raw';
import infoIcon from '@material-symbols/svg-400/rounded/info.svg?raw';

import { Button } from '../button';
import { Kbd } from '../kbd';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipContentBox,
  TooltipTrigger,
} from './';

// Demo icons are interpolated into the template literal with `${}` so they
// compile as static direct-child `<svg>` (skill §9). Icon-only triggers are
// decorative glyphs whose accessible name comes from the trigger's `aria-label`,
// so hide the `<svg>` from AT (WCAG 1.1.1).
const deco = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true" focusable="false"');
const sync = deco(syncIcon);
const info = deco(infoIcon);

const TOOLTIP_IMPORTS = [
  CommonModule,
  Button,
  Kbd,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  ...TooltipContentBox,
  TooltipArrow,
];

interface TooltipStoryArgs {
  content: string;
  side: 'top' | 'right' | 'bottom' | 'left';
  align: 'start' | 'center' | 'end';
  sideOffset: number;
  openDelay: number;
  closeDelay: number;
  showArrow: boolean;
  triggerLabel: string;
  triggerVariant: 'default' | 'outline' | 'secondary' | 'ghost';
}

/**
 * `[rdxTooltipRoot]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) tooltip, built on `@radix-ng/primitives/tooltip` (CDK
 * overlay). A tooltip shows a short, supplementary hint when the user hovers OR
 * keyboard-focuses the trigger — never essential, never interactive content.
 *
 * Composition: a `[rdxTooltipRoot]` wraps a `[rdxTooltipTrigger]` (any focusable
 * element — a `[uiButton]` here) and an `<ng-template rdxTooltipContent>` holding
 * the styled `[rdxTooltipContentAttributes]` box, with an optional
 * `[rdxTooltipArrow]`. There is no `TooltipProvider` — set `openDelay` /
 * `closeDelay` on the root instead.
 *
 * Rules: keep it to a few words, no links or buttons inside (use a popover for
 * that), and don't hide anything the task depends on — the tooltip is a
 * progressive-disclosure aid, not a content store. It opens on focus too, so it's
 * keyboard-reachable; Escape and blur dismiss it.
 */
const meta: Meta<TooltipStoryArgs> = {
  title: 'UI/Tooltip',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: TOOLTIP_IMPORTS }),
    // Tooltips portal to an overlay and grow on every side — pad generously and
    // centre the trigger so the panel is fully visible whichever `side` is set.
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `<div class="flex min-h-56 items-center justify-center p-16">${story.template}</div>`,
      };
    },
  ],
  argTypes: {
    content: { control: 'text', description: 'Tooltip body text. Keep it to a few words.' },
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Preferred side the panel opens against the trigger.',
      table: { defaultValue: { summary: 'top' } },
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the panel along the trigger edge.',
      table: { defaultValue: { summary: 'center' } },
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 24, step: 1 },
      description: 'Gap in pixels between the trigger and the panel.',
    },
    openDelay: {
      control: { type: 'number', min: 0, max: 1500, step: 50 },
      description: 'Hover delay before the tooltip opens.',
      table: { defaultValue: { summary: '500' } },
    },
    closeDelay: {
      control: { type: 'number', min: 0, max: 1500, step: 50 },
      description: 'Delay before the tooltip closes after the cursor leaves.',
      table: { defaultValue: { summary: '200' } },
    },
    showArrow: { control: 'boolean', description: 'Render the pointer arrow toward the trigger.' },
    triggerLabel: { control: 'text', description: 'Visible text on the trigger button.' },
    triggerVariant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost'],
      description: 'Button variant of the trigger (see Button).',
      table: { defaultValue: { summary: 'outline' } },
    },
  },
  args: {
    content: 'Sync this version to the server',
    side: 'top',
    align: 'center',
    sideOffset: 6,
    openDelay: 500,
    closeDelay: 200,
    showArrow: true,
    triggerLabel: 'Sync version',
    triggerVariant: 'outline',
  },
  render: (args) => ({
    props: { ...args },
    // Static template gated with *ngIf so the boolean Control (showArrow) takes
    // effect — Storybook re-binds props but does not recompile the template
    // string (skill §8).
    template: `
      <div rdxTooltipRoot [openDelay]="openDelay" [closeDelay]="closeDelay">
        <button uiButton [variant]="triggerVariant" rdxTooltipTrigger>{{ triggerLabel }}</button>
        <ng-template rdxTooltipContent [side]="side" [align]="align" [sideOffset]="sideOffset">
          <div rdxTooltipContentAttributes>
            {{ content }}
            <span *ngIf="showArrow" rdxTooltipArrow></span>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<TooltipStoryArgs>;

export const Playground: Story = {};

/**
 * The common case: a label tooltip on an icon-only button, naming the action its
 * glyph stands for. The trigger still needs an `aria-label` — that is the
 * accessible name; the tooltip is a redundant visual aid for sighted users.
 *
 * A11y note: radix-ng models this as a *rich tooltip*, so the trigger announces
 * `aria-haspopup="dialog"` and the panel is `role="dialog"` (not the classic
 * `role="tooltip"` / `aria-describedby` pairing — it's baked into the primitive).
 * That's fine for short label hints **because the trigger's own `aria-label`
 * carries the name**. Reserve this component for hints; never put essential or
 * interactive content in it, and never rely on the tooltip text alone as a
 * control's accessible name.
 */
export const IconButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxTooltipRoot>
        <button uiButton variant="ghost" size="icon" aria-label="Sync this version" rdxTooltipTrigger>${sync}</button>
        <ng-template rdxTooltipContent [sideOffset]="6">
          <div rdxTooltipContentAttributes>
            Sync this version
            <span rdxTooltipArrow></span>
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
        <div rdxTooltipRoot>
          <button uiButton variant="outline" rdxTooltipTrigger>Top</button>
          <ng-template rdxTooltipContent side="top" [sideOffset]="6">
            <div rdxTooltipContentAttributes>Opens above<span rdxTooltipArrow></span></div>
          </ng-template>
        </div>
        <div rdxTooltipRoot>
          <button uiButton variant="outline" rdxTooltipTrigger>Right</button>
          <ng-template rdxTooltipContent side="right" [sideOffset]="6">
            <div rdxTooltipContentAttributes>Opens to the right<span rdxTooltipArrow></span></div>
          </ng-template>
        </div>
        <div rdxTooltipRoot>
          <button uiButton variant="outline" rdxTooltipTrigger>Bottom</button>
          <ng-template rdxTooltipContent side="bottom" [sideOffset]="6">
            <div rdxTooltipContentAttributes>Opens below<span rdxTooltipArrow></span></div>
          </ng-template>
        </div>
        <div rdxTooltipRoot>
          <button uiButton variant="outline" rdxTooltipTrigger>Left</button>
          <ng-template rdxTooltipContent side="left" [sideOffset]="6">
            <div rdxTooltipContentAttributes>Opens to the left<span rdxTooltipArrow></span></div>
          </ng-template>
        </div>
      </div>
    `,
  }),
};

/**
 * A tooltip carrying a keyboard-shortcut hint. A `[uiKbd]` chip inside the panel
 * picks up the content box's `has-data-[slot=kbd]` spacing and `**:data-[slot=kbd]`
 * styling automatically.
 */
export const WithShortcut: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxTooltipRoot>
        <button uiButton variant="outline" rdxTooltipTrigger>Save for later</button>
        <ng-template rdxTooltipContent [sideOffset]="6">
          <div rdxTooltipContentAttributes>
            Save for later
            <span uiKbd>⌘S</span>
            <span rdxTooltipArrow></span>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/**
 * No arrow — a flatter look for dense toolbars where the pointer adds noise.
 * Drop the `[rdxTooltipArrow]` element to remove it.
 */
export const NoArrow: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxTooltipRoot>
        <button uiButton variant="ghost" size="icon" aria-label="About this version" rdxTooltipTrigger>${info}</button>
        <ng-template rdxTooltipContent [sideOffset]="6">
          <div rdxTooltipContentAttributes>Last edited 2 hours ago</div>
        </ng-template>
      </div>
    `,
  }),
};

/** Common tooltips reviewed side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center justify-center gap-6">
        <div rdxTooltipRoot>
          <button uiButton variant="ghost" size="icon" aria-label="Sync this version" rdxTooltipTrigger>${sync}</button>
          <ng-template rdxTooltipContent [sideOffset]="6">
            <div rdxTooltipContentAttributes>Sync this version<span rdxTooltipArrow></span></div>
          </ng-template>
        </div>

        <div rdxTooltipRoot>
          <button uiButton variant="outline" rdxTooltipTrigger>Save for later</button>
          <ng-template rdxTooltipContent [sideOffset]="6">
            <div rdxTooltipContentAttributes>Save for later<span uiKbd>⌘S</span><span rdxTooltipArrow></span></div>
          </ng-template>
        </div>

        <div rdxTooltipRoot>
          <button uiButton variant="secondary" rdxTooltipTrigger>Share</button>
          <ng-template rdxTooltipContent side="bottom" [sideOffset]="6">
            <div rdxTooltipContentAttributes>Share for feedback<span rdxTooltipArrow></span></div>
          </ng-template>
        </div>
      </div>
    `,
  }),
};
