import { Component, signal } from "@angular/core"

import { Calendar } from "@/angular-ui/calendar"
import { Card, CardContent, CardFooter } from "@/angular-ui/card"
import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/angular-ui/input-group"

// apps/v4/examples/base/calendar-time.tsx — calendar card with paired
// start/end time inputs in the footer.
@Component({
  selector: "preview-calendar-time",
  standalone: true,
  imports: [Calendar, Card, CardContent, CardFooter, Field, FieldGroup, FieldLabel, InputGroup, InputGroupAddon, InputGroupInput],
  template: `
    <div uiCard size="sm" class="mx-auto w-fit">
      <div uiCardContent>
        <div uiCalendar mode="single" class="p-0" [(selected)]="date"></div>
      </div>
      <div uiCardFooter class="border-t bg-card">
        <div uiFieldGroup>
          <div uiField>
            <label uiFieldLabel for="time-from">Start Time</label>
            <div uiInputGroup>
              <input
                uiInputGroupInput
                id="time-from"
                type="time"
                step="1"
                value="10:30:00"
                class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <div uiInputGroupAddon>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M513-492v-171q0-13-8.5-21.5T483-693q-13 0-21.5 8.5T453-663v183q0 6 2 11t6 10l144 149q9 10 22.5 9.5T650-310q9-9 9-22t-9-22L513-492ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z"/>
                </svg>
              </div>
            </div>
          </div>
          <div uiField>
            <label uiFieldLabel for="time-to">End Time</label>
            <div uiInputGroup>
              <input
                uiInputGroupInput
                id="time-to"
                type="time"
                step="1"
                value="12:30:00"
                class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <div uiInputGroupAddon>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M513-492v-171q0-13-8.5-21.5T483-693q-13 0-21.5 8.5T453-663v183q0 6 2 11t6 10l144 149q9 10 22.5 9.5T650-310q9-9 9-22t-9-22L513-492ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CalendarTimeComponent {
  readonly date = signal<Date | undefined>(new Date(new Date().getFullYear(), new Date().getMonth(), 12))
}

export default CalendarTimeComponent
