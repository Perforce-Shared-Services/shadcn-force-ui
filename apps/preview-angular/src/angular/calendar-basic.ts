import { Component } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"

// apps/v4/examples/base/calendar-basic.tsx — plain single-select calendar.
@Component({
  selector: "preview-calendar-basic",
  standalone: true,
  imports: [Calendar],
  template: `<div uiCalendar mode="single" class="rounded-lg border"></div>`,
})
export class CalendarBasicComponent {}

export default CalendarBasicComponent
