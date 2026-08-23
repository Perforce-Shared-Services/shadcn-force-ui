import { Component, signal } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"

// apps/v4/examples/base/calendar-rtl.tsx — right-to-left rendering. The
// React example drives dir/locale from the language-selector (ar); static
// dir="rtl" renders the same visual state (same convention as
// dropdown-menu-rtl.ts). Nav chevrons flip via the component's rtl:rotate-180.
@Component({
  selector: "preview-calendar-rtl",
  standalone: true,
  imports: [Calendar],
  template: `<div
    uiCalendar
    mode="single"
    class="rounded-lg border [--cell-size:--spacing(9)]"
    captionLayout="dropdown"
    dir="rtl"
    [(selected)]="date"
  ></div>`,
})
export class CalendarRtlComponent {
  readonly date = signal<Date | undefined>(new Date())
}

export default CalendarRtlComponent
