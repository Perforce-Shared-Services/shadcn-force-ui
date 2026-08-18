import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-02` — "Multiple months with
 * single selection."
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. Same `mode="single"` shell as
 * `calendar-01`, with `numberOfMonths` bumped to 2; the primitive's own
 * "snap month to initial selection" effect covers the registry's
 * `defaultMonth={date}` for free, so it isn't set explicitly here.
 */
@Component({
  selector: 'app-block-calendar-02',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      uiCalendar
      mode="single"
      [numberOfMonths]="2"
      [(selected)]="selected"
      class="rounded-lg border border-border shadow-sm"
    ></div>
  `,
})
export class Calendar02Component {
  protected readonly selected = signal<Date | undefined>(new Date(2025, 5, 12));
}
