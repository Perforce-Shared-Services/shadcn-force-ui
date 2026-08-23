import { cva, type VariantProps } from "class-variance-authority"

/**
 * Slot inside an input group for icons, buttons, text, or kbd. Uses
 * cn-input-group-addon-* tokens from style-force-ui.css; align variants layer
 * order/width on top of the token classes (same split as the React source).
 */
export const inputGroupAddonVariants = cva(
  "cn-input-group-addon flex cursor-text items-center justify-center select-none",
  {
    variants: {
      align: {
        "inline-start": "cn-input-group-addon-align-inline-start order-first", // [FORCE-UI]
        "inline-end": "cn-input-group-addon-align-inline-end order-last", // [FORCE-UI]
        "block-start": "cn-input-group-addon-align-block-start order-first w-full justify-start", // [FORCE-UI]
        "block-end": "cn-input-group-addon-align-block-end order-last w-full justify-start", // [FORCE-UI]
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

export type InputGroupAddonVariants = VariantProps<typeof inputGroupAddonVariants>
export type InputGroupAddonAlign = NonNullable<InputGroupAddonVariants["align"]>
