import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Checkbox } from '../checkbox';
import { Input } from '../input';
import { Label } from './';

interface LabelStoryArgs {
  labelText: string;
  forId: string;
  required: boolean;
  disabled: boolean;
  showIcon: boolean;
}

/**
 * `[uiLabel]` is the Angular port of the Force UI (radix-force-ui) label — a
 * leaf primitive that decorates a native `<label>` with the design-system type
 * (14px / medium / `leading-none`) and disabled styling.
 *
 * In Figma the label has no standalone component: it lives inside the Field and
 * control (Checkbox, …) components. The code registry ships it as a reusable
 * primitive, so these stories show the two ways it pairs with a control.
 *
 * Association (WCAG 1.3.1 / 4.1.2): the host stays a real `<label>`, so set
 * `for` to the control's `id` (or nest the control inside the label). A visible
 * label is mandatory — never substitute placeholder text for it.
 *
 * Disabled styling has two paths, matching where the control sits relative to
 * the label:
 * - **Label above input** (the form-layout default): wrap the field in a
 *   `class="group"` element carrying `data-disabled="true"` — the label's
 *   `group-data-[disabled=true]:*` classes dim it and drop pointer events.
 * - **Label after an inline control** (checkbox / switch): the control carries
 *   the `peer` class, so the label's `peer-disabled:*` classes react to the
 *   control's native `disabled` directly — no wrapper needed.
 *
 * Required fields: append an asterisk in `text-destructive` immediately after
 * the text (kept inside one inline run so the `gap-2` only separates an optional
 * leading icon), and set `aria-required="true"` on the control — never signal
 * requirement by colour alone.
 */
const meta: Meta<LabelStoryArgs> = {
  title: 'UI/Label',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [CommonModule, Label, Input, Checkbox] })],
  argTypes: {
    labelText: {
      control: 'text',
      description: 'Label text (projected content). Sentence case, artist language.',
    },
    forId: {
      control: 'text',
      description: "The `for` attribute — must match the paired control's `id` for the implicit label→control association.",
    },
    required: {
      control: 'boolean',
      description: 'Show a required asterisk (text-destructive) after the label and set `aria-required` on the input.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the field. The wrapping `group` carries `data-disabled="true"`, which the label reads via `group-data-[disabled=true]:*` to dim itself.',
    },
    showIcon: {
      control: 'boolean',
      description: 'Project a leading inline `<svg>` before the text (the label base class spaces it with `gap-2`).',
    },
  },
  args: {
    labelText: 'Version name',
    forId: 'version-name',
    required: false,
    disabled: false,
    showIcon: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="group flex flex-col gap-1 w-72" [attr.data-disabled]="disabled ? 'true' : null">
        <label uiLabel [for]="forId">
          <svg *ngIf="showIcon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-4 fill-current"><path d="M197.69-140q-23.53 0-40.61-17.08T140-197.69v-564.62q0-23.53 17.08-40.61T197.69-820h451.85q12.06 0 22.95 4.81 10.89 4.81 18.51 12.42L802.77-691q7.61 7.62 12.42 18.51t4.81 22.95v451.85q0 23.53-17.08 40.61T762.31-140H197.69Zm576.92-513.31-121.3-121.3H197.69q-5.38 0-8.84 3.46t-3.46 8.84v564.62q0 5.38 3.46 8.84t8.84 3.46h564.62q5.38 0 8.84-3.46t3.46-8.84v-455.62ZM542.35-298.73q25.88-25.65 25.88-62.34 0-36.7-25.65-62.58-25.65-25.89-62.34-25.89-36.7 0-62.59 25.65-25.88 25.65-25.88 62.35 0 36.69 25.65 62.58 25.65 25.88 62.34 25.88 36.7 0 62.59-25.65ZM279.16-582.08h269.15q12.35 0 20.6-8.43 8.24-8.43 8.24-20.41v-69.92q0-12.36-8.24-20.61-8.25-8.24-20.6-8.24H279.16q-12.36 0-20.61 8.24-8.24 8.25-8.24 20.61v69.92q0 11.98 8.24 20.41 8.25 8.43 20.61 8.43Zm-93.77-71.23v467.92-589.22 121.3Z"/></svg>
          <span>{{ labelText }}<span *ngIf="required" class="text-destructive"> *</span></span>
        </label>
        <input uiInput [id]="forId" [disabled]="disabled" [attr.aria-required]="required ? 'true' : null" placeholder="Untitled version" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<LabelStoryArgs>;

export const Playground: Story = {};

/** The form-layout default: label stacked above its input. */
export const WithInput: Story = {
  args: { labelText: 'Version name', forId: 'version-name' },
};

/** Required field — asterisk in `text-destructive`, plus `aria-required` on the input. */
export const Required: Story = {
  args: { labelText: 'Version name', forId: 'version-name-req', required: true },
};

/**
 * The label sits directly above an invalid input. The error is announced to
 * screen readers via `aria-describedby` and shown as text (`text-destructive`)
 * alongside the input's `aria-invalid` border — never colour alone (WCAG 1.4.1).
 * Error copy says what to do next, not just what is wrong.
 */
export const WithError: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-1 w-72">
        <label uiLabel for="err-name"><span>Version name<span class="text-destructive"> *</span></span></label>
        <input uiInput id="err-name" aria-required="true" aria-invalid="true" aria-describedby="err-name-msg" placeholder="Untitled version" />
        <p id="err-name-msg" class="text-xs text-destructive">Enter a name so you can find this version later.</p>
      </div>
    `,
  }),
};

/** Leading inline `<svg>` glyph, spaced from the text by the label's `gap-2`. */
export const WithIcon: Story = {
  args: { labelText: 'Version name', forId: 'version-name-icon', showIcon: true },
};

/**
 * Disabled field. The wrapping `group` carries `data-disabled="true"`; the label
 * dims and drops pointer events via `group-data-[disabled=true]:*`.
 */
export const Disabled: Story = {
  args: { labelText: 'Version name', forId: 'version-name-disabled', disabled: true },
};

/**
 * Inline control: the checkbox carries the `peer` class, so the label's
 * `peer-disabled:*` classes react to its native `disabled` with no wrapper.
 * The label MUST follow the control in DOM order — `peer-*` only matches a
 * later sibling, so a label placed before the checkbox would not dim (use the
 * `group` + `data-disabled` path for label-above-control layouts instead).
 */
export const WithCheckbox: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <button uiCheckbox id="share-enabled"></button>
          <label uiLabel for="share-enabled">Share with my team</label>
        </div>
        <div class="flex items-center gap-2">
          <button uiCheckbox id="share-disabled" disabled></button>
          <label uiLabel for="share-disabled">Share with my team</label>
        </div>
      </div>
    `,
  }),
};

/** Gallery — the common pairings side by side for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6 w-72">
        <div class="flex flex-col gap-1">
          <label uiLabel for="g-name"><span>Version name<span class="text-destructive"> *</span></span></label>
          <input uiInput id="g-name" aria-required="true" placeholder="Untitled version" />
        </div>
        <div class="flex flex-col gap-1">
          <label uiLabel for="g-desc">Description</label>
          <input uiInput id="g-desc" placeholder="What changed in this version" />
        </div>
        <div class="group flex flex-col gap-1" data-disabled="true">
          <label uiLabel for="g-locked">Project folder</label>
          <input uiInput id="g-locked" disabled placeholder="~/Art/Scenes/Hero" />
        </div>
        <div class="flex items-center gap-2">
          <button uiCheckbox id="g-share"></button>
          <label uiLabel for="g-share">Share with my team</label>
        </div>
      </div>
    `,
  }),
};
