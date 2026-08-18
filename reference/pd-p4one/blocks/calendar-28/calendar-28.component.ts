import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { CALENDAR_28_CALENDAR_SVG } from './calendar-28.icons';

const INITIAL_DATE = new Date('2025-06-01');

function formatDate(date: Date | undefined): string {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
}

function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

/**
 * Angular port of the shadcn Block `calendar-28` — "Input with date picker."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/popover` +
 * `ui/button` + `ui/input` + `ui/label` primitives — no new cva, no new
 * tokens, no component-level SCSS. Structural reference: the upstream
 * registry's `Calendar28` (a free-typed date `Input` with an icon-only
 * `Button` overlaid inside it that opens a `Popover`-anchored calendar).
 *
 * The typed value and the picked `Date` are two independent pieces of state
 * (mirrors the registry's `value`/`date` split): typing an unparsable string
 * only updates the text, never `date`/`month`; picking a day from the
 * calendar reformats the input's text from the picked date. `ArrowDown` in
 * the text field opens the popover without needing the mouse (registry
 * behavior, kept verbatim).
 *
 * Popover auto-close on select uses the same local "open" tracking-signal
 * approach as `calendar-26` (see that block's header comment for why
 * `externalControl` isn't used — it would also disable Escape/outside-click
 * dismissal).
 */
@Component({
  selector: 'app-block-calendar-28',
  standalone: true,
  imports: [Button, Calendar, Input, Label, Popover, PopoverTrigger, PopoverContent, ...PopoverContentBox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex flex-col gap-3">
      <label uiLabel for="date" class="px-1">Subscription Date</label>
      <div class="relative flex gap-2">
        <input
          uiInput
          id="date"
          [value]="value()"
          placeholder="June 01, 2025"
          class="bg-background pr-10"
          (input)="onInputChange($event)"
          (keydown)="onKeydown($event)"
        />
        <div rdxPopoverRoot [open]="open()">
          <button
            uiButton
            type="button"
            id="date-picker"
            variant="ghost"
            class="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            rdxPopoverTrigger
            (click)="open.set(true)"
          >
            <span aria-hidden="true" class="[&_svg]:size-3.5" [innerHTML]="calendarIcon"></span>
            <span class="sr-only">Select date</span>
          </button>
          <ng-template rdxPopoverContent side="bottom" align="end" [alignOffset]="-8" [sideOffset]="10">
            <div rdxPopoverContentAttributes class="w-auto overflow-hidden p-0">
              <div
                uiCalendar
                mode="single"
                [selected]="date()"
                captionLayout="dropdown"
                [(month)]="month"
                (selectedChange)="onSelect($event)"
              ></div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
})
export class Calendar28Component {
  protected readonly open = signal(false);
  protected readonly date = signal<Date | undefined>(INITIAL_DATE);
  protected readonly month = signal<Date>(INITIAL_DATE);
  protected readonly value = signal(formatDate(INITIAL_DATE));

  protected readonly calendarIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CALENDAR_28_CALENDAR_SVG,
  );

  protected onInputChange(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.value.set(raw);
    const parsed = new Date(raw);
    if (isValidDate(parsed)) {
      this.date.set(parsed);
      this.month.set(parsed);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.open.set(true);
    }
  }

  protected onSelect(date: Date | undefined): void {
    this.date.set(date);
    this.value.set(formatDate(date));
    this.open.set(false);
  }
}
