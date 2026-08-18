import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar, type DateRange } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-06` — "Range selection with
 * minimum days".
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. `mode="range"` at the default
 * `numberOfMonths` (1); the primitive's own "snap month to initial
 * selection" effect covers the registry's `defaultMonth={dateRange?.from}`
 * for free.
 *
 * The registry's `min={5}` (minimum number of days a range must span) has no
 * equivalent on the ported primitive and is dropped, matching the
 * primitive's own documented gap list (see `calendar-03`'s `max` note) — the
 * caption text is kept verbatim but the constraint isn't enforced.
 */
@Component({
  selector: 'app-block-calendar-06',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex min-w-0 flex-col gap-2">
      <div uiCalendar mode="range" [(selected)]="selected" class="rounded-lg border border-border shadow-sm"></div>
      <div class="text-muted-foreground text-center text-xs">A minimum of 5 days is required</div>
    </div>
  `,
})
export class Calendar06Component {
  protected readonly selected = signal<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 5, 26),
  });
}
