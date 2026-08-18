import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar, type DateRange } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-11` — "Start and end of month."
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. Structural reference: the
 * upstream registry's `Calendar11` (a range calendar showing two months,
 * bounded to June-July 2025, with a caption below explaining the open
 * window).
 *
 * Deviation: the registry passes react-day-picker's `disableNavigation`
 * (hides/disables the nav chevrons outright). `ui/calendar` has no such prop
 * — instead `fromDate`/`toDate` bounds already disable the prev/next buttons
 * once the displayed range reaches the boundary (see
 * `CalendarComponent.canGoToPreviousMonth`/`canGoToNextMonth`), which
 * produces the same practical effect here since `numberOfMonths="2"` already
 * shows the full June-July bound on load.
 */
@Component({
  selector: 'app-block-calendar-11',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex min-w-0 flex-col gap-2">
      <div
        uiCalendar
        mode="range"
        [(selected)]="dateRange"
        [numberOfMonths]="2"
        [fromDate]="fromDate"
        [toDate]="toDate"
        class="rounded-lg border border-border shadow-sm"></div>
      <div class="text-center text-xs text-muted-foreground">We are open in June and July only.</div>
    </div>
  `,
})
export class Calendar11Component {
  protected readonly fromDate = new Date(2025, 5, 1);
  protected readonly toDate = new Date(2025, 6, 31);

  protected readonly dateRange = signal<DateRange | undefined>({
    from: new Date(2025, 5, 17),
    to: new Date(2025, 5, 20),
  });
}
