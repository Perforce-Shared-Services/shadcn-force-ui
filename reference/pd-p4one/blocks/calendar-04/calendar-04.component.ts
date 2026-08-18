import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar, type DateRange } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-04` — "Single month with range
 * selection."
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. `mode="range"` at the default
 * `numberOfMonths` (1); the primitive's own "snap month to initial
 * selection" effect covers the registry's `defaultMonth={dateRange?.from}`
 * for free.
 */
@Component({
  selector: 'app-block-calendar-04',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div uiCalendar mode="range" [(selected)]="selected" class="rounded-lg border border-border shadow-sm"></div>
  `,
})
export class Calendar04Component {
  protected readonly selected = signal<DateRange | undefined>({
    from: new Date(2025, 5, 9),
    to: new Date(2025, 5, 26),
  });
}
