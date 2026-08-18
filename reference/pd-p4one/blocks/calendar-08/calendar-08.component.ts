import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-08` — "Calendar with disabled
 * days".
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. `mode="single"`; the
 * primitive's own "snap month to initial selection" effect covers the
 * registry's `defaultMonth={date}` for free.
 *
 * The registry's `disabled={{ before: new Date(2025, 5, 12) }}` matcher
 * object has no direct equivalent — the primitive's `disabled` input takes a
 * plain `(date: Date) => boolean` predicate instead of react-day-picker's
 * matcher-object DSL, so the "before" semantics are reproduced with a
 * straight timestamp comparison in `isBeforeMinDate`.
 */
@Component({
  selector: 'app-block-calendar-08',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      uiCalendar
      mode="single"
      [(selected)]="selected"
      [disabled]="isBeforeMinDate"
      class="rounded-lg border border-border shadow-sm"
    ></div>
  `,
})
export class Calendar08Component {
  private readonly minDate = new Date(2025, 5, 12);

  protected readonly selected = signal<Date | undefined>(new Date(2025, 5, 12));

  protected readonly isBeforeMinDate = (date: Date): boolean => date.getTime() < this.minDate.getTime();
}
