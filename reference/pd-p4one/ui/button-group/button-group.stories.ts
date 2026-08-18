import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '../button';
import { Input } from '../input';
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, type ButtonGroupOrientation } from './';

const ORIENTATIONS: ButtonGroupOrientation[] = ['horizontal', 'vertical'];

interface ButtonGroupStoryArgs {
  orientation: ButtonGroupOrientation;
}

/**
 * `[uiButtonGroup]` is the Angular port of the Force UI (radix-force-ui)
 * button group. It is NOT a wrapper around `buttonVariants` — it's its own
 * layout `cva` that trims border/radius between adjacent children
 * (`:first-child`/`:last-child`/`:not()` selectors) so a row of buttons reads
 * as one joined control. `[uiButton]`'s own size classes already carry the
 * `in-data-[slot=button-group]:rounded-lg` counterpart, so any
 * `<button uiButton>` composes correctly without extra wiring.
 *
 * Force spec (`button.md`): a group of related actions should be a
 * `role="group"` region with an `aria-label` naming the group, since the
 * buttons' own labels don't announce that they're grouped.
 */
const meta: Meta<ButtonGroupStoryArgs> = {
  title: 'UI/ButtonGroup',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [ButtonGroup, ButtonGroupText, ButtonGroupSeparator, Button, Input] }),
  ],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ORIENTATIONS,
      description:
        'Layout axis. `horizontal` joins children left-to-right (default); `vertical` stacks them top-to-bottom.',
      table: { type: { summary: ORIENTATIONS.join(' | ') }, defaultValue: { summary: 'horizontal' } },
    },
  },
  args: {
    orientation: 'horizontal',
  },
  render: (args) => ({
    props: args,
    template: `
      <div uiButtonGroup [orientation]="orientation" aria-label="Version actions">
        <button uiButton variant="outline">Save version</button>
        <button uiButton variant="outline">Compare</button>
        <button uiButton variant="outline">Undo</button>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<ButtonGroupStoryArgs>;

export const Playground: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };

/**
 * `[uiButtonGroup]` has no colour variant of its own — it only lays children
 * out and trims their touching corners. Any `[uiButton]` `variant` works
 * inside it; swap the variant on the CHILD buttons, not the group. Matches the
 * Figma component's Variant axis (Default/Outline/Secondary), which documents
 * which button variant fills the example — not a ButtonGroup prop.
 */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-4">
        <div uiButtonGroup aria-label="Version actions (default)">
          <button uiButton variant="default">Save version</button>
          <button uiButton variant="default">Compare</button>
          <button uiButton variant="default">Undo</button>
        </div>
        <div uiButtonGroup aria-label="Version actions (outline)">
          <button uiButton variant="outline">Save version</button>
          <button uiButton variant="outline">Compare</button>
          <button uiButton variant="outline">Undo</button>
        </div>
        <div uiButtonGroup aria-label="Version actions (secondary)">
          <button uiButton variant="secondary">Save version</button>
          <button uiButton variant="secondary">Compare</button>
          <button uiButton variant="secondary">Undo</button>
        </div>
      </div>
    `,
  }),
};

/**
 * `[uiButtonGroupText]` — a static, non-interactive slot for a label or count
 * sitting between grouped buttons (e.g. a pagination readout).
 */
export const WithText: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiButtonGroup aria-label="Page navigation">
        <button uiButton variant="outline" size="icon" aria-label="Previous page">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-280 360-480l200-200 47 47-153 153 153 153-47 47Z"/></svg>
        </button>
        <div uiButtonGroupText>3 of 12</div>
        <button uiButton variant="outline" size="icon" aria-label="Next page">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M504-480 351-633l47-47 200 200-200 200-47-47 153-153Z"/></svg>
        </button>
      </div>
    `,
  }),
};

/**
 * `[uiButtonGroupSeparator]` — a vertical divider joining two logically
 * distinct actions inside one visual group (e.g. a primary action next to a
 * secondary "more options" trigger, a split-button shape).
 */
export const WithSeparator: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiButtonGroup aria-label="Submit actions">
        <button uiButton variant="outline">Submit changes</button>
        <div uiButtonGroupSeparator></div>
        <button uiButton variant="outline" size="icon" aria-label="More submit options">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-360 280-560h400L480-360Z"/></svg>
        </button>
      </div>
    `,
  }),
};

/**
 * Nested groups (e.g. a view-mode toggle group next to an unrelated action)
 * pick up extra spacing via the root's own
 * `has-[>[data-slot=button-group]]:gap-2` selector.
 */
export const Nested: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiButtonGroup aria-label="File browser toolbar">
        <div uiButtonGroup aria-label="View mode">
          <button uiButton variant="outline" size="icon" aria-label="List view">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-240v-80h640v80H160Zm0-200v-80h640v80H160Zm0-200v-80h640v80H160Z"/></svg>
          </button>
          <button uiButton variant="outline" size="icon" aria-label="Grid view">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520Z"/></svg>
          </button>
        </div>
        <button uiButton variant="outline">Get latest from server</button>
      </div>
    `,
  }),
};

/**
 * Registry-verbatim `[&>input]:flex-1` selector lets a native/`[uiInput]` field
 * share the group with buttons — the input grows to fill remaining space while
 * the buttons stay their intrinsic width, joined at whichever edge is adjacent.
 */
export const WithInput: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 w-80">
        <div uiButtonGroup aria-label="Search">
          <button uiButton variant="outline" size="icon" aria-label="Search">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M796-121 533-384q-30 26-69.96 40.5T378-329q-108.16 0-183.08-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.5T591-457l264 262-59 74ZM377-409q71 0 120.5-49.5T547-580q0-71-49.5-120.5T377-750q-71.44 0-120.72 49.5Q207-651 207-580t49.28 120.5Q305.56-409 377-409Z"/></svg>
          </button>
          <input uiInput placeholder="Search files" />
        </div>
        <div uiButtonGroup aria-label="Search with filter">
          <input uiInput placeholder="Search files" />
          <button uiButton variant="outline" size="icon" aria-label="Filter results">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-160v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
          </button>
        </div>
      </div>
    `,
  }),
};

/** Gallery of orientation, text slot, separator, and nested-group compositions. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <div uiButtonGroup aria-label="Version actions">
          <button uiButton variant="outline">Save version</button>
          <button uiButton variant="outline">Compare</button>
          <button uiButton variant="outline">Undo</button>
        </div>
        <div uiButtonGroup orientation="vertical" aria-label="Version actions (stacked)" class="w-40">
          <button uiButton variant="outline">Save version</button>
          <button uiButton variant="outline">Compare</button>
          <button uiButton variant="outline">Undo</button>
        </div>
        <div uiButtonGroup aria-label="Page navigation">
          <button uiButton variant="outline" size="icon" aria-label="Previous page">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-280 360-480l200-200 47 47-153 153 153 153-47 47Z"/></svg>
          </button>
          <div uiButtonGroupText>3 of 12</div>
          <button uiButton variant="outline" size="icon" aria-label="Next page">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M504-480 351-633l47-47 200 200-200 200-47-47 153-153Z"/></svg>
          </button>
        </div>
        <div uiButtonGroup aria-label="Submit actions">
          <button uiButton variant="outline">Submit changes</button>
          <div uiButtonGroupSeparator></div>
          <button uiButton variant="outline" size="icon" aria-label="More submit options">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-360 280-560h400L480-360Z"/></svg>
          </button>
        </div>
      </div>
    `,
  }),
};
