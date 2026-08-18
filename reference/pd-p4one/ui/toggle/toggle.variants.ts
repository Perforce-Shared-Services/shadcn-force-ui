import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the variant + size class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/toggle.json
 *
 * Deliberate deviations from the registry:
 * - `transition-all` → `transition-colors` (only colour changes; no layout shift)
 *   with `motion-reduce:transition-none` guard (WCAG 2.3.3).
 * - `[&_svg]:fill-current` added — Material Symbols SVGs carry no `fill` attr
 *   and would render black without explicit currentColor inheritance.
 * - `select-none` added — matches the button house style so double-clicking a
 *   labelled toggle activates it instead of selecting the label text.
 */
export const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap select-none transition-colors motion-reduce:transition-none outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-border bg-transparent hover:bg-muted',
      },
      size: {
        default: 'h-8 min-w-8 px-2',
        sm: 'h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-1.5 text-[0.8rem]',
        lg: 'h-9 min-w-9 px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;
export type ToggleVariant = NonNullable<ToggleVariants['variant']>;
export type ToggleSize = NonNullable<ToggleVariants['size']>;
