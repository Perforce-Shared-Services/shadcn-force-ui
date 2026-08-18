import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { Button } from '@/app/ui/button';
import { Calendar } from '@/app/ui/calendar';
import { Input } from '@/app/ui/input';
import { Label } from '@/app/ui/label';
import { Popover, PopoverContent, PopoverContentBox, PopoverTrigger } from '@/app/ui/popover';

import { CALENDAR_29_CALENDAR_SVG } from './calendar-29.icons';

const INITIAL_VALUE = 'In 2 days';

function formatDate(date: Date | undefined): string {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

/**
 * Minimal native stand-in for the registry's `chrono-node` `parseDate` call.
 *
 * The upstream registry ships `chrono-node` (a full natural-language date
 * parser) as an npm `dependencies` entry — adding it would be a new bundle
 * dependency for a demo phrase, which this port's composition-only mandate
 * rules out. This recognizes a small, curated set of relative phrases
 * ("today", "tomorrow", "yesterday", "next week", "next month", "in N
 * day(s)/week(s)/month(s)") case-insensitively, and otherwise falls back to
 * the native `Date` constructor (handles explicit dates like "2025-06-12" or
 * "June 12, 2025"). This is NOT a general NLP date parser — phrases outside
 * this set (e.g. "next Tuesday", "in a fortnight") simply fail to resolve,
 * same as typing gibberish into the registry's own input before a keystroke
 * chrono-node can parse.
 */
function parseNaturalDate(text: string, reference: Date = new Date()): Date | undefined {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return undefined;

  const today = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());

  if (normalized === 'today') return today;
  if (normalized === 'tomorrow') return addDays(today, 1);
  if (normalized === 'yesterday') return addDays(today, -1);
  if (normalized === 'next week') return addDays(today, 7);
  if (normalized === 'next month') {
    return new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  }

  const relative = normalized.match(/^in (\d+) (day|days|week|weeks|month|months)$/);
  if (relative) {
    const amount = Number(relative[1]);
    const unit = relative[2];
    if (unit.startsWith('day')) return addDays(today, amount);
    if (unit.startsWith('week')) return addDays(today, amount * 7);
    return new Date(today.getFullYear(), today.getMonth() + amount, today.getDate());
  }

  const native = new Date(text);
  return isNaN(native.getTime()) ? undefined : native;
}

/**
 * Angular port of the shadcn Block `calendar-29` — "Natural language date
 * picker."
 *
 * Pure composition of the already-ported `ui/calendar` + `ui/popover` +
 * `ui/button` + `ui/input` + `ui/label` primitives — no new cva, no new
 * tokens, no component-level SCSS. Structural reference: the upstream
 * registry's `Calendar29` (a free-typed "Tomorrow or next week"-style text
 * input, an icon-only trigger opening a `Popover`-anchored calendar, and a
 * footer sentence echoing the resolved date).
 *
 * Documented dependency substitution: see `parseNaturalDate` above — the
 * registry's `chrono-node` npm dependency is replaced with a small native
 * heuristic (no new bundle dependency), which only understands a curated set
 * of relative phrases rather than full natural-language parsing.
 *
 * Popover auto-close on select uses the same local "open" tracking-signal
 * approach as `calendar-26`/`calendar-28` (see `calendar-26`'s header comment
 * for why `externalControl` isn't used).
 */
@Component({
  selector: 'app-block-calendar-29',
  standalone: true,
  imports: [Button, Calendar, Input, Label, Popover, PopoverTrigger, PopoverContent, ...PopoverContentBox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <div class="flex flex-col gap-3">
      <label uiLabel for="date" class="px-1">Schedule Date</label>
      <div class="relative flex gap-2">
        <input
          uiInput
          id="date"
          [value]="value()"
          placeholder="Tomorrow or next week"
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
          <ng-template rdxPopoverContent side="bottom" [sideOffset]="4" align="end">
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
      <div class="text-muted-foreground px-1 text-sm">
        Your post will be published on <span class="font-medium">{{ formattedDate() }}</span>.
      </div>
    </div>
  `,
})
export class Calendar29Component {
  protected readonly open = signal(false);
  protected readonly value = signal(INITIAL_VALUE);
  protected readonly date = signal<Date | undefined>(parseNaturalDate(INITIAL_VALUE));
  protected readonly month = signal<Date>(this.date() ?? new Date());

  protected readonly calendarIcon: SafeHtml = inject(DomSanitizer).bypassSecurityTrustHtml(
    CALENDAR_29_CALENDAR_SVG,
  );

  protected formattedDate(): string {
    return formatDate(this.date());
  }

  protected onInputChange(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.value.set(raw);
    const parsed = parseNaturalDate(raw);
    if (parsed) {
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
