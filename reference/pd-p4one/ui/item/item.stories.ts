import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from './';
import { type ItemMediaVariant, type ItemSize, type ItemVariant } from './item.variants';

const VARIANTS: ItemVariant[] = ['default', 'outline', 'muted'];
const SIZES: ItemSize[] = ['default', 'sm', 'xs'];
const MEDIA_VARIANTS: ItemMediaVariant[] = ['default', 'icon', 'image'];

// Direct-child <svg> (literal markup) so ItemMedia's `[&_svg]` size rule
// matches. Decorative only, so it carries aria-hidden. (Material Symbols
// "draft" — represents a tracked file.)
const FILE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z"/></svg>`;
// Inline data URI (no network fetch) so the static Storybook build renders
// offline. Purely decorative demo content — alt is empty.
const AVATAR_IMG = `<img src="data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#6366f1"/><text x="40" y="48" font-family="sans-serif" font-size="28" fill="white" text-anchor="middle">RA</text></svg>',
)}" alt="" />`;
const MORE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>`;

interface ItemStoryArgs {
  variant: ItemVariant;
  size: ItemSize;
  mediaVariant: ItemMediaVariant;
  title: string;
  description: string;
  actionLabel: string;
  showMedia: boolean;
  showDescription: boolean;
  showActions: boolean;
}

// Static template — slot visibility driven by *ngIf/*ngSwitch on props
// (Storybook-Angular re-binds props between arg changes but does NOT
// recompile the template string). Icon and image stay direct children of
// [uiItemMedia] so its `[&_svg]` / `[&_img]` layout rules apply.
const TEMPLATE = `
  <div uiItemGroup class="w-96">
    <div uiItem role="listitem" [variant]="variant" [size]="size">
      <div uiItemMedia *ngIf="showMedia" [variant]="mediaVariant" [ngSwitch]="mediaVariant">
        <ng-container *ngSwitchCase="'image'">${AVATAR_IMG}</ng-container>
        <ng-container *ngSwitchDefault>${FILE_ICON}</ng-container>
      </div>
      <div uiItemContent>
        <div uiItemTitle>{{ title }}</div>
        <p uiItemDescription *ngIf="showDescription">{{ description }}</p>
      </div>
      <div uiItemActions *ngIf="showActions">
        <button uiButton variant="ghost" size="icon-sm" aria-label="More actions">${MORE_ICON}</button>
      </div>
    </div>
  </div>`;

/**
 * `[uiItem]` is the Angular port of the Force UI (radix-force-ui) item — a
 * generic bordered list row: leading media/icon, a title + description
 * content block, and trailing actions. Group rows in `[uiItemGroup]`
 * (`role="list"`) and divide them with `[uiItemSeparator]`.
 *
 * Ported registry-verbatim — purely presentational, no interactive/focus
 * behavior of its own (the row itself has no `role`; give it `role="listitem"`
 * for an informational row, or leave it off when the row hosts a link/button
 * with its own semantics). `ItemMedia` has three variants: `default` (bare,
 * for multi-colour avatar art), `icon` (sized glyph), `image` (framed
 * thumbnail). `ItemHeader` / `ItemFooter` are optional full-width wrapped
 * lines for rows that need a second line of content.
 */
const meta: Meta<ItemStoryArgs> = {
  title: 'UI/Item',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        Item,
        ItemGroup,
        ItemSeparator,
        ItemMedia,
        ItemContent,
        ItemTitle,
        ItemDescription,
        ItemActions,
        ItemHeader,
        ItemFooter,
        Button,
      ],
    }),
  ],
  argTypes: {
    variant: { control: 'select', options: VARIANTS, description: 'Row border/fill style' },
    size: { control: 'select', options: SIZES, description: 'Row density' },
    mediaVariant: {
      control: 'select',
      options: MEDIA_VARIANTS,
      description: 'Leading media style: bare, sized icon, or framed thumbnail',
    },
    title: { control: 'text', description: 'Row title' },
    description: {
      control: 'text',
      description:
        'Secondary detail line. Plain artist language — version, experiment, share, save — never changelist / depot / rebase.',
    },
    actionLabel: { control: 'text', description: 'Trailing action label (for reference only — the row renders an icon button)' },
    showMedia: { control: 'boolean', description: 'Leading media slot' },
    showDescription: { control: 'boolean', description: 'Description line' },
    showActions: { control: 'boolean', description: 'Trailing actions slot' },
  },
  args: {
    variant: 'outline',
    size: 'default',
    mediaVariant: 'icon',
    title: 'main.blend',
    description: 'Modified 2 hours ago',
    actionLabel: 'More actions',
    showMedia: true,
    showDescription: true,
    showActions: true,
  },
  render: (args) => ({ props: args, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<ItemStoryArgs>;

/** Interactive playground — every slot and control available. */
export const Playground: Story = {};

/** `outline` — bordered row, the common list-row look. */
export const Outline: Story = {};

/** `default` — transparent row, for rows on an already-bounded surface. */
export const Default: Story = { args: { variant: 'default' } };

/**
 * `muted` — a quieter visual tier (tinted background), for de-emphasizing a
 * row among others. It is a decoration only — if a row is genuinely inactive/
 * disabled, pair it with an explicit non-color signal (reduced content
 * opacity, `aria-disabled`), don't rely on the tint alone (WCAG 1.4.1).
 */
export const Muted: Story = { args: { variant: 'muted' } };

/** `image` media — a framed avatar/thumbnail instead of an icon. */
export const ImageMedia: Story = { args: { mediaVariant: 'image' } };

/** `xs` size — the compact density used inside dropdown/command panels. */
export const CompactSize: Story = { args: { size: 'xs' } };

/** No actions — read-only row. */
export const NoActions: Story = { args: { showActions: false } };

/** A grouped, separated list of rows — the primary composition pattern. */
export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiItemGroup class="w-96">
        <div uiItem role="listitem" variant="outline">
          <div uiItemMedia variant="icon">${FILE_ICON}</div>
          <div uiItemContent>
            <div uiItemTitle>main.blend</div>
            <p uiItemDescription>Modified 2 hours ago</p>
          </div>
          <div uiItemActions>
            <button uiButton variant="ghost" size="icon-sm" aria-label="More actions">${MORE_ICON}</button>
          </div>
        </div>
        <div uiItemSeparator></div>
        <div uiItem role="listitem" variant="outline">
          <div uiItemMedia variant="icon">${FILE_ICON}</div>
          <div uiItemContent>
            <div uiItemTitle>character_turntable.mp4</div>
            <p uiItemDescription>Shared for feedback · 1 day ago</p>
          </div>
          <div uiItemActions>
            <button uiButton variant="ghost" size="icon-sm" aria-label="More actions">${MORE_ICON}</button>
          </div>
        </div>
        <div uiItemSeparator></div>
        <div uiItem role="listitem" variant="outline">
          <div uiItemMedia variant="icon">${FILE_ICON}</div>
          <div uiItemContent>
            <div uiItemTitle>scene_lighting.blend</div>
            <p uiItemDescription>Up to date</p>
          </div>
        </div>
      </div>
    `,
  }),
};

