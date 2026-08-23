import { Component, signal } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { Calendar } from "@/angular-ui/calendar"
import { Card, CardContent, CardFooter } from "@/angular-ui/card"

// apps/v4/examples/base/calendar-presets.tsx — compact calendar in a card
// with quick-preset day buttons in the footer.
@Component({
  selector: "preview-calendar-presets",
  standalone: true,
  imports: [Button, Calendar, Card, CardContent, CardFooter],
  template: `
    <div uiCard size="sm" class="mx-auto w-fit max-w-[300px]">
      <div uiCardContent>
        <div
          uiCalendar
          mode="single"
          class="p-0 [--cell-size:--spacing(9.5)]"
          [(selected)]="date"
          [(month)]="currentMonth"
        ></div>
      </div>
      <div uiCardFooter class="flex flex-wrap gap-2 border-t">
        @for (preset of presets; track preset.value) {
          <button uiButton variant="outline" size="sm" class="flex-1" (click)="applyPreset(preset.value)">
            {{ preset.label }}
          </button>
        }
      </div>
    </div>
  `,
})
export class CalendarPresetsComponent {
  readonly presets = [
    { label: "Today", value: 0 },
    { label: "Tomorrow", value: 1 },
    { label: "In 3 days", value: 3 },
    { label: "In a week", value: 7 },
    { label: "In 2 weeks", value: 14 },
  ]
  readonly date = signal<Date | undefined>(new Date(new Date().getFullYear(), 1, 12))
  readonly currentMonth = signal<Date>(new Date(new Date().getFullYear(), new Date().getMonth(), 1))

  applyPreset(days: number): void {
    const next = new Date()
    next.setDate(next.getDate() + days)
    this.date.set(next)
    this.currentMonth.set(new Date(next.getFullYear(), next.getMonth(), 1))
  }
}

export default CalendarPresetsComponent
