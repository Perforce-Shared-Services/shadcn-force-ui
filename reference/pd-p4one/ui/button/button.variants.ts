import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the variant + size class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/button.json
 * The upstream `.vue`/`.tsx` authoring source uses `cn-button-*` placeholders;
 * the registry build step replaces them with the expanded Tailwind class
 * strings reproduced here verbatim. Do not edit values without updating both
 * sides — parity with the registry is the contract.
 *
 * Deliberate DS deviations from the registry (approved, mirrored to Figma):
 * Interactive/status states bind to SEMANTIC tokens (Force "6. FUI Semantic"
 * via "3. Mode" base/*), not opacity hacks on base colours — the registry's
 * `/80`, `/20`, `destructive/10` approach failed WCAG AA and was invisible in
 * dark (the reconciled dark neutrals differ by ~1.06 contrast). All values are
 * the spec's AA-verified tokens:
 * - hover (solid) → `hover:bg-primary-hover` (bg/primary-hover, indigo-600/200).
 * - hover (neutral: outline/secondary/ghost) → `hover:bg-primary-subtle`
 *   (bg/primary-subtle) — a visible on-brand tint in both themes, where a
 *   neutral hover was imperceptible in dark.
 * - destructive is a tinted-status surface: `bg-error-subtle text-error`
 *   (bg/error-subtle + text/error) — the solid `destructive` colour fails AA as
 *   text-on-tint; hover surfaces a `border-destructive` edge.
 * - link text → `text-link` (text/link, indigo-500/200) — `text-primary` was
 *   < AA in dark.
 * - pressed feedback is `active:opacity-60` (matches Figma `State=Pressed`,
 *   whole control at 60%) instead of the registry's `translate-y-px`.
 * - disabled uses `bg-muted` + `text-muted-foreground` (NOT the shadcn/registry
 *   `opacity-50`). Per the Force spec button pattern: an opacity multiplier on
 *   disabled compounds with the muted tokens and renders the control nearly
 *   invisible in dark mode, so disabled is expressed via dedicated tokens.
 * - icons are inline Material Symbols `<svg>` (see button.icons.ts), so the
 *   registry's `[&_svg]` size rules drive them directly; `[&_svg]:fill-current`
 *   is added because the Material Symbols SVGs carry no `fill` attribute (they
 *   are fill-based, unlike Lucide's stroke-based set) and would otherwise paint
 *   black instead of inheriting the button's text colour.
 * - ghost and outline resting (Default) and Focus text/icon colour is
 *   `text-muted-foreground` (NOT the registry's implicit inherited
 *   `foreground`) — both stay visually quiet at rest and on keyboard focus;
 *   hover/aria-expanded (open) still brightens to `text-foreground` for
 *   feedback. Mirrored to the Figma master component's Ghost and Outline
 *   Default + Focus variants (all sizes).
 */
export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:opacity-60 disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        outline:
          'text-muted-foreground border-border bg-background hover:bg-primary-subtle hover:text-foreground focus-visible:text-muted-foreground aria-expanded:bg-primary-subtle aria-expanded:text-foreground dark:border-input dark:bg-input/30',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-primary-subtle aria-expanded:bg-primary-subtle aria-expanded:text-secondary-foreground',
        ghost:
          'text-muted-foreground hover:bg-primary-subtle hover:text-foreground focus-visible:text-muted-foreground aria-expanded:bg-primary-subtle aria-expanded:text-foreground',
        destructive:
          'bg-error-subtle text-error hover:border-destructive focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        link: 'text-link underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariants['variant']>;
export type ButtonSize = NonNullable<ButtonVariants['size']>;
