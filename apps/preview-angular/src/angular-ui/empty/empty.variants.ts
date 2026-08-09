import { cva, type VariantProps } from "class-variance-authority"

export const emptyMediaVariants = cva(
  "cn-empty-media mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-empty-media-default",
        icon: "cn-empty-media-icon",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>
export type EmptyMediaVariant = NonNullable<EmptyMediaVariants["variant"]>
