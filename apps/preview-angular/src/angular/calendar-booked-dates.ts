import { Component, signal } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"
import { Card, CardContent } from "@/angular-ui/card"

// apps/v4/examples/base/calendar-booked-dates.tsx — booked days are disabled.
//
// Deviation: React also strikes booked dates through via DayPicker's
// modifiers/modifiersClassNames; the Angular port has no modifier API, so
// only the disabled state is rendered (documented in the MDX Callout).
@Component({
  selector: "preview-calendar-booked-dates",
  standalone: true,
  imports: [Calendar, Card, CardContent],
  template: `
    <div uiCard class="mx-auto w-fit p-0">
      <div uiCardContent class="p-0">
        <div
          uiCalendar
          mode="single"
          [month]="jan12"
          [(selected)]="date"
          [disabled]="isBooked"
        ></div>
      </div>
    </div>
  `,
})
export class CalendarBookedDatesComponent {
  readonly jan12 = new Date(new Date().getFullYear(), 0, 6)
  readonly date = signal<Date | undefined>(this.jan12)
  private readonly bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 0, 12 + i),
  )
  isBooked = (date: Date): boolean =>
    this.bookedDates.some((d) => d.getTime() === new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime())
}

export default CalendarBookedDatesComponent
