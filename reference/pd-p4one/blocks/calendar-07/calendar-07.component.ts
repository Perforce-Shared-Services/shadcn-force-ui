import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar, type DateRange } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-07` — "Range selection with
 * minimum and maximum days".
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. `mode="range"` across two
 * months; the primitive's own "snap month to initial selection" effect
 * covers the registry's `defaultMonth={dateRange?.from}` for free.
 *
 * The registry's `min={2}` / `max={20}` (minimum/maximum number of days a
 * range must span) have no equivalent on the ported primitive and are
 * dropped, matching the primitive's own documented gap list (see
 * `calendar-03`'s `max` note) — the caption text is kept verbatim but the
 * constraint isn't enforced.
 */
@Component({
  selector: 'app-block-calendar-07',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex min-w-0 flex-col gap-2">
      <div
        uiCalendar
        mode="range"
        [numberOfMonths]="2"
        [(selected)]="selected"
        class="rounded-lg border border-border shadow-sm"
      ></div>
      <div class="text-muted-foreground text-center text-xs">
        Your stay must be between 2 and 20 nights
      </div>
    </div>
  `,
})
export class Calendar07Component {
  protected readonly selected = signal<DateRange | undefined>({
    from: new Date(2025, 5, 18),
    to: new Date(2025, 6, 7),
  });
}
