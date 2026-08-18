import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Spinner } from '@/app/ui/spinner';

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from './';
import {
  type AttachmentMediaVariant,
  type AttachmentOrientation,
  type AttachmentSize,
  type AttachmentState,
} from './attachment.variants';

const STATES: AttachmentState[] = ['idle', 'uploading', 'processing', 'error', 'done'];
const SIZES: AttachmentSize[] = ['default', 'sm', 'xs'];
const ORIENTATIONS: AttachmentOrientation[] = ['horizontal', 'vertical'];
const MEDIA_VARIANTS: AttachmentMediaVariant[] = ['icon', 'image'];

// Direct-child <svg> (literal markup) so AttachmentMedia's `[&_svg]` size
// rule matches. Decorative only, so it carries aria-hidden. (Material
// Symbols "draft" — represents a tracked file.)
const FILE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h336q12.44 0 23.72 5T599-862l183 183q8 8 13 19.28 5 11.28 5 23.72v496q0 24-18 42t-42 18H220Zm331-584v-156H220v680h520v-494H581q-12.75 0-21.37-8.63Q551-651.25 551-664ZM220-820v186-186 680-680Z"/></svg>`;
const ERROR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M503.5-289.48q9.5-9.48 9.5-23.5t-9.48-23.52q-9.48-9.5-23.5-9.5t-23.52 9.48q-9.5 9.48-9.5 23.5t9.48 23.52q9.48 9.5 23.5 9.5t23.52-9.48Zm1-152.15q8.5-8.62 8.5-21.37v-193q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v193q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>`;
const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>`;
const RETRY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z"/></svg>`;
// Inline data URI (no network fetch) so the static Storybook build renders
// offline. Purely decorative demo content — alt is empty.
const THUMBNAIL_IMG = `<img src="data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#6366f1"/><circle cx="40" cy="32" r="14" fill="#a5b4fc"/><rect x="14" y="52" width="52" height="20" fill="#818cf8"/></svg>',
)}" alt="" />`;

interface AttachmentStoryArgs {
  state: AttachmentState;
  size: AttachmentSize;
  orientation: AttachmentOrientation;
  mediaVariant: AttachmentMediaVariant;
  title: string;
  description: string;
  showActions: boolean;
  showTrigger: boolean;
}

// Static template — slot visibility + content driven by *ngIf/*ngSwitch on
// args (Storybook-Angular re-binds props between arg changes but does NOT
// recompile the template string). Icon/spinner/thumbnail stay direct
// children of [uiAttachmentMedia] so its `[&_svg]` / `[&_img]` rules apply.
//
// The action button's label + icon switch on `state` (Cancel while
// uploading/processing, Retry on error, Remove otherwise) — a single
// always-"Remove" action regardless of state offered no way to retry a
// failed upload or cancel an in-flight one (audit finding). The sr-only
// status span models the "state change is announced, not just shown via
// colour/shimmer" requirement from the component's own doc comment (WCAG
// 1.4.1 / 4.1.3) — every consumer copying this pattern gets it for free.
const TEMPLATE = `
  <div uiAttachment [state]="state" [size]="size" [orientation]="orientation">
    <div uiAttachmentMedia [variant]="mediaVariant" [ngSwitch]="mediaVariant">
      <ng-container *ngSwitchCase="'image'">${THUMBNAIL_IMG}</ng-container>
      <ng-container *ngSwitchDefault [ngSwitch]="state">
        <span *ngSwitchCase="'uploading'" uiSpinner></span>
        <span *ngSwitchCase="'processing'" uiSpinner></span>
        <ng-container *ngSwitchCase="'error'">${ERROR_ICON}</ng-container>
        <ng-container *ngSwitchDefault>${FILE_ICON}</ng-container>
      </ng-container>
    </div>
    <div uiAttachmentContent>
      <span uiAttachmentTitle>{{ title }}</span>
      <span uiAttachmentDescription>{{ description }}</span>
    </div>
    <div uiAttachmentActions *ngIf="showActions" [ngSwitch]="state">
      <button *ngSwitchCase="'uploading'" uiAttachmentAction aria-label="Cancel upload of {{ title }}">${CLOSE_ICON}</button>
      <button *ngSwitchCase="'processing'" uiAttachmentAction aria-label="Cancel {{ title }}">${CLOSE_ICON}</button>
      <button *ngSwitchCase="'error'" uiAttachmentAction aria-label="Retry {{ title }}">${RETRY_ICON}</button>
      <button *ngSwitchDefault uiAttachmentAction aria-label="Remove {{ title }}">${CLOSE_ICON}</button>
    </div>
    <button uiAttachmentTrigger *ngIf="showTrigger" aria-label="Open {{ title }}"></button>
  </div>
  <span class="sr-only" role="status" aria-live="polite">{{ title }} is {{ state }}</span>`;

