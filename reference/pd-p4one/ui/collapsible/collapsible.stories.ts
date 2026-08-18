import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './';

interface CollapsibleStoryArgs {
  open: boolean;
  disabled: boolean;
  contentId: string;
}

// Toggle glyph for the demo trigger (Material Symbols Rounded, unfold_more) — the
// up/down affordance the Figma Collapsible example uses (Lucide chevrons-up-down,
// 16px / h-4). Static (no rotation): it signals "expandable" in both states.
// Story decoration only — literal inline <svg> so it stays a direct child and
// `fill-current` paints it. The registry collapsible ships no icon of its own.
const CHEVRON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-4 shrink-0 fill-current" aria-hidden="true"><path d="m480-208 114-114q9.13-9 22.07-9 12.93 0 21.93 9.1 9 9.11 9 22 0 12.9-9 21.9L501-141q-5 5-10.13 7-5.14 2-11 2-5.87 0-10.87-2-5-2-10-7L322-278q-9-9.13-9-22.07 0-12.93 9.1-21.93 9.11-9 22-9 12.9 0 21.9 9l114 114Zm0-540L366-634q-9.13 9-22.07 9-12.93 0-21.93-9.1-9-9.11-9-22 0-12.9 9-21.9l137-137q5-5 10.13-7 5.14-2 11-2 5.87 0 10.87 2 5 2 10 7l137 137q9 9.13 9 22.07 0 12.93-9.1 21.93-9.11 9-22 9-12.9 0-21.9-9L480-748Z"/></svg>`;

// Shared class strings so every demo composes the primitive the same way.
const TRIGGER =
  'group flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:shadow-focus-ring disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none';

// Content HOST carries ONLY overflow + the height animation. Decoration (border,
// bg, padding) lives on an INNER div — radix-ng sets `hidden="until-found"` on the
// host when collapsed, which uses `content-visibility:hidden`: it hides the host's
// *descendants* but the host box (its own border/bg/padding) would still paint. So
// a bordered/filled host shows an empty pill when collapsed. Keeping the host bare
// means collapsed = nothing visible; only the inner panel is styled.
const CONTENT_HOST =
  'overflow-hidden data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none';

// Inner panel — the `mt-2` sits inside the host's block-formatting context
// (overflow-hidden), so it is part of the measured height and animates in with the
// content instead of leaving a permanent gap under the trigger.
const PANEL = 'mt-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground';

/**
 * `[uiCollapsible]` is the Angular port of the Force UI (radix-force-ui)
 * collapsible — a **headless, classless behavioral primitive**, not a visual
 * component. It wraps any block and adds show/hide behaviour + accessibility
 * (`aria-expanded` / `aria-controls` / `data-state`, keyboard toggle, height
 * measurement) via `@radix-ng/primitives`. You style whatever you put inside —
 * an order card, a file list, a settings section. Accordion is a specialised
 * multi-item version built on this same primitive. These stories show a few
 * compositions; the primitive carries no styling of its own.
 */
const meta: Meta<CollapsibleStoryArgs> = {
  title: 'UI/Collapsible',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Collapsible, CollapsibleTrigger, CollapsibleContent] })],
  argTypes: {
    open: { control: 'boolean', description: 'Controlled open state (two-way `open`)' },
    disabled: { control: 'boolean', description: 'Block toggling the whole collapsible' },
    contentId: {
      control: 'text',
      description: 'Stable id linking the trigger `aria-controls` to the content `id`',
    },
  },
  args: {
    open: false,
    disabled: false,
    contentId: 'collapsible-panel',
  },
};

export default meta;
type Story = StoryObj<CollapsibleStoryArgs>;

/**
 * Args-driven playground — flip `open` and `disabled` in the Controls panel and
 * watch the trigger's `aria-expanded` / `data-state` track the state.
 */
export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div
        uiCollapsible
        [(open)]="open"
        [disabled]="disabled"
        [contentId]="contentId"
        class="flex w-[360px] flex-col"
      >
        <button uiCollapsibleTrigger type="button" class="${TRIGGER}">
          Version details
          ${CHEVRON}
        </button>
        <div uiCollapsibleContent class="${CONTENT_HOST}">
          <div class="${PANEL}">
            Edited 3 files - textures, mesh, and material graph. Saved locally; not yet
            submitted to the server.
          </div>
        </div>
      </div>
    `,
  }),
};

/** Default closed state — click the trigger to reveal the panel. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiCollapsible contentId="whats-new" class="flex w-[360px] flex-col">
        <button uiCollapsibleTrigger type="button" class="${TRIGGER}">
          What changed in this version
          ${CHEVRON}
        </button>
        <div uiCollapsibleContent class="${CONTENT_HOST}">
          <div class="${PANEL}">Reworked the lighting rig and baked new shadows.</div>
        </div>
      </div>
    `,
  }),
};

/** Open on load via the two-way `open` model. */
export const DefaultOpen: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiCollapsible [open]="true" contentId="open-on-load" class="flex w-[360px] flex-col">
        <button uiCollapsibleTrigger type="button" class="${TRIGGER}">
          Included files
          ${CHEVRON}
        </button>
        <div uiCollapsibleContent class="${CONTENT_HOST}">
          <div class="${PANEL}">scene.blend, hero.fbx, and 4 textures are part of this version.</div>
        </div>
      </div>
    `,
  }),
};

/**
 * The primitive wraps any block — here a list of rows instead of a single
 * paragraph. Same wiring, different content. (This is why file trees, settings
 * panels, and detail cards all reuse collapsible rather than a bespoke widget.)
 */
export const FileList: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiCollapsible [open]="true" contentId="file-list" class="flex w-[360px] flex-col">
        <button uiCollapsibleTrigger type="button" class="${TRIGGER}">
          Order #4189
          ${CHEVRON}
        </button>
        <div uiCollapsibleContent class="${CONTENT_HOST}">
          <div class="mt-2 flex flex-col gap-2">
            <div class="rounded-lg border border-border bg-card px-4 py-2.5 font-mono text-sm text-muted-foreground">Status: Shipped</div>
            <div class="rounded-lg border border-border bg-card px-4 py-2.5 font-mono text-sm text-muted-foreground">Price: 100 USD</div>
            <div class="rounded-lg border border-border bg-card px-4 py-2.5 font-mono text-sm text-muted-foreground">Location: USA</div>
          </div>
        </div>
      </div>
    `,
  }),
};

/** Disabled — the trigger cannot toggle (native `disabled` from radix-ng). */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiCollapsible disabled contentId="locked" class="flex w-[360px] flex-col">
        <button uiCollapsibleTrigger type="button" class="${TRIGGER}">
          Locked while syncing
          ${CHEVRON}
        </button>
        <div uiCollapsibleContent class="${CONTENT_HOST}">
          <div class="${PANEL}">You cannot open this until the sync finishes.</div>
        </div>
      </div>
    `,
  }),
};

/**
 * Bare, unstyled primitive — trigger and content with no classes at all, showing
 * that collapsible only adds behaviour. Intentionally has no focus/hover styling:
 * copy `Playground` / `Default` (not this) as a consumer starting point so you
 * keep the focus ring and hover states.
 */
export const Unstyled: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiCollapsible contentId="bare" class="w-[360px]">
        <button uiCollapsibleTrigger type="button">Toggle raw content</button>
        <div uiCollapsibleContent>No wrapper styling - just show and hide.</div>
      </div>
    `,
  }),
};
