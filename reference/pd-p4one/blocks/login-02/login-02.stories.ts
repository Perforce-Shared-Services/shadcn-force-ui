import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/app/ui/field';
import { Input } from '@/app/ui/input';

import { LoginForm02 } from './login-02.component';

/**
 * `login-02` — a two column login page with a cover panel. Pure composition
 * of already-ported `ui/*` primitives (field, input, button); no new tokens
 * or variants are introduced by this block. The cover column collapses below
 * the `lg` breakpoint, same as the upstream reference.
 */
const meta: Meta<LoginForm02> = {
  title: 'Blocks/login/login-02',
  component: LoginForm02,
  tags: ['autodocs'],
  // See login-01.stories.ts for why blocks need `padded` over the default `centered` layout.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [LoginForm02, Button, Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator, Input],
    }),
  ],
  render: () => ({
    template: `
      <div class="min-h-[40rem] w-full bg-background">
        <app-block-login-02 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<LoginForm02>;

/** The full login-02 composition: brand mark, form column, and cover panel (hidden below `lg`). */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};
