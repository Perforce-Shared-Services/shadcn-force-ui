import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar, type DateRange } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-21` — "Custom days and
 * formatters."
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. Structural reference: the
 * upstream registry's `Calendar21` (a range calendar with a month/year
 * dropdown caption).
 *
 * Two documented gaps versus the registry, both on the `ui/calendar`
 * primitive rather than something this block can compose around:
 * - `components={{ DayButton: ... }}` (rendering a per-day weekday/weekend
 *   price annotation below the day number via the exported
 *   `CalendarDayButton`) has no equivalent — the primitive's day cell markup
 *   is internal to its own template with no projection slot, so the price
 *   labels are dropped; this block renders a plain range calendar instead.
 * - `formatters.formatMonthDropdown` (full month name, e.g. "June") has no
 *   override hook either — the primitive's dropdown caption always shows the
 *   abbreviated month name (see `CalendarComponent.monthOnlyLabel`).
 */
@Component({
  selector: 'app-block-calendar-21',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      uiCalendar
      mode="range"
      [(selected)]="range"
      [numberOfMonths]="1"
      captionLayout="dropdown"
      class="rounded-lg border border-border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]"
    ></div>
  `,
})
export class Calendar21Component {
  protected readonly range = signal<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 5, 17),
  });
}
