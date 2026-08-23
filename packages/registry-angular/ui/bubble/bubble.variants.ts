import { cva, type VariantProps } from "class-variance-authority"

// [FORCE-UI] cn-bubble* tokens from style-force-ui.css — never expanded Tailwind.
export const bubbleVariants = cva("cn-bubble group/bubble relative flex w-fit min-w-0 flex-col", {
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
})

export const bubbleReactionsVariants = cva(
  // [FORCE-UI] [&_svg]:fill-current — Material Symbols are fill-based (DIVERGENCES.md §button-2)
  "[&_svg]:fill-current cn-bubble-reactions absolute z-10 flex w-fit items-center justify-center",
  {
    variants: {
      side: {
        top: "cn-bubble-reactions-side-top",
        bottom: "cn-bubble-reactions-side-bottom",
      },
      align: {
        start: "cn-bubble-reactions-align-start",
        end: "cn-bubble-reactions-align-end",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
)

export type BubbleVariant = VariantProps<typeof bubbleVariants>["variant"]
// align is not a CVA variant — it drives data-align + self-end alignment on the host
export type BubbleAlign = "start" | "end"
export type BubbleReactionsSide = VariantProps<typeof bubbleReactionsVariants>["side"]
export type BubbleReactionsAlign = VariantProps<typeof bubbleReactionsVariants>["align"]
