import { Component, signal } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"

// apps/v4/examples/base/calendar-demo.tsx — single-select with the dropdown
// caption (month/year selects), preselected to today.
@Component({
  selector: "preview-calendar-demo",
  standalone: true,
  imports: [Calendar],
  template: `<div uiCalendar mode="single" class="rounded-lg border" captionLayout="dropdown" [(selected)]="date"></div>`,
})
export class CalendarDemoComponent {
  readonly date = signal<Date | undefined>(new Date())
}

export default CalendarDemoComponent
