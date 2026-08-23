import { cva, type VariantProps } from "class-variance-authority"

/**
 * Angular port of @force-ui/button-group's cva (radix-force-ui style).
 *
 * Uses `cn-button-group*` CSS tokens from style-force-ui.css — the build
 * pipeline expands them; never copy expanded Tailwind strings from p4one.
 *
 * The `has-[select[aria-hidden=true]:last-child]:...` and `[&>input]:flex-1`
 * selectors target sibling select/input hosts composed as direct children.
 * The `in-data-[slot=button-group]:rounded-lg` counterpart lives in
 * ui/button's own size axis, so `<button uiButton>` children need no extra
 * wiring to sit correctly inside this group.
 */
export const buttonGroupVariants = cva(
  "cn-button-group group/button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "cn-button-group-orientation-horizontal [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "cn-button-group-orientation-vertical flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
export type ButtonGroupOrientation = NonNullable<
  ButtonGroupVariants["orientation"]
>
