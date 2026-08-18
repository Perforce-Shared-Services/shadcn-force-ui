import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { LoginBlock05Component } from './login-05.component';

/**
 * `login-05` — the Force UI Block "Login 05" (A simple email-only login
 * page), composed entirely from already-ported `ui/*` primitives (`button`,
 * `input`, `field`). This is a reference page composition, not a library
 * export — see `app/src/app/blocks/login-05/login-05.component.ts` for the
 * canonical copy source.
 */
const meta: Meta<LoginBlock05Component> = {
  title: 'Blocks/login/login-05',
  component: LoginBlock05Component,
  tags: ['autodocs'],
  // See login-01.stories.ts for why blocks need `padded` over the default `centered` layout.
  parameters: { layout: 'padded' },
  decorators: [moduleMetadata({ imports: [LoginBlock05Component] })],
  render: () => ({
    template: `
      <div class="min-h-[640px] w-full bg-background">
        <app-block-login-05></app-block-login-05>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<LoginBlock05Component>;

/** The full block, static: email field, Login, and the two OAuth buttons. */
export const Default: Story = {};
