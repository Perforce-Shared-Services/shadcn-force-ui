import { cva, type VariantProps } from "class-variance-authority"

export const toggleVariants = cva(
  "cn-toggle group/toggle inline-flex items-center justify-center whitespace-nowrap select-none outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "cn-toggle-variant-default",
        outline: "cn-toggle-variant-outline",
      },
      size: {
        default: "cn-toggle-size-default",
        sm: "cn-toggle-size-sm",
        lg: "cn-toggle-size-lg",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export type ToggleVariants = VariantProps<typeof toggleVariants>
export type ToggleVariant = NonNullable<ToggleVariants["variant"]>
export type ToggleSize = NonNullable<ToggleVariants["size"]>
