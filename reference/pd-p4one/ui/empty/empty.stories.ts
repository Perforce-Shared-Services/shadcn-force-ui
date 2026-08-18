import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './';
import { type EmptyMediaVariant } from './empty.variants';

const MEDIA_VARIANTS: EmptyMediaVariant[] = ['default', 'icon'];

// Decorative glyph projected into [uiEmptyMedia]. Kept as a direct-child <svg>
// (literal markup) so the media slot's `[&_svg]` size/layout rules match. It is
// purely decorative, so it carries aria-hidden. (Material Symbols "inbox".)
const MEDIA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-180H660q-22 38-58.5 59T520-340h-80q-45 0-81.5-21T300-420H160v180Zm280-260h80q17 0 28.5-11.5T560-540v-180H400v180q0 17 11.5 28.5T440-500ZM160-340h94q-7-19-10.5-39t-3.5-41v-180H160v260Zm640 0v-260H640v180q0 21-3.5 41T626-340h94ZM480-480Z"/></svg>`;

interface EmptyStoryArgs {
  mediaVariant: EmptyMediaVariant;
  title: string;
  description: string;
  actionLabel: string;
  showMedia: boolean;
  showDescription: boolean;
  showContent: boolean;
  showBorder: boolean;
}

// Static template — slot visibility driven by *ngIf on props (Storybook-Angular
// re-binds props between arg changes but does NOT recompile the template
// string). The projected <svg> stays a direct child of [uiEmptyMedia] so the
// media slot's icon-sizing rule applies.
const TEMPLATE = `
  <div uiEmpty class="w-96" [ngClass]="showBorder ? 'border border-border' : ''">
    <div uiEmptyHeader>
      <div uiEmptyMedia *ngIf="showMedia" [variant]="mediaVariant">${MEDIA_SVG}</div>
      <h2 uiEmptyTitle>{{ title }}</h2>
      <div uiEmptyDescription *ngIf="showDescription">{{ description }}</div>
    </div>
    <div uiEmptyContent *ngIf="showContent">
      <button uiButton>{{ actionLabel }}</button>
    </div>
  </div>`;

/**
 * `[uiEmpty]` is the Angular port of the Force UI (radix-force-ui) empty state —
 * a centered placeholder shown where content would be once the user has data:
 * an empty version timeline, a folder with no tracked files, no search results.
 * Compose it from the slots: **media** (icon or illustration), **title**,
 * **description**, and a **content** slot for the primary action.
 *
 * Ported registry-verbatim — purely presentational, no interactive state. Only
 * the media slot has a variant (`default` bare, `icon` framed tile). The dashed
 * border is opt-in: add `border border-border` on the host for the framed look
 * (toggle **showBorder** below). Make the title a real heading (`<h2 uiEmptyTitle>`)
 * for the page hierarchy.
 */
const meta: Meta<EmptyStoryArgs> = {
  title: 'UI/Empty',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        Empty,
        EmptyHeader,
        EmptyMedia,
        EmptyTitle,
        EmptyDescription,
        EmptyContent,
        Button,
      ],
    }),
  ],
  argTypes: {
    mediaVariant: {
      control: 'select',
      options: MEDIA_VARIANTS,
      description: 'Media slot style: bare (default) or framed tile (icon)',
    },
    title: { control: 'text', description: 'Empty-state title' },
    description: {
      control: 'text',
      description:
        'Why the state is empty and what the user can do next. Plain artist language — version, experiment, share, sync — never changelist / depot / rebase.',
    },
    actionLabel: { control: 'text', description: 'Primary action button label' },
    showMedia: { control: 'boolean', description: 'Media slot (icon / illustration)' },
    showDescription: { control: 'boolean', description: 'Description line' },
    showContent: { control: 'boolean', description: 'Content slot (primary action)' },
    showBorder: { control: 'boolean', description: 'Dashed framed border (border border-border)' },
  },
  args: {
    mediaVariant: 'icon',
    title: 'No versions yet',
    description: 'Versions you create show up here. Track a few files to get started.',
    actionLabel: 'Create version',
    showMedia: true,
    showDescription: true,
    showContent: true,
    showBorder: true,
  },
  render: (args) => ({ props: args, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<EmptyStoryArgs>;

/** Interactive playground — every slot and control available. */
export const Playground: Story = {};

/** Framed icon tile, title, description, and a primary action. */
export const Default: Story = {};

/** Bare media variant — for a larger illustration in place of the framed tile. */
export const DefaultMedia: Story = { args: { mediaVariant: 'default' } };

/** No border — flush placeholder inside an already-bounded container. */
export const Borderless: Story = { args: { showBorder: false } };

/** Title and description only — no media, no action. */
export const TextOnly: Story = {
  args: { showMedia: false, showContent: false },
};

/** No-results state — neutral copy, search-again action. */
export const NoResults: Story = {
  args: {
    title: 'No matches found',
    description: 'No files match "character". Try a different name or clear the filter.',
    actionLabel: 'Clear filter',
  },
};

/** Gallery — the common empty-state shapes side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-stretch gap-4">
        <div uiEmpty class="w-80 border border-border">
          <div uiEmptyHeader>
            <div uiEmptyMedia variant="icon">${MEDIA_SVG}</div>
            <h2 uiEmptyTitle>No versions yet</h2>
            <div uiEmptyDescription>Versions you create show up here. Track a few files to get started.</div>
          </div>
          <div uiEmptyContent>
            <button uiButton>Create version</button>
          </div>
        </div>

        <div uiEmpty class="w-80 border border-border">
          <div uiEmptyHeader>
            <div uiEmptyMedia variant="icon">${MEDIA_SVG}</div>
            <h2 uiEmptyTitle>No matches found</h2>
            <div uiEmptyDescription>No files match "character". Try a different name or clear the filter.</div>
          </div>
          <div uiEmptyContent>
            <button uiButton variant="outline">Clear filter</button>
          </div>
        </div>

        <div uiEmpty class="w-80">
          <div uiEmptyHeader>
            <h2 uiEmptyTitle>Nothing shared yet</h2>
            <div uiEmptyDescription>Files you share for feedback show up here.</div>
          </div>
        </div>
      </div>
    `,
  }),
};
