import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { CALENDAR_26_CHEVRON_DOWN_SVG } from './calendar-26.icons';

/**
 * Angular port of the shadcn Block `calendar-26` — "Date range picker with
 * time."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/popover` +
 * `ui/button` + `ui/input` + `ui/label` primitives — no new cva, no new
 * tokens, no component-level SCSS. Structural reference: the upstream
 * registry's `Calendar26` (two check-in/check-out rows, each a Label + a
 * Popover-anchored date-picker trigger button + a native time `<input>`).
 *
 * Popover auto-close on select: the registry's React `Popover` is
 * open/onOpenChange-controlled so picking a day closes the panel immediately.
 * `[rdxPopoverRoot]`'s `open` input has no paired output (radix-ng doesn't
 * emit a toggle event), so a fully `externalControl`-bound popover would also
 * disable the primitive's own Escape/outside-click dismissal (verified by
 * reading `RdxPopoverRootDirective.handleClose()` — it no-ops under
 * `externalControl`). Instead this block leaves the trigger's default
 * click-to-toggle behavior alone (uncontrolled `open`) and only ever pushes
 * `openFrom`/`openTo` from `false` to `true` (armed on trigger click) or from
 * `true` to `false` (forced closed from the calendar's `selectedChange`) —
 * both real signal transitions, so `RdxPopoverRootDirective`'s `open`-input
 * sync effect fires exactly when needed without fighting Escape/outside-click.
 *
 * Documented gap: the registry's `disabled={dateFrom && { before: dateFrom }}`
 * (a react-day-picker matcher object) is reproduced as the `(date: Date) =>
 * boolean` predicate the primitive's `disabled` input expects (`dateToDisabled`)
 * — same pattern as `calendar-08`/`calendar-09`/`calendar-20`.
 */
@Component({
  selector: 'app-block-calendar-26',
  standalone: true,
  imports: [Button, Calendar, Input, Label, Popover, PopoverTrigger, PopoverContent, ...PopoverContentBox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex w-full max-w-64 min-w-0 flex-col gap-6">
      <div class="flex gap-4">
        <div class="flex flex-1 flex-col gap-3">
          <label uiLabel for="date-from" class="px-1">Check-in</label>
          <div rdxPopoverRoot [open]="openFrom()">
            <button
              uiButton
              type="button"
              variant="outline"
              id="date-from"
              class="w-full justify-between font-normal"
              rdxPopoverTrigger
              (click)="openFrom.set(true)"
            >
              {{ dateFrom() ? formatDate(dateFrom()!) : 'Select date' }}
              <span aria-hidden="true" [innerHTML]="chevronDownIcon"></span>
            </button>
            <ng-template rdxPopoverContent side="bottom" [sideOffset]="4" align="start">
              <div rdxPopoverContentAttributes class="w-auto overflow-hidden p-0">
                <div
                  uiCalendar
                  mode="single"
                  [selected]="dateFrom()"
                  captionLayout="dropdown"
                  (selectedChange)="onSelectFrom($event)"
                ></div>
              </div>
            </ng-template>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <label uiLabel for="time-from" class="invisible px-1">From</label>
          <input
            uiInput
            type="time"
            id="time-from"
            step="1"
            value="10:30:00"
            class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-1 flex-col gap-3">
          <label uiLabel for="date-to" class="px-1">Check-out</label>
          <div rdxPopoverRoot [open]="openTo()">
            <button
              uiButton
              type="button"
              variant="outline"
              id="date-to"
              class="w-full justify-between font-normal"
              rdxPopoverTrigger
              (click)="openTo.set(true)"
            >
              {{ dateTo() ? formatDate(dateTo()!) : 'Select date' }}
              <span aria-hidden="true" [innerHTML]="chevronDownIcon"></span>
            </button>
            <ng-template rdxPopoverContent side="bottom" [sideOffset]="4" align="start">
              <div rdxPopoverContentAttributes class="w-auto overflow-hidden p-0">
                <div
                  uiCalendar
                  mode="single"
                  [selected]="dateTo()"
                  captionLayout="dropdown"
                  [disabled]="dateToDisabled"
                  (selectedChange)="onSelectTo($event)"
                ></div>
              </div>
            </ng-template>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <label uiLabel for="time-to" class="invisible px-1">To</label>
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
export class Calendar26Component {
  protected readonly openFrom = signal(false);
  protected readonly openTo = signal(false);

  protected readonly dateFrom = signal<Date | undefined>(new Date('2025-06-01'));
  protected readonly dateTo = signal<Date | undefined>(new Date('2025-06-03'));

  protected readonly dateToDisabled = (date: Date): boolean => {
    const from = this.dateFrom();
    if (!from) return false;
    return date.getTime() < new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
  };

  protected readonly chevronDownIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CALENDAR_26_CHEVRON_DOWN_SVG,
  );

  protected onSelectFrom(date: Date | undefined): void {
    this.dateFrom.set(date);
    this.openFrom.set(false);
  }

  protected onSelectTo(date: Date | undefined): void {
    this.dateTo.set(date);
    this.openTo.set(false);
  }

  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
