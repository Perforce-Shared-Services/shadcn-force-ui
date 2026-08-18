import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Card, CardContent, CardFooter } from '@/app/ui/card';

const TIME_SLOTS: readonly string[] = Array.from({ length: 37 }, (_, i) => {
  const totalMinutes = i * 15;
  const hour = Math.floor(totalMinutes / 60) + 9;
  const minute = totalMinutes % 60;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

const BOOKED_DATES: readonly Date[] = Array.from(
  { length: 3 },
  (_, i) => new Date(2025, 5, 17 + i),
);

/**
 * Angular port of the shadcn Block `calendar-20` — "With time presets."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/card` +
 * `ui/button` primitives — no new cva, no new tokens, no component-level
 * SCSS. Structural reference: the upstream registry's `Calendar20` (a
 * booking card: single-select calendar on the left, a scrollable column of
 * 15-minute time slots on the right, and a footer summarizing the picked
 * date/time with a "Continue" CTA).
 *
 * Two documented gaps versus the registry, both on the `ui/calendar`
 * primitive rather than something this block can compose around:
 * - `disabled={bookedDates}` (an array matcher) is reproduced as the
 *   `(date: Date) => boolean` predicate the primitive's `disabled` input
 *   expects (`isBooked`) — same pattern as `calendar-08`/`calendar-09`.
 * - `modifiers`/`modifiersClassNames` (strike through booked days while
 *   keeping them at full opacity) and the custom `formatters.formatWeekdayName`
 *   have no equivalent hook on the primitive — it exposes neither a
 *   modifier-class API nor a weekday-formatter override, so booked days
 *   render with the primitive's standard `disabled` styling (dimmed, not
 *   struck through) and weekday headers keep the primitive's fixed 2-letter
 *   labels instead of the registry's 3-letter "Mon"/"Tue" format.
 */
@Component({
  selector: 'app-block-calendar-20',
  standalone: true,
  imports: [Button, Calendar, Card, CardContent, CardFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div uiCard class="gap-0 p-0">
      <div uiCardContent class="relative p-0 md:pr-48">
        <div class="p-6">
          <div
            uiCalendar
            mode="single"
            [(selected)]="date"
            [disabled]="isBooked"
            [showOutsideDays]="false"
            class="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
          ></div>
        </div>
        <div
          class="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l"
        >
          <div class="grid gap-2">
            @for (time of timeSlots; track time) {
              <button
                uiButton
                type="button"
                [variant]="selectedTime() === time ? 'default' : 'outline'"
                class="w-full shadow-none"
                (click)="selectedTime.set(time)"
              >
                {{ time }}
              </button>
            }
          </div>
        </div>
      </div>
      <div uiCardFooter class="flex flex-col gap-4 border-t px-6 !py-5 md:flex-row">
        <div class="text-sm">
          @if (date() && selectedTime()) {
            Your meeting is booked for <span class="font-medium">{{ formattedDate() }}</span> at
            <span class="font-medium">{{ selectedTime() }}</span
            >.
          } @else {
            Select a date and time for your meeting.
          }
        </div>
        <button
          uiButton
          type="button"
          variant="outline"
          [disabled]="!date() || !selectedTime()"
          class="w-full md:ml-auto md:w-auto"
        >
          Continue
        </button>
      </div>
    </div>
  `,
})
export class Calendar20Component {
  protected readonly timeSlots = TIME_SLOTS;

  protected readonly date = signal<Date | undefined>(new Date(2025, 5, 12));
  protected readonly selectedTime = signal<string | null>('10:00');

  protected readonly isBooked = (date: Date): boolean =>
    BOOKED_DATES.some(
      (booked) =>
        booked.getFullYear() === date.getFullYear() &&
        booked.getMonth() === date.getMonth() &&
        booked.getDate() === date.getDate(),
    );

  protected formattedDate(): string {
    const value = this.date();
    return value
      ? value.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
      : '';
  }
}
