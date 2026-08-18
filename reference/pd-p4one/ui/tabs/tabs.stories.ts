import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './';

interface TabsStoryArgs {
  variant: 'default' | 'line';
  orientation: 'horizontal' | 'vertical';
  activationMode: 'automatic' | 'manual';
  value: string;
  disabledTab: boolean;
  showIcons: boolean;
}

// Inline Material Symbols (rounded, wght 300) demo glyphs — story decoration
// only (component-owned icons funnel through a <name>.icons.ts swap point; tabs
// has none of its own). fill-current on the host class string colours them.
const ICON_VERSIONS =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" aria-hidden="true" focusable="false"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
const ICON_SHARE =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" aria-hidden="true" focusable="false"><path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T658-672L376-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z"/></svg>';

/**
 * `[uiTabs]` is the Angular port of the Force UI (radix-force-ui) tabs. The set
 * is attribute-selector based and composes `@radix-ng/primitives` for selection,
 * roving-focus keyboard nav, and aria wiring. Stories render the real compound
 * markup.
 */
const meta: Meta<TabsStoryArgs> = {
  title: 'UI/Tabs',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [CommonModule, Tabs, TabsList, TabsTrigger, TabsContent] }),
  ],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'line'],
      description: 'List style: filled segmented control or underline-on-active line',
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout + arrow-key navigation axis',
    },
    activationMode: {
      control: 'inline-radio',
      options: ['automatic', 'manual'],
      description: 'Activate a tab on focus (automatic) or only on click/Enter (manual)',
    },
    value: {
      control: 'inline-radio',
      options: ['versions', 'experiments', 'shelves'],
      description: 'Selected tab (live two-way — clicking a tab updates it too)',
    },
    disabledTab: { control: 'boolean', description: 'Disable the third tab' },
    showIcons: { control: 'boolean', description: 'Show a leading icon on each trigger' },
  },
  args: {
    variant: 'default',
    orientation: 'horizontal',
    activationMode: 'automatic',
    value: 'versions',
    disabledTab: false,
    showIcons: false,
  },
};

export default meta;
type Story = StoryObj<TabsStoryArgs>;

/**
 * Args-driven playground — flip `variant`, `orientation`, `activationMode`,
 * the selected `value`, the disabled tab, and the leading icons in the Controls
 * panel. `value` is two-way: changing the control selects that tab, and clicking
 * a tab updates the control. (Use a fixed-default story for the uncontrolled
 * `defaultValue` input — it is read once on init, so it cannot be a live control.)
 */
