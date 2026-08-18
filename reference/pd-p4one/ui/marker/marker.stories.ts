import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Marker, MarkerContent, MarkerIcon } from './';
import { type MarkerVariant } from './marker.variants';

const VARIANTS: MarkerVariant[] = ['default', 'separator', 'border'];

interface MarkerStoryArgs {
  variant: MarkerVariant;
  content: string;
  showIcon: boolean;
  asLink: boolean;
}

const CLOCK_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 11h-4v-2h2.5V7H13v6Z"/></svg>`;

// `uiMarker`'s own underline/hover classes are `&:is(a)`-scoped — they only
// fire when MARKER ITSELF is hosted on an `<a>`, so the two branches below
// swap the root tag rather than putting the anchor on `uiMarkerContent`.
const TEMPLATE = `
  <a *ngIf="asLink; else divRoot" uiMarker [variant]="variant" href="#" class="w-80">
    <span *ngIf="showIcon" uiMarkerIcon>${CLOCK_ICON}</span>
    <span uiMarkerContent>{{ content }}</span>
  </a>
  <ng-template #divRoot>
    <div uiMarker [variant]="variant" class="w-80">
      <span *ngIf="showIcon" uiMarkerIcon>${CLOCK_ICON}</span>
      <span uiMarkerContent>{{ content }}</span>
    </div>
  </ng-template>`;

/**
 * `[uiMarker]` is the Angular port of the Force UI (radix-force-ui) marker —
 * a single-line meta row pairing an optional decorative icon
 * (`[uiMarkerIcon]`) with content (`[uiMarkerContent]`). `variant="separator"`
 * flanks the content with a line on either side (a date-divider row);
 * `variant="border"` draws a bottom rule instead (a section-header row).
 */
const meta: Meta<MarkerStoryArgs> = {
  title: 'UI/Marker',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, Marker, MarkerIcon, MarkerContent],
    }),
  ],
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'Marker layout style' },
    content: { control: 'text', description: 'Marker text' },
    showIcon: { control: 'boolean', description: 'Show the leading icon' },
    asLink: { control: 'boolean', description: 'Host the whole row on an <a> (clickable marker)' },
  },
  args: {
    variant: 'default',
    content: '2 versions ago',
    showIcon: true,
    asLink: false,
  },
  render: (args) => ({ props: args, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<MarkerStoryArgs>;

/** Interactive playground — every control available. */
export const Playground: Story = {};

/** `variant="default"` — a plain meta row, no line decoration. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiMarker class="w-80">
        <span uiMarkerIcon>${CLOCK_ICON}</span>
        <span uiMarkerContent>2 versions ago</span>
      </div>
    `,
  }),
};

/** `variant="separator"` — flanking lines, useful as a date divider. */
export const Separator: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiMarker variant="separator" class="w-80">
        <span uiMarkerContent>Today</span>
      </div>
    `,
  }),
};

/** `variant="border"` — a bottom rule, useful as a section header row. */
export const Border: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiMarker variant="border" class="w-80">
        <span uiMarkerIcon>${CLOCK_ICON}</span>
        <span uiMarkerContent>Experiment started</span>
      </div>
    `,
  }),
};

/**
 * The whole row hosted on an `<a>` — `uiMarker`'s underline/hover classes are
 * scoped to the host being an anchor, so the anchor goes on `uiMarker`
 * itself, not `uiMarkerContent`.
 */
export const AsLink: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <a uiMarker href="#" class="w-80">
        <span uiMarkerIcon>${CLOCK_ICON}</span>
        <span uiMarkerContent>View the full Timeline</span>
      </a>
    `,
  }),
};

/**
 * An inline link inside longer content — `uiMarkerContent`'s underline/hover
 * classes are scoped to its direct-child anchors.
 */
export const InlineLink: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiMarker class="w-80">
        <span uiMarkerContent>See <a href="#">the full Timeline</a> for this version</span>
      </div>
    `,
  }),
};

/** Without the leading icon — content only. */
export const NoIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiMarker class="w-80">
        <span uiMarkerContent>Saved automatically</span>
      </div>
    `,
  }),
};

/** Gallery — all three variants side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex w-80 flex-col gap-3">
        <div uiMarker>
          <span uiMarkerIcon>${CLOCK_ICON}</span>
          <span uiMarkerContent>variant="default"</span>
        </div>
        <div uiMarker variant="separator">
          <span uiMarkerContent>variant="separator"</span>
        </div>
        <div uiMarker variant="border">
          <span uiMarkerIcon>${CLOCK_ICON}</span>
          <span uiMarkerContent>variant="border"</span>
        </div>
      </div>
    `,
  }),
};
