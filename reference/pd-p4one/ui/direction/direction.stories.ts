import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { DirectionProvider, injectDirection, type Direction } from './';

/** Reads the ambient direction via `injectDirection()` and prints it. */
@Component({
  selector: 'direction-readout',
  standalone: true,
  template: `<span class="text-sm text-hint">Resolved direction: <strong class="text-foreground">{{ dir.value }}</strong></span>`,
})
class DirectionReadoutComponent {
  readonly dir = injectDirection();
}

interface DirectionStoryArgs {
  direction: Direction;
}

/**
 * `[uiDirectionProvider]` is the Angular port of the Force UI (radix-force-ui)
 * `direction` primitive — a scoped RTL/LTR context, not a themed widget (no
 * cva, no visual output of its own).
 *
 * It wraps Angular CDK's `Dir` directive (`@angular/cdk/bidi`), which is the
 * exact same mechanism `@radix-ng/primitives` itself consumes for
 * direction-aware components (e.g. `select`). Content inside the provider
 * can read the ambient value via `injectDirection()` (Angular's answer to the
 * registry's `useDirection` hook).
 */
const meta: Meta<DirectionStoryArgs> = {
  title: 'UI/Direction',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [DirectionProvider, DirectionReadoutComponent] }),
  ],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['ltr', 'rtl'],
      description: 'Reading direction applied to the wrapped subtree.',
      table: { type: { summary: "'ltr' | 'rtl'" }, defaultValue: { summary: 'ltr' } },
    },
  },
  args: {
    direction: 'ltr',
  },
  render: (args) => ({
    props: args,
    template: `
      <div uiDirectionProvider [direction]="direction" class="w-96 rounded-lg border border-border p-4">
        <div class="flex items-center gap-2">
          <svg class="size-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m274-450 227 227q9 9 9 21t-9 21q-9 9-21 9t-21-9L181-459q-5-5-7-10t-2-11q0-6 2-11t7-10l278-278q9-9 21-9t21 9q9 9 9 21t-9 21L274-510h496q13 0 21.5 8.5T800-480q0 13-8.5 21.5T770-450H274Z"/></svg>
          <span>Previous version</span>
          <svg class="size-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M686-450H190q-13 0-21.5-8.5T160-480q0-13 8.5-21.5T190-510h496L459-737q-9-9-9-21t9-21q9-9 21-9t21 9l278 278q5 5 7 10t2 11q0 6-2 11t-7 10L501-181q-9 9-21 9t-21-9q-9-9-9-21t9-21l227-227Z"/></svg>
          <span>Next version</span>
        </div>
        <div class="mt-2">
          <direction-readout />
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<DirectionStoryArgs>;

/** Full control set — switch direction via the Controls panel. */
export const Playground: Story = {};

/** Left-to-right — the default for every locale except RTL scripts. */
export const LeftToRight: Story = {
  args: { direction: 'ltr' },
};

/** Right-to-left — content order and icon order flip; the browser's native
 * bidi algorithm handles text shaping, `flex`/`gap` handle layout mirroring. */
export const RightToLeft: Story = {
  args: { direction: 'rtl' },
};

/** LTR and RTL side by side for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-start gap-4">
        <div uiDirectionProvider direction="ltr" class="w-72 rounded-lg border border-border p-4">
          <div class="flex items-center gap-2">
            <svg class="size-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m274-450 227 227q9 9 9 21t-9 21q-9 9-21 9t-21-9L181-459q-5-5-7-10t-2-11q0-6 2-11t7-10l278-278q9-9 21-9t21 9q9 9 9 21t-9 21L274-510h496q13 0 21.5 8.5T800-480q0 13-8.5 21.5T770-450H274Z"/></svg>
            <span>Previous version</span>
          </div>
          <div class="mt-2"><direction-readout /></div>
        </div>
        <div uiDirectionProvider direction="rtl" class="w-72 rounded-lg border border-border p-4">
          <div class="flex items-center gap-2">
            <svg class="size-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m274-450 227 227q9 9 9 21t-9 21q-9 9-21 9t-21-9L181-459q-5-5-7-10t-2-11q0-6 2-11t7-10l278-278q9-9 21-9t21 9q9 9 9 21t-9 21L274-510h496q13 0 21.5 8.5T800-480q0 13-8.5 21.5T770-450H274Z"/></svg>
            <span>Previous version</span>
          </div>
          <div class="mt-2"><direction-readout /></div>
        </div>
      </div>
    `,
  }),
};
