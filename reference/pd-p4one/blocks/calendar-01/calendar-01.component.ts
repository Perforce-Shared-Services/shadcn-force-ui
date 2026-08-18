import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Calendar } from '@/app/ui/calendar';

/**
 * Angular port of the shadcn Block `calendar-01` — "A simple calendar."
 *
 * Pure composition of the already-ported `ui/calendar` primitive — no new
 * cva, no new tokens, no component-level SCSS. Structural reference: the
 * upstream registry's `Calendar01` (single `Calendar` in `mode="single"`
 * wrapped in a bordered, shadowed card shell).
 */
@Component({
  selector: 'app-block-calendar-01',
  standalone: true,
  imports: [Calendar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div uiCalendar mode="single" [(selected)]="selected" class="rounded-lg border border-border shadow-sm"></div>
  `,
})
export class Calendar01Component {
  protected readonly selected = signal<Date | undefined>(new Date(2025, 5, 12));
}
