import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Kbd, KbdGroup } from '../kbd';
import { Button, type ButtonSize, type ButtonVariant } from './';

const VARIANTS: ButtonVariant[] = [
  'default',
  'outline',
  'secondary',
  'ghost',
  'destructive',
  'link',
];

const SIZES: ButtonSize[] = [
  'default',
  'xs',
  'sm',
  'lg',
  'icon',
  'icon-xs',
  'icon-sm',
  'icon-lg',
];

interface ButtonStoryArgs {
  variant: ButtonVariant;
  size: ButtonSize;
  label: string;
  disabled: boolean;
  loading: boolean;
  leadingIcon: boolean;
  trailingIcon: boolean;
  iconFill: 'outline' | 'filled';
  kbd: boolean;
}

/**
 * `[uiButton]` is the Angular port of the Force UI (radix-force-ui) button.
 * It's an attribute selector, so stories render a real `<button uiButton>` and
 * bind the `variant` / `size` signal inputs.
 *
 * Icons follow the app-wide convention: an inline Material Symbols `<svg>`
 * (imported from `@material-symbols/svg-400` via the `?raw` webpack rule) is
 * projected as a child tagged `data-icon="inline-start"` (leading) or
 * `"inline-end"` (trailing). The cva adds the side padding, sizes any `<svg>` to
 * the button's text size, and applies `fill-current` so the glyph inherits the
 * label colour. These demo stories inline the SVG markup directly (the FILL
 * control swaps the outline cut for the `-fill` cut); product code imports the
 * one glyph it needs from `@material-symbols/svg-400/rounded/<name>.svg?raw`.
 *
 * Accessibility, when copying these snippets into product:
 * - The `icon*` sizes render no text — always give the host an `aria-label`
 *   (see the IconOnly story) or the button is unnamed to screen readers.
 * - Prefer `<button uiButton>` for click actions. Use `<a uiButton>` only for
 *   navigation, and always with a real `href`.
 * - Button labels are artist-facing copy: a specific verb + object
 *   ("Save version", "Submit changes"), never filler like "Button" or "OK".
 */
