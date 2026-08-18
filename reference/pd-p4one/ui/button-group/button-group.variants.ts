import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/button-group.json
 * copied verbatim — parity with the registry is the contract. The
 * `has-[select[aria-hidden=true]:last-child]:...` and `[&>input]:flex-1`
 * selectors target sibling `ui/select` / `ui/input` hosts composed as direct
 * children; the `in-data-[slot=button-group]:rounded-lg` counterpart already
 * lives in `ui/button`'s own `buttonVariants` (size axis), so children need no
 * button-group-specific override.
 */
export const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
      },
    },
    defaultVariants: { orientation: 'horizontal' },
  },
);

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
export type ButtonGroupOrientation = NonNullable<ButtonGroupVariants['orientation']>;
