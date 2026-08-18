import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRootDirective,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectValueDirective,
} from './';

const SELECT_IMPORTS = [
  CommonModule,
  Select,
  SelectRootDirective,
  SelectTrigger,
  SelectValue,
  SelectValueDirective,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
];

interface SelectStoryArgs {
  value: string;
  placeholder: string;
  size: 'default' | 'sm';
  disabled: boolean;
  invalid: boolean;
  matchTriggerWidth: boolean;
}

/**
 * `[rdxSelect]` and its parts are the Angular port of the Force UI
 * (radix-force-ui) select. The root is an attribute selector on any container
 * (radix-ng `RdxSelectComponent` — owns the dropdown overlay); the trigger is a
 * native `<button>` (`role="combobox"`, `aria-expanded`), the panel is
 * `role="listbox"`, and each item is `role="option"` with `aria-selected`. Arrow
 * keys move an active-descendant highlight; type-ahead jumps to a matching item.
 *
 * Reach for a select when the user picks ONE value from a longer list that isn't
 * worth showing inline. For a short, always-visible set use a radio group; for
 * on/off use a switch.
 *
 * Labelling: give the trigger an accessible name — a visible `[uiLabel]` tied by
 * `aria-labelledby`, or an `aria-label`. The placeholder is not a label. Write
 * options in artist language, sentence case ("Final render", not "FINAL_RENDER").
 *
 * Selection API mirrors React shadcn: `[value]` in, `(onValueChange)` out (there
 * is no `valueChange`, so no `[(value)]` shorthand). `matchTriggerWidth` sizes
 * the panel to the trigger.
 */
const meta: Meta<SelectStoryArgs> = {
  title: 'UI/Select',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: SELECT_IMPORTS })],
  argTypes: {
    value: {
      control: 'select',
      options: ['', 'draft', 'preview', 'final'],
      description: 'Selected item value (`[value]` in; `(onValueChange)` out).',
    },
    placeholder: {
      control: 'text',
      description: 'Shown on the trigger when nothing is selected. Not a label.',
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'sm'],
      description: 'Trigger height axis (`data-size`).',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the whole control and drops it from the tab order.',
    },
    invalid: {
      control: 'boolean',
      description:
        'Sets `aria-invalid="true"` on the trigger: destructive border + halo. Pair with a FieldError message.',
    },
    matchTriggerWidth: {
      control: 'boolean',
      description: 'Sizes the dropdown panel to the trigger width.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    value: '',
    placeholder: 'Select export quality',
    size: 'default',
    disabled: false,
    invalid: false,
    matchTriggerWidth: true,
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <div
        rdxSelect
        [value]="value"
        (onValueChange)="value = $event"
        [disabled]="disabled"
        [matchTriggerWidth]="matchTriggerWidth"
      >
        <button rdxSelectTrigger [size]="size" [attr.aria-invalid]="invalid ? 'true' : null" class="w-56">
          <span rdxSelectValue [placeholder]="placeholder"></span>
        </button>
        <div rdxSelectContent>
          <button rdxSelectItem value="draft">Draft</button>
          <button rdxSelectItem value="preview">Preview</button>
          <button rdxSelectItem value="final">Final render</button>
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<SelectStoryArgs>;

export const Playground: Story = {};

/**
 * Grouped options with a heading and a separator — the canonical settings
 * composition for a longer list.
 */
export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxSelect defaultValue="unreal" [matchTriggerWidth]="true">
        <button rdxSelectTrigger class="w-56">
          <span rdxSelectValue placeholder="Select an app"></span>
        </button>
        <div rdxSelectContent>
          <div rdxSelectGroup>
            <div rdxSelectLabel>Game engines</div>
            <button rdxSelectItem value="unreal">Unreal Engine</button>
            <button rdxSelectItem value="unity">Unity</button>
          </div>
          <div rdxSelectSeparator></div>
          <div rdxSelectGroup>
            <div rdxSelectLabel>Content creation tools</div>
            <button rdxSelectItem value="blender">Blender</button>
            <button rdxSelectItem value="maya">Maya</button>
            <button rdxSelectItem value="substance">Substance Painter</button>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * With a visible label tied to the trigger by `aria-labelledby` — the pattern to
 * prefer over a bare placeholder.
 */
export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-1.5 w-56">
        <label id="select-engine-label" class="text-sm font-medium">Target engine</label>
        <div rdxSelect defaultValue="" [matchTriggerWidth]="true">
          <button rdxSelectTrigger aria-labelledby="select-engine-label" class="w-full">
            <span rdxSelectValue placeholder="Select an engine"></span>
          </button>
          <div rdxSelectContent>
            <button rdxSelectItem value="unreal">Unreal Engine</button>
            <button rdxSelectItem value="unity">Unity</button>
            <button rdxSelectItem value="godot">Godot</button>
          </div>
        </div>
      </div>
    `,
  }),
};

/** Small trigger (`size="sm"`) for dense toolbars, beside the default height. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex items-center gap-4">
        <div rdxSelect defaultValue="final" [matchTriggerWidth]="true">
          <button rdxSelectTrigger size="sm" class="w-40">
            <span rdxSelectValue placeholder="Select quality"></span>
          </button>
          <div rdxSelectContent>
            <button rdxSelectItem value="draft">Draft</button>
            <button rdxSelectItem value="final">Final render</button>
          </div>
        </div>
        <div rdxSelect defaultValue="final" [matchTriggerWidth]="true">
          <button rdxSelectTrigger class="w-40">
            <span rdxSelectValue placeholder="Select quality"></span>
          </button>
          <div rdxSelectContent>
            <button rdxSelectItem value="draft">Draft</button>
            <button rdxSelectItem value="final">Final render</button>
          </div>
        </div>
      </div>
    `,
  }),
};

