import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Field, FieldDescription, FieldError, FieldLabel } from '../field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from './';

type PatternOption = 'none' | 'digits' | 'letters' | 'alphanumeric';

const PATTERN_BY_OPTION: Record<PatternOption, string | undefined> = {
  none: undefined,
  digits: REGEXP_ONLY_DIGITS,
  letters: REGEXP_ONLY_CHARS,
  alphanumeric: REGEXP_ONLY_DIGITS_AND_CHARS,
};

interface InputOtpStoryArgs {
  value: string;
  pattern: PatternOption;
  disabled: boolean;
  invalid: boolean;
}

/**
 * `[uiInputOtp]` is the Angular port of the Force UI (radix-force-ui)
 * input-otp. Unlike most ported components, the registry source wraps a
 * headless THIRD-PARTY React package (`input-otp`) with no radix-ng
 * equivalent — see the root component's doc comment for the full parity
 * deviation writeup. One real, invisible `<input>` (stretched over the whole
 * slot row) drives focus/keyboard/paste/mobile IME/screen readers; the
 * `InputOTPSlot` boxes are pure decoration reacting to shared signal state.
 *
 * Compound shape: `[uiInputOtp]` (root, holds `value`/`maxLength`/`pattern`)
 * → `[uiInputOtpGroup]` (visual cluster) → `[uiInputOtpSlot]` (one character
 * cell, `[index]` required) with an optional `[uiInputOtpSeparator]` between
 * groups.
 *
 * Accessibility: always pair the root's `id` with a real `<label for>` (the
 * `Field`/`FieldLabel` composition below, matching `ui/input`). Error state:
 * set `aria-invalid` on every affected slot (propagates to the group's
 * `has-aria-invalid:` ring) AND render a visible, linked `FieldError` — color
 * alone is not a sufficient signal (WCAG 1.4.1).
 */
