import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Badge, type BadgeVariant } from './';

const VARIANTS: BadgeVariant[] = [
  'default',
  'secondary',
  'destructive',
  'warning',
  'success',
  'info',
  'success-solid',
  'warning-solid',
  'info-solid',
  'error-solid',
  'outline',
  'ghost',
  'link',
];

interface BadgeStoryArgs {
  variant: BadgeVariant;
  label: string;
  leadingIcon: boolean;
  trailingIcon: boolean;
  iconFill: 'outline' | 'filled';
}

/**
 * `[uiBadge]` is the Angular port of the Force UI (radix-force-ui) badge.
 * It's an attribute selector, so stories render a real `<span uiBadge>` and
 * bind the `variant` signal input.
 *
 * Icons are projected inline Material Symbols `<svg>` children tagged
 * `data-icon` (imported from `@material-symbols/svg-400` via the `?raw` webpack
 * rule). The Controls panel mirrors the Figma badge props: pick the **variant**,
 * toggle the **leading/trailing icon**, and flip the icon between **outline**
 * (FILL 0, resting) and **filled** (FILL 1, active) — the `-fill` cut of the
 * same glyph. These demos inline the SVG markup directly, exactly as a consumer
 * would project it.
 */
const meta: Meta<BadgeStoryArgs> = {
  title: 'UI/Badge',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Badge] })],
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'Visual style' },
    label: { control: 'text', description: 'Badge text (projected content)' },
    leadingIcon: { control: 'boolean', description: 'Show an icon before the text (Material Symbols `check_circle`).' },
    trailingIcon: { control: 'boolean', description: 'Show an icon after the text (Material Symbols `arrow_forward`).' },
    iconFill: {
      control: 'inline-radio',
      options: ['outline', 'filled'],
      description: 'Icon fill axis — outline (FILL 0) resting / filled (FILL 1) active — the `-fill` cut of the glyph.',
    },
  },
  args: {
    variant: 'default',
    label: 'Badge',
    leadingIcon: false,
    trailingIcon: false,
    iconFill: 'outline',
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <span uiBadge [variant]="variant">
        @if (leadingIcon) {
          @if (iconFill === 'filled') {
            <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M421-380.15 319.54-482q-7.08-6.69-16.81-6.88-9.73-.2-17.42 7.5-7.08 7.07-7.08 16.8t7.08 16.81l115.46 116.08q8.61 9 20.23 9 11.62 0 20.23-9l232.08-231.7q7.3-7.69 7.5-17.42.19-9.73-7.5-17.42-7.7-7.08-17.73-6.77-10.04.31-17.12 7.39L421-380.15ZM480.07-100q-78.22 0-147.4-29.92t-120.99-81.71q-51.81-51.79-81.75-120.94Q100-401.71 100-479.93q0-78.84 29.92-148.21t81.71-120.68q51.79-51.31 120.94-81.25Q401.71-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.22-29.92 147.4t-81.21 120.99q-51.29 51.81-120.63 81.75Q558.9-100 480.07-100Z"/></svg>
          } @else {
            <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M421-380.15 319.54-482q-7.08-6.69-16.81-6.88-9.73-.2-17.42 7.5-7.08 7.07-7.08 16.8t7.08 16.81l115.46 116.08q8.61 9 20.23 9 11.62 0 20.23-9l232.08-231.7q7.3-7.69 7.5-17.42.19-9.73-7.5-17.42-7.7-7.08-17.73-6.77-10.04.31-17.12 7.39L421-380.15ZM480.07-100q-78.22 0-147.4-29.92t-120.99-81.71q-51.81-51.79-81.75-120.94Q100-401.71 100-479.93q0-78.84 29.92-148.21t81.71-120.68q51.79-51.31 120.94-81.25Q401.71-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.22-29.92 147.4t-81.21 120.99q-51.29 51.81-120.63 81.75Q558.9-100 480.07-100Zm-.07-45.39q139.69 0 237.15-97.76 97.46-97.77 97.46-236.85 0-139.69-97.46-237.15-97.46-97.46-237.15-97.46-139.08 0-236.85 97.46-97.76 97.46-97.76 237.15 0 139.08 97.76 236.85 97.77 97.76 236.85 97.76ZM480-480Z"/></svg>
          }
        }
        {{ label }}
        @if (trailingIcon) {
          <svg data-icon="inline-end" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M693.69-457.31h-491q-9.91 0-16.3-6.39-6.39-6.39-6.39-16.31 0-9.91 6.39-16.3 6.39-6.38 16.3-6.38h491L464-732q-6.31-6.76-6.69-15.84-.39-9.08 6.69-15.99 7.08-7.25 16-7.25t16 7.08l263.85 263.85q4.53 4.53 6.73 9.39 2.19 4.86 2.19 10.81t-2.19 10.76q-2.2 4.81-6.73 9.34L496-196q-6.69 6.69-15.73 6.88-9.04.2-16.27-6.88-7.08-7.23-7.08-16.08 0-8.84 7.08-15.54l229.69-229.69Z"/></svg>
        }
      </span>
    `,
  }),
};

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Playground: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', label: 'Secondary' } };
export const Destructive: Story = { args: { variant: 'destructive', label: 'Error' } };
export const Warning: Story = { args: { variant: 'warning', label: 'Warning' } };
export const Success: Story = { args: { variant: 'success', label: 'Success' } };
export const Info: Story = { args: { variant: 'info', label: 'Info' } };
export const Outline: Story = { args: { variant: 'outline', label: 'Outline' } };
export const Ghost: Story = { args: { variant: 'ghost', label: 'Ghost' } };
export const Link: Story = { args: { variant: 'link', label: 'Link' } };

/**
 * Icons are **projected** as inline Material Symbols `<svg>` children — there's
 * no icon input (parity with the registry, which is children-based). Import the
 * glyph from `@material-symbols/svg-400/rounded/<name>.svg?raw` and tag the svg
 * with `data-icon="inline-start"` (leading) or `data-icon="inline-end"`
 * (trailing): the cva adds the side padding and sizes the svg to 14px in
 * `currentColor` (so it inherits the variant's text colour). Mark decorative
 * icons `aria-hidden="true"`. Mirrors the Figma badge (leading check + trailing
 * arrow).
 */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <span uiBadge variant="success">
          <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M421-380.15 319.54-482q-7.08-6.69-16.81-6.88-9.73-.2-17.42 7.5-7.08 7.07-7.08 16.8t7.08 16.81l115.46 116.08q8.61 9 20.23 9 11.62 0 20.23-9l232.08-231.7q7.3-7.69 7.5-17.42.19-9.73-7.5-17.42-7.7-7.08-17.73-6.77-10.04.31-17.12 7.39L421-380.15ZM480.07-100q-78.22 0-147.4-29.92t-120.99-81.71q-51.81-51.79-81.75-120.94Q100-401.71 100-479.93q0-78.84 29.92-148.21t81.71-120.68q51.79-51.31 120.94-81.25Q401.71-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.22-29.92 147.4t-81.21 120.99q-51.29 51.81-120.63 81.75Q558.9-100 480.07-100Zm-.07-45.39q139.69 0 237.15-97.76 97.46-97.77 97.46-236.85 0-139.69-97.46-237.15-97.46-97.46-237.15-97.46-139.08 0-236.85 97.46-97.76 97.46-97.76 237.15 0 139.08 97.76 236.85 97.77 97.76 236.85 97.76ZM480-480Z"/></svg>
          Synced
        </span>
        <span uiBadge variant="info">
          <svg data-icon="inline-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M215.38-476.62q0 60.27 22.52 107.38 22.52 47.12 62.95 83.01l40 33.69v-105.92q0-9.9 6.4-16.29 6.41-6.4 16.31-6.4 9.9 0 16.29 6.4 6.38 6.39 6.38 16.29v156.54q0 12.51-8.17 20.67-8.17 8.17-20.68 8.17H200.85q-9.9 0-16.3-6.4-6.4-6.41-6.4-16.31 0-9.9 6.4-16.29 6.4-6.38 16.3-6.38h108.84l-28.46-26.23q-57.84-49.46-84.54-106.66Q170-408.54 170-476.62q0-90.24 47.58-165.39 47.57-75.14 127.5-114.76 8.3-3.84 16.33-.61 8.03 3.23 11.36 11.49 3.84 8.25-.14 17.24-3.99 8.99-12.78 13.65-65.93 34.77-105.2 98.71-39.27 63.94-39.27 139.67Zm529.24-6.76q0-49.11-22.52-98.65-22.52-49.55-61.33-88.28l-39.39-37.15v105.92q0 9.9-6.4 16.29-6.41 6.4-16.31 6.4-9.9 0-16.28-6.4-6.39-6.39-6.39-16.29v-156.54q0-12.51 8.17-20.67 8.17-8.17 20.68-8.17h156.53q9.9 0 16.3 6.4 6.4 6.41 6.4 16.31 0 9.9-6.4 16.29-6.4 6.38-16.3 6.38H651.92L680-713.69q55.32 52.47 82.66 112.85Q790-540.46 790-483.32q0 89.47-46.27 163.67-46.27 74.19-124.58 115.42-8.69 4.46-17.88 1.88-9.19-2.57-13.04-11.71-3.84-8.32.19-17.4 4.04-9.08 12.35-13.54 66.54-33.77 105.19-98.21 38.66-64.44 38.66-140.17Z"/></svg>
          Syncing
        </span>
        <a uiBadge variant="link" href="#">
          Open version
          <svg data-icon="inline-end" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M693.69-457.31h-491q-9.91 0-16.3-6.39-6.39-6.39-6.39-16.31 0-9.91 6.39-16.3 6.39-6.38 16.3-6.38h491L464-732q-6.31-6.76-6.69-15.84-.39-9.08 6.69-15.99 7.08-7.25 16-7.25t16 7.08l263.85 263.85q4.53 4.53 6.73 9.39 2.19 4.86 2.19 10.81t-2.19 10.76q-2.2 4.81-6.73 9.34L496-196q-6.69 6.69-15.73 6.88-9.04.2-16.27-6.88-7.08-7.23-7.08-16.08 0-8.84 7.08-15.54l229.69-229.69Z"/></svg>
        </a>
      </div>
    `,
  }),
};