const meta: Meta<ButtonStoryArgs> = {
  title: 'UI/Button',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Button, Kbd, KbdGroup] })],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description:
        'Visual style. `default` = primary action (filled indigo); `secondary` = neutral companion; `outline` = low-emphasis bordered; `ghost` = chromeless toolbar action; `destructive` = removes/deletes (tinted); `link` = inline text action.',
      table: { type: { summary: VARIANTS.join(' | ') }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: SIZES,
      description:
        'Height + padding token. `xs`/`sm`/`default`/`lg` are text buttons; `icon*` are square icon-only buttons (require an `aria-label` on the host).',
      table: { type: { summary: SIZES.join(' | ') }, defaultValue: { summary: 'default' } },
    },
    label: {
      control: 'text',
      description: 'Button text (projected content). Use a specific verb + object.',
    },
    disabled: {
      control: 'boolean',
      description:
        'Inactive state. On `<button>` it sets native `disabled` (drops it from the tab order); on `<a>` the component falls back to `aria-disabled` + `tabindex="-1"` + a click guard, since anchors have no native disabled.',
    },
    loading: {
      control: 'boolean',
      description:
        'In-progress state for async actions (submit, sync, share). Renders a leading spinner, sets `aria-busy="true"`, and blocks interaction like `disabled` — so the action cannot be fired twice.',
    },
    leadingIcon: { control: 'boolean', description: 'Show an icon before the label (Material Symbols `save`).' },
    trailingIcon: { control: 'boolean', description: 'Show an icon after the label (Material Symbols `arrow_forward`).' },
    iconFill: {
      control: 'inline-radio',
      options: ['outline', 'filled'],
      description: 'Material Symbols FILL axis: outline (0, resting) vs filled (1, active) — the `-fill` cut of the same glyph.',
    },
    kbd: {
      control: 'boolean',
      description: 'Show a trailing keyboard-shortcut group ([uiKbdGroup]) — e.g. a command-palette trigger.',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    label: 'Save version',
    disabled: false,
    loading: false,
    leadingIcon: false,
    trailingIcon: false,
    iconFill: 'outline',
    kbd: false,
  },
  render: (args) => ({
    props: {
      ...args,
      // The primary (indigo) button is a dark surface → use the translucent
      // primary kbd; every other variant sits on a light surface → muted kbd.
      kbdVariant: args.variant === 'default' ? 'primary' : 'default',
    },
    template: `
      <button uiButton [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">
        @if (leadingIcon) {
          @if (iconFill === 'filled') {
            <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M197.69-140q-23.61 0-40.65-17.04T140-197.69v-564.62q0-23.61 17.04-40.65T197.69-820h451.85q11.61 0 22.73 4.81 11.11 4.81 18.73 12.42L802.77-691q7.61 7.62 12.42 18.73 4.81 11.12 4.81 22.73v451.85q0 23.61-17.04 40.65T762.31-140H197.69Zm344.66-158.96q25.88-25.89 25.88-62.35t-25.88-62.34q-25.89-25.89-62.35-25.89t-62.35 25.89q-25.88 25.88-25.88 62.34 0 36.46 25.88 62.35 25.89 25.88 62.35 25.88t62.35-25.88ZM279.16-582.08h269.15q12.61 0 20.73-8.3 8.11-8.31 8.11-20.54v-69.92q0-12.62-8.11-20.74-8.12-8.11-20.73-8.11H279.16q-12.62 0-20.74 8.11-8.11 8.12-8.11 20.74v69.92q0 12.23 8.11 20.54 8.12 8.3 20.74 8.3Z"/></svg>
          } @else {
            <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M197.69-140q-23.53 0-40.61-17.08T140-197.69v-564.62q0-23.53 17.08-40.61T197.69-820h451.85q12.06 0 22.95 4.81 10.89 4.81 18.51 12.42L802.77-691q7.61 7.62 12.42 18.51t4.81 22.95v451.85q0 23.53-17.08 40.61T762.31-140H197.69Zm576.92-513.31-121.3-121.3H197.69q-5.38 0-8.84 3.46t-3.46 8.84v564.62q0 5.38 3.46 8.84t8.84 3.46h564.62q5.38 0 8.84-3.46t3.46-8.84v-455.62ZM542.35-298.73q25.88-25.65 25.88-62.34 0-36.7-25.65-62.58-25.65-25.89-62.34-25.89-36.7 0-62.59 25.65-25.88 25.65-25.88 62.35 0 36.69 25.65 62.58 25.65 25.88 62.34 25.88 36.7 0 62.59-25.65ZM279.16-582.08h269.15q12.35 0 20.6-8.43 8.24-8.43 8.24-20.41v-69.92q0-12.36-8.24-20.61-8.25-8.24-20.6-8.24H279.16q-12.36 0-20.61 8.24-8.24 8.25-8.24 20.61v69.92q0 11.98 8.24 20.41 8.25 8.43 20.61 8.43Zm-93.77-71.23v467.92-589.22 121.3Z"/></svg>
          }
        }
        {{ label }}
        @if (trailingIcon) {
          <svg data-icon="inline-end" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M693.69-457.31h-491q-9.91 0-16.3-6.39-6.39-6.39-6.39-16.31 0-9.91 6.39-16.3 6.39-6.38 16.3-6.38h491L464-732q-6.31-6.76-6.69-15.84-.39-9.08 6.69-15.99 7.08-7.25 16-7.25t16 7.08l263.85 263.85q4.53 4.53 6.73 9.39 2.19 4.86 2.19 10.81t-2.19 10.76q-2.2 4.81-6.73 9.34L496-196q-6.69 6.69-15.73 6.88-9.04.2-16.27-6.88-7.08-7.23-7.08-16.08 0-8.84 7.08-15.54l229.69-229.69Z"/></svg>
        }
        @if (kbd) {
          <span uiKbdGroup data-icon="inline-end"><kbd uiKbd [variant]="kbdVariant">⌘</kbd><kbd uiKbd [variant]="kbdVariant">K</kbd></span>
        }
      </button>
    `,
  }),
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Playground: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', label: 'Compare' } };
export const Outline: Story = { args: { variant: 'outline', label: 'Browse files' } };
export const Ghost: Story = { args: { variant: 'ghost', label: 'More actions' } };
export const Destructive: Story = { args: { variant: 'destructive', label: 'Delete version' } };
export const Link: Story = { args: { variant: 'link', label: 'View on server' } };

/** Async in-progress state: spinner + `aria-busy`, interaction blocked. */
export const Loading: Story = { args: { loading: true, label: 'Submitting…' } };

