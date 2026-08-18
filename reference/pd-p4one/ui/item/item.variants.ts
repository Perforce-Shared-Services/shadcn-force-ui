import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the variant + size class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/item.json
 * Reproduced verbatim — parity with the registry is the contract.
 *
 * `Item` is a generic list-row primitive: a bordered row that groups
 * `ItemMedia` + `ItemContent` (title/description) + `ItemActions`.
 *
 * `motion-reduce:transition-none` is added (an app-compat addition over the
 * registry string, matching the guard already applied to every other
 * interactive-state transition in this codebase — `toggle`, `tabs`,
 * `pagination`, `tooltip`, `menubar`, `navigation-menu` — per WCAG 2.3.3). One
 * instance covers every `transition-*` utility on the node (it sets
 * `transition-property: none`), including the `[a]:hover:bg-muted` clause:
 * `Item` is explicitly designed to be hosted on an `<a>`, so a clickable row
 * list would otherwise animate a background-color change on every hover
 * regardless of the user's prefers-reduced-motion setting.
 *
 * Status/semantic state (error, conflict, pending) belongs on a `Badge` or
 * icon composed inside `ItemContent`/`ItemActions` — do not add a semantic
 * `variant` (e.g. `"error"`) here; `Item`'s variants are visual-tier only
 * (`default`/`outline`/`muted`), never status color.
 */
export const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center rounded-lg border text-sm transition-colors duration-100 motion-reduce:transition-none outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",
  {
    variants: {
      variant: {
        default: 'border-transparent',
        outline: 'border-border',
        muted: 'border-transparent bg-muted/50',
      },
      size: {
        default: 'gap-2.5 px-3 py-2.5',
        sm: 'gap-2.5 px-3 py-2.5',
        xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ItemVariants = VariantProps<typeof itemVariants>;
export type ItemVariant = NonNullable<ItemVariants['variant']>;
export type ItemSize = NonNullable<ItemVariants['size']>;

/**
 * `ItemMedia` is the leading icon/avatar/image slot. `icon` adds
 * `[&_svg]:fill-current` (an app-compat addition, same rationale as
 * `empty.variants.ts`): this app renders glyphs as Material Symbols `<svg>`,
 * which carry NO `fill` attribute (fill-based, unlike Lucide's stroke set),
 * so without it the glyph paints black instead of inheriting the row's text
 * colour. `default` and `image` are left registry-verbatim — `default` is a
 * bare wrapper that may carry multi-colour avatar imagery, and `image` wraps
 * an `<img>`, which `[&_svg]` never matches anyway.
 */
export const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "[&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>;
export type ItemMediaVariant = NonNullable<ItemMediaVariants['variant']>;
