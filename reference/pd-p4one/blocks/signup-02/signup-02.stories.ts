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

import { SignupForm02 } from './signup-02.component';

/**
 * `signup-02` — a two column signup page with a cover panel. Pure composition
 * of already-ported `ui/*` primitives (field, input, button); no new tokens
 * or variants are introduced by this block. The cover column collapses below
 * the `lg` breakpoint, same as the upstream reference and the already-ported
 * `login-02`.
 */
const meta: Meta<SignupForm02> = {
  title: 'Blocks/signup/signup-02',
  component: SignupForm02,
  tags: ['autodocs'],
  // See login-01.stories.ts for why blocks need `padded` over the default `centered` layout.
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        SignupForm02,
        Button,
        Field,
        FieldGroup,
        FieldLabel,
        FieldDescription,
        FieldSeparator,
        Input,
      ],
    }),
  ],
  render: () => ({
    template: `
      <div class="min-h-[40rem] w-full bg-background">
        <app-block-signup-02 />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<SignupForm02>;

/** The full signup-02 composition: brand mark, form column, and cover panel (hidden below `lg`). */
export const Default: Story = {};

/** Same composition — kept as the interactive playground entry point. */
export const Playground: Story = {};
