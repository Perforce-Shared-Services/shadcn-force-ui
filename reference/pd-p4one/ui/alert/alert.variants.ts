import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Tinted-callout alert — the canonical Force UI / shadcn alert treatment
 * (reference: shadcn-Force-UI Figma node 21169:22302). Each status variant is a
 * subtle status-tinted background with a status-coloured title + icon and a
 * NEUTRAL (muted) description. This is the "subtle callout" pattern, expressed
 * entirely through 6. FUI Semantic tokens — no hardcode, no amber one-offs.
 *
 * Per-element mapping:
 *   background  → bg-{status}-subtle  (--*-subtle ← 6. FUI bg/{status}-subtle)
 *   title+icon  → text-{status}       (inherited; icon = text-current)
 *   description → text-muted-foreground (set on AlertDescription, neutral)
 *   inline links → text-{status}       (variant-matched per Force spec alert
 *                  pattern; the description body stays muted, only links take
 *                  the status colour; always underlined for non-colour signal)
 *
 * Deviations from the bare registry string, all token-only:
 * - `border-border` added (this app has no global `*{border-color:var(--border)}`;
 *   bare `border` would fall back to currentColor — see the porting skill).
 * - `default` stays neutral (card surface); destructive uses `error` tokens
 *   (text-error = cranberry-700, AA on error-subtle — not the cranberry-500
 *   solid `destructive`).
 * - warning/success/info are P4 One status extensions (registry ships only
 *   default + destructive); same pattern.
 */
export const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border border-border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>[data-slot=alert-icon]]:grid-cols-[auto_1fr] has-[>[data-slot=alert-icon]]:gap-x-2 [&>[data-slot=alert-icon]]:row-span-2 [&>[data-slot=alert-icon]]:translate-y-0.5 [&>[data-slot=alert-icon]]:text-current",
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive: 'bg-error-subtle text-error [&_a]:text-error',
        warning: 'bg-warning-subtle text-warning [&_a]:text-warning',
        success: 'bg-success-subtle text-success [&_a]:text-success',
        info: 'bg-info-subtle text-info [&_a]:text-info',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
export type AlertVariant = NonNullable<AlertVariants['variant']>;
