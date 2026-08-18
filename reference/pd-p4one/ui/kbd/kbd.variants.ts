import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Kbd class strings. The base is the @force-ui/kbd registry string (verbatim,
 * minus the bg/text colour which moves into the `variant`).
 *
 * Variant is a Figma extension (the registry ships only the muted style):
 * - `default` — muted pill on a light surface (`bg-muted` / `text-muted-foreground`).
 * - `primary` — translucent pill for placement ON a solid/brand surface (e.g.
 *   inside a `default` button or a tooltip): `bg-background/20 text-background
 *   dark:bg-background/10`. These are the exact classes the registry applies via
 *   `in-data-[slot=tooltip-content]:*`, lifted into a reusable variant and
 *   matching the Figma `Background=Primary` variant.
 *
 * Icon sizing: a projected glyph is an inline Material Symbols `<svg>` (imported
 * from `@material-symbols/svg-400` via the `?raw` rule). The registry's
 * `[&_svg]:size-3` rule sizes it; `[&_svg]:fill-current` makes it inherit the
 * key's text colour (the Material Symbols SVGs carry no `fill` attribute).
 */
export const kbdVariants = cva(
  "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        default: 'bg-muted text-muted-foreground',
        primary: 'bg-background/20 text-background dark:bg-background/10',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export type KbdVariants = VariantProps<typeof kbdVariants>;
export type KbdVariant = NonNullable<KbdVariants['variant']>;
