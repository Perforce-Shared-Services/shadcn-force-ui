import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import { Calendar, type DateRange } from '@/app/ui/calendar';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { CALENDAR_23_CHEVRON_DOWN_SVG } from './calendar-23.icons';

/**
 * Angular port of the shadcn Block `calendar-23` — "Date range picker."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/popover` +
 * `ui/button` + `ui/label` primitives — no new cva, no new tokens, no
 * component-level SCSS. Structural reference: the upstream registry's
 * `Calendar23` (a Label above a Popover-anchored trigger button showing the
 * formatted "from - to" range, holding a range-select `Calendar` with the
 * dropdown month/year caption).
 *
 * Unlike `calendar-22`/`calendar-24`/`calendar-25`, the registry's `onSelect`
 * here only calls `setRange` — it never closes the popover after a pick (a
 * range selection needs a second click for the end date, so auto-closing
 * after the first click would break the interaction). This block therefore
 * leaves `[rdxPopoverRoot]` fully uncontrolled, matching `calendar-01`'s
 * plain composition — no `open` signal, no click override.
 */
@Component({
  selector: 'app-block-calendar-23',
  standalone: true,
  imports: [Button, Calendar, Label, Popover, PopoverTrigger, PopoverContent, ...PopoverContentBox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex flex-col gap-3">
      <label uiLabel for="dates" class="px-1">Select your stay</label>
      <div rdxPopoverRoot>
        <button
          uiButton
          type="button"
          variant="outline"
          id="dates"
          class="w-56 justify-between font-normal"
          rdxPopoverTrigger
        >
          @if (range()?.from && range()?.to) {
            {{ range()!.from!.toLocaleDateString() }} - {{ range()!.to!.toLocaleDateString() }}
          } @else {
            Select date
          }
          <span aria-hidden="true" [innerHTML]="chevronDownIcon"></span>
        </button>
        <ng-template rdxPopoverContent side="bottom" [sideOffset]="4" align="start">
          <div rdxPopoverContentAttributes class="w-auto overflow-hidden p-0">
            <div uiCalendar mode="range" captionLayout="dropdown" [(selected)]="range"></div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class Calendar23Component {
  protected readonly range = signal<DateRange | undefined>(undefined);

  protected readonly chevronDownIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CALENDAR_23_CHEVRON_DOWN_SVG,
  );
}
