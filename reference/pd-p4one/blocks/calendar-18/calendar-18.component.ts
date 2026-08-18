import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-18` — "Variable size."
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. Structural reference: the
 * upstream registry's `Calendar18` (a single-select calendar whose
 * `--cell-size` custom property is bumped up responsively via the same
 * `[--cell-size:--spacing(N)]` override the primitive itself uses
 * internally, plus a `ghost` nav-button variant).
 */
@Component({
  selector: 'app-block-calendar-18',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div
      uiCalendar
      mode="single"
      [(selected)]="selected"
      buttonVariant="ghost"
      class="rounded-lg border border-border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
    ></div>
  `,
})
export class Calendar18Component {
  protected readonly selected = signal<Date | undefined>(new Date(2025, 5, 12));
}