/** Gallery — the variant + size combinations side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-start gap-4">
        <div uiItemGroup class="w-72">
          <div uiItem role="listitem" variant="default">
            <div uiItemMedia variant="icon">${FILE_ICON}</div>
            <div uiItemContent>
              <div uiItemTitle>default</div>
              <p uiItemDescription>variant="default"</p>
            </div>
          </div>
        </div>
        <div uiItemGroup class="w-72">
          <div uiItem role="listitem" variant="outline">
            <div uiItemMedia variant="icon">${FILE_ICON}</div>
            <div uiItemContent>
              <div uiItemTitle>outline</div>
              <p uiItemDescription>variant="outline"</p>
            </div>
          </div>
        </div>
        <div uiItemGroup class="w-72">
          <div uiItem role="listitem" variant="muted">
            <div uiItemMedia variant="icon">${FILE_ICON}</div>
            <div uiItemContent>
              <div uiItemTitle>muted</div>
              <p uiItemDescription>variant="muted"</p>
            </div>
          </div>
        </div>
        <div uiItemGroup class="w-72">
          <div uiItem role="listitem" variant="outline" size="xs">
            <div uiItemMedia variant="icon">${FILE_ICON}</div>
            <div uiItemContent>
              <div uiItemTitle>xs size</div>
              <p uiItemDescription>size="xs"</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
