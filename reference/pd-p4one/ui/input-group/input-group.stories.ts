import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupText,
  InputGroupButton,
  type InputGroupVariant,
} from './';
import { Label } from '../label';

const VARIANTS: InputGroupVariant[] = ['outline', 'filled', 'underline', 'ghost'];

// Inline Material Symbols `<svg>` markup (from @material-symbols/svg-400), spliced
// into the story templates below. Defining them once and interpolating with `${}`
// keeps the templates readable and renders a real direct-child `<svg>` (which the
// addon cva sizes + colours), exactly as a consumer would project the icon.
const ICON_SEARCH = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M379.15-342.08q-101.78 0-172.39-70.57-70.6-70.58-70.6-171 0-100.43 70.57-171 70.58-70.58 171.22-70.58t171.19 70.58q70.55 70.57 70.55 171.01 0 42.02-14.38 81.83-14.39 39.81-41.62 72.12l243.54 241.92q6.69 6.25 6.88 16.39.2 10.15-6.88 17.03-7.08 6.89-17.03 6.89-9.95 0-16.58-7.08L531.08-397.08q-29.85 26.42-69.61 40.71t-82.32 14.29Zm-.61-45.38q81.95 0 138.86-57.12 56.91-57.11 56.91-139.07 0-81.97-56.91-139.08-56.91-57.12-138.86-57.12-82.47 0-139.74 57.12-57.26 57.11-57.26 139.08 0 81.96 57.26 139.07 57.27 57.12 139.74 57.12Z"/></svg>';
const ICON_CLOSE = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-448 266.92-234.92q-6.69 6.69-15.8 6.88-9.12.19-16.2-6.88-7.07-7.08-7.07-16 0-8.93 7.07-16L448-480 234.92-693.08q-6.69-6.69-6.88-15.8-.19-9.12 6.88-16.2 7.08-7.07 16-7.07 8.93 0 16 7.07L480-512l213.08-213.08q6.69-6.69 15.8-6.88 9.12-.19 16.2 6.88 7.07 7.08 7.07 16 0 8.93-7.07 16L512-480l213.08 213.08q6.69 6.69 6.88 15.8.19 9.12-6.88 16.2-7.08 7.07-16 7.07-8.93 0-16-7.07L480-448Z"/></svg>';
const ICON_CHEVRON_DOWN = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M469.19-371.46q-4.81-2-9.42-6.62L269.85-568q-6.7-6.69-6.58-16.12.12-9.42 7.19-16.49 7.08-7.08 16.31-7.08 9.23 0 16.31 7.08L480-423.08l177.54-177.53q6.69-6.7 15.81-6.58 9.11.11 16.19 7.19 7.07 7.08 7.07 16.31 0 9.23-7.07 16.3L500.23-378.08q-4.61 4.62-9.42 6.62t-10.81 2q-6 0-10.81-2Z"/></svg>';
const ICON_MAIL = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M157.69-180q-23.53 0-40.61-17.08T100-237.69v-484.62q0-23.53 17.08-40.61T157.69-780h644.62q23.53 0 40.61 17.08T860-722.31v484.62q0 23.53-17.08 40.61T802.31-180H157.69Zm656.92-515.39L496-484.54q-4 2-7.69 3.5-3.69 1.5-8.31 1.5-4.62 0-8.31-1.5-3.69-1.5-7.31-3.5L145.39-695.39v457.7q0 5.38 3.46 8.84t8.84 3.46h644.62q5.38 0 8.84-3.46t3.46-8.84v-457.7ZM480-521.62l325.61-212.99H155.39L480-521.62ZM145.39-695.39v7.39-31.41 1-16.2 15.69-1.3V-688v-7.39 470-470Z"/></svg>';
const ICON_LOCK = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M237.69-100q-23.59 0-40.64-17.05T180-157.69v-400.15q0-23.9 17.05-40.8t40.64-16.9h69.62v-91.77q0-71.89 50.44-122.29Q408.19-880 480.13-880q71.95 0 122.25 50.4 50.31 50.4 50.31 122.29v91.77h69.62q23.59 0 40.64 16.9t17.05 40.8v400.15q0 23.59-17.05 40.64T722.31-100H237.69Zm0-45.39h484.62q5.38 0 8.84-3.46t3.46-8.84v-400.15q0-5.39-3.46-8.85t-8.84-3.46H237.69q-5.38 0-8.84 3.46t-3.46 8.85v400.15q0 5.38 3.46 8.84t8.84 3.46Zm290.27-164.14q19.81-19.53 19.81-47.01 0-26.54-19.98-47.77-19.97-21.23-47.96-21.23-27.98 0-47.79 21.23t-19.81 48.27q0 27.04 19.98 46.54 19.97 19.5 47.96 19.5 27.98 0 47.79-19.53ZM352.69-615.54h254.62v-91.77q0-53.04-37.09-90.17t-90.08-37.13q-52.99 0-90.22 37.13t-37.23 90.17v91.77Zm-127.3 470.15v-424.76 424.76Z"/></svg>';
const ICON_LABEL = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M157.69-180q-23.5 0-40.59-17.1-17.1-17.09-17.1-40.59v-484.62q0-23.5 17.1-40.59 17.09-17.1 40.59-17.1h446.77q13.96 0 26.04 5.84 12.08 5.84 20.42 17.01l183.46 242.3q12 15.3 12 34.69 0 19.39-12 35.01l-182.84 242.3q-8.35 11.17-20.23 17.01-11.89 5.84-25.85 5.84H157.69Zm0-45.39h446.77q3.08 0 5.77-1.15 2.69-1.15 4.23-3.46l183.85-242.31Q801-475.77 801-480t-2.69-7.69L614.46-730q-1.54-2.31-4.23-3.46-2.69-1.15-5.77-1.15H157.69q-5.38 0-8.84 3.46t-3.46 8.84v484.62q0 5.38 3.46 8.84t8.84 3.46ZM473.38-480Z"/></svg>';
const ICON_ERROR = '<svg aria-hidden="true" class="text-destructive" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M499.46-298.52q7.77-7.75 7.77-19.46t-7.75-19.48q-7.75-7.77-19.46-7.77t-19.48 7.75q-7.77 7.75-7.77 19.46t7.75 19.48q7.75 7.77 19.46 7.77t19.48-7.75Zm-.92-139.85q6.38-6.51 6.38-16.17v-204.15q0-9.66-6.57-16.18-6.57-6.51-16.31-6.51-9.73 0-16.12 6.51-6.38 6.52-6.38 16.18v204.15q0 9.66 6.57 16.17 6.58 6.52 16.31 6.52 9.73 0 16.12-6.52ZM480.33-100q-78.95 0-147.89-29.92-68.95-29.92-120.76-81.71-51.81-51.79-81.75-120.78Q100-401.39 100-480.43q0-78.66 29.92-147.87 29.92-69.21 81.71-120.52 51.79-51.31 120.78-81.25Q401.39-860 480.43-860q78.66 0 147.87 29.92 69.21 29.92 120.52 81.21 51.31 51.29 81.25 120.63Q860-558.9 860-480.33q0 78.95-29.92 147.89-29.92 68.95-81.21 120.57-51.29 51.63-120.63 81.75Q558.9-100 480.33-100Zm.17-45.39q139.19 0 236.65-97.76 97.46-97.77 97.46-237.35 0-139.19-97.27-236.65-97.27-97.46-237.34-97.46-139.08 0-236.85 97.27-97.76 97.27-97.76 237.34 0 139.08 97.76 236.85 97.77 97.76 237.35 97.76ZM480-480Z"/></svg>';

