import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverContentBox,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from './';

const POPOVER_IMPORTS = [
  CommonModule,
  Button,
  Input,
  Label,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ...PopoverContentBox,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  PopoverArrow,
];

interface PopoverStoryArgs {
  title: string;
  description: string;
  side: 'top' | 'right' | 'bottom' | 'left';
  align: 'start' | 'center' | 'end';
  sideOffset: number;
  showArrow: boolean;
  showHeader: boolean;
  triggerLabel: string;
  triggerVariant: 'default' | 'outline' | 'secondary' | 'ghost';
}

/**
 * `[rdxPopoverRoot]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) popover, built on `@radix-ng/primitives/popover` (CDK
 * overlay). A popover is a non-modal overlay anchored to a trigger that holds
 * RICH, interactive content — form fields, links, buttons. It sits between the
 * tooltip (short hover-only hint) and the dialog (modal, blocks the page).
 *
 * Composition: a `[rdxPopoverRoot]` wraps a `[rdxPopoverTrigger]` (any focusable
 * element — a `[uiButton]` here) and an `<ng-template rdxPopoverContent>` holding
 * the styled `[rdxPopoverContentAttributes]` box. Inside, compose
 * `[rdxPopoverHeader]` / `[rdxPopoverTitle]` / `[rdxPopoverDescription]`, your
 * interactive content, an optional `[rdxPopoverClose]` button, and an optional
 * `[rdxPopoverArrow]`.
 *
 * Opens on CLICK (not hover, unlike the tooltip) so it can be deliberately
 * summoned and focus moves into it; Escape and outside-click dismiss it.
 */
const meta: Meta<PopoverStoryArgs> = {
  title: 'UI/Popover',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: POPOVER_IMPORTS }),
    // Popovers portal to an overlay and grow on every side — pad generously and
    // centre the trigger so the panel is fully visible whichever `side` is set.
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `<div class="flex min-h-72 items-center justify-center p-16">${story.template}</div>`,
      };
    },
  ],
  argTypes: {
    title: { control: 'text', description: 'Popover title text.' },
    description: { control: 'text', description: 'Supporting description under the title.' },
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
    showArrow: { control: 'boolean', description: 'Render the pointer arrow toward the trigger.' },
    showHeader: { control: 'boolean', description: 'Show the title + description header.' },
    triggerLabel: { control: 'text', description: 'Visible text on the trigger button.' },
    triggerVariant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost'],
      description: 'Button variant of the trigger (see Button).',
      table: { defaultValue: { summary: 'outline' } },
    },
  },
  args: {
    title: 'Version details',
    description: 'Adjust the version before you submit it.',
    side: 'bottom',
    align: 'center',
    sideOffset: 6,
    showArrow: true,
    showHeader: true,
    triggerLabel: 'Edit version',
    triggerVariant: 'outline',
  },
  render: (args) => ({
    props: { ...args },
    // Static template gated with *ngIf so the boolean Controls (showArrow,
    // showHeader) take effect — Storybook re-binds props but does not recompile
    // the template string (skill §8).
    template: `
      <div rdxPopoverRoot>
        <button uiButton [variant]="triggerVariant" rdxPopoverTrigger>{{ triggerLabel }}</button>
        <ng-template rdxPopoverContent [side]="side" [align]="align" [sideOffset]="sideOffset">
          <div rdxPopoverContentAttributes>
            <div *ngIf="showHeader" rdxPopoverHeader>
              <div rdxPopoverTitle>{{ title }}</div>
              <p rdxPopoverDescription>{{ description }}</p>
            </div>
            <div class="flex flex-col gap-1.5">
              <label uiLabel for="popover-name">Name</label>
              <input uiInput id="popover-name" value="Lighting pass" />
            </div>
            <div class="flex justify-end gap-2">
              <button uiButton variant="ghost" size="sm" rdxPopoverClose>Cancel</button>
              <button uiButton size="sm" rdxPopoverClose>Save changes</button>
            </div>
            <span *ngIf="showArrow" rdxPopoverArrow [width]="16" [height]="8"></span>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<PopoverStoryArgs>;

export const Playground: Story = {};

/**
 * The common case: a quick-edit form in a popover, with a clear primary action
 * and a Cancel that dismisses the overlay (`[rdxPopoverClose]`). Focus moves into
 * the panel on open; Escape closes it and focus returns to the trigger.
 *
 * NOTE for copy-paste: `[rdxPopoverClose]` ONLY dismisses the panel — it runs no
 * save. Wire your own `(click)` save handler on the primary button (it can close
 * afterward by also carrying `rdxPopoverClose`, or call the root's close
 * programmatically once the save resolves). Don't ship a "Save changes" button
 * whose only behaviour is to close.
 */
export const WithForm: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxPopoverRoot>
        <button uiButton variant="outline" rdxPopoverTrigger>Edit version</button>
        <ng-template rdxPopoverContent side="bottom" [sideOffset]="6">
          <div rdxPopoverContentAttributes>
            <div rdxPopoverHeader>
              <div rdxPopoverTitle>Version details</div>
              <p rdxPopoverDescription>Adjust the version before you submit it.</p>
            </div>
            <div class="flex flex-col gap-1.5">
              <label uiLabel for="wf-name">Name</label>
              <input uiInput id="wf-name" value="Lighting pass" />
            </div>
            <div class="flex justify-end gap-2">
              <button uiButton variant="ghost" size="sm" rdxPopoverClose>Cancel</button>
              <!-- Demo only: wire (click)="save()" here — rdxPopoverClose just dismisses. -->
              <button uiButton size="sm" rdxPopoverClose>Save changes</button>
            </div>
            <span rdxPopoverArrow [width]="16" [height]="8"></span>
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
        <div rdxPopoverRoot>
          <button uiButton variant="outline" rdxPopoverTrigger>Top</button>
          <ng-template rdxPopoverContent side="top" [sideOffset]="6">
            <div rdxPopoverContentAttributes>Opens above the trigger.<span rdxPopoverArrow [width]="16" [height]="8"></span></div>
          </ng-template>
        </div>
        <div rdxPopoverRoot>
          <button uiButton variant="outline" rdxPopoverTrigger>Right</button>
          <ng-template rdxPopoverContent side="right" [sideOffset]="6">
            <div rdxPopoverContentAttributes>Opens to the right.<span rdxPopoverArrow [width]="16" [height]="8"></span></div>
          </ng-template>
        </div>
        <div rdxPopoverRoot>
          <button uiButton variant="outline" rdxPopoverTrigger>Bottom</button>
          <ng-template rdxPopoverContent side="bottom" [sideOffset]="6">
            <div rdxPopoverContentAttributes>Opens below the trigger.<span rdxPopoverArrow [width]="16" [height]="8"></span></div>
          </ng-template>
        </div>
        <div rdxPopoverRoot>
          <button uiButton variant="outline" rdxPopoverTrigger>Left</button>
          <ng-template rdxPopoverContent side="left" [sideOffset]="6">
            <div rdxPopoverContentAttributes>Opens to the left.<span rdxPopoverArrow [width]="16" [height]="8"></span></div>
          </ng-template>
        </div>
      </div>
    `,
  }),
};

