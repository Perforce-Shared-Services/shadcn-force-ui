import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-14` — "With Booked/Unavailable
 * Days."
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. `mode="single"` with a fixed
 * set of "booked" dates (June 15-26, 2025) passed through as the primitive's
 * `disabled` matcher function.
 *
 * The registry's `modifiers`/`modifiersClassNames` (`booked: "[&>button]:
 * line-through opacity-100"`, layered on TOP of the disabled state to
 * visually distinguish "booked" from a plain out-of-range disabled day) has
 * no equivalent on the ported primitive and is dropped, matching the
 * primitive's own documented gap list (see `calendar-03`'s `max` note) —
 * booked days still read as unavailable via the primitive's built-in
 * disabled styling (muted text, reduced opacity, no pointer events), just
 * without the extra strikethrough treatment.
 */
@Component({
  selector: 'app-block-calendar-14',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      uiCalendar
      mode="single"
      [(selected)]="selected"
      [disabled]="isBooked"
      class="rounded-lg border border-border shadow-sm"
    ></div>
  `,
})
export class Calendar14Component {
  protected readonly selected = signal<Date | undefined>(new Date(2025, 5, 12));

  private readonly bookedDates = Array.from(
    { length: 12 },
    (_, i) => new Date(2025, 5, 15 + i),
  );

  protected readonly isBooked = (date: Date): boolean =>
    this.bookedDates.some((booked) => booked.toDateString() === date.toDateString());
}