const meta: Meta<InputOtpStoryArgs> = {
  title: 'UI/InputOTP',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, Field, FieldLabel, FieldDescription, FieldError],
    }),
  ],
  argTypes: {
    value: {
      control: 'text',
      description: 'Two-way (`[(value)]`) — the entered code.',
    },
    pattern: {
      control: 'select',
      options: ['none', 'digits', 'letters', 'alphanumeric'],
      description:
        'Restricts accepted characters. `digits`/`letters`/`alphanumeric` pass the matching exported `REGEXP_ONLY_*` constant to `pattern`; `none` accepts anything.',
      table: { defaultValue: { summary: 'none' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Sets native `disabled` on the hidden input and dims the whole control to 50%.',
    },
    invalid: {
      control: 'boolean',
      description: 'Sets `aria-invalid` on every slot — destructive border + ring. Pair with a visible FieldError.',
    },
  },
  args: {
    value: '',
    pattern: 'digits',
    disabled: false,
    invalid: false,
  },
  render: (args) => ({
    props: {
      ...args,
      patternValue: PATTERN_BY_OPTION[args.pattern],
      slotInvalid: args.invalid ? 'true' : null,
    },
    template: `
      <div uiField [invalid]="invalid">
        <label uiFieldLabel for="otp-playground">Verification code</label>
        <div uiInputOtp id="otp-playground" [maxLength]="6" [pattern]="patternValue" [disabled]="disabled" [aria-invalid]="invalid" [aria-describedby]="invalid ? 'otp-playground-desc otp-playground-error' : 'otp-playground-desc'" [value]="value" (valueChange)="value = $event">
          <div uiInputOtpGroup>
            <div uiInputOtpSlot [index]="0" [attr.aria-invalid]="slotInvalid"></div>
            <div uiInputOtpSlot [index]="1" [attr.aria-invalid]="slotInvalid"></div>
            <div uiInputOtpSlot [index]="2" [attr.aria-invalid]="slotInvalid"></div>
          </div>
          <div uiInputOtpSeparator></div>
          <div uiInputOtpGroup>
            <div uiInputOtpSlot [index]="3" [attr.aria-invalid]="slotInvalid"></div>
            <div uiInputOtpSlot [index]="4" [attr.aria-invalid]="slotInvalid"></div>
            <div uiInputOtpSlot [index]="5" [attr.aria-invalid]="slotInvalid"></div>
          </div>
        </div>
        <p uiFieldDescription id="otp-playground-desc">Enter the 6-digit code we sent to your email address.</p>
        @if (invalid) {
          <div uiFieldError id="otp-playground-error" [errors]="[{ message: 'Invalid code. Try again.' }]"></div>
        }
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<InputOtpStoryArgs>;

export const Playground: Story = {};

/**
 * Every slot as its own fully-rounded, independently-spaced box — no shared
 * borders, no separator icon (Figma "With Spacing"). Each slot sits in a
 * `[uiInputOtpGroup]` of one: being both `:first-child` and `:last-child`,
 * it picks up rounded corners and a border on every side for free from the
 * registry's `first:`/`last:` classes. The gap between boxes comes from
 * `gap-2` on the root — a plain Tailwind utility via the `class` input, not
 * a new component feature.
 */
export const WithSpacing: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputOtp aria-label="Verification code" class="gap-2" [maxLength]="6">
        <div uiInputOtpGroup><div uiInputOtpSlot [index]="0"></div></div>
        <div uiInputOtpGroup><div uiInputOtpSlot [index]="1"></div></div>
        <div uiInputOtpGroup><div uiInputOtpSlot [index]="2"></div></div>
        <div uiInputOtpGroup><div uiInputOtpSlot [index]="3"></div></div>
        <div uiInputOtpGroup><div uiInputOtpSlot [index]="4"></div></div>
        <div uiInputOtpGroup><div uiInputOtpSlot [index]="5"></div></div>
      </div>
    `,
  }),
};

/** Simple 3+3 grouping with no character restriction. */
export const Simple: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputOtp aria-label="Verification code" [maxLength]="6">
        <div uiInputOtpGroup>
          <div uiInputOtpSlot [index]="0"></div>
          <div uiInputOtpSlot [index]="1"></div>
          <div uiInputOtpSlot [index]="2"></div>
        </div>
        <div uiInputOtpSeparator></div>
        <div uiInputOtpGroup>
          <div uiInputOtpSlot [index]="3"></div>
          <div uiInputOtpSlot [index]="4"></div>
          <div uiInputOtpSlot [index]="5"></div>
        </div>
      </div>
    `,
  }),
};

/** A single unbroken group, digits only — the most common SMS/email code shape. */
export const DigitsOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { pattern: REGEXP_ONLY_DIGITS },
    template: `
      <div uiInputOtp aria-label="Verification code" [maxLength]="6" [pattern]="pattern">
        <div uiInputOtpGroup>
          <div uiInputOtpSlot [index]="0"></div>
          <div uiInputOtpSlot [index]="1"></div>
          <div uiInputOtpSlot [index]="2"></div>
          <div uiInputOtpSlot [index]="3"></div>
          <div uiInputOtpSlot [index]="4"></div>
          <div uiInputOtpSlot [index]="5"></div>
        </div>
      </div>
    `,
  }),
};

/** 4-digit PIN — the common shape for a lightweight confirmation code. */
export const FourDigits: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { pattern: REGEXP_ONLY_DIGITS },
    template: `
      <div uiInputOtp aria-label="4-digit PIN" [maxLength]="4" [pattern]="pattern">
        <div uiInputOtpGroup>
          <div uiInputOtpSlot [index]="0"></div>
          <div uiInputOtpSlot [index]="1"></div>
          <div uiInputOtpSlot [index]="2"></div>
          <div uiInputOtpSlot [index]="3"></div>
        </div>
      </div>
    `,
  }),
};

/** Disabled dims the whole control and blocks focus/typing. */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputOtp aria-label="Verification code" [maxLength]="6" [value]="'123'" [disabled]="true">
        <div uiInputOtpGroup>
          <div uiInputOtpSlot [index]="0"></div>
          <div uiInputOtpSlot [index]="1"></div>
          <div uiInputOtpSlot [index]="2"></div>
        </div>
        <div uiInputOtpSeparator></div>
        <div uiInputOtpGroup>
          <div uiInputOtpSlot [index]="3"></div>
          <div uiInputOtpSlot [index]="4"></div>
          <div uiInputOtpSlot [index]="5"></div>
        </div>
      </div>
    `,
  }),
};

