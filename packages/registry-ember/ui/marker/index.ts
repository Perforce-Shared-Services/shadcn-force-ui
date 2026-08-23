import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { Marker, MarkerContent, MarkerIcon } from "./marker"

export const markerVariants = cva(
  "cn-marker group/marker relative flex w-full items-center",
  {
    variants: {
      variant: {
        default: "cn-marker-variant-default",
        separator: "cn-marker-variant-separator",
        border: "cn-marker-variant-border",
      },
    },
  },
)

export type MarkerVariants = VariantProps<typeof markerVariants>
