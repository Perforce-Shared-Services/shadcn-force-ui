import { cva, type VariantProps } from "class-variance-authority"

// Uses cn-badge-* tokens from style-force-ui.css.
// Angular-specific notes vs registry source (see DIVERGENCES.md):
// - Per-variant focus-visible:ring-{status}/20 omitted (WCAG 1.4.11 failure)
// - [&>svg]:fill-current added (Material Symbols are fill-based, not stroke)
export const badgeVariants = cva(
  "cn-badge group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:fill-current",
  {
    variants: {
      variant: {
        default: "cn-badge-variant-default",
        secondary: "cn-badge-variant-secondary",
        destructive: "cn-badge-variant-destructive",
        warning: "cn-badge-variant-warning",
        success: "cn-badge-variant-success",
        info: "cn-badge-variant-info",
        "success-solid": "cn-badge-variant-success-solid",
        "warning-solid": "cn-badge-variant-warning-solid",
        "info-solid": "cn-badge-variant-info-solid",
        "error-solid": "cn-badge-variant-error-solid",
        outline: "cn-badge-variant-outline",
        ghost: "cn-badge-variant-ghost",
        link: "cn-badge-variant-link",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
export type BadgeVariant = NonNullable<BadgeVariants["variant"]>