/** Leading + trailing inline `<svg>` glyphs, sized to the label automatically. */
export const WithIcons: Story = {
  args: { leadingIcon: true, trailingIcon: true, label: 'Sync from server' },
};

/**
 * Icon-only buttons carry no text, so the host MUST have an `aria-label` — this
 * is the accessible name screen readers announce. The glyph itself is
 * decorative (`aria-hidden`). Icons are inline Material Symbols Rounded `<svg>`.
 */
export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <button uiButton size="icon-xs" aria-label="Add file">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M457.31-457.31H242.69q-9.64 0-16.16-6.58-6.53-6.58-6.53-16.31 0-9.72 6.53-16.11 6.52-6.38 16.16-6.38h214.62v-214.62q0-9.64 6.58-16.16 6.58-6.53 16.31-6.53 9.72 0 16.11 6.53 6.38 6.52 6.38 16.16v214.62h214.62q9.64 0 16.16 6.58 6.53 6.58 6.53 16.31 0 9.72-6.53 16.11-6.52 6.38-16.16 6.38H502.69v214.62q0 9.64-6.58 16.16-6.58 6.53-16.31 6.53-9.72 0-16.11-6.53-6.38-6.52-6.38-16.16v-214.62Z"/></svg>
        </button>
        <button uiButton size="icon-sm" variant="outline" aria-label="Sync from server">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M215.38-476.62q0 60.27 22.52 107.38 22.52 47.12 62.95 83.01l40 33.69v-105.92q0-9.9 6.4-16.29 6.41-6.4 16.31-6.4 9.9 0 16.29 6.4 6.38 6.39 6.38 16.29v156.54q0 12.51-8.17 20.67-8.17 8.17-20.68 8.17H200.85q-9.9 0-16.3-6.4-6.4-6.41-6.4-16.31 0-9.9 6.4-16.29 6.4-6.38 16.3-6.38h108.84l-28.46-26.23q-57.84-49.46-84.54-106.66Q170-408.54 170-476.62q0-90.24 47.58-165.39 47.57-75.14 127.5-114.76 8.3-3.84 16.33-.61 8.03 3.23 11.36 11.49 3.84 8.25-.14 17.24-3.99 8.99-12.78 13.65-65.93 34.77-105.2 98.71-39.27 63.94-39.27 139.67Zm529.24-6.76q0-49.11-22.52-98.65-22.52-49.55-61.33-88.28l-39.39-37.15v105.92q0 9.9-6.4 16.29-6.41 6.4-16.31 6.4-9.9 0-16.28-6.4-6.39-6.39-6.39-16.29v-156.54q0-12.51 8.17-20.67 8.17-8.17 20.68-8.17h156.53q9.9 0 16.3 6.4 6.4 6.41 6.4 16.31 0 9.9-6.4 16.29-6.4 6.38-16.3 6.38H651.92L680-713.69q55.32 52.47 82.66 112.85Q790-540.46 790-483.32q0 89.47-46.27 163.67-46.27 74.19-124.58 115.42-8.69 4.46-17.88 1.88-9.19-2.57-13.04-11.71-3.84-8.32.19-17.4 4.04-9.08 12.35-13.54 66.54-33.77 105.19-98.21 38.66-64.44 38.66-140.17Z"/></svg>
        </button>
        <button uiButton size="icon" variant="ghost" aria-label="More actions">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M225.55-443.54q-15.1 0-25.71-10.75-10.61-10.74-10.61-25.83 0-15.09 10.75-25.72 10.74-10.62 25.83-10.62 15.09 0 25.91 10.75 10.82 10.74 10.82 25.83 0 15.09-10.87 25.72-10.86 10.62-26.12 10.62Zm254.33 0q-15.09 0-25.72-10.75-10.62-10.74-10.62-25.83 0-15.09 10.75-25.72 10.74-10.62 25.83-10.62 15.09 0 25.72 10.75 10.62 10.74 10.62 25.83 0 15.09-10.75 25.72-10.74 10.62-25.83 10.62Zm254.31 0q-15.09 0-25.91-10.75-10.82-10.74-10.82-25.83 0-15.09 10.87-25.72 10.86-10.62 26.12-10.62 15.1 0 25.71 10.75 10.61 10.74 10.61 25.83 0 15.09-10.75 25.72-10.74 10.62-25.83 10.62Z"/></svg>
        </button>
        <button uiButton size="icon-lg" variant="destructive" aria-label="Delete version">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M278.31-140q-23.5 0-40.6-17.1-17.09-17.09-17.09-40.59v-544.23h-17.93q-9.64 0-16.16-6.58-6.53-6.58-6.53-16.31 0-9.73 6.53-16.11 6.52-6.39 16.16-6.39h148.39q0-11.84 8.24-19.96 8.25-8.11 19.83-8.11h201.7q11.58 0 19.83 8.24 8.24 8.25 8.24 19.83h148.39q9.64 0 16.16 6.58 6.53 6.58 6.53 16.31 0 9.73-6.53 16.11-6.52 6.39-16.16 6.39h-17.93v544.23q0 23.5-17.09 40.59-17.1 17.1-40.6 17.1H278.31ZM694-741.92H266v544.23q0 5.38 3.65 8.84 3.66 3.46 8.66 3.46h403.38q5 0 8.66-3.46 3.65-3.46 3.65-8.84v-544.23ZM420.23-276.37q6.39-6.52 6.39-16.17v-343.23q0-9.27-6.58-15.98-6.58-6.71-16.31-6.71-9.73 0-16.11 6.71-6.39 6.71-6.39 15.98v343.23q0 9.65 6.58 16.17 6.58 6.52 16.31 6.52 9.73 0 16.11-6.52Zm152.15 0q6.39-6.52 6.39-16.17v-343.23q0-9.27-6.58-15.98-6.58-6.71-16.31-6.71-9.73 0-16.11 6.71-6.39 6.71-6.39 15.98v343.23q0 9.65 6.58 16.17 6.58 6.52 16.31 6.52 9.73 0 16.11-6.52ZM266-741.92v556.53-556.53Z"/></svg>
        </button>
      </div>
    `,
  }),
};

/**
 * A disabled `<a uiButton>`. Anchors have no native `disabled`, so the component
 * applies `aria-disabled="true"`, removes it from the tab order (`tabindex="-1"`)
 * and guards the click — the link neither focuses nor navigates while disabled.
 */
export const AnchorDisabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <a uiButton variant="link" href="https://example.com">Enabled link</a>
        <a uiButton variant="link" href="https://example.com" [disabled]="true">Disabled link</a>
      </div>
    `,
  }),
};

