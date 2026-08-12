import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Spinner } from "./Spinner.vue"

export const spinnerVariants = cva("cn-spinner animate-spin", {
  variants: {
    color: {
      default: "cn-spinner-color-default",
      primary: "cn-spinner-color-primary",
      onPrimary: "cn-spinner-color-onPrimary",
      inherit: "cn-spinner-color-inherit",
    },
    size: {
      xs: "cn-spinner-size-xs",
      sm: "cn-spinner-size-sm",
      md: "cn-spinner-size-md",
      lg: "cn-spinner-size-lg",
    },
  },
  defaultVariants: {
    color: "default",
    size: "sm",
  },
})
export type SpinnerVariants = VariantProps<typeof spinnerVariants>