/**
 * Error state: every slot carries `aria-invalid`, and a visible message
 * explains what's wrong and what to do — color is never the only signal
 * (WCAG 1.4.1).
 */
export const Invalid: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiField [invalid]="true">
        <label uiFieldLabel for="otp-invalid">Verification code</label>
        <div uiInputOtp id="otp-invalid" [maxLength]="6" [value]="'000000'" [aria-invalid]="true" aria-describedby="otp-invalid-error">
          <div uiInputOtpGroup>
            <div uiInputOtpSlot [index]="0" aria-invalid="true"></div>
            <div uiInputOtpSlot [index]="1" aria-invalid="true"></div>
            <div uiInputOtpSlot [index]="2" aria-invalid="true"></div>
          </div>
          <div uiInputOtpSeparator></div>
          <div uiInputOtpGroup>
            <div uiInputOtpSlot [index]="3" aria-invalid="true"></div>
            <div uiInputOtpSlot [index]="4" aria-invalid="true"></div>
            <div uiInputOtpSlot [index]="5" aria-invalid="true"></div>
          </div>
        </div>
        <div uiFieldError id="otp-invalid-error" [errors]="[{ message: 'Invalid code. Try again.' }]"></div>
      </div>
    `,
  }),
};

/** Every state side by side — for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-muted-foreground">Empty</span>
          <div uiInputOtp [maxLength]="6">
            <div uiInputOtpGroup>
              <div uiInputOtpSlot [index]="0"></div>
              <div uiInputOtpSlot [index]="1"></div>
              <div uiInputOtpSlot [index]="2"></div>
            </div>
            <div uiInputOtpSeparator></div>
            <div uiInputOtpGroup>
              <div uiInputOtpSlot [index]="3"></div>
              <div uiInputOtpSlot [index]="4"></div>
              <div uiInputOtpSlot [index]="5"></div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-muted-foreground">Filled</span>
          <div uiInputOtp [maxLength]="6" [value]="'123456'">
            <div uiInputOtpGroup>
              <div uiInputOtpSlot [index]="0"></div>
              <div uiInputOtpSlot [index]="1"></div>
              <div uiInputOtpSlot [index]="2"></div>
            </div>
            <div uiInputOtpSeparator></div>
            <div uiInputOtpGroup>
              <div uiInputOtpSlot [index]="3"></div>
              <div uiInputOtpSlot [index]="4"></div>
              <div uiInputOtpSlot [index]="5"></div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-muted-foreground">Disabled</span>
          <div uiInputOtp [maxLength]="6" [value]="'123'" [disabled]="true">
            <div uiInputOtpGroup>
              <div uiInputOtpSlot [index]="0"></div>
              <div uiInputOtpSlot [index]="1"></div>
              <div uiInputOtpSlot [index]="2"></div>
            </div>
            <div uiInputOtpSeparator></div>
            <div uiInputOtpGroup>
              <div uiInputOtpSlot [index]="3"></div>
              <div uiInputOtpSlot [index]="4"></div>
              <div uiInputOtpSlot [index]="5"></div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-muted-foreground">Error</span>
          <div uiInputOtp [maxLength]="6" [value]="'000000'">
            <div uiInputOtpGroup>
              <div uiInputOtpSlot [index]="0" aria-invalid="true"></div>
              <div uiInputOtpSlot [index]="1" aria-invalid="true"></div>
              <div uiInputOtpSlot [index]="2" aria-invalid="true"></div>
            </div>
            <div uiInputOtpSeparator></div>
            <div uiInputOtpGroup>
              <div uiInputOtpSlot [index]="3" aria-invalid="true"></div>
              <div uiInputOtpSlot [index]="4" aria-invalid="true"></div>
              <div uiInputOtpSlot [index]="5" aria-invalid="true"></div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
