import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/app/ui/field';
import { Input } from '@/app/ui/input';

import { LoginForm01 } from './login-01.component';

/**
 * `login-01` — a simple login form. Pure composition of already-ported
 * `ui/*` primitives (card, field, input, button); no new tokens or variants
 * are introduced by this block.
 */
const meta: Meta<LoginForm01> = {
  title: 'Blocks/login/login-01',
  component: LoginForm01,
  tags: ['autodocs'],
  // Block-level compositions rely on `w-full`/`max-w-*` resolving against a
  // definite-width ancestor. The default `layout: 'centered'` (preview.ts)
  // wraps stories in a flex-centered body with no definite width, so every
  // nested `w-full` collapses to its content's min-content (confirmed: card
  // rendered at 32px, text letter-wrapped). `padded` renders in normal block
  // flow instead, giving the tree a real width to resolve percentages against.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        LoginForm01,
        Button,
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        Field,
        FieldGroup,
        FieldLabel,
        FieldDescription,
        Input,
      ],
    }),
  ],
  render: () => ({
    template: `
      <div class="flex min-h-[32rem] w-full items-center justify-center bg-background p-6">
        <app-block-login-01 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<LoginForm01>;

/** The full login-01 composition: card, email + password fields, submit, OAuth, sign-up link. */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};
