import { Component } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"
import { Card, CardContent } from "@/angular-ui/card"

// apps/v4/examples/base/calendar-custom-days.tsx — range selection with a
// dropdown caption. React additionally renders per-day price labels via the
// `components.DayButton` override; the Angular calendar does not expose a day
// template hook yet, so that part is omitted.
@Component({
  selector: "preview-calendar-custom-days",
  standalone: true,
  imports: [Calendar, Card, CardContent],
  template: `
    <div uiCard class="mx-auto w-fit p-0">
      <div uiCardContent class="p-0">
        <!-- React version renders $100/$120 weekend price labels per day via
             components.DayButton; not supported by uiCalendar yet. -->
        <div
          uiCalendar
          mode="range"
          captionLayout="dropdown"
          class="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
        ></div>
      </div>
    </div>
  `,
})
export class CalendarCustomDaysComponent {}

export default CalendarCustomDaysComponent
