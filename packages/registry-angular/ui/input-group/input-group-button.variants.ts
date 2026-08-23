import { cva, type VariantProps } from "class-variance-authority"

/**
 * Compact button sizes inside an addon. Uses cn-input-group-button-* tokens
 * from style-force-ui.css. `sm` maps to its token name for parity with the
 * registry source; no token is defined for it (it renders unstyled), same as
 * React.
 */
export const inputGroupButtonVariants = cva(
  "cn-input-group-button flex items-center shadow-none",
  {
    variants: {
      size: {
        xs: "cn-input-group-button-size-xs", // [FORCE-UI]
        sm: "cn-input-group-button-size-sm", // [FORCE-UI]
        "icon-xs": "cn-input-group-button-size-icon-xs", // [FORCE-UI]
        "icon-sm": "cn-input-group-button-size-icon-sm", // [FORCE-UI]
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

export type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>
export type InputGroupButtonSize = NonNullable<InputGroupButtonVariants["size"]>
