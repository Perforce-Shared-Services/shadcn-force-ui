import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Calendar } from '@/app/ui/calendar';
import { Card, CardContent, CardFooter } from '@/app/ui/card';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';

import { CALENDAR_16_CLOCK_SVG } from './calendar-16.icons';

/**
 * Angular port of the shadcn Block `calendar-16` — "With time picker."
 *
 * Pure composition of the already-ported `ui/calendar`, `ui/card`,
 * `ui/input`, and `ui/label` primitives — no new cva, no new tokens, no
 * component-level SCSS. Structural reference: the upstream registry's
 * `Calendar16` (a card wrapping a single-select calendar, with a footer
 * holding two labelled native `type="time"` inputs — Start Time / End Time —
 * each with a clock glyph pinned inside via absolute positioning).
 *
 * The two time inputs are uncontrolled (native `value` attribute, matching
 * the registry's `defaultValue` — this is reference/demo code, not wired to
 * any submit handler; a consuming product owns its own state/validation).
 */
@Component({
  selector: 'app-block-calendar-16',
  standalone: true,
  imports: [Calendar, Card, CardContent, CardFooter, Input, Label],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div uiCard class="w-fit py-4">
      <div uiCardContent class="px-4">
        <div uiCalendar mode="single" [(selected)]="selected" class="bg-transparent p-0"></div>
      </div>
      <div uiCardFooter class="flex flex-col gap-6 border-t px-4 !pt-4">
        <div class="flex w-full flex-col gap-3">
          <label uiLabel for="calendar-16-time-from">Start Time</label>
          <div class="relative flex w-full items-center gap-2">
            <div
              class="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none [&_svg]:size-4 [&_svg]:fill-current"
              aria-hidden="true"
              [innerHTML]="clockIcon"
            ></div>
            <input
              uiInput
              id="calendar-16-time-from"
              type="time"
              step="1"
              value="10:30:00"
              class="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
        <div class="flex w-full flex-col gap-3">
          <label uiLabel for="calendar-16-time-to">End Time</label>
          <div class="relative flex w-full items-center gap-2">
            <div
              class="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none [&_svg]:size-4 [&_svg]:fill-current"
              aria-hidden="true"
              [innerHTML]="clockIcon"
            ></div>
            <input
              uiInput
              id="calendar-16-time-to"
              type="time"
              step="1"
              value="12:30:00"
              class="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Calendar16Component {
  protected readonly selected = signal<Date | undefined>(new Date(2025, 5, 12));

  /**
   * Sanitizer-trusted inline SVG — bundled at build time from
   * `@material-symbols/svg-400` (trusted, static), same swap-point pattern as
   * every other ported icon in this app.
   */
  protected readonly clockIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CALENDAR_16_CLOCK_SVG,
  );
}
