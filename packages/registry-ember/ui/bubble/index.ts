import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "./bubble"

export const bubbleVariants = cva(
  "cn-bubble group/bubble relative flex w-fit min-w-0 flex-col",
  {
    variants: {
      variant: {
        default: "cn-bubble-variant-default",
        secondary: "cn-bubble-variant-secondary",
        muted: "cn-bubble-variant-muted",
        tinted: "cn-bubble-variant-tinted",
        outline: "cn-bubble-variant-outline",
        ghost: "cn-bubble-variant-ghost",
        destructive: "cn-bubble-variant-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type BubbleVariants = VariantProps<typeof bubbleVariants>
