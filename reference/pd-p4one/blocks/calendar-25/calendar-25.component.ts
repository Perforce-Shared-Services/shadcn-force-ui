import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { CALENDAR_25_CHEVRON_DOWN_SVG } from './calendar-25.icons';

/**
 * Angular port of the shadcn Block `calendar-25` — "Date and Time range
 * picker."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/popover` +
 * `ui/button` + `ui/input` + `ui/label` primitives — no new cva, no new
 * tokens, no component-level SCSS. Structural reference: the upstream
 * registry's `Calendar25` (a full-width date-picker row identical to
 * `calendar-22`'s composition, stacked above a "From"/"To" pair of native
 * time `<input>`s).
 *
 * Popover auto-close on select: same reasoning as `calendar-22`/`calendar-26`
 * — `[rdxPopoverRoot]`'s `open` input is pushed `false → true` on trigger
 * click and `true → false` from the calendar's `selectedChange`, leaving
 * Escape/outside-click dismissal (which `externalControl` would disable)
 * intact.
 *
 * The time `<input>`s are uncontrolled (a static `value`, matching the
 * registry's `defaultValue`s) — the registry block is a reference
 * composition, not wired to real form state.
 */
@Component({
  selector: 'app-block-calendar-25',
  standalone: true,
  imports: [Button, Calendar, Input, Label, Popover, PopoverTrigger, PopoverContent, ...PopoverContentBox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <label uiLabel for="date" class="px-1">Date</label>
        <div rdxPopoverRoot [open]="open()">
          <button
            uiButton
            type="button"
            variant="outline"
            id="date"
            class="w-full justify-between font-normal"
            rdxPopoverTrigger
            (click)="open.set(true)"
          >
            {{ date() ? date()!.toLocaleDateString() : 'Select date' }}
            <span aria-hidden="true" [innerHTML]="chevronDownIcon"></span>
          </button>
          <ng-template rdxPopoverContent side="bottom" [sideOffset]="4" align="start">
            <div rdxPopoverContentAttributes class="w-auto overflow-hidden p-0">
              <div
                uiCalendar
                mode="single"
                [selected]="date()"
                captionLayout="dropdown"
                (selectedChange)="onSelect($event)"
              ></div>
            </div>
          </ng-template>
        </div>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col gap-3">
          <label uiLabel for="time-from" class="px-1">From</label>
          <input
            uiInput
            type="time"
            id="time-from"
            step="1"
            value="10:30:00"
            class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label uiLabel for="time-to" class="px-1">To</label>
          <input
            uiInput
            type="time"
            id="time-to"
            step="1"
            value="12:30:00"
            class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    </div>
  `,
})
export class Calendar25Component {
  protected readonly open = signal(false);
  protected readonly date = signal<Date | undefined>(undefined);

  protected readonly chevronDownIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CALENDAR_25_CHEVRON_DOWN_SVG,
  );

  protected onSelect(date: Date | undefined): void {
    this.date.set(date);
    this.open.set(false);
  }
}
