import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Card, CardContent, CardFooter } from '@/app/ui/card';

import { CALENDAR_31_PLUS_SVG } from './calendar-31.icons';

interface EventSlot {
  readonly title: string;
  readonly from: Date;
  readonly to: Date;
}

const EVENTS: readonly EventSlot[] = [
  { title: 'Team Sync Meeting', from: new Date('2025-06-12T09:00:00'), to: new Date('2025-06-12T10:00:00') },
  { title: 'Design Review', from: new Date('2025-06-12T11:30:00'), to: new Date('2025-06-12T12:30:00') },
  { title: 'Client Presentation', from: new Date('2025-06-12T14:00:00'), to: new Date('2025-06-12T15:00:00') },
];

/**
 * Native stand-in for the registry's `little-date` `formatDateRange` helper,
 * scoped to this block's same-day time-range case ("9:00 AM - 10:00 AM").
 * See `calendar-30`'s header comment for why `little-date` itself isn't
 * added as a dependency.
 */
function formatEventTimeRange(event: EventSlot): string {
  const timeFormat: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
  const sameDay =
    event.from.getFullYear() === event.to.getFullYear() &&
    event.from.getMonth() === event.to.getMonth() &&
    event.from.getDate() === event.to.getDate();

  if (sameDay) {
    return `${event.from.toLocaleTimeString('en-US', timeFormat)} - ${event.to.toLocaleTimeString('en-US', timeFormat)}`;
  }

  // Not exercised by the current demo data (every event is same-day), kept
  // as a reasonable fallback for a future cross-day entry.
  const dateTimeFormat: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', ...timeFormat };
  return `${event.from.toLocaleString('en-US', dateTimeFormat)} - ${event.to.toLocaleString('en-US', dateTimeFormat)}`;
}

/**
 * Angular port of the shadcn Block `calendar-31` — "With event slots."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/card` +
 * `ui/button` primitives — no new cva, no new tokens, no component-level
 * SCSS. Structural reference: the upstream registry's `Calendar31` (a card
 * with an embedded single-select calendar, a footer summarizing the picked
 * date plus an "Add Event" icon button, and a static list of event-slot
 * rows for that day).
 *
 * Documented gap: the registry passes `required` to force the calendar to
 * always keep a selection (can't deselect by re-clicking the same day) —
 * `ui/calendar` doesn't expose that prop (see its header comment, "No
 * `required` prop … a documented gap"), so re-clicking the selected day here
 * will deselect it, unlike the registry demo.
 */
@Component({
  selector: 'app-block-calendar-31',
  standalone: true,
  imports: [Button, Calendar, Card, CardContent, CardFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div uiCard class="w-fit py-4">
      <div uiCardContent class="px-4">
        <div uiCalendar mode="single" [(selected)]="date" class="bg-transparent p-0"></div>
      </div>
      <div uiCardFooter class="flex flex-col items-start gap-3 border-t px-4 !pt-4">
        <div class="flex w-full items-center justify-between px-1">
          <div class="text-sm font-medium">{{ formattedDate() }}</div>
          <button uiButton type="button" variant="ghost" size="icon" class="size-6" title="Add Event">
            <span aria-hidden="true" [innerHTML]="plusIcon"></span>
            <span class="sr-only">Add Event</span>
          </button>
        </div>
        <div class="flex w-full flex-col gap-2">
          @for (event of events; track event.title) {
            <div
              class="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
            >
              <div class="font-medium">{{ event.title }}</div>
              <div class="text-muted-foreground text-xs">{{ formatEventRange(event) }}</div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class Calendar31Component {
  protected readonly events = EVENTS;
  protected readonly date = signal<Date | undefined>(new Date(2025, 5, 12));

  protected readonly plusIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(CALENDAR_31_PLUS_SVG);

  protected formattedDate(): string {
    const value = this.date();
    return value ? value.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  }

  protected formatEventRange(event: EventSlot): string {
    return formatEventTimeRange(event);
  }
}