/** Gallery of every variant and size — handy for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex flex-wrap items-center gap-3">
          <button uiButton variant="default">Save version</button>
          <button uiButton variant="secondary">Compare</button>
          <button uiButton variant="outline">Browse files</button>
          <button uiButton variant="ghost">More actions</button>
          <button uiButton variant="destructive">Delete version</button>
          <button uiButton variant="link">View on server</button>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button uiButton size="xs">Save version</button>
          <button uiButton size="sm">Save version</button>
          <button uiButton size="default">Save version</button>
          <button uiButton size="lg">Save version</button>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button uiButton size="icon-xs" aria-label="Add">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M457.31-457.31H242.69q-9.64 0-16.16-6.58-6.53-6.58-6.53-16.31 0-9.72 6.53-16.11 6.52-6.38 16.16-6.38h214.62v-214.62q0-9.64 6.58-16.16 6.58-6.53 16.31-6.53 9.72 0 16.11 6.53 6.38 6.52 6.38 16.16v214.62h214.62q9.64 0 16.16 6.58 6.53 6.58 6.53 16.31 0 9.72-6.53 16.11-6.52 6.38-16.16 6.38H502.69v214.62q0 9.64-6.58 16.16-6.58 6.53-16.31 6.53-9.72 0-16.11-6.53-6.38-6.52-6.38-16.16v-214.62Z"/></svg>
          </button>
          <button uiButton size="icon-sm" aria-label="Sync">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M215.38-476.62q0 60.27 22.52 107.38 22.52 47.12 62.95 83.01l40 33.69v-105.92q0-9.9 6.4-16.29 6.41-6.4 16.31-6.4 9.9 0 16.29 6.4 6.38 6.39 6.38 16.29v156.54q0 12.51-8.17 20.67-8.17 8.17-20.68 8.17H200.85q-9.9 0-16.3-6.4-6.4-6.41-6.4-16.31 0-9.9 6.4-16.29 6.4-6.38 16.3-6.38h108.84l-28.46-26.23q-57.84-49.46-84.54-106.66Q170-408.54 170-476.62q0-90.24 47.58-165.39 47.57-75.14 127.5-114.76 8.3-3.84 16.33-.61 8.03 3.23 11.36 11.49 3.84 8.25-.14 17.24-3.99 8.99-12.78 13.65-65.93 34.77-105.2 98.71-39.27 63.94-39.27 139.67Zm529.24-6.76q0-49.11-22.52-98.65-22.52-49.55-61.33-88.28l-39.39-37.15v105.92q0 9.9-6.4 16.29-6.41 6.4-16.31 6.4-9.9 0-16.28-6.4-6.39-6.39-6.39-16.29v-156.54q0-12.51 8.17-20.67 8.17-8.17 20.68-8.17h156.53q9.9 0 16.3 6.4 6.4 6.41 6.4 16.31 0 9.9-6.4 16.29-6.4 6.38-16.3 6.38H651.92L680-713.69q55.32 52.47 82.66 112.85Q790-540.46 790-483.32q0 89.47-46.27 163.67-46.27 74.19-124.58 115.42-8.69 4.46-17.88 1.88-9.19-2.57-13.04-11.71-3.84-8.32.19-17.4 4.04-9.08 12.35-13.54 66.54-33.77 105.19-98.21 38.66-64.44 38.66-140.17Z"/></svg>
          </button>
          <button uiButton size="icon" aria-label="More actions">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M225.55-443.54q-15.1 0-25.71-10.75-10.61-10.74-10.61-25.83 0-15.09 10.75-25.72 10.74-10.62 25.83-10.62 15.09 0 25.91 10.75 10.82 10.74 10.82 25.83 0 15.09-10.87 25.72-10.86 10.62-26.12 10.62Zm254.33 0q-15.09 0-25.72-10.75-10.62-10.74-10.62-25.83 0-15.09 10.75-25.72 10.74-10.62 25.83-10.62 15.09 0 25.72 10.75 10.62 10.74 10.62 25.83 0 15.09-10.75 25.72-10.74 10.62-25.83 10.62Zm254.31 0q-15.09 0-25.91-10.75-10.82-10.74-10.82-25.83 0-15.09 10.87-25.72 10.86-10.62 26.12-10.62 15.1 0 25.71 10.75 10.61 10.74 10.61 25.83 0 15.09-10.75 25.72-10.74 10.62-25.83 10.62Z"/></svg>
          </button>
          <button uiButton size="icon-lg" aria-label="Delete">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M278.31-140q-23.5 0-40.6-17.1-17.09-17.09-17.09-40.59v-544.23h-17.93q-9.64 0-16.16-6.58-6.53-6.58-6.53-16.31 0-9.73 6.53-16.11 6.52-6.39 16.16-6.39h148.39q0-11.84 8.24-19.96 8.25-8.11 19.83-8.11h201.7q11.58 0 19.83 8.24 8.24 8.25 8.24 19.83h148.39q9.64 0 16.16 6.58 6.53 6.58 6.53 16.31 0 9.73-6.53 16.11-6.52 6.39-16.16 6.39h-17.93v544.23q0 23.5-17.09 40.59-17.1 17.1-40.6 17.1H278.31ZM694-741.92H266v544.23q0 5.38 3.65 8.84 3.66 3.46 8.66 3.46h403.38q5 0 8.66-3.46 3.65-3.46 3.65-8.84v-544.23ZM420.23-276.37q6.39-6.52 6.39-16.17v-343.23q0-9.27-6.58-15.98-6.58-6.71-16.31-6.71-9.73 0-16.11 6.71-6.39 6.71-6.39 15.98v343.23q0 9.65 6.58 16.17 6.58 6.52 16.31 6.52 9.73 0 16.11-6.52Zm152.15 0q6.39-6.52 6.39-16.17v-343.23q0-9.27-6.58-15.98-6.58-6.71-16.31-6.71-9.73 0-16.11 6.71-6.39 6.71-6.39 15.98v343.23q0 9.65 6.58 16.17 6.58 6.52 16.31 6.52 9.73 0 16.11-6.52ZM266-741.92v556.53-556.53Z"/></svg>
          </button>
        </div>
      </div>
    `,
  }),
};
