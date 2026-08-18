import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Signup04Component } from './signup-04.component';

/**
 * `app-block-signup-04` — Force UI/shadcn Block "A signup page with form and
 * image." Composed entirely from already-ported `ui/*` primitives (`Card`,
 * `Field`, `Input`, `Button`): a two-column card with the signup form
 * (email, password + confirm password, submit, social row) on the left and
 * a full-bleed image panel on the right (hidden below `md`), plus a terms
 * disclaimer.
 *
 * Reference/demo composition — `submit` and the social buttons log to the
 * console rather than calling a real backend. A consuming product wires its
 * own handlers.
 */
const meta: Meta<Signup04Component> = {
  title: 'Blocks/signup/signup-04',
  tags: ['autodocs'],
  // See login-01.stories.ts for why blocks need `padded` over the default `centered` layout.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [Signup04Component],
    }),
  ],
  render: () => ({
    template: `
      <div style="min-height: 700px;">
        <app-block-signup-04 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Signup04Component>;

/** Interactive playground — the full composed signup page. */
export const Playground: Story = {};

/** Same composition as Playground; kept as the canonical reference story. */
export const Default: Story = {};
