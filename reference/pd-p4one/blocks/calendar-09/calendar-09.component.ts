import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar, type DateRange } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-09` — "Calendar with disabled
 * weekends".
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. `mode="range"` across two
 * months; the primitive's own "snap month to initial selection" effect
 * covers the registry's `defaultMonth={dateRange?.from}` for free.
 *
 * The registry's `disabled={{ dayOfWeek: [0, 6] }}` matcher object is
 * reproduced with a plain `(date: Date) => boolean` predicate
 * (`isWeekend`) — the shape the ported primitive's `disabled` input expects,
 * in place of react-day-picker's matcher-object DSL.
 *
 * The registry's `excludeDisabled` (forces a range selection to skip over
 * disabled days rather than including them) has no equivalent on the ported
 * primitive and is dropped, matching the primitive's own documented gap
 * list — a range selected here may still span a disabled weekend day.
 */
@Component({
  selector: 'app-block-calendar-09',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      uiCalendar
      mode="range"
      [numberOfMonths]="2"
      [(selected)]="selected"
      [disabled]="isWeekend"
      class="rounded-lg border border-border shadow-sm"
    ></div>
  `,
})
export class Calendar09Component {
  protected readonly selected = signal<DateRange | undefined>({
    from: new Date(2025, 5, 17),
    to: new Date(2025, 5, 20),
  });

  protected readonly isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
}
