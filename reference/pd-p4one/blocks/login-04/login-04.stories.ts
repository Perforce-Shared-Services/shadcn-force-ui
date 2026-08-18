import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Login04Component } from './login-04.component';

/**
 * `app-block-login-04` — Force UI/shadcn Block "A login page with form and
 * image." Composed entirely from already-ported `ui/*` primitives (`Card`,
 * `Field`, `Input`, `Button`): a two-column card with the login form on the
 * left and a full-bleed image panel on the right (hidden below `md`), plus a
 * social-login row and a terms disclaimer.
 *
 * Reference/demo composition — `submit` and the social buttons log to the
 * console rather than calling a real backend. A consuming product wires its
 * own handlers.
 */
const meta: Meta<Login04Component> = {
  title: 'Blocks/login/login-04',
  tags: ['autodocs'],
  // See login-01.stories.ts for why blocks need `padded` over the default `centered` layout.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Login04Component],
    }),
  ],
  render: () => ({
    template: `
      <div style="min-height: 700px;">
        <app-block-login-04 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Login04Component>;

/** Interactive playground — the full composed login page. */
export const Playground: Story = {};

/** Same composition as Playground; kept as the canonical reference story. */
export const Default: Story = {};