/**
 * Number / count badge (the Figma "Badge Number" component, node 17100:10130):
 * the content is a bare count, not an icon. Colour alone doesn't reach a screen
 * reader, so pass `srLabel` — it prepends a visually-hidden prefix ("Errors: 3").
 */
export const NumberBadge: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <span uiBadge variant="success" srLabel="Synced versions:">42</span>
        <span uiBadge variant="destructive" srLabel="Errors:">3</span>
      </div>
    `,
  }),
};

/**
 * Solid (strong) status badges — the spec's `strong` style. Maximum visual
 * weight; use sparingly for max-attention statuses (a critical/overdue count,
 * an "action required" flag). The default tinted status badges cover ambient
 * labelling. `warning-solid` uses BLACK text (orange-500 fails AA with white);
 * toggle dark-theme to confirm both ramps stay readable.
 */
export const SolidStatus: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <span uiBadge variant="success-solid">Deployed</span>
        <span uiBadge variant="warning-solid">Expiring</span>
        <span uiBadge variant="info-solid">Beta</span>
        <span uiBadge variant="error-solid">Failed</span>
        <span uiBadge variant="default">Brand</span>
      </div>
    `,
  }),
};

/** Gallery of every variant — handy for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <span uiBadge variant="default">Default</span>
        <span uiBadge variant="secondary">Secondary</span>
        <span uiBadge variant="destructive">Destructive</span>
        <span uiBadge variant="warning">Warning</span>
        <span uiBadge variant="success">Success</span>
        <span uiBadge variant="info">Info</span>
        <span uiBadge variant="success-solid">Success solid</span>
        <span uiBadge variant="warning-solid">Warning solid</span>
        <span uiBadge variant="info-solid">Info solid</span>
        <span uiBadge variant="error-solid">Error solid</span>
        <span uiBadge variant="outline">Outline</span>
        <span uiBadge variant="ghost">Ghost</span>
        <span uiBadge variant="link">Link</span>
      </div>
    `,
  }),
};
