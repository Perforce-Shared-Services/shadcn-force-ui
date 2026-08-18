import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Login03BlockComponent } from './login-03.component';

/**
 * `app-block-login-03` — Force UI Block "Login 03": a login page with a muted
 * background color. Composed entirely from this app's ported `ui/*`
 * primitives (`Button`, `Card`, `Field`, `Input`) — the upstream shadcn source
 * is a structural reference only, not a class-for-class port.
 *
 * Demo scaffolding: the form does not call a real auth API. `onSubmit` /
 * `onOAuthLogin` just log — a real screen would route through a Service UI
 * Flow per the app's layered architecture.
 */
const meta: Meta<Login03BlockComponent> = {
  title: 'Blocks/login/login-03',
  component: Login03BlockComponent,
  tags: ['autodocs'],
  // See login-01.stories.ts for why blocks need `padded` over the default `centered` layout.
  parameters: { layout: 'padded' },
  decorators: [moduleMetadata({ imports: [Login03BlockComponent] })],
  render: () => ({
    template: `
      <div style="min-height: 700px;">
        <app-block-login-03 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Login03BlockComponent>;

/** The full composed login page: brand mark, card (OAuth + email/password + submit), ToS footnote. */
export const Default: Story = {};

/** Same composition as Default; kept as the interactive playground entry point. */
export const Playground: Story = {};
