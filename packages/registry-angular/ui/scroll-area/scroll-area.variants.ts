import { cva, type VariantProps } from "class-variance-authority"

/**
 * Which axis scrolls. `vertical` (default) and `horizontal` mirror the registry
 * `ScrollBar` orientation prop; `both` is a p4one extension for areas that
 * overflow on both axes.
 */
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both"

/**
 * Viewport classes. The base string is byte-matched to the canonical registry
 * React viewport (apps/v4/registry/bases/radix/ui/scroll-area.tsx).
 *
 * Divergence (see DIVERGENCES.md §scroll-area-1): the React component renders
 * radix's JS overlay scrollbar (`cn-scroll-area-scrollbar` /
 * `cn-scroll-area-thumb` tokens apply to those parts). There is no
 * `@radix-ng/primitives` scroll-area equivalent, so this port scrolls natively
 * and themes the browser scrollbar with the same token colours via
 * `scrollbar-width` / `scrollbar-color` instead. The overflow utilities are
 * applied per orientation because the host element — not a radix viewport
 * wrapper — does the scrolling.
 */
export const scrollAreaVariants = cva(
  "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 [scrollbar-width:thin] [scrollbar-color:var(--muted-foreground)_transparent]",
  {
    variants: {
      orientation: {
        vertical: "overflow-y-auto overflow-x-hidden",
        horizontal: "overflow-x-auto overflow-y-hidden",
        both: "overflow-auto",
      },
    },
    defaultVariants: { orientation: "vertical" },
  }
)

export type ScrollAreaOrientationVariant = NonNullable<
  VariantProps<typeof scrollAreaVariants>["orientation"]
>
