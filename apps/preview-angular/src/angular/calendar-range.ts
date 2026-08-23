import { Component, signal } from "@angular/core"

import { Calendar, type DateRange } from "@/angular-ui/calendar"

// apps/v4/examples/base/calendar-range.tsx — date-range selection across two
// months, seeded with Jan 12 → +30 days of the current year.
@Component({
  selector: "preview-calendar-range",
  standalone: true,
  imports: [Calendar],
  template: `<div
    uiCalendar
    mode="range"
    class="rounded-lg border"
    [numberOfMonths]="2"
    [(selected)]="range"
  ></div>`,
})
export class CalendarRangeComponent {
  private readonly jan12 = new Date(new Date().getFullYear(), 0, 12)
  readonly range = signal<DateRange | undefined>({ from: this.jan12, to: this.addDays(this.jan12, 30) })
  // The calendar opens on the month containing `from` once selection arrives;
  // `[(month)]` stays user-driven afterwards.
  readonly month = signal<Date>(this.jan12)

  private addDays(date: Date, amount: number): Date {
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    next.setDate(next.getDate() + amount)
    return next
  }
}

export default CalendarRangeComponent