/** A disabled item alongside selectable ones. */
export const DisabledItem: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxSelect defaultValue="local" [matchTriggerWidth]="true">
        <button rdxSelectTrigger class="w-56">
          <span rdxSelectValue placeholder="Where to save"></span>
        </button>
        <div rdxSelectContent>
          <button rdxSelectItem value="local">This computer</button>
          <button rdxSelectItem value="server">Shared server</button>
          <button rdxSelectItem value="cloud" disabled>Cloud archive (not set up)</button>
        </div>
      </div>
    `,
  }),
};

/**
 * Invalid state: `aria-invalid="true"` gives the trigger the destructive border +
 * halo. The reason is tied via `aria-describedby` to a FieldError so it's
 * announced and never colour-alone (WCAG 3.3.1 / 1.4.1).
 */
export const Invalid: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-1.5 w-56">
        <label id="select-quality-label" class="text-sm font-medium">Export quality</label>
        <div rdxSelect defaultValue="" [matchTriggerWidth]="true">
          <button
            rdxSelectTrigger
            aria-labelledby="select-quality-label"
            aria-invalid="true"
            aria-describedby="select-quality-error"
            class="w-full"
          >
            <span rdxSelectValue placeholder="Select export quality"></span>
          </button>
          <div rdxSelectContent>
            <button rdxSelectItem value="draft">Draft</button>
            <button rdxSelectItem value="final">Final render</button>
          </div>
        </div>
        <p id="select-quality-error" class="text-xs text-destructive">
          No export quality selected. Choose one to continue your export.
        </p>
      </div>
    `,
  }),
};

/**
 * Long option list — the panel caps at `max-h-[18rem]` and scrolls (the floor
 * after which a Combobox with search is the better control, per the spec). Native
 * overflow scroll; the registry's scroll-up/down buttons have no radix-ng backing.
 */
export const Scrollable: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div rdxSelect defaultValue="usd" [matchTriggerWidth]="true">
        <button rdxSelectTrigger class="w-56">
          <span rdxSelectValue placeholder="Select a format"></span>
        </button>
        <div rdxSelectContent>
          <div rdxSelectGroup>
            <div rdxSelectLabel>3D scene</div>
            <button rdxSelectItem value="usd">USD</button>
            <button rdxSelectItem value="usdz">USDZ</button>
            <button rdxSelectItem value="fbx">FBX</button>
            <button rdxSelectItem value="abc">Alembic</button>
            <button rdxSelectItem value="gltf">glTF</button>
            <button rdxSelectItem value="obj">OBJ</button>
            <button rdxSelectItem value="blend">Blender</button>
          </div>
          <div rdxSelectSeparator></div>
          <div rdxSelectGroup>
            <div rdxSelectLabel>Image</div>
            <button rdxSelectItem value="exr">OpenEXR</button>
            <button rdxSelectItem value="png">PNG</button>
            <button rdxSelectItem value="tiff">TIFF</button>
            <button rdxSelectItem value="jpg">JPEG</button>
            <button rdxSelectItem value="tga">Targa</button>
            <button rdxSelectItem value="hdr">Radiance HDR</button>
            <button rdxSelectItem value="psd">Photoshop</button>
          </div>
        </div>
      </div>
    `,
  }),
};

/** Disabled, default, and small triggers side by side for review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-5">
        <div class="flex items-center gap-4">
          <div rdxSelect defaultValue="preview" [matchTriggerWidth]="true">
            <button rdxSelectTrigger class="w-44"><span rdxSelectValue placeholder="Select quality"></span></button>
            <div rdxSelectContent>
              <button rdxSelectItem value="draft">Draft</button>
              <button rdxSelectItem value="preview">Preview</button>
              <button rdxSelectItem value="final">Final render</button>
            </div>
          </div>
          <div rdxSelect defaultValue="" [matchTriggerWidth]="true">
            <button rdxSelectTrigger class="w-44"><span rdxSelectValue placeholder="Select quality"></span></button>
            <div rdxSelectContent>
              <button rdxSelectItem value="draft">Draft</button>
              <button rdxSelectItem value="final">Final render</button>
            </div>
          </div>
          <div rdxSelect defaultValue="draft" disabled [matchTriggerWidth]="true">
            <button rdxSelectTrigger class="w-44"><span rdxSelectValue placeholder="Select quality"></span></button>
            <div rdxSelectContent>
              <button rdxSelectItem value="draft">Draft</button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
