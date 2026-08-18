import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  type AvatarSize,
} from './';

const SIZES: AvatarSize[] = ['default', 'sm', 'lg'];

/**
 * Offline-safe demo portraits — inline SVG gradient data URIs, so the "image
 * loaded" path renders in Storybook without a network fetch (and the build is
 * deterministic). Product code points `src` at a real avatar URL.
 */
const PORTRAIT_INDIGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237c3aed'/%3E%3Cstop offset='1' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' fill='url(%23g)'/%3E%3C/svg%3E";
const PORTRAIT_AMBER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23f59e0b'/%3E%3Cstop offset='1' stop-color='%23ef4444'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' fill='url(%23g)'/%3E%3C/svg%3E";
const PORTRAIT_GREEN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2310b981'/%3E%3Cstop offset='1' stop-color='%230ea5e9'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' fill='url(%23g)'/%3E%3C/svg%3E";

/** Material Symbols Rounded `check` (FILL 1) — for the "verified" badge glyph. */
const CHECK_SVG =
  '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M389-369.85 296.46-462.4q-6.31-6.3-15.54-6.5-9.23-.21-15.92 6.5-6.69 6.69-6.69 15.73t6.69 15.73l103.07 103.06q8.62 8.62 20.16 8.62t20.16-8.62l209.46-209.46q6.31-6.3 6.5-15.34.2-9.04-6.5-15.73-6.68-6.69-15.72-6.69t-15.73 6.69L389-369.85Z"/></svg>';

/** Presence status → dot colour. Stock Tailwind palette is fine for demo. */
const STATUS_CLASS: Record<string, string> = {
  verified: '',
  online: 'bg-green-500',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
};

/** Status → accessible label, so the badge is never colour-alone (WCAG 1.4.1). */
const STATUS_LABEL: Record<string, string> = {
  verified: 'Verified',
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
};

interface AvatarStoryArgs {
  size: AvatarSize;
  showImage: boolean;
  fallbackText: string;
  showBadge: boolean;
  badgeStatus: 'verified' | 'online' | 'away' | 'busy';
}

/**
 * `[uiAvatar]` is the Angular port of the Force UI (radix-force-ui) avatar — a
 * compound of attribute-selector parts:
 * `[uiAvatar]` (root) › `[uiAvatarImage]` › `[uiAvatarFallback]`, plus
 * `[uiAvatarBadge]` for presence and `[uiAvatarGroup]` / `[uiAvatarGroupCount]`
 * for overlapping clusters.
 *
 * The root provides the radix `AVATAR_ROOT_CONTEXT`, so the image and fallback
 * coordinate the load handoff automatically: while the image loads (or if it
 * errors) the fallback shows; once loaded, the image replaces it. Turn the
 * image off in the Playground to see the fallback.
 *
 * Accessibility:
 * - The image carries the accessible name via `alt` — always set it.
 * - A presence `[uiAvatarBadge]` conveys state by colour, so give it an
 *   `aria-label` (e.g. "Online") — never colour alone (WCAG 1.4.1).
 */
const meta: Meta<AvatarStoryArgs> = {
  title: 'UI/Avatar',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        Avatar,
        AvatarImage,
        AvatarFallback,
        AvatarBadge,
        AvatarGroup,
        AvatarGroupCount,
      ],
    }),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
      description:
        'Diameter token. `sm` = 24px (dense lists), `default` = 32px (rows, comments), `lg` = 40px (profile headers). Surfaced as `data-size`.',
      table: { type: { summary: SIZES.join(' | ') }, defaultValue: { summary: 'default' } },
    },
    showImage: {
      control: 'boolean',
      description:
        'Render the photo. Turn off (or let it fail to load) to reveal the initials fallback — the same handoff that happens for a slow or broken image.',
    },
    fallbackText: {
      control: 'text',
      description: 'Initials shown while the image loads or when there is no image.',
    },
    showBadge: {
      control: 'boolean',
      description: 'Show a presence dot anchored bottom-right.',
    },
    badgeStatus: {
      control: 'select',
      options: ['verified', 'online', 'away', 'busy'],
      description:
        'Badge meaning. `verified` is the default indigo dot; the rest map to presence colours. The matching `aria-label` rides along so the state is never colour-alone.',
    },
  },
  args: {
    size: 'default',
    showImage: true,
    fallbackText: 'AL',
    showBadge: false,
    badgeStatus: 'online',
  },
  render: (args) => ({
    props: {
      ...args,
      portrait: PORTRAIT_INDIGO,
      badgeClass: STATUS_CLASS[args.badgeStatus],
      badgeLabel: STATUS_LABEL[args.badgeStatus],
    },
    template: `
      <span uiAvatar [size]="size">
        <img *ngIf="showImage" uiAvatarImage [src]="portrait" alt="Ada Lovelace" />
        <span uiAvatarFallback>{{ fallbackText }}</span>
        <span *ngIf="showBadge" uiAvatarBadge [class]="badgeClass" [attr.aria-label]="badgeLabel"></span>
      </span>
    `,
  }),
};

export default meta;
type Story = StoryObj<AvatarStoryArgs>;

export const Playground: Story = {};

/** Photo present — the image replaces the fallback once it loads. */
export const WithImage: Story = { args: { showImage: true } };

