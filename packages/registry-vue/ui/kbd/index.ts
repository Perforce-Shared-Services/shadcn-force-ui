import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Kbd } from "./Kbd.vue"
export { default as KbdGroup } from "./KbdGroup.vue"

export const kbdVariants = cva(
  "cn-kbd pointer-events-none inline-flex items-center justify-center select-none",
  {
    variants: {
      variant: {
        default: "cn-kbd-variant-default",
        primary: "cn-kbd-variant-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
export type KbdVariants = VariantProps<typeof kbdVariants>
