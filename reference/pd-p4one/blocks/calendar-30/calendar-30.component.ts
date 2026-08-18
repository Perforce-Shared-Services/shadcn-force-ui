import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import { Calendar, type DateRange } from '@/app/ui/calendar';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { CALENDAR_30_CHEVRON_DOWN_SVG } from './calendar-30.icons';

/**
 * Native stand-in for the registry's `little-date` `formatDateRange` helper.
 *
 * `little-date` is imported by the upstream registry but isn't listed among
 * its `registryDependencies` (npm packages, not registry components), so
 * adding it would be a new bundle dependency for a two-line date format —
 * this port's composition-only mandate rules that out. This reproduces
 * `little-date`'s common case (a same-month, same-year range collapses to
 * "Jun 4 - 10, 2025") using native `toLocaleDateString`, without chasing
 * every edge case (cross-year ranges, time-of-day) the real package handles.
 */
function formatDateRange(from: Date, to: Date): string {
  const sameYear = from.getFullYear() === to.getFullYear();
  const sameMonth = sameYear && from.getMonth() === to.getMonth();

  if (sameMonth) {
    const month = from.toLocaleDateString('en-US', { month: 'short' });
    return `${month} ${from.getDate()} - ${to.getDate()}, ${from.getFullYear()}`;
  }

  const fromLabel = from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const toLabel = to.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: sameYear ? undefined : 'numeric',
  });
  return sameYear ? `${fromLabel} - ${toLabel}, ${to.getFullYear()}` : `${fromLabel} - ${toLabel}`;
}

/**
 * Angular port of the shadcn Block `calendar-30` — "With little-date."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/popover` +
 * `ui/button` + `ui/label` primitives — no new cva, no new tokens, no
 * component-level SCSS. Structural reference: the upstream registry's
 * `Calendar30` (a Label + a Popover-anchored trigger button showing the
 * formatted range, opening a `mode="range"` calendar).
 *
 * Unlike `calendar-26`/`calendar-28`/`calendar-29`, this popover is left
 * uncontrolled (no local "open" tracking signal) — the registry itself never
 * wires `open`/`onOpenChange` here, because a range selection takes two
 * clicks (start day, then end day) and auto-closing after the first would
 * make the end day impossible to pick. The trigger's default click-to-toggle
 * behavior and the primitive's own Escape/outside-click dismissal are enough.
 *
 * `registryDependencies` lists `input`, but the registry source never
 * actually renders an `Input` — this port follows the real `.tsx`, not the
 * dependency manifest, and only imports what the template uses.
 */
@Component({
  selector: 'app-block-calendar-30',
  standalone: true,
  imports: [Button, Calendar, Label, Popover, PopoverTrigger, PopoverContent, ...PopoverContentBox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex flex-col gap-3">
      <label uiLabel for="dates" class="px-1">Select your stay</label>
      <div rdxPopoverRoot>
        <button uiButton type="button" variant="outline" id="dates" class="w-56 justify-between font-normal" rdxPopoverTrigger>
          {{ rangeLabel() }}
          <span aria-hidden="true" [innerHTML]="chevronDownIcon"></span>
        </button>
        <ng-template rdxPopoverContent side="bottom" [sideOffset]="4" align="start">
          <div rdxPopoverContentAttributes class="w-auto overflow-hidden p-0">
            <div uiCalendar mode="range" [(selected)]="range" captionLayout="dropdown"></div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class Calendar30Component {
  protected readonly range = signal<DateRange | undefined>({
    from: new Date(2025, 5, 4),
    to: new Date(2025, 5, 10),
  });

  protected readonly rangeLabel = computed(() => {
    const value = this.range();
    return value?.from && value.to ? formatDateRange(value.from, value.to) : 'Select date';
  });

  protected readonly chevronDownIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CALENDAR_30_CHEVRON_DOWN_SVG,
  );
}
