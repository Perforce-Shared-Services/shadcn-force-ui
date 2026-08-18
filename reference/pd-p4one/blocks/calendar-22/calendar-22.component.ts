import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { CALENDAR_22_CHEVRON_DOWN_SVG } from './calendar-22.icons';

/**
 * Angular port of the shadcn Block `calendar-22` — "Date picker."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/popover` +
 * `ui/button` + `ui/label` primitives — no new cva, no new tokens, no
 * component-level SCSS. Structural reference: the upstream registry's
 * `Calendar22` (a Label above a Popover-anchored trigger button showing the
 * formatted date, holding a single-select `Calendar` with the dropdown
 * month/year caption).
 *
 * Popover auto-close on select: the registry's React `Popover` is
 * open/onOpenChange-controlled so picking a day closes the panel immediately.
 * A fully `externalControl`-bound `[rdxPopoverRoot]` would also disable the
 * primitive's own Escape/outside-click dismissal (verified by reading the
 * compiled `RdxPopoverRootDirective.handleClose()` — it no-ops under
 * `externalControl`). Instead this block leaves the trigger's default
 * click-to-toggle behavior alone (uncontrolled `open`) and only ever pushes
 * `open` from `false` to `true` (armed on trigger click) or from `true` to
 * `false` (forced closed from the calendar's `selectedChange`) — both real
 * signal transitions, so `RdxPopoverRootDirective`'s `open`-input sync effect
 * fires exactly when needed without fighting Escape/outside-click. Same
 * pattern as `calendar-26`.
 */
@Component({
  selector: 'app-block-calendar-22',
  standalone: true,
  imports: [Button, Calendar, Label, Popover, PopoverTrigger, PopoverContent, ...PopoverContentBox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex flex-col gap-3">
      <label uiLabel for="date" class="px-1">Date of birth</label>
      <div rdxPopoverRoot [open]="open()">
        <button
          uiButton
          type="button"
          variant="outline"
          id="date"
          class="w-48 justify-between font-normal"
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
  `,
})
export class Calendar22Component {
  protected readonly open = signal(false);
  protected readonly date = signal<Date | undefined>(undefined);

  protected readonly chevronDownIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CALENDAR_22_CHEVRON_DOWN_SVG,
  );

  protected onSelect(date: Date | undefined): void {
    this.date.set(date);
    this.open.set(false);
  }
}
