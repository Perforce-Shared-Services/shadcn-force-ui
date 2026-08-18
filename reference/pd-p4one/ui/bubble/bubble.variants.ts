import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Mirrors the variant class strings published at
 *   https://shadcn-force-ui.vercel.app/r/styles/radix-force-ui/bubble.json
 * Reproduced verbatim except for the deliberate DS deviation below — parity
 * with the registry is the contract everywhere else.
 *
 * `Bubble` colors every `BubbleContent` slotted inside it via the
 * `*:data-[slot=bubble-content]:...` descendant selector, so a single
 * `variant` on the outer `Bubble` recolors its content without the content
 * component itself needing to know the variant.
 *
 * Deliberate DS deviation (audit-component, 2026-08-18, same precedent as
 * `button`/`badge` — see their variants files): the registry expresses hover/
 * tint states as computed opacity/`color-mix()`/`oklch(from ...)` formulas
 * with no semantic meaning, which fails WCAG 1.4.3 in dark mode (verified:
 * `text-destructive` on `bg-destructive/20` over `--card` computes to ~3.7:1,
 * below the 4.5:1 AA floor) and is inconsistent with every other ported
 * component. Rebound to the same real tokens already used everywhere else in
 * this codebase:
 * - `default` hover → `bg-primary-hover` (bg/primary-hover), not `bg-primary/80`.
 * - `tinted` resting → `bg-primary-subtle` (already theme-aware, no `dark:`
 *   override needed), not a hand-derived oklch mix. `tinted`'s hover clause is
 *   dropped rather than replaced — there is no `--primary-subtle-hover` token
 *   (nothing else in the DS needs an "already-tinted, now hover" state), and
 *   inventing one is out of scope for a component-level fix; flagged for a
 *   design/token reconciliation pass.
 * - `destructive` → `bg-error-subtle text-error` (bg/error-subtle + text/error,
 *   the AA-safe pairing), not `bg-destructive/10`. Hover mirrors `button`'s own
 *   destructive treatment (`hover:border-destructive`, using the `border
 *   border-transparent` already on `BubbleContent`) instead of a further
 *   opacity ramp with no token.
 * - `secondary`/`muted` hover → `bg-primary-subtle` (the DS-wide neutral-hover
 *   tint, same as `button`'s outline/secondary/ghost), not a `color-mix()`
 *   formula with no equivalent token.
 * - `muted` also gains an explicit `text-foreground` pairing (every other
 *   variant pairs an explicit foreground; `muted` previously left it to
 *   ambient inheritance, a silent contrast risk if nested in a differently
 *   colored ancestor).
 *
 * `group-data-[align=end]/message:self-end` targets a `group/message`
 * ancestor that does not exist in this component set (only `group/bubble` is
 * defined) — inert today, kept registry-verbatim as a forward-compat hook for
 * a future message-list wrapper component (`ui/message`, not yet ported).
 */
export const bubbleVariants = cva(
  'group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full',
  {
    variants: {
      variant: {
        default:
          '*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-hover',
        secondary:
          '*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-subtle',
        muted:
          '*:data-[slot=bubble-content]:bg-muted *:data-[slot=bubble-content]:text-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary-subtle',
        tinted:
          '*:data-[slot=bubble-content]:bg-primary-subtle *:data-[slot=bubble-content]:text-foreground',
        outline:
          '*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30',
        ghost:
          'border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50',
        destructive:
          '*:data-[slot=bubble-content]:bg-error-subtle *:data-[slot=bubble-content]:text-error [&>[data-slot=bubble-content]:is(button,a):hover]:border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BubbleVariants = VariantProps<typeof bubbleVariants>;
export type BubbleVariant = NonNullable<BubbleVariants['variant']>;
export type BubbleAlign = 'start' | 'end';

/**
 * `BubbleReactions` is a small pill anchored to a corner of its parent
 * `Bubble` (positioned `absolute`, so the parent needs `position: relative`
 * — `Bubble`'s own base class already provides that via `relative`).
 */
export const bubbleReactionsVariants = cva(
  'absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0',
  {
    variants: {
      side: {
        top: 'top-0 -translate-y-3/4',
        bottom: 'bottom-0 translate-y-3/4',
      },
      align: {
        start: 'left-3',
        end: 'right-3',
      },
    },
    defaultVariants: {
      side: 'bottom',
      align: 'end',
    },
  },
);

export type BubbleReactionsVariants = VariantProps<typeof bubbleReactionsVariants>;
export type BubbleReactionsSide = NonNullable<BubbleReactionsVariants['side']>;
export type BubbleReactionsAlign = NonNullable<BubbleReactionsVariants['align']>;
