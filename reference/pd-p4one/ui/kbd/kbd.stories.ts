import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Kbd, KbdGroup, type KbdVariant } from './';

const VARIANTS: KbdVariant[] = ['default', 'primary'];

interface KbdStoryArgs {
  variant: KbdVariant;
  keys: string;
  leadingIcon: boolean;
}

/**
 * `[uiKbd]` / `[uiKbdGroup]` are the Angular port of the Force UI keyboard-key
 * components. `[uiKbd]` decorates a native `<kbd>` as a shortcut pill;
 * `[uiKbdGroup]` lays out several keys in a row.
 *
 *   <kbd uiKbd>Ctrl</kbd>
 *   <kbd uiKbd variant="primary">⌘</kbd>
 *   <span uiKbdGroup><kbd uiKbd>⌘</kbd><kbd uiKbd>K</kbd></span>
 *
 * `default` is the muted pill for light surfaces; `primary` is the translucent
 * pill for placement on a solid/brand surface (inside a primary button, on a
 * tooltip). Inside a button they label a shortcut.
 */
const meta: Meta<KbdStoryArgs> = {
  title: 'UI/Kbd',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Kbd, KbdGroup] })],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: VARIANTS,
      description: 'default = muted (light surface); primary = translucent (on a solid/brand surface)',
    },
    keys: { control: 'text', description: 'Key label projected into the <kbd>' },
    leadingIcon: { control: 'boolean', description: 'Show a Material Symbols glyph before the key' },
  },
  args: { variant: 'default', keys: 'Ctrl', leadingIcon: false },
  render: (args) => ({
    props: args,
    template: `
      <kbd uiKbd [variant]="variant">
        @if (leadingIcon) {
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M252.59-130q-50.82 0-86.7-35.99Q130-201.97 130-252.79q0-50.83 35.96-86.71 35.95-35.88 86.73-35.88H330v-209.24h-77.31q-50.78 0-86.73-35.98Q130-656.59 130-707.41t35.99-86.7Q201.97-830 252.79-830q50.83 0 86.71 35.96 35.88 35.95 35.88 86.73V-630h209.24v-77.31q0-50.78 35.98-86.73Q656.59-830 707.41-830t86.7 35.99Q830-758.03 830-707.21q0 50.83-35.96 86.71-35.95 35.88-86.73 35.88H630v209.24h77.31q50.78 0 86.73 35.98Q830-303.41 830-252.59t-35.99 86.7Q758.03-130 707.21-130q-50.83 0-86.71-35.96-35.88-35.95-35.88-86.73V-330H375.38v77.31q0 50.78-35.98 86.73Q303.41-130 252.59-130Zm-.02-45.38q32.2 0 54.82-22.54Q330-220.45 330-252.69V-330h-77.31q-32.24 0-54.77 22.5-22.54 22.5-22.54 54.69t22.5 54.81q22.5 22.62 54.69 22.62Zm454.62 0q32.19 0 54.81-22.5 22.62-22.5 22.62-54.69 0-32.2-22.54-54.82Q739.55-330 707.31-330H630v77.31q0 32.24 22.5 54.77 22.5 22.54 54.69 22.54Zm-331.81-200h209.24v-209.24H375.38v209.24ZM252.69-630H330v-77.31q0-32.24-22.5-54.77-22.5-22.54-54.69-22.54T198-762.12q-22.62 22.5-22.62 54.69 0 32.2 22.54 54.82Q220.45-630 252.69-630ZM630-630h77.31q32.24 0 54.77-22.5 22.54-22.5 22.54-54.69T762.12-762q-22.5-22.62-54.69-22.62-32.2 0-54.82 22.54Q630-739.55 630-707.31V-630Z"/></svg>
        }
        {{ keys }}
      </kbd>
    `,
  }),
};

export default meta;
type Story = StoryObj<KbdStoryArgs>;

export const Playground: Story = {};

/** The translucent variant, shown on an indigo (primary) surface. */
export const Primary: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="bg-primary inline-flex items-center gap-2 rounded-lg p-4">
        <kbd uiKbd variant="primary">⌘</kbd>
        <kbd uiKbd variant="primary">K</kbd>
      </div>
    `,
  }),
};

/** Several keys laid out in a group. */
export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <span uiKbdGroup>
          <kbd uiKbd>⌘</kbd>
          <kbd uiKbd>K</kbd>
        </span>
        <span uiKbdGroup>
          <kbd uiKbd>Ctrl</kbd>
          <kbd uiKbd>Shift</kbd>
          <kbd uiKbd>P</kbd>
        </span>
        <kbd uiKbd>
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M457.31-693.69 228-464q-6.76 6.31-15.84 6.69-9.08.39-15.99-6.69-7.25-7.08-7.25-16t7.08-16l263.85-263.85q4.53-4.53 9.39-6.73 4.86-2.19 10.81-2.19t10.76 2.19q4.81 2.2 9.34 6.73L764-496q6.69 6.69 6.88 15.73.2 9.04-6.88 16.27-7.23 7.08-16.08 7.08-8.84 0-15.54-7.08L502.69-693.69v491q0 9.91-6.39 16.3-6.39 6.39-16.31 6.39-9.91 0-16.3-6.39-6.38-6.39-6.38-16.3v-491Z"/></svg>
        </kbd>
      </div>
    `,
  }),
};
