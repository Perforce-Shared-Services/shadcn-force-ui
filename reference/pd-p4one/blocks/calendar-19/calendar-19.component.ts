import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Card, CardContent, CardFooter } from '@/app/ui/card';

/** Registry's inline preset list — offset (in days from today) + label. */
interface Calendar19Preset {
  readonly label: string;
  readonly value: number;
}

const PRESETS: readonly Calendar19Preset[] = [
  { label: 'Today', value: 0 },
  { label: 'Tomorrow', value: 1 },
  { label: 'In 3 days', value: 3 },
  { label: 'In a week', value: 7 },
  { label: 'In 2 weeks', value: 14 },
];

/**
 * Angular port of the shadcn Block `calendar-19` — "With presets."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/card` +
 * `ui/button` primitives — no new cva, no new tokens, no component-level
 * SCSS. Structural reference: the upstream registry's `Calendar19` (a
 * compact card with a single-select calendar in its content and a row of
 * "jump to date" preset buttons in the footer).
 *
 * Deviation: the registry uses `date-fns`'s `addDays` purely to compute each
 * preset's target date from today. Composition-only blocks don't add npm
 * dependencies, so `addPresetDays` below reproduces the same day-offset
 * arithmetic with plain `Date` math (mirrors how `ui/calendar` itself avoids
 * `date-fns` — see `calendar.utils.ts`).
 */
@Component({
  selector: 'app-block-calendar-19',
  standalone: true,
  imports: [Button, Calendar, Card, CardContent, CardFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div uiCard class="max-w-[300px] py-4">
      <div uiCardContent class="px-4">
        <div
          uiCalendar
          mode="single"
          [(selected)]="date"
          class="bg-transparent p-0 [--cell-size:--spacing(9.5)]"
        ></div>
      </div>
      <div uiCardFooter class="flex flex-wrap gap-2 border-t px-4 !pt-4">
        @for (preset of presets; track preset.value) {
          <button
            uiButton
            type="button"
            variant="outline"
            size="sm"
            class="flex-1"
            (click)="applyPreset(preset.value)"
          >
            {{ preset.label }}
          </button>
        }
      </div>
    </div>
  `,
})
export class Calendar19Component {
  protected readonly presets = PRESETS;

  protected readonly date = signal<Date | undefined>(new Date(2025, 5, 12));

  protected applyPreset(daysFromToday: number): void {
    this.date.set(addPresetDays(daysFromToday));
  }
}

function addPresetDays(daysFromToday: number): Date {
  const next = new Date();
  next.setDate(next.getDate() + daysFromToday);
  return next;
}