/**
 * `[uiAttachment]` is the Angular port of the Force UI (radix-force-ui)
 * attachment — a bordered file/media card: a leading `AttachmentMedia`
 * (icon or thumbnail), `AttachmentContent` (title + description), and a
 * trailing `AttachmentActions` slot. Compose several inside
 * `[uiAttachmentGroup]` for a horizontal snap-scrolling row.
 *
 * `state` drives the border/background tint (`idle` = dashed drop target,
 * `error` = destructive border) and the title's `shimmer` treatment while
 * `uploading`/`processing`. `[uiAttachmentTrigger]` is an invisible
 * full-cover overlay so the whole card opens the file — omit it for a
 * purely informational card (e.g. a completed, non-interactive attachment
 * in a version's file list).
 */
const meta: Meta<AttachmentStoryArgs> = {
  title: 'UI/Attachment',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        Attachment,
        AttachmentGroup,
        AttachmentMedia,
        AttachmentContent,
        AttachmentTitle,
        AttachmentDescription,
        AttachmentActions,
        AttachmentAction,
        AttachmentTrigger,
        Spinner,
      ],
    }),
  ],
  argTypes: {
    state: {
      control: 'select',
      options: STATES,
      description:
        '`idle` = empty dashed drop target; `uploading`/`processing` = in-progress (spinner media, shimmering title); `error` = destructive border/tint; `done` = complete.',
      table: { type: { summary: STATES.join(' | ') }, defaultValue: { summary: 'done' } },
    },
    size: {
      control: 'select',
      options: SIZES,
      table: { type: { summary: SIZES.join(' | ') }, defaultValue: { summary: 'default' } },
    },
    orientation: {
      control: 'select',
      options: ORIENTATIONS,
      description: '`horizontal` = compact row; `vertical` = tall card for a thumbnail-first grid.',
      table: { type: { summary: ORIENTATIONS.join(' | ') }, defaultValue: { summary: 'horizontal' } },
    },
    mediaVariant: {
      control: 'select',
      options: MEDIA_VARIANTS,
      description: '`icon` = sized glyph (or spinner while in-progress); `image` = framed thumbnail.',
    },
    title: { control: 'text', description: 'File name.' },
    description: {
      control: 'text',
      description:
        'Secondary detail line (size, progress, status). Plain artist language — version, experiment, share, save — never changelist / depot / rebase.',
    },
    showActions: { control: 'boolean', description: 'Trailing per-card action (Remove).' },
    showTrigger: { control: 'boolean', description: 'Invisible full-card click target (Open).' },
  },
  args: {
    state: 'done',
    size: 'default',
    orientation: 'horizontal',
    mediaVariant: 'icon',
    title: 'character_turntable.mp4',
    description: '4.2 MB',
    showActions: true,
    showTrigger: true,
  },
  render: (args) => ({ props: args, template: TEMPLATE }),
};

export default meta;
type Story = StoryObj<AttachmentStoryArgs>;

/** Interactive playground — every slot and control available. */
export const Playground: Story = {};

/** `idle` — empty dashed drop target, before a file is added. */
export const Idle: Story = {
  args: { state: 'idle', title: 'Drop a file', description: 'or click to browse', showActions: false },
};

/**
 * `uploading` — in-progress: spinner media, shimmering title, a completion
 * ratio in the description (not a bare "Uploading…" — see the Force writing
 * guide's progress-copy rule), and the action switches to "Cancel".
 */
export const Uploading: Story = {
  args: { state: 'uploading', description: '4.2 MB · 62% uploaded' },
};

