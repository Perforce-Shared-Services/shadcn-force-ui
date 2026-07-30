import { cva, type VariantProps } from "class-variance-authority"

// Uses cn-button-* tokens from style-force-ui.css.
// Angular-specific notes vs registry source (see DIVERGENCES.md):
// - disabled:opacity-50 omitted (dead — overridden by cn-button CSS disabled:opacity-100!)
// - [&_svg]:fill-current added (Material Symbols are fill-based, not stroke)
export const buttonVariants = cva(
  "cn-button group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current",
  {
    variants: {
      variant: {
        default: "cn-button-variant-default",
        outline: "cn-button-variant-outline",
        secondary: "cn-button-variant-secondary",
        ghost: "cn-button-variant-ghost",
        destructive: "cn-button-variant-destructive",
        link: "cn-button-variant-link",
      },
      size: {
        default: "cn-button-size-default",
        xs: "cn-button-size-xs",
        sm: "cn-button-size-sm",
        lg: "cn-button-size-lg",
        icon: "cn-button-size-icon",
        "icon-xs": "cn-button-size-icon-xs",
        "icon-sm": "cn-button-size-icon-sm",
        "icon-lg": "cn-button-size-icon-lg",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
export type ButtonVariant = NonNullable<ButtonVariants["variant"]>
export type ButtonSize = NonNullable<ButtonVariants["size"]>
