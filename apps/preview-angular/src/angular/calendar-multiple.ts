import { Component } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"
import { Card, CardContent } from "@/angular-ui/card"

// apps/v4/examples/base/calendar-multiple.tsx — select several days at once.
@Component({
  selector: "preview-calendar-multiple",
  standalone: true,
  imports: [Calendar, Card, CardContent],
  template: `
    <div uiCard class="mx-auto w-fit p-0">
      <div uiCardContent class="p-0">
        <div uiCalendar mode="multiple"></div>
      </div>
    </div>
  `,
})
export class CalendarMultipleComponent {}

export default CalendarMultipleComponent