/** `processing` — server-side work after upload completes. */
export const Processing: Story = {
  args: { state: 'processing', description: 'Generating preview…' },
};

/** `error` — destructive border/tint, error glyph in the media slot, action switches to "Retry". */
export const ErrorState: Story = {
  args: { state: 'error', description: 'Upload failed · connection lost' },
};

/** `image` media — a framed thumbnail instead of an icon. */
export const ImageMedia: Story = { args: { mediaVariant: 'image' } };

/** `vertical` orientation — tall card, actions float top-right over the thumbnail. */
export const Vertical: Story = {
  args: { orientation: 'vertical', mediaVariant: 'image', title: 'concept_sketch.png', description: '1.8 MB' },
};

/** `xs` size — the compact density for a dense attachment list. */
export const CompactSize: Story = { args: { size: 'xs' } };

/** No trigger, no actions — a read-only attachment reference. */
export const ReadOnly: Story = { args: { showActions: false, showTrigger: false } };

/** A horizontal, snap-scrolling row of attachments — the group composition. */
export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiAttachmentGroup class="w-96">
        <div uiAttachment state="done">
          <div uiAttachmentMedia variant="icon">${FILE_ICON}</div>
          <div uiAttachmentContent>
            <span uiAttachmentTitle>character_turntable.mp4</span>
            <span uiAttachmentDescription>4.2 MB</span>
          </div>
          <div uiAttachmentActions>
            <button uiAttachmentAction aria-label="Remove character_turntable.mp4">${CLOSE_ICON}</button>
          </div>
        </div>
        <div uiAttachment state="uploading">
          <div uiAttachmentMedia variant="icon"><span uiSpinner></span></div>
          <div uiAttachmentContent>
            <span uiAttachmentTitle>scene_lighting.blend</span>
            <span uiAttachmentDescription>2.1 MB · 30% uploaded</span>
          </div>
          <div uiAttachmentActions>
            <button uiAttachmentAction aria-label="Cancel upload of scene_lighting.blend">${CLOSE_ICON}</button>
          </div>
        </div>
        <div uiAttachment state="error">
          <div uiAttachmentMedia variant="icon">${ERROR_ICON}</div>
          <div uiAttachmentContent>
            <span uiAttachmentTitle>concept_sketch.png</span>
            <span uiAttachmentDescription>Upload failed</span>
          </div>
          <div uiAttachmentActions>
            <button uiAttachmentAction aria-label="Retry concept_sketch.png">${RETRY_ICON}</button>
          </div>
        </div>
      </div>
      <span class="sr-only" role="status" aria-live="polite">scene_lighting.blend is uploading. concept_sketch.png upload failed.</span>
    `,
  }),
};

/** Gallery — the state + orientation combinations side by side. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-wrap items-start gap-4">
        <div uiAttachment state="idle">
          <div uiAttachmentMedia variant="icon">${FILE_ICON}</div>
          <div uiAttachmentContent>
            <span uiAttachmentTitle>Drop a file</span>
            <span uiAttachmentDescription>idle</span>
          </div>
        </div>
        <div uiAttachment state="uploading">
          <div uiAttachmentMedia variant="icon"><span uiSpinner></span></div>
          <div uiAttachmentContent>
            <span uiAttachmentTitle>main.blend</span>
            <span uiAttachmentDescription>uploading</span>
          </div>
        </div>
        <div uiAttachment state="error">
          <div uiAttachmentMedia variant="icon">${ERROR_ICON}</div>
          <div uiAttachmentContent>
            <span uiAttachmentTitle>main.blend</span>
            <span uiAttachmentDescription>error</span>
          </div>
        </div>
        <div uiAttachment state="done">
          <div uiAttachmentMedia variant="icon">${FILE_ICON}</div>
          <div uiAttachmentContent>
            <span uiAttachmentTitle>main.blend</span>
            <span uiAttachmentDescription>done</span>
          </div>
        </div>
        <div uiAttachment state="done" orientation="vertical" class="w-24">
          <div uiAttachmentMedia variant="image">${THUMBNAIL_IMG}</div>
          <div uiAttachmentContent>
            <span uiAttachmentTitle>concept.png</span>
            <span uiAttachmentDescription>vertical</span>
          </div>
        </div>
      </div>
    `,
  }),
};