interface IGArgs {
  variant: InputGroupVariant;
  placeholder: string;
  value: string;
  leadingIcon: boolean;
  trailingClear: boolean;
  disabled: boolean;
  invalid: boolean;
}

/**
 * `[uiInputGroup]` composes a borderless `input[uiInputGroupInput]` with one or
 * more `[uiInputGroupAddon]` slots (icons, buttons, text, kbd) into a single
 * field. The group owns the chrome (border / focus ring / invalid / disabled);
 * the inner input is stripped of its own box. This is how you put a leading
 * search/email icon, a trailing reveal button, a chevron, or a prefix/suffix
 * label "inside" an input — a native `<input>` can't hold children, the group
 * wrapper can.
 *
 * `variant` (mirrors `input`): outline (default) / filled / underline / ghost.
 * Addon `align`: `inline-start`/`inline-end` (left/right of the field),
 * `block-start`/`block-end` (stacked above/below, e.g. a helper or counter row).
 * Border tier matches the standalone input (light resting -> hover -> focus ring).
 */
const meta: Meta<IGArgs> = {
  title: 'UI/InputGroup',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        InputGroup,
        InputGroupAddon,
        InputGroupInput,
        InputGroupTextarea,
        InputGroupText,
        InputGroupButton,
        Label,
        CommonModule,
      ],
    }),
  ],
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'Fill treatment (mirrors input): outline/filled/underline/ghost.' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    leadingIcon: { control: 'boolean', description: 'Show a leading search icon addon.' },
    trailingClear: { control: 'boolean', description: 'Show a trailing clear button addon.' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean', description: 'aria-invalid on the inner control — drives the group red chrome.' },
  },
  args: {
    variant: 'outline',
    placeholder: 'Search files and versions',
    value: '',
    leadingIcon: true,
    trailingClear: false,
    disabled: false,
    invalid: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div uiInputGroup [variant]="variant" class="w-80">
        <div uiInputGroupAddon *ngIf="leadingIcon">${ICON_SEARCH}</div>
        <input uiInputGroupInput [placeholder]="placeholder" [value]="value" [disabled]="disabled" [attr.aria-invalid]="invalid ? 'true' : null" aria-label="Input group demo field" />
        <div uiInputGroupAddon align="inline-end" *ngIf="trailingClear">
          <button uiInputGroupButton size="icon-xs" aria-label="Clear">${ICON_CLOSE}</button>
        </div>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<IGArgs>;

/** Full control set — variant, placeholder/value, icon toggles, states. */
export const Playground: Story = {};

/** Every fill variant (leading search icon, with value). Toggle dark-theme to check both ramps. */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="grid grid-cols-[88px_1fr] items-center gap-x-4 gap-y-3 w-[420px]">
        <span class="text-sm font-medium text-foreground">outline</span>
        <div uiInputGroup variant="outline"><div uiInputGroupAddon>${ICON_SEARCH}</div><input uiInputGroupInput value="Blockout pass 2" aria-label="outline variant" /></div>
        <span class="text-sm font-medium text-foreground">filled</span>
        <div uiInputGroup variant="filled"><div uiInputGroupAddon>${ICON_SEARCH}</div><input uiInputGroupInput value="Blockout pass 2" aria-label="filled variant" /></div>
        <span class="text-sm font-medium text-foreground">underline</span>
        <div uiInputGroup variant="underline"><div uiInputGroupAddon>${ICON_SEARCH}</div><input uiInputGroupInput value="Blockout pass 2" aria-label="underline variant" /></div>
        <span class="text-sm font-medium text-foreground">ghost</span>
        <div uiInputGroup variant="ghost"><div uiInputGroupAddon>${ICON_SEARCH}</div><input uiInputGroupInput value="Blockout pass 2" aria-label="ghost variant" /></div>
      </div>
    `,
  }),
};

/** Leading icon — the canonical search field. */
export const LeadingIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputGroup class="w-72">
        <div uiInputGroupAddon>${ICON_SEARCH}</div>
        <input uiInputGroupInput placeholder="Search files and versions" aria-label="Search files and versions" />
      </div>
    `,
  }),
};

