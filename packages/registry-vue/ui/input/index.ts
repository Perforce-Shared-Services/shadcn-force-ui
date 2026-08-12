import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Input } from "./Input.vue"

export const inputVariants = cva(
  "cn-input w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        outline: "cn-input-variant-outline",
        filled: "cn-input-variant-filled",
        underline: "cn-input-variant-underline",
        ghost: "cn-input-variant-ghost",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)
export type InputVariants = VariantProps<typeof inputVariants>
