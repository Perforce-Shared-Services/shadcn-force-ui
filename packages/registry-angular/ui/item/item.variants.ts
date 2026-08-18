import { cva, type VariantProps } from "class-variance-authority"

// Uses cn-item* tokens from style-force-ui.css. Ported 1:1 from the registry
// React source (apps/v4/registry/bases/radix/ui/item.tsx), which is the
// canonical class-name source of truth.
//
// Angular-specific note vs registry source (see DIVERGENCES.md §item-2):
// - [&_svg]:fill-current added to the root base. .cn-item-media-variant-icon
//   already carries it, but icons also appear outside that scope (ItemActions,
//   ItemMedia's default variant), and Material Symbols are fill-based.
export const itemVariants = cva(
  "cn-item group/item flex w-full flex-wrap items-center transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [&_svg]:fill-current",
  {
    variants: {
      variant: {
        default: "cn-item-variant-default",
        outline: "cn-item-variant-outline",
        muted: "cn-item-variant-muted",
      },
      size: {
        default: "cn-item-size-default",
        sm: "cn-item-size-sm",
        xs: "cn-item-size-xs",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export type ItemVariants = VariantProps<typeof itemVariants>
export type ItemVariant = NonNullable<ItemVariants["variant"]>
export type ItemSize = NonNullable<ItemVariants["size"]>

export const itemMediaVariants = cva(
  "cn-item-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "cn-item-media-variant-default",
        icon: "cn-item-media-variant-icon",
        image: "cn-item-media-variant-image",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>
export type ItemMediaVariant = NonNullable<ItemMediaVariants["variant"]>