/** Trailing icon (e.g. a dropdown chevron). */
export const TrailingIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputGroup class="w-72">
        <input uiInputGroupInput placeholder="Choose an experiment" aria-label="Choose an experiment" />
        <div uiInputGroupAddon align="inline-end">${ICON_CHEVRON_DOWN}</div>
      </div>
    `,
  }),
};

/** Leading + trailing — email with a clear button. */
export const LeadingAndTrailing: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputGroup class="w-80">
        <div uiInputGroupAddon>${ICON_MAIL}</div>
        <input uiInputGroupInput type="email" value="teammate@studio.com" aria-label="Email address" />
        <div uiInputGroupAddon align="inline-end">
          <button uiInputGroupButton size="icon-xs" aria-label="Clear">${ICON_CLOSE}</button>
        </div>
      </div>
    `,
  }),
};

/** Trailing action button — password reveal. */
export const PasswordReveal: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputGroup class="w-72">
        <div uiInputGroupAddon>${ICON_LOCK}</div>
        <input uiInputGroupInput type="password" value="my-password" aria-label="Password" />
        <div uiInputGroupAddon align="inline-end">
          <button uiInputGroupButton size="xs">Show</button>
        </div>
      </div>
    `,
  }),
};

/** Text prefix / suffix — a server-style path. */
export const TextAffix: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputGroup class="w-80">
        <div uiInputGroupAddon><span uiInputGroupText>p4://</span></div>
        <input uiInputGroupInput placeholder="scene-name" aria-label="Scene name" />
        <div uiInputGroupAddon align="inline-end"><span uiInputGroupText>/main</span></div>
      </div>
    `,
  }),
};

