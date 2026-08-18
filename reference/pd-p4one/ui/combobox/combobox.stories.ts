import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from './';

const COMBOBOX_IMPORTS = [
  CommonModule,
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
];

const FRAMEWORKS = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro', 'Angular'];

const TIMEZONES = [
  {
    label: 'North America',
    items: ['Pacific (PT)', 'Mountain (MT)', 'Central (CT)', 'Eastern (ET)'],
  },
  {
    label: 'Europe',
    items: ['Western (WET)', 'Central (CET)', 'Eastern (EET)'],
  },
];

interface ComboboxStoryArgs {
  placeholder: string;
  emptyMessage: string;
  autoHighlight: boolean;
  showClear: boolean;
  showTrigger: boolean;
  disabled: boolean;
}

const meta: Meta<ComboboxStoryArgs> = {
  title: 'UI/Combobox',
  decorators: [moduleMetadata({ imports: COMBOBOX_IMPORTS })],
  // A searchable single-select picker: type to filter (collator "contains",
  // case/accent-insensitive), Arrow/Enter to choose. The full-control Playground.
  render: (args) => ({
    props: { ...args, frameworks: FRAMEWORKS },
    template: `
      <div uiCombobox class="w-72" [autoHighlight]="autoHighlight" [disabled]="disabled">
        <div
          uiComboboxInput
          [placeholder]="placeholder"
          [showClear]="showClear"
          [showTrigger]="showTrigger"
          aria-label="Framework"
        ></div>
        <ng-template uiComboboxContent>
          <div uiComboboxEmpty>{{ emptyMessage }}</div>
          <div uiComboboxList aria-label="Frameworks">
            @for (f of frameworks; track f) {
              <div uiComboboxItem [value]="f">{{ f }}</div>
            }
          </div>
        </ng-template>
      </div>
    `,
  }),
  args: {
    placeholder: 'Search framework',
    emptyMessage: 'No frameworks found. Try a different search.',
    autoHighlight: false,
    showClear: true,
    showTrigger: true,
    disabled: false,
  },
  argTypes: {
    placeholder: { control: 'text' },
    emptyMessage: { control: 'text' },
    autoHighlight: { control: 'boolean' },
    showClear: { control: 'boolean' },
    showTrigger: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<ComboboxStoryArgs>;

/** Full control set — type to filter, choose with pointer or keyboard. */
export const Playground: Story = {};

/** The default single-select picker. */
export const Basic: Story = {
  render: () => ({
    props: { frameworks: FRAMEWORKS },
    template: `
      <div uiCombobox class="w-72">
        <div uiComboboxInput placeholder="Search framework" aria-label="Framework"></div>
        <ng-template uiComboboxContent>
          <div uiComboboxEmpty>No frameworks found. Try a different search.</div>
          <div uiComboboxList aria-label="Frameworks">
            @for (f of frameworks; track f) {
              <div uiComboboxItem [value]="f">{{ f }}</div>
            }
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/** Grouped items with headings and separators. */
export const Groups: Story = {
  render: () => ({
    props: { groups: TIMEZONES },
    template: `
      <div uiCombobox class="w-72">
        <div uiComboboxInput placeholder="Search timezone" aria-label="Timezone"></div>
        <ng-template uiComboboxContent>
          <div uiComboboxEmpty>No timezones found. Try a different search.</div>
          <div uiComboboxList aria-label="Timezones">
            @for (group of groups; track group.label; let last = $last) {
              <div uiComboboxGroup>
                <div uiComboboxLabel>{{ group.label }}</div>
                @for (tz of group.items; track tz) {
                  <div uiComboboxItem [value]="tz">{{ tz }}</div>
                }
              </div>
              @if (!last) { <div uiComboboxSeparator></div> }
            }
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/** Multi-select with removable chips (Backspace on the empty field removes the last). */
export const Multiple: Story = {
  render: () => ({
    props: { frameworks: FRAMEWORKS, selected: ['Next.js'] },
    template: `
      <div uiCombobox multiple class="w-80" [(value)]="selected">
        <div uiComboboxChips>
          @for (v of selected; track v) {
            <span uiComboboxChip [value]="v">{{ v }}</span>
          }
          <input uiComboboxChipsInput placeholder="Add framework" aria-label="Frameworks" />
        </div>
        <ng-template uiComboboxContent>
          <div uiComboboxEmpty>No frameworks found. Try a different search.</div>
          <div uiComboboxList aria-label="Frameworks">
            @for (f of frameworks; track f) {
              <div uiComboboxItem [value]="f">{{ f }}</div>
            }
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/** Disabled — the whole control is inert. */
export const Disabled: Story = {
  render: () => ({
    props: { frameworks: FRAMEWORKS },
    template: `
      <div uiCombobox disabled class="w-72">
        <div uiComboboxInput placeholder="Search framework" aria-label="Framework"></div>
        <ng-template uiComboboxContent>
          <div uiComboboxList aria-label="Frameworks">
            @for (f of frameworks; track f) {
              <div uiComboboxItem [value]="f">{{ f }}</div>
            }
          </div>
        </ng-template>
      </div>
    `,
  }),
};

/** All variants side by side. */
export const Gallery: Story = {
  render: () => ({
    props: { frameworks: FRAMEWORKS, groups: TIMEZONES, multi: ['Astro'] },
    template: `
      <div class="flex flex-col gap-6">
        <div uiCombobox class="w-72">
          <div uiComboboxInput placeholder="Single select" aria-label="Framework"></div>
          <ng-template uiComboboxContent>
            <div uiComboboxEmpty>No frameworks found. Try a different search.</div>
            <div uiComboboxList aria-label="Frameworks">
              @for (f of frameworks; track f) {
                <div uiComboboxItem [value]="f">{{ f }}</div>
              }
            </div>
          </ng-template>
        </div>

        <div uiCombobox multiple class="w-80" [(value)]="multi">
          <div uiComboboxChips>
            @for (v of multi; track v) {
              <span uiComboboxChip [value]="v">{{ v }}</span>
            }
            <input uiComboboxChipsInput placeholder="Multi select" aria-label="Frameworks" />
          </div>
          <ng-template uiComboboxContent>
            <div uiComboboxList aria-label="Frameworks">
              @for (f of frameworks; track f) {
                <div uiComboboxItem [value]="f">{{ f }}</div>
              }
            </div>
          </ng-template>
        </div>
      </div>
    `,
  }),
};
