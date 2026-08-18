import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Fill-variant axis for the input-group wrapper — mirrors `input`'s axis so a
 * grouped field can be outline / filled / underline / ghost too (P4 One
 * extension; the registry ships one style). Token-only, same treatment as
 * input.variants.ts:
 * - outline (default): light resting border-border -> hover border-input
 * - filled: same border tier + bg-muted (the fill carries identification)
 * - underline: bottom rule only (keeps border-input; the line is the affordance)
 * - ghost: borderless until hover/focus (inline-edit contexts)
 *
 * The base carries the group chrome that's shared across variants (the has-[]
 * focus-within / aria-invalid / addon-layout selectors); each variant only
 * swaps the border / radius / bg treatment. focus-within rebinds the border to
 * `border-ring` and aria-invalid to `border-destructive` regardless of variant.
 */
export const inputGroupVariants = cva(
  'group/input-group relative flex h-8 w-full min-w-0 items-center transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5',
  {
    variants: {
      variant: {
        outline:
          'rounded-lg border border-border hover:border-input has-disabled:bg-input/50 dark:bg-input/30 dark:has-disabled:bg-input/80',
        filled: 'rounded-lg border border-border hover:border-input bg-muted',
        underline: 'rounded-none border-0 border-b border-input',
        ghost: 'rounded-lg border border-transparent hover:bg-muted/50',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
);

export type InputGroupVariants = VariantProps<typeof inputGroupVariants>;
export type InputGroupVariant = NonNullable<InputGroupVariants['variant']>;