/**
 * The image is missing. The initials fallback fills the disc. Give initials
 * that convey identity; they inherit the muted disc and shrink in the small
 * size.
 */
export const Fallback: Story = { args: { showImage: false, fallbackText: 'GH' } };

/**
 * A broken or slow image. The radix root reports the load error and the
 * fallback stays in place — the user never sees a broken-image glyph. (The
 * `src` here points at a path that does not exist.)
 */
export const BrokenImage: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <span uiAvatar size="lg">
        <img uiAvatarImage src="/does-not-exist.png" alt="Ada Lovelace" />
        <span uiAvatarFallback>AL</span>
      </span>
    `,
  }),
};

/** The three sizes side by side. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex items-end gap-4">
        <span uiAvatar size="sm">
          <img uiAvatarImage src="${PORTRAIT_INDIGO}" alt="Ada Lovelace" />
          <span uiAvatarFallback>AL</span>
        </span>
        <span uiAvatar size="default">
          <img uiAvatarImage src="${PORTRAIT_AMBER}" alt="Grace Hopper" />
          <span uiAvatarFallback>GH</span>
        </span>
        <span uiAvatar size="lg">
          <img uiAvatarImage src="${PORTRAIT_GREEN}" alt="Katherine Johnson" />
          <span uiAvatarFallback>KJ</span>
        </span>
      </div>
    `,
  }),
};

/**
 * Presence badge bottom-right. The brand badge can carry a small glyph (a
 * verified check); presence-colour dots are glyph-less and hidden at the small
 * size by the registry rules. Each badge has an `aria-label`.
 */
export const WithBadge: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex items-end gap-4">
        <span uiAvatar size="lg">
          <img uiAvatarImage src="${PORTRAIT_INDIGO}" alt="Ada Lovelace" />
          <span uiAvatarFallback>AL</span>
          <span uiAvatarBadge aria-label="Verified">${CHECK_SVG}</span>
        </span>
        <span uiAvatar size="default">
          <img uiAvatarImage src="${PORTRAIT_AMBER}" alt="Grace Hopper" />
          <span uiAvatarFallback>GH</span>
          <span uiAvatarBadge class="bg-green-500" aria-label="Online"></span>
        </span>
        <span uiAvatar size="default">
          <span uiAvatarFallback>KJ</span>
          <span uiAvatarBadge class="bg-amber-500" aria-label="Away"></span>
        </span>
      </div>
    `,
  }),
};

/**
 * Overlapping cluster with a "+N" overflow count. Set the same `size` on each
 * avatar; the count derives its size from the group.
 */
export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div uiAvatarGroup>
        <span uiAvatar size="default">
          <img uiAvatarImage src="${PORTRAIT_INDIGO}" alt="Ada Lovelace" />
          <span uiAvatarFallback>AL</span>
        </span>
        <span uiAvatar size="default">
          <img uiAvatarImage src="${PORTRAIT_AMBER}" alt="Grace Hopper" />
          <span uiAvatarFallback>GH</span>
        </span>
        <span uiAvatar size="default">
          <span uiAvatarFallback>KJ</span>
        </span>
        <div uiAvatarGroupCount aria-label="3 more people">+3</div>
      </div>
    `,
  }),
};

/** Gallery — sizes, fallback, badge, and group together for visual review. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex items-end gap-4">
          <span uiAvatar size="sm">
            <img uiAvatarImage src="${PORTRAIT_INDIGO}" alt="Ada Lovelace" />
            <span uiAvatarFallback>AL</span>
          </span>
          <span uiAvatar size="default">
            <img uiAvatarImage src="${PORTRAIT_AMBER}" alt="Grace Hopper" />
            <span uiAvatarFallback>GH</span>
          </span>
          <span uiAvatar size="lg">
            <img uiAvatarImage src="${PORTRAIT_GREEN}" alt="Katherine Johnson" />
            <span uiAvatarFallback>KJ</span>
          </span>
          <span uiAvatar size="default">
            <span uiAvatarFallback>KJ</span>
          </span>
        </div>
        <div class="flex items-end gap-4">
          <span uiAvatar size="lg">
            <img uiAvatarImage src="${PORTRAIT_INDIGO}" alt="Ada Lovelace" />
            <span uiAvatarFallback>AL</span>
            <span uiAvatarBadge aria-label="Verified">${CHECK_SVG}</span>
          </span>
          <span uiAvatar size="default">
            <img uiAvatarImage src="${PORTRAIT_AMBER}" alt="Grace Hopper" />
            <span uiAvatarFallback>GH</span>
            <span uiAvatarBadge class="bg-green-500" aria-label="Online"></span>
          </span>
        </div>
        <div uiAvatarGroup>
          <span uiAvatar size="default">
            <img uiAvatarImage src="${PORTRAIT_INDIGO}" alt="Ada Lovelace" />
            <span uiAvatarFallback>AL</span>
          </span>
          <span uiAvatar size="default">
            <img uiAvatarImage src="${PORTRAIT_AMBER}" alt="Grace Hopper" />
            <span uiAvatarFallback>GH</span>
          </span>
          <span uiAvatar size="default">
            <span uiAvatarFallback>KJ</span>
          </span>
          <div uiAvatarGroupCount aria-label="3 more people">+3</div>
        </div>
      </div>
    `,
  }),
};
