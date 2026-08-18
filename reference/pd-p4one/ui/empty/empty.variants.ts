import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the `emptyMediaVariants` class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/empty.json
 * Reproduced verbatim — parity with the registry is the contract.
 *
 * `EmptyMedia` is the icon/illustration slot above the title. Two variants:
 * - `default` — bare, transparent; for large illustrations / custom artwork.
 * - `icon` — a rounded `bg-muted` tile that frames a single glyph (sized
 *   `size-4` unless the projected svg sets its own size).
 *
 * `[&_svg]:fill-current` deviates by variant (a documented app-compat addition,
 * same rationale as button.variants.ts):
 * - `icon` ADDS it. This variant frames a single glyph and pins it to
 *   `text-foreground`. This app renders glyphs as Material Symbols `<svg>`,
 *   which carry NO `fill` attribute (fill-based, unlike Lucide's stroke set),
 *   so without `fill-current` the glyph paints black — invisible on the dark
 *   `bg-muted` tile in dark mode (WCAG 1.4.11). With it, the glyph inherits the
 *   tile's `text-foreground` and stays correct in both themes (matches Figma).
 * - `default` does NOT add it. It is a transparent wrapper for large
 *   illustrations / avatar imagery that carry their own multi-colour fills;
 *   forcing `fill-current` there would flatten them.
 * The registry omits `fill-current` entirely (its icons are Lucide); we add it
 * to `icon` only for the Material Symbols icon strategy.
 */
export const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>;
export type EmptyMediaVariant = NonNullable<EmptyMediaVariants['variant']>;
