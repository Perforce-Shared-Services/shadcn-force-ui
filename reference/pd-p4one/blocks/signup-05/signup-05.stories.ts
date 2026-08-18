import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { SignupBlock05Component } from './signup-05.component';

/**
 * `signup-05` — the Force UI Block "Signup 05" (A simple signup form with
 * social providers), composed entirely from already-ported `ui/*` primitives
 * (`button`, `input`, `field`). This is a reference page composition, not a
 * library export — see
 * `app/src/app/blocks/signup-05/signup-05.component.ts` for the canonical
 * copy source.
 */
const meta: Meta<SignupBlock05Component> = {
  title: 'Blocks/signup/signup-05',
  component: SignupBlock05Component,
  tags: ['autodocs'],
  // See login-01.stories.ts for why blocks need `padded` over the default `centered` layout.
  parameters: { layout: 'padded' },
  decorators: [moduleMetadata({ imports: [SignupBlock05Component] })],
  render: () => ({
    template: `
      <div class="min-h-[640px] w-full bg-background">
        <app-block-signup-05></app-block-signup-05>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<SignupBlock05Component>;

/** The full block, static: email field, Create Account, and the two OAuth buttons. */
export const Default: Story = {};
