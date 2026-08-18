import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-03` — "Multiple months with
 * multiple selection."
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. `mode="multiple"` across two
 * months; the primitive's own "snap month to initial selection" effect
 * covers the registry's `defaultMonth={dates[0]}` for free.
 *
 * Two registry props have no equivalent on the ported primitive and are
 * dropped, matching the primitive's own documented gap list:
 * - `required` (can't deselect down to an empty array in single/multiple
 *   mode) — not implemented on `ui/calendar`.
 * - `max={5}` (cap on selection count) — not implemented on `ui/calendar`.
 */
@Component({
  selector: 'app-block-calendar-03',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      uiCalendar
      mode="multiple"
      [numberOfMonths]="2"
      [(selected)]="selected"
      class="rounded-lg border border-border shadow-sm"
    ></div>
  `,
})
export class Calendar03Component {
  protected readonly selected = signal<Date[] | undefined>([
    new Date(2025, 5, 12),
    new Date(2025, 6, 24),
  ]);
}