/** Block-end addon — a helper/counter row stacked under the field. */
export const BlockEndAddon: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputGroup class="w-80">
        <input uiInputGroupInput placeholder="Describe this version" aria-label="Version description" />
        <div uiInputGroupAddon align="block-end">
          <span uiInputGroupText>Shown in the version history</span>
        </div>
      </div>
    `,
  }),
};

/**
 * Multi-line — `textarea[uiInputGroupTextarea]` with a block-end counter/action
 * row (the input-group Figma textarea scenario). The group grows to fit.
 */
export const Textarea: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiInputGroup class="w-80">
        <textarea uiInputGroupTextarea rows="3" placeholder="Describe this version" aria-label="Version description"></textarea>
        <div uiInputGroupAddon align="block-end" class="justify-between">
          <span uiInputGroupText>146 / 280 characters</span>
          <button uiInputGroupButton variant="default" size="xs">Post</button>
        </div>
      </div>
    `,
  }),
};

/**
 * Correct-by-default labelling — copy this. The group isn't a labelable
 * element, so the `<label for>` points at the inner control's id. The error
 * field links its message via `aria-describedby` (non-colour signal, announced).
 */
export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6 w-72">
        <div class="flex flex-col gap-1.5">
          <label uiLabel for="ig-search">Search</label>
          <div uiInputGroup>
            <div uiInputGroupAddon>${ICON_SEARCH}</div>
            <input uiInputGroupInput id="ig-search" placeholder="Search files and versions" />
          </div>
          <p class="text-sm text-muted-foreground">Searches the current workspace.</p>
        </div>

        <div class="flex flex-col gap-1.5">
          <label uiLabel for="ig-name">Experiment name</label>
          <div uiInputGroup>
            <div uiInputGroupAddon>${ICON_LABEL}</div>
            <input uiInputGroupInput id="ig-name" value="lighting test" aria-invalid="true" aria-describedby="ig-name-err" />
          </div>
          <p id="ig-name-err" class="text-sm text-destructive">Spaces are not allowed. Try lighting-test instead.</p>
        </div>
      </div>
    `,
  }),
};

/** Invalid + disabled — the chrome reacts on the group. */
export const StatesGallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 w-80">
        <div uiInputGroup>
          <div uiInputGroupAddon>${ICON_SEARCH}</div>
          <input uiInputGroupInput value="lighting test" aria-invalid="true" aria-label="invalid field" />
          <div uiInputGroupAddon align="inline-end">${ICON_ERROR}</div>
        </div>
        <div uiInputGroup>
          <div uiInputGroupAddon>${ICON_LOCK}</div>
          <input uiInputGroupInput value="locked" disabled aria-label="disabled field" />
        </div>
      </div>
    `,
  }),
};
