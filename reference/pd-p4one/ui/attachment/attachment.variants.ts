import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the variant + size class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/attachment.json
 * Reproduced verbatim — parity with the registry is the contract.
 *
 * `Attachment` is a bordered file/media card: a leading `AttachmentMedia`
 * (icon or image), `AttachmentContent` (title + description), and an
 * `AttachmentActions` slot — composed either standalone or inside an
 * `AttachmentGroup` horizontal scroller.
 *
 * Deviations from the registry (documented, app-compat additions):
 * - `border-border` added to the bare registry `border` — this app has no
 *   global `* { border-color: var(--border) }` (would bleed into Angular
 *   Material's own borders), so under Tailwind v4 an unspecified border color
 *   falls back to `currentColor`. Same fix as `card`/`item`.
 * - `data-[state=error]:border-error` replaces the registry's
 *   `border-destructive/30` — the Figma spec (28768:3897) binds this stroke
 *   to `base/error` at full opacity (#a30e1c), not a 30%-alpha tint of the
 *   lighter `destructive` (#d11323). Matches `AttachmentDescription`'s and
 *   `AttachmentMedia`'s error-state text/icon colour below — all three read
 *   the same token in the design file.
 * - `motion-reduce:transition-none` added to the registry `transition-colors`
 *   (hover/focus-within background + border changes) — WCAG 2.3.3, the same
 *   guard already applied to every other interactive-state transition in this
 *   codebase (`item`, `toggle`, `tabs`, …).
 */
export const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border border-border bg-card text-card-foreground transition-colors motion-reduce:transition-none focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-error data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default:
          'gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2',
        sm: 'gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5',
        xs: 'gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1',
      },
      orientation: {
        horizontal: 'min-w-40 items-center',
        vertical: 'w-24 flex-col has-data-[slot=attachment-content]:w-30',
      },
    },
    defaultVariants: {
      size: 'default',
      orientation: 'horizontal',
    },
  },
);

export type AttachmentVariants = VariantProps<typeof attachmentVariants>;
export type AttachmentSize = NonNullable<AttachmentVariants['size']>;
export type AttachmentOrientation = NonNullable<AttachmentVariants['orientation']>;

/** Lifecycle state — drives border/background color and the title's shimmer. */
export type AttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done';

/**
 * `AttachmentMedia` is the leading icon/image slot.
 *
 * `[&_svg]:fill-current` added to the base string per the app-wide icon
 * strategy (`ui/item`, `ui/button`, …): Material Symbols `<svg>`s carry no
 * `fill` attribute (fill-based, unlike Lucide's stroke set), so without it a
 * projected glyph paints black instead of inheriting the media slot's text
 * colour — including the error-state tint below.
 *
 * `bg-error-subtle` / `text-error` replace the registry's
 * `bg-destructive/10` / `text-destructive` for the error state — the Figma
 * spec (28768:3897) binds the media background to `base/error-subtle`
 * (#fdf5f6, a solid semantic-subtle fill, not a 10%-alpha mix) and the icon
 * to `base/error` (#a30e1c, the same darker "-700" token used on
 * `AttachmentDescription` and the card border), matching this codebase's
 * established rule of avoiding opacity hacks on status colours (see
 * `button.variants.ts`).
 *
 * `group-data-[size=sm]/attachment:[&_svg:not(...)]:size-3.5` added (audit
 * finding): the registry only steps the icon down at `size=xs`, leaving
 * `size=sm` pairing a 16px icon with the card's 12px (`text-xs`) type —
 * reuses the same `size-3.5` utility `xs` already applies, no new value.
 */
export const attachmentMediaVariants = cva(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[state=error]/attachment:bg-error-subtle group-data-[state=error]/attachment:text-error group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=sm]/attachment:[&_svg:not([class*='size-'])]:size-3.5 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        icon: '',
        image:
          'opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'icon',
    },
  },
);

export type AttachmentMediaVariants = VariantProps<typeof attachmentMediaVariants>;
export type AttachmentMediaVariant = NonNullable<AttachmentMediaVariants['variant']>;
