import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Signup03BlockComponent } from './signup-03.component';

/**
 * `app-block-signup-03` — Force UI Block "Signup 03": a signup page with a
 * muted background color. Composed entirely from this app's ported `ui/*`
 * primitives (`Button`, `Card`, `Field`, `Input`) — the upstream shadcn source
 * is a structural reference only, not a class-for-class port.
 *
 * Demo scaffolding: the form does not call a real signup API. `onSubmit` just
 * logs — a real screen would route through a Service UI Flow per the app's
 * layered architecture.
 */
const meta: Meta<Signup03BlockComponent> = {
  title: 'Blocks/signup/signup-03',
  component: Signup03BlockComponent,
  tags: ['autodocs'],
  // See login-01.stories.ts for why blocks need `padded` over the default `centered` layout.
  parameters: { layout: 'padded' },
  decorators: [moduleMetadata({ imports: [Signup03BlockComponent] })],
  render: () => ({
    template: `
      <div style="min-height: 700px;">
        <app-block-signup-03 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Signup03BlockComponent>;

/** The full composed signup page: brand mark, card (full name/email/password + confirm), ToS footnote. */
export const Default: Story = {};

/** Same composition as Default; kept as the interactive playground entry point. */
export const Playground: Story = {};