/**
 * Text-only popover, no arrow — a flatter look for a short note anchored to a
 * control. Drop the `[rdxPopoverArrow]` element to remove the pointer.
 */
export const NoArrow: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxPopoverRoot>
        <button uiButton variant="ghost" rdxPopoverTrigger>About this version</button>
        <ng-template rdxPopoverContent side="bottom" [sideOffset]="6">
          <div rdxPopoverContentAttributes>
            <div rdxPopoverHeader>
              <div rdxPopoverTitle>Lighting pass</div>
              <p rdxPopoverDescription>Last edited 2 hours ago by you. Not yet submitted.</p>
            </div>
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/** Common popovers reviewed side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-start justify-center gap-6">
        <div rdxPopoverRoot>
          <button uiButton variant="outline" rdxPopoverTrigger>Edit version</button>
          <ng-template rdxPopoverContent side="bottom" [sideOffset]="6">
            <div rdxPopoverContentAttributes>
              <div rdxPopoverHeader>
                <div rdxPopoverTitle>Version details</div>
                <p rdxPopoverDescription>Adjust the version before you submit it.</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label uiLabel for="g-name">Name</label>
                <input uiInput id="g-name" value="Lighting pass" />
              </div>
              <div class="flex justify-end gap-2">
                <button uiButton variant="ghost" size="sm" rdxPopoverClose>Cancel</button>
                <button uiButton size="sm" rdxPopoverClose>Save changes</button>
              </div>
              <span rdxPopoverArrow [width]="16" [height]="8"></span>
            </div>
          </ng-template>
        </div>

        <div rdxPopoverRoot>
          <button uiButton variant="secondary" rdxPopoverTrigger>Share for feedback</button>
          <ng-template rdxPopoverContent side="bottom" [sideOffset]="6">
            <div rdxPopoverContentAttributes>
              <div rdxPopoverHeader>
                <div rdxPopoverTitle>Share this version</div>
                <p rdxPopoverDescription>Anyone with the link can view it.</p>
              </div>
              <div class="flex flex-col gap-1.5">
                <label uiLabel for="g-link">Link</label>
                <input uiInput id="g-link" value="p4one://share/lighting-pass" readonly />
              </div>
              <span rdxPopoverArrow [width]="16" [height]="8"></span>
            </div>
          </ng-template>
        </div>
      </div>
    `,
  }),
};
