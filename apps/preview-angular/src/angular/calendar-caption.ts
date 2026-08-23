import { Component } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"

// apps/v4/examples/base/calendar-caption.tsx — month/year dropdown captions.
@Component({
  selector: "preview-calendar-caption",
  standalone: true,
  imports: [Calendar],
  template: `<div uiCalendar mode="single" captionLayout="dropdown" class="rounded-lg border"></div>`,
})
export class CalendarCaptionComponent {}

export default CalendarCaptionComponent
