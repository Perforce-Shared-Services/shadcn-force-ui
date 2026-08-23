import { cva, type VariantProps } from "class-variance-authority"

// Uses cn-marker-* tokens from style-force-ui.css.
// Angular-specific notes vs registry source (see DIVERGENCES.md):
// - `[a]:transition-colors [a]:motion-reduce:transition-none` (WCAG 2.3.3) and
//   `[a]:outline-none [a]:focus-visible:ring-3 [a]:focus-visible:ring-ring/50`
//   (WCAG 2.4.7) are p4one app-compat a11y fixes kept inline at component
//   level: the preview shell resets `*:focus { outline: none }`, so an anchor-
//   hosted marker would otherwise have no visible focus indicator, and hover
//   color changes would ignore prefers-reduced-motion.
export const markerVariants = cva(
  "cn-marker group/marker relative flex w-full items-center [a]:transition-colors [a]:motion-reduce:transition-none [a]:outline-none [a]:focus-visible:ring-3 [a]:focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "cn-marker-variant-default",
        separator: "cn-marker-variant-separator",
        border: "cn-marker-variant-border",
      },
    },
    defaultVariants: { variant: "default" }
  }
)

export type MarkerVariants = VariantProps<typeof markerVariants>
export type MarkerVariant = NonNullable<MarkerVariants["variant"]>
