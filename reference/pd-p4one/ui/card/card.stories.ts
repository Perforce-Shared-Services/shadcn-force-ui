import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Button } from '@/app/ui/button';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardSize,
} from './';

const SIZES: CardSize[] = ['default', 'sm'];

interface CardStoryArgs {
  size: CardSize;
  title: string;
  description: string;
  content: string;
  showHeader: boolean;
  showDescription: boolean;
  showAction: boolean;
  showContent: boolean;
  showFooter: boolean;
  showImage: boolean;
}

// Static template — slot visibility driven by *ngIf on props (Storybook-Angular
// only re-binds props between arg changes, it does not recompile the template
// string). The `<img>` must stay a direct first child of [uiCard] for the
// registry's `has-[>img:first-child]:pt-0` + `*:[img:first-child]:rounded-t-xl`
// edge rules to match.
const TEMPLATE = `
  <div uiCard [size]="size" class="w-80">
    <img
      *ngIf="showImage"
      src="https://picsum.photos/seed/p4one/640/240"
      alt="Character hero preview"
      class="h-32 w-full object-cover" />
    <div uiCardHeader *ngIf="showHeader">
      <h3 uiCardTitle>{{ title }}</h3>
      <div uiCardDescription *ngIf="showDescription">{{ description }}</div>
      <div uiCardAction *ngIf="showAction">
        <button uiButton variant="ghost" size="sm">Edit</button>
      </div>
    </div>
    <div uiCardContent *ngIf="showContent">{{ content }}</div>
    <div uiCardFooter *ngIf="showFooter">
      <button uiButton variant="ghost">Cancel</button>
      <button uiButton class="ml-auto">Save changes</button>
    </div>
  </div>`;

/**
 * `[uiCard]` is the Angular port of the Force UI (radix-force-ui) card — a
 * bounded container that groups related content into a scannable unit. The
 * toolbar controls mirror the card's slots: switch the **size** (`default` /
 * `sm`) and toggle the header, description, action, content, footer, and media
 * image on and off.
 *
 * Ported registry-verbatim: the card is purely presentational (no variant
 * prop, no interactive/focus state). `size` sets `data-size` on the root and
 * the child slots respond via their `group-data-[size=sm]/card:` selectors.
 * Make the title a real heading (`<h3 uiCardTitle>`) for the surrounding
 * hierarchy when used in a page.
 */
const meta: Meta<CardStoryArgs> = {
  title: 'UI/Card',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardAction,
        CardContent,
        CardFooter,
        Button,
      ],
    }),
  ],
  argTypes: {
    size: { control: 'select', options: SIZES, description: 'Tightens padding and gaps for compact placement (sm)' },
    title: { control: 'text', description: 'Card title text' },
    description: { control: 'text', description: 'Card description text' },
    content: { control: 'text', description: 'Card body content' },
    showHeader: { control: 'boolean', description: 'Header slot (title + description + action)' },
    showDescription: { control: 'boolean', description: 'Description line inside header' },
    showAction: { control: 'boolean', description: 'Push-right action in header' },
    showContent: { control: 'boolean', description: 'Free-form body slot' },
    showFooter: { control: 'boolean', description: 'Footer slot (tinted, top border)' },
    showImage: { control: 'boolean', description: 'Full-bleed media image at the top' },
  },
  args: {
    size: 'default',
    title: 'Project settings',
    description: 'Manage how this workspace syncs.',
    content: 'Files here sync to Main when you submit a version.',
    showHeader: true,
    showDescription: true,
    showAction: false,
    showContent: true,
    showFooter: true,
    showImage: false,
  },
  render: (args) => ({ props: args, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<CardStoryArgs>;

/** Interactive playground — every slot and control available. */
export const Playground: Story = {};

/** Default size — header, body, and footer. */
export const Default: Story = {};

/** Compact `sm` size — tighter gaps and padding. */
export const Small: Story = { args: { size: 'sm' } };

/** Header with a push-right action control. */
export const WithAction: Story = { args: { showAction: true, showFooter: false } };

/** Media card — full-bleed image flush to the top edge. */
export const WithMedia: Story = {
  args: {
    showImage: true,
    title: 'Character hero',
    description: 'character_hero.fbx, synced 2 hours ago.',
    showContent: false,
    showFooter: false,
  },
};

/** Header only — no body or footer. */
export const HeaderOnly: Story = {
  args: { showContent: false, showFooter: false },
};

/** Body only — no header chrome. */
export const ContentOnly: Story = {
  args: { showHeader: false, showFooter: false },
};

/** Gallery — the common card shapes side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-start gap-4">
        <div uiCard class="w-72">
          <div uiCardHeader>
            <h3 uiCardTitle>Project settings</h3>
            <div uiCardDescription>Manage how this workspace syncs.</div>
          </div>
          <div uiCardContent>Files here sync to Main when you submit a version.</div>
          <div uiCardFooter>
            <button uiButton variant="ghost">Cancel</button>
            <button uiButton class="ml-auto">Save changes</button>
          </div>
        </div>

        <div uiCard size="sm" class="w-72">
          <div uiCardHeader>
            <h3 uiCardTitle>Sync status</h3>
            <div uiCardDescription>3 local versions not yet submitted.</div>
            <div uiCardAction>
              <button uiButton variant="ghost" size="sm">Sync</button>
            </div>
          </div>
          <div uiCardContent>Submit your versions to share them with the team.</div>
        </div>

        <div uiCard class="w-72">
          <img
            src="https://picsum.photos/seed/p4one/640/240"
            alt="Character hero preview"
            class="h-32 w-full object-cover" />
          <div uiCardHeader>
            <h3 uiCardTitle>Character hero</h3>
            <div uiCardDescription>character_hero.fbx, synced 2 hours ago.</div>
          </div>
        </div>
      </div>
    `,
  }),
};
