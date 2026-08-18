import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar } from '@/app/ui/calendar';
import { Card, CardContent, CardFooter } from '@/app/ui/card';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';

/**
 * Angular port of the shadcn Block `calendar-17` — "With time picker
 * inline."
 *
 * Pure composition of the already-ported `ui/calendar`, `ui/card`,
 * `ui/input`, and `ui/label` primitives — no new cva, no new tokens, no
 * component-level SCSS. Structural reference: the upstream registry's
 * `Calendar17` (a card wrapping a single-select calendar with a slightly
 * larger cell size, and a footer holding two visually-labelless (`sr-only`
 * label) `type="time"` inputs side by side, separated by a plain "-").
 *
 * The registry's `*:[div]:w-full` (every direct `div` child of the footer
 * stretches full width) is reproduced as `w-full` directly on each of the
 * two wrapper `div`s — equivalent result, no arbitrary child-selector needed
 * since there are only two such children in this template.
 *
 * The two time inputs are uncontrolled (native `value` attribute, matching
 * the registry's `defaultValue` — this is reference/demo code, not wired to
 * any submit handler; a consuming product owns its own state/validation).
 */
@Component({
  selector: 'app-block-calendar-17',
  standalone: true,
  imports: [Calendar, Card, CardContent, CardFooter, Input, Label],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div uiCard class="w-fit py-4">
      <div uiCardContent class="px-4">
        <div
          uiCalendar
          mode="single"
          [(selected)]="selected"
          class="bg-transparent p-0 [--cell-size:--spacing(10.5)]"
        ></div>
      </div>
      <div uiCardFooter class="flex gap-2 border-t px-4 !pt-4">
        <div class="w-full">
          <label uiLabel for="calendar-17-time-from" class="sr-only">Start Time</label>
          <input
            uiInput
            id="calendar-17-time-from"
            type="time"
            step="1"
            value="10:30:00"
            class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
        <span>-</span>
        <div class="w-full">
          <label uiLabel for="calendar-17-time-to" class="sr-only">End Time</label>
          <input
            uiInput
            id="calendar-17-time-to"
            type="time"
            step="1"
            value="12:30:00"
            class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    </div>
  `,
})
export class Calendar17Component {
  protected readonly selected = signal<Date | undefined>(new Date(2025, 5, 12));
}