export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div uiTabs [(value)]="value" [orientation]="orientation" [activationMode]="activationMode" class="w-[420px]">
        <div uiTabsList [variant]="variant">
          <button uiTabsTrigger value="versions">
            <ng-container *ngIf="showIcons">${ICON_VERSIONS}</ng-container>Versions
          </button>
          <button uiTabsTrigger value="experiments">
            <ng-container *ngIf="showIcons">${ICON_SHARE}</ng-container>Experiments
          </button>
          <button uiTabsTrigger value="shelves" [disabled]="disabledTab">Shelves</button>
        </div>
        <div uiTabsContent value="versions" class="py-3 text-muted-foreground">
          Local versions you have saved on this machine but not yet submitted.
        </div>
        <div uiTabsContent value="experiments" class="py-3 text-muted-foreground">
          Isolated sandboxes for trying ideas without touching the main timeline.
        </div>
        <div uiTabsContent value="shelves" class="py-3 text-muted-foreground">
          Work saved for later or shared for feedback.
        </div>
      </div>
    `,
  }),
};

// The named stories below are fixed compositions (no `props` — hardcoded
// templates), so the Controls panel can't drive them. Disable controls on each
// so only the Playground exposes live args (the others showed inert controls).
const fixedStory = { parameters: { controls: { disable: true } } };

/** Default filled tab list. */
export const Default: Story = {
  ...fixedStory,
  render: () => ({
    template: `
      <div uiTabs defaultValue="versions" class="w-[420px]">
        <div uiTabsList variant="default">
          <button uiTabsTrigger value="versions">Versions</button>
          <button uiTabsTrigger value="experiments">Experiments</button>
        </div>
        <div uiTabsContent value="versions" class="py-3 text-muted-foreground">Saved versions.</div>
        <div uiTabsContent value="experiments" class="py-3 text-muted-foreground">Your experiments.</div>
      </div>
    `,
  }),
};

/** Line variant — an indigo underline marks the active tab. */
export const Line: Story = {
  ...fixedStory,
  render: () => ({
    template: `
      <div uiTabs defaultValue="versions" class="w-[420px]">
        <div uiTabsList variant="line">
          <button uiTabsTrigger value="versions">Versions</button>
          <button uiTabsTrigger value="experiments">Experiments</button>
          <button uiTabsTrigger value="shelves">Shelves</button>
        </div>
        <div uiTabsContent value="versions" class="py-3 text-muted-foreground">Saved versions.</div>
        <div uiTabsContent value="experiments" class="py-3 text-muted-foreground">Your experiments.</div>
        <div uiTabsContent value="shelves" class="py-3 text-muted-foreground">Saved for later.</div>
      </div>
    `,
  }),
};

/** Vertical orientation — list sits beside the panel; arrows move up/down. */
export const Vertical: Story = {
  ...fixedStory,
  render: () => ({
    template: `
      <div uiTabs defaultValue="versions" orientation="vertical" class="w-[480px]">
        <div uiTabsList variant="default">
          <button uiTabsTrigger value="versions">Versions</button>
          <button uiTabsTrigger value="experiments">Experiments</button>
          <button uiTabsTrigger value="shelves">Shelves</button>
        </div>
        <div uiTabsContent value="versions" class="px-3 text-muted-foreground">Saved versions.</div>
        <div uiTabsContent value="experiments" class="px-3 text-muted-foreground">Your experiments.</div>
        <div uiTabsContent value="shelves" class="px-3 text-muted-foreground">Saved for later.</div>
      </div>
    `,
  }),
};

/** A disabled trigger cannot be selected or focused. */
export const DisabledTab: Story = {
  ...fixedStory,
  render: () => ({
    template: `
      <div uiTabs defaultValue="versions" class="w-[420px]">
        <div uiTabsList variant="default">
          <button uiTabsTrigger value="versions">Versions</button>
          <button uiTabsTrigger value="experiments" disabled>Experiments</button>
          <button uiTabsTrigger value="shelves">Shelves</button>
        </div>
        <div uiTabsContent value="versions" class="py-3 text-muted-foreground">Saved versions.</div>
        <div uiTabsContent value="experiments" class="py-3 text-muted-foreground">Your experiments.</div>
        <div uiTabsContent value="shelves" class="py-3 text-muted-foreground">Saved for later.</div>
      </div>
    `,
  }),
};

/** Every variant and orientation side by side. */
export const Gallery: Story = {
  ...fixedStory,
  render: () => ({
    template: `
      <div class="flex flex-col gap-8">
        <div uiTabs defaultValue="versions" class="w-[420px]">
          <div uiTabsList variant="default">
            <button uiTabsTrigger value="versions">${ICON_VERSIONS}Versions</button>
            <button uiTabsTrigger value="experiments">${ICON_SHARE}Experiments</button>
          </div>
          <div uiTabsContent value="versions" class="py-3 text-muted-foreground">Default, with icons.</div>
          <div uiTabsContent value="experiments" class="py-3 text-muted-foreground">Your experiments.</div>
        </div>

        <div uiTabs defaultValue="versions" class="w-[420px]">
          <div uiTabsList variant="line">
            <button uiTabsTrigger value="versions">Versions</button>
            <button uiTabsTrigger value="experiments">Experiments</button>
            <button uiTabsTrigger value="shelves">Shelves</button>
          </div>
          <div uiTabsContent value="versions" class="py-3 text-muted-foreground">Line variant.</div>
          <div uiTabsContent value="experiments" class="py-3 text-muted-foreground">Your experiments.</div>
          <div uiTabsContent value="shelves" class="py-3 text-muted-foreground">Saved for later.</div>
        </div>

        <div uiTabs defaultValue="versions" orientation="vertical" class="w-[480px]">
          <div uiTabsList variant="default">
            <button uiTabsTrigger value="versions">Versions</button>
            <button uiTabsTrigger value="experiments">Experiments</button>
          </div>
          <div uiTabsContent value="versions" class="px-3 text-muted-foreground">Vertical orientation.</div>
          <div uiTabsContent value="experiments" class="px-3 text-muted-foreground">Your experiments.</div>
        </div>
      </div>
    `,
  }),
};
