import { Component } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"

// apps/v4/examples/base/calendar-hijri.tsx — single-date selection rendered
// with the Vazirmatn Arabic typeface. React uses react-day-picker/persian for
// an actual Hijri calendar; the Angular calendar keeps Gregorian dates and
// only reproduces the locale typography.
@Component({
  selector: "preview-calendar-hijri",
  standalone: true,
  imports: [Calendar],
  template: `
    <!-- React uses DayPicker from "react-day-picker/persian" for Hijri dates;
         uiCalendar has no persian locale support yet. -->
    <div class="[font-family:Vazirmatn,'Noto_Sans_Arabic',sans-serif]" dir="rtl">
      <div uiCalendar mode="single" [month]="defaultMonth" class="rounded-lg border"></div>
    </div>
  `,
})
export class CalendarHijriComponent {
  readonly defaultMonth = new Date(2025, 5, 12)
}

export default CalendarHijriComponent
