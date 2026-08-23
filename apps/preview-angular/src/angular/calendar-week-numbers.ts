import { Component, signal } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"
import { Card, CardContent } from "@/angular-ui/card"

// apps/v4/examples/base/calendar-week-numbers.tsx — leading ISO week-number column.
@Component({
  selector: "preview-calendar-week-numbers",
  standalone: true,
  imports: [Calendar, Card, CardContent],
  template: `
    <div uiCard class="mx-auto w-fit p-0">
      <div uiCardContent class="p-0">
        <div uiCalendar mode="single" showWeekNumber [(selected)]="date"></div>
      </div>
    </div>
  `,
})
export class CalendarWeekNumbersComponent {
  private readonly jan12 = new Date(new Date().getFullYear(), 0, 12)
  readonly date = signal<Date | undefined>(this.jan12)
}

export default CalendarWeekNumbersComponent
